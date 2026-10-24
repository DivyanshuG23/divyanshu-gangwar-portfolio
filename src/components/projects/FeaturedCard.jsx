import React, { useState, useEffect } from 'react';
import { ExternalLink, Cpu, Layers } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { FlowForgeGraphic } from './ProjectGraphics';
import {
  ReactLogo,
  NodeLogo,
  ExpressLogo,
  MongoLogo,
  TailwindLogo,
  RestApiLogo,
} from '../common/TechLogos';

const TECH_LOGO_MAP = {
  'React.js': ReactLogo,
  'Node.js': NodeLogo,
  'Express.js': ExpressLogo,
  Express: ExpressLogo,
  MongoDB: MongoLogo,
  'Tailwind CSS': TailwindLogo,
  'REST APIs': RestApiLogo,
  'REST API': RestApiLogo,
};

/**
 * FeaturedCard
 * Visually dominant card treatment for FlowForge AI.
 * Employs an expansive split presentation, 3D cursor-tracking perspective tilt,
 * authentic technology icons, live status telemetry, and graceful disabled states.
 */
export default function FeaturedCard({ project }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim());
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim());

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 4; // -2 to +2 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -4; // -2 to +2 deg
    setTilt({ x, y });
    setMousePos({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <article
      aria-labelledby={`project-title-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={
        !prefersReducedMotion && isHovered
          ? {
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-2px)`,
              transition: 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
            }
          : {
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
            }
      }
      className="group relative rounded-2xl border border-[var(--color-charcoal-border)] bg-gradient-to-b from-[var(--color-charcoal-surface)] to-[var(--color-charcoal)] overflow-hidden transition-all duration-300 hover:border-[var(--color-champagne)]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(229,180,91,0.12)] select-none card-cinematic-bevel"
    >
      {/* Specular Radial Cursor Glare */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229, 180, 91, 0.08), transparent 45%)`,
          }}
        />
      )}

      {/* Top ambient champagne edge highlight on hover */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-champagne)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Top Engineering Header Bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)]/50 text-[11px] font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-champagne)] animate-pulse" />
          <span className="text-[var(--color-champagne)] font-semibold uppercase tracking-wider">
            Flagship Engineering Project
          </span>
        </div>

        <div className="flex items-center gap-3 text-[var(--color-ivory-subtle)]">
          <span className="hidden sm:inline">SPEC // FULL-STACK</span>
          <span className="text-[var(--color-charcoal-border)] hidden sm:inline">|</span>
          <span className="text-[var(--color-emerald)] font-medium">{project.status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
        {/* Left Column: Project Identity & Specs (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] tracking-wider uppercase">
              <span>{project.category}</span>
              {project.subtitle && (
                <>
                  <span className="text-[var(--color-charcoal-border)]">&bull;</span>
                  <span className="text-[var(--color-ivory-subtle)]">{project.subtitle}</span>
                </>
              )}
            </div>
            <h3
              id={`project-title-${project.id}`}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ivory)] group-hover:text-[var(--color-champagne-light)] transition-colors"
            >
              {project.title}
            </h3>
          </div>

          <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] leading-relaxed font-sans max-w-xl [text-wrap:pretty]">
            {project.description}
          </p>

          {/* Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-xs font-mono text-[var(--color-ivory)]">
            <Layers className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
            <span className="text-[var(--color-ivory-muted)]">Core Feature:</span>
            <span className="text-[var(--color-champagne)] font-medium">{project.highlightMetric}</span>
          </div>

          {/* Technology Badges with Vector Logos */}
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-mono uppercase text-[var(--color-ivory-subtle)] tracking-wider">
              Verified Tech Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => {
                const IconComp = TECH_LOGO_MAP[tech];
                return (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-xs font-mono text-[var(--color-ivory-muted)] transition-colors hover:border-[var(--color-champagne)]/40 hover:text-[var(--color-ivory)]"
                  >
                    {IconComp && <IconComp className="w-3.5 h-3.5 text-[var(--color-champagne)] shrink-0" />}
                    <span>{tech}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Action CTAs: Real Links when available, explicit disabled states when pending */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[var(--color-charcoal-border)]">
            {hasGithub ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-xs font-mono font-medium text-[var(--color-ivory)] hover:border-[var(--color-champagne)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
                aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
                <ExternalLink className="w-3 h-3 opacity-60 transition-transform duration-200 motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-charcoal)]/60 border border-[var(--color-charcoal-border)]/50 text-xs font-mono text-[var(--color-ivory-subtle)] cursor-not-allowed opacity-75"
                title="Repository URL pending user input"
                aria-disabled="true"
              >
                <GithubIcon className="w-4 h-4 opacity-50" />
                <span>Source Code (URL Pending)</span>
              </button>
            )}

            {hasLive ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-champagne)] text-[var(--color-charcoal)] text-xs font-mono font-semibold hover:bg-[var(--color-champagne-light)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
                aria-label={`Open ${project.title} live demonstration (opens in new tab)`}
              >
                <span>Live Demonstration</span>
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-200 motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)]/60 text-xs font-mono text-[var(--color-ivory-subtle)] cursor-not-allowed opacity-75"
                title="Live demo URL pending user input"
                aria-disabled="true"
              >
                <Cpu className="w-3.5 h-3.5 opacity-50 text-[var(--color-champagne)]" />
                <span>Live Demo (URL Pending)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: High-Tech Architectural Visual Canvas (5 cols) */}
        <div className="lg:col-span-5 h-full min-h-[220px] sm:min-h-[260px] rounded-xl border border-[var(--color-charcoal-border)] overflow-hidden transition-transform duration-500 motion-safe:group-hover:scale-[1.01]">
          <FlowForgeGraphic />
        </div>
      </div>
    </article>
  );
}
