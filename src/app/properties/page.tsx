"use client";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PROPERTIES } from "@/constants/properties";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSearchStore } from "@/store/use-search-store";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertySort } from "@/components/properties/property-sort";
import { PropertyStats } from "@/components/properties/property-stats";
import type { MexicanState } from "@/constants/properties";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesLoading />}>
      <PropertiesContent />
    </Suspense>
  );
}

function PropertiesLoading() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex-none h-16 border-b bg-background">
        <div className="container flex h-full items-center justify-between">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-10 w-[150px]" />
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array(6).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-[400px] w-full" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}


function PropertiesContent() {
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
        min: Number(params.get("minPrice")) || undefined,
        max: Number(params.get("maxPrice")) || undefined,
      },
      features: {
        bedrooms: params.get("beds") ? Number(params.get("beds")) : undefined,
        bathrooms: params.get("baths") ? Number(params.get("baths")) : undefined,
        constructionSize: {
          min: Number(params.get("minConstSize")) || undefined,
          max: Number(params.get("maxConstSize")) || undefined,
        },
        lotSize: {
          min: Number(params.get("minLotSize")) || undefined,
          max: Number(params.get("maxLotSize")) || undefined,
        },
      },
      amenities: params.get("amenities")?.split(",") || [],
      propertyAge: params.get("age") ? Number(params.get("age")) : undefined,
      maintenanceFee: params.get("minMaint") || params.get("maxMaint") ? {
        min: Number(params.get("minMaint")) || undefined,
        max: Number(params.get("maxMaint")) || undefined,
      } : undefined,
      sortBy: (params.get("sort") as "recent" | "price-asc" | "price-desc") || "recent",
    };

    setFilters(urlFilters);
  }, [searchParams, setFilters]);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex-none h-16 border-b bg-background">
        <div className="container flex h-full items-center justify-between">
          <PropertyStats properties={SAMPLE_PROPERTIES} />
          <PropertySort />
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          <PropertyGrid properties={SAMPLE_PROPERTIES} />
        </div>
      </main>
    </div>
  );
} 