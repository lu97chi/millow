'use client';

import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Building2, Home, MapPin, BarChart, ArrowUpRight, Percent } from 'lucide-react';
import type { HomepageStatistics } from '@/types/home';

interface StatisticsProps {
  statistics: HomepageStatistics;
}

const formatNumber = (num: number, style: 'currency' | 'decimal' = 'decimal') => {
  if (style === 'currency') {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      notation: num >= 1000000 ? 'compact' : 'standard',
      compactDisplay: 'short',
    }).format(num);
  }
  
  return new Intl.NumberFormat('es-MX', {
    notation: num >= 10000 ? 'compact' : 'standard',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num);
};

const calculateGrowthRate = (current: number, total: number) => {
  return ((current / total) * 100).toFixed(1);
};

const Statistics = ({ statistics }: StatisticsProps) => {
  const {
    totalProperties,
    availableProperties,
    soldProperties,
    rentedProperties,
    averagePrice,
    propertyTypeDistribution,
    locationDistribution,
    updatedLastWeek,
  } = statistics;

  const marketActivity = calculateGrowthRate(updatedLastWeek, totalProperties);
  const availabilityRate = calculateGrowthRate(availableProperties, totalProperties);

  return (
    <section className="py-12 sm:py-16 bg-midnight-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <motion.span 
            className="inline-block text-secondary-400 font-medium mb-3 bg-primary-500/20 backdrop-blur-md px-4 py-1 rounded-full border border-primary-500/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            PANORAMA DEL MERCADO
          </motion.span>
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-silver-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Métricas del Mercado Inmobiliario
          </motion.h2>
          <motion.p 
            className="text-sm sm:text-base text-silver-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Análisis actualizado del mercado inmobiliario para toma de decisiones informadas
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Total Properties */}
          <motion.div
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midnight-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-primary-500/20">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
              </div>
              <span className="text-xs sm:text-sm text-silver-400">Total de Propiedades</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-primary-500 mb-2">
              {formatNumber(totalProperties)}
            </h3>
            <p className="text-xs sm:text-sm text-silver-400">
              Propiedades activas en el mercado
            </p>
          </motion.div>

          {/* Average Price */}
          <motion.div
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midnight-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-green-500/20">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
              </div>
              <span className="text-xs sm:text-sm text-silver-400">Precio Promedio</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-green-500 mb-2">
              {formatNumber(averagePrice, 'currency')}
            </h3>
            <p className="text-xs sm:text-sm text-silver-400">
              Valor promedio en el mercado actual
            </p>
          </motion.div>

          {/* Market Activity */}
          <motion.div
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midnight-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-500/20">
                <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
              </div>
              <div className="flex items-center text-blue-500">
                <ArrowUpRight size={16} className="mr-1" />
                <span>{marketActivity}%</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-silver-100 mb-2">
              {formatNumber(updatedLastWeek)} Actualizadas
            </h3>
            <p className="text-xs sm:text-sm text-silver-400">
              Propiedades actualizadas recientemente
            </p>
          </motion.div>

          {/* Available Properties */}
          <motion.div
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midnight-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-secondary-500/20">
                <Home className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-400" />
              </div>
              <div className="flex items-center text-secondary-400">
                <Percent size={16} className="mr-1" />
                <span>{availabilityRate}%</span>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-silver-100 mb-2">
              {formatNumber(availableProperties)} Disponibles
            </h3>
            <p className="text-xs sm:text-sm text-silver-400">
              Propiedades listas para inversión
            </p>
          </motion.div>

          {/* Property Types */}
          <motion.div
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midnight-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-purple-500/20">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              </div>
              <span className="text-xs sm:text-sm text-silver-400">Tipos de Propiedad</span>
            </div>
            <div className="space-y-2">
              {Object.entries(propertyTypeDistribution)
                .slice(0, 2)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-silver-400 truncate mr-2">{type}</span>
                    <span className="text-xs sm:text-sm text-purple-500 font-semibold">{formatNumber(count)}</span>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Top Locations */}
          <motion.div
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-midnight-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-yellow-500/20">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
              </div>
              <span className="text-xs sm:text-sm text-silver-400">Ciudades Principales</span>
            </div>
            <div className="space-y-2">
              {Object.entries(locationDistribution.topCities)
                .slice(0, 2)
                .map(([location, count]) => (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-silver-400 truncate mr-2">{location}</span>
                    <span className="text-xs sm:text-sm text-yellow-500 font-semibold">{formatNumber(count)}</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 