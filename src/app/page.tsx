import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import Features from '@/components/layout/Features';
import FeaturedProperties from '@/components/layout/FeaturedProperties';
import Testimonials from '@/components/layout/Testimonials';
import CTA from '@/components/layout/CTA';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <FeaturedProperties />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
} 