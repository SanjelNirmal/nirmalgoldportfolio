
import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import { motion } from 'framer-motion';
import { PageType } from '../types';

interface NavigationProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
}

const Navigation: React.FC<NavigationProps> = ({ onNavigate, currentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-4 md:px-16 py-6 md:py-10 flex items-center justify-between ${scrolled || currentPage !== 'home' ? 'bg-white/90 backdrop-blur-2xl border-b border-black/5 py-4 md:py-6' : 'bg-transparent'}`}
    >
      <button onClick={() => onNavigate('home')} className="flex items-center gap-3 md:gap-4 group cursor-none">
        <div className="relative w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
          <div className="absolute inset-0 border border-black/20 rounded-full group-hover:scale-125 group-hover:border-[#c5a059] transition-all duration-500" />
          <img
              src="/logo.png"
              alt="Nirmal Logo"
              className="w-8 md:w-12 object-contain transition-transform duration-500 group-hover:scale-110"
            />
        </div>
        <span className="text-[10px] md:text-sm font-serif tracking-[0.15em] md:tracking-[0.2em] uppercase text-black font-bold">
          NIR<span className="text-[#c5a059]">MAL.</span>
        </span>
      </button>
      
      <ul className="hidden lg:flex items-center gap-16">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <button 
              onClick={() => onNavigate(link.href)}
              className={`relative text-[9px] uppercase tracking-[0.4em] transition-colors duration-500 overflow-hidden group cursor-none font-bold ${currentPage === link.href ? 'text-[#c5a059]' : 'text-black/60 hover:text-[#c5a059]'}`}
            >
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">{link.label}</span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-[#c5a059] italic">{link.label}</span>
            </button>
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => onNavigate('collaborate')}
        className="interactive group px-5 md:px-8 py-2 md:py-3 border border-black/10 text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all duration-500 hover:bg-[#c5a059] hover:text-white cursor-none text-black font-bold"
      >
        Collaborate
      </button>
    </motion.nav>
  );
};

export default Navigation;
