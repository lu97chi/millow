// Server Component
import { Suspense } from "react";
import { PropertiesClient } from "./properties-client";
import type { ViewMode } from "./properties-client";

interface PageProps {
  searchParams: {
    operationType?: string | string[];
    propertyType?: string | string[];
    priceMin?: string;
    priceMax?: string;
    state?: string;
    city?: string;
    area?: string;
    beds?: string;
    baths?: string;
    amenities?: string | string[];
    propertyAge?: string;
    sortBy?: string;
    query?: string;
    page?: string;
    view?: ViewMode;
  };
}

export default function PropertiesPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<PropertiesLoading />}>
      <PropertiesClient searchParams={searchParams} />
    </Suspense>
  );
}

function PropertiesLoading() {
  return (
    <div className="container py-8">
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground">Cargando propiedades...</p>
      </div>
    </div>
  );
}
