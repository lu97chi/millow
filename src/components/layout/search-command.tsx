"use client";

import * as React from "react";
import { 
  Search, 
  MapPin, 
  ChevronDown, 
  ChevronUp,
  X,
  Home,
  Building2,
  Warehouse,
  Building,
  Trees,
  Store,
  Briefcase,
  Factory,
  Castle,
  Mountain,
  HomeIcon,
  Car,
  Waves,
  Wifi,
  Shield,
  Dumbbell,
  Sofa,
  Key,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useSearchStore } from "@/store/use-search-store";
import { useSearch } from "@/providers/search-provider";
import { useRouter } from "next/navigation";

interface SearchCommandProps {
  open: boolean;
  onClose: () => void;
}

type MexicanState = "Ciudad de México" | "Guadalajara" | "Monterrey" | "Querétaro" | "Cancún" | "Los Cabos";

// Property types for suggestions with icons
const propertyTypes = [
  { 
    name: "Casa", 
    count: 156, 
    description: "Casas unifamiliares y residencias",
    icon: Home,
  },
  { 
    name: "Departamento", 
    count: 243, 
    description: "Apartamentos y condominios",
    icon: Building2,
  },
  { 
    name: "Loft", 
    count: 45, 
    description: "Espacios abiertos y modernos",
    icon: Warehouse,
  },
  { 
    name: "Penthouse", 
    count: 28, 
    description: "Departamentos de lujo en últimos pisos",
    icon: Building,
  },
  { 
    name: "Casa en condominio", 
    count: 89, 
    description: "Casas en desarrollos privados",
    icon: HomeIcon,
  },
  { 
    name: "Terreno", 
    count: 134, 
    description: "Terrenos residenciales y comerciales",
    icon: Trees,
  },
  { 
    name: "Local Comercial", 
    count: 67, 
    description: "Espacios para negocio",
    icon: Store,
  },
  { 
    name: "Oficina", 
    count: 92, 
    description: "Espacios de trabajo",
    icon: Briefcase,
  },
  { 
    name: "Bodega", 
    count: 34, 
    description: "Almacenes y espacios industriales",
    icon: Factory,
  },
  { 
    name: "Villa", 
    count: 23, 
    description: "Propiedades de lujo con amplios jardines",
    icon: Castle,
  },
  { 
    name: "Rancho", 
    count: 15, 
    description: "Propiedades rurales extensas",
    icon: Mountain,
  },
] as const;

// Mexican states and their cities (simplified for demo)
const locations = {
  "Ciudad de México": ["Álvaro Obregón", "Coyoacán", "Miguel Hidalgo"],
  "Guadalajara": ["Centro", "Zapopan", "Tlaquepaque"],
  "Monterrey": ["San Pedro", "San Nicolás", "Guadalupe"],
  "Querétaro": ["Centro", "Juriquilla", "El Marqués"],
  "Cancún": ["Zona Hotelera", "Centro", "Puerto Juárez"],
  "Los Cabos": ["San José", "San Lucas", "Cabo Este"],
} as const;

type LocationKey = keyof typeof locations;

// Add these new interfaces after the SearchCommandProps interface
interface AmenityOption {
  icon: React.ElementType;
  label: string;
  description: string;
}

// Add this after the locations constant
const amenities: AmenityOption[] = [
  { icon: Car, label: "Estacionamiento", description: "Espacio para vehículos" },
  { icon: Waves, label: "Alberca", description: "Área de natación" },
  { icon: Trees, label: "Jardín", description: "Áreas verdes" },
  { icon: Wifi, label: "Internet", description: "Conexión de alta velocidad" },
  { icon: Shield, label: "Seguridad", description: "Vigilancia 24/7" },
  { icon: Dumbbell, label: "Gimnasio", description: "Área de ejercicio" },
  { icon: Sofa, label: "Amueblado", description: "Incluye muebles" },
  { icon: Key, label: "Acceso controlado", description: "Entrada con tarjeta/código" },
  { icon: Building, label: "Elevador", description: "Acceso vertical" },
  { icon: CalendarDays, label: "Área común", description: "Espacios compartidos" },
  { icon: Warehouse, label: "Bodega", description: "Espacio de almacenamiento" },
];

export function SearchCommand({ open, onClose }: SearchCommandProps) {
  const { filters, setFilters } = useSearchStore();
  const { syncWithUrl } = useSearch();
  const router = useRouter();

  // Initialize state from the store
  const [selectedState, setSelectedState] = React.useState<MexicanState | null>(
    filters?.location?.state as MexicanState || null
  );
  const [selectedCity, setSelectedCity] = React.useState<string | undefined>(
    filters?.location?.city || undefined
  );
  const [priceRange, setPriceRangeLocal] = React.useState([
    filters?.priceRange?.min || 500000,
    filters?.priceRange?.max || 5000000
  ]);
  const [searchQuery, setSearchQuery] = React.useState(filters?.query || "");
  const [bedrooms, setBedrooms] = React.useState<number | undefined>(
    filters?.features?.bedrooms
  );
  const [bathrooms, setBathrooms] = React.useState<number | undefined>(
    filters?.features?.bathrooms
  );
  const [selectedType, setSelectedType] = React.useState<string | null>(
    filters?.propertyType?.[0] || null
  );
  const [selectedAmenities, setSelectedAmenitiesLocal] = React.useState<string[]>(
    filters?.amenities || []
  );
  const [constructionSize, setConstructionSize] = React.useState([
    filters?.features?.constructionSize?.min || 0,
    filters?.features?.constructionSize?.max || 1000
  ]);
  const [lotSize, setLotSize] = React.useState([
    filters?.features?.lotSize?.min || 0,
    filters?.features?.lotSize?.max || 2000
  ]);
  const [propertyAge, setPropertyAge] = React.useState<number | undefined>(
    filters?.propertyAge
  );
  const [maintenanceFee, setMaintenanceFee] = React.useState([
    filters?.maintenanceFee?.min || 0,
    filters?.maintenanceFee?.max || 10000
  ]);
  const [statePopoverOpen, setStatePopoverOpen] = React.useState(false);
  const [cityPopoverOpen, setCityPopoverOpen] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  // Sync changes with the store and URL
  const handleSearch = React.useCallback(() => {
    const newFilters = {
      query: searchQuery,
      propertyType: selectedType ? [selectedType] : [],
      priceRange: {
        min: priceRange[0],
        max: priceRange[1]
      },
      location: selectedState ? {
        state: selectedState,
        city: selectedCity
      } : {},
      features: {
        bedrooms,
        bathrooms,
        constructionSize: {
          min: constructionSize[0],
          max: constructionSize[1]
        },
        lotSize: {
          min: lotSize[0],
          max: lotSize[1]
        }
      },
      amenities: selectedAmenities,
      sortBy: filters?.sortBy || 'recent',
      propertyAge,
      maintenanceFee: {
        min: maintenanceFee[0],
        max: maintenanceFee[1]
      }
    };

    setFilters(newFilters);
    syncWithUrl(newFilters);
    router.push('/properties');
    onClose();
  }, [
    searchQuery, selectedType, priceRange, selectedState, selectedCity,
    bedrooms, bathrooms, selectedAmenities, constructionSize, lotSize,
    propertyAge, maintenanceFee, filters?.sortBy, setFilters, syncWithUrl, router, onClose
  ]);

  // Update local state when store changes
  React.useEffect(() => {
    if (filters) {
      setSelectedState(filters.location?.state as MexicanState || null);
      setSelectedCity(filters.location?.city);
      setPriceRangeLocal([
        filters.priceRange?.min || 500000,
        filters.priceRange?.max || 5000000
      ]);
      setSearchQuery(filters.query || "");
      setBedrooms(filters.features?.bedrooms);
      setBathrooms(filters.features?.bathrooms);
      setSelectedType(filters.propertyType?.[0] || null);
      setSelectedAmenitiesLocal(filters.amenities || []);
      setConstructionSize([
        filters.features?.constructionSize?.min || 0,
        filters.features?.constructionSize?.max || 1000
      ]);
      setLotSize([
        filters.features?.lotSize?.min || 0,
        filters.features?.lotSize?.max || 2000
      ]);
      setPropertyAge(filters.propertyAge);
      setMaintenanceFee([
        filters.maintenanceFee?.min || 0,
        filters.maintenanceFee?.max || 10000
      ]);
    }
  }, [filters]);

  // Format price to Mexican Pesos
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(price);

  // Filter suggestions based on search query
  const filteredSuggestions = React.useMemo(() => {
    if (!searchQuery) return propertyTypes.slice(0, 6);  // Show popular options when empty
    const query = searchQuery.toLowerCase();
    return propertyTypes
      .filter((type) => 
        type.name.toLowerCase().includes(query) ||
        type.description.toLowerCase().includes(query)
      )
      .slice(0, 6);
  }, [searchQuery]);

  // Get cities for selected state
  const cities = React.useMemo(() => {
    if (!selectedState) return [];
    return locations[selectedState] || [];
  }, [selectedState]);

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (open) {
          onClose();
        } else {
          document.dispatchEvent(new Event("toggle-search"));
        }
      }

      if (e.key === "Escape") {
        if (statePopoverOpen) {
          setStatePopoverOpen(false);
        } else if (cityPopoverOpen) {
          setCityPopoverOpen(false);
        } else if (open) {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onClose, statePopoverOpen, cityPopoverOpen]);

  // Handle click outside
  const searchRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[role="dialog"]') // Don't close if clicking inside a popover
      ) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  // Animation variants for suggestions
  const suggestionVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
      },
    }),
  };

  // Update search input when type is selected
  const handleTypeSelect = (type: (typeof propertyTypes)[number]) => {
    setSelectedType(type.name);
    setSearchQuery(type.name);
    // Close the suggestions dropdown after selection
    setTimeout(() => {
      const input = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (input) input.blur();
    }, 100);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-md",
          open ? "" : "pointer-events-none"
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />

      {/* Search Panel with Scrolling */}
      <motion.div
        ref={searchRef}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{
          y: open ? 0 : "-100%",
          opacity: open ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 250,
        }}
        className="fixed left-0 top-0 z-50 w-full overflow-y-auto max-h-[90vh] bg-background/95 backdrop-blur-sm shadow-2xl border-b"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container py-6">
          <div className="flex flex-col space-y-6">
            {/* Search Input */}
            <div className="relative z-50 max-w-2xl mx-auto w-full">
              <motion.div
                initial={false}
                animate={{ scale: searchQuery ? 1.01 : 1 }}
                transition={{ duration: 0.2 }}
                className="flex items-center rounded-xl border bg-background px-4 transition-all duration-300 hover:shadow-md focus-within:border-primary/50 focus-within:shadow-md"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar por tipo de propiedad..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                    if (!e.target.value) {
                      setSelectedType(null);
                    }
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  className="flex-1 bg-transparent py-3 px-3 text-base outline-none placeholder:text-muted-foreground/70"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 hover:bg-accent"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedType(null);
                      setShowSuggestions(false);
                    }}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Limpiar búsqueda</span>
                  </Button>
                )}
              </motion.div>

              {/* Suggestions Dropdown */}
              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    variants={suggestionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute top-full z-50 mt-1 w-full rounded-lg border bg-background/95 backdrop-blur-sm p-2 shadow-lg"
                  >
                    <div className="grid gap-1">
                      {searchQuery === "" && (
                        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground/80">
                          Tipos de propiedades populares
                        </div>
                      )}
                      {filteredSuggestions.map((type, i) => (
                        <motion.button
                          key={type.name}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={i}
                          onClick={() => {
                            handleTypeSelect(type);
                            setShowSuggestions(false);
                          }}
                          className={cn(
                            "group flex w-full flex-col space-y-1 rounded-md px-2 py-2 text-left text-sm transition-all duration-200 hover:bg-accent/50",
                            selectedType === type.name && "bg-accent/50"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-background/90 p-1.5 group-hover:bg-background transition-colors">
                                <type.icon className="h-3.5 w-3.5 text-foreground" />
                              </div>
                              <span className="font-medium">{type.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {type.count} propiedades
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground pl-8">
                            {type.description}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filters Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Location Selection */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium px-1">
                  {selectedType ? `${selectedType} en:` : "Ubicación"}
                </span>
                <div className="flex flex-col space-y-2">
                  {/* State Selection */}
                  <Popover open={statePopoverOpen} onOpenChange={setStatePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between rounded-lg border py-5 transition-all duration-300",
                          selectedState 
                            ? "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10" 
                            : "border-muted hover:border-muted-foreground"
                        )}
                      >
                        <div className="flex items-center truncate">
                          <MapPin className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="truncate">
                            {selectedState || "Selecciona el estado"}
                          </span>
                        </div>
                        <ChevronDown className={cn(
                          "ml-2 h-4 w-4 shrink-0 transition-transform duration-200",
                          statePopoverOpen && "rotate-180",
                          selectedState ? "text-primary" : "opacity-50"
                        )} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <div className="grid gap-1 p-2 max-h-[300px] overflow-y-auto">
                        {Object.keys(locations).map((state) => (
                          <Button
                            key={state}
                            variant="ghost"
                            className="w-full justify-start font-normal py-4"
                            onClick={() => {
                              setSelectedState(state as MexicanState);
                              setSelectedCity(undefined);
                              setStatePopoverOpen(false);
                            }}
                          >
                            <span>{state}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {Math.floor(Math.random() * 100)} propiedades
                            </span>
                          </Button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>

                  {/* City Selection */}
                  <Popover open={cityPopoverOpen} onOpenChange={setCityPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        disabled={!selectedState}
                        className={cn(
                          "w-full justify-between rounded-lg border py-5 transition-all duration-300",
                          !selectedState && "opacity-50",
                          selectedCity 
                            ? "border-primary/50 bg-primary/5 text-primary hover:bg-primary/10" 
                            : "border-muted hover:border-muted-foreground"
                        )}
                      >
                        <span className="truncate">
                          {selectedCity || "Selecciona la ciudad"}
                        </span>
                        <ChevronDown className={cn(
                          "ml-2 h-4 w-4 shrink-0 transition-transform duration-200",
                          cityPopoverOpen && "rotate-180",
                          selectedCity ? "text-primary" : "opacity-50"
                        )} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <div className="grid gap-1 p-2 max-h-[300px] overflow-y-auto">
                        {cities.map((city) => (
                          <Button
                            key={city}
                            variant="ghost"
                            className="w-full justify-start font-normal py-4"
                            onClick={() => {
                              setSelectedCity(city);
                              setCityPopoverOpen(false);
                            }}
                          >
                            <span>{city}</span>
                            <span className="ml-auto text-xs text-muted-foreground">
                              {Math.floor(Math.random() * 50)} propiedades
                            </span>
                          </Button>
                        ))}
                        {cities.length === 0 && (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            No hay ciudades disponibles
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Property Filters */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium px-1">Habitaciones</span>
                <div className="flex space-x-1.5">
                  {[0, 1, 2, 3, 4, "5+"].map((num) => (
                    <Button
                      key={num}
                      variant={bedrooms === num ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBedrooms(Number(num))}
                      className={cn(
                        "flex-1 rounded-lg border transition-all duration-200 px-0",
                        bedrooms === num ? "shadow-sm" : "hover:border-muted-foreground"
                      )}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium px-1">Baños</span>
                <div className="flex space-x-1.5">
                  {[0, 1, 2, 3, "4+"].map((num) => (
                    <Button
                      key={num}
                      variant={bathrooms === num ? "default" : "outline"}
                      size="sm"
                      onClick={() => setBathrooms(Number(num))}
                      className={cn(
                        "flex-1 rounded-lg border transition-all duration-200 px-0",
                        bathrooms === num ? "shadow-sm" : "hover:border-muted-foreground"
                      )}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Enhanced Price Range with better slider */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium px-1">Rango de precio</span>
                <div className="rounded-lg border bg-muted/30 p-4 hover:bg-muted/40 transition-colors duration-200">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-medium text-muted-foreground">
                      {formatPrice(priceRange[0])}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {formatPrice(priceRange[1])}
                    </span>
                  </div>
                  <div className="relative pt-1">
                    <Slider
                      min={0}
                      max={10000000}
                      step={100000}
                      value={priceRange}
                      onValueChange={setPriceRangeLocal}
                      className="py-1"
                    />
                    <div className="absolute -bottom-3 left-0 right-0 flex justify-between">
                      <div className="text-[10px] text-muted-foreground">$0</div>
                      <div className="text-[10px] text-muted-foreground">$10M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Search Toggle */}
            <div className="w-full">
              <Button
                variant="ghost"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground py-4 rounded-lg transition-colors duration-200"
              >
                {showAdvanced ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    <span className="font-medium">Ocultar búsqueda avanzada</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    <span className="font-medium">Mostrar búsqueda avanzada</span>
                  </>
                )}
              </Button>

              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 py-6 md:grid-cols-2 lg:grid-cols-4">
                      {/* Construction Size with improved slider */}
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium px-1">Tamaño de construcción (m²)</span>
                        <div className="rounded-lg border bg-muted/30 p-4 hover:bg-muted/40 transition-colors duration-200">
                          <div className="flex justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">
                              {constructionSize[0]} m²
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">
                              {constructionSize[1]} m²
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <Slider
                              min={0}
                              max={1000}
                              step={10}
                              value={constructionSize}
                              onValueChange={setConstructionSize}
                              className="py-1"
                            />
                            <div className="absolute -bottom-3 left-0 right-0 flex justify-between">
                              <div className="text-[10px] text-muted-foreground">0m²</div>
                              <div className="text-[10px] text-muted-foreground">1000m²</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lot Size with improved slider */}
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium px-1">Tamaño del terreno (m²)</span>
                        <div className="rounded-lg border bg-muted/30 p-4 hover:bg-muted/40 transition-colors duration-200">
                          <div className="flex justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">
                              {lotSize[0]} m²
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">
                              {lotSize[1]} m²
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <Slider
                              min={0}
                              max={2000}
                              step={50}
                              value={lotSize}
                              onValueChange={setLotSize}
                              className="py-1"
                            />
                            <div className="absolute -bottom-3 left-0 right-0 flex justify-between">
                              <div className="text-[10px] text-muted-foreground">0m²</div>
                              <div className="text-[10px] text-muted-foreground">2000m²</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Property Age */}
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium px-1">Antigüedad</span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {[
                            { value: 0, label: "Nueva" },
                            { value: 1, label: "1-5 años" },
                            { value: 5, label: "5-10 años" },
                            { value: 10, label: "10+ años" },
                          ].map((age) => (
                            <Button
                              key={age.value}
                              variant={propertyAge === age.value ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPropertyAge(age.value)}
                              className={cn(
                                "rounded-lg border transition-all duration-200",
                                propertyAge === age.value ? "shadow-sm" : "hover:border-muted-foreground"
                              )}
                            >
                              {age.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Maintenance Fee with improved slider */}
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium px-1">Cuota de mantenimiento</span>
                        <div className="rounded-lg border bg-muted/30 p-4 hover:bg-muted/40 transition-colors duration-200">
                          <div className="flex justify-between mb-3">
                            <span className="text-sm font-medium text-muted-foreground">
                              {formatPrice(maintenanceFee[0])}
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">
                              {formatPrice(maintenanceFee[1])}
                            </span>
                          </div>
                          <div className="relative pt-1">
                            <Slider
                              min={0}
                              max={10000}
                              step={500}
                              value={maintenanceFee}
                              onValueChange={setMaintenanceFee}
                              className="py-1"
                            />
                            <div className="absolute -bottom-3 left-0 right-0 flex justify-between">
                              <div className="text-[10px] text-muted-foreground">$0</div>
                              <div className="text-[10px] text-muted-foreground">$10k</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="col-span-full">
                        <span className="text-sm font-medium px-1 mb-3 block">Amenidades</span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                          {amenities.map((amenity) => {
                            const isSelected = selectedAmenities.includes(amenity.label);
                            return (
                              <div
                                key={amenity.label}
                                role="button"
                                tabIndex={0}
                                onClick={() => {
                                  setSelectedAmenitiesLocal(
                                    isSelected
                                      ? selectedAmenities.filter((a) => a !== amenity.label)
                                      : [...selectedAmenities, amenity.label]
                                  );
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedAmenitiesLocal(
                                      isSelected
                                        ? selectedAmenities.filter((a) => a !== amenity.label)
                                        : [...selectedAmenities, amenity.label]
                                    );
                                  }
                                }}
                                className={cn(
                                  "flex items-center gap-2 h-auto py-3 px-3 rounded-lg border transition-all duration-200 cursor-pointer",
                                  isSelected 
                                    ? "bg-primary text-primary-foreground shadow-sm" 
                                    : "hover:border-muted-foreground"
                                )}
                              >
                                <div className={cn(
                                  "rounded-full p-1.5 transition-colors duration-200",
                                  isSelected ? "bg-background/20" : "bg-muted"
                                )}>
                                  <amenity.icon className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex flex-col items-start">
                                  <span className="text-xs font-medium">{amenity.label}</span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {amenity.description}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-end space-x-3 pt-2"
            >
              <Button 
                variant="outline" 
                onClick={onClose}
                size="sm"
                className="rounded-lg px-6"
              >
                Cancelar
              </Button>
              <Button 
                size="sm"
                className="rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                onClick={handleSearch}
              >
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
} 