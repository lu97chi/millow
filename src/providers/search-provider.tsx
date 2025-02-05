"use client";

import { createContext, useContext, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSearchStore, type PropertyFilters, type Location } from "@/store/use-search-store";
import type { MexicanState } from "@/constants/property";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchContextType {
  syncWithUrl: (filters: Partial<PropertyFilters>) => void;
  parseUrlToFilters: () => Partial<PropertyFilters>;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { filters, setFilters } = useSearchStore();
  
  // Debounce filter changes to prevent too many URL updates
  const debouncedFilters = useDebounce(filters, 500);

  // Convert filters to URL search params
  const filtersToSearchParams = useCallback((filters: PropertyFilters) => {
    const params = new URLSearchParams();

    // Basic filters
    if (filters.propertyType.length > 0) params.set("type", filters.propertyType.join(","));
    if (filters.query) params.set("query", filters.query);

    // Location
    if (filters.location.state) params.set("state", filters.location.state);
    if (filters.location.city) params.set("city", filters.location.city);
    if (filters.location.area) params.set("area", filters.location.area);

    // Price Range
    if (filters.priceRange.min > 0) params.set("minPrice", filters.priceRange.min.toString());
    if (filters.priceRange.max < 10000000) params.set("maxPrice", filters.priceRange.max.toString());

    // Features
    if (filters.features.bedrooms) params.set("beds", filters.features.bedrooms.toString());
    if (filters.features.bathrooms) params.set("baths", filters.features.bathrooms.toString());
    if (filters.features.constructionSize?.min) params.set("minConstSize", filters.features.constructionSize.min.toString());
    if (filters.features.constructionSize?.max) params.set("maxConstSize", filters.features.constructionSize.max.toString());
    if (filters.features.lotSize?.min) params.set("minLotSize", filters.features.lotSize.min.toString());
    if (filters.features.lotSize?.max) params.set("maxLotSize", filters.features.lotSize.max.toString());

    // Amenities
    if (filters.amenities.length > 0) params.set("amenities", filters.amenities.join(","));

    // Additional filters
    if (filters.propertyAge !== undefined) params.set("age", filters.propertyAge.toString());
    if (filters.maintenanceFee?.min) params.set("minMaint", filters.maintenanceFee.min.toString());
    if (filters.maintenanceFee?.max) params.set("maxMaint", filters.maintenanceFee.max.toString());

    // Sorting
    if (filters.sortBy !== "recent") params.set("sort", filters.sortBy);

    return params.toString();
  }, []);

  // Parse URL search params to filters
  const parseUrlToFilters = useCallback((): Partial<PropertyFilters> => {
    const filters: Partial<PropertyFilters> = {};

    // Basic filters
    const type = searchParams.get("type");
    const query = searchParams.get("query");

    // Location
    const state = searchParams.get("state") as MexicanState | null;
    const city = searchParams.get("city");
    const area = searchParams.get("area");

    // Price Range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Features
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const minConstSize = searchParams.get("minConstSize");
    const maxConstSize = searchParams.get("maxConstSize");
    const minLotSize = searchParams.get("minLotSize");
    const maxLotSize = searchParams.get("maxLotSize");

    // Amenities
    const amenities = searchParams.get("amenities");

    // Additional filters
    const age = searchParams.get("age");
    const minMaint = searchParams.get("minMaint");
    const maxMaint = searchParams.get("maxMaint");

    // Sorting
    const sort = searchParams.get("sort");

    // Build filters object
    if (query) filters.query = query;
    if (type) filters.propertyType = type.split(",");
    
    if (state || city || area) {
      filters.location = {
        ...(state && { state }),
        ...(city && { city }),
        ...(area && { area }),
      } as Location;
    }

    if (minPrice || maxPrice) {
      filters.priceRange = {
        min: minPrice ? parseInt(minPrice) : 0,
        max: maxPrice ? parseInt(maxPrice) : 10000000,
      };
    }

    if (beds || baths || minConstSize || maxConstSize || minLotSize || maxLotSize) {
      filters.features = {
        ...(beds && { bedrooms: parseInt(beds) }),
        ...(baths && { bathrooms: parseInt(baths) }),
        ...(minConstSize || maxConstSize) && {
          constructionSize: {
            min: minConstSize ? parseInt(minConstSize) : 0,
            max: maxConstSize ? parseInt(maxConstSize) : 1000,
          }
        },
        ...(minLotSize || maxLotSize) && {
          lotSize: {
            min: minLotSize ? parseInt(minLotSize) : 0,
            max: maxLotSize ? parseInt(maxLotSize) : 2000,
          }
        }
      };
    }

    if (amenities) filters.amenities = amenities.split(",");
    
    if (age) filters.propertyAge = parseInt(age);
    
    if (minMaint || maxMaint) {
      filters.maintenanceFee = {
        min: minMaint ? parseInt(minMaint) : 0,
        max: maxMaint ? parseInt(maxMaint) : 10000,
      };
    }

    if (sort && (sort === "price-asc" || sort === "price-desc")) {
      filters.sortBy = sort;
    }

    return filters;
  }, [searchParams]);

  // Sync URL with store when filters change
  useEffect(() => {
    const searchString = filtersToSearchParams(debouncedFilters);
    const currentSearchString = searchParams.toString();

    if (searchString !== currentSearchString) {
      const url = searchString
        ? `${pathname}?${searchString}`
        : pathname;
      router.push(url, { scroll: false });
    }
  }, [debouncedFilters, pathname, router, searchParams, filtersToSearchParams]);

  // Sync store with URL on initial load and URL changes
  useEffect(() => {
    const urlFilters = parseUrlToFilters();
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, [parseUrlToFilters, setFilters]);

  // Function to manually sync filters with URL (useful for command bar and AI chat)
  const syncWithUrl = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters(newFilters);
  }, [setFilters]);

  return (
    <SearchContext.Provider value={{ syncWithUrl, parseUrlToFilters }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 