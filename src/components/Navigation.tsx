import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Magnetic } from './Magnetic';
import { useCursor } from '../context/CursorContext';
import { Logo } from './Logo';

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
      {/* Global Branding - Desktop Only */}
      <div className="fixed top-0 left-0 w-full p-8 hidden md:flex justify-between items-start z-[10000] pointer-events-none">
        <Logo className="text-xl pointer-events-auto" />
        <div className="text-xs font-mono text-void/40 tracking-widest uppercase">EST. 2026 // HYD</div>
      </div>

      {/* Desktop Navigation Pill */}
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
      <div className="fixed top-0 left-0 w-full z-[10000] md:hidden px-6 py-8 flex justify-between items-center pointer-events-none">
        <Logo 
          className="text-sm pointer-events-auto" 
        />
        <div className="flex items-center gap-5 pointer-events-auto">
          <span className="text-void/40 text-[9px] font-mono tracking-widest uppercase">
            EST. 2026 // HYD
          </span>
          <AnimatePresence>
            {!isMenuOpen && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsMenuOpen(true)}
                className="text-void p-2"
              >
                <Menu size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[10001] bg-white md:hidden"
          >
            {/* Header inside overlay to maintain layout but use different buttons */}
            <div className="absolute top-0 left-0 w-full px-6 py-8 flex justify-between items-center">
              {/* Spacer where logo would be (since original logo is already visible at z-10000) */}
              <div className="w-20" /> 
              
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-void p-2 pointer-events-auto"
                aria-label="Close menu"
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
