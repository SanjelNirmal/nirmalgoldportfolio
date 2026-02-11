
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-[#f5f5f5] pt-40 pb-12 border-t border-black/5 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-[#c5a059]/[0.05] blur-[120px] rounded-full pointer-events-none" />
      <div className="px-6 md:px-16 max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-12">
          <div className="max-w-3xl">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-[10px] uppercase tracking-[0.8em] text-[#c5a059] mb-8 block font-bold">The Next Chapter</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-8xl font-serif leading-none tracking-tighter text-black">
              Ready to build <br/> the <span className="italic text-[#c5a059]">Future</span>?
            </motion.h2>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onNavigate('contact')}
            className="group relative px-12 py-6 border border-[#c5a059]/40 rounded-full overflow-hidden">
            <span className="relative z-10 text-[10px] tracking-[0.4em] uppercase transition-colors group-hover:text-white text-black font-bold">Start Inquiry</span>
            <div className="absolute inset-0 bg-[#c5a059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1]" />
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 py-20 border-y border-black/5">
          <div className="col-span-1 md:col-span-2">
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-10 font-bold">Connectivity</div>
            <div className="flex flex-wrap gap-x-12 gap-y-6">
            {[
              { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nirmalsanjel/' },
              { name: 'GitHub', url: 'https://github.com/SanjelNirmal' },
              { name: 'Facebook', url: 'https://www.facebook.com/nirmalsanjel07' },
              { name: 'Instagram', url: 'https://www.instagram.com/shree_kishori_jiu_ka_daas/' },
              { name: 'Youtube', url: 'https://www.youtube.com/@nirmalsanjel071' }
            ].map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest text-black/80 hover:text-[#c5a059] transition-colors duration-500 relative group font-medium"
              >
                {social.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#c5a059] group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-10 font-bold">Chronicle</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-medium">
                <span className="text-black/40">System Status</span>
                <span className="text-emerald-600 flex items-center gap-2">Online</span>
              </div>
              <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-medium">
                <span className="text-black/40">Current Time</span>
                <span className="text-black tabular-nums">{time}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] mb-10 font-bold">Navigation</div>
            <ul className="space-y-3">
              {['Work', 'About', 'Contact', 'Collaborate'].map((item) => (
                <li key={item}>
                  <button onClick={() => onNavigate(item.toLowerCase() as PageType)} className="text-[10px] uppercase tracking-widest text-black/70 hover:text-[#c5a059] transition-colors font-medium">{item}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.3em] text-black/40 font-medium">
          <div className="flex gap-10"><span>© {new Date().getFullYear()}  Nirmal SANJEL</span></div>
          <div className="flex items-center gap-4">
            <span className="italic">Obsessively Engineered WITH LOVE 💛</span>
            <div className="w-8 h-[1px] bg-black/10" />
            <span className="text-[#c5a059]">Ver 20.59.0.62-Stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
