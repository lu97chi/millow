import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Globe, Clock, Zap, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animación para los elementos
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <footer className="relative bg-midnight-900 text-silver-300 overflow-hidden">
      {/* Partículas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl"></div>
        
        {/* Líneas de grid futuristas */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
        
        {/* Elementos decorativos */}
        <motion.div 
          className="absolute top-20 left-10 w-2 h-2 bg-primary-500 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-3 h-3 bg-secondary-400 rounded-full"
          animate={{ 
            scale: [1, 1.8, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <motion.div 
            className="md:col-span-4 space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUpVariants}
          >
            <Link href="/" className="inline-block group">
              <span className="font-heading text-3xl font-bold text-silver-100 relative">
                Tu<span className="text-primary-500 text-glow">Hogar</span>
                <span className="absolute -inset-1 rounded-full bg-primary-500/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              </span>
            </Link>
            <p className="text-silver-400 max-w-xs">
              Encontrando tu hogar perfecto con un enfoque moderno y sofisticado en bienes raíces. Hacemos que el camino hacia tu hogar soñado sea simple y agradable.
            </p>
            
            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="text-silver-100 font-semibold mb-3 flex items-center">
                <Zap size={16} className="mr-2 text-primary-400" />
                Suscríbete a nuestro boletín
              </h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Tu correo" 
                  className="bg-midnight-800 border border-midnight-700 rounded-l-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-primary-500 text-silver-200 transition-all duration-300 focus:bg-midnight-700"
                />
                <motion.button 
                  className="bg-primary-500 hover:bg-primary-600 text-silver-100 px-4 rounded-r-lg flex items-center glow-effect relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <Send size={18} className="relative z-10" />
                  <span className="absolute -inset-px bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></span>
                </motion.button>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4 pt-2">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Globe, label: 'Sitio web' }
              ].map((social, index) => (
                <motion.a 
                  key={social.label}
                  href="#" 
                  className="bg-midnight-800 p-2.5 rounded-full hover:bg-primary-500/20 transition-colors relative group" 
                  aria-label={social.label}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <social.icon size={18} className="text-primary-400 group-hover:text-secondary-400 transition-colors" />
                  <span className="absolute -inset-0.5 rounded-full border border-primary-500/0 group-hover:border-primary-500/30 transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeInUpVariants}
          >
            <h3 className="font-bold text-silver-100 text-lg mb-4 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary-500/50"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Propiedades', href: '/properties' },
                { name: 'Nosotros', href: '/about' },
                { name: 'Contacto', href: '/contact' },
                { name: 'Blog', href: '/blog' }
              ].map((link, index) => (
                <motion.li key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                >
                  <Link href={link.href} className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center group">
                    <span className="relative overflow-hidden flex items-center">
                      <ArrowRight size={14} className="mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeInUpVariants}
          >
            <h3 className="font-bold text-silver-100 text-lg mb-4 relative inline-block">
              Servicios
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary-500/50"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Comprar', href: '/buying' },
                { name: 'Vender', href: '/selling' },
                { name: 'Rentar', href: '/renting' },
                { name: 'Hipoteca', href: '/mortgage' }
              ].map((service, index) => (
                <motion.li key={service.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                >
                  <Link href={service.href} className="text-silver-400 hover:text-secondary-400 transition-colors inline-flex items-center group">
                    <span className="relative overflow-hidden flex items-center">
                      <ArrowRight size={14} className="mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform" />
                      <span className="group-hover:translate-x-1 transition-transform">{service.name}</span>
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            className="md:col-span-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeInUpVariants}
          >
            <h3 className="font-bold text-silver-100 text-lg mb-4 relative inline-block">
              Contáctanos
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary-500/50"></span>
            </h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-midnight-800 p-2 rounded-lg mr-3 mt-0.5 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <MapPin size={18} className="text-primary-500" />
                </div>
                <span className="text-silver-400">Calle Hogar 123, Ciudad, País</span>
              </motion.li>
              <motion.li 
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-midnight-800 p-2 rounded-lg mr-3 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <Phone size={18} className="text-primary-500" />
                </div>
                <span className="text-silver-400">+52 (55) 1234-5678</span>
              </motion.li>
              <motion.li 
                className="flex items-center group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-midnight-800 p-2 rounded-lg mr-3 flex-shrink-0 group-hover:bg-primary-500/20 transition-colors">
                  <Mail size={18} className="text-primary-500" />
                </div>
                <span className="text-silver-400">info@tuhogar.com</span>
              </motion.li>
            </ul>
            
            {/* Working Hours */}
            <div className="mt-6">
              <h4 className="font-semibold text-silver-100 mb-3 flex items-center">
                <Clock size={16} className="mr-2 text-primary-400" />
                Horario de Atención
              </h4>
              <div className="bg-midnight-800/50 rounded-xl p-3 border border-midnight-700">
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-silver-400">Lunes - Viernes:</span>
                  <span className="text-silver-300 font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-t border-midnight-700">
                  <span className="text-silver-400">Sábado:</span>
                  <span className="text-silver-300 font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-t border-midnight-700">
                  <span className="text-silver-400">Domingo:</span>
                  <span className="text-silver-300 font-medium">Cerrado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="border-t border-midnight-800 relative z-10">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-silver-500 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              © {currentYear} TuHogar. Todos los derechos reservados.
            </motion.p>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
              {[
                { name: 'Política de Privacidad', href: '/privacy' },
                { name: 'Términos de Servicio', href: '/terms' },
                { name: 'Política de Cookies', href: '/cookies' }
              ].map((policy, index) => (
                <motion.div
                  key={policy.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                >
                  <Link href={policy.href} className="text-silver-500 hover:text-primary-400 text-sm transition-colors">
                    {policy.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Línea de luz en la parte inferior */}
      <div className="h-0.5 w-full bg-gradient-to-r from-midnight-900 via-primary-500/30 to-midnight-900"></div>
    </footer>
  );
};

export default Footer; 