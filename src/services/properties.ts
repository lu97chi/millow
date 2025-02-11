import type { Property } from "@/server/models/property";

export interface PaginationData {
  total: number;
  totalPages: number;
  currentPage: number;
  hasMore: boolean;
  limit: number;
}

export interface FetchPropertiesParams {
  type?: string[];
  minPrice?: number;
  maxPrice?: number;
  state?: string;
  city?: string;
  area?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  propertyAge?: number;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface PropertiesResponse {
  properties: Property[];
  total: number;
}

export async function fetchProperties(params: FetchPropertiesParams = {}): Promise<PropertiesResponse> {
  const searchParams = new URLSearchParams();

  // Add each parameter to the search params if it exists
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, v));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const response = await fetch(`/api/properties?${searchParams.toString()}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
}

export async function fetchPropertyById(id: string): Promise<Property> {
  const response = await fetch(`/api/properties?id=${id}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
}

export async function fetchSimilarProperties(
  propertyId: string,
  type: string,
  price: number,
  limit: number = 3
): Promise<Property[]> {
  const response = await fetch(
    `/api/properties?type=${type}&limit=${limit}&excludeId=${propertyId}`
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch similar properties");
  }

  const data = await response.json();
  return data.properties;
} 