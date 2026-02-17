import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight, X } from 'lucide-react';

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

const projects = [
  {
    id: 1,
    title: "DEZYN.IQ",
    result: "300% growth in organic inbound leads.",
    category: "Full-Stack Content & Funnels",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    challenge: "Scaling brand authority in a noisy market with fragmented content systems.",
    solution: "Implementation of a high-leverage content flywheel and automated lead qualification pipeline.",
    outcome: "Transformed brand perception and achieved consistent 7-figure inbound pipeline."
  },
  {
    id: 2,
    title: "Surya Polymers",
    result: "B2B infrastructure scaling for global export.",
    category: "Industrial Growth Systems",
    image: "https://images.unsplash.com/photo-1565514020176-892264b77f98?q=80&w=2670&auto=format&fit=crop",
    challenge: "Traditional industrial manufacturer needing to modernize for direct global client acquisition.",
    solution: "Engineered a high-performance B2B portal with IndiaMart integration and Meta Ads architecture.",
    outcome: "Direct digital acquisition now accounts for 40% of total export volume."
  },
  {
    id: 3,
    title: "See Beyond",
    result: "The leading platform for trading education.",
    category: "Content Strategy & Production",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2670&auto=format&fit=crop",
    challenge: "High-quality education being lost in low-effort social media noise.",
    solution: "Cinematic production standards combined with psychological content triggers and scripting.",
    outcome: "Dominant market position with 500k+ organic reach and high-retention student ecosystem."
  }
];

export const Work: React.FC = () => {
  const { setHoverState } = useCursor();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="w-full min-h-screen pt-32 px-8 relative z-10 pb-32 text-void">
      <header className="max-w-[1400px] mx-auto mb-20 md:mb-32">
        <motion.span 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          className="text-luxury block mb-4"
        >
          PORTFOLIO
        </motion.span>
        <motion.h1 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="text-[10vw] md:text-[7vw] font-bold tracking-tighter leading-[0.9] uppercase"
        >
          Proof of<br />gravity.
        </motion.h1>
        <motion.p 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-void/50 mt-8 max-w-2xl leading-relaxed font-medium"
        >
          A look at what happens when strategy meets execution.
        </motion.p>
      </header>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseEnter={() => setHoverState('card')}
            onMouseLeave={() => setHoverState('default')}
            onClick={() => setSelectedProject(project)}
            className="group relative aspect-[4/5] bg-black overflow-hidden rounded-2xl cursor-pointer card-premium"
          >
            <motion.img 
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-[10px] font-mono text-white/40 mb-2 tracking-[0.3em] block uppercase font-bold">{project.category}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter mb-2">{project.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-medium uppercase mb-6">
                {project.result}
              </p>
              <div className="flex items-center gap-2 text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                View Project <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8 bg-void/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative scrollbar-hide"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 p-4 bg-void/5 rounded-full hover:bg-void hover:text-white transition-all z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square md:aspect-auto h-full">
                  <img src={selectedProject.image} className="w-full h-full object-cover grayscale" alt={selectedProject.title} />
                </div>
                <div className="p-12 md:p-16 space-y-12">
                  <div>
                    <span className="text-luxury block mb-4">{selectedProject.category}</span>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">{selectedProject.title}</h2>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-2">Challenge</h4>
                      <p className="text-lg leading-relaxed text-void/80">{selectedProject.challenge}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-2">Solution</h4>
                      <p className="text-lg leading-relaxed text-void/80">{selectedProject.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-2">Outcome</h4>
                      <p className="text-lg font-bold leading-relaxed text-void">{selectedProject.outcome}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-void/5">
                    <p className="text-sm font-bold tracking-widest text-void italic uppercase opacity-60">
                      Result: {selectedProject.result}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
