import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  
  if (!project) return null;

  return (
    <motion.div 
      className="fixed inset-0 z-[300] bg-[#fafafa] overflow-y-auto custom-scrollbar"
    >
      {/* Navigation Header */}
      <div className="fixed top-0 left-0 w-full z-[400] p-4 md:p-12 flex justify-between items-center pointer-events-none">
        <motion.button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="pointer-events-auto interactive group flex items-center gap-3 md:gap-4 bg-white/80 backdrop-blur-md border border-black/5 px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-[#c5a059] hover:text-white hover:border-[#c5a059] transition-all duration-500 shadow-sm"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold">Back</span>
        </motion.button>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#c5a059] font-bold hidden sm:block bg-white/50 px-4 py-2 rounded-full border border-black/5 backdrop-blur-sm"
        >
          Artifact // {project.id}
        </motion.div>
      </div>

      
      <section className="relative h-[60vh] md:h-[85vh] w-full overflow-hidden bg-[#f0f0f0]">
        <motion.img 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          src={project.imageUrl} 
          className="w-full h-full object-cover"
          alt={project.title}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fafafa] opacity-100" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[10px] md:text-[12px] uppercase tracking-[0.8em] md:tracking-[1em] text-[#c5a059] mb-4 md:mb-6 block font-bold"
          >
            {project.category}
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-[11rem] font-serif italic text-black leading-[1] md:leading-none tracking-tighter"
          >
            {project.title}
          </motion.h1>
        </div>
      </section>

      
      <section className="px-6 md:px-20 py-16 md:py-32 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20">
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-10 lg:gap-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-3 md:mb-6 font-bold flex items-center gap-4">
              <span className="w-6 h-[1px] bg-[#c5a059]/30" />
              Client
            </div>
            <div className="text-xl md:text-3xl text-black font-serif italic">{project.client || 'Experimental Artifact'}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-3 md:mb-6 font-bold flex items-center gap-4">
              <span className="w-6 h-[1px] bg-[#c5a059]/30" />
              Year
            </div>
            <div className="text-xl md:text-3xl text-black font-serif italic">{project.year || '2024'}</div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="text-xl md:text-4xl text-black leading-relaxed font-light mb-12 md:mb-20">
              {project.description}
            </p>
            <div className="text-base md:text-xl text-black/70 leading-relaxed tracking-wide font-light max-w-3xl border-l-[1px] border-[#c5a059]/20 pl-8 md:pl-12">
              {project.longDescription}
            </div>
          </motion.div>
        </div>
      </section>

      
      <section className="px-6 md:px-20 pb-32 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="aspect-[4/3] bg-gray-100 overflow-hidden border border-black/5"
          >
            <img src={project.imageUrl} className="w-full h-full object-cover grayscale brightness-110" alt="Detail view" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="aspect-[4/3] bg-gray-100 overflow-hidden border border-black/5"
          >
            <img src={project.imageUrl} className="w-full h-full object-cover contrast-125 brightness-90" alt="Atmospheric view" />
          </motion.div>
        </div>
      </section>

      
      <div className="py-32 md:py-60 text-center border-t border-black/5">
        <button 
          onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             onClose();
          }}
          className="interactive group relative overflow-hidden"
        >
          <span className="text-[12px] uppercase tracking-[1em] text-black/30 group-hover:text-black transition-colors duration-700 font-bold block mb-4">
            End Protocol
          </span>
          <div className="h-[1px] w-0 bg-[#c5a059] group-hover:w-full transition-all duration-700 mx-auto" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;