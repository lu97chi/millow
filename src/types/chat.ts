import type { 
  PropertyTypeName, 
  OperationType, 
  PropertyFeatures, 
  Amenity 
} from "./property";
import { PropertyFilters } from "./property";

export interface ChatMessage {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface ChatResponseData {
  message: string;
  type?: 'propertyType' | 'operationType' | 'location' | 'priceRange' | 'features' | 'amenities' | 'other';
  filters?: {
    propertyType?: PropertyTypeName;
    operationType?: OperationType;
    location?: {
      state?: string;
      city?: string;
      area?: string;
    };
    priceRange?: {
      min?: number;
      max?: number;
    };
    features?: Partial<PropertyFeatures>;
    amenities?: Amenity[];
  };
}