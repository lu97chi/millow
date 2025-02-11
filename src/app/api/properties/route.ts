import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "@/server/services/property-service";

export async function GET(request: NextRequest) {
  try {
    const propertyService = PropertyService.getInstance();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const excludeId = searchParams.get("excludeId");

    // Return a single property by ID
    if (id) {
      const property = await propertyService.getPropertyById(id);
      if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }
      return NextResponse.json(property);
    }

    // Get filter parameters
    const filters = {
      propertyType: searchParams.getAll("propertyType"),
      minPrice: Number(searchParams.get("priceMin")) || undefined,
      maxPrice: Number(searchParams.get("priceMax")) || undefined,
      minSize: Number(searchParams.get("constructionSizeMin")) || undefined,
      maxSize: Number(searchParams.get("constructionSizeMax")) || undefined,
      bedrooms: Number(searchParams.get("beds")) || undefined,
      bathrooms: Number(searchParams.get("baths")) || undefined,
      amenities: searchParams.getAll("amenities"),
      state: searchParams.get("state") || undefined,
      city: searchParams.get("city") || undefined,
      area: searchParams.get("area") || undefined,
      propertyAge: Number(searchParams.get("propertyAge")) || undefined
    };

    console.log('API Received filters:', filters);

    // Get properties with filters
    let properties = await propertyService.getProperties(filters);

    console.log('API Total properties after filtering:', properties.length);

    // Exclude specific property if requested
    if (excludeId) {
      properties = properties.filter(p => p.id !== excludeId);
    }

    // Get pagination parameters
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // Get paginated results
    const paginatedProperties = properties.slice(startIndex, endIndex);

    return NextResponse.json({
      properties: paginatedProperties,
      total: properties.length,
      filters: filters
    });
  } catch (error) {
    console.error("Error in properties API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 