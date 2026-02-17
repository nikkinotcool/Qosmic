import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { Orbit, Zap, Layers, Cpu, Eye, Settings, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Magnetic } from '../components/Magnetic';

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

const SectionHeader = ({ label, title, subtext, centered = false, dark = false }: { label: string, title: string, subtext?: string, centered?: boolean, dark?: boolean }) => {
  return (
    <div className={`mb-12 md:mb-20 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.span 
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-luxury block mb-4"
      >
        {label}
      </motion.span>
      <motion.h2 
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 ${dark ? 'text-white' : 'text-void'}`}
      >
        {title}
      </motion.h2>
      {subtext && (
        <motion.p 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-base md:text-xl leading-relaxed max-w-2xl ${centered ? 'mx-auto' : ''} ${dark ? 'text-white/50' : 'text-void/50'}`}
        >
          {subtext}
        </motion.p>
      )}
    </div>
  );
};

const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Home: React.FC = () => {
  const { setHoverState } = useCursor();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="w-full relative font-sans selection:bg-void selection:text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 md:px-8 md:sticky top-0 z-0 py-20 md:py-0">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }} 
          className="max-w-[1400px] mx-auto w-full flex flex-col items-center justify-center z-10"
        >
          <div className="text-center">
            <motion.h1 
              onMouseEnter={() => setHoverState('button')}
              onMouseLeave={() => setHoverState('default')}
              className="text-[12vw] sm:text-[10vw] md:text-[7vw] font-black tracking-tighter leading-[0.85] cursor-none text-void uppercase flex flex-col items-center"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block">BUILDING</span>
              <span className="block relative text-void/90">DIGITAL GRAVITY.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 md:mt-16 text-center max-w-2xl px-4"
          >
            <p className="text-lg md:text-2xl font-bold tracking-tight text-void leading-tight italic">
              Design, systems and content that pull attention naturally.
            </p>
            <div className="h-px w-12 bg-void/20 mx-auto mt-8" />
          </motion.div>

          <motion.div 
            className="hidden md:block absolute -bottom-24 left-1/2 -translate-x-1/2 text-luxury opacity-30 whitespace-nowrap uppercase tracking-widest font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Scroll to enter void
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 1: MANIFESTO */}
      <section className="relative z-10 section-padding bg-white border-t border-black/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <Reveal>
            <div className="flex justify-center">
              <div className="p-10 md:p-20 bg-void/5 rounded-full relative group">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="relative z-10 text-void"
                >
                  <Orbit className="w-20 h-20 md:w-32 md:h-32 opacity-80" strokeWidth={1} />
                </motion.div>
                <div className="absolute inset-0 bg-void/5 rounded-full animate-pulse scale-110" />
              </div>
            </div>
          </Reveal>

          <div className="space-y-12">
            <div className="mb-12">
              <motion.span variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-luxury block mb-4">MANIFESTO</motion.span>
              <div className="space-y-8 relative">
                <div className="absolute -left-6 md:-left-8 top-0 bottom-0 w-px bg-void/10" />
                <Reveal>
                  <h3 className="text-3xl sm:text-4xl md:text-7xl font-bold leading-[0.95] tracking-tighter uppercase text-void">
                    We don't chase trends.<br />
                    <span className="text-void/40">We bend them.</span>
                  </h3>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-lg md:text-2xl font-medium leading-relaxed max-w-lg text-void/70 italic">
                    We are digital alchemists transforming noise into signal. Building brands that dominate orbit.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PHILOSOPHY PILLARS */}
      <section className="relative z-10 section-padding bg-void text-white shadow-2xl">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader 
            label="CAPABILITIES" 
            title="Built for gravitational growth." 
            subtext="Strategy. Systems. Execution that compounds." 
            centered 
            dark
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                label: "FOUNDATION",
                title: "Strategy", 
                icon: Zap, 
                text: "We find leverage where others see noise.",
                subtext: "Positioning, growth systems and digital architecture."
              },
              { 
                label: "PERCEPTION",
                title: "Content", 
                icon: Layers, 
                text: "Attention engineered, not requested.",
                subtext: "Visual systems that pull and convert."
              },
              { 
                label: "INFRASTRUCTURE",
                title: "Technology", 
                icon: Cpu, 
                text: "Built to scale without friction.",
                subtext: "Automation, performance and digital ecosystems."
              }
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="group p-8 md:p-12 h-full rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] md:hover:-translate-y-[6px] transition-all duration-[400ms] cursor-default shadow-[0_10px_30px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.02)]">
                  <div className="flex flex-col h-full text-white">
                    <item.icon className="w-8 h-8 md:w-10 md:h-10 mb-8 md:mb-12 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" strokeWidth={1} />
                    <div className="space-y-6">
                      <span className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase block">{item.label}</span>
                      <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">{item.title}</h3>
                      <div className="space-y-4 pt-4 border-t border-white/5">
                        <p className="text-lg md:text-xl font-bold leading-tight tracking-tight text-white/90">{item.text}</p>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">{item.subtext}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: METHOD / PROCESS */}
      <section className="relative z-10 section-padding bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader label="PROCESS" title="The method to the gravity." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative mt-12">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-void/5 hidden md:block -z-10" />
            {[
              { id: "01", title: "Observe", icon: Eye, desc: "Studying market patterns until signals emerge." },
              { id: "02", title: "Engineer", icon: Settings, desc: "Designing systems that create momentum." },
              { id: "03", title: "Amplify", icon: Activity, desc: "Deploying growth via content and automation." }
            ].map((step, i) => (
              <Reveal key={step.id} delay={i * 0.2}>
                <div className="relative h-full bg-white/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] group card-premium">
                  <span className="absolute -top-8 md:-top-12 -right-4 text-[6rem] md:text-[10rem] font-black opacity-[0.03] pointer-events-none transition-opacity group-hover:opacity-[0.05]">
                    {step.id}
                  </span>
                  <div className="p-4 bg-void/5 rounded-2xl w-fit mb-8 group-hover:bg-void group-hover:text-white transition-colors duration-500">
                    <step.icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl md:text-3xl font-bold mb-4 uppercase tracking-tighter text-void">{step.title}</h4>
                  <p className="text-base md:text-lg text-void/50 leading-relaxed max-w-xs">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: SELECTED WORK */}
      <section className="relative z-10 section-padding bg-void text-white overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12"
        >
          <div className="space-y-4 text-center md:text-left">
            <SectionHeader 
              label="PROOF" 
              title="Work that moves markets." 
              subtext="We don’t just design. We reposition brands. Every project built for attention and conversion." 
              dark
            />
          </div>
          <div className="text-center md:text-right space-y-8 w-full md:w-auto">
            <Reveal>
              <p className="text-sm md:text-lg font-medium text-white/40 uppercase tracking-widest mb-4">
                Explore how we build digital gravity.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="flex justify-center md:justify-end">
              <Magnetic>
                <Link 
                  to="/work"
                  onMouseEnter={() => setHoverState('button')}
                  onMouseLeave={() => setHoverState('default')}
                  className="px-8 py-5 md:px-12 md:py-6 border border-white/20 text-white rounded-full text-base md:text-xl font-bold uppercase tracking-widest flex items-center gap-4 hover:bg-white hover:text-black transition-all duration-500 group shadow-2xl"
                >
                  View Case Studies 
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.span>
                </Link>
              </Magnetic>
            </Reveal>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: FINAL CTA */}
      <section className="relative z-10 section-padding bg-white border-t border-black/10 text-center overflow-hidden">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <Reveal>
            <h3 className="text-4xl sm:text-5xl md:text-[8vw] font-bold tracking-tighter uppercase leading-none mb-12 md:mb-20 text-void">
              Let's build<br />
              <span className="italic opacity-40">your gravity.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic>
              <Link 
                to="/contact"
                onMouseEnter={() => setHoverState('button')}
                onMouseLeave={() => setHoverState('default')}
                className="px-10 py-6 md:px-16 md:py-8 bg-void text-white rounded-full text-lg md:text-2xl font-black uppercase tracking-[0.2em] inline-block btn-premium"
              >
                Start a project
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
