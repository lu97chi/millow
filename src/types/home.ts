import { LocationDistribution, PriceRange, Property } from "./properties";

export interface HomepageStatistics {
    totalProperties: number;
    availableProperties: number;
    soldProperties: number;
    rentedProperties: number;
    averagePrice: number;
    priceRange: PriceRange;
    propertyTypeDistribution: Record<string, number>;
    operationTypeDistribution: Record<string, number>;
    locationDistribution: LocationDistribution;
    amenitiesDistribution: Record<string, number>;
    bedroomsDistribution: Record<string, number>;
    bathroomsDistribution: Record<string, number>;
    averageConstructionSize: number;
    averageLotSize: number;
    newestProperties: number;
    updatedLastWeek: number;
}

// Main homepage response interface
export interface HomepageResponse {
    featuredProperties: Property[];
    statistics: HomepageStatistics;
}