import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Property, AIQueryResponse, PropertiesResponse } from '@/types/properties';
import { api } from '@/lib/api-client';
import { AI_RESPONSE_EVENT } from './ChatContext';

interface PropertiesContextType {
  properties: Property[];
  totalProperties: number;
  explanation: string | null;
  metadata: AIQueryResponse['results']['metadata'] | null;
  updateProperties: (response: AIQueryResponse) => void;
  isLoading: boolean;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<AIQueryResponse['results']['metadata'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const updateProperties = (response: AIQueryResponse) => {
    setProperties(response.results.data);
    setTotalProperties(response.results.metadata.statistics.matchingResults);
    setExplanation(response.explanation);
    setMetadata(response.results.metadata);
    
    // Scroll to the properties section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to fetch initial properties
  const fetchInitialProperties = async () => {
    try {
      setIsLoading(true);
      const response = await api.getProperties();
      setProperties(response.properties);
      setTotalProperties(response.total);
      setExplanation(response.explanation || null);
      setMetadata(null);
    } catch (error) {
      console.error('Error fetching initial properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Listen for AI response events from ChatContext
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleAIResponse = (event: CustomEvent<AIQueryResponse>) => {
        updateProperties(event.detail);
      };

      window.addEventListener(AI_RESPONSE_EVENT, handleAIResponse as EventListener);
      
      return () => {
        window.removeEventListener(AI_RESPONSE_EVENT, handleAIResponse as EventListener);
      };
    }
  }, []);

  // Fetch initial properties on mount
  useEffect(() => {
    fetchInitialProperties();
  }, []);

  return (
    <PropertiesContext.Provider 
      value={{
        properties,
        totalProperties,
        explanation,
        metadata,
        updateProperties,
        isLoading,
      }}
    >
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
} 