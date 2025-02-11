import type { PropertyType, AmenityOption } from "../models/property";
import { Building2, Home, Store, Briefcase, Building, HomeIcon, Warehouse, ShoppingBag } from "lucide-react";

export const PROPERTY_TYPES: PropertyType[] = [
  {
    name: "Desarrollos verticales",
    value: "vertical",
    count: 0,
    description: "Departamentos y desarrollos en altura",
    icon: Building2
  },
  {
    name: "Casas",
    value: "house",
    count: 0,
    description: "Casas unifamiliares",
    icon: Home
  },
  {
    name: "Locales Comerciales",
    value: "commercial",
    count: 0,
    description: "Locales comerciales independientes",
    icon: Store
  },
  {
    name: "Oficinas",
    value: "office",
    count: 0,
    description: "Espacios de oficina",
    icon: Briefcase
  },
  {
    name: "Edificios",
    value: "building",
    count: 0,
    description: "Edificios completos",
    icon: Building
  },
  {
    name: "Casa uso de suelo",
    value: "commercial-house",
    count: 0,
    description: "Casas con permiso comercial",
    icon: HomeIcon
  },
  {
    name: "Bodegas Comerciales",
    value: "warehouse",
    count: 0,
    description: "Bodegas y espacios de almacenamiento",
    icon: Warehouse
  },
  {
    name: "Locales en centro comercial",
    value: "mall",
    count: 0,
    description: "Locales ubicados en centros comerciales",
    icon: ShoppingBag
  },
  {
    name: "Casas en condominio",
    value: "condo",
    count: 0,
    description: "Casas dentro de condominios",
    icon: Home
  }
];

export const AMENITIES: AmenityOption[] = [
  {
    label: "Alberca",
    value: "pool",
    icon: "pool"
  },
  {
    label: "Gimnasio",
    value: "gym",
    icon: "dumbbell"
  },
  {
    label: "Jardín",
    value: "garden",
    icon: "flower"
  },
  {
    label: "Terraza",
    value: "terrace",
    icon: "sun"
  },
  {
    label: "Seguridad 24/7",
    value: "security",
    icon: "shield"
  },
  {
    label: "Estacionamiento",
    value: "parking",
    icon: "car"
  },
  {
    label: "Aire Acondicionado",
    value: "ac",
    icon: "fan"
  },
  {
    label: "Amueblado",
    value: "furnished",
    icon: "sofa"
  },
  {
    label: "Cuarto de Servicio",
    value: "service-room",
    icon: "bed"
  },
  {
    label: "Área de Lavado",
    value: "laundry",
    icon: "washing-machine"
  },
  {
    label: "Bodega",
    value: "storage",
    icon: "box"
  },
  {
    label: "Sala de Juegos",
    value: "game-room",
    icon: "gamepad"
  },
  {
    label: "Cine",
    value: "cinema",
    icon: "video"
  },
  {
    label: "Bar",
    value: "bar",
    icon: "glass"
  },
  {
    label: "Área de BBQ",
    value: "bbq",
    icon: "flame"
  }
];

export const PROPERTY_AGE_OPTIONS = [
  { label: "Nueva", value: 0 },
  { label: "1-5 años", value: 5 },
  { label: "6-10 años", value: 10 },
  { label: "11-20 años", value: 20 },
  { label: "Más de 20 años", value: 21 },
];

export const PRICE_RANGE = {
  min: 500000,
  max: 20000000,
  step: 100000,
};

export const CONSTRUCTION_SIZE_RANGE = {
  min: 50,
  max: 1000,
  step: 10,
};

export const LOT_SIZE_RANGE = {
  min: 100,
  max: 2000,
  step: 50,
};

export const MAINTENANCE_FEE_RANGE = {
  min: 0,
  max: 20000,
  step: 500,
};

export const LOCATIONS = {
  "Ciudad de México": [
    { city: "Ciudad de México", areas: ["Polanco", "Condesa", "Roma", "Santa Fe"] },
  ],
  "Monterrey": [
    { city: "Monterrey", areas: ["San Pedro Garza García", "Valle Oriente", "Cumbres"] },
  ],
  "Guadalajara": [
    { city: "Guadalajara", areas: ["Providencia", "Zapopan", "Puerta de Hierro"] },
  ],
  "Querétaro": [
    { city: "Querétaro", areas: ["Centro", "Juriquilla", "El Refugio"] },
  ],
  "Mérida": [
    { city: "Mérida", areas: ["Norte", "Montebello", "Country Club"] },
  ],
  "San Miguel de Allende": [
    { city: "San Miguel de Allende", areas: ["Centro", "Los Frailes", "Guadiana"] },
  ],
  "Los Cabos": [
    { city: "San José del Cabo", areas: ["Palmilla", "Puerto Los Cabos", "Costa Azul"] },
    { city: "Cabo San Lucas", areas: ["Pedregal", "Medano Beach", "Pacific Side"] },
  ],
  "Valle de Bravo": [
    { city: "Valle de Bravo", areas: ["Centro", "Avándaro", "La Peña"] },
  ],
}; 