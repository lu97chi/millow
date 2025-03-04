'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <div className="flex items-center bg-accent/10 px-4 py-2 rounded-full safety-border">
                <Sparkles size={16} className="text-accent mr-2" />
                <span className="text-sm font-medium text-accent">Tecnología IA Inmobiliaria</span>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 text-shadow">
              Materializa Tu <span className="text-gradient">Sueño Inmobiliario</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Nuestra inteligencia artificial entiende tus necesidades y te conecta con propiedades que transformarán tu vida, con total seguridad y confianza.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link 
              href="/properties" 
              className="w-full sm:w-auto px-8 py-4 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors shadow-md hover:shadow-lg font-medium flex items-center justify-center ai-glow"
            >
              Explorar Propiedades
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-8 py-4 border border-accent text-accent bg-transparent rounded-md hover:bg-accent/10 transition-colors font-medium flex items-center justify-center btn-dream"
            >
              Contactar Asesor
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-background p-6 rounded-xl border border-border/40 hover:border-accent/20 transition-all duration-300 soft-shadow hover:shadow-luxury-hover illusion-card">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-secondary/50 rounded-lg safety-border">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Personalización IA</h3>
              <p className="text-foreground/70 text-sm">Nuestra IA aprende de tus preferencias para ofrecerte propiedades que realmente se ajustan a tu estilo de vida.</p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border/40 hover:border-accent/20 transition-all duration-300 soft-shadow hover:shadow-luxury-hover illusion-card">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-secondary/50 rounded-lg safety-border">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Seguridad Total</h3>
              <p className="text-foreground/70 text-sm">Todas las transacciones y propiedades están verificadas y protegidas por nuestro sistema de seguridad avanzado.</p>
            </div>
            
            <div className="bg-background p-6 rounded-xl border border-border/40 hover:border-accent/20 transition-all duration-300 soft-shadow hover:shadow-luxury-hover illusion-card">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-secondary/50 rounded-lg safety-border">
                  <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">Sueños Realizables</h3>
              <p className="text-foreground/70 text-sm">Convertimos tus sueños inmobiliarios en realidad con opciones de financiamiento personalizadas y asesoría experta.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center mt-12"
          >
            <Shield size={18} className="text-primary mr-2" />
            <span className="text-foreground/70 text-sm">Todas nuestras transacciones están verificadas para tu seguridad</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 