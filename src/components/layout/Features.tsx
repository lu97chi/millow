'use client';

import { Home, Search, Key, Heart, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: 'Smart Search',
    description: 'Find your dream home with our powerful and intuitive search tools that match your preferences.'
  },
  {
    icon: <Home className="h-8 w-8 text-primary" />,
    title: 'Curated Properties',
    description: 'Browse through our handpicked selection of quality properties that meet our high standards.'
  },
  {
    icon: <Key className="h-8 w-8 text-primary" />,
    title: 'Seamless Process',
    description: 'Experience a smooth journey from property search to getting your keys with our streamlined process.'
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: 'Personalized Service',
    description: 'Receive tailored recommendations based on your preferences and needs from our expert team.'
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: 'Secure Transactions',
    description: 'Feel confident with our secure and transparent transaction process that protects your interests.'
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: '24/7 Support',
    description: 'Our dedicated team is always available to assist you whenever you need help throughout your journey.'
  }
];

const Features = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            className="inline-block text-primary font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            OUR ADVANTAGES
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Why Choose <span className="text-primary">TuHogar</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We make finding your perfect home a delightful experience with our unique approach to real estate.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="mb-6 bg-secondary w-16 h-16 rounded-2xl flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 