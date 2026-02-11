
import React from 'react';
import { motion, Variants } from 'framer-motion';

const itemVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 md:py-60 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      <div className="px-6 md:px-20 max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative aspect-[4/5] overflow-hidden grayscale brightness-110 hover:grayscale-0 transition-all duration-1000 group border border-black/5"
          >

            <img 
              src="src/profile.jpg" alt="Atmospheric studio" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
            />
          </motion.div>
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
              <motion.span variants={itemVariants} className="text-[10px] uppercase tracking-[0.8em] text-[#c5a059] mb-8 md:mb-12 block font-bold">The Philosophy</motion.span>
              <h2 className="text-4xl md:text-8xl font-serif leading-[1.1] md:leading-[1] mb-12 md:mb-20 tracking-tighter text-black">
                Designing <span className="italic text-[#c5a059]">Digital</span> <br className="hidden md:block" /> worlds with  <br className="hidden md:block" /> <span className="underline underline-offset-[12px] md:underline-offset-[16px] decoration-[#c5a059] decoration-[1px]">intention, depth, and soul.</span>.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                <motion.p variants={itemVariants} className="text-base md:text-lg text-black font-normal leading-relaxed">
                  I am Nirmal Sanjel 23 y/o Man, form Dhapakhel, Lalitpur as a Sutdent of BCA. I am a motion-focused creative technologist defining the future of digital interaction through code and vision. My work blends minimalist aesthetics, technical mastery, and the quiet intuition that comes from a mindful heart.  
                </motion.p>
                <motion.p variants={itemVariants} className="text-base md:text-lg text-black font-normal leading-relaxed">
                  With a background in motion design and a passion for immersive experiences, I craft digital worlds that are not only visually stunning but also deeply engaging. My practice is rooted in the belief that technology should serve as a canvas for creativity, allowing us to explore new dimensions of storytelling and interaction.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="mt-16 md:mt-24 pt-12 md:pt-24 border-t border-black/5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {[
                  { label: 'Excellence', val: '001' },
                  { label: 'Precision', val: '99%' },
                  { label: 'Artifacts', val: '5+' },
                  { label: 'Frequency', val: '120hz' },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-[8px] uppercase tracking-[0.4em] text-[#c5a059] mb-2 font-bold">{stat.label}</div>
                    <div className="text-xl md:text-2xl font-serif text-black">{stat.val}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
