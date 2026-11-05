import React from 'react';
import { PERSONAL_INFO } from '../types';
import { ArrowUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { ref, getRevealClass } = useScrollReveal({ threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      className={`w-full border-t border-[#1F222A] bg-[#08090B] py-10 relative z-10 ${getRevealClass(0, 'fade')}`}
    >
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-neutral-500">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <span>&copy; {currentYear} {PERSONAL_INFO.name}.</span>
          <span className="hidden sm:inline-block text-neutral-700">·</span>
          <span className="hidden sm:inline-block">Designed &amp; Engineered</span>
        </div>

        {/* Center / Right */}
        <div className="flex items-center gap-6">
          <span>{PERSONAL_INFO.university} ('27)</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
