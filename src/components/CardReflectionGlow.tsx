import React from 'react';

interface CardReflectionGlowProps {
  glowColor?: 'champagne' | 'emerald';
  isRevealed?: boolean;
  className?: string;
  disableSweep?: boolean;
}

/**
 * Reusable dynamic surface reflection and glowing spotlight.
 * 1. Spotlight follows pointer dynamically via CSS variables (--mouse-x, --mouse-y) with 0 React re-renders.
 * 2. Glass-like diagonal light streak sweeps across the card on viewport entrance.
 * 3. Automatically disabled under reduced motion.
 */
export const CardReflectionGlow: React.FC<CardReflectionGlowProps> = ({
  glowColor = 'champagne',
  isRevealed = true,
  className = '',
  disableSweep = false,
}) => {
  const spotlightColor =
    glowColor === 'emerald'
      ? 'rgba(5, 150, 105, 0.12)'
      : 'rgba(229, 180, 91, 0.11)';

  return (
    <>
      {/* Dynamic Cursor Spotlight (Follows pointer via CSS variables) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-[1] select-none ${className}`}
        style={{
          background: `radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${spotlightColor}, transparent 75%)`,
        }}
      />

      {/* Glass-like diagonal light streak sweep on viewport entrance */}
      {!disableSweep && isRevealed && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] z-[2] select-none motion-reduce:hidden"
        >
          <div className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-card-light-sweep" />
        </div>
      )}
    </>
  );
};
