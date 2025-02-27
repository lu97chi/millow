import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Shield, 
  Home, 
  Building,
  Tag,
  Check
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/types/properties';

// Helper function to safely access nested properties
const safeGetFeatures = (property: Property) => {
  const features = property.features || {};
  return {
    bedrooms: features.bedrooms && features.bedrooms > 0 ? features.bedrooms : null,
    bathrooms: features.bathrooms && features.bathrooms > 0 ? features.bathrooms : null,
    constructionSize: features.constructionSize && features.constructionSize > 0 ? features.constructionSize : null,
    lotSize: features.lotSize && features.lotSize > 0 ? features.lotSize : null,
    parking: features.parking && features.parking > 0 ? features.parking : null,
    floors: features.floors && features.floors > 0 ? features.floors : null,
  };
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
};

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price || 0);
};

export const PropertyCard = ({ property }: { property: Property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safely format the price
  const formattedPrice = formatPrice(property.price);

  // Safely get features
  const features = safeGetFeatures(property);
  const hasFeatures = features.bedrooms || features.bathrooms || features.constructionSize;

  // Calculate AI match percentage (random for demo)
  const aiMatch = Math.floor(Math.random() * (99 - 85) + 85);

  // Ensure we have a valid image URL
  const imageUrl = Array.isArray(property.images) && property.images.length > 0
    ? property.images[currentImageIndex]
    : '/placeholder-property.jpg'; // Make sure to have a placeholder image

  // Handle image navigation
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
    }
  };

  return (
    <Link href={`/properties/${property._id}`}>
      <motion.div 
        className="bg-background border border-border/40 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 illusion-card soft-shadow h-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -5 }}
      >
        {/* Property Image */}
        <div className="relative h-48 w-full">
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <span className={`${property.operationType === 'Renta' ? 'bg-primary/90' : 'bg-accent/90'} text-white text-xs font-medium px-3 py-1.5 rounded-full safety-border`}>
              {property.operationType === 'Renta' ? 'En Renta' : 'En Venta'}
            </span>
            
            {/* Property Type Badge */}
            <span className="bg-background/80 text-foreground/90 text-xs font-medium px-3 py-1.5 rounded-full border border-border/40">
              {property.propertyType}
            </span>
          </div>
          
          {/* Status Badge */}
          {property.status && (
            <div className="absolute top-4 right-4 z-10">
              <span className={`
                text-xs font-medium px-3 py-1.5 rounded-full
                ${property.status === 'available' ? 'bg-green-500/90 text-white' : 
                  property.status === 'sold' ? 'bg-red-500/90 text-white' : 
                  'bg-yellow-500/90 text-white'}
              `}>
                {property.status === 'available' ? 'Disponible' : 
                 property.status === 'sold' ? 'Vendido' : 'Rentado'}
              </span>
            </div>
          )}
          
          {/* Like Button */}
          <button 
            className="absolute bottom-4 right-4 z-10 bg-background/80 hover:bg-background p-2 rounded-full transition-colors ai-glow"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            aria-label={isLiked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          >
            <Heart 
              size={18} 
              className={`${isLiked ? 'fill-accent text-accent' : 'text-foreground/70'}`} 
            />
          </button>
          
          {/* Image Navigation */}
          {property.images && property.images.length > 1 && (
            <>
              <button 
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/60 hover:bg-background/80 p-1 rounded-full transition-colors"
                onClick={prevImage}
                aria-label="Imagen anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/90">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/60 hover:bg-background/80 p-1 rounded-full transition-colors"
                onClick={nextImage}
                aria-label="Imagen siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/90">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-4 z-10 bg-background/70 px-2 py-1 rounded-md text-xs font-medium text-foreground/90">
                {currentImageIndex + 1}/{property.images.length}
              </div>
            </>
          )}
          
          <Image
            src={imageUrl}
            alt={property.title || 'Property Image'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Property Details */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center text-foreground/60 text-sm font-body">
              <MapPin size={14} className="mr-1 text-accent" />
              <span className="truncate">
                {property.location?.area && property.location?.city
                  ? `${property.location.area}, ${property.location.city}`
                  : 'Location not specified'}
              </span>
            </div>
            <h3 className="text-lg font-display font-medium text-foreground line-clamp-2">
              {property.title || 'Untitled Property'}
            </h3>
            <p className="text-accent font-bold text-xl font-display">
              {formattedPrice}
              {property.operationType === 'Renta' && '/mes'}
            </p>
            
            {/* Property Age & Maintenance Fee */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {property.propertyAge !== null && (
                <div className="flex items-center text-foreground/60 text-xs">
                  <Clock size={12} className="mr-1" />
                  <span>{property.propertyAge} {property.propertyAge === 1 ? 'año' : 'años'}</span>
                </div>
              )}
              {property.maintenanceFee !== null && property.maintenanceFee > 0 && (
                <div className="flex items-center text-foreground/60 text-xs">
                  <DollarSign size={12} className="mr-1" />
                  <span>Mant: {formatPrice(property.maintenanceFee)}/mes</span>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          {hasFeatures && (
            <div className="border-t border-border/40 pt-4 mt-2">
              <div className="grid grid-cols-3 gap-2">
                {features.bedrooms && (
                  <div className="flex items-center text-foreground/70">
                    <Bed size={16} className="mr-1 text-foreground/60" />
                    <span className="text-sm font-body">{features.bedrooms} Hab</span>
                  </div>
                )}
                {features.bathrooms && (
                  <div className="flex items-center text-foreground/70">
                    <Bath size={16} className="mr-1 text-foreground/60" />
                    <span className="text-sm font-body">{features.bathrooms} Baños</span>
                  </div>
                )}
                {features.constructionSize && (
                  <div className="flex items-center text-foreground/70">
                    <Square size={16} className="mr-1 text-foreground/60" />
                    <span className="text-sm font-body">{features.constructionSize} m²</span>
                  </div>
                )}
              </div>
              
              {/* Additional Features */}
              {(features.lotSize || features.parking || features.floors) && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {features.lotSize && (
                    <div className="flex items-center text-foreground/70">
                      <MapPin size={16} className="mr-1 text-foreground/60" />
                      <span className="text-sm font-body">Terreno: {features.lotSize} m²</span>
                    </div>
                  )}
                  {features.parking && (
                    <div className="flex items-center text-foreground/70">
                      <Tag size={16} className="mr-1 text-foreground/60" />
                      <span className="text-sm font-body">{features.parking} Estac.</span>
                    </div>
                  )}
                  {features.floors && (
                    <div className="flex items-center text-foreground/70">
                      <Building size={16} className="mr-1 text-foreground/60" />
                      <span className="text-sm font-body">{features.floors} Pisos</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {property.amenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="inline-flex items-center text-xs bg-secondary/20 text-foreground/80 px-2 py-1 rounded-md">
                    <Check size={10} className="mr-1 text-accent" />
                    {amenity}
                  </span>
                ))}
                {property.amenities.length > 3 && (
                  <span className="inline-flex items-center text-xs bg-secondary/20 text-foreground/80 px-2 py-1 rounded-md">
                    +{property.amenities.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* AI Match */}
          <div className="mt-4 mb-1 flex items-center justify-between bg-secondary/50 rounded-md p-2 safety-border">
            <div className="flex items-center">
              <Sparkles size={14} className="text-accent mr-1" />
              <span className="text-xs font-medium font-body">Coincidencia IA</span>
            </div>
            <div className="flex items-center">
              <span className="text-accent font-bold font-body">{aiMatch}%</span>
              <div className="ml-2 w-16 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent" 
                  style={{ width: `${aiMatch}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Agent Info */}
          {property.agent && (
            <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
              <div className="flex items-center">
                {property.agent.image ? (
                  <Image 
                    src={property.agent.image} 
                    alt={property.agent.name} 
                    width={24} 
                    height={24} 
                    className="rounded-full mr-2"
                  />
                ) : (
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-2">
                    <span className="text-xs text-accent font-medium">
                      {property.agent.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-foreground/90">{property.agent.name}</p>
                  <p className="text-xs text-foreground/60">{property.agent.company}</p>
                </div>
              </div>
              <div className="text-xs text-foreground/60">
                {formatDate(property.updatedAt)}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export const PropertyListItem = ({ property }: { property: Property }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safely format the price
  const formattedPrice = formatPrice(property.price);

  // Safely get features
  const features = safeGetFeatures(property);
  const hasFeatures = features.bedrooms || features.bathrooms || features.constructionSize;

  // Calculate AI match percentage (random for demo)
  const aiMatch = Math.floor(Math.random() * (99 - 85) + 85);

  // Ensure we have a valid image URL
  const imageUrl = Array.isArray(property.images) && property.images.length > 0
    ? property.images[currentImageIndex]
    : '/placeholder-property.jpg'; // Make sure to have a placeholder image

  // Handle image navigation
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (property.images && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
    }
  };

  return (
    <Link href={`/properties/${property._id}`}>
      <motion.div 
        className="bg-background border border-border/40 rounded-xl overflow-hidden group hover:border-accent/30 transition-all duration-300 illusion-card soft-shadow mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -2 }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Property Image */}
          <div className="relative h-64 md:h-auto md:w-1/3 md:min-w-[250px]">
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <span className={`${property.operationType === 'Renta' ? 'bg-primary/90' : 'bg-accent/90'} text-white text-xs font-medium px-3 py-1.5 rounded-full safety-border`}>
                {property.operationType === 'Renta' ? 'En Renta' : 'En Venta'}
              </span>
              
              {/* Property Type Badge */}
              <span className="bg-background/80 text-foreground/90 text-xs font-medium px-3 py-1.5 rounded-full border border-border/40">
                {property.propertyType}
              </span>
            </div>
            
            {/* Status Badge */}
            {property.status && (
              <div className="absolute top-4 right-4 z-10">
                <span className={`
                  text-xs font-medium px-3 py-1.5 rounded-full
                  ${property.status === 'available' ? 'bg-green-500/90 text-white' : 
                    property.status === 'sold' ? 'bg-red-500/90 text-white' : 
                    'bg-yellow-500/90 text-white'}
                `}>
                  {property.status === 'available' ? 'Disponible' : 
                   property.status === 'sold' ? 'Vendido' : 'Rentado'}
                </span>
              </div>
            )}
            
            {/* Like Button */}
            <button 
              className="absolute bottom-4 right-4 z-10 bg-background/80 hover:bg-background p-2 rounded-full transition-colors ai-glow"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              aria-label={isLiked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart 
                size={18} 
                className={`${isLiked ? 'fill-accent text-accent' : 'text-foreground/70'}`} 
              />
            </button>
            
            {/* Image Navigation */}
            {property.images && property.images.length > 1 && (
              <>
                <button 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/60 hover:bg-background/80 p-1 rounded-full transition-colors"
                  onClick={prevImage}
                  aria-label="Imagen anterior"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/90">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-background/60 hover:bg-background/80 p-1 rounded-full transition-colors"
                  onClick={nextImage}
                  aria-label="Imagen siguiente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/90">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 z-10 bg-background/70 px-2 py-1 rounded-md text-xs font-medium text-foreground/90">
                  {currentImageIndex + 1}/{property.images.length}
                </div>
              </>
            )}
            
            <Image
              src={imageUrl}
              alt={property.title || 'Property Image'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Property Details */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex items-center text-foreground/60 text-sm font-body">
                <MapPin size={14} className="mr-1 text-accent" />
                <span className="truncate">
                  {property.location?.area && property.location?.city
                    ? `${property.location.area}, ${property.location.city}`
                    : 'Location not specified'}
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-foreground">
                {property.title || 'Untitled Property'}
              </h3>
              <p className="text-accent font-bold text-2xl font-display">
                {formattedPrice}
                {property.operationType === 'Renta' && '/mes'}
              </p>
              
              {/* Property Age & Maintenance Fee */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {property.propertyAge !== null && (
                  <div className="flex items-center text-foreground/60 text-sm">
                    <Clock size={14} className="mr-1" />
                    <span>{property.propertyAge} {property.propertyAge === 1 ? 'año' : 'años'}</span>
                  </div>
                )}
                {property.maintenanceFee !== null && property.maintenanceFee > 0 && (
                  <div className="flex items-center text-foreground/60 text-sm">
                    <DollarSign size={14} className="mr-1" />
                    <span>Mant: {formatPrice(property.maintenanceFee)}/mes</span>
                  </div>
                )}
              </div>
              
              {/* Description */}
              {property.description && (
                <p className="text-foreground/70 text-sm mt-2 line-clamp-2">
                  {property.description}
                </p>
              )}
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-auto">
              {/* Features */}
              {hasFeatures && (
                <div className="flex gap-4">
                  {features.bedrooms && (
                    <div className="flex items-center text-foreground/70">
                      <Bed size={16} className="mr-1 text-foreground/60" />
                      <span className="text-sm font-body">{features.bedrooms} Hab</span>
                    </div>
                  )}
                  {features.bathrooms && (
                    <div className="flex items-center text-foreground/70">
                      <Bath size={16} className="mr-1 text-foreground/60" />
                      <span className="text-sm font-body">{features.bathrooms} Baños</span>
                    </div>
                  )}
                  {features.constructionSize && (
                    <div className="flex items-center text-foreground/70">
                      <Square size={16} className="mr-1 text-foreground/60" />
                      <span className="text-sm font-body">{features.constructionSize} m²</span>
                    </div>
                  )}
                </div>
              )}
              
              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {property.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="inline-flex items-center text-xs bg-secondary/20 text-foreground/80 px-2 py-1 rounded-md">
                      <Check size={10} className="mr-1 text-accent" />
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="inline-flex items-center text-xs bg-secondary/20 text-foreground/80 px-2 py-1 rounded-md">
                      +{property.amenities.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              {/* AI Match */}
              <div className="flex items-center bg-secondary/50 rounded-md p-2 safety-border">
                <div className="flex items-center">
                  <Sparkles size={14} className="text-accent mr-1" />
                  <span className="text-xs font-medium font-body">Coincidencia IA</span>
                </div>
                <div className="flex items-center ml-2">
                  <span className="text-accent font-bold font-body">{aiMatch}%</span>
                  <div className="ml-2 w-16 h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent" 
                      style={{ width: `${aiMatch}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Agent Info */}
            {property.agent && (
              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <div className="flex items-center">
                  {property.agent.image ? (
                    <Image 
                      src={property.agent.image} 
                      alt={property.agent.name} 
                      width={24} 
                      height={24} 
                      className="rounded-full mr-2"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center mr-2">
                      <span className="text-xs text-accent font-medium">
                        {property.agent.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-foreground/90">{property.agent.name}</p>
                    <p className="text-xs text-foreground/60">{property.agent.company}</p>
                  </div>
                </div>
                <div className="text-xs text-foreground/60">
                  {formatDate(property.updatedAt)}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}; 