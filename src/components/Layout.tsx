import React, { type ReactNode } from 'react';
import { LavaBackground } from './LavaBackground';
import { FloatingParticles } from './FloatingParticles';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // The main wrapper is z-0
    <div className="relative w-full min-h-screen bg-white text-void selection:bg-void selection:text-surface cursor-none">
      {/* Background Blobs - Now z-[1] inside this wrapper */}
      <LavaBackground />
      
      {/* Floating Particles - z-[2] */}
      <FloatingParticles />

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Content Layer - Higher z-index than LavaBackground */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      <Footer />
    </div>
  );
};
