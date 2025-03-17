import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { api } from '@/lib/api-client';
import type { AIQueryResponse } from '@/types/properties';
import { useSession } from './SessionContext';

// Define the Message interface
export interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  suggestions?: string[];
}

// Define the context type
export interface ChatContextType {
  messages: Message[];
  isTyping: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage: (content: string, propertyId?: string) => Promise<void>;
  clearChatHistory: () => void;
  startNewChat: () => void;
}

// Event for notifying when AI responses with property data
export const AI_RESPONSE_EVENT = 'ai_response_event';

// Event for sharing sessionId between contexts
export const SESSION_ID_UPDATED_EVENT = 'session_id_updated';

// Default quick suggestions
export const quickSuggestions = [
  "¿Cuál es el precio mínimo de una casa?",
  "¿Tienen propiedades en renta?",
  "¿Qué documentos necesito para comprar?",
  "¿Ofrecen créditos hipotecarios?",
];

// Helper function to get initial welcome message
export const getInitialMessage = () => ({
  id: Date.now().toString(),
  type: 'agent' as const,
  content: '¡Hola! Soy b, tu asistente virtual. ¿En qué puedo ayudarte hoy con tu búsqueda de propiedades?',
  timestamp: new Date(),
  status: 'read' as const,
  suggestions: quickSuggestions,
});

// Helper function to extract message from response
export const extractMessageFromResponse = (response: string): string => {
  try {
    // Check if the response is in JSON format
    if (response.trim().startsWith('{') && response.trim().endsWith('}')) {
      const parsedResponse = JSON.parse(response);
      // Return just the message part if it exists
      if (parsedResponse.message) {
        return parsedResponse.message;
      }
    }
    // If not JSON or no message property, return the original response
    return response;
  } catch (error) {
    // If parsing fails, return the original response
    console.log('Error parsing response:', error);
    return response;
  }
};

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create the provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([getInitialMessage()]);
  const [isTyping, setIsTyping] = useState(false);
  const { sessionId, setSessionId } = useSession();

  // Function to send a message
  const sendMessage = async (content: string, propertyId?: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    // Update message status to delivered
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    try {
      // Call the appropriate API endpoint based on whether we have a propertyId
      const data = propertyId 
        ? await api.chat.propertyQuery(content.trim(), propertyId, sessionId)
        : await api.chat.query(content.trim(), sessionId);
      
      console.log('API Response:', data);

      // Store the sessionId if it's returned from the backend
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      // Update properties through a custom event if there are search results
      if (data.searchResults) {
        // Create an AIQueryResponse-like structure
        const aiQueryResponse = {
          results: {
            data: data.searchResults.data || [],
            metadata: {
              executionTime: data.searchResults.metadata.executionTime,
              query: data.mongoQuery,
              statistics: data.searchResults.metadata.statistics
            }
          },
          explanation: extractMessageFromResponse(data.response)
        };
        
        // Dispatch event for PropertiesContext to listen to
        if (typeof window !== 'undefined') {
          const event = new CustomEvent(AI_RESPONSE_EVENT, {
            detail: aiQueryResponse
          });
          window.dispatchEvent(event);
        }
      }

      // Update message status to read
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );

      // Add AI response with a more specific message for zero results
      const responseContent = data.searchResults && data.searchResults.data.length === 0
        ? `${extractMessageFromResponse(data.response)}\n\nNo encontré propiedades que coincidan exactamente con tu búsqueda. ¿Te gustaría que ajustemos algunos criterios para ampliar los resultados?`
        : extractMessageFromResponse(data.response);

      const aiResponse: Message = {
        id: Date.now().toString(),
        type: 'agent',
        content: responseContent || "Lo siento, no pude procesar tu solicitud. ¿Puedes intentarlo de nuevo?",
        timestamp: new Date(),
        status: 'read',
        suggestions: data.searchResults && data.searchResults.data.length === 0 
          ? [
              "Mostrar todas las propiedades",
              "Buscar con criterios más amplios",
              "Intentar otra ubicación"
            ]
          : quickSuggestions,
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

    } catch (error) {
      console.error('Error calling API:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'agent',
        content: "Lo siento, tuve un problema al procesar tu solicitud. ¿Puedes intentarlo de nuevo?",
        timestamp: new Date(),
        status: 'read',
        suggestions: quickSuggestions,
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  // Function to clear chat history
  const clearChatHistory = () => {
    setSessionId(undefined);
    setMessages([getInitialMessage()]);
  };

  // Function to start a new chat
  const startNewChat = () => {
    setMessages([getInitialMessage()]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        setMessages,
        sendMessage,
        clearChatHistory,
        startNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

// Custom hook to use the chat context
export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 