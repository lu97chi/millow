"use client";

import { useSearchStore } from "@/store/use-search-store";
import { PropertyCard } from "@/components/properties/property-card";
import { filterProperties, sortProperties } from "@/lib/filter-properties";
import type { Property } from "@/server/models/property";
import { motion } from "framer-motion";

interface PropertyGridProps {
  properties: Property[];
  viewMode?: "grid" | "list";
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function PropertyGrid({
  properties,
  viewMode = "grid",
}: PropertyGridProps) {
  const { filters } = useSearchStore();

  // Apply filters and sorting
  const filteredProperties = filterProperties(properties, filters);
  const sortedProperties = sortProperties(filteredProperties, filters.sortBy);

  if (sortedProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">
          No se encontraron propiedades
        </h3>
        <p className="text-muted-foreground">
          Intenta ajustar los filtros de búsqueda para ver más resultados.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          : "space-y-4"
      }
    >
      {sortedProperties.map((property) => (
        <motion.div key={property.id} variants={item} layout>
          <PropertyCard property={property} viewMode={viewMode} />
        </motion.div>
      ))}
    </motion.div>
  );
}
