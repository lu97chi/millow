import { LucideIcon, Building2, Home, Hotel, Building, Warehouse, Store, Castle } from "lucide-react";

export type MexicanState =
  | "Aguascalientes"
  | "Baja California"
  | "Baja California Sur"
  | "Campeche"
  | "Chiapas"
  | "Chihuahua"
  | "Ciudad de México"
  | "Coahuila"
  | "Colima"
  | "Durango"
  | "Estado de México"
  | "Guanajuato"
  | "Guerrero"
  | "Hidalgo"
  | "Jalisco"
  | "Michoacán"
  | "Morelos"
  | "Nayarit"
  | "Nuevo León"
  | "Oaxaca"
  | "Puebla"
  | "Querétaro"
  | "Quintana Roo"
  | "San Luis Potosí"
  | "Sinaloa"
  | "Sonora"
  | "Tabasco"
  | "Tamaulipas"
  | "Tlaxcala"
  | "Veracruz"
  | "Yucatán"
  | "Zacatecas";

export type PropertyType =
  | "apartment"
  | "house"
  | "hotel"
  | "office"
  | "warehouse"
  | "retail"
  | "luxury";

export interface PropertyTypeOption {
  value: PropertyType;
  label: string;
  icon: LucideIcon;
}

export const PROPERTY_TYPES: PropertyTypeOption[] = [
  {
    value: "apartment",
    label: "Departamento",
    icon: Building2,
  },
  {
    value: "house",
    label: "Casa",
    icon: Home,
  },
  {
    value: "hotel",
    label: "Hotel",
    icon: Hotel,
  },
  {
    value: "office",
    label: "Oficina",
    icon: Building,
  },
  {
    value: "warehouse",
    label: "Bodega",
    icon: Warehouse,
  },
  {
    value: "retail",
    label: "Local Comercial",
    icon: Store,
  },
  {
    value: "luxury",
    label: "Propiedad de Lujo",
    icon: Castle,
  },
];

export interface AmenityOption {
  value: string;
  label: string;
  category: "security" | "comfort" | "outdoor" | "services";
}

export const AMENITIES: AmenityOption[] = [
  // Security
  { value: "security", label: "Seguridad 24/7", category: "security" },
  { value: "gated", label: "Acceso Controlado", category: "security" },
  { value: "cctv", label: "Cámaras de Seguridad", category: "security" },
  { value: "alarm", label: "Sistema de Alarma", category: "security" },

  // Comfort
  { value: "ac", label: "Aire Acondicionado", category: "comfort" },
  { value: "heating", label: "Calefacción", category: "comfort" },
  { value: "furnished", label: "Amueblado", category: "comfort" },
  { value: "elevator", label: "Elevador", category: "comfort" },

  // Outdoor
  { value: "pool", label: "Alberca", category: "outdoor" },
  { value: "garden", label: "Jardín", category: "outdoor" },
  { value: "terrace", label: "Terraza", category: "outdoor" },
  { value: "parking", label: "Estacionamiento", category: "outdoor" },

  // Services
  { value: "gym", label: "Gimnasio", category: "services" },
  { value: "spa", label: "Spa", category: "services" },
  { value: "laundry", label: "Lavandería", category: "services" },
  { value: "storage", label: "Bodega", category: "services" },
];

export const PRICE_RANGE = {
  min: 0,
  max: 10000000,
  step: 100000,
};

export const CONSTRUCTION_SIZE_RANGE = {
  min: 0,
  max: 1000,
  step: 10,
};

export const LOT_SIZE_RANGE = {
  min: 0,
  max: 2000,
  step: 50,
};

export const MAINTENANCE_FEE_RANGE = {
  min: 0,
  max: 10000,
  step: 100,
}; 