
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const EASE_CUSTOM: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ProjectCard: React.FC<{ project: Project; index: number; onClick: (project: Project) => void; }> = ({ project, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.6, ease: EASE_CUSTOM, delay: (index % 2) * 0.1 }}
      className={`group relative w-full aspect-[4/5] overflow-hidden bg-white cursor-none ${index % 2 !== 0 ? 'md:mt-48' : ''}`}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => onClick(project)}
    >
      <div className="w-full h-full relative overflow-hidden bg-gray-100">
        <motion.img 
          src={project.imageUrl} alt={project.title}
          animate={{ scale: isHovered ? 1.05 : 1.1, filter: isHovered ? 'grayscale(0%) brightness(1)' : 'grayscale(100%) brightness(0.9)' }}
          transition={{ duration: 1.8, ease: EASE_CUSTOM }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-14 bg-gradient-to-t from-white via-white/40 to-transparent">
        <motion.div animate={{ y: isHovered ? 0 : 30, opacity: isHovered ? 1 : 0.85 }} transition={{ duration: 1, ease: EASE_CUSTOM }}>
          <span className="text-[9px] md:text-[10px] tracking-[0.6em] md:tracking-[0.8em] uppercase text-[#c5a059] mb-2 md:mb-4 block font-bold">{project.category}</span>
          <h3 className="text-3xl md:text-6xl font-serif text-black mb-4 md:mb-8 tracking-tight italic">{project.title}</h3>
        </motion.div>
        
        <motion.div animate={{ height: isHovered ? 'auto' : 0, opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.8, ease: EASE_CUSTOM }} className="overflow-hidden">
          <p className="text-xs md:text-sm text-black/80 max-w-xs font-normal leading-relaxed mb-6 md:mb-10">{project.description}</p>
          <div className="flex items-center gap-4 md:gap-6 text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-black font-bold">
            View Project
            <motion.div animate={{ width: isHovered ? 60 : 20 }} className="h-[1px] md:h-[1.5px] bg-[#c5a059]" />
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 border border-black/5 group-hover:border-[#c5a059]/20 transition-colors duration-1000 z-30 pointer-events-none" />
    </motion.div>
  );
};

const ProjectGrid: React.FC<{ onProjectClick: (project: Project) => void; }> = ({ onProjectClick }) => {
  return (
    <section id="work" className="py-24 md:py-60 px-4 md:px-20 max-w-[1600px] mx-auto bg-[#fafafa]">
      <div className="flex flex-col lg:flex-row justify-between items-start mb-20 md:mb-40 gap-10 md:gap-16">
        <div className="max-w-4xl">
          <motion.span initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} className="text-[8px] md:text-[10px] uppercase tracking-[0.8em] md:tracking-[1em] text-[#c5a059] mb-8 md:mb-12 block font-bold">
            Reel // Selective Works
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: EASE_CUSTOM }}
            className="text-5xl md:text-[10rem] font-serif leading-[0.9] md:leading-[0.8] tracking-tighter text-black">
            Precision <br/>
            <span className="italic font-light text-[#c5a059] opacity-70">Artifacts</span>
          </motion.h2>
        </div>
        <div className="lg:col-span-1 lg:max-w-sm lg:pt-32">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2, delay: 0.5 }}
            className="text-black/70 text-sm font-normal leading-relaxed tracking-wider">
            A deliberate curation of artifacts where cinema, code, and conceptual rigor converge to redefine digital boundaries.
          </motion.p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-x-48">
        {PROJECTS.map((project, idx) => <ProjectCard key={project.id} project={project} index={idx} onClick={onProjectClick} />)}
      </div>
    </section>
  );
};

export default ProjectGrid;
