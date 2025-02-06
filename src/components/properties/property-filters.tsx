"use client";

import * as React from "react";
import { useSearchStore } from "@/store/use-search-store";
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
} from "@/constants/properties";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PropertyFiltersProps {
  className?: string;
  hideToggle?: boolean;
  onClose?: () => void;
}

export function PropertyFilters({ className, hideToggle, onClose }: PropertyFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const {
    filters,
    setPropertyTypes,
    setPriceRange,
    setLocation,
    setFeatures,
    setAmenities,
    setPropertyAge,
    setMaintenanceFee,
    resetFilters,
  } = useSearchStore();

  const showFilters = hideToggle || isOpen;

  return (
    <div className={cn("relative", className)}>
      {!hideToggle && (
        <Button
          variant="outline"
          size="sm"
          className="ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <SlidersHorizontal className={cn(
            "mr-2 h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} />
          {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
        </Button>
      )}

      {showFilters && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
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
                  <p className="text-xs text-muted-foreground">Personaliza tu búsqueda</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Limpiar
                  </Button>
                  {onClose && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-muted"
                      onClick={onClose}
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
                          variant={filters.propertyType.includes(type.value) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => {
                            if (filters.propertyType.includes(type.value)) {
                              setPropertyTypes(filters.propertyType.filter((t) => t !== type.value));
                            } else {
                              setPropertyTypes([...filters.propertyType, type.value]);
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
                        value={filters.location.state || ""}
                        onChange={(e) => setLocation({ state: e.target.value || undefined, city: undefined })}
                      >
                        <option value="">Todos los estados</option>
                        {Object.keys(LOCATIONS).map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      {filters.location.state && (
                        <select
                          className="w-full rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                          value={filters.location.city || ""}
                          onChange={(e) => setLocation({ ...filters.location, city: e.target.value || undefined })}
                        >
                          <option value="">Todas las ciudades</option>
                          {LOCATIONS[filters.location.state].map((city) => (
                            <option key={city} value={city}>
                              {city}
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
                        value={[filters.priceRange.min, filters.priceRange.max]}
                        onValueChange={([min, max]) => setPriceRange({ min, max })}
                        className="py-4"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>${(filters.priceRange.min / 1000000).toFixed(1)}M</span>
                        <span>${(filters.priceRange.max / 1000000).toFixed(1)}M</span>
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
                        value={filters.features.bedrooms || ""}
                        onChange={(e) => setFeatures({ ...filters.features, bedrooms: e.target.value ? parseInt(e.target.value) : undefined })}
                      >
                        <option value="">Recámaras</option>
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>{n}+</option>
                        ))}
                      </select>
                      <select
                        className="rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                        value={filters.features.bathrooms || ""}
                        onChange={(e) => setFeatures({ ...filters.features, bathrooms: e.target.value ? parseInt(e.target.value) : undefined })}
                      >
                        <option value="">Baños</option>
                        {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((n) => (
                          <option key={n} value={n}>{n}+</option>
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
                          filters.features.constructionSize?.min || CONSTRUCTION_SIZE_RANGE.min,
                          filters.features.constructionSize?.max || CONSTRUCTION_SIZE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) =>
                          setFeatures({
                            ...filters.features,
                            constructionSize: { min, max },
                          })
                        }
                        className="py-4"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{filters.features.constructionSize?.min || 0}m²</span>
                        <span>{filters.features.constructionSize?.max || 1000}m²</span>
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
                          filters.features.lotSize?.min || LOT_SIZE_RANGE.min,
                          filters.features.lotSize?.max || LOT_SIZE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) =>
                          setFeatures({
                            ...filters.features,
                            lotSize: { min, max },
                          })
                        }
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Min: {filters.features.lotSize?.min || 0}m²</span>
                        <span>Max: {filters.features.lotSize?.max || 2000}m²</span>
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
                          variant={filters.amenities.includes(amenity.value) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => {
                            if (filters.amenities.includes(amenity.value)) {
                              setAmenities(filters.amenities.filter((a) => a !== amenity.value));
                            } else {
                              setAmenities([...filters.amenities, amenity.value]);
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
                          variant={filters.propertyAge === option.value ? "default" : "outline"}
                          className="cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => {
                            if (filters.propertyAge === option.value) {
                              setPropertyAge(undefined);
                            } else {
                              setPropertyAge(option.value);
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
                    <h3 className="text-sm font-medium">Cuota de mantenimiento</h3>
                    <div className="space-y-4">
                      <Slider
                        min={MAINTENANCE_FEE_RANGE.min}
                        max={MAINTENANCE_FEE_RANGE.max}
                        step={MAINTENANCE_FEE_RANGE.step}
                        value={[
                          filters.maintenanceFee?.min || MAINTENANCE_FEE_RANGE.min,
                          filters.maintenanceFee?.max || MAINTENANCE_FEE_RANGE.max,
                        ]}
                        onValueChange={([min, max]) => setMaintenanceFee({ min, max })}
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span>Min: ${filters.maintenanceFee?.min || 0}</span>
                        <span>Max: ${filters.maintenanceFee?.max || 10000}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </motion.div>
        </>
      )}
    </div>
  );
} 