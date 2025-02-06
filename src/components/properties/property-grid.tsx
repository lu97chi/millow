"use client";

import { useSearchStore } from "@/store/use-search-store";
import { PropertyCard } from "@/components/properties/property-card";
import { filterProperties, sortProperties } from "@/lib/filter-properties";
import type { Property } from "@/constants/properties";

interface PropertyGridProps {
  properties: Property[];
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  const { filters } = useSearchStore();

  // Apply filters and sorting
  const filteredProperties = filterProperties(properties, filters);
  const sortedProperties = sortProperties(filteredProperties, filters.sortBy);

  if (sortedProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No se encontraron propiedades</h3>
        <p className="text-muted-foreground">
          Intenta ajustar los filtros de búsqueda para ver más resultados.
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