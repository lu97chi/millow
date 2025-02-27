'use client';

import { useState, useEffect } from 'react';
import { PropertiesResponse, PropertyFilters, AIQueryResponse, ChatQueryResponse } from '@/types/properties';
import { api } from '@/lib/api-client';
import { extractMessageFromResponse } from '@/contexts/ChatContext';
import { useProperties as usePropertiesContext } from '@/contexts/PropertiesContext';
import { useSession } from '@/contexts/SessionContext';

interface UsePropertiesReturn {
  data: PropertiesResponse | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  setFilters: (newFilters: PropertyFilters) => void;
  queryAI: (query: string) => Promise<void>;
  metadata?: AIQueryResponse['results']['metadata'];
}

// Custom event for property updates
const PROPERTIES_UPDATED_EVENT = 'propertiesUpdated';

export function useProperties(initialFilters?: PropertyFilters): UsePropertiesReturn {
  const [data, setData] = useState<PropertiesResponse | null>(null);
  const [metadata, setMetadata] = useState<AIQueryResponse['results']['metadata']>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<PropertyFilters>(initialFilters || {});
  const { sessionId, setSessionId } = useSession();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.getProperties({
        ...filters,
      });
      setData(response);
      setMetadata(undefined); // Clear metadata when fetching regular data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const queryAI = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.chat.query(query, sessionId);
      
      // Store the sessionId if it's returned from the backend
      if (response.sessionId) {
        setSessionId(response.sessionId);
      }
      
      // Check if there are search results
      if (!response.searchResults || !Array.isArray(response.searchResults.data) || response.searchResults.data.length === 0) {
        // No property results to display
        setData(null);
        setMetadata(undefined);
        return;
      }

      // Create the properties response from the new structure
      const propertiesResponse: PropertiesResponse = {
        properties: response.searchResults.data,
        total: response.searchResults.data.length,
        filters: {},
        explanation: extractMessageFromResponse(response.response)
      };

      // Create metadata in the format expected by the application
      const formattedMetadata: AIQueryResponse['results']['metadata'] = {
        executionTime: response.searchResults.metadata.executionTime,
        query: response.mongoQuery,
        statistics: {
          totalInDatabase: response.searchResults.metadata.statistics.totalInDatabase,
          matchingResults: response.searchResults.metadata.statistics.matchingResults,
          percentageMatch: response.searchResults.metadata.statistics.percentageMatch
        }
      };

      // Update the state
      setData(propertiesResponse);
      setMetadata(formattedMetadata);

      // Dispatch a custom event to notify other components
      if (typeof window !== 'undefined') {
        const event = new CustomEvent(PROPERTIES_UPDATED_EVENT, {
          detail: {
            properties: propertiesResponse,
            metadata: formattedMetadata,
            explanation: extractMessageFromResponse(response.response)
          }
        });
        window.dispatchEvent(event);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred while processing the response'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const updateFilters = (newFilters: PropertyFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    setFilters: updateFilters,
    queryAI,
    metadata
  };
}

// Export the context-based hook with a different name to avoid confusion
export function usePropertiesData() {
  return usePropertiesContext();
} 