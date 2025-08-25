import React from 'react';
import { motion } from 'framer-motion';

const colors = {
  mint: 'rgba(178, 223, 219, 0.6)',      
  peach: 'rgba(255, 209, 178, 0.6)',     
  lavender: 'rgba(215, 189, 226, 0.5)',    
  sky: 'rgba(193, 225, 249, 0.5)',      
};

const floatVariants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }
  }
};

const shapes = [
  { color: colors.mint, size: 'w-40 h-40', position: 'left-10 top-1/4', rotate: 45 },
  { color: colors.peach, size: 'w-32 h-32', position: 'right-20 top-1/3', rotate: -15 },
  { color: colors.lavender, size: 'w-28 h-28', position: 'left-1/4 bottom-1/3', rotate: 30 },
  { color: colors.sky, size: 'w-36 h-36', position: 'right-12 bottom-1/4', rotate: -45 },
];

function Background() {
  return (
    <>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-lg ${shape.size} ${shape.position} opacity-70`}
          style={{ 
            backgroundColor: shape.color,
            transform: `rotate(${shape.rotate}deg)`
          }}
          variants={floatVariants}
          animate="float"
          transition={{ 
            duration: 2.5 + index,
            delay: index * 0.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </>
  );
}

export default Background;
