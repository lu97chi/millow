import { ALL_PROPERTIES } from "../data/guadalajara";
import type { Property } from "../models/property";
import { PROPERTY_TYPES } from "../data/constants";

// Initialize properties once
const PROPERTIES = ALL_PROPERTIES;

export interface PropertyFilters {
  title?: string;
  description?: string;
  propertyType?: string;
  operationType?: string;
  type?: string;
  price?: number;
  state?: string;
  city?: string;
  area?: string;
  address?: string;
  lat?:string;
  lng?:string;
  bedrooms?: number;
  bathrooms?: number;
  constructionSize?: number;
  lotSize?: number;
  parking?: number;
  floors?: number;
  amenities?: string[];
  propertyAge?: number;
  maintenanceFee?: number;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class PropertyService {
  private static instance: PropertyService;
  private properties: Property[];

  private constructor() {
    this.properties = PROPERTIES;
  }

  public static getInstance(): PropertyService {
    if (!PropertyService.instance) {
      PropertyService.instance = new PropertyService();
    }
    return PropertyService.instance;
  }

  public async getPropertyById(id: string): Promise<Property | null> {
    const property = this.properties.find((p) => p.id === id);
    return property || null;
  }

  public async getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
    let filteredProperties = [...this.properties];

    // Property type filter
    if (filters.propertyType) {
      console.log('Filtering by property type:', filters.propertyType);
      filteredProperties = filteredProperties.filter(property => {
        // Find the property type in our constants
        const propertyTypeConstant = PROPERTY_TYPES.find(
          t => t.value === property.propertyType || t.name === property.propertyType
        );
        
        if (!propertyTypeConstant) {
          console.log('No matching property type found for:', property.propertyType);
          return false;
        }

        // Check if the filter value matches either the name or value
        const matchesName = propertyTypeConstant.name.toLowerCase() === filters.propertyType?.toLowerCase();
        const matchesValue = propertyTypeConstant.value.toLowerCase() === filters.propertyType?.toLowerCase();
        return matchesName || matchesValue;
      });
      console.log('Properties after type filtering:', filteredProperties.length);
    }

    // Operation type filter
    if (filters.operationType) {
      filteredProperties = filteredProperties.filter(property =>
        property.operationType.toLowerCase() === filters.operationType?.toLowerCase()
      );
    }

    // Price filter
    if (filters.price) {
      filteredProperties = filteredProperties.filter(
        property => property.price === filters.price
      );
    }

    // Location filters
    if (filters.state) {
      filteredProperties = filteredProperties.filter(
        property => property.location.state.toLowerCase() === filters.state!.toLowerCase()
      );
    }
    if (filters.city) {
      filteredProperties = filteredProperties.filter(
        property => property.location.city.toLowerCase() === filters.city!.toLowerCase()
      );
    }
    if (filters.area) {
      filteredProperties = filteredProperties.filter(
        property => property.location.area.toLowerCase() === filters.area!.toLowerCase()
      );
    }

    // Features filters
    if (filters.bedrooms) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.features.bedrooms !== null && 
          property.features.bedrooms >= filters.bedrooms!
      );
    }

    if (filters.bathrooms) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.features.bathrooms !== null && 
          property.features.bathrooms >= filters.bathrooms!
      );
    }

    if (filters.constructionSize) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.features.constructionSize !== null && 
          property.features.constructionSize >= filters.constructionSize!
      );
    }

    if (filters.lotSize) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.features.lotSize !== null && 
          property.features.lotSize >= filters.lotSize!
      );
    }

    if (filters.parking) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.features.parking !== null && 
          property.features.parking >= filters.parking!
      );
    }

    if (filters.floors) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.features.floors !== null && 
          property.features.floors >= filters.floors!
      );
    }

    // Amenities filter
    if (filters.amenities?.length) {
      filteredProperties = filteredProperties.filter(property =>
        filters.amenities!.every(amenity => 
          property.amenities.some(a => a.toLowerCase() === amenity.toLowerCase())
        )
      );
    }

    // Property age filter
    if (filters.propertyAge !== undefined) {
      filteredProperties = filteredProperties.filter(
        property => property.propertyAge === filters.propertyAge
      );
    }

    // Maintenance fee filter
    if (filters.maintenanceFee !== undefined) {
      filteredProperties = filteredProperties.filter(
        property => 
          property.maintenanceFee !== null && 
          property.maintenanceFee === filters.maintenanceFee
      );
    }

    // Status filter
    if (filters.status) {
      filteredProperties = filteredProperties.filter(
        property => property.status === filters.status
      );
    }

    return filteredProperties;
  }

  public async getPropertyTypes(): Promise<{ value: string; count: number }[]> {
    const typeCounts = this.properties.reduce((acc, property) => {
      acc[property.propertyType] = (acc[property.propertyType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(typeCounts).map(([value, count]) => ({
      value,
      count,
    }));
  }

  public async getLocations(): Promise<{
    states: string[];
    cities: Record<string, string[]>;
    areas: Record<string, Record<string, string[]>>;
  }> {
    const locations = this.properties.reduce(
      (acc, property) => {
        const { state, city, area } = property.location;

        // Add state if not exists
        if (!acc.states.includes(state)) {
          acc.states.push(state);
        }

        // Add city if not exists
        if (!acc.cities[state]) {
          acc.cities[state] = [];
        }
        if (!acc.cities[state].includes(city)) {
          acc.cities[state].push(city);
        }

        // Add area if not exists
        if (!acc.areas[state]) {
          acc.areas[state] = {};
        }
        if (!acc.areas[state][city]) {
          acc.areas[state][city] = [];
        }
        if (!acc.areas[state][city].includes(area)) {
          acc.areas[state][city].push(area);
        }

        return acc;
      },
      {
        states: [] as string[],
        cities: {} as Record<string, string[]>,
        areas: {} as Record<string, Record<string, string[]>>,
      }
    );

    // Sort all arrays
    locations.states.sort();
    Object.values(locations.cities).forEach((cities) => cities.sort());
    Object.values(locations.areas).forEach((cityAreas) =>
      Object.values(cityAreas).forEach((areas) => areas.sort())
    );

    return locations;
  }

  public async getPropertyStats(): Promise<{
    totalProperties: number;
    averagePrice: number;
    averageSize: number;
    priceRange: { min: number; max: number };
    sizeRange: { min: number; max: number };
  }> {
    const stats = this.properties.reduce(
      (acc, property) => {
        // Update total price and count for average
        acc.totalPrice += property.price;
        acc.totalSize += property.features.constructionSize ?? 0;

        // Update price range
        acc.priceRange.min = Math.min(acc.priceRange.min, property.price);
        acc.priceRange.max = Math.max(acc.priceRange.max, property.price);

        // Update size range
        const size = property.features.constructionSize ?? 0;
        acc.sizeRange.min = Math.min(acc.sizeRange.min, size);
        acc.sizeRange.max = Math.max(acc.sizeRange.max, size);

        return acc;
      },
      {
        totalPrice: 0,
        totalSize: 0,
        priceRange: { min: Infinity, max: -Infinity },
        sizeRange: { min: Infinity, max: -Infinity },
      }
    );

    return {
      totalProperties: this.properties.length,
      averagePrice: Math.round(stats.totalPrice / this.properties.length),
      averageSize: Math.round(stats.totalSize / this.properties.length),
      priceRange: stats.priceRange,
      sizeRange: stats.sizeRange,
    };
  }

  public async getFeaturedProperties(): Promise<Property[]> {
    // For now, return the first 6 properties or all if less than 6
    return this.properties.slice(0, 6);
  }
}
