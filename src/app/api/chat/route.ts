import { NextResponse } from "next/server";
import { generateChatResponse } from "@/lib/agent/openai";
import { z } from "zod";

// Validation schemas
const PriceRangeSchema = z
  .object({
    min: z.string().nullable().optional(),
    max: z.string().nullable().optional(),
  })
  .optional();

const LocationSchema = z
  .object({
    state: z.array(z.string()).nullable().optional(),
    city: z.array(z.string()).nullable().optional(),
    area: z.array(z.string()).nullable().optional(),
    address: z.string().nullable().optional(),
    coordinates: z
      .object({
        lat: z.string().nullable().optional(),
        lng: z.string().nullable().optional(),
      })
      .nullable()
      .optional(),
  })
  .optional();

const SizeRangeSchema = z
  .object({
    min: z.string().nullable().optional(),
    max: z.string().nullable().optional(),
  })
  .optional();

const FeaturesSchema = z
  .object({
    bedrooms: z.string().nullable().optional(),
    bathrooms: z.string().nullable().optional(),
    constructionSize: SizeRangeSchema.nullable().optional(),
    lotSize: SizeRangeSchema.nullable().optional(),
    parking: z.string().nullable().optional(),
    floors: z.string().nullable().optional(),
  })
  .optional();

const FiltersSchema = z
  .object({
    id: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    propertyType: z.array(z.string()).nullable().optional(),
    operationType: z.array(z.string()).nullable().optional(),
    type: z.array(z.string()).nullable().optional(),
    price: z.string().nullable().optional(),
    minPrice: z.string().nullable().optional(),
    maxPrice: z.string().nullable().optional(),
    location: LocationSchema.nullable().optional(),
    features: FeaturesSchema.nullable().optional(),
    amenities: z.array(z.string()).nullable().optional(),
    propertyAge: z.string().nullable().optional(),
    maintenanceFee: PriceRangeSchema.nullable().optional(),
    status: z.array(z.string()).nullable().optional(),
    // viewMode: z.enum(['grid', 'list']).optional(),
    // sortBy: z.enum(['price asc', 'price desc', 'age asc', 'age desc']).optional()
  })
  .optional();

const ChatResponseSchema = z.object({
  message: z.string(),
  filters: FiltersSchema,
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error("OpenAI API key is not configured");
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages, propertyContext } = body;

    // If there's a property context and the last message is from the user,
    // append the context to the message
    if (
      propertyContext &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user"
    ) {
      const lastMessage = messages[messages.length - 1];
      lastMessage.content = `${
        lastMessage.content
      }\nContexto de la propiedad: ${JSON.stringify(propertyContext)}`;
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required and must be an array" },
        { status: 400 }
      );
    }

    // Validate message format
    const isValidMessage = messages.every(
      (msg) =>
        msg &&
        typeof msg === "object" &&
        (msg.role === "user" || msg.role === "assistant") &&
        typeof msg.content === "string"
    );

    if (!isValidMessage) {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    const response = await generateChatResponse(messages);

    if (!response.message) {
      throw new Error("Empty response from chat generation");
    }

    // Validate response against schema
    const validationResult = ChatResponseSchema.safeParse(response);

    if (!validationResult.success) {
      console.error("Invalid response format:", validationResult.error);
      throw new Error("Invalid response format from chat generation");
    }

    // Verify if filters object is an empty object or undefined, if so remove it from the response
    const payload = validationResult.data;
    if (payload.filters && Object.keys(payload.filters).length === 0) {
      delete payload.filters;
    }

    return NextResponse.json(payload);
  } catch (error) {
    console.error("Error in chat API:", error);

    // Provide more specific error messages
    let errorMessage = "Internal server error";
    const statusCode = 500;

    if (error instanceof Error) {
      console.error("Error details:", error.message);
      if (error.message.includes("API key")) {
        errorMessage = "OpenAI API key configuration error";
      } else if (
        error.message.includes("parse") ||
        error.message.includes("format")
      ) {
        errorMessage = "Error processing AI response";
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        message:
          "Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo en unos momentos.",
      },
      { status: statusCode }
    );
  }
}
