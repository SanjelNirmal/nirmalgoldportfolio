
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AmbientBackground: React.FC = () => {
  const [videoOpacity, setVideoOpacity] = useState(0.08);
  const [grainIntensity, setGrainIntensity] = useState(0.04);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#fafafa]">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover grayscale brightness-125 transition-opacity duration-1000" style={{ opacity: videoOpacity }}>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-dark-metal-texture-motion-background-40035-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa] opacity-60" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-multiply" style={{ opacity: grainIntensity }} />
      
      <div className="absolute bottom-10 left-10 z-[100] pointer-events-auto">
        <button onClick={() => setIsOpen(!isOpen)} className="group flex items-center gap-3 bg-black/5 backdrop-blur-md border border-black/10 px-4 py-2 rounded-full hover:bg-black/10 transition-all duration-300 interactive">
          <div className="relative w-2 h-2"><div className="absolute inset-0 bg-[#c5a059] rounded-full animate-pulse" /></div>
          <span className="text-[8px] uppercase tracking-[0.4em] text-black/50 group-hover:text-black transition-colors font-bold">Visual Engine</span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="mt-4 bg-white/90 backdrop-blur-xl border border-black/5 p-6 rounded-2xl w-64 space-y-6 shadow-xl">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-[#c5a059] font-bold"><span>Environment</span><span className="tabular-nums">{(videoOpacity * 100).toFixed(0)}%</span></div>
                <input type="range" min="0" max="0.3" step="0.01" value={videoOpacity} onChange={(e) => setVideoOpacity(parseFloat(e.target.value))} className="w-full h-[1px] bg-black/10 appearance-none cursor-pointer accent-[#c5a059]" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-[#c5a059] font-bold"><span>Grain</span><span className="tabular-nums">{(grainIntensity * 100).toFixed(0)}%</span></div>
                <input type="range" min="0" max="0.15" step="0.005" value={grainIntensity} onChange={(e) => setGrainIntensity(parseFloat(e.target.value))} className="w-full h-[1px] bg-black/10 appearance-none cursor-pointer accent-[#c5a059]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AmbientBackground;
