"use client";

import { useSearchParams } from "next/navigation";
import { PropertyCard } from "@/components/properties/property-card";
import { filterProperties, sortProperties } from "@/lib/filter-properties";
import { motion } from "framer-motion";
import { PropertyGridProps } from "@/types";


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
  view = "grid",
}: PropertyGridProps) {
  const searchParams = useSearchParams();
  const filters = Object.fromEntries(searchParams.entries());

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
        view === "grid"
          ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          : "space-y-4"
      }
    >
      {sortedProperties.map((property) => (
        <motion.div key={property.id} variants={item} layout>
          <PropertyCard property={property} view={view} />
        </motion.div>
      ))}
    </motion.div>
  );
}
