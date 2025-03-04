'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// Sample data for featured properties
const featuredProperties = [
  {
    id: 1,
    title: 'Residencia Palmera',
    location: 'Polanco, CDMX',
    price: '$4,500,000',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: '/images/property-1.jpg',
    aiMatch: 98,
  },
  {
    id: 2,
    title: 'Ático Exclusivo',
    location: 'Condesa, CDMX',
    price: '$3,200,000',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1950,
    image: '/images/property-2.jpg',
    aiMatch: 95,
  },
  {
    id: 3,
    title: 'Villa Moderna',
    location: 'San Ángel, CDMX',
    price: '$5,800,000',
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3600,
    image: '/images/property-3.jpg',
    aiMatch: 92,
  },
];

const PropertyCard = ({ property }: { property: typeof featuredProperties[0] }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: property.id * 0.1 }}
      className="group overflow-hidden bg-background border border-border/40 rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all duration-300 illusion-card soft-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow-md hover:bg-accent/10 transition-colors z-10 ai-glow flex items-center justify-center"
        >
          <Heart
            size={18}
            className={`${
              isFavorite ? 'fill-accent text-accent' : 'text-foreground/70'
            } transition-colors`}
          />
        </button>
        <div className="absolute bottom-4 left-4 bg-accent/90 text-white text-xs font-medium px-3 py-1 rounded-full flex items-center">
          <Sparkles size={12} className="mr-1" />
          Destacado
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display text-lg font-medium text-foreground line-clamp-1">
            {property.title}
          </h3>
          <span className="text-accent font-medium">{property.price}</span>
        </div>
        
        <div className="flex items-center text-foreground/60 text-sm mb-4">
          <span className="inline-block w-4 h-4 mr-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          {property.location}
        </div>
        
        <div className="grid grid-cols-3 gap-2 py-4 border-t border-border/40">
          <div className="flex flex-col items-center">
            <span className="text-foreground/60 text-xs mb-1">Habitaciones</span>
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-foreground/60 text-xs mb-1">Baños</span>
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-foreground/60 text-xs mb-1">Área</span>
            <span className="font-medium">{property.sqft} m²</span>
          </div>
        </div>
        
        <div className="mt-4 mb-4 flex items-center justify-between bg-secondary/50 rounded-md p-2 safety-border">
          <div className="flex items-center">
            <Sparkles size={14} className="text-accent mr-1" />
            <span className="text-xs font-medium">Coincidencia IA</span>
          </div>
          <div className="flex items-center">
            <span className="text-accent font-bold">{property.aiMatch}%</span>
            <div className="ml-2 w-16 h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent" 
                style={{ width: `${property.aiMatch}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <Link 
          href={`/properties/${property.id}`}
          className="block w-full text-center py-3 border border-accent text-accent hover:bg-accent hover:text-white transition-colors duration-300 rounded-md font-medium text-sm btn-dream"
        >
          Ver Detalles
        </Link>
      </div>
    </motion.div>
  );
};

const FeaturedProperties = () => {
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
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
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