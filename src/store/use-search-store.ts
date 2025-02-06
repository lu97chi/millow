import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { z } from 'zod';
import { MexicanState } from '@/constants/properties';

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

const urlParamsSchema = z.object({
  propertyType: z.array(z.string()).optional(),
  priceMin: z.coerce.number().min(0).optional(),
  priceMax: z.coerce.number().min(0).optional(),
  state: z.enum(['Aguascalientes', 'Baja California', /* add all Mexican states */]).optional(),
  city: z.string().optional(),
  bedrooms: z.coerce.number().min(0).optional(),
  bathrooms: z.coerce.number().min(0).optional(),
  amenities: z.array(z.string()).optional(),
  propertyAge: z.coerce.number().optional(),
  sortBy: z.enum(['recent', 'price-asc', 'price-desc']).optional(),
  query: z.string().optional(),
});

export const initialFilters: PropertyFilters = {
  query: '',
  location: {},
  propertyType: [],
  priceRange: {
    min: 0,
    max: 100000000,
  },
  features: {
    bedrooms: undefined,
    bathrooms: undefined,
    constructionSize: {
      min: 0,
      max: 1000,
    },
    lotSize: {
      min: 0,
      max: 2000,
    },
  },
  amenities: [],
  sortBy: 'recent',
  propertyAge: undefined,
  maintenanceFee: undefined,
};

interface SearchState {
  filters: PropertyFilters;
  setFilters: (filters: PropertyFilters | ((prev: PropertyFilters) => PropertyFilters)) => void;
  resetFilters: () => void;
  setPropertyTypes: (types: string[]) => void;
  setPriceRange: (range: PriceRange) => void;
  setLocation: (location: Partial<Location>) => void;
  setFeatures: (features: Partial<Features>) => void;
  setAmenities: (amenities: string[]) => void;
  setSortBy: (sortBy: PropertyFilters['sortBy']) => void;
  setQuery: (query: string) => void;
  setPropertyAge: (age: number | undefined) => void;
  setMaintenanceFee: (fee: PriceRange | undefined) => void;
  initFromUrl: (searchParams: URLSearchParams) => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      filters: initialFilters,
      setFilters: (newFilters) => {
        if (typeof newFilters === 'function') {
          set((state) => ({ filters: newFilters(state.filters) }));
        } else {
          set({ filters: newFilters });
        }
      },
      resetFilters: () => {
        set({ filters: initialFilters });
      },
      setPropertyTypes: (types) => {
        set((state) => ({
          filters: {
            ...state.filters,
            propertyType: types,
          },
        }));
      },
      setPriceRange: (range) => {
        set((state) => ({
          filters: {
            ...state.filters,
            priceRange: range,
          },
        }));
      },
      setLocation: (location) => {
        set((state) => ({
          filters: {
            ...state.filters,
            location: { ...state.filters.location, ...location },
          },
        }));
      },
      setFeatures: (features) => {
        set((state) => ({
          filters: {
            ...state.filters,
            features: { ...state.filters.features, ...features },
          },
        }));
      },
      setAmenities: (amenities) => {
        set((state) => ({
          filters: {
            ...state.filters,
            amenities,
          },
        }));
      },
      setSortBy: (sortBy) => {
        set((state) => ({
          filters: {
            ...state.filters,
            sortBy,
          },
        }));
      },
      setQuery: (query) => {
        set((state) => ({
          filters: {
            ...state.filters,
            query,
          },
        }));
      },
      setPropertyAge: (age) => {
        set((state) => ({
          filters: {
            ...state.filters,
            propertyAge: age,
          },
        }));
      },
      setMaintenanceFee: (fee) => {
        set((state) => ({
          filters: {
            ...state.filters,
            maintenanceFee: fee,
          },
        }));
      },
      initFromUrl: (searchParams) => {
        try {
          const params = Object.fromEntries(searchParams.entries());
          const validParams = urlParamsSchema.safeParse({
            propertyType: params.propertyType?.split(','),
            priceMin: params.priceMin,
            priceMax: params.priceMax,
            state: params.state,
            city: params.city,
            bedrooms: params.bedrooms,
            bathrooms: params.bathrooms,
            amenities: params.amenities?.split(','),
            propertyAge: params.propertyAge,
            sortBy: params.sortBy,
            query: params.query,
          });

          if (!validParams.success) {
            console.warn('Invalid URL parameters:', validParams.error);
            return;
          }

          const data = validParams.data;
          const newFilters = { ...initialFilters };

          if (data.propertyType) newFilters.propertyType = data.propertyType;
          if (data.priceMin !== undefined || data.priceMax !== undefined) {
            newFilters.priceRange = {
              min: data.priceMin ?? initialFilters.priceRange.min,
              max: data.priceMax ?? initialFilters.priceRange.max,
            };
          }
          if (data.state || data.city) {
            newFilters.location = {
              ...initialFilters.location,
              ...(data.state && { state: data.state }),
              ...(data.city && { city: data.city }),
            };
          }
          if (data.bedrooms || data.bathrooms) {
            newFilters.features = {
              ...initialFilters.features,
              ...(data.bedrooms && { bedrooms: data.bedrooms }),
              ...(data.bathrooms && { bathrooms: data.bathrooms }),
            };
          }
          if (data.amenities) newFilters.amenities = data.amenities;
          if (data.propertyAge !== undefined) newFilters.propertyAge = data.propertyAge;
          if (data.sortBy) newFilters.sortBy = data.sortBy;
          if (data.query) newFilters.query = data.query;

          set({ filters: newFilters });
        } catch (error) {
          console.error('Error parsing URL parameters:', error);
        }
      },
    }),
    { name: 'search-store' }
  )
); 