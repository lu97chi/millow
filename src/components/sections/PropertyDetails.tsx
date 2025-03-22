"use client";

import { useState, useEffect } from "react";
import ChatSelector from "../chatSelector/ChatSelector";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import type { Property } from "@/types/properties";
import { api } from "@/lib/api-client";
import ChatInterface from "@/components/chat/ChatInterface";
import ChatButton from "@/components/chat/ChatButton";
import HeliosChatInterface from "../heliosChat/HeliosChatInterface";

// Helper function to safely access nested properties
const safeGetFeatures = (property: Property) => {
  const features = property.features || {};
  return {
    bedrooms:
      features.bedrooms && features.bedrooms > 0 ? features.bedrooms : null,
    bathrooms:
      features.bathrooms && features.bathrooms > 0 ? features.bathrooms : null,
    constructionSize:
      features.constructionSize && features.constructionSize > 0
        ? features.constructionSize
        : null,
    lotSize: features.lotSize && features.lotSize > 0 ? features.lotSize : null,
    parking: features.parking && features.parking > 0 ? features.parking : null,
    floors: features.floors && features.floors > 0 ? features.floors : null,
  };
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
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
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
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
    <div
      className={`relative ${
        isFullscreen
          ? "fixed inset-0 z-50 bg-background"
          : "h-[500px] md:h-[600px] rounded-xl overflow-hidden"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={imageUrl}
            alt={`Property image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0}
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>
      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background p-2 rounded-full transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Fullscreen Toggle */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-4 right-4 bg-background/80 hover:bg-background p-2 rounded-full transition-colors z-10"
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5 text-foreground" />
        ) : (
          <Maximize className="w-5 h-5 text-foreground" />
        )}
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1.5 rounded-full text-sm font-medium text-foreground z-10">
        {currentIndex + 1} / {images.length}
      </div>
      
      {/* Thumbnail Gallery - Only show if there are multiple images and not in fullscreen */}
      {!isFullscreen && images.length > 1 && (
        <div className="grid grid-cols-6 gap-2 mt-2">
          {images.slice(0, 6).map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-accent" : "bg-foreground/30"
              }`}
            >
              <span className="sr-only">Image {index + 1}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Agent Card Component
const AgentCard = ({ agent }: { agent: Property["agent"] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-background border border-border/40 rounded-xl p-6 sticky top-24 soft-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
          <Image
            src={agent.image || "/placeholder-agent.jpg"}
            alt={agent.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-display font-medium text-lg text-foreground">
            {agent.name}
          </h3>
          <p className="text-foreground/60 text-sm">
            {agent.title || "Agente Inmobiliario"}
          </p>
          <p className="text-accent text-sm font-medium">{agent.company}</p>
        </div>
      </div>

      {/* Agent Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {agent.experience !== null && (
          <div className="bg-muted/20 rounded-lg p-3 text-center">
            <p className="text-foreground/60 text-xs mb-1">Experiencia</p>
            <p className="text-foreground font-medium">
              {agent.experience} años
            </p>
          </div>
        )}
        {agent.activeListings !== null && (
          <div className="bg-muted/20 rounded-lg p-3 text-center">
            <p className="text-foreground/60 text-xs mb-1">Propiedades</p>
            <p className="text-foreground font-medium">
              {agent.activeListings}
            </p>
          </div>
        )}
      </div>

      {/* Contact Buttons */}
      <div className="space-y-3">
        <a
          href={`tel:${agent.phone}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>Llamar</span>
        </a>
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span>Enviar Email</span>
        </a>
        <button className="flex items-center justify-center gap-2 w-full py-3 bg-muted/20 text-foreground rounded-lg hover:bg-muted/30 transition-colors">
          <Calendar className="w-4 h-4" />
          <span>Agendar Visita</span>
        </button>
      </div>

      {/* Safety Badge */}
      <div className="mt-6 flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
        <Shield className="w-5 h-5 text-green-500" />
        <div>
          <p className="text-foreground text-sm font-medium">
            Agente Verificado
          </p>
          <p className="text-foreground/60 text-xs">
            Identidad y licencia verificadas
          </p>
        </div>
      </div>
    </motion.div>
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSimilarProperties = async () => {
      try {
        setIsLoading(true);
        // Fetch similar properties based on location and property type
        const response = await api.getProperties({
          propertyType: property.propertyType,
          operationType: property.operationType,
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });

        // Filter out the current property and limit to 4 properties
        const filtered = response.properties
          .filter((p) => p._id !== property._id)
          .slice(0, 4);

        setSimilarProperties(filtered);
      } catch (error) {
        console.error("Error fetching similar properties:", error);
        setError("Error al cargar propiedades similares");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilarProperties();
  }, [property]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-muted/20 rounded-xl h-64"></div>
        ))}
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-foreground/70">
          No se encontraron propiedades similares.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {similarProperties.map((prop) => (
        <motion.div
          key={prop._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card hover:bg-card/90 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group"
        >
          <Link href={`/properties/${prop._id}`} className="block">
            <div className="relative h-48 overflow-hidden">
              {prop.images && prop.images.length > 0 ? (
                <Image
                  src={prop.images[0]}
                  alt={prop.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-muted/30 flex items-center justify-center">
                  <Home className="w-12 h-12 text-muted/50" />
                </div>
              )}
              <div className="absolute top-2 left-2">
                <span
                  className={`${
                    prop.operationType === "Renta"
                      ? "bg-primary/90"
                      : "bg-accent/90"
                  } text-white text-xs font-medium px-2 py-1 rounded-full`}
                >
                  {prop.operationType === "Renta" ? "Renta" : "Venta"}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-foreground line-clamp-1">
                {prop.title}
              </h3>
              <p className="text-sm text-foreground/70 mb-2 line-clamp-1">
                <MapPin size={14} className="inline mr-1" />
                {prop.location.city}, {prop.location.state}
              </p>
              <p className="text-accent font-bold">{formatPrice(prop.price)}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-foreground/70">
                {prop.features?.bedrooms && (
                  <span className="flex items-center gap-1">
                    <Bed size={14} /> {prop.features.bedrooms}
                  </span>
                )}
                {prop.features?.bathrooms && (
                  <span className="flex items-center gap-1">
                    <Bath size={14} /> {prop.features.bathrooms}
                  </span>
                )}
                {prop.features?.constructionSize && (
                  <span className="flex items-center gap-1">
                    <Square size={14} /> {prop.features.constructionSize} m²
                  </span>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

// Main Property Details Component
export default function PropertyDetails({ property }: { property: Property }) {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const router = useRouter();

  // Safely format the price
  const formattedPrice = formatPrice(property.price);

  // Safely get features
  const features = safeGetFeatures(property);

  // Format dates
  const createdDate = formatDate(property.createdAt);
  const updatedDate = formatDate(property.updatedAt);

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
        <nav className="flex items-center text-sm text-foreground/60">
          <Link href="/" className="hover:text-accent transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/properties"
            className="hover:text-accent transition-colors"
          >
            Propiedades
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground/90 truncate max-w-[200px]">
            {property.title}
          </span>
        </nav>
      </div>

      {/* Back Button */}
      <Link
        href="/properties"
        className="inline-flex items-center gap-2 text-foreground/70 hover:text-accent transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a propiedades</span>
      </Link>

      {/* Property Gallery */}
      {property.images && property.images.length > 0 && (
        <PropertyGallery images={property.images} />
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Property Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`${
                  property.operationType === "Renta"
                    ? "bg-primary/90"
                    : "bg-accent/90"
                } text-white text-xs font-medium px-3 py-1.5 rounded-full`}
              >
                {property.operationType === "Renta" ? "En Renta" : "En Venta"}
              </span>
              <span className="bg-muted/20 text-foreground/90 text-xs font-medium px-3 py-1.5 rounded-full">
                {property.propertyType}
              </span>
              <span
                className={`
                text-xs font-medium px-3 py-1.5 rounded-full
                ${
                  property.status === "available"
                    ? "bg-green-500/90 text-white"
                    : property.status === "sold"
                    ? "bg-red-500/90 text-white"
                    : "bg-yellow-500/90 text-white"
                }
              `}
              >
                {property.status === "available"
                  ? "Disponible"
                  : property.status === "sold"
                  ? "Vendido"
                  : "Rentado"}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {property.title}
            </h1>

            <div className="flex items-center text-foreground/70 mb-4">
              <MapPin size={18} className="mr-1 text-accent" />
              <span>
                {property.location.address}, {property.location.area},{" "}
                {property.location.city}, {property.location.state}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-accent font-bold text-3xl font-display">
                  {formattedPrice}
                  {property.operationType === "Renta" && "/mes"}
                </p>
                {property.maintenanceFee !== null &&
                  property.maintenanceFee > 0 && (
                    <p className="text-foreground/60 text-sm">
                      Mantenimiento: {formatPrice(property.maintenanceFee)}/mes
                    </p>
                  )}
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-full transition-colors flex items-center justify-center ${
                    isLiked
                      ? "bg-red-100 text-red-500"
                      : "bg-muted/20 text-foreground/60 hover:bg-muted/30"
                  }`}
                  aria-label={
                    isLiked ? "Quitar de favoritos" : "Agregar a favoritos"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  className="p-2 rounded-full bg-muted/20 text-foreground/60 hover:bg-muted/30 transition-colors"
                  aria-label="Compartir propiedad"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Property Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            {features.bedrooms !== null && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Bed className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {features.bedrooms}
                </span>
                <span className="text-foreground/60 text-sm">Recámaras</span>
              </div>
            )}

            {features.bathrooms !== null && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Bath className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {features.bathrooms}
                </span>
                <span className="text-foreground/60 text-sm">Baños</span>
              </div>
            )}

            {features.constructionSize !== null && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Square className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {features.constructionSize} m²
                </span>
                <span className="text-foreground/60 text-sm">Construcción</span>
              </div>
            )}

            {features.lotSize !== null && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Map className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {features.lotSize} m²
                </span>
                <span className="text-foreground/60 text-sm">Terreno</span>
              </div>
            )}

            {features.parking !== null && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Home className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {features.parking}
                </span>
                <span className="text-foreground/60 text-sm">
                  Estacionamientos
                </span>
              </div>
            )}

            {features.floors !== null && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Building className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {features.floors}
                </span>
                <span className="text-foreground/60 text-sm">Pisos</span>
              </div>
            )}

            {property.propertyAge !== null && property.propertyAge > 0 && (
              <div className="bg-card p-4 rounded-xl border border-border/50 flex flex-col items-center justify-center text-center">
                <Clock className="w-6 h-6 text-accent mb-2" />
                <span className="text-foreground font-medium">
                  {property.propertyAge} años
                </span>
                <span className="text-foreground/60 text-sm">Antigüedad</span>
              </div>
            )}
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6 border-b border-border/50"
          >
            <div className="flex overflow-x-auto hide-scrollbar">
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "details"
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Detalles
              </button>
              <button
                onClick={() => setActiveTab("amenities")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "amenities"
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Amenidades
              </button>
              <button
                onClick={() => setActiveTab("location")}
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === "location"
                    ? "text-accent border-b-2 border-accent"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Ubicación
              </button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "details" && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Descripción
                </h2>
                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-8">
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/10 rounded-xl mb-8">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-foreground/70 text-sm">
                        Publicado el {createdDate}
                      </p>
                      <p className="text-foreground/50 text-xs">
                        Actualizado el {updatedDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-accent" />
                    <span className="text-foreground/70 text-sm">
                      ID: {property._id.substring(0, 8)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "amenities" && (
              <motion.div
                key="amenities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Amenidades
                </h2>

                {property.amenities && property.amenities.length > 0 ? (
                  <PropertyAmenities amenities={property.amenities} />
                ) : (
                  <p className="text-foreground">
                    No se han especificado amenidades para esta propiedad.
                  </p>
                )}
              </motion.div>
            )}

            {activeTab === "location" && (
              <motion.div
                key="location"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-display font-bold text-foreground mb-6">
                  Ubicación
                </h2>

                {/* Location Details */}
                <div className="mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <p className="text-foreground font-medium">
                        {property.location.address}
                      </p>
                      <p className="text-foreground/70">
                        {property.location.area}, {property.location.city},{" "}
                        {property.location.state}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="bg-muted/20 rounded-xl h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-12 h-12 text-foreground/30 mx-auto mb-3" />
                    <p className="text-foreground/70">Mapa no disponible</p>
                    <p className="text-foreground/50 text-sm">
                      Contacta al agente para obtener la ubicación exacta
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Similar Properties Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Propiedades Similares
            </h2>
            <SimilarProperties property={property} />
          </motion.div>

          {/* AI Safety Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-4 bg-primary/10 rounded-xl border border-primary/20 flex items-center gap-4"
          >
            <div className="p-3 bg-primary/20 rounded-full">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-foreground font-medium mb-1">
                Propiedad Verificada por IA
              </h3>
              <p className="text-foreground/70 text-sm">
                Esta propiedad ha sido verificada por nuestro sistema de
                inteligencia artificial para garantizar la precisión de la
                información.
              </p>
            </div>
            </motion.div>
        </div>
      </div>
      

      {/* Chat Button */}
      <ChatButton onClick={toggleChat} />  

      {/* Chat Interface */}
      <ChatSelector />
    </div>

  );
}
