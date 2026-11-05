import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, Mail } from 'lucide-react';
import { PERSONAL_INFO, NAV_SECTIONS } from '../types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#090909]/90 backdrop-blur-md border-b border-[#1F222A]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="#home"
          className="group flex items-center gap-1.5 text-base sm:text-lg font-semibold tracking-tight text-[#F4F5F0] transition-colors shrink-0"
          aria-label="Divyanshu Gangwar home"
        >
          <span>Divyanshu</span>
          <span className="text-neutral-500 font-mono text-base transition-colors group-hover:text-neutral-300">
            .
          </span>
        </a>

        {/* Center Nav Pill (Desktop - exactly 8 sections) */}
        <nav
          className="hidden lg:flex items-center gap-0.5 px-3 py-1.5 rounded-full bg-[#0D0F13]/90 border border-[#1F222A] backdrop-blur-sm"
          aria-label="Main Navigation"
        >
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-2.5 py-1 text-[12px] font-medium tracking-wide text-[#8A8F98] hover:text-[#F4F5F0] transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide text-[#F4F5F0] bg-[#111317] hover:bg-[#1A1D23] border border-[#1F222A] hover:border-[#2A2E38] rounded-full transition-all duration-200"
          >
            <Mail className="w-3.5 h-3.5 text-neutral-400" />
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500" />
          </a>
        </div>

        {/* Mobile / Tablet Menu Toggle */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8A8F98] hover:text-[#F4F5F0] transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#1F222A] bg-[#090909]/98 backdrop-blur-xl px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#8A8F98] hover:text-[#F4F5F0] py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-[#1F222A] sm:hidden">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-[#090909] bg-[#F4F5F0] hover:bg-neutral-200 rounded-full transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Get in Touch</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
