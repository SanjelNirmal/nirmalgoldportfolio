
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Component Imports
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectGrid from './components/ProjectGrid';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import CustomCursor from './components/CustomCursor';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import IntroSequence from './components/IntroSequence';
import AmbientBackground from './components/AmbientBackground';
import ProjectDetail from './components/ProjectDetail';

// Types
import { PageType, Project } from './types';

const EASE_CUSTOM: [number, number, number, number] = [0.76, 0, 0.24, 1];

const ShutterTransition = ({ isActive }: { isActive: boolean }) => (
  <div className="fixed inset-0 z-[2000] pointer-events-none overflow-hidden">
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: isActive ? '0%' : '-100%' }}
      transition={{ duration: 0.8, ease: EASE_CUSTOM }}
      className="absolute top-0 left-0 w-full h-1/2 bg-[#c5a059]"
    />
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: isActive ? '0%' : '100%' }}
      transition={{ duration: 0.8, ease: EASE_CUSTOM, delay: 0.05 }}
      className="absolute bottom-0 left-0 w-full h-1/2 bg-[#c5a059]"
    />
  </div>
);

const LegalView = ({ title, content }: { title: string; content: React.ReactNode }) => (
  <div className="pt-60 pb-40 bg-transparent min-h-screen px-6 relative z-10">
    <div className="max-w-4xl mx-auto">
      <motion.span 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-[10px] uppercase tracking-[0.8em] text-[#c5a059] mb-12 block font-bold"
      >
        Legal Document // 0xAF4
      </motion.span>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="text-6xl md:text-8xl font-serif mb-24 italic text-black"
      >
        {title}
      </motion.h1>
      <div className="prose prose-slate max-w-none text-black/80 space-y-12 text-lg leading-relaxed font-light">
        {content}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const navigateTo = useCallback((page: PageType, project: Project | null = null) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setSelectedProject(project);
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => setIsTransitioning(false), 300);
    }, 850);
  }, [isTransitioning]);

  return (
    <div className="relative min-h-screen bg-[#fafafa] text-black overflow-x-hidden selection:bg-[#c5a059] selection:text-white">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroSequence key="intro" onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <AmbientBackground />

      <div className={`${introComplete ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[1200ms]`}>
        <Navigation onNavigate={navigateTo} currentPage={currentPage} />
        <ShutterTransition isActive={isTransitioning} />
        
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {currentPage === 'project-detail' && selectedProject ? (
              <motion.div
                key={`project-${selectedProject.id}`}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
              >
                <ProjectDetail project={selectedProject} onClose={() => navigateTo('home')} />
              </motion.div>
            ) : (
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {currentPage === 'home' && (
                  <>
                    <Hero />
                    <AboutSection />
                    <SkillsSection />
                    <ProjectGrid onProjectClick={(p) => navigateTo('project-detail', p)} />
                  </>
                )}
                {currentPage === 'work' && (
                  <div className="pt-40">
                    <ProjectGrid onProjectClick={(p) => navigateTo('project-detail', p)} />
                  </div>
                )}
                {currentPage === 'about' && (
                  <div className="pt-40">
                    <AboutSection />
                    <SkillsSection />
                  </div>
                )}
                {currentPage === 'contact' && (
                  <div className="pt-60 pb-20 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                      <h2 className="text-7xl md:text-9xl font-serif italic mb-12 text-black">Contact.</h2>
                      <ContactForm />
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {currentPage !== 'project-detail' && <Footer onNavigate={navigateTo} />}
        </main>
      </div>
    </div>
  );
};

export default App;
