import React, { useState, useEffect } from 'react';
import {
  Download,
  ArrowUpRight,
  X,
  Mail,
  Terminal,
  Layers,
} from 'lucide-react';
import { PERSONAL_INFO } from '../types';
import { useMagnetic } from '../hooks/useMagnetic';
import { MatrixTextReveal } from './MatrixTextReveal';
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

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

type RotatorPhase = 'typing' | 'pausing' | 'deleting' | 'transitioning';

const MOTION_STORAGE_KEY = 'portfolio-motion-preference';

// Initialize motion preference: default to true (enabled) as requested,
// respecting explicit user choice if stored in localStorage previously.
const getInitialMotion = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    const saved = localStorage.getItem(MOTION_STORAGE_KEY);
    if (saved === 'false') return false;
    if (saved === 'true') return true;
  } catch {
    // ignore
  }
  // User explicitly wants animated behavior enabled by default
  return true;
};

export const Hero: React.FC = () => {
  const [showCvModal, setShowCvModal] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [phase, setPhase] = useState<RotatorPhase>('typing');
  const [motionEnabled, setMotionEnabled] = useState<boolean>(getInitialMotion);

  // Magnetic button hooks for primary interactive CTAs
  const exploreBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.28 });
  const contactBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.28 });

  // Synchronize document attribute and persist choice
  useEffect(() => {
    document.documentElement.setAttribute('data-reduced-motion', motionEnabled ? 'false' : 'true');
  }, [motionEnabled]);

  const toggleMotion = () => {
    setMotionEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MOTION_STORAGE_KEY, String(next));
      } catch {
        // ignore
      }
      if (next) {
        setCharIndex(0);
        setPhase('typing');
      }
      return next;
    });
  };

  const roles = PERSONAL_INFO.targetRoles;
  const currentRole = roles[roleIndex] || roles[0];

  // Character-by-character single-role sequential typewriter engine
  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    switch (phase) {
      case 'typing': {
        // Type forward one character at a time (85ms per character)
        if (charIndex < currentRole.length) {
          timer = setTimeout(() => {
            const nextIndex = charIndex + 1;
            setCharIndex(nextIndex);
            if (nextIndex === currentRole.length) {
              setPhase('pausing');
            }
          }, 85);
        }
        break;
      }

      case 'pausing': {
        // Hold the completed role text for ~1000ms
        timer = setTimeout(() => {
          setPhase('deleting');
        }, 1000);
        break;
      }

      case 'deleting': {
        // Delete one character at a time (45ms per character)
        if (charIndex > 0) {
          timer = setTimeout(() => {
            const nextIndex = charIndex - 1;
            setCharIndex(nextIndex);
            if (nextIndex === 0) {
              setPhase('transitioning');
            }
          }, 45);
        }
        break;
      }

      case 'transitioning': {
        // Hold empty state for 150ms, then advance sequentially to next role
        timer = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setCharIndex(0);
          setPhase('typing');
        }, 150);
        break;
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [charIndex, phase, currentRole, roles.length, motionEnabled]);

  const displayedText = !motionEnabled ? currentRole : currentRole.slice(0, charIndex);

  const handleCvClick = (e: React.MouseEvent) => {
    // Verify file accessibility; if unavailable, present the fallback modal
    fetch(PERSONAL_INFO.cvUrl || '/Divyanshu_Gangwar_CV.pdf', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) {
          e.preventDefault();
          setShowCvModal(true);
        }
      })
      .catch(() => {
        e.preventDefault();
        setShowCvModal(true);
      });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92dvh] lg:min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-36 lg:pb-20 flex items-center justify-center overflow-hidden bg-[#090909]"
      aria-label="Home and Identity"
    >
      <style>{`
        @keyframes typewriterCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typewriter-cursor {
          animation: typewriterCursor 0.85s step-end infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .typewriter-cursor {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      {/* Subtle Ambient Studio Lighting (Champagne & Emerald) */}
      <div
        className="absolute top-16 -left-36 w-[450px] h-[450px] rounded-full pointer-events-none blur-[150px] opacity-20"
        style={{ background: 'radial-gradient(circle, #E5B45B 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-12 right-0 w-[500px] h-[500px] rounded-full pointer-events-none blur-[160px] opacity-15"
        style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }}
      />

      {/* Signature 3D Neural Particle Landscape (Primary Hero Composition) */}
      <ParticleLandscapeCanvas
        variant="hero"
        amplitude={34}
        speed={1}
        className="opacity-75"
      />

      {/* Hero Technical HUD Corner Callouts (Hidden on mobile to protect layout) */}
      <div aria-hidden="true" className="hidden lg:flex items-center gap-1.5 absolute top-10 left-8 font-mono text-[10px] text-neutral-600 tracking-wider select-none pointer-events-none">
        <span className="text-[#E5B45B]">+</span>
        <span>SYS.INIT // PORTFOLIO_NEXUS</span>
      </div>
      <div aria-hidden="true" className="hidden lg:flex items-center gap-1.5 absolute top-10 right-8 font-mono text-[10px] text-neutral-600 tracking-wider select-none pointer-events-none">
        <span>COORD // 28.61°N, 77.20°E</span>
        <span className="text-[#059669]">+</span>
      </div>

      {/* Hero Dedicated Side Telemetry Artwork (Left Margin on 2XL) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-3 absolute left-6 top-1/3 -translate-y-1/2 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <span className="text-[#E5B45B] font-semibold">// 00_NEXUS</span>
        <div className="w-px h-40 bg-gradient-to-b from-[#E5B45B]/50 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
          <div className="absolute top-16 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-28 -left-1.5 w-3 h-px bg-[#059669]/60" />
          <div className="absolute top-36 -left-1 w-2 h-px bg-[#1F222A]" />
        </div>
        <span className="rotate-90 origin-center text-[8px] text-neutral-600 mt-2">TERRAIN_ACTIVE</span>
      </div>

      {/* Hero Dedicated Side Telemetry Artwork (Right Margin on 2XL) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-end gap-2 absolute right-6 top-1/3 -translate-y-1/2 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded border border-[#1F222A] bg-[#0E1116] text-[#E5B45B] text-[8px] tracking-wider uppercase">
          NODE // MESH_01
        </div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#059669]/50" />
        <span className="text-[8px] text-neutral-600">60_FPS // STABLE</span>
      </div>

      <div className="max-w-[1280px] w-full mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-0 lg:gap-x-12 items-start">
          
          {/* Block 1: Identity Eyebrow & Main Statement Headline (Row 1 Left on Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Restrained Identity Eyebrow Bar */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D0F13] border border-[#1F222A] text-xs font-mono text-[#8A8F98]">
                <span className="text-[#E5B45B] font-semibold">// {PERSONAL_INFO.name.toUpperCase()}</span>
                <span className="text-neutral-700">·</span>
                <span>B.TECH CSE &apos;27</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0D0C] border border-[#1F222A]">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-indicator absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#059669]" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#059669] font-medium">
                  {PERSONAL_INFO.availabilityStatus}
                </span>
              </div>

              {/* Accessible Motion Preference Toggle (Defaults to ON, Persisted) */}
              <button
                type="button"
                onClick={toggleMotion}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0B0D0C] border border-[#1F222A] hover:border-[#E5B45B]/40 text-xs font-mono text-[#8A8F98] hover:text-[#F5F0E6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B]"
                aria-label={motionEnabled ? "Disable role typing animation" : "Enable role typing animation"}
                aria-pressed={motionEnabled}
                title={motionEnabled ? "Animation active (Click to pause)" : "Animation paused (Click to play)"}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-colors ${motionEnabled ? 'bg-[#059669] animate-pulse' : 'bg-neutral-600'}`} />
                <span className="text-[11px] uppercase tracking-wider">
                  Motion:{' '}
                  <span className={motionEnabled ? "text-[#E5B45B] font-semibold" : "text-neutral-500 font-medium"}>
                    {motionEnabled ? "ON" : "OFF"}
                  </span>
                </span>
              </button>
            </div>

            {/* Main Statement Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight text-[#F5F0E6] font-sans leading-[1.08] sm:leading-[1.04] mb-3 lg:mb-4 max-w-[680px]">
              <MatrixTextReveal text="Building Intelligent" />{' '}
              <span className="relative inline-block text-[#E5B45B] font-serif italic font-normal tracking-normal">
                Digital Experiences
                <span
                  aria-hidden="true"
                  className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-[#E5B45B] via-[#E5B45B]/60 to-transparent"
                />
              </span>
              <span className="text-neutral-500 font-mono">.</span>
            </h1>

          </div>

          {/* Block 2: The Circular Portrait Showcase (Spans Rows 1 & 2 on Desktop, Row 2 on Mobile) */}
          <div className="lg:col-span-5 lg:row-span-2 flex justify-center lg:justify-end self-center my-6 lg:my-0 w-full">
            <div className="relative group w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[360px] aspect-square">
              
              {/* Subtle Ambient Studio Halo (Champagne & Emerald) */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-gradient-to-tr from-[#E5B45B]/15 via-transparent to-[#059669]/20 blur-2xl rounded-full pointer-events-none opacity-60 transition-opacity duration-500 group-hover:opacity-85"
              />

              {/* Cinematic Technical HUD Orbital Rings (Behind Circular Portrait) */}
              <div
                aria-hidden="true"
                className="absolute -inset-8 sm:-inset-10 pointer-events-none select-none opacity-45 group-hover:opacity-75 transition-opacity duration-700"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full animate-tech-spin">
                  <circle cx="100" cy="100" r="94" fill="none" stroke="#E5B45B" strokeWidth="0.75" strokeDasharray="3 6" opacity="0.6" />
                  <circle cx="100" cy="6" r="2.5" fill="#E5B45B" />
                  <circle cx="194" cy="100" r="2.5" fill="#059669" />
                  <circle cx="100" cy="194" r="2.5" fill="#E5B45B" />
                  <circle cx="6" cy="100" r="2.5" fill="#059669" />
                </svg>
              </div>
              <div
                aria-hidden="true"
                className="absolute -inset-5 pointer-events-none select-none opacity-30 group-hover:opacity-60 transition-opacity duration-700"
              >
                <svg viewBox="0 0 200 200" className="w-full h-full animate-tech-spin-reverse">
                  <circle cx="100" cy="100" r="98" fill="none" stroke="#059669" strokeWidth="0.6" strokeDasharray="8 16" opacity="0.5" />
                </svg>
              </div>

              {/* Concentric Circular Backing Ring for Depth */}
              <div
                aria-hidden="true"
                className="absolute -inset-2.5 rounded-full border border-[#E5B45B]/25 bg-[#0B0D0C]/70 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />

              {/* Primary Circular Portrait Container */}
              <div
                data-testid="circular-portrait"
                className="relative z-10 w-full h-full aspect-square rounded-full overflow-hidden bg-[#0D0F14] border-2 border-[#E5B45B]/80 group-hover:border-[#E5B45B] shadow-[0_0_25px_rgba(229,180,91,0.15)] group-hover:shadow-[0_0_40px_rgba(229,180,91,0.3)] transition-all duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transform-none"
              >
                {/* Real Photograph with Carefully Tuned Crop Preserving Face and Shoulders */}
                <img
                  src={PERSONAL_INFO.portraitUrl || '/divyanshu-profile.jpeg'}
                  alt="Portrait of Divyanshu Gangwar"
                  className="w-full h-full object-cover object-[center_18%] filter contrast-[1.02] brightness-[0.98] transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle Bottom Charcoal Vignette Gradient */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B0D0C]/40 via-[#0B0D0C]/20 to-transparent pointer-events-none z-10"
                />
              </div>

            </div>
          </div>

          {/* Block 3: Role Rotator, Narrative Introduction, CTAs & Verified Profiles (Row 2 Left on Desktop, Row 3 on Mobile) */}
          <div className="lg:col-span-7 flex flex-col items-start lg:pt-2">
            
            {/* Precision Role Rotator Console */}
            <div className="h-10 mb-6 flex items-center overflow-hidden max-w-full">
              {/* Accessible stable label declaring ONLY the single active role */}
              <span className="sr-only">
                Current role: {currentRole}
              </span>

              {/* Animated visual typewriter display showing only the single active role */}
              <div
                aria-hidden="true"
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-[#0E1116] border border-[#1E232E] font-mono text-xs sm:text-sm tracking-wide text-neutral-400 uppercase whitespace-nowrap shadow-inner"
              >
                <Terminal className="w-3.5 h-3.5 text-[#E5B45B]" />
                <span className="text-neutral-500 font-semibold">ROLE //</span>
                <span className="text-[#F5F0E6] font-medium min-w-[2px] inline-block">
                  {displayedText}
                </span>
                {motionEnabled && (
                  <span
                    className="inline-block w-[2px] h-3.5 sm:h-4 ml-0.5 bg-[#E5B45B] align-middle typewriter-cursor"
                  />
                )}
              </div>
            </div>

            {/* Concise, Authentic Developer Narrative */}
            <p className="text-base sm:text-lg text-[#8A8F98] leading-relaxed max-w-[580px] font-editorial mb-8">
              {PERSONAL_INFO.heroSummary}
            </p>

            {/* Action CTAs Row */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-6">
              {/* Primary CTA: View Projects */}
              <a
                ref={exploreBtnRef}
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold tracking-wide bg-[#F5F0E6] text-[#090909] hover:bg-[#E5B45B] hover:text-[#090909] transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B]"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Explore Projects</span>
              </a>

              {/* Secondary CTA: Contact */}
              <a
                ref={contactBtnRef}
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-medium tracking-wide bg-[#0B0D0C] text-[#F5F0E6] border border-[#1F222A] hover:border-[#E5B45B]/50 hover:bg-[#14171E] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B]"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#E5B45B]" />
              </a>

              {/* Truthful CV Pre-flight Action */}
              <a
                href={PERSONAL_INFO.cvUrl || '/Divyanshu_Gangwar_CV.pdf'}
                download="Divyanshu_Gangwar_CV.pdf"
                onClick={handleCvClick}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-mono text-[#8A8F98] hover:text-[#F5F0E6] hover:bg-[#12141B] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-500 cursor-pointer"
                aria-label="Download Curriculum Vitae (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-neutral-400" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Verified External Profiles Row */}
            <div className="flex items-center gap-3 pt-5 border-t border-[#1F222A]/60 w-full max-w-[500px]">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                Profiles:
              </span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0D0C] border border-[#1F222A] hover:border-[#E5B45B]/40 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                aria-label="Divyanshu Gangwar's GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0D0C] border border-[#1F222A] hover:border-[#E5B45B]/40 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                aria-label="Divyanshu Gangwar's LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Honest CV Status Modal if cv.pdf is not present */}
      {showCvModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="CV File Notice"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-[#0B0D0C] border border-[#1F222A] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowCvModal(false)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5B45B] uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Curriculum Vitae</span>
            </div>
            <h3 className="text-base font-semibold text-[#F5F0E6] mb-2 font-sans">
              CV File Notice
            </h3>
            <p className="text-xs text-[#8A8F98] leading-relaxed mb-5 font-editorial">
              The CV file (<code className="text-[#F5F0E6] font-mono">Divyanshu_Gangwar_CV.pdf</code>) is not yet located in the project&apos;s <code className="text-[#F5F0E6] font-mono">public/</code> directory. Once placed as <code className="text-[#F5F0E6] font-mono">public/Divyanshu_Gangwar_CV.pdf</code>, this button will immediately download it. In the meantime, you can reach out directly via email to request my CV.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=CV%20Request%20-%20Divyanshu%20Gangwar`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#F5F0E6] text-[#090909] hover:bg-[#E5B45B] transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Request CV via Email</span>
              </a>
              <button
                type="button"
                onClick={() => setShowCvModal(false)}
                className="px-4 py-2 rounded-full text-xs font-medium text-[#8A8F98] hover:text-[#F5F0E6] border border-[#1F222A] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
