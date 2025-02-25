'use client';

import { Home, Search, Key, Heart, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Define animation variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary-400" />,
    title: 'Búsqueda Inteligente',
    description: 'Encuentra tu hogar ideal con nuestras potentes herramientas de búsqueda que se adaptan a tus preferencias.'
  },
  {
    icon: <Home className="h-8 w-8 text-primary-400" />,
    title: 'Propiedades Seleccionadas',
    description: 'Explora nuestra selección de propiedades de calidad que cumplen con nuestros altos estándares.'
  },
  {
    icon: <Key className="h-8 w-8 text-primary-400" />,
    title: 'Proceso Sencillo',
    description: 'Disfruta de un recorrido fluido desde la búsqueda de propiedades hasta obtener tus llaves con nuestro proceso optimizado.'
  },
  {
    icon: <Heart className="h-8 w-8 text-primary-400" />,
    title: 'Servicio Personalizado',
    description: 'Recibe recomendaciones adaptadas a tus preferencias y necesidades de nuestro equipo de expertos.'
  },
  {
    icon: <Shield className="h-8 w-8 text-primary-400" />,
    title: 'Transacciones Seguras',
    description: 'Siéntete seguro con nuestro proceso de transacción transparente y seguro que protege tus intereses.'
  },
  {
    icon: <Clock className="h-8 w-8 text-primary-400" />,
    title: 'Soporte 24/7',
    description: 'Nuestro equipo dedicado está siempre disponible para ayudarte cuando lo necesites durante todo tu recorrido.'
  }
];

const Features = () => {
  return (
    <section className="section-padding bg-midnight-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            className="inline-block text-secondary-400 font-medium mb-3 bg-primary-500/20 backdrop-blur-md px-4 py-1 rounded-full border border-primary-500/30"
            initial={fadeInUpVariant.hidden}
            whileInView={fadeInUpVariant.visible}
            viewport={{ once: true }}
          >
            NUESTRAS VENTAJAS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-silver-100 mb-6"
            initial={fadeInUpVariant.hidden}
            whileInView={fadeInUpVariant.visible}
            viewport={{ once: true }}
          >
            ¿Por Qué Elegir <span className="text-primary-500 text-glow relative">TuHogar<span className="absolute -inset-1 bg-primary-500/20 blur-xl rounded-full -z-10"></span></span>?
          </motion.h2>
          <motion.p 
            className="text-xl text-silver-300"
            initial={fadeInUpVariant.hidden}
            whileInView={fadeInUpVariant.visible}
            viewport={{ once: true }}
          >
            Hacemos que encontrar tu hogar perfecto sea una experiencia agradable con nuestro enfoque único en bienes raíces.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-midnight-800/70 backdrop-blur-md rounded-2xl p-8 border border-midnight-700 hover:border-primary-500/30 transition-all group"
              initial={fadeInUpVariant.hidden}
              whileInView={fadeInUpVariant.visible}
              viewport={{ once: true }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="mb-6 bg-primary-500/20 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-silver-100 mb-3">{feature.title}</h3>
              <p className="text-silver-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom light line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-midnight-900 via-primary-500/30 to-midnight-900 mt-16"></div>
    </section>
  );
};

export default Features; 