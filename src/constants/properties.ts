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

// Helper function to generate fixed dates
function generateFixedDate(index: number): string {
  // Start from a fixed date and add days based on index
  const baseDate = new Date('2024-01-01T00:00:00.000Z');
  const days = index % 30; // Last 30 days
  const timestamp = baseDate.getTime() + (days * 24 * 60 * 60 * 1000);
  return new Date(timestamp).toISOString();
}

// Generate 100 sample properties with more realistic variations
export const SAMPLE_PROPERTIES: Property[] = Array.from({ length: 100 }, (_, index) => {
  // More varied property type selection with weighted distribution
  const typeDistribution = [
    ...Array(30).fill(PROPERTY_TYPES[0]), // 30% houses
    ...Array(35).fill(PROPERTY_TYPES[1]), // 35% apartments
    ...Array(10).fill(PROPERTY_TYPES[2]), // 10% penthouses
    ...Array(10).fill(PROPERTY_TYPES[3]), // 10% offices
    ...Array(5).fill(PROPERTY_TYPES[4]),  // 5% retail
    ...Array(5).fill(PROPERTY_TYPES[5]),  // 5% land
    ...Array(5).fill(PROPERTY_TYPES[6]),  // 5% warehouse
  ];
  const type = typeDistribution[index % typeDistribution.length];
  
  // Weighted location distribution
  const stateDistribution = [
    ...Array(40).fill("Ciudad de México"),    // 40% CDMX
    ...Array(15).fill("Guadalajara"),         // 15% Guadalajara
    ...Array(15).fill("Monterrey"),           // 15% Monterrey
    ...Array(10).fill("Querétaro"),           // 10% Querétaro
    ...Array(10).fill("Cancún"),              // 10% Cancún
    ...Array(10).fill("Los Cabos"),           // 10% Los Cabos
  ];
  const state = stateDistribution[index % stateDistribution.length] as MexicanState;
  const cityData = CITY_COORDINATES[state];
  
  // More varied area selection
  const areas = Object.keys(cityData.areas);
  const area = areas[Math.floor(Math.pow(index % areas.length, 2) % areas.length)];
  const coordinates = cityData.areas[area];
  
  // More realistic features based on property type
  const isResidential = ["house", "apartment", "penthouse"].includes(type.value);
  const isLuxury = type.value === "penthouse" || (type.value === "house" && Math.random() > 0.7);
  
  // More varied bedroom and bathroom counts
  const bedroomDistribution = isLuxury ? [3, 4, 5, 6] : [1, 2, 2, 3, 3, 3, 4];
  const bathroomDistribution = isLuxury ? [2.5, 3, 3.5, 4, 4.5] : [1, 1.5, 2, 2, 2.5, 3];
  
  const bedrooms = isResidential ? bedroomDistribution[index % bedroomDistribution.length] : null;
  const bathrooms = isResidential ? bathroomDistribution[index % bathroomDistribution.length] : null;
  
  // More varied sizes based on property type and location
  const baseSize = isLuxury ? 200 : 100;
  const sizeMultiplier = isLuxury ? 2 : 1;
  const constructionSize = Math.round((baseSize + (index % 8) * 50) * sizeMultiplier);
  const lotSize = (type.value === "house" || type.value === "land") ? constructionSize * (1.5 + Math.random()) : null;
  
  // More realistic price calculation based on multiple factors
  const basePrice = constructionSize * (isLuxury ? 35000 : 25000);
  const locationMultiplier = {
    "Ciudad de México": 1.5,
    "Monterrey": 1.3,
    "Guadalajara": 1.2,
    "Querétaro": 1.0,
    "Cancún": 1.4,
    "Los Cabos": 1.6
  }[state];
  const luxuryMultiplier = isLuxury ? 1.5 : 1;
  const randomVariation = 0.9 + (Math.random() * 0.2); // ±10% random variation
  const price = Math.round(basePrice * locationMultiplier * luxuryMultiplier * randomVariation);
  
  // More varied amenities based on property type and luxury status
  const possibleAmenities = AMENITIES.map(a => a.value);
  const amenityCount = isLuxury ? 
    Math.floor(Math.random() * 3) + 4 : // 4-6 amenities for luxury
    Math.floor(Math.random() * 3) + 1;  // 1-3 amenities for standard
  
  const amenities = possibleAmenities
    .sort(() => Math.random() - 0.5)
    .slice(0, amenityCount);

  // More varied property ages
  const ageDistribution = isLuxury ?
    [0, 0, 1, 2, 3] : // Newer properties for luxury
    [0, 2, 5, 8, 10, 15]; // More varied ages for standard
  const propertyAge = ageDistribution[index % ageDistribution.length];

  // More realistic maintenance fees
  const hasMaintenanceFee = ["apartment", "penthouse", "office"].includes(type.value) || Math.random() > 0.7;
  const maintenanceFee = hasMaintenanceFee ? 
    Math.round((price * (0.0008 + Math.random() * 0.0004)) / 100) * 100 : // 0.08% - 0.12% of price
    null;

  // Generate creation dates over the last 60 days for more variety
  const createdAt = generateFixedDate(index % 60);
  
  // More descriptive titles and descriptions
  const condition = propertyAge === 0 ? "Nueva" : propertyAge <= 5 ? "Moderna" : "Clásica";
  const luxuryLabel = isLuxury ? "de lujo" : "";
  const title = `${condition} ${type.name} ${luxuryLabel} en ${area}`;
  
  const features = [
    bedrooms ? `${bedrooms} recámaras` : "",
    bathrooms ? `${bathrooms} baños` : "",
    `${constructionSize}m² de construcción`,
    lotSize ? `${lotSize}m² de terreno` : "",
    ...amenities.map(a => AMENITIES.find(am => am.value === a)?.label || ""),
  ].filter(Boolean);

  const description = `Hermosa ${type.name.toLowerCase()} ${luxuryLabel} ubicada en ${area}, ${state}. ${features.join(", ")}. Excelente ubicación con todos los servicios.`;

  return {
    id: `prop-${index + 1}`,
    title,
    description,
    type: type.value,
    price,
    location: {
      state,
      city: state,
      area,
      address: `Calle ${(index % 100) + 1}`,
      coordinates
    },
    features: {
      bedrooms,
      bathrooms,
      constructionSize,
      lotSize,
      parking: isLuxury ? 3 : ((index % 2) + 1),
      floors: type.value === "house" ? (isLuxury ? 2 : 1) : 1
    },
    amenities,
    images: generatePlaceholderImages(index + 1),
    propertyAge,
    maintenanceFee,
    status: "available",
    createdAt,
    updatedAt: createdAt
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