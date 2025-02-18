"use client";

import { AgentCard } from "@/components/properties/agent-card";
import { ContactForm } from "@/components/properties/contact-form";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertyImage } from "@/components/properties/property-image";
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
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[65vh] sm:h-[80vh] xl:h-[85vh] bg-muted">
        <div className="absolute inset-0">
          <div className="relative h-full w-full overflow-hidden">
            <PropertyImage
              src={property.images[selectedImageIndex]}
              alt={property.title}
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
            {/* Multiple layered gradients for a more sophisticated look */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
          </div>
        </div>

        {/* Content overlay with property title */}
        <div className="absolute inset-x-0 bottom-40 sm:bottom-48">
          <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-sm font-medium px-3 py-1">
                  {property.operationType}
                </Badge>
                <Badge variant="outline" className="text-sm bg-background/80 backdrop-blur-sm px-3 py-1">
                  {property.propertyType}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="h-5 w-5 flex-shrink-0" />
                <span className="text-lg sm:text-xl font-medium drop-shadow-lg">
                  {property.location.area}, {property.location.city}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Image Navigation */}
        <div className="absolute inset-x-0 bottom-6 sm:bottom-10">
          <div className="container px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="relative">
              <ScrollArea className="w-full">
                <div className="flex gap-4 pb-4 px-[1px]">
                  {property.images.map((image, index) => (
                    <button
                      key={image}
                      className={cn(
                        "group relative flex-none aspect-[4/3] w-24 sm:w-32 overflow-hidden rounded-xl transition-all duration-300",
                        "hover:ring-4 hover:ring-primary/60",
                        "shadow-lg hover:shadow-xl",
                        selectedImageIndex === index && "ring-4 ring-primary"
                      )}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="relative w-full h-full">
                        <PropertyImage
                          src={image}
                          alt={`${property.title} - Imagen ${index + 1}`}
                          fill
                          className="object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </ScrollArea>
              <Button
                variant="outline"
                size="lg"
                className="absolute -top-24 right-0 gap-3 bg-background/95 backdrop-blur-sm hidden sm:flex shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsGalleryOpen(true)}
              >
                <Maximize2 className="h-5 w-5" />
                Ver galería completa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 w-full">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 pb-16 -mt-24 relative z-10">
          <div className="space-y-8">
            {/* Main Info Card */}
            <div className="mt-12 rounded-2xl bg-background/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl ring-1 ring-gray-900/5 w-full max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-sm px-3 py-1">
                      {property.operationType}
                    </Badge>
                    <Badge variant="outline" className="text-sm px-3 py-1">
                      {property.propertyType}
                    </Badge>
                    <Badge variant="outline" className="text-sm bg-muted/50 px-3 py-1">
                      {property.propertyAge === 0
                        ? "Nueva"
                        : `${property.propertyAge} años`}
                    </Badge>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold break-words tracking-tight">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 flex-shrink-0" />
                    <span className="text-base sm:text-lg break-words">
                      {property.location.area}, {property.location.city}
                    </span>
                  </div>
                </div>
                <div className="lg:text-right shrink-0">
                  <p className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">
                    {formatPrice(property.price)}
                  </p>
                  {property.maintenanceFee && property.maintenanceFee > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Mantenimiento: {formatPrice(property.maintenanceFee)}/mes
                    </p>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button 
                  className="gap-3 flex-1 sm:flex-none shadow-lg hover:shadow-xl transition-all duration-300" 
                  size="lg" 
                  asChild
                >
                  <a href={`tel:${property.agent.phone}`}>
                    <Phone className="h-5 w-5" />
                    <span className="hidden sm:inline">Llamar al agente</span>
                    <span className="sm:hidden">Llamar</span>
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="gap-3 flex-1 sm:flex-none shadow-lg hover:shadow-xl transition-all duration-300" 
                  size="lg" 
                  asChild
                >
                  <a href={`mailto:${property.agent.email}`}>
                    <Mail className="h-5 w-5" />
                    <span className="hidden sm:inline">Enviar email</span>
                    <span className="sm:hidden">Email</span>
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="gap-3 flex-1 sm:flex-none shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                  onClick={() => {
                    const contactForm = document.getElementById("contact-form");
                    contactForm?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="hidden sm:inline">Agendar visita</span>
                  <span className="sm:hidden">Agendar</span>
                </Button>
              </div>

              {/* Key Features Grid */}
              <div className="mt-12 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {property.features.bedrooms !== null &&
                  property.features.bedrooms !== 0 && (
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <BedDouble className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium truncate">
                          {property.features.bedrooms}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.features.bedrooms === 1
                            ? "Recámara"
                            : "Recámaras"}
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.bathrooms !== null &&
                  property.features.bathrooms !== 0 && (
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Bath className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium truncate">
                          {property.features.bathrooms}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.features.bathrooms === 1 ? "Baño" : "Baños"}
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.constructionSize !== null &&
                  property.features.constructionSize !== 0 && (
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Ruler className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium truncate">
                          {property.features.constructionSize}m²
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          Construcción
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.lotSize !== null &&
                  property.features.lotSize !== 0 && (
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Trees className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium truncate">
                          {property.features.lotSize}m²
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          Terreno
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.parking !== null &&
                  property.features.parking !== 0 && (
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Car className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium truncate">
                          {property.features.parking}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.features.parking === 1
                            ? "Estacionamiento"
                            : "Estacionamientos"}
                        </p>
                      </div>
                    </div>
                  )}
                {property.features.floors !== null &&
                  property.features.floors !== 0 && (
                    <div className="flex items-center gap-4 rounded-xl border p-4 bg-background/80 backdrop-blur-sm hover:bg-background transition-colors duration-300">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-medium truncate">
                          {property.features.floors}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {property.features.floors === 1 ? "Piso" : "Pisos"}
                        </p>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-8 items-start lg:grid-cols-3">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Details */}
                <div className="rounded-xl bg-background p-6 sm:p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-6 tracking-tight">
                    Detalles principales
                  </h2>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Home className="h-5 w-5" />
                      </div>
                      <span className="text-base">Tipo: {property.propertyType}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <span className="text-base">
                        Antigüedad:{" "}
                        {property.propertyAge === 0
                          ? "Nueva"
                          : `${property.propertyAge} años`}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <span className="text-base">
                        Publicado:{" "}
                        {format(
                          new Date(property.createdAt),
                          "d 'de' MMMM, yyyy",
                          { locale: es }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Check className="h-5 w-5" />
                      </div>
                      <span className="text-base">Estado: {property.status}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="rounded-xl bg-background p-6 sm:p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-6 tracking-tight">Descripción</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="whitespace-pre-line leading-relaxed">
                      {property.description}
                    </p>
                  </div>
                </div>

                {/* Amenities */}
                {property.amenities.length > 0 && (
                  <div className="rounded-xl bg-background p-6 sm:p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-8 tracking-tight">Amenidades</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {property.amenities.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                            <Check className="h-5 w-5" />
                          </div>
                          <span className="text-base">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                {property.location.coordinates && (
                  <div className="rounded-xl bg-background p-6 sm:p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-6 tracking-tight">Ubicación</h2>
                    <div className="h-[400px] overflow-hidden rounded-xl shadow-sm">
                      <PropertyMap property={property} />
                    </div>
                    <div className="mt-6 flex items-center gap-3 text-muted-foreground">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-base">
                        {property.location.address}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:sticky lg:top-24 space-y-8">
                {/* Agent Card */}
                <div className="transform transition-all hover:scale-[1.02] duration-300">
                  <AgentCard {...property.agent} />
                </div>

                {/* Contact Form */}
                <div
                  id="contact-form"
                  className="rounded-xl bg-background p-6 sm:p-8 shadow-lg ring-1 ring-gray-900/5 transform transition-all hover:scale-[1.02] duration-300"
                >
                  <div className="mb-8 space-y-3">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      ¿Te interesa esta propiedad?
                    </h2>
                    <p className="text-base text-muted-foreground">
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
              <section className="rounded-xl bg-background p-6 sm:p-8 shadow-lg ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-8 tracking-tight">
                  Propiedades similares
                </h2>
                <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {similarProperties.map((similarProperty) => (
                    <div
                      key={similarProperty.id}
                      className="transform transition-all hover:scale-[1.02] duration-300"
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
        <DialogContent className="max-w-7xl w-full p-0 sm:p-8 mx-auto bg-background/95 backdrop-blur-sm">
          <div className="relative aspect-video bg-background/80 rounded-xl overflow-hidden">
            <div className="absolute inset-0">
              <PropertyImage
                src={property.images[selectedImageIndex]}
                alt={property.title}
                fill
                className="object-contain transition-opacity duration-500"
                priority={false}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent pointer-events-none" />
            <Button
              variant="outline"
              size="icon"
              className="absolute left-6 top-[50%] -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all shadow-lg z-10 h-12 w-12"
              onClick={() =>
                setSelectedImageIndex((i) =>
                  i === 0 ? property.images.length - 1 : i - 1
                )
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-6 top-[50%] -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all shadow-lg z-10 h-12 w-12"
              onClick={() =>
                setSelectedImageIndex((i) =>
                  i === property.images.length - 1 ? 0 : i + 1
                )
              }
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          <div className="mt-8 px-4 sm:px-0 w-full max-w-full">
            <ScrollArea className="w-full">
              <div className="flex gap-4 pb-4 px-[1px]">
                {property.images.map((image, index) => (
                  <button
                    key={image}
                    className={cn(
                      "group relative flex-none aspect-[4/3] w-24 sm:w-32 overflow-hidden rounded-xl transition-all duration-300",
                      "hover:ring-4 hover:ring-primary/60",
                      "shadow-lg hover:shadow-xl",
                      selectedImageIndex === index && "ring-4 ring-primary"
                    )}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <div className="relative w-full h-full">
                      <PropertyImage
                        src={image}
                        alt={`${property.title} - Imagen ${index + 1}`}
                        fill
                        className="object-cover transition-transform group-hover:scale-105 duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
