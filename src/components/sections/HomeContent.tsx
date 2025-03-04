'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { api } from '@/lib/api-client';
import { Loader2 } from 'lucide-react';
import type { HomepageResponse } from '@/types/home';

// Dynamic imports with loading states
const Hero = dynamic(() => import('@/components/layout/Hero'), {
  loading: () => <div className="min-h-screen bg-midnight animate-pulse" />
});

const Features = dynamic(() => import('@/components/layout/Features'), {
  loading: () => <div className="h-96 bg-midnight-900 animate-pulse" />
});

const FeaturedProperties = dynamic(() => import('@/components/layout/FeaturedProperties'), {
  loading: () => <div className="h-96 bg-midnight-900 animate-pulse" />
});

const Testimonials = dynamic(() => import('@/components/layout/Testimonials'), {
  loading: () => <div className="h-96 bg-midnight-900 animate-pulse" />
});

const CTA = dynamic(() => import('@/components/layout/CTA'), {
  loading: () => <div className="h-96 bg-midnight-900 animate-pulse" />
});

const Statistics = dynamic(() => import('@/components/sections/Statistics'), {
  loading: () => <div className="h-96 bg-midnight-900 animate-pulse" />
});

export default function HomeContent() {
  const [homeData, setHomeData] = useState<HomepageResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await api.getHomepage();
        setHomeData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch home data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-midnight">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !homeData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-midnight">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-midnight animate-pulse" />}>
        <Hero />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-midnight-900 animate-pulse" />}>
        <Statistics statistics={homeData.statistics} />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-midnight-900 animate-pulse" />}>
        <Features />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-midnight-900 animate-pulse" />}>
        <FeaturedProperties />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-midnight-900 animate-pulse" />}>
        <Testimonials />
      </Suspense>
      
      <Suspense fallback={<div className="h-96 bg-midnight-900 animate-pulse" />}>
        <CTA />
      </Suspense>
    </>
  );
} 