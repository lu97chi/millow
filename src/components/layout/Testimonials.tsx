'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Maria Rodriguez',
    role: 'Homeowner',
    quote: 'TuHogar made finding our dream home so easy. Their personalized approach and attention to detail exceeded our expectations. We couldn\'t be happier with our new home!',
    image: '/images/testimonial-1.jpg'
  },
  {
    id: 2,
    name: 'Carlos Mendez',
    role: 'First-time Buyer',
    quote: 'As a first-time homebuyer, I was nervous about the process. The team at TuHogar guided me every step of the way, making it stress-free and enjoyable.',
    image: '/images/testimonial-2.jpg'
  },
  {
    id: 3,
    name: 'Sofia Garcia',
    role: 'Property Investor',
    quote: 'I\'ve worked with many real estate companies, but TuHogar stands out for their professionalism and market knowledge. They helped me find properties with great investment potential.',
    image: '/images/testimonial-3.jpg'
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding home-gradient">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            className="inline-block text-primary font-medium mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What Our <span className="text-primary">Clients</span> Say
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Hear from our satisfied clients about their experience finding their perfect home with TuHogar
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Testimonial Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 md:-ml-8 z-10 hidden md:block">
            <button 
              onClick={prevTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 md:-mr-8 z-10 hidden md:block">
            <button 
              onClick={nextTestimonial}
              className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Testimonials */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <motion.div 
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden flex-shrink-0 border-4 border-secondary">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <Quote className="text-primary/20 mb-4" size={48} />
                        <p className="text-gray-700 text-lg md:text-xl italic mb-8">"{testimonial.quote}"</p>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                          <p className="text-primary">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Navigation Dots */}
          <div className="flex justify-center space-x-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 