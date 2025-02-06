"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, User, Send, Sparkles, SlidersHorizontal, X, Info, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/providers/search-provider";
import { cn } from "@/lib/utils";
import { PropertyFilters } from "@/components/properties/property-filters";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const EXAMPLE_PROMPTS = [
  "Busco una casa en Polanco con 3 recámaras y jardín",
  "¿Qué departamentos hay disponibles en la Roma Norte?",
  "Necesito una oficina en Santa Fe con estacionamiento",
  "Busco casa en venta en San Ángel con alberca",
];

export function ChatUI() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { syncWithUrl } = useSearch();
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);
  const [showPrompts, setShowPrompts] = React.useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input,
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
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);

      if (data.filters) {
        syncWithUrl(data.filters);
        router.push("/properties");
      }
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
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b bg-background/95 px-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
            <Sparkles className="relative h-4 w-4 text-primary" />
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
      <div className="flex flex-1 flex-col overflow-hidden bg-muted/5">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 pt-4" style={{ scrollbarWidth: 'thin' }}>
          <div className="flex flex-col space-y-4 pb-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex w-full items-start gap-2",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/25">
                  {message.role === "assistant" ? (
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <User className="h-3.5 w-3.5 text-primary" />
                  )}
                </div>
                <div className={cn(
                  "flex max-w-[75%] flex-col gap-1",
                  message.role === "user" && "items-end"
                )}>
                  <div className={cn(
                    "inline-block rounded-2xl px-3 py-2 text-sm",
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted/50 ring-1 ring-border/50",
                    message.role === "assistant" ? "rounded-tl-sm" : "rounded-tr-sm"
                  )}>
                    <span className="inline-block whitespace-pre-wrap break-words">
                      {message.content}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/25">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="inline-block rounded-2xl rounded-tl-sm bg-muted/50 px-3 py-2 ring-1 ring-border/50">
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40 [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/40" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Example Prompts */}
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
                    if (inputRef.current) {
                      inputRef.current.focus();
                    }
                  }}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t bg-background p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-end gap-2">
              <div className="relative flex-1">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleInput}
                  placeholder="Escribe tu mensaje..."
                  className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 overflow-y-auto"
                  rows={1}
                  style={{ 
                    minHeight: "40px",
                    maxHeight: "120px",
                    scrollbarWidth: 'thin',
                    scrollbarGutter: 'stable'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute bottom-2 right-2 flex items-center">
                  <kbd className="rounded bg-muted px-1.5 text-[10px] font-medium text-muted-foreground/70">⏎</kbd>
                </div>
              </div>
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="h-10 w-10 shrink-0 rounded-lg bg-primary transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="h-4 w-4 text-primary-foreground" />
              </Button>
            </div>
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
      </div>

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

      {/* Filters Panel Portal */}
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
                <PropertyFilters 
                  hideToggle 
                  onClose={() => setIsFiltersOpen(false)}
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