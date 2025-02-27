'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User2, Check, Info, Sparkles } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import Image from 'next/image';
import { useChat, Message, quickSuggestions } from '@/contexts/ChatContext';
import { useSession } from '@/contexts/SessionContext';

interface ChatInterfaceProps {
  onClose?: () => void;
  isMobile?: boolean;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const messageVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
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
    boxShadow: "0 0 10px rgba(41, 163, 195, 0.5)",
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

const ChatInterface = ({ onClose, isMobile }: ChatInterfaceProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { messages, isTyping, sendMessage, clearChatHistory, startNewChat } = useChat();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    await sendMessage(inputValue.trim());
    setInputValue('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const MessageStatus = ({ status }: { status?: string }) => {
    if (!status) return null;
    
    return (
      <span className="ml-2 flex">
        {status === 'sent' && <Check size={14} className="text-foreground/40" />}
        {status === 'delivered' && (
          <div className="flex">
            <Check size={14} className="text-foreground/40" />
            <Check size={14} className="-ml-1 text-foreground/40" />
          </div>
        )}
        {status === 'read' && (
          <div className="flex">
            <Check size={14} className="text-accent" />
            <Check size={14} className="-ml-1 text-accent" />
          </div>
        )}
      </span>
    );
  };

  return (
    <div className={`flex flex-col bg-background border border-border rounded-2xl shadow-lg overflow-hidden ${isMobile ? 'h-[calc(100vh-2rem)] w-full' : 'h-[600px] w-[400px]'}`}>
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
            <Bot size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Luna</h3>
            <p className="text-xs text-foreground/60">Asistente Virtual</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
          >
            <Info size={18} className="text-foreground/70" />
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
            >
              <X size={18} className="text-foreground/70" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
      >
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {messages.map((message) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.type === 'user' 
                      ? 'bg-accent text-white rounded-tr-none shadow-sm' 
                      : 'bg-secondary/30 text-foreground rounded-tl-none border border-border/40 shadow-sm'
                  }`}
                >
                  <div className="flex items-start">
                    {message.type === 'agent' && (
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <Bot size={12} className="text-accent" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-foreground'}`}>
                        {message.content}
                      </p>
                      <div className="flex justify-end items-center mt-1">
                        <span className={`text-xs ${message.type === 'user' ? 'text-white/70' : 'text-foreground/60'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.type === 'user' && <MessageStatus status={message.status} />}
                      </div>
                    </div>
                    {message.type === 'user' && (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center ml-2 mt-0.5 flex-shrink-0">
                        <User2 size={12} className="text-primary" />
                      </div>
                    )}
                  </div>
                  
                  {/* Text Suggestions */}
                  {message.type === 'agent' && message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs bg-background border border-border/60 rounded-full px-3 py-1 text-foreground/80 hover:bg-secondary/50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary/30 text-foreground rounded-2xl rounded-tl-none border border-border/40 p-3 max-w-[85%]">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-1 flex-shrink-0">
                  <Bot size={12} className="text-accent" />
                </div>
                <div className="flex space-x-1">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-foreground/40"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-foreground/40"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0.15 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-foreground/40"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'loop', delay: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-3 border-t border-border">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-secondary/30 border border-border/40 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            type="submit"
            className="bg-accent text-white rounded-full p-2 shadow-sm"
            disabled={isTyping}
          >
            <Send size={18} />
          </motion.button>
        </form>

        {/* Chat Actions */}
        <div className="flex justify-between mt-2">
          <button 
            onClick={startNewChat}
            className="text-xs text-foreground/60 hover:text-accent transition-colors"
          >
            Nueva conversación
          </button>
          <button 
            onClick={clearChatHistory}
            className="text-xs text-foreground/60 hover:text-accent transition-colors"
          >
            Borrar historial
          </button>
        </div>
      </div>

      {/* Info Dialog */}
      <Dialog.Root open={isInfoOpen} onOpenChange={setIsInfoOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-xl p-6 shadow-lg z-50 w-[90vw] max-w-md max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                  <Sparkles size={20} className="text-accent" />
                </div>
                <h2 className="text-xl font-semibold">Sobre Luna</h2>
              </div>
              <Dialog.Close asChild>
                <button className="p-2 rounded-full hover:bg-secondary/50 transition-colors">
                  <X size={18} className="text-foreground/70" />
                </button>
              </Dialog.Close>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-foreground/80">
                Luna es tu asistente virtual de Millow, diseñada para ayudarte a encontrar la propiedad perfecta y responder todas tus preguntas sobre bienes raíces.
              </p>
              
              <div className="bg-secondary/30 rounded-lg p-4 border border-border/40">
                <h3 className="font-medium mb-2 flex items-center">
                  <Sparkles size={16} className="text-accent mr-2" />
                  ¿Qué puede hacer Luna?
                </h3>
                <ul className="text-sm space-y-2 text-foreground/80">
                  <li>• Buscar propiedades según tus criterios</li>
                  <li>• Responder preguntas sobre el proceso de compra</li>
                  <li>• Proporcionar información sobre financiamiento</li>
                  <li>• Explicar términos inmobiliarios</li>
                  <li>• Conectarte con un agente humano si lo necesitas</li>
                </ul>
              </div>
              
              <p className="text-sm text-foreground/60">
                Luna está en constante aprendizaje. Si no puede responder alguna pregunta, te conectará con un especialista.
              </p>
              
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-foreground/60 text-center">
                  Powered by Millow AI © {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ChatInterface; 