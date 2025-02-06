import type { Property } from "@/constants/properties";
import type { PropertyFilters } from "@/store/use-search-store";

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter(property => {
    // Query text search
    if (filters.query) {
      const searchText = `${property.title} ${property.description} ${property.location.state} ${property.location.city} ${property.location.area}`.toLowerCase();
      if (!searchText.includes(filters.query.toLowerCase())) {
        return false;
      }
    }

    // Property type
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) {
      return false;
    }

    // Location
    if (filters.location.state && property.location.state !== filters.location.state) {
      return false;
    }
    if (filters.location.city && property.location.city !== filters.location.city) {
      return false;
    }
    if (filters.location.area && property.location.area !== filters.location.area) {
      return false;
    }

    // Price range
    if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
      return false;
    }

    // Features
    if (filters.features.bedrooms && (!property.features.bedrooms || property.features.bedrooms < filters.features.bedrooms)) {
      return false;
    }
    if (filters.features.bathrooms && (!property.features.bathrooms || property.features.bathrooms < filters.features.bathrooms)) {
      return false;
    }

    // Construction size
    if (filters.features.constructionSize) {
      if (property.features.constructionSize < filters.features.constructionSize.min || 
          property.features.constructionSize > filters.features.constructionSize.max) {
        return false;
      }
    }

    // Lot size
    if (filters.features.lotSize && property.features.lotSize) {
      if (property.features.lotSize < filters.features.lotSize.min || 
          property.features.lotSize > filters.features.lotSize.max) {
        return false;
      }
    }

    // Amenities
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAllAmenities) {
        return false;
      }
    }

    // Property age
    if (filters.propertyAge !== undefined && property.propertyAge > filters.propertyAge) {
      return false;
    }

    // Maintenance fee
    if (filters.maintenanceFee && property.maintenanceFee) {
      if (property.maintenanceFee < filters.maintenanceFee.min || 
          property.maintenanceFee > filters.maintenanceFee.max) {
        return false;
      }
    }

    return true;
  });
}

export function sortProperties(properties: Property[], sortBy: PropertyFilters['sortBy']): Property[] {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
} 