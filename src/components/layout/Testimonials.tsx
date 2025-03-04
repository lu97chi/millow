'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Quote, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Alejandra Méndez',
    role: 'Propietaria',
    image: '/images/testimonial-1.jpg',
    content: 'La inteligencia artificial me ayudó a encontrar exactamente lo que buscaba. El sistema entendió mis necesidades mejor que yo misma. Mi nuevo hogar es un sueño hecho realidad.',
    rating: 5,
    aiMatch: 98,
  },
  {
    id: 2,
    name: 'Carlos Fuentes',
    role: 'Inversionista',
    image: '/images/testimonial-2.jpg',
    content: 'La seguridad y precisión con la que la IA seleccionó propiedades para mi cartera de inversión fue impresionante. He incrementado mi retorno de inversión en un 32%.',
    rating: 5,
    aiMatch: 95,
  },
  {
    id: 3,
    name: 'Sofía Ramírez',
    role: 'Primera Compra',
    image: '/images/testimonial-3.jpg',
    content: 'Como primeriza en la compra de vivienda, me sentía perdida. La IA me guió paso a paso y me dio la confianza para tomar la mejor decisión. El proceso fue seguro y transparente.',
    rating: 5,
    aiMatch: 97,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl opacity-50"></div>
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
              <span className="text-sm font-medium text-accent">Experiencias Transformadas</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-shadow">
            Lo Que Dicen <span className="text-gradient">Nuestros Clientes</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-base">
            Descubre cómo nuestra tecnología de IA ha ayudado a miles de personas a encontrar su hogar ideal con seguridad y confianza.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-2xl p-8 md:p-12 border border-border/40 soft-shadow illusion-card"
              >
                <div className="absolute -top-6 -left-6 text-accent opacity-20">
                  <Quote size={64} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1">
                    <div className="relative aspect-square w-32 h-32 mx-auto md:w-full md:h-auto md:aspect-[3/4] rounded-xl overflow-hidden soft-shadow">
                      <Image 
                        src={activeTestimonial.image} 
                        alt={activeTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={18} 
                          className={i < activeTestimonial.rating ? "text-accent fill-accent" : "text-foreground/20"} 
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-foreground/90 text-lg md:text-xl font-display italic mb-6">
                      "{activeTestimonial.content}"
                    </blockquote>
                    
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-medium text-foreground">{activeTestimonial.name}</div>
                        <div className="text-foreground/60 text-sm">{activeTestimonial.role}</div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex items-center bg-secondary/50 rounded-md p-2 safety-border">
                        <div className="flex items-center mr-3">
                          <Sparkles size={14} className="text-accent mr-1" />
                          <span className="text-xs font-medium">Coincidencia IA</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-accent font-bold">{activeTestimonial.aiMatch}%</span>
                          <div className="ml-2 w-16 h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent" 
                              style={{ width: `${activeTestimonial.aiMatch}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full mx-1 transition-all duration-300 ${
                    index === activeIndex ? 'bg-accent scale-125' : 'bg-foreground/20 hover:bg-foreground/40'
                  }`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center mt-16"
        >
          <Shield size={18} className="text-primary mr-2" />
          <span className="text-foreground/70 text-sm">Todas las experiencias han sido verificadas para garantizar su autenticidad</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 