// AnimatedBubble.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedBubbleProps {
  text: string;
  position: { top: string; left: string };
}

const AnimatedBubble: React.FC<AnimatedBubbleProps> = ({ text, position }) => {
  return (
    <motion.div
      className="absolute bg-white text-black p-4 rounded-lg shadow-lg"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ top: position.top, left: position.left }}
    >
      {text}
    </motion.div>
  );
};

export default AnimatedBubble;
