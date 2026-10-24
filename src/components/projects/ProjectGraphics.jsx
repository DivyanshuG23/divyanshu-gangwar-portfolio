import React from 'react';

/**
 * ProjectGraphics
 * Custom art-directed SVG architectural visuals for each confirmed project.
 * Designed to represent the computer science concepts behind each application
 * without fabricating false application screenshots.
 */

export function FlowForgeGraphic({ className = 'w-full h-full' }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center p-6 bg-gradient-to-br from-[#141816] to-[#0B0D0C] ${className}`} aria-hidden="true">
      {/* Background Architectural Grid with Subtle Vignette */}
      <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="flowgrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E5B45B" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#flowgrid)" />
      </svg>

      {/* Node Pipeline Diagram */}
      <svg className="relative z-10 w-full max-w-[420px]" viewBox="0 0 380 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow Filters */}
        <defs>
          <filter id="forge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connection Conduits */}
        <path d="M 60 90 L 140 90" stroke="#E5B45B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" className="animate-conduit-flow" />
        <path d="M 190 90 L 270 90" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.8" className="animate-conduit-flow" />
        <path d="M 165 65 L 165 40 L 270 40" stroke="#E5B45B" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="animate-conduit-flow" />
        <path d="M 165 115 L 165 140 L 270 140" stroke="#059669" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" className="animate-conduit-flow" />

        {/* Node 1: Input Trigger */}
        <rect x="20" y="65" width="40" height="50" rx="6" fill="#1B211E" stroke="#E5B45B" strokeWidth="1" />
        <circle cx="40" cy="85" r="5" fill="#E5B45B" />
        <text x="40" y="105" fill="#B3ADA3" fontSize="8" fontFamily="monospace" textAnchor="middle">IN_01</text>

        {/* Node 2: Core AI Inference Hub */}
        <rect x="140" y="55" width="50" height="70" rx="8" fill="#1B211E" stroke="#E5B45B" strokeWidth="1.5" />
        <circle cx="165" cy="85" r="10" fill="#0B0D0C" stroke="#059669" strokeWidth="2" />
        <circle cx="165" cy="85" r="4" fill="#059669" className="animate-pulse" filter="url(#forge-glow)" />
        <text x="165" y="115" fill="#E5B45B" fontSize="8" fontFamily="monospace" textAnchor="middle">FORGE</text>

        {/* Output Branch A */}
        <rect x="270" y="25" width="80" height="30" rx="4" fill="#1B211E" stroke="#2A302D" strokeWidth="1" />
        <circle cx="285" cy="40" r="3" fill="#E5B45B" />
        <text x="320" y="43" fill="#F5F0E6" fontSize="8" fontFamily="monospace">PROMPT_RES</text>

        {/* Output Branch B (Primary Target) */}
        <rect x="270" y="75" width="90" height="30" rx="4" fill="#1B211E" stroke="#059669" strokeWidth="1" />
        <circle cx="285" cy="90" r="3" fill="#059669" />
        <text x="325" y="93" fill="#F5F0E6" fontSize="8" fontFamily="monospace">PIPELINE.EXEC</text>

        {/* Output Branch C */}
        <rect x="270" y="125" width="80" height="30" rx="4" fill="#1B211E" stroke="#2A302D" strokeWidth="1" />
        <circle cx="285" cy="140" r="3" fill="#B3ADA3" />
        <text x="320" y="143" fill="#B3ADA3" fontSize="8" fontFamily="monospace">TELEMETRY</text>
      </svg>
    </div>
  );
}

export function UrlShortenerGraphic({ className = 'w-full h-full' }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-[#161B18] to-[#0B0D0C] ${className}`} aria-hidden="true">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#059669_0.5px,transparent_0.5px)] [background-size:16px_16px]" />

      <svg className="relative z-10 w-full max-w-[280px]" viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Data Stream Line */}
        <line x1="20" y1="70" x2="260" y2="70" stroke="rgba(245, 240, 230, 0.1)" strokeWidth="1" />
        <line x1="20" y1="70" x2="140" y2="70" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 4" className="animate-conduit-flow" />
        <line x1="140" y1="70" x2="260" y2="70" stroke="#E5B45B" strokeWidth="1.5" />

        {/* Long URL Node */}
        <rect x="15" y="45" width="70" height="50" rx="6" fill="#1B211E" stroke="#2A302D" strokeWidth="1" />
        <text x="50" y="68" fill="#78736B" fontSize="8" fontFamily="monospace" textAnchor="middle">RAW_URL</text>
        <text x="50" y="82" fill="#B3ADA3" fontSize="9" fontFamily="monospace" textAnchor="middle">/path/to/res</text>

        {/* Hash Generator Node */}
        <circle cx="140" cy="70" r="22" fill="#1B211E" stroke="#059669" strokeWidth="1.5" />
        <path d="M 134 65 L 146 75 M 146 65 L 134 75" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
        <text x="140" y="105" fill="#059669" fontSize="8" fontFamily="monospace" textAnchor="middle">HASH // CRC32</text>

        {/* Shortened URL Node */}
        <rect x="195" y="45" width="70" height="50" rx="6" fill="#1B211E" stroke="#E5B45B" strokeWidth="1" />
        <text x="230" y="68" fill="#E5B45B" fontSize="8" fontFamily="monospace" textAnchor="middle">SHORT_SLUG</text>
        <text x="230" y="82" fill="#F5F0E6" fontSize="9" fontFamily="monospace" textAnchor="middle">lnk.io/8xQ2</text>
      </svg>
    </div>
  );
}

export function ExpenseFlowGraphic({ className = 'w-full h-full' }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-[#181614] to-[#0B0D0C] ${className}`} aria-hidden="true">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#E5B45B_0.5px,transparent_0.5px)] [background-size:16px_16px]" />

      <svg className="relative z-10 w-full max-w-[280px]" viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ledger Axis */}
        <line x1="30" y1="110" x2="250" y2="110" stroke="#2A302D" strokeWidth="1" />
        <line x1="30" y1="30" x2="30" y2="110" stroke="#2A302D" strokeWidth="1" />

        {/* Metric Bars */}
        <rect x="50" y="65" width="18" height="45" rx="3" fill="#1B211E" stroke="#E5B45B" strokeWidth="1" />
        <rect x="90" y="45" width="18" height="65" rx="3" fill="#1B211E" stroke="#059669" strokeWidth="1" />
        <rect x="130" y="80" width="18" height="30" rx="3" fill="#1B211E" stroke="#2A302D" strokeWidth="1" />
        <rect x="170" y="40" width="18" height="70" rx="3" fill="#1B211E" stroke="#E5B45B" strokeWidth="1.5" />
        <rect x="210" y="55" width="18" height="55" rx="3" fill="#1B211E" stroke="#059669" strokeWidth="1" />

        {/* Balance Trend Curve */}
        <path d="M 59 65 Q 99 35 139 80 T 219 55" fill="none" stroke="#E5B45B" strokeWidth="1.5" strokeDasharray="4 4" className="animate-conduit-flow" />
        <circle cx="179" cy="40" r="4" fill="#E5B45B" />

        {/* Legend */}
        <text x="140" y="128" fill="#B3ADA3" fontSize="8" fontFamily="monospace" textAnchor="middle">
          BALANCE STREAM &bull; REAL-TIME LEDGER
        </text>
      </svg>
    </div>
  );
}

export function ResumeAnalyzerGraphic({ className = 'w-full h-full' }) {
  return (
    <div className={`relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-[#141917] to-[#0B0D0C] ${className}`} aria-hidden="true">
      {/* Background Micro Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#059669_0.5px,transparent_0.5px)] [background-size:16px_16px]" />

      <svg className="relative z-10 w-full max-w-[280px]" viewBox="0 0 280 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Document Silhouette Frame */}
        <rect x="35" y="20" width="80" height="100" rx="4" fill="#1B211E" stroke="#2A302D" strokeWidth="1" />
        <line x1="45" y1="35" x2="85" y2="35" stroke="#E5B45B" strokeWidth="2" strokeLinecap="round" />
        <line x1="45" y1="50" x2="105" y2="50" stroke="#78736B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="45" y1="65" x2="95" y2="65" stroke="#78736B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="45" y1="80" x2="100" y2="80" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="45" y1="95" x2="75" y2="95" stroke="#78736B" strokeWidth="1.5" strokeLinecap="round" />

        {/* Scan Conduits */}
        <path d="M 115 70 L 160 70" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 3" className="animate-conduit-flow" />

        {/* ATS Evaluation Radar Gauge */}
        <circle cx="205" cy="70" r="35" fill="#1B211E" stroke="#2A302D" strokeWidth="1" />
        <circle cx="205" cy="70" r="24" fill="none" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 4" className="animate-conduit-flow" />
        <circle cx="205" cy="70" r="10" fill="#059669" fillOpacity="0.2" stroke="#059669" strokeWidth="1" />

        <text x="205" y="73" fill="#F5F0E6" fontSize="10" fontFamily="monospace" fontWeight="600" textAnchor="middle">ATS</text>
        <text x="205" y="122" fill="#059669" fontSize="8" fontFamily="monospace" textAnchor="middle">MATCH: EVALUATING</text>
      </svg>
    </div>
  );
}
