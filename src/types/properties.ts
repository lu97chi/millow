// Property-related interfaces
interface Coordinates {
    lat: number;
    lng: number;
  }
  
  interface PropertyLocation {
    state: string;
    city: string;
    area: string;
    address: string;
    coordinates: Coordinates;
  }
  
  interface PropertyFeatures {
    bedrooms: number | null;
    bathrooms: number | null;
    constructionSize: number | null;
    lotSize: number | null;
    parking: number | null;
    floors: number | null;
  }
  
  interface Agent {
    name: string;
    title: string | null;
    company: string;
    image: string;
    phone: string;
    email: string;
    experience: number | null;
    activeListings: number | null;
  }
  
  // Enum types
  type PropertyTypeName = 
    | 'Desarrollos verticales'
    | 'Casas'
    | 'Locales Comerciales'
    | 'Oficinas'
    | 'Edificios'
    | 'Casas uso de suelo'
    | 'Bodegas comerciales'
    | 'Locales en centro comercial'
    | 'Departamentos'
    | 'Casas en condominio'
    | 'Desarrollos horizontales'
    | 'Naves industriales'
    | 'Terrenos comerciales'
    | 'Terrenos';
  
  type OperationType = 'Venta' | 'Renta' | 'Desarrollo';
  type PropertyEntityType = 'development' | 'property';
  type PropertyStatus = 'available' | 'sold' | 'rented';
  type Amenity = 
    | 'Alberca'
    | 'Circuito Cerrado'
    | 'Estacionamientos'
    | 'Gimnasio'
    | 'Jardín'
    | 'Roof Garden';
  
  // Property interface
  export interface Property {
    _id: string;
    title: string;
    description: string;
    propertyType: PropertyTypeName;
    operationType: OperationType;
    type: PropertyEntityType;
    price: number;
    location: PropertyLocation;
    features: PropertyFeatures;
    amenities: Amenity[];
    images: string[];
    propertyAge: number | null;
    maintenanceFee: number | null;
    status: PropertyStatus;
    agent: Agent;
    createdAt: string;
    updatedAt: string;
  }
  
  // Statistics interfaces
  export interface PriceRange {
    min: number;
    max: number;
  }
  
  export interface LocationDistribution {
    topCities: Record<string, number>;
    topStates: Record<string, number>;
  }
  
  // Properties page interfaces
  export interface PropertyFilters {
    search?: string;
    propertyType?: PropertyTypeName;
    operationType?: OperationType;
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    maxBedrooms?: number;
    minBathrooms?: number;
    maxBathrooms?: number;
    minConstructionSize?: number;
    maxConstructionSize?: number;
    minLotSize?: number;
    maxLotSize?: number;
    state?: string;
    city?: string;
    amenities?: Amenity[];
    sortBy?: 'price' | 'createdAt' | 'updatedAt';
    sortOrder?: 'asc' | 'desc';
  }
  
  export interface AIQueryResponse {
    results: {
      data: Property[];
      metadata: {
        executionTime: number;
        query: any;
        sort?: Record<string, 1 | -1>;
        projection?: Record<string, 1 | 0>;
        statistics: {
          totalInDatabase: number;
          matchingResults: number;
          percentageMatch: number;
          averagePrice?: number;
          priceRange?: {
            min: number;
            max: number;
          };
          propertyTypes?: Record<string, number>;
          operationTypes?: Record<string, number>;
          citiesDistribution?: Record<string, number>;
        };
      };
    };
    explanation: string;
  }
  
  // New interface for the updated chat response structure
  export interface ChatQueryResponse {
    sessionId: string;
    response: string;
    searchResults: {
      data: Property[];
      metadata: {
        executionTime: number;
        statistics: {
          totalInDatabase: number;
          matchingResults: number;
          percentageMatch: number;
        }
      }
    };
    mongoQuery: any;
  }
  
  export interface PropertiesResponse {
    properties: Property[];
    total: number;
    filters: PropertyFilters;
    explanation?: string; // Optional explanation from AI query
  }
  

  