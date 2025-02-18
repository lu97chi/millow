"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyService } from "@/server/services/property-service";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyStats } from "@/components/properties/property-stats";
import { PropertySort } from "@/components/properties/property-sort";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { Amenity, OperationType, PropertyFilters, PropertyTypeName, PropertyEntityType, PropertyStatus, Property } from "@/types";
//import { Metadata } from "next";

// Valid view modes
const VALID_VIEW_MODES = ['grid', 'list'] as const;
type ViewMode = typeof VALID_VIEW_MODES[number];

// Helper to get search param value
function getSearchParam(params: URLSearchParams, key: string): string | undefined {
  return params.get(key) || undefined;
}

// Helper to get search param number value
function getSearchParamNumber(params: URLSearchParams, key: string): number | undefined {
  const value = params.get(key);
  return value ? Number(value) : undefined;
}

// Helper to parse search params into filters
function parseFilters(searchParams: URLSearchParams): Partial<PropertyFilters> {
  const filters: Partial<PropertyFilters> = {};

  // Add pagination parameters
  filters.page = getSearchParamNumber(searchParams, 'page') || 1;
  filters.pageSize = 30;

  // Basic filters
  const id = getSearchParam(searchParams, 'id');
  if (id) filters.id = id;

  const title = getSearchParam(searchParams, 'title');
  if (title) filters.title = title;

  const description = getSearchParam(searchParams, 'description');
  if (description) filters.description = description;

  // Array-based type filters
  const propertyType = getSearchParam(searchParams, 'propertyType');
  if (propertyType) {
    filters.propertyType = propertyType.split(',') as PropertyTypeName[];
  }

  const operationType = getSearchParam(searchParams, 'operationType');
  if (operationType) {
    filters.operationType = operationType.split(',') as OperationType[];
  }

  const type = getSearchParam(searchParams, 'type');
  if (type) {
    filters.type = type.split(',') as PropertyEntityType[];
  }

  // Price filters
  const price = getSearchParamNumber(searchParams, 'price');
  if (price !== undefined) filters.price = price;

  const minPrice = getSearchParamNumber(searchParams, 'minPrice');
  if (minPrice !== undefined) filters.minPrice = minPrice;

  const maxPrice = getSearchParamNumber(searchParams, 'maxPrice');
  if (maxPrice !== undefined) filters.maxPrice = maxPrice;

  // Location filters
  const state = getSearchParam(searchParams, 'state');
  const city = getSearchParam(searchParams, 'city');
  const area = getSearchParam(searchParams, 'area');
  const address = getSearchParam(searchParams, 'address');
  const lat = getSearchParamNumber(searchParams, 'lat');
  const lng = getSearchParamNumber(searchParams, 'lng');

  if (state || city || area || address || lat || lng) {
    filters.location = {
      state: state ? state.split(',') : undefined,
      city: city ? city.split(',') : undefined,
      area: area ? area.split(',') : undefined,
      address,
      coordinates: lat && lng ? { lat, lng } : undefined
    };
  }

  // Features filters with ranges
  const bedrooms = getSearchParamNumber(searchParams, 'bedrooms');
  const bathrooms = getSearchParamNumber(searchParams, 'bathrooms');
  const parking = getSearchParamNumber(searchParams, 'parking');
  const floors = getSearchParamNumber(searchParams, 'floors');
  const minConstructionSize = getSearchParamNumber(searchParams, 'minConstructionSize');
  const maxConstructionSize = getSearchParamNumber(searchParams, 'maxConstructionSize');
  const minLotSize = getSearchParamNumber(searchParams, 'minLotSize');
  const maxLotSize = getSearchParamNumber(searchParams, 'maxLotSize');

  if (bedrooms || bathrooms || parking || floors || 
      minConstructionSize || maxConstructionSize || 
      minLotSize || maxLotSize) {
    filters.features = {
      bedrooms: bedrooms ?? undefined,
      bathrooms: bathrooms ?? undefined,
      constructionSize: minConstructionSize || maxConstructionSize ? {
        min: minConstructionSize,
        max: maxConstructionSize
      } : undefined,
      lotSize: minLotSize || maxLotSize ? {
        min: minLotSize,
        max: maxLotSize
      } : undefined,
      parking: parking ?? undefined,
      floors: floors ?? undefined
    };
  }

  // Amenities filter
  const amenities = getSearchParam(searchParams, 'amenities');
  if (amenities) {
    filters.amenities = amenities.split(',') as Amenity[];
  }

  // Property age filter
  const propertyAge = getSearchParamNumber(searchParams, 'propertyAge');
  if (propertyAge !== undefined) filters.propertyAge = propertyAge;

  // Maintenance fee range filter
  const minMaintenanceFee = getSearchParamNumber(searchParams, 'minMaintenanceFee');
  const maxMaintenanceFee = getSearchParamNumber(searchParams, 'maxMaintenanceFee');
  if (minMaintenanceFee || maxMaintenanceFee) {
    filters.maintenanceFee = {
      min: minMaintenanceFee,
      max: maxMaintenanceFee
    };
  }

  // Status filter
  const status = getSearchParam(searchParams, 'status');
  if (status) {
    filters.status = status.split(',') as PropertyStatus[];
  }

  // Sort filter
  const sort = getSearchParam(searchParams, 'sort');
  if (sort) {
    filters.sortBy = sort as 'price asc' | 'price desc' | 'age asc' | 'age desc';
  }

  // View mode
  const view = getSearchParam(searchParams, 'view');
  if (view && VALID_VIEW_MODES.includes(view as ViewMode)) {
    filters.viewMode = view as ViewMode;
  }

  return filters;
}

// Separate the content into its own component
function PropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const viewParam = searchParams.get('view');
    return typeof viewParam === 'string' && VALID_VIEW_MODES.includes(viewParam as ViewMode)
      ? viewParam as ViewMode
      : 'grid';
  });

  useEffect(() => {
    async function loadProperties() {
      setLoading(true);
      try {
        const filters = parseFilters(searchParams);
        const propertyService = PropertyService.getInstance();
        const { properties: loadedProperties, total } = await propertyService.getProperties(filters);
        setProperties(loadedProperties);
        setTotalProperties(total);
      } catch (error) {
        console.error('Error loading properties:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/properties?${params.toString()}`);
  };

  const handleViewChange = (newView: ViewMode) => {
    const params = new URLSearchParams(searchParams);
    params.set('view', newView);
    router.push(`/properties?${params.toString()}`);
    setViewMode(newView);
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Stats and View Toggle */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PropertyStats properties={properties} total={totalProperties} />
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border p-1" role="group" aria-label="Cambiar vista">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleViewChange('grid')}
              aria-label="Vista en cuadrícula"
              aria-pressed={viewMode === 'grid'}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => handleViewChange('list')}
              aria-label="Vista en lista"
              aria-pressed={viewMode === 'list'}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          <PropertySort />
        </div>
      </div>
  
      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <main className="md:col-span-12">
          {properties.length > 0 ? (
             <div 
             className={viewMode === 'grid' ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3" : "space-y-8"}
             role="region"
             aria-label="Lista de propiedades"
           >
              {properties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  view={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">
                No se encontraron propiedades con los filtros seleccionados
              </p>
            </div>
          )}
  
          {/* Pagination */}
          {totalProperties > 0 && (
           <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(Math.max(1, (parseFilters(searchParams).page || 1) - 1))}
                disabled={parseFilters(searchParams).page === 1}
              >
                Previous
              </Button>
              <span className="py-2 px-4">
                Page {parseFilters(searchParams).page || 1} of {Math.ceil(totalProperties / 30)}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange((parseFilters(searchParams).page || 1) + 1)}
                disabled={(parseFilters(searchParams).page || 1) >= Math.ceil(totalProperties / 30)}
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
// Metadata page property
/*
export const metadata: Metadata = {
title:"Properties",
description:"Encuentra las mejores propiedades en Mexico",
}
*/

// Main page component with Suspense boundary
export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="container py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}
