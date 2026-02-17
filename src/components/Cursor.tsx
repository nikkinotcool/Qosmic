import React, { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

export const Cursor: React.FC = () => {
  const { hoverState } = useCursor();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 500, damping: 50, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div 
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference bg-white rounded-full"
      style={{ 
        x, 
        y, 
        translateX: '-50%', 
        translateY: '-50%',
        width: hoverState === 'button' || hoverState === 'card' || hoverState === 'magnetic' ? 64 : 12,
        height: hoverState === 'button' || hoverState === 'card' || hoverState === 'magnetic' ? 64 : 12,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    />
  );
};
