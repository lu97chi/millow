'use client';

import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('All Types');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 md:pt-0">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-silver-100 mb-6 leading-tight">
              Find Your Perfect <span className="text-primary-500 text-glow">Home</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-silver-300 mb-8 max-w-2xl mx-auto">
              Discover the perfect place to call home with our curated selection of properties
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="glass-card rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl mx-auto border border-primary-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Location Input */}
              <div className="flex-1 relative">
                <label htmlFor="location" className="block text-sm font-medium text-silver-300 mb-1">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" size={18} />
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter city, neighborhood, or address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-midnight-800 border border-midnight-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-silver-200 placeholder-silver-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Property Type Dropdown */}
              <div className="md:w-48">
                <label htmlFor="property-type" className="block text-sm font-medium text-silver-300 mb-1">
                  Property Type
                </label>
                <div className="relative">
                  <select
                    id="property-type"
                    className="appearance-none w-full pl-4 pr-10 py-3 rounded-xl bg-midnight-800 border border-midnight-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-silver-200"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option>All Types</option>
                    <option>House</option>
                    <option>Apartment</option>
                    <option>Condo</option>
                    <option>Villa</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 pointer-events-none" size={18} />
                </div>
              </div>

              {/* Search Button */}
              <div className="md:self-end">
                <button className="w-full md:w-auto px-8 py-3 bg-primary-500 hover:bg-primary-600 text-silver-100 rounded-xl transition-colors flex items-center justify-center font-medium glow-effect">
                  <Search size={18} className="mr-2" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <div className="glass-card rounded-xl p-6 text-center border border-primary-500/20">
              <p className="text-3xl md:text-4xl font-bold text-primary-500 mb-1 text-glow">500+</p>
              <p className="text-silver-300 text-sm md:text-base">Properties</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center border border-primary-500/20">
              <p className="text-3xl md:text-4xl font-bold text-primary-500 mb-1 text-glow">300+</p>
              <p className="text-silver-300 text-sm md:text-base">Happy Clients</p>
            </div>
            <div className="glass-card rounded-xl p-6 text-center border border-primary-500/20">
              <p className="text-3xl md:text-4xl font-bold text-primary-500 mb-1 text-glow">10+</p>
              <p className="text-silver-300 text-sm md:text-base">Years Experience</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 