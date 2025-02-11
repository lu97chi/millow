// Auto-generated file - DO NOT EDIT

export interface PropertyTypeCount {
  [key: string]: number;
}

export interface PropertyStats {
  totalProperties: number;
  averagePricing: number;
  maxPricing: number;
  minPricing: number;
  propertyTypeDistribution: PropertyTypeCount;
  operationTypeDistribution: {
    venta: number;
    renta: number;
    desarrollo: number;
  };
  averagePriceByType: PropertyTypeCount;
  averageSizeByType: PropertyTypeCount;
  bedroomDistribution: {
    [key: string]: number;
  };
  priceRanges: {
    'under 1m': number;
    '1m - 3m': number;
    '3m - 5m': number;
    '5m - 10m': number;
    'over 10m': number;
  };
  locationDistribution: {
    [key: string]: number;
  };
  pricePerSquareMeter: {
    average: number;
    byPropertyType: PropertyTypeCount;
    byOperation: {
      venta: number;
      renta: number;
      desarrollo: number;
    };
  };
  amenitiesDistribution: {
    [key: string]: number;
  };
  parkingDistribution: {
    [key: string]: number;
  };
  bathroomDistribution: {
    [key: string]: number;
  };
  propertyAgeDistribution: {
    'new construction': number;
    '1-5 years': number;
    '6-10 years': number;
    '11-20 years': number;
    'over 20 years': number;
  };
  maintenanceFeeStats: {
    averageByPropertyType: PropertyTypeCount;
    distribution: {
      'no fee': number;
      'under 1000': number;
      '1000-3000': number;
      '3000-5000': number;
      'over 5000': number;
    };
  };
  topLocations: {
    byPrice: Array<{ area: string; averagePrice: number }>;
    byVolume: Array<{ area: string; count: number }>;
  };
}

export const ALL_STATS: PropertyStats = {
  "totalProperties": 79,
  "averagePricing": 5111104,
  "maxPricing": 89240000,
  "minPricing": 4500,
  "propertyTypeDistribution": {
    "desarrollos verticales": 27,
    "casas": 10,
    "locales comerciales": 8,
    "oficinas": 8,
    "edificios": 1,
    "casas uso de suelo": 2,
    "bodegas comerciales": 3,
    "locales en centro comercial": 1,
    "casas en condominio": 1
  },
  "operationTypeDistribution": {
    "venta": 30,
    "renta": 30,
    "desarrollo": 19
  },
  "averagePriceByType": {
    "desarrollos verticales": 2664726,
    "casas": 8240800,
    "locales comerciales": 7354859,
    "oficinas": 2894279,
    "edificios": 89240000,
    "casas uso de suelo": 4280000,
    "bodegas comerciales": 2390000,
    "locales en centro comercial": 28000,
    "casas en condominio": 85000
  },
  "averageSizeByType": {
    "desarrollos verticales": 0,
    "casas": 292,
    "locales comerciales": 356,
    "oficinas": 609,
    "edificios": 4578,
    "casas uso de suelo": 394,
    "bodegas comerciales": 3407,
    "locales en centro comercial": 184,
    "casas en condominio": 350
  },
  "bedroomDistribution": {
    "1": 4,
    "2": 10,
    "3": 10,
    "4": 4,
    "5": 2,
    "6": 1,
    "20": 1,
    "n/a": 47
  },
  "priceRanges": {
    "under 1m": 30,
    "1m - 3m": 17,
    "3m - 5m": 11,
    "5m - 10m": 13,
    "over 10m": 8
  },
  "locationDistribution": {
    "americana": 10,
    "country club": 11,
    "chapalita": 7,
    "mexicaltzingo": 2,
    "italia": 1,
    "moderna": 2,
    "mezquitan": 1,
    "prados de providencia": 3,
    "barrio analco": 1,
    "villa la victoria": 1,
    "barrio jesús": 1,
    "la campesina": 1,
    "echeverría": 1,
    "lomas de polanco": 1,
    "san eugenio": 1,
    "barrio santa teresita": 1,
    "fraccionamiento independencia oriente": 1,
    "arcos vallarta": 3,
    "providencia": 12,
    "vallarta sur": 2,
    "fraccionamiento jardines del country": 1,
    "fraccionamiento vallarta san jorge": 1,
    "fraccionamiento jardines alcalde": 1,
    "ladrón de guevara": 1,
    "monraz": 2,
    "fraccionamiento vallarta norte": 1,
    "fraccionamiento residencial juan manuel": 1,
    "barrio san juan bosco": 1,
    "vallarta poniente": 1,
    "unknown": 1,
    "guadalajara centro": 3,
    "zona industrial": 1,
    "tetlan": 1
  },
  "pricePerSquareMeter": {
    "average": 924332,
    "byPropertyType": {
      "desarrollos verticales": 2664726,
      "casas": 26186,
      "locales comerciales": 24436,
      "oficinas": 13592,
      "edificios": 19493,
      "casas uso de suelo": 7964,
      "bodegas comerciales": 5643,
      "locales en centro comercial": 152,
      "casas en condominio": 243
    },
    "byOperation": {
      "venta": 570602,
      "renta": 8387,
      "desarrollo": 2929084
    }
  },
  "amenitiesDistribution": {
    "circuito cerrado": 14,
    "roof garden": 19,
    "gimnasio": 21,
    "alberca": 10,
    "jardín": 2,
    "estacionamientos": 2
  },
  "parkingDistribution": {
    "1": 10,
    "2": 11,
    "3": 11,
    "4": 2,
    "7": 1,
    "8": 1,
    "20": 1,
    "200": 1,
    "n/a": 41
  },
  "bathroomDistribution": {
    "1": 11,
    "2": 11,
    "3": 8,
    "4": 5,
    "10": 2,
    "n/a": 42
  },
  "propertyAgeDistribution": {
    "new construction": 46,
    "1-5 years": 10,
    "6-10 years": 6,
    "11-20 years": 3,
    "over 20 years": 14
  },
  "maintenanceFeeStats": {
    "averageByPropertyType": {
      "desarrollos verticales": 0,
      "casas": 0,
      "locales comerciales": 0,
      "oficinas": 0,
      "edificios": 0,
      "casas uso de suelo": 0,
      "bodegas comerciales": 0,
      "locales en centro comercial": 0,
      "casas en condominio": 0
    },
    "distribution": {
      "no fee": 79,
      "under 1000": 0,
      "1000-3000": 0,
      "3000-5000": 0,
      "over 5000": 0
    }
  },
  "topLocations": {
    "byPrice": [
      {
        "area": "barrio analco",
        "averagePrice": 89240000
      },
      {
        "area": "prados de providencia",
        "averagePrice": 12821576
      },
      {
        "area": "italia",
        "averagePrice": 11500000
      },
      {
        "area": "barrio jesús",
        "averagePrice": 8500000
      },
      {
        "area": "chapalita",
        "averagePrice": 8417071
      },
      {
        "area": "americana",
        "averagePrice": 6592345
      },
      {
        "area": "fraccionamiento independencia oriente",
        "averagePrice": 5600000
      },
      {
        "area": "lomas de polanco",
        "averagePrice": 5300000
      },
      {
        "area": "mezquitan",
        "averagePrice": 4999999
      },
      {
        "area": "country club",
        "averagePrice": 4914446
      }
    ],
    "byVolume": [
      {
        "area": "providencia",
        "count": 12
      },
      {
        "area": "country club",
        "count": 11
      },
      {
        "area": "americana",
        "count": 10
      },
      {
        "area": "chapalita",
        "count": 7
      },
      {
        "area": "prados de providencia",
        "count": 3
      },
      {
        "area": "arcos vallarta",
        "count": 3
      },
      {
        "area": "guadalajara centro",
        "count": 3
      },
      {
        "area": "mexicaltzingo",
        "count": 2
      },
      {
        "area": "moderna",
        "count": 2
      },
      {
        "area": "vallarta sur",
        "count": 2
      }
    ]
  }
};
