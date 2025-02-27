import Hero from '@/components/layout/Hero';
import FeaturedProperties from '@/components/layout/FeaturedProperties';
import Testimonials from '@/components/layout/Testimonials';
import WhyChooseUs from '@/components/layout/WhyChooseUs';
import CallToAction from '@/components/layout/CallToAction';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
    </main>
  );
} 