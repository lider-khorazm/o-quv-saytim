import React from 'react';

export type MascotMood = 'happy' | 'excited' | 'thinking' | 'celebrating' | 'waving' | 'proud' | 'sleepy';

interface AuroraMascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  message?: string;
  className?: string;
}

const SIZE_MAP = {
  sm: 'w-14 h-14',
  md: 'w-20 h-20',
  lg: 'w-28 h-28',
  xl: 'w-36 h-36',
};

export const AuroraMascot: React.FC<AuroraMascotProps> = ({
  mood = 'happy',
  size = 'md',
  message,
  className = '',
}) => {
  const sizeClass = typeof size === 'string' ? SIZE_MAP[size] : '';
  const sizeStyle = typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      <div className={`relative shrink-0 animate-aurora-float ${sizeClass}`} style={sizeStyle}>
        {/* Ambient Sunset Glow */}
        <div
          className="absolute -inset-2 rounded-full opacity-45 blur-xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, #ff6b86 0%, #ff8a3d 50%, #3ee6c4 100%)',
          }}
        />
        <svg
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-[0_8px_16px_rgba(255,107,134,0.35)]"
          role="img"
          aria-label="Kodik — DevMaster maskoti"
        >
          <defs>
            <linearGradient id="kodikBodyGrad" x1="20" y1="20" x2="120" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff6b86" />
              <stop offset="55%" stopColor="#ff8a3d" />
              <stop offset="100%" stopColor="#ffd23f" />
            </linearGradient>
            <linearGradient id="kodikBellyGrad" x1="40" y1="65" x2="100" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>
            <linearGradient id="kodikVisorGrad" x1="32" y1="45" x2="108" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#141122" />
              <stop offset="100%" stopColor="#261e3f" />
            </linearGradient>
          </defs>

          {/* Antenna & Mint Orb */}
          <path d="M70 12V28" stroke="#3ee6c4" strokeWidth="5" strokeLinecap="round" />
          <circle cx="70" cy="11" r="7" fill="#b6f03c" stroke="#0a0912" strokeWidth="2.5" />

          {/* Ears / Tufts */}
          <path
            d="M28 44L18 22L44 32Z"
            fill="url(#kodikBodyGrad)"
            stroke="#0a0912"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M112 44L122 22L96 32Z"
            fill="url(#kodikBodyGrad)"
            stroke="#0a0912"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Main Chubby Duolingo-style Body */}
          <rect
            x="24"
            y="26"
            width="92"
            height="94"
            rx="42"
            fill="url(#kodikBodyGrad)"
            stroke="#0a0912"
            strokeWidth="4"
          />

          {/* Belly Patch */}
          <ellipse cx="70" cy="95" rx="28" ry="20" fill="url(#kodikBellyGrad)" />
          <path d="M58 91L64 97L58 103" stroke="#ff6b86" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M82 91L76 97L82 103" stroke="#ff6b86" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M72 89L68 105" stroke="#ff8a3d" strokeWidth="2.8" strokeLinecap="round" />

          {/* Left & Right Wings */}
          <path
            d={mood === 'waving' || mood === 'celebrating' ? 'M24 66C10 52 8 36 18 32C25 30 27 48 26 62' : 'M24 68C14 74 14 92 24 96'}
            fill="#ff6b86"
            stroke="#0a0912"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={mood === 'celebrating' ? 'M116 66C130 52 132 36 122 32C115 30 113 48 114 62' : 'M116 68C126 74 126 92 116 96'}
            fill="#ff8a3d"
            stroke="#0a0912"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Cyber Glasses / Visor */}
          <rect
            x="33"
            y="43"
            width="74"
            height="32"
            rx="16"
            fill="url(#kodikVisorGrad)"
            stroke="#3ee6c4"
            strokeWidth="3"
          />

          {/* Expressive Eyes inside Visor */}
          {mood === 'excited' || mood === 'celebrating' ? (
            <>
              <path d="M46 61C49 54 56 54 59 61" stroke="#3ee6c4" strokeWidth="4" strokeLinecap="round" />
              <path d="M81 61C84 54 91 54 94 61" stroke="#3ee6c4" strokeWidth="4" strokeLinecap="round" />
              <circle cx="52" cy="58" r="2" fill="#ffd23f" />
              <circle cx="88" cy="58" r="2" fill="#ffd23f" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="53" cy="58" r="6" fill="#3ee6c4" />
              <circle cx="55" cy="56" r="2.2" fill="#ffffff" />
              <path d="M80 58H94" stroke="#ffd23f" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="53" cy="59" r="6.5" fill="#3ee6c4" />
              <circle cx="55" cy="56.5" r="2.4" fill="#ffffff" />
              <circle cx="87" cy="59" r="6.5" fill="#3ee6c4" />
              <circle cx="89" cy="56.5" r="2.4" fill="#ffffff" />
            </>
          )}

          {/* Cute Beak / Smile */}
          <path
            d="M64 74H76L70 82Z"
            fill="#ffd23f"
            stroke="#0a0912"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Little Feet */}
          <ellipse cx="54" cy="121" rx="9" ry="5" fill="#ffd23f" stroke="#0a0912" strokeWidth="3" />
          <ellipse cx="86" cy="121" rx="9" ry="5" fill="#ffd23f" stroke="#0a0912" strokeWidth="3" />
        </svg>
      </div>

      {message && (
        <div className="relative aurora-card px-4 py-3 text-xs sm:text-sm font-semibold max-w-xs sm:max-w-sm border-2 border-[#ff6b86]/40 shadow-lg">
          <span className="block leading-snug">{message}</span>
        </div>
      )}
    </div>
  );
};
