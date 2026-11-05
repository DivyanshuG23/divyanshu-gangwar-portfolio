import React, { useState } from 'react';
import { PERSONAL_INFO } from '../types';
import {
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Mail,
  Sparkles,
  Terminal,
  MessageSquare,
  CheckCircle2,
  RefreshCw,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagnetic } from '../hooks/useMagnetic';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';
import { submitContactInquiry } from '../services/contactService';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TOPIC_PRESETS = [
  'Internship Opportunity',
  'Software Engineering Role',
  'Project Collaboration',
  'Technical Discussion',
];

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Internship Opportunity',
    message: '',
    _gotcha: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error'
  >('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [lastSubmittedInfo, setLastSubmittedInfo] = useState<{
    name: string;
    email: string;
    topic: string;
  }>({
    name: '',
    email: '',
    topic: 'Internship Opportunity',
  });

  // Decoupled scroll-reveal hooks for scroll-speed independence and bidirectional repeat
  const { ref: sectionRef, getRevealClass } = useScrollReveal();
  const { ref: contentRef, isVisible: isContentVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  // Magnetic button hook for interactive submit CTA
  const submitBtnRef = useMagnetic<HTMLButtonElement>({ strength: 0.22, maxOffset: 8 });

  // 3D Tilt Reflection hooks for Contact cards
  const { ref: emailCardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 3.5,
    glowColor: 'champagne',
  });

  const { ref: profilesCardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 3.0,
    glowColor: 'champagne',
  });

  const { ref: inquiryCardRef } = useTiltReflection<HTMLDivElement>({
    maxTilt: 2.0,
    glowColor: 'champagne',
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
      const textArea = document.createElement('textarea');
      textArea.value = PERSONAL_INFO.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionStatus === 'submitting') return; // Prevent duplicate concurrent submissions

    // Client-side validation
    const errors: { name?: string; email?: string; message?: string } = {};
    const trimmedName = formState.name.trim();
    const trimmedEmail = formState.email.trim();
    const trimmedMessage = formState.message.trim();

    if (!trimmedName) {
      errors.name = 'Please provide your name.';
    } else if (trimmedName.length > 100) {
      errors.name = 'Name must not exceed 100 characters.';
    }

    if (!trimmedEmail) {
      errors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address format.';
    }

    if (!trimmedMessage) {
      errors.message = 'Please provide your message.';
    } else if (trimmedMessage.length < 5) {
      errors.message = 'Message must be at least 5 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setSubmissionStatus('submitting');
    setFeedbackMessage('');

    const currentTopic = formState.topic;
    const currentName = trimmedName;
    const currentEmail = trimmedEmail;

    try {
      const result = await submitContactInquiry({
        name: trimmedName,
        email: trimmedEmail,
        topic: formState.topic,
        message: trimmedMessage,
        _gotcha: formState._gotcha,
      });

      if (result.success) {
        setLastSubmittedInfo({
          name: currentName,
          email: currentEmail,
          topic: currentTopic,
        });
        setSubmissionStatus('success');
        setFeedbackMessage(result.message);
        // Clear form fields on confirmed provider acceptance
        setFormState({
          name: '',
          email: '',
          topic: 'Internship Opportunity',
          message: '',
          _gotcha: '',
        });
      } else {
        setSubmissionStatus('error');
        setFeedbackMessage(result.message);
      }
    } catch (err) {
      setSubmissionStatus('error');
      setFeedbackMessage(
        (err as Error).message ||
          'Delivery service is unreachable. Please email divyanshugangwar663@gmail.com directly.'
      );
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 sm:py-32 border-t border-[#1F222A] relative bg-[#090909] overflow-hidden"
      aria-label="Contact Studio"
    >
      {/* Restrained Ambient Studio Lighting (Champagne & Emerald) */}
      <div
        className="absolute top-1/4 -left-48 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #E5B45B 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-0 w-[420px] h-[420px] rounded-full pointer-events-none blur-[160px] opacity-20"
        style={{ background: 'radial-gradient(circle, #059669 0%, transparent 70%)' }}
      />

      {/* Technical Precision Coordinate Grid Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1F222A_1px,transparent_1px),linear-gradient(to_bottom,#1F222A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
      />

      {/* Communication Radar Beacon Background Graphic */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute -top-12 -left-12 w-80 h-80 select-none pointer-events-none opacity-20"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full animate-tech-spin">
          <circle cx="100" cy="100" r="85" fill="none" stroke="#E5B45B" strokeWidth="0.8" strokeDasharray="3 6" />
          <circle cx="100" cy="100" r="55" fill="none" stroke="#059669" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="100" y1="15" x2="100" y2="185" stroke="#1F222A" strokeWidth="0.8" />
          <line x1="15" y1="100" x2="185" y2="100" stroke="#1F222A" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Communication-Inspired Network of Glowing Nodes & Routing Paths */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden opacity-30"
      >
        <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="none">
          {/* Signal Dispatch Routes */}
          <path d="M 180 200 Q 400 350 700 240 T 1050 320" fill="none" stroke="#E5B45B" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
          <path d="M 120 480 Q 450 420 820 540 T 1100 460" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
          <line x1="700" y1="240" x2="820" y2="540" stroke="#1F222A" strokeWidth="0.8" strokeDasharray="2 4" />
          
          {/* Glowing Transceiver Nodes */}
          <circle cx="180" cy="200" r="3.5" fill="#E5B45B" />
          <circle cx="700" cy="240" r="4.5" fill="#059669" className="animate-tech-node" />
          <circle cx="700" cy="240" r="14" fill="none" stroke="#059669" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="820" cy="540" r="4.5" fill="#E5B45B" className="animate-tech-node" />
          <circle cx="820" cy="540" r="14" fill="none" stroke="#E5B45B" strokeWidth="0.6" strokeOpacity="0.4" />
          <circle cx="1100" cy="460" r="3.5" fill="#059669" />
        </svg>
      </div>

      {/* Dedicated Left Side Communication Link Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-4 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-emerald-400 font-semibold">// 08_COMM</span>
        <div className="w-px h-36 bg-gradient-to-b from-emerald-500/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-4 -left-1.5 w-3 h-px bg-emerald-400/60" />
          <div className="absolute top-16 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-28 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
        </div>
        <span className="text-[8px] text-neutral-600">DISPATCH</span>
      </div>

      {/* Dedicated Right Side Signal Routing Marker (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-end gap-2 absolute right-6 top-36 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded border border-[#1F222A] bg-[#0E1116] text-[#E5B45B] text-[8px] tracking-wider uppercase">
          LINK // 24_7_ONLINE
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#1F222A]" />
        <span className="text-[8px] text-neutral-600">INBOX_READY</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Opening / Editorial Eyebrow & Heroic Headline */}
        <div className={`mb-16 sm:mb-24 ${getRevealClass(0, 'up')}`}>
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 mb-4">
            <span className="text-[#E5B45B] font-semibold">// 08</span>
            <span className="text-neutral-700">·</span>
            <span>Contact Studio</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F0E6] font-sans max-w-[1000px] leading-[1.08] sm:leading-[1.06]">
            Let&apos;s build something{' '}
            <span className="relative inline-block text-[#E5B45B] font-serif italic font-normal">
              intelligent.
              <span
                aria-hidden="true"
                className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-[2px] bg-gradient-to-r from-[#E5B45B] via-[#E5B45B]/60 to-transparent"
              />
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#8A8F98] max-w-[660px] mt-6 font-editorial leading-relaxed">
            Open to software engineering roles, full-stack internships, and technical collaborations.
            Whether you represent a recruiting team, a high-growth startup, or an open-source project,
            let&apos;s initiate a direct conversation.
          </p>
        </div>

        {/* Main Editorial Split (Left: Identity & Direct Connections / Right: Inquiry Studio) */}
        <div
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          
          {/* Left Column: Contact Identity & Connections (5 cols on lg) */}
          <div
            className={`lg:col-span-5 flex flex-col gap-8 contact-card-assembly-wrapper ${
              isContentVisible
                ? 'contact-card-assembly-visible'
                : 'contact-card-assembly-hidden-left'
            }`}
          >
            
            {/* Availability Indicator Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0D0F14] border border-[#1F222A] self-start shadow-sm hover:border-emerald-500/40 transition-colors">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#059669] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#059669]" />
              </span>
              <span className="font-mono text-xs text-[#059669] font-medium tracking-wide">
                {PERSONAL_INFO.availabilityStatus}
              </span>
              <span className="text-neutral-700 text-xs font-mono">|</span>
              <span className="text-xs font-mono text-[#8A8F98]">CSE &apos;27</span>
            </div>

            {/* Direct Email Card with 3D Tilt and Reflection Glow */}
            <div
              ref={emailCardRef}
              className="rounded-2xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-7 relative group hover:border-[#E5B45B]/50 transition-all duration-500 shadow-xl overflow-hidden"
            >
              {/* Permanent Champagne Rotating Border Streak */}
              <div
                aria-hidden="true"
                className="champagne-border-streak"
                style={{ animationDuration: '9s' }}
              />

              {/* Dynamic Reflection Glow & Cursor Spotlight */}
              <CardReflectionGlow
                glowColor="champagne"
                isRevealed={isContentVisible}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-[#E5B45B]">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct Communication</span>
                  </span>
                  <span className="text-neutral-500">Primary Channel</span>
                </div>

                <div className="mb-5">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="text-[13px] sm:text-base lg:text-xl font-mono font-medium text-[#F5F0E6] hover:text-[#E5B45B] transition-colors break-words [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E5B45B]"
                    aria-label={`Send direct email to ${PERSONAL_INFO.email}`}
                  >
                    {PERSONAL_INFO.email}
                  </a>
                  <p className="text-xs text-[#8A8F98] font-editorial mt-1.5">
                    Direct developer inbox for recruiters and project leads.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F222A] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#14171F] border border-[#262B36] hover:border-[#E5B45B]/50 hover:bg-[#E5B45B]/10 text-xs font-mono text-neutral-300 hover:text-[#F5F0E6] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B]"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#059669]" />
                        <span className="text-[#059669]">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-[#E5B45B] transition-colors group/send"
                    aria-label="Launch email application"
                  >
                    <span>Launch Mail</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5 group-hover/send:text-[#E5B45B] transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Professional Profiles Card with 3D Tilt and Reflection Glow */}
            <div
              ref={profilesCardRef}
              className="rounded-2xl bg-[#0D0F14] border border-[#1F222A] p-6 sm:p-7 shadow-xl relative group hover:border-[#E5B45B]/40 transition-all duration-500 overflow-hidden"
            >
              {/* Dynamic Reflection Glow */}
              <CardReflectionGlow
                glowColor="champagne"
                isRevealed={isContentVisible}
              />

              <div className="relative z-10">
                <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mb-4 flex items-center justify-between">
                  <span>Verified Profiles</span>
                  <span>External Hubs</span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* LinkedIn */}
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between p-3.5 rounded-xl bg-[#12151D] border border-[#1F222A] hover:border-[#E5B45B]/40 hover:bg-[#161A24] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B]"
                    aria-label="Divyanshu Gangwar's LinkedIn Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0A0C10] border border-[#1F222A] text-neutral-400 group-hover/link:text-[#E5B45B] transition-colors">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-[#F5F0E6] group-hover/link:text-[#E5B45B] transition-colors">
                          LinkedIn Network
                        </div>
                        <div className="text-[11px] text-[#8A8F98] font-editorial">
                          Career history &amp; professional recommendations
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover/link:text-[#E5B45B] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
                  </a>

                  {/* GitHub */}
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between p-3.5 rounded-xl bg-[#12151D] border border-[#1F222A] hover:border-[#E5B45B]/40 hover:bg-[#161A24] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B]"
                    aria-label="Divyanshu Gangwar's GitHub Profile (opens in new tab)"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#0A0C10] border border-[#1F222A] text-neutral-400 group-hover/link:text-[#E5B45B] transition-colors">
                        <GithubIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-mono font-medium text-[#F5F0E6] group-hover/link:text-[#E5B45B] transition-colors">
                          GitHub Source Code
                        </div>
                        <div className="text-[11px] text-[#8A8F98] font-editorial">
                          Repositories, code commits &amp; architecture
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover/link:text-[#E5B45B] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Engineering Dossier Footnote */}
            <div className="px-2 py-1 flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Terminal className="w-3.5 h-3.5 text-[#E5B45B]" />
              <span>Full-Stack Development · MERN Architecture · Applied AI</span>
            </div>

          </div>

          {/* Right Column: Inquiry Studio Panel (7 cols on lg) */}
          <div
            className={`lg:col-span-7 contact-card-assembly-wrapper ${
              isContentVisible
                ? 'contact-card-assembly-visible'
                : 'contact-card-assembly-hidden-right'
            }`}
            style={{
              transitionDelay: isContentVisible ? '140ms' : '0ms',
            }}
          >
            <div
              ref={inquiryCardRef}
              className="rounded-3xl bg-[#0D0F14] border border-[#1F222A] p-7 sm:p-10 relative overflow-hidden shadow-2xl hover:border-[#E5B45B]/30 transition-all duration-500"
            >
              
              {/* Dual-color champagne-to-emerald gradient hairline accent */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5B45B]/60 via-emerald-500/40 to-transparent"
              />

              {/* Dynamic Reflection Glow */}
              <CardReflectionGlow
                glowColor="champagne"
                isRevealed={isContentVisible}
              />

              <div className="relative z-10 mb-8">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#E5B45B] uppercase tracking-wider mb-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>// Inquiry Studio</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#F5F0E6] font-sans tracking-tight">
                  Start a conversation
                </h3>
                <p className="text-xs sm:text-sm text-[#8A8F98] font-editorial mt-2 leading-relaxed">
                  Compose your inquiry below. Submitting will transmit your message directly to Divyanshu&apos;s verified inbox for private, prompt communication.
                </p>
              </div>

              {submissionStatus === 'success' ? (
                /* Honest Dispatch Confirmation */
                <div className="p-8 rounded-2xl bg-[#12151D] border border-emerald-500/30 text-center space-y-4 relative z-10 shadow-[0_0_24px_rgba(5,150,105,0.15)]">
                  <div className="w-14 h-14 rounded-full bg-[#059669]/15 border border-[#059669]/40 text-[#059669] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(5,150,105,0.25)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#F5F0E6] font-sans">
                      Inquiry Successfully Transmitted
                    </h4>
                    <p className="text-xs sm:text-sm text-[#8A8F98] font-editorial max-w-md mx-auto mt-2 leading-relaxed">
                      {feedbackMessage ||
                        `Thank you, ${lastSubmittedInfo.name || 'there'}! Your message regarding "${lastSubmittedInfo.topic}" has been delivered directly to Divyanshu's verified inbox (divyanshugangwar663@gmail.com). A reply will be sent to ${lastSubmittedInfo.email || 'your email'}.`}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0F14] border border-[#1F222A] text-[11px] font-mono text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Status: Dispatched to divyanshugangwar663@gmail.com</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1F222A] flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionStatus('idle');
                        setFeedbackMessage('');
                        setFieldErrors({});
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14171F] border border-[#262B36] hover:border-[#E5B45B]/40 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[#E5B45B]" />
                      <span>Send Another Message</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 relative z-10">
                  {/* Spam Honeypot Field (Invisible to human users, traps automated scrapers) */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formState._gotcha}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, _gotcha: e.target.value }))
                    }
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden absolute -left-[9999px] w-0 h-0 opacity-0 pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Topic Preset Selector */}
                  <div>
                    <span className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                      Inquiry Focus
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {TOPIC_PRESETS.map((topic) => {
                        const isSelected = formState.topic === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            disabled={submissionStatus === 'submitting'}
                            onClick={() => setFormState((prev) => ({ ...prev, topic }))}
                            className={`px-3 py-2.5 rounded-xl text-left text-xs font-mono transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                              isSelected
                                ? 'bg-[#E5B45B]/15 border-[#E5B45B]/70 text-[#F5F0E6] shadow-[0_0_16px_rgba(229,180,91,0.15)] font-medium'
                                : 'bg-[#12151D] border-[#1F222A] text-neutral-400 hover:text-neutral-200 hover:border-[#2A2E38]'
                            } ${submissionStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                            aria-pressed={isSelected}
                          >
                            <span className="truncate">{topic}</span>
                            {isSelected && (
                              <Sparkles className="w-3 h-3 text-[#E5B45B] shrink-0 ml-1" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2"
                      >
                        Your Name <span className="text-[#E5B45B]">*</span>
                      </label>
                      <input
                        id="sender-name"
                        name="name"
                        type="text"
                        required
                        disabled={submissionStatus === 'submitting'}
                        autoComplete="name"
                        value={formState.name}
                        onChange={(e) => {
                          setFormState((prev) => ({ ...prev, name: e.target.value }));
                          if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Jane Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-[#12151D] border text-sm text-[#F5F0E6] placeholder:text-neutral-600 focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? 'border-red-500/70 focus:ring-1 focus:ring-red-500/50'
                            : 'border-[#1F222A] focus:border-[#E5B45B]/70 focus:ring-1 focus:ring-[#E5B45B]/40'
                        } ${submissionStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] font-mono text-red-400 mt-1.5 flex items-center gap-1">
                          <span>{fieldErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="sender-email"
                        className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2"
                      >
                        Your Work Email <span className="text-[#E5B45B]">*</span>
                      </label>
                      <input
                        id="sender-email"
                        name="email"
                        type="email"
                        required
                        disabled={submissionStatus === 'submitting'}
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => {
                          setFormState((prev) => ({ ...prev, email: e.target.value }));
                          if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="jane@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#12151D] border text-sm text-[#F5F0E6] placeholder:text-neutral-600 focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? 'border-red-500/70 focus:ring-1 focus:ring-red-500/50'
                            : 'border-[#1F222A] focus:border-[#E5B45B]/70 focus:ring-1 focus:ring-[#E5B45B]/40'
                        } ${submissionStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] font-mono text-red-400 mt-1.5 flex items-center gap-1">
                          <span>{fieldErrors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Details */}
                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2"
                    >
                      Inquiry Details <span className="text-[#E5B45B]">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      required
                      disabled={submissionStatus === 'submitting'}
                      rows={4}
                      value={formState.message}
                      onChange={(e) => {
                        setFormState((prev) => ({ ...prev, message: e.target.value }));
                        if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Hello Divyanshu, we would like to discuss an opportunity..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#12151D] border text-sm text-[#F5F0E6] placeholder:text-neutral-600 focus:outline-none transition-colors resize-none leading-relaxed ${
                        fieldErrors.message
                          ? 'border-red-500/70 focus:ring-1 focus:ring-red-500/50'
                          : 'border-[#1F222A] focus:border-[#E5B45B]/70 focus:ring-1 focus:ring-[#E5B45B]/40'
                      } ${submissionStatus === 'submitting' ? 'opacity-60 cursor-not-allowed' : ''}`}
                    />
                    {fieldErrors.message && (
                      <p className="text-[11px] font-mono text-red-400 mt-1.5 flex items-center gap-1">
                        <span>{fieldErrors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Error Notification Alert */}
                  {submissionStatus === 'error' && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs font-mono flex items-start gap-2.5 animate-fadeIn"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold">{feedbackMessage || 'Failed to transmit message.'}</p>
                        <p className="mt-1 text-neutral-400 text-[11px] font-sans">
                          You can also reach out directly to{' '}
                          <a
                            href={`mailto:${PERSONAL_INFO.email}`}
                            className="text-[#E5B45B] underline hover:text-[#F5F0E6]"
                          >
                            {PERSONAL_INFO.email}
                          </a>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button & Direct Inbox Indicator */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      ref={submitBtnRef}
                      type="submit"
                      disabled={submissionStatus === 'submitting'}
                      className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F5F0E6] to-[#E5B45B] hover:from-[#E5B45B] hover:to-[#D4A244] text-[#0B0D0C] font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md hover:shadow-[0_0_24px_rgba(229,180,91,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B45B] group ${
                        submissionStatus === 'submitting' ? 'opacity-70 cursor-wait' : ''
                      }`}
                    >
                      {submissionStatus === 'submitting' ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#0B0D0C]" />
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Direct Message</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>

                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Direct inbox delivery</span>
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
