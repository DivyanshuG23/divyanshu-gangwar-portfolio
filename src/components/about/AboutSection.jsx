import React from 'react';
import {
  GraduationCap,
  Calendar,
  Briefcase,
  Terminal,
  ExternalLink,
  User,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { PROFILE_DATA } from '../../data/profile';
import SkillsMatrix from './SkillsMatrix';

/**
 * AboutSection
 * Editorial Developer Profile and Academic Dossier anchored at #about.
 * Features verified education, confirmed technical skills, career directions,
 * and availability status without fabricated claims or generic avatars.
 */
export default function AboutSection() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="section-delimiter relative py-20 border-t border-[var(--color-charcoal-border)] scroll-mt-16 focus:outline-none"
      aria-labelledby="about-section-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>// 02. DEVELOPER DOSSIER</span>
            </div>

            <h2
              id="about-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ivory)] [text-wrap:balance]"
            >
              Profile &amp; Technical Foundation
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
              Academic background, engineering competencies, and professional direction in modern web
              and full-stack software development.
            </p>
          </div>

          {/* Availability Status Badge */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-emerald)]/30 font-mono text-xs text-[var(--color-emerald)] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]" />
            </span>
            <span className="font-medium">{PROFILE_DATA.availability}</span>
          </div>
        </div>

        {/* Row 1: Personal Narrative & Academic/Role Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authentic Engineering Journey / About Me (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 sm:p-7 space-y-5 transition-all duration-300 hover:border-[var(--color-champagne)]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(229,180,91,0.06)] card-cinematic-bevel">
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--color-charcoal-border)] pb-3">
                <div className="flex items-center gap-2 text-[var(--color-champagne)] uppercase tracking-wider font-medium">
                  <User className="w-3.5 h-3.5" />
                  <span>// ABOUT ME &bull; ENGINEERING JOURNEY</span>
                </div>
                <span className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">
                  VERIFIED NARRATIVE
                </span>
              </div>

              {/* 4 Authentic Paragraphs */}
              <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed font-sans text-[var(--color-ivory-muted)] [text-wrap:pretty]">
                <p>
                  I'm <strong className="text-[var(--color-champagne)] font-medium">Divyanshu Gangwar</strong>, a final-year B.Tech Computer Science and Engineering student at Invertis University, with a strong interest in building modern, responsive, and meaningful web applications.
                </p>
                <p>
                  My journey in web development is driven by the excitement of turning ideas into real digital experiences. I have worked with <span className="text-[var(--color-ivory)] font-medium">HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB,</span> and <span className="text-[var(--color-ivory)] font-medium">MySQL</span> to build full-stack projects, exploring both the user-facing side of applications and the backend systems that power them.
                </p>
                <p>
                  Through projects involving workflow automation, AI-powered resume analysis, URL shortening, and expense management, I've been developing my understanding of application architecture, REST APIs, authentication, and database integration. I enjoy learning by building, solving practical development challenges, and continuously improving the quality of my work.
                </p>
                <p>
                  My long-term goal is to grow as an <strong className="text-[var(--color-champagne)] font-semibold">AI + Full-Stack Developer</strong>, combining strong web development fundamentals with intelligent features to create useful, reliable, and user-focused applications. I'm eager to contribute to real-world projects, learn from experienced developers, and keep turning ideas into working solutions.
                </p>
              </div>

              {/* Currently Active Status Banner */}
              <div className="pt-4 border-t border-[var(--color-charcoal-border)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2 text-[var(--color-emerald)]">
                  <span className="relative flex h-2 w-2">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]" />
                  </span>
                  <span>
                    <strong className="text-[var(--color-ivory)]">Currently:</strong> {PROFILE_DATA.about?.status || 'Open to jobs and internships.'}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--color-ivory-subtle)]">
                  Invertis University &bull; Class of 2027
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Credentials, Target Roles & Direct Links (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Academic Credentials Card */}
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-5 space-y-4 card-cinematic-bevel transition-all duration-300 hover:border-[var(--color-champagne)]/30">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--color-champagne)] uppercase tracking-wider">
                  Academic Credentials
                </span>
                <span className="text-[var(--color-emerald)] bg-[var(--color-charcoal)] px-2 py-0.5 rounded border border-[var(--color-emerald)]/20">
                  Active Student
                </span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-[var(--color-champagne)] shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-sm font-semibold text-[var(--color-ivory)]">
                    {PROFILE_DATA.education.degree}
                  </h3>
                  <div className="text-xs text-[var(--color-champagne)] font-mono">
                    {PROFILE_DATA.education.institution}
                  </div>
                  <div className="flex items-center justify-between gap-1.5 text-[11px] font-mono text-[var(--color-ivory-subtle)] pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-ivory-subtle)]" />
                      <span>{PROFILE_DATA.education.timeline}</span>
                    </div>
                    <a
                      href="#education"
                      className="text-[var(--color-champagne)] hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded"
                    >
                      <span>Dossier &rarr;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Professional Roles */}
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-5 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--color-ivory-subtle)] uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
                <span>Primary Specializations</span>
              </div>

              <div className="space-y-2">
                {PROFILE_DATA.roles.map((role, idx) => (
                  <div
                    key={role}
                    className="flex items-center justify-between p-2.5 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-xs font-mono"
                  >
                    <span className="text-[var(--color-ivory)]">{role}</span>
                    <span className="text-[var(--color-champagne)] text-[10px]">#0{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Direct Profiles */}
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)] p-4 flex items-center justify-between gap-3">
              <div className="text-xs font-mono text-[var(--color-ivory-muted)]">
                Connect Directly:
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={PROFILE_DATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)] text-xs font-mono text-[var(--color-ivory)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                  aria-label="Divyanshu Gangwar GitHub profile (opens in new tab)"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={PROFILE_DATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)] text-xs font-mono text-[var(--color-ivory)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                  aria-label="Divyanshu Gangwar LinkedIn profile (opens in new tab)"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0077B5]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Row 2: Technical Capabilities Matrix (Full Width / 4 cols on lg) */}
        <div className="w-full pt-4">
          <SkillsMatrix />
        </div>
      </div>
    </section>
  );
}
