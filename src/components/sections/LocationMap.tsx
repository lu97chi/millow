'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { LocationDistribution } from '@/types/properties';

interface LocationMapProps {
  locationDistribution: LocationDistribution;
}

const LocationMap = ({ locationDistribution }: LocationMapProps) => {
  const topLocations = Object.entries(locationDistribution)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <section className="py-16 bg-midnight-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-heading font-bold text-silver-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ubicaciones Principales
          </motion.h2>
          <motion.p 
            className="text-silver-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Descubre las zonas más populares para propiedades
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topLocations.map(([location, count], index) => (
            <motion.div
              key={location}
              className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-6 border border-midnight-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-xl bg-primary-500/20">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-silver-200 font-medium ml-3">{location}</h3>
              </div>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-primary-500">{count}</p>
                <p className="text-silver-400">propiedades</p>
              </div>
              <div className="mt-4 bg-midnight-700/50 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full"
                  style={{ 
                    width: `${(count / Math.max(...Object.values(locationDistribution))) * 100}%` 
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-silver-100 rounded-full transition-colors inline-flex items-center group">
            <span>Ver todas las ubicaciones</span>
            <MapPin className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LocationMap; 