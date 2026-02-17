import React, { useRef } from 'react';
import { motion, useScroll, useSpring, type Variants } from 'framer-motion';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const team = [
  {
    name: "Nikhil — Lead Architect",
    role: "Systems. Story. Scale.",
    bio: "Builds digital gravity.",
    image: "/team/nikhil.jpg"
  },
  {
    name: "Zoro — Chief Morale Officer",
    role: "Ensures operational sanity.",
    bio: "Paid in treats.",
    image: "/team/zoro.jpg"
  }
];

const timeline = [
  { year: "2025", event: "Independent creative work" },
  { year: "2026", event: "Qosmic launched" }
];

export const About: React.FC = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="w-full pt-32 md:pt-40 px-6 md:px-8 relative z-10 pb-24 text-void">
      <header className="max-w-[1400px] mx-auto mb-20 md:mb-32 text-center">
        <motion.h1 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] uppercase"
        >
          The<br />architects.
        </motion.h1>
      </header>

      {/* Team Section */}
      <section className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-center gap-12 md:gap-12 mb-24 md:mb-60">
        {team.map((member, idx) => (
          <motion.div 
            key={member.name}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8 group text-center card-premium p-8 rounded-3xl"
          >
            <div className="overflow-hidden rounded-xl bg-gray-100 w-48 h-60 relative shadow-2xl">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name.split(' ')[0]}&background=000&color=fff&size=512`;
                }}
              />
            </div>
            
            <div className="space-y-4 max-w-xs text-void">
              <h2 className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-widest">{member.name}</h2>
              <p className="text-xl md:text-2xl font-bold tracking-tight leading-tight">
                {member.role}
              </p>
              <p className="text-base md:text-lg opacity-50 italic font-medium">
                {member.bio}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="max-w-[1400px] mx-auto mb-24 md:mb-60 pt-20 md:pt-24 border-t border-black/10 text-void">
        <motion.h3 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          className="text-[10px] md:text-xs font-bold mb-16 md:mb-32 uppercase tracking-[0.4em] opacity-40 text-center"
        >
          Journey
        </motion.h3>
        
        <div ref={timelineRef} className="max-w-4xl mx-auto relative px-4">
          {/* Animated Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-black/5" />
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-black origin-top z-10"
            style={{ scaleY }}
          />

          <div className="space-y-24 md:space-y-60 relative">
            {timeline.map((item, idx) => (
              <TimelineItem 
                key={item.year} 
                item={item} 
                index={idx} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-[1400px] mx-auto mb-20 md:mb-40 text-center text-void px-6">
        <motion.h3 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          className="text-[10px] md:text-xs font-bold mb-12 md:mb-20 uppercase tracking-[0.4em] opacity-40"
        >
          Philosophy
        </motion.h3>
        <div className="flex flex-col gap-4 text-[12vw] md:text-[6vw] font-bold tracking-tighter leading-none uppercase">
          <motion.span variants={revealVariants} initial="hidden" whileInView="visible">Small team.</motion.span>
          <motion.span variants={revealVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }}>High leverage.</motion.span>
          <motion.span variants={revealVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.2 }} className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">Zero noise.</motion.span>
        </div>
      </section>
    </div>
  );
};

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
      {/* Pitstop Dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
          className="w-4 h-4 rounded-full bg-white border-2 border-black"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
        />
      </div>

      <div className={`${isEven ? 'text-center md:text-right' : 'order-2 text-center md:text-left'} pt-4`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-5xl md:text-8xl font-bold italic tracking-tighter opacity-10 block mb-2 text-void">{item.year}</span>
          <h4 className="text-xl md:text-3xl font-bold tracking-tight uppercase leading-none text-void">{item.event}</h4>
        </motion.div>
      </div>
      
      <div className={`${isEven ? 'order-2' : ''}`} />
    </div>
  );
};
