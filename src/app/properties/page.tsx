"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyService } from "@/server/services/property-service";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyStats } from "@/components/properties/property-stats";
import { PropertySort } from "@/components/properties/property-sort";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import { Amenity, OperationType, PropertyFilters, PropertyTypeName, PropertyEntityType, PropertyStatus, Property } from "@/types";

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

// Helper to create URL search params
function createSearchParams(
  currentParams: URLSearchParams,
  newParams: Record<string, string | number>
): string {
  const params = new URLSearchParams(currentParams);
  
  // Add new params
  Object.entries(newParams).forEach(([key, value]) => {
    if (value !== undefined) {
      params.set(key, String(value));
    }
  });

  return params.toString();
}

// Helper to parse search params into filters
function parseFilters(searchParams: URLSearchParams): Partial<PropertyFilters> {
  const filters: Partial<PropertyFilters> = {};

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [paginatedProperties, setPaginatedProperties] = useState<Property[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Get page and view parameters
  const page = Math.max(1, Number(getSearchParamNumber(searchParams, 'page')) || 1);
  const viewParam = getSearchParam(searchParams, 'view');
  const view = typeof viewParam === 'string' && VALID_VIEW_MODES.includes(viewParam as ViewMode)
    ? viewParam as ViewMode
    : 'grid';

  useEffect(() => {
    async function loadProperties() {
      try {
        setLoading(true);
        const filters = parseFilters(searchParams);
        console.log('Applied filters:', filters);
        
        const propertyService = PropertyService.getInstance();
        const results = await propertyService.getProperties(filters);
        console.log('Results from service:', results);
        
        setProperties(results);
        
        // Handle pagination
        const total = results.length;
        console.log('Total properties:', total);
        
        const pages = Math.ceil(total / limit);
        setTotalPages(pages);

        // Validate page number
        if (page > pages && total > 0) {
          const params = createSearchParams(searchParams, { page: pages });
          router.replace(`/properties?${params}`);
          return;
        }

        // Set paginated properties
        const paginatedResults = results.slice((page - 1) * limit, page * limit);
        console.log('Paginated results:', paginatedResults);
        setPaginatedProperties(paginatedResults);
        setError(null);
      } catch (err) {
        console.error('Error loading properties:', err);
        setError('Error loading properties. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, [searchParams, page, router]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      {/* Stats and View Toggle */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PropertyStats properties={paginatedProperties} total={properties.length} />
        <div className="flex items-center gap-4">
          <div className="flex items-center rounded-lg border p-1" role="group" aria-label="Cambiar vista">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              asChild
              aria-label="Vista en cuadrícula"
              aria-pressed={view === 'grid'}
            >
              <Link href={`/properties?${createSearchParams(searchParams, { view: 'grid' })}`}>
                <LayoutGrid className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              className="h-8 w-8 p-0"
              asChild
              aria-label="Vista en lista"
              aria-pressed={view === 'list'}
            >
              <Link href={`/properties?${createSearchParams(searchParams, { view: 'list' })}`}>
                <List className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <PropertySort />
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <main className="md:col-span-12">
          {paginatedProperties.length > 0 ? (
            <div 
              className={view === 'grid' ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3" : "space-y-8"}
              role="region"
              aria-label="Lista de propiedades"
            >
              {paginatedProperties.map((property) => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  view={view}
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
          {totalPages > 1 && (
            <nav className="mt-8 flex justify-center gap-2" aria-label="Paginación">
              {page > 1 && (
                <Button variant="outline" size="lg" asChild>
                  <Link 
                    href={`/properties?${createSearchParams(searchParams, { page: page - 1 })}`}
                    aria-label={`Ir a la página ${page - 1}`}
                  >
                    Anterior
                  </Link>
                </Button>
              )}
              {page < totalPages && (
                <Button variant="outline" size="lg" asChild>
                  <Link 
                    href={`/properties?${createSearchParams(searchParams, { page: page + 1 })}`}
                    aria-label={`Ir a la página ${page + 1}`}
                  >
                    Siguiente
                  </Link>
                </Button>
              )}
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}

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
