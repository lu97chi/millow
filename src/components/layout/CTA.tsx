'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Phone, Sparkles, Zap, Send, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const CTA = () => {
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Comprar una propiedad'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Aquí iría la lógica para enviar los datos
  };

  const nextStep = () => {
    setFormStep(prev => prev + 1);
  };

  return (
    <section className="section-padding bg-midnight-900 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl"></div>
        
        {/* Líneas de grid futuristas */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
        
        {/* Partículas flotantes */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary-500 rounded-full"
          animate={{ 
            y: [0, -50, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-secondary-400 rounded-full"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-block mb-4 bg-primary-500/20 backdrop-blur-md px-4 py-1 rounded-full border border-primary-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-secondary-400 font-medium flex items-center">
                <Zap size={16} className="mr-2 text-primary-400" />
                COMIENZA TU CAMINO
              </span>
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-silver-100 mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="block"
              >
                ¿Listo para Encontrar Tu 
              </motion.span>
              <motion.span 
                className="relative inline-block text-primary-500 text-glow"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Hogar Soñado
                <span className="absolute -inset-1 bg-primary-500/20 blur-xl rounded-full -z-10"></span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="block"
              >
                ?
              </motion.span>
            </h2>
            
            <motion.p 
              className="text-xl text-silver-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Únete a miles de propietarios satisfechos que encontraron su lugar perfecto con TuHogar. Comienza tu camino hoy con nuestra tecnología revolucionaria.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/properties" 
                  className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-silver-100 font-medium rounded-full transition-colors flex items-center justify-center relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <Home size={18} className="mr-2 relative z-10" />
                  <span className="relative z-10">Explorar Propiedades</span>
                  <span className="absolute -inset-px bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></span>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="/contact" 
                  className="px-8 py-4 bg-midnight-800 hover:bg-midnight-700 text-silver-100 font-medium rounded-full transition-colors flex items-center justify-center border border-primary-500/30 group"
                >
                  <Phone size={18} className="mr-2 text-primary-400 group-hover:text-secondary-400 transition-colors" />
                  <span>Contáctanos</span>
                </Link>
              </motion.div>
            </div>
            
            {/* Estadísticas */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { number: "500+", label: "Propiedades" },
                { number: "300+", label: "Clientes" },
                { number: "10+", label: "Años" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-midnight-800/50 backdrop-blur-sm rounded-xl p-3 border border-midnight-700 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 + (index * 0.1), duration: 0.5 }}
                >
                  <p className="text-xl font-bold text-primary-500 mb-1">{stat.number}</p>
                  <p className="text-silver-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl"></div>
              
              <div className="bg-midnight-800/70 backdrop-blur-md rounded-2xl p-8 border border-midnight-700 relative z-10">
                <h3 className="text-2xl font-bold text-silver-100 mb-6 flex items-center">
                  <Sparkles size={20} className="mr-2 text-secondary-400" />
                  Obtén Recomendaciones Personalizadas
                </h3>
                
                {isSubmitted ? (
                  <motion.div 
                    className="py-12 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 mb-4">
                      <Check size={32} className="text-primary-500" />
                    </div>
                    <h4 className="text-xl font-bold text-silver-100 mb-2">¡Gracias por tu interés!</h4>
                    <p className="text-silver-400 mb-6">Nos pondremos en contacto contigo pronto con propiedades personalizadas.</p>
                    <motion.button 
                      className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-silver-100 font-medium rounded-xl transition-colors inline-flex items-center"
                      onClick={() => setIsSubmitted(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowRight size={18} className="mr-2" />
                      Volver al formulario
                    </motion.button>
                  </motion.div>
                ) : (
                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="absolute top-2 right-8 flex">
                      {[0, 1, 2].map((step) => (
                        <div 
                          key={step} 
                          className={`w-2 h-2 rounded-full mx-1 ${formStep === step ? 'bg-primary-500' : 'bg-midnight-700'}`}
                        />
                      ))}
                    </div>
                    
                    {formStep === 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <label htmlFor="name" className="block text-sm font-medium text-silver-300 mb-1">Tu Nombre</label>
                          <input 
                            type="text" 
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Ingresa tu nombre" 
                            className="w-full px-4 py-3 bg-midnight-700/70 border border-midnight-600 rounded-xl text-silver-200 placeholder-silver-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            required
                          />
                        </div>
                        <div className="flex justify-end">
                          <motion.button 
                            type="button" 
                            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-silver-100 font-medium rounded-xl transition-colors flex items-center"
                            onClick={nextStep}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!formData.name}
                          >
                            Siguiente
                            <ChevronRight size={18} className="ml-1" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                    
                    {formStep === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <label htmlFor="email" className="block text-sm font-medium text-silver-300 mb-1">Correo Electrónico</label>
                          <input 
                            type="email" 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Ingresa tu correo" 
                            className="w-full px-4 py-3 bg-midnight-700/70 border border-midnight-600 rounded-xl text-silver-200 placeholder-silver-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            required
                          />
                        </div>
                        <div className="flex justify-between">
                          <motion.button 
                            type="button" 
                            className="px-5 py-2.5 bg-midnight-700 hover:bg-midnight-600 text-silver-300 font-medium rounded-xl transition-colors flex items-center"
                            onClick={() => setFormStep(0)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Atrás
                          </motion.button>
                          <motion.button 
                            type="button" 
                            className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-silver-100 font-medium rounded-xl transition-colors flex items-center"
                            onClick={nextStep}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!formData.email}
                          >
                            Siguiente
                            <ChevronRight size={18} className="ml-1" />
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                    
                    {formStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <label htmlFor="property-interest" className="block text-sm font-medium text-silver-300 mb-1">Estoy interesado en</label>
                          <select 
                            id="property-interest"
                            name="interest"
                            value={formData.interest}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-midnight-700/70 border border-midnight-600 rounded-xl text-silver-200 focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none transition-all"
                          >
                            <option>Comprar una propiedad</option>
                            <option>Rentar una propiedad</option>
                            <option>Vender una propiedad</option>
                            <option>Invertir en propiedades</option>
                          </select>
                        </div>
                        <div className="flex justify-between">
                          <motion.button 
                            type="button" 
                            className="px-5 py-2.5 bg-midnight-700 hover:bg-midnight-600 text-silver-300 font-medium rounded-xl transition-colors flex items-center"
                            onClick={() => setFormStep(1)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Atrás
                          </motion.button>
                          <motion.button 
                            type="submit" 
                            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-silver-100 font-medium rounded-xl transition-colors flex items-center group relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                            <span className="relative z-10 flex items-center">
                              Comenzar
                              <Send size={18} className="ml-2" />
                            </span>
                            <span className="absolute -inset-px bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Línea de luz en la parte inferior */}
      <div className="h-0.5 w-full bg-gradient-to-r from-midnight-900 via-primary-500/30 to-midnight-900 mt-16"></div>
    </section>
  );
};

export default CTA; 