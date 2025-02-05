import { Home, Building2, Warehouse, Building, Trees, Store, Briefcase, Factory, Castle, Mountain, HomeIcon, Car, Waves, Wifi, Shield, Dumbbell, Sofa, Key, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MexicanState = "Ciudad de México" | "Guadalajara" | "Monterrey" | "Querétaro" | "Cancún" | "Los Cabos";

export interface PropertyType {
  name: string;
  value: string;
  count: number;
  description: string;
  icon: LucideIcon;
}

export interface AmenityOption {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: string;
  price: number;
  location: {
    state: MexicanState;
    city: string;
    area: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  features: {
    bedrooms: number | null;
    bathrooms: number | null;
    constructionSize: number;
    lotSize: number | null;
    parking: number | null;
    floors: number | null;
  };
  amenities: string[];
  images: string[];
  propertyAge: number;
  maintenanceFee: number | null;
  status: "available" | "sold" | "rented";
  createdAt: string;
  updatedAt: string;
}

export const SAMPLE_PROPERTIES: Property[] = [
  {
    id: "lux-ph-polanco",
    title: "Penthouse de Lujo en Polanco",
    description: "Espectacular penthouse con vista panorámica a Chapultepec",
    type: "penthouse",
    price: 8500000,
    location: {
      state: "Ciudad de México",
      city: "Miguel Hidalgo",
      area: "Polanco",
      address: "Av. Presidente Masaryk 123",
      coordinates: { lat: 19.4328, lng: -99.1909 }
    },
    features: {
      bedrooms: 4,
      bathrooms: 4.5,
      constructionSize: 380,
      lotSize: null,
      parking: 3,
      floors: 2
    },
    amenities: ["elevator", "security", "gym", "pool", "garden", "furnished"],
    images: Array(5).fill("https://placekitten.com/1200/800"),
    propertyAge: 2,
    maintenanceFee: 8500,
    status: "available",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: "casa-valle",
    title: "Residencia en Valle de Bravo",
    description: "Hermosa casa con vista al lago",
    type: "casa",
    price: 12500000,
    location: {
      state: "Ciudad de México",
      city: "Valle de Bravo",
      area: "Centro",
      address: "Calle del Lago 45"
    },
    features: {
      bedrooms: 5,
      bathrooms: 5.5,
      constructionSize: 450,
      lotSize: 1200,
      parking: 4,
      floors: 3
    },
    amenities: ["pool", "garden", "security", "furnished"],
    images: Array(6).fill("https://placekitten.com/1200/800"),
    propertyAge: 8,
    maintenanceFee: null,
    status: "available",
    createdAt: "2024-03-14T15:30:00Z",
    updatedAt: "2024-03-14T15:30:00Z"
  },
  {
    id: "loft-roma",
    title: "Loft Industrial en La Roma",
    description: "Espacio moderno y versátil",
    type: "loft",
    price: 4200000,
    location: {
      state: "Ciudad de México",
      city: "Cuauhtémoc",
      area: "Roma Norte",
      address: "Álvaro Obregón 286"
    },
    features: {
      bedrooms: 1,
      bathrooms: 2,
      constructionSize: 120,
      lotSize: null,
      parking: 1,
      floors: 1
    },
    amenities: ["elevator", "security", "furnished"],
    images: Array(4).fill("https://placekitten.com/1200/800"),
    propertyAge: 15,
    maintenanceFee: 2500,
    status: "available",
    createdAt: "2024-03-13T09:15:00Z",
    updatedAt: "2024-03-13T09:15:00Z"
  },
  {
    id: "oficinas-reforma",
    title: "Oficinas Corporativas Reforma",
    description: "Espacio ejecutivo en el corazón financiero",
    type: "oficina",
    price: 15800000,
    location: {
      state: "Ciudad de México",
      city: "Cuauhtémoc",
      area: "Reforma",
      address: "Paseo de la Reforma 483"
    },
    features: {
      bedrooms: null,
      bathrooms: 4,
      constructionSize: 580,
      lotSize: null,
      parking: 8,
      floors: 1
    },
    amenities: ["elevator", "security", "controlled-access", "internet"],
    images: Array(3).fill("https://placekitten.com/1200/800"),
    propertyAge: 5,
    maintenanceFee: 25000,
    status: "available",
    createdAt: "2024-03-12T14:20:00Z",
    updatedAt: "2024-03-12T14:20:00Z"
  },
  {
    id: "local-condesa",
    title: "Local Comercial en Condesa",
    description: "Ubicación privilegiada con alto tráfico peatonal",
    type: "local",
    price: 6500000,
    location: {
      state: "Ciudad de México",
      city: "Cuauhtémoc",
      area: "Condesa",
      address: "Av. Michoacán 123"
    },
    features: {
      bedrooms: null,
      bathrooms: 2,
      constructionSize: 145,
      lotSize: null,
      parking: null,
      floors: 1
    },
    amenities: ["security", "storage"],
    images: Array(4).fill("https://placekitten.com/1200/800"),
    propertyAge: 12,
    maintenanceFee: 3500,
    status: "available",
    createdAt: "2024-03-11T11:45:00Z",
    updatedAt: "2024-03-11T11:45:00Z"
  },
  {
    id: "villa-cancun",
    title: "Villa de Lujo en Zona Hotelera",
    description: "Espectacular villa frente al mar Caribe",
    type: "villa",
    price: 25000000,
    location: {
      state: "Cancún",
      city: "Benito Juárez",
      area: "Zona Hotelera",
      address: "Blvd. Kukulcán Km. 12"
    },
    features: {
      bedrooms: 6,
      bathrooms: 7,
      constructionSize: 850,
      lotSize: 1500,
      parking: 4,
      floors: 3
    },
    amenities: ["pool", "garden", "security", "gym", "spa", "furnished", "elevator"],
    images: Array(8).fill("https://placekitten.com/1200/800"),
    propertyAge: 1,
    maintenanceFee: 15000,
    status: "available",
    createdAt: "2024-03-10T16:30:00Z",
    updatedAt: "2024-03-10T16:30:00Z"
  },
  {
    id: "depto-monterrey",
    title: "Departamento en San Pedro",
    description: "Moderno departamento con amenidades de lujo",
    type: "departamento",
    price: 5800000,
    location: {
      state: "Monterrey",
      city: "San Pedro Garza García",
      area: "Valle",
      address: "Av. Gómez Morín 1000"
    },
    features: {
      bedrooms: 3,
      bathrooms: 3.5,
      constructionSize: 220,
      lotSize: null,
      parking: 2,
      floors: 1
    },
    amenities: ["gym", "pool", "security", "elevator", "garden"],
    images: Array(5).fill("https://placekitten.com/1200/800"),
    propertyAge: 3,
    maintenanceFee: 4500,
    status: "available",
    createdAt: "2024-03-09T13:20:00Z",
    updatedAt: "2024-03-09T13:20:00Z"
  },
  {
    id: "terreno-queretaro",
    title: "Terreno Residencial Juriquilla",
    description: "Excelente terreno en zona de alto plusvalor",
    type: "terreno",
    price: 3200000,
    location: {
      state: "Querétaro",
      city: "Querétaro",
      area: "Juriquilla",
      address: "Av. Universidad 100"
    },
    features: {
      bedrooms: null,
      bathrooms: null,
      constructionSize: 0,
      lotSize: 500,
      parking: null,
      floors: null
    },
    amenities: ["security", "controlled-access"],
    images: Array(3).fill("https://placekitten.com/1200/800"),
    propertyAge: 0,
    maintenanceFee: 1500,
    status: "available",
    createdAt: "2024-03-08T10:15:00Z",
    updatedAt: "2024-03-08T10:15:00Z"
  },
  {
    id: "casa-guadalajara",
    title: "Residencia en Puerta de Hierro",
    description: "Elegante residencia en zona exclusiva",
    type: "casa",
    price: 9800000,
    location: {
      state: "Guadalajara",
      city: "Zapopan",
      area: "Puerta de Hierro",
      address: "Av. Royal Country 500"
    },
    features: {
      bedrooms: 4,
      bathrooms: 4.5,
      constructionSize: 420,
      lotSize: 800,
      parking: 3,
      floors: 2
    },
    amenities: ["pool", "garden", "security", "gym"],
    images: Array(6).fill("https://placekitten.com/1200/800"),
    propertyAge: 4,
    maintenanceFee: 6500,
    status: "available",
    createdAt: "2024-03-07T14:45:00Z",
    updatedAt: "2024-03-07T14:45:00Z"
  },
  {
    id: "bodega-industrial",
    title: "Bodega Industrial Los Cabos",
    description: "Amplia bodega con oficinas",
    type: "bodega",
    price: 7500000,
    location: {
      state: "Los Cabos",
      city: "San José del Cabo",
      area: "Zona Industrial",
      address: "Blvd. Industrial Km. 3"
    },
    features: {
      bedrooms: null,
      bathrooms: 2,
      constructionSize: 1000,
      lotSize: 2000,
      parking: 10,
      floors: 1
    },
    amenities: ["security", "storage", "internet"],
    images: Array(4).fill("https://placekitten.com/1200/800"),
    propertyAge: 6,
    maintenanceFee: null,
    status: "available",
    createdAt: "2024-03-06T09:30:00Z",
    updatedAt: "2024-03-06T09:30:00Z"
  },
  {
    id: "ph-guadalajara",
    title: "Penthouse en Providencia",
    description: "Exclusivo penthouse con terraza panorámica",
    type: "penthouse",
    price: 11200000,
    location: {
      state: "Guadalajara",
      city: "Guadalajara",
      area: "Providencia",
      address: "Av. Pablo Neruda 3000"
    },
    features: {
      bedrooms: 3,
      bathrooms: 3.5,
      constructionSize: 320,
      lotSize: null,
      parking: 3,
      floors: 2
    },
    amenities: ["elevator", "security", "gym", "pool", "furnished"],
    images: Array(7).fill("https://placekitten.com/1200/800"),
    propertyAge: 1,
    maintenanceFee: 7500,
    status: "available",
    createdAt: "2024-03-05T15:20:00Z",
    updatedAt: "2024-03-05T15:20:00Z"
  },
  {
    id: "local-monterrey",
    title: "Local Comercial San Pedro",
    description: "Local en plaza comercial de lujo",
    type: "local",
    price: 4800000,
    location: {
      state: "Monterrey",
      city: "San Pedro Garza García",
      area: "Valle Oriente",
      address: "Av. Lázaro Cárdenas 1000"
    },
    features: {
      bedrooms: null,
      bathrooms: 1,
      constructionSize: 85,
      lotSize: null,
      parking: null,
      floors: 1
    },
    amenities: ["security", "elevator", "storage"],
    images: Array(3).fill("https://placekitten.com/1200/800"),
    propertyAge: 2,
    maintenanceFee: 3000,
    status: "available",
    createdAt: "2024-03-04T11:10:00Z",
    updatedAt: "2024-03-04T11:10:00Z"
  },
  {
    id: "casa-cancun",
    title: "Casa en Puerto Cancún",
    description: "Residencia con muelle privado",
    type: "casa",
    price: 18500000,
    location: {
      state: "Cancún",
      city: "Cancún",
      area: "Puerto Cancún",
      address: "Blvd. Puerto Cancún"
    },
    features: {
      bedrooms: 5,
      bathrooms: 5.5,
      constructionSize: 550,
      lotSize: 1000,
      parking: 4,
      floors: 2
    },
    amenities: ["pool", "garden", "security", "gym", "spa", "furnished"],
    images: Array(8).fill("https://placekitten.com/1200/800"),
    propertyAge: 3,
    maintenanceFee: 12000,
    status: "available",
    createdAt: "2024-03-03T16:40:00Z",
    updatedAt: "2024-03-03T16:40:00Z"
  },
  {
    id: "oficina-queretaro",
    title: "Oficinas El Campanario",
    description: "Modernas oficinas en zona empresarial",
    type: "oficina",
    price: 6200000,
    location: {
      state: "Querétaro",
      city: "Querétaro",
      area: "El Campanario",
      address: "Blvd. Bernardo Quintana 200"
    },
    features: {
      bedrooms: null,
      bathrooms: 3,
      constructionSize: 250,
      lotSize: null,
      parking: 5,
      floors: 1
    },
    amenities: ["elevator", "security", "controlled-access", "internet"],
    images: Array(4).fill("https://placekitten.com/1200/800"),
    propertyAge: 2,
    maintenanceFee: 8000,
    status: "available",
    createdAt: "2024-03-02T13:25:00Z",
    updatedAt: "2024-03-02T13:25:00Z"
  },
  {
    id: "loft-cabos",
    title: "Loft en Marina Los Cabos",
    description: "Loft con vista al mar y marina",
    type: "loft",
    price: 5500000,
    location: {
      state: "Los Cabos",
      city: "Cabo San Lucas",
      area: "Marina",
      address: "Paseo de la Marina 150"
    },
    features: {
      bedrooms: 1,
      bathrooms: 1.5,
      constructionSize: 95,
      lotSize: null,
      parking: 1,
      floors: 1
    },
    amenities: ["pool", "security", "gym", "furnished"],
    images: Array(5).fill("https://placekitten.com/1200/800"),
    propertyAge: 4,
    maintenanceFee: 2800,
    status: "available",
    createdAt: "2024-03-01T10:50:00Z",
    updatedAt: "2024-03-01T10:50:00Z"
  }
];

export const PROPERTY_TYPES: PropertyType[] = [
  { 
    name: "Casa",
    value: "casa",
    count: 156, 
    description: "Casas unifamiliares y residencias",
    icon: Home,
  },
  { 
    name: "Departamento",
    value: "departamento",
    count: 243, 
    description: "Apartamentos y condominios",
    icon: Building2,
  },
  { 
    name: "Loft",
    value: "loft",
    count: 45, 
    description: "Espacios abiertos y modernos",
    icon: Warehouse,
  },
  { 
    name: "Penthouse",
    value: "penthouse",
    count: 28, 
    description: "Departamentos de lujo en últimos pisos",
    icon: Building,
  },
  { 
    name: "Casa en condominio",
    value: "casa-condominio",
    count: 89, 
    description: "Casas en desarrollos privados",
    icon: HomeIcon,
  },
  { 
    name: "Terreno",
    value: "terreno",
    count: 134, 
    description: "Terrenos residenciales y comerciales",
    icon: Trees,
  },
  { 
    name: "Local Comercial",
    value: "local",
    count: 67, 
    description: "Espacios para negocio",
    icon: Store,
  },
  { 
    name: "Oficina",
    value: "oficina",
    count: 92, 
    description: "Espacios de trabajo",
    icon: Briefcase,
  },
  { 
    name: "Bodega",
    value: "bodega",
    count: 34, 
    description: "Almacenes y espacios industriales",
    icon: Factory,
  },
  { 
    name: "Villa",
    value: "villa",
    count: 23, 
    description: "Propiedades de lujo con amplios jardines",
    icon: Castle,
  },
  { 
    name: "Rancho",
    value: "rancho",
    count: 15, 
    description: "Propiedades rurales extensas",
    icon: Mountain,
  },
];

export const LOCATIONS: Record<MexicanState, string[]> = {
  "Ciudad de México": ["Álvaro Obregón", "Coyoacán", "Miguel Hidalgo"],
  "Guadalajara": ["Centro", "Zapopan", "Tlaquepaque"],
  "Monterrey": ["San Pedro", "San Nicolás", "Guadalupe"],
  "Querétaro": ["Centro", "Juriquilla", "El Marqués"],
  "Cancún": ["Zona Hotelera", "Centro", "Puerto Juárez"],
  "Los Cabos": ["San José", "San Lucas", "Cabo Este"],
};

export const AMENITIES: AmenityOption[] = [
  { icon: Car, label: "Estacionamiento", value: "parking", description: "Espacio para vehículos" },
  { icon: Waves, label: "Alberca", value: "pool", description: "Área de natación" },
  { icon: Trees, label: "Jardín", value: "garden", description: "Áreas verdes" },
  { icon: Wifi, label: "Internet", value: "internet", description: "Conexión de alta velocidad" },
  { icon: Shield, label: "Seguridad", value: "security", description: "Vigilancia 24/7" },
  { icon: Dumbbell, label: "Gimnasio", value: "gym", description: "Área de ejercicio" },
  { icon: Sofa, label: "Amueblado", value: "furnished", description: "Incluye muebles" },
  { icon: Key, label: "Acceso controlado", value: "controlled-access", description: "Entrada con tarjeta/código" },
  { icon: Building, label: "Elevador", value: "elevator", description: "Acceso vertical" },
  { icon: CalendarDays, label: "Área común", value: "common-area", description: "Espacios compartidos" },
  { icon: Warehouse, label: "Bodega", value: "storage", description: "Espacio de almacenamiento" },
];

export const PROPERTY_AGE_OPTIONS = [
  { value: 0, label: "Nueva" },
  { value: 1, label: "1-5 años" },
  { value: 5, label: "5-10 años" },
  { value: 10, label: "10+ años" },
];

export const PRICE_RANGE = {
  min: 0,
  max: 10000000, // 10M MXN
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
  step: 500,
}; 