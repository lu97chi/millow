import type { LucideIcon } from "lucide-react";

export interface PropertyType {
  name: string;
  value: string;
  count: number;
  description: string;
  icon: LucideIcon;
}

export interface AmenityOption {
  label: string;
  value: string;
  icon: string;
}

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

export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: string;
  operationType: string;
  type: string;
  price: number;
  location: {
    state: string;
    city: string;
    area: string;
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number | null;
    bathrooms: number | null;
    constructionSize: number | null;
    lotSize: number | null;
    parking: number | null;
    floors: number | null;
  };
  amenities: string[];
  images: string[];
  propertyAge: number;
  maintenanceFee: number | null;
  status: "available" | "sold" | "rented";
  agent: Agent;
  createdAt: string;
  updatedAt: string;
} 