import React, { useEffect, useState } from 'react';

/**
 * CinematicBackdrop
 * Multi-layered 3D-inspired atmospheric background featuring perspective grid floor,
 * directional champagne illumination, and subtle pointer-based depth parallax.
 */
export default function CinematicBackdrop() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        // Subtle normalized delta clamped between -3 and +3 degrees
        const x = ((e.clientY / innerHeight) - 0.5) * -6;
        const y = ((e.clientX / innerWidth) - 0.5) * 6;
        setTilt({ x: Math.max(-3, Math.min(3, x)), y: Math.max(-3, Math.min(3, y)) });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Cinematic Ambient Illumination Cones */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(229,180,91,0.14)_0%,rgba(11,13,12,0)_72%)]" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(5,150,105,0.07)_0%,transparent_70%)]" />
      <div className="absolute -bottom-20 -left-32 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(229,180,91,0.05)_0%,transparent_70%)]" />

      {/* Layered Perspective Grid Matrix Plane */}
      <div className="absolute inset-0 flex items-center justify-center perspective-cinematic">
        <div
          className="w-[140vw] h-[105vh] hero-grid-matrix opacity-75 transform-style-3d transition-transform duration-700 ease-out"
          style={{
            transform: reducedMotion
              ? 'rotateX(58deg) translateY(12%)'
              : `rotateX(${58 + tilt.x}deg) rotateY(${tilt.y}deg) translateY(12%) translateZ(0)`,
          }}
        />
      </div>

      {/* Subtle Floating Engineering Coordinates */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out hidden md:block"
        style={{
          transform: reducedMotion
            ? 'none'
            : `translate3d(${tilt.y * -3}px, ${tilt.x * -3}px, 0)`,
        }}
      >
        <div className="absolute top-28 right-[18%] font-mono text-[9px] text-[var(--color-champagne)]/40 tracking-widest flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[var(--color-champagne)]/50" />
          <span>COORD: 28.36°N // 79.43°E</span>
        </div>

        <div className="absolute bottom-24 left-[12%] font-mono text-[9px] text-[var(--color-emerald)]/40 tracking-widest flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-[var(--color-emerald)]/50" />
          <span>PIPELINE: ACTIVE // MERN+AI</span>
        </div>
      </div>

      {/* CS Telemetry & Architectural Markers */}
      <div className="absolute top-8 left-6 hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-widest text-[var(--color-ivory-subtle)] uppercase">
        <span className="w-1.5 h-1.5 bg-[var(--color-champagne)] rounded-full opacity-60" />
        <span>SYS.PLANE // 0x4B3A</span>
        <span className="text-[var(--color-charcoal-border)]">|</span>
        <span>LATENCY: 0ms (LOCAL)</span>
      </div>

      <div className="absolute bottom-8 right-6 hidden lg:flex items-center gap-3 font-mono text-[10px] tracking-widest text-[var(--color-ivory-subtle)] uppercase">
        <span>DEV.SPEC: CSE CORE</span>
        <span className="text-[var(--color-charcoal-border)]">|</span>
        <span>DEPTH: CSS 3D PROJECTION</span>
      </div>

      {/* Vignette Gradients for Text Contrast */}
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[var(--color-charcoal)] via-[var(--color-charcoal)]/85 to-transparent" />
    </div>
  );
}
