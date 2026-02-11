import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { generateNarrative } from '../services/geminiService';

const EASE_CUSTOM: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Hero: React.FC = () => {
  const [narrative, setNarrative] = useState<string>("Initializing vision...");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { damping: 30, stiffness: 60 });
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const yParallaxText = useTransform(smoothProgress, [0, 1], [0, -200]);
  const videoParallax = useTransform(smoothProgress, [0, 1], [0, 150]);
  const letterSpacing = useTransform(smoothProgress, [0, 0.5], ["0.4em", "1.1em"]);
  const blurValue = useTransform(smoothProgress, [0, 0.4], [0, 10]);

  useEffect(() => {
    const fetchNarrative = async () => {
      const text = await generateNarrative("a luxury high-end creative technologist and design architect specializing in gold-standard aesthetics");
      setNarrative(text);
    };
    fetchNarrative();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[110vh] md:h-[120vh] w-full flex items-center justify-center overflow-hidden bg-[#fafafa]">
      
      <motion.div 
        style={{ y: videoParallax, opacity, filter: useTransform(blurValue, v => `blur(${v}px)`) }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <video 
          autoPlay muted loop playsInline
          className="w-full h-full object-cover scale-110 grayscale brightness-[1.1] opacity-30 contrast-125"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-water-waves-in-the-ocean-1589-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#fafafa_100%)]" />
      </motion.div>

      
      <motion.div 
        style={{ opacity, y: yParallaxText }}
        className="relative z-30 text-center max-w-5xl px-6"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE_CUSTOM, delay: 0.2 }}
      >
        <motion.div 
          style={{ letterSpacing }} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="inline-block text-[8px] md:text-[10px] uppercase mb-8 md:mb-10 font-bold tracking-[0.4em] md:tracking-[0.5em] text-[#c5a059]"
        >
          The Digital Frontier
        </motion.div>
        
        <h1 className="text-5xl sm:text-7xl md:text-[13rem] font-serif mb-8 md:mb-12 leading-[0.9] md:leading-[0.8] tracking-tighter overflow-hidden">
          <motion.span 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: EASE_CUSTOM, delay: 0.8 }}
            className="block text-black"
          >
            Nirmal
          </motion.span>
          <motion.span 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: EASE_CUSTOM, delay: 1.0 }}
            className="block italic font-light text-[#c5a059]"
          >
            Sanjél
          </motion.span>
        </h1>
        
        <p className="text-base md:text-xl text-black font-normal leading-relaxed max-w-2xl mx-auto mb-12 md:mb-16 px-4">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 1.5 }}>
            {narrative}
          </motion.span>
        </p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1.2, ease: EASE_CUSTOM }}>
          <a href="#work" className="interactive group relative inline-flex items-center justify-center py-4 md:py-5 px-10 md:px-14 border border-[#c5a059]/30 rounded-full overflow-hidden bg-white/50 backdrop-blur-xl">
            <span className="relative z-10 text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase transition-colors group-hover:text-white text-black font-bold">Explore Works</span>
            <motion.div className="absolute inset-0 bg-[#c5a059]" initial={{ y: "100%" }} whileHover={{ y: 0 }} transition={{ ease: EASE_CUSTOM, duration: 0.6 }} />
          </a>
        </motion.div>
      </motion.div>

      
      <motion.div 
        style={{ opacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.5 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-4"
      >
        <span className="text-[7px] md:text-[8px] uppercase tracking-[0.5em] md:tracking-[0.6em] font-bold text-[#c5a059]">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] md:w-[1.5px] h-10 md:h-12 bg-gradient-to-b from-[#c5a059] to-transparent" 
        />
      </motion.div>
    </section>
  );
};

export default Hero;