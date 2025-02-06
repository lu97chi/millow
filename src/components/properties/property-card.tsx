"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Heart, Share, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import type { Property } from "@/constants/properties";
import { useMapStore } from "./property-map";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const {
    id,
    title,
    description,
    price,
    location,
    features,
    images,
    propertyAge,
    maintenanceFee,
    createdAt,
  } = property;

  const setFocusedProperty = useMapStore((state) => state.setFocusedProperty);

  const handleLocateInMap = () => {
    if (location.coordinates) {
      setFocusedProperty(id);
      // Scroll to map if it's out of view
      const mapElement = document.querySelector('[data-map-container]');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <Card className="group overflow-hidden">
      <CardHeader className="p-0">
        <Link href={`/properties/${id}`} className="relative block aspect-[4/3]">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <Badge variant="secondary" className="mb-2">
                {propertyAge === 0 ? "Nueva" : `${propertyAge} años`}
              </Badge>
              <h3 className="text-lg font-semibold text-white line-clamp-1">{title}</h3>
              <p className="text-sm text-white/90 line-clamp-1">
                {location.area}, {location.city}
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="secondary">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="grid gap-2 p-4">
        <div className="flex items-baseline justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold">{formatPrice(price)}</p>
            {maintenanceFee && (
              <p className="text-sm text-muted-foreground">
                Mantenimiento: {formatPrice(maintenanceFee)}/mes
              </p>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(createdAt), "d MMM", { locale: es })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {features.bedrooms && (
            <Badge variant="outline">
              {features.bedrooms} {features.bedrooms === 1 ? "Recámara" : "Recámaras"}
            </Badge>
          )}
          {features.bathrooms && (
            <Badge variant="outline">
              {features.bathrooms} {features.bathrooms === 1 ? "Baño" : "Baños"}
            </Badge>
          )}
          {features.constructionSize && (
            <Badge variant="outline">{features.constructionSize}m² construcción</Badge>
          )}
          {features.lotSize && (
            <Badge variant="outline">{features.lotSize}m² terreno</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 p-4 pt-0">
        <Button 
          variant="outline"
          className="gap-2"
          onClick={handleLocateInMap}
          disabled={!location.coordinates}
        >
          <MapPin className="h-4 w-4" />
          Ver en mapa
        </Button>
        <Button asChild>
          <Link href={`/properties/${id}`}>Ver detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
} 