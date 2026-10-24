import React, { useState, useEffect } from 'react';
import { Award, Eye, Maximize2, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * CertificateCard
 * Refined presentation card for verified technical certificates and internships.
 * Features 3D perspective hover tilt, aspect-ratio preserved image thumbnail,
 * gold edge lighting, and click-to-open lightbox interaction.
 */
export default function CertificateCard({ cert, index, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
      aria-labelledby={`cert-title-${cert.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(cert)}
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
      className="group relative flex flex-col rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[var(--color-champagne)]/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(229,180,91,0.09)] select-none focus-within:ring-2 focus-within:ring-[var(--color-champagne)] card-cinematic-bevel"
    >
      {/* Specular Radial Cursor Glare */}
      {!prefersReducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(229, 180, 91, 0.08), transparent 50%)`,
          }}
        />
      )}

      {/* Top subtle champagne edge highlight on hover */}
      <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-champagne)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {/* Certificate Image Canvas Container */}
      <div className="relative h-48 sm:h-52 w-full bg-[#0d100e] border-b border-[var(--color-charcoal-border)] flex items-center justify-center p-3.5 overflow-hidden">
        {/* Subtle grid pattern in canvas backdrop */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#E5B45B_0.5px,transparent_0.5px)] [background-size:12px_12px]" />

        {!imageError ? (
          <img
            src={cert.image}
            alt={`Certificate preview for ${cert.title}`}
            onError={() => setImageError(true)}
            className="max-h-full max-w-full object-contain rounded shadow-md transition-transform duration-300 motion-safe:group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-[var(--color-ivory-subtle)] font-mono text-xs">
            <Award className="w-8 h-8 text-[var(--color-champagne)]" />
            <span>Document on File</span>
          </div>
        )}

        {/* Floating Zoom / Inspect Pill */}
        <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--color-charcoal)]/90 border border-[var(--color-charcoal-border)] text-[10px] font-mono text-[var(--color-champagne)] opacity-80 group-hover:opacity-100 group-hover:border-[var(--color-champagne)]/50 transition-all shadow-md">
          <Eye className="w-3 h-3" />
          <span>Inspect</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Header Metadata */}
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[var(--color-champagne)] font-semibold uppercase tracking-wider">
              {cert.issuer}
            </span>
            <span className="text-[var(--color-ivory-subtle)]">
              {cert.issueDate}
            </span>
          </div>

          {/* Certificate Title */}
          <h3
            id={`cert-title-${cert.id}`}
            className="text-base font-bold text-[var(--color-ivory)] group-hover:text-[var(--color-champagne-light)] transition-colors leading-snug"
          >
            {cert.title}
          </h3>

          {/* Key Metric / Highlight */}
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-emerald)] bg-[var(--color-charcoal)] px-2.5 py-1 rounded border border-[var(--color-emerald)]/20">
            <CheckCircle2 className="w-3 h-3 text-[var(--color-emerald)] shrink-0" />
            <span>{cert.highlight}</span>
          </div>

          {/* Verified Skills Tags */}
          {Array.isArray(cert.skills) && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-[10px] font-mono text-[var(--color-ivory-muted)] group-hover:border-[var(--color-champagne)]/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-[var(--color-charcoal-border)] flex items-center justify-between text-xs font-mono">
          <span className="text-[10px] text-[var(--color-ivory-subtle)] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
            <span>Documented Credential</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(cert);
            }}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-champagne)] hover:text-[var(--color-champagne-light)] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-0.5"
            aria-label={`View full certificate for ${cert.title} by ${cert.issuer}`}
          >
            <span>View Full Size</span>
            <Maximize2 className="w-3 h-3 opacity-70" />
          </button>
        </div>
      </div>
    </article>
  );
}
