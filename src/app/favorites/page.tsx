"use client";

import { PropertyGrid } from "@/components/properties/property-grid";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="flex h-screen flex-col">
      <header className="flex-none h-16 border-b bg-background">
        <div className="container flex h-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Mis Favoritos</h1>
          <p className="text-sm text-muted-foreground">
            {favorites.length} {favorites.length === 1 ? 'propiedad favorita' : 'propiedades favoritas'}
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="container py-6">
          {favorites.length === 0 ? (
            <Alert>
              <Heart className="h-4 w-4" />
              <AlertTitle>No tienes favoritos</AlertTitle>
              <AlertDescription>
                Agrega propiedades a tus favoritos para verlas aquí.
              </AlertDescription>
            </Alert>
          ) : (
            <Suspense 
              fallback={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {Array(6).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-[400px] w-full" />
                  ))}
                </div>
              }
            >
              <PropertyGrid properties={favorites} />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
} 