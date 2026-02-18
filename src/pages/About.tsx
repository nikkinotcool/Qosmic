import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useInView, type Variants } from 'framer-motion';
import { Check, X } from 'lucide-react';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const SectionDivider = () => (
  <div className="w-full h-px bg-black/[0.05] max-w-[1400px] mx-auto" />
);

const Counter = ({ target, duration = 2 }: { target: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = target;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration * 60);
      const increment = end / totalFrames;
      
      let timer = 0;
      const handle = setInterval(() => {
        timer++;
        start += increment;
        setCount(Math.floor(start));
        if (timer >= totalFrames) {
          setCount(end);
          clearInterval(handle);
        }
      }, frameRate);
      return () => clearInterval(handle);
    }
  }, [isInView, target, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

const StrategyMap = () => {
  const words = ["ATTENTION", "SYSTEMS", "SIGNAL", "GROWTH", "SCALE", "CONVERSION"];
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-void/[0.01] rounded-[2rem] border border-black/[0.03]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
      {words.map((word, i) => (
        <motion.span
          key={word}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            x: [Math.random() * 40 - 20, Math.random() * 40 - 20],
            y: [Math.random() * 40 - 20, Math.random() * 40 - 20],
          }}
          transition={{ 
            duration: 10 + i * 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute text-[8px] md:text-[10px] font-bold tracking-[0.5em] uppercase opacity-20 pointer-events-none"
          style={{
            top: `${20 + (i * 12)}%`,
            left: `${15 + (i * 8)}%`
          }}
        >
          {word}
        </motion.span>
      ))}
      {/* System nodes */}
      <div className="relative w-full h-full">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, delay: i, repeat: Infinity }}
            className="absolute w-2 h-2 rounded-full bg-black"
            style={{
              top: `${30 + i * 15}%`,
              left: `${40 + (i % 2) * 20}%`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const ControlRoomUI = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const xTranslate = useSpring(useTransform(mouseX, [0, window.innerWidth], [-15, 15]), { stiffness: 100, damping: 30 });
  const yTranslate = useSpring(useTransform(mouseY, [0, window.innerHeight], [-15, 15]), { stiffness: 100, damping: 30 });

  const labels = ["LIMITED CLIENTS", "GLOBAL DELIVERY", "SYSTEMS ACTIVE", "HIGH LEVERAGE", "SIGNAL > NOISE"];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div 
        style={{ x: xTranslate, y: yTranslate }}
        className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,1)_1px,transparent_1px)] bg-[size:60px_60px]"
      />
      {labels.map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          className="absolute text-[8px] md:text-[9px] font-bold tracking-[0.4em] uppercase"
          style={{
            top: `${15 + (i * 18)}%`,
            left: i % 2 === 0 ? "5%" : "auto",
            right: i % 2 !== 0 ? "5%" : "auto"
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 8, delay: i * 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.div>
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: "-10vw", opacity: 0 }}
          animate={{ x: "110vw", opacity: [0, 0.3, 0] }}
          transition={{ duration: 12, delay: i * 3, repeat: Infinity, ease: "linear" }}
          className="absolute h-px w-6 bg-gradient-to-r from-transparent via-black/20 to-transparent"
          style={{ top: `${20 + i * 15}%` }}
        />
      ))}
    </div>
  );
};

const team = [
  { name: "Nikhil — Lead Architect", role: "Systems. Story. Scale.", bio: "Builds digital gravity.", image: "/team/nikhil.jpg" },
  { name: "Zoro — Chief Morale Officer", role: "Ensures operational sanity.", bio: "Paid in treats.", image: "/team/zoro.jpg" },
  { name: "Unit 003 — Specialist", role: "Visual Engineering.", bio: "Translating signal into sight.", image: "" },
  { name: "Unit 004 — Specialist", role: "Motion Design.", bio: "Adding momentum to the void.", image: "" },
  { name: "Unit 005 — Specialist", role: "Growth Strategy.", bio: "Engineering unfair advantage.", image: "" },
  { name: "Unit 006 — Specialist", role: "Technical Lead.", bio: "Building future-proof systems.", image: "" }
];

const timeline = [
  { year: "2025", event: "Independent creative work" },
  { year: "2026", event: "Qosmic launched" }
];

export const About: React.FC = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start center", "end center"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="w-full relative z-10 text-void">
      <div className="noise-overlay" />
      
      {/* 
          TRANSPARENT HEADER & TEAM SECTION 
          This reveals the LavaBackground from Layout
      */}
      <header className="pt-32 md:pt-44 px-6 md:px-8 max-w-[1400px] mx-auto mb-12 md:mb-16 text-center">
        <motion.h1 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] uppercase"
        >
          The<br />architects.
        </motion.h1>
      </header>

      {/* Team Section - Transparent */}
      <section className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 px-4 mb-24 md:mb-32">
        {team.map((member, _idx) => (
          <motion.div 
            key={member.name}
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center justify-between gap-4 group text-center card-premium p-5 md:p-8 rounded-[2rem] relative overflow-hidden aspect-[3/4.2]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-void/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="overflow-hidden rounded-xl bg-gray-100/50 w-full aspect-[4/5] relative shadow-xl z-10">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-110 group-hover:scale-100"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${member.name.split(' ')[0]}&background=000&color=fff&size=512`;
                }}
              />
            </div>
            <div className="space-y-2 w-full text-void z-10 relative md:group-hover:translate-y-[-4px] transition-transform duration-700 mt-auto">
              <h2 className="text-[9px] md:text-[10px] font-bold opacity-40 uppercase tracking-widest">{member.name}</h2>
              <p className="text-base md:text-lg font-black tracking-tighter leading-none uppercase">{member.role}</p>
              <p className="text-xs md:text-sm opacity-60 italic font-medium leading-tight">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* 
          SOLID WHITE BACKGROUND FROM HERE DOWN 
      */}
      <div className="bg-surface relative z-10 pb-24">
        <SectionDivider />

        {/* SECTION 1: VISUAL STATEMENT */}
        <section className="section-padding max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            {["WE DESIGN BRANDS.", "WE BUILD SYSTEMS.", "WE ENGINEER ATTENTION."].map((line, i) => (
              <motion.h2 
                key={line}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]"
              >
                {line}
              </motion.h2>
            ))}
            <motion.p 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base md:text-lg opacity-40 max-w-sm mt-8 uppercase font-bold tracking-widest"
            >
              Built for scale, clarity and conversion. Surgical execution for global brands.
            </motion.p>
          </div>
          <Reveal delay={0.4}>
            <StrategyMap />
          </Reveal>
        </section>

        <SectionDivider />

        {/* SECTION 2: OPERATING MODEL / CONTROL ROOM */}
        <section className="relative section-padding border-y border-black/[0.03] overflow-hidden min-h-[60vh] flex flex-col items-center justify-center">
          <ControlRoomUI />
          <div className="relative z-10 text-center space-y-12">
            <div className="space-y-4 md:space-y-6">
              {["INDEPENDENT STUDIO.", "SMALL TEAM.", "HIGH LEVERAGE EXECUTION."].map((line, i) => (
                <motion.h3 
                  key={line}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]"
                >
                  {line}
                </motion.h3>
              ))}
            </div>
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              className="max-w-2xl mx-auto space-y-6"
            >
              <p className="text-xl md:text-2xl opacity-70 font-bold leading-tight tracking-tight uppercase">
                We operate as a focused independent studio.<br />
                Every project receives senior-level execution.<br />
                No layers. No noise. Just results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: STATS STRIP (BLACK) */}
        <section className="bg-void text-surface py-20 overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 items-start">
            {[
              { label: "PROJECTS BUILT", val: 12, suffix: "+" },
              { label: "CLIENTS SERVED", val: 8, suffix: "" },
              { label: "SYSTEMS DEPLOYED", val: 24, suffix: "" },
              { label: "AVG DELIVERY", val: 14, suffix: "D" },
              { label: "FOCUS CAPACITY", val: 3, suffix: "/5" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4"
              >
                <div className="text-4xl md:text-6xl font-black tracking-tighter flex items-end gap-1">
                  <Counter target={stat.val} />
                  <span className="text-xl md:text-2xl opacity-30 pb-1">{stat.suffix}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">{stat.label}</p>
                  <div className="h-px w-full bg-surface/10 origin-left" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ALIGNMENT */}
        <section className="section-padding max-w-[1400px] mx-auto">
          <header className="mb-16 md:mb-24 text-center">
            <motion.span variants={revealVariants} initial="hidden" whileInView="visible" className="text-luxury block mb-4">ALIGNMENT</motion.span>
            <motion.h2 variants={revealVariants} initial="hidden" whileInView="visible" className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic opacity-40">Are we a match?</motion.h2>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* GOOD FIT */}
            <motion.div 
              variants={revealVariants} initial="hidden" whileInView="visible"
              className="p-8 md:p-16 rounded-[2.5rem] border border-black/5 bg-black/[0.02] space-y-12 card-premium"
            >
              <div className="flex items-center gap-4 text-green-600">
                <Check className="w-6 h-6" />
                <h4 className="text-xl font-bold tracking-widest uppercase">Good Fit</h4>
              </div>
              <ul className="space-y-6">
                {["Brands serious about growth", "Founders building long-term", "People who value execution", "Businesses ready to scale"].map(item => (
                  <li key={item} className="text-xl md:text-3xl font-black tracking-tighter uppercase leading-none opacity-80">{item}</li>
                ))}
              </ul>
            </motion.div>

            {/* NOT A FIT */}
            <motion.div 
              variants={revealVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }}
              className="p-8 md:p-16 rounded-[2.5rem] border border-black/5 bg-black/[0.01] space-y-12 card-premium"
            >
              <div className="flex items-center gap-4 opacity-40">
                <X className="w-6 h-6" />
                <h4 className="text-xl font-bold tracking-widest uppercase">Not a Fit</h4>
              </div>
              <ul className="space-y-6">
                {["Quick cheap work", "Low budget projects", "No clarity brands", "\"Just logo bro\" clients"].map(item => (
                  <li key={item} className="text-xl md:text-3xl font-black tracking-tighter uppercase leading-none opacity-30">{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        <SectionDivider />

        {/* Timeline Section */}
        <section className="section-padding max-w-[1400px] mx-auto text-void">
          <motion.h3 variants={revealVariants} initial="hidden" whileInView="visible" className="text-[10px] md:text-xs font-bold mb-16 md:mb-32 uppercase tracking-[0.4em] opacity-40 text-center">Journey</motion.h3>
          <div ref={timelineRef} className="max-w-4xl mx-auto relative px-4">
            <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-black/5" />
            <motion.div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-black origin-top z-10" style={{ scaleY }} />
            <div className="space-y-24 md:space-y-40 relative">
                          {timeline.map((item, _idx) => (
                            <TimelineItem key={item.year} item={item} index={_idx} />
                          ))}            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-padding max-w-[1400px] mx-auto text-center px-6 pb-12">
          <motion.h3 variants={revealVariants} initial="hidden" whileInView="visible" className="text-[10px] md:text-xs font-bold mb-12 md:mb-20 uppercase tracking-[0.4em] opacity-40">Philosophy</motion.h3>
          <div className="flex flex-col gap-4 text-[12vw] md:text-[6vw] font-bold tracking-tighter leading-none uppercase">
            <motion.span variants={revealVariants} initial="hidden" whileInView="visible">Small team.</motion.span>
            <motion.span variants={revealVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.1 }}>High leverage.</motion.span>
            <motion.span variants={revealVariants} initial="hidden" whileInView="visible" transition={{ delay: 0.2 }} className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-500">Built for impact.</motion.span>
          </div>
        </section>

        {/* Micro Trust Signals */}
        <footer className="max-w-[1400px] mx-auto text-center py-10 opacity-30 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
          <span>Selective collaborations</span>
          <span className="hidden md:block w-1 h-1 bg-black rounded-full" />
          <span>Independent studio</span>
          <span className="hidden md:block w-1 h-1 bg-black rounded-full" />
          <span>Est. 2026</span>
        </footer>
      </div>
    </div>
  );
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } } }}
      initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className={className}
    >
      {children}
    </motion.div>
  );
};

const TimelineItem = ({ item, index }: { item: any, index: number }) => {
  const isEven = index % 2 === 0;
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div className="w-4 h-4 rounded-full bg-white border-2 border-black" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: false, margin: "-10%" }} />
      </div>
      <div className={`${isEven ? 'text-center md:text-right' : 'order-2 text-center md:text-left'} pt-4`}>
        <motion.div initial={{ opacity: 0, x: isEven ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
          <span className="text-5xl md:text-8xl font-bold italic tracking-tighter opacity-10 block mb-2">{item.year}</span>
          <h4 className="text-xl md:text-3xl font-bold tracking-tight uppercase leading-none">{item.event}</h4>
        </motion.div>
      </div>
      <div className={`${isEven ? 'order-2' : ''}`} />
    </div>
  );
};
