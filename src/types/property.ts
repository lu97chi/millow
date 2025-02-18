import { LOCATIONS } from "@/server/data/constants";
import type { LucideIcon } from "lucide-react";

// Property Types
export interface PropertyType {
  name: string;
  value: string;
  count: number;
  description: string;
  icon: LucideIcon;
}

export type PropertyTypeValue =
  | "vertical"
  | "house"
  | "commercial"
  | "office"
  | "building"
  | "commercial-house"
  | "warehouse"
  | "mall"
  | "apartment"
  | "condo";

export type PropertyTypeName =
  | "Desarrollos verticales"
  | "Casas"
  | "Locales Comerciales"
  | "Oficinas"
  | "Edificios"
  | "Casas uso de suelo"
  | "Bodegas comerciales"
  | "Locales en centro comercial"
  | "Departamentos"
  | "Casas en condominio"
  | 'Desarrollos horizontales'
  | 'Naves industriales'
  | 'Terrenos comerciales'
  | 'Terrenos'

export type OperationType = "Venta" | "Renta" | "Desarrollo";
export type PropertyStatus = "available" | "sold" | "rented";
export type PropertyEntityType = "development" | "property";

// Property Features
export interface PropertyFeatures {
  bedrooms: number | null;
  bathrooms: number | null;
  constructionSize: number | null;
  lotSize: number | null;
  parking: number | null;
  floors: number | null;
}

// Property Location
export interface PropertyLocation {
  state: string;
  city: string;
  area: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export type Amenity =
  | "Alberca"
  | "Circuito Cerrado"
  | "Estacionamientos"
  | "Gimnasio"
  | "Jardín"
  | "Roof Garden";

// Property Entity
export interface Property {
  id: string;
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
  maintenanceFee: number | null;
  status: PropertyStatus;
  agent: Agent;
  createdAt: string;
  updatedAt: string;
}

// Agent
export interface Agent {
  name: string;
  title: string;
  company: string;
  image: string;
  phone: string;
  email: string;
  experience: number;
  activeListings: number;
}

// Amenity
export interface AmenityOption {
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface AgentCardProps {
  name: string;
  title?: string;
  company: string;
  image: string;
  phone?: string;
  email?: string;
  experience?: number;
  activeListings?: number;
}

export interface ContactFormProps {
  propertyTitle: string;
  propertyId: string;
}

// Types for location data structure
type LocationsType = typeof LOCATIONS;
export type StateType = keyof LocationsType;

export interface CityData {
  city: string;
  areas: string[];
}

export interface PropertyGridProps {
  properties: Property[];
  viewMode?: "grid" | "list";
}

export interface ShareButtonProps {
  title: string;
  url: string;
}

// On the filters page, you can send multiple propertyType, operationType, location
// This is for the case when the user asks "Want a house or an apartment in Guadalajara or Mexico City"
export interface PropertyFilters {
  id?: string;
  title?: string;
  description?: string;
  propertyType?: PropertyTypeName[];
  operationType?: OperationType[];
  type?: PropertyEntityType[];
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  location?: {
    state?: string[];
    city?: string[];
    area?: string[];
    address?: string;
    coordinates?: {
      lat?: number;
      lng?: number;
    };
  };
  features?: {
    bedrooms?: number | null;
    bathrooms?: number | null;
    constructionSize?: {
      min?: number;
      max?: number;
    };
    lotSize?: {
      min?: number;
      max?: number;
    };
    parking?: number | null;
    floors?: number | null;
  };
  amenities?: Amenity[];
  images?: string[];
  propertyAge?: number;
  maintenanceFee?: {
    min?: number;
    max?: number;
  };
  status?: PropertyStatus[];
  agent?: {
    name?: string;
    title?: string;
    company?: string;
    image?: string;
    phone?: string;
    email?: string;
    experience?: number;
    activeListings?: number;
  }[];
  viewMode?: "grid" | "list";
  sortBy?: 'price asc' | 'price desc' | 'age asc' | 'age desc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedProperties {
  properties: Property[];
  total: number;
  page: number;
  pageSize: number;
}
