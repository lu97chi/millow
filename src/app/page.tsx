import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Home,
  Store,
  Briefcase,
  Building,
  HomeIcon,
  Warehouse,
  ShoppingBag,
  ArrowRight,
  TrendingUp,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PropertyService } from "@/server/services/property-service";
import { StatsService } from "@/server/services/stats-service";
import { PropertyCard } from "@/components/properties/property-card";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/server/models/property";
import { Input } from "@/components/ui/input";

export default async function HomePage() {
  const propertyService = PropertyService.getInstance();
  const statsService = StatsService.getInstance();
  
  const featuredProperties = await propertyService.getFeaturedProperties();
  const stats = await statsService.getHomePageStats();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          {/* Hero Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
              alt="Luxury home"
              fill
              className="object-cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/60 to-background" />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4">
            <div className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Tu próxima propiedad está{" "}
                <span className="text-primary">aquí</span>
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Descubre propiedades exclusivas en las mejores ubicaciones. 
                Más de {stats.totalProperties} propiedades disponibles en {stats.totalLocations} ubicaciones.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link href="/properties">
                    Explorar propiedades
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="h-12 px-8">
                  <Link href="/contact">Contactar un agente</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Estadísticas del Mercado
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Conoce las tendencias actuales del mercado inmobiliario
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card className="flex h-[180px] flex-col justify-between p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Precio Promedio</h3>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(stats.averagePricing)}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                Basado en {stats.totalProperties} propiedades
              </div>
            </Card>

            <Card className="flex h-[180px] flex-col justify-between p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Nuevos Desarrollos</h3>
                <p className="text-2xl font-bold text-primary">
                  {stats.newConstructions}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                Propiedades en pre-venta o construcción
              </div>
            </Card>

            <Card className="flex h-[180px] flex-col justify-between p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Ubicaciones Top</h3>
                <div className="flex flex-wrap gap-2">
                  {stats.topLocations.byVolume.slice(0, 3).map((location) => (
                    <Badge key={location.area} variant="secondary">
                      {location.area}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Por volumen de propiedades
              </div>
            </Card>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Propiedades Destacadas
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Explora nuestras propiedades más exclusivas
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            {featuredProperties.slice(0, 6).map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="flex justify-center">
            <Button asChild size="lg" className="h-12 px-8">
              <Link href="/properties">
                Ver todas las propiedades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Property Types Section */}
        <section className="container space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Tipos de Propiedades
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Encuentra la propiedad que mejor se adapte a tus necesidades
            </p>
          </div>

          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(stats.propertyTypeDistribution).map(([type, count]) => (
              <Link 
                key={type} 
                href={`/properties?propertyType=${type}`}
                className="group relative overflow-hidden rounded-lg border p-6 hover:border-primary"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full border p-3 group-hover:border-primary group-hover:text-primary">
                    {getPropertyTypeIcon(type)}
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold">{type}</h3>
                    <p className="text-sm text-muted-foreground">{count} propiedades</p>
                    {stats.averagePriceByType[type] > 0 && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Desde {formatCurrency(stats.averagePriceByType[type])}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Locations Section */}
        <section className="relative overflow-hidden border-t bg-muted/50 py-16 md:py-24">
          <div className="container relative space-y-8">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Zonas Destacadas
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Descubre los mejores vecindarios para vivir en México
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stats.topLocations.byVolume.slice(0, 6).map((location) => (
                <Link
                  key={location.area}
                  href={`/properties?area=${encodeURIComponent(location.area)}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <Image
                    src={`https://source.unsplash.com/featured/?luxury,property,${location.area.replace(' ', ',')}`}
                    alt={location.area}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-2xl font-bold text-white">{location.area}</h3>
                    <p className="mt-2 text-sm text-white/90">
                      {location.count} propiedades disponibles
                    </p>
                    <Badge variant="secondary" className="mt-4">
                      Zona Premium
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Market Insights Section */}
        <section className="container space-y-6 py-16 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Conoce el Mercado
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Información útil para encontrar tu hogar ideal
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Ubicaciones Top</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Las zonas más buscadas por precio promedio
                </p>
              </div>
              <div className="mt-6">
                <div className="space-y-2">
                  {stats.topLocations.byPrice.slice(0, 3).map((location) => (
                    <div key={location.area} className="flex items-center justify-between">
                      <span className="text-sm">{location.area}</span>
                      <Badge variant="secondary">
                        {formatCurrency(location.averagePrice)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="flex flex-col justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Tipos de Propiedad</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Distribución por tipo de propiedad
                </p>
              </div>
              <div className="mt-6 space-y-2">
                {Object.entries(stats.propertyTypeDistribution).slice(0, 4).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm">{type}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="flex flex-col justify-between p-6">
              <div>
                <h3 className="text-lg font-semibold">Rangos de Precio</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Distribución de propiedades por precio
                </p>
              </div>
              <div className="mt-6 space-y-2">
                {Object.entries(stats.priceRanges).slice(0, 4).map(([range, count]) => (
                  <div key={range} className="flex items-center justify-between">
                    <span className="text-sm">{range}</span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* Investment Opportunity Section -> Lifestyle Section */}
        <section className="border-t bg-muted/50 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Tu Estilo de Vida
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Encuentra el hogar perfecto que se adapte a tu forma de vivir
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="p-6">
                <MapPin className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Ubicaciones Ideales</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Propiedades cerca de todo lo que necesitas: escuelas, parques,
                  centros comerciales y más.
                </p>
              </Card>

              <Card className="p-6">
                <Building2 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Espacios Modernos</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Diseños contemporáneos que combinan comodidad y funcionalidad
                  para toda la familia.
                </p>
              </Card>

              <Card className="p-6">
                <TrendingUp className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">Para Cada Presupuesto</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Encuentra opciones que se ajusten a tus necesidades financieras,
                  con planes de financiamiento flexibles.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container py-24 border-t">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="font-heading text-3xl">No Te Pierdas Nada</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              Recibe las últimas propiedades y consejos para encontrar tu hogar ideal.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="flex-grow"
              />
              <Button>
                Suscribirse
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function getPropertyTypeIcon(type: string) {
  const icons = {
    "Desarrollos verticales": Building2,
    "Casas": Home,
    "Locales Comerciales": Store,
    "Oficinas": Briefcase,
    "Edificios": Building,
    "Casa uso de suelo": HomeIcon,
    "Bodegas Comerciales": Warehouse,
    "Locales en centro comercial": ShoppingBag,
    "Casas en condominio": Home,
  };

  const Icon = icons[type as keyof typeof icons] || Building;
  return <Icon className="h-6 w-6" />;
}
