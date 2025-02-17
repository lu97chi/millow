"use client";

import { Suspense } from "react";
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

function PropertyGridContent({
  properties,
  view = "grid",
}: PropertyGridProps) {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  
  // Cast sort parameter to the correct type
  const sort = params.sort as 'price asc' | 'price desc' | 'age asc' | 'age desc' | undefined;
  const filters = { ...params, sortBy: sort };

  // Apply filters and sorting
  const filteredProperties = filterProperties(properties, filters);
  const sortedProperties = sortProperties(filteredProperties, filters.sortBy);

  if (sortedProperties.length === 0) {
    return (
      <div className="text-center py-8 px-4 max-w-full">
        <h3 className="text-lg font-semibold mb-2">
          No se encontraron propiedades
        </h3>
        <p className="text-muted-foreground text-sm">
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
          ? "grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-full overflow-hidden"
          : "space-y-4 w-full max-w-full overflow-hidden"
      }
    >
      {sortedProperties.map((property) => (
        <motion.div key={property.id} variants={item} layout className="w-full">
          <PropertyCard property={property} view={view} />
        </motion.div>
      ))}
    </motion.div>
  );
}

export function PropertyGrid(props: PropertyGridProps) {
  return (
    <Suspense fallback={<div className="text-center py-8 px-4 max-w-full">Loading properties...</div>}>
      <PropertyGridContent {...props} />
    </Suspense>
  );
}
