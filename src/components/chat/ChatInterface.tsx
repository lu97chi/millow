'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User2, Check, Info, Sparkles, RotateCcw, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useChat, Message, quickSuggestions } from '@/contexts/ChatContext';
import { useSession } from '@/contexts/SessionContext';

interface ChatInterfaceProps {
  onClose?: () => void;
  isMobile?: boolean;
  propertyId?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const messageVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

const pulseVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: 1.2,
    boxShadow: "0 0 15px rgba(41, 163, 195, 0.6)",
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  }
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { scale: 0.95 }
};

// Add shimmer animation for AI responses
const shimmerVariants = {
  initial: { backgroundPosition: '0% 0%' },
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "linear"
    }
  }
};

// Helper function to parse and clean message content
const parseMessageContent = (content: string) => {
  // Check if the message contains JSON
  if (content.includes('```json')) {
    // Extract the human-readable part before the JSON
    const humanPart = content.split('```json')[0].trim();
    return humanPart;
  }
  return content;
};

const ChatInterface = ({ onClose, isMobile, propertyId }: ChatInterfaceProps) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const { messages, isTyping, sendMessage, clearChatHistory, startNewChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Also scroll to bottom on initial load
  useEffect(() => {
    scrollToBottom();
    // Focus the input field on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const message = inputValue.trim();
      setInputValue(''); // Clear input immediately
      await sendMessage(message, propertyId);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(''); // Clear input immediately
    sendMessage(suggestion, propertyId);
  };

  const MessageStatus = ({ status }: { status?: string }) => {
    if (!status) return null;
    
    return (
      <div className="flex items-center text-xs text-muted-foreground mt-1">
        <Check size={12} className="mr-1" />
        {status}
      </div>
    );
  };

  // Handle textarea auto-resize
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    setInputValue(textarea.value);
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set the height to scrollHeight + 2px for border
    const newHeight = Math.min(textarea.scrollHeight, 120);
    textarea.style.height = `${newHeight}px`;
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="bg-background border border-border rounded-xl shadow-xl overflow-hidden h-[750px] flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center">
          <motion.div 
            className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-3"
            variants={pulseVariants}
            initial="initial"
            animate="pulse"
          >
            <Sparkles size={16} className="text-accent" />
          </motion.div>
          <div>
            <h3 className="font-medium text-foreground">Asistente Inmobiliario</h3>
            <p className="text-xs text-muted-foreground">Powered by AI</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors"
            onClick={() => setIsInfoModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Información"
          >
            <Info size={18} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Cerrar"
          >
            <X size={18} />
          </motion.button>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        ref={chatContainerRef}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {messages.length === 0 ? (
            <motion.div 
              className="flex flex-col items-center justify-center h-full py-10"
              variants={messageVariants}
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Sparkles size={24} className="text-accent" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">¡Bienvenido!</h3>
              <p className="text-sm text-muted-foreground text-center max-w-xs mb-6">
                Soy tu asistente inmobiliario virtual. ¿En qué puedo ayudarte hoy?
              </p>
              <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
                {quickSuggestions.slice(0, 4).map((suggestion, index) => (
                  <motion.button
                    key={index}
                    className="text-xs text-left p-3 rounded-lg border border-border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                    whileHover={{ scale: 1.03, backgroundColor: '#e6f7ff' }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={index}
                variants={messageVariants}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.type === 'user' ? 'ml-2 bg-primary/10' : 'mr-2 bg-accent/10'}`}>
                    {message.type === 'user' ? (
                      <User2 size={16} className="text-primary" />
                    ) : (
                      <Bot size={16} className="text-accent" />
                    )}
                  </div>
                  <div>
                    <div 
                      className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-none' 
                          : 'bg-secondary/30 text-foreground rounded-tl-none border border-border/50'
                      }`}
                    >
                      {message.type === 'agent' ? (
                        <motion.div
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          {parseMessageContent(message.content)}
                        </motion.div>
                      ) : (
                        message.content
                      )}
                    </div>
                    <MessageStatus status={message.status} />
                  </div>
                </div>
              </motion.div>
            ))
          )}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              variants={messageVariants}
              className="flex justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mr-2">
                  <Bot size={16} className="text-accent" />
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 text-foreground rounded-tl-none border border-border/50">
                  <motion.div 
                    className="flex space-x-1"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent/60"></div>
                    <div className="w-2 h-2 rounded-full bg-accent/60"></div>
                    <div className="w-2 h-2 rounded-full bg-accent/60"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
        <div ref={messagesEndRef} />
      </div>
      
      {/* Quick Suggestions */}
      {messages.length > 0 && (
        <div className="px-4 py-2 border-t border-border bg-secondary/10">
          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-border/50 bg-background hover:bg-secondary/30 transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
                whileHover={{ scale: 1.05, backgroundColor: '#e6f7ff' }}
                whileTap={{ scale: 0.95 }}
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat Input */}
      <div className="p-4 border-t border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <form onSubmit={handleSendMessage} className="flex items-end">
          <div className={`relative flex-1 transition-all duration-300 ${isInputFocused ? 'ring-2 ring-accent/30' : ''}`}>
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Escribe tu mensaje..."
              className="w-full p-3 pr-10 rounded-lg border border-border bg-background/80 focus:outline-none resize-none min-h-[44px] max-h-[120px] text-sm"
              rows={1}
            />
            {messages.length > 0 && (
              <motion.button
                type="button"
                className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-accent transition-colors"
                onClick={startNewChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Iniciar nueva conversación"
              >
                <RotateCcw size={16} />
              </motion.button>
            )}
          </div>
          <motion.button
            type="submit"
            className={`ml-2 p-3 rounded-lg bg-accent text-white ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent/90'}`}
            disabled={!inputValue.trim()}
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Send size={18} />
          </motion.button>
        </form>
      </div>

      {/* Info Modal */}
      <AnimatePresence>
        {isInfoModalOpen && (
          <div className="fixed inset-0 isolate" style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}>
            <div className="fixed inset-0 w-screen h-screen flex items-center justify-center" style={{ pointerEvents: 'auto' }}>
              <motion.div 
                className="absolute inset-0 bg-background/80 backdrop-blur-sm z-[1000]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsInfoModalOpen(false)}
              />
              <motion.div
                className="relative bg-background border border-border rounded-xl p-6 shadow-xl z-[1001] w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                style={{
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  pointerEvents: 'auto'
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                      <Sparkles size={20} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground">Asistente Inmobiliario</h3>
                  </div>
                  <button 
                    onClick={() => setIsInfoModalOpen(false)}
                    className="p-2 rounded-full hover:bg-secondary/50 text-muted-foreground transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    Este asistente utiliza inteligencia artificial para ayudarte a encontrar propiedades que se ajusten a tus necesidades.
                  </p>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Puedes preguntarle sobre:</h4>
                    <ul className="space-y-2 text-foreground/70">
                      <li className="flex items-start">
                        <Check size={16} className="text-accent mr-2 mt-0.5" />
                        <span>Propiedades disponibles en zonas específicas</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-accent mr-2 mt-0.5" />
                        <span>Detalles sobre precios, características y amenidades</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-accent mr-2 mt-0.5" />
                        <span>Proceso de compra o renta de propiedades</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-accent mr-2 mt-0.5" />
                        <span>Recomendaciones basadas en tus preferencias</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <p className="text-foreground/80 text-sm">
                      <span className="font-medium">Nota:</span> Este asistente está en fase beta y sus respuestas son generadas por IA. Siempre verifica la información importante con un agente inmobiliario real.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatInterface; 