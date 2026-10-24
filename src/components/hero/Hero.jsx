import React from 'react';
import { ArrowRight, Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import TitleRotator from './TitleRotator';
import PhotoFrame from './PhotoFrame';
import CinematicBackdrop from './CinematicBackdrop';
import { PROFILE_DATA } from '../../data/profile';

/**
 * Hero
 * Primary hero visual section for Divyanshu Gangwar.
 * Incorporates editorial hierarchy, dynamic title rotation, deliberate photo reservation,
 * and CSS-based cinematic depth without extraneous heavy dependencies.
 */
export default function Hero() {
  return (
    <section
      aria-label="Introduction and summary"
      className="relative min-h-[calc(100dvh-5rem)] flex items-center justify-center py-12 lg:py-16 overflow-hidden"
    >
      {/* 3D Depth Backdrop */}
      <CinematicBackdrop />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Identity & Actions (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-charcoal-surface)] border border-[var(--color-emerald)]/30 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]" />
              </span>
              <span className="text-[var(--color-emerald)] font-medium">{PROFILE_DATA.availability}</span>
              <span className="text-[var(--color-charcoal-border)]">|</span>
              <span className="text-[var(--color-ivory-subtle)] text-[11px]">Final-Year B.Tech CSE</span>
            </div>

            {/* Name Heading with Editorial Hierarchy */}
            <div className="space-y-2">
              <div className="font-mono text-xs sm:text-sm tracking-widest uppercase text-[var(--color-champagne)]">
                Portfolio // Engineering
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--color-ivory)] leading-[1.08] [text-wrap:balance]">
                Divyanshu <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-ivory)] via-[var(--color-champagne-light)] to-[var(--color-champagne)]">
                  Gangwar
                </span>
              </h1>
            </div>

            {/* Dynamic Single-Title Rotator */}
            <div className="w-full pt-1">
              <TitleRotator />
            </div>

            {/* Core Headline & Recruiter-Friendly Supporting Introduction */}
            <div className="space-y-3 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-[var(--color-champagne-light)] tracking-tight [text-wrap:balance]">
                “{PROFILE_DATA.headline}”
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] leading-relaxed font-sans [text-wrap:pretty]">
                {PROFILE_DATA.bio}
              </p>
            </div>

            {/* Target Specializations Tag Strip */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-mono text-[11px] text-[var(--color-ivory-subtle)] uppercase tracking-wider mr-1">
                Focus:
              </span>
              {PROFILE_DATA.heroFocusTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded text-xs font-mono bg-[var(--color-charcoal-surface)] text-[var(--color-champagne-light)] border border-[var(--color-charcoal-border)] transition-colors hover:border-[var(--color-champagne)]/40"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Primary & Secondary Call To Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-champagne)] text-[var(--color-charcoal)] font-semibold text-sm transition-all duration-300 hover:bg-[var(--color-champagne-light)] hover:shadow-[0_0_24px_rgba(229,180,91,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-charcoal-surface)] text-[var(--color-ivory)] border border-[var(--color-charcoal-border)] font-medium text-sm transition-all duration-300 hover:border-[var(--color-champagne)]/50 hover:text-[var(--color-champagne)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
              >
                <Mail className="w-4 h-4 text-[var(--color-champagne)]" />
                <span>Get In Touch</span>
              </a>
            </div>

            {/* Verified External Profiles */}
            <div className="flex items-center gap-4 pt-4 border-t border-[var(--color-charcoal-border)] w-full">
              <span className="font-mono text-xs text-[var(--color-ivory-subtle)] uppercase tracking-wider">
                Profiles:
              </span>
              
              <a
                href={PROFILE_DATA.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-0.5"
                aria-label="Divyanshu Gangwar GitHub profile (opens in new tab)"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={PROFILE_DATA.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded px-1.5 py-0.5"
                aria-label="Divyanshu Gangwar LinkedIn profile (opens in new tab)"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </div>

          </div>

          {/* Right Column: Deliberate Portrait Frame (5 cols on lg) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <PhotoFrame />
          </div>

        </div>
      </div>
    </section>
  );
}
