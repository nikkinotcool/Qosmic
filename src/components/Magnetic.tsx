import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

interface MagneticProps {
  children: React.ReactElement<any>; // Allow any props on children
  className?: string;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, className = "", strength = 0.5 }) => {
  const { setMagneticTarget, setHoverState } = useCursor();
  const ref = useRef<HTMLDivElement>(null);
  
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const dx = (clientX - centerX) * strength;
    const dy = (clientY - centerY) * strength;
    
    x.set(dx);
    y.set(dy);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    setMagneticTarget(ref);
    setHoverState('magnetic');
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
    setMagneticTarget(null);
    setHoverState('default');
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
      style={{ x: smoothX, y: smoothY }}
    >
      {React.cloneElement(children, { className: `${children.props.className || ''} ${hovered ? 'scale-105' : ''}` })}
    </motion.div>
  );
};
