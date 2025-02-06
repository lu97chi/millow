"use client";

import { createContext, useContext, useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useSearchStore, type PropertyFilters, initialFilters } from "@/store/use-search-store";
import type { MexicanState } from "@/constants/properties";

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
  const isFirstMount = useRef(true);
  const lastUrlUpdate = useRef<string>("");

  // Convert filters to URL search params
  const filtersToSearchParams = useCallback((filters: PropertyFilters): URLSearchParams => {
    const params = new URLSearchParams();

    // Only add non-default values
    if (filters.query) params.set("query", filters.query);
    if (filters.propertyType.length > 0) params.set("type", filters.propertyType.join(","));
    if (filters.location.state) params.set("state", filters.location.state);
    if (filters.location.city) params.set("city", filters.location.city);
    if (filters.location.area) params.set("area", filters.location.area);
    
    if (filters.priceRange.min !== initialFilters.priceRange.min) {
      params.set("minPrice", filters.priceRange.min.toString());
    }
    if (filters.priceRange.max !== initialFilters.priceRange.max) {
      params.set("maxPrice", filters.priceRange.max.toString());
    }
    
    if (filters.features.bedrooms) params.set("beds", filters.features.bedrooms.toString());
    if (filters.features.bathrooms) params.set("baths", filters.features.bathrooms.toString());
    
    if (filters.features.constructionSize?.min !== initialFilters.features.constructionSize?.min) {
      params.set("minConstSize", filters.features.constructionSize!.min.toString());
    }
    if (filters.features.constructionSize?.max !== initialFilters.features.constructionSize?.max) {
      params.set("maxConstSize", filters.features.constructionSize!.max.toString());
    }
    
    if (filters.features.lotSize?.min !== initialFilters.features.lotSize?.min) {
      params.set("minLotSize", filters.features.lotSize!.min.toString());
    }
    if (filters.features.lotSize?.max !== initialFilters.features.lotSize?.max) {
      params.set("maxLotSize", filters.features.lotSize!.max.toString());
    }
    
    if (filters.amenities.length > 0) params.set("amenities", filters.amenities.join(","));
    if (filters.propertyAge !== undefined) params.set("age", filters.propertyAge.toString());
    if (filters.maintenanceFee) {
      params.set("minMaint", filters.maintenanceFee.min.toString());
      params.set("maxMaint", filters.maintenanceFee.max.toString());
    }
    if (filters.sortBy !== "recent") params.set("sort", filters.sortBy);

    return params;
  }, []);

  // Parse URL search params to filters
  const parseUrlToFilters = useCallback((): Partial<PropertyFilters> => {
    const params = new URLSearchParams(searchParams.toString());
    const newFilters: Partial<PropertyFilters> = {};

    // Basic filters
    const query = params.get("query");
    const type = params.get("type");
    const state = params.get("state") as MexicanState | null;
    const city = params.get("city");
    const area = params.get("area");

    if (query) newFilters.query = query;
    if (type) newFilters.propertyType = type.split(",");
    
    // Location
    if (state || city || area) {
      newFilters.location = {};
      if (state) newFilters.location.state = state;
      if (city) newFilters.location.city = city;
      if (area) newFilters.location.area = area;
    }

    // Price Range
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    if (minPrice || maxPrice) {
      newFilters.priceRange = {
        min: minPrice ? parseInt(minPrice) : initialFilters.priceRange.min,
        max: maxPrice ? parseInt(maxPrice) : initialFilters.priceRange.max,
      };
    }

    // Features
    const features: Partial<PropertyFilters['features']> = {};
    let hasFeatures = false;

    const beds = params.get("beds");
    const baths = params.get("baths");
    if (beds) { features.bedrooms = parseInt(beds); hasFeatures = true; }
    if (baths) { features.bathrooms = parseInt(baths); hasFeatures = true; }

    // Construction Size
    const minConstSize = params.get("minConstSize");
    const maxConstSize = params.get("maxConstSize");
    if (minConstSize || maxConstSize) {
      features.constructionSize = {
        min: minConstSize ? parseInt(minConstSize) : initialFilters.features.constructionSize!.min,
        max: maxConstSize ? parseInt(maxConstSize) : initialFilters.features.constructionSize!.max,
      };
      hasFeatures = true;
    }

    // Lot Size
    const minLotSize = params.get("minLotSize");
    const maxLotSize = params.get("maxLotSize");
    if (minLotSize || maxLotSize) {
      features.lotSize = {
        min: minLotSize ? parseInt(minLotSize) : initialFilters.features.lotSize!.min,
        max: maxLotSize ? parseInt(maxLotSize) : initialFilters.features.lotSize!.max,
      };
      hasFeatures = true;
    }

    if (hasFeatures) {
      newFilters.features = features;
    }

    // Other filters
    const amenities = params.get("amenities");
    if (amenities) newFilters.amenities = amenities.split(",");

    const age = params.get("age");
    if (age) newFilters.propertyAge = parseInt(age);

    const minMaint = params.get("minMaint");
    const maxMaint = params.get("maxMaint");
    if (minMaint || maxMaint) {
      newFilters.maintenanceFee = {
        min: minMaint ? parseInt(minMaint) : 0,
        max: maxMaint ? parseInt(maxMaint) : 10000,
      };
    }

    const sort = params.get("sort");
    if (sort && (sort === "price-asc" || sort === "price-desc")) {
      newFilters.sortBy = sort;
    }

    return newFilters;
  }, [searchParams]);

  // Initialize from URL on mount
  useEffect(() => {
    if (isFirstMount.current) {
      const urlFilters = parseUrlToFilters();
      setFilters(current => ({ ...current, ...urlFilters }));
      isFirstMount.current = false;
      lastUrlUpdate.current = searchParams.toString();
    }
  }, [parseUrlToFilters, setFilters, searchParams]);

  // Update URL when filters change
  useEffect(() => {
    if (!isFirstMount.current) {
      const params = filtersToSearchParams(filters);
      const newSearch = params.toString();

      // Only update if the URL actually changed and it's different from the last update
      if (newSearch !== lastUrlUpdate.current) {
        lastUrlUpdate.current = newSearch;
        router.replace(`${pathname}${newSearch ? `?${newSearch}` : ''}`, { scroll: false });
      }
    }
  }, [filters, pathname, router, filtersToSearchParams]);

  const syncWithUrl = useCallback((newFilters: Partial<PropertyFilters>) => {
    setFilters(current => ({
      ...current,
      ...newFilters
    }));
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