import React, { useState, useEffect } from 'react';
import { EXPERIENCES, type ExperienceItem } from '../types';
import { TechIcon } from './TechIcons';
import {
  Calendar,
  Clock,
  Briefcase,
  CheckCircle2,
  Award,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';

const accentColorStyles: Record<
  'teal' | 'emerald' | 'blue',
  {
    badge: string;
    node: string;
    sweep: string;
    hoverBorder: string;
    ctaHover: string;
  }
> = {
  teal: {
    badge: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    node: 'ring-emerald-500/30 text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    sweep: 'from-emerald-500/[0.08] via-emerald-500/[0.02] to-transparent',
    hoverBorder: 'hover:border-emerald-500/40 hover:shadow-[0_12px_36px_-15px_rgba(5,150,105,0.15)]',
    ctaHover: 'group-hover/btn:border-emerald-500/50 hover:bg-emerald-500/10',
  },
  emerald: {
    badge: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
    node: 'ring-emerald-500/30 text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    sweep: 'from-emerald-500/[0.08] via-emerald-500/[0.02] to-transparent',
    hoverBorder: 'hover:border-emerald-500/40 hover:shadow-[0_12px_36px_-15px_rgba(5,150,105,0.15)]',
    ctaHover: 'group-hover/btn:border-emerald-500/50 hover:bg-emerald-500/10',
  },
  blue: {
    badge: 'bg-[#E5B45B]/10 border-[#E5B45B]/25 text-[#E5B45B]',
    node: 'ring-[#E5B45B]/30 text-[#E5B45B] bg-[#E5B45B]/10 border-[#E5B45B]/30',
    sweep: 'from-[#E5B45B]/[0.08] via-[#E5B45B]/[0.02] to-transparent',
    hoverBorder: 'hover:border-[#E5B45B]/40 hover:shadow-[0_12px_36px_-15px_rgba(229,180,91,0.15)]',
    ctaHover: 'group-hover/btn:border-[#E5B45B]/50 hover:bg-[#E5B45B]/10',
  },
};

const ExperienceCard: React.FC<{
  item: ExperienceItem;
  isRevealed: boolean;
  sequenceNumber: string;
  onViewCert: (item: ExperienceItem) => void;
}> = ({ item, isRevealed, sequenceNumber, onViewCert }) => {
  const glowColor =
    item.accent === 'teal' || item.accent === 'emerald' ? 'emerald' : 'champagne';

  const { ref } = useTiltReflection<HTMLDivElement>({
    maxTilt: 4.0,
    glowColor,
  });

  const styles = accentColorStyles[item.accent];

  return (
    <div
      ref={ref}
      className={`group/card relative rounded-2xl bg-[#0D0F13] border border-[#1F222A] p-6 sm:p-8 lg:p-10 shadow-xl transition-all duration-500 ${styles.hoverBorder}`}
    >
      {/* 3D Reflection and Dynamic Cursor Spotlight */}
      <CardReflectionGlow
        glowColor={glowColor}
        isRevealed={isRevealed}
      />

      {/* Subtle radial light sweep on hover */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br ${styles.sweep} opacity-0 group-hover/card:opacity-100 transition-opacity duration-500`}
      />

      {/* Card Content */}
      <div className="relative z-10 flex flex-col gap-6">
        {/* Header: Company logo, titles, and metadata pills */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[#1A1D24]">
          {/* Logo + Role Information */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5">
            {/* Company Logo Well */}
            <div className="h-12 w-28 sm:h-14 sm:w-32 rounded-xl bg-[#111317] border border-[#1F222A] p-2 flex items-center justify-center shrink-0 shadow-inner">
              <img
                src={item.logoUrl}
                alt={item.logoAlt}
                className="max-h-full max-w-full object-contain filter brightness-95 group-hover/card:brightness-105 transition-all"
                loading="eager"
              />
            </div>

            {/* Title & Organization */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wide border ${styles.badge}`}
                >
                  <Briefcase className="w-3 h-3 mr-1.5 inline" />
                  {item.type}
                </span>
                <span className="lg:hidden font-mono text-[11px] text-neutral-500 px-2 py-0.5 rounded-full bg-[#111317] border border-[#1F222A]">
                  #{sequenceNumber}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#F4F5F0] font-sans tracking-tight">
                {item.role}
              </h3>

              <p className="text-base text-neutral-300 font-medium font-editorial mt-1">
                {item.organization}
              </p>

              {item.program && item.program !== item.role && (
                <p className="text-xs text-neutral-400 font-editorial mt-1">
                  Program: {item.program}
                </p>
              )}
            </div>
          </div>

          {/* Metadata Chips: Duration & Verified Period */}
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-2 text-xs font-mono text-[#8A8F98] shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-neutral-400" />
              <span>Duration: {item.duration}</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] text-neutral-400">
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
              <span>{item.period}</span>
            </div>
          </div>
        </div>

        {/* Factual Bullets */}
        <div>
          <ul className="space-y-3">
            {item.bullets.map((bullet, bIdx) => (
              <li
                key={bIdx}
                className="flex items-start gap-3 text-sm text-[#8A8F98] leading-relaxed font-editorial"
              >
                <CheckCircle2 className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0 group-hover/card:text-neutral-400 transition-colors" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer: Technology Stack & View Certificate CTA */}
        <div className="pt-6 border-t border-[#1A1D24] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Tech Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-neutral-500 mr-1 hidden sm:inline">
              Stack:
            </span>
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111317] border border-[#1A1D24] text-xs font-mono text-[#D4D7DF] transition-colors hover:border-[#2A2E38]"
              >
                <TechIcon skill={tech} className="w-3.5 h-3.5 shrink-0" />
                <span>{tech}</span>
              </span>
            ))}
          </div>

          {/* View Certificate CTA Button */}
          <button
            type="button"
            onClick={() => onViewCert(item)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14171F] border border-[#262B36] text-[#F4F5F0] text-xs font-mono font-medium transition-all group/btn shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer shrink-0 ${styles.ctaHover}`}
            aria-haspopup="dialog"
            aria-label={`View ${item.organization} internship certificate`}
          >
            <Award className="w-4 h-4 text-amber-400 group-hover/btn:scale-110 transition-transform" />
            <span>View Certificate</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-500 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Experience: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<ExperienceItem | null>(null);
  const { ref: sectionRef, getRevealClass } = useScrollReveal();
  const { ref: cardsRef, isVisible: isCardsVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedCert) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedCert]);

  // Close modal on Escape key press
  useEffect(() => {
    if (!selectedCert) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCert(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCert]);

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 sm:py-32 border-t border-[#1F222A] relative overflow-hidden"
    >
      {/* Subtle section ambient glow */}
      <div
        className="absolute top-1/3 left-0 w-[550px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.025),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Dedicated Left Side Career Timeline Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-4 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-[#E5B45B] font-semibold">// 04_EXP</span>
        <div className="w-px h-36 bg-gradient-to-b from-[#E5B45B]/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
          <div className="absolute top-20 -left-1.5 w-3 h-px bg-[#059669]/60" />
        </div>
        <span className="text-[8px] text-neutral-600">VERIFIED</span>
      </div>

      {/* Dedicated Right Side Status Stamp (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-end gap-2 absolute right-6 top-36 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded border border-[#1F222A] bg-[#0E1116] text-emerald-400 text-[8px] tracking-wider uppercase">
          AUDIT // INDUSTRY_XP
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#1F222A]" />
        <span className="text-[8px] text-neutral-600">PRODUCTION_STACK</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`mb-14 sm:mb-20 ${getRevealClass(0, 'up')}`}>
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              // 04 · Experience
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F0] max-w-[800px] font-sans">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F98] max-w-[640px] mt-3 font-editorial">
            Verified software engineering internships and hands-on full-stack development experience.
          </p>
        </div>

        {/* Timeline Sequence Container */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="relative flex flex-col gap-8 sm:gap-10"
        >
          {/* Subtle connecting vertical rail for desktop with animated pulse flow */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-[#2A2E38] via-[#1F222A] to-transparent pointer-events-none"
          >
            <div className="w-full h-full bg-gradient-to-b from-transparent via-[#E5B45B]/60 to-transparent animate-pulse" />
          </div>

          {EXPERIENCES.map((item, index) => {
            const styles = accentColorStyles[item.accent];
            const sequenceNumber = `0${index + 1}`;

            return (
              <div
                key={item.id}
                className="relative lg:pl-20 group"
              >
                {/* Timeline node for desktop - anchored to the rail */}
                <div
                  aria-hidden="true"
                  style={{
                    transitionDelay: isCardsVisible ? `${index * 160}ms` : '0ms',
                  }}
                  className={`hidden lg:flex absolute left-3.5 top-8 -translate-x-1/2 w-9 h-9 rounded-full border items-center justify-center font-mono text-xs font-semibold shadow-lg transition-all duration-500 group-hover:scale-110 motion-reduce:group-hover:scale-100 z-10 bg-[#0D0F13] ${
                    isCardsVisible ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                  }`}
                >
                  <span className={`w-full h-full rounded-full flex items-center justify-center border ${styles.node}`}>
                    {sequenceNumber}
                  </span>
                </div>

                {/* Main Internship Card Outer Assembly Wrapper */}
                <div
                  style={{
                    transitionDelay: isCardsVisible ? `${index * 160}ms` : '0ms',
                  }}
                  className={`exp-card-assembly-wrapper ${
                    isCardsVisible
                      ? 'exp-card-assembly-visible'
                      : `exp-card-assembly-hidden-${index + 1}`
                  }`}
                >
                  <ExperienceCard
                    item={item}
                    isRevealed={isCardsVisible}
                    sequenceNumber={sequenceNumber}
                    onViewCert={setSelectedCert}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessible Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          aria-describedby="cert-modal-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedCert(null);
            }
          }}
        >
          <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0D0F13] border border-[#2A2E38] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 border-b border-[#1F222A] bg-[#111317]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="h-9 w-20 sm:h-10 sm:w-24 rounded-lg bg-[#0D0F13] border border-[#1F222A] p-1.5 flex items-center justify-center shrink-0">
                  <img
                    src={selectedCert.logoUrl}
                    alt={selectedCert.logoAlt}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <h3
                    id="cert-modal-title"
                    className="text-sm sm:text-base font-bold text-[#F4F5F0] font-sans truncate"
                  >
                    {selectedCert.organization} · {selectedCert.role}
                  </h3>
                  <p
                    id="cert-modal-desc"
                    className="text-xs font-mono text-neutral-400 mt-0.5 truncate"
                  >
                    Verified Period: {selectedCert.period} ({selectedCert.duration})
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                autoFocus
                className="p-2 rounded-xl bg-[#161920] border border-[#262B36] text-neutral-400 hover:text-white hover:bg-[#1F222A] transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Display Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 bg-[#07080A] flex items-center justify-center min-h-[300px]">
              <img
                src={selectedCert.certificateUrl}
                alt={selectedCert.certificateAlt}
                className="max-h-[66vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-lg border border-[#1F222A] shadow-2xl transition-transform"
                loading="eager"
              />
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 sm:px-6 sm:py-4 border-t border-[#1F222A] bg-[#111317]">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Internship Completion · {selectedCert.organization}</span>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={selectedCert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14171F] border border-[#262B36] text-xs font-mono text-neutral-300 hover:text-white hover:bg-[#1A1E29] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Full Image</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1F222A] hover:bg-[#2A2E38] text-xs font-mono text-white transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};