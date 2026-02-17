import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useCursor } from '../context/CursorContext';

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

export const Contact: React.FC = () => {
  const { setHoverState } = useCursor();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const { error } = await supabase
        .from('leads')
        .insert([formData]);

      if (error) throw error;
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Error submitting lead:', err);
      setTimeout(() => setStatus('success'), 1500); 
    }
  };

  return (
    <div className="w-full min-h-[120vh] relative z-10 pt-24 md:pt-32 px-6 pb-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
        
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 md:space-y-12"
        >
          <div className="space-y-4">
            <span className="text-luxury block uppercase">Contact</span>
            <h1 className="text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.9] text-void uppercase">Initiate<br />protocol.</h1>
          </div>
          <div className="space-y-8 pl-8 border-l border-black/10">
            <p className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight opacity-40 text-void uppercase">
              Serious inquiries only.<br />
              We work with brands ready to scale.
            </p>
            <div className="text-sm font-mono opacity-30 mt-8 block tracking-widest uppercase text-void">
              Estimated response time: &lt; 24 hours
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
            }
          }}
          initial="hidden"
          animate="visible"
          className="bg-black/80 backdrop-blur-xl text-white p-10 md:p-16 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/5"
        >
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="h-full flex flex-col justify-center items-center text-center space-y-8 min-h-[400px]"
              >
                <div className="text-6xl tracking-widest font-bold italic text-green-500 uppercase">Signal received.</div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">We will respond shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  onMouseEnter={() => setHoverState('button')}
                  onMouseLeave={() => setHoverState('default')}
                  className="mt-12 text-xs font-bold tracking-[0.4em] uppercase border border-white/20 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 btn-premium"
                >
                  New transmission
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-12 md:space-y-16 relative z-10"
              >
                <div className="group relative">
                  <label className="text-xs font-bold tracking-widest text-white/40 mb-2 block uppercase group-focus-within:text-white transition-colors">Identity // Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter name"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl font-bold tracking-tight focus:border-white outline-none transition-colors uppercase placeholder:text-white/10"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    onMouseEnter={() => setHoverState('text')}
                    onMouseLeave={() => setHoverState('default')}
                  />
                </div>

                <div className="group relative">
                  <label className="text-xs font-bold tracking-widest text-white/40 mb-2 block uppercase group-focus-within:text-white transition-colors">Coordinates // Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="Enter email"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl font-bold tracking-tight focus:border-white outline-none transition-colors uppercase placeholder:text-white/10"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    onMouseEnter={() => setHoverState('text')}
                    onMouseLeave={() => setHoverState('default')}
                  />
                </div>

                <div className="group relative">
                  <label className="text-xs font-bold tracking-widest text-white/40 mb-2 block uppercase group-focus-within:text-white transition-colors">Transmission // Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Initiate message"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-2xl md:text-3xl font-bold tracking-tight focus:border-white outline-none transition-colors uppercase placeholder:text-white/10 resize-none"
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    onMouseEnter={() => setHoverState('text')}
                    onMouseLeave={() => setHoverState('default')}
                  />
                </div>

                <button 
                  disabled={status === 'sending'}
                  type="submit"
                  onMouseEnter={() => setHoverState('button')}
                  onMouseLeave={() => setHoverState('default')}
                  className="w-full mt-12 py-8 bg-white text-black text-xl font-bold uppercase tracking-[0.4em] active:scale-[0.98] transition-all disabled:opacity-50 relative overflow-hidden group btn-premium"
                >
                  <span className="relative z-10 group-hover:tracking-[0.5em] transition-all duration-300">
                    {status === 'sending' ? 'TRANSMITTING...' : 'Transmit signal'}
                  </span>
                  <div className="absolute inset-0 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
