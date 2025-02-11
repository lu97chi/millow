"use client";

import { PropertySort } from "@/components/properties/property-sort";
import { PropertyStats } from "@/components/properties/property-stats";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyService } from "@/server/services/property-service";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Property } from "@/server/models/property";

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

export type ViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES];

interface PropertiesClientProps {
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

export function PropertiesClient({ searchParams }: PropertiesClientProps) {
  const router = useRouter();
  const params = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const page = Number(params.get('page')) || 1;
  const limit = 20; // Show 20 properties per page
  const view = (params.get('view') as ViewMode) || VIEW_MODES.GRID;

  const updateView = useCallback((newView: ViewMode) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('view', newView);
    router.push(`/properties?${newParams.toString()}`);
  }, [params, router]);

  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      const propertyService = PropertyService.getInstance();
      const filters = {
        operationType: Array.isArray(searchParams.operationType)
          ? searchParams.operationType
          : searchParams.operationType?.split(",").filter(Boolean),
        propertyType: Array.isArray(searchParams.propertyType)
          ? searchParams.propertyType
          : searchParams.propertyType?.split(",").filter(Boolean),
        minPrice: searchParams.priceMin ? Number(searchParams.priceMin) : undefined,
        maxPrice: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
        state: searchParams.state,
        city: searchParams.city,
        area: searchParams.area,
        bedrooms: searchParams.beds ? Number(searchParams.beds) : undefined,
        bathrooms: searchParams.baths ? Number(searchParams.baths) : undefined,
        amenities: Array.isArray(searchParams.amenities)
          ? searchParams.amenities
          : searchParams.amenities?.split(",").filter(Boolean),
        propertyAge: searchParams.propertyAge ? Number(searchParams.propertyAge) : undefined,
      };

      const data = await propertyService.getProperties(filters);
      setProperties(data);
      setLoading(false);
    };

    loadProperties();
  }, [searchParams]);

  const total = properties.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedProperties = properties.slice((page - 1) * limit, page * limit);

  const createPageUrl = (pageNum: number) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('page', String(pageNum));
    return `/properties?${newParams.toString()}`;
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground">Cargando propiedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PropertyStats properties={paginatedProperties} total={total} />
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border p-1">
            <Button
              variant={view === VIEW_MODES.GRID ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updateView(VIEW_MODES.GRID)}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === VIEW_MODES.LIST ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => updateView(VIEW_MODES.LIST)}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <PropertySort />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <main className="md:col-span-12">
          {paginatedProperties.length > 0 ? (
            <>
              <div className={cn(
                "grid gap-8",
                view === VIEW_MODES.GRID ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              )}>
                {paginatedProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    view={view} 
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center gap-2">
                  {page > 1 && (
                    <Button variant="outline" size="lg" asChild>
                      <Link href={createPageUrl(page - 1)}>
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Anterior
                      </Link>
                    </Button>
                  )}
                  {page < totalPages && (
                    <Button variant="outline" size="lg" asChild>
                      <Link href={createPageUrl(page + 1)}>
                        Siguiente
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                No se encontraron propiedades con los filtros seleccionados
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 