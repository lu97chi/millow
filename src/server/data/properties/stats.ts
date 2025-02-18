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
    byPrice: Array<{ area: string; averagePrice: number, count: number }>;
    byVolume: Array<{ area: string; count: number }>;
  };
  cityStats: {
    guadalajara: CityStats;
    // tijuana: CityStats;
    // monterrey: CityStats;
    // mazatlan: CityStats;
  };
}

export const PROPERTY_STATS: PropertyStats = {
  "totalProperties": 6207,
  "averagePricing": 7112048,
  "maxPricing": 5019290000,
  "minPricing": 1,
  "propertyTypeDistribution": {
    "desarrollos verticales": 29,
    "casas": 1564,
    "departamentos": 2427,
    "locales comerciales": 480,
    "oficinas": 923,
    "casas uso de suelo": 50,
    "bodegas comerciales": 225,
    "edificios": 97,
    "terrenos": 182,
    "casas en condominio": 51,
    "departamentos compartidos": 14,
    "terrenos comerciales": 56,
    "inmuebles productivos urbanos": 7,
    "locales en centro comercial": 36,
    "naves industriales": 52,
    "terrenos industriales": 4,
    "dúplex": 7,
    "quintas": 2,
    "villas": 1
  },
  "operationTypeDistribution": {
    "venta": 3694,
    "renta": 2509,
    "desarrollo": 0
  },
  "averagePriceByType": {
    "desarrollos verticales": 2848098,
    "casas": 5600568,
    "departamentos": 7622295,
    "locales comerciales": 3290894,
    "oficinas": 2330071,
    "casas uso de suelo": 7840376,
    "bodegas comerciales": 24150825,
    "edificios": 19050653,
    "terrenos": 20148759,
    "casas en condominio": 7837976,
    "departamentos compartidos": 697200,
    "terrenos comerciales": 14003511,
    "inmuebles productivos urbanos": 14940857,
    "locales en centro comercial": 1728868,
    "naves industriales": 4346329,
    "terrenos industriales": 22897548,
    "dúplex": 1392312,
    "quintas": 15849500,
    "villas": 12500000
  },
  "averageSizeByType": {
    "casas": 378,
    "departamentos": 146,
    "locales comerciales": 358,
    "oficinas": 256,
    "casas uso de suelo": 445,
    "bodegas comerciales": 1831,
    "edificios": 1217,
    "terrenos": 324,
    "casas en condominio": 279,
    "departamentos compartidos": 120,
    "terrenos comerciales": 317,
    "inmuebles productivos urbanos": 994,
    "locales en centro comercial": 208,
    "naves industriales": 8325,
    "dúplex": 147,
    "quintas": 4268,
    "terrenos industriales": 763,
    "villas": 1865
  },
  "bedroomDistribution": {
    "1": 829,
    "2": 1337,
    "3": 1111,
    "4": 572,
    "5": 213,
    "6": 109,
    "7": 52,
    "8": 39,
    "9": 22,
    "10": 25,
    "11": 4,
    "12": 9,
    "13": 5,
    "14": 1,
    "15": 3,
    "16": 1,
    "17": 4,
    "18": 4,
    "19": 3,
    "20": 7,
    "24": 1,
    "25": 1,
    "26": 3,
    "28": 1,
    "29": 2,
    "33": 1,
    "35": 1,
    "39": 1,
    "40": 3,
    "50": 3,
    "51": 1,
    "56": 1,
    "60": 1,
    "74": 1,
    "99": 2,
    "n/a": 1834
  },
  "priceRanges": {
    "under 1m": 3039,
    "1m - 3m": 650,
    "3m - 5m": 733,
    "5m - 10m": 969,
    "over 10m": 816
  },
  "locationDistribution": {
    "country club": 331,
    "americana": 669,
    "chapalita": 184,
    "italia": 10,
    "providencia": 566,
    "moderna": 134,
    "mezquitan": 32,
    "prados de providencia": 84,
    "barrio jesús": 2,
    "jardines del bosque": 132,
    "echeverría": 9,
    "lomas de polanco": 14,
    "san eugenio": 1,
    "arcos vallarta": 257,
    "barrio santa teresita": 42,
    "fraccionamiento vallarta norte": 50,
    "1 de mayo": 23,
    "lomas del valle": 11,
    "bosques de la victoria": 105,
    "fraccionamiento jardines del country": 63,
    "fraccionamiento vallarta san jorge": 44,
    "la perla": 33,
    "ladrón de guevara": 211,
    "fraccionamiento italia providencia": 31,
    "fraccionamiento colomos providencia": 163,
    "fraccionamiento jardines de santa isabel": 8,
    "fraccionamiento colinas de san javier": 31,
    "artesanos": 38,
    "oblatos": 33,
    "real": 3,
    "ayuntamiento": 29,
    "vallarta poniente": 62,
    "villaseñor": 29,
    "barrio analco": 30,
    "villa la victoria": 3,
    "jardines de los arcos": 24,
    "blanco y cuellar": 9,
    "fraccionamiento independencia oriente": 5,
    "fraccionamiento monraz": 12,
    "monraz": 102,
    "el dean": 10,
    "fraccionamiento prados de providencia": 17,
    "independencia": 69,
    "fraccionamiento jardines alcalde": 31,
    "colonia huentitán el bajo": 13,
    "guadalajara centro": 188,
    "área metropolitana de guadalajara": 11,
    "unknown": 68,
    "providencia 4a secc": 53,
    "mexicaltzingo": 60,
    "angel guzmán": 1,
    "san antonio": 10,
    "fraccionamiento autocinema": 5,
    "monumental": 35,
    "jardines del bosque norte": 40,
    "fraccionamiento lomas del country": 27,
    "fraccionamiento residencial victoria": 21,
    "san rafael": 12,
    "circunvalación belisario": 5,
    "unidad habitacional el zalate infonavit": 1,
    "barrio capilla de jesús": 2,
    "circunvalación oblatos": 21,
    "alcalde barranquitas": 47,
    "fraccionamiento jardines del bosque": 19,
    "fraccionamiento rincón del bosque": 5,
    "ferrocarril": 19,
    "fraccionamiento rinconada santa rita": 13,
    "barrio san juan de dios": 32,
    "fraccionamiento jardines de la cruz": 34,
    "guadalajara oriente": 11,
    "lafayette": 50,
    "magaña": 12,
    "circunvalación américas": 29,
    "mezquitan country": 26,
    "vallarta sur": 14,
    "américas colomos": 6,
    "balcones de oblatos": 10,
    "lomas de guevara": 24,
    "esteban alatorre": 2,
    "insurgentes ": 31,
    "colinas de la normal": 7,
    "villas del country": 18,
    "la loma": 6,
    "estadio poniente": 1,
    "san andrés": 22,
    "la federacha": 9,
    "rancho nuevo": 12,
    "hormiguero": 3,
    "villas del nilo": 5,
    "guadalupana": 26,
    "belisario domínguez": 18,
    "lomas independencia": 37,
    "fraccionamiento providencia ": 26,
    "niños héroes": 6,
    "atlas": 59,
    "sutaj": 13,
    "san carlos": 28,
    "jardines del rosario": 3,
    "ciudad universitaria": 2,
    "del fresno": 36,
    "fraccionamiento ladrón de guevara": 71,
    "balcones de huentitan": 7,
    "fraccionamiento residencial chapalita": 11,
    "fraccionamiento circunvalación vallarta": 22,
    "beatriz hernandez": 3,
    "unidad habitacional los arrayanes": 11,
    "fraccionamiento chapultepec country": 31,
    "lomas santa rita": 1,
    "panoramica huentitan": 6,
    "fraccionamiento residencial juan manuel": 19,
    "unidad habitacional el sáuz infonavit": 1,
    "providencia 1a secc": 43,
    "penal": 17,
    "talpita": 4,
    "miravalle": 14,
    "nueva españa": 24,
    "fraccionamiento colon": 5,
    "quinta velarde": 14,
    "las américas": 2,
    "jardines de la paz": 26,
    "barrio el retiro": 16,
    "olímpica": 14,
    "fraccionamiento fabrica de atemajac": 1,
    "fraccionamiento circunvalación guevara": 3,
    "fraccionamiento rinconada de la victoria": 1,
    "fraccionamiento rojas ladrón de guevara": 2,
    "unidad habitacional 18 de marzo": 3,
    "del sur": 15,
    "libertad": 8,
    "figueroa": 13,
    "condominio vista del country": 1,
    "popular hornos": 1,
    "reforma": 7,
    "lomas del paraíso": 10,
    "margarita maza de juárez": 12,
    "el rosario": 16,
    "fraccionamiento puerta real": 1,
    "fraccionamiento parque industrial el álamo": 2,
    "barrio san juan bosco": 15,
    "fraccionamiento santa eduwiges": 4,
    "barranquitas": 7,
    "la joyita": 1,
    "5 de mayo ": 1,
    "el mirador": 7,
    "agustín yanez": 7,
    "fraccionamiento jardines del nilo": 2,
    "miraflores": 5,
    "revolución": 4,
    "barrio las conchas": 8,
    "colonial independencia": 3,
    "reforma centro": 4,
    "san miguel de huentitan el alto": 19,
    "fraccionamiento country club": 10,
    "nueva santa maría": 2,
    "lagos de oriente": 13,
    "lázaro cárdenas sur": 4,
    "unidad habitacional tetlán ii": 1,
    "barrio penal": 1,
    "morelos": 9,
    "jardines el sauz": 4,
    "jardines del sur": 20,
    "vicente guerrero": 14,
    "obrera": 19,
    "jardines de los poetas": 5,
    "las huertas de oblatos": 2,
    "polanco": 8,
    "tetlan": 9,
    "la cantera": 1,
    "lomas del paradero": 7,
    "santa cecilia": 3,
    "arboledas del sur": 4,
    "cuauhtémoc": 2,
    "san marcos": 4,
    "san isidro": 4,
    "gral. real": 3,
    "5 de mayo": 4,
    "santa maría": 9,
    "valle del alamo": 2,
    "medrano": 8,
    "el carmen": 2,
    "jardines de atemajac": 5,
    "zona industrial": 47,
    "la florida": 3,
    "fraccionamiento dioses del nilo": 1,
    "fraccionamiento eulogio parra": 2,
    "fraccionamiento verde valle": 7,
    "barrio san bernardo": 1,
    "fraccionamiento jardines de los historiadores": 4,
    "colonial independencia poniente": 2,
    "villas de san juan": 2,
    "fraccionamiento colón industrial": 8,
    "fraccionamiento lagos del country": 2,
    "fraccionamiento lomas del sur": 1,
    "blanco y cuellar 1ra.": 1,
    "fraccionamiento batallón de san patricio": 2,
    "fraccionamiento jardines de la paz norte": 1,
    "la aurora": 26,
    "vistas del nilo": 4,
    "fraccionamiento lomas de san eugenio": 1,
    "la campesina": 2,
    "heliodoro hernandez loza ": 3,
    "lomas de huentitán": 4,
    "providencia sur": 5,
    "fraccionamiento terranova": 15,
    "fraccionamiento arcos": 2,
    "joaquín aarón": 2,
    "fraccionamiento los colomos": 3,
    "jardines de guadalupe": 8,
    "fraccionamiento lomas de providencia": 2,
    "colonia huentitán el alto": 7,
    "santa elena alcalde poniente": 11,
    "fraccionamiento campo de polo chapalita": 1,
    "fraccionamiento jardines del bosque centro": 3,
    "barragán y hernandez": 2,
    "fraccionamiento el manantial": 3,
    "guadalupana norte": 2,
    "aldama tetlan": 1,
    "emiliano zapata": 1,
    "rinconada de la arboleda": 2,
    "barrio mezquitan": 4,
    "fresno oriente": 1,
    "el porvenir": 2,
    "jardines de san josé": 15,
    "unidad habitacional lomas de independencia": 4,
    "fraccionamiento residencial del bosque": 1,
    "lópez portillo": 7,
    "san joaquín": 3,
    "villas de guadalupe": 2,
    "san vicente": 2,
    "8 de julio ": 9,
    "patria": 7,
    "barrio san miguel de mezquitan": 2,
    "barrio antigua penal de oblatos": 2,
    "fraccionamiento parques del nilo": 6,
    "fraccionamiento prados del nilo": 1,
    "fraccionamiento lomas de oblatos ": 2,
    "villa vicente guerrero": 5,
    "fraccionamiento lomas del gallo": 3,
    "fraccionamiento bethel": 1,
    "progreso": 3,
    "parques de colón": 2,
    "la paz": 3,
    "jesús garcia": 2,
    "fraccionamiento jardines de plaza del sol": 2,
    "8 de julio 1a secc": 1,
    "barrio san felipe": 1,
    "santa maría oriente": 1,
    "barrio agua azul": 1,
    "postes cuates (federalismo)": 4,
    "colinas de huentitan": 2,
    "medrano ": 2,
    "fraccionamiento jardines de san francisco": 3,
    "fraccionamiento vallarta san lucas": 3,
    "villas del sur": 1,
    "terrazas monraz": 1,
    "esperanza": 3,
    "fraccionamiento jacarandas": 1,
    "hermosa provincia": 4,
    "balcones del 4": 5,
    "colonia oblatos": 1,
    "universitaria": 1,
    "barrio el santuario": 1,
    "los mártires": 1,
    "insurgentes la presa": 3,
    "la nogalera": 6,
    "tetlan rio verde": 6,
    "fraccionamiento vallarta poniente": 1,
    "santa rosa": 6,
    "las juntas": 4,
    "barrera": 3,
    "fraccionamiento las torres": 4,
    "garcia cuadra": 2,
    "popular": 1,
    "fraccionamiento residencial de la barranca": 5,
    "fraccionamiento santa elena estadio": 1,
    "fraccionamiento jardines de san jose": 1,
    "zona comercial mercado de abastos": 3,
    "zona comercial comercial abastos": 4,
    "lomas del paraiso": 2,
    "fraccionamiento jardines del valle": 2,
    "fraccionamiento el rocio": 1,
    "rincón de agua azul": 7,
    "la algodonal": 3,
    "las palmas": 2,
    "jardines de la barranca": 1,
    "terralta": 1,
    "buenos aires": 1,
    "benito juárez": 1,
    "patria nueva": 1,
    "aldrete": 2,
    "barrio la normal": 1,
    "pueblo el zalate": 1,
    "agraria": 1,
    "río verde oblatos": 3,
    "barrio sagrada familia": 1,
    "unidad habitacional miguel hidalgo": 4,
    "fraccionamiento san josé río verde": 1,
    "san martin": 2,
    "unidad modelo": 1,
    "fraccionamiento residencial la cruz": 2,
    "fraccionamiento santa mónica": 11,
    "villa hermosa": 1,
    "fraccionamiento residencial san elias": 3,
    "dr. atl": 1,
    "jardines de la alborada": 1,
    "potrero alto": 1,
    "fraccionamiento miravalle": 1,
    "fraccionamiento balcones de la joya": 1,
    "residencial san andrés": 1,
    "fraccionamiento valle del álamo": 1,
    "pueblo villa mariano escobedo": 1,
    "hogares guadalajara": 1,
    "higuerillas": 1,
    "deitz": 1,
    "lomas del nilo": 1,
    "fraccionamiento bosques de la victoria": 1,
    "parques de san pedro": 1,
    "conjunto habitacional real de huentitán": 1
  },
  "pricePerSquareMeter": {
    "average": 78210,
    "byPropertyType": {
      "desarrollos verticales": 2848098,
      "casas": 68016,
      "departamentos": 93076,
      "locales comerciales": 124669,
      "oficinas": 225957,
      "casas uso de suelo": 17093,
      "bodegas comerciales": 150749,
      "edificios": 1045742,
      "terrenos": 12742560,
      "casas en condominio": 26025,
      "departamentos compartidos": 11885,
      "terrenos comerciales": 8193154,
      "inmuebles productivos urbanos": 2156888,
      "locales en centro comercial": 17010,
      "naves industriales": 2491,
      "terrenos industriales": 22875044,
      "dúplex": 9091,
      "quintas": 7223,
      "villas": 6702
    },
    "byOperation": {
      "venta": 946630,
      "renta": 83481,
      "desarrollo": 0
    }
  },
  "amenitiesDistribution": {
    "gimnasio": 24,
    "roof garden": 20,
    "alberca": 11,
    "circuito cerrado": 12,
    "jardín": 1,
    "estacionamientos": 2
  },
  "parkingDistribution": {
    "1": 1665,
    "2": 1738,
    "3": 336,
    "4": 300,
    "5": 103,
    "6": 80,
    "7": 39,
    "8": 50,
    "9": 18,
    "10": 56,
    "11": 15,
    "12": 25,
    "13": 4,
    "14": 12,
    "15": 11,
    "16": 11,
    "17": 6,
    "18": 2,
    "19": 1,
    "20": 8,
    "21": 3,
    "22": 1,
    "25": 4,
    "26": 2,
    "27": 2,
    "30": 7,
    "31": 1,
    "32": 2,
    "33": 1,
    "34": 2,
    "35": 4,
    "38": 1,
    "40": 5,
    "41": 1,
    "45": 2,
    "46": 2,
    "50": 4,
    "56": 1,
    "60": 2,
    "64": 1,
    "65": 1,
    "70": 2,
    "71": 1,
    "72": 3,
    "75": 1,
    "78": 1,
    "80": 2,
    "87": 1,
    "89": 1,
    "100": 5,
    "120": 1,
    "123": 1,
    "145": 1,
    "150": 1,
    "200": 3,
    "208": 1,
    "353": 1,
    "n/a": 1652
  },
  "bathroomDistribution": {
    "1": 1334,
    "2": 1981,
    "3": 766,
    "4": 399,
    "5": 129,
    "6": 61,
    "7": 16,
    "8": 19,
    "9": 6,
    "10": 11,
    "11": 2,
    "12": 2,
    "13": 3,
    "14": 3,
    "15": 2,
    "16": 3,
    "17": 1,
    "18": 5,
    "19": 1,
    "20": 2,
    "24": 2,
    "25": 1,
    "30": 2,
    "31": 1,
    "39": 1,
    "56": 1,
    "59": 1,
    "99": 1,
    "n/a": 1451
  },
  "propertyAgeDistribution": {
    "new construction": 2217,
    "1-5 years": 1316,
    "6-10 years": 755,
    "11-20 years": 833,
    "over 20 years": 1086
  },
  "maintenanceFeeStats": {
    "averageByPropertyType": {},
    "distribution": {
      "no fee": 6207,
      "under 1000": 0,
      "1000-3000": 0,
      "3000-5000": 0,
      "over 5000": 0
    }
  },
  "topLocations": {
    "byPrice": [
      {
        "area": "cuauhtémoc",
        "averagePrice": 2126275000,
        "count": 2
      },
      {
        "area": "8 de julio 1a secc",
        "averagePrice": 250000000,
        "count": 1
      },
      {
        "area": "lomas de guevara",
        "averagePrice": 36911173,
        "count": 24
      },
      {
        "area": "san miguel de huentitan el alto",
        "averagePrice": 33518258,
        "count": 19
      },
      {
        "area": "barrio agua azul",
        "averagePrice": 32000000,
        "count": 1
      },
      {
        "area": "ladrón de guevara",
        "averagePrice": 27681891,
        "count": 211
      },
      {
        "area": "lázaro cárdenas sur",
        "averagePrice": 26871750,
        "count": 4
      },
      {
        "area": "angel guzmán",
        "averagePrice": 26425000,
        "count": 1
      },
      {
        "area": "unidad habitacional el zalate infonavit",
        "averagePrice": 24500000,
        "count": 1
      },
      {
        "area": "barrio san bernardo",
        "averagePrice": 23460000,
        "count": 1
      }
    ],
    "byVolume": [
      {
        "area": "americana",
        "count": 669
      },
      {
        "area": "providencia",
        "count": 566
      },
      {
        "area": "country club",
        "count": 331
      },
      {
        "area": "arcos vallarta",
        "count": 257
      },
      {
        "area": "ladrón de guevara",
        "count": 211
      },
      {
        "area": "guadalajara centro",
        "count": 188
      },
      {
        "area": "chapalita",
        "count": 184
      },
      {
        "area": "fraccionamiento colomos providencia",
        "count": 163
      },
      {
        "area": "moderna",
        "count": 134
      },
      {
        "area": "jardines del bosque",
        "count": 132
      }
    ]
  },
  "cityStats": {
    "guadalajara": {
      "totalProperties": 6207,
      "averagePricing": 7112048,
      "propertyTypeDistribution": {
        "desarrollos verticales": 29,
        "casas": 1564,
        "locales comerciales": 480,
        "oficinas": 923,
        "edificios": 97,
        "casas uso de suelo": 50,
        "bodegas comerciales": 225,
        "locales en centro comercial": 36,
        "casas en condominio": 51,
        "departamentos": 2427,
        "terrenos": 182,
        "quintas": 2,
        "townhouses": 0
      },
      "operationTypeDistribution": {
        "venta": 3694,
        "renta": 2509,
        "desarrollo": 0
      },
      "averagePriceByType": {
        "desarrollos verticales": 2848098,
        "casas": 5600568,
        "locales comerciales": 3290894,
        "oficinas": 2330071,
        "edificios": 19050653,
        "casas uso de suelo": 7840376,
        "bodegas comerciales": 24150825,
        "locales en centro comercial": 1728868,
        "casas en condominio": 7837976,
        "departamentos": 7622295,
        "terrenos": 20148759,
        "quintas": 15849500,
        "townhouses": 0
      },
      "pricePerSquareMeter": {
        "average": 597126,
        "byPropertyType": {
          "desarrollos verticales": 2848098,
          "casas": 68016,
          "locales comerciales": 124669,
          "oficinas": 225957,
          "edificios": 1045742,
          "casas uso de suelo": 17093,
          "bodegas comerciales": 150749,
          "locales en centro comercial": 17010,
          "casas en condominio": 26025,
          "departamentos": 93076,
          "terrenos": 12742560,
          "quintas": 7223,
          "townhouses": 0
        },
        "byOperation": {
          "venta": 946630,
          "renta": 83481,
          "desarrollo": 0
        }
      }
    }
  }
};
