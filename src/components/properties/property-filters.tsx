"use client";

import { useSearchStore } from "@/store/use-search-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
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

export function PropertyFilters() {
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

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Filtros</h2>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Limpiar
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        <div className="space-y-6">
          {/* Property Types */}
          <div className="space-y-4">
            <h3 className="font-medium">Tipo de propiedad</h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((type) => (
                <Badge
                  key={type.value}
                  variant={filters.propertyType.includes(type.value) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (filters.propertyType.includes(type.value)) {
                      setPropertyTypes(filters.propertyType.filter((t) => t !== type.value));
                    } else {
                      setPropertyTypes([...filters.propertyType, type.value]);
                    }
                  }}
                >
                  <type.icon className="mr-1 h-3 w-3" />
                  {type.name}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Location */}
          <div className="space-y-4">
            <h3 className="font-medium">Ubicación</h3>
            <div className="space-y-2">
              <select
                className="w-full rounded-md border p-2"
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
                  className="w-full rounded-md border p-2"
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

          <Separator />

          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium">Precio</h3>
            <div className="space-y-4">
              <Slider
                min={PRICE_RANGE.min}
                max={PRICE_RANGE.max}
                step={PRICE_RANGE.step}
                value={[filters.priceRange.min, filters.priceRange.max]}
                onValueChange={([min, max]) => setPriceRange({ min, max })}
              />
              <div className="flex items-center justify-between text-sm">
                <span>
                  Min: ${(filters.priceRange.min / 1000000).toFixed(1)}M
                </span>
                <span>
                  Max: ${(filters.priceRange.max / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-medium">Características</h3>
            <div className="grid grid-cols-2 gap-2">
              <select
                className="rounded-md border p-2"
                value={filters.features.bedrooms || ""}
                onChange={(e) => setFeatures({ ...filters.features, bedrooms: e.target.value ? parseInt(e.target.value) : undefined })}
              >
                <option value="">Recámaras</option>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}+
                  </option>
                ))}
              </select>
              <select
                className="rounded-md border p-2"
                value={filters.features.bathrooms || ""}
                onChange={(e) => setFeatures({ ...filters.features, bathrooms: e.target.value ? parseInt(e.target.value) : undefined })}
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

          <Separator />

          {/* Construction Size */}
          <div className="space-y-4">
            <h3 className="font-medium">Tamaño de construcción</h3>
            <div className="space-y-4">
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
              />
              <div className="flex items-center justify-between text-sm">
                <span>Min: {filters.features.constructionSize?.min || 0}m²</span>
                <span>Max: {filters.features.constructionSize?.max || 1000}m²</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Lot Size */}
          <div className="space-y-4">
            <h3 className="font-medium">Tamaño de terreno</h3>
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

          <Separator />

          {/* Amenities */}
          <div className="space-y-4">
            <h3 className="font-medium">Amenidades</h3>
            <div className="flex flex-wrap gap-2">
              {AMENITIES.map((amenity) => (
                <Badge
                  key={amenity.value}
                  variant={filters.amenities.includes(amenity.value) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (filters.amenities.includes(amenity.value)) {
                      setAmenities(filters.amenities.filter((a) => a !== amenity.value));
                    } else {
                      setAmenities([...filters.amenities, amenity.value]);
                    }
                  }}
                >
                  <amenity.icon className="mr-1 h-3 w-3" />
                  {amenity.label}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Property Age */}
          <div className="space-y-4">
            <h3 className="font-medium">Antigüedad</h3>
            <div className="flex flex-wrap gap-2">
              {PROPERTY_AGE_OPTIONS.map((option) => (
                <Badge
                  key={option.value}
                  variant={filters.propertyAge === option.value ? "default" : "outline"}
                  className="cursor-pointer"
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

          <Separator />

          {/* Maintenance Fee */}
          <div className="space-y-4">
            <h3 className="font-medium">Cuota de mantenimiento</h3>
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
  );
} 