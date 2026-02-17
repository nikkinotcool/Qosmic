import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-void font-sans"
    >
      <div className="relative flex items-center justify-center">
        {/* Logo Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5, 
            duration: 1, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="text-white text-4xl md:text-6xl font-black tracking-[0.4em] z-10 uppercase"
        >
          QOSMIC
        </motion.div>

        {/* Orbiting Dot Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute w-64 h-64 md:w-96 md:h-96 pointer-events-none"
        >
          {/* Dot Animation */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-full h-full relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
