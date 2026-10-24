import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

/**
 * CertificateModal
 * Accessible full-size lightbox viewer for verified credentials.
 * Features keyboard Escape handling, arrow key cycling, focus management,
 * scroll locking, and uncropped aspect-ratio preservation.
 */
export default function CertificateModal({
  cert,
  isOpen,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}) {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);

  // Keyboard navigation & Escape handling
  useEffect(() => {
    if (!isOpen || !cert) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        e.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cert, onClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock body scroll and set initial focus
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // Focus the close button for accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !cert) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cert-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl transition-opacity duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative flex flex-col w-full max-w-4xl max-h-[92vh] rounded-2xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] shadow-[0_32px_80px_rgba(0,0,0,0.85),0_0_36px_rgba(229,180,91,0.14)] overflow-hidden animate-in fade-in zoom-in-95 duration-200 card-cinematic-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Specular Rim */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--color-champagne)] to-transparent" />

        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)]/80 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[var(--color-champagne)]" />
            <span className="text-[var(--color-champagne)] font-semibold uppercase tracking-wider">
              {cert.issuer}
            </span>
            <span className="text-[var(--color-charcoal-border)]">|</span>
            <span className="text-[var(--color-ivory-subtle)]">{cert.category}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] text-[10px] text-[var(--color-ivory-subtle)] font-mono">
              <kbd className="text-[var(--color-champagne)]">ESC</kbd> Close &bull; <kbd className="text-[var(--color-champagne)]">&larr; / &rarr;</kbd> Cycle
            </span>

            {cert.issueDate && (
              <span className="text-[var(--color-ivory-muted)] hidden md:inline">
                Issued: {cert.issueDate}
              </span>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)] hover:bg-[var(--color-charcoal)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
              aria-label="Close certificate preview (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Image Display Area */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 bg-[#0a0d0b] overflow-hidden min-h-[280px]">
          {/* Navigation Arrows */}
          {hasPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-[var(--color-charcoal)]/80 hover:bg-[var(--color-charcoal)] text-[var(--color-ivory)] hover:text-[var(--color-champagne)] border border-[var(--color-charcoal-border)] shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {hasNext && (
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-[var(--color-charcoal)]/80 hover:bg-[var(--color-charcoal)] text-[var(--color-ivory)] hover:text-[var(--color-champagne)] border border-[var(--color-charcoal-border)] shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Full uncropped certificate image */}
          <div className="max-w-full max-h-[62vh] flex items-center justify-center">
            <img
              src={cert.image}
              alt={`Authentic Certificate: ${cert.title} issued by ${cert.issuer}`}
              className="max-h-[62vh] w-auto max-w-full object-contain rounded-md shadow-2xl border border-[var(--color-charcoal-border)]/60 select-none"
              loading="eager"
            />
          </div>
        </div>

        {/* Modal Footer / Telemetry Strip */}
        <div className="p-4 sm:p-5 border-t border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 id="modal-cert-title" className="text-base sm:text-lg font-bold text-[var(--color-ivory)]">
                {cert.title}
              </h3>
              <p className="text-xs font-mono text-[var(--color-champagne)]">
                {cert.highlight}
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--color-emerald)] shrink-0 bg-[var(--color-charcoal)] px-2.5 py-1 rounded border border-[var(--color-emerald)]/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Document on File</span>
            </div>
          </div>

          {Array.isArray(cert.skills) && cert.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-charcoal)] text-[var(--color-ivory-subtle)] border border-[var(--color-charcoal-border)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
