import React from 'react';

/**
 * Unified Technical Background System.
 * Renders fine engineering grid lines, animated circuit traces, architectural corner markers,
 * abstract 3D wireframe glyphs, and restrained champagne & emerald ambient lighting across the entire portfolio.
 * 
 * Stays strictly behind content (z-0, pointer-events-none, aria-hidden="true")
 * with 0 impact on accessibility, performance, or text contrast.
 */
export const TechnicalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Atmospheric Ambient Lighting Layers across the full page span */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-[radial-gradient(circle_at_top_right,rgba(229,180,91,0.038),transparent_70%)]" />
      <div className="absolute top-[25%] left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center_left,rgba(5,150,105,0.032),transparent_70%)]" />
      <div className="absolute top-[50%] right-[5%] w-[650px] h-[650px] bg-[radial-gradient(circle_at_center,rgba(229,180,91,0.028),transparent_70%)]" />
      <div className="absolute top-[75%] left-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center_left,rgba(5,150,105,0.03),transparent_70%)]" />
      <div className="absolute bottom-0 right-[15%] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(229,180,91,0.035),transparent_70%)]" />

      {/* 2. Fine Engineering Grid with Micro & Macro Crosshairs */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.38]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 48px Base Grid Unit */}
          <pattern
            id="eng-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="#1F222A"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
          </pattern>

          {/* 192px Macro Grid with Intersectional Crosshairs */}
          <pattern
            id="eng-macro-grid"
            width="192"
            height="192"
            patternUnits="userSpaceOnUse"
          >
            <rect width="192" height="192" fill="url(#eng-grid-pattern)" />
            {/* Corner Crosshairs (+) at macro vertices */}
            <path
              d="M 0 6 L 0 -6 M -6 0 L 6 0"
              stroke="#E5B45B"
              strokeWidth="1"
              strokeOpacity="0.35"
            />
          </pattern>

          {/* Vignette mask so grid smoothly dissipates at page borders */}
          <radialGradient id="vignette-mask" cx="50%" cy="50%" r="55%">
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#vignette-mask)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#eng-macro-grid)"
          mask="url(#grid-mask)"
        />
      </svg>

      {/* 3. Animated Technical Circuit Traces & Glowing Bus Rails (Left Margin) */}
      <svg
        className="hidden xl:block absolute left-4 top-0 h-full w-28 opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 112 3600"
        preserveAspectRatio="none"
      >
        {/* Static Background Circuit Path */}
        <path
          d="M 28 80 L 28 480 L 56 508 L 56 960 L 36 980 L 36 1480 L 64 1508 L 64 2040 L 28 2076 L 28 2600 L 56 2628 L 56 3120 L 32 3144 L 32 3550"
          fill="none"
          stroke="#1F222A"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Animated Light Flow Trail */}
        <path
          d="M 28 80 L 28 480 L 56 508 L 56 960 L 36 980 L 36 1480 L 64 1508 L 64 2040 L 28 2076 L 28 2600 L 56 2628 L 56 3120 L 32 3144 L 32 3550"
          fill="none"
          stroke="#E5B45B"
          strokeWidth="1.5"
          className="animate-circuit-flow opacity-75"
        />
        {/* Active Node Vertices with Pulse */}
        <circle cx="28" cy="480" r="3" fill="#E5B45B" className="animate-tech-node" />
        <circle cx="56" cy="960" r="3" fill="#059669" className="animate-tech-node" />
        <circle cx="36" cy="1480" r="3" fill="#E5B45B" className="animate-tech-node" />
        <circle cx="64" cy="2040" r="3" fill="#059669" className="animate-tech-node" />
        <circle cx="28" cy="2600" r="3" fill="#E5B45B" className="animate-tech-node" />
        <circle cx="56" cy="3120" r="3" fill="#059669" className="animate-tech-node" />
      </svg>

      {/* 4. Animated Technical Circuit Traces & Glowing Bus Rails (Right Margin) */}
      <svg
        className="hidden xl:block absolute right-4 top-0 h-full w-28 opacity-40"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 112 3600"
        preserveAspectRatio="none"
      >
        {/* Static Background Circuit Path */}
        <path
          d="M 84 140 L 84 640 L 56 668 L 56 1160 L 76 1180 L 76 1720 L 48 1748 L 48 2260 L 84 2296 L 84 2820 L 56 2848 L 56 3300 L 80 3324 L 80 3560"
          fill="none"
          stroke="#1F222A"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        {/* Animated Light Flow Trail */}
        <path
          d="M 84 140 L 84 640 L 56 668 L 56 1160 L 76 1180 L 76 1720 L 48 1748 L 48 2260 L 84 2296 L 84 2820 L 56 2848 L 56 3300 L 80 3324 L 80 3560"
          fill="none"
          stroke="#059669"
          strokeWidth="1.5"
          className="animate-circuit-flow opacity-75"
        />
        {/* Active Node Vertices with Pulse */}
        <circle cx="84" cy="640" r="3" fill="#059669" className="animate-tech-node" />
        <circle cx="56" cy="1160" r="3" fill="#E5B45B" className="animate-tech-node" />
        <circle cx="76" cy="1720" r="3" fill="#059669" className="animate-tech-node" />
        <circle cx="48" cy="2260" r="3" fill="#E5B45B" className="animate-tech-node" />
        <circle cx="84" cy="2820" r="3" fill="#059669" className="animate-tech-node" />
        <circle cx="56" cy="3300" r="3" fill="#E5B45B" className="animate-tech-node" />
      </svg>

      {/* 5. Abstract 3D Geometric Wireframe Glyph (Floating Upper-Right) */}
      <div className="hidden 2xl:block absolute top-24 right-16 w-36 h-36 opacity-25">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-tech-spin">
          {/* Outer Octagon */}
          <polygon
            points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
            fill="none"
            stroke="#E5B45B"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />
          {/* Inner Geometric Diamond */}
          <polygon
            points="50,15 85,50 50,85 15,50"
            fill="none"
            stroke="#059669"
            strokeWidth="0.8"
          />
          {/* Central Target Circle */}
          <circle cx="50" cy="50" r="16" fill="none" stroke="#E5B45B" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="3" fill="#E5B45B" />
        </svg>
      </div>

      {/* 6. Abstract 3D Isometric Cube Wireframe Glyph (Floating Mid-Left) */}
      <div className="hidden 2xl:block absolute top-[48%] left-16 w-32 h-32 opacity-25">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-tech-spin-reverse">
          {/* Isometric Cube Wireframe */}
          <polygon points="50,10 90,32 50,55 10,32" fill="none" stroke="#E5B45B" strokeWidth="0.8" />
          <polygon points="10,32 50,55 50,95 10,72" fill="none" stroke="#059669" strokeWidth="0.8" />
          <polygon points="90,32 50,55 50,95 90,72" fill="none" stroke="#E5B45B" strokeWidth="0.8" />
          <line x1="50" y1="55" x2="50" y2="95" stroke="#F5F0E6" strokeWidth="0.8" opacity="0.6" />
        </svg>
      </div>

      {/* 7. Fine Architectural Hairline Side Rails with Coordinate Scale Ticks */}
      <div className="hidden 2xl:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1F222A]/50 to-transparent">
        <div className="absolute top-[10%] left-0 w-2 h-px bg-[#E5B45B]/60" />
        <div className="absolute top-[25%] left-0 w-3 h-px bg-[#1F222A]" />
        <div className="absolute top-[40%] left-0 w-2 h-px bg-[#059669]/60" />
        <div className="absolute top-[55%] left-0 w-3 h-px bg-[#1F222A]" />
        <div className="absolute top-[70%] left-0 w-2 h-px bg-[#E5B45B]/60" />
        <div className="absolute top-[85%] left-0 w-3 h-px bg-[#059669]/60" />
      </div>

      <div className="hidden 2xl:block absolute right-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#1F222A]/50 to-transparent">
        <div className="absolute top-[10%] right-0 w-2 h-px bg-[#059669]/60" />
        <div className="absolute top-[25%] right-0 w-3 h-px bg-[#1F222A]" />
        <div className="absolute top-[40%] right-0 w-2 h-px bg-[#E5B45B]/60" />
        <div className="absolute top-[55%] right-0 w-3 h-px bg-[#1F222A]" />
        <div className="absolute top-[70%] right-0 w-2 h-px bg-[#059669]/60" />
        <div className="absolute top-[85%] right-0 w-2 h-px bg-[#E5B45B]/60" />
      </div>
    </div>
  );
};
