"use client";

import { AgentCard } from "@/components/properties/agent-card";
import { ContactForm } from "@/components/properties/contact-form";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyMap } from "@/components/properties/property-map";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PropertyService } from "@/server/services/property-service";
import { Property, PropertyTypeName } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Bath,
  BedDouble,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  Mail,
  MapPin,
  Maximize2,
  MessageSquare,
  Phone,
  Ruler,
  Trees
} from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useProperty } from "@/providers/property-context";
//import { Metadata } from "next";
//import { Params } from "next/dist/server/request/params";
interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

/* export const metadata: Metadata = { 
  title:"Detalles de la propiedad",

}

export async function generateMetadata({id}:Params){
  return{
    title:`Propiedad${id}`,
    description:`Detalles de la propiedad: ${id}`,
    openGraph:{
      title: `Propiedad ${id}`,
      description: `Propiedades de ${id}`,
      type: "website",
      locale: "es",
      url: `https://tuhogar.mx/properties/${id}`,
      siteName: "Tu Hogar",
      images: [
        
      ]
  }
}
}
 */

// Helper function to fetch property by ID
async function fetchPropertyById(id: string): Promise<Property> {
  const propertyService = PropertyService.getInstance();
  const properties = await propertyService.getProperties({ id });
  if (!properties.properties.length) {
    throw new Error("Property not found");
  }
  return properties.properties[0];
}

// Helper function to fetch similar properties
async function fetchSimilarProperties(
  id: string,
  type: PropertyTypeName,
  price: number
): Promise<Property[]> {
  const propertyService = PropertyService.getInstance();
  const properties = await propertyService.getProperties({
    propertyType: [type],
    minPrice: price * 0.8,
    maxPrice: price * 1.2,
  });
  return properties.properties.filter((p: Property) => p.id !== id).slice(0, 3);
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [property, setProperty] = useState<Property | null>(null);
  const { setCurrentProperty } = useProperty();
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        const propertyData = await fetchPropertyById(id);
        setProperty(propertyData);
        setCurrentProperty(propertyData);

        // Load similar properties
        if (propertyData) {
          const similar = await fetchSimilarProperties(
            propertyData.id,
            propertyData.propertyType,
            propertyData.price
          );
          setSimilarProperties(similar);
        }

        setError(null);
      } catch (err) {
        console.error("Error loading property:", err);
        setError("Failed to load property. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
    return () => {
      setCurrentProperty(null); // Clean up when unmounting
    };
  }, [id, setCurrentProperty]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex-1">
        <div className="container py-8 space-y-8">
          <div className="h-[60vh] animate-pulse bg-muted rounded-lg" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="h-8 w-1/3 animate-pulse bg-muted rounded" />
            <div className="h-6 w-1/4 animate-pulse bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error || !property) {
    return (
      <div className="flex-1">
        <div className="container py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-[400px] items-center justify-center">
              <p className="text-red-500">{error || "Property not found"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[70vh] lg:h-[75vh] bg-muted">
        <Image
          src={property.images[selectedImageIndex]}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={85}
          unoptimized={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />

        {/* Image Navigation */}
        <div className="absolute inset-x-0 bottom-4">
          <div className="container px-4 sm:px-6">
            <div className="relative">
              <ScrollArea className="w-full pb-4">
                <div className="flex gap-2">
                  {property.images.map((image, index) => (
                    <button
                      key={image}
                      className={cn(
                        "group relative flex-none aspect-[4/3] w-20 sm:w-28 overflow-hidden rounded-md transition",
                        selectedImageIndex === index && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${property.title} - Imagen ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 640px) 80px, 112px"
                        loading="lazy"
                        quality={85}
                        unoptimized={false}
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
                className="absolute right-0 top-0 gap-2 bg-background/95 backdrop-blur-sm hidden sm:flex"
                onClick={() => setIsGalleryOpen(true)}
              >
                <Maximize2 className="h-4 w-4" />
                Ver galería
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 w-full overflow-hidden">
        <div className="container max-w-full px-4 sm:px-6 pb-8 -mt-16 relative z-10">
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="rounded-xl bg-background p-4 sm:p-6 shadow-lg ring-1 ring-gray-900/5 w-full max-w-full">
              <div className="flex flex-col gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {property.operationType}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {property.propertyType}
                    </Badge>
                    <Badge variant="outline" className="text-sm bg-muted/50">
                      {property.propertyAge === 0
                        ? "Nueva"
                        : `${property.propertyAge} años`}
                    </Badge>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-semibold lg:text-3xl break-words pt-4">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm sm:text-base break-words">
                      {property.location.area}, {property.location.city}
                    </span>
                  </div>
                </div>
                <div className="lg:text-right">
                  <p className="text-2xl sm:text-3xl font-bold">
                    {formatPrice(property.price)}
                  </p>
                  {property.maintenanceFee && property.maintenanceFee > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Mantenimiento: {formatPrice(property.maintenanceFee)}/mes
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 flex flex-wrap gap-2">
                <Button className="gap-2 flex-1 sm:flex-none" asChild>
                  <a href={`tel:${property.agent.phone}`}>
                    <Phone className="h-4 w-4" />
                    <span className="hidden sm:inline">Llamar al agente</span>
                    <span className="sm:hidden">Llamar</span>
                  </a>
                </Button>
                <Button variant="outline" className="gap-2 flex-1 sm:flex-none" asChild>
                  <a href={`mailto:${property.agent.email}`}>
                    <Mail className="h-4 w-4" />
                    <span className="hidden sm:inline">Enviar email</span>
                    <span className="sm:hidden">Email</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 flex-1 sm:flex-none"
                  onClick={() => {
                    const contactForm = document.getElementById("contact-form");
                    contactForm?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Agendar visita</span>
                  <span className="sm:hidden">Agendar</span>
                </Button>
              </div>

              {/* Key Features Grid */}
              <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {property.features.bedrooms !== null &&
                  property.features.bedrooms !== 0 && (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <BedDouble className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {property.features.bedrooms}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.features.bedrooms === 1
                            ? "Recámara"
                            : "Recámaras"}
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.bathrooms !== null &&
                  property.features.bathrooms !== 0 && (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Bath className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {property.features.bathrooms}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.features.bathrooms === 1 ? "Baño" : "Baños"}
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.constructionSize !== null &&
                  property.features.constructionSize !== 0 && (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Ruler className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {property.features.constructionSize}m²
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          Construcción
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.lotSize !== null &&
                  property.features.lotSize !== 0 && (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Trees className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {property.features.lotSize}m²
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          Terreno
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.parking !== null &&
                  property.features.parking !== 0 && (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Car className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {property.features.parking}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.features.parking === 1
                            ? "Estacionamiento"
                            : "Estacionamientos"}
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.floors !== null &&
                  property.features.floors !== 0 && (
                    <div className="flex items-center gap-3 rounded-lg border p-4">
                      <Building2 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {property.features.floors}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {property.features.floors === 1 ? "Piso" : "Pisos"}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 items-start lg:grid-cols-3">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Key Details */}
                <div className="rounded-lg bg-background p-6 shadow-lg ring-1 ring-gray-900/5">
                  <h2 className="text-xl font-semibold">
                    Detalles principales
                  </h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span>Tipo: {property.propertyType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Antigüedad:{" "}
                        {property.propertyAge === 0
                          ? "Nueva"
                          : `${property.propertyAge} años`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Publicado:{" "}
                        {format(
                          new Date(property.createdAt),
                          "d 'de' MMMM, yyyy",
                          { locale: es }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-muted-foreground" />
                      <span>Estado: {property.status}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-lg bg-background p-6 shadow-lg ring-1 ring-gray-900/5">
                  <h2 className="text-xl font-semibold">Descripción</h2>
                  <div className="mt-4 prose prose-sm max-w-none text-muted-foreground">
                    <p className="whitespace-pre-line leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                {property.amenities.length > 0 && (
                  <div className="rounded-lg bg-background p-6 shadow-lg ring-1 ring-gray-900/5">
                    <h2 className="text-xl font-semibold">Amenidades</h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                      {property.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-2 group"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/50 flex-shrink-0 transition-colors group-hover:border-primary group-hover:text-primary">
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                {property.location.coordinates && (
                  <div className="rounded-lg bg-background p-6 shadow-lg ring-1 ring-gray-900/5">
                    <h2 className="text-xl font-semibold">Ubicación</h2>
                    <div className="mt-4 h-[400px] overflow-hidden rounded-lg border">
                      <PropertyMap property={property} />
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">
                        {property.location.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:sticky lg:top-20 space-y-6">
                {/* Agent Card */}
                <div className="transform transition-all hover:scale-[1.02]">
                  <AgentCard {...property.agent} />
                </div>

                {/* Contact Form */}
                <div
                  id="contact-form"
                  className="rounded-lg bg-background p-6 shadow-lg ring-1 ring-gray-900/5 transform transition-all hover:scale-[1.02]"
                >
                  <div className="mb-6 space-y-2">
                    <h2 className="text-xl font-semibold">
                      ¿Te interesa esta propiedad?
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Agenda una visita o solicita más información. Nuestro
                      agente te contactará lo antes posible.
                    </p>
                  </div>
                  <ContactForm
                    propertyTitle={property.title}
                    propertyId={property.id}
                  />
                </div>
              </div>
            </div>

            {/* Similar Properties Section */}
            {similarProperties.length > 0 && (
              <section className="rounded-lg bg-background p-4 sm:p-6 shadow-lg ring-1 ring-gray-900/5 w-full max-w-full overflow-hidden">
                <h2 className="text-xl font-semibold mb-6">
                  Propiedades similares
                </h2>
                <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full">
                  {similarProperties.map((similarProperty) => (
                    <div
                      key={similarProperty.id}
                      className="transform transition-all hover:scale-[1.02] w-full"
                    >
                      <PropertyCard property={similarProperty} view="grid" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      {/* Full Screen Gallery */}
      <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
        <DialogContent className="max-w-7xl w-full p-0 sm:p-6 mx-auto">
          <div className="relative aspect-[3/4] sm:aspect-video bg-background/80 backdrop-blur-sm rounded-lg overflow-hidden">
            <Image
              src={property.images[selectedImageIndex]}
              alt={property.title}
              fill
              className="object-contain"
              sizes="100vw"
              quality={85}
              unoptimized={false}
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-[50%] -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
              onClick={() =>
                setSelectedImageIndex((i) =>
                  i === 0 ? property.images.length - 1 : i - 1
                )
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-[50%] -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all"
              onClick={() =>
                setSelectedImageIndex((i) =>
                  i === property.images.length - 1 ? 0 : i + 1
                )
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 px-4 sm:px-0 w-full max-w-full overflow-hidden">
            <ScrollArea className="w-full">
              <div className="flex gap-2 pb-4">
                {property.images.map((image, index) => (
                  <button
                    key={image}
                    className={cn(
                      "relative flex-none aspect-[4/3] w-16 sm:w-20 overflow-hidden rounded-lg transition-all hover:ring-2 hover:ring-primary/50",
                      selectedImageIndex === index && "ring-2 ring-primary"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`${property.title} - Imagen ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 64px, 80px"
                      loading="lazy"
                      quality={85}
                      unoptimized={false}
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
