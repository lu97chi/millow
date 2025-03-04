'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Search, User, Heart, ChevronDown, Sparkles, MessageCircle, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Refined fade in animation
const fadeIn = {
  hidden: { opacity: 0, y: -5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Add slide in animation for mobile menu
const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Stagger children animation
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Navbar item hover animation
const navItemVariants = {
  hidden: { opacity: 0, y: -5 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<string | null>(null);

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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'glass-effect shadow-luxury' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.span 
              className="font-display text-2xl font-bold text-foreground tracking-tight flex items-center"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Tu<span className="gradient-text bg-gradient-to-r from-primary to-accent group-hover:from-accent group-hover:to-primary transition-all duration-500">Hogar</span>
              <span className="text-accent text-xs align-top ml-0.5 animate-pulse-subtle">®</span>
              <motion.span 
                className="ml-2 inline-flex items-center justify-center"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={16} className="text-accent" />
              </motion.span>
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav 
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { name: 'Inicio', href: '/', icon: null },
              { name: 'Propiedades', href: '/properties', icon: null },
              { name: 'Nosotros', href: '/about', icon: null },
              { name: 'Contacto', href: '/contact', icon: null }
            ].map((item) => (
              <motion.div 
                key={item.name} 
                className="relative group"
                variants={navItemVariants}
                onHoverStart={() => setIsHovering(item.name)}
                onHoverEnd={() => setIsHovering(null)}
              >
                <Link 
                  href={item.href} 
                  className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium pb-1 group-hover:fancy-border font-body"
                >
                  {item.name}
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: isHovering === item.name ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* Desktop Action Buttons */}
          <motion.div 
            className="hidden md:flex items-center space-x-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={navItemVariants}>
              <Link 
                href="/favorites" 
                className="p-2 rounded-full hover:bg-secondary/80 transition-colors relative ai-glow"
                aria-label="Favoritos"
              >
                <Heart size={18} className="text-foreground/70 hover:text-accent transition-colors" />
                <motion.span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[10px] text-white font-medium"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >3</motion.span>
              </Link>
            </motion.div>
            
            <motion.div variants={navItemVariants}>
              <Link 
                href="/login" 
                className="flex items-center px-4 py-2 rounded-md border-gradient text-accent hover:text-white transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-accent"
              >
                <motion.span
                  className="flex items-center gradient-border-content px-4 py-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <LogIn size={14} className="mr-2" />
                  <span>Iniciar Sesión</span>
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-foreground p-2 rounded-md hover:bg-secondary/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar menú"
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden glass-effect"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-5">
              <motion.nav 
                className="flex flex-col space-y-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { name: 'Inicio', href: '/', icon: <Home size={16} className="mr-2" /> },
                  { name: 'Propiedades', href: '/properties', icon: <Search size={16} className="mr-2" /> },
                  { name: 'Nosotros', href: '/about', icon: <User size={16} className="mr-2" /> },
                  { name: 'Contacto', href: '/contact', icon: <MessageCircle size={16} className="mr-2" /> }
                ].map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={navItemVariants}
                    whileHover="hover"
                    className="overflow-hidden"
                  >
                    <Link 
                      href={item.href} 
                      className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium py-2 px-3 rounded-md hover:bg-secondary/30 font-body hover-scale"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-4 flex items-center space-x-4 border-t border-border mt-2"
                  variants={navItemVariants}
                >
                  <Link 
                    href="/favorites" 
                    className="p-2 rounded-full hover:bg-secondary/80 transition-colors relative ai-glow"
                    aria-label="Favoritos"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart size={18} className="text-foreground/70 hover:text-accent transition-colors" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[10px] text-white font-medium animate-pulse-subtle">3</span>
                  </Link>
                  
                  <Link 
                    href="/login" 
                    className="flex items-center px-6 py-2 rounded-md gradient-border text-accent hover:text-white transition-colors text-sm font-medium btn-dream font-body"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn size={14} className="mr-2" />
                    <span>Iniciar Sesión</span>
                  </Link>
                </motion.div>
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 