"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { 
  Heart,
  BedDouble,
  Bath,
  Ruler,
  Trees,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Car,
  Building2,
  Share2,
  Calendar,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Check,
  ArrowRight,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/format";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { cn } from "@/lib/utils";
import { ShareButton } from "@/components/properties/share-button";
import { PropertyGrid } from "@/components/properties/property-grid";
import { ContactForm } from "@/components/properties/contact-form";
import { AgentCard } from "@/components/properties/agent-card";
import { PropertyMap } from "@/components/properties/property-map";
import { useChatContextStore } from "@/store/use-chat-context-store";
import { use } from "react";
import { fetchPropertyById, fetchSimilarProperties } from "@/services/properties";
import type { Property } from "@/server/models/property";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isPropertyFavorite = property ? isFavorite(property.id) : false;
  const setPropertyContext = useChatContextStore((state) => state.setPropertyContext);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const propertyContext = useChatContextStore((state) => state.propertyContext);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await fetchPropertyById(resolvedParams.id);
        setProperty(propertyData);
        setPropertyContext(propertyData);

        // Load similar properties
        if (propertyData) {
          const similar = await fetchSimilarProperties(
            propertyData.id,
            propertyData.type,
            propertyData.price
          );
          setSimilarProperties(similar);
        }

        setError(null);
      } catch (err) {
        console.error("Error loading property:", err);
        setError("Failed to load property. Please try again later.");
        setPropertyContext(null);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();

    // Cleanup when leaving the page
    return () => setPropertyContext(null);
  }, [resolvedParams.id, setPropertyContext]);

  // Property context change effect
  useEffect(() => {
    if (propertyContext) {
      const timer = setTimeout(async () => {
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [
                {
                  role: "user",
                  content: `Contexto de la propiedad: ${JSON.stringify(propertyContext)}`
                }
              ],
              propertyContext
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          
          setMessages(prev => [...prev, {
            role: "assistant",
            content: data.message
          }]);
        } catch (error) {
          console.error("Error sending property context:", error);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Lo siento, hubo un error al cargar la información de la propiedad."
          }]);
        }
      }, 10000); // 10 seconds delay

      // Cleanup the timer if the component unmounts or propertyContext changes
      return () => clearTimeout(timer);
    }
  }, [propertyContext]);

  const handleFavoriteClick = () => {
    if (!property) return;
    
    if (isPropertyFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="h-[50vh] animate-pulse bg-muted rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse bg-muted rounded" />
          <div className="h-6 w-1/4 animate-pulse bg-muted rounded" />
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !property) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Propiedad no encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            {error || "La propiedad que buscas no existe o ha sido eliminada."}
          </p>
          <Button asChild className="mt-4">
            <Link href="/properties">Ver todas las propiedades</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Button variant="ghost" size="sm" asChild className="gap-2">
            <Link href="/properties">
              <ChevronLeft className="h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <ShareButton
              title={property.title}
              url={typeof window !== 'undefined' ? window.location.href : ''}
            />
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2",
                isPropertyFavorite && "text-red-500 hover:text-red-600"
              )}
              onClick={handleFavoriteClick}
            >
              <Heart className={cn("h-4 w-4", isPropertyFavorite && "fill-current")} />
              {isPropertyFavorite ? "Guardado" : "Guardar"}
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh] lg:h-[70vh] bg-muted">
        <Image
          src={property.images[selectedImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />

        {/* Image Navigation */}
        <div className="absolute inset-x-4 bottom-4">
          <div className="container">
            <div className="relative">
              <ScrollArea className="w-full pb-4">
                <div className="flex gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={image}
                      className={cn(
                        "group relative flex-none aspect-[4/3] w-28 overflow-hidden rounded-md transition",
                        selectedImageIndex === index && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} - Imagen ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="112px"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <Button
                variant="outline"
                size="sm"
                className="absolute right-0 top-0 gap-2 bg-background/95 backdrop-blur-sm"
                onClick={() => setIsGalleryOpen(true)}
              >
                <Maximize2 className="h-4 w-4" />
                Ver galería
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container relative -mt-16 space-y-6 pb-8">
        {/* Main Info Card */}
        <div className="rounded-xl bg-background p-6 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {property.operationType}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {property.propertyType}
                </Badge>
                <Badge variant="outline" className="text-sm bg-muted/50">
                  {property.propertyAge === 0 ? "Nueva" : `${property.propertyAge} años`}
                </Badge>
              </div>
              <h1 className="text-2xl font-semibold sm:text-3xl">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.location.area}, {property.location.city}</span>
              </div>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-3xl font-bold">{formatPrice(property.price)}</p>
              {property.maintenanceFee && property.maintenanceFee > 0 && (
                <p className="text-sm text-muted-foreground">
                  Mantenimiento: {formatPrice(property.maintenanceFee)}/mes
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button className="gap-2" asChild>
              <a href={`tel:${property.agent.phone}`}>
                <Phone className="h-4 w-4" />
                Llamar al agente
              </a>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <a href={`mailto:${property.agent.email}`}>
                <Mail className="h-4 w-4" />
                Enviar email
              </a>
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => {
              const contactForm = document.getElementById('contact-form');
              contactForm?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <MessageSquare className="h-4 w-4" />
              Agendar visita
            </Button>
          </div>

          {/* Key Features Grid */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {property.features.bedrooms !== null && property.features.bedrooms !== 0 && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <BedDouble className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{property.features.bedrooms}</p>
                  <p className="text-xs text-muted-foreground">
                    {property.features.bedrooms === 1 ? "Recámara" : "Recámaras"}
                  </p>
                </div>
              </div>
            )}
            {property.features.bathrooms !== null && property.features.bathrooms !== 0 && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{property.features.bathrooms}</p>
                  <p className="text-xs text-muted-foreground">
                    {property.features.bathrooms === 1 ? "Baño" : "Baños"}
                  </p>
                </div>
              </div>
            )}
            {property.features.constructionSize !== null && property.features.constructionSize !== 0 && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Ruler className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{property.features.constructionSize}m²</p>
                  <p className="text-xs text-muted-foreground">Construcción</p>
                </div>
              </div>
            )}
            {property.features.lotSize !== null && property.features.lotSize !== 0 && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Trees className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{property.features.lotSize}m²</p>
                  <p className="text-xs text-muted-foreground">Terreno</p>
                </div>
              </div>
            )}
            {property.features.parking !== null && property.features.parking !== 0 && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Car className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{property.features.parking}</p>
                  <p className="text-xs text-muted-foreground">
                    {property.features.parking === 1 ? "Estacionamiento" : "Estacionamientos"}
                  </p>
                </div>
              </div>
            )}
            {property.features.floors !== null && property.features.floors !== 0 && (
              <div className="flex items-center gap-3 rounded-lg border p-4">
                <Building2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{property.features.floors}</p>
                  <p className="text-xs text-muted-foreground">
                    {property.features.floors === 1 ? "Piso" : "Pisos"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Key Details */}
            <div className="rounded-lg bg-background p-6 shadow">
              <h2 className="text-xl font-semibold">Detalles principales</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>Tipo: {property.propertyType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Antigüedad: {property.propertyAge === 0 ? "Nueva" : `${property.propertyAge} años`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Publicado: {format(new Date(property.createdAt), "d 'de' MMMM, yyyy", { locale: es })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground" />
                  <span>Estado: {property.status}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg bg-background p-6 shadow">
              <h2 className="text-xl font-semibold">Descripción</h2>
              <p className="mt-4 whitespace-pre-line text-muted-foreground">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            {property.amenities.length > 0 && (
              <div className="rounded-lg bg-background p-6 shadow">
                <h2 className="text-xl font-semibold">Amenidades</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {property.amenities.map(amenity => (
                    <div key={amenity} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/50">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {property.location.coordinates && (
              <div className="rounded-lg bg-background p-6 shadow">
                <h2 className="text-xl font-semibold">Ubicación</h2>
                <div className="mt-4 aspect-[16/9] overflow-hidden rounded-lg">
                  <PropertyMap properties={[property]} />
                </div>
                <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{property.location.address}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Card */}
            <AgentCard {...property.agent} />

            {/* Contact Form */}
            <div id="contact-form" className="rounded-lg bg-background p-6 shadow">
              <div className="mb-6 space-y-2">
                <h2 className="text-xl font-semibold">¿Te interesa esta propiedad?</h2>
                <p className="text-sm text-muted-foreground">
                  Agenda una visita o solicita más información. Nuestro agente te contactará lo antes posible.
                </p>
              </div>
              <ContactForm propertyTitle={property.title} propertyId={property.id} />
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Propiedades similares</h2>
              <Button variant="ghost" size="sm" className="gap-2" asChild>
                <Link href="/properties">
                  Ver más
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <PropertyGrid properties={similarProperties} />
          </div>
        )}
      </main>

      {/* Full Screen Gallery */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-7xl">
          <div className="relative aspect-[16/9]">
            <Image
              src={property.images[selectedImageIndex]}
              alt={property.title}
              fill
              className="object-contain"
              sizes="(min-width: 1280px) 1200px, 100vw"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-[50%] -translate-y-1/2"
              onClick={() => setSelectedImageIndex((i) => (i === 0 ? property.images.length - 1 : i - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-[50%] -translate-y-1/2"
              onClick={() => setSelectedImageIndex((i) => (i === property.images.length - 1 ? 0 : i + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4">
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-4">
                {property.images.map((image, index) => (
                  <button
                    key={image}
                    className={cn(
                      "relative flex-none aspect-[4/3] w-20 overflow-hidden rounded-md transition",
                      selectedImageIndex === index && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 