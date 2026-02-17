import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Compass, Camera, Code, ArrowUpRight, Cpu, Layers, Zap } from 'lucide-react';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const serviceCards = [
  {
    title: "Strategy",
    icon: <Compass className="w-6 h-6" />,
    description: "We design high-leverage systems that turn attention into revenue through precision engineering.",
    items: ["Lead funnels", "Offer engineering", "Paid growth systems", "Conversion systems"]
  },
  {
    title: "Content",
    icon: <Camera className="w-6 h-6" />,
    description: "Visual weaponry designed to stop the scroll and build undeniable brand authority.",
    items: ["Reels", "Visual hooks", "Filming production", "Editing & posting"]
  },
  {
    title: "Development",
    icon: <Code className="w-6 h-6" />,
    description: "Future-proof digital architecture that scales your operations while you sleep.",
    items: ["Web experiences", "Automation", "Lead funnels", "Landing systems"]
  }
];

export const Services: React.FC = () => {
  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 px-6 md:px-8 relative z-10 pb-24 font-sans text-void">
      {/* SECTION 1: SERVICES HERO */}
      <section className="max-w-[1400px] mx-auto mb-16 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, x: -30 },
            visible: { 
              opacity: 1, 
              x: 0,
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 text-center md:text-left"
        >
          <div className="space-y-4">
            <motion.span variants={revealVariants} className="text-luxury block uppercase">Expertise</motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-[6vw] font-bold tracking-tighter leading-[1] uppercase">
              Engineering <br />
              unfair advantage.
            </h1>
          </div>
          <p className="text-lg md:text-2xl text-void/60 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
            We design systems, content and digital infrastructure that pull attention and convert it into growth.
          </p>
        </motion.div>

        {/* Right: Refined Minimal Visual */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.9, x: 30 },
            visible: { 
              opacity: 1, 
              scale: 1, 
              x: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          initial="hidden"
          animate="visible"
          className="flex justify-center md:justify-end"
        >
          <div className="relative p-8 md:p-20 bg-void/5 rounded-[2.5rem] md:rounded-[3rem] group overflow-hidden">
            <motion.div
              animate={{ 
                rotate: 360
              }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
              className="relative z-10"
            >
              <div className="grid grid-cols-2 gap-4">
                <Zap className="w-10 h-10 md:w-12 md:h-12 opacity-20" strokeWidth={1} />
                <Layers className="w-10 h-10 md:w-12 md:h-12 opacity-20" strokeWidth={1} />
                <Cpu className="w-10 h-10 md:w-12 md:h-12 opacity-20" strokeWidth={1} />
                <ArrowUpRight className="w-10 h-10 md:w-12 md:h-12 opacity-20" strokeWidth={1} />
              </div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-tr from-void/5 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: SERVICES GRID */}
      <section className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {serviceCards.map((service, index) => (
          <motion.div
            key={service.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="group relative bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[2.5rem] card-premium"
          >
            <div className="flex flex-col h-full gap-8 text-void">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-void/5 rounded-2xl group-hover:bg-void group-hover:text-white transition-colors duration-500">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <ArrowUpRight className="w-6 h-6 opacity-0 md:group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight uppercase">{service.title}</h2>
                <p className="text-lg md:text-2xl opacity-60 max-w-md leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-8 mt-auto border-t border-void/5">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-void/10 group-hover:bg-void transition-colors duration-500" />
                      <span className="text-[10px] md:text-sm font-semibold tracking-tight text-void/70 uppercase link-premium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Closing conversion card */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-black text-white p-8 md:p-16 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-center items-center text-center gap-8 group card-premium"
        >
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-tight">
            If it grows your revenue — <br />
            <span className="opacity-20 md:hover:opacity-100 transition-opacity duration-1000 font-semibold italic">we build it.</span>
          </h3>
          <div className="h-px w-12 bg-white/20 md:group-hover:w-24 transition-all duration-500" />
        </motion.div>
      </section>
    </div>
  );
};
