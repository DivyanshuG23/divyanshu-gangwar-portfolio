import { useRef, useCallback, useEffect } from 'react';

interface UseTiltReflectionOptions {
  maxTilt?: number; // max tilt degrees (default: 4.5)
  glowColor?: 'champagne' | 'emerald';
  disabled?: boolean;
}

/**
 * Reusable high-performance 3D tilt & reflection hook.
 * Uses CSS variables (--mouse-x, --mouse-y, --tilt-x, --tilt-y) directly on the DOM element,
 * eliminating React state re-renders on mousemove for butter-smooth 60fps GPU animation.
 * Smoothly resets on pointer leave, and automatically disables on touch / Motion OFF.
 */
export function useTiltReflection<T extends HTMLElement = HTMLDivElement>(
  options: UseTiltReflectionOptions = {}
) {
  const ref = useRef<T | null>(null);
  const { maxTilt = 4.0, glowColor = 'champagne', disabled = false } = options;

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (disabled || e.pointerType === 'touch') return;

      const attr = document.documentElement.getAttribute('data-reduced-motion');
      const isMotionOff =
        attr !== null
          ? attr === 'true'
          : window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isMotionOff) return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normX = x / rect.width - 0.5;
      const normY = y / rect.height - 0.5;

      const rotateX = -normY * maxTilt;
      const rotateY = normX * maxTilt;

      el.style.setProperty('--mouse-x', `${Math.round(x)}px`);
      el.style.setProperty('--mouse-y', `${Math.round(y)}px`);
      el.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`);
      el.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`);
      el.style.setProperty('--glow-opacity', '1');
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      el.style.transition = 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)';
    },
    [maxTilt, disabled]
  );

  const handlePointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    el.style.setProperty('--glow-opacity', '0');
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.style.transform = '';
      el.style.transition = '';
    };
  }, [handlePointerMove, handlePointerLeave]);

  return {
    ref,
    glowColor,
  };
}
