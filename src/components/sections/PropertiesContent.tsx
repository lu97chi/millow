'use client';

import ChatInterface from '@/components/chat/ChatInterface';
import { PropertyCard, PropertyListItem } from '@/components/PropertyCard';
import { useProperties } from '@/contexts/PropertiesContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Bot,
  ChevronLeft, ChevronRight,
  Grid2x2, LayoutList,
  Loader2,
  MessageCircle,
  Search,
  Shield,
  SlidersHorizontal,
  Sparkles,
  X,
  Home,
  Building,
  Building2,
  Warehouse,
  MapPin,
  DollarSign,
  BarChart3,
  Clock,
  Filter
} from 'lucide-react';
import React, { useState, useMemo } from 'react';
import FilterPanel from './FilterPanel';
import type { PropertyFilters, Property } from '@/types/properties';

// Separate the inner content to use the context
function PropertiesContentInner() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filters, setFilters] = useState<PropertyFilters>({});
  
  const { 
    properties, 
    totalProperties, 
    explanation, 
    metadata,
    isLoading 
  } = useProperties();

  // Quick filter options
  const quickFilters = [
    { id: 'all', label: 'Todas', icon: <Home size={16} /> },
    { id: 'houses', label: 'Casas', icon: <Home size={16} /> },
    { id: 'apartments', label: 'Departamentos', icon: <Building size={16} /> },
    { id: 'commercial', label: 'Comercial', icon: <Building2 size={16} /> },
    { id: 'land', label: 'Terrenos', icon: <MapPin size={16} /> },
  ];

  // Apply filters locally to the properties
  const filteredProperties = useMemo(() => {
    if (!properties || properties.length === 0) return [];
    
    return properties.filter(property => {
      // Property Type filter
      if (filters.propertyType && property.propertyType !== filters.propertyType) {
        return false;
      }
      
      // Operation Type filter
      if (filters.operationType && property.operationType !== filters.operationType) {
        return false;
      }
      
      // Price Range filter
      if (filters.minPrice && property.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false;
      }
      
      // Bedrooms filter
      if (filters.minBedrooms && 
          (property.features.bedrooms === null || 
           property.features.bedrooms < filters.minBedrooms)) {
        return false;
      }
      if (filters.maxBedrooms && 
          property.features.bedrooms !== null && 
          property.features.bedrooms > filters.maxBedrooms) {
        return false;
      }
      
      // Bathrooms filter
      if (filters.minBathrooms && 
          (property.features.bathrooms === null || 
           property.features.bathrooms < filters.minBathrooms)) {
        return false;
      }
      if (filters.maxBathrooms && 
          property.features.bathrooms !== null && 
          property.features.bathrooms > filters.maxBathrooms) {
        return false;
      }
      
      // Location filters
      if (filters.state && property.location.state !== filters.state) {
        return false;
      }
      if (filters.city && property.location.city !== filters.city) {
        return false;
      }
      
      // Amenities filter
      if (filters.amenities && filters.amenities.length > 0) {
        // Check if property has all the required amenities
        for (const amenity of filters.amenities) {
          if (!property.amenities.includes(amenity)) {
            return false;
          }
        }
      }
      
      return true;
    });
  }, [properties, filters]);

  // Handle quick filter click
  const handleQuickFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    
    // Apply filter based on the selected quick filter
    let newFilters: PropertyFilters = { ...filters };
    
    // Clear property type filter first
    delete newFilters.propertyType;
    
    // Apply the selected filter
    switch (filterId) {
      case 'houses':
        newFilters.propertyType = 'Casas';
        break;
      case 'apartments':
        newFilters.propertyType = 'Departamentos';
        break;
      case 'commercial':
        newFilters.propertyType = 'Locales Comerciales';
        break;
      case 'land':
        newFilters.propertyType = 'Terrenos';
        break;
      case 'all':
        // No filter needed for "all"
        break;
    }
    
    setFilters(newFilters);
  };

  // Handle apply filters from FilterPanel
  const handleApplyFilters = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    
    // Update active filter based on property type
    if (newFilters.propertyType) {
      switch (newFilters.propertyType) {
        case 'Casas':
          setActiveFilter('houses');
          break;
        case 'Departamentos':
          setActiveFilter('apartments');
          break;
        case 'Locales Comerciales':
          setActiveFilter('commercial');
          break;
        case 'Terrenos':
          setActiveFilter('land');
          break;
        default:
          setActiveFilter('all');
      }
    } else {
      setActiveFilter('all');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background relative">
        {/* Hero Section with Statistics */}
        <div className="bg-gradient-to-b from-accent/5 to-background pt-8 pb-12 border-b border-border/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Propiedades <span className="text-accent">Destacadas</span>
              </h1>
              <p className="text-foreground/70 max-w-2xl">
                {explanation || 'Explora nuestra selección de propiedades destacadas, seleccionadas para ofrecerte las mejores opciones del mercado.'}
              </p>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-8">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => handleQuickFilterClick(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter.id 
                      ? 'bg-accent text-white shadow-md' 
                      : 'bg-background border border-border/40 text-foreground/70 hover:border-accent/40'
                  }`}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content with No Results Message */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  className={`p-2 rounded-md ${isFilterOpen ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-accent'} transition-colors`}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  aria-label="Filtros"
                >
                  <SlidersHorizontal size={20} />
                </button>
                <div className="h-6 w-px bg-border/40" />
                <div className="flex items-center gap-2">
                  <button 
                    className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-accent'}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Vista de cuadrícula"
                  >
                    <Grid2x2 size={20} />
                  </button>
                  <button 
                    className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-accent'}`}
                    onClick={() => setViewMode('list')}
                    aria-label="Vista de lista"
                  >
                    <LayoutList size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* No Results Message */}
            <div className="mt-8 flex justify-center">
              <div className="text-center max-w-lg mx-auto p-8 bg-background/50 rounded-xl border border-border/20">
                <div className="mb-6">
                  <Search className="w-12 h-12 text-accent/50 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-display font-medium text-foreground mb-3">
                  No se encontraron propiedades
                </h3>
                <p className="text-foreground/70 mb-6">
                  No encontramos propiedades que coincidan exactamente con tu búsqueda. Puedes:
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setFilters({});
                      setActiveFilter('all');
                    }}
                    className="w-full px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Filter size={16} />
                    Limpiar todos los filtros
                  </button>
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="w-full px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={16} />
                    Hablar con Luna para ayuda
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel 
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={handleApplyFilters}
          initialFilters={filters}
        />

        {/* Chat Button and Interface */}
        <motion.button
          className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-accent text-white shadow-xl hover:shadow-accent/20 ai-glow group"
          onClick={() => setIsChatOpen(!isChatOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            boxShadow: ['0 10px 25px rgba(0, 0, 0, 0.1)', '0 10px 25px rgba(124, 58, 237, 0.3)', '0 10px 25px rgba(0, 0, 0, 0.1)'],
          }}
          transition={{ 
            duration: 0.6,
            boxShadow: {
              repeat: Infinity,
              duration: 2
            }
          }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
          }}
          aria-label={isChatOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isChatOpen ? (
            <X size={24} />
          ) : (
            <div className="relative flex items-center">
              <MessageCircle size={28} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></span>
              
              <span className="absolute right-full mr-2 bg-accent text-white text-sm font-medium py-1 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                ¡Chatea con nosotros!
              </span>
            </div>
          )}
        </motion.button>

        {/* Chat Interface */}
        <AnimatePresence>
          {isChatOpen && (
            <>
              <motion.div 
                className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[90] lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsChatOpen(false)}
              />
              
              <motion.div
                className="fixed z-[100] w-full max-w-md"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                  position: 'fixed',
                  bottom: '4.5rem',
                  right: '2rem',
                  maxWidth: '400px',
                  width: 'calc(100% - 2rem)',
                  transform: 'none',
                  margin: '0'
                }}
              >
                <ChatInterface onClose={() => setIsChatOpen(false)} isMobile={false} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Helper function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Get statistics from metadata if available
  const statistics = metadata?.statistics || null;
  const priceRange = statistics?.priceRange || null;
  const propertyTypes = statistics?.propertyTypes || null;
  const operationTypes = statistics?.operationTypes || null;
  const citiesDistribution = statistics?.citiesDistribution || null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background relative">
      {/* Hero Section with Statistics */}
      <div className="bg-gradient-to-b from-accent/5 to-background pt-8 pb-12 border-b border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Propiedades <span className="text-accent">Destacadas</span>
            </h1>
            <p className="text-foreground/70 max-w-2xl">
              {explanation || 'Explora nuestra selección de propiedades destacadas, seleccionadas para ofrecerte las mejores opciones del mercado.'}
            </p>
          </div>

          {/* Statistics Cards */}
          {statistics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {/* Total Properties Card */}
              <motion.div 
                className="bg-background border border-border/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-sm">Total Propiedades</p>
                    <p className="text-2xl font-bold font-display">{filteredProperties.length}</p>
                  </div>
                </div>
              </motion.div>

              {/* Average Price Card */}
              {statistics.averagePrice && (
                <motion.div 
                  className="bg-background border border-border/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Precio Promedio</p>
                      <p className="text-2xl font-bold font-display">{formatPrice(statistics.averagePrice)}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Price Range Card */}
              {priceRange && (
                <motion.div 
                  className="bg-background border border-border/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-lg">
                      <Filter className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Rango de Precios</p>
                      <p className="text-lg font-bold font-display">
                        {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Match Percentage Card */}
              {statistics.percentageMatch && (
                <motion.div 
                  className="bg-background border border-border/40 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground/60 text-sm">Coincidencia</p>
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold font-display">{Math.round(statistics.percentageMatch)}%</p>
                        <div className="w-16 h-2 bg-secondary/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${statistics.percentageMatch}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-8">
            {quickFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleQuickFilterClick(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'bg-accent text-white shadow-md' 
                    : 'bg-background border border-border/40 text-foreground/70 hover:border-accent/40'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                className={`p-2 rounded-md ${isFilterOpen ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-accent'} transition-colors`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                aria-label="Filtros"
              >
                <SlidersHorizontal size={20} />
              </button>
              <div className="h-6 w-px bg-border/40" />
              <div className="flex items-center gap-2">
                <button 
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-accent'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid2x2 size={20} />
                </button>
                <button 
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-accent/10 text-accent' : 'text-foreground/70 hover:text-accent'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Vista de lista"
                >
                  <LayoutList size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="p-4 sm:p-8">
            <div className="mb-6 flex items-center justify-between text-foreground/60 text-sm sm:text-base font-body">
              <p>{totalProperties} propiedades encontradas</p>
              
              {/* Active Filters */}
              {Object.keys(filters).length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/60">Filtros activos:</span>
                  <button
                    onClick={() => {
                      setFilters({});
                      setActiveFilter('all');
                    }}
                    className="text-accent text-sm hover:underline"
                  >
                    Limpiar todos
                  </button>
                </div>
              )}
            </div>

            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            } gap-6`}>
              {filteredProperties.map((property) => (
                <div key={property._id}>
                  {viewMode === 'grid' ? (
                    <PropertyCard property={property} />
                  ) : (
                    <PropertyListItem property={property} />
                  )}
                </div>
              ))}
            </div>
            
            {/* AI Chat Invitation */}
            <div className="mt-12 mb-8 text-center">
              <div className="bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    <Sparkles className="w-8 h-8 text-accent animate-pulse" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"></span>
                  </div>
                  <h3 className="text-xl font-display font-medium text-foreground">¿No encuentras lo que buscas?</h3>
                  <p className="text-foreground/70 max-w-lg">
                    Pregúntale a Luna, nuestra asistente de IA, y te ayudará a encontrar la propiedad perfecta para ti.
                  </p>
                  <motion.button
                    className="mt-2 px-6 py-3 rounded-full bg-accent text-white shadow-md hover:shadow-accent/20 flex items-center gap-2"
                    onClick={() => setIsChatOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle size={18} />
                    Hablar con Luna
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      <FilterPanel 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={filters}
      />

      {/* Chat Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-accent text-white shadow-xl hover:shadow-accent/20 ai-glow group"
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          boxShadow: ['0 10px 25px rgba(0, 0, 0, 0.1)', '0 10px 25px rgba(124, 58, 237, 0.3)', '0 10px 25px rgba(0, 0, 0, 0.1)'],
        }}
        transition={{ 
          duration: 0.6,
          boxShadow: {
            repeat: Infinity,
            duration: 2
          }
        }}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
        }}
        aria-label={isChatOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isChatOpen ? (
          <X size={24} />
        ) : (
          <div className="relative flex items-center">
            <MessageCircle size={28} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></span>
            
            {/* Chat label that appears on hover */}
            <span className="absolute right-full mr-2 bg-accent text-white text-sm font-medium py-1 px-3 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
              ¡Chatea con nosotros!
            </span>
          </div>
        )}
      </motion.button>
      
      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-background/50 backdrop-blur-sm z-[90] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
            />
            
            <motion.div
              className="fixed z-[100] w-full max-w-md"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                bottom: '4.5rem',
                right: '2rem',
                maxWidth: '400px',
                width: 'calc(100% - 2rem)',
                transform: 'none',
                margin: '0'
              }}
            >
              <ChatInterface onClose={() => setIsChatOpen(false)} isMobile={false} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Main component that provides the context
export default function PropertiesContent() {
  return <PropertiesContentInner />;
} 