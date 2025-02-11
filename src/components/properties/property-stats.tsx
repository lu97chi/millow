"use client";

import type { Property } from "@/server/models/property";
import { formatPrice } from "@/lib/format";

interface PropertyStatsProps {
  properties: Property[];
  total: number;
}

export function PropertyStats({ properties, total }: PropertyStatsProps) {
  // Calculate stats from visible properties
  const averagePrice = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.price, 0) / properties.length
    : 0;

  return (
    <div className="flex items-center gap-4 text-sm">
      <div>
        <span className="font-medium">{total}</span>
        <span className="ml-1 text-muted-foreground">
          {total === 1 ? "propiedad" : "propiedades"}
        </span>
      </div>
      {properties.length > 0 && (
        <div>
          <span className="text-muted-foreground">Precio promedio:</span>
          <span className="ml-1 font-medium">{formatPrice(averagePrice)}</span>
        </div>
      )}
    </div>
  );
} 