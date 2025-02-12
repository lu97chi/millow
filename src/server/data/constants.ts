import type { AmenityOption, PropertyType } from "@/types";
import {
  Briefcase,
  Building,
  Building2,
  Car,
  Dumbbell,
  Flower2,
  Home,
  HomeIcon,
  Shield,
  ShoppingBag,
  Store,
  Sun,
  Warehouse,
  Waves
} from "lucide-react";

export const PROPERTY_TYPES: PropertyType[] = [
  {
    name: "Desarrollos verticales",
    value: "desarrollos verticales",
    count: 0,
    description: "Departamentos y desarrollos en altura",
    icon: Building2,
  },
  {
    name: "Casas",
    value: "casas", 
    count: 0,
    description: "Casas unifamiliares",
    icon: Home,
  },
  {
    name: "Locales comerciales",
    value: "locales comerciales",
    count: 0,
    description: "Locales comerciales independientes",
    icon: Store,
  },
  {
    name: "Oficinas",
    value: "oficinas",
    count: 0,
    description: "Espacios de oficina",
    icon: Briefcase,
  },
  {
    name: "Edificios",
    value: "edificios",
    count: 0,
    description: "Edificios completos",
    icon: Building,
  },
  {
    name: "Casas uso de suelo",
    value: "casas uso de suelo",
    count: 0,
    description: "Casas con permiso comercial",
    icon: HomeIcon,
  },
  {
    name: "Bodegas comerciales",
    value: "bodegas comerciales",
    count: 0,
    description: "Bodegas y espacios de almacenamiento",
    icon: Warehouse,
  },
  {
    name: "Locales en centro comercial",
    value: "locales en centro comercial",
    count: 0,
    description: "Locales ubicados en centros comerciales",
    icon: ShoppingBag,
  },
  {
    name: "Casas en condominio",
    value: "casas en condominio",
    count: 0,
    description: "Casas dentro de condominios",
    icon: Home,
  },
  {
    name: "Departamentos",
    value: "departamentos",
    count: 0,
    description: "Departamentos en altura",
    icon: Home,
  },
];

export const AMENITIES: AmenityOption[] = [
  {
    label: "Alberca",
    value: "alberca",
    icon: Waves,
  },
  {
    label: "Gimnasio",
    value: "gimnasio",
    icon: Dumbbell,
  },
  {
    label: "Jardín",
    value: "jardín",
    icon: Flower2,
  },
  {
    label: "Roof Garden",
    value: "roof garden",
    icon: Sun,
  },
  {
    label: "Circuito Cerrado",
    value: "circuito cerrado",
    icon: Shield,
  },
  {
    label: "Estacionamientos",
    value: "estacionamientos",
    icon: Car,
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
    {
      city: "Ciudad de México",
      areas: ["Polanco", "Condesa", "Roma", "Santa Fe"],
    },
  ],
  Monterrey: [
    {
      city: "Monterrey",
      areas: ["San Pedro Garza García", "Valle Oriente", "Cumbres"],
    },
  ],
  Guadalajara: [
    {
      city: "Guadalajara",
      areas: ["Providencia", "Zapopan", "Puerta de Hierro"],
    },
  ],
  Querétaro: [
    { city: "Querétaro", areas: ["Centro", "Juriquilla", "El Refugio"] },
  ],
  Mérida: [{ city: "Mérida", areas: ["Norte", "Montebello", "Country Club"] }],
  "San Miguel de Allende": [
    {
      city: "San Miguel de Allende",
      areas: ["Centro", "Los Frailes", "Guadiana"],
    },
  ],
  "Los Cabos": [
    {
      city: "San José del Cabo",
      areas: ["Palmilla", "Puerto Los Cabos", "Costa Azul"],
    },
    {
      city: "Cabo San Lucas",
      areas: ["Pedregal", "Medano Beach", "Pacific Side"],
    },
  ],
  "Valle de Bravo": [
    { city: "Valle de Bravo", areas: ["Centro", "Avándaro", "La Peña"] },
  ],
};
