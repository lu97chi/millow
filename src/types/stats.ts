// Property Type Distribution
export interface PropertyTypeCount {
  [key: string]: number;
}

// Location Stats
export interface LocationStats {
  area: string;
  count: number;
  averagePrice?: number;
}

// Price Distribution
export interface PriceDistribution {
  range: string;
  count: number;
}

// Property Stats
export interface PropertyStats {
  totalProperties: number;
  averagePricing: number;
  maxPricing: number;
  minPricing: number;
  propertyTypeDistribution: PropertyTypeCount;
  operationTypeDistribution: PropertyTypeCount;
  locationDistribution: {
    [state: string]: {
      [city: string]: {
        [area: string]: number;
      };
    };
  };
  topLocations: {
    byVolume: LocationStats[];
    byPrice: LocationStats[];
  };
  priceRanges: {
    [range: string]: number;
  };
  propertyAgeDistribution: {
    [age: string]: number;
  };
  averagePriceByType: {
    [type: string]: number;
  };
  averageSizeByType: {
    [type: string]: number;
  };
  pricePerSquareMeter: {
    average: number;
    byPropertyType: {
      [type: string]: number;
    };
    byLocation: {
      [location: string]: number;
    };
  };
} 