import React, { useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ParticleProps {
  size: number;
  initialX: number;
  initialY: number;
  opacity: number;
  parallaxFactor: number; // Different "depths" for space feel
  driftX: number; // Slight horizontal drift
}

const Particle: React.FC<ParticleProps> = ({ size, initialX, initialY, opacity, parallaxFactor, driftX }) => {
  const { scrollYProgress } = useScroll();
  
  // Use a spring for smoother, non-glitchy scroll transformation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Cosmic vertical movement: particles move up as you scroll down
  // The travel distance depends on their "depth" (parallaxFactor)
  const y = useTransform(smoothProgress, [0, 1], [0, -parallaxFactor * 400]);
  
  // Subtle horizontal drift based on scroll
  const x = useTransform(smoothProgress, [0, 1], [0, driftX * 50]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[2] rounded-full bg-black"
      style={{
        width: size,
        height: size,
        left: `${initialX}vw`,
        top: `${initialY}vh`,
        opacity,
        x,
        y,
      }}
    />
  );
};

export const FloatingParticles: React.FC = () => {
  const particles = useMemo(() => {
    // Creating 60 particles for a more dense "star field" feel
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      // Smaller particles feel further away, larger ones closer
      size: Math.random() * 3 + 1, 
      initialX: Math.random() * 100,
      // Spread them vertically even beyond the viewport for consistent field
      initialY: Math.random() * 120, 
      // Varied opacity for depth
      opacity: Math.random() * 0.15 + 0.05,
      // parallaxFactor determines how "fast" they move: closer = faster
      parallaxFactor: Math.random() * 2 + 0.5,
      // Random horizontal drift direction
      driftX: (Math.random() - 0.5) * 2
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </>
  );
};
