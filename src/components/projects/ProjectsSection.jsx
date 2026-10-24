import React from 'react';
import { Code2, ArrowUpRight, ShieldCheck, Terminal } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { PROJECTS_DATA } from '../../data/projects';
import { PROFILE_DATA } from '../../data/profile';
import FeaturedCard from './FeaturedCard';
import ProjectCard from './ProjectCard';
import {
  FlowForgeGraphic,
  UrlShortenerGraphic,
  ExpenseFlowGraphic,
  ResumeAnalyzerGraphic,
} from './ProjectGraphics';

const GRAPHICS_MAP = {
  'flowforge-ai': FlowForgeGraphic,
  'url-shortener': UrlShortenerGraphic,
  'expense-tracker': ExpenseFlowGraphic,
  'expense-flow': ExpenseFlowGraphic,
  'resumex-ai': ResumeAnalyzerGraphic,
  'ai-resume-analyzer': ResumeAnalyzerGraphic,
};

/**
 * ProjectsSection
 * Primary Featured Projects showcase anchored at #work.
 * Incorporates a visually dominant featured card (FlowForge AI),
 * three complementary cards, verified tech stacks, and graceful URL fallbacks.
 */
export default function ProjectsSection() {
  const featuredProject = PROJECTS_DATA.find((p) => p.featured) || PROJECTS_DATA[0];
  const complementaryProjects = PROJECTS_DATA.filter((p) => !p.featured);

  return (
    <section
      id="work"
      tabIndex={-1}
      className="section-delimiter relative py-20 border-t border-[var(--color-charcoal-border)] scroll-mt-16 focus:outline-none"
      aria-labelledby="featured-projects-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>// 01. SELECTED SYSTEMS</span>
            </div>
            
            <h2
              id="featured-projects-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ivory)] [text-wrap:balance]"
            >
              Featured Engineering Work
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
              Demonstrable full-stack web applications and AI-driven systems engineered with React,
              modern backend services, and scalable architecture.
            </p>
          </div>

          {/* Telemetry Status Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] font-mono text-xs text-[var(--color-ivory-subtle)] shrink-0">
            <ShieldCheck className="w-4 h-4 text-[var(--color-emerald)]" />
            <span className="text-[var(--color-ivory)] font-medium">4 Verified Projects</span>
            <span className="text-[var(--color-charcoal-border)]">|</span>
            <span className="text-[var(--color-emerald)]">Demo Ready</span>
          </div>
        </div>

        {/* Dominant Featured Project Treatment: FlowForge AI */}
        {featuredProject && (
          <div className="w-full">
            <FeaturedCard project={featuredProject} />
          </div>
        )}

        {/* Complementary Three-Project Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ivory-subtle)] pt-2 border-t border-[var(--color-charcoal-border)]/60">
            <span>COMPLEMENTARY SYSTEMS // MERN &amp; UTILITIES</span>
            <span>03 MODULES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complementaryProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                GraphicComponent={GRAPHICS_MAP[project.id] || GRAPHICS_MAP[project.aliasId]}
              />
            ))}
          </div>
        </div>

        {/* Secondary GitHub Repository Callout */}
        <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)]/60 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] flex items-center justify-center text-[var(--color-champagne)] shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--color-ivory)]">
                Looking for more source repositories?
              </div>
              <div className="text-xs font-mono text-[var(--color-ivory-muted)]">
                Explore Divyanshu's active commits, experimental branches, and libraries on GitHub.
              </div>
            </div>
          </div>

          <a
            href={PROFILE_DATA.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 hover:text-[var(--color-champagne)] transition-colors text-xs font-mono font-medium text-[var(--color-ivory)] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
          >
            <GithubIcon className="w-4 h-4" />
            <span>DivyanshuG23 on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
}
