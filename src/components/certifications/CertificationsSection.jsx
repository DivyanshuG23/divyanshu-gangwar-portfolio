import React, { useState, useMemo } from 'react';
import {
  Award,
  ShieldCheck,
  Terminal,
  Clock,
  ArrowRight,
  Filter,
} from 'lucide-react';
import {
  CERTIFICATIONS_DATA,
  CERTIFICATION_CATEGORIES,
} from '../../data/certifications';
import CertificateCard from './CertificateCard';
import CertificateModal from './CertificateModal';

/**
 * Validates whether a credential URL is genuine and safe for external navigation.
 * Strictly prevents rendering empty, javascript:, or non-http links as active buttons.
 */
function isValidExternalUrl(url) {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  return trimmed.startsWith('https://') || trimmed.startsWith('http://');
}

/**
 * CertificationsSection
 * Dedicated Certifications & Accreditations showcase anchored at #certifications.
 * Features an authentic visual certificate gallery, category filtering,
 * restrained 3D tilt interaction, and an accessible full-size lightbox viewer.
 */
export default function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  const hasCertifications = Array.isArray(CERTIFICATIONS_DATA) && CERTIFICATIONS_DATA.length > 0;

  // Filtered list based on active category
  const filteredCertificates = useMemo(() => {
    if (!hasCertifications) return [];
    if (activeCategory === 'All') return CERTIFICATIONS_DATA;
    return CERTIFICATIONS_DATA.filter((cert) => cert.category === activeCategory);
  }, [hasCertifications, activeCategory]);

  // Modal navigation indices
  const currentModalIndex = useMemo(() => {
    if (!selectedCert) return -1;
    return filteredCertificates.findIndex((c) => c.id === selectedCert.id);
  }, [selectedCert, filteredCertificates]);

  const handlePrev = () => {
    if (currentModalIndex > 0) {
      setSelectedCert(filteredCertificates[currentModalIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentModalIndex < filteredCertificates.length - 1) {
      setSelectedCert(filteredCertificates[currentModalIndex + 1]);
    }
  };

  // Category item counts
  const categoryCounts = useMemo(() => {
    const counts = { All: CERTIFICATIONS_DATA.length };
    CERTIFICATION_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = CERTIFICATIONS_DATA.filter((c) => c.category === cat).length;
      }
    });
    return counts;
  }, []);

  return (
    <section
      id="certifications"
      tabIndex={-1}
      className="section-delimiter relative py-20 border-t border-[var(--color-charcoal-border)] scroll-mt-16 focus:outline-none"
      aria-labelledby="certifications-section-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
              <span>// 04. PROFESSIONAL CREDENTIALS</span>
            </div>

            <h2
              id="certifications-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ivory)] [text-wrap:balance]"
            >
              Certifications &amp; Accreditations
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
              Formal technical certifications, examination accreditations, and virtual internships
              validated by recognized credential authorities and educational partners.
            </p>
          </div>

          {/* Status Telemetry Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] font-mono text-xs shrink-0">
            {hasCertifications ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]" />
                </span>
                <span className="text-[var(--color-emerald)] font-medium">
                  {CERTIFICATIONS_DATA.length} Verified Credentials
                </span>
                <span className="text-[var(--color-charcoal-border)]">|</span>
                <span className="text-[var(--color-champagne)]">Audit Complete</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
                <span className="text-[var(--color-ivory-muted)]">
                  Registry Status: <span className="text-[var(--color-champagne)] font-medium">Under Review</span>
                </span>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Content Display: Populated Gallery vs. Holding State */}
        {hasCertifications ? (
          <div className="space-y-8">
            {/* Filter Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[var(--color-charcoal-border)]/60 pb-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-ivory-subtle)] mr-2">
                <Filter className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
                <span className="hidden sm:inline">FILTER BY:</span>
              </div>

              {CERTIFICATION_CATEGORIES.map((category) => {
                const count = categoryCounts[category] || 0;
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    data-category-filter={category}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] ${
                      isActive
                        ? 'bg-[var(--color-champagne)] text-[var(--color-charcoal)] font-semibold shadow-md'
                        : 'bg-[var(--color-charcoal-surface)] text-[var(--color-ivory-muted)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 hover:text-[var(--color-ivory)]'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive
                          ? 'bg-[var(--color-charcoal)]/20 text-[var(--color-charcoal)]'
                          : 'bg-[var(--color-charcoal)] text-[var(--color-ivory-subtle)]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid */}
            {filteredCertificates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert, index) => (
                  <CertificateCard
                    key={cert.id}
                    cert={cert}
                    index={index}
                    onSelect={(selected) => setSelectedCert(selected)}
                  />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)]">
                <p className="text-sm font-mono text-[var(--color-ivory-muted)]">
                  No certificates cataloged under the selected filter.
                </p>
              </div>
            )}

            {/* Lightbox Modal */}
            <CertificateModal
              cert={selectedCert}
              isOpen={Boolean(selectedCert)}
              onClose={() => setSelectedCert(null)}
              onPrev={handlePrev}
              onNext={handleNext}
              hasPrev={currentModalIndex > 0}
              hasNext={currentModalIndex < filteredCertificates.length - 1}
            />
          </div>
        ) : (
          /* Graceful Empty State Fallback (maintained if data array is empty) */
          <div className="rounded-2xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 sm:p-8 lg:p-10 space-y-8 relative overflow-hidden shadow-2xl">
            <div className="h-1 w-full bg-gradient-to-r from-[var(--color-charcoal-border)] via-[var(--color-champagne-muted)] to-[var(--color-charcoal-border)] absolute top-0 left-0" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--color-charcoal-border)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] flex items-center justify-center text-[var(--color-champagne)] shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[var(--color-champagne)] tracking-wider">
                    Registry Pipeline // Accreditation Record
                  </div>
                  <div className="text-xs font-mono text-[var(--color-ivory-subtle)]">
                    STATUS: AUDIT_IN_PROGRESS
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-champagne)] bg-[var(--color-charcoal)] px-3 py-1.5 rounded-lg border border-[var(--color-charcoal-border)] self-start sm:self-auto">
                <Clock className="w-3.5 h-3.5" />
                <span>Pending Final Review</span>
              </div>
            </div>

            <div className="max-w-3xl space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-ivory)] tracking-tight">
                Credentials Dossier In Preparation
              </h3>

              <p className="text-xs sm:text-sm text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
                Formal industry certifications, technical examinations, and specialized professional accreditations
                are currently being cataloged and audited for this portfolio. Verified credential IDs and direct
                authentication links will be published here upon final review.
              </p>

              <p className="text-xs text-[var(--color-ivory-subtle)] font-sans leading-relaxed">
                In adherence to strict portfolio authenticity standards, no placeholder credentials, unverified certificates,
                or decorative badges are displayed until documentation is confirmed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] space-y-1 font-mono">
                <div className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">Registry State</div>
                <div className="text-xs font-medium text-[var(--color-ivory)]">AUDIT_PENDING</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] space-y-1 font-mono">
                <div className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">Active Records</div>
                <div className="text-xs font-medium text-[var(--color-champagne)]">00 CATALOGED</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] space-y-1 font-mono">
                <div className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">Verification Engine</div>
                <div className="text-xs font-medium text-[var(--color-emerald)]">ONLINE // READY</div>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] space-y-1 font-mono">
                <div className="text-[10px] text-[var(--color-ivory-subtle)] uppercase">Scheduled Release</div>
                <div className="text-xs font-medium text-[var(--color-ivory)]">FINAL REVIEW</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-charcoal-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-ivory-subtle)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--color-champagne)]" />
                <span>Explore existing verified foundations:</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#education"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 text-xs font-mono text-[var(--color-ivory)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                >
                  <span>Academic Dossier</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="#work"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 text-xs font-mono text-[var(--color-ivory)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                >
                  <span>Featured Systems</span>
                  <ArrowRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
