"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { create } from "zustand";
import type { Property, MapStore } from "@/types";

interface PropertyMapProps {
  property?: Property;
  center?: { lat: number; lng: number };
  zoom?: number;
  showControls?: boolean;
}

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
  property,
  center: initialCenter,
  zoom: initialZoom = 12,
  showControls = true,
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setMap } = useMapStore();

  // Initialize map instance
  const initializeMap = useCallback(() => {
    if (!mapRef.current || !window.google || mapInstanceRef.current) return;

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
      mapTypeControl: showControls,
      streetViewControl: showControls,
      zoomControl: showControls,
      fullscreenControl: false,
    });

    mapInstanceRef.current = mapInstance;
    setMap(mapInstance);
  }, [initialCenter, initialZoom, showControls, setMap]);

  // Update marker
  const updateMarker = useCallback(() => {
    if (!mapInstanceRef.current || !window.google || !property?.location.coordinates) return;

    // Clear existing marker
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const position = {
      lat: property.location.coordinates.lat,
      lng: property.location.coordinates.lng,
    };

    const marker = new window.google.maps.Marker({
      position,
      map: mapInstanceRef.current,
      title: property.title,
    });

    // Create info window with custom styles
    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div class="p-4 max-w-[300px]">
          <h3 class="font-semibold text-base mb-1">${property.title}</h3>
          <p class="text-base font-medium text-primary mb-1">${formatPrice(property.price)}</p>
          <p class="text-sm text-gray-600">${property.location.area}, ${property.location.city}</p>
        </div>
      `,
      maxWidth: 300,
    });

    // Add click listener
    marker.addListener("click", () => {
      infoWindow.open(mapInstanceRef.current, marker);
    });

    markerRef.current = marker;

    // Center and zoom the map
    mapInstanceRef.current.setCenter(position);
    mapInstanceRef.current.setZoom(15);
  }, [property]);

  // Handle script load
  const handleScriptLoad = useCallback(() => {
    if (!mapRef.current || !window.google) return;
    
    initializeMap();
    setIsLoaded(true);
  }, [initializeMap]);

  // Update marker when property changes
  useEffect(() => {
    if (!isLoaded) return;
    updateMarker();
  }, [isLoaded, updateMarker]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <Card className="relative h-full overflow-hidden bg-muted">
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
    <Card className="relative h-full overflow-hidden">
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
      {isLoaded && !property?.location.coordinates && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <p className="text-center text-muted-foreground">
            No hay ubicación disponible para mostrar en el mapa
          </p>
        </div>
      )}
    </Card>
  );
}
