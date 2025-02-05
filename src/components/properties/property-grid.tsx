"use client";

import { useSearchStore } from "@/store/use-search-store";
import { PropertyCard } from "./property-card";
import type { Property } from "@/constants/properties";

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const { filters } = useSearchStore();

  // Filter properties based on search criteria
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

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (sortedProperties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="text-lg font-medium">No se encontraron propiedades</p>
        <p className="text-sm text-muted-foreground">
          Intenta ajustar los filtros de búsqueda para ver más resultados
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedProperties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
} 