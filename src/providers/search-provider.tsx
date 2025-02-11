"use client";

import { createContext, useContext, useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSearchStore, type PropertyFilters, initialFilters } from "@/store/use-search-store";

interface SearchContextType {
  syncWithUrl: (filters: Partial<PropertyFilters>) => void;
  parseUrlToFilters: () => Partial<PropertyFilters>;
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters | ((prev: PropertyFilters) => PropertyFilters)) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { filters, setFilters } = useSearchStore();
  const isFirstMount = useRef(true);
  const lastUrlUpdate = useRef<string>("");
  console.log("filters", filters);
  // Convert filters to URL search params
  const filtersToSearchParams = useCallback((filters: PropertyFilters): URLSearchParams => {
    const params = new URLSearchParams();

    // Only add defined values
    if (filters.query) params.set("query", filters.query);
    if (filters.propertyType.length > 0) params.set("type", filters.propertyType.join(","));
    if (filters.location.state) params.set("state", filters.location.state);
    if (filters.location.city) params.set("city", filters.location.city);
    if (filters.location.area) params.set("area", filters.location.area);
    
    // Price range - only add if defined
    if (typeof filters.priceRange?.min === 'number') {
      params.set("minPrice", String(filters.priceRange.min));
    }
    if (typeof filters.priceRange?.max === 'number') {
      params.set("maxPrice", String(filters.priceRange.max));
    }
    
    // Features - only add if defined
    if (typeof filters.features?.bedrooms === 'number') {
      params.set("beds", String(filters.features.bedrooms));
    }
    if (typeof filters.features?.bathrooms === 'number') {
      params.set("baths", String(filters.features.bathrooms));
    }
    
    // Construction size - only add if defined
    if (typeof filters.features?.constructionSize?.min === 'number') {
      params.set("minConstSize", String(filters.features.constructionSize.min));
    }
    if (typeof filters.features?.constructionSize?.max === 'number') {
      params.set("maxConstSize", String(filters.features.constructionSize.max));
    }
    
    // Lot size - only add if defined
    if (typeof filters.features?.lotSize?.min === 'number') {
      params.set("minLotSize", String(filters.features.lotSize.min));
    }
    if (typeof filters.features?.lotSize?.max === 'number') {
      params.set("maxLotSize", String(filters.features.lotSize.max));
    }
    
    // Other filters - only add if defined
    if (filters.amenities?.length > 0) {
      params.set("amenities", filters.amenities.join(","));
    }
    if (typeof filters.propertyAge === 'number') {
      params.set("age", String(filters.propertyAge));
    }
    
    // Maintenance fee - only add if defined
    if (typeof filters.maintenanceFee?.min === 'number') {
      params.set("minMaint", String(filters.maintenanceFee.min));
    }
    if (typeof filters.maintenanceFee?.max === 'number') {
      params.set("maxMaint", String(filters.maintenanceFee.max));
    }
    
    // Sort - only add if not default
    if (filters.sortBy && filters.sortBy !== "recent") {
      params.set("sort", filters.sortBy);
    }

    return params;
  }, []);

  // Parse URL search params to filters
  const parseUrlToFilters = useCallback((): Partial<PropertyFilters> => {
    if (typeof window === 'undefined') return {};
    
    const params = new URLSearchParams(window.location.search);
    const newFilters: Partial<PropertyFilters> = {};

    // Basic filters
    const query = params.get("query");
    const type = params.get("type");
    const state = params.get("state") as string | null;
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
  }, []);

  // Initialize from URL on mount
  useEffect(() => {
    if (isFirstMount.current && typeof window !== 'undefined') {
      const urlFilters = parseUrlToFilters();
      setFilters(current => ({ ...current, ...urlFilters }));
      isFirstMount.current = false;
      lastUrlUpdate.current = window.location.search;
    }
  }, [parseUrlToFilters, setFilters]);

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

  // Sync filters with URL
  const syncWithUrl = useCallback((newFilters: Partial<PropertyFilters>) => {
    const params = filtersToSearchParams({ ...filters, ...newFilters });
    const newUrl = `${pathname}?${params.toString()}`;
    
    // Only update if URL has changed
    if (newUrl !== lastUrlUpdate.current) {
      lastUrlUpdate.current = newUrl;
      router.replace(newUrl, { scroll: false });
    }
  }, [filtersToSearchParams, filters, pathname, router]);

  return (
    <SearchContext.Provider value={{ syncWithUrl, parseUrlToFilters, filters, setFilters }}>
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