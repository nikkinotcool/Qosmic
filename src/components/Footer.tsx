import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCursor } from '../context/CursorContext';
import { Logo } from './Logo';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const Footer: React.FC = () => {
  const { setHoverState } = useCursor();

  return (
    <div className="relative w-full overflow-hidden bg-void">
      {/* Strong Visual Divider / Background Shift */}
      <div className="w-full h-px bg-white/10" />
      
      <footer className="relative w-full py-20 md:py-32 px-6 md:px-8 font-sans">
        {/* Subtle Background Decoration - No blur filter */}
        <motion.div 
          className="absolute -bottom-20 -right-20 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full pointer-events-none -z-10"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)' }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="max-w-[1400px] mx-auto">
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-20 items-start mb-20 md:mb-24"
          >
            {/* LEFT SECTION */}
            <div className="space-y-6 text-center md:text-left">
              <Logo 
                className="text-3xl md:text-4xl" 
                spanClassName="font-black tracking-widest" 
              />
              <div className="text-white/40 text-[10px] md:text-sm leading-relaxed font-medium uppercase tracking-tight">
                Digital Gravity Agency<br />
                Hyderabad, India
              </div>
            </div>

            {/* CENTER SECTION (NAV) */}
            <div className="flex flex-col items-center md:items-start gap-4 text-base md:text-lg font-bold uppercase tracking-tight text-white/60">
              {['Home', 'Work', 'Services', 'About', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  onMouseEnter={() => setHoverState('button')}
                  onMouseLeave={() => setHoverState('default')}
                  className="link-premium w-fit text-white/60 hover:text-white after:bg-white"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* RIGHT SECTION */}
            <div className="flex flex-col gap-10 md:gap-12 items-center md:items-end md:text-right text-center">
              <div className="space-y-4">
                <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">CONNECT</p>
                <a 
                  href="mailto:hello@qosmic.studio" 
                  onMouseEnter={() => setHoverState('button')}
                  onMouseLeave={() => setHoverState('default')}
                  className="text-lg md:text-2xl font-medium text-white hover:text-white/50 transition-colors block link-premium after:bg-white"
                >
                  hello@qosmic.studio
                </a>
                <a 
                  href="https://instagram.com/qosmic.studio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoverState('button')}
                  onMouseLeave={() => setHoverState('default')}
                  className="text-lg md:text-2xl font-medium text-white hover:text-white/50 transition-colors block link-premium after:bg-white"
                >
                  @qosmic.studio
                </a>
              </div>
              <div className="text-white/20 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em]">
                EST. 2026 // HYD
              </div>
            </div>
          </motion.div>

          {/* BOTTOM STRIP */}
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6"
          >
            <div className="text-white/30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2026 QOSMIC. All rights reserved.
            </div>
            <div className="text-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] italic">
              Built with intent. Not templates.
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};
