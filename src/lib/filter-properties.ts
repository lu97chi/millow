import type { Property } from "@/constants/properties";
import type { PropertyFilters } from "@/store/use-search-store";

export function filterProperties(properties: Property[], filters: PropertyFilters): Property[] {
  return properties.filter(property => {
    // Query text search - more flexible with OR conditions
    if (filters.query) {
      const searchTerms = filters.query.toLowerCase().split(' ');
      const propertyText = `${property.title} ${property.description} ${property.location.state} ${property.location.city} ${property.location.area}`.toLowerCase();
      
      // If any search term matches, include the property
      if (!searchTerms.some(term => propertyText.includes(term))) {
        return false;
      }
    }

    // Property type - OR condition if multiple types selected
    if (filters.propertyType.length > 0 && !filters.propertyType.includes(property.type)) {
      return false;
    }

    // Location - Hierarchical filtering
    if (filters.location.state && property.location.state !== filters.location.state) {
      return false;
    }
    // Only check city if state matches or no state specified
    if (filters.location.city && 
        (!property.location.city || 
         !property.location.city.toLowerCase().includes(filters.location.city.toLowerCase()))) {
      return false;
    }
    // Only check area if city matches or no city specified
    if (filters.location.area && 
        (!property.location.area || 
         !property.location.area.toLowerCase().includes(filters.location.area.toLowerCase()))) {
      return false;
    }

    // Price range - with 10% flexibility
    const minPrice = filters.priceRange.min * 0.9; // 10% below minimum
    const maxPrice = filters.priceRange.max * 1.1; // 10% above maximum
    if (property.price < minPrice || property.price > maxPrice) {
      return false;
    }

    // Features - More flexible matching
    if (filters.features.bedrooms && property.features.bedrooms) {
      // Allow properties with more bedrooms than requested
      if (property.features.bedrooms < filters.features.bedrooms) {
        return false;
      }
    }

    if (filters.features.bathrooms && property.features.bathrooms) {
      // Allow properties with more bathrooms than requested
      if (property.features.bathrooms < filters.features.bathrooms) {
        return false;
      }
    }

    // Construction size - with 10% flexibility
    if (filters.features.constructionSize) {
      const minSize = filters.features.constructionSize.min * 0.9;
      const maxSize = filters.features.constructionSize.max * 1.1;
      
      if (property.features.constructionSize < minSize || 
          property.features.constructionSize > maxSize) {
        return false;
      }
    }

    // Lot size - with 10% flexibility
    if (filters.features.lotSize && property.features.lotSize) {
      const minLotSize = filters.features.lotSize.min * 0.9;
      const maxLotSize = filters.features.lotSize.max * 1.1;
      
      if (property.features.lotSize < minLotSize || 
          property.features.lotSize > maxLotSize) {
        return false;
      }
    }

    // Amenities - More flexible matching
    if (filters.amenities.length > 0) {
      // Match if property has ANY of the requested amenities (OR condition)
      const hasAnyAmenity = filters.amenities.some(amenity => 
        property.amenities.includes(amenity)
      );
      if (!hasAnyAmenity) {
        return false;
      }
    }

    // Property age - with flexibility
    if (filters.propertyAge !== undefined) {
      // Allow properties that are newer than the filter
      if (property.propertyAge > filters.propertyAge * 1.2) { // 20% flexibility
        return false;
      }
    }

    // Maintenance fee - with 15% flexibility
    if (filters.maintenanceFee && property.maintenanceFee) {
      const minFee = filters.maintenanceFee.min * 0.85; // 15% below minimum
      const maxFee = filters.maintenanceFee.max * 1.15; // 15% above maximum
      
      if (property.maintenanceFee < minFee || 
          property.maintenanceFee > maxFee) {
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