import React from 'react';
import { PERSONAL_INFO } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';
import {
  ArrowUpRight,
  GraduationCap,
  Sparkles,
  Terminal,
  Compass,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  MapPin,
  BadgeCheck,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const About: React.FC = () => {
  // Section header reveal
  const { ref: sectionRef, getRevealClass } = useScrollReveal();

  // Decoupled scroll reveal for cards container with repeat-on-entry
  const { ref: contentRef, isVisible: isContentVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  // 3D Tilt Reflection hooks for inner cards (decoupled from outer assembly wrappers)
  const { ref: storyCardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 2.0,
    glowColor: 'champagne',
  });

  const { ref: profileLedgerRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 2.5,
    glowColor: 'champagne',
  });

  const { ref: skillsMatrixRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 2.0,
    glowColor: 'emerald',
  });

  const { ref: principlesCardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 2.0,
    glowColor: 'champagne',
  });

  const coreSkills = [
    { label: 'React.js', category: 'Frontend' },
    { label: 'Node.js', category: 'Backend' },
    { label: 'Express.js', category: 'Backend' },
    { label: 'MongoDB', category: 'Database' },
    { label: 'Java', category: 'Core CS' },
    { label: 'Data Structures & Algorithms', category: 'Core CS' },
    { label: 'REST APIs', category: 'Architecture' },
    { label: 'Tailwind CSS', category: 'Frontend' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 border-t border-[#1F222A] relative bg-[#090909] text-[#F4F5F0] overflow-hidden"
    >
      {/* Precision coordinate grid background with radial vignette mask */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03] select-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #F5F0E6 1px, transparent 1px), linear-gradient(to bottom, #F5F0E6 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Atmospheric ambient lighting matching palette */}
      <div
        className="absolute top-0 right-0 w-[550px] h-[550px] bg-[radial-gradient(circle_at_top_right,rgba(229,180,91,0.045),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_bottom_left,rgba(5,150,105,0.035),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Organic Emerald & Champagne Synaptic Network Background Artwork */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden opacity-35"
      >
        <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="emerald-neural-flow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#E5B45B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Synaptic Bezier Paths */}
          <path d="M 120 180 Q 340 320 520 210 T 920 360" fill="none" stroke="url(#emerald-neural-flow)" strokeWidth="1.2" strokeDasharray="6 6" />
          <path d="M 280 480 Q 560 380 780 540 T 1120 460" fill="none" stroke="#059669" strokeWidth="0.8" strokeOpacity="0.3" />
          <path d="M 80 620 Q 320 540 640 680 T 1040 580" fill="none" stroke="#1F222A" strokeWidth="1" strokeDasharray="4 8" />
          
          {/* Neural Synaptic Hub Vertices with Halo Pulse */}
          <circle cx="520" cy="210" r="4" fill="#059669" className="animate-tech-node" />
          <circle cx="520" cy="210" r="10" fill="none" stroke="#059669" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="340" cy="320" r="3" fill="#E5B45B" />
          <circle cx="780" cy="540" r="4" fill="#059669" className="animate-tech-node" />
          <circle cx="780" cy="540" r="12" fill="none" stroke="#E5B45B" strokeWidth="0.6" strokeOpacity="0.3" />
          <circle cx="920" cy="360" r="3.5" fill="#E5B45B" />

          {/* Micro Geometric Blueprint Brackets */}
          <path d="M 500 195 L 540 195 M 500 225 L 540 225" stroke="#1F222A" strokeWidth="0.8" />
          <path d="M 760 525 L 800 525 M 760 555 L 800 555" stroke="#1F222A" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Architectural Calibration Scale (Hidden on Compact Displays) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-6 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-[#E5B45B] font-semibold">// 01_BIO</span>
        <div className="w-px h-32 bg-gradient-to-b from-[#E5B45B]/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
          <div className="absolute top-12 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-20 -left-1.5 w-3 h-px bg-[#059669]/60" />
          <div className="absolute top-28 -left-1 w-2 h-px bg-[#1F222A]" />
        </div>
        <span className="rotate-90 origin-center text-[8px] text-neutral-600">SPEC_v2.4</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className={`mb-16 sm:mb-20 ${getRevealClass(0)}`}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B45B] animate-pulse" aria-hidden="true" />
              <p className="font-mono text-xs uppercase tracking-widest text-[#E5B45B]">
                // 01 · ABOUT THE DEVELOPER
              </p>
            </div>

            {/* Live Availability Telemetry Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-[#0D0F13] border border-[#1F222A] font-mono text-xs text-neutral-300 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 font-medium">{PERSONAL_INFO.availabilityStatus}</span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-[#E5B45B] hidden sm:inline">Class of 2027</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F0] max-w-[920px] font-sans leading-tight">
            Bridging Computer Science Fundamentals with Modern Full-Stack &amp;{' '}
            <span className="text-[#E5B45B]">Applied AI Engineering</span>.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#8A8F98] max-w-[760px] font-editorial leading-relaxed">
            Final-year Computer Science &amp; Engineering student at Invertis University, dedicated to
            building robust, user-centric software by combining strong algorithmic principles with modern web architecture.
          </p>
        </div>

        {/* Content Container with Decoupled Scroll-Speed Independent Reveal */}
        <div ref={contentRef as React.RefObject<HTMLDivElement>} className="space-y-8 sm:space-y-10">
          
          {/* Top Tier: Narrative Dossier (7 cols) + Engineering Ledger (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Card 1: Narrative Story & Chapter Manifesto (Left 3D Directional Entrance) */}
            <div
              className={`lg:col-span-7 flex flex-col about-card-assembly-wrapper ${
                isContentVisible ? 'about-card-assembly-visible' : 'about-card-assembly-hidden-left'
              }`}
            >
              <div
                ref={storyCardRef}
                tabIndex={0}
                className="h-full rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl group hover:border-[#E5B45B]/40 transition-all focus:outline-none focus:ring-1 focus:ring-[#E5B45B]/40 flex flex-col justify-between"
                aria-label="Narrative engineering chronicle"
              >
                {/* 3D Reflection and Cursor Spotlight */}
                <CardReflectionGlow
                  glowColor="champagne"
                  isRevealed={isContentVisible}
                />

                {/* Subtle Boutique Frame Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#E5B45B]/40 pointer-events-none rounded-tl-sm" />
                <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#E5B45B]/40 pointer-events-none rounded-tr-sm" />
                <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#E5B45B]/40 pointer-events-none rounded-bl-sm" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#E5B45B]/40 pointer-events-none rounded-br-sm" />

                <div>
                  {/* Card Header with Technical Metadata */}
                  <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1F222A]/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-[#14171F] border border-[#262B36] text-[#E5B45B]">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#F4F5F0] font-medium">
                        Engineering Chronicle
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      STATUS // ACTIVE
                    </span>
                  </div>

                  {/* Story Chapters */}
                  <div className="space-y-8">
                    {/* Story Chapter 01 */}
                    <article className="relative pl-6 border-l-2 border-[#1F222A] hover:border-[#E5B45B]/60 transition-colors group/item">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-[#E5B45B] tracking-wider uppercase font-semibold">
                          01 // Foundations &amp; Discipline
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#F4F5F0] font-sans mb-2 group-hover/item:text-[#E5B45B] transition-colors">
                        Algorithmic Discipline &amp; Core Computer Science
                      </h3>
                      <p className="font-editorial text-sm sm:text-base text-[#A1A7B2] leading-relaxed">
                        My journey in software engineering began with my Computer Science &amp; Engineering degree at{' '}
                        <span className="text-[#F4F5F0] font-medium">Invertis University</span> (graduating in 2027 with an{' '}
                        <span className="text-[#E5B45B] font-mono font-medium">8.6/10 CGPA</span>). I approach software not
                        as disconnected syntax, but as systematic problem-solving. Through daily problem solving in{' '}
                        <span className="text-[#F4F5F0]">Java</span> and{' '}
                        <span className="text-[#F4F5F0]">Data Structures &amp; Algorithms</span>, I focus on computational
                        complexity, memory discipline, and clean structural logic.
                      </p>
                    </article>

                    {/* Story Chapter 02 */}
                    <article className="relative pl-6 border-l-2 border-[#1F222A] hover:border-[#E5B45B]/60 transition-colors group/item">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-[#E5B45B] tracking-wider uppercase font-semibold">
                          02 // Full-Stack Craft
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#F4F5F0] font-sans mb-2 group-hover/item:text-[#E5B45B] transition-colors">
                        End-to-End Web Systems &amp; Component Architecture
                      </h3>
                      <p className="font-editorial text-sm sm:text-base text-[#A1A7B2] leading-relaxed">
                        As a developer focusing on the <span className="text-[#F4F5F0] font-medium">MERN stack</span>, I build
                        complete web applications from interactive user interfaces down to secure server architectures. On the client,
                        I design responsive, accessible components using <span className="text-[#F4F5F0]">React</span> and{' '}
                        <span className="text-[#F4F5F0]">Tailwind CSS</span>. On the server, I build modular RESTful APIs with{' '}
                        <span className="text-[#F4F5F0]">Node.js</span> and <span className="text-[#F4F5F0]">Express</span>, backed by{' '}
                        <span className="text-[#F4F5F0]">MongoDB</span> for predictable data persistence.
                      </p>
                    </article>

                    {/* Story Chapter 03 */}
                    <article className="relative pl-6 border-l-2 border-[#1F222A] hover:border-[#E5B45B]/60 transition-colors group/item">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs text-[#E5B45B] tracking-wider uppercase font-semibold">
                          03 // Direction &amp; Vision
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-[#F4F5F0] font-sans mb-2 group-hover/item:text-[#E5B45B] transition-colors">
                        Applied AI &amp; Practical Product Engineering
                      </h3>
                      <p className="font-editorial text-sm sm:text-base text-[#A1A7B2] leading-relaxed">
                        My career direction is set at the intersection of full-stack engineering and practical artificial intelligence.
                        Through projects like <span className="text-[#F4F5F0] font-medium">ResumeX AI</span> (algorithmic ATS evaluation)
                        and <span className="text-[#F4F5F0] font-medium">FlowForge AI</span> (visual pipeline automation), I focus on
                        bridging machine intelligence with human-friendly interfaces. My goal is to join an engineering team where I can
                        contribute immediately to real-world codebases, learn from senior practitioners, and ship software that delivers genuine utility.
                      </p>
                    </article>
                  </div>
                </div>

                {/* Direct Action Pathways */}
                <div className="pt-8 mt-8 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-[#1F222A]/80">
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#F4F5F0] hover:text-[#E5B45B] transition-colors py-1.5 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5B45B]"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 text-[#E5B45B]" />
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover/link:text-[#E5B45B] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>

                  <span className="text-neutral-700 hidden sm:inline" aria-hidden="true">·</span>

                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-[#F4F5F0] hover:text-[#E5B45B] transition-colors py-1.5 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5B45B]"
                  >
                    <GithubIcon className="w-3.5 h-3.5 text-neutral-400 group-hover/link:text-[#E5B45B]" />
                    <span>Explore GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover/link:text-[#E5B45B] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>

                  <span className="text-neutral-700 hidden sm:inline" aria-hidden="true">·</span>

                  <a
                    href="#projects"
                    className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider uppercase text-[#8A8F98] hover:text-[#F4F5F0] transition-colors py-1.5 group/link focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5B45B]"
                  >
                    <span>View Projects</span>
                    <ArrowRight className="w-3 h-3 text-neutral-500 group-hover/link:translate-x-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            </div>

            {/* Card 2: Engineering Profile & Verified Identity Ledger (Right 3D Directional Entrance) */}
            <div
              className={`lg:col-span-5 flex flex-col about-card-assembly-wrapper about-stagger-1 ${
                isContentVisible ? 'about-card-assembly-visible' : 'about-card-assembly-hidden-right'
              }`}
            >
              <div
                ref={profileLedgerRef}
                tabIndex={0}
                className="h-full rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-8 relative overflow-hidden shadow-2xl group hover:border-[#E5B45B]/40 transition-all focus:outline-none focus:ring-1 focus:ring-[#E5B45B]/40 flex flex-col justify-between"
                aria-label="Engineering profile ledger"
              >
                {/* Permanent Rotating Champagne Border Streak */}
                <div
                  aria-hidden="true"
                  className="champagne-border-streak"
                  style={{ animationDuration: '12s' }}
                />

                {/* 3D Reflection and Cursor Spotlight */}
                <CardReflectionGlow
                  glowColor="champagne"
                  isRevealed={isContentVisible}
                />

                <div>
                  {/* Ledger Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-[#1F222A]">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#E5B45B]" />
                      <span className="font-mono text-xs uppercase tracking-wider text-[#F4F5F0] font-medium">
                        Engineering Profile
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                      REV 2026.11
                    </span>
                  </div>

                  {/* Profile Identity Card with Real Photo Portrait */}
                  <div className="my-6 p-4 rounded-2xl bg-[#11141B] border border-[#1F222A] flex items-center gap-4">
                    <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#E5B45B]/30 bg-[#0B0D0C] shadow-md flex items-center justify-center">
                      <img
                        src={PERSONAL_INFO.portraitUrl || '/divyanshu-profile.jpeg'}
                        alt="Divyanshu Gangwar"
                        className="w-full h-full object-cover object-top absolute inset-0 z-10"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span className="font-mono text-base font-bold text-[#E5B45B] tracking-wider select-none" aria-hidden="true">
                        DG
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-20" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="text-sm font-bold text-[#F4F5F0] font-sans truncate">
                          {PERSONAL_INFO.name}
                        </h4>
                        <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" aria-label="Verified identity" />
                      </div>
                      <p className="text-xs text-[#E5B45B] font-mono truncate">
                        {PERSONAL_INFO.shortRole}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mt-1">
                        <MapPin className="w-3 h-3 text-neutral-500" />
                        <span>Bareilly, UP · India</span>
                      </div>
                    </div>
                  </div>

                  {/* Structured Metric Blocks */}
                  <div className="space-y-3.5 text-sm">
                    
                    {/* Education Record */}
                    <div className="p-3.5 rounded-xl bg-[#111317]/80 border border-[#1F222A]/80 flex items-start gap-3.5 hover:border-[#2A2E38] transition-colors">
                      <div className="p-2 rounded-lg bg-[#181B22] text-[#E5B45B] mt-0.5 shrink-0 border border-[#1F222A]">
                        <GraduationCap className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-wider">
                            Degree &amp; Institution
                          </p>
                          <span className="text-[10px] font-mono text-[#E5B45B] bg-[#E5B45B]/10 px-1.5 py-0.5 rounded border border-[#E5B45B]/20">
                            Class of '27
                          </span>
                        </div>
                        <p className="text-[#F4F5F0] font-medium text-xs sm:text-sm mt-1 truncate">
                          {PERSONAL_INFO.degree}
                        </p>
                        <p className="text-xs text-[#8A8F98] mt-0.5">
                          {PERSONAL_INFO.university} · Bareilly, UP
                        </p>
                      </div>
                    </div>

                    {/* Academic Standing */}
                    <div className="p-3.5 rounded-xl bg-[#111317]/80 border border-[#1F222A]/80 flex items-start gap-3.5 hover:border-[#2A2E38] transition-colors">
                      <div className="p-2 rounded-lg bg-[#181B22] text-emerald-400 mt-0.5 shrink-0 border border-[#1F222A]">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-wider">
                            Academic Standing
                          </p>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            Merit
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-lg font-mono font-bold text-[#F4F5F0]">
                            {PERSONAL_INFO.cgpa}
                          </span>
                          <span className="text-xs text-neutral-400 font-sans">
                            Cumulative Grade Point Average
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Core Focus Areas */}
                    <div className="p-3.5 rounded-xl bg-[#111317]/80 border border-[#1F222A]/80 flex items-start gap-3.5 hover:border-[#2A2E38] transition-colors">
                      <div className="p-2 rounded-lg bg-[#181B22] text-[#E5B45B] mt-0.5 shrink-0 border border-[#1F222A]">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-wider">
                          Technical Trajectory
                        </p>
                        <p className="text-xs sm:text-sm font-medium text-[#F4F5F0] mt-1">
                          Full-Stack Web Development &amp; Applied AI
                        </p>
                        <p className="text-xs text-[#8A8F98] mt-0.5">
                          Scalable architectures, REST APIs &amp; LLM workflows
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Ledger Footer Tag */}
                <div className="mt-6 pt-4 border-t border-[#1F222A] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>DISCIPLINE // COMPUTER_SCIENCE</span>
                  <span className="text-neutral-400">INVERTIS // B.TECH</span>
                </div>

              </div>
            </div>

          </div>

          {/* Bottom Tier: Verified Competencies Stack (6 cols) + Engineering Principles (6 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Card 3: Core Competencies Matrix (Lower-Left 3D Directional Entrance) */}
            <div
              className={`lg:col-span-6 flex flex-col about-card-assembly-wrapper about-stagger-2 ${
                isContentVisible ? 'about-card-assembly-visible' : 'about-card-assembly-hidden-bottom-left'
              }`}
            >
              <div
                ref={skillsMatrixRef}
                tabIndex={0}
                className="h-full rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-8 relative overflow-hidden shadow-xl group hover:border-emerald-500/40 transition-all focus:outline-none focus:ring-1 focus:ring-emerald-500/40 flex flex-col justify-between"
                aria-label="Verified competencies matrix"
              >
                {/* 3D Reflection and Cursor Spotlight */}
                <CardReflectionGlow
                  glowColor="emerald"
                  isRevealed={isContentVisible}
                />

                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#1F222A]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#14171F] border border-[#262B36] text-emerald-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#F4F5F0] font-medium">
                        Verified Technical Stack
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400">
                      {coreSkills.length} Core Areas
                    </span>
                  </div>

                  <p className="text-xs text-[#8A8F98] font-editorial mt-4 mb-5 leading-relaxed">
                    Primary technologies exercised across real-world virtual internships, production web applications, and algorithmic problem-solving.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {coreSkills.map((skill) => (
                      <div
                        key={skill.label}
                        className="p-2.5 rounded-xl bg-[#111317] border border-[#1F222A] hover:border-emerald-500/40 hover:bg-[#141820] transition-all flex flex-col justify-between group/skill"
                      >
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#8A8F98] group-hover/skill:text-emerald-400 transition-colors">
                          {skill.category}
                        </span>
                        <span className="text-xs font-mono font-medium text-[#F4F5F0] mt-1.5 truncate">
                          {skill.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F222A] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>FRAMEWORK // MERN_JAVA</span>
                  <a
                    href="#skills"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 group/skilllink"
                  >
                    <span>Full taxonomy</span>
                    <ArrowRight className="w-3 h-3 group-hover/skilllink:translate-x-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            </div>

            {/* Card 4: Core Engineering Principles (Lower-Right 3D Directional Entrance) */}
            <div
              className={`lg:col-span-6 flex flex-col about-card-assembly-wrapper about-stagger-3 ${
                isContentVisible ? 'about-card-assembly-visible' : 'about-card-assembly-hidden-bottom-right'
              }`}
            >
              <div
                ref={principlesCardRef}
                tabIndex={0}
                className="h-full rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-8 relative overflow-hidden shadow-xl group hover:border-[#E5B45B]/40 transition-all focus:outline-none focus:ring-1 focus:ring-[#E5B45B]/40 flex flex-col justify-between"
                aria-label="Core engineering principles"
              >
                {/* 3D Reflection and Cursor Spotlight */}
                <CardReflectionGlow
                  glowColor="champagne"
                  isRevealed={isContentVisible}
                />

                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-[#1F222A]">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#14171F] border border-[#262B36] text-[#E5B45B]">
                        <Compass className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#F4F5F0] font-medium">
                        Engineering Mindset &amp; Values
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-neutral-400">
                      3 Guiding Pillars
                    </span>
                  </div>

                  <div className="space-y-4 mt-5">
                    {/* Pillar 01 */}
                    <div className="p-3.5 rounded-xl bg-[#111317]/80 border border-[#1F222A] hover:border-[#E5B45B]/30 transition-colors">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#E5B45B] bg-[#E5B45B]/10 px-1.5 py-0.5 rounded border border-[#E5B45B]/20">
                          01
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#F4F5F0] font-sans">
                          Algorithmic Rigor &amp; Complexity Awareness
                        </h4>
                      </div>
                      <p className="text-xs text-[#8A8F98] font-editorial pl-8 leading-relaxed">
                        Design for asymptotic efficiency, optimal space-time constraints, and invariant integrity under edge cases.
                      </p>
                    </div>

                    {/* Pillar 02 */}
                    <div className="p-3.5 rounded-xl bg-[#111317]/80 border border-[#1F222A] hover:border-[#E5B45B]/30 transition-colors">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#E5B45B] bg-[#E5B45B]/10 px-1.5 py-0.5 rounded border border-[#E5B45B]/20">
                          02
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#F4F5F0] font-sans">
                          Component Modularity &amp; Contract Cleanliness
                        </h4>
                      </div>
                      <p className="text-xs text-[#8A8F98] font-editorial pl-8 leading-relaxed">
                        Strict separation between UI presentation, state machines, and RESTful service boundaries for scalable maintenance.
                      </p>
                    </div>

                    {/* Pillar 03 */}
                    <div className="p-3.5 rounded-xl bg-[#111317]/80 border border-[#1F222A] hover:border-[#E5B45B]/30 transition-colors">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-[#E5B45B] bg-[#E5B45B]/10 px-1.5 py-0.5 rounded border border-[#E5B45B]/20">
                          03
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#F4F5F0] font-sans">
                          Pragmatic Product Focus &amp; Real Utility
                        </h4>
                      </div>
                      <p className="text-xs text-[#8A8F98] font-editorial pl-8 leading-relaxed">
                        Translating theoretical models and code into responsive, accessible digital experiences that solve tangible user needs.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1F222A] flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>STANDARDS // ACCESSIBILITY &amp; PERFORMANCE</span>
                  <span className="text-[#E5B45B]">PRAGMATIC CRAFT</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
