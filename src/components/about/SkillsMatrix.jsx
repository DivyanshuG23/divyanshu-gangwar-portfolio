import React, { useState, useEffect } from 'react';
import {
  Layout,
  Server,
  Database,
  Cpu,
  Terminal,
  Code2,
  Sparkles,
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';
import {
  ReactLogo,
  JavaScriptLogo,
  Html5Logo,
  Css3Logo,
  TailwindLogo,
  BootstrapLogo,
  ResponsiveLogo,
  NodeLogo,
  ExpressLogo,
  RestApiLogo,
  MvcLogo,
  MiddlewareLogo,
  MongoLogo,
  MySqlLogo,
  GitLogo,
  GitHubLogo,
  PostmanLogo,
  JwtLogo,
  BcryptLogo,
  JavaLogo,
  PythonLogo,
  DsaLogo,
} from '../common/TechLogos';

const LOGO_MAP = {
  ReactLogo,
  JavaScriptLogo,
  Html5Logo,
  Css3Logo,
  TailwindLogo,
  BootstrapLogo,
  ResponsiveLogo,
  NodeLogo,
  ExpressLogo,
  RestApiLogo,
  MvcLogo,
  MiddlewareLogo,
  MongoLogo,
  MySqlLogo,
  GitLogo,
  GitHubLogo,
  PostmanLogo,
  JwtLogo,
  BcryptLogo,
  JavaLogo,
  PythonLogo,
  DsaLogo,
};

const CATEGORY_ICONS = {
  frontend: Layout,
  'Frontend Engineering': Layout,
  backend: Server,
  'Backend & APIs': Server,
  'Backend & Data': Server,
  'database-tools': Database,
  'Database & Tools': Database,
  'Tools & Workflow': Database,
  foundations: Cpu,
  'Programming Foundations': Cpu,
  'Core Computer Science': Cpu,
};

const FILTER_TABS = [
  { id: 'all', label: 'All Technologies', count: 22 },
  { id: 'frontend', label: 'Frontend', count: 7 },
  { id: 'backend', label: 'Backend & APIs', count: 5 },
  { id: 'database-tools', label: 'Database & Tools', count: 7 },
  { id: 'foundations', label: 'Foundations', count: 3 },
];

/**
 * SkillCard
 * Interactive technology tile featuring authentic SVG logos,
 * subtle 3D cursor-tracking perspective tilt, champagne edge illumination,
 * and reduced-motion graceful fallback.
 */
function SkillCard({ item, prefersReducedMotion, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const name = typeof item === 'string' ? item : item.name;
  const tag = typeof item === 'object' ? item.tag : 'Verified Skill';
  const logoKey = typeof item === 'object' ? item.logo : null;
  const LogoComponent = (logoKey && LOGO_MAP[logoKey]) ? LOGO_MAP[logoKey] : Code2;

  const handleMouseMove = (e) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8; // -4 to +4 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8; // -4 to +4 deg
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
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative group rounded-xl p-3 sm:p-3.5 bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/50 hover:shadow-[0_12px_28px_rgba(0,0,0,0.45),0_0_20px_rgba(229,180,91,0.08)] flex items-center gap-3 select-none overflow-hidden card-cinematic-bevel ${
        prefersReducedMotion ? 'opacity-100' : 'animate-[fadeInUp_0.35s_ease-out_forwards]'
      }`}
      style={{
        ...(!prefersReducedMotion && isHovered
          ? {
              transform: `perspective(700px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-2px)`,
              transition: 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
            }
          : {
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
            }),
        animationDelay: prefersReducedMotion ? undefined : `${index * 30}ms`,
      }}
    >
      {/* Subtle Specular Radial Glare */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(280px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229, 180, 91, 0.08), transparent 60%)`,
          }}
        />
      )}

      {/* Top champagne edge highlight line on hover */}
      <div className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-champagne)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Vector Logo Box */}
      <div className="w-9 h-9 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] flex items-center justify-center text-[var(--color-champagne)] group-hover:text-[var(--color-champagne-light)] group-hover:border-[var(--color-champagne)]/40 group-hover:scale-105 transition-all duration-300 shrink-0">
        <LogoComponent className="w-5 h-5 transition-transform duration-300" />
      </div>

      {/* Text Details */}
      <div className="min-w-0 flex-1">
        <span className="text-xs sm:text-sm font-semibold text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors truncate block">
          {name}
        </span>
        <span className="text-[10px] font-mono text-[var(--color-ivory-subtle)] truncate block pt-0.5">
          {tag}
        </span>
      </div>

      {/* Subtle Active Indicator Dot */}
      <span
        className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]/70 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="Verified Production Competency"
      />
    </div>
  );
}

/**
 * SkillsMatrix
 * Cinematic Developer Arsenal experience displaying all 22 verified resume skills
 * with custom vector brand logos, category tabs, 3D tilt interactions,
 * and high-contrast dark industrial-tech styling.
 */
export default function SkillsMatrix() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const allSkills = PROFILE_DATA.skills || [];

  const filteredCategories =
    activeFilter === 'all'
      ? allSkills
      : allSkills.filter(
          (cat) => cat.id === activeFilter || cat.category.toLowerCase().includes(activeFilter)
        );

  return (
    <div id="skills-matrix" className="space-y-8">
      {/* Section Header & Dashboard Telemetry */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[var(--color-charcoal-border)]">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] uppercase tracking-widest">
            <Terminal className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
            <span>// 02.B TECHNICAL ARSENAL</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-ivory)] [text-wrap:balance]">
            Engineering Competencies &amp; Tech Stack
          </h3>

          <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
            Production-ready libraries, server runtimes, database architectures, and computational fundamentals verified across scalable web systems.
          </p>
        </div>

        {/* Telemetry Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] font-mono text-xs text-[var(--color-ivory-subtle)] shrink-0 self-start md:self-auto">
          <span className="w-2 h-2 rounded-full bg-[var(--color-emerald)] animate-pulse" />
          <span className="text-[var(--color-ivory)] font-medium">22 VERIFIED CAPABILITIES</span>
          <span className="text-[var(--color-charcoal-border)]">|</span>
          <span className="text-[var(--color-champagne)]">04 TIERS</span>
        </div>
      </div>

      {/* Interactive Category Filter Bar */}
      <div
        role="tablist"
        aria-label="Filter skills by engineering domain"
        className="flex flex-wrap items-center gap-2 pb-2"
      >
        {FILTER_TABS.map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] ${
                isActive
                  ? 'bg-[var(--color-charcoal-surface)] border border-[var(--color-champagne)]/60 text-[var(--color-champagne)] shadow-[0_0_16px_rgba(229,180,91,0.12)]'
                  : 'bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)] hover:border-[var(--color-charcoal-border)]/80'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isActive
                    ? 'bg-[var(--color-champagne)]/20 text-[var(--color-champagne)]'
                    : 'bg-[var(--color-charcoal-surface)] text-[var(--color-ivory-subtle)]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Category Panels */}
      <div
        className={
          activeFilter === 'all'
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
            : 'space-y-6'
        }
      >
        {filteredCategories.map((group) => {
          const IconComponent =
            CATEGORY_ICONS[group.id] ||
            CATEGORY_ICONS[group.category] ||
            Cpu;

          return (
            <div
              key={group.category}
              className="rounded-2xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-5 sm:p-6 space-y-5 transition-all duration-300 hover:border-[var(--color-champagne)]/30 hover:shadow-[0_0_24px_rgba(229,180,91,0.04)]"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-charcoal-border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] flex items-center justify-center text-[var(--color-champagne)] shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[var(--color-ivory)]">
                      {group.category}
                    </h4>
                    <p className="text-[11px] font-mono text-[var(--color-champagne)] pt-0.5">
                      {group.tagline || group.description}
                    </p>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] font-mono text-[10px] text-[var(--color-ivory-subtle)] uppercase shrink-0">
                  {group.items.length < 10 ? `0${group.items.length}` : group.items.length} ASSETS
                </div>
              </div>

              {/* Skills Technology Cards */}
              <div
                className={
                  activeFilter === 'all'
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-2.5'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'
                }
              >
                {group.items.map((item, idx) => (
                  <SkillCard
                    key={typeof item === 'string' ? item : item.name}
                    item={item}
                    index={idx}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Assurance Banner */}
      <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)]/80 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--color-ivory-subtle)]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
          <span>PRODUCTION-PROVEN ARCHITECTURES &bull; ZERO FABRICATED TECH CLAIMS</span>
        </div>
        <div className="text-[11px] text-[var(--color-emerald)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
          <span>100% RESUME-ALIGNED TECHNICAL STACK</span>
        </div>
      </div>
    </div>
  );
}
