import React from 'react';
import { Award, GraduationCap, MapPin } from 'lucide-react';
import svmLogo from '../assets/svm-logo.png';
import invertisLogo from '../assets/invertis-logo.png';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTiltReflection } from '../hooks/useTiltReflection';
import { CardReflectionGlow } from './CardReflectionGlow';

interface EducationEntry {
  id: string;
  qualification: string;
  category: string;
  institution: string;
  subDetail: string;
  subDetailType: 'location' | 'degree';
  scoreLabel: string;
  scoreValue: string;
  scoreSuffix?: string;
  badgeLabel: string;
  badgeValue: string;
  badgeType: 'rank' | 'status';
  logo: string;
  logoAlt: string;
  accent: 'teal' | 'blue' | 'gold';
}

const EDUCATION_ENTRIES: EducationEntry[] = [
  {
    id: 'class-10',
    qualification: 'Class 10',
    category: 'High School',
    institution: 'S.V.M. Inter College',
    subDetail: 'Tilhar, Shahjahanpur',
    subDetailType: 'location',
    scoreLabel: 'Aggregate Marks',
    scoreValue: '90.8%',
    badgeLabel: 'District Merit',
    badgeValue: '8th rank in the district',
    badgeType: 'rank',
    logo: svmLogo,
    logoAlt: 'S.V.M. Inter College / Vidya Bharati logo',
    accent: 'teal',
  },
  {
    id: 'class-12',
    qualification: 'Class 12',
    category: 'Intermediate',
    institution: 'S.V.M. Inter College',
    subDetail: 'Tilhar, Shahjahanpur',
    subDetailType: 'location',
    scoreLabel: 'Aggregate Marks',
    scoreValue: '90.4%',
    badgeLabel: 'District Merit',
    badgeValue: '13th rank in the district',
    badgeType: 'rank',
    logo: svmLogo,
    logoAlt: 'S.V.M. Inter College / Vidya Bharati logo',
    accent: 'blue',
  },
  {
    id: 'btech',
    qualification: 'B.Tech',
    category: 'Undergraduate',
    institution: 'Invertis University',
    subDetail: 'B.Tech — Computer Science & Engineering',
    subDetailType: 'degree',
    scoreLabel: 'Current CGPA',
    scoreValue: '8.6',
    scoreSuffix: '/ 10',
    badgeLabel: 'Academic Status',
    badgeValue: 'Final Year',
    badgeType: 'status',
    logo: invertisLogo,
    logoAlt: 'Invertis University logo',
    accent: 'gold',
  },
];

const badgeAccentStyles = {
  teal: 'bg-emerald-400/10 text-emerald-300 border-emerald-500/25',
  blue: 'bg-[#E5B45B]/10 text-[#E5B45B] border-[#E5B45B]/25',
  gold: 'bg-amber-400/10 text-amber-300 border-amber-500/25',
};

const scoreAccentStyles = {
  teal: 'text-emerald-300',
  blue: 'text-[#E5B45B]',
  gold: 'text-amber-300',
};

const achievementBoxStyles = {
  teal: 'bg-emerald-500/[0.06] border-emerald-500/20 text-[#F4F5F0]',
  blue: 'bg-[#E5B45B]/[0.06] border-[#E5B45B]/20 text-[#F4F5F0]',
  gold: 'bg-amber-500/[0.06] border-amber-500/20 text-[#F4F5F0]',
};

const iconBoxStyles = {
  teal: 'bg-emerald-500/15 text-emerald-300',
  blue: 'bg-[#E5B45B]/15 text-[#E5B45B]',
  gold: 'bg-amber-500/15 text-amber-300',
};

const hoverAccentStyles = {
  teal: 'hover:border-emerald-500/40 hover:shadow-[0_12px_36px_-15px_rgba(5,150,105,0.15)]',
  blue: 'hover:border-[#E5B45B]/40 hover:shadow-[0_12px_36px_-15px_rgba(229,180,91,0.15)]',
  gold: 'hover:border-amber-500/40 hover:shadow-[0_12px_36px_-15px_rgba(245,158,11,0.15)]',
};

const EducationCard: React.FC<{
  item: EducationEntry;
  isRevealed: boolean;
}> = ({ item, isRevealed }) => {
  const { ref } = useTiltReflection<HTMLDivElement>({
    maxTilt: 4.0,
    glowColor: item.accent === 'teal' ? 'emerald' : 'champagne',
  });

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl bg-[#0D0F13] border border-[#1F222A] hover:border-[#E5B45B]/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-500 h-full ${hoverAccentStyles[item.accent]}`}
    >
      {/* 3D Reflection and Cursor Spotlight */}
      <CardReflectionGlow
        glowColor={item.accent === 'teal' ? 'emerald' : 'champagne'}
        isRevealed={isRevealed}
      />

      <div className="relative z-10">
        {/* Qualification & Category Header */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide border ${badgeAccentStyles[item.accent]}`}
          >
            {item.qualification}
          </span>
          {item.badgeType === 'status' ? (
            <span className="font-mono text-[11px] text-amber-300/90 uppercase tracking-wider flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/25 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse motion-reduce:animate-none" />
              {item.badgeValue}
            </span>
          ) : (
            <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
              {item.category}
            </span>
          )}
        </div>

        {/* Institution Branding & Info */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#12141A] border border-[#1F222A] p-2 flex items-center justify-center shrink-0 group-hover:border-[#2E3440] transition-colors">
            <img
              src={item.logo}
              alt={item.logoAlt}
              className="w-full h-full object-contain filter contrast-105"
              loading="eager"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-[#F4F5F0] font-sans tracking-tight leading-snug">
              {item.institution}
            </h3>
            {item.subDetailType === 'location' ? (
              <div className="flex items-center gap-1.5 text-xs text-[#8A8F98] mt-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="truncate">{item.subDetail}</span>
              </div>
            ) : (
              <p className="text-sm text-neutral-300 mt-1.5 font-editorial font-medium leading-relaxed">
                {item.subDetail}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Prominent Academic Results & Achievements */}
      <div className="pt-6 border-t border-[#1F222A]/80 flex flex-col gap-3.5 relative z-10">
        {/* Score Block */}
        <div className="p-4 rounded-xl bg-[#111317] border border-[#1A1D24] flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">
              {item.scoreLabel}
            </p>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className={`text-3xl sm:text-4xl font-bold font-sans tracking-tight ${scoreAccentStyles[item.accent]}`}>
                {item.scoreValue}
              </span>
              {item.scoreSuffix && (
                <span className="font-mono text-sm sm:text-base text-neutral-500 font-normal">
                  {item.scoreSuffix}
                </span>
              )}
            </div>
          </div>
          <div className={`text-xs font-mono px-2 py-0.5 rounded border ${badgeAccentStyles[item.accent]}`}>
            {item.accent === 'gold' ? 'Cumulative' : 'Result'}
          </div>
        </div>

        {/* Achievement / Standing Banner */}
        <div className={`p-3.5 rounded-xl border flex items-center gap-3 ${achievementBoxStyles[item.accent]}`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBoxStyles[item.accent]}`}>
            {item.badgeType === 'rank' ? (
              <Award className="w-4 h-4" />
            ) : (
              <GraduationCap className="w-4 h-4" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
              {item.badgeLabel}
            </p>
            <p className="text-sm font-semibold text-[#F4F5F0] truncate">
              {item.badgeValue}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export const Education: React.FC = () => {
  const { ref: sectionRef, getRevealClass } = useScrollReveal();
  const { ref: cardsRef, isVisible: isCardsVisible } = useScrollReveal({
    repeat: true,
    threshold: 0,
    rootMargin: '-40px 0px -60px 0px',
  });

  return (
    <section
      id="education"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="py-24 sm:py-32 border-t border-[#1F222A] relative overflow-hidden"
    >
      {/* Subtle section ambient glow */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(5,150,105,0.025),transparent_70%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Blueprint Grid Overlay Elements */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1F222A_1px,transparent_1px),linear-gradient(to_bottom,#1F222A_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
      />

      {/* Dedicated Left Side Academic Timeline Ruler (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-center gap-4 absolute left-6 top-36 text-neutral-600 font-mono text-[9px] tracking-widest select-none pointer-events-none"
      >
        <span className="text-emerald-400 font-semibold">// 02_ACAD</span>
        <div className="w-px h-36 bg-gradient-to-b from-emerald-500/40 via-[#1F222A] to-transparent relative">
          <div className="absolute top-2 -left-1.5 w-3 h-px bg-emerald-400/60" />
          <div className="absolute top-14 -left-1 w-2 h-px bg-[#1F222A]" />
          <div className="absolute top-26 -left-1.5 w-3 h-px bg-[#E5B45B]/60" />
        </div>
        <span className="text-[8px] text-neutral-600">8.6_CGPA</span>
      </div>

      {/* Dedicated Right Side Blueprint Specification Stamp (Hidden on Mobile) */}
      <div
        aria-hidden="true"
        className="hidden 2xl:flex flex-col items-end gap-2 absolute right-6 top-36 font-mono text-[9px] text-neutral-600 select-none pointer-events-none"
      >
        <div className="px-2.5 py-1 rounded border border-[#1F222A] bg-[#0E1116] text-[#E5B45B] text-[8px] tracking-wider uppercase">
          SPEC // B.TECH_CSE
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#1F222A]" />
        <span className="text-[8px] text-neutral-600">MERIT // TOP_RANK</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className={`mb-14 sm:mb-20 ${getRevealClass(0, 'up')}`}>
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-[#111317] border border-[#1F222A] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              // 02 · Education
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F0] max-w-[800px] font-sans">
            Academic Foundation &amp; Qualifications
          </h2>
          <p className="text-sm sm:text-base text-[#8A8F98] max-w-[620px] mt-3 font-editorial">
            Consistent academic excellence from secondary schooling to computer science undergraduate studies.
          </p>
        </div>

        {/* Milestone Progression Bar (Desktop) */}
        <div aria-hidden="true" className="hidden lg:grid grid-cols-3 gap-8 mb-4 px-2 select-none pointer-events-none">
          <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="uppercase tracking-wider">Milestone 01 // Secondary</span>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/30 to-transparent" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[#E5B45B]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B45B]" />
            <span className="uppercase tracking-wider">Milestone 02 // Senior Sec</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#E5B45B]/30 to-transparent" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-amber-300/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="uppercase tracking-wider">Milestone 03 // Undergraduate</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
          </div>
        </div>

        {/* 3-Card Balanced Desktop Row / Responsive Grid */}
        <div
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {EDUCATION_ENTRIES.map((item, index) => (
            <div
              key={item.id}
              style={{
                transitionDelay: isCardsVisible ? `${index * 180}ms` : '0ms',
              }}
              className={`edu-card-assembly-wrapper h-full ${
                isCardsVisible
                  ? 'edu-card-assembly-visible'
                  : index === 0
                  ? 'edu-card-assembly-hidden-1'
                  : index === 1
                  ? 'edu-card-assembly-hidden-2'
                  : 'edu-card-assembly-hidden-3'
              }`}
            >
              <EducationCard
                item={item}
                isRevealed={isCardsVisible}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
