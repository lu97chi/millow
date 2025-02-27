'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Building, Home as HomeIcon, Sparkles, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// Define animation variants - dreamy and tech-inspired
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18
    }
  }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  }
};

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('Todos');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAIResponse, setShowAIResponse] = useState(false);
  const [aiResponseText, setAiResponseText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');

  // Simulate AI typing effect
  useEffect(() => {
    if (showAIResponse && aiResponseText) {
      setIsTyping(true);
      setTypedText('');
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < aiResponseText.length) {
          setTypedText(prev => prev + aiResponseText.charAt(i));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
        }
      }, 30);
      
      return () => clearInterval(typeInterval);
    }
  }, [showAIResponse, aiResponseText]);

  // Simular respuesta de asistente
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setShowAIResponse(true);
    setAiResponseText('');
    
    const responses = [
      "He encontrado 5 propiedades que coinciden con tus criterios. ¿Te gustaría ver primero las más recientes?",
      "Encontré varios apartamentos modernos cerca del centro. ¿Prefieres ver primero los que tienen terraza?",
      "Tengo algunas opciones excelentes para ti. ¿Quieres filtrar por precio o por ubicación?",
      "He seleccionado propiedades que se ajustan a tu búsqueda. ¿Prefieres ver primero las de 2 o 3 habitaciones?"
    ];
    
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Delay to simulate AI processing
    setTimeout(() => {
      setAiResponseText(selectedResponse);
    }, 600);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/images/hero-home.jpg)',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 md:pt-0">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center mb-14"
            variants={fadeInVariant}
          >
            <motion.span 
              variants={floatAnimation}
              initial="initial"
              animate="animate"
              className="inline-flex items-center text-accent text-xs uppercase tracking-widest mb-4 font-medium bg-accent/10 px-4 py-2 rounded-full safety-border"
            >
              <Sparkles size={14} className="mr-2" />
              Inteligencia Artificial a Tu Servicio
            </motion.span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-shadow">
              Convierte Tu <span className="text-gradient">Sueño</span> en Realidad <br className="hidden md:block" />
              <span className="text-accent">Con Seguridad y Confianza</span>
            </h1>
            
            <motion.p 
              className="font-body text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto"
              variants={fadeInVariant}
            >
              Descubre espacios que transformarán tu vida con la ayuda de nuestra tecnología de IA, diseñada para entender tus necesidades y encontrar tu hogar ideal
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="illusion-card fancy-card rounded-lg shadow-lg p-8 md:p-10 max-w-3xl mx-auto"
            variants={fadeInVariant}
          >
            <div className="flex flex-wrap items-center justify-center mb-8 gap-3">
              <button 
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${propertyType === 'Todos' ? 'bg-primary text-white' : 'bg-white/10 text-white hover:bg-white/20'}`} 
                onClick={() => setPropertyType('Todos')}
              >
                <span className="flex items-center">
                  <Search size={16} className="mr-2" />
                  Todos
                </span>
              </button>
              <button 
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${propertyType === 'En Venta' ? 'bg-primary text-white' : 'bg-white/10 text-white hover:bg-white/20'}`} 
                onClick={() => setPropertyType('En Venta')}
              >
                <span className="flex items-center">
                  <HomeIcon size={16} className="mr-2" />
                  Comprar
                </span>
              </button>
              <button 
                className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all ${propertyType === 'En Renta' ? 'bg-primary text-white' : 'bg-white/10 text-white hover:bg-white/20'}`} 
                onClick={() => setPropertyType('En Renta')}
              >
                <span className="flex items-center">
                  <Building size={16} className="mr-2" />
                  Rentar
                </span>
              </button>
            </div>
            
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-[1.02]' : ''}`}>
              <div className="flex items-center px-6 py-4 bg-white/10 rounded-md border border-white/20">
                <input
                  type="text"
                  placeholder="Describe tu hogar ideal y nuestra IA te ayudará a encontrarlo..."
                  className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white/60 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  onClick={handleSearch}
                  className="ml-2 p-2.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors ai-glow"
                  aria-label="Buscar con IA"
                >
                  <Sparkles size={18} />
                </button>
              </div>
              
              {showAIResponse && (
                <div className="mt-4 px-6 py-4 bg-accent/10 border border-accent/20 rounded-md backdrop-blur-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 mt-0.5 pulse-animation">
                      <Sparkles size={14} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 text-sm">
                        {typedText}
                        {isTyping && <span className="inline-block w-1.5 h-4 bg-accent/80 ml-0.5 animate-pulse"></span>}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <div className="text-white/70 text-xs uppercase tracking-wider font-medium">Búsquedas populares:</div>
              {['Apartamentos con vista', 'Casas con jardín', 'Lofts modernos', 'Oficinas inteligentes'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-accent/20 rounded-md text-white/80 text-xs transition-colors border border-white/10 hover:border-accent/30"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex items-center text-white/70 text-sm bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield size={14} className="text-primary mr-2" />
              <span>Todas las propiedades son verificadas para tu seguridad</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute bottom-10 left-10 w-20 h-20 border border-accent/30 rounded-full hidden lg:block"
        animate={{
          boxShadow: ['0 0 0 0 rgba(var(--accent), 0)', '0 0 0 10px rgba(var(--accent), 0.1)', '0 0 0 0 rgba(var(--accent), 0)'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      <motion.div 
        className="absolute top-40 right-10 w-10 h-10 border border-accent/30 rounded-full hidden lg:block"
        animate={{
          boxShadow: ['0 0 0 0 rgba(var(--accent), 0)', '0 0 0 10px rgba(var(--accent), 0.1)', '0 0 0 0 rgba(var(--accent), 0)'],
        }}
        transition={{
          duration: 3,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent/50 rounded-full hidden lg:block floating"
        style={{ animationDelay: '0.5s' }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary/50 rounded-full hidden lg:block floating"
        style={{ animationDelay: '1.2s' }}
      />
    </section>
  );
};

export default Hero; 