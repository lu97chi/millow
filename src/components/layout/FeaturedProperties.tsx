'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';

// Sample property data
const properties = [
  {
    id: 1,
    title: 'Apartamento Moderno con Vista a la Ciudad',
    location: 'Centro, Ciudad',
    price: '$350,000',
    bedrooms: 2,
    bathrooms: 2,
    area: '110 m²',
    image: '/images/property-1.jpg',
    featured: true,
    type: 'En Venta'
  },
  {
    id: 2,
    title: 'Acogedora Casa Familiar con Jardín',
    location: 'Suburbio, Ciudad',
    price: '$450,000',
    bedrooms: 3,
    bathrooms: 2,
    area: '165 m²',
    image: '/images/property-2.jpg',
    featured: true,
    type: 'En Venta'
  },
  {
    id: 3,
    title: 'Penthouse de Lujo con Terraza',
    location: 'Distrito Central, Ciudad',
    price: '$1,200,000',
    bedrooms: 4,
    bathrooms: 3,
    area: '230 m²',
    image: '/images/property-3.jpg',
    featured: true,
    type: 'En Venta'
  },
  {
    id: 4,
    title: 'Encantador Estudio en Edificio Histórico',
    location: 'Casco Antiguo, Ciudad',
    price: '$15,000/mes',
    bedrooms: 1,
    bathrooms: 1,
    area: '60 m²',
    image: '/images/property-4.jpg',
    featured: true,
    type: 'En Renta'
  }
];

const PropertyCard = ({ property }: { property: typeof properties[0] }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="property-card bg-white rounded-2xl overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Property Image */}
      <div className="relative h-64 w-full">
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {property.type}
          </span>
        </div>
        <button 
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full transition-colors shadow-md"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          aria-label={isLiked ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart 
            size={18} 
            className={isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
          />
        </button>
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Property Details */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-500">
              <MapPin size={16} className="mr-1 flex-shrink-0 text-primary" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>
          <p className="text-primary font-bold text-xl">{property.price}</p>
        </div>

        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between">
            <div className="flex items-center text-gray-700">
              <Bed size={18} className="mr-1 text-gray-500" />
              <span className="text-sm font-medium">{property.bedrooms} Hab</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Bath size={18} className="mr-1 text-gray-500" />
              <span className="text-sm font-medium">{property.bathrooms} Baños</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Square size={18} className="mr-1 text-gray-500" />
              <span className="text-sm font-medium">{property.area}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProperties = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            className="inline-block text-primary font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            PROPIEDADES EXCLUSIVAS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Propiedades <span className="text-primary">Destacadas</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Descubre nuestra selección de propiedades que podrían ser tu próximo hogar perfecto
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <Link href={`/properties/${property.id}`} key={property.id} className="block">
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/properties" 
            className="inline-block px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white font-medium rounded-full transition-colors"
          >
            Ver Todas las Propiedades
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 