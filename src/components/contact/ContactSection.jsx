import React, { useState } from 'react';
import {
  Send,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  Terminal,
  Info,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { PROFILE_DATA } from '../../data/profile';

const RECIPIENT_EMAIL = PROFILE_DATA.email;
const GITHUB_URL = PROFILE_DATA.socials.github;
const LINKEDIN_URL = PROFILE_DATA.socials.linkedin;

/**
 * ContactSection
 * Premium, production-grade contact and direct communication section.
 * Features accessible client-side form validation, pre-encoded mailto dispatch,
 * interactive clipboard copying, and verified professional links.
 */
export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [submittedAttempt, setSubmittedAttempt] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [mailDispatched, setMailDispatched] = useState(false);

  // Validation rules
  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email format (e.g. name@domain.com).';
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please enter an inquiry subject.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide a message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    return errors;
  };

  const errors = validate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedAttempt(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // Focus first errored field
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(`contact-${firstErrorField}`);
      element?.focus();
      return;
    }

    // Construct properly encoded mailto query parameters
    const encodedSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject.trim()}`);
    const encodedBody = encodeURIComponent(
      `Sender Name: ${formData.name.trim()}\n` +
      `Sender Email: ${formData.email.trim()}\n\n` +
      `Message:\n${formData.message.trim()}\n\n` +
      `---\nTransmitted via Divyanshu Gangwar Portfolio Communication Channel`
    );

    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;

    // Trigger user's mail client
    window.location.href = mailtoUrl;
    setMailDispatched(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(RECIPIENT_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      // Fallback if clipboard API is constrained
      const textArea = document.createElement('textarea');
      textArea.value = RECIPIENT_EMAIL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const handleCopyDraft = async () => {
    const draftText = `Subject: [Portfolio Inquiry] ${formData.subject}\nFrom: ${formData.name} <${formData.email}>\nTo: ${RECIPIENT_EMAIL}\n\n${formData.message}`;
    try {
      await navigator.clipboard.writeText(draftText);
      setCopiedDraft(true);
      setTimeout(() => setCopiedDraft(false), 3000);
    } catch {
      setCopiedDraft(false);
    }
  };

  // Determine field error display
  const shouldShowError = (field) => (touched[field] || submittedAttempt) && Boolean(errors[field]);

  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section-delimiter relative py-20 border-t border-[var(--color-charcoal-border)] scroll-mt-16 focus:outline-none"
      aria-labelledby="contact-section-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-champagne)] uppercase tracking-widest">
              <Terminal className="w-3.5 h-3.5" />
              <span>// 05. DIRECT COMMUNICATION</span>
            </div>

            <h2
              id="contact-section-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-ivory)] [text-wrap:balance]"
            >
              Initiate Collaboration
            </h2>

            <p className="text-sm sm:text-base text-[var(--color-ivory-muted)] font-sans leading-relaxed [text-wrap:pretty]">
              Direct channels for engineering inquiries, job opportunities, internships, and technical discussions.
            </p>
          </div>

          {/* Availability Pill */}
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[var(--color-charcoal-surface)] border border-[var(--color-emerald)]/30 font-mono text-xs text-[var(--color-emerald)] shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-emerald)]" />
            </span>
            <span className="font-medium">Open to jobs &amp; internships only</span>
          </div>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Communication Hub (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card with One-Click Copy */}
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 space-y-4 card-cinematic-bevel transition-all duration-300 hover:border-[var(--color-champagne)]/30">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[var(--color-champagne)] uppercase tracking-wider">
                  Primary Transmission Endpoint
                </span>
                <span className="text-[var(--color-emerald)] bg-[var(--color-charcoal)] px-2 py-0.5 rounded border border-[var(--color-emerald)]/20">
                  Verified Address
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-[var(--color-ivory-subtle)] font-mono">
                  Direct Inquiries:
                </div>
                <div className="p-3 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] flex items-center justify-between gap-2 overflow-hidden">
                  <a
                    href={`mailto:${RECIPIENT_EMAIL}`}
                    className="text-xs sm:text-sm font-mono text-[var(--color-ivory)] hover:text-[var(--color-champagne)] truncate transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)] rounded"
                    aria-label={`Send direct email to ${RECIPIENT_EMAIL}`}
                  >
                    {RECIPIENT_EMAIL}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-[var(--color-charcoal-surface)] text-[var(--color-ivory-muted)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] shrink-0"
                    aria-label={copiedEmail ? 'Email copied to clipboard' : 'Copy email address to clipboard'}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-[var(--color-emerald)]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {copiedEmail && (
                  <p
                    className="text-[11px] font-mono text-[var(--color-emerald)] flex items-center gap-1.5 pt-1"
                    aria-live="polite"
                  >
                    <Check className="w-3 h-3" />
                    <span>Email address copied to clipboard.</span>
                  </p>
                )}
              </div>

              {/* Protocol Explanation */}
              <div className="p-3.5 rounded-lg bg-[var(--color-charcoal)]/80 border border-[var(--color-charcoal-border)]/60 text-xs font-mono space-y-1.5">
                <div className="flex items-center gap-1.5 text-[var(--color-champagne)] text-[11px] font-semibold">
                  <Info className="w-3.5 h-3.5 shrink-0" />
                  <span>Mail Client Dispatch Mechanism</span>
                </div>
                <p className="text-[11px] text-[var(--color-ivory-muted)] leading-relaxed">
                  Submitting this form prepares your message and triggers your default mail client (such as Outlook, Apple Mail, or Gmail) with pre-filled parameters. If no client opens, use the copy button above.
                </p>
              </div>
            </div>

            {/* Verified Professional Profiles */}
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 space-y-3 card-cinematic-bevel transition-all duration-300 hover:border-[var(--color-champagne)]/30">
              <div className="text-[10px] font-mono uppercase text-[var(--color-ivory-subtle)] tracking-wider">
                External Developer Networks
              </div>

              <div className="space-y-2.5">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
                  aria-label="Connect with Divyanshu Gangwar on LinkedIn (opens in new tab)"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-4 h-4 text-[#0077B5]" />
                    <div>
                      <div className="text-xs font-medium text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
                        LinkedIn Profile
                      </div>
                      <div className="text-[11px] font-mono text-[var(--color-ivory-subtle)]">
                        divyanshu-gangwar-831bb6346
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--color-ivory-subtle)] group-hover:text-[var(--color-champagne)] transition-colors" />
                </a>

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
                  aria-label="Inspect Divyanshu Gangwar code repositories on GitHub (opens in new tab)"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-4 h-4 text-[var(--color-ivory)]" />
                    <div>
                      <div className="text-xs font-medium text-[var(--color-ivory)] group-hover:text-[var(--color-champagne)] transition-colors">
                        GitHub Repositories
                      </div>
                      <div className="text-[11px] font-mono text-[var(--color-ivory-subtle)]">
                        DivyanshuG23
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--color-ivory-subtle)] group-hover:text-[var(--color-champagne)] transition-colors" />
                </a>
              </div>
            </div>

            {/* Recipient Verification Metadata */}
            <div className="p-4 rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)] text-xs font-mono text-[var(--color-ivory-subtle)] space-y-1">
              <div className="flex items-center justify-between">
                <span>RECIPIENT:</span>
                <span className="text-[var(--color-ivory)]">Divyanshu Gangwar</span>
              </div>
              <div className="flex items-center justify-between">
                <span>STATUS:</span>
                <span className="text-[var(--color-emerald)]">AVAILABLE FOR HIRE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>TELEPHONE:</span>
                <span className="text-[var(--color-ivory-subtle)]">UNLISTED (EMAIL ONLY)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Accessible Inquiry Formulation Form (7 cols on lg) */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 sm:p-8 space-y-6 card-cinematic-bevel shadow-2xl">
              
              <div className="space-y-1 border-b border-[var(--color-charcoal-border)] pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-champagne)] uppercase tracking-wider">
                  <Send className="w-3.5 h-3.5" />
                  <span>Inquiry Dispatch Form</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--color-ivory)]">
                  Compose Direct Message
                </h3>
                <p id="contact-form-instructions" className="text-xs text-[var(--color-ivory-muted)] font-mono">
                  All fields required. Preserved and transferred directly into your mail client.
                </p>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} noValidate aria-describedby="contact-form-instructions" className="space-y-5">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Name Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono font-medium text-[var(--color-ivory)]"
                    >
                      Your Name <span className="text-[var(--color-champagne)]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={shouldShowError('name')}
                      aria-describedby={shouldShowError('name') ? 'contact-name-error' : undefined}
                      placeholder="Jane Doe"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-charcoal)] border text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-ivory-subtle)] focus:outline-none focus:ring-2 transition-colors ${
                        shouldShowError('name')
                          ? 'border-[var(--color-ruby)] focus:ring-[var(--color-ruby)]'
                          : 'border-[var(--color-charcoal-border)] focus:border-[var(--color-champagne)] focus:ring-[var(--color-champagne)]'
                      }`}
                    />
                    {shouldShowError('name') && (
                      <p
                        id="contact-name-error"
                        role="alert"
                        className="text-[11px] font-mono text-[var(--color-ruby)] flex items-center gap-1 pt-0.5"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono font-medium text-[var(--color-ivory)]"
                    >
                      Your Email <span className="text-[var(--color-champagne)]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={shouldShowError('email')}
                      aria-describedby={shouldShowError('email') ? 'contact-email-error' : undefined}
                      placeholder="jane@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-charcoal)] border text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-ivory-subtle)] focus:outline-none focus:ring-2 transition-colors ${
                        shouldShowError('email')
                          ? 'border-[var(--color-ruby)] focus:ring-[var(--color-ruby)]'
                          : 'border-[var(--color-charcoal-border)] focus:border-[var(--color-champagne)] focus:ring-[var(--color-champagne)]'
                      }`}
                    />
                    {shouldShowError('email') && (
                      <p
                        id="contact-email-error"
                        role="alert"
                        className="text-[11px] font-mono text-[var(--color-ruby)] flex items-center gap-1 pt-0.5"
                      >
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* Subject Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono font-medium text-[var(--color-ivory)]"
                  >
                    Inquiry Subject <span className="text-[var(--color-champagne)]">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={shouldShowError('subject')}
                    aria-describedby={shouldShowError('subject') ? 'contact-subject-error' : undefined}
                    placeholder="Internship Inquiry // Full-Stack Role"
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-charcoal)] border text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-ivory-subtle)] focus:outline-none focus:ring-2 transition-colors ${
                      shouldShowError('subject')
                        ? 'border-[var(--color-ruby)] focus:ring-[var(--color-ruby)]'
                        : 'border-[var(--color-charcoal-border)] focus:border-[var(--color-champagne)] focus:ring-[var(--color-champagne)]'
                    }`}
                  />
                  {shouldShowError('subject') && (
                    <p
                      id="contact-subject-error"
                      role="alert"
                      className="text-[11px] font-mono text-[var(--color-ruby)] flex items-center gap-1 pt-0.5"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono font-medium text-[var(--color-ivory)]"
                  >
                    Detailed Message <span className="text-[var(--color-champagne)]">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={shouldShowError('message')}
                    aria-describedby={shouldShowError('message') ? 'contact-message-error' : undefined}
                    placeholder="Hello Divyanshu, we reviewed your projects and would like to discuss an opportunity..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[var(--color-charcoal)] border text-sm text-[var(--color-ivory)] placeholder:text-[var(--color-ivory-subtle)] focus:outline-none focus:ring-2 transition-colors resize-y ${
                      shouldShowError('message')
                        ? 'border-[var(--color-ruby)] focus:ring-[var(--color-ruby)]'
                        : 'border-[var(--color-charcoal-border)] focus:border-[var(--color-champagne)] focus:ring-[var(--color-champagne)]'
                    }`}
                  />
                  <div className="flex justify-between items-center text-[10px] font-mono text-[var(--color-ivory-subtle)] pt-1">
                    <span>Inquiry Transmission: Plaintext mailto parameters</span>
                    <span className={formData.message.trim().length >= 10 ? 'text-[var(--color-emerald)]' : 'text-[var(--color-ivory-subtle)]'}>
                      {formData.message.trim().length}/10 chars min
                    </span>
                  </div>
                  {shouldShowError('message') && (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="text-[11px] font-mono text-[var(--color-ruby)] flex items-center gap-1 pt-0.5"
                    >
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Form Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-champagne)] text-[var(--color-charcoal)] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[var(--color-champagne-light)] hover:shadow-[0_0_24px_rgba(229,180,91,0.2)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-charcoal)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Prepare &amp; Launch Email</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyDraft}
                    disabled={!formData.name && !formData.message}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)] text-xs font-mono text-[var(--color-ivory-muted)] hover:text-[var(--color-ivory)] hover:border-[var(--color-champagne)]/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-champagne)]"
                    title="Copy full message draft to clipboard"
                  >
                    {copiedDraft ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[var(--color-emerald)]" />
                        <span className="text-[var(--color-emerald)]">Draft Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message Draft</span>
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Truthful Dispatch Status Notification Banner */}
              {mailDispatched && (
                <div
                  role="status"
                  className="rounded-lg border border-[var(--color-emerald)]/40 bg-[var(--color-charcoal)] p-4 space-y-2 text-xs font-mono"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2 text-[var(--color-emerald)] font-semibold">
                    <Check className="w-4 h-4" />
                    <span>Mail Client Protocol Triggered</span>
                  </div>
                  <p className="text-[var(--color-ivory-muted)] leading-relaxed">
                    Your local email client has been opened with your pre-formatted inquiry addressed to <strong className="text-[var(--color-ivory)]">{RECIPIENT_EMAIL}</strong>. Please click &ldquo;Send&rdquo; inside your email app to complete transmission.
                  </p>
                  <p className="text-[11px] text-[var(--color-ivory-subtle)]">
                    If your client did not launch automatically, click &ldquo;Copy Message Draft&rdquo; above and paste it directly into your preferred webmail service.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setMailDispatched(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                        setSubmittedAttempt(false);
                        setTouched({ name: false, email: false, subject: false, message: false });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--color-charcoal-surface)] border border-[var(--color-charcoal-border)] hover:border-[var(--color-champagne)]/40 text-[11px] font-mono text-[var(--color-ivory)] hover:text-[var(--color-champagne)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                    >
                      <span>Reset Form / New Message</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMailDispatched(false)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-mono text-[var(--color-ivory-subtle)] hover:text-[var(--color-ivory)] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-champagne)]"
                    >
                      <span>Dismiss Banner</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
