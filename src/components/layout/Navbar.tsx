'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Search, User, Heart, ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Refined fade in animation
const fadeIn = {
  hidden: { opacity: 0, y: -5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50 luxury-shadow' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-display text-2xl font-bold text-foreground tracking-tight flex items-center">
              Tu<span className="text-primary">Hogar</span>
              <span className="text-accent text-xs align-top ml-0.5">®</span>
              <motion.span 
                className="ml-2 inline-flex items-center justify-center"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles size={16} className="text-accent" />
              </motion.span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {[
              { name: 'Inicio', href: '/', icon: null },
              { name: 'Propiedades', href: '/properties', icon: null },
              { name: 'Nosotros', href: '/about', icon: null },
              { name: 'Contacto', href: '/contact', icon: null }
            ].map((item) => (
              <div key={item.name} className="relative">
                <Link 
                  href={item.href} 
                  className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium pb-1 hover:fancy-border font-body"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <Link 
              href="/favorites" 
              className="p-2 rounded-full hover:bg-secondary transition-colors relative ai-glow"
              aria-label="Favoritos"
            >
              <Heart size={18} className="text-foreground/70 hover:text-accent transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[10px] text-white font-medium">3</span>
            </Link>
            
            <Link 
              href="/login" 
              className="flex items-center px-6 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-white transition-colors text-sm font-medium btn-dream"
            >
              <Sparkles size={14} className="mr-2" />
              <span>Iniciar Sesión</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar menú"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-background border-t border-border luxury-shadow"
          initial={fadeIn.hidden}
          animate={fadeIn.visible}
        >
          <div className="container mx-auto px-4 py-5">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium py-1 font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                href="/properties" 
                className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium py-1 font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Propiedades
              </Link>
              <Link 
                href="/about" 
                className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium py-1 font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
              <Link 
                href="/contact" 
                className="flex items-center text-foreground/80 hover:text-accent transition-colors text-sm font-medium py-1 font-body"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </Link>
              <div className="pt-4 flex items-center space-x-4 border-t border-border">
                <Link 
                  href="/favorites" 
                  className="p-2 rounded-full hover:bg-secondary transition-colors relative"
                  aria-label="Favoritos"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} className="text-foreground/70 hover:text-accent transition-colors" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center text-[10px] text-white font-medium">3</span>
                </Link>
                
                <Link 
                  href="/login" 
                  className="flex items-center px-6 py-2 rounded-md border border-accent text-accent hover:bg-accent hover:text-white transition-colors text-sm font-medium btn-dream font-body"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Sparkles size={14} className="mr-2" />
                  <span>Iniciar Sesión</span>
                </Link>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar; 