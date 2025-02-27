'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Search, 
  Home, 
  Building, 
  Building2, 
  Warehouse, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Tag,
  Filter,
  RotateCcw
} from 'lucide-react';
import type { PropertyFilters } from '@/types/properties';

// Define the types locally since they're not exported from the properties.ts file
type PropertyTypeName = 
  | 'Desarrollos verticales'
  | 'Casas'
  | 'Locales Comerciales'
  | 'Oficinas'
  | 'Edificios'
  | 'Casas uso de suelo'
  | 'Bodegas comerciales'
  | 'Locales en centro comercial'
  | 'Departamentos'
  | 'Casas en condominio'
  | 'Desarrollos horizontales'
  | 'Naves industriales'
  | 'Terrenos comerciales'
  | 'Terrenos';

type OperationType = 'Venta' | 'Renta' | 'Desarrollo';

type Amenity = 
  | 'Alberca'
  | 'Circuito Cerrado'
  | 'Estacionamientos'
  | 'Gimnasio'
  | 'Jardín'
  | 'Roof Garden';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: PropertyFilters) => void;
  initialFilters?: PropertyFilters;
}

export default function FilterPanel({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  initialFilters = {}
}: FilterPanelProps) {
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters);
  
  // Reset filters when initialFilters change
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Property types with icons
  const propertyTypes: { value: PropertyTypeName; label: string; icon: JSX.Element }[] = [
    { value: 'Casas', label: 'Casas', icon: <Home size={16} /> },
    { value: 'Departamentos', label: 'Departamentos', icon: <Building size={16} /> },
    { value: 'Oficinas', label: 'Oficinas', icon: <Building2 size={16} /> },
    { value: 'Locales Comerciales', label: 'Locales', icon: <Building2 size={16} /> },
    { value: 'Terrenos', label: 'Terrenos', icon: <MapPin size={16} /> },
    { value: 'Bodegas comerciales', label: 'Bodegas', icon: <Warehouse size={16} /> },
  ];

  // Operation types
  const operationTypes: { value: OperationType; label: string }[] = [
    { value: 'Venta', label: 'Venta' },
    { value: 'Renta', label: 'Renta' },
    { value: 'Desarrollo', label: 'Desarrollo' },
  ];

  // Amenities
  const amenities: { value: Amenity; label: string }[] = [
    { value: 'Alberca', label: 'Alberca' },
    { value: 'Circuito Cerrado', label: 'Circuito Cerrado' },
    { value: 'Estacionamientos', label: 'Estacionamientos' },
    { value: 'Gimnasio', label: 'Gimnasio' },
    { value: 'Jardín', label: 'Jardín' },
    { value: 'Roof Garden', label: 'Roof Garden' },
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFilters(prev => ({
        ...prev,
        [name]: value === '' ? undefined : Number(value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle property type selection
  const handlePropertyTypeChange = (type: PropertyTypeName) => {
    setFilters(prev => ({
      ...prev,
      propertyType: prev.propertyType === type ? undefined : type
    }));
  };

  // Handle operation type selection
  const handleOperationTypeChange = (type: OperationType) => {
    setFilters(prev => ({
      ...prev,
      operationType: prev.operationType === type ? undefined : type
    }));
  };

  // Handle amenity selection
  const handleAmenityChange = (amenity: Amenity) => {
    setFilters(prev => {
      const currentAmenities = prev.amenities || [];
      const amenityIndex = currentAmenities.indexOf(amenity);
      
      let newAmenities: Amenity[];
      if (amenityIndex >= 0) {
        // Remove amenity if already selected
        newAmenities = [
          ...currentAmenities.slice(0, amenityIndex),
          ...currentAmenities.slice(amenityIndex + 1)
        ];
      } else {
        // Add amenity if not selected
        newAmenities = [...currentAmenities, amenity];
      }
      
      return {
        ...prev,
        amenities: newAmenities.length > 0 ? newAmenities : undefined
      };
    });
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setFilters({});
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Filter Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border/40 shadow-xl z-50 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-background z-10 px-6 py-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-accent" />
                <h2 className="text-lg font-display font-medium">Filtros</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-sm text-foreground/70 hover:text-accent transition-colors"
                >
                  <RotateCcw size={14} />
                  <span>Reiniciar</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-foreground/70 hover:text-accent transition-colors"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            
            {/* Filter Content */}
            <div className="p-6 space-y-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Búsqueda</label>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Buscar por ubicación, características..."
                    className="w-full px-4 py-2 pl-10 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                    value={filters.search || ''}
                    onChange={handleInputChange}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={16} />
                </div>
              </div>
              
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Rango de Precio</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="minPrice"
                      placeholder="Mínimo"
                      className="w-full px-4 py-2 pl-8 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                      value={filters.minPrice || ''}
                      onChange={handleInputChange}
                      min={0}
                    />
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground/50" size={14} />
                  </div>
                  <span className="text-foreground/50">-</span>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      name="maxPrice"
                      placeholder="Máximo"
                      className="w-full px-4 py-2 pl-8 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                      value={filters.maxPrice || ''}
                      onChange={handleInputChange}
                      min={0}
                    />
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground/50" size={14} />
                  </div>
                </div>
              </div>
              
              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Tipo de Propiedad</label>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handlePropertyTypeChange(type.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        filters.propertyType === type.value
                          ? 'bg-accent/10 text-accent border border-accent/30'
                          : 'bg-background border border-border/40 text-foreground/70 hover:border-accent/30'
                      }`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Operation Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Tipo de Operación</label>
                <div className="flex gap-2">
                  {operationTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleOperationTypeChange(type.value)}
                      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        filters.operationType === type.value
                          ? 'bg-accent/10 text-accent border border-accent/30'
                          : 'bg-background border border-border/40 text-foreground/70 hover:border-accent/30'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Bedrooms & Bathrooms */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">Habitaciones</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minBedrooms"
                      placeholder="Mínimo"
                      className="w-full px-4 py-2 pl-8 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                      value={filters.minBedrooms || ''}
                      onChange={handleInputChange}
                      min={0}
                    />
                    <Bed className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground/50" size={14} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">Baños</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minBathrooms"
                      placeholder="Mínimo"
                      className="w-full px-4 py-2 pl-8 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                      value={filters.minBathrooms || ''}
                      onChange={handleInputChange}
                      min={0}
                    />
                    <Bath className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground/50" size={14} />
                  </div>
                </div>
              </div>
              
              {/* Size */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">Construcción (m²)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minConstructionSize"
                      placeholder="Mínimo"
                      className="w-full px-4 py-2 pl-8 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                      value={filters.minConstructionSize || ''}
                      onChange={handleInputChange}
                      min={0}
                    />
                    <Square className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground/50" size={14} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/90">Terreno (m²)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="minLotSize"
                      placeholder="Mínimo"
                      className="w-full px-4 py-2 pl-8 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                      value={filters.minLotSize || ''}
                      onChange={handleInputChange}
                      min={0}
                    />
                    <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 text-foreground/50" size={14} />
                  </div>
                </div>
              </div>
              
              {/* Amenities */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Amenidades</label>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((amenity) => {
                    const isSelected = filters.amenities?.includes(amenity.value) || false;
                    return (
                      <button
                        key={amenity.value}
                        onClick={() => handleAmenityChange(amenity.value)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? 'bg-accent/10 text-accent border border-accent/30'
                            : 'bg-background border border-border/40 text-foreground/70 hover:border-accent/30'
                        }`}
                      >
                        {isSelected && <Check size={14} className="text-accent" />}
                        <span>{amenity.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/90">Ordenar por</label>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    name="sortBy"
                    className="px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                    value={filters.sortBy || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any || undefined }))}
                  >
                    <option value="">Seleccionar</option>
                    <option value="price">Precio</option>
                    <option value="createdAt">Fecha de publicación</option>
                    <option value="updatedAt">Última actualización</option>
                  </select>
                  <select
                    name="sortOrder"
                    className="px-4 py-2 bg-background border border-border/40 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/40 text-foreground/90 text-sm"
                    value={filters.sortOrder || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as any || undefined }))}
                    disabled={!filters.sortBy}
                  >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="sticky bottom-0 bg-background border-t border-border/40 p-4 flex gap-2">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-border/40 rounded-md text-foreground/90 hover:bg-secondary/20 transition-colors text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                Aplicar Filtros
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 