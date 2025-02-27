import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api-client';
import type { Property } from '@/types/properties';

// Dynamic imports with loading fallbacks
const PropertyDetails = dynamic(() => import('@/components/sections/PropertyDetails'), {
  ssr: true,
  loading: () => <PropertyDetailsSkeleton />
});

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const property = await api.getProperty(params.id, true);
    
    return {
      title: `${property.title} | Millow`,
      description: property.description.substring(0, 160),
      keywords: [
        property.propertyType,
        property.operationType,
        'bienes raíces',
        'propiedades',
        'Millow',
        property.location.city,
        property.location.state
      ],
      openGraph: {
        title: property.title,
        description: property.description.substring(0, 160),
        images: property.images && property.images.length > 0 ? [property.images[0]] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Propiedad no encontrada | Millow',
      description: 'La propiedad que estás buscando no existe o ha sido removida.',
    };
  }
}

// Loading skeleton for property details
function PropertyDetailsSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="h-96 bg-muted/30 rounded-xl mb-8"></div>
      <div className="space-y-4 max-w-4xl mx-auto px-4">
        <div className="h-10 bg-muted/30 rounded-lg w-3/4"></div>
        <div className="h-6 bg-muted/30 rounded-lg w-1/2"></div>
        <div className="h-6 bg-muted/30 rounded-lg w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="h-24 bg-muted/30 rounded-lg"></div>
          <div className="h-24 bg-muted/30 rounded-lg"></div>
          <div className="h-24 bg-muted/30 rounded-lg"></div>
        </div>
        <div className="h-64 bg-muted/30 rounded-lg mt-8"></div>
      </div>
    </div>
  );
}

// Error component
function PropertyError() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Propiedad no encontrada
        </h2>
        <p className="text-foreground/70 mb-6">
          La propiedad que estás buscando no existe o ha sido removida.
        </p>
        <a 
          href="/properties" 
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
        >
          Ver todas las propiedades
        </a>
      </div>
    </div>
  );
}

// Main page component
export default async function PropertyPage({ params }: { params: { id: string } }) {
  let property: Property;
  
  try {
    property = await api.getProperty(params.id, true);
  } catch (error) {
    return <PropertyError />;
  }
  
  if (!property) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Gradient blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <Suspense fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
              <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
            <p className="text-foreground/70 text-sm">Cargando detalles de la propiedad...</p>
          </div>
        </div>
      }>
        <PropertyDetails property={property} />
      </Suspense>
    </main>
  );
} 