"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useSearchStore } from "@/store/use-search-store";
import type { Property } from "@/constants/properties";
import { formatPrice } from "@/lib/format";
import { Loader2 } from "lucide-react";

// Google Maps types
declare global {
  interface Window {
    google: {
      maps: {
        Map: typeof google.maps.Map;
        Marker: typeof google.maps.Marker;
        InfoWindow: typeof google.maps.InfoWindow;
        LatLngBounds: typeof google.maps.LatLngBounds;
        MapOptions: google.maps.MapOptions;
      };
    };
  }
}

interface PropertyMapProps {
  properties: Property[];
}

export function PropertyMap({ properties }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { filters } = useSearchStore();

  // Filter properties based on current filters
  const filteredProperties = properties.filter((property) => {
    // Text search
    if (filters.query && !property.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !property.description.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }

    // Property type
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) {
      return false;
    }

    // Location
    if (filters.location.state && property.location.state !== filters.location.state) {
      return false;
    }
    if (filters.location.city && property.location.city !== filters.location.city) {
      return false;
    }
    if (filters.location.area && property.location.area !== filters.location.area) {
      return false;
    }

    // Price range
    if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
      return false;
    }

    // Features
    if (filters.features.bedrooms && property.features.bedrooms !== filters.features.bedrooms) {
      return false;
    }
    if (filters.features.bathrooms && property.features.bathrooms !== filters.features.bathrooms) {
      return false;
    }
    if (filters.features.constructionSize?.min && 
        property.features.constructionSize < filters.features.constructionSize.min) {
      return false;
    }
    if (filters.features.constructionSize?.max && 
        property.features.constructionSize > filters.features.constructionSize.max) {
      return false;
    }
    if (filters.features.lotSize?.min && 
        (!property.features.lotSize || property.features.lotSize < filters.features.lotSize.min)) {
      return false;
    }
    if (filters.features.lotSize?.max && 
        (!property.features.lotSize || property.features.lotSize > filters.features.lotSize.max)) {
      return false;
    }

    // Amenities
    if (filters.amenities.length > 0 && 
        !filters.amenities.every(amenity => property.amenities.includes(amenity))) {
      return false;
    }

    // Property age
    if (filters.propertyAge !== undefined && property.propertyAge > filters.propertyAge) {
      return false;
    }

    // Maintenance fee
    if (filters.maintenanceFee?.min && 
        (!property.maintenanceFee || property.maintenanceFee < filters.maintenanceFee.min)) {
      return false;
    }
    if (filters.maintenanceFee?.max && 
        (!property.maintenanceFee || property.maintenanceFee > filters.maintenanceFee.max)) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    if (!mapRef.current || !isLoaded || !window.google) return;

    // Initialize map
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 23.6345, lng: -102.5528 }, // Center of Mexico
      zoom: 5,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }],
        },
      ],
    });

    // Add markers for filtered properties
    const bounds = new window.google.maps.LatLngBounds();
    const markers = filteredProperties
      .filter((property) => property.location.coordinates)
      .map((property) => {
        const marker = new window.google.maps.Marker({
          position: {
            lat: property.location.coordinates!.lat,
            lng: property.location.coordinates!.lng,
          },
          map,
          title: property.title,
        });

        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold">${property.title}</h3>
              <p class="text-sm">${formatPrice(property.price)}</p>
              <p class="text-xs text-gray-600">${property.location.area}, ${property.location.city}</p>
            </div>
          `,
        });

        // Add click listener
        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });

        bounds.extend(marker.getPosition()!);
        return marker;
      });

    // Fit map to markers
    if (markers.length > 0) {
      map.fitBounds(bounds);
      if (markers.length === 1) {
        map.setZoom(15);
      }
    }

    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [filteredProperties, isLoaded]);

  return (
    <div className="relative h-[400px] w-full rounded-lg border bg-muted">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        onLoad={() => setIsLoaded(true)}
      />
      <div ref={mapRef} className="h-full w-full rounded-lg" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      {isLoaded && filteredProperties.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <p className="text-center text-muted-foreground">
            No hay propiedades que mostrar en el mapa
          </p>
        </div>
      )}
    </div>
  );
} 