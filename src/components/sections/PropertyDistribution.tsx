'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import type { PriceRange } from '@/types/properties';

interface PropertyDistributionProps {
  typeDistribution: Record<string, number>;
  operationDistribution: Record<string, number>;
  bedroomsDistribution: Record<string, number>;
  priceRange: PriceRange;
}

const COLORS = ['#29A3C3', '#92E6E6', '#0D4D4D', '#19627D', '#66D9D9'];

const PropertyDistribution = ({
  typeDistribution,
  operationDistribution,
  bedroomsDistribution,
  priceRange,
}: PropertyDistributionProps) => {
  // Transform data for charts
  const typeData = Object.entries(typeDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const operationData = Object.entries(operationDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const bedroomsData = Object.entries(bedroomsDistribution).map(([name, value]) => ({
    name: `${name} Hab`,
    value,
  }));

  return (
    <section className="py-16 bg-midnight-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl"></div>
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
            Distribución de Propiedades
          </motion.h2>
          <motion.p 
            className="text-silver-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Análisis detallado de nuestro inventario de propiedades
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Property Types Chart */}
          <motion.div 
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-6 border border-midnight-700"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-silver-100 mb-6">Tipos de Propiedad</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Operation Types Chart */}
          <motion.div 
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-6 border border-midnight-700"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-silver-100 mb-6">Tipos de Operación</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={operationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {operationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Bedrooms Distribution */}
          <motion.div 
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-6 border border-midnight-700 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-silver-100 mb-6">Distribución por Habitaciones</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bedroomsData}>
                  <XAxis dataKey="name" stroke="#94A3B8" />
                  <YAxis stroke="#94A3B8" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#29A3C3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Price Range Info */}
          <motion.div 
            className="bg-midnight-800/70 backdrop-blur-sm rounded-2xl p-6 border border-midnight-700 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-silver-100 mb-6">Rango de Precios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-midnight-700/50 rounded-xl">
                <p className="text-silver-400 mb-2">Precio Mínimo</p>
                <p className="text-2xl font-bold text-primary-500">
                  {new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                    minimumFractionDigits: 0,
                  }).format(priceRange.min)}
                </p>
              </div>
              <div className="p-4 bg-midnight-700/50 rounded-xl">
                <p className="text-silver-400 mb-2">Precio Máximo</p>
                <p className="text-2xl font-bold text-secondary-400">
                  {new Intl.NumberFormat('es-MX', {
                    style: 'currency',
                    currency: 'MXN',
                    minimumFractionDigits: 0,
                  }).format(priceRange.max)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDistribution; 