"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/use-search-store";
import { useChatStore } from "@/store/use-chat-store";
import { useSearch } from "@/providers/search-provider";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface AIResponse {
  message: string;
  filters?: Partial<import("@/store/use-search-store").PropertyFilters>;
}

export function ChatUI() {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const { isOpen, close, toggle } = useChatStore();
  const { syncWithUrl } = useSearch();

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
          content: "¡Hola! Soy tu asistente de búsqueda de propiedades. ¿En qué puedo ayudarte hoy?",
        },
      ]);
    }
  }, [messages]);

  // Mock AI response function - Replace with actual implementation
  const mockAIResponse = async (input: string): Promise<AIResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (input.toLowerCase().includes("casa")) {
      return {
        message: "He encontrado algunas casas que podrían interesarte. ¿Te gustaría ver propiedades con características específicas?",
        filters: {
          propertyType: ["casa"],
          priceRange: { min: 1000000, max: 10000000 },
        },
      };
    }

    return {
      message: "¿Podrías darme más detalles sobre el tipo de propiedad que buscas? Por ejemplo: ubicación, presupuesto, número de habitaciones...",
    };
  };

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
      const response = await mockAIResponse(input);
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.message },
      ]);

      if (response.filters) {
        syncWithUrl(response.filters);
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
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    setInput(textarea.value);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={toggle}
        size="icon"
        variant="outline"
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg md:right-6 md:bottom-6 bg-primary hover:bg-primary/90"
      >
        <MessageCircle className="h-5 w-5 text-primary-foreground" />
      </Button>

      {/* Chat Side Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-[20vw] min-w-[300px] border-l bg-background/95 backdrop-blur-sm shadow-lg"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between border-b px-4 bg-muted/50">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">Asistente de Búsqueda</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-muted"
                onClick={close}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex h-[calc(100vh-8rem)] flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto p-4 scroll-smooth">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className={cn(
                      "group flex gap-2",
                      message.role === "user" && "justify-end"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 p-1 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "relative flex w-max max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted",
                        message.role === "assistant" && "rounded-tl-sm",
                        message.role === "user" && "rounded-tr-sm"
                      )}
                    >
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <div className="h-8 w-8 rounded-full bg-primary/10 p-1 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="h-8 w-8 rounded-full bg-primary/10 p-1 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex w-max max-w-[80%] items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="border-t bg-muted/50 p-4">
                <div className="flex gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInput}
                    placeholder="Escribe tu mensaje..."
                    className="flex-1 resize-none rounded-xl border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring placeholder:text-muted-foreground/60"
                    rows={1}
                    style={{ maxHeight: "120px" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                      }
                    }}
                  />
                  <Button 
                    type="submit" 
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 shrink-0"
                    disabled={isLoading || !input.trim()}
                  >
                    <Send className="h-4 w-4 text-primary-foreground" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 