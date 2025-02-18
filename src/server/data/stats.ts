// Auto-generated file - DO NOT EDIT
export interface PropertyTypeCount {
  [key: string]: number;
}

export interface CityStats {
  totalProperties: number;
  averagePricing: number;
  propertyTypeDistribution: PropertyTypeCount;
  operationTypeDistribution: {
    venta: number;
    renta: number;
    desarrollo: number;
  };
  averagePriceByType: PropertyTypeCount;
  pricePerSquareMeter: {
    average: number;
    byPropertyType: PropertyTypeCount;
    byOperation: {
      venta: number;
      renta: number;
      desarrollo: number;
    };
  };
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
  cityStats: {
    guadalajara: CityStats;
    tijuana: CityStats;
    monterrey: CityStats;
    mazatlan: CityStats;
  };
}

export const ALL_STATS: PropertyStats = {
  "totalProperties": 273,
  "averagePricing": 4296293,
  "maxPricing": 89240000,
  "minPricing": 700,
  "propertyTypeDistribution": {
    "desarrollos verticales": 38,
    "casas": 49,
    "locales comerciales": 16,
    "oficinas": 17,
    "edificios": 5,
    "casas uso de suelo": 2,
    "bodegas comerciales": 8,
    "locales en centro comercial": 2,
    "casas en condominio": 3,
    "departamentos": 106,
    "terrenos": 9,
    "quintas": 0,
    "townhouses": 0
  },
  "operationTypeDistribution": {
    "venta": 120,
    "renta": 120,
    "desarrollo": 33
  },
  "averagePriceByType": {
    "desarrollos verticales": 2513093,
    "casas": 9034853,
    "locales comerciales": 4173833,
    "oficinas": 2096258,
    "edificios": 30068000,
    "casas uso de suelo": 4280000,
    "bodegas comerciales": 916113,
    "locales en centro comercial": 51275,
    "casas en condominio": 730000,
    "departamentos": 2234264,
    "terrenos": 9057958,
    "quintas": 0,
    "townhouses": 0
  },
  "averageSizeByType": {
    "desarrollos verticales": 0,
    "casas": 347,
    "locales comerciales": 271,
    "oficinas": 437,
    "edificios": 1818,
    "casas uso de suelo": 394,
    "bodegas comerciales": 2143,
    "locales en centro comercial": 199,
    "casas en condominio": 189,
    "departamentos": 86,
    "terrenos": 1042,
    "quintas": 0,
    "townhouses": 0
  },
  "bedroomDistribution": {
    "1": 18,
    "2": 66,
    "3": 45,
    "4": 16,
    "5": 4,
    "6": 2,
    "7": 1,
    "10": 3,
    "20": 1,
    "n/a": 117
  },
  "priceRanges": {
    "under 1m": 134,
    "1m - 3m": 42,
    "3m - 5m": 30,
    "5m - 10m": 38,
    "over 10m": 29
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
    "unknown": 2,
    "guadalajara centro": 3,
    "zona industrial": 1,
    "tetlan": 1,
    "panamericano": 2,
    "murua": 2,
    "pórticos de san antonio": 5,
    "santa fe": 5,
    "rancho el grande": 1,
    "playas de tijuana": 7,
    "la gloria": 2,
    "calete": 3,
    "fundadores": 1,
    "brisas del mar": 1,
    "juárez": 3,
    "las torres": 1,
    "guadalupe victoria": 1,
    "verona residencial": 1,
    "urbi quinta del cedro": 1,
    "indeco universidad": 1,
    "zona centro": 5,
    "la joya": 1,
    "paseos del florido": 1,
    "laderas del mar": 1,
    "san antonio del mar": 1,
    "lomas de agua caliente": 2,
    "el paraíso": 1,
    "real del mar": 1,
    "otay": 3,
    "granjas familiares de matamoros": 1,
    "costa coronado residencial": 1,
    "las palmas": 1,
    "la sierra": 1,
    "terrazas del valle": 1,
    "chapultepec": 2,
    "villa colonial": 1,
    "colinas del rey": 1,
    "alamar": 1,
    "madero": 1,
    "garita de otay": 1,
    "zona urbana río tijuana": 3,
    "jardín de las bugambilias": 1,
    "centro": 13,
    "buenos aires": 3,
    "villas la rioja": 3,
    "mirador": 2,
    "maria luisa": 2,
    "las diligencias": 1,
    "vista hermosa": 2,
    "el uro": 4,
    "mitras norte": 1,
    "colinas de san jerónimo": 3,
    "del paseo residencia": 1,
    "santa maría": 5,
    "renacimiento": 1,
    "sierra alta": 1,
    "colinas del valle ": 2,
    "flor de piedra": 1,
    "dinastía ": 1,
    "residencial y club de golf la herradura": 2,
    "cumbres 3er sector": 3,
    "ladrillera": 4,
    "obispado": 1,
    "tecnológico": 1,
    "villa florida": 1,
    "alfareros": 1,
    "nuevo repueblo": 1,
    "altavista": 1,
    "del paseo residencial": 1,
    "satélite 6 sector acueducto 2 etapa": 1,
    "mitras centro": 1,
    "mazatlan ": 60
  },
  "pricePerSquareMeter": {
    "average": 582307,
    "byPropertyType": {
      "desarrollos verticales": 2513093,
      "casas": 112758,
      "locales comerciales": 19284,
      "oficinas": 9381,
      "edificios": 21867,
      "casas uso de suelo": 7964,
      "bodegas comerciales": 2165,
      "locales en centro comercial": 251,
      "casas en condominio": 9134,
      "departamentos": 156071,
      "terrenos": 15436,
      "quintas": 0,
      "townhouses": 0
    },
    "byOperation": {
      "venta": 1041524,
      "renta": 5439,
      "desarrollo": 0
    }
  },
  "amenitiesDistribution": {
    "circuito cerrado": 25,
    "roof garden": 21,
    "gimnasio": 28,
    "alberca": 19,
    "jardín": 11,
    "estacionamientos": 14
  },
  "parkingDistribution": {
    "1": 63,
    "2": 68,
    "3": 20,
    "4": 6,
    "5": 1,
    "6": 2,
    "7": 1,
    "8": 1,
    "9": 1,
    "10": 7,
    "20": 1,
    "21": 1,
    "41": 1,
    "200": 1,
    "n/a": 99
  },
  "bathroomDistribution": {
    "1": 38,
    "2": 88,
    "3": 24,
    "4": 13,
    "5": 6,
    "6": 1,
    "7": 1,
    "10": 2,
    "12": 1,
    "13": 1,
    "n/a": 98
  },
  "propertyAgeDistribution": {
    "new construction": 179,
    "1-5 years": 39,
    "6-10 years": 18,
    "11-20 years": 13,
    "over 20 years": 24
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
      "casas en condominio": 0,
      "departamentos": 0,
      "terrenos": 0,
      "quintas": 0,
      "townhouses": 0
    },
    "distribution": {
      "no fee": 273,
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
        "area": "residencial y club de golf la herradura",
        "averagePrice": 42750000
      },
      {
        "area": "las diligencias",
        "averagePrice": 30000000
      },
      {
        "area": "sierra alta",
        "averagePrice": 27250000
      },
      {
        "area": "flor de piedra",
        "averagePrice": 22900000
      },
      {
        "area": "maria luisa",
        "averagePrice": 21900000
      },
      {
        "area": "renacimiento",
        "averagePrice": 19850000
      },
      {
        "area": "mirador",
        "averagePrice": 16000000
      },
      {
        "area": "colinas de san jerónimo",
        "averagePrice": 13200000
      },
      {
        "area": "prados de providencia",
        "averagePrice": 12821576
      }
    ],
    "byVolume": [
      {
        "area": "mazatlan ",
        "count": 60
      },
      {
        "area": "centro",
        "count": 13
      },
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
        "area": "playas de tijuana",
        "count": 7
      },
      {
        "area": "pórticos de san antonio",
        "count": 5
      },
      {
        "area": "santa fe",
        "count": 5
      },
      {
        "area": "zona centro",
        "count": 5
      }
    ]
  },
  "cityStats": {
    "guadalajara": {
      "totalProperties": 79,
      "averagePricing": 5111104,
      "propertyTypeDistribution": {
        "desarrollos verticales": 27,
        "casas": 10,
        "locales comerciales": 8,
        "oficinas": 8,
        "edificios": 1,
        "casas uso de suelo": 2,
        "bodegas comerciales": 3,
        "locales en centro comercial": 1,
        "casas en condominio": 1,
        "departamentos": 18,
        "terrenos": 0,
        "quintas": 0,
        "townhouses": 0
      },
      "operationTypeDistribution": {
        "venta": 48,
        "renta": 31,
        "desarrollo": 0
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
        "casas en condominio": 85000,
        "departamentos": 3463638,
        "terrenos": 0,
        "quintas": 0,
        "townhouses": 0
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
          "casas en condominio": 243,
          "departamentos": 25324,
          "terrenos": 0,
          "quintas": 0,
          "townhouses": 0
        },
        "byOperation": {
          "venta": 1515980,
          "renta": 8233,
          "desarrollo": 0
        }
      }
    },
    "tijuana": {
      "totalProperties": 69,
      "averagePricing": 1036407,
      "propertyTypeDistribution": {
        "desarrollos verticales": 3,
        "casas": 14,
        "locales comerciales": 2,
        "oficinas": 1,
        "edificios": 1,
        "casas uso de suelo": 0,
        "bodegas comerciales": 3,
        "locales en centro comercial": 0,
        "casas en condominio": 2,
        "departamentos": 26,
        "terrenos": 1,
        "quintas": 0,
        "townhouses": 0
      },
      "operationTypeDistribution": {
        "venta": 38,
        "renta": 31,
        "desarrollo": 0
      },
      "averagePriceByType": {
        "desarrollos verticales": 206575,
        "casas": 1193270,
        "locales comerciales": 2507500,
        "oficinas": 19734,
        "edificios": 2300000,
        "casas uso de suelo": 0,
        "bodegas comerciales": 19634,
        "locales en centro comercial": 0,
        "casas en condominio": 1052500,
        "departamentos": 594036,
        "terrenos": 53000,
        "quintas": 0,
        "townhouses": 0
      },
      "pricePerSquareMeter": {
        "average": 369553,
        "byPropertyType": {
          "desarrollos verticales": 206575,
          "casas": 11473,
          "locales comerciales": 27941,
          "oficinas": 23,
          "edificios": 1187,
          "casas uso de suelo": 0,
          "bodegas comerciales": 9,
          "locales en centro comercial": 0,
          "casas en condominio": 13580,
          "departamentos": 8002,
          "terrenos": 331,
          "quintas": 0,
          "townhouses": 0
        },
        "byOperation": {
          "venta": 670894,
          "renta": 168,
          "desarrollo": 0
        }
      }
    },
    "monterrey": {
      "totalProperties": 65,
      "averagePricing": 7114734,
      "propertyTypeDistribution": {
        "desarrollos verticales": 8,
        "casas": 16,
        "locales comerciales": 1,
        "oficinas": 5,
        "edificios": 2,
        "casas uso de suelo": 0,
        "bodegas comerciales": 2,
        "locales en centro comercial": 0,
        "casas en condominio": 0,
        "departamentos": 23,
        "terrenos": 6,
        "quintas": 0,
        "townhouses": 0
      },
      "operationTypeDistribution": {
        "venta": 35,
        "renta": 30,
        "desarrollo": 0
      },
      "averagePriceByType": {
        "desarrollos verticales": 2866275,
        "casas": 14601250,
        "locales comerciales": 46000,
        "oficinas": 2478891,
        "edificios": 21900000,
        "casas uso de suelo": 0,
        "bodegas comerciales": 50000,
        "locales en centro comercial": 0,
        "casas en condominio": 0,
        "departamentos": 2524741,
        "terrenos": 12549667,
        "quintas": 0,
        "townhouses": 0
      },
      "pricePerSquareMeter": {
        "average": 622167,
        "byPropertyType": {
          "desarrollos verticales": 2866275,
          "casas": 28447,
          "locales comerciales": 236,
          "oficinas": 9978,
          "edificios": 19244,
          "casas uso de suelo": 0,
          "bodegas comerciales": 180,
          "locales en centro comercial": 0,
          "casas en condominio": 0,
          "departamentos": 28122,
          "terrenos": 19950,
          "quintas": 0,
          "townhouses": 0
        },
        "byOperation": {
          "venta": 1150955,
          "renta": 5247,
          "desarrollo": 0
        }
      }
    },
    "mazatlan": {
      "totalProperties": 60,
      "averagePricing": 3919018,
      "propertyTypeDistribution": {
        "desarrollos verticales": 0,
        "casas": 9,
        "locales comerciales": 5,
        "oficinas": 3,
        "edificios": 1,
        "casas uso de suelo": 0,
        "bodegas comerciales": 0,
        "locales en centro comercial": 1,
        "casas en condominio": 0,
        "departamentos": 39,
        "terrenos": 2,
        "quintas": 0,
        "townhouses": 0
      },
      "operationTypeDistribution": {
        "venta": 31,
        "renta": 29,
        "desarrollo": 0
      },
      "averagePriceByType": {
        "desarrollos verticales": 0,
        "casas": 12219333,
        "locales comerciales": 576290,
        "oficinas": 22655,
        "edificios": 15000000,
        "casas uso de suelo": 0,
        "bodegas comerciales": 0,
        "locales en centro comercial": 74550,
        "casas en condominio": 0,
        "departamentos": 2589038,
        "terrenos": 3085310,
        "quintas": 0,
        "townhouses": 0
      },
      "pricePerSquareMeter": {
        "average": 333459,
        "byPropertyType": {
          "desarrollos verticales": 0,
          "casas": 516390,
          "locales comerciales": 11390,
          "oficinas": 273,
          "edificios": 50167,
          "casas uso de suelo": 0,
          "bodegas comerciales": 0,
          "locales en centro comercial": 350,
          "casas en condominio": 0,
          "departamentos": 390586,
          "terrenos": 9447,
          "quintas": 0,
          "townhouses": 0
        },
        "byOperation": {
          "venta": 637654,
          "renta": 8285,
          "desarrollo": 0
        }
      }
    }
  }
};

// Unique lists for reference
export const UNIQUE_AMENITIES: string[] = [
  "alberca",
  "circuito cerrado",
  "estacionamientos",
  "gimnasio",
  "jardín",
  "roof garden"
];
export const UNIQUE_LOCATIONS: string[] = [
  "alamar",
  "alfareros",
  "altavista",
  "americana",
  "arcos vallarta",
  "barrio analco",
  "barrio jesús",
  "barrio san juan bosco",
  "barrio santa teresita",
  "brisas del mar",
  "buenos aires",
  "calete",
  "centro",
  "chapalita",
  "chapultepec",
  "colinas de san jerónimo",
  "colinas del rey",
  "colinas del valle ",
  "costa coronado residencial",
  "country club",
  "cumbres 3er sector",
  "del paseo residencia",
  "del paseo residencial",
  "dinastía ",
  "echeverría",
  "el paraíso",
  "el uro",
  "flor de piedra",
  "fraccionamiento independencia oriente",
  "fraccionamiento jardines alcalde",
  "fraccionamiento jardines del country",
  "fraccionamiento residencial juan manuel",
  "fraccionamiento vallarta norte",
  "fraccionamiento vallarta san jorge",
  "fundadores",
  "garita de otay",
  "granjas familiares de matamoros",
  "guadalajara centro",
  "guadalupe victoria",
  "indeco universidad",
  "italia",
  "jardín de las bugambilias",
  "juárez",
  "la campesina",
  "la gloria",
  "la joya",
  "la sierra",
  "laderas del mar",
  "ladrillera",
  "ladrón de guevara",
  "las diligencias",
  "las palmas",
  "las torres",
  "lomas de agua caliente",
  "lomas de polanco",
  "madero",
  "maria luisa",
  "mazatlan ",
  "mexicaltzingo",
  "mezquitan",
  "mirador",
  "mitras centro",
  "mitras norte",
  "moderna",
  "monraz",
  "murua",
  "nuevo repueblo",
  "obispado",
  "otay",
  "panamericano",
  "paseos del florido",
  "playas de tijuana",
  "prados de providencia",
  "providencia",
  "pórticos de san antonio",
  "rancho el grande",
  "real del mar",
  "renacimiento",
  "residencial y club de golf la herradura",
  "san antonio del mar",
  "san eugenio",
  "santa fe",
  "santa maría",
  "satélite 6 sector acueducto 2 etapa",
  "sierra alta",
  "tecnológico",
  "terrazas del valle",
  "tetlan",
  "unknown",
  "urbi quinta del cedro",
  "vallarta poniente",
  "vallarta sur",
  "verona residencial",
  "villa colonial",
  "villa florida",
  "villa la victoria",
  "villas la rioja",
  "vista hermosa",
  "zona centro",
  "zona industrial",
  "zona urbana río tijuana"
];
export const UNIQUE_PROPERTY_TYPES: string[] = [
  "bodegas comerciales",
  "casas",
  "casas en condominio",
  "casas uso de suelo",
  "departamentos",
  "desarrollos horizontales",
  "desarrollos verticales",
  "edificios",
  "locales comerciales",
  "locales en centro comercial",
  "naves industriales",
  "oficinas",
  "terrenos",
  "terrenos comerciales"
];
