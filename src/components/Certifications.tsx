import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { CERTIFICATIONS, type Certification } from '../types';
import {
  Award,
  Calendar,
  Building2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Sparkles,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
  FolderLock,
  RotateCcw,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';

const CATEGORY_COLORS: Record<
  Certification['category'],
  { badge: string; border: string; glow: string; text: string }
> = {
  Internships: {
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    border: 'border-emerald-500/40',
    glow: 'rgba(5, 150, 105, 0.15)',
    text: 'text-emerald-400',
  },
  'Web Development': {
    badge: 'bg-[#E5B45B]/10 text-[#E5B45B] border-[#E5B45B]/30',
    border: 'border-[#E5B45B]/40',
    glow: 'rgba(229, 180, 91, 0.15)',
    text: 'text-[#E5B45B]',
  },
  Programming: {
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    border: 'border-emerald-500/40',
    glow: 'rgba(5, 150, 105, 0.12)',
    text: 'text-emerald-300',
  },
  'Other Learning': {
    badge: 'bg-[#E5B45B]/10 text-[#E5B45B] border-[#E5B45B]/30',
    border: 'border-[#E5B45B]/40',
    glow: 'rgba(229, 180, 91, 0.15)',
    text: 'text-[#E5B45B]',
  },
};

export const Certifications: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  // Decoupled scroll-reveal observers for scroll-speed independence and bidirectional repeat
  const { ref: sectionRef, getRevealClass } = useScrollReveal();
  const { ref: contentRef, isVisible: isContentVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  // 3D Tilt Reflection for the primary showcase dossier
  const { ref: showcaseCardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 2.5,
    glowColor: 'champagne',
  });

  // Touch swipe tracking
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // References for scrolling active thumbnail within its local container
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef<boolean>(true);

  // Available categories
  const categories = useMemo(() => {
    return ['All', 'Internships', 'Web Development', 'Programming', 'Other Learning'];
  }, []);

  // Filter certificates by category
  const filteredCerts = useMemo(() => {
    if (activeCategory === 'All') return CERTIFICATIONS;
    return CERTIFICATIONS.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __setCertCategory?: (cat: string) => void }).__setCertCategory = (cat: string) => {
        setActiveCategory(cat);
        setCurrentIndex(0);
      };
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete (window as unknown as { __setCertCategory?: unknown }).__setCertCategory;
      }
    };
  }, []);

  const safeIndex = currentIndex < filteredCerts.length ? currentIndex : 0;
  const currentCert: Certification | undefined = filteredCerts[safeIndex];
  const totalCount = filteredCerts.length;

  const handlePrev = useCallback(() => {
    if (totalCount === 0) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalCount - 1));
  }, [totalCount]);

  const handleNext = useCallback(() => {
    if (totalCount === 0) return;
    setCurrentIndex((prev) => (prev < totalCount - 1 ? prev + 1 : 0));
  }, [totalCount]);

  // Scroll active thumbnail horizontally into view inside its container only
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const container = thumbnailContainerRef.current;
    const el = thumbnailRefs.current[safeIndex];
    if (container && el) {
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const targetScrollLeft =
        container.scrollLeft +
        (elRect.left - containerRect.left) -
        container.clientWidth / 2 +
        elRect.width / 2;

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, [safeIndex]);

  // Keyboard navigation on window when lightbox is open, or on showcase
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'Escape') {
          setIsLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, handlePrev, handleNext]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isLightboxOpen]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        handleNext();
      } else if (distance < -50) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentTheme = currentCert
    ? CATEGORY_COLORS[currentCert.category] || CATEGORY_COLORS['Internships']
    : CATEGORY_COLORS['Internships'];

  return (
    <section
      id="certifications"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 sm:py-32 border-t border-[#1F222A] relative bg-[#090909] overflow-hidden"
      aria-label="Certifications and Accreditations Showcase"
    >
      {/* Subtle section ambient glow (Champagne & Emerald) */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[450px] rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #E5B45B 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[400px] rounded-full pointer-events-none blur-[150px] opacity-20"
        style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }}
      />

      {/* Technical Precision Coordinate Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1F222A_1px,transparent_1px),linear-gradient(to_bottom,#1F222A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
      />

      {/* Dedicated Left Side Archive Dossier Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-4 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-[#E5B45B] font-semibold">// 06_ARCH</span>
        <div className="w-px h-36 bg-gradient-to-b from-[#E5B45B]/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
          <div className="absolute top-16 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-28 -left-1.5 w-3 h-px bg-[#059669]/60" />
        </div>
        <span className="text-[8px] text-neutral-600">10_CERTS</span>
      </div>

      {/* Dedicated Right Side Audit Seal Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-end gap-2 absolute right-6 top-36 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded border border-[#1F222A] bg-[#0E1116] text-emerald-400 text-[8px] tracking-wider uppercase">
          SEAL // AUDIT_VALIDATED
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#1F222A]" />
        <span className="text-[8px] text-neutral-600">DOSSIER_STORE</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 ${getRevealClass(0, 'up')}`}>
          <div>
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] mb-3 font-mono text-xs text-neutral-400 uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>// 06 · Certifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F0] font-sans">
              Verified Accreditations &amp; Credentials
            </h2>
            <p className="text-sm sm:text-base text-[#8A8F98] max-w-[620px] mt-3 font-editorial">
              Individual showcase of formal engineering internships, examinations, and technology accreditations.
            </p>
          </div>

          {/* Telemetry Pill */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0D0F13] border border-[#1F222A] font-mono text-xs text-neutral-300 self-start md:self-auto shrink-0 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-medium">10 Genuine Credentials</span>
            <span className="text-neutral-600">|</span>
            <span className="text-[#E5C97E]">Audit Verified</span>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className={`flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#1F222A]/60 ${getRevealClass(100, 'fade')}`}>
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Category:</span>
          </div>
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? CERTIFICATIONS.length
                : CERTIFICATIONS.filter((c) => c.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleSelectCategory(cat)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-amber-400/15 border-amber-400/50 text-[#F4F5F0] shadow-[0_0_12px_rgba(212,175,55,0.15)] font-medium'
                    : 'bg-[#0D0F13] border-[#1F222A] text-neutral-400 hover:text-neutral-200 hover:border-[#2A2E38]'
                }`}
                aria-pressed={isActive}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Container with Decoupled Scroll Reveal */}
        <div ref={contentRef as React.RefObject<HTMLDivElement>}>
          {/* Main Boutique Showcase Container */}
          {currentCert ? (
            <div
              className={`cert-showcase-assembly-wrapper ${
                isContentVisible ? 'cert-showcase-assembly-visible' : 'cert-showcase-assembly-hidden'
              }`}
            >
              <div
                ref={showcaseCardRef}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') handlePrev();
                  if (e.key === 'ArrowRight') handleNext();
                }}
                className="rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-2xl transition-all focus:outline-none focus:ring-1 focus:ring-amber-400/40 group hover:border-[#E5B45B]/40"
                aria-roledescription="carousel"
                aria-label={`Certificate ${safeIndex + 1} of ${totalCount}: ${currentCert.title}`}
              >
                {/* Permanent Rotating Champagne Border Streak */}
                <div
                  aria-hidden="true"
                  className="champagne-border-streak"
                  style={{ animationDuration: '10s' }}
                />

                {/* 3D Reflection and Cursor Spotlight */}
                <CardReflectionGlow
                  glowColor="champagne"
                  isRevealed={isContentVisible}
                />

                {/* Ambient Boutique Glow */}
                <div
                  className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none blur-[100px] transition-all duration-700 opacity-60"
                  style={{ backgroundColor: currentTheme.glow }}
                />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none blur-[100px] bg-amber-500/[0.04]" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left / Top: Hero Certificate Stage */}
                  <div
                    className="lg:col-span-7 flex flex-col items-center justify-center"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* Pedestal Mat Frame */}
                    <div
                      className="w-full relative group/frame cursor-pointer rounded-2xl bg-gradient-to-b from-[#13161D] to-[#0A0C10] p-4 sm:p-6 border border-[#262B36] hover:border-amber-400/50 transition-all duration-300 shadow-xl"
                      onClick={() => setIsLightboxOpen(true)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setIsLightboxOpen(true);
                        }
                      }}
                      aria-label={`Enlarge full view of ${currentCert.title} certificate`}
                    >
                      {/* Subtle Corner Styling Like a Framed Art Boutique Item */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/40 pointer-events-none rounded-tl-sm" />
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/40 pointer-events-none rounded-tr-sm" />
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/40 pointer-events-none rounded-bl-sm" />
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/40 pointer-events-none rounded-br-sm" />

                      {/* Certificate Image Display */}
                      <div className="relative w-full min-h-[260px] sm:min-h-[380px] lg:min-h-[420px] max-h-[460px] flex items-center justify-center overflow-hidden rounded-lg bg-[#07080A]">
                        {!imageErrorMap[currentCert.id] ? (
                          <img
                            key={currentCert.id}
                            src={currentCert.image}
                            alt={currentCert.imageAlt}
                            className="max-h-[440px] w-auto max-w-full object-contain rounded-md shadow-lg transition-transform duration-300 group-hover/frame:scale-[1.015]"
                            onError={() =>
                              setImageErrorMap((prev) => ({ ...prev, [currentCert.id]: true }))
                            }
                          />
                        ) : (
                          /* Graceful Fallback if image fails */
                          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
                            <Award className="w-12 h-12 text-amber-400/60" />
                            <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider">
                              Official Certificate Document
                            </p>
                            <p className="text-base font-medium text-white max-w-sm">
                              {currentCert.title}
                            </p>
                            <p className="text-xs text-neutral-500 font-mono">
                              Issued by {currentCert.issuer}
                            </p>
                          </div>
                        )}

                        {/* Hover Inspection Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/frame:opacity-100 group-focus/frame:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                          <div className="px-4 py-2 rounded-xl bg-[#0D0F13]/90 backdrop-blur-md border border-amber-400/50 text-[#F4F5F0] text-xs font-mono flex items-center gap-2 shadow-xl transform translate-y-2 group-hover/frame:translate-y-0 transition-transform">
                            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Click to Enlarge Full Certificate</span>
                          </div>
                        </div>
                      </div>

                      {/* Caption Underneath the Preview */}
                      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
                        <span className="flex items-center gap-1.5 text-neutral-400">
                          <Eye className="w-3 h-3 text-amber-400" />
                          <span>Original Document View</span>
                        </span>
                        <span className="uppercase tracking-wider">
                          {currentCert.aspectRatio === 'portrait' ? 'Vertical Format' : 'Horizontal Format'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right / Bottom: Curated Certificate Dossier */}
                  <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Dossier Index & Category Pill */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="text-[11px] font-mono text-amber-400/90 tracking-widest uppercase">
                          // Dossier {String(safeIndex + 1).padStart(2, '0')} of {String(totalCount).padStart(2, '0')}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${currentTheme.badge}`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{currentCert.category}</span>
                        </span>
                      </div>

                      {/* Certificate Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#F4F5F0] font-sans tracking-tight leading-snug mb-3">
                        {currentCert.title}
                      </h3>

                      {/* Issuing Authority */}
                      <div className="flex items-center gap-2 text-sm font-mono text-neutral-300 mb-5">
                        <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-semibold text-[#E5C97E]">{currentCert.issuer}</span>
                      </div>

                      {/* Metadata Bar */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        <div className="p-3 rounded-xl bg-[#14171F] border border-[#1F222A] flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-neutral-400 shrink-0" />
                          <div>
                            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Date / Period</div>
                            <div className="text-xs font-mono text-[#F4F5F0] font-medium">{currentCert.issueDate}</div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-[#14171F] border border-[#1F222A] flex items-center gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <div>
                            <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Verification</div>
                            <div className="text-xs font-mono text-emerald-400 font-medium">Document Verified</div>
                          </div>
                        </div>
                      </div>

                      {/* Highlight Callout Box */}
                      {currentCert.highlight && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-[#161A22] to-[#12141B] border-l-2 border-l-amber-400 border-y border-r border-[#262B36] mb-6">
                          <div className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-[11px] font-mono text-amber-300/80 uppercase tracking-wider">
                                Accreditation Highlight
                              </p>
                              <p className="text-xs sm:text-sm text-neutral-200 font-medium mt-0.5">
                                {currentCert.highlight}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Competencies / Skills Tags */}
                      {currentCert.skills && currentCert.skills.length > 0 && (
                        <div className="mb-6">
                          <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-2.5">
                            Verified Competencies &amp; Topics
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {currentCert.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-md bg-[#14171F] border border-[#262B36] text-[11px] font-mono text-neutral-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Dossier Bottom Actions: Lightbox Button & Navigation */}
                    <div className="pt-4 border-t border-[#1F222A] flex flex-wrap items-center justify-between gap-4">
                      {/* Enlarge Button */}
                      <button
                        type="button"
                        onClick={() => setIsLightboxOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#14171F] border border-[#262B36] hover:border-amber-400/50 hover:bg-amber-400/10 text-neutral-200 hover:text-white text-xs font-mono transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>View High-Resolution Certificate</span>
                      </button>

                      {/* Prev / Next Boutique Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="p-2.5 rounded-xl bg-[#14171F] border border-[#262B36] hover:border-amber-400/50 hover:bg-amber-400/10 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                          aria-label="Previous certificate"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="font-mono text-xs text-neutral-400 px-2 select-none">
                          {String(safeIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
                        </span>
                        <button
                          type="button"
                          onClick={handleNext}
                          className="p-2.5 rounded-xl bg-[#14171F] border border-[#262B36] hover:border-amber-400/50 hover:bg-amber-400/10 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                          aria-label="Next certificate"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          ) : (
            /* Truthful, Prestigious Archival Empty State */
            <div
              className={`cert-showcase-assembly-wrapper ${
                isContentVisible ? 'cert-showcase-assembly-visible' : 'cert-showcase-assembly-hidden'
              }`}
            >
              <div className="rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-10 sm:p-14 text-center relative overflow-hidden shadow-2xl">
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5B45B]/60 to-transparent"
                />
                <div className="w-16 h-16 rounded-2xl bg-[#14171F] border border-[#262B36] text-[#E5B45B] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <FolderLock className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F4F5F0] font-sans tracking-tight mb-2">
                  No Credentials Currently Filed in Category
                </h3>
                <p className="text-sm text-[#8A8F98] font-editorial max-w-lg mx-auto mb-6 leading-relaxed">
                  Credentials in this category are either pending institutional accreditation or under audit validation.
                  All archived items must undergo formal academic verification before indexing in the credentials vault.
                </p>
                <button
                  type="button"
                  onClick={() => handleSelectCategory('All')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14171F] border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 hover:text-white text-xs font-mono font-medium transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return to All Credentials ({CERTIFICATIONS.length} Total)</span>
                </button>
              </div>
            </div>
          )}

          {/* Compact Horizontal Thumbnail Strip / Certificate Index */}
          {totalCount > 0 && (
            <div
              className={`mt-8 cert-thumbnails-assembly-wrapper ${
                isContentVisible ? 'cert-thumbnails-assembly-visible' : 'cert-thumbnails-assembly-hidden'
              }`}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Certificate Gallery Index ({totalCount} Items)
                </span>
                <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                  Select any piece to inspect or use ← → keys
                </span>
              </div>

              <div
                ref={thumbnailContainerRef}
                className="flex items-center gap-3 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent focus:outline-none"
                tabIndex={0}
                role="tablist"
                aria-label="Certificate thumbnails strip"
              >
                {filteredCerts.map((cert, idx) => {
                  const isSelected = idx === safeIndex;

                  return (
                    <button
                      key={cert.id}
                      ref={(el) => {
                        thumbnailRefs.current[idx] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`View certificate ${idx + 1}: ${cert.title}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`group relative shrink-0 w-36 sm:w-44 text-left p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#151922] border-2 border-amber-400 shadow-[0_0_16px_rgba(212,175,55,0.2)]'
                          : 'bg-[#0D0F13] border border-[#1F222A] hover:border-[#2E3340] opacity-65 hover:opacity-100'
                      }`}
                    >
                      {/* Thumbnail Image Box */}
                      <div className="w-full h-20 sm:h-24 bg-[#07080A] rounded-lg overflow-hidden flex items-center justify-center border border-[#1F222A]/60 mb-2">
                        <img
                          src={cert.image}
                          alt=""
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                      </div>

                      {/* Thumbnail Meta */}
                      <div className="px-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mb-0.5">
                          <span>#{String(idx + 1).padStart(2, '0')}</span>
                          <span className="truncate max-w-[80px] text-right">{cert.category}</span>
                        </div>
                        <p className="text-[11px] font-medium text-neutral-200 truncate leading-tight group-hover:text-white">
                          {cert.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Accessible Full-Screen Lightbox Modal */}
      {isLightboxOpen && currentCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full size view of ${currentCert.title} certificate`}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/92 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar: Title & Close Button */}
          <div
            className="w-full max-w-6xl flex items-center justify-between gap-4 py-2 border-b border-neutral-800/80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs">
                {String(safeIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white truncate max-w-md sm:max-w-xl">
                  {currentCert.title}
                </h4>
                <p className="text-xs font-mono text-neutral-400">
                  {currentCert.issuer} · {currentCert.issueDate}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-amber-400 text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Close certificate lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image with Prev / Next floating arrows */}
          <div
            className="relative flex-1 w-full max-w-6xl flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 hover:border-amber-400 text-neutral-200 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xl"
              aria-label="Previous certificate in lightbox"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* High-Resolution Certificate Image */}
            <div className="max-h-[78vh] max-w-full flex items-center justify-center">
              <img
                src={currentCert.image}
                alt={currentCert.imageAlt}
                className="max-h-[76vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-neutral-800"
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-neutral-900/80 backdrop-blur-sm border border-neutral-700 hover:border-amber-400 text-neutral-200 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-xl"
              aria-label="Next certificate in lightbox"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Bar: Instructions / Keyboard Hint */}
          <div
            className="w-full max-w-6xl pt-2 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden sm:inline">
              Use <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">←</kbd> and{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">→</kbd> keys to cycle,{' '}
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300 text-[10px]">Esc</kbd> to close
            </span>
            <span className="sm:hidden text-center w-full">Swipe or tap arrows to navigate</span>
            <span className="text-emerald-400 font-medium hidden sm:inline">
              ✓ Verified Authentic Credential
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
