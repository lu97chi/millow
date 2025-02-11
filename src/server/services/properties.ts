import type { Property, Agent } from "../models/property";
import { PROPERTY_TYPES, AMENITIES } from "../data/constants";

// Helper function to generate unique placeholder images
function generatePlaceholderImages(id: number, count: number = 5): string[] {
  const photoIds = [
    "1600047509807-ba8f99d2cdde", // Modern house exterior valid
    "1600585154340-be6161a56a0c", // Luxury living room valid
    "1600585152220-90363fe7e115", // Modern kitchen valid
    "1600210492493-0946911123ea", // Beautiful bathroom valid
    "1600607687939-ce8a6c25118c", // Pool view valid
    "1613977257363-707ba9348227", // Modern bedroom valid
    "1512917774080-9991f1c4c750", // Luxury exterior valid
    "1560448204-e02f11c3d0e2",    // Modern interior valid
    "1618220924273-338d82d6b886", // Living space valid
    "1680382578857-c331ead9ed51", // Kitchen and dining valid
    "1661962340349-6ea59fff7e7b", // Master bedroom valid
    "1505691938895-1758d7feb511"  // Outdoor space valid
  ];

  return Array.from({ length: count }, (_, i) => {
    const photoId = photoIds[(id + i) % photoIds.length];
    return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&q=80&w=1200`;
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

// Helper function to generate agent data
function generateAgent(index: number): Agent {
  const agencies = [
    "Century 21",
    "Coldwell Banker",
    "RE/MAX",
    "Keller Williams",
    "CBRE",
    "Cushman & Wakefield"
  ];

  const certifications = [
    "Certified Residential Specialist (CRS)",
    "Accredited Buyer's Representative (ABR)",
    "Graduate, REALTOR® Institute (GRI)",
    "Certified International Property Specialist (CIPS)",
    "Certified Luxury Home Marketing Specialist (CLHMS)"
  ];

  const languages = ["Español", "English", "Français", "Português"];

  return {
    id: `agent-${index + 1}`,
    name: `Agente ${index + 1}`,
    email: `agente${index + 1}@millow.com`,
    phone: `+52 ${555000000 + index}`,
    photo: `https://i.pravatar.cc/150?u=${index}`,
    agency: agencies[index % agencies.length],
    title: "Real Estate Professional",
    languages: [
      "Español",
      "English",
      ...(index % 3 === 0 ? [languages[2 + (index % 2)]] : [])
    ],
    experience: 3 + (index % 15), // 3-17 years of experience
    certifications: [
      certifications[index % certifications.length],
      certifications[(index + 2) % certifications.length]
    ]
  };
}

// City coordinates for generating random locations
const CITY_COORDINATES: Record<string, {
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
      "Lomas de Chapultepec": { lat: 19.4278, lng: -99.2105 },
      "Bosques de las Lomas": { lat: 19.4178, lng: -99.2305 },
      "Jardines del Pedregal": { lat: 19.3137, lng: -99.2060 },
      "San Ángel": { lat: 19.3467, lng: -99.1897 },
      "Las Águilas": { lat: 19.3567, lng: -99.2097 }
    }
  },
  "Monterrey": {
    center: { lat: 25.6866, lng: -100.3161 },
    areas: {
      "San Pedro Garza García": { lat: 25.6547, lng: -100.4032 },
      "Valle Oriente": { lat: 25.6478, lng: -100.3584 },
      "Carretera Nacional": { lat: 25.5787, lng: -100.2147 },
      "Cumbres": { lat: 25.7216, lng: -100.3789 },
      "Del Valle": { lat: 25.6527, lng: -100.3784 },
      "Santa Catarina": { lat: 25.6827, lng: -100.4584 },
      "San Jerónimo": { lat: 25.7016, lng: -100.3689 },
      "Contry": { lat: 25.6397, lng: -100.2767 }
    }
  },
  "Guadalajara": {
    center: { lat: 20.6597, lng: -103.3496 },
    areas: {
      "Providencia": { lat: 20.6989, lng: -103.3850 },
      "Puerta de Hierro": { lat: 20.7214, lng: -103.4213 },
      "Andares": { lat: 20.7114, lng: -103.4013 },
      "Valle Real": { lat: 20.7314, lng: -103.4313 },
      "Zapopan Centro": { lat: 20.7214, lng: -103.3913 },
      "Ciudad Granja": { lat: 20.6814, lng: -103.4313 },
      "La Estancia": { lat: 20.6614, lng: -103.4113 },
      "Chapalita": { lat: 20.6697, lng: -103.3855 }
    }
  },
  "Querétaro": {
    center: { lat: 20.5888, lng: -100.3899 },
    areas: {
      "Centro Histórico": { lat: 20.5931, lng: -100.3928 },
      "Juriquilla": { lat: 20.7014, lng: -100.4465 },
      "El Campanario": { lat: 20.6527, lng: -100.4157 },
      "Zibatá": { lat: 20.6890, lng: -100.3326 },
      "El Refugio": { lat: 20.6527, lng: -100.4057 },
      "Milenio III": { lat: 20.5927, lng: -100.4057 },
      "Alamos": { lat: 20.5727, lng: -100.3857 },
      "Balcones Coloniales": { lat: 20.6127, lng: -100.4157 }
    }
  },
  "Mérida": {
    center: { lat: 20.9717, lng: -89.5943 },
    areas: {
      "Norte de Mérida": { lat: 21.0317, lng: -89.6243 },
      "Montebello": { lat: 21.0217, lng: -89.6143 },
      "Altabrisa": { lat: 21.0117, lng: -89.5843 },
      "Country Club": { lat: 21.0417, lng: -89.6443 },
      "San Ramón Norte": { lat: 21.0017, lng: -89.6043 },
      "Montes de Amé": { lat: 20.9917, lng: -89.6143 },
      "García Ginerés": { lat: 20.9817, lng: -89.6343 },
      "Temozon Norte": { lat: 21.0517, lng: -89.6243 }
    }
  },
  "San Miguel de Allende": {
    center: { lat: 20.9144, lng: -100.7453 },
    areas: {
      "Centro Histórico": { lat: 20.9157, lng: -100.7427 },
      "Ojo de Agua": { lat: 20.9257, lng: -100.7327 },
      "Atascadero": { lat: 20.9057, lng: -100.7527 },
      "Los Frailes": { lat: 20.9357, lng: -100.7627 },
      "La Lejona": { lat: 20.9457, lng: -100.7227 },
      "Los Balcones": { lat: 20.9057, lng: -100.7327 },
      "El Obraje": { lat: 20.9157, lng: -100.7527 },
      "Guadalupe": { lat: 20.9257, lng: -100.7627 }
    }
  },
  "Los Cabos": {
    center: { lat: 22.8905, lng: -109.9167 },
    areas: {
      "Palmilla": { lat: 22.9706, lng: -109.7371 },
      "El Tezal": { lat: 22.9073, lng: -109.9037 },
      "Pedregal": { lat: 22.8805, lng: -109.9067 },
      "Puerto Los Cabos": { lat: 23.0574, lng: -109.6978 },
      "Cabo Real": { lat: 22.9406, lng: -109.8271 },
      "Diamante": { lat: 22.8905, lng: -109.9567 },
      "Costa Azul": { lat: 23.0374, lng: -109.7178 },
      "Cabo del Sol": { lat: 22.9206, lng: -109.8471 }
    }
  },
  "Valle de Bravo": {
    center: { lat: 19.1961, lng: -100.1332 },
    areas: {
      "Centro": { lat: 19.1957, lng: -100.1337 },
      "Avándaro": { lat: 19.1757, lng: -100.1237 },
      "La Peña": { lat: 19.2057, lng: -100.1437 },
      "Santa María Ahuacatlán": { lat: 19.1857, lng: -100.1537 },
      "El Escondrijo": { lat: 19.2157, lng: -100.1237 },
      "Las Flores": { lat: 19.1657, lng: -100.1337 },
      "San Gabriel": { lat: 19.1957, lng: -100.1537 },
      "El Castellano": { lat: 19.2057, lng: -100.1137 }
    }
  }
};

// Generate 150 sample properties with deterministic variations
export function generateMockProperties(): Property[] {
  return Array.from({ length: 150 }, (_, index) => {
    // More varied property type selection with weighted distribution
    const typeDistribution = [
      ...Array(25).fill(PROPERTY_TYPES[0]), // 25% houses
      ...Array(30).fill(PROPERTY_TYPES[1]), // 30% apartments
      ...Array(10).fill(PROPERTY_TYPES[2]), // 10% penthouses
      ...Array(10).fill(PROPERTY_TYPES[3]), // 10% offices
      ...Array(8).fill(PROPERTY_TYPES[4]),  // 8% retail
      ...Array(7).fill(PROPERTY_TYPES[5]),  // 7% land
      ...Array(10).fill(PROPERTY_TYPES[6])  // 10% luxury properties
    ];
    const type = typeDistribution[index % typeDistribution.length];
    
    // Weighted location distribution based on market demand
    const stateDistribution = [
      ...Array(30).fill("Ciudad de México"),    // 30% CDMX
      ...Array(15).fill("Monterrey"),           // 15% Monterrey
      ...Array(15).fill("Guadalajara"),         // 15% Guadalajara
      ...Array(10).fill("Querétaro"),           // 10% Querétaro
      ...Array(10).fill("Los Cabos"),           // 10% Los Cabos
      ...Array(8).fill("Mérida"),               // 8% Mérida
      ...Array(7).fill("San Miguel de Allende"), // 7% San Miguel
      ...Array(5).fill("Valle de Bravo")        // 5% Valle de Bravo
    ];
    const state = stateDistribution[index % stateDistribution.length] as string;
    const cityData = CITY_COORDINATES[state];
    
    // More varied area selection with premium locations
    const areas = Object.keys(cityData.areas);
    const area = areas[index % areas.length];
    const coordinates = cityData.areas[area];
    
    // Property characteristics based on type and location
    const isResidential = ["house", "apartment", "penthouse", "luxury"].includes(type.value);
    const isLuxury = type.value === "luxury" || (type.value === "house" && index % 3 === 0); // Every third house is luxury
    const isPremiumLocation = ["Polanco", "San Pedro Garza García", "Valle Real", "Palmilla", "Centro Histórico"].includes(area);
    
    // More varied bedroom and bathroom counts based on property type
    const bedroomDistribution = isLuxury ? 
      [3, 4, 4, 5, 5, 6, 6, 7, 8] : 
      [1, 1, 2, 2, 2, 3, 3, 3, 4];
    const bathroomDistribution = isLuxury ? 
      [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7] : 
      [1, 1.5, 2, 2, 2.5, 2.5, 3, 3.5];
    
    const bedrooms = isResidential ? bedroomDistribution[index % bedroomDistribution.length] : null;
    const bathrooms = isResidential ? bathroomDistribution[index % bathroomDistribution.length] : null;
    
    // More realistic sizes based on property type and location
    const baseSizeByType = {
      house: isLuxury ? 350 : 180,
      apartment: isLuxury ? 250 : 120,
      penthouse: 300,
      office: 200,
      retail: 150,
      land: 500,
      luxury: 450
    };
    const baseSize = baseSizeByType[type.value as keyof typeof baseSizeByType] || 150;
    const sizeMultiplier = isPremiumLocation ? 1.3 : 1;
    const constructionSize = Math.round((baseSize + (index % 12) * 25) * sizeMultiplier);
    const lotSize = (type.value === "house" || type.value === "land" || type.value === "luxury") ? 
      constructionSize * 1.8 : null;
    
    // More realistic price calculation based on multiple factors
    const basePricePerM2 = {
      "Ciudad de México": isPremiumLocation ? 65000 : 45000,
      "Monterrey": isPremiumLocation ? 55000 : 38000,
      "Guadalajara": isPremiumLocation ? 45000 : 32000,
      "Querétaro": isPremiumLocation ? 35000 : 25000,
      "Los Cabos": isPremiumLocation ? 75000 : 50000,
      "Mérida": isPremiumLocation ? 35000 : 25000,
      "San Miguel de Allende": isPremiumLocation ? 45000 : 30000,
      "Valle de Bravo": isPremiumLocation ? 40000 : 28000
    }[state];
    
    const priceVariation = 0.85 + ((index % 30) / 100); // Deterministic variation between 0.85 and 1.15
    const price = basePricePerM2 ? 
      Math.round(constructionSize * basePricePerM2 * priceVariation) :
      0;
    
    // More varied amenities based on property type and luxury status
    const possibleAmenities = AMENITIES.map(a => a.value);
    const amenityCount = isLuxury ? 
      5 + (index % 4) : // 5-8 amenities for luxury
      2 + (index % 3);  // 2-4 amenities for standard
    
    const amenities = possibleAmenities
      .slice(index % possibleAmenities.length)
      .slice(0, amenityCount);

    // More varied property ages with newer properties in premium locations
    const maxAge = isPremiumLocation ? 8 : 20;
    const propertyAge = isLuxury ? 
      index % 5 : // 0-4 years for luxury
      index % maxAge; // 0-19 years for standard

    // Realistic maintenance fees based on property type and location
    const hasMaintenanceFee = ["apartment", "penthouse", "office", "luxury"].includes(type.value) || index % 3 === 0;
    const maintenanceFee = hasMaintenanceFee ? 
      Math.round((price * 0.001) / 100) * 100 : // Fixed at 0.1% of price
      null;

    // Generate creation dates over the last 90 days for more variety
    const createdAt = generateFixedDate(index % 90);
    
    // More descriptive titles and descriptions
    const propertyCondition = propertyAge === 0 ? "Nueva" : 
      propertyAge <= 2 ? "Moderna" : 
      propertyAge <= 5 ? "Seminueva" : 
      propertyAge <= 10 ? "Remodelada" : "Clásica";
    
    const luxuryLabel = isLuxury ? "de lujo" : "";
    const locationLabel = isPremiumLocation ? "en exclusiva zona de" : "en";
    const title = `${propertyCondition} ${type.name} ${luxuryLabel} ${locationLabel} ${area}, ${state}`;
    
    const features = [
      bedrooms ? `${bedrooms} recámaras` : "",
      bathrooms ? `${bathrooms} baños` : "",
      `${constructionSize}m² de construcción`,
      lotSize ? `${lotSize}m² de terreno` : "",
      ...amenities.map(a => AMENITIES.find(am => am.value === a)?.label || ""),
    ].filter(Boolean);

    const viewsDescription = isPremiumLocation ? 
      "Espectaculares vistas a la ciudad y excelente ubicación. " : 
      "Excelente ubicación con todos los servicios. ";

    const luxuryDescription = isLuxury ?
      "Acabados de lujo, amplios espacios y diseño arquitectónico único. " :
      "";

    const description = `${propertyCondition} ${type.name.toLowerCase()} ${luxuryLabel} ubicada ${locationLabel} ${area}, ${state}. ${features.join(", ")}. ${viewsDescription}${luxuryDescription}Ideal para ${isResidential ? "vivir con todo el confort" : "inversión"}.`;

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
        address: `${isLuxury ? "Av. Principal" : "Calle"} ${(index % 100) + 1}`,
        coordinates
      },
      features: {
        bedrooms,
        bathrooms,
        constructionSize,
        lotSize,
        parking: isLuxury ? 3 + (index % 3) : 1 + (index % 2),
        floors: type.value === "house" || type.value === "luxury" ? (isLuxury ? 2 + (index % 2) : 1) : null
      },
      amenities,
      images: generatePlaceholderImages(index + 1),
      propertyAge,
      maintenanceFee,
      status: "available",
      agent: generateAgent(index % 20),
      createdAt,
      updatedAt: createdAt
    };
  });
} 