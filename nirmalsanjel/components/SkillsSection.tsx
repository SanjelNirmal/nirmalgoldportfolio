
import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const SKILLS = [
  { category: 'Visuals', items: ['Architecture', 'Generative Art', 'Virtualization', 'UI/UX'] },
  { category: 'Engine', items: ['React / TypeScript', 'Gemini AI SDK', 'HTML', 'Tailwind'] },
  { category: 'Process', items: ['Design Systems', 'Performance Optimization', 'Product Strategy', 'Vercel'] },
];

const SkillCard: React.FC<{ skill: typeof SKILLS[0]; idx: number }> = ({ skill, idx }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(197, 160, 89, 0.1),
      transparent 80%
    )
  `;

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative p-12 bg-white border border-black/5 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: spotlightBackground }} />
      <div className="relative z-10">
        <div className="text-[10px] text-[#c5a059] mb-12 flex items-center gap-4 font-bold">
          <span className="w-8 h-[1px] bg-[#c5a059]/30" />
          0{idx + 1}
        </div>
        <h3 className="text-2xl font-serif mb-12 tracking-wide uppercase text-black font-bold">{skill.category}</h3>
        <ul className="space-y-6">
          {skill.items.map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-sm text-black/80 group-hover:text-black transition-all duration-500 font-medium">
              <span className="w-1.5 h-1.5 bg-[#c5a059] rounded-full shadow-[0_0_8px_rgba(197,160,89,0.3)]" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const SkillsSection: React.FC = () => {
  return (
    <section className="py-60 px-6 md:px-20 bg-[#fafafa]">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-32 max-w-2xl">
          <span className="text-[10px] uppercase tracking-[0.6em] text-[#c5a059] mb-8 block font-bold">The Methodology</span>
          <h2 className="text-5xl md:text-8xl font-serif leading-none tracking-tighter text-black">
            Architecting <span className="italic text-[#c5a059]">Logic</span> <br/> through <span className="underline decoration-[#c5a059] decoration-1 underline-offset-[20px]">Design</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((skill, idx) => <SkillCard key={skill.category} skill={skill} idx={idx} />)}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
