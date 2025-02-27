import { useState, useEffect } from 'react';
import { HomepageResponse } from '@/types/home';
import { api } from '@/lib/api-client';

interface UseHomepageReturn {
  data: HomepageResponse | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useHomepage(): UseHomepageReturn {
  const [data, setData] = useState<HomepageResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getHomepage();
      setData(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
} 