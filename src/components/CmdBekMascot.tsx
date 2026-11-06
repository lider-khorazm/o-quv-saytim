// CMDbek — do'ppi kiygan jonli terminal (CMD) AI maskoti.
// 13 ta hissiyot va animatsiyalar: oddiy, kulgan, qo'l ko'targan, salyut, o'ylanayotgan, gapirayotgan, jahli chiqqan (drag qilganda), qahqaha, hayron, krutoy, kod yozayotgan, mudrayotgan va xato.

export type CmdBekMood =
  | 'idle'
  | 'hello'
  | 'thinking'
  | 'explaining'
  | 'speaking'
  | 'happy'
  | 'celebrating'
  | 'angry'
  | 'laughing'
  | 'surprised'
  | 'cool'
  | 'coding'
  | 'sleepy'
  | 'oops';

interface Props {
  mood?: CmdBekMood;
  size?: number | string;
  className?: string;
}

const SCREEN_TEXT: Record<CmdBekMood, string> = {
  idle: 'C:\\>',
  hello: 'salom!',
  thinking: 'oʻylayapman..',
  explaining: 'gapiryapman',
  speaking: '🔊 ovozda..',
  happy: "zo'r! :)",
  celebrating: '100% WIN!',
  angry: 'EY! >:(',
  laughing: 'XA-XA-XA!',
  surprised: 'VOY! :O',
  cool: 'LEGEND B)',
  coding: 'npm run dev',
  sleepy: 'Zzz...',
  oops: 'xato :(',
};

const CONFETTI = [
  { x: 30, c: '#ffd23f', d: 0 },
  { x: 58, c: '#3ee6c4', d: 0.2 },
  { x: 92, c: '#ff6b86', d: 0.1 },
  { x: 124, c: '#b6f03c', d: 0.3 },
  { x: 152, c: '#ff8a3d', d: 0.15 },
  { x: 172, c: '#38bdf8', d: 0.35 },
];

export function CmdBekMascot({ mood = 'idle', size = 160, className }: Props) {
  const isSpeaking = mood === 'speaking' || mood === 'explaining';
  const isAngry = mood === 'angry';
  const isThinking = mood === 'thinking';
  const isLaughing = mood === 'laughing';
  const isCool = mood === 'cool';
  const isSurprised = mood === 'surprised';
  const isCoding = mood === 'coding';
  const isSleepy = mood === 'sleepy';

  const closedEyes = mood === 'happy' || mood === 'celebrating' || isLaughing || isSleepy;
  const look = isThinking
    ? [-6, -5]
    : isSpeaking
    ? [3, -1]
    : isAngry
    ? [0, 2]
    : mood === 'oops'
    ? [0, 3]
    : [0, 0];

  const armL =
    mood === 'celebrating' || isLaughing
      ? 150
      : isAngry
      ? 135
      : isThinking
      ? -105
      : isCoding
      ? -55
      : mood === 'happy'
      ? 35
      : 12;

  const armR =
    mood === 'hello' || mood === 'celebrating' || isLaughing
      ? -150
      : isAngry
      ? -135
      : isSpeaking
      ? -115
      : isCoding
      ? 55
      : mood === 'happy'
      ? -35
      : -12;

  const eyeColor = isAngry ? '#ff4d6d' : '#3ee6c4';
  const strokeMain = isAngry ? '#ff4d6d' : '#3ee6c4';

  const mouth =
    mood === 'happy' || mood === 'celebrating' || isLaughing
      ? { d: 'M82 133 Q100 158 118 133 Z', fill: '#3ee6c4' }
      : isAngry
      ? { d: 'M84 148 Q100 132 116 148 Z', fill: '#ff4d6d' }
      : isSurprised
      ? { d: 'M93 136 A7 9 0 1 1 107 136 A7 9 0 1 1 93 136 Z', fill: '#ffd23f' }
      : mood === 'oops'
      ? { d: 'M90 147 Q100 139 110 147', fill: 'none' }
      : isThinking || isCoding
      ? { d: 'M92 142 Q100 138 108 142', fill: 'none' }
      : isSleepy
      ? { d: 'M95 143 H105', fill: 'none' }
      : { d: 'M88 138 Q100 149 112 138', fill: 'none' };

  const brows = isAngry
    ? ['M58 88 L84 98', 'M142 88 L116 98']
    : mood === 'oops'
    ? ['M60 92 L82 87', 'M118 87 L140 92']
    : isThinking
    ? ['M58 88 Q71 80 84 89', 'M116 92 L140 90']
    : isSurprised
    ? ['M60 84 Q72 76 84 84', 'M116 84 Q128 76 140 84']
    : [];

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
        .cb-angry-shake{animation:cb-shake 0.25s ease-in-out infinite}
        .cb-laugh-bounce{animation:cb-laugh 0.35s ease-in-out infinite}
        .cb-blink{transform-box:fill-box;transform-origin:center;animation:cb-blink 4.2s infinite}
        .cb-cur{animation:cb-cur 1s steps(1) infinite}
        .cb-wave{animation:cb-wave .5s ease-in-out infinite alternate}
        .cb-type-arm{animation:cb-type .22s ease-in-out infinite alternate}
        .cb-conf{animation:cb-fall 1.6s ease-in infinite}
        .cb-arm{transition:transform .35s cubic-bezier(.3,1.4,.5,1)}
        .cb-mouth-talk{transform-box:fill-box;transform-origin:center;animation:cb-talk 0.24s ease-in-out infinite alternate}
        .cb-think-gear{transform-box:fill-box;transform-origin:center;animation:cb-spin 3s linear infinite}
        .cb-steam{animation:cb-steam 0.9s ease-out infinite}
        @keyframes cb-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes cb-shake{0%,100%{transform:translate(0,0) rotate(0deg)}25%{transform:translate(-3px,1px) rotate(-2deg)}75%{transform:translate(3px,-1px) rotate(2deg)}}
        @keyframes cb-laugh{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.03)}}
        @keyframes cb-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.08)}}
        @keyframes cb-cur{0%,50%{opacity:1}50.1%,100%{opacity:0}}
        @keyframes cb-wave{from{transform:rotate(-135deg)}to{transform:rotate(-168deg)}}
        @keyframes cb-type{from{transform:rotate(-45deg)}to{transform:rotate(-75deg)}}
        @keyframes cb-talk{0%{transform:scaleY(0.35)}100%{transform:scaleY(1.25)}}
        @keyframes cb-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes cb-steam{0%{transform:translateY(0) scale(0.7);opacity:0.95}100%{transform:translateY(-24px) scale(1.4);opacity:0}}
        @keyframes cb-fall{0%{transform:translateY(-20px) rotate(0);opacity:0}15%{opacity:1}100%{transform:translateY(230px) rotate(360deg);opacity:0}}
        @media (prefers-reduced-motion:reduce){.cb-float,.cb-angry-shake,.cb-laugh-bounce,.cb-blink,.cb-cur,.cb-wave,.cb-conf,.cb-mouth-talk,.cb-think-gear,.cb-steam{animation:none}}
      `}</style>
      <defs>
        <linearGradient id="cbRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={isAngry ? '#ff4d6d' : '#3ee6c4'} />
          <stop offset="1" stopColor={isAngry ? '#ff8a3d' : '#b6f03c'} />
        </linearGradient>
      </defs>

      {(mood === 'celebrating' || isLaughing) &&
        CONFETTI.map((p, i) => (
          <rect
            key={i}
            className="cb-conf"
            x={p.x}
            y={0}
            width="7"
            height="11"
            rx="2"
            fill={p.c}
            style={{ animationDelay: `${p.d}s` }}
          />
        ))}

      <g className={isAngry ? 'cb-angry-shake' : isLaughing ? 'cb-laugh-bounce' : 'cb-float'}>
        <ellipse cx="100" cy="220" rx="48" ry="7" fill="#000" opacity=".28" />

        {/* oyoqlar */}
        <line x1="78" y1="180" x2="78" y2="205" stroke="#cc2f50" strokeWidth="7" strokeLinecap="round" />
        <line x1="122" y1="180" x2="122" y2="205" stroke="#cc2f50" strokeWidth="7" strokeLinecap="round" />
        <ellipse cx="74" cy="209" rx="14" ry="6.5" fill="#ff8a3d" />
        <ellipse cx="126" cy="209" rx="14" ry="6.5" fill="#ff8a3d" />

        {/* qo'llar */}
        <g
          className={`cb-arm ${isCoding ? 'cb-type-arm' : ''}`}
          style={{
            transformBox: 'view-box',
            transformOrigin: '28px 125px',
            transform: `rotate(${armL}deg)`,
          }}
        >
          <line x1="28" y1="125" x2="28" y2="154" stroke="#ff6b86" strokeWidth="8" strokeLinecap="round" />
          <circle cx="28" cy="158" r="9" fill={isAngry ? '#ff4d6d' : '#ffd23f'} />
        </g>
        <g
          className={`cb-arm ${mood === 'hello' || isSpeaking ? 'cb-wave' : isCoding ? 'cb-type-arm' : ''}`}
          style={{
            transformBox: 'view-box',
            transformOrigin: '172px 125px',
            transform: `rotate(${armR}deg)`,
          }}
        >
          <line x1="172" y1="125" x2="172" y2="154" stroke="#ff6b86" strokeWidth="8" strokeLinecap="round" />
          <circle cx="172" cy="158" r="9" fill={isAngry ? '#ff4d6d' : '#ffd23f'} />
        </g>

        {/* terminal oynasi */}
        <rect
          x="28"
          y="60"
          width="144"
          height="120"
          rx="18"
          fill={isAngry ? '#240b15' : '#0e0c18'}
          stroke="url(#cbRim)"
          strokeWidth="4.5"
        />
        <path d="M28 84 V78 Q28 60 46 60 H154 Q172 60 172 78 V84 Z" fill={isAngry ? '#3b1020' : '#1c1930'} />
        <circle cx="46" cy="73" r="4" fill="#ff6b86" />
        <circle cx="59" cy="73" r="4" fill="#ffd23f" />
        <circle cx="72" cy="73" r="4" fill="#b6f03c" />
        <text x="154" y="76" textAnchor="end" fontSize="9" fill="#8d88b0" fontFamily="JetBrains Mono, monospace">
          cmdbek.exe
        </text>

        {/* ko'zlar */}
        {isCool ? (
          <g>
            {/* Cool Sunglasses */}
            <rect x="52" y="96" width="40" height="22" rx="5" fill="#05050a" stroke="#ffd23f" strokeWidth="2.5" />
            <rect x="108" y="96" width="40" height="22" rx="5" fill="#05050a" stroke="#ffd23f" strokeWidth="2.5" />
            <line x1="92" y1="104" x2="108" y2="104" stroke="#ffd23f" strokeWidth="3" />
            <line x1="58" y1="101" x2="68" y2="112" stroke="#3ee6c4" strokeWidth="2" opacity="0.8" />
            <line x1="114" y1="101" x2="124" y2="112" stroke="#3ee6c4" strokeWidth="2" opacity="0.8" />
          </g>
        ) : closedEyes ? (
          <g fill="none" stroke={strokeMain} strokeWidth="5" strokeLinecap="round">
            <path d="M62 116 Q72 102 82 116" />
            <path d="M118 116 Q128 102 138 116" />
            {isLaughing && (
              <>
                <circle cx="56" cy="118" r="4" fill="#38bdf8" stroke="none" />
                <circle cx="144" cy="118" r="4" fill="#38bdf8" stroke="none" />
              </>
            )}
          </g>
        ) : (
          <g transform={`translate(${look[0]} ${look[1]})`}>
            <g className="cb-blink">
              <rect
                x="64"
                y={isSurprised ? '94' : '98'}
                width="16"
                height={isSurprised ? '32' : '27'}
                rx="8"
                fill={eyeColor}
              />
              <rect
                x="120"
                y={isSurprised ? '94' : '98'}
                width="16"
                height={isSurprised ? '32' : '27'}
                rx="8"
                fill={eyeColor}
              />
              <circle cx="70" cy="106" r="2.5" fill="#e9fffa" />
              <circle cx="126" cy="106" r="2.5" fill="#e9fffa" />
            </g>
          </g>
        )}

        {/* Qoshlar */}
        {brows.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={strokeMain} strokeWidth="4" strokeLinecap="round" />
        ))}

        {/* Og'iz (Gapirayotganda cb-mouth-talk animatsiyasi bilan) */}
        {isSpeaking ? (
          <g className="cb-mouth-talk">
            <rect x="84" y="132" width="32" height="16" rx="8" fill="#3ee6c4" stroke="#e9fffa" strokeWidth="2" />
            {/* Audio wave bars next to mouth */}
            <line x1="74" y1="136" x2="74" y2="144" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="126" y1="136" x2="126" y2="144" stroke="#ffd23f" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ) : (
          <path
            d={mouth.d}
            fill={mouth.fill}
            stroke={strokeMain}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        <ellipse cx="50" cy="136" rx="8" ry="5" fill="#ff6b86" opacity={isAngry ? '.75' : '.4'} />
        <ellipse cx="150" cy="136" rx="8" ry="5" fill="#ff6b86" opacity={isAngry ? '.75' : '.4'} />

        {/* Buyruq qatori (pastki terminal yozuvi) */}
        <text
          x="42"
          y="170"
          fontSize="12"
          fontWeight="700"
          fill={isAngry ? '#ff6b86' : '#b6f03c'}
          fontFamily="JetBrains Mono, monospace"
        >
          {SCREEN_TEXT[mood]}
          <tspan className="cb-cur">_</tspan>
        </text>

        {/* O'zbek do'ppisi */}
        <path d="M54 64 Q54 28 100 26 Q146 28 146 64 Z" fill="#14121f" />
        <rect x="54" y="58" width="92" height="7" rx="3.5" fill="#fff4ec" />
        <path d="M100 33 Q110 45 100 55 Q90 45 100 33 Z" fill="none" stroke="#fff4ec" strokeWidth="2" />
        <circle cx="76" cy="46" r="3.5" fill="none" stroke="#fff4ec" strokeWidth="2" />
        <circle cx="124" cy="46" r="3.5" fill="none" stroke="#fff4ec" strokeWidth="2" />
        <circle cx="100" cy="44" r="2" fill="#ffd23f" />

        {/* O'ylanayotgan animatsiya: fikr pufakchalari va aylanuvchi savol belgisi */}
        {isThinking && (
          <g>
            <circle cx="152" cy="44" r="4" fill="#3ee6c4" opacity="0.7" />
            <circle cx="162" cy="32" r="6" fill="#3ee6c4" opacity="0.85" />
            <g className="cb-think-gear">
              <circle cx="176" cy="18" r="13" fill="#1c1930" stroke="#ffd23f" strokeWidth="2.5" />
              <text
                x="176"
                y="24"
                textAnchor="middle"
                fontSize="16"
                fontWeight="800"
                fill="#ffd23f"
                fontFamily="JetBrains Mono, monospace"
              >
                ?
              </text>
            </g>
          </g>
        )}

        {/* Gapirayotgan animatsiya: Ovoz to'lqinlari */}
        {isSpeaking && (
          <g>
            <path
              d="M168 42 Q178 50 168 58"
              fill="none"
              stroke="#3ee6c4"
              strokeWidth="3"
              strokeLinecap="round"
              className="cb-steam"
            />
            <path
              d="M175 36 Q190 50 175 64"
              fill="none"
              stroke="#ffd23f"
              strokeWidth="2.5"
              strokeLinecap="round"
              className="cb-steam"
            />
          </g>
        )}

        {/* Jahli chiqqan animatsiya (drag qilganda): Qizil bug' va chaqmoqlar */}
        {isAngry && (
          <g>
            <path
              d="M36 32 L46 42 M46 32 L36 42"
              stroke="#ff4d6d"
              strokeWidth="4"
              strokeLinecap="round"
              className="cb-steam"
            />
            <path
              d="M156 26 L168 38 M168 26 L156 38"
              stroke="#ffd23f"
              strokeWidth="4"
              strokeLinecap="round"
              className="cb-steam"
            />
            <circle cx="100" cy="14" r="7" fill="#ff4d6d" className="cb-steam" />
          </g>
        )}
      </g>
    </svg>
  );
}
