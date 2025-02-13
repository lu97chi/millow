"use client";

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  SlidersHorizontal, 
  X, 
  MapPin, 
  Building2, 
  Map,
  BedDouble,
  Bath,
  Car,
  Building,
  Ruler,
  Trees,
  Calendar,
  CreditCard,
  Home,
  Key,
  Hammer,
  LayoutGrid,
  List as ListIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  PROPERTY_TYPES,
  AMENITIES,
} from "@/server/data/constants";
import type {
  Amenity,
  OperationType,
  PropertyFilters,
  PropertyTypeName,
} from "@/types";

// Define view mode type
type ViewMode = "grid" | "list";

// Update PropertyFiltersProps interface
interface PropertyFiltersProps {
  className?: string;
  hideToggle?: boolean;
  onClose?: () => void;
  onFiltersChange?: (filters: PropertyFilters) => void;
  onViewChange?: (view: ViewMode) => void;
  view?: ViewMode;
}

// Initialize filters with default values
const defaultFilters: PropertyFilters = {
  propertyType: [],
  operationType: [],
  location: {
    state: [],
    city: [],
    area: []
  },
  features: {
    constructionSize: {},
    lotSize: {},
    bedrooms: undefined,
    bathrooms: undefined,
    parking: undefined,
    floors: undefined
  },
  amenities: [],
  maintenanceFee: {}
};

// Separate the content into its own component
function PropertyFiltersContent({ 
  className,
  hideToggle = false,
  onClose,
  onFiltersChange,
  onViewChange,
  view = "grid",
}: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Initialize filters from URL params
  const [localFilters, setLocalFilters] = React.useState<PropertyFilters>(() => {
    const params = new URLSearchParams(searchParams.toString());
    const filters: PropertyFilters = {
      propertyType: params.get("propertyType")?.split(",") as PropertyTypeName[] || [],
      operationType: params.get("operationType")?.split(",") as OperationType[] || [],
      location: {
        state: params.get("state")?.split(",") || [],
        city: params.get("city")?.split(",") || [],
        area: params.get("area")?.split(",") || [],
      },
      features: {
        bedrooms: params.get("bedrooms") ? Number(params.get("bedrooms")) : undefined,
        bathrooms: params.get("bathrooms") ? Number(params.get("bathrooms")) : undefined,
        parking: params.get("parking") ? Number(params.get("parking")) : undefined,
        floors: params.get("floors") ? Number(params.get("floors")) : undefined,
        constructionSize: {
          min: params.get("minConstructionSize") ? Number(params.get("minConstructionSize")) : undefined,
          max: params.get("maxConstructionSize") ? Number(params.get("maxConstructionSize")) : undefined,
        },
        lotSize: {
          min: params.get("minLotSize") ? Number(params.get("minLotSize")) : undefined,
          max: params.get("maxLotSize") ? Number(params.get("maxLotSize")) : undefined,
        }
      },
      amenities: params.get("amenities")?.split(",") as Amenity[] || [],
      propertyAge: params.get("propertyAge") ? Number(params.get("propertyAge")) : undefined,
      maintenanceFee: {
        min: params.get("minMaintenanceFee") ? Number(params.get("minMaintenanceFee")) : undefined,
        max: params.get("maxMaintenanceFee") ? Number(params.get("maxMaintenanceFee")) : undefined,
      }
    };
    return filters;
  });

  // Keep localFilters in sync with URL changes
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setLocalFilters(prev => ({
      ...prev,
      propertyType: params.get("propertyType")?.split(",") as PropertyTypeName[] || prev.propertyType || [],
      operationType: params.get("operationType")?.split(",") as OperationType[] || prev.operationType || [],
      location: {
        state: params.get("state")?.split(",") || prev.location?.state || [],
        city: params.get("city")?.split(",") || prev.location?.city || [],
        area: params.get("area")?.split(",") || prev.location?.area || [],
      },
      features: {
        ...(prev.features || {}),
        bedrooms: params.get("bedrooms") ? Number(params.get("bedrooms")) : prev.features?.bedrooms,
        bathrooms: params.get("bathrooms") ? Number(params.get("bathrooms")) : prev.features?.bathrooms,
        parking: params.get("parking") ? Number(params.get("parking")) : prev.features?.parking,
        floors: params.get("floors") ? Number(params.get("floors")) : prev.features?.floors,
        constructionSize: {
          min: params.get("minConstructionSize") ? Number(params.get("minConstructionSize")) : prev.features?.constructionSize?.min,
          max: params.get("maxConstructionSize") ? Number(params.get("maxConstructionSize")) : prev.features?.constructionSize?.max,
        },
        lotSize: {
          min: params.get("minLotSize") ? Number(params.get("minLotSize")) : prev.features?.lotSize?.min,
          max: params.get("maxLotSize") ? Number(params.get("maxLotSize")) : prev.features?.lotSize?.max,
        }
      },
      amenities: params.get("amenities")?.split(",") as Amenity[] || prev.amenities || [],
      propertyAge: params.get("propertyAge") ? Number(params.get("propertyAge")) : prev.propertyAge,
      maintenanceFee: {
        min: params.get("minMaintenanceFee") ? Number(params.get("minMaintenanceFee")) : prev.maintenanceFee?.min,
        max: params.get("maxMaintenanceFee") ? Number(params.get("maxMaintenanceFee")) : prev.maintenanceFee?.max,
      }
    }));
  }, [searchParams]);

  const showFilters = hideToggle || isOpen;

  // Handler functions
  const handleReset = () => {
    setLocalFilters(defaultFilters);
    router.replace(window.location.pathname, { scroll: false });
    onClose?.();
  };

  const handlePropertyTypeChange = (type: PropertyTypeName) => {
    setLocalFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType?.includes(type)
        ? prev.propertyType.filter(t => t !== type)
        : [...(prev.propertyType || []), type]
    }));
  };

  const handleOperationTypeChange = (type: OperationType) => {
    setLocalFilters(prev => ({
      ...prev,
      operationType: prev.operationType?.includes(type)
        ? prev.operationType.filter(t => t !== type)
        : [...(prev.operationType || []), type]
    }));
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setLocalFilters(prev => ({
      ...prev,
      [type === "min" ? "minPrice" : "maxPrice"]: numValue
    }));
  };

  const handleLocationChange = (field: 'state' | 'city' | 'area', value: string[]) => {
    setLocalFilters(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
        // Reset dependent fields
        ...(field === 'state' ? { city: [], area: [] } : {}),
        ...(field === 'city' ? { area: [] } : {})
      }
    }));
  };

  const handleFeatureChange = (
    field: 'bedrooms' | 'bathrooms' | 'parking' | 'floors',
    value: number | undefined
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [field]: value
      }
    }));
  };

  const handleSizeChange = (type: "construction" | "lot", field: "min" | "max", value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setLocalFilters(prev => ({
      ...prev,
      features: {
        ...(prev.features || {}),
        [`${type}Size`]: {
          ...(prev.features?.[`${type}Size`] || {}),
          [field]: numValue
        }
      }
    }));
  };

  const handleAmenityChange = (amenity: Amenity) => {
    setLocalFilters(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  const handlePropertyAgeChange = (value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setLocalFilters(prev => ({
      ...prev,
      propertyAge: numValue
    }));
  };

  const handleMaintenanceFeeChange = (field: "min" | "max", value: string) => {
    const numValue = value ? parseInt(value) : undefined;
    setLocalFilters(prev => ({
      ...prev,
      maintenanceFee: {
        ...(prev.maintenanceFee || {}),
        [field]: numValue
      }
    }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Property Type
    if (localFilters.propertyType?.length) {
      params.set("propertyType", localFilters.propertyType.join(","));
    } else {
      params.delete("propertyType");
    }
    
    // Operation Type
    if (localFilters.operationType?.length) {
      params.set("operationType", localFilters.operationType.join(","));
    } else {
      params.delete("operationType");
    }
    
    // Price Range
    if (localFilters.minPrice) {
      params.set("minPrice", localFilters.minPrice.toString());
    } else {
      params.delete("minPrice");
    }
    
    if (localFilters.maxPrice) {
      params.set("maxPrice", localFilters.maxPrice.toString());
    } else {
      params.delete("maxPrice");
    }
    
    // Location
    if (localFilters.location?.state?.length) {
      params.set("state", localFilters.location.state.join(","));
    } else {
      params.delete("state");
    }
    
    if (localFilters.location?.city?.length) {
      params.set("city", localFilters.location.city.join(","));
    } else {
      params.delete("city");
    }
    
    if (localFilters.location?.area?.length) {
      params.set("area", localFilters.location.area.join(","));
    } else {
      params.delete("area");
    }
    
    // Features
    if (localFilters.features?.bedrooms) {
      params.set("bedrooms", localFilters.features.bedrooms.toString());
    } else {
      params.delete("bedrooms");
    }
    
    if (localFilters.features?.bathrooms) {
      params.set("bathrooms", localFilters.features.bathrooms.toString());
    } else {
      params.delete("bathrooms");
    }
    
    if (localFilters.features?.parking) {
      params.set("parking", localFilters.features.parking.toString());
    } else {
      params.delete("parking");
    }
    
    if (localFilters.features?.floors) {
      params.set("floors", localFilters.features.floors.toString());
    } else {
      params.delete("floors");
    }
    
    // Construction Size
    if (localFilters.features?.constructionSize?.min) {
      params.set("minConstructionSize", localFilters.features.constructionSize.min.toString());
    } else {
      params.delete("minConstructionSize");
    }
    
    if (localFilters.features?.constructionSize?.max) {
      params.set("maxConstructionSize", localFilters.features.constructionSize.max.toString());
    } else {
      params.delete("maxConstructionSize");
    }
    
    // Lot Size
    if (localFilters.features?.lotSize?.min) {
      params.set("minLotSize", localFilters.features.lotSize.min.toString());
    } else {
      params.delete("minLotSize");
    }
    
    if (localFilters.features?.lotSize?.max) {
      params.set("maxLotSize", localFilters.features.lotSize.max.toString());
    } else {
      params.delete("maxLotSize");
    }
    
    // Amenities
    if (localFilters.amenities?.length) {
      params.set("amenities", localFilters.amenities.join(","));
    } else {
      params.delete("amenities");
    }
    
    // Property Age
    if (localFilters.propertyAge) {
      params.set("propertyAge", localFilters.propertyAge.toString());
    } else {
      params.delete("propertyAge");
    }
    
    // Maintenance Fee
    if (localFilters.maintenanceFee?.min) {
      params.set("minMaintenanceFee", localFilters.maintenanceFee.min.toString());
    } else {
      params.delete("minMaintenanceFee");
    }
    
    if (localFilters.maintenanceFee?.max) {
      params.set("maxMaintenanceFee", localFilters.maintenanceFee.max.toString());
    } else {
      params.delete("maxMaintenanceFee");
    }
    
    router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    onFiltersChange?.(localFilters);
    onClose?.();
  };

  // Helper function to safely access location values
  const getLocationValue = (field: 'state' | 'city' | 'area'): string => {
    return localFilters.location?.[field]?.[0] ?? "";
  };

  return (
    <div className={cn("relative", className)}>
      {!hideToggle && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="min-w-[140px]"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewChange?.(view === "grid" ? "list" : "grid")}
            className="min-w-[120px]"
          >
            {view === "grid" ? (
              <>
                <ListIcon className="mr-2 h-4 w-4" />
                Ver lista
              </>
            ) : (
              <>
                <LayoutGrid className="mr-2 h-4 w-4" />
                Ver cuadrícula
              </>
            )}
          </Button>
        </div>
      )}

      {showFilters && (
        <motion.div
          initial={{ x: 420 }}
          animate={{ x: 0 }}
          exit={{ x: 420 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed right-0 top-[64px] bottom-0 w-[400px] border-l bg-background shadow-lg z-40"
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="font-semibold">Filtros</h2>
                <p className="text-sm text-muted-foreground">
                  Personaliza tu búsqueda
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <X className="mr-2 h-4 w-4" />
                  Limpiar
                </Button>
                {onClose && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Filters Content */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-6 py-6">
                {/* Property Type */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Tipo de propiedad</Label>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {PROPERTY_TYPES.map((type) => (
                      <Button
                        key={type.value}
                        variant={localFilters.propertyType?.includes(type.value as PropertyTypeName) ? "default" : "outline"}
                        size="sm"
                        className="justify-start h-auto py-2 whitespace-normal text-left"
                        onClick={() => handlePropertyTypeChange(type.value as PropertyTypeName)}
                      >
                        <type.icon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="text-sm">{type.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Operation Type */}
                <div className="space-y-4">
                  <Label>Operación</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={localFilters.operationType?.includes("Venta") ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleOperationTypeChange("Venta")}
                      className="justify-start"
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Venta
                    </Button>
                    <Button
                      variant={localFilters.operationType?.includes("Renta") ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleOperationTypeChange("Renta")}
                      className="justify-start"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Renta
                    </Button>
                    <Button
                      variant={localFilters.operationType?.includes("Desarrollo") ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleOperationTypeChange("Desarrollo")}
                      className="justify-start"
                    >
                      <Hammer className="mr-2 h-4 w-4" />
                      Desarrollo
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div className="space-y-4">
                  <Label>Rango de precio</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Mínimo</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={localFilters.minPrice || ""}
                          onChange={(e) => handlePriceChange("min", e.target.value)}
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Máximo</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Max"
                          value={localFilters.maxPrice || ""}
                          onChange={(e) => handlePriceChange("max", e.target.value)}
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Location */}
                <div className="space-y-4">
                  <Label>Ubicación</Label>
                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        value={getLocationValue("state")}
                        onChange={(e) => handleLocationChange("state", [e.target.value])}
                        placeholder="Estado"
                        className="pl-10"
                      />
                      <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>

                    {getLocationValue("state") && (
                      <div className="relative">
                        <Input
                          value={getLocationValue("city")}
                          onChange={(e) => handleLocationChange("city", [e.target.value])}
                          placeholder="Ciudad"
                          className="pl-10"
                        />
                        <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    )}

                    {getLocationValue("city") && (
                      <div className="relative">
                        <Input
                          value={getLocationValue("area")}
                          onChange={(e) => handleLocationChange("area", [e.target.value])}
                          placeholder="Zona"
                          className="pl-10"
                        />
                        <Map className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Features */}
                <div className="space-y-4">
                  <Label>Características</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Recámaras</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Recámaras"
                          value={localFilters.features?.bedrooms || ""}
                          onChange={(e) => handleFeatureChange("bedrooms", parseInt(e.target.value))}
                          className="pl-10"
                        />
                        <BedDouble className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Baños</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Baños"
                          value={localFilters.features?.bathrooms || ""}
                          onChange={(e) => handleFeatureChange("bathrooms", parseInt(e.target.value))}
                          className="pl-10"
                        />
                        <Bath className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Estacionamientos</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Estacionamientos"
                          value={localFilters.features?.parking || ""}
                          onChange={(e) => handleFeatureChange("parking", parseInt(e.target.value))}
                          className="pl-10 text-sm"
                        />
                        <Car className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Pisos</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Pisos"
                          value={localFilters.features?.floors || ""}
                          onChange={(e) => handleFeatureChange("floors", parseInt(e.target.value))}
                          className="pl-10"
                        />
                        <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Construction Size */}
                <div className="space-y-4">
                  <Label>Tamaño de construcción</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Mínimo (m²)</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={localFilters.features?.constructionSize?.min || ""}
                          onChange={(e) => handleSizeChange("construction", "min", e.target.value)}
                          className="pl-10"
                        />
                        <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Máximo (m²)</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Max"
                          value={localFilters.features?.constructionSize?.max || ""}
                          onChange={(e) => handleSizeChange("construction", "max", e.target.value)}
                          className="pl-10"
                        />
                        <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Lot Size */}
                <div className="space-y-4">
                  <Label>Tamaño de terreno</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Mínimo (m²)</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={localFilters.features?.lotSize?.min || ""}
                          onChange={(e) => handleSizeChange("lot", "min", e.target.value)}
                          className="pl-10"
                        />
                        <Trees className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Máximo (m²)</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Max"
                          value={localFilters.features?.lotSize?.max || ""}
                          onChange={(e) => handleSizeChange("lot", "max", e.target.value)}
                          className="pl-10"
                        />
                        <Trees className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Amenities */}
                <div className="space-y-4">
                  <Label>Amenidades</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {AMENITIES.map((amenity) => (
                      <Button
                        key={amenity.value}
                        variant={localFilters.amenities?.includes(amenity.value as Amenity) ? "default" : "outline"}
                        size="sm"
                        className="justify-start h-auto py-2 whitespace-normal text-left"
                        onClick={() => handleAmenityChange(amenity.value as Amenity)}
                      >
                        <amenity.icon className="mr-2 h-4 w-4 shrink-0" />
                        <span className="text-sm">{amenity.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Property Age */}
                <div className="space-y-4">
                  <Label>Antigüedad</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="Años"
                      value={localFilters.propertyAge || ""}
                      onChange={(e) => handlePropertyAgeChange(e.target.value)}
                      className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <Separator />

                {/* Maintenance Fee */}
                <div className="space-y-4">
                  <Label>Cuota de mantenimiento</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Mínimo</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={localFilters.maintenanceFee?.min || ""}
                          onChange={(e) => handleMaintenanceFeeChange("min", e.target.value)}
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Máximo</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="Max"
                          value={localFilters.maintenanceFee?.max || ""}
                          onChange={(e) => handleMaintenanceFeeChange("max", e.target.value)}
                          className="pl-10"
                        />
                        <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="border-t bg-background p-6">
              <Button className="w-full gap-2" onClick={handleApplyFilters}>
                <SlidersHorizontal className="h-4 w-4" />
                Aplicar filtros
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Main component with Suspense boundary
export function PropertyFilters(props: PropertyFiltersProps) {
  return (
    <Suspense fallback={<div className="animate-pulse">Loading filters...</div>}>
      <PropertyFiltersContent {...props} />
    </Suspense>
  );
}
