import React from 'react';
import { Cpu, CheckCircle2, Layers, AlertCircle, Palette } from 'lucide-react';
import { THEME_COLORS } from '../utils/theme';

/**
 * StatusPage
 * Minimal foundation verification view confirming active router,
 * design token integration, and baseline styling without dummy template content.
 */
export default function StatusPage() {
  const tokenList = [
    { name: 'Charcoal', hex: THEME_COLORS.charcoal, role: 'Base Background & Surface' },
    { name: 'Champagne', hex: THEME_COLORS.champagne, role: 'Accent / Primary Brand' },
    { name: 'Emerald', hex: THEME_COLORS.emerald, role: 'Status Active / Success' },
    { name: 'Ruby', hex: THEME_COLORS.ruby, role: 'Warnings / Critical States' },
    { name: 'Warm Ivory', hex: THEME_COLORS.ivory, role: 'Typography / Primary Text' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-8 w-full">
      {/* System Status Banner */}
      <div className="rounded-lg border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-[var(--color-emerald)]/10 text-[var(--color-emerald)]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ivory)]">
              Technical Foundation Initialized
            </h1>
            <p className="text-xs font-mono text-[var(--color-ivory-muted)]">
              Architecture ready for 3D cinematic canvas & custom component development
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--color-charcoal-border)]">
          <div className="flex items-center gap-3 p-3 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)]">
            <Cpu className="w-4 h-4 text-[var(--color-champagne)]" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[var(--color-ivory-subtle)]">Runtime Engine</div>
              <div className="text-xs font-mono font-medium text-[var(--color-ivory)]">React + Vite</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)]">
            <Layers className="w-4 h-4 text-[var(--color-emerald)]" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[var(--color-ivory-subtle)]">Styling & Reset</div>
              <div className="text-xs font-mono font-medium text-[var(--color-ivory)]">Tailwind v4 + Tokens</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded bg-[var(--color-charcoal)] border border-[var(--color-charcoal-border)]">
            <AlertCircle className="w-4 h-4 text-[var(--color-ruby)]" />
            <div>
              <div className="text-[10px] font-mono uppercase text-[var(--color-ivory-subtle)]">Navigation</div>
              <div className="text-xs font-mono font-medium text-[var(--color-ivory)]">React Router Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Token Verification */}
      <div className="rounded-lg border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal-surface)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[var(--color-champagne)]" />
          <h2 className="text-sm font-mono uppercase tracking-wider text-[var(--color-ivory)]">
            Verified Theme Tokens
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {tokenList.map((token) => (
            <div
              key={token.name}
              className="p-3 rounded border border-[var(--color-charcoal-border)] bg-[var(--color-charcoal)] space-y-2"
            >
              <div
                className="w-full h-8 rounded border border-white/10"
                style={{ backgroundColor: token.hex }}
              />
              <div>
                <div className="text-xs font-medium text-[var(--color-ivory)]">{token.name}</div>
                <div className="text-[11px] font-mono text-[var(--color-champagne)]">{token.hex}</div>
                <div className="text-[10px] text-[var(--color-ivory-subtle)] leading-snug pt-1">
                  {token.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
