"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SlidersHorizontal, X } from "lucide-react";
import {
  PROPERTY_TYPES,
  AMENITIES,
  PROPERTY_AGE_OPTIONS,
  PRICE_RANGE,
  CONSTRUCTION_SIZE_RANGE,
  LOT_SIZE_RANGE,
  MAINTENANCE_FEE_RANGE,
  LOCATIONS,
} from "@/server/data/constants";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  Amenity,
  OperationType,
  PropertyFilters,
  PropertyTypeName,
  PropertyEntityType,
  PropertyStatus,
  CityData,
  StateType,
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

// Initial filters state
const initialFilters: Partial<PropertyFilters> = {
  propertyType: [],
  operationType: [],
  type: [],
  location: {
    state: [],
    city: [],
    area: [],
    address: "",
    coordinates: { lat: 0, lng: 0 },
  },
  features: {
    bedrooms: undefined,
    bathrooms: undefined,
    constructionSize: {
      min: undefined,
      max: undefined,
    },
    lotSize: {
      min: undefined,
      max: undefined,
    },
    parking: undefined,
    floors: undefined,
  },
  amenities: [],
  propertyAge: undefined,
  maintenanceFee: {
    min: undefined,
    max: undefined,
  },
  status: [],
  viewMode: "grid",
};

export function PropertyFilters({
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
  const [localFilters, setLocalFilters] = React.useState<Partial<PropertyFilters>>(() => {
    // Get current URL params
    const currentParams = new URLSearchParams(searchParams.toString());
    
    // Parse the current filters from URL
    const currentFilters = {
      ...initialFilters,
      propertyType: currentParams.get("propertyType")?.split(",") as PropertyTypeName[] || [],
      operationType: currentParams.get("operationType")?.split(",") as OperationType[] || [],
      type: currentParams.get("type")?.split(",") as PropertyEntityType[] || [],
      location: {
        state: currentParams.get("state")?.split(",") || [],
        city: currentParams.get("city")?.split(",") || [],
        area: currentParams.get("area")?.split(",") || [],
        address: currentParams.get("address") || "",
        coordinates: {
          lat: currentParams.get("lat") ? parseFloat(currentParams.get("lat")!) : undefined,
          lng: currentParams.get("lng") ? parseFloat(currentParams.get("lng")!) : undefined,
        },
      },
      features: {
        bedrooms: currentParams.get("bedrooms") ? parseInt(currentParams.get("bedrooms")!) : undefined,
        bathrooms: currentParams.get("bathrooms") ? parseInt(currentParams.get("bathrooms")!) : undefined,
        constructionSize: {
          min: currentParams.get("minConstructionSize") ? parseInt(currentParams.get("minConstructionSize")!) : undefined,
          max: currentParams.get("maxConstructionSize") ? parseInt(currentParams.get("maxConstructionSize")!) : undefined,
        },
        lotSize: {
          min: currentParams.get("minLotSize") ? parseInt(currentParams.get("minLotSize")!) : undefined,
          max: currentParams.get("maxLotSize") ? parseInt(currentParams.get("maxLotSize")!) : undefined,
        },
        parking: currentParams.get("parking") ? parseInt(currentParams.get("parking")!) : undefined,
        floors: currentParams.get("floors") ? parseInt(currentParams.get("floors")!) : undefined,
      },
      amenities: currentParams.get("amenities")?.split(",") as Amenity[] || [],
      propertyAge: currentParams.get("propertyAge") ? parseInt(currentParams.get("propertyAge")!) : undefined,
      maintenanceFee: {
        min: currentParams.get("minMaintenanceFee") ? parseInt(currentParams.get("minMaintenanceFee")!) : undefined,
        max: currentParams.get("maxMaintenanceFee") ? parseInt(currentParams.get("maxMaintenanceFee")!) : undefined,
      },
      status: currentParams.get("status")?.split(",") as PropertyStatus[] || [],
      viewMode: (currentParams.get("view") as "grid" | "list") || "grid",
    };
    
    return currentFilters;
  });

  // Keep track of the last applied filters
  const lastAppliedFiltersRef = React.useRef<Partial<PropertyFilters>>(localFilters);

  const showFilters = hideToggle || isOpen;

  const updateURL = (filters: Partial<PropertyFilters>) => {
    // Create new params from current URL to preserve other params
    const params = new URLSearchParams(searchParams.toString());
    
    // Update filter params
    if (filters.propertyType?.length) {
      params.set("propertyType", filters.propertyType.join(","));
    } else {
      params.delete("propertyType");
    }
    
    if (filters.operationType?.length) {
      params.set("operationType", filters.operationType.join(","));
    } else {
      params.delete("operationType");
    }
    
    if (filters.type?.length) {
      params.set("type", filters.type.join(","));
    } else {
      params.delete("type");
    }
    
    if (filters.location?.state?.length) {
      params.set("state", filters.location.state.join(","));
    } else {
      params.delete("state");
    }
    
    if (filters.location?.city?.length) {
      params.set("city", filters.location.city.join(","));
    } else {
      params.delete("city");
    }
    
    if (filters.location?.area?.length) {
      params.set("area", filters.location.area.join(","));
    } else {
      params.delete("area");
    }
    
    if (filters.location?.address) {
      params.set("address", filters.location.address);
    } else {
      params.delete("address");
    }
    
    if (filters.location?.coordinates?.lat) {
      params.set("lat", filters.location.coordinates.lat.toString());
    } else {
      params.delete("lat");
    }
    
    if (filters.location?.coordinates?.lng) {
      params.set("lng", filters.location.coordinates.lng.toString());
    } else {
      params.delete("lng");
    }
    
    if (filters.features?.bedrooms !== undefined && filters.features?.bedrooms !== null) {
      params.set("bedrooms", filters.features.bedrooms.toString());
    } else {
      params.delete("bedrooms");
    }
    
    if (filters.features?.bathrooms !== undefined && filters.features?.bathrooms !== null) {
      params.set("bathrooms", filters.features.bathrooms.toString());
    } else {
      params.delete("bathrooms");
    }
    
    if (filters.features?.constructionSize?.min !== undefined) {
      params.set("minConstructionSize", filters.features.constructionSize.min.toString());
    } else {
      params.delete("minConstructionSize");
    }
    
    if (filters.features?.constructionSize?.max !== undefined) {
      params.set("maxConstructionSize", filters.features.constructionSize.max.toString());
    } else {
      params.delete("maxConstructionSize");
    }
    
    if (filters.features?.lotSize?.min !== undefined) {
      params.set("minLotSize", filters.features.lotSize.min.toString());
    } else {
      params.delete("minLotSize");
    }
    
    if (filters.features?.lotSize?.max !== undefined) {
      params.set("maxLotSize", filters.features.lotSize.max.toString());
    } else {
      params.delete("maxLotSize");
    }
    
    if (filters.features?.parking !== undefined && filters.features?.parking !== null) {
      params.set("parking", filters.features.parking.toString());
    } else {
      params.delete("parking");
    }
    
    if (filters.features?.floors !== undefined && filters.features?.floors !== null) {
      params.set("floors", filters.features.floors.toString());
    } else {
      params.delete("floors");
    }
    
    if (filters.amenities?.length) {
      params.set("amenities", filters.amenities.join(","));
    } else {
      params.delete("amenities");
    }
    
    if (filters.propertyAge !== undefined) {
      params.set("propertyAge", filters.propertyAge.toString());
    } else {
      params.delete("propertyAge");
    }
    
    if (filters.maintenanceFee?.min !== undefined) {
      params.set("minMaintenanceFee", filters.maintenanceFee.min.toString());
    } else {
      params.delete("minMaintenanceFee");
    }
    
    if (filters.maintenanceFee?.max !== undefined) {
      params.set("maxMaintenanceFee", filters.maintenanceFee.max.toString());
    } else {
      params.delete("maxMaintenanceFee");
    }
    
    if (filters.status?.length) {
      params.set("status", filters.status.join(","));
    } else {
      params.delete("status");
    }
    
    if (filters.viewMode) {
      params.set("view", filters.viewMode);
    } else {
      params.delete("view");
    }
    
    return params;
  };

  const handleViewChange = (newView: ViewMode) => {
    onViewChange?.(newView);
  };

  const handlePropertyTypesChange = (types: PropertyTypeName[]) => {
    const newFilters = {
      ...localFilters,
      propertyType: types,
    };
    setLocalFilters(newFilters);
  };

  const handlePriceRangeChange = (range: { min?: number; max?: number }) => {
    setLocalFilters((prev: PropertyFilters) => ({
      ...prev,
      price: range.min || range.max || 0,
    }));
  };

  const handleLocationChange = (
    location: Partial<{
      state?: string[];
      city?: string[];
      area?: string[];
      address?: string;
      coordinates?: { lat?: number; lng?: number };
    }>
  ) => {
    const newFilters = {
      ...localFilters,
      location: { ...localFilters.location, ...location },
    };
    setLocalFilters(newFilters);
  };

  const handleFeaturesChange = (
    features: Partial<PropertyFilters["features"]>
  ) => {
    const newFilters = {
      ...localFilters,
      features: { ...localFilters.features, ...features },
    };
    setLocalFilters(newFilters);
  };

  const handleAmenitiesChange = (amenities: Amenity[]) => {
    const newFilters = {
      ...localFilters,
      amenities,
    };
    setLocalFilters(newFilters);
  };

  const handlePropertyAgeChange = (age: number | undefined) => {
    const newFilters = {
      ...localFilters,
      propertyAge: age,
    };
    setLocalFilters(newFilters);
  };

  const handleMaintenanceFeeChange = (
    fee: { min?: number; max?: number } | undefined
  ) => {
    const newFilters = {
      ...localFilters,
      maintenanceFee: fee,
    };
    setLocalFilters(newFilters);
  };

  const handleReset = () => {
    setLocalFilters(initialFilters);
    lastAppliedFiltersRef.current = initialFilters;
    router.replace(window.location.pathname, { scroll: false });
    onClose?.();
  };

  const handleApplyFilters = () => {
    lastAppliedFiltersRef.current = localFilters;
    const params = updateURL(localFilters);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
    onFiltersChange?.(localFilters as PropertyFilters);
    onClose?.();
  };

  // Handle closing without applying
  const handleClose = () => {
    setLocalFilters(lastAppliedFiltersRef.current);
    onClose?.();
  };

  return (
    <div className={cn("relative", className)}>
      {!hideToggle && (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <SlidersHorizontal
              className={cn(
                "mr-2 h-4 w-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
            {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewChange(view === "grid" ? "list" : "grid")}
          >
            {view === "grid" ? "Ver lista" : "Ver cuadrícula"}
          </Button>
        </div>
      )}

      {showFilters && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Filters Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-[350px] z-50"
          >
            <Card className="shadow-lg border-primary/10 bg-background/95 backdrop-blur-md">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="font-semibold">Filtros avanzados</h2>
                  <p className="text-xs text-muted-foreground">
                    Personaliza tu búsqueda
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    Limpiar
                  </Button>
                  {onClose && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted"
                      onClick={handleClose}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="px-6 py-6 space-y-6">
                  {/* Property Types */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Tipo de propiedad</h3>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_TYPES.map((type) => (
                        <Badge
                          key={type.value}
                          variant={
                            localFilters.propertyType?.includes(type.value as PropertyTypeName)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => {
                            if (localFilters.propertyType?.includes(type.value as PropertyTypeName)) {
                              handlePropertyTypesChange(
                                (localFilters.propertyType || []).filter(
                                  (t) => t !== type.value
                                ) as PropertyTypeName[]
                              );
                            } else {
                              handlePropertyTypesChange([
                                ...(localFilters.propertyType || []),
                                type.value as PropertyTypeName,
                              ]);
                            }
                          }}
                        >
                          <type.icon className="mr-1.5 h-3.5 w-3.5" />
                          {type.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Location */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Ubicación</h3>
                    <div className="space-y-3">
                      <select
                        className="w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        value={localFilters.location?.state?.join(",") || ""}
                        onChange={(e) =>
                          handleLocationChange({
                            state: e.target.value ? e.target.value.split(",") : [],
                            city: [],
                            area: [],
                          })
                        }
                      >
                        <option value="">Selecciona un estado</option>
                        {Object.keys(LOCATIONS).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>

                      {localFilters.location?.state?.length === 1 && (
                        <select
                          className="w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                          value={localFilters.location?.city?.join(",") || ""}
                          onChange={(e) =>
                            handleLocationChange({
                              city: e.target.value ? e.target.value.split(",") : [],
                              area: [],
                            })
                          }
                        >
                          <option value="">Selecciona una ciudad</option>
                          {(
                            LOCATIONS[
                              localFilters.location?.state?.[0] as StateType
                            ] || []
                          ).map((cityData: CityData) => (
                            <option key={cityData.city} value={cityData.city}>
                              {cityData.city}
                            </option>
                          ))}
                        </select>
                      )}

                      {localFilters.location?.city?.length === 1 && (
                        <select
                          className="w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                          value={localFilters.location?.area?.join(",") || ""}
                          onChange={(e) =>
                            handleLocationChange({
                              area: e.target.value ? e.target.value.split(",") : [],
                            })
                          }
                        >
                          <option value="">Selecciona una zona</option>
                          {(
                            LOCATIONS[
                              localFilters.location?.state?.[0] as StateType
                            ]?.find(
                              (c: CityData) =>
                                c.city === localFilters.location?.city?.[0]
                            )?.areas || []
                          ).map((area: string) => (
                            <option key={area} value={area}>
                              {area}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Price Range */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Precio</h3>
                    <div className="space-y-5">
                      <Slider
                        min={PRICE_RANGE.min}
                        max={PRICE_RANGE.max}
                        step={PRICE_RANGE.step}
                        value={[
                          localFilters.minPrice || PRICE_RANGE.min,
                          localFilters.maxPrice || PRICE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) =>
                          handlePriceRangeChange({ min, max })
                        }
                        className="py-4"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          $
                          {(
                            localFilters.minPrice || PRICE_RANGE.min / 1000000
                          ).toFixed(1)}
                          M
                        </span>
                        <span>
                          $
                          {(
                            localFilters.maxPrice || PRICE_RANGE.max / 1000000
                          ).toFixed(1)}
                          M
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Features */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Características</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <select
                        className="rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        value={localFilters.features?.bedrooms?.toString() || ""}
                        onChange={(e) =>
                          handleFeaturesChange({
                            ...(localFilters.features || {}),
                            bedrooms: e.target.value ? parseInt(e.target.value) : undefined,
                          })
                        }
                      >
                        <option value="">Recámaras</option>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n}+
                          </option>
                        ))}
                      </select>
                      <select
                        className="rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        value={localFilters.features?.bathrooms?.toString() || ""}
                        onChange={(e) =>
                          handleFeaturesChange({
                            ...(localFilters.features || {}),
                            bathrooms: e.target.value ? parseInt(e.target.value) : undefined,
                          })
                        }
                      >
                        <option value="">Baños</option>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}+
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Construction Size */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Tamaño de construcción</h3>
                    <div className="space-y-5">
                      <Slider
                        min={CONSTRUCTION_SIZE_RANGE.min}
                        max={CONSTRUCTION_SIZE_RANGE.max}
                        step={CONSTRUCTION_SIZE_RANGE.step}
                        value={[
                          localFilters.features?.constructionSize?.min ||
                            CONSTRUCTION_SIZE_RANGE.min,
                          localFilters.features?.constructionSize?.max ||
                            CONSTRUCTION_SIZE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) =>
                          handleFeaturesChange({
                            ...(localFilters.features || {}),
                            constructionSize: { min, max },
                          })
                        }
                        className="py-4"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {localFilters.features?.constructionSize?.min || 0}m²
                        </span>
                        <span>
                          {localFilters.features?.constructionSize?.max || 1000}m²
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Lot Size */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Tamaño de terreno</h3>
                    <div className="space-y-4">
                      <Slider
                        min={LOT_SIZE_RANGE.min}
                        max={LOT_SIZE_RANGE.max}
                        step={LOT_SIZE_RANGE.step}
                        value={[
                          localFilters.features?.lotSize?.min || LOT_SIZE_RANGE.min,
                          localFilters.features?.lotSize?.max || LOT_SIZE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) =>
                          handleFeaturesChange({
                            ...(localFilters.features || {}),
                            lotSize: { min, max },
                          })
                        }
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Min: {localFilters.features?.lotSize?.min || 0}m²</span>
                        <span>Max: {localFilters.features?.lotSize?.max || 2000}m²</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Amenidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {AMENITIES.map((amenity) => (
                        <Badge
                          key={amenity.value}
                          variant={
                            localFilters.amenities?.includes(amenity.value as Amenity)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => {
                            if (localFilters.amenities?.includes(amenity.value as Amenity)) {
                              handleAmenitiesChange(
                                (localFilters.amenities || []).filter(
                                  (a) => a !== amenity.value
                                ) as Amenity[]
                              );
                            } else {
                              handleAmenitiesChange([
                                ...(localFilters.amenities || []),
                                amenity.value as Amenity,
                              ]);
                            }
                          }}
                        >
                          <amenity.icon className="mr-1.5 h-3.5 w-3.5" />
                          {amenity.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Property Age */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Antigüedad</h3>
                    <div className="flex flex-wrap gap-2">
                      {PROPERTY_AGE_OPTIONS.map((option) => (
                        <Badge
                          key={option.value}
                          variant={
                            localFilters.propertyAge === option.value
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => {
                            if (localFilters.propertyAge === option.value) {
                              handlePropertyAgeChange(undefined);
                            } else {
                              handlePropertyAgeChange(option.value);
                            }
                          }}
                        >
                          {option.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  {/* Maintenance Fee */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">
                      Cuota de mantenimiento
                    </h3>
                    <div className="space-y-4">
                      <Slider
                        min={MAINTENANCE_FEE_RANGE.min}
                        max={MAINTENANCE_FEE_RANGE.max}
                        step={MAINTENANCE_FEE_RANGE.step}
                        value={[
                          localFilters.maintenanceFee?.min ||
                            MAINTENANCE_FEE_RANGE.min,
                          localFilters.maintenanceFee?.max ||
                            MAINTENANCE_FEE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) =>
                          handleMaintenanceFeeChange({ min, max })
                        }
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          Min: ${localFilters.maintenanceFee?.min || 0}
                        </span>
                        <span>
                          Max: ${localFilters.maintenanceFee?.max || 10000}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
              <div className="p-4 border-t bg-background/95">
                <Button className="w-full" onClick={handleApplyFilters}>
                  Buscar
                </Button>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
}
