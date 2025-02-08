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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SAMPLE_PROPERTIES } from "@/constants/properties";
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

// Mock agent data (in a real app, this would come from your backend)
const AGENT = {
  name: "Ana García",
  title: "Agente Inmobiliario Senior",
  company: "Millow Real Estate",
  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
  phone: "+52 55 1234 5678",
  email: "ana.garcia@millow.com",
  experience: 8,
  activeListings: 24,
};

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const resolvedParams = use(params);
  const property = SAMPLE_PROPERTIES.find(p => p.id === resolvedParams.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isPropertyFavorite = property ? isFavorite(property.id) : false;
  const setPropertyContext = useChatContextStore((state) => state.setPropertyContext);

  // Set property context when viewing property details
  useEffect(() => {
    setPropertyContext(property || null);
    // Cleanup when leaving the page
    return () => setPropertyContext(null);
  }, [property, setPropertyContext]);

  // Redirect or show 404 if property not found
  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Propiedad no encontrada</h1>
          <p className="mt-2 text-muted-foreground">
            La propiedad que buscas no existe o ha sido eliminada.
          </p>
          <Button asChild className="mt-4">
            <Link href="/properties">Ver todas las propiedades</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    if (isPropertyFavorite) {
      removeFavorite(property.id);
    } else {
      addFavorite(property);
    }
  };

  const similarProperties = SAMPLE_PROPERTIES
    .filter(p => 
      p.id !== property.id && 
      p.type === property.type &&
      Math.abs(p.price - property.price) < property.price * 0.3
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] lg:h-[70vh] bg-muted">
        <Image
          src={property.images[selectedImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4">
          <div className="container flex items-center justify-between">
            <Button variant="outline" size="icon" asChild>
              <Link href="/properties">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "rounded-full",
                  isPropertyFavorite && "text-red-500 hover:text-red-600"
                )}
                onClick={handleFavoriteClick}
              >
                <Heart className={cn("h-4 w-4", isPropertyFavorite && "fill-current")} />
              </Button>
              <ShareButton
                title={property.title}
                url={typeof window !== 'undefined' ? window.location.href : ''}
              />
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="container">
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-4">
                {property.images.map((image, index) => (
                  <button
                    key={image}
                    className={cn(
                      "group relative flex-none aspect-[4/3] w-32 overflow-hidden rounded-md",
                      selectedImageIndex === index && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Imagen ${index + 1}`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="128px"
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
              className="absolute right-4 top-0 gap-2"
              onClick={() => setIsGalleryOpen(true)}
            >
              <Maximize2 className="h-4 w-4" />
              Ver galería
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container relative -mt-16 space-y-8 pb-8">
        <div className="rounded-xl bg-background p-6 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {property.propertyAge === 0 ? "Nueva" : `${property.propertyAge} años`}
                </Badge>
                <Badge variant="outline">{property.type}</Badge>
              </div>
              <h1 className="text-2xl font-semibold sm:text-3xl">{property.title}</h1>
              <p className="text-muted-foreground">
                {property.location.area}, {property.location.city}
              </p>
            </div>
            <div className="space-y-2 text-right">
              <p className="text-3xl font-bold">{formatPrice(property.price)}</p>
              {property.maintenanceFee && (
                <p className="text-sm text-muted-foreground">
                  Mantenimiento: {formatPrice(property.maintenanceFee)}/mes
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {property.features.bedrooms && (
              <div className="flex items-center gap-2">
                <BedDouble className="h-4 w-4 text-muted-foreground" />
                <span>
                  {property.features.bedrooms} {property.features.bedrooms === 1 ? "Recámara" : "Recámaras"}
                </span>
              </div>
            )}
            {property.features.bathrooms && (
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span>
                  {property.features.bathrooms} {property.features.bathrooms === 1 ? "Baño" : "Baños"}
                </span>
              </div>
            )}
            {property.features.constructionSize && (
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <span>{property.features.constructionSize}m² construcción</span>
              </div>
            )}
            {property.features.lotSize && (
              <div className="flex items-center gap-2">
                <Trees className="h-4 w-4 text-muted-foreground" />
                <span>{property.features.lotSize}m² terreno</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
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
                      <div className="h-2 w-2 rounded-full bg-primary" />
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
          <div className="space-y-4">
            {/* Agent Card */}
            <AgentCard {...AGENT} />

            {/* Contact Form */}
            <div className="rounded-lg bg-background p-6 shadow">
              <h2 className="text-xl font-semibold">Contactar</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>
              <div className="mt-4">
                <ContactForm propertyTitle={property.title} propertyId={property.id} />
              </div>
            </div>

            {/* Property Details */}
            <div className="rounded-lg bg-background p-6 shadow">
              <h2 className="text-xl font-semibold">Detalles</h2>
              <dl className="mt-4 space-y-4">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tipo</dt>
                  <dd className="font-medium">{property.type}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Antigüedad</dt>
                  <dd className="font-medium">
                    {property.propertyAge === 0 ? "Nueva" : `${property.propertyAge} años`}
                  </dd>
                </div>
                {property.features.floors && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Pisos</dt>
                    <dd className="font-medium">{property.features.floors}</dd>
                  </div>
                )}
                {property.features.parking && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Estacionamiento</dt>
                    <dd className="font-medium">{property.features.parking} lugares</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Publicado</dt>
                  <dd className="font-medium">
                    {format(new Date(property.createdAt), "d 'de' MMMM, yyyy", { locale: es })}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Propiedades similares</h2>
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
        </DialogContent>
      </Dialog>
    </div>
  );
} 