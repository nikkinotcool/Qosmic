import React from 'react';
import { motion } from 'framer-motion';

const Blob = ({ 
  color,
  initialPos, 
  size, 
  delay, 
  duration,
  blur
}: { 
  color: string;
  initialPos: { x: string; y: string }; 
  size: string; 
  delay: number;
  duration: number;
  blur: string;
}) => {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        left: initialPos.x,
        top: initialPos.y,
        filter: `blur(${blur})`,
      }}
      animate={{
        x: [0, 120, -60, 0],
        y: [0, -100, 140, 0],
        scale: [1, 1.3, 0.8, 1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    />
  );
};

export const LavaBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      <Blob 
        color="rgba(0,0,0,0.32)" 
        initialPos={{ x: '-15%', y: '-10%' }} 
        size="65vw" 
        delay={0} 
        duration={35} 
        blur="120px"
      />
      
      <Blob 
        color="rgba(0,0,0,0.28)" 
        initialPos={{ x: '55%', y: '5%' }} 
        size="55vw" 
        delay={2} 
        duration={42} 
        blur="100px"
      />
      
      <Blob 
        color="rgba(0,0,0,0.26)" 
        initialPos={{ x: '5%', y: '55%' }} 
        size="60vw" 
        delay={5} 
        duration={30} 
        blur="110px"
      />
      
      <Blob 
        color="rgba(0,0,0,0.22)" 
        initialPos={{ x: '65%', y: '65%' }} 
        size="45vw" 
        delay={3} 
        duration={48} 
        blur="130px"
      />
    </div>
  );
};
