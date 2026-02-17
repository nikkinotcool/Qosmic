import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000] hidden md:flex justify-center w-full px-8 pointer-events-none">
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

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full z-[1000] md:hidden px-6 py-8 flex justify-between items-center mix-blend-difference pointer-events-none">
        <NavLink to="/" className="text-white font-bold tracking-[0.2em] text-sm pointer-events-auto">
          QOSMIC
        </NavLink>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="text-white pointer-events-auto p-2"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1001] bg-white md:hidden"
          >
            <div className="absolute top-0 left-0 w-full px-6 py-8 flex justify-between items-center">
              <span className="text-void font-bold tracking-[0.2em] text-sm">
                QOSMIC
              </span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-void p-2"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="h-full flex flex-col justify-center items-center gap-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `
                      text-4xl font-bold tracking-tight transition-colors
                      ${isActive ? 'text-void' : 'text-void/40'}
                    `}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
