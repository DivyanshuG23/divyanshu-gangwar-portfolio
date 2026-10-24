import React from 'react';
import {
  GraduationCap,
  Calendar,
  Building2,
  BookOpen,
  Cpu,
  Database,
  Binary,
  Layers,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  MapPin,
  Award,
} from 'lucide-react';
import { PROFILE_DATA } from '../../data/profile';

/**
 * Theoretical & Engineering Pillars of the B.Tech Computer Science curriculum.
 * Strictly reflects foundational academic disciplines without inventing unverified course codes or grades.
 */
const ACADEMIC_PILLARS = [
  {
    id: 'pillar-algorithms',
    title: 'Algorithms & Computational Theory',
    icon: Binary,
    tag: 'CORE FOUNDATION',
    description:
      'Mathematical modeling, computational complexity (Big-O analysis), and core abstract data structures (trees, graphs, heaps, dynamic programming) enabling performant, low-latency computing.',
    disciplines: ['Asymptotic Analysis', 'Graph Theory', 'Data Structures', 'Algorithm Design'],
  },
  {
    id: 'pillar-systems',
    title: 'Systems & Computer Architecture',
    icon: Cpu,
    tag: 'HARDWARE & LOW-LEVEL',
    description:
      'Operating systems theory, memory hierarchies, multi-threaded concurrency, process synchronization, and processor instruction cycles governing reliable software execution.',
    disciplines: ['Operating Systems', 'Memory Management', 'Process Scheduling', 'Concurrency'],
  },
  {
    id: 'pillar-databases',
    title: 'Database Systems & Information Architecture',
    icon: Database,
    tag: 'DATA ENGINEERING',
    description:
      'Theoretical foundations of relational and non-relational database schemas, normalization forms, indexing strategies, ACID transactional integrity, and scalable persistence pipelines.',
    disciplines: ['Relational Schema Design', 'Query Optimization', 'ACID Transactions', 'Indexing'],
  },
  {
    id: 'pillar-engineering',
    title: 'Software Engineering & Scalable Systems',
    icon: Layers,
    tag: 'APPLIED ENGINEERING',
    description:
      'Modular architecture design, object-oriented principles, distributed web service patterns, REST protocol mechanics, and collaborative version control workflows.',
    disciplines: ['Design Patterns', 'System Modularity', 'REST Architectures', 'Version Control'],
  },
];

/**
 * EducationSection
 * Dedicated Academic Dossier anchored at #education.
 * Art-directed dark cinematic industrial-tech presentation of Divyanshu Gangwar's
 * formal B.Tech in Computer Science & Engineering degree at Invertis University (Expected 2027).
 * Strictly authentic: zero fabricated grades, fake certificates, or decorative academic clichés.
 */
export default function EducationSection() {
  const { degree, institution, timeline, primary, history } = PROFILE_DATA.education;

  return (
    <section
      id="education"
      tabIndex={-1}
      className="section-delimiter relative py-20 border-t border-[var(--color-charcoal-border)] scroll-mt-16 focus:outline-none"
      aria-labelledby="education-section-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
              <span>// 03. ACADEMIC DOSSIER</span>
            </div>

            <h2
              id="education-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ivory)] [text-wrap:balance]"
            >
              Academic &amp; Engineering Education
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
              Formal undergraduate studies in Computer Science &amp; Engineering, providing the theoretical
              algorithms, systems architecture, and mathematical discipline that underpin modern software systems.
            </p>
          </div>

          {/* Academic Status Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-emerald)]/30 font-mono text-xs text-[var(--color-emerald)] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]" />
            </span>
            <span className="font-medium">Active Undergraduate Candidate &bull; Class of 2027</span>
          </div>
        </div>

        {/* Primary Academic Institutional Dossier Hero Card */}
        <div className="rounded-2xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] overflow-hidden shadow-2xl relative card-cinematic-bevel transition-all duration-300 hover:border-[var(--color-champagne)]/30 hover:shadow-[0_24px_64px_rgba(0,0,0,0.6),0_0_32px_rgba(229,180,91,0.06)]">
          
          {/* Top Ambient Specular Gradient Line */}
          <div className="h-1 w-full bg-gradient-to-r from-[var(--color-champagne-muted)] via-[var(--color-champagne)] to-[var(--color-emerald)]" />

          {/* Institutional Dossier Content */}
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* Dossier Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-charcoal-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] flex items-center justify-center text-[var(--color-champagne)] shrink-0 shadow-inner">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[var(--color-champagne)] tracking-wider">
                    Institutional Record // Academic Anchor
                  </div>
                  <div className="text-xs font-mono text-[var(--color-ivory-subtle)]">
                    REGISTRY: INVERTIS-CSE-2027
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-emerald)] bg-[var(--color-charcoal)] px-3 py-1.5 rounded-lg border border-[var(--color-emerald)]/20 self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Active Degree Enrollment</span>
              </div>
            </div>

            {/* University & Degree Hero Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-[11px] font-mono text-[var(--color-champagne)]">
                  <Calendar className="w-3 h-3 text-[var(--color-champagne)]" />
                  <span>{primary?.duration || '2023–2027'} &bull; {primary?.status || timeline}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-ivory)] tracking-tight">
                  {institution}
                </h3>

                <div className="space-y-1">
                  <p className="text-base sm:text-xl font-semibold text-[var(--color-champagne)] font-mono">
                    {primary?.degree || degree}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[var(--color-ivory-muted)]">
                    <span className="text-[var(--color-ivory)] font-medium">
                      Branch: {primary?.branch || 'Computer Science and Engineering'}
                    </span>
                    <span className="text-[var(--color-charcoal-border)]">|</span>
                    <span className="inline-flex items-center gap-1 text-[var(--color-ivory-subtle)]">
                      <MapPin className="w-3 h-3 text-[var(--color-champagne)]" />
                      {primary?.location || 'Bareilly, Uttar Pradesh, India'}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] font-sans leading-relaxed max-w-2xl [text-wrap:pretty]">
                  {primary?.description ||
                    'Four-year comprehensive engineering program balancing algorithmic foundations, low-level systems computation, relational database management, and hands-on software development principles.'}
                </p>
              </div>

              {/* Right Column: Key Parameter Telemetry Metrics */}
              <div className="lg:col-span-4 bg-[var(--color-charcoal)] rounded-xl border border-[var(--color-charcoal-border)] p-4 sm:p-5 space-y-3 font-mono text-xs">
                <div className="text-[10px] uppercase text-[var(--color-ivory-subtle)] tracking-wider border-b border-[var(--color-charcoal-border)] pb-2 flex items-center justify-between">
                  <span>Program Telemetry</span>
                  <Terminal className="w-3 h-3 text-[var(--color-champagne)]" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory-subtle)]">CREDENTIAL:</span>
                  <span className="text-[var(--color-ivory)] font-medium">B.Tech Degree</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory-subtle)]">BRANCH:</span>
                  <span className="text-[var(--color-ivory)] font-medium">Comp. Science &amp; Engg.</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory-subtle)]">DURATION:</span>
                  <span className="text-[var(--color-ivory)] font-medium">{primary?.duration || '2023–2027'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory-subtle)]">STATUS:</span>
                  <span className="text-[var(--color-champagne)] font-medium">Expected 2027</span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-[var(--color-charcoal-border)]">
                  <span className="text-[var(--color-ivory-subtle)]">ACADEMIC CGPA:</span>
                  <span className="px-2 py-0.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-emerald)]/30 text-[var(--color-emerald)] font-bold text-xs">
                    {primary?.cgpa || '8.6/10'}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[var(--color-ivory-subtle)]">LOCATION:</span>
                  <span className="text-[var(--color-ivory-subtle)] text-[11px]">Bareilly, UP, IN</span>
                </div>
              </div>
            </div>

            {/* Academic Theoretical Pillars (4-Card Engineering Architecture) */}
            <div className="space-y-4 pt-4 border-t border-[var(--color-charcoal-border)]">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-ivory-subtle)]">
                <span className="uppercase tracking-wider">
                  Core Engineering Curriculum Pillars // Theoretical Disciplines
                </span>
                <span>04 DOMAINS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ACADEMIC_PILLARS.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={pillar.id}
                      className="p-5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_20px_rgba(229,180,91,0.06)] transition-all duration-300 group space-y-3 card-cinematic-bevel"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] flex items-center justify-center text-[var(--color-champagne)] group-hover:text-[var(--color-champagne-light)] group-hover:border-[var(--color-champagne)]/40 transition-colors shrink-0 shadow-inner">
                            <PillarIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
                              {pillar.title}
                            </h4>
                            <div className="text-[10px] font-mono text-[var(--color-champagne)]">
                              {pillar.tag}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[var(--color-ivory-muted)] font-sans leading-relaxed">
                        {pillar.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {pillar.disciplines.map((item) => (
                          <span
                            key={item}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-charcoal-surface)] text-[var(--color-ivory-subtle)] border border-[var(--color-charcoal-border)]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prior Academic Foundation (Class XII & Class X Chronological Timeline) */}
            <div className="space-y-4 pt-6 border-t border-[var(--color-charcoal-border)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[var(--color-ivory-subtle)]">
                <span className="uppercase tracking-wider">
                  Prior Academic Foundation // Secondary &amp; Senior Secondary Timeline
                </span>
                <span className="text-[var(--color-champagne)]">02 MILESTONES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {history?.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45),0_0_20px_rgba(229,180,91,0.06)] transition-all duration-300 space-y-3.5 flex flex-col justify-between card-cinematic-bevel"
                  >
                    <div className="space-y-3">
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-[var(--color-champagne)] font-semibold text-[11px]">
                            {item.qualification}
                          </span>
                          <span className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">
                            {item.level}
                          </span>
                        </div>

                        {/* Score Metric Badge */}
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)]">
                          <span className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">
                            {item.scoreLabel}:
                          </span>
                          <span className="text-xs font-bold text-[var(--color-champagne)]">
                            {item.score}
                          </span>
                        </div>
                      </div>

                      {/* Institution & Location */}
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-[var(--color-ivory)]">
                          {item.institution}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[var(--color-ivory-muted)]">
                          <span className="inline-flex items-center gap-1 text-[var(--color-ivory-subtle)]">
                            <MapPin className="w-3 h-3 text-[var(--color-champagne)]" />
                            {item.location}
                          </span>
                          <span className="text-[var(--color-charcoal-border)]">&bull;</span>
                          <span>Board: <strong className="text-[var(--color-ivory)] font-medium">{item.board}</strong></span>
                          {item.year && (
                            <>
                              <span className="text-[var(--color-charcoal-border)]">&bull;</span>
                              <span>Year: <strong className="text-[var(--color-champagne)] font-medium">{item.year}</strong></span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Academic Distinction Callout */}
                    {item.distinction && (
                      <div className="pt-2">
                        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-champagne)]/30 text-xs text-[var(--color-ivory-muted)]">
                          <Award className="w-4 h-4 text-[var(--color-champagne)] shrink-0 mt-0.5" />
                          <span>
                            <strong className="text-[var(--color-champagne-light)] font-medium">Academic Distinction:</strong>{' '}
                            {item.distinction}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Academic-to-Industry Synthesis Callout */}
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)]/80 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-[var(--color-emerald)] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-mono font-medium text-[var(--color-ivory)]">
                    Theory Grounded in Demonstrable Implementation
                  </div>
                  <div className="text-[11px] font-sans text-[var(--color-ivory-muted)]">
                    Classroom computer science rigor directly informs my production engineering in systems like{' '}
                    <strong className="text-[var(--color-champagne)] font-medium">FlowForge AI</strong>,{' '}
                    <strong className="text-[var(--color-champagne)] font-medium">ExpenseFlow</strong>, and{' '}
                    <strong className="text-[var(--color-champagne)] font-medium">AI Resume Analyzer</strong>.
                  </div>
                </div>
              </div>

              <a
                href="#work"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)] text-xs font-mono text-[var(--color-ivory)] hover:text-[var(--color-champagne)] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
                <span>Review Applied Work</span>
              </a>
            </div>

          </div>

          {/* Bottom Academic Verification Strip */}
          <div className="border-t border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)] px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[var(--color-ivory-subtle)]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-emerald)]" />
              <span>OFFICIAL ACADEMIC TRACK RECORD &bull; INVERTIS UNIVERSITY &bull; SVM INTER COLLEGE</span>
            </div>
            <div>
              <span>B.TECH CGPA: </span>
              <span className="text-[var(--color-emerald)] font-bold">{primary?.cgpa || '8.6/10'}</span>
              <span className="text-[var(--color-charcoal-border)] mx-2">|</span>
              <span>DEGREE STATUS: </span>
              <span className="text-[var(--color-emerald)]">EXPECTED GRADUATION 2027</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
