'use client';

import { Shield, Sparkles, Brain, Clock, Search, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Define features with icons
const features = [
  {
    icon: <Brain className="w-6 h-6 text-accent" />,
    title: "IA Predictiva",
    description: "Nuestro algoritmo de IA analiza miles de propiedades para encontrar la que mejor se adapta a tus necesidades y preferencias."
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Seguridad Garantizada",
    description: "Todas las propiedades son verificadas y las transacciones están protegidas por nuestro sistema de seguridad avanzado."
  },
  {
    icon: <Search className="w-6 h-6 text-accent" />,
    title: "Búsqueda Personalizada",
    description: "Nuestra IA aprende de tus preferencias para ofrecerte resultados cada vez más precisos y personalizados."
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Ahorro de Tiempo",
    description: "Encuentra tu propiedad ideal en minutos, no en semanas, gracias a nuestra tecnología de coincidencia inteligente."
  },
  {
    icon: <Sparkles className="w-6 h-6 text-accent" />,
    title: "Experiencia Inmersiva",
    description: "Visitas virtuales en 3D y realidad aumentada para explorar cada propiedad desde la comodidad de tu hogar."
  },
  {
    icon: <Home className="w-6 h-6 text-primary" />,
    title: "Sueños Realizables",
    description: "Convertimos tus sueños inmobiliarios en realidad con opciones de financiamiento personalizadas y asesoría experta."
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
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
              <span className="text-sm font-medium text-accent">Tecnología Avanzada</span>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-shadow">
            ¿Por Qué <span className="text-gradient">Elegirnos</span>?
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-base">
            Combinamos la última tecnología en inteligencia artificial con expertos inmobiliarios para ofrecerte una experiencia única y segura en la búsqueda de tu hogar ideal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden soft-shadow illusion-card">
              <Image 
                src="/images/ai-analytics.jpg" 
                alt="Análisis de IA para propiedades" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center mb-2">
                  <Brain size={20} className="text-accent mr-2" />
                  <span className="text-white font-medium">IA Predictiva en Acción</span>
                </div>
                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-accent w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-background p-6 rounded-xl border border-border/40 hover:border-accent/20 transition-all duration-300 soft-shadow hover:shadow-luxury-hover illusion-card"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-secondary/50 rounded-lg safety-border">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-display text-lg font-medium text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
        >
          {features.slice(4).map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background p-6 rounded-xl border border-border/40 hover:border-accent/20 transition-all duration-300 soft-shadow hover:shadow-luxury-hover illusion-card"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-secondary/50 rounded-lg safety-border">
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-display text-lg font-medium text-foreground mb-2">{feature.title}</h3>
              <p className="text-foreground/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center mt-16"
        >
          <Shield size={18} className="text-primary mr-2" />
          <span className="text-foreground/70 text-sm">Todas nuestras tecnologías cumplen con los más altos estándares de seguridad y privacidad</span>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 