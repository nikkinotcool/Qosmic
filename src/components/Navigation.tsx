import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Magnetic } from './Magnetic';
import { useCursor } from '../context/CursorContext';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/work', label: 'Work' },
  { path: '/services', label: 'Services' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export const Navigation: React.FC = () => {
  const { setHoverState } = useCursor();
  const { scrollY } = useScroll();
  
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] flex justify-center w-full px-8 pointer-events-none">
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.4)",
          backdropFilter: isScrolled ? "blur(20px)" : "blur(12px)",
          padding: isScrolled ? "0.5rem 0.75rem" : "0.75rem 1rem",
          borderColor: isScrolled ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.05)",
        }}
        className="flex items-center gap-1 glass-pill pointer-events-auto border transition-colors duration-500"
        transition={{ 
          y: { delay: 0.5, type: 'spring', stiffness: 100 },
          opacity: { delay: 0.5 },
          default: { duration: 0.5 }
        }}
      >
        {navItems.map((item) => (
          <Magnetic key={item.path} strength={0.2}>
            <NavLink
              to={item.path}
              onMouseEnter={() => setHoverState('button')}
              onMouseLeave={() => setHoverState('default')}
              className={({ isActive }) => `
                relative px-5 py-2 rounded-full transition-all duration-500 text-[11px] font-bold tracking-[0.1em] uppercase
                ${isActive ? 'text-void bg-void/5' : 'text-void/40 hover:text-void'}
              `}
            >
              <span className="relative z-10">{item.label}</span>
            </NavLink>
          </Magnetic>
        ))}
      </motion.nav>
    </div>
  );
};
