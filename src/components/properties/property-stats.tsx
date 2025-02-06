"use client";

import { useSearchStore } from "@/store/use-search-store";
import { filterProperties } from "@/lib/filter-properties";
import type { Property } from "@/constants/properties";
import { formatPrice } from "@/lib/format";

interface PropertyStatsProps {
  properties: Property[];
}

export function PropertyStats({ properties }: PropertyStatsProps) {
  const { filters } = useSearchStore();

  // Apply filters
  const filteredProperties = filterProperties(properties, filters);

  // Calculate stats
  const totalProperties = filteredProperties.length;
  const averagePrice = totalProperties > 0
    ? filteredProperties.reduce((sum, p) => sum + p.price, 0) / totalProperties
    : 0;

  return (
    <div className="flex items-center gap-4 text-sm">
      <div>
        <span className="font-medium">{totalProperties}</span>
        <span className="ml-1 text-muted-foreground">
          {totalProperties === 1 ? "propiedad" : "propiedades"}
        </span>
      </div>
      {totalProperties > 0 && (
        <div>
          <span className="text-muted-foreground">Precio promedio:</span>
          <span className="ml-1 font-medium">{formatPrice(averagePrice)}</span>
        </div>
      )}
    </div>
  );
} 