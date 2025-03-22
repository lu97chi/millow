'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api-client';
import type { Property } from '@/types/properties';
import { PropertyCard } from '@/components/PropertyCard';

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        // Fetch featured properties with a limit of 3
        const response = await api.getProperties({
          sortBy: 'createdAt',
          sortOrder: 'desc'
        });
        // Take only the first 3 properties
        setProperties(response.properties.slice(0, 3));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Failed to load featured properties');
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  // Loading skeleton
  const PropertySkeleton = () => (
    <div className="bg-background border border-border/40 rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-muted/30"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="h-6 bg-muted/30 rounded w-2/3"></div>
          <div className="h-6 bg-muted/30 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-muted/30 rounded w-full mb-4"></div>
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-border/40">
          <div className="flex flex-col items-center">
            <div className="h-3 bg-muted/30 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-muted/30 rounded w-1/3"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 bg-muted/30 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-muted/30 rounded w-1/3"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-3 bg-muted/30 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-muted/30 rounded w-1/3"></div>
          </div>
        </div>
        <div className="mt-4 h-10 bg-muted/30 rounded w-full"></div>
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="flex items-center bg-accent/10 px-4 py-2 rounded-full safety-border">
              <Sparkles size={16} className="text-accent mr-2" />
              <span className="text-sm font-medium text-accent">Seleccionadas por IA</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-shadow">
            Propiedades <span className="text-gradient">Destacadas</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-base">
            Nuestra inteligencia artificial ha seleccionado estas propiedades exclusivas basándose en tus preferencias y las tendencias del mercado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Show skeletons while loading
            <>
              <PropertySkeleton />
              <PropertySkeleton />
              <PropertySkeleton />
            </>
          ) : error ? (
            // Show error message
            <div className="col-span-3 text-center py-10">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : properties.length === 0 ? (
            // Show message when no properties are found
            <div className="col-span-3 text-center py-10">
              <p className="text-foreground/70">No se encontraron propiedades destacadas.</p>
            </div>
          ) : (
            // Show actual properties
            properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="mb-8 flex items-center justify-center">
            <Shield size={18} className="text-primary mr-2" />
            <span className="text-foreground/70 text-sm">Todas nuestras propiedades están verificadas para tu seguridad</span>
          </div>
          
          <Link 
            href="/properties" 
            className="inline-flex items-center px-8 py-3 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg font-medium ai-glow"
          >
            Ver Todas las Propiedades
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 