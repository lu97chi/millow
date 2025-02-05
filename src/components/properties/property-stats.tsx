"use client";

import { useSearchStore } from "@/store/use-search-store";
import type { Property } from "@/constants/properties";
import { formatPrice } from "@/lib/format";

interface PropertyStatsProps {
  properties: Property[];
}

export function PropertyStats({ properties }: PropertyStatsProps) {
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

  // Calculate stats
  const totalProperties = filteredProperties.length;
  const averagePrice = totalProperties > 0
    ? filteredProperties.reduce((sum, p) => sum + p.price, 0) / totalProperties
    : 0;
  const minPrice = totalProperties > 0
    ? Math.min(...filteredProperties.map(p => p.price))
    : 0;
  const maxPrice = totalProperties > 0
    ? Math.max(...filteredProperties.map(p => p.price))
    : 0;

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">
        {totalProperties} {totalProperties === 1 ? "Propiedad" : "Propiedades"}
      </h1>
      <p className="text-sm text-muted-foreground">
        Precio promedio: {formatPrice(averagePrice)} · 
        Rango: {formatPrice(minPrice)} - {formatPrice(maxPrice)}
      </p>
    </div>
  );
} 