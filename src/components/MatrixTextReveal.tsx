import React, { useState, useEffect, useRef, useCallback } from 'react';

interface MatrixTextRevealProps {
  text: string;
  className?: string;
  scrambleDuration?: number; // Total duration in ms (default 900)
  scrambleOnHover?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'p' | 'div';
}

const GLYPHS = '01#@$%&*<>[]+=~XKVZ_!/;:';

export const MatrixTextReveal: React.FC<MatrixTextRevealProps> = ({
  text,
  className = '',
  scrambleDuration = 800,
  scrambleOnHover = true,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const frameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef<boolean>(false);

  const checkMotionOff = useCallback(() => {
    return (
      document.documentElement.getAttribute('data-reduced-motion') === 'true' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  const runScramble = useCallback(() => {
    if (checkMotionOff()) {
      setDisplayText(text);
      return;
    }

    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const startTime = performance.now();
    const length = text.length;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / scrambleDuration);

      // Number of characters resolved
      const resolvedCount = Math.floor(progress * length);

      let scrambled = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
          scrambled += text[i];
        } else if (i < resolvedCount) {
          scrambled += text[i];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [text, scrambleDuration, checkMotionOff]);

  useEffect(() => {
    // Run scramble on initial mount
    const timer = setTimeout(() => {
      runScramble();
    }, 120);

    return () => {
      clearTimeout(timer);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [runScramble]);

  const handleMouseEnter = () => {
    if (scrambleOnHover && !isAnimatingRef.current) {
      runScramble();
    }
  };

  return (
    <Component
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{ willChange: 'contents' }}
    >
      {/* Screen-reader accessible true text */}
      <span className="sr-only">{text}</span>
      {/* Visual scrambled text */}
      <span aria-hidden="true">{displayText}</span>
    </Component>
  );
};
