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
    bedrooms: number;
    bathrooms: number;
    constructionSize: number;
    lotSize: number;
    parking: number;
    floors: number;
  }
  
  interface Agent {
    name: string;
    company: string;
    title: string;
    image: string;
    phone: string;
    email: string;
    experience: number;
    activeListings: number;
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
    propertyAge: number;
    maintenanceFee: number;
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
  
