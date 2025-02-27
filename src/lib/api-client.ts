import { HomepageResponse } from '@/types/home';
import { PropertiesResponse, PropertyFilters, AIQueryResponse, Property, ChatQueryResponse } from '@/types/properties';

// Chat types
interface QueryResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  metadata: {
    executionTime: number;
    query: any;
    sort?: Record<string, 1 | -1>;
    projection?: Record<string, 1 | 0>;
    statistics: {
      totalInDatabase: number;
      matchingResults: number;
      percentageMatch: number;
      averagePrice?: number;
      priceRange?: {
        min: number;
        max: number;
      };
      propertyTypes?: Record<string, number>;
      operationTypes?: Record<string, number>;
      citiesDistribution?: Record<string, number>;
    };
  };
} 

// Updated ChatResponse to match the new structure
interface ChatResponse {
  sessionId: string;
  response: string;
  searchResults: {
    data: Property[];
    metadata: {
      executionTime: number;
      statistics: {
        totalInDatabase: number;
        matchingResults: number;
        percentageMatch: number;
      }
    }
  };
  mongoQuery: any;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'APIError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new APIError(
      errorData?.message || 'An error occurred while fetching the data.',
      response.status,
      errorData
    );
  }

  return response.json();
}

async function fetchWithConfig(
  endpoint: string,
  config: RequestInit = {},
  isServer = false
): Promise<Response> {
  const defaultConfig: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...(isServer ? { cache: 'no-store' } : {}),
  };

  const mergedConfig = {
    ...defaultConfig,
    ...config,
    headers: {
      ...defaultConfig.headers,
      ...config.headers,
    },
  };

  const url = isServer 
    ? `${process.env.API_URL || API_BASE_URL}${endpoint}`
    : `${API_BASE_URL}${endpoint}`;

  return fetch(url, mergedConfig);
}

export const apiClient = {
  async get<T>(endpoint: string, config: RequestInit = {}, isServer = false): Promise<T> {
    const response = await fetchWithConfig(endpoint, {
      ...config,
      method: 'GET',
    }, isServer);
    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data: any, config: RequestInit = {}, isServer = false): Promise<T> {
    const response = await fetchWithConfig(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    }, isServer);
    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, data: any, config: RequestInit = {}, isServer = false): Promise<T> {
    const response = await fetchWithConfig(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    }, isServer);
    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string, config: RequestInit = {}, isServer = false): Promise<T> {
    const response = await fetchWithConfig(endpoint, {
      ...config,
      method: 'DELETE',
    }, isServer);
    return handleResponse<T>(response);
  },
};

// API endpoints
export const endpoints = {
  homepage: '/properties/homepage',
  properties: '/properties',
  property: (id: string) => `/properties/${id}`,
  chat: {
    query: '/query'
  }
} as const;

// Type-safe API functions
export const api = {
  getHomepage: (isServer = false) => apiClient.get<HomepageResponse>(endpoints.homepage, {}, isServer),
  getProperties: (filters?: PropertyFilters, isServer = false) => {
    const queryString = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
    return apiClient.get<PropertiesResponse>(`${endpoints.properties}${queryString}`, {}, isServer);
  },
  getProperty: (id: string, isServer = false) => apiClient.get<Property>(endpoints.property(id), {}, isServer),
  queryProperties: (query: string) => apiClient.post<AIQueryResponse>(`${endpoints.properties}/query`, { query }),
  chat: {
    query: (message: string, sessionId?: string) => 
      apiClient.post<ChatQueryResponse>(endpoints.chat.query, { 
        message, 
        sessionId 
      })
  }
} as const; 