'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton = ({ onClick }: ChatButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-6 h-6" />
    </motion.button>
  );
};

export default ChatButton; 