import React from 'react';
import { Crosshair, Camera } from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';

/**
 * PhotoFrame
 * Deliberate, precision-engineered portrait mounting frame reserving space
 * for Divyanshu Gangwar's real photograph without resorting to fake portraits or generic avatars.
 * Seamlessly transitions to displaying the real photo when `imageSrc` or `PROFILE_DATA.photo` is configured.
 */
export default function PhotoFrame({ imageSrc = PROFILE_DATA.photo, alt = 'Divyanshu Gangwar' }) {
  const [imageError, setImageError] = React.useState(false);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const hasValidPhoto = Boolean(imageSrc && !imageError);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6; // -3 to +3 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    setTilt({ x, y });
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
      style={
        !reducedMotion && isHovered
          ? {
              transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-2px)`,
              transition: 'transform 0.08s ease-out, border-color 0.2s ease, box-shadow 0.2s ease',
            }
          : {
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
            }
      }
      className="relative group w-full max-w-[340px] sm:max-w-[380px] mx-auto aspect-[4/5] rounded-xl p-3 bg-gradient-to-b from-[var(--color-charcoal-surface)] to-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] shadow-2xl transition-all duration-500 hover:border-[var(--color-champagne)]/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(229,180,91,0.12)] select-none"
    >
      {/* Precision Corner Reticle Brackets */}
      <div className="absolute top-2 left-2 font-mono text-[9px] text-[var(--color-champagne)] opacity-80 group-hover:opacity-100 transition-opacity">
        +
      </div>
      <div className="absolute top-2 right-2 font-mono text-[9px] text-[var(--color-champagne)] opacity-80 group-hover:opacity-100 transition-opacity">
        +
      </div>
      <div className="absolute bottom-2 left-2 font-mono text-[9px] text-[var(--color-champagne)] opacity-80 group-hover:opacity-100 transition-opacity">
        +
      </div>
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-[var(--color-champagne)] opacity-80 group-hover:opacity-100 transition-opacity">
        +
      </div>

      {/* Frame Header Bar */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-[var(--color-charcoal-border)] text-[10px] font-mono text-[var(--color-ivory-subtle)]">
        <div className="flex items-center gap-1.5">
          <Crosshair className="w-3 h-3 text-[var(--color-champagne)]" />
          <span className="tracking-wider">PORTRAIT.FRAME</span>
        </div>
        <div className="flex items-center gap-1 text-[var(--color-emerald)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] motion-safe:animate-pulse" />
          <span>{hasValidPhoto ? 'PORTRAIT' : 'RESERVED'}</span>
        </div>
      </div>

      {/* Deliberate Image Mounting Canvas / Genuine Photograph */}
      {hasValidPhoto ? (
        <div className="relative w-full h-[calc(100%-36px)] mt-2 rounded-lg overflow-hidden border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)]">
          <img
            src={imageSrc}
            alt={alt}
            className="w-full h-full object-cover"
            loading="eager"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="relative w-full h-[calc(100%-36px)] mt-2 rounded-lg bg-[var(--color-charcoal)]/90 border border-dashed border-[var(--color-charcoal-border)] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Subtle CAD Cross-Hatch Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at center, rgba(229,180,91,0.2) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Central Aperture Badge */}
          <div className="relative z-10 w-16 h-16 rounded-full border border-[var(--color-champagne)]/30 bg-[var(--color-charcoal-surface)] flex items-center justify-center text-[var(--color-champagne)] mb-4 shadow-[0_0_20px_rgba(229,180,91,0.1)] group-hover:scale-105 transition-transform duration-300">
            <Camera className="w-7 h-7" />
          </div>

          {/* Architecture Placeholder Details */}
          <div className="relative z-10 space-y-2">
            <div className="font-mono text-xs font-semibold tracking-wider text-[var(--color-ivory)] uppercase">
              Divyanshu Gangwar
            </div>
            <p className="text-[11px] font-mono text-[var(--color-ivory-muted)] max-w-[220px] leading-relaxed">
              Reserved space for high-resolution portrait photograph.
            </p>
          </div>

          {/* Technical Calibration Stamp */}
          <div className="relative z-10 mt-6 pt-4 border-t border-[var(--color-charcoal-border)] w-full flex items-center justify-between text-[9px] font-mono text-[var(--color-ivory-subtle)]">
            <span>SPEC: 800×1000PX</span>
            <span className="text-[var(--color-champagne)] font-medium">4:5 RATIO</span>
          </div>
        </div>
      )}
    </div>
  );
}
