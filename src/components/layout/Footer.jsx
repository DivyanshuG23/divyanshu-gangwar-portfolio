import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUp, Mail, ExternalLink, Terminal, ShieldCheck, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { PROFILE_DATA } from '../../data/profile';

/**
 * Footer
 * Cinematic industrial-tech application footer.
 * Features verified profiles, direct mail link, dynamic current-year copyright,
 * accessible back-to-top control, and single-source-of-truth profile metadata.
 */
export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)] text-xs font-mono text-[var(--color-ivory-subtle)] relative z-20">
      {/* Top Ambient Accent Border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-champagne-muted)] to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        
        {/* Main Footer Navigation & Identity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Identity & Degree Anchor (12 cols on md, 5 cols on lg) */}
          <div className="md:col-span-12 lg:col-span-5 space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] rounded py-1"
              aria-label="Divyanshu Gangwar Portfolio Home"
            >
              <div className="w-7 h-7 rounded border border-[var(--color-champagne)]/30 bg-[var(--color-charcoal-surface)] flex items-center justify-center text-[var(--color-champagne)] group-hover:border-[var(--color-champagne)] transition-colors">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-sm tracking-wider uppercase font-semibold text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
                Divyanshu<span className="text-[var(--color-champagne)]">.dev</span>
              </span>
            </Link>

            <p className="text-xs text-[var(--color-ivory-muted)] font-sans leading-relaxed max-w-sm">
              Computer Science &amp; Engineering undergraduate at{' '}
              <span className="text-[var(--color-ivory)]">{PROFILE_DATA.education.institution}</span>.
              Specialized in scalable full-stack MERN systems, reactive frontend engineering, and computational algorithms.
            </p>

            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-emerald)]/30 text-[11px] text-[var(--color-emerald)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)] motion-safe:animate-pulse" />
              <span>{PROFILE_DATA.availability}</span>
            </div>
          </div>

          {/* Quick Section Anchor Navigation (6 cols on md, 4 cols on lg) */}
          <div className="md:col-span-6 lg:col-span-4 space-y-3">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-champagne)] font-semibold">
              // Section Index
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              <li>
                <a
                  href={isHome ? '#work' : '/#work'}
                  className="hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                >
                  01. Work
                </a>
              </li>
              <li>
                <a
                  href={isHome ? '#about' : '/#about'}
                  className="hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                >
                  02. About
                </a>
              </li>
              <li>
                <a
                  href={isHome ? '#education' : '/#education'}
                  className="hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                >
                  03. Education
                </a>
              </li>
              <li>
                <a
                  href={isHome ? '#certifications' : '/#certifications'}
                  className="hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                >
                  04. Certifications
                </a>
              </li>
              <li>
                <a
                  href={isHome ? '#contact' : '/#contact'}
                  className="hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                >
                  05. Contact
                </a>
              </li>
              <li>
                <Link
                  to="/status"
                  className="hover:text-[var(--color-emerald)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-emerald)] rounded px-1 py-0.5"
                >
                  06. System
                </Link>
              </li>
            </ul>
          </div>

          {/* Verified External Channels (6 cols on md, 3 cols on lg) */}
          <div className="md:col-span-6 lg:col-span-3 space-y-3 min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-champagne)] font-semibold">
              // Direct Channels
            </div>
            <ul className="space-y-2 text-xs">
              <li className="min-w-0">
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="inline-flex max-w-full items-center gap-2 hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                  aria-label={`Send direct email to ${PROFILE_DATA.email}`}
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--color-champagne)] shrink-0" />
                  <span className="truncate">{PROFILE_DATA.email}</span>
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={PROFILE_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-2 hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                  aria-label="GitHub profile (external)"
                >
                  <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">GitHub // DivyanshuG23</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={PROFILE_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-2 hover:text-[#0077B5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1 py-0.5"
                  aria-label="LinkedIn profile (external)"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5] shrink-0" />
                  <span className="truncate">LinkedIn // Connect</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60 shrink-0" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Telemetry & Back To Top */}
        <div className="pt-6 border-t border-[var(--color-charcoal-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>&copy; {currentYear} {PROFILE_DATA.name}. All rights reserved.</span>
            <span className="hidden sm:inline text-[var(--color-charcoal-border)]">&bull;</span>
            <span className="text-[var(--color-ivory-subtle)]">
              {PROFILE_DATA.education.degree} ({PROFILE_DATA.education.timeline})
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/status"
              className="flex items-center gap-1.5 text-[var(--color-ivory-muted)] hover:text-[var(--color-emerald)] transition-colors"
            >
              <Cpu className="w-3 h-3 text-[var(--color-emerald)]" />
              <span>Core Operational</span>
            </Link>

            <span className="text-[var(--color-charcoal-border)]">|</span>

            <div className="flex items-center gap-1 text-[var(--color-champagne)]">
              <ShieldCheck className="w-3 h-3" />
              <span>v0.2.0</span>
            </div>

            <span className="text-[var(--color-charcoal-border)]">|</span>

            {/* Accessible Back-to-Top Control */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-[var(--color-ivory)] hover:text-[var(--color-champagne)] hover:border-[var(--color-champagne)]/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
              aria-label="Scroll back to top of page"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
