"use client";

import { createContext, useContext, useCallback, useEffect, useRef, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { 
  OperationType, 
  Amenity, 
  PropertyFilters,
  PropertyTypeName,
  PropertyEntityType,
  PropertyStatus
} from "@/types";

interface SearchContextType {
  filters: Partial<PropertyFilters>;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  syncWithUrl: () => void;
  parseUrlToFilters: () => Partial<PropertyFilters>;
  filtersToSearchParams: (filters: Partial<PropertyFilters>) => URLSearchParams;
}

const SearchContext = createContext<SearchContextType | null>(null);

// Separate the content into its own component
function SearchProviderContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse URL search params to filters
  const parseUrlToFilters = useCallback((): Partial<PropertyFilters> => {
    const newFilters: Partial<PropertyFilters> = {};

    // Property type and operation type
    const propertyType = searchParams.get("propertyType");
    const operationType = searchParams.get("operationType");
    const type = searchParams.get("type");

    if (propertyType) newFilters.propertyType = propertyType.split(",") as PropertyTypeName[];
    if (operationType) newFilters.operationType = operationType.split(",") as OperationType[];
    if (type) newFilters.type = type.split(",") as PropertyEntityType[];
    
    // Location
    const state = searchParams.get("state");
    const city = searchParams.get("city");
    const area = searchParams.get("area");
    const address = searchParams.get("address");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    if (state || city || area || address || lat || lng) {
      newFilters.location = {
        state: state ? state.split(",") : [],
        city: city ? city.split(",") : [],
        area: area ? area.split(",") : [],
        address: address || "",
        coordinates: lat || lng ? {
          lat: lat ? parseFloat(lat) : undefined,
          lng: lng ? parseFloat(lng) : undefined,
        } : undefined
      };
    }

    // Price filters
    const price = searchParams.get("price");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (price) newFilters.price = parseInt(price);
    if (minPrice) newFilters.minPrice = parseInt(minPrice);
    if (maxPrice) newFilters.maxPrice = parseInt(maxPrice);

    // Features
    const features: Partial<PropertyFilters['features']> = {};
    let hasFeatures = false;

    const bedrooms = searchParams.get("bedrooms");
    const bathrooms = searchParams.get("bathrooms");
    const parking = searchParams.get("parking");
    const floors = searchParams.get("floors");

    if (bedrooms) { features.bedrooms = parseInt(bedrooms); hasFeatures = true; }
    if (bathrooms) { features.bathrooms = parseInt(bathrooms); hasFeatures = true; }
    if (parking) { features.parking = parseInt(parking); hasFeatures = true; }
    if (floors) { features.floors = parseInt(floors); hasFeatures = true; }

    // Construction Size
    const minConstructionSize = searchParams.get("minConstructionSize");
    const maxConstructionSize = searchParams.get("maxConstructionSize");
    if (minConstructionSize || maxConstructionSize) {
      features.constructionSize = {
        min: minConstructionSize ? parseInt(minConstructionSize) : undefined,
        max: maxConstructionSize ? parseInt(maxConstructionSize) : undefined,
      };
      hasFeatures = true;
    }

    // Lot Size
    const minLotSize = searchParams.get("minLotSize");
    const maxLotSize = searchParams.get("maxLotSize");
    if (minLotSize || maxLotSize) {
      features.lotSize = {
        min: minLotSize ? parseInt(minLotSize) : undefined,
        max: maxLotSize ? parseInt(maxLotSize) : undefined,
      };
      hasFeatures = true;
    }

    if (hasFeatures) {
      newFilters.features = features;
    }

    // Amenities
    const amenities = searchParams.get("amenities");
    if (amenities) newFilters.amenities = amenities.split(",") as Amenity[];

    // Property age
    const propertyAge = searchParams.get("propertyAge");
    if (propertyAge) newFilters.propertyAge = parseInt(propertyAge);

    // Maintenance fee
    const minMaintenanceFee = searchParams.get("minMaintenanceFee");
    const maxMaintenanceFee = searchParams.get("maxMaintenanceFee");
    if (minMaintenanceFee || maxMaintenanceFee) {
      newFilters.maintenanceFee = {
        min: minMaintenanceFee ? parseInt(minMaintenanceFee) : undefined,
        max: maxMaintenanceFee ? parseInt(maxMaintenanceFee) : undefined,
      };
    }

    // Status
    const status = searchParams.get("status");
    if (status) newFilters.status = status.split(",") as PropertyStatus[];

    // View mode and sort
    const view = searchParams.get("view");
    const sort = searchParams.get("sort");
    if (view) newFilters.viewMode = view as "grid" | "list";
    if (sort) newFilters.sortBy = sort as 'price asc' | 'price desc' | 'age asc' | 'age desc';

    return newFilters;
  }, [searchParams]);

  const [filters, setFilters] = useState<Partial<PropertyFilters>>(() => parseUrlToFilters());
  const isFirstMount = useRef(true);
  const lastUrlUpdate = useRef<string>(searchParams.toString());

  // Convert filters to URL search params
  const filtersToSearchParams = useCallback((filters: Partial<PropertyFilters>): URLSearchParams => {
    const params = new URLSearchParams(searchParams.toString());

    // Helper function to handle array parameters
    const setArrayParam = (key: string, values: string[] | undefined) => {
      if (values && values.length > 0) {
        // Remove duplicates and empty values
        const uniqueValues = Array.from(new Set(values.filter(Boolean)));
        if (uniqueValues.length > 0) {
          params.set(key, uniqueValues.join(","));
        } else {
          params.delete(key);
        }
      } else {
        params.delete(key);
      }
    };

    // Property type and operation type
    setArrayParam("propertyType", filters.propertyType);
    setArrayParam("operationType", filters.operationType);
    setArrayParam("type", filters.type);
    
    // Location filters
    if (filters.location) {
      setArrayParam("state", filters.location.state);
      setArrayParam("city", filters.location.city);
      setArrayParam("area", filters.location.area);
      
      if (filters.location.address?.trim()) {
        params.set("address", filters.location.address.trim());
      } else {
        params.delete("address");
      }
      
      if (filters.location.coordinates?.lat) {
        params.set("lat", String(filters.location.coordinates.lat));
      } else {
        params.delete("lat");
      }
      
      if (filters.location.coordinates?.lng) {
        params.set("lng", String(filters.location.coordinates.lng));
      } else {
        params.delete("lng");
      }
    } else {
      params.delete("state");
      params.delete("city");
      params.delete("area");
      params.delete("address");
      params.delete("lat");
      params.delete("lng");
    }
    
    // Price filters
    if (filters.price !== undefined && filters.price > 0) {
      params.set("price", String(filters.price));
    } else {
      params.delete("price");
    }
    
    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      params.set("minPrice", String(filters.minPrice));
    } else {
      params.delete("minPrice");
    }
    
    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      params.set("maxPrice", String(filters.maxPrice));
    } else {
      params.delete("maxPrice");
    }

    // Features
    if (filters.features) {
      if (filters.features.bedrooms !== undefined && filters.features.bedrooms !== null) {
        params.set("bedrooms", String(filters.features.bedrooms));
      } else {
        params.delete("bedrooms");
      }
      
      if (filters.features.bathrooms !== undefined && filters.features.bathrooms !== null) {
        params.set("bathrooms", String(filters.features.bathrooms));
      } else {
        params.delete("bathrooms");
      }
      
      if (filters.features.constructionSize?.min !== undefined && filters.features.constructionSize.min > 0) {
        params.set("minConstructionSize", String(filters.features.constructionSize.min));
      } else {
        params.delete("minConstructionSize");
      }
      
      if (filters.features.constructionSize?.max !== undefined && filters.features.constructionSize.max > 0) {
        params.set("maxConstructionSize", String(filters.features.constructionSize.max));
      } else {
        params.delete("maxConstructionSize");
      }
      
      if (filters.features.lotSize?.min !== undefined && filters.features.lotSize.min > 0) {
        params.set("minLotSize", String(filters.features.lotSize.min));
      } else {
        params.delete("minLotSize");
      }
      
      if (filters.features.lotSize?.max !== undefined && filters.features.lotSize.max > 0) {
        params.set("maxLotSize", String(filters.features.lotSize.max));
      } else {
        params.delete("maxLotSize");
      }
      
      if (filters.features.parking !== undefined && filters.features.parking !== null) {
        params.set("parking", String(filters.features.parking));
      } else {
        params.delete("parking");
      }
      
      if (filters.features.floors !== undefined && filters.features.floors !== null) {
        params.set("floors", String(filters.features.floors));
      } else {
        params.delete("floors");
      }
    } else {
      // Clean up all feature params if no features object
      params.delete("bedrooms");
      params.delete("bathrooms");
      params.delete("minConstructionSize");
      params.delete("maxConstructionSize");
      params.delete("minLotSize");
      params.delete("maxLotSize");
      params.delete("parking");
      params.delete("floors");
    }
    
    // Amenities
    setArrayParam("amenities", filters.amenities);
    
    // Property age
    if (filters.propertyAge !== undefined && filters.propertyAge > 0) {
      params.set("propertyAge", String(filters.propertyAge));
    } else {
      params.delete("propertyAge");
    }
    
    // Maintenance fee
    if (filters.maintenanceFee?.min !== undefined && filters.maintenanceFee.min > 0) {
      params.set("minMaintenanceFee", String(filters.maintenanceFee.min));
    } else {
      params.delete("minMaintenanceFee");
    }
    
    if (filters.maintenanceFee?.max !== undefined && filters.maintenanceFee.max > 0) {
      params.set("maxMaintenanceFee", String(filters.maintenanceFee.max));
    } else {
      params.delete("maxMaintenanceFee");
    }
    
    // Status
    setArrayParam("status", filters.status);
    
    // View mode and sort
    if (filters.viewMode) {
      params.set("view", filters.viewMode);
    } else {
      params.delete("view");
    }
    
    if (filters.sortBy) {
      params.set("sort", filters.sortBy);
    } else {
      params.delete("sort");
    }

    return params;
  }, [searchParams]);

  // Initialize from URL on mount and handle URL changes
  useEffect(() => {
    const currentParams = searchParams.toString();
    if (currentParams !== lastUrlUpdate.current) {
      const urlFilters = parseUrlToFilters();
      setFilters(urlFilters);
      lastUrlUpdate.current = currentParams;
    }
  }, [searchParams, parseUrlToFilters]);

  // Update URL when filters change
  useEffect(() => {
    if (!isFirstMount.current) {
      const params = filtersToSearchParams(filters);
      const newSearch = params.toString();
      
      if (newSearch !== lastUrlUpdate.current) {
        lastUrlUpdate.current = newSearch;
        router.replace(`${pathname}${newSearch ? `?${newSearch}` : ''}`, { scroll: false });
      }
    } else {
      isFirstMount.current = false;
    }
  }, [filters, pathname, router, filtersToSearchParams]);

  // Sync filters with URL
  const syncWithUrl = useCallback(() => {
    const params = filtersToSearchParams(filters);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [filtersToSearchParams, filters, pathname, router]);

  return (
    <SearchContext.Provider value={{ syncWithUrl, parseUrlToFilters, filters, setFilters, filtersToSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
}

// Main provider component with Suspense boundary
export function SearchProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <SearchProviderContent>{children}</SearchProviderContent>
    </Suspense>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 