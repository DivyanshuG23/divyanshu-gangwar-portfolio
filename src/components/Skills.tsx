import React from 'react';
import { SKILL_CATEGORIES, type SkillCategory } from '../types';
import { TechIcon } from './TechIcons';
import {
  Layout,
  Server,
  Database,
  Code2,
  Wrench,
  Cpu,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';

const categoryIconMap: Record<string, React.ReactNode> = {
  'Frontend Development': <Layout className="w-5 h-5 text-[#E5B45B]" />,
  'Backend Development': <Server className="w-5 h-5 text-emerald-400" />,
  'Databases': <Database className="w-5 h-5 text-[#E5B45B]" />,
  'Programming Languages': <Code2 className="w-5 h-5 text-amber-400" />,
  'Tools': <Wrench className="w-5 h-5 text-emerald-400" />,
  'Core Computer Science': <Cpu className="w-5 h-5 text-[#E5B45B]" />,
};

const domainNotes: Record<string, string> = {
  'Frontend Development': 'Client Interfaces & UI State',
  'Backend Development': 'Server APIs & Architecture',
  'Databases': 'Data Schemas & Queries',
  'Programming Languages': 'Algorithmic & Systems Logic',
  'Tools': 'Workflow & Build Tooling',
  'Core Computer Science': 'Computing Fundamentals',
};

const iconBoxAccentStyles: Record<string, string> = {
  teal: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
  blue: 'bg-[#E5B45B]/10 border-[#E5B45B]/20 text-[#E5B45B]',
  gold: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
};

const hoverAccentStyles: Record<string, string> = {
  teal: 'hover:border-emerald-500/40 hover:shadow-[0_12px_36px_-15px_rgba(5,150,105,0.12)]',
  emerald: 'hover:border-emerald-500/40 hover:shadow-[0_12px_36px_-15px_rgba(5,150,105,0.12)]',
  blue: 'hover:border-[#E5B45B]/40 hover:shadow-[0_12px_36px_-15px_rgba(229,180,91,0.12)]',
  gold: 'hover:border-amber-500/40 hover:shadow-[0_12px_36px_-15px_rgba(245,158,11,0.12)]',
};

const dotAccentStyles: Record<string, string> = {
  teal: 'bg-emerald-400',
  emerald: 'bg-emerald-400',
  blue: 'bg-[#E5B45B]',
  gold: 'bg-amber-400',
};

const SkillCard: React.FC<{
  cat: SkillCategory;
  isRevealed: boolean;
}> = ({ cat, isRevealed }) => {
  const glowColor =
    cat.accent === 'teal' || cat.accent === 'emerald' ? 'emerald' : 'champagne';

  const { ref } = useTiltReflection<HTMLDivElement>({
    maxTilt: 4.0,
    glowColor,
  });

  const iconBoxStyle = iconBoxAccentStyles[cat.accent] || iconBoxAccentStyles.teal;
  const hoverStyle = hoverAccentStyles[cat.accent] || hoverAccentStyles.teal;
  const dotStyle = dotAccentStyles[cat.accent] || dotAccentStyles.teal;
  const domainNote = domainNotes[cat.category] || 'Technical Competencies';

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl bg-[#0D0F13] border border-[#1F222A] p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-500 h-full ${hoverStyle}`}
    >
      {/* 3D Reflection and Dynamic Cursor Spotlight */}
      <CardReflectionGlow
        glowColor={glowColor}
        isRevealed={isRevealed}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          {/* Category Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-3.5">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconBoxStyle}`}>
                {categoryIconMap[cat.category] || <Cpu className="w-5 h-5 text-neutral-400" />}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#F4F5F0] font-sans tracking-tight">
                  {cat.category}
                </h3>
                <p className="text-xs text-[#8A8F98] font-editorial mt-0.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </div>
          </div>

          {/* Subtle Separator */}
          <div className="h-px w-full bg-[#1A1D24] my-4" />

          {/* Technology Badges / Compact Logo Tiles */}
          <div className="flex flex-wrap gap-2 pt-1 pb-4">
            {cat.skills.map((skill) => (
              <div
                key={skill}
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#111317] border border-[#1A1D24] text-xs font-mono text-[#D4D7DF] hover:border-[#2A2E38] hover:text-[#F4F5F0] hover:bg-[#151820] transition-colors"
              >
                <span className="shrink-0 flex items-center justify-center">
                  <TechIcon skill={skill} />
                </span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer: Factual Domain Context */}
        <div className="pt-3.5 border-t border-[#1F222A]/80 mt-auto flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span className="text-[#8A8F98]">{domainNote}</span>
          <span className={`w-1.5 h-1.5 rounded-full ${dotStyle}`} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const { ref: sectionRef, getRevealClass } = useScrollReveal();
  const { ref: cardsRef, isVisible: isCardsVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 sm:py-32 border-t border-[#1F222A] relative overflow-hidden"
    >
      {/* Subtle section ambient glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(229,180,91,0.025),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Technology Orbit Network Graphic (Background Accent) */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -top-16 -right-16 w-96 h-96 select-none pointer-events-none opacity-25"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-tech-spin">
          <ellipse cx="100" cy="100" rx="90" ry="40" fill="none" stroke="#1F222A" strokeWidth="1" strokeDasharray="4 6" />
          <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="#E5B45B" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.6" />
          <circle cx="100" cy="10" r="2.5" fill="#059669" />
          <circle cx="190" cy="100" r="2.5" fill="#E5B45B" />
        </svg>
      </div>

      {/* Interconnected Neural Network with Branching Synaptic Paths (Background Mesh) */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30"
      >
        <svg viewBox="0 0 1200 900" className="w-full h-full" preserveAspectRatio="none">
          {/* Branching Neural Synapse Bus Lines linking Skill Domain Clusters */}
          <path d="M 200 240 C 350 180, 480 320, 600 220 S 850 160, 1000 260" fill="none" stroke="#E5B45B" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
          <path d="M 200 580 C 380 640, 520 480, 680 560 S 920 620, 1020 520" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="5 7" opacity="0.6" />
          <path d="M 600 220 L 680 560" fill="none" stroke="#1F222A" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Neural Cluster Intersect Nodes with Soft Halo */}
          <circle cx="200" cy="240" r="3.5" fill="#E5B45B" />
          <circle cx="600" cy="220" r="4.5" fill="#059669" className="animate-tech-node" />
          <circle cx="600" cy="220" r="12" fill="none" stroke="#059669" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="1000" cy="260" r="3.5" fill="#E5B45B" />
          <circle cx="200" cy="580" r="3.5" fill="#059669" />
          <circle cx="680" cy="560" r="4.5" fill="#E5B45B" className="animate-tech-node" />
          <circle cx="680" cy="560" r="12" fill="none" stroke="#E5B45B" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="1020" cy="520" r="3.5" fill="#059669" />
        </svg>
      </div>

      {/* Dedicated Left Side Topology Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-4 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-teal-400 font-semibold">// 03_MESH</span>
        <div className="w-px h-36 bg-gradient-to-b from-teal-500/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-teal-400/60" />
          <div className="absolute top-16 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-28 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
        </div>
        <span className="text-[8px] text-neutral-600">6_DOMAINS</span>
      </div>

      {/* Dedicated Right Side Hexagonal Node Graphic (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:block absolute right-6 top-36 w-24 h-48 select-none pointer-events-none opacity-40 font-mono text-[9px] text-neutral-600"
      >
        <svg viewBox="0 0 80 160" className="w-full h-full">
          <polygon points="40,20 70,37 70,73 40,90 10,73 10,37" fill="none" stroke="#1F222A" strokeWidth="1" />
          <circle cx="40" cy="20" r="2.5" fill="#E5B45B" />
          <circle cx="70" cy="37" r="2.5" fill="#059669" />
          <circle cx="70" cy="73" r="2.5" fill="#E5B45B" />
          <circle cx="40" cy="90" r="2.5" fill="#059669" />
          <circle cx="10" cy="73" r="2.5" fill="#E5B45B" />
          <circle cx="10" cy="37" r="2.5" fill="#059669" />
          <circle cx="40" cy="55" r="3" fill="#E5B45B" className="animate-tech-node" />
          <line x1="40" y1="90" x2="40" y2="140" stroke="#1F222A" strokeWidth="1" strokeDasharray="2 4" />
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className={`mb-14 sm:mb-20 ${getRevealClass(0, 'up')}`}>
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" aria-hidden="true" />
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              // 03 · Skills
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F0] max-w-[800px] font-sans">
            Skills &amp; Technologies
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F98] max-w-[620px] mt-3 font-editorial">
            Technologies, languages, and core computer science fundamentals practiced through coursework and practical project engineering.
          </p>
        </div>

        {/* 6 Category Cards: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {SKILL_CATEGORIES.map((cat, index) => (
            <div
              key={cat.category}
              style={{
                transitionDelay: isCardsVisible ? `${index * 130}ms` : '0ms',
              }}
              className={`skills-card-assembly-wrapper h-full ${
                isCardsVisible
                  ? 'skills-card-assembly-visible'
                  : `skills-card-assembly-hidden-${index + 1}`
              }`}
            >
              <SkillCard
                cat={cat}
                isRevealed={isCardsVisible}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
