import React, { useState, useEffect } from 'react';
import { ExternalLink, Cpu } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
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
 * ProjectCard
 * Refined complementary project card treatment for URL Shortener, Expense Tracker,
 * and ResumeX AI. Integrates project-specific architectural graphics, 3D cursor tilt,
 * vector technology icons, and graceful disabled states for unsupplied external URLs.
 */
export default function ProjectCard({ project, index, GraphicComponent }) {
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

  const formattedIndex = String(index + 2).padStart(2, '0');

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 5; // -2.5 to +2.5 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -5;
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
              transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-3px)`,
              transition: 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
            }
          : {
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
            }
      }
      className="group relative flex flex-col rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] overflow-hidden transition-all duration-300 hover:border-[var(--color-champagne)]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(229,180,91,0.09)] select-none card-cinematic-bevel"
    >
      {/* Specular Radial Cursor Glare */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229, 180, 91, 0.07), transparent 50%)`,
          }}
        />
      )}

      {/* Top subtle champagne edge highlight on hover */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-champagne)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Visual Architectural Canvas Banner */}
      <div className="h-44 w-full border-b border-[var(--color-charcoal-border)] overflow-hidden bg-[var(--color-charcoal)] transition-transform duration-500 motion-safe:group-hover:scale-[1.01]">
        {GraphicComponent && <GraphicComponent />}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-6 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          {/* Top Metadata */}
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-[var(--color-champagne)] font-semibold tracking-wider">
              // PROJECT {formattedIndex}
            </span>
            <span className="text-[var(--color-emerald)] bg-[var(--color-charcoal)] px-2 py-0.5 rounded border border-[var(--color-emerald)]/20">
              {project.status}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-ivory-subtle)] uppercase tracking-wide">
              <span>{project.category}</span>
              {project.subtitle && (
                <>
                  <span className="text-[var(--color-charcoal-border)]">&bull;</span>
                  <span className="text-[var(--color-champagne)]/80">{project.subtitle}</span>
                </>
              )}
            </div>
            <h3
              id={`project-title-${project.id}`}
              className="text-xl font-bold tracking-tight text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors"
            >
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] leading-relaxed font-sans [text-wrap:pretty]">
            {project.description}
          </p>

          {/* Key Feature Badge */}
          <div className="text-[11px] font-mono text-[var(--color-champagne)] bg-[var(--color-charcoal)] px-2.5 py-1 rounded border border-[var(--color-charcoal-border)] inline-block">
            {project.highlightMetric}
          </div>

          {/* Technology Badges with Vector Logos */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techStack.map((tech) => {
              const IconComp = TECH_LOGO_MAP[tech];
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-[11px] font-mono text-[var(--color-ivory-muted)] hover:border-[var(--color-champagne)]/30 hover:text-[var(--color-ivory)] transition-colors"
                >
                  {IconComp && <IconComp className="w-3 h-3 text-[var(--color-champagne)] shrink-0" />}
                  <span>{tech}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Action CTAs: Real Links when available, disabled badges when pending */}
        <div className="pt-4 border-t border-[var(--color-charcoal-border)] flex items-center justify-between gap-2">
          {hasGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-ivory)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded py-1 px-1.5"
              aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
              <ExternalLink className="w-3 h-3 opacity-60 transition-transform duration-200 motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-ivory-subtle)] opacity-70"
              title="GitHub repository URL pending user input"
              aria-disabled="true"
            >
              <GithubIcon className="w-3.5 h-3.5 opacity-50" />
              <span>Source Pending</span>
            </span>
          )}

          {hasLive ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-1 text-xs font-mono font-medium text-[var(--color-champagne)] hover:text-[var(--color-champagne-light)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded py-1 px-1.5"
              aria-label={`Open ${project.title} live demonstration (opens in new tab)`}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 transition-transform duration-200 motion-safe:group-hover/link:translate-x-0.5 motion-safe:group-hover/link:-translate-y-0.5" />
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--color-ivory-subtle)] opacity-70"
              title="Live demo URL pending user input"
              aria-disabled="true"
            >
              <Cpu className="w-3 h-3 opacity-50 text-[var(--color-champagne)]" />
              <span>Demo Pending</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
