"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "@/store/use-search-store";
import { Suspense } from "react";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertySort } from "@/components/properties/property-sort";
import { PropertyStats } from "@/components/properties/property-stats";
import { SAMPLE_PROPERTIES, MexicanState } from "@/constants/properties";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { setFilters } = useSearchStore();

  // Initialize filters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Parse URL parameters
    const urlFilters = {
      query: params.get("query") || "",
      propertyType: params.get("type")?.split(",") || [],
      location: {
        state: params.get("state") as MexicanState | undefined,
        city: params.get("city") || undefined,
        area: params.get("area") || undefined,
      },
      priceRange: {
        min: Number(params.get("minPrice")) || 0,
        max: Number(params.get("maxPrice")) || 100000000,
      },
      features: {
        bedrooms: params.get("beds") ? Number(params.get("beds")) : undefined,
        bathrooms: params.get("baths") ? Number(params.get("baths")) : undefined,
        constructionSize: {
          min: Number(params.get("minConstSize")) || 0,
          max: Number(params.get("maxConstSize")) || 1000,
        },
        lotSize: {
          min: Number(params.get("minLotSize")) || 0,
          max: Number(params.get("maxLotSize")) || 2000,
        },
      },
      amenities: params.get("amenities")?.split(",") || [],
      propertyAge: params.get("age") ? Number(params.get("age")) : undefined,
      maintenanceFee: params.get("minMaint") || params.get("maxMaint") ? {
        min: Number(params.get("minMaint")) || 0,
        max: Number(params.get("maxMaint")) || 10000,
      } : undefined,
      sortBy: (params.get("sort") as "recent" | "price-asc" | "price-desc") || "recent",
    };

    setFilters(urlFilters);
  }, [searchParams, setFilters]);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex-none h-16 border-b bg-background">
        <div className="container flex h-full items-center justify-between">
          <Suspense fallback={<Skeleton className="h-8 w-[200px]" />}>
            <PropertyStats properties={SAMPLE_PROPERTIES} />
          </Suspense>
          <PropertySort />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          <Suspense 
            fallback={
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array(6).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-[400px] w-full" />
                ))}
              </div>
            }
          >
            <PropertyGrid properties={SAMPLE_PROPERTIES} />
          </Suspense>
        </div>
      </main>
    </div>
  );
} 