'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  Check,
  ChevronLeft,
  ChevronRight,
  Share2,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Info,
  Maximize,
  Minimize,
  Map,
  Star,
  MessageCircle,
  X,
  User,
  Car,
  Calculator
} from 'lucide-react';
import type { Property } from '@/types/properties';
import { api } from '@/lib/api-client';
import ChatInterface from '@/components/chat/ChatInterface';
import ChatButton from '@/components/chat/ChatButton';
import { PropertyCard } from '@/components/PropertyCard';
import PropertyMap from '@/components/maps/PropertyMap';
import { useRouter } from 'next/navigation';

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

// Property Gallery Component
const PropertyGallery = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setImageError(false);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setImageError(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Ensure we have a valid image URL with error handling
  const imageUrl = images && images.length > 0 && !imageError
    ? images[currentIndex]
    : '/placeholder-property.jpg';

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Main Image */}
      <div className={`relative ${isFullscreen ? 'h-screen' : 'aspect-[16/9] md:aspect-[21/9]'} overflow-hidden rounded-xl`}>
        <Image
          src={imageUrl}
          alt="Property Image"
          fill
          priority
          className="object-cover"
          onError={handleImageError}
        />
        
        {/* Navigation Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 p-2 bg-background/80 rounded-full hover:bg-background transition-colors z-10"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
          
          {/* Close Fullscreen Button */}
          {isFullscreen && (
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 left-4 p-2 bg-background/80 rounded-full hover:bg-background transition-colors z-10"
            >
              <X size={20} />
            </button>
          )}
          
          {/* Navigation Buttons - Only show if there are multiple images */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 text-foreground text-sm font-medium px-3 py-1 rounded-full">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Thumbnail Gallery - Only show if there are multiple images and not in fullscreen */}
      {!isFullscreen && images.length > 1 && (
        <div className="grid grid-cols-6 gap-2 mt-2">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setImageError(false);
              }}
              className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                index === currentIndex ? 'border-accent' : 'border-transparent hover:border-accent/50'
              }`}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                onError={(e) => {
                  // Hide this thumbnail if it fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Agent Card Component
const AgentCard = ({ agent }: { agent: Property['agent'] }) => {
  const [imageError, setImageError] = useState(false);
  
  // Handle missing agent data
  if (!agent) {
    return (
      <div className="bg-background border border-border/40 rounded-xl p-6 soft-shadow">
        <div className="text-center">
          <div className="w-20 h-20 bg-muted/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={32} className="text-muted-foreground/50" />
          </div>
          <h3 className="font-medium text-lg mb-1">Información no disponible</h3>
          <p className="text-sm text-muted-foreground mb-4">
            No hay información del agente para esta propiedad.
          </p>
        </div>
      </div>
    );
  }
  
  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };
  
  return (
    <div className="bg-background border border-border/40 rounded-xl p-6 soft-shadow">
      <div className="flex flex-col items-center text-center">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-accent/20">
          {agent.image && !imageError ? (
            <Image
              src={agent.image}
              alt={agent.name}
              fill
              className="object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full bg-muted/30 flex items-center justify-center">
              <User size={32} className="text-muted-foreground/50" />
            </div>
          )}
        </div>
        
        <h3 className="font-medium text-lg mb-1">{agent.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {agent.title || 'Agente Inmobiliario'} {agent.company ? `· ${agent.company}` : ''}
        </p>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-6">
          {agent.experience !== null && (
            <div className="flex flex-col items-center p-3 bg-muted/10 rounded-lg">
              <span className="text-lg font-medium">{agent.experience}</span>
              <span className="text-xs text-muted-foreground">Años de experiencia</span>
            </div>
          )}
          
          {agent.activeListings !== null && (
            <div className="flex flex-col items-center p-3 bg-muted/10 rounded-lg">
              <span className="text-lg font-medium">{agent.activeListings}</span>
              <span className="text-xs text-muted-foreground">Propiedades activas</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-3 w-full">
          {agent.phone && (
            <a 
              href={`tel:${agent.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              <Phone size={16} />
              <span>Llamar</span>
            </a>
          )}
          
          {agent.email && (
            <a 
              href={`mailto:${agent.email}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 border border-border bg-background hover:bg-muted/10 rounded-md transition-colors"
            >
              <Mail size={16} />
              <span>Enviar Email</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Property Amenities Component
const PropertyAmenities = ({ amenities }: { amenities: string[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenities.map((amenity, index) => (
        <motion.div
          key={amenity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="flex items-center gap-2"
        >
          <div className="p-2 bg-accent/10 rounded-full">
            <Check className="w-4 h-4 text-accent" />
          </div>
          <span className="text-foreground">{amenity}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Similar Properties Component
const SimilarProperties = ({ property }: { property: Property }) => {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setLoading(true);
        // Fetch similar properties based on location and property type
        const response = await api.getProperties({
          propertyType: property.propertyType,
          operationType: property.operationType,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        
        // Filter out the current property and limit to 3 properties
        const filtered = response.properties
          .filter(p => p._id !== property._id)
          .slice(0, 3);
          
        setSimilarProperties(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching similar properties:', err);
        setError('Failed to load similar properties');
        setLoading(false);
      }
    };

    if (property._id) {
      fetchSimilarProperties();
    }
  }, [property._id, property.propertyType, property.operationType]);

  // If there are no similar properties, don't render the section
  if (!loading && (similarProperties.length === 0 || error)) {
    return null;
  }

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-display font-bold mb-6">Propiedades Similares</h3>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-background border border-border/40 rounded-xl overflow-hidden animate-pulse">
              <div className="aspect-[4/3] bg-muted/30"></div>
              <div className="p-4">
                <div className="h-6 bg-muted/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted/30 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-muted/30 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarProperties.map((similarProperty) => (
            <PropertyCard key={similarProperty._id} property={similarProperty} />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Property Details Component
export default function PropertyDetails({ property }: { property: Property }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  
  // Safely get features
  const features = safeGetFeatures(property);
  
  // Format price
  const formattedPrice = formatPrice(property.price);
  
  // Toggle chat interface
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Navigate to properties page with chat open
  const navigateToPropertiesWithChat = () => {
    router.push('/properties?chat=open');
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/properties" 
          className="inline-flex items-center text-foreground/70 hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Volver a propiedades</span>
        </Link>
      </div>
      
      {/* Property Title and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
            {property.title}
          </h1>
          <div className="flex items-center text-foreground/70">
            <MapPin size={16} className="mr-1" />
            <span>
              {property.location?.address}, {property.location?.area}, {property.location?.city}, {property.location?.state}
            </span>
          </div>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0 space-x-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex items-center justify-center p-2 bg-background border border-border rounded-full hover:border-accent/50 transition-colors"
            aria-label="Like property"
          >
            <Heart size={20} className={isLiked ? 'fill-accent text-accent' : 'text-foreground/70'} />
          </button>
          
          <button 
            className="flex items-center justify-center p-2 bg-background border border-border rounded-full hover:border-accent/50 transition-colors"
            aria-label="Share property"
          >
            <Share2 size={20} className="text-foreground/70" />
          </button>
        </div>
      </div>
      
      {/* Property Gallery */}
      {property.images && property.images.length > 0 && (
        <PropertyGallery images={property.images} />
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Price and Type */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 p-4 bg-background border border-border/40 rounded-xl soft-shadow">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">{formattedPrice}</div>
              <div className="text-foreground/70">{property.operationType || 'Venta'}</div>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <div className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                property.operationType === 'Renta' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
              }`}>
                {property.operationType === 'Renta' ? 'Renta' : 'Venta'}
              </div>
              <div className="ml-2 px-3 py-1.5 bg-background/80 text-foreground/80 text-sm font-medium rounded-md border border-border/50">
                {property.propertyType || 'Casa'}
              </div>
            </div>
          </div>
          
          {/* Home Loan Button */}
          <div className="mb-6">
            <motion.button
              className="w-full py-4 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Calculator className="mr-2" />
              <span className="text-lg">Simular crédito hipotecario</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
            </motion.button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {features.bedrooms && (
              <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-xl">
                <Bed size={24} className="text-primary/70 mb-2" />
                <span className="text-lg font-medium">{features.bedrooms}</span>
                <span className="text-sm text-foreground/70">{features.bedrooms === 1 ? 'Habitación' : 'Habitaciones'}</span>
              </div>
            )}
            
            {features.bathrooms && (
              <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-xl">
                <Bath size={24} className="text-primary/70 mb-2" />
                <span className="text-lg font-medium">{features.bathrooms}</span>
                <span className="text-sm text-foreground/70">{features.bathrooms === 1 ? 'Baño' : 'Baños'}</span>
              </div>
            )}
            
            {features.constructionSize && (
              <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-xl">
                <Square size={24} className="text-primary/70 mb-2" />
                <span className="text-lg font-medium">{features.constructionSize} m²</span>
                <span className="text-sm text-foreground/70">Construcción</span>
              </div>
            )}
            
            {features.lotSize && (
              <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-xl">
                <Map size={24} className="text-primary/70 mb-2" />
                <span className="text-lg font-medium">{features.lotSize} m²</span>
                <span className="text-sm text-foreground/70">Terreno</span>
              </div>
            )}
            
            {features.parking && (
              <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-xl">
                <Car size={24} className="text-primary/70 mb-2" />
                <span className="text-lg font-medium">{features.parking}</span>
                <span className="text-sm text-foreground/70">{features.parking === 1 ? 'Estacionamiento' : 'Estacionamientos'}</span>
              </div>
            )}
            
            {features.floors && (
              <div className="flex flex-col items-center justify-center p-4 bg-background border border-border/40 rounded-xl">
                <Building size={24} className="text-primary/70 mb-2" />
                <span className="text-lg font-medium">{features.floors}</span>
                <span className="text-sm text-foreground/70">{features.floors === 1 ? 'Piso' : 'Pisos'}</span>
              </div>
            )}
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-display font-bold text-foreground mb-4">Descripción</h2>
            <div className="bg-background border border-border/40 rounded-xl p-6 soft-shadow">
              <p className="text-foreground/80 whitespace-pre-line">
                {property.description || 'No hay descripción disponible para esta propiedad.'}
              </p>
            </div>
          </div>
          
          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <PropertyAmenities amenities={property.amenities} />
          )}
        </div>
        
        {/* Right Column - Agent Info and Contact */}
        <div className="lg:col-span-1">
          {/* Agent Card */}
          <div className="sticky top-24">
            <AgentCard agent={property.agent} />
            
            {/* Contact Buttons */}
            <div className="mt-4 space-y-3">
              <a 
                href={`tel:${property.agent?.phone || '123456789'}`}
                className="flex items-center justify-center w-full py-3 px-4 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Phone size={18} className="mr-2" />
                <span>Llamar al agente</span>
              </a>
              
              <button 
                onClick={navigateToPropertiesWithChat}
                className="flex items-center justify-center w-full py-3 px-4 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
              >
                <MessageCircle size={18} className="mr-2" />
                <span>Chatear con IA</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Google Maps - Full Width */}
      <div className="mt-8 mb-8">
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Ubicación y Alrededores</h2>
        <PropertyMap property={property} />
      </div>
      
      {/* Similar Properties Section */}
      <SimilarProperties property={property} />
    </div>
  );
} 