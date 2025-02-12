import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';
import { z } from 'zod';

// Validation schemas
const PriceRangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional()
}).optional();

const LocationSchema = z.object({
  state: z.string().optional(),
  city: z.string().optional(),
  area: z.string().optional()
}).optional();

const FeaturesSchema = z.object({
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  constructionSize: z.object({
    min: z.number().optional(),
    max: z.number().optional()
  }).optional(),
  lotSize: z.object({
    min: z.number().optional(),
    max: z.number().optional()
  }).optional()
}).optional();

const FiltersSchema = z.object({
  propertyType: z.union([z.string(), z.array(z.string())]).optional(),
  operationType: z.union([z.string(), z.array(z.string())]).optional(),
  priceRange: PriceRangeSchema,
  location: LocationSchema,
  features: FeaturesSchema,
  amenities: z.array(z.string()).optional(),
  propertyAge: z.number().optional(),
  maintenanceFee: PriceRangeSchema,
  sortBy: z.enum(['recent', 'price-asc', 'price-desc']).optional()
});

const ChatResponseSchema = z.object({
  message: z.string(),
  filters: FiltersSchema.optional()
});

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages, propertyContext } = body;

    // If there's a property context and the last message is from the user,
    // append the context to the message
    if (propertyContext && messages.length > 0 && messages[messages.length - 1].role === 'user') {
      const lastMessage = messages[messages.length - 1];
      lastMessage.content = `${lastMessage.content}\nContexto de la propiedad: ${JSON.stringify(propertyContext)}`;
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    // Validate message format
    const isValidMessage = messages.every(msg => 
      msg && 
      typeof msg === 'object' && 
      (msg.role === 'user' || msg.role === 'assistant') &&
      typeof msg.content === 'string'
    );

    if (!isValidMessage) {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    const response = await generateChatResponse(messages);
    
    if (!response.message) {
      throw new Error('Empty response from chat generation');
    }

    // Validate response against schema
    const validationResult = ChatResponseSchema.safeParse(response);
    
    if (!validationResult.success) {
      console.error('Invalid response format:', validationResult.error);
      throw new Error('Invalid response format from chat generation');
    }

    return NextResponse.json(validationResult.data);
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error';
    const statusCode = 500;

    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API key configuration error';
      } else if (error.message.includes('parse') || error.message.includes('format')) {
        errorMessage = 'Error processing AI response';
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        message: "Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo en unos momentos."
      },
      { status: statusCode }
    );
  }
} 