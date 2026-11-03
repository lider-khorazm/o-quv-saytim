// CMDbek — do'ppi kiygan qiziqarli terminal (CMD) mashoti. Rasm kerak emas, hammasi SVG kod.
export type CmdBekMood = 'idle' | 'hello' | 'thinking' | 'explaining' | 'happy' | 'celebrating' | 'oops';

interface Props {
  mood?: CmdBekMood;
  size?: number | string;
  className?: string;
}

const SCREEN_TEXT: Record<CmdBekMood, string> = {
  idle: 'C:\\>',
  hello: 'salom!',
  thinking: '...',
  explaining: '</>',
  happy: "zo'r!",
  celebrating: '100%',
  oops: 'xato :(',
};

const CONFETTI = [
  { x: 36, c: '#ffd23f', d: 0 }, { x: 66, c: '#3ee6c4', d: 0.25 }, { x: 100, c: '#ff6b86', d: 0.1 },
  { x: 132, c: '#b6f03c', d: 0.35 }, { x: 164, c: '#ff8a3d', d: 0.2 }, { x: 84, c: '#8b5cf6', d: 0.45 },
];

export function CmdBekMascot({ mood = 'idle', size = 160, className }: Props) {
  const closed = mood === 'happy' || mood === 'celebrating';
  const look = mood === 'thinking' ? [-5, -4] : mood === 'explaining' ? [5, 0] : mood === 'oops' ? [0, 3] : [0, 0];

  const armL = mood === 'celebrating' ? 150 : mood === 'thinking' ? -100 : mood === 'happy' ? 35 : 12;
  const armR = mood === 'hello' || mood === 'celebrating' ? -150 : mood === 'explaining' ? -110 : mood === 'happy' ? -35 : -12;

  const mouth =
    mood === 'happy' || mood === 'celebrating'
      ? { d: 'M84 134 Q100 156 116 134 Z', fill: '#3ee6c4' }
      : mood === 'oops'
      ? { d: 'M90 147 Q100 139 110 147', fill: 'none' }
      : mood === 'thinking'
      ? { d: 'M94 142 H106', fill: 'none' }
      : { d: 'M88 138 Q100 149 112 138', fill: 'none' };

  const brows =
    mood === 'oops' ? ['M60 92 L82 87', 'M118 87 L140 92'] : mood === 'thinking' ? ['M60 91 Q71 83 82 90'] : [];

  return (
    <svg
      className={className}
      width={size}
      height={typeof size === 'number' ? size * 1.15 : undefined}
      viewBox="0 0 200 230"
      role="img"
      aria-label="CMDbek — AI ustoz"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <style>{`
        .cb-float{animation:cb-float 3.2s ease-in-out infinite}
        .cb-blink{transform-box:fill-box;transform-origin:center;animation:cb-blink 4.5s infinite}
        .cb-cur{animation:cb-cur 1s steps(1) infinite}
        .cb-wave{animation:cb-wave .6s ease-in-out 5 alternate}
        .cb-conf{animation:cb-fall 1.6s ease-in infinite}
        .cb-arm{transition:transform .4s cubic-bezier(.3,1.4,.5,1)}
        @keyframes cb-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes cb-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.08)}}
        @keyframes cb-cur{0%,50%{opacity:1}50.1%,100%{opacity:0}}
        @keyframes cb-wave{from{transform:rotate(-135deg)}to{transform:rotate(-165deg)}}
        @keyframes cb-fall{0%{transform:translateY(-20px) rotate(0);opacity:0}15%{opacity:1}100%{transform:translateY(230px) rotate(360deg);opacity:0}}
        @media (prefers-reduced-motion:reduce){.cb-float,.cb-blink,.cb-cur,.cb-wave,.cb-conf{animation:none}}
      `}</style>
      <defs>
        <linearGradient id="cbRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3ee6c4" />
          <stop offset="1" stopColor="#b6f03c" />
        </linearGradient>
      </defs>

      {mood === 'celebrating' &&
        CONFETTI.map((p, i) => (
          <rect key={i} className="cb-conf" x={p.x} y={0} width="7" height="11" rx="2" fill={p.c} style={{ animationDelay: `${p.d}s` }} />
        ))}

      <g className="cb-float">
        <ellipse cx="100" cy="220" rx="48" ry="7" fill="#000" opacity=".25" />

        {/* oyoqlar */}
        <line x1="78" y1="180" x2="78" y2="205" stroke="#cc2f50" strokeWidth="7" strokeLinecap="round" />
        <line x1="122" y1="180" x2="122" y2="205" stroke="#cc2f50" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="74" cy="209" rx="14" ry="6.5" fill="#ff8a3d" />
        <ellipse cx="126" cy="209" rx="14" ry="6.5" fill="#ff8a3d" />

        {/* qo'llar */}
        <g className="cb-arm" style={{ transformBox: 'view-box', transformOrigin: '28px 125px', transform: `rotate(${armL}deg)` }}>
          <line x1="28" y1="125" x2="28" y2="154" stroke="#ff6b86" strokeWidth="8" strokeLinecap="round" />
          <circle cx="28" cy="158" r="9" fill="#ffd23f" />
        </g>
        <g
          className={`cb-arm ${mood === 'hello' ? 'cb-wave' : ''}`}
          style={{ transformBox: 'view-box', transformOrigin: '172px 125px', transform: `rotate(${armR}deg)` }}
        >
          <line x1="172" y1="125" x2="172" y2="154" stroke="#ff6b86" strokeWidth="8" strokeLinecap="round" />
          <circle cx="172" cy="158" r="9" fill="#ffd23f" />
        </g>

        {/* terminal oynasi */}
        <rect x="28" y="60" width="144" height="120" rx="18" fill="#0e0c18" stroke="url(#cbRim)" strokeWidth="4" />
        <path d="M28 84 V78 Q28 60 46 60 H154 Q172 60 172 78 V84 Z" fill="#1c1930" />
        <circle cx="46" cy="73" r="4" fill="#ff6b86" />
        <circle cx="59" cy="73" r="4" fill="#ffd23f" />
        <circle cx="72" cy="73" r="4" fill="#b6f03c" />
        <text x="154" y="76" textAnchor="end" fontSize="9" fill="#8d88b0" fontFamily="JetBrains Mono, monospace">cmdbek.exe</text>

        {/* ko'zlar (kursor bloklari) */}
        {closed ? (
          <g fill="none" stroke="#3ee6c4" strokeWidth="5" strokeLinecap="round">
            <path d="M62 116 Q72 102 82 116" />
            <path d="M118 116 Q128 102 138 116" />
          </g>
        ) : (
          <g transform={`translate(${look[0]} ${look[1]})`}>
            <g className="cb-blink">
              <rect x="64" y="98" width="16" height="27" rx="8" fill="#3ee6c4" />
              <rect x="120" y="98" width="16" height="27" rx="8" fill="#3ee6c4" />
              <circle cx="70" cy="106" r="2.5" fill="#e9fffa" />
              <circle cx="126" cy="106" r="2.5" fill="#e9fffa" />
            </g>
          </g>
        )}
        {brows.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#3ee6c4" strokeWidth="3.5" strokeLinecap="round" />
        ))}
        <path d={mouth.d} fill={mouth.fill} stroke="#3ee6c4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="50" cy="136" rx="8" ry="5" fill="#ff6b86" opacity=".4" />
        <ellipse cx="150" cy="136" rx="8" ry="5" fill="#ff6b86" opacity=".4" />

        {/* buyruq qatori */}
        <text x="42" y="170" fontSize="13" fontWeight="700" fill="#b6f03c" fontFamily="JetBrains Mono, monospace">
          {SCREEN_TEXT[mood]}
          <tspan className="cb-cur">_</tspan>
        </text>

        {/* do'ppi */}
        <path d="M54 64 Q54 28 100 26 Q146 28 146 64 Z" fill="#14121f" />
        <rect x="54" y="58" width="92" height="7" rx="3.5" fill="#fff4ec" />
        <path d="M100 33 Q110 45 100 55 Q90 45 100 33 Z" fill="none" stroke="#fff4ec" strokeWidth="2" />
        <circle cx="76" cy="46" r="3.5" fill="none" stroke="#fff4ec" strokeWidth="2" />
        <circle cx="124" cy="46" r="3.5" fill="none" stroke="#fff4ec" strokeWidth="2" />
        <circle cx="100" cy="44" r="2" fill="#ffd23f" />

        {mood === 'thinking' && (
          <text x="150" y="44" fontSize="34" fontWeight="800" fill="#ffd23f" fontFamily="Space Grotesk, sans-serif">?</text>
        )}
      </g>
    </svg>
  );
}
