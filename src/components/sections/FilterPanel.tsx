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
  RotateCcw,
  Waves,
  Shield,
  Car,
  Dumbbell,
  Flower2,
  Trees
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
  const operationTypes: { value: OperationType; label: string; icon: JSX.Element }[] = [
    { value: 'Venta', label: 'Venta', icon: <Tag size={16} /> },
    { value: 'Renta', label: 'Renta', icon: <DollarSign size={16} /> },
    { value: 'Desarrollo', label: 'Desarrollo', icon: <Building2 size={16} /> },
  ];

  // Amenities with icons
  const amenities: { value: Amenity; label: string; icon: JSX.Element }[] = [
    { value: 'Alberca', label: 'Alberca', icon: <Waves size={16} /> },
    { value: 'Circuito Cerrado', label: 'Circuito Cerrado', icon: <Shield size={16} /> },
    { value: 'Estacionamientos', label: 'Estacionamientos', icon: <Car size={16} /> },
    { value: 'Gimnasio', label: 'Gimnasio', icon: <Dumbbell size={16} /> },
    { value: 'Jardín', label: 'Jardín', icon: <Flower2 size={16} /> },
    { value: 'Roof Garden', label: 'Roof Garden', icon: <Trees size={16} /> },
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;
      setFilters(prev => ({
        ...prev,
        [name]: isChecked
      }));
    } else if (type === 'number') {
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
      
      if (currentAmenities.includes(amenity)) {
        return {
          ...prev,
          amenities: currentAmenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...currentAmenities, amenity]
        };
      }
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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Filter Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-md bg-background border-l border-border shadow-xl z-50 overflow-hidden flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex items-center">
                <Filter size={18} className="text-accent mr-2" />
                <h2 className="text-lg font-medium">Filtros de búsqueda</h2>
              </div>
              <motion.button
                className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Property Types */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Building size={16} className="mr-2 text-primary" />
                  Tipo de propiedad
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {propertyTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      className={`flex items-center p-3 rounded-lg border ${
                        filters.propertyType === type.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border hover:border-accent/30 hover:bg-secondary/20'
                      } transition-all duration-200`}
                      onClick={() => handlePropertyTypeChange(type.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`mr-2 ${filters.propertyType === type.value ? 'text-accent' : 'text-muted-foreground'}`}>
                        {type.icon}
                      </div>
                      <span className="text-sm">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Operation Types */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Tag size={16} className="mr-2 text-primary" />
                  Tipo de operación
                </h3>
                <div className="flex flex-wrap gap-2">
                  {operationTypes.map((type) => (
                    <motion.button
                      key={type.value}
                      className={`flex items-center px-4 py-2 rounded-lg border ${
                        filters.operationType === type.value
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border hover:border-accent/30 hover:bg-secondary/20'
                      } transition-all duration-200`}
                      onClick={() => handleOperationTypeChange(type.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`mr-2 ${filters.operationType === type.value ? 'text-accent' : 'text-muted-foreground'}`}>
                        {type.icon}
                      </div>
                      <span className="text-sm">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <DollarSign size={16} className="mr-2 text-primary" />
                  Rango de precio
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Mínimo</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice || ''}
                        onChange={handleInputChange}
                        placeholder="Cualquier"
                        className="w-full pl-7 pr-3 py-2 rounded-lg border border-border bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Máximo</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice || ''}
                        onChange={handleInputChange}
                        placeholder="Cualquier"
                        className="w-full pl-7 pr-3 py-2 rounded-lg border border-border bg-secondary/10 focus:outline-none focus:ring-2 focus:ring-accent/30 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bedrooms & Bathrooms */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Bed size={16} className="mr-2 text-primary" />
                  Habitaciones y baños
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Habitaciones</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, '5+'].map((num) => (
                        <motion.button
                          key={num}
                          className={`flex-1 py-2 rounded-lg border ${
                            filters.minBedrooms === (num === '5+' ? 5 : Number(num))
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border hover:border-accent/30 hover:bg-secondary/20'
                          } transition-all duration-200 text-sm`}
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            minBedrooms: prev.minBedrooms === (num === '5+' ? 5 : Number(num)) 
                              ? undefined 
                              : (num === '5+' ? 5 : Number(num))
                          }))}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {num}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Baños</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, '5+'].map((num) => (
                        <motion.button
                          key={num}
                          className={`flex-1 py-2 rounded-lg border ${
                            filters.minBathrooms === (num === '5+' ? 5 : Number(num))
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border hover:border-accent/30 hover:bg-secondary/20'
                          } transition-all duration-200 text-sm`}
                          onClick={() => setFilters(prev => ({
                            ...prev,
                            minBathrooms: prev.minBathrooms === (num === '5+' ? 5 : Number(num)) 
                              ? undefined 
                              : (num === '5+' ? 5 : Number(num))
                          }))}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {num}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Amenities */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center">
                  <Check size={16} className="mr-2 text-primary" />
                  Amenidades
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenities.map((amenity) => {
                    const isSelected = filters.amenities?.includes(amenity.value) || false;
                    return (
                      <motion.button
                        key={amenity.value}
                        className={`flex items-center p-3 rounded-lg border ${
                          isSelected
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border hover:border-accent/30 hover:bg-secondary/20'
                        } transition-all duration-200`}
                        onClick={() => handleAmenityChange(amenity.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`mr-2 ${isSelected ? 'text-accent' : 'text-muted-foreground'}`}>
                          {amenity.icon}
                        </div>
                        <span className="text-sm">{amenity.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-4 border-t border-border bg-gradient-to-r from-primary/5 to-accent/5">
              <div className="flex space-x-3">
                <motion.button
                  className="flex-1 py-2.5 rounded-lg border border-border hover:bg-secondary/20 transition-all duration-200 text-sm font-medium"
                  onClick={handleResetFilters}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <RotateCcw size={16} className="mr-2" />
                    Reiniciar
                  </span>
                </motion.button>
                <motion.button
                  className="flex-1 py-2.5 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-200 text-sm font-medium"
                  onClick={handleApplyFilters}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(var(--accent), 0.25)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center">
                    <Filter size={16} className="mr-2" />
                    Aplicar filtros
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 