import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { useCursor } from '../context/CursorContext';

interface LogoProps {
  className?: string;
  spanClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  spanClassName = "font-bold tracking-[0.3em]"
}) => {
  const { setHoverState } = useCursor();
  const [isHovered, setIsHovered] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleTap = () => {
    setIsTapping(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsTapping(false), 250);
  };

  const showInverted = isHovered || isTapping;

  return (
    <NavLink 
      to="/" 
      onMouseEnter={() => {
        setHoverState('button');
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setHoverState('default');
        setIsHovered(false);
      }}
      onMouseMove={handleMouseMove}
      onClick={handleTap}
      className={`relative inline-block ${className}`}
    >
      <div ref={containerRef} className="relative py-1 cursor-pointer overflow-visible">
        {/* Layer 1: Base Visibility Layer - Hard Black */}
        <span 
          className={`block uppercase text-void ${spanClassName}`}
        >
          QOSMIC
        </span>

        {/* Layer 2: Hover Layer - Transitions to White/Void based on showInverted */}
        <motion.div
          className="absolute inset-0 py-1 overflow-hidden pointer-events-none select-none"
          initial={false}
          animate={{ 
            clipPath: showInverted 
              ? `circle(150% at ${mousePos.x}% ${mousePos.y}%)` 
              : `circle(0% at ${mousePos.x}% ${mousePos.y}%)`
          }}
          transition={{ 
            duration: isTapping ? 0.2 : 0.6, 
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <span 
            className={`block uppercase text-white bg-void ${spanClassName}`}
          >
            QOSMIC
          </span>
        </motion.div>
      </div>
    </NavLink>
  );
};
