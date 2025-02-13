import { PROPERTY_TYPES } from "@/server/data/constants";
import { Property, PropertyFilters } from "@/types";

// Helper function to find property type value from name
function getPropertyTypeValue(typeName: string): string | undefined {
  const type = PROPERTY_TYPES.find(
    (t) =>
      t.name.toLowerCase() === typeName.toLowerCase() ||
      t.value.toLowerCase() === typeName.toLowerCase()
  );
  return type?.value;
}

export function filterProperties(
  properties: Property[],
  filters: Partial<PropertyFilters>
): Property[] {
  return properties.filter((property) => {
    // Property type - exact match required
    if (filters?.propertyType && filters.propertyType.length > 0) {
      const propertyTypeValues = filters.propertyType
        .map((type) => getPropertyTypeValue(type))
        .filter((type): type is string => type !== undefined);

      if (
        propertyTypeValues.length > 0 &&
        !propertyTypeValues.includes(property.propertyType.toLowerCase())
      ) {
        return false;
      }
    }

    // Location - exact matching for all fields
    if (
      filters?.location?.state &&
      filters.location.state.length > 0 &&
      !filters.location.state.includes(property.location.state)
    ) {
      return false;
    }
    if (
      filters?.location?.city &&
      filters.location.city.length > 0 &&
      (!property.location.city ||
        !filters.location.city.includes(property.location.city))
    ) {
      return false;
    }
    if (
      filters?.location?.area &&
      filters.location.area.length > 0 &&
      (!property.location.area ||
        !filters.location.area.includes(property.location.area))
    ) {
      return false;
    }

    // Price range - keep 5% flexibility for negotiation
    const minPrice = filters.minPrice ?? 0;
    const maxPrice = filters.maxPrice ?? Infinity;

    if (property?.price < minPrice * 0.95 || property?.price > maxPrice * 1.05) {
      return false;
    }

    // Features - Exact matching for all features
    if (filters?.features) {
      if (
        typeof filters.features.bedrooms === "number" &&
        (!property.features.bedrooms ||
          property.features.bedrooms !== filters.features.bedrooms)
      ) {
        return false;
      }
      if (
        typeof filters?.features?.bathrooms === "number" &&
        (!property?.features?.bathrooms ||
          property?.features?.bathrooms !== filters?.features?.bathrooms)
      ) {
        return false;
      }
    }

    // Construction size - keep 5% flexibility for measurement variations
    if (
      filters?.features?.constructionSize &&
      property?.features?.constructionSize
    ) {
      const minSize = filters?.features?.constructionSize?.min ?? 0;
      const maxSize = filters?.features?.constructionSize?.max ?? Infinity;

      if (
        property?.features?.constructionSize < minSize * 0.95 ||
        property?.features?.constructionSize > maxSize * 1.05
      ) {
        return false;
      }
    }

    // Lot size - keep 5% flexibility for measurement variations
    if (filters?.features?.lotSize && property?.features?.lotSize) {
      const minLotSize = filters?.features?.lotSize?.min ?? 0;
      const maxLotSize = filters?.features?.lotSize?.max ?? Infinity;

      if (
        property?.features?.lotSize < minLotSize * 0.95 ||
        property?.features?.lotSize > maxLotSize * 1.05
      ) {
        return false;
      }
    }

    // Amenities - exact matching (all requested amenities must be present)
    if (filters?.amenities && filters?.amenities?.length > 0) {
      if (
        !property?.amenities ||
        !filters?.amenities?.every((amenity) =>
          property.amenities.includes(amenity)
        )
      ) {
        return false;
      }
    }

    // Property age - exact matching
    if (typeof filters?.propertyAge === "number") {
      if (property?.propertyAge !== filters?.propertyAge) {
        return false;
      }
    }

    // Maintenance fee - keep 5% flexibility for variations
    if (filters?.maintenanceFee && property?.maintenanceFee) {
      const minFee = filters?.maintenanceFee?.min ?? 0;
      const maxFee = filters?.maintenanceFee?.max ?? Infinity;

      if (
        property?.maintenanceFee < minFee * 0.95 ||
        property?.maintenanceFee > maxFee * 1.05
      ) {
        return false;
      }
    }

    return true;
  });
}

export function sortProperties(
  properties: Property[],
  sortBy?: 'price asc' | 'price desc' | 'age asc' | 'age desc'
): Property[] {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price asc":
        return a.price - b.price;
      case "price desc":
        return b.price - a.price;
      case "age asc":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "age desc":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
}
