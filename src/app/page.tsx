"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Search, MapPin, Building2, ArrowRight, Bot, Shield, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchCommand } from "@/components/layout/search-command";
import { SAMPLE_PROPERTIES, PROPERTY_TYPES } from "@/constants/properties";
import { formatPrice } from "@/lib/format";
import { useState, useRef } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  
  const featuredProperties = SAMPLE_PROPERTIES
    .filter(p => p.price > 5000000)
    .slice(0, 3);

  // Calculate total properties value
  const totalValue = SAMPLE_PROPERTIES.reduce((sum, prop) => sum + prop.price, 0);
  const averagePrice = totalValue / SAMPLE_PROPERTIES.length;

  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced with parallax effect */}
      <section className="relative h-[85vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80"
            alt="Luxury home"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/30" />
        </motion.div>
        <div className="container relative flex h-full flex-col justify-center">
          <motion.div 
            className="max-w-2xl space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 animate-pulse">Powered by AI</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Encuentra tu hogar ideal en México
            </h1>
            <p className="text-lg text-muted-foreground">
              Descubre las mejores propiedades con nuestra plataforma inteligente que entiende exactamente lo que buscas.
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 group relative overflow-hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <div className="absolute inset-0 bg-primary-foreground opacity-0 group-hover:opacity-10 transition-opacity" />
                <Search className="h-4 w-4" />
                Comenzar búsqueda
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 group"
                asChild
              >
                <Link href="/properties">
                  Ver propiedades
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container py-12">
          <motion.div 
            ref={statsRef}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="initial"
            animate={isStatsInView ? "animate" : "initial"}
          >
            {[
              {
                label: "Propiedades",
                value: SAMPLE_PROPERTIES.length,
                suffix: "+"
              },
              {
                label: "Valor total",
                value: formatPrice(totalValue),
                prefix: "$"
              },
              {
                label: "Precio promedio",
                value: formatPrice(averagePrice),
                prefix: "$"
              },
              {
                label: "Ciudades",
                value: "8",
                suffix: "+"
              }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="relative text-center"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg blur opacity-50" />
                <div className="relative space-y-1 rounded-lg border bg-background p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold tracking-tight">
                    {stat.prefix}{stat.value}{stat.suffix}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Property Types Grid */}
      <section className="container py-20">
        <motion.div 
          className="text-center space-y-4 mb-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl">Explora por tipo de propiedad</h2>
          <p className="text-muted-foreground">
            Encuentra la propiedad perfecta para tu estilo de vida
          </p>
        </motion.div>
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {PROPERTY_TYPES.slice(0, 4).map((type) => (
            <motion.div
              key={type.value}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-xl bg-muted"
            >
              <Link 
                href={`/properties?type=${type.value}`}
                className="flex flex-col items-center gap-4 p-6"
              >
                <div className="rounded-full bg-background p-4 ring-1 ring-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <type.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.count} propiedades</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Featured Properties */}
      <section className="border-t bg-muted/30">
        <div className="container py-20">
          <motion.div 
            className="text-center space-y-4 mb-12"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl">Propiedades destacadas</h2>
            <p className="text-muted-foreground">
              Las mejores propiedades seleccionadas para ti
            </p>
          </motion.div>
          <motion.div 
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={fadeInUp}
                className="group relative"
              >
                <Link 
                  href={`/properties/${property.id}`}
                  className="block overflow-hidden rounded-xl bg-background shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-white line-clamp-1">
                        {property.title}
                      </h3>
                      <p className="text-sm text-white/90">
                        {property.location.area}, {property.location.state}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-baseline justify-between">
                      <p className="text-lg font-semibold">
                        {formatPrice(property.price)}
                      </p>
                      <Badge variant="secondary">
                        {property.type}
                      </Badge>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                      {property.features.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          <span>{property.features.bedrooms} recámaras</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{property.location.area}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/properties">
                Ver todas las propiedades
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <motion.div 
          className="text-center space-y-4 mb-12"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl">¿Por qué elegir Millow?</h2>
          <p className="text-muted-foreground">
            La plataforma más inteligente para encontrar tu próxima propiedad
          </p>
        </motion.div>
        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Bot,
              title: "Búsqueda Inteligente",
              description: "Nuestro asistente AI entiende tus necesidades y te muestra las propiedades más relevantes."
            },
            {
              icon: Shield,
              title: "Propiedades Verificadas",
              description: "Todas nuestras propiedades son verificadas para garantizar la mejor calidad y seguridad."
            },
            {
              icon: Home,
              title: "Amplio Catálogo",
              description: "Miles de propiedades en las mejores ubicaciones de México, actualizadas diariamente."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="rounded-xl border bg-background p-6 shadow-sm"
            >
              <div className="rounded-full bg-primary/10 p-3 w-fit">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Enhanced CTA Section with background pattern */}
      <section className="border-t">
        <div className="container py-20">
          <motion.div 
            className="relative rounded-2xl bg-primary px-6 py-12 md:p-16 text-primary-foreground text-center overflow-hidden"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-10" />
            <div className="relative">
              <h2 className="font-heading text-3xl md:text-4xl mb-4">
                Encuentra tu próxima propiedad hoy
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Únete a miles de personas que ya encontraron su hogar ideal a través de nuestra plataforma
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2 group"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                Comenzar búsqueda
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Command */}
      <SearchCommand 
        open={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
}
