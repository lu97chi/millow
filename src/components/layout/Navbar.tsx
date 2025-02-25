'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Search, User, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define variants outside the component
const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-midnight-900/90 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(13,27,42,0.7)]' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.span 
              className="font-heading text-3xl font-bold text-silver-100 relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tu<span className="text-primary-500 text-glow relative">
                Hogar
                <motion.span 
                  className="absolute -inset-1 rounded-full bg-primary-500/20 blur-md -z-10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </span>
              <motion.div 
                className="absolute -bottom-1.5 left-0 h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500 to-primary-500/0 w-0 group-hover:w-full transition-all duration-300"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { name: 'Inicio', href: '/', icon: Home, custom: false },
              { name: 'Propiedades', href: '/properties', icon: Search, custom: true },
              { name: 'Nosotros', href: '/about', icon: null, custom: false },
              { name: 'Contacto', href: '/contact', icon: null, custom: false }
            ].map((item, i) => (
              <div key={item.name} className="relative">
                {item.custom ? (
                  <motion.button 
                    className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium group"
                    onClick={() => toggleDropdown(item.name)}
                    custom={i}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon && <item.icon size={18} className="mr-2" />}
                    {item.name}
                    <ChevronDown 
                      size={16} 
                      className={`ml-1 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                    />
                    <motion.span 
                      className="absolute -bottom-1 left-0 h-0.5 bg-secondary-400 w-0 group-hover:w-full transition-all duration-300"
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                ) : (
                  <motion.div
                    custom={i}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link 
                      href={item.href} 
                      className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium group"
                    >
                      {item.icon && <item.icon size={18} className="mr-2" />}
                      {item.name}
                      <motion.span 
                        className="absolute -bottom-1 left-0 h-0.5 bg-secondary-400 w-0 group-hover:w-full transition-all duration-300"
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                )}

                {/* Dropdown para Propiedades */}
                {item.custom && (
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div 
                        className="absolute top-full left-0 mt-2 w-64 rounded-xl overflow-hidden bg-midnight-800/90 backdrop-blur-xl border border-midnight-700 shadow-xl z-50"
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: 10, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4">
                          <div className="mb-3 pb-2 border-b border-midnight-700">
                            <span className="text-silver-200 font-medium">Tipos de Propiedades</span>
                          </div>
                          {['Casas', 'Apartamentos', 'Terrenos', 'Oficinas', 'Locales'].map((type) => (
                            <Link 
                              key={type} 
                              href={`/properties?type=${type.toLowerCase()}`}
                              className="block py-2 px-3 text-silver-400 hover:text-secondary-400 hover:bg-midnight-700/50 rounded-lg transition-colors"
                              onClick={closeDropdown}
                            >
                              {type}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link 
                href="/favorites" 
                className="p-2.5 rounded-full hover:bg-midnight-800 transition-colors relative group"
                aria-label="Favoritos"
              >
                <Heart size={20} className="text-silver-300 group-hover:text-primary-400 transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</span>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/login" 
                className="flex items-center px-5 py-2.5 rounded-full bg-primary-500 text-silver-100 hover:bg-primary-600 transition-colors font-medium glow-effect relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <User size={18} className="mr-2 relative z-10" />
                <span className="relative z-10">Iniciar Sesión</span>
                <span className="absolute -inset-px bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500"></span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-silver-200 p-2 rounded-full hover:bg-midnight-800/50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar menú"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-midnight-800/95 backdrop-blur-xl border-t border-midnight-700 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-6">
                <Link 
                  href="/" 
                  className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home size={18} className="mr-3" />
                  Inicio
                </Link>
                <div>
                  <button 
                    className="flex items-center w-full text-silver-300 hover:text-secondary-400 transition-colors font-medium justify-between"
                    onClick={() => toggleDropdown('MobileProperties')}
                  >
                    <span className="flex items-center">
                      <Search size={18} className="mr-3" />
                      Propiedades
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${activeDropdown === 'MobileProperties' ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'MobileProperties' && (
                      <motion.div 
                        className="mt-3 pl-7 space-y-3 border-l border-midnight-700"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {['Casas', 'Apartamentos', 'Terrenos', 'Oficinas', 'Locales'].map((type) => (
                          <Link 
                            key={type} 
                            href={`/properties?type=${type.toLowerCase()}`}
                            className="block text-silver-400 hover:text-secondary-400 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {type}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Link 
                  href="/about" 
                  className="text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Nosotros
                </Link>
                <Link 
                  href="/contact" 
                  className="text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contacto
                </Link>
                <div className="flex items-center pt-4 border-t border-midnight-700">
                  <Link 
                    href="/favorites" 
                    className="flex items-center mr-6 text-silver-300 hover:text-secondary-400 transition-colors font-medium relative"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={18} className="mr-2" />
                    Favoritos
                    <span className="absolute -top-1 left-3 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">3</span>
                  </Link>
                  <Link 
                    href="/login" 
                    className="flex items-center px-5 py-2.5 rounded-full bg-primary-500 text-silver-100 hover:bg-primary-600 transition-colors font-medium relative overflow-hidden group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-400 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <User size={18} className="mr-2 relative z-10" />
                    <span className="relative z-10">Iniciar Sesión</span>
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 