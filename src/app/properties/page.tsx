import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Sparkles, Building, Home } from 'lucide-react';
import { Metadata } from 'next';

// Dynamic imports with loading fallbacks
const PropertiesContent = dynamic(() => import('@/components/sections/PropertiesContent'), { 
  ssr: true,
  loading: () => (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
        <p className="text-foreground/70 text-sm">Cargando propiedades...</p>
      </div>
    </div>
  )
});

export const metadata: Metadata = {
  title: 'Propiedades | Millow',
  description: 'Explora nuestra selección de propiedades seleccionadas por IA. Encuentra tu hogar ideal con seguridad y confianza en Millow.',
  keywords: ['propiedades', 'bienes raíces', 'casas', 'apartamentos', 'IA inmobiliaria', 'seguridad', 'Millow'],
};

export default function PropertiesPage() {
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
        
        {/* Floating icons */}
        <div className="absolute top-[15%] right-[10%] opacity-10">
          <Home className="w-24 h-24 text-primary" />
        </div>
        <div className="absolute bottom-[20%] left-[5%] opacity-10">
          <Building className="w-32 h-32 text-accent" />
        </div>
        
        {/* Sparkles */}
        <div className="absolute top-[30%] left-[15%] opacity-20">
          <Sparkles className="w-8 h-8 text-accent" />
        </div>
        <div className="absolute bottom-[40%] right-[20%] opacity-20">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
      </div>
      
      <Suspense fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
              <Sparkles className="w-4 h-4 text-accent absolute -top-1 -right-1 animate-pulse" />
            </div>
            <p className="text-foreground/70 text-sm">Cargando propiedades...</p>
          </div>
        </div>
      }>
        <PropertiesContent />
      </Suspense>
    </main>
  );
} 