"use client";

import { PropertyFilters as PropertyFiltersComponent } from "@/components/properties/property-filters";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useProperty } from "@/providers/property-context";
import { useSearch } from "@/providers/search-provider";
import type { ChatResponseData, PropertyFilters } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Check,
  CheckCheck,
  Clock,
  Home,
  Info,
  Lightbulb,
  Loader2,
  Search,
  Send,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Suspense } from "react";

const EXAMPLE_PROMPTS = [
  "¿Qué casas hay disponibles en Zapopan entre 5 y 8 millones?",
  "Busco un departamento en Providencia con 2 recámaras y 2 baños",
  "Necesito una casa en Valle Real con alberca y jardín",
  "¿Hay departamentos en Puerta de Hierro con vista a la ciudad?",
  "Busco oficinas en Plaza del Sol con estacionamiento",
  "¿Cuáles son las propiedades más nuevas en Andares?",
];

// Remove the imported ChatMessage type and use our local interface
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  filters?: Partial<PropertyFilters>;
}

// Helper function to get display content
function getDisplayContent(
  content: string | { message: string; context?: Record<string, unknown> }
): string {
  return typeof content === "string" ? content : content.message;
}

// Update the createChatMessage function to properly transform filters
function createChatMessage(
  role: "user" | "assistant",
  content: string,
  filters?: ChatResponseData["filters"]
): ChatMessage {
  // Transform API response filters to PropertyFilters format
  let transformedFilters: Partial<PropertyFilters> | undefined;
  if (filters) {
    transformedFilters = {
      propertyType: filters.propertyType ? [filters.propertyType] : undefined,
      operationType: filters.operationType
        ? [filters.operationType]
        : undefined,
      location: filters.location
        ? {
            state: filters.location.state
              ? [filters.location.state]
              : undefined,
            city: filters.location.city ? [filters.location.city] : undefined,
            area: filters.location.area ? [filters.location.area] : undefined,
          }
        : undefined,
      minPrice: filters.priceRange?.min,
      maxPrice: filters.priceRange?.max,
      features: filters.features
        ? {
            bedrooms: filters.features.bedrooms,
            bathrooms: filters.features.bathrooms,
            parking: filters.features.parking,
            floors: filters.features.floors,
            constructionSize: filters.features.constructionSize
              ? {
                  min: filters.features.constructionSize,
                  max: filters.features.constructionSize,
                }
              : undefined,
            lotSize: filters.features.lotSize
              ? {
                  min: filters.features.lotSize,
                  max: filters.features.lotSize,
                }
              : undefined,
          }
        : undefined,
      amenities: filters.amenities,
    };
  }

  return {
    id: Math.random().toString(36).substring(7),
    role,
    content,
    timestamp: new Date(),
    filters: transformedFilters,
  };
}

// Helper function to format timestamp
function formatMessageTime(date: Date): string {
  return format(date, "HH:mm", { locale: es });
}

// Message Status Component
function MessageStatus({
  timestamp,
  status,
}: {
  timestamp: Date;
  status: "sent" | "delivered" | "read";
}) {
  return (
    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
      <span>{formatMessageTime(timestamp)}</span>
      {status === "sent" && <Clock className="h-3 w-3" />}
      {status === "delivered" && <Check className="h-3 w-3" />}
      {status === "read" && <CheckCheck className="h-3 w-3" />}
    </div>
  );
}

// Typing Indicator Component
function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <motion.div
        className="flex gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>
      <span className="text-xs">Luna está escribiendo...</span>
    </div>
  );
}

// Add new helper for character count
function CharacterCount({ value }: { value: string }) {
  const max = 500;
  const remaining = max - value.length;

  return (
    <div
      className={cn(
        "text-xs select-none",
        remaining < 50
          ? "text-red-500"
          : remaining < 100
          ? "text-yellow-500"
          : "text-muted-foreground"
      )}
    >
      {remaining} caracteres restantes
    </div>
  );
}

// Add new component for message time with hover
function MessageTime({
  timestamp,
  className,
}: {
  timestamp: Date;
  className?: string;
}) {
  const fullDate = format(timestamp, "d 'de' MMMM, yyyy • HH:mm", {
    locale: es,
  });

  return (
    <div className={cn("group relative inline-block", className)}>
      <span className="text-[10px] text-muted-foreground">
        {formatMessageTime(timestamp)}
      </span>
      <div className="absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 transform rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground group-hover:block">
        {fullDate}
        <div className="absolute top-full left-1/2 h-1 w-1 -translate-x-1/2 transform border-4 border-transparent border-t-popover" />
      </div>
    </div>
  );
}

// Add new action button component
function ActionButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2 h-8 gap-2 text-xs hover:bg-primary/5 w-full"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

// Separate the content into its own component
function ChatUIContent() {
  const router = useRouter();
  const { currentProperty: propertyContext } = useProperty();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { filtersToSearchParams, setFilters, filters } = useSearch();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showSuggested, setShowSuggested] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);
  const [messageStatus, setMessageStatus] = useState<
    Record<string, "sent" | "delivered" | "read">
  >({});
  const [isTyping, setIsTyping] = useState(false);
  const [propertyAwareness, setPropertyAwareness] = useState<
    Record<string, boolean>
  >({});
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Listen for filter changes
  React.useEffect(() => {
    // Only redirect if we have active filters and we're not on a property detail page
    const hasActiveFilters =
      filters?.propertyType?.length ||
      filters?.minPrice !== undefined ||
      filters?.maxPrice !== undefined ||
      filters?.location?.state?.length ||
      filters?.location?.city?.length ||
      filters?.location?.area?.length ||
      filters?.features?.bedrooms ||
      filters?.features?.bathrooms ||
      filters?.features?.constructionSize?.min ||
      filters?.features?.constructionSize?.max ||
      filters?.features?.lotSize?.min ||
      filters?.features?.lotSize?.max ||
      (filters?.amenities?.length ?? 0) > 0 ||
      filters?.propertyAge !== undefined ||
      filters?.maintenanceFee?.min !== undefined ||
      filters?.maintenanceFee?.max !== undefined;

    if (hasActiveFilters && !propertyContext && showSuggested) {
      const params = filtersToSearchParams(filters);
      router.push(`/properties?${params.toString()}`);
    }
  }, [filters, router, filtersToSearchParams, propertyContext, showSuggested]);

  // Improved scroll behavior
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      // Prevent page scroll
      window.scrollTo({ top: window.scrollY });
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Property context change effect
  React.useEffect(() => {
    // Clear existing timer when property changes or component unmounts
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (propertyContext) {
      const propertyId = propertyContext.id;

      // Check if we've already shown awareness for this property
      if (propertyAwareness[propertyId]) {
        return;
      }

      // Check if user has already interacted with this property
      const hasInteraction = messages.some((message) =>
        message.content.includes(propertyId)
      );

      if (!hasInteraction) {
        timerRef.current = setTimeout(async () => {
          // Double check conditions before sending
          const currentInteraction = messages.some((m) =>
            m.content.includes(propertyId)
          );
          if (currentInteraction || propertyAwareness[propertyId]) {
            return;
          }

          try {
            const response = await fetch("/api/chat", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                messages: [
                  createChatMessage(
                    "user",
                    `Contexto de la propiedad: ${JSON.stringify(
                      propertyContext
                    )}`
                  ),
                ],
                propertyContext,
              }),
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setMessages((prev) => [
              ...prev,
              createChatMessage("assistant", data.message),
            ]);
            // Mark awareness for this property
            setPropertyAwareness((prev) => ({ ...prev, [propertyId]: true }));
          } catch (error) {
            console.error("Error sending property context:", error);
          }
        }, 15000);

        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
      } else {
        // Mark as aware if there's already interaction
        setPropertyAwareness((prev) => ({ ...prev, [propertyId]: true }));
      }
    }
  }, [propertyContext, messages, propertyAwareness]);

  // Simulate message status changes
  useEffect(() => {
    messages.forEach((message) => {
      if (message.role === "user" && !messageStatus[message.id]) {
        // Simulate message delivery flow
        setMessageStatus((prev) => ({ ...prev, [message.id]: "sent" }));

        setTimeout(() => {
          setMessageStatus((prev) => ({ ...prev, [message.id]: "delivered" }));
        }, 1000);

        setTimeout(() => {
          setMessageStatus((prev) => ({ ...prev, [message.id]: "read" }));
        }, 2000);
      }
    });
  }, [messages, messageStatus]);

  // Handle chat response
  const handleChatResponse = (data: ChatResponseData) => {
    const newFilters: Partial<PropertyFilters> = {};

    // Only set filters that are explicitly present in the response and have valid values
    if (data.filters) {
      // Property Type - only if array has values
      if (
        Array.isArray(data.filters.propertyType) &&
        data.filters.propertyType.length > 0
      ) {
        newFilters.propertyType = data.filters.propertyType;
      }

      // Operation Type - only if array has values
      if (
        Array.isArray(data.filters.operationType) &&
        data.filters.operationType.length > 0
      ) {
        newFilters.operationType = data.filters.operationType;
      }

      // Location - only include properties that have non-empty values
      if (data.filters.location) {
        const locationFilters: Partial<PropertyFilters["location"]> = {};

        if (
          Array.isArray(data.filters.location.state) &&
          data.filters.location.state.length > 0
        ) {
          locationFilters.state = data.filters.location.state;
        }
        if (
          Array.isArray(data.filters.location.city) &&
          data.filters.location.city.length > 0
        ) {
          locationFilters.city = data.filters.location.city;
        }
        if (
          Array.isArray(data.filters.location.area) &&
          data.filters.location.area.length > 0
        ) {
          locationFilters.area = data.filters.location.area;
        }

        // Only add location if there are any non-empty values
        if (Object.keys(locationFilters).length > 0) {
          newFilters.location = locationFilters;
        }
      }

      // Price Range - only if values are valid numbers
      if (data.filters.priceRange) {
        if (
          typeof data.filters.priceRange.min === "number" &&
          data.filters.priceRange.min > 0
        ) {
          newFilters.minPrice = data.filters.priceRange.min;
        }
        if (
          typeof data.filters.priceRange.max === "number" &&
          data.filters.priceRange.max > 0
        ) {
          newFilters.maxPrice = data.filters.priceRange.max;
        }
      }

      // Features - only include properties that have valid values
      if (data.filters.features) {
        const featureFilters: Partial<PropertyFilters["features"]> = {};

        if (
          typeof data.filters.features.bedrooms === "number" &&
          data.filters.features.bedrooms > 0
        ) {
          featureFilters.bedrooms = data.filters.features.bedrooms;
        }
        if (
          typeof data.filters.features.bathrooms === "number" &&
          data.filters.features.bathrooms > 0
        ) {
          featureFilters.bathrooms = data.filters.features.bathrooms;
        }
        if (
          typeof data.filters.features.parking === "number" &&
          data.filters.features.parking > 0
        ) {
          featureFilters.parking = data.filters.features.parking;
        }
        if (
          typeof data.filters.features.floors === "number" &&
          data.filters.features.floors > 0
        ) {
          featureFilters.floors = data.filters.features.floors;
        }

        // Construction Size
        if (data.filters.features.constructionSize) {
          const size = data.filters.features.constructionSize;
          if (typeof size === "number" && size > 0) {
            featureFilters.constructionSize = { min: size, max: size };
          } else if (typeof size === "object" && size !== null) {
            const sizeRange: { min?: number; max?: number } = {};
            const sizeObj = size as { min?: number; max?: number };
            if (typeof sizeObj.min === "number" && sizeObj.min > 0) {
              sizeRange.min = sizeObj.min;
            }
            if (typeof sizeObj.max === "number" && sizeObj.max > 0) {
              sizeRange.max = sizeObj.max;
            }
            if (Object.keys(sizeRange).length > 0) {
              featureFilters.constructionSize = sizeRange;
            }
          }
        }

        // Lot Size
        if (data.filters.features.lotSize) {
          const size = data.filters.features.lotSize;
          if (typeof size === "number" && size > 0) {
            featureFilters.lotSize = { min: size, max: size };
          } else if (typeof size === "object" && size !== null) {
            const sizeRange: { min?: number; max?: number } = {};
            const sizeObj = size as { min?: number; max?: number };
            if (typeof sizeObj.min === "number" && sizeObj.min > 0) {
              sizeRange.min = sizeObj.min;
            }
            if (typeof sizeObj.max === "number" && sizeObj.max > 0) {
              sizeRange.max = sizeObj.max;
            }
            if (Object.keys(sizeRange).length > 0) {
              featureFilters.lotSize = sizeRange;
            }
          }
        }

        // Only add features if there are any valid values
        if (Object.keys(featureFilters).length > 0) {
          newFilters.features = featureFilters;
        }
      }

      // Amenities - only if array has values
      if (
        Array.isArray(data.filters.amenities) &&
        data.filters.amenities.length > 0
      ) {
        newFilters.amenities = data.filters.amenities;
      }
    }

    // Update filters in context - this will clear any filters not present in the response
    setFilters(newFilters);
    setShowSuggested(true);

    // Add the response to messages
    setMessages((prev) => [
      ...prev,
      createChatMessage("assistant", data.message, data.filters),
    ]);
    setInput("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = createChatMessage("user", input);
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    // Mark awareness for current property when user sends a message
    if (propertyContext) {
      setPropertyAwareness((prev) => ({ ...prev, [propertyContext.id]: true }));
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          propertyContext,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIsTyping(false);
      await handleChatResponse(data);
    } catch (error) {
      console.error("Error in chat:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        createChatMessage(
          "assistant",
          "Lo siento, hubo un error. Por favor, intenta de nuevo."
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    // Reset height to auto to properly calculate new height
    textarea.style.height = "auto";
    // Set new height based on scrollHeight, but cap it at 120px
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${newHeight}px`;
    setInput(textarea.value);
  };

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFiltersOpen) {
        setIsFiltersOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
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
            <span className="text-[10px] text-muted-foreground">
              Asistente inmobiliaria
            </span>
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

      {/* Messages Container with enhanced styling */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background to-muted/20">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6"
            >
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
                <Bot className="relative h-16 w-16 text-primary" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="font-semibold text-xl text-foreground">
                  ¡Hola! Soy Luna 👋
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Puedo ayudarte a encontrar la propiedad perfecta. ¿Qué tipo de
                  propiedad estás buscando?
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 w-full max-w-sm pt-4">
                {EXAMPLE_PROMPTS.slice(0, 4).map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto whitespace-normal text-left justify-start text-xs py-2 px-3 hover:bg-primary/5"
                    onClick={() => {
                      setInput(prompt);
                      if (textareaRef.current) {
                        textareaRef.current.focus();
                      }
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex w-full gap-2 sm:gap-4",
                  message.role === "assistant" ? "flex-row" : "flex-row-reverse"
                )}
              >
                {/* Avatar with enhanced Status Indicator */}
                <div className="relative flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border bg-background shadow-sm">
                  {message.role === "assistant" ? (
                    <>
                      <Bot className="h-4 w-4 text-primary" />
                      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
                    </>
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>

                {/* Message Content with enhanced styling */}
                <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]">
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 shadow-sm",
                      message.role === "assistant"
                        ? "bg-muted/50 backdrop-blur-sm"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {getDisplayContent(message.content)}
                    </p>
                    {message.role === "assistant" &&
                      propertyContext &&
                      message.filters && (
                        <ActionButton
                          onClick={() => {
                            if (message.filters) {
                              const params = filtersToSearchParams(
                                message.filters
                              );
                              router.push(`/properties?${params.toString()}`);
                            }
                          }}
                        >
                          <Search className="h-3.5 w-3.5" />
                          Ver propiedades sugeridas
                        </ActionButton>
                      )}
                  </div>

                  {/* Enhanced Message Metadata */}
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      message.role === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    )}
                  >
                    {message.role === "user" ? (
                      <MessageStatus
                        timestamp={message.timestamp}
                        status={messageStatus[message.id] || "sent"}
                      />
                    ) : (
                      <MessageTime timestamp={message.timestamp} />
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}

          {/* Enhanced Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background shadow-sm">
                <Bot className="h-4 w-4 text-primary" />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 ring-2 ring-background" />
              </div>
              <div className="rounded-lg bg-muted/50 backdrop-blur-sm px-4 py-2 shadow-sm">
                <TypingIndicator />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Enhanced Input Container */}
      <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="min-h-[80px] w-full resize-none bg-background pr-12 pb-8"
              disabled={isLoading}
              maxLength={500}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              <CharacterCount value={input} />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className={cn(
                  "h-8 w-8 transition-all",
                  input.trim() &&
                    "text-primary hover:scale-110 hover:bg-primary/10"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Context and Actions */}
          <div className="flex items-center justify-between">
            {propertyContext ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Home className="h-3 w-3" />
                <span className="truncate max-w-[200px]">
                  Contexto: {propertyContext.title}
                </span>
              </div>
            ) : (
              <div />
            )}

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 gap-2 px-3 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setShowPrompts(!showPrompts)}
            >
              <Lightbulb className="h-3.5 w-3.5" />
              {showPrompts ? "Ocultar ejemplos" : "Ver ejemplos"}
            </Button>
          </div>
        </form>

        {/* Enhanced Example Prompts Panel */}
        <AnimatePresence>
          {showPrompts && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="border-t mt-4 bg-muted/5 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Ejemplos de preguntas:</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {EXAMPLE_PROMPTS.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto whitespace-normal text-left justify-start text-xs py-2 px-3 hover:bg-primary/5"
                      onClick={() => {
                        setInput(prompt);
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info Modal */}
      <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Luna - Asistente Inmobiliaria</DialogTitle>
            <DialogDescription>
              Soy una asistente virtual especializada en ayudarte a encontrar la
              propiedad perfecta. Puedo entender tus necesidades y preferencias
              para recomendarte las mejores opciones disponibles.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">¿Qué puedo hacer?</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Buscar propiedades según tus criterios específicos</li>
                <li>• Responder preguntas sobre las propiedades</li>
                <li>• Proporcionar información detallada sobre ubicaciones</li>
                <li>• Ayudarte a comparar diferentes opciones</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Ejemplos de preguntas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <li key={index}>• {prompt}</li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filters Panel */}
      {isFiltersOpen &&
        typeof document !== "undefined" &&
        createPortal(
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
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "400px",
                zIndex: 50,
              }}
              className="bg-background border-l shadow-lg flex flex-col"
            >
              <div className="flex-none border-b px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Filtros avanzados</h3>
                  <p className="text-sm text-muted-foreground">
                    Personaliza tu búsqueda
                  </p>
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

// Main component with Suspense boundary
export function ChatUI() {
  return (
    <Suspense fallback={
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse">Loading chat...</div>
        </div>
      </div>
    }>
      <ChatUIContent />
    </Suspense>
  );
}
