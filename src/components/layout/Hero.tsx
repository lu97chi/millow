'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Sparkles, Bot, Send, Zap, Building, Home as HomeIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define interfaces
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Define animation variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7
    }
  }
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('Todos');
  const [isAIFocused, setIsAIFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiResponseText, setAiResponseText] = useState('');

  // Simular respuesta de Luna IA
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsTyping(true);
    setShowAIResponse(true);
    setAiResponseText('');
    
    const responses = [
      "He encontrado 5 propiedades que coinciden con tus criterios. ¿Te gustaría ver primero las más recientes?",
      "Encontré varios apartamentos modernos cerca del centro. ¿Prefieres ver primero los que tienen terraza?",
      "Tengo algunas opciones excelentes para ti. ¿Quieres filtrar por precio o por ubicación?",
      "He seleccionado propiedades que se ajustan a tu búsqueda. ¿Prefieres ver primero las de 2 o 3 habitaciones?"
    ];
    
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    let currentText = '';
    
    // Efecto de escritura
    const typingInterval = setInterval(() => {
      if (currentText.length < selectedResponse.length) {
        currentText += selectedResponse[currentText.length];
        setAiResponseText(currentText);
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);
  };

  // Efecto de partículas flotantes para el fondo
  const [particles, setParticles] = useState<Particle[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 5,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay and Particles */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/images/hero-home.jpg)',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 hero-overlay bg-gradient-to-b from-midnight-900/80 via-midnight-800/70 to-midnight/90" />
        
        {/* Animated Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary-500/20 backdrop-blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 md:pt-0">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={fadeInUpVariant.hidden}
            animate={fadeInUpVariant.visible}
          >
            <motion.div
              className="inline-block mb-4 bg-primary-500/20 backdrop-blur-md px-4 py-1 rounded-full border border-primary-500/30"
              initial={scaleInVariant.hidden}
              animate={scaleInVariant.visible}
            >
              <span className="text-secondary-400 font-medium flex items-center">
                <Zap size={16} className="mr-2 text-primary-400" />
                Revolucionando el mercado inmobiliario en México
              </span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-silver-100 mb-6 leading-tight">
              <motion.span
                initial={fadeInUpVariant.hidden}
                animate={fadeInUpVariant.visible}
              >
                Encuentra Tu 
              </motion.span>{" "}
              <motion.span 
                className="relative inline-block"
                initial={scaleInVariant.hidden}
                animate={scaleInVariant.visible}
              >
                <span className="text-primary-500 text-glow relative z-10">Hogar</span>
                <span className="absolute -inset-1 bg-primary-500/20 blur-xl rounded-full -z-10"></span>
              </motion.span>{" "}
              <motion.span
                initial={fadeInUpVariant.hidden}
                animate={fadeInUpVariant.visible}
              >
                Perfecto
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-silver-300 mb-8 max-w-3xl mx-auto"
              initial={fadeInUpVariant.hidden}
              animate={fadeInUpVariant.visible}
            >
              Descubre el lugar ideal para llamar hogar con nuestra tecnología de inteligencia artificial
            </motion.p>
          </motion.div>

          {/* AI-Powered Search Bar */}
          <motion.div 
            className="glass-card rounded-3xl shadow-2xl p-6 md:p-8 max-w-4xl mx-auto border border-primary-500/30 backdrop-blur-md bg-midnight-800/50"
            initial={fadeInUpVariant.hidden}
            animate={fadeInUpVariant.visible}
          >
            <div className="flex items-center mb-6">
              <div className="flex items-center bg-primary-500/30 rounded-full px-4 py-2 mr-auto backdrop-blur-sm border border-primary-500/40">
                <Bot size={18} className="text-secondary-400 mr-2" />
                <span className="text-secondary-400 text-sm font-medium">Impulsado por Luna IA</span>
                <Sparkles size={16} className="text-secondary-400 ml-2" />
              </div>
              
              <div className="flex space-x-3">
                <motion.button 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${propertyType === 'Todos' ? 'bg-primary-500 text-silver-100 shadow-lg shadow-primary-500/30' : 'bg-midnight-800/80 text-silver-400 hover:bg-midnight-700 border border-midnight-700'}`} 
                  onClick={() => setPropertyType('Todos')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    <Search size={14} className="mr-1.5" />
                    Todos
                  </span>
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${propertyType === 'En Venta' ? 'bg-primary-500 text-silver-100 shadow-lg shadow-primary-500/30' : 'bg-midnight-800/80 text-silver-400 hover:bg-midnight-700 border border-midnight-700'}`} 
                  onClick={() => setPropertyType('En Venta')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    <HomeIcon size={14} className="mr-1.5" />
                    Comprar
                  </span>
                </motion.button>
                <motion.button 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${propertyType === 'En Renta' ? 'bg-primary-500 text-silver-100 shadow-lg shadow-primary-500/30' : 'bg-midnight-800/80 text-silver-400 hover:bg-midnight-700 border border-midnight-700'}`} 
                  onClick={() => setPropertyType('En Renta')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center">
                    <Building size={14} className="mr-1.5" />
                    Rentar
                  </span>
                </motion.button>
              </div>
            </div>
            
            <div className={`relative bg-midnight-900/70 rounded-2xl border transition-all duration-300 ${isAIFocused ? 'border-secondary-400 shadow-[0_0_20px_rgba(146,230,230,0.4)]' : 'border-midnight-700'}`}>
              <div className="flex items-center px-5 py-4">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <Bot size={20} className="text-silver-100" />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Pregúntale a Luna sobre tu hogar ideal... (ej. 'Busca una casa de 3 habitaciones cerca del centro')"
                  className="w-full bg-transparent border-none focus:outline-none text-silver-200 placeholder-silver-500 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsAIFocused(true)}
                  onBlur={() => setTimeout(() => setIsAIFocused(false), 100)}
                />
                <motion.button 
                  className={`ml-3 p-3 rounded-full transition-colors ${searchQuery ? 'bg-primary-500 text-silver-100 shadow-lg shadow-primary-500/30' : 'bg-midnight-700 text-silver-400'}`}
                  disabled={!searchQuery}
                  onClick={handleSearch}
                  whileHover={searchQuery ? { scale: 1.1 } : {}}
                  whileTap={searchQuery ? { scale: 0.9 } : {}}
                >
                  <Send size={20} className={searchQuery ? 'text-silver-100' : 'text-silver-400'} />
                </motion.button>
              </div>
              
              {isAIFocused && (
                <div className="px-5 pb-4 text-sm text-silver-400">
                  <p className="flex items-center">
                    <Sparkles size={14} className="inline mr-2 text-secondary-400" />
                    Prueba: "Encuentra un apartamento moderno de 2 habitaciones con balcón" o "Casas por menos de $5M con alberca"
                  </p>
                </div>
              )}
              
              {/* AI Response */}
              <AnimatePresence>
                {showAIResponse && (
                  <motion.div 
                    className="mt-2 px-5 pb-5 border-t border-midnight-700 pt-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-secondary-500/20 flex items-center justify-center mr-4 flex-shrink-0">
                        <Bot size={20} className="text-secondary-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-silver-200">
                          {aiResponseText}
                          {isTyping && (
                            <span className="inline-flex ml-1">
                              <motion.span 
                                className="h-1.5 w-1.5 bg-secondary-400 rounded-full mx-0.5"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop' }}
                              />
                              <motion.span 
                                className="h-1.5 w-1.5 bg-secondary-400 rounded-full mx-0.5"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.2 }}
                              />
                              <motion.span 
                                className="h-1.5 w-1.5 bg-secondary-400 rounded-full mx-0.5"
                                animate={{ y: [0, -3, 0] }}
                                transition={{ duration: 0.6, repeat: Infinity, repeatType: 'loop', delay: 0.4 }}
                              />
                            </span>
                          )}
                        </p>
                        
                        {!isTyping && aiResponseText && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <motion.button 
                              className="px-3 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-sm border border-primary-500/30 hover:bg-primary-500/30 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Ver resultados
                            </motion.button>
                            <motion.button 
                              className="px-3 py-1.5 bg-midnight-800 text-silver-400 rounded-full text-sm border border-midnight-700 hover:bg-midnight-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Refinar búsqueda
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-5 text-center">
              <p className="text-silver-400 text-sm flex items-center justify-center">
                <Sparkles size={14} className="inline mr-1.5 text-secondary-400" />
                Luna entiende lenguaje natural y puede encontrar exactamente lo que estás buscando
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-3 gap-6"
            initial={fadeInUpVariant.hidden}
            animate={fadeInUpVariant.visible}
          >
            {[
              { number: "500+", label: "Propiedades", delay: 0 },
              { number: "300+", label: "Clientes Satisfechos", delay: 0.1 },
              { number: "10+", label: "Años de Experiencia", delay: 0.2 }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-2xl p-6 text-center border border-primary-500/20 backdrop-blur-md bg-midnight-800/30 hover:bg-midnight-800/50 transition-colors group"
                whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(41, 163, 195, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.p 
                  className="text-3xl md:text-4xl font-bold text-primary-500 mb-1 text-glow relative"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + stat.delay, duration: 0.5 }}
                >
                  {stat.number}
                  <motion.span 
                    className="absolute -inset-3 rounded-full bg-primary-500/20 blur-md -z-10 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.p>
                <p className="text-silver-300 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 