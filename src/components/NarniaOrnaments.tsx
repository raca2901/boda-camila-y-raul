import React from 'react';

interface OrnateCornersProps {
  variant?: 'gold' | 'dark-gold';
  className?: string;
}

/**
 * Four antique filigree corner ornaments for royal parchment cards and gilded frames.
 */
export const OrnateCorners: React.FC<OrnateCornersProps> = ({
  variant = 'gold',
  className = '',
}) => {
  const strokeColor = variant === 'gold' ? '#D4AF37' : '#9A7220';

  const cornerSvg = (
    <svg viewBox="0 0 36 36" className="w-7 h-7 sm:w-8 sm:h-8" fill="none">
      <path
        d="M2 34 V8 C2 4.5 4.5 2 8 2 H34"
        stroke={strokeColor}
        strokeWidth="1.4"
        strokeOpacity="0.75"
      />
      <path
        d="M6 28 V10 C6 7.5 7.5 6 10 6 H28"
        stroke={strokeColor}
        strokeWidth="0.9"
        strokeOpacity="0.45"
      />
      <circle cx="8" cy="8" r="2" fill={strokeColor} fillOpacity="0.65" />
      <path
        d="M12 2 C14 5 16 5 18 2"
        stroke={strokeColor}
        strokeWidth="0.9"
        strokeOpacity="0.55"
      />
      <path
        d="M2 12 C5 14 5 16 2 18"
        stroke={strokeColor}
        strokeWidth="0.9"
        strokeOpacity="0.55"
      />
    </svg>
  );

  return (
    <div className={`pointer-events-none select-none ${className}`} aria-hidden="true">
      <div className="absolute top-2.5 left-2.5">{cornerSvg}</div>
      <div className="absolute top-2.5 right-2.5 scale-x-[-1]">{cornerSvg}</div>
      <div className="absolute bottom-2.5 left-2.5 scale-y-[-1]">{cornerSvg}</div>
      <div className="absolute bottom-2.5 right-2.5 scale-[-1]">{cornerSvg}</div>
    </div>
  );
};

interface ChapterDividerProps {
  label?: string;
  theme?: 'dark' | 'parchment';
}

/**
 * Ornamental Chronicles of Narnia chapter rule divider with central star/diamond flourish.
 */
export const ChapterDivider: React.FC<ChapterDividerProps> = ({
  label,
  theme = 'parchment',
}) => {
  const lineColor = theme === 'dark' ? 'from-transparent via-amber-400/50 to-amber-300/70' : 'from-transparent via-amber-800/35 to-amber-700/60';
  const lineColorRev = theme === 'dark' ? 'from-amber-300/70 via-amber-400/50 to-transparent' : 'from-amber-700/60 via-amber-800/35 to-transparent';
  const textColor = theme === 'dark' ? 'text-amber-300' : 'text-amber-900';

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <div className="flex items-center justify-center gap-3 w-full max-w-xs">
        <span className={`h-[1px] flex-1 bg-gradient-to-r ${lineColor}`} />
        <svg viewBox="0 0 32 16" className={`w-8 h-4 ${textColor}`} fill="currentColor">
          <path d="M16 1 L19.5 8 L16 15 L12.5 8 Z" opacity="0.9" />
          <circle cx="5" cy="8" r="1.6" opacity="0.6" />
          <circle cx="27" cy="8" r="1.6" opacity="0.6" />
        </svg>
        <span className={`h-[1px] flex-1 bg-gradient-to-r ${lineColorRev}`} />
      </div>
      {label && (
        <span
          className={`text-[11px] font-cinzel uppercase tracking-[0.28em] font-semibold ${textColor}`}
        >
          {label}
        </span>
      )}
    </div>
  );
};

/**
 * Subtle ornate horizontal seam between dark forest sections and warm parchment pages.
 */
export const SectionTransitionBand: React.FC<{ direction: 'dark-to-parchment' | 'parchment-to-dark' }> = ({
  direction,
}) => {
  const bg =
    direction === 'dark-to-parchment'
      ? 'bg-gradient-to-b from-[#071411] via-[#2b2619] to-[#f3ebd8]'
      : 'bg-gradient-to-b from-[#f3ebd8] via-[#2b2619] to-[#071411]';

  return (
    <div className={`relative h-8 w-full ${bg} flex items-center justify-center overflow-hidden`} aria-hidden="true">
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
      <div className="absolute w-3 h-3 rotate-45 bg-amber-400/90 border border-amber-200 shadow-[0_0_12px_rgba(212,175,55,0.85)]" />
    </div>
  );
};

/**
 * Classic Victorian Narnia Lamppost icon with glowing amber light.
 */
export const NarniaLamppostSvg: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="32" cy="7" r="3.5" stroke="currentColor" />
    <path d="M24 15 L32 10.5 L40 15 L32 18 Z" fill="currentColor" fillOpacity="0.25" />
    <path d="M20 21 L32 15 L44 21 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M22 21 L25.5 42 L38.5 42 L42 21 Z" fill="#fef3c7" fillOpacity="0.2" />
    <line x1="32" y1="21" x2="32" y2="42" stroke="currentColor" strokeDasharray="1.5 2.5" />
    <circle cx="32" cy="31.5" r="4" fill="#fbbf24" stroke="#f59e0b" className="animate-pulse" />
    <path d="M24 42 L40 42 L36 48 L28 48 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M32 48 L32 60" strokeWidth="2.6" />
    <path d="M25 60 L39 60" strokeWidth="2.4" />
  </svg>
);
