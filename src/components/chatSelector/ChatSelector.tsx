'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Home, CreditCard } from 'lucide-react';
import ChatInterface from '../chat/ChatInterface';
import HeliosChatInterface from '../heliosChat/HeliosChatInterface';

// Define the available chat modes
type ChatMode = 'real-estate' | 'credit' | null;

const ChatSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatMode>(null);
  const [showBubbles, setShowBubbles] = useState(false);

  // Toggle the chat button
  const toggleChat = () => {
    if (isOpen) {
      // If chat is open, close it
      setIsOpen(false);
      setSelectedChat(null);
    } else if (showBubbles) {
      // If bubbles are shown, hide them
      setShowBubbles(false);
    } else {
      // Show the bubbles
      setShowBubbles(true);
    }
  };

  // Handle selecting a specific chat
  const selectChat = (mode: ChatMode) => {
    setSelectedChat(mode);
    setShowBubbles(false);
    setIsOpen(true);
  };

  // Handle closing the chat
  const handleClose = () => {
    setIsOpen(false);
    setSelectedChat(null);
  };

  // Animation variants for bubbles
  const bubbleVariants = {
    hidden: { opacity: 0, y: 0, scale: 0.6 },
    visible: (custom: number) => ({ 
      opacity: 1, 
      y: -70 - (custom * 80), // Stack vertically: first bubble 70px up, second bubble 150px up
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        delay: custom * 0.1 // Stagger animation
      }
    }),
    exit: (custom: number) => ({ 
      opacity: 0, 
      y: 0,
      scale: 0.6,
      transition: { 
        duration: 0.2,
        delay: (1 - custom) * 0.05 // Reverse stagger on exit
      }
    })
  };

  // Chat animation - slide in from the right side
  const chatVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 25 
      }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      {/* Bubbles that appear above the chat button */}
      <AnimatePresence>
        {showBubbles && (
          <>
            {/* Real Estate Assistant Bubble */}
            <motion.button
              onClick={() => selectChat('real-estate')}
              className="fixed z-50 bg-background border border-border shadow-lg rounded-full p-3 flex items-center justify-center"
              style={{ right: '24px', bottom: '24px', width: '56px', height: '56px' }}
              custom={1} // This will be the top bubble
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-6 h-6 text-primary" />
            </motion.button>
            
            {/* Credit Assistant Bubble */}
            <motion.button
              onClick={() => selectChat('credit')}
              className="fixed z-50 bg-background border border-border shadow-lg rounded-full p-3 flex items-center justify-center"
              style={{ right: '24px', bottom: '24px', width: '56px', height: '56px' }}
              custom={0} // This will be the bottom bubble (closer to the main button)
              variants={bubbleVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover={{ scale: 1.1, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard className="w-6 h-6 text-accent" />
            </motion.button>
            
            {/* Optional: Semi-transparent overlay to close bubbles when clicking elsewhere */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBubbles(false)}
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.01)' }} // Nearly invisible but clickable
            />
          </>
        )}
      </AnimatePresence>
      
      {/* Main Chat Button */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Display the selected chat interface */}
      <AnimatePresence>
        {isOpen && selectedChat && (
          <div className="fixed inset-0 z-50 pointer-events-none">
            {/* Semi-transparent backdrop that only covers part of the screen */}
            <motion.div
              className="absolute inset-0 bg-background/10 backdrop-blur-sm pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
            
            {/* Chat positioned on the right side */}
            <motion.div
              className="absolute right-24 bottom-10 w-full max-w-md pointer-events-auto "
              variants={chatVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {selectedChat === 'real-estate' && (
                <ChatInterface onClose={handleClose} />
              )}
              {selectedChat === 'credit' && (
                <HeliosChatInterface onClose={handleClose} />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatSelector;