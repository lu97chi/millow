import { Home, Building2, Warehouse, Store, Trees, Briefcase, Castle, Car, Waves, Wifi, Shield, Dumbbell, Sofa, Key, CalendarDays } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MexicanState = "Ciudad de México" | "Guadalajara" | "Monterrey" | "Querétaro" | "Cancún" | "Los Cabos";

// City coordinates for generating random locations
const CITY_COORDINATES: Record<MexicanState, {
  center: { lat: number; lng: number };
  areas: Record<string, { lat: number; lng: number }>;
}> = {
  "Ciudad de México": {
    center: { lat: 19.4326, lng: -99.1332 },
    areas: {
      "Polanco": { lat: 19.4319, lng: -99.1937 },
      "Santa Fe": { lat: 19.3662, lng: -99.2760 },
      "Condesa": { lat: 19.4115, lng: -99.1745 },
      "Roma Norte": { lat: 19.4198, lng: -99.1561 },
      "Del Valle": { lat: 19.3907, lng: -99.1674 },
      "Nápoles": { lat: 19.3889, lng: -99.1789 },
      "Coyoacán": { lat: 19.3437, lng: -99.1627 },
      "Anzures": { lat: 19.4284, lng: -99.1843 },
      "Lomas de Chapultepec": { lat: 19.4278, lng: -99.2105 },
      "Interlomas": { lat: 19.4012, lng: -99.2701 }
    }
  },
  "Guadalajara": {
    center: { lat: 20.6597, lng: -103.3496 },
    areas: {
      "Providencia": { lat: 20.6989, lng: -103.3850 },
      "Zapopan": { lat: 20.7214, lng: -103.3913 },
      "Chapalita": { lat: 20.6697, lng: -103.3855 },
      "Americana": { lat: 20.6745, lng: -103.3702 }
    }
  },
  "Monterrey": {
    center: { lat: 25.6866, lng: -100.3161 },
    areas: {
      "San Pedro": { lat: 25.6547, lng: -100.4032 },
      "Valle Oriente": { lat: 25.6478, lng: -100.3584 },
      "Cumbres": { lat: 25.7216, lng: -100.3789 },
      "Contry": { lat: 25.6397, lng: -100.2767 }
    }
  },
  "Querétaro": {
    center: { lat: 20.5888, lng: -100.3899 },
    areas: {
      "Centro": { lat: 20.5931, lng: -100.3928 },
      "Juriquilla": { lat: 20.7014, lng: -100.4465 },
      "El Refugio": { lat: 20.6527, lng: -100.4057 },
      "Zibatá": { lat: 20.6890, lng: -100.3326 }
    }
  },
  "Cancún": {
    center: { lat: 21.1619, lng: -86.8515 },
    areas: {
      "Zona Hotelera": { lat: 21.1086, lng: -86.7599 },
      "Puerto Cancún": { lat: 21.1755, lng: -86.8054 },
      "Downtown": { lat: 21.1580, lng: -86.8445 },
      "Huayacán": { lat: 21.1328, lng: -86.8791 }
    }
  },
  "Los Cabos": {
    center: { lat: 22.8905, lng: -109.9167 },
    areas: {
      "San José del Cabo": { lat: 23.0574, lng: -109.6978 },
      "Cabo San Lucas": { lat: 22.8905, lng: -109.9167 },
      "Palmilla": { lat: 22.9706, lng: -109.7371 },
      "El Tezal": { lat: 22.9073, lng: -109.9037 }
    }
  }
};

// Helper function to get random coordinates near a location
function getRandomCoordinates(state: MexicanState, area: string) {
  const cityData = CITY_COORDINATES[state];
  const areaCoords = cityData.areas[area];
  
  // Add some random variation (roughly within 1km)
  const lat = areaCoords.lat + (Math.random() - 0.5) * 0.01;
  const lng = areaCoords.lng + (Math.random() - 0.5) * 0.01;
  
  return { lat, lng };
}

export interface PropertyType {
  name: string;
  value: string;
  count: number;
  description: string;
  icon: LucideIcon;
}

export const PROPERTY_TYPES = [
  {
    name: "Casa",
    value: "house",
    count: 156,
    description: "Casas unifamiliares y residencias",
    icon: Home
  },
  {
    name: "Departamento",
    value: "apartment",
    count: 243,
    description: "Apartamentos y condominios",
    icon: Building2
  },
  {
    name: "Penthouse",
    value: "penthouse",
    count: 28,
    description: "Departamentos de lujo en últimos pisos",
    icon: Castle
  },
  {
    name: "Oficina",
    value: "office",
    count: 89,
    description: "Espacios comerciales y oficinas",
    icon: Briefcase
  },
  {
    name: "Local",
    value: "retail",
    count: 67,
    description: "Locales comerciales",
    icon: Store
  },
  {
    name: "Terreno",
    value: "land",
    count: 45,
    description: "Terrenos y lotes",
    icon: Trees
  },
  {
    name: "Bodega",
    value: "warehouse",
    count: 34,
    description: "Bodegas y espacios industriales",
    icon: Warehouse
  }
];

export interface AmenityOption {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
}

export const AMENITIES: AmenityOption[] = [
  {
    icon: Car,
    label: "Estacionamiento",
    value: "parking",
    description: "Espacio de estacionamiento incluido"
  },
  {
    icon: Waves,
    label: "Alberca",
    value: "pool",
    description: "Alberca o piscina"
  },
  {
    icon: Wifi,
    label: "Internet",
    value: "internet",
    description: "Conexión a internet de alta velocidad"
  },
  {
    icon: Shield,
    label: "Seguridad",
    value: "security",
    description: "Seguridad 24/7"
  },
  {
    icon: Dumbbell,
    label: "Gimnasio",
    value: "gym",
    description: "Gimnasio equipado"
  },
  {
    icon: Sofa,
    label: "Amueblado",
    value: "furnished",
    description: "Completamente amueblado"
  },
  {
    icon: Key,
    label: "Acceso controlado",
    value: "gated",
    description: "Acceso controlado con vigilancia"
  },
  {
    icon: CalendarDays,
    label: "Área común",
    value: "common-area",
    description: "Áreas comunes y de recreación"
  }
];

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
    coordinates: {
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

// Helper function to generate unique placeholder images
function generatePlaceholderImages(id: number, count: number = 5): string[] {
  const photoIds = [
    "1545324418-cc1a3fa10c00",
    "1512917774080-9991f1c4c750",
    "1600585154340-be6161a56a0c",
    "1600596542815-ffad4c1539a9",
    "1600607687939-ce8a6c25118c",
    "1600607687920-4e4ff3989f92",
    "1600585154526-d3ca6c4c4e1e",
    "1512918728675-ed5a9ecdebfd"
  ];

  return Array.from({ length: count }, (_, i) => {
    const photoId = photoIds[(id + i) % photoIds.length];
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80`;
  });
}

// Generate 50 sample properties
export const SAMPLE_PROPERTIES: Property[] = Array.from({ length: 50 }, (_, index) => {
  // Randomly select property type
  const type = PROPERTY_TYPES[Math.floor(Math.random() * PROPERTY_TYPES.length)];
  
  // Randomly select state and area
  const state = Object.keys(CITY_COORDINATES)[Math.floor(Math.random() * Object.keys(CITY_COORDINATES).length)] as MexicanState;
  const cityData = CITY_COORDINATES[state];
  const areas = Object.keys(cityData.areas);
  const area = areas[Math.floor(Math.random() * areas.length)];
  
  // Generate random coordinates near the selected area
  const coordinates = getRandomCoordinates(state, area);
  
  // Generate random features based on property type
  const isResidential = ["house", "apartment", "penthouse"].includes(type.value);
  const bedrooms = isResidential ? Math.floor(Math.random() * 5) + 1 : null;
  const bathrooms = isResidential ? Math.floor(Math.random() * 4) + 1 : null;
  const constructionSize = Math.floor(Math.random() * 400) + 50;
  const lotSize = type.value === "house" || type.value === "land" ? constructionSize * (1 + Math.random()) : null;
  
  // Generate random price based on size and location
  const basePrice = constructionSize * 25000;
  const locationMultiplier = state === "Ciudad de México" ? 1.5 : 1;
  const price = Math.round(basePrice * locationMultiplier * (0.8 + Math.random() * 0.4));
  
  // Random amenities
  const numAmenities = Math.floor(Math.random() * 5) + 1;
  const amenities = AMENITIES
    .sort(() => Math.random() - 0.5)
    .slice(0, numAmenities)
    .map(a => a.value);
  
  // Generate creation date within the last month
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));
  
  return {
    id: `prop-${index + 1}`,
    title: `${type.name} en ${area}`,
    description: `Hermoso${type.value === "house" ? "a" : ""} ${type.name.toLowerCase()} con excelente ubicación en ${area}, ${state}. Acabados de primera calidad y todos los servicios.`,
    type: type.value,
    price,
    location: {
      state,
      city: state,
      area,
      address: `Calle ${Math.floor(Math.random() * 100) + 1}`,
      coordinates
    },
    features: {
      bedrooms,
      bathrooms,
      constructionSize,
      lotSize,
      parking: Math.floor(Math.random() * 3) + 1,
      floors: type.value === "house" ? Math.floor(Math.random() * 2) + 1 : 1
    },
    amenities,
    images: generatePlaceholderImages(index + 1),
    propertyAge: Math.floor(Math.random() * 20),
    maintenanceFee: Math.random() > 0.3 ? Math.round((price * 0.001) / 100) * 100 : null,
    status: "available",
    createdAt: createdAt.toISOString(),
    updatedAt: createdAt.toISOString()
  };
});

export const LOCATIONS: Record<MexicanState, string[]> = {
  "Ciudad de México": ["Álvaro Obregón", "Coyoacán", "Miguel Hidalgo"],
  "Guadalajara": ["Centro", "Zapopan", "Tlaquepaque"],
  "Monterrey": ["San Pedro", "San Nicolás", "Guadalupe"],
  "Querétaro": ["Centro", "Juriquilla", "El Marqués"],
  "Cancún": ["Zona Hotelera", "Centro", "Puerto Juárez"],
  "Los Cabos": ["San José", "San Lucas", "Cabo Este"],
};

export const PROPERTY_AGE_OPTIONS = [
  { value: 0, label: "Nueva" },
  { value: 1, label: "1-5 años" },
  { value: 5, label: "5-10 años" },
  { value: 10, label: "10+ años" },
];

export const PRICE_RANGE = {
  min: 0,
  max: 20000000,
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