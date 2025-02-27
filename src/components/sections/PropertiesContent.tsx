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
import React, { useState } from 'react';
import FilterPanel from './FilterPanel';
import type { PropertyFilters } from '@/types/properties';

// Separate the inner content to use the context
function PropertiesContentInner() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>({});
  
  const { 
    properties, 
    totalProperties, 
    explanation, 
    metadata,
    isLoading 
  } = useProperties();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilters(prev => ({ ...prev, search: e.target.value || undefined }));
  };

  // Handle quick filter click
  const handleQuickFilterClick = (filterId: string) => {
    setActiveFilter(activeFilter === filterId ? null : filterId);
    
    // Apply filter based on the selected quick filter
    let newFilters: PropertyFilters = { ...filters };
    
    if (activeFilter === filterId) {
      // If clicking the same filter, remove it
      delete newFilters.propertyType;
    } else {
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
          delete newFilters.propertyType;
          break;
      }
    }
    
    setFilters(newFilters);
  };

  // Handle apply filters from FilterPanel
  const handleApplyFilters = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
    
    // Update search query if it's in the filters
    if (newFilters.search !== undefined) {
      setSearchQuery(newFilters.search);
    }
    
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
          setActiveFilter(null);
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
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground/70 mb-2">No se encontraron propiedades</p>
          <p className="text-sm text-foreground/50">Intenta ajustar los filtros de búsqueda</p>
        </div>
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

  // Quick filter options
  const quickFilters = [
    { id: 'all', label: 'Todas', icon: <Home size={16} /> },
    { id: 'houses', label: 'Casas', icon: <Home size={16} /> },
    { id: 'apartments', label: 'Departamentos', icon: <Building size={16} /> },
    { id: 'commercial', label: 'Comercial', icon: <Building2 size={16} /> },
    { id: 'land', label: 'Terrenos', icon: <MapPin size={16} /> },
  ];

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
                    <p className="text-2xl font-bold font-display">{totalProperties}</p>
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

          {/* Search Bar */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por ubicación, tipo de propiedad, características..."
                className="w-full px-4 py-3 pl-10 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm font-body"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
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
                      setSearchQuery('');
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
              {properties.map((property) => (
                <div key={property._id}>
                  {viewMode === 'grid' ? (
                    <PropertyCard property={property} />
                  ) : (
                    <PropertyListItem property={property} />
                  )}
                </div>
              ))}
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
        className="fixed bottom-8 right-8 z-[100] p-4 rounded-full bg-accent text-white shadow-xl hover:shadow-accent/20 ai-glow"
        onClick={() => setIsChatOpen(!isChatOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          boxShadow: ['0 10px 25px rgba(0, 0, 0, 0.1)', '0 10px 25px rgba(var(--accent), 0.3)', '0 10px 25px rgba(0, 0, 0, 0.1)'],
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
          <div className="relative">
            <MessageCircle size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse"></span>
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
              className="fixed bottom-24 right-8 z-[100] w-full max-w-md h-[80vh] max-h-[800px]"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                bottom: '6rem',
                right: '2rem',
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