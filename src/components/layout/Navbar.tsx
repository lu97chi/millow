'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, Search, User, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-midnight/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading text-3xl font-bold text-silver-100">Tu<span className="text-primary-500 text-glow">Hogar</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link 
              href="/" 
              className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium"
            >
              <Home size={18} className="mr-2" />
              Home
            </Link>
            <Link 
              href="/properties" 
              className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium"
            >
              <Search size={18} className="mr-2" />
              Properties
            </Link>
            <Link 
              href="/about" 
              className="text-silver-300 hover:text-secondary-400 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="text-silver-300 hover:text-secondary-400 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/favorites" 
              className="p-2 rounded-full hover:bg-midnight-800 transition-colors"
              aria-label="Favorites"
            >
              <Heart size={20} className="text-silver-300" />
            </Link>
            <Link 
              href="/login" 
              className="flex items-center px-5 py-2.5 rounded-full bg-primary-500 text-silver-100 hover:bg-primary-600 transition-colors font-medium glow-effect"
            >
              <User size={18} className="mr-2" />
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-silver-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-midnight-800 border-t border-midnight-700 shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex flex-col space-y-6">
              <Link 
                href="/" 
                className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} className="mr-3" />
                Home
              </Link>
              <Link 
                href="/properties" 
                className="flex items-center text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search size={18} className="mr-3" />
                Properties
              </Link>
              <Link 
                href="/about" 
                className="text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex items-center pt-4 border-t border-midnight-700">
                <Link 
                  href="/favorites" 
                  className="flex items-center mr-6 text-silver-300 hover:text-secondary-400 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart size={18} className="mr-2" />
                  Favorites
                </Link>
                <Link 
                  href="/login" 
                  className="flex items-center px-5 py-2.5 rounded-full bg-primary-500 text-silver-100 hover:bg-primary-600 transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" />
                  Sign In
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 