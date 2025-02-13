import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "@/server/services/property-service";
import { PropertyTypeName, OperationType, Amenity } from "@/types";

export async function GET(request: NextRequest) {
  try {
    console.log('API Route: Received request');
    const propertyService = PropertyService.getInstance();
    const { searchParams } = new URL(request.url);
    
    // Log all search parameters
    console.log('API Route: Search params:', Object.fromEntries(searchParams.entries()));
    
    const id = searchParams.get("id");
    const excludeId = searchParams.get("excludeId");

    // Return a single property by ID
    if (id) {
      console.log('API Route: Fetching single property by ID:', id);
      const property = await propertyService.getPropertyById(id);
      if (!property) {
        return NextResponse.json({ error: "Property not found" }, { status: 404 });
      }
      return NextResponse.json(property);
    }

    // Get filter parameters
    const filters = {
      propertyType: searchParams.get("propertyType")?.split(",").filter(Boolean) as PropertyTypeName[],
      operationType: searchParams.get("operationType")?.split(",").filter(Boolean) as OperationType[],
      price: searchParams.get("price") ? Number(searchParams.get("price")) : undefined,
      location: {
        state: searchParams.get("state") ? [searchParams.get("state")!] : undefined,
        city: searchParams.get("city") ? [searchParams.get("city")!] : undefined,
        area: searchParams.get("area") ? [searchParams.get("area")!] : undefined,
      },
      features: {
        bedrooms: searchParams.get("bedrooms") ? Number(searchParams.get("bedrooms")) : undefined,
        bathrooms: searchParams.get("bathrooms") ? Number(searchParams.get("bathrooms")) : undefined,
        constructionSize: searchParams.get("constructionSize") ? 
          { min: Number(searchParams.get("constructionSize")), max: Number(searchParams.get("constructionSize")) } : 
          undefined,
        lotSize: searchParams.get("lotSize") ? 
          { min: Number(searchParams.get("lotSize")), max: Number(searchParams.get("lotSize")) } : 
          undefined,
        parking: searchParams.get("parking") ? Number(searchParams.get("parking")) : undefined,
        floors: searchParams.get("floors") ? Number(searchParams.get("floors")) : undefined,
      },
      amenities: searchParams.get("amenities")?.split(",").filter(Boolean) as Amenity[],
      maintenanceFee: searchParams.get("maintenanceFee") ? 
        { min: Number(searchParams.get("maintenanceFee")), max: Number(searchParams.get("maintenanceFee")) } : 
        undefined,
    };

    console.log('API Route: Applying filters:', filters);

    // Get properties with filters
    let properties = await propertyService.getProperties(filters);

    console.log('API Route: Found properties count:', properties.length);

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
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 