import type { PropertyFilters } from "@/store/use-search-store";
import { PROPERTY_TYPES } from "@/server/data/constants";
import { Property } from "@/types";

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
  filters: PropertyFilters
): Property[] {
  return properties.filter((property) => {
    // Query text search - must match ALL terms (AND condition)
    if (filters.query) {
      const searchTerms = filters.query.toLowerCase().split(" ");
      const propertyText =
        `${property.title} ${property.description} ${property.location.state} ${property.location.city} ${property.location.area}`.toLowerCase();

      // All search terms must match
      if (!searchTerms.every((term) => propertyText.includes(term))) {
        return false;
      }
    }

    // Property type - exact match required
    if (filters.propertyType.length > 0) {
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
      filters.location.state &&
      property.location.state !== filters.location.state
    ) {
      return false;
    }
    if (
      filters.location.city &&
      (!property.location.city ||
        property.location.city.toLowerCase() !==
          filters.location.city.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.location.area &&
      (!property.location.area ||
        property.location.area.toLowerCase() !==
          filters.location.area.toLowerCase())
    ) {
      return false;
    }

    // Price range - keep 5% flexibility for negotiation
    if (
      typeof filters.priceRange?.min === "number" ||
      typeof filters.priceRange?.max === "number"
    ) {
      const minPrice =
        typeof filters.priceRange?.min === "number"
          ? filters.priceRange.min * 0.95
          : 0; // 5% below minimum
      const maxPrice =
        typeof filters.priceRange?.max === "number"
          ? filters.priceRange.max * 1.05
          : Infinity; // 5% above maximum
      if (property.price < minPrice || property.price > maxPrice) {
        return false;
      }
    }

    // Features - Exact matching for all features
    if (filters.features) {
      if (
        typeof filters.features.bedrooms === "number" &&
        (!property.features.bedrooms ||
          property.features.bedrooms !== filters.features.bedrooms)
      ) {
        return false;
      }
      if (
        typeof filters.features.bathrooms === "number" &&
        (!property.features.bathrooms ||
          property.features.bathrooms !== filters.features.bathrooms)
      ) {
        return false;
      }
    }

    // Construction size - keep 5% flexibility for measurement variations
    if (
      filters.features.constructionSize &&
      property.features.constructionSize
    ) {
      const minSize =
        typeof filters.features.constructionSize.min === "number"
          ? filters.features.constructionSize.min * 0.95
          : 0;
      const maxSize =
        typeof filters.features.constructionSize.max === "number"
          ? filters.features.constructionSize.max * 1.05
          : Infinity;

      if (
        property.features.constructionSize < minSize ||
        property.features.constructionSize > maxSize
      ) {
        return false;
      }
    }

    // Lot size - keep 5% flexibility for measurement variations
    if (filters.features.lotSize && property.features.lotSize) {
      const minLotSize =
        typeof filters.features.lotSize.min === "number"
          ? filters.features.lotSize.min * 0.95
          : 0;
      const maxLotSize =
        typeof filters.features.lotSize.max === "number"
          ? filters.features.lotSize.max * 1.05
          : Infinity;

      if (
        property.features.lotSize < minLotSize ||
        property.features.lotSize > maxLotSize
      ) {
        return false;
      }
    }

    // Amenities - exact matching (all requested amenities must be present)
    if (filters.amenities && filters.amenities.length > 0) {
      if (
        !property.amenities ||
        !filters.amenities.every((amenity) =>
          property.amenities.includes(amenity)
        )
      ) {
        return false;
      }
    }

    // Property age - exact matching
    if (typeof filters.propertyAge === "number") {
      if (property.propertyAge !== filters.propertyAge) {
        return false;
      }
    }

    // Maintenance fee - keep 5% flexibility for variations
    if (filters.maintenanceFee && property.maintenanceFee) {
      const minFee =
        typeof filters.maintenanceFee.min === "number"
          ? filters.maintenanceFee.min * 0.95
          : 0;
      const maxFee =
        typeof filters.maintenanceFee.max === "number"
          ? filters.maintenanceFee.max * 1.05
          : Infinity;

      if (
        property.maintenanceFee < minFee ||
        property.maintenanceFee > maxFee
      ) {
        return false;
      }
    }

    return true;
  });
}

export function sortProperties(
  properties: Property[],
  sortBy: PropertyFilters["sortBy"]
): Property[] {
  return [...properties].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "recent":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });
}
