
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE_CUSTOM: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IntroSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<'counting' | 'burst' | 'exit'>('counting');

  useEffect(() => {
    if (counter < 100) {
      const speed = counter < 20 ? 40 : counter < 80 ? 15 : 40;
      const timeout = setTimeout(() => {
        setCounter(prev => {
          const inc = prev < 90 ? Math.floor(Math.random() * 3) + 2 : 1;
          return Math.min(prev + inc, 100);
        });
      }, speed);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setPhase('burst'), 400);
      setTimeout(() => setPhase('exit'), 1400);
      setTimeout(() => onComplete(), 2000);
    }
  }, [counter, onComplete]);

  return (
    <motion.div exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-[5000] bg-white flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'counting' && (
          <motion.div key="counter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.5 }} className="text-center">
            <div className="text-[10px] tracking-[1.5em] uppercase text-[#c5a059] mb-6 font-bold">Booting into the world of Nirmal</div>
            <div className="text-7xl font-serif italic text-black">{counter.toString().padStart(3, '0')}</div>
            <div className="mt-12 w-48 h-[1px] bg-black/5 mx-auto relative">
              <motion.div className="absolute top-0 left-0 h-full bg-[#c5a059]" initial={{ width: 0 }} animate={{ width: `${counter}%` }} />
            </div>
          </motion.div>
        )}
        {phase === 'burst' && (
          <motion.div key="burst" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.h1 initial={{ letterSpacing: "1.5em", opacity: 0 }} animate={{ letterSpacing: "0.5em", opacity: 1 }} className="text-6xl md:text-9xl font-serif uppercase text-black font-light">Nirmal Sanjél</motion.h1>
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 2, delay: 0.3 }} className="h-[1px] bg-[#c5a059] mt-8 mx-auto max-w-2xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute top-12 left-12 flex items-center gap-4">
        <div className="w-2 h-2 bg-[#c5a059] rounded-full" />
        <span className="text-[10px] uppercase tracking-[0.8em] text-black/30 font-bold">System Active</span>
      </div>
    </motion.div>
  );
};

export default IntroSequence;
