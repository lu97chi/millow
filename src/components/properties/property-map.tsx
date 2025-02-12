"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { filterProperties, sortProperties } from "@/lib/filter-properties";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { create } from "zustand";
import type { PropertyMapProps, MapStore } from "@/types";

const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  focusedPropertyId: null,
  setFocusedProperty: (id) => set({ focusedPropertyId: id }),
  center: { lat: 23.6345, lng: -102.5528 }, // Center of Mexico
  zoom: 5,
  setView: (center, zoom) => set({ center, zoom }),
}));

export function PropertyMap({
  properties = [],
  center: initialCenter,
  zoom: initialZoom = 12,
  showControls = true,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setMap, focusedPropertyId, setFocusedProperty } = useMapStore();
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

  // Filter properties based on current filters
  const filteredProperties = useMemo(
    () => filterProperties(properties, filters),
    [properties, filters]
  );

  // Sort properties
  const sortedProperties = useMemo(
    () => sortProperties(filteredProperties, filters.sortBy),
    [filteredProperties, filters.sortBy]
  );

  // Handle script load
  const handleScriptLoad = useCallback(() => {
    if (!mapRef.current || !window.google) return;
    setIsLoaded(true);

    // Initialize map
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: initialCenter || { lat: 23.6345, lng: -102.5528 },
      zoom: initialZoom,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    mapInstanceRef.current = mapInstance;
    setMap(mapInstance);

    // Add controls if enabled
    if (showControls) {
      mapInstance.setOptions({
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
      });
    }

    // Add markers for filtered properties
    const bounds = new window.google.maps.LatLngBounds();
    const markers = sortedProperties
      .filter((property) => property.location.coordinates)
      .map((property) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: property.location.coordinates!.lat,
            lng: property.location.coordinates!.lng,
          },
          map: mapInstance,
          title: property.title,
          animation:
            property.id === focusedPropertyId
              ? google.maps.Animation.BOUNCE
              : undefined,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold">${property.title}</h3>
              <p class="text-sm">${formatPrice(property.price)}</p>
              <p class="text-xs text-gray-600">${property.location.area}, ${
            property.location.city
          }</p>
            </div>
          `,
        });

        // Add click listener
        marker.addListener("click", () => {
          infoWindow.open(mapInstance, marker);
          setFocusedProperty(property.id);
        });

        bounds.extend(marker.getPosition()!);
        return marker;
      });

    markersRef.current = markers;

    // Fit map to markers
    if (markers.length > 0) {
      mapInstance.fitBounds(bounds);
      if (markers.length === 1) {
        mapInstance.setZoom(15);
      }
    }
  }, [sortedProperties, initialCenter, initialZoom, showControls, focusedPropertyId, setMap, setFocusedProperty]);

  // Update markers when properties change
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    handleScriptLoad();

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
    };
  }, [isLoaded, sortedProperties, handleScriptLoad]);

  // Handle focused property changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isLoaded || !focusedPropertyId) return;

    const focusedProperty = sortedProperties.find(
      (p) => p.id === focusedPropertyId
    );
    if (!focusedProperty?.location.coordinates) return;

    const map = mapInstanceRef.current;
    const position = {
      lat: focusedProperty.location.coordinates.lat,
      lng: focusedProperty.location.coordinates.lng,
    };

    map.panTo(position);
    map.setZoom(17);

    const marker = markersRef.current.find(
      (m) =>
        m.getPosition()?.lat() === position.lat &&
        m.getPosition()?.lng() === position.lng
    );

    if (marker) {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);
    }

    return () => {
      markersRef.current.forEach((m) => m.setAnimation(null));
    };
  }, [focusedPropertyId, sortedProperties, isLoaded]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="relative h-[400px] overflow-hidden bg-muted">
        <div className="flex h-full items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Google Maps API key not configured</p>
            <p className="text-sm">
              Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="relative h-[400px] overflow-hidden">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onLoad={handleScriptLoad}
      />
      <div ref={mapRef} className="h-full w-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {isLoaded && sortedProperties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <p className="text-center text-muted-foreground">
            No hay propiedades que mostrar en el mapa
          </p>
        </div>
      )}
    </Card>
  );
}
