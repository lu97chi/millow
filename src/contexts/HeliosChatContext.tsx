import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/lib/api-client';
import { useSession } from './SessionContext';
import { Message, ChatContextType, extractMessageFromResponse, AI_RESPONSE_EVENT } from './ChatContext';

export const quickCreditSuggestions = [
    "¿Cómo funciona el crédito hipotecario?",
    "¿Cuánto es el mínimo y máximo que puedo pedir de crédito?",
    "¿Soy elegible para crédito hipotecario?",
    "¿Qué información debo proporcionar para solicitar un crédito?"
];

export const getHeliosInitialMessage = () => ({
    id: Date.now().toString(),
    type: "agent" as const,
    content: "Hola!, soy Helios, tu agente virtual en crédito hipotecario, ¿en qué puedo ayudarte?",
    timestamp: new Date(),
    status: 'read' as const,
    suggestions: quickCreditSuggestions
});

const HeliosChatContext = createContext<ChatContextType | undefined>(undefined);

export function HeliosChatProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([getHeliosInitialMessage()]);
    const [isTyping, setIsTyping] = useState(false);
    const { sessionId, setSessionId } = useSession();

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: content.trim(),
            timestamp: new Date(),
            status: 'sent'
        };

        setMessages(prev => [...prev, newMessage]);
        setIsTyping(true);

        setTimeout(() => {
            setMessages(prev => prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg));
        }, 1000);

        try {
            const data = await api.chatHelios.query(content.trim(), sessionId);
            if (data.sessionId) {
                setSessionId(data.sessionId);
            }

            setMessages(prev => prev.map(msg => msg.id === newMessage.id ? { ...msg, status: 'read' } : msg));

            const responseContent = extractMessageFromResponse(data.response) || "Lo siento, no pude procesar tu solicitud. ¿Puedes intentarlo de nuevo?";

            const aiResponse: Message = {
                id: Date.now().toString(),
                type: 'agent',
                content: responseContent,
                timestamp: new Date(),
                status: 'read',
                suggestions: quickCreditSuggestions
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        } catch (error) {
            console.error('Error calling API:', error);
            const errorMessage: Message = {
                id: Date.now().toString(),
                type: 'agent',
                content: "Lo siento, tuve un problema al procesar tu solicitud. ¿Puedes intentarlo de nuevo?",
                timestamp: new Date(),
                status: 'read',
                suggestions: quickCreditSuggestions
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsTyping(false);
        }
    };

    const clearChatHistory = () => {
        setSessionId(undefined);
        setMessages([getHeliosInitialMessage()]);
    };

    const startNewChat = () => {
        setMessages([getHeliosInitialMessage()]);
    };

    return (
        <HeliosChatContext.Provider
            value={{ messages, isTyping, setMessages, sendMessage, clearChatHistory, startNewChat }}
        >
            {children}
        </HeliosChatContext.Provider>
    );
}

export function useHeliosChat() {
    const context = useContext(HeliosChatContext);
    if (context === undefined) {
        throw new Error('useHeliosChat must be used within a HeliosChatProvider');
    }
    return context;
}
