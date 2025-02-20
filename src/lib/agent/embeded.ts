// services/propertyService.js
import OpenAI from "openai";
import { SMALL_SAMPLE } from "@/server/data/properties/small-sample";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  ...(process.env.OPENAI_ORGANIZATION_ID && {
    organization: process.env.OPENAI_ORGANIZATION_ID,
  }),
});

// Environment variables for Pinecone
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_URL = process.env.PINECONE_INDEX_URL;

interface PropertyVector {
  id: string;
  values: number[];
  metadata: {
    title?: string;
    description?: string;
    location_state?: string;
    location_city?: string;
    location_area?: string;
    location_address?: string;
    location_lat?: number;
    location_lng?: number;
    price?: number;
    type?: string;
    propertyType?: string;
    operationType?: string;
    bedrooms?: number;
    bathrooms?: number;
    constructionSize?: number;
    lotSize?: number;
    parking?: number;
    floors?: number;
    amenities?: string[];
    status?: string;
    propertyAge?: number;
    maintenanceFee?: number;
  };
}

interface PineconeMatch {
  id: string;
  score: number;
  metadata?: PropertyVector['metadata'];
}

interface PineconeResponse {
  matches: PineconeMatch[];
}

/**
 * Upserts property embeddings into Pinecone using its REST API.
 * For each property, this function generates an embedding using OpenAI,
 * then upserts the vector (with metadata) to your Pinecone index.
 */
export async function upsertPropertyEmbeddings() {
  try {
    const vectors: PropertyVector[] = [];

    for (const property of SMALL_SAMPLE) {
      // Create a more structured and meaningful text input for embeddings
      const textInputParts = [
        // Core property information with explicit labels
        `This is a ${property.propertyType || ''} ${property.type || ''} for ${property.operationType || ''}`,
        property.title && `Property Name: ${property.title}`,
        property.description && `Description: ${property.description}`,
        
        // Location information
        property.location && `Located in ${property.location.state}, ${property.location.city}${property.location.area ? `, specifically in the ${property.location.area} area` : ''}`,
        property.location?.address && `Address: ${property.location.address}`,
        
        // Detailed features with explicit labels
        property.features && 'Property Features:',
        property.features?.bedrooms !== null && `- ${property.features.bedrooms} bedrooms`,
        property.features?.bathrooms !== null && `- ${property.features.bathrooms} bathrooms`,
        property.features?.constructionSize && `- ${property.features.constructionSize} square meters of construction`,
        property.features?.lotSize && `- ${property.features.lotSize} square meters of lot size`,
        property.features?.parking !== null && `- Parking spaces: ${property.features.parking}`,
        property.features?.floors !== null && `- Number of floors: ${property.features.floors}`,
        
        // Price and financial information
        property.price && `Price: ${property.price} ${property.maintenanceFee ? `with maintenance fee of ${property.maintenanceFee}` : ''}`,
        
        // Additional characteristics
        property.amenities?.length > 0 && `Property amenities include: ${property.amenities.join(", ")}`,
        property.status && `Current status: ${property.status}`,
        property.propertyAge && `Property age: ${property.propertyAge} years old`,
        
        // Search-optimized summary
        `This property can be described as: ${[
          property.propertyType,
          property.type,
          property.features?.bedrooms && `${property.features.bedrooms} bedroom`,
          property.location?.city && `in ${property.location.city}`,
          property.location?.area && `${property.location.area}`,
          property.amenities?.length > 0 && `with ${property.amenities.join(" and ")}`,
        ].filter(Boolean).join(" ")}`
      ].filter(Boolean).join("\n");

      // Request an embedding for the text input from OpenAI.
      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: textInputParts,
      });

      const [{ embedding }] = embeddingResponse.data;

      // Create metadata object with only non-null/non-empty values
      const metadata: PropertyVector['metadata'] = {};

      // Add string fields only if they're non-empty
      if (property.title?.trim()) metadata.title = property.title;
      if (property.description?.trim()) metadata.description = property.description;
      if (property.location?.state?.trim()) metadata.location_state = property.location.state;
      if (property.location?.city?.trim()) metadata.location_city = property.location.city;
      if (property.location?.area?.trim()) metadata.location_area = property.location.area;
      if (property.location?.address?.trim()) metadata.location_address = property.location.address;
      if (property.type?.trim()) metadata.type = property.type;
      if (property.propertyType?.trim()) metadata.propertyType = property.propertyType;
      if (property.operationType?.trim()) metadata.operationType = property.operationType;
      if (property.status?.trim()) metadata.status = property.status;

      // Add numeric fields only if they're non-null and valid
      if (property.location?.coordinates?.lat) metadata.location_lat = property.location.coordinates.lat;
      if (property.location?.coordinates?.lng) metadata.location_lng = property.location.coordinates.lng;
      if (property.price) metadata.price = property.price;
      if (property.propertyAge) metadata.propertyAge = property.propertyAge;
      if (property.maintenanceFee) metadata.maintenanceFee = property.maintenanceFee;

      // Add feature fields only if they're non-null
      if (property.features.bedrooms !== null && property.features.bedrooms !== undefined) {
        metadata.bedrooms = property.features.bedrooms;
      }
      if (property.features.bathrooms !== null && property.features.bathrooms !== undefined) {
        metadata.bathrooms = property.features.bathrooms;
      }
      if (property.features.constructionSize !== null && property.features.constructionSize !== undefined) {
        metadata.constructionSize = property.features.constructionSize;
      }
      if (property.features.lotSize !== null && property.features.lotSize !== undefined) {
        metadata.lotSize = property.features.lotSize;
      }
      if (property.features.parking !== null && property.features.parking !== undefined) {
        metadata.parking = property.features.parking;
      }
      if (property.features.floors !== null && property.features.floors !== undefined) {
        metadata.floors = property.features.floors;
      }

      // Add array fields only if they're non-empty
      if (property.amenities?.length > 0) {
        metadata.amenities = property.amenities;
      }

      vectors.push({
        id: property.id.toString(),
        values: embedding,
        metadata,
      });
    }

    // Batch upsert vectors into Pinecone (maximum of 100 vectors per request)
    const BATCH_SIZE = 100;
    for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
      const batch = vectors.slice(i, i + BATCH_SIZE);
      const upsertResponse = await fetch(`${PINECONE_INDEX_URL}/vectors/upsert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": PINECONE_API_KEY || "",
        },
        body: JSON.stringify({ vectors: batch }),
      });

      const responseData = await upsertResponse.json();
      console.log(`Upsert response for batch ${i / BATCH_SIZE + 1}:`, responseData);
    }

    return { message: "Embeddings generated and upserted successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error upserting property embeddings:", error.message);
    } else {
      console.error("Unknown error upserting property embeddings");
    }
    throw new Error("Failed to upsert property embeddings");
  }
}

/**
 * Queries properties by converting a natural language query into an embedding
 * and performing a similarity search using Pinecone's REST API.
 *
 * @param {string} query - The natural language query (e.g., "I want a house close to a hospital or dentist").
 * @returns {Promise<string[]>} Array of matching property IDs.
 */
export async function queryProperties(query: string): Promise<string[]> {
  try {
    // Validate and enhance the query
    if (!query.trim()) {
      console.error('❌ Empty query provided');
      return [];
    }

    // Check if the query is too simple or unrelated to properties
    const simpleWords = ['hello', 'hi', 'test', 'hey'];
    if (simpleWords.includes(query.toLowerCase().trim())) {
      console.error('❌ Query is too simple or unrelated to property search');
      return [];
    }

    // Enhance the query to be more property-focused
    const enhancedQuery = `Find properties matching the following criteria: ${query}. Consider property type, location, features, amenities, and price range.`;
    
    console.log('\n🔍 Processing search query:', query);
    console.log('Enhanced query:', enhancedQuery);

    // Generate an embedding for the enhanced query
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: enhancedQuery,
    });
    const [{ embedding: queryEmbedding }] = embeddingResponse.data;

    // Query Pinecone using the REST API
    const queryResponse = await fetch(`${PINECONE_INDEX_URL}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": PINECONE_API_KEY || "",
      },
      body: JSON.stringify({
        vector: queryEmbedding,
        topK: 10,
        includeMetadata: true,
        minScore: 0.95, // Requiring 95% similarity for high confidence matches
      }),
    });

    const responseData = (await queryResponse.json()) as PineconeResponse;
    
    if (!responseData.matches || !Array.isArray(responseData.matches)) {
      console.error('❌ No matches found or invalid response format');
      return [];
    }

    // Log each match with its score and relevant metadata
    console.log('\n📊 Search Results');
    console.log('================');
    
    if (responseData.matches.length === 0) {
      console.log('No properties found matching your criteria.');
      return [];
    }

    responseData.matches.forEach((match) => {
      const similarityPercentage = (match.score * 100).toFixed(2);
      const isHighConfidence = match.score >= 0.95;
      
      console.log(`\n${isHighConfidence ? '✅' : '❌'} Property ID: ${match.id}`);
      console.log(`Confidence: ${similarityPercentage}% ${isHighConfidence ? '(High Confidence Match)' : '(Below Required 95% Threshold)'}`);
      
      if (match.metadata) {
        console.log('Property Details:');
        console.log(`📍 Location: ${[
          match.metadata.location_city,
          match.metadata.location_area
        ].filter(Boolean).join(', ')}`);
        console.log(`🏠 Type: ${match.metadata.propertyType || 'N/A'}`);
        console.log(`🛏️ Bedrooms: ${match.metadata.bedrooms || 'N/A'}`);
        console.log(`💰 Price: ${match.metadata.price ? `$${match.metadata.price.toLocaleString()}` : 'N/A'}`);
        if (match.metadata.amenities?.length) {
          console.log(`✨ Amenities: ${match.metadata.amenities.join(', ')}`);
        }

        // Show why this property matched
        console.log('\nMatch Analysis:');
        const matchingFeatures = [];
        if (query.toLowerCase().includes('bedroom') && match.metadata.bedrooms) {
          matchingFeatures.push(`✓ Has ${match.metadata.bedrooms} bedrooms`);
        }
        if (query.toLowerCase().includes(match.metadata.location_city?.toLowerCase() || '')) {
          matchingFeatures.push(`✓ Located in ${match.metadata.location_city}`);
        }
        if (match.metadata.amenities?.some(amenity => 
          query.toLowerCase().includes(amenity.toLowerCase())
        )) {
          matchingFeatures.push(`✓ Has requested amenities`);
        }
        if (matchingFeatures.length > 0) {
          console.log(matchingFeatures.join('\n'));
        }
      }
    });

    // Filter matches with very high similarity (95% or higher)
    const highConfidenceMatches = responseData.matches
      .filter((match) => {
        const similarityPercentage = match.score * 100;
        const isHighConfidence = match.score >= 0.95;
        
        if (!isHighConfidence) {
          console.log(`\n❌ Filtered out property ${match.id} - Confidence too low: ${similarityPercentage.toFixed(2)}%`);
        }
        
        return isHighConfidence;
      });

    console.log(`\n📈 Results Summary`);
    console.log(`==================`);
    console.log(`Total properties checked: ${responseData.matches.length}`);
    console.log(`High confidence matches (>95%): ${highConfidenceMatches.length}`);
    console.log(`Properties filtered out: ${responseData.matches.length - highConfidenceMatches.length}`);

    // Return just the IDs of the high confidence matches
    return highConfidenceMatches.map(match => match.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error querying properties:", error.message);
    } else {
      console.error("❌ Unknown error querying properties");
    }
    throw new Error("Failed to query properties");
  }
}
