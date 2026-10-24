import React from 'react';

/**
 * Cinematic Tech Brand & Architectural SVG Logos
 * Styled strictly in charcoal, champagne, emerald, and ivory.
 * Zero external requests, zero unverified dependencies, crisp vector fidelity.
 */

export function ReactLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true" {...props}>
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function JavaScriptLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 16.5c0 .83-.67 1.5-1.5 1.5S6 17.33 6 16.5" />
      <path d="M14 8.5v6.5c0 1.66-1.34 3-3 3h-.5" />
      <path d="M14 13.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5" />
      <path d="M14.5 11.5c1.1 0 2-.9 2-2s-.9-2-2-2" />
    </svg>
  );
}

export function Html5Logo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M4 3l1.8 17.2L12 22l6.2-1.8L20 3H4z" />
      <path d="M7.5 7.5h9l-.5 4.5H8.2l.3 3.5 3.5 1 3.5-1 .3-2.5" />
    </svg>
  );
}

export function Css3Logo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M4 3l1.8 17.2L12 22l6.2-1.8L20 3H4z" />
      <path d="M16.5 7.5H7.5l.5 4.5h7.5l-.5 4.5-3 .9-3-.9-.2-2" />
    </svg>
  );
}

export function TailwindLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M6 13.5c1.5-3 3.5-4 5.5-2.5 1.5 1.1 2.5 1.5 4.5.5 2-1 3-3 3.5-4.5-1.5 3-3.5 4-5.5 2.5-1.5-1.1-2.5-1.5-4.5-.5-2 1-3 3-3.5 4.5z" />
      <path d="M2.5 18c1.2-2.4 2.8-3.2 4.4-2 1.2.9 2 1.2 3.6.4 1.6-.8 2.4-2.4 2.8-3.6-1.2 2.4-2.8 3.2-4.4 2-1.2-.9-2-1.2-3.6-.4-1.6.8-2.4 2.4-2.8 3.6z" />
    </svg>
  );
}

export function BootstrapLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M9 7.5h4a2.5 2.5 0 0 1 2.5 2.5c0 1-.6 1.9-1.5 2.3 1.2.4 2 1.5 2 2.7a3 3 0 0 1-3 3H9v-10.5z" />
      <path d="M12 11h1a1.5 1.5 0 0 0 0-3h-1v3z" />
      <path d="M12 15h1.5a1.5 1.5 0 0 0 0-3H12v3z" />
    </svg>
  );
}

export function ResponsiveLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="2" y="3" width="20" height="13" rx="2" />
      <path d="M7 21h10" />
      <path d="M12 16v5" />
      <rect x="15" y="8" width="6" height="11" rx="1" fill="var(--color-charcoal)" stroke="currentColor" />
      <circle cx="18" cy="16.5" r=".5" fill="currentColor" />
    </svg>
  );
}

export function NodeLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" />
      <path d="M12 7v5l4.5 2.5" />
      <path d="M7.5 14.5L12 12" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ExpressLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M7 9l4 6" />
      <path d="M11 9l-4 6" />
      <path d="M14 9h3.5v2.5H14v3.5h3.5" />
    </svg>
  );
}

export function RestApiLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="6" r="3" />
      <circle cx="19" cy="18" r="3" />
      <path d="M8 12h3m0 0l5-4.5m-5 4.5l5 4.5" />
      <path d="M13 10l-2 2 2 2" />
    </svg>
  );
}

export function MvcLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="4.5" rx="1.5" />
      <rect x="3" y="9.75" width="18" height="4.5" rx="1.5" />
      <rect x="3" y="16.5" width="18" height="4.5" rx="1.5" />
      <path d="M7 7.5v2.25M17 7.5v2.25M7 14.25v2.25M17 14.25v2.25" />
    </svg>
  );
}

export function MiddlewareLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M3 6h7" />
      <path d="M14 6h7" />
      <circle cx="12" cy="6" r="2" />
      <path d="M3 18h4" />
      <path d="M11 18h10" />
      <circle cx="9" cy="18" r="2" />
      <path d="M12 8v4l3 2" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MongoLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M12 2C9 7 6 11 6 15a6 6 0 0 0 12 0c0-4-3-8-6-13z" />
      <path d="M12 2v20" />
    </svg>
  );
}

export function MySqlLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
      <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M12 9v9" />
    </svg>
  );
}

export function GitLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" />
      <circle cx="9.5" cy="9.5" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="14.5" r="1.75" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="14.5" r="1.75" fill="currentColor" stroke="none" />
      <path d="M9.5 9.5v5M9.5 12h3a2 2 0 0 1 2 2" />
    </svg>
  );
}

export function GitHubLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function PostmanLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l8-5-3 10-2-3-3-2z" />
      <path d="M13 14l-3-2" />
    </svg>
  );
}

export function JwtLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="6" cy="12" r="3" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="18" cy="12" r="3" />
      <path d="M9 12h0M15 12h0" strokeWidth="2.5" />
      <path d="M3 7h18M3 17h18" strokeDasharray="2 2" />
    </svg>
  );
}

export function BcryptLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V6a4 4 0 0 1 8 0v4" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 16.5v2" />
    </svg>
  );
}

export function JavaLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M18 10h1a3 3 0 0 1 0 6h-1" />
      <path d="M4 10h14v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6z" />
      <path d="M8 2c0 2 2 3 2 4M12 2c0 2 2 3 2 4M16 2c0 2 2 3 2 4" />
      <path d="M3 21h18" />
    </svg>
  );
}

export function PythonLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <path d="M11.5 3c-4 0-5 1.5-5 3.5v2.5h5v1H5c-2 0-3.5 1-3.5 4s1.5 4 3.5 4h1.5v-2c0-1.5 1.5-3 3-3h5c1.5 0 2.5-1 2.5-2.5V6.5c0-2-1.5-3.5-5.5-3.5z" />
      <circle cx="8" cy="6" r="1" fill="currentColor" stroke="none" />
      <path d="M12.5 21c4 0 5-1.5 5-3.5v-2.5h-5v-1h6.5c2 0 3.5-1 3.5-4s-1.5-4-3.5-4h-1.5v2c0 1.5-1.5 3-3 3h-5c-1.5 0-2.5 1-2.5 2.5v3.5c0 2 1.5 3.5 5.5 3.5z" />
      <circle cx="16" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DsaLogo({ className = 'w-5 h-5', ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M10.2 7.2L7.8 15.8M13.8 7.2l2.4 8.6" />
      <path d="M8.5 18h7" strokeDasharray="2 2" />
    </svg>
  );
}
