'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Phone } from 'lucide-react';

const CTA = () => {
  return (
    <section className="section-padding bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-medium mb-4">START YOUR JOURNEY</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Ready to Find Your <span className="text-primary">Dream Home</span>?
            </h2>
            
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of satisfied homeowners who found their perfect place with TuHogar. Start your journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/properties" 
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-colors flex items-center justify-center"
              >
                <Home size={18} className="mr-2" />
                Browse Properties
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                Contact Us
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
              
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">Get Personalized Recommendations</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      placeholder="Enter your name" 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      placeholder="Enter your email" 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="property-interest" className="block text-sm font-medium text-gray-300 mb-1">I'm interested in</label>
                    <select 
                      id="property-interest" 
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      <option>Buying a property</option>
                      <option>Renting a property</option>
                      <option>Selling a property</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors flex items-center justify-center mt-6"
                  >
                    Get Started
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA; 