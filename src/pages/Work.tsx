import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useCursor } from '../context/CursorContext';
import { ArrowUpRight, X } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
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

const projects = [
  {
    id: 1,
    title: "DEZYN.IQ",
    tagline: "Interior Architecture & Design",
    category: "CONTENT STRATEGY • VIDEO PRODUCTION",
    problem: "High-end designs lacked a consistent digital narrative.",
    solution: "A cinematic reel framework delivering 2+ high-fidelity assets per week.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2600&auto=format&fit=crop",
    visualType: "Reel / Vertical Format",
    result: "300% growth in organic inbound leads."
  },
  {
    id: 2,
    title: "POLYMER B2B",
    tagline: "Industrial Manufacturing",
    category: "WEB DEVELOPMENT • UI/UX",
    problem: "Legacy business with zero digital footprint.",
    solution: "Complete digital transformation and B2B lead-gen website.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
    visualType: "Structural Website Mockup",
    result: "Digitizing a legacy business for global export."
  },
  {
    id: 3,
    title: "KRISHI MITHR",
    tagline: "Agri-Tech Innovation",
    category: "BRAND IDENTITY • MOTION GRAPHICS",
    problem: "New tech needed a face trusted by farmers.",
    solution: "Logo design and animated explainer video establishing instant trust.",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2670&auto=format&fit=crop",
    visualType: "Vector Logo / Motion Frame",
    result: "Establishment of market trust and tech-forward identity."
  },
  {
    id: 4,
    title: "QOSMIC",
    tagline: "Internal Agency Rebranding",
    category: "BRAND IDENTITY • STRATEGY",
    problem: "Needed a premium, cinematic digital presence.",
    solution: "Monochrome, cinematic agency identity reflecting high-leverage values.",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
    visualType: "Agency Identity System",
    result: "A cohesive, high-end digital gravity platform."
  }
];

export const Work: React.FC = () => {
  const { setHoverState } = useCursor();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="w-full min-h-screen pt-32 md:pt-40 px-6 md:px-8 relative z-10 pb-24 text-void">
      <div className="noise-overlay" />
      
      <header className="max-w-[1200px] mx-auto mb-16 md:mb-32">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-luxury block mb-4 uppercase tracking-[0.4em]"
        >
          Case Study Index
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[14vw] sm:text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] uppercase"
        >
          Proof of<br />gravity.
        </motion.h1>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => setSelectedProject(project)}
            setHoverState={setHoverState}
          />
        ))}
      </motion.div>

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
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              className="bg-surface w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative scrollbar-hide text-void"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 bg-void/5 rounded-full hover:bg-void hover:text-surface transition-all z-10"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[4/5] md:aspect-auto h-full bg-void/5">
                  <img src={selectedProject.image} className="w-full h-full object-cover grayscale" alt={selectedProject.title} />
                </div>
                <div className="p-8 md:p-20 space-y-12">
                  <div>
                    <span className="text-luxury block mb-4 opacity-40 uppercase tracking-[0.3em]">{selectedProject.category}</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">{selectedProject.title}</h2>
                    <p className="text-xl md:text-2xl font-medium opacity-60 mt-4 leading-tight italic">{selectedProject.tagline}</p>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3">The Problem</h4>
                      <p className="text-lg md:text-xl leading-relaxed font-medium">{selectedProject.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3">The Solution</h4>
                      <p className="text-lg md:text-xl leading-relaxed font-medium">{selectedProject.solution}</p>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-30 mb-3">Outcome</h4>
                      <p className="text-xl md:text-3xl font-bold leading-tight uppercase tracking-tight">{selectedProject.result}</p>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-void/10 flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 italic">
                      Visual: {selectedProject.visualType}
                    </span>
                    <ArrowUpRight className="w-6 h-6 opacity-20" />
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

interface ProjectCardProps {
  project: typeof projects[0];
  onClick: () => void;
  setHoverState: (state: any) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, setHoverState }) => {
  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHoverState('card')}
      onMouseLeave={() => setHoverState('default')}
      onClick={onClick}
      className="group relative h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden rounded-2xl border border-void/10 cursor-pointer bg-void"
    >
      {/* Background Image with Poster Style */}
      <div className="absolute inset-0">
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale opacity-100 md:opacity-60 md:group-hover:opacity-100 md:group-hover:scale-105 transition-all duration-700 ease-out"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 md:opacity-80" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
        <div className="space-y-4">
          <motion.span 
            className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/60 block"
          >
            {project.tagline}
          </motion.span>
          
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] uppercase">
            {project.title}
          </h2>

          <div className="overflow-hidden">
            <p className="text-sm md:text-base font-bold uppercase tracking-tight text-white/80 
              md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 ease-out">
              <span className="text-white/40 mr-2">RESULT //</span> {project.result}
            </p>
          </div>
        </div>

        <div className="absolute top-8 right-8">
          <ArrowUpRight className="w-6 h-6 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>
      
      {/* 1px Border Glow on Hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-700 pointer-events-none rounded-2xl" />
    </motion.div>
  );
};
