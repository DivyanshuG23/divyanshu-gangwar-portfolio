import React from 'react';
import { PROJECTS, type Project } from '../types';
import { TechIcon } from './TechIcons';
import {
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  GitBranch,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';
import { ParticleLandscapeCanvas } from './ParticleLandscapeCanvas';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

/**
 * Lightweight, futuristic CSS/SVG mock preview of FlowForge AI's node-based canvas.
 * Illustrates the visual workflow pipeline using warm champagne/gold and slate tokens
 * without fabricating fake screenshots, user metrics, or ratings.
 */
const FlowForgeCanvasMock: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#07080B] p-4 sm:p-5 flex flex-col justify-between select-none relative overflow-hidden">
      {/* Subtle blueprint grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(#1E232E_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none"
      />

      {/* Canvas top bar */}
      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-2 border-b border-[#1A1D24]">
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-amber-300" />
          <span>flowforge.canvas // pipeline_01</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#111317] border border-[#1F222A] text-[10px] text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Active Graph
          </span>
        </div>
      </div>

      {/* Visual node architecture */}
      <div className="relative z-10 my-auto py-2 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-2">
        {/* Node 1: Ingest Trigger */}
        <div className="w-full sm:w-[30%] p-2.5 rounded-xl bg-[#0D0F14] border border-[#222733] shadow-md flex flex-col gap-1.5 transition-transform duration-300 group-hover:border-amber-400/30">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Trigger</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
          <div className="font-sans text-xs font-semibold text-neutral-200 truncate">
            Webhook Event
          </div>
          <div className="font-mono text-[9px] text-neutral-500 bg-[#08090C] px-1.5 py-0.5 rounded border border-[#161922]">
            POST /api/pipeline
          </div>
        </div>

        {/* Connecting spine / flow */}
        <div className="hidden sm:flex items-center justify-center shrink-0 w-8">
          <div className="w-full h-px bg-gradient-to-r from-amber-400/40 via-amber-300/40 to-amber-400/40 relative">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300 absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#f59e0b]" />
          </div>
        </div>

        {/* Node 2: Processing Engine */}
        <div className="w-full sm:w-[34%] p-2.5 rounded-xl bg-[#0D0F14] border border-amber-400/25 shadow-lg flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-amber-300 uppercase tracking-wider">Compute</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
          <div className="font-sans text-xs font-semibold text-[#F4F5F0] truncate">
            Flow Orchestrator
          </div>
          <div className="font-mono text-[9px] text-neutral-400 bg-[#08090C] px-1.5 py-0.5 rounded border border-[#161922] truncate">
            JSON Transform &amp; Route
          </div>
        </div>

        {/* Connecting spine / flow */}
        <div className="hidden sm:flex items-center justify-center shrink-0 w-8">
          <div className="w-full h-px bg-gradient-to-r from-amber-400/40 via-amber-300/40 to-emerald-500/40 relative">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_8px_#34d399]" />
          </div>
        </div>

        {/* Node 3: Output Destination */}
        <div className="w-full sm:w-[30%] p-2.5 rounded-xl bg-[#0D0F14] border border-[#222733] shadow-md flex flex-col gap-1.5 transition-transform duration-300 group-hover:border-emerald-500/40">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider">Output</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="font-sans text-xs font-semibold text-neutral-200 truncate">
            Sync Dispatch
          </div>
          <div className="font-mono text-[9px] text-neutral-500 bg-[#08090C] px-1.5 py-0.5 rounded border border-[#161922]">
            Status: 200 OK
          </div>
        </div>
      </div>

      {/* Canvas footer */}
      <div className="relative z-10 pt-2 border-t border-[#1A1D24] flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span>Canvas Engine v1.0</span>
        <span>Node Graph Execution Ready</span>
      </div>
    </div>
  );
};

const ProjectCard: React.FC<{
  project: Project;
  index: number;
  isRevealed: boolean;
}> = ({ project, index, isRevealed }) => {
  const liveDemoBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.22, maxOffset: 6 });
  const glowColor =
    project.accent === 'emerald' || project.accent === 'teal' ? 'emerald' : 'champagne';
  const { ref: cardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 4.5,
    glowColor,
  });

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl p-[1px] overflow-hidden bg-[#1F222A] shadow-xl hover:shadow-[0_0_30px_-5px_rgba(212,175,55,0.18)] transition-all duration-500 ease-out h-full"
    >
      {/* Permanent Champagne-Gold Rotating Border Streak */}
      <div
        aria-hidden="true"
        className="champagne-border-streak"
        style={{
          animationDelay: `-${index * 1.87}s`,
        }}
      />

      {/* Subtle Ambient Outer Glow Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-40 group-hover:opacity-75 transition-opacity duration-500 shadow-[0_0_20px_-3px_rgba(212,175,55,0.12)]"
      />

      {/* Inner Card Body: Completely opaque, perfectly covering the center */}
      <div className="relative z-10 w-full h-full rounded-[15px] bg-[#0D0F13] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
        {/* 3D Reflection and Cursor Spotlight across card surface */}
        <CardReflectionGlow
          glowColor={glowColor}
          isRevealed={isRevealed}
        />

        <div className="relative z-10">
          {/* Project Preview Window with Chrome Bar */}
          <div className="relative overflow-hidden rounded-xl bg-[#07080B] border border-[#1F222A] mb-6 group/preview shadow-md">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#1A1D24] bg-[#0E1015]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#262A34]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#262A34]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#262A34]" />
              </div>

              <span className="font-mono text-[10px] text-neutral-500 truncate max-w-[170px] sm:max-w-xs px-2">
                {project.liveUrl.replace('https://', '')}
              </span>

              <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>Live</span>
              </div>
            </div>

            {/* Visual Preview Container */}
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/9.5] bg-[#060709] flex items-center justify-center">
              {project.previewType === 'image' && project.previewUrl ? (
                <img
                  src={project.previewUrl}
                  alt={`${project.title} interface preview`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                />
              ) : (
                <FlowForgeCanvasMock />
              )}

              {/* Hover-triggered subtle diagonal light sweep */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.05] to-transparent motion-reduce:hidden"
              />
            </div>
          </div>

          {/* Project Header: Category Badge & Number */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide border bg-amber-400/10 border-amber-400/25 text-amber-300">
              <Sparkles className="w-3 h-3 mr-1.5 inline" />
              {project.subtitle}
            </span>

            <span className="font-mono text-xs text-neutral-500">
              // 0{index + 1}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F5F0] group-hover:text-white transition-colors font-sans tracking-tight mb-3">
            {project.title}
          </h3>

          {/* Project Narrative */}
          <p className="text-sm sm:text-base text-[#8A8F98] leading-relaxed font-editorial mb-6">
            {project.description}
          </p>
        </div>

        {/* Card Footer: Tech Badges & Interactive Actions */}
        <div className="relative z-10 pt-4 border-t border-[#1A1D24]">
          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111317] border border-[#1A1D24] text-xs font-mono text-[#D4D7DF] transition-colors hover:border-[#2A2E38]"
              >
                <TechIcon skill={tag} className="w-3.5 h-3.5 shrink-0" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Primary Action: Live Demo (Active for all 4 projects) */}
            <a
              ref={liveDemoBtnRef}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14171F] border border-[#262B36] hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-200 text-[#F4F5F0] text-xs font-mono font-medium transition-all group/btn shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer"
              aria-label={`Open ${project.title} live demo in a new tab`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-amber-200 transition-all" />
            </a>

            {/* Secondary Action: Source Code */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0F1116] border border-[#1F222A] hover:border-[#2E3340] hover:bg-[#161920] text-neutral-300 hover:text-white text-xs font-mono font-medium transition-all group/gh focus:outline-none focus:ring-2 focus:ring-amber-400/40 cursor-pointer"
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400 group-hover/gh:text-white transition-colors" />
                <span>Source Code</span>
                <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Projects: React.FC = () => {
  const { ref: sectionRef, getRevealClass } = useScrollReveal();
  const { ref: cardsRef, isVisible: isCardsVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="projects"
      className="py-24 sm:py-32 border-t border-[#1F222A] relative overflow-hidden"
    >
      {/* Subtle section ambient glow */}
      <div
        className="absolute top-1/4 right-0 w-[550px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(229,180,91,0.025),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* 3D Digital Terrain & Perspective Particle Landscape */}
      <ParticleLandscapeCanvas
        variant="projects"
        amplitude={26}
        speed={0.8}
        className="opacity-70"
      />

      {/* Abstract Technical Blueprint Canvas Overlay */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 bg-[radial-gradient(#1E232E_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none"
      />

      {/* Dedicated Left Side Project Telemetry Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-4 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-[#E5B45B] font-semibold">// 05_PROD</span>
        <div className="w-px h-36 bg-gradient-to-b from-[#E5B45B]/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
          <div className="absolute top-16 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-28 -left-1.5 w-3 h-px bg-[#059669]/60" />
        </div>
        <span className="text-[8px] text-neutral-600">4_DEPLOYED</span>
      </div>

      {/* Dedicated Right Side Pipeline Flow Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-end gap-2 absolute right-6 top-36 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded border border-[#1F222A] bg-[#0E1116] text-[#E5B45B] text-[8px] tracking-wider uppercase">
          HUB // FULLSTACK_AI
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#1F222A]" />
        <span className="text-[8px] text-neutral-600">LIVE_CANVAS</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-20 ${getRevealClass(0, 'up')}`}>
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                // 05 · Projects
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F0] font-sans">
              Featured Work &amp; Engineering
            </h2>
            <p className="text-sm sm:text-base text-[#8A8F98] max-w-[620px] mt-3 font-editorial">
              Production-ready web applications, AI tools, and full-stack software built with modern engineering standards.
            </p>
          </div>

          <a
            href="https://github.com/DivyanshuG23?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group/all shrink-0 py-1"
          >
            <Layers className="w-3.5 h-3.5 text-neutral-500 group-hover/all:text-amber-400 transition-colors" />
            <span>View All on GitHub (43 Repos)</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Projects 2x2 Balanced Grid */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              style={{
                transitionDelay: isCardsVisible ? `${index * 150}ms` : '0ms',
              }}
              className={`proj-card-assembly-wrapper h-full ${
                isCardsVisible
                  ? 'proj-card-assembly-visible'
                  : `proj-card-assembly-hidden-${index + 1}`
              }`}
            >
              <ProjectCard
                project={project}
                index={index}
                isRevealed={isCardsVisible}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};