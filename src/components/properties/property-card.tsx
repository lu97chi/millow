"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import type { PropertyCardProps } from "@/types";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { cn } from "@/lib/utils";
import { ShareButton } from "@/components/properties/share-button";
import { BedDouble, Bath, Ruler, Trees } from "lucide-react";

export function PropertyCard({ property, view = "grid" }: PropertyCardProps) {
  const {
    id,
    title,
    description,
    price,
    location,
    features,
    images,
    propertyAge,
    operationType,
    propertyType,
    createdAt,
  } = property;

  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isPropertyFavorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPropertyFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(property);
    }
  };

  if (view === "list") {
    return (
      <Card className="group overflow-hidden">
        <Link href={`/properties/${id}`} className="flex">
          {/* Image Section */}
          <div className="relative w-[240px] flex-none">
            <Image
              src={images[0]}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="240px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Badge
              variant="secondary"
              className="absolute left-2 top-2 px-2.5 py-0.5 text-xs font-medium"
            >
              {propertyAge === 0 ? "Nueva" : `${propertyAge} años`}
            </Badge>
          </div>

          {/* Content Section */}
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {operationType}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {propertyType}
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-muted/50">
                    {propertyAge === 0 ? "Nueva" : `${propertyAge} años`}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
                <p className="text-sm text-muted-foreground">
                  {location.area}, {location.city}
                </p>
              </div>
              <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "h-8 w-8 rounded-full",
                    isPropertyFavorite && "text-red-500 hover:text-red-600"
                  )}
                  onClick={handleFavoriteClick}
                >
                  <Heart
                    className={cn(
                      "h-5 w-5",
                      isPropertyFavorite && "fill-current"
                    )}
                  />
                </Button>
                <ShareButton
                  title={title}
                  url={
                    typeof window !== "undefined"
                      ? `${window.location.origin}/properties/${id}`
                      : ""
                  }
                />
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div className="space-y-1">
                <p className="text-2xl font-bold">{formatPrice(price)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {createdAt
                  ? format(new Date(createdAt), "d MMM", { locale: es })
                  : ""}
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              {features.bedrooms !== null && features.bedrooms !== 0 && (
                <Badge variant="outline">
                  {features.bedrooms}{" "}
                  {features.bedrooms === 1 ? "Recámara" : "Recámaras"}
                </Badge>
              )}
              {features.bathrooms !== null && features.bathrooms !== 0 && (
                <Badge variant="outline">
                  {features.bathrooms}{" "}
                  {features.bathrooms === 1 ? "Baño" : "Baños"}
                </Badge>
              )}
              {features.constructionSize !== null &&
                features.constructionSize !== 0 && (
                  <Badge variant="outline">
                    {features.constructionSize}m² construcción
                  </Badge>
                )}
              {features.lotSize !== null && features.lotSize !== 0 && (
                <Badge variant="outline">{features.lotSize}m² terreno</Badge>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-colors hover:border-primary/50"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          view === "grid"
            ? "aspect-[4/3]"
            : "md:w-[300px] aspect-[4/3] md:aspect-auto"
        )}
      >
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={
            view === "grid"
              ? "(min-width: 1280px) 400px, (min-width: 780px) 320px, 100vw"
              : "300px"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0" />
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute right-4 top-4 h-8 w-8 shrink-0 rounded-full bg-background/50 backdrop-blur-sm",
            isPropertyFavorite && "text-red-500 hover:text-red-600"
          )}
          onClick={handleFavoriteClick}
        >
          <Heart
            className={cn("h-4 w-4", isPropertyFavorite && "fill-current")}
          />
        </Button>
      </div>
      <CardContent
        className={cn(
          "relative flex-1",
          view === "grid" ? "-mt-12 p-4" : "p-6"
        )}
      >
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {operationType}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {propertyType}
          </Badge>
          <Badge variant="outline" className="text-xs bg-muted/50">
            {propertyAge === 0 ? "Nueva" : `${propertyAge} años`}
          </Badge>
        </div>
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold">
          <Link href={`/properties/${id}`}>{title}</Link>
        </h3>
        <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <div className="mt-auto space-y-4">
          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground sm:grid-cols-4">
            {features.bedrooms !== null && features.bedrooms !== 0 && (
              <div className="flex items-center gap-1">
                <BedDouble className="h-4 w-4" />
                <span>{features.bedrooms}</span>
              </div>
            )}
            {features.bathrooms !== null && features.bathrooms !== 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{features.bathrooms}</span>
              </div>
            )}
            {features.constructionSize !== null &&
              features.constructionSize !== 0 && (
                <div className="flex items-center gap-1">
                  <Ruler className="h-4 w-4" />
                  <span>{features.constructionSize}m²</span>
                </div>
              )}
            {features.lotSize !== null && features.lotSize !== 0 && (
              <div className="flex items-center gap-1">
                <Trees className="h-4 w-4" />
                <span>{features.lotSize}m²</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {location.area}, {location.city}
              </p>
              <p className="text-lg font-semibold">{formatPrice(price)}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/properties/${id}`}>Ver detalles</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
