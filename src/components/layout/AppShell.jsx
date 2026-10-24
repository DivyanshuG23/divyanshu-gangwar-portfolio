import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import Footer from './Footer';
import { PROFILE_DATA } from '../../data/profile';

/**
 * AppShell
 * Core application layout wrapper providing responsive scaffolding,
 * navigational chrome, full-bleed cinematic canvas support, and accessible controls.
 */
export default function AppShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const toggleBtnRef = useRef(null);
  const mobileNavRef = useRef(null);

  const isHome = location.pathname === '/';

  // Active section scrollspy via IntersectionObserver
  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const sectionIds = ['work', 'about', 'education', 'certifications', 'contact'];
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  // Smooth scroll to hash anchor on route changes
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
        }
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  // Auto-close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manage body scroll lock and keyboard dismissal for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    // Shift focus to the first navigation link inside the drawer
    const firstInteractive = mobileNavRef.current?.querySelector('a, button');
    firstInteractive?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <div id="top" className="min-h-[100dvh] flex flex-col bg-[var(--color-charcoal)] text-[var(--color-ivory)]">
      {/* Skip to Main Content Link for Keyboard Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-[var(--color-champagne)] focus:text-[var(--color-charcoal)] focus:font-mono focus:text-xs focus:font-bold focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-[var(--color-ivory)]"
      >
        Skip to Main Content &darr;
      </a>

      {/* Header Chrome */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)]/85 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Monogram */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] rounded py-1 px-1.5"
            aria-label="Divyanshu Gangwar Portfolio Home"
          >
            <div className="w-8 h-8 rounded border border-[var(--color-champagne)]/30 bg-[var(--color-charcoal-surface)] flex items-center justify-center text-[var(--color-champagne)] group-hover:border-[var(--color-champagne)] transition-colors">
              <Terminal className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm tracking-wider uppercase font-semibold text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
                Divyanshu<span className="text-[var(--color-champagne)]">.dev</span>
              </span>
              <span className="text-[9px] font-mono text-[var(--color-ivory-subtle)] leading-none">
                B.Tech CSE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-2.5 lg:gap-4 xl:gap-6 text-xs font-mono">
            <a
              href={isHome ? '#work' : '/#work'}
              aria-current={isHome && activeSection === 'work' ? 'true' : undefined}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-1 ${
                isHome && activeSection === 'work'
                  ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)] border-b border-[var(--color-champagne)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
              }`}
            >
              // 01. WORK
            </a>
            <a
              href={isHome ? '#about' : '/#about'}
              aria-current={isHome && activeSection === 'about' ? 'true' : undefined}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-1 ${
                isHome && activeSection === 'about'
                  ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)] border-b border-[var(--color-champagne)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
              }`}
            >
              // 02. ABOUT
            </a>
            <a
              href={isHome ? '#education' : '/#education'}
              aria-current={isHome && activeSection === 'education' ? 'true' : undefined}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-1 ${
                isHome && activeSection === 'education'
                  ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)] border-b border-[var(--color-champagne)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
              }`}
            >
              <span className="hidden lg:inline">// 03. EDUCATION</span>
              <span className="lg:hidden">// 03. EDU</span>
            </a>
            <a
              href={isHome ? '#certifications' : '/#certifications'}
              aria-current={isHome && activeSection === 'certifications' ? 'true' : undefined}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-1 ${
                isHome && activeSection === 'certifications'
                  ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)] border-b border-[var(--color-champagne)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
              }`}
            >
              <span className="hidden lg:inline">// 04. CERTS</span>
              <span className="lg:hidden">// 04. CERT</span>
            </a>
            <a
              href={isHome ? '#contact' : '/#contact'}
              aria-current={isHome && activeSection === 'contact' ? 'true' : undefined}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-1 ${
                isHome && activeSection === 'contact'
                  ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)] border-b border-[var(--color-champagne)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
              }`}
            >
              // 05. CONTACT
            </a>
            <Link
              to="/status"
              aria-current={location.pathname === '/status' ? 'page' : undefined}
              className={`transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-emerald)] rounded px-1.5 py-1 ${
                location.pathname === '/status'
                  ? 'text-[var(--color-emerald)] font-medium bg-[var(--color-charcoal-surface)] border-b border-[var(--color-emerald)]'
                  : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-emerald)]'
              }`}
            >
              <span className="hidden lg:inline">// 06. SYSTEM</span>
              <span className="lg:hidden">// 06. SYS</span>
            </Link>

            <span className="h-4 w-px bg-[var(--color-charcoal-border)]" aria-hidden="true" />

            {/* Direct Profiles */}
            <div className="flex items-center gap-2">
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)] hover:bg-[var(--color-charcoal-surface)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                aria-label="GitHub Profile (external)"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded text-[var(--color-ivory-muted)] hover:text-[#0077B5] hover:bg-[var(--color-charcoal-surface)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                aria-label="LinkedIn Profile (external)"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>

            {/* System Status Pill */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--color-emerald)] bg-[var(--color-charcoal-surface)] px-2.5 py-1 rounded border border-[var(--color-emerald)]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-emerald)] bg-[var(--color-charcoal-surface)] px-2 py-1 rounded border border-[var(--color-emerald)]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] animate-pulse" />
              <span>LIVE</span>
            </div>

            <button
              ref={toggleBtnRef}
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] text-[var(--color-ivory)] hover:text-[var(--color-champagne)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-16 bg-black/60 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <nav
              id="mobile-nav"
              ref={mobileNavRef}
              aria-label="Mobile Navigation"
              className="relative z-50 md:hidden border-t border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)] px-6 py-4 space-y-3 font-mono text-xs shadow-2xl"
            >
              <a
                href={isHome ? '#work' : '/#work'}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isHome && activeSection === 'work' ? 'true' : undefined}
                className={`block py-2 border-b border-[var(--color-charcoal-border)]/50 transition-colors ${
                  isHome && activeSection === 'work'
                    ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)]/80 pl-3 border-l-2 border-[var(--color-champagne)]'
                    : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
                }`}
              >
                // 01. WORK (Projects)
              </a>
              <a
                href={isHome ? '#about' : '/#about'}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isHome && activeSection === 'about' ? 'true' : undefined}
                className={`block py-2 border-b border-[var(--color-charcoal-border)]/50 transition-colors ${
                  isHome && activeSection === 'about'
                    ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)]/80 pl-3 border-l-2 border-[var(--color-champagne)]'
                    : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
                }`}
              >
                // 02. ABOUT (Profile &amp; Skills)
              </a>
              <a
                href={isHome ? '#education' : '/#education'}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isHome && activeSection === 'education' ? 'true' : undefined}
                className={`block py-2 border-b border-[var(--color-charcoal-border)]/50 transition-colors ${
                  isHome && activeSection === 'education'
                    ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)]/80 pl-3 border-l-2 border-[var(--color-champagne)]'
                    : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
                }`}
              >
                // 03. EDUCATION (Academic Dossier)
              </a>
              <a
                href={isHome ? '#certifications' : '/#certifications'}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isHome && activeSection === 'certifications' ? 'true' : undefined}
                className={`block py-2 border-b border-[var(--color-charcoal-border)]/50 transition-colors ${
                  isHome && activeSection === 'certifications'
                    ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)]/80 pl-3 border-l-2 border-[var(--color-champagne)]'
                    : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
                }`}
              >
                // 04. CERTS (Certifications)
              </a>
              <a
                href={isHome ? '#contact' : '/#contact'}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={isHome && activeSection === 'contact' ? 'true' : undefined}
                className={`block py-2 border-b border-[var(--color-charcoal-border)]/50 transition-colors ${
                  isHome && activeSection === 'contact'
                    ? 'text-[var(--color-champagne)] font-medium bg-[var(--color-charcoal-surface)]/80 pl-3 border-l-2 border-[var(--color-champagne)]'
                    : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)]'
                }`}
              >
                // 05. CONTACT (Connect)
              </a>
              <Link
                to="/status"
                onClick={() => setMobileMenuOpen(false)}
                aria-current={location.pathname === '/status' ? 'page' : undefined}
                className={`block py-2 border-b border-[var(--color-charcoal-border)]/50 transition-colors ${
                  location.pathname === '/status'
                    ? 'text-[var(--color-emerald)] font-medium bg-[var(--color-charcoal-surface)]/80 pl-3 border-l-2 border-[var(--color-emerald)]'
                    : 'text-[var(--color-ivory-muted)] hover:text-[var(--color-emerald)]'
                }`}
              >
                // 06. SYSTEM (Telemetry &amp; Tokens)
              </Link>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={PROFILE_DATA.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[var(--color-champagne)]"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={PROFILE_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[#0077B5]"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </nav>
          </>
        )}
      </header>

      {/* Main Content Area: Full Bleed for Cinematic Viewports */}
      <main id="main-content" tabIndex={-1} className="flex-1 w-full flex flex-col focus:outline-none">
        <Outlet />
      </main>

      {/* Modular Cinematic Industrial Footer */}
      <Footer />
    </div>
  );
}
