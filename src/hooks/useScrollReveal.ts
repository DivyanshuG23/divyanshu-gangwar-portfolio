import { useState, useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delayMs?: number;
  repeat?: boolean;
}

/**
 * Reusable scroll-reveal hook for section and element entrances.
 * Fully compatible with site-level Motion ON/OFF preference and OS reduced-motion.
 */
export function useScrollReveal(options?: ScrollRevealOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Initialize from document attribute or fallback
  const [isMotionDisabled, setIsMotionDisabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const attr = document.documentElement.getAttribute('data-reduced-motion');
    if (attr !== null) return attr === 'true';
    try {
      const saved = localStorage.getItem('portfolio-motion-preference');
      if (saved === 'false') return true;
      if (saved === 'true') return false;
    } catch {
      // ignore
    }
    return false;
  });

  // Track site-level Motion ON/OFF toggle in real time via MutationObserver
  useEffect(() => {
    const updateMotion = () => {
      const attr = document.documentElement.getAttribute('data-reduced-motion');
      if (attr !== null) {
        setIsMotionDisabled(attr === 'true');
      } else {
        try {
          const saved = localStorage.getItem('portfolio-motion-preference');
          if (saved !== null) {
            setIsMotionDisabled(saved === 'false');
          }
        } catch {
          // ignore
        }
      }
    };

    updateMotion();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-reduced-motion') {
          updateMotion();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduced-motion'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const threshold = options?.threshold ?? 0.1;
  const rootMargin = options?.rootMargin ?? '0px 0px -40px 0px';
  const repeat = options?.repeat ?? false;

  // Viewport IntersectionObserver
  useEffect(() => {
    if (isMotionDisabled) {
      return;
    }

    const current = ref.current;
    if (!current) return;

    // If element is already in or above viewport, reveal immediately
    const rect = current.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setHasEntered(true);
      if (!repeat) {
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasEntered(true);
          if (!repeat) {
            observer.unobserve(current);
          }
        } else if (repeat) {
          setHasEntered(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, [isMotionDisabled, threshold, rootMargin, repeat]);

  const isVisible = isMotionDisabled || hasEntered;

  /**
   * Helper to generate standardized motion classes with custom delay and direction.
   */
  const getRevealClass = (
    delayMs: number = 0,
    direction: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' = 'up'
  ): string => {
    if (isMotionDisabled) {
      return 'opacity-100 translate-none scale-100 transition-none';
    }

    const delayClass =
      delayMs === 75
        ? 'delay-[75ms]'
        : delayMs === 100
        ? 'delay-100'
        : delayMs === 150
        ? 'delay-[150ms]'
        : delayMs === 200
        ? 'delay-200'
        : delayMs === 250
        ? 'delay-[250ms]'
        : delayMs === 300
        ? 'delay-300'
        : delayMs === 400
        ? 'delay-400'
        : delayMs === 500
        ? 'delay-500'
        : '';

    let hiddenTransform = 'translate-y-6';
    if (direction === 'fade') hiddenTransform = '';
    if (direction === 'down') hiddenTransform = '-translate-y-6';
    if (direction === 'left') hiddenTransform = 'translate-x-6';
    if (direction === 'right') hiddenTransform = '-translate-x-6';
    if (direction === 'scale') hiddenTransform = 'translate-y-4 scale-[0.98]';

    return `transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${delayClass} ${
      isVisible ? 'opacity-100 translate-none scale-100' : `opacity-0 ${hiddenTransform}`
    }`;
  };

  return {
    ref,
    isVisible,
    isMotionDisabled,
    hasEntered,
    getRevealClass,
  };
}
