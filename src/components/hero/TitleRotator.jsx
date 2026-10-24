import React, { useState, useEffect } from 'react';
import { PROFILE_DATA } from '../../data/profile';

const TITLES = PROFILE_DATA.heroTitles || [
  'AI + Full-Stack Developer',
  'Frontend & React Developer',
  'MERN Stack Developer',
  'Backend Developer',
  'Full-Stack Web Developer',
];

const LONGEST_TITLE = TITLES.reduce(
  (longest, current) => (current.length > longest.length ? current : longest),
  TITLES[0]
);

/**
 * TitleRotator
 * Accessible, smooth single-title rotator designed to eliminate text clipping
 * and Cumulative Layout Shift across all responsive viewports.
 */
export default function TitleRotator() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TITLES.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Screen-reader static accessible definition (prevents repetitive live speech spam) */}
      <span className="sr-only">
        Specialized Developer Titles: {TITLES.join(', ')}.
      </span>

      {/* Visual kinetic title rotator (hidden from screen reader speech queue) */}
      <div aria-hidden="true" className="relative w-full">
        {/* Ghost measuring block to prevent CLS and guarantee sufficient height for longest title */}
        <div className="invisible pointer-events-none select-none py-1 text-lg sm:text-2xl lg:text-3xl font-mono font-medium leading-tight">
          {LONGEST_TITLE}
        </div>

        {/* Render current active title with smooth compositor animation */}
        <div className="absolute inset-0 flex items-center">
          <span
            key={index}
            className={`block w-full font-mono text-lg sm:text-2xl lg:text-3xl font-medium tracking-tight text-[var(--color-champagne)] ${
              prefersReducedMotion
                ? 'opacity-100'
                : 'animate-[fadeInUp_0.45s_cubic-bezier(0.16,1,0.3,1)_forwards]'
            }`}
          >
            {TITLES[index]}
          </span>
        </div>
      </div>
    </div>
  );
}
