"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, User, Send, Home, Loader2, X, Info, SlidersHorizontal, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/providers/search-provider";
import { cn } from "@/lib/utils";
import { PropertyFilters as PropertyFiltersComponent } from "@/components/properties/property-filters";
import { useChatContextStore } from "@/store/use-chat-context-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { PropertyFilters } from "@/store/use-search-store";
import { useState, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatResponseData {
  message: string;
  filters?: PropertyFilters;
}

const EXAMPLE_PROMPTS = [
  "Busco una casa en Polanco con 3 recámaras y jardín",
  "¿Qué departamentos hay disponibles en la Roma Norte?",
  "Necesito una oficina en Santa Fe con estacionamiento",
  "Busco casa en venta en San Ángel con alberca",
];

// Helper function to get display content
function getDisplayContent(content: string | { message: string; context?: Record<string, unknown> }): string {
  return typeof content === "string" ? content : content.message;
}

export function ChatUI() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { syncWithUrl, filters, setFilters } = useSearch();
  const propertyContext = useChatContextStore((state) => state.propertyContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);

  // Listen for filter changes
  React.useEffect(() => {
    // Only redirect if we have active filters and we're not on a property detail page
    const hasActiveFilters = 
      (filters?.propertyType?.length ?? 0) > 0 ||
      filters?.location?.state ||
      filters?.location?.city ||
      filters?.location?.area ||
      filters?.features?.bedrooms ||
      filters?.features?.bathrooms ||
      filters?.propertyAge !== undefined ||
      (filters?.priceRange?.min ?? undefined) !== undefined ||
      (filters?.priceRange?.max ?? undefined) !== undefined ||
      (filters?.features?.constructionSize?.min ?? undefined) !== undefined ||
      (filters?.features?.constructionSize?.max ?? undefined) !== undefined ||
      (filters?.features?.lotSize?.min ?? undefined) !== undefined ||
      (filters?.features?.lotSize?.max ?? undefined) !== undefined ||
      (filters?.amenities?.length ?? 0) > 0 ||
      filters?.maintenanceFee !== undefined ||
      (filters?.sortBy ?? "recent") !== "recent" ||
      (filters?.query ?? "") !== "";

    if (hasActiveFilters && !propertyContext && filters && showSuggested) {
      syncWithUrl(filters);
      router.push("/properties");
      setShowSuggested(false);
    }
  }, [filters, router, syncWithUrl, propertyContext, showSuggested]);

  // Improved scroll behavior
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      // Prevent page scroll
      window.scrollTo({ top: window.scrollY });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Welcome message
  React.useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "👋 ¡Hola! Soy Luna, tu asistente inmobiliaria. ¿Qué tipo de propiedad estás buscando?",
        },
      ]);
    }
  }, [messages]);

  // Property context change effect
  React.useEffect(() => {
    if (propertyContext) {
      const sendPropertyContextMessage = async () => {
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messages: [
                {
                  role: "user",
                  content: `Contexto de la propiedad: ${JSON.stringify(propertyContext)}`
                }
              ],
              propertyContext
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          
          setMessages(prev => [...prev, {
            role: "assistant",
            content: data.message
          }]);
        } catch (error) {
          console.error("Error sending property context:", error);
          setMessages(prev => [...prev, {
            role: "assistant",
            content: "Lo siento, hubo un error al cargar la información de la propiedad."
          }]);
        }
      };

      sendPropertyContextMessage();
    }
  }, [propertyContext, propertyContext?.id]); // Only trigger when property ID changes

  // Handle chat response and set redirect flag
  const handleChatResponse = async (data: ChatResponseData) => {
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.message },
    ]);

    // Only apply filters if we're not on a property detail page
    if (data.filters && !propertyContext) {
      setFilters(current => ({ ...current, ...data.filters }));
      setShowSuggested(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Create user message with context if available
    const userMessage: ChatMessage = {
      role: "user",
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          propertyContext
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      await handleChatResponse(data);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Lo siento, hubo un error. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    // Reset height to auto to properly calculate new height
    textarea.style.height = 'auto';
    // Set new height based on scrollHeight, but cap it at 120px
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${newHeight}px`;
    setInput(textarea.value);
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFiltersOpen) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isFiltersOpen]);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
            <Bot className="relative h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">Luna</span>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <span className="text-[10px] text-muted-foreground">Asistente inmobiliaria</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setIsInfoOpen(true)}
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2 px-2 text-xs font-medium hover:bg-primary/5"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 text-muted-foreground">
            <Bot className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">¡Hola! Soy Luna 👋</h3>
              <p className="text-sm">
                Puedo ayudarte a encontrar la propiedad perfecta. ¿Qué tipo de propiedad estás buscando?
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex w-full gap-2 sm:gap-4",
                message.role === "assistant" ? "flex-row" : "flex-row-reverse"
              )}
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-background shadow">
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[85%] sm:max-w-[75%]",
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                )}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {getDisplayContent(message.content)}
                </p>
              </div>
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t bg-background p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Escribe tu mensaje..."
              className="min-h-[80px] w-full resize-none bg-background pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="absolute bottom-2 right-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Context Badge */}
          {propertyContext && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Home className="h-3 w-3" />
              <span className="truncate">
                Contexto: {propertyContext.title}
              </span>
            </div>
          )}

          {/* Example Prompts */}
          {!input.trim() && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-full text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setShowPrompts(!showPrompts)}
            >
              <Lightbulb className="mr-2 h-3.5 w-3.5" />
              Ver ejemplos de preguntas
            </Button>
          )}
        </form>
      </div>

      {/* Example Prompts Panel */}
      {showPrompts && (
        <div className="border-t bg-muted/5 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Lightbulb className="h-3.5 w-3.5" />
            <span>Ejemplos de preguntas:</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {EXAMPLE_PROMPTS.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto whitespace-normal text-left justify-start text-xs py-2 px-3"
                onClick={() => {
                  setInput(prompt);
                  setShowPrompts(false);
                  if (textareaRef.current) {
                    textareaRef.current.focus();
                  }
                }}
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Info Modal */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Cómo funciona Luna?</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DialogDescription asChild>
              <div className="space-y-4">
                <div>
                  Luna es tu asistente inmobiliaria personal, diseñada para ayudarte a encontrar la propiedad perfecta. 
                  Puedes interactuar con ella como lo harías con una agente inmobiliaria real.
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Puedes preguntarle sobre:</h4>
                  <ul className="list-disc pl-4 space-y-1.5 text-sm text-muted-foreground">
                    <li>Propiedades disponibles en zonas específicas</li>
                    <li>Características particulares que buscas</li>
                    <li>Rangos de precios y presupuestos</li>
                    <li>Tipos de propiedades (casas, departamentos, oficinas)</li>
                    <li>Amenidades y servicios cercanos</li>
                  </ul>
                </div>

                <div>
                  Luna aprenderá de tus preferencias mientras interactúas con ella y te ayudará a filtrar las mejores opciones 
                  que se ajusten a tus necesidades.
                </div>
              </div>
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filters Panel */}
      {isFiltersOpen && typeof document !== 'undefined' && createPortal(
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsFiltersOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ 
              duration: 0.2,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{ 
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '400px',
              zIndex: 50
            }}
            className="bg-background border-l shadow-lg flex flex-col"
          >
            <div className="flex-none border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Filtros avanzados</h3>
                <p className="text-sm text-muted-foreground">Personaliza tu búsqueda</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
                onClick={() => setIsFiltersOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-6 py-6">
                <PropertyFiltersComponent 
                  hideToggle 
                  onClose={() => {
                    setIsFiltersOpen(false);
                    setShowSuggested(true);
                  }}
                />
              </div>
            </div>
          </motion.div>
        </>,
        document.body
      )}
    </div>
  );
} 