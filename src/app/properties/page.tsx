"use client";

import { useEffect, useMemo } from "react";
import { PropertyCard } from "@/components/properties/property-card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowUpDown, 
  ListFilter,
  Search,
  X,
} from "lucide-react";
import { useSearchStore } from "@/store/use-search-store";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { PropertyGrid } from "@/components/properties/property-grid";
import { PropertyFilters } from "@/components/properties/property-filters";
import { PropertySort } from "@/components/properties/property-sort";
import { PropertyStats } from "@/components/properties/property-stats";
import { PropertyMap } from "@/components/properties/property-map";
import { SAMPLE_PROPERTIES } from "@/constants/properties";
import { Skeleton } from "@/components/ui/skeleton";

// Sample data - this would typically come from your API/database
const properties = [
  {
    id: "1",
    title: "Casa Moderna en Polanco",
    description: "Hermosa casa moderna con acabados de lujo, amplios espacios y vista panorámica.",
    price: 8500000,
    location: {
      state: "Ciudad de México",
      city: "Miguel Hidalgo",
      area: "Polanco",
    },
    features: {
      bedrooms: 4,
      bathrooms: 3.5,
      constructionSize: 280,
      lotSize: 350,
    },
    amenities: ["Estacionamiento", "Jardín", "Seguridad 24/7", "Área común"],
    images: [
      "https://placekitten.com/800/600",
      "https://placekitten.com/801/600",
      "https://placekitten.com/802/600",
    ],
    propertyType: "Casa",
    isNew: true,
  },
  {
    id: "2",
    title: "Penthouse de Lujo en Santa Fe",
    description: "Espectacular penthouse con las mejores vistas de la ciudad y amenidades de primer nivel.",
    price: 12500000,
    location: {
      state: "Ciudad de México",
      city: "Cuajimalpa",
      area: "Santa Fe",
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      constructionSize: 320,
      lotSize: 320,
    },
    amenities: ["Alberca", "Gimnasio", "Seguridad 24/7", "Estacionamiento"],
    images: [
      "https://placekitten.com/803/600",
      "https://placekitten.com/804/600",
      "https://placekitten.com/805/600",
    ],
    propertyType: "Penthouse",
    isNew: false,
  },
  {
    id: "3",
    title: "Departamento en Condesa",
    description: "Acogedor departamento en el corazón de la Condesa, cerca de parques y restaurantes.",
    price: 4500000,
    location: {
      state: "Ciudad de México",
      city: "Cuauhtémoc",
      area: "Condesa",
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      constructionSize: 120,
      lotSize: 120,
    },
    amenities: ["Estacionamiento", "Roof Garden", "Seguridad", "Elevador"],
    images: [
      "https://placekitten.com/806/600",
      "https://placekitten.com/807/600",
      "https://placekitten.com/808/600",
    ],
    propertyType: "Departamento",
    isNew: true,
  },
];

// Property types with counts
const propertyTypes = [
  { value: "casa", label: "Casas", count: 156 },
  { value: "departamento", label: "Departamentos", count: 243 },
  { value: "terreno", label: "Terrenos", count: 134 },
  { value: "local", label: "Locales", count: 67 },
  { value: "oficina", label: "Oficinas", count: 92 },
  { value: "bodega", label: "Bodegas", count: 34 },
];

export default function PropertiesPage() {
  const {
    filters,
    setQuery,
    setPropertyTypes,
    setSortBy,
  } = useSearchStore();

  // Filter properties based on search criteria
  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Text search
      if (filters.query) {
        const searchText = filters.query.toLowerCase();
        const matchesQuery = 
          property.title.toLowerCase().includes(searchText) ||
          property.description.toLowerCase().includes(searchText) ||
          property.location.area.toLowerCase().includes(searchText) ||
          property.location.city.toLowerCase().includes(searchText);
        
        if (!matchesQuery) return false;
      }

      // Property type filter
      if (filters.propertyType.length > 0) {
        if (!filters.propertyType.includes(property.propertyType.toLowerCase())) {
          return false;
        }
      }

      // Price range filter
      if (
        property.price < filters.priceRange.min ||
        property.price > filters.priceRange.max
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sort properties
  const sortedProperties = useMemo(() => {
    return [...filteredProperties].sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "recent":
        default:
          return b.id.localeCompare(a.id); // Assuming newer properties have higher IDs
      }
    });
  }, [filteredProperties, filters.sortBy]);

  // Reset scroll position when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters]);

  return (
    <main className="flex min-h-screen flex-col gap-6 p-4 md:p-6 pb-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Suspense fallback={<Skeleton className="h-8 w-[200px]" />}>
            <PropertyStats properties={SAMPLE_PROPERTIES} />
          </Suspense>
          <div className="flex items-center gap-4">
            <PropertySort />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <PropertyFilters />
          </aside>

          <div className="flex flex-col gap-6">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <PropertyMap properties={SAMPLE_PROPERTIES} />
            </Suspense>

            <Suspense 
              fallback={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array(6).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[400px] w-full" />
                  ))}
                </div>
              }
            >
              <PropertyGrid properties={SAMPLE_PROPERTIES} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
} 