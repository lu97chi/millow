import type {
  Property,
  PropertyFilters
} from "@/types";
import { ALL_PROPERTIES } from "../data/guadalajara";

// Initialize properties once
const PROPERTIES = ALL_PROPERTIES;

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

  public async getFeaturedProperties(): Promise<Property[]> {
    // For now, just return the first 6 properties
    return this.properties.slice(0, 6);
  }

  public async getProperties(
    filters: Partial<PropertyFilters> = {}
  ): Promise<Property[]> {
    console.log('Initial properties count:', this.properties.length);
    let filteredProperties = [...this.properties];
    console.log('Initial filters:', filters);

    // ID filter
    if (filters.id?.trim()) {
      filteredProperties = filteredProperties.filter(
        (property) => property.id.toLowerCase() === filters.id!.toLowerCase()
      );
    }

    // Title filter - case insensitive partial match
    if (filters.title?.trim()) {
      filteredProperties = filteredProperties.filter(
        (property) => property.title.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }

    // Description filter - case insensitive partial match
    if (filters.description?.trim()) {
      filteredProperties = filteredProperties.filter(
        (property) => property.description.toLowerCase().includes(filters.description!.toLowerCase())
      );
    }

    // Property type filter - can match multiple types
    if (filters.propertyType?.length) {
      console.log('Filtering by property types:', filters.propertyType);
      const lowerPropertyTypes = filters.propertyType.map(type => type.toLowerCase());
      filteredProperties = filteredProperties.filter(
        (property) => lowerPropertyTypes.includes(property.propertyType.toLowerCase())
      );
      console.log('Properties after type filter:', filteredProperties.length);
    }

    // Operation type filter - can match multiple types
    if (filters.operationType?.length) {
      const lowerOperationTypes = filters.operationType.map(type => type.toLowerCase());
      filteredProperties = filteredProperties.filter(
        (property) => lowerOperationTypes.includes(property.operationType.toLowerCase())
      );
    }

    // Entity type filter - can match multiple types
    if (filters.type?.length) {
      const lowerTypes = filters.type.map(type => type.toLowerCase());
      filteredProperties = filteredProperties.filter(
        (property) => lowerTypes.includes(property.type.toLowerCase())
      );
    }

    // Price filters
    if (filters.price !== undefined && filters.price > 0) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price === filters.price
      );
    }

    if (filters.minPrice !== undefined && filters.minPrice > 0) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
      filteredProperties = filteredProperties.filter(
        (property) => property.price <= filters.maxPrice!
      );
    }

    // Location filters - case insensitive matching with multiple options
    if (filters.location) {
      if (filters.location.state?.length) {
        const lowerStates = filters.location.state.map(state => state.toLowerCase());
        filteredProperties = filteredProperties.filter(
          (property) => lowerStates.includes(property.location.state.toLowerCase())
        );
      }
      if (filters.location.city?.length) {
        const lowerCities = filters.location.city.map(city => city.toLowerCase());
        filteredProperties = filteredProperties.filter(
          (property) => lowerCities.includes(property.location.city.toLowerCase())
        );
      }
      if (filters.location.area?.length) {
        const lowerAreas = filters.location.area.map(area => area.toLowerCase());
        filteredProperties = filteredProperties.filter(
          (property) => lowerAreas.includes(property.location.area.toLowerCase())
        );
      }
      if (filters.location.address?.trim()) {
        filteredProperties = filteredProperties.filter(
          (property) => property.location.address.toLowerCase().includes(filters.location!.address!.toLowerCase())
        );
      }
      // Coordinates filtering with radius (optional)
      if (filters.location.coordinates?.lat && filters.location.coordinates?.lng) {
        // You might want to implement a radius-based search here
        // For now, we'll just match exact coordinates
        filteredProperties = filteredProperties.filter(
          (property) => 
            property.location.coordinates.lat === filters.location!.coordinates!.lat &&
            property.location.coordinates.lng === filters.location!.coordinates!.lng
        );
      }
    }

    // Features filters - handle ranges and null values
    if (filters.features?.bedrooms !== undefined && filters.features?.bedrooms !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.bedrooms !== null &&
          property.features.bedrooms >= filters.features!.bedrooms!
      );
    }

    if (filters.features?.bathrooms !== undefined && filters.features?.bathrooms !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.bathrooms !== null &&
          property.features.bathrooms >= filters.features!.bathrooms!
      );
    }

    if (filters.features?.constructionSize?.min !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.constructionSize !== null &&
          property.features.constructionSize >= filters.features!.constructionSize!.min!
      );
    }

    if (filters.features?.constructionSize?.max !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.constructionSize !== null &&
          property.features.constructionSize <= filters.features!.constructionSize!.max!
      );
    }

    if (filters.features?.lotSize?.min !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.lotSize !== null &&
          property.features.lotSize >= filters.features!.lotSize!.min!
      );
    }

    if (filters.features?.lotSize?.max !== undefined) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.lotSize !== null &&
          property.features.lotSize <= filters.features!.lotSize!.max!
      );
    }

    if (filters.features?.parking !== undefined && filters.features?.parking !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.parking !== null &&
          property.features.parking >= filters.features!.parking!
      );
    }

    if (filters.features?.floors !== undefined && filters.features?.floors !== null) {
      filteredProperties = filteredProperties.filter(
        (property) => property.features.floors !== null &&
          property.features.floors >= filters.features!.floors!
      );
    }

    // Amenities filter - must have all requested amenities
    if (filters.amenities?.length) {
      const lowerAmenities = filters.amenities.map(amenity => amenity.toLowerCase());
      filteredProperties = filteredProperties.filter((property) =>
        lowerAmenities.every((amenity) =>
          property.amenities.some(propAmenity => 
            propAmenity.toLowerCase() === amenity
          )
        )
      );
    }

    // Property age filter
    if (filters.propertyAge !== undefined && filters.propertyAge > 0) {
      filteredProperties = filteredProperties.filter(
        (property) => property.propertyAge <= filters.propertyAge!
      );
    }

    // Maintenance fee range filter
    if (filters.maintenanceFee) {
      if (filters.maintenanceFee.min !== undefined) {
        filteredProperties = filteredProperties.filter(
          (property) => property.maintenanceFee !== null &&
            property.maintenanceFee >= filters.maintenanceFee!.min!
        );
      }
      if (filters.maintenanceFee.max !== undefined) {
        filteredProperties = filteredProperties.filter(
          (property) => property.maintenanceFee !== null &&
            property.maintenanceFee <= filters.maintenanceFee!.max!
        );
      }
    }

    // Status filter - can match multiple statuses
    if (filters.status?.length) {
      const lowerStatuses = filters.status.map(status => status.toLowerCase());
      filteredProperties = filteredProperties.filter(
        (property) => lowerStatuses.includes(property.status.toLowerCase())
      );
    }

    // Sort if specified
    if (filters.sortBy) {
      const [field, direction] = filters.sortBy.split(' ');
      filteredProperties.sort((a, b) => {
        const multiplier = direction === 'asc' ? 1 : -1;
        if (field === 'price') {
          return (a.price - b.price) * multiplier;
        } else if (field === 'age') {
          return (a.propertyAge - b.propertyAge) * multiplier;
        }
        return 0;
      });
    }

    console.log('Final filtered properties count:', filteredProperties.length);
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

  public async getPropertiesByLocation(area: string): Promise<Property[]> {
    return this.properties.filter(
      (property) => property.location.area.toLowerCase() === area.toLowerCase()
    );
  }
}
