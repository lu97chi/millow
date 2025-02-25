'use client';

import dynamic from 'next/dynamic';

// Dynamic imports to prevent server/client mismatch
const Navbar = dynamic(() => import('@/components/layout/Navbar'), { ssr: false });
const Hero = dynamic(() => import('@/components/layout/Hero'), { ssr: false });
const Features = dynamic(() => import('@/components/layout/Features'), { ssr: false });
const FeaturedProperties = dynamic(() => import('@/components/layout/FeaturedProperties'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/layout/Testimonials'), { ssr: false });
const CTA = dynamic(() => import('@/components/layout/CTA'), { ssr: false });
const Footer = dynamic(() => import('@/components/layout/Footer'), { ssr: false });

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