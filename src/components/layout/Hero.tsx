'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, ChevronDown, Building, Home as HomeIcon, Sparkles, Shield, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define animation variants - dreamy and tech-inspired
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
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

// Add shimmer animation for the gradient background
const shimmerAnimation = {
  initial: { backgroundPosition: '0% 0%' },
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "linear"
    }
  }
};

// New particle animation
const particleVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop" as const,
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
  const [scrollIndicator, setScrollIndicator] = useState(true);

  // Hide scroll indicator when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrollIndicator(false);
      } else {
        setScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Generate random particles
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5
  }));

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/images/hero-home.jpg)',
          backgroundPosition: 'center',
        }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-midnight-900/80 via-primary-900/70 to-accent/50"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 2 }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent"
          initial={shimmerAnimation.initial}
          animate={shimmerAnimation.animate}
        />
      </div>

      {/* Particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          transition={{
            delay: particle.delay,
            duration: 3 + particle.delay / 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      ))}

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />

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
              className="inline-flex items-center text-accent text-xs uppercase tracking-widest mb-4 font-medium bg-accent/20 px-4 py-2 rounded-full gradient-border backdrop-blur-sm shadow-lg shadow-accent/20"
            >
              <Sparkles size={14} className="mr-2 animate-pulse-subtle" />
              Inteligencia Artificial a Tu Servicio
            </motion.span>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-shadow-lg">
              Convierte Tu <span className="gradient-text bg-gradient-to-r from-primary-300 via-accent to-primary-300 drop-shadow-lg">Sueño</span> en Realidad <br className="hidden md:block" />
              <span className="text-accent drop-shadow-lg">Con Seguridad y Confianza</span>
            </h1>
            
            <motion.p 
              className="font-body text-lg md:text-xl text-white/95 mb-10 max-w-2xl mx-auto text-pretty drop-shadow-md"
              variants={fadeInVariant}
            >
              Descubre espacios que transformarán tu vida con la ayuda de nuestra tecnología de IA, diseñada para entender tus necesidades y encontrar tu hogar ideal
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="glass-effect glass-card-hover rounded-xl shadow-luxury p-8 md:p-10 max-w-3xl mx-auto"
            variants={fadeInVariant}
          >
            <div className="flex flex-wrap items-center justify-center mb-8 gap-3">
              {[
                { type: 'Todos', icon: <Search size={16} className="mr-2" /> },
                { type: 'En Venta', icon: <HomeIcon size={16} className="mr-2" /> },
                { type: 'En Renta', icon: <Building size={16} className="mr-2" /> }
              ].map((item) => (
                <motion.button 
                  key={item.type}
                  className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all flex items-center ${propertyType === item.type ? 'bg-primary text-white shadow-primary' : 'bg-white/10 text-white hover:bg-white/20'}`} 
                  onClick={() => setPropertyType(item.type)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {item.icon}
                  {item.type === 'En Venta' ? 'Comprar' : item.type === 'En Renta' ? 'Rentar' : item.type}
                </motion.button>
              ))}
            </div>
            
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-[1.03]' : ''}`}>
              <div className="flex items-center px-6 py-4 bg-white/20 rounded-md border border-white/40 shadow-inner shadow-white/15 backdrop-blur-sm transition-all duration-300 hover:bg-white/25">
                <input
                  type="text"
                  placeholder="Describe tu hogar ideal y nuestra IA te ayudará a encontrarlo..."
                  className="w-full bg-transparent border-none focus:outline-none text-white placeholder-white/80 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <motion.button 
                  onClick={handleSearch}
                  className="ml-2 p-2.5 rounded-md bg-accent text-white hover:bg-accent/90 transition-colors ai-glow btn-dream"
                  aria-label="Buscar con IA"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Sparkles size={18} />
                </motion.button>
              </div>
              
              <AnimatePresence>
                {showAIResponse && (
                  <motion.div 
                    className="mt-4 px-6 py-4 bg-accent/20 border border-accent/40 rounded-md backdrop-blur-sm shimmer shadow-lg shadow-accent/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 mt-0.5 animate-pulse-subtle">
                        <Sparkles size={14} className="text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/90 text-sm">
                          {typedText}
                          {isTyping && <span className="inline-block w-1.5 h-4 bg-accent/80 ml-0.5 animate-pulse"></span>}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <div className="text-white/70 text-xs uppercase tracking-wider font-medium">Búsquedas populares:</div>
              {['Apartamentos con vista', 'Casas con jardín', 'Lofts modernos', 'Oficinas inteligentes'].map((tag) => (
                <motion.button 
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 bg-white/5 hover:bg-accent/20 rounded-md text-white/80 text-xs transition-colors border border-white/10 hover:border-accent/30 hover-scale"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(var(--accent), 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
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
            <motion.div 
              className="flex items-center text-white/70 text-sm bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 hover-lift"
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <Shield size={14} className="text-primary mr-2" />
              <span>Todas las propiedades son verificadas para tu seguridad</span>
            </motion.div>
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
        className="absolute top-1/4 right-1/4 w-4 h-4 bg-accent/50 rounded-full hidden lg:block animate-float"
        style={{ animationDelay: '0.5s' }}
      />
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-primary/50 rounded-full hidden lg:block animate-float"
        style={{ animationDelay: '1.2s' }}
      />
      
      {/* Scroll indicator */}
      <AnimatePresence>
        {scrollIndicator && (
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p className="text-white/70 text-xs mb-2">Descubre más</motion.p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} className="text-white/70" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero; 