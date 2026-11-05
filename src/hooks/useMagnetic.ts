import { useRef, useEffect, useCallback } from 'react';

interface UseMagneticOptions {
  strength?: number; // Factor to scale movement (0.1 - 0.5, default 0.28)
  maxOffset?: number; // Max translation in pixels (default 12)
}

/**
 * Magnetic button hook for interactive CTAs.
 * Gently pulls the element toward the cursor on hover and snaps back on leave.
 * Automatically disabled on touch screens and when Motion is OFF.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(
  options: UseMagneticOptions = {}
) {
  const ref = useRef<T | null>(null);
  const { strength = 0.25, maxOffset = 10 } = options;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      // Check motion preference and touch device
      const isMotionOff =
        document.documentElement.getAttribute('data-reduced-motion') === 'true' ||
        window.matchMedia('(pointer: coarse)').matches;

      if (isMotionOff) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      // Clamp translation to maxOffset
      const clampedX = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
      const clampedY = Math.max(-maxOffset, Math.min(maxOffset, deltaY));

      el.style.transform = `translate3d(${clampedX}px, ${clampedY}px, 0)`;
      el.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)';
    },
    [strength, maxOffset]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transform = 'translate3d(0px, 0px, 0px)';
    el.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.style.transform = '';
      el.style.transition = '';
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
