import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';

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
    const { messages } = body;

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

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if (error.message.includes('API key')) {
        errorMessage = 'OpenAI API key configuration error';
      } else if (error.message.includes('parse')) {
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