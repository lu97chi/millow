import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { MexicanState } from '@/constants/properties';
import { PRICE_RANGE } from '@/constants/properties';

export interface Location {
  state?: MexicanState;
  city?: string;
  area?: string;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface SizeRange {
  min: number;
  max: number;
}

export interface Features {
  bedrooms?: number;
  bathrooms?: number;
  constructionSize?: SizeRange;
  lotSize?: SizeRange;
}

export interface PropertyFilters {
  query: string;
  location: Location;
  propertyType: string[];
  priceRange: PriceRange;
  features: Features;
  amenities: string[];
  sortBy: 'recent' | 'price-asc' | 'price-desc';
  propertyAge?: number;
  maintenanceFee?: PriceRange;
}

interface SearchState {
  filters: PropertyFilters;
  setFilters: (filters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  setPropertyTypes: (types: string[]) => void;
  setPriceRange: (range: PriceRange) => void;
  setLocation: (location: Partial<Location>) => void;
  setFeatures: (features: Partial<Features>) => void;
  setAmenities: (amenities: string[]) => void;
  setSortBy: (sortBy: PropertyFilters['sortBy']) => void;
  setQuery: (query: string) => void;
  setPropertyAge: (age: number | undefined) => void;
  setMaintenanceFee: (fee: PriceRange) => void;
}

const initialFilters: PropertyFilters = {
  query: '',
  location: {},
  propertyType: [],
  priceRange: {
    min: PRICE_RANGE.min,
    max: PRICE_RANGE.max,
  },
  features: {},
  amenities: [],
  sortBy: 'recent',
};

export const useSearchStore = create<SearchState>()(
  devtools(
    persist(
      (set) => ({
        filters: initialFilters,
        setFilters: (newFilters) =>
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          })),
        resetFilters: () => set({ filters: initialFilters }),
        setPropertyTypes: (types) =>
          set((state) => ({
            filters: { ...state.filters, propertyType: types },
          })),
        setPriceRange: (range) =>
          set((state) => ({
            filters: { ...state.filters, priceRange: range },
          })),
        setLocation: (location) =>
          set((state) => ({
            filters: {
              ...state.filters,
              location: { ...state.filters.location, ...location },
            },
          })),
        setFeatures: (features) =>
          set((state) => ({
            filters: {
              ...state.filters,
              features: { ...state.filters.features, ...features },
            },
          })),
        setAmenities: (amenities) =>
          set((state) => ({
            filters: { ...state.filters, amenities },
          })),
        setSortBy: (sortBy) =>
          set((state) => ({
            filters: { ...state.filters, sortBy },
          })),
        setQuery: (query) =>
          set((state) => ({
            filters: { ...state.filters, query },
          })),
        setPropertyAge: (age) =>
          set((state) => ({
            filters: { ...state.filters, propertyAge: age },
          })),
        setMaintenanceFee: (fee) =>
          set((state) => ({
            filters: { ...state.filters, maintenanceFee: fee },
          })),
      }),
      {
        name: 'property-search-storage',
        partialize: (state) => ({ filters: state.filters }),
      }
    )
  )
); 