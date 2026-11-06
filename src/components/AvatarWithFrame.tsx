import React from 'react';
import { CourseStage, Student } from '../types';
import { getSyncStatus } from '../services/remoteStore';

export const DEFAULT_GRAY_AVATAR = '/assets/aistudio/image_90f513be.png';
export const KOI_FRAME_IMAGE = '/assets/aistudio/image_7852abed.png';

export interface OrnateFrameItem {
  id: string;
  title: string;
  price: number;
  description: string;
  type: 'image' | 'svg';
  imageUrl?: string;
  ringColor: string;
  glowColor: string;
  accentEmoji: string;
}

export const ORNATE_SHOP_FRAMES: OrnateFrameItem[] = [
  {
    id: 'frame-koi-fish',
    title: 'Koi Baliq Kosmik Ramkasi (VIP)',
    price: 35,
    description: 'Rasmda koʻrsatilgan neon koʻk Koi baliqlari, marjonlar va yulduz turkumi ramkasi',
    type: 'image',
    imageUrl: KOI_FRAME_IMAGE,
    ringColor: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.75)',
    accentEmoji: '🐟',
  },
  {
    id: 'frame-aurora-coral',
    title: 'Aurora Marjon Bezakli Ramka',
    price: 20,
    description: 'Quyosh botishi rangidagi ikki qavatli naqshinkor marjon ramka',
    type: 'svg',
    ringColor: '#ff6b86',
    glowColor: 'rgba(255,107,134,0.65)',
    accentEmoji: '🌸',
  },
  {
    id: 'frame-mint-cyber',
    title: 'Yalpiz Kiber Kristall Ramka',
    price: 22,
    description: 'Sof yalpiz va zumrad kristallar bilan bezatilgan ramka',
    type: 'svg',
    ringColor: '#3ee6c4',
    glowColor: 'rgba(62,230,196,0.65)',
    accentEmoji: '💠',
  },
  {
    id: 'frame-gold-crown',
    title: 'Qirollik Oltin Toj Ramkasi',
    price: 40,
    description: 'Oltin dafna yaproqlari va qirollik toji bilan bezatilgan nurli ramka',
    type: 'svg',
    ringColor: '#ffd23f',
    glowColor: 'rgba(255,210,63,0.7)',
    accentEmoji: '👑',
  },
  {
    id: 'frame-lime-energy',
    title: 'Laym Kvant Energiya Ramkasi',
    price: 25,
    description: 'Algoritm tezligini bildiruvchi nefrit-laym aylana ramka',
    type: 'svg',
    ringColor: '#b6f03c',
    glowColor: 'rgba(182,240,60,0.65)',
    accentEmoji: '⚡',
  },
  {
    id: 'frame-sunset-orange',
    title: 'Olovli Qaqnus Ramkasi',
    price: 28,
    description: 'Atrofida olov yaproqlari aylanuvchi issiq apelsin ramka',
    type: 'svg',
    ringColor: '#ff8a3d',
    glowColor: 'rgba(255,138,61,0.65)',
    accentEmoji: '🔥',
  },
  {
    id: 'frame-crimson-samurai',
    title: 'Samuray Qirmizi Qalqon Ramka',
    price: 36,
    description: 'JavaScript ustalari uchun qirmizi-qizil jangovar ramka',
    type: 'svg',
    ringColor: '#ff4d6d',
    glowColor: 'rgba(255,77,109,0.7)',
    accentEmoji: '⚔️',
  },
  {
    id: 'frame-cyan-diamond',
    title: 'Muzlik Olmos Kvant Ramkasi',
    price: 42,
    description: 'Muzdek moviy kvant nurlarini taratuvchi olmos ramka',
    type: 'svg',
    ringColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.7)',
    accentEmoji: '💎',
  },
  {
    id: 'frame-emerald-hacker',
    title: 'Zumrad Matritsa Terminal Ramkasi',
    price: 45,
    description: 'Haqiqiy terminal va backend kodchilari uchun zumrad halqa',
    type: 'svg',
    ringColor: '#10b981',
    glowColor: 'rgba(16,185,129,0.7)',
    accentEmoji: '🐉',
  },
  {
    id: 'frame-lord-imperator',
    title: 'Imperator Platinam Yulduz Ramka',
    price: 90,
    description: 'Akademiyaning eng nufuzli Koi va kosmik yulduzli Imperator ramkasi',
    type: 'image',
    imageUrl: KOI_FRAME_IMAGE,
    ringColor: '#ffd23f',
    glowColor: 'rgba(255,210,63,0.85)',
    accentEmoji: '🌌',
  },
  {
    id: 'frame-neon-lotus',
    title: 'Neon Nilufar (Lotus) Ramkasi',
    price: 27,
    description: 'Pushti-moviy nilufar barglari bilan bezatilgan nafis ramka',
    type: 'svg',
    ringColor: '#f472b6',
    glowColor: 'rgba(244,114,182,0.65)',
    accentEmoji: '🪷',
  },
  {
    id: 'frame-solar-eclipse',
    title: 'Quyosh Tutilishi (Solar Eclipse) Ramkasi',
    price: 48,
    description: 'Oltin va olovli quyosh toji nurlarini taratuvchi ramka',
    type: 'svg',
    ringColor: '#f59e0b',
    glowColor: 'rgba(245,158,11,0.75)',
    accentEmoji: '☀️',
  },
  {
    id: 'frame-arctic-wolf',
    title: 'Arktika Boʻrisi Muz Ramkasi',
    price: 34,
    description: 'Shimoliy yogʻdu va muz kristallari bilan qoplangan ramka',
    type: 'svg',
    ringColor: '#38bdf8',
    glowColor: 'rgba(56,189,248,0.7)',
    accentEmoji: '🐺',
  },
  {
    id: 'frame-magma-titan',
    title: 'Magma Titan Vulkan Ramkasi',
    price: 50,
    description: 'Qaynoq lava va vulqon uchqunlaridan iborat kuchli ramka',
    type: 'svg',
    ringColor: '#ea580c',
    glowColor: 'rgba(234,88,12,0.75)',
    accentEmoji: '🌋',
  },
  {
    id: 'frame-starlight-nova',
    title: 'Yulduzli Supernova Ramkasi',
    price: 52,
    description: 'Koinot yulduzlari va kometa izlari aylanuvchi ramka',
    type: 'svg',
    ringColor: '#eab308',
    glowColor: 'rgba(234,179,8,0.7)',
    accentEmoji: '🌠',
  },
  {
    id: 'frame-sakura-wind',
    title: 'Sakura Bahor Shamoli Ramkasi',
    price: 30,
    description: 'Yapon sakurasi gullari bilan bezatilgan romantik ramka',
    type: 'svg',
    ringColor: '#fb7185',
    glowColor: 'rgba(251,113,133,0.65)',
    accentEmoji: '🌺',
  },
  {
    id: 'frame-thunder-thor',
    title: 'Chaqmoq va Momaqaldiroq Ramkasi',
    price: 44,
    description: 'Yuqori kuchlanishli elektr razryadlari aylanuvchi ramka',
    type: 'svg',
    ringColor: '#06b6d4',
    glowColor: 'rgba(6,182,212,0.75)',
    accentEmoji: '🌩️',
  },
  {
    id: 'frame-jade-dragon',
    title: 'Nefrit Ajdarho Imperiya Ramkasi',
    price: 58,
    description: 'Sharqona yashil nefrit toshi va ajdarho timsolli ramka',
    type: 'svg',
    ringColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.75)',
    accentEmoji: '🐲',
  },
  {
    id: 'frame-ruby-royale',
    title: 'Yoqut Qirollik (Ruby Royale) Ramkasi',
    price: 54,
    description: 'Qimmatbaho qizil yoqut toshlari terilgan elit ramka',
    type: 'svg',
    ringColor: '#e11d48',
    glowColor: 'rgba(225,29,72,0.75)',
    accentEmoji: '♦️',
  },
  {
    id: 'frame-sapphire-ocean',
    title: 'Sapfir Okean Toʻlqini Ramkasi',
    price: 46,
    description: 'Chuqur okean marvaridlari va moviy sapfir halqasi',
    type: 'svg',
    ringColor: '#0284c7',
    glowColor: 'rgba(2,132,199,0.75)',
    accentEmoji: '🌊',
  },
  {
    id: 'frame-obsidian-stealth',
    title: 'Obsidian Tungi Soyalar Ramkasi',
    price: 40,
    description: 'Tungi rejimda kod yozuvchi ninjalar uchun kumush-qora ramka',
    type: 'svg',
    ringColor: '#94a3b8',
    glowColor: 'rgba(148,163,184,0.65)',
    accentEmoji: '🥷',
  },
  {
    id: 'frame-golden-laurel',
    title: 'Sezar Oltin Dafna Gulchambari',
    price: 62,
    description: 'Gʻoliblar uchun toza oltin dafna yaproqli chempion ramkasi',
    type: 'svg',
    ringColor: '#facc15',
    glowColor: 'rgba(250,204,21,0.8)',
    accentEmoji: '🏆',
  },
  {
    id: 'frame-quantum-prism',
    title: 'Kvant Prizma Spektr Ramkasi',
    price: 65,
    description: 'Yorugʻlik spektrini sinishi kabi tovlanuvchi prizma ramka',
    type: 'svg',
    ringColor: '#2dd4bf',
    glowColor: 'rgba(45,212,191,0.75)',
    accentEmoji: '🔮',
  },
  {
    id: 'frame-cyber-glitch',
    title: 'Cyber Glitch 2077 Ramkasi',
    price: 49,
    description: 'Kiberpank neon chiziqlar va raqamli impuls ramkasi',
    type: 'svg',
    ringColor: '#a3e635',
    glowColor: 'rgba(163,230,53,0.75)',
    accentEmoji: '🤖',
  },
  {
    id: 'frame-celestial-wings',
    title: 'Samoviy Qanotlar (Celestial) Ramkasi',
    price: 70,
    description: 'Ikki yonida nurli qanotlar bilan bezatilgan samoviy ramka',
    type: 'svg',
    ringColor: '#fde047',
    glowColor: 'rgba(253,224,71,0.8)',
    accentEmoji: '🪽',
  },
  {
    id: 'frame-binary-matrix',
    title: '0101 Binar Kod Halqasi',
    price: 38,
    description: 'Atrofida 0 va 1 raqamlari aylanuvchi algoritmik ramka',
    type: 'svg',
    ringColor: '#4ade80',
    glowColor: 'rgba(74,222,128,0.7)',
    accentEmoji: '💻',
  },
  {
    id: 'frame-phoenix-rebirth',
    title: 'Abadiy Qaqnus Qanoti Ramkasi',
    price: 68,
    description: 'Oltin-qirmizi qaqnus patlari bilan bezatilgan afsonaviy ramka',
    type: 'svg',
    ringColor: '#fb923c',
    glowColor: 'rgba(251,146,60,0.8)',
    accentEmoji: '🦅',
  },
  {
    id: 'frame-crystal-palace',
    title: 'Billur Saroy Qirol Ramkasi',
    price: 72,
    description: 'Toza billur va olmos qirralari porlab turuvchi ramka',
    type: 'svg',
    ringColor: '#67e8f9',
    glowColor: 'rgba(103,232,249,0.8)',
    accentEmoji: '🏰',
  },
  {
    id: 'frame-infinity-omega',
    title: 'Cheksizlik (Infinity Omega) Ramkasi',
    price: 85,
    description: 'Cheksiz bilim va yuqori daraja ramzi boʻlgan Omega halqasi',
    type: 'svg',
    ringColor: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.85)',
    accentEmoji: '♾️',
  },
  {
    id: 'frame-devmaster-supreme',
    title: 'DevMaster Supreme Grandmaster Ramkasi',
    price: 120,
    description: 'Akademiyaning eng qimmat va eng yorqin Koi + Oltin Toj kombinatsiyasi',
    type: 'image',
    imageUrl: KOI_FRAME_IMAGE,
    ringColor: '#3ee6c4',
    glowColor: 'rgba(62,230,196,0.9)',
    accentEmoji: '👑',
  },
];

export interface StageStickerInfo {
  id: string;
  label: string;
  shortLabel: string;
  bg: string;
  border: string;
  text: string;
  icon: string;
}

export function getStageSticker(stage: CourseStage = 'html', equippedBadge?: string): StageStickerInfo {
  if (equippedBadge && equippedBadge.trim() !== '') {
    const b = equippedBadge.trim();
    if (b.includes('LEGEND') || b === 'badge-legend' || b === '💎') {
      return {
        id: 'badge-legend',
        label: 'LEGEND',
        shortLabel: 'LEGEND',
        bg: 'bg-gradient-to-r from-[#ffd23f] via-[#ff8a3d] to-[#ff6b86]',
        border: 'border-[#ffd23f]',
        text: 'text-[#0a0912]',
        icon: '💎',
      };
    }
    if (b.includes('PRO') || b.includes('KING')) {
      return {
        id: 'badge-pro',
        label: b,
        shortLabel: 'PRO',
        bg: 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c]',
        border: 'border-white',
        text: 'text-[#0a0912]',
        icon: '👑',
      };
    }
    if (b.includes('CSS')) {
      return {
        id: 'stage-css',
        label: 'CSS Dizayner',
        shortLabel: 'CSS',
        bg: 'bg-[#0284c7]',
        border: 'border-[#7dd3fc]',
        text: 'text-white',
        icon: '🎨',
      };
    }
    if (b.includes('JS')) {
      return {
        id: 'stage-js',
        label: 'JS Dasturchi',
        shortLabel: 'JS',
        bg: 'bg-[#eab308]',
        border: 'border-[#fef08a]',
        text: 'text-[#0a0912]',
        icon: '⚡',
      };
    }
    if (b.includes('HTML')) {
      return {
        id: 'stage-html',
        label: 'HTML Poydevor',
        shortLabel: 'HTML',
        bg: 'bg-[#ea580c]',
        border: 'border-[#fdba74]',
        text: 'text-white',
        icon: '🧱',
      };
    }

    // Generic custom shop sticker parser (e.g. "REACT ⚛️", "TS PRO 🛡️", "SAMURAI ⚔️", etc.)
    const parts = b.split(' ');
    const lastPart = parts[parts.length - 1];
    const hasEmoji = /[^\w\s]/.test(lastPart);
    const icon = hasEmoji ? lastPart : '⭐';
    const wordPart = hasEmoji ? parts.slice(0, -1).join(' ') : b;
    const shortLabel = (wordPart || 'VIP').slice(0, 6).toUpperCase();

    return {
      id: `custom-${shortLabel}`,
      label: b,
      shortLabel,
      bg: 'bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f]',
      border: 'border-white/80',
      text: 'text-[#0a0912]',
      icon,
    };
  }

  switch (stage) {
    case 'html':
      return {
        id: 'stage-html',
        label: 'HTML Poydevor',
        shortLabel: 'HTML',
        bg: 'bg-[#ea580c]',
        border: 'border-[#fdba74]',
        text: 'text-white',
        icon: '🧱',
      };
    case 'css':
      return {
        id: 'stage-css',
        label: 'CSS Dizayner',
        shortLabel: 'CSS',
        bg: 'bg-[#0284c7]',
        border: 'border-[#7dd3fc]',
        text: 'text-white',
        icon: '🎨',
      };
    case 'javascript':
      return {
        id: 'stage-js',
        label: 'JS Dasturchi',
        shortLabel: 'JS',
        bg: 'bg-[#eab308]',
        border: 'border-[#fef08a]',
        text: 'text-[#0a0912]',
        icon: '⚡',
      };
    case 'graduated':
      return {
        id: 'stage-grad',
        label: 'Legend Bitiruvchi',
        shortLabel: 'LEGEND',
        bg: 'bg-gradient-to-r from-[#ffd23f] to-[#ff6b86]',
        border: 'border-white',
        text: 'text-[#0a0912]',
        icon: '🏆',
      };
    default:
      return {
        id: 'stage-pro',
        label: stage.toUpperCase(),
        shortLabel: stage.slice(0, 4).toUpperCase(),
        bg: 'bg-[#10b981]',
        border: 'border-[#6ee7b7]',
        text: 'text-[#0a0912]',
        icon: '🚀',
      };
  }
}

export function isStudentCurrentlyOnline(student?: Student, isCurrentUser = false): boolean {
  const browserOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const syncOnline = getSyncStatus() !== 'offline';
  if (isCurrentUser) {
    return browserOnline && syncOnline;
  }
  if (!student) return browserOnline;
  if (!browserOnline || !syncOnline) return false;
  if (student.isOnline === false) return false;
  if (student.lastSeenAt && Date.now() - student.lastSeenAt < 1000 * 60 * 30) {
    return true;
  }
  if (
    student.lastActive &&
    (student.lastActive.toLowerCase().includes('hozir') ||
      student.lastActive.toLowerCase().includes('online') ||
      student.lastActive.toLowerCase().includes('onlayn'))
  ) {
    return true;
  }
  return Boolean(student.isOnline ?? true);
}

export interface AvatarWithFrameProps {
  student?: Student;
  src?: string;
  alt?: string;
  frameId?: string;
  stage?: CourseStage;
  equippedBadge?: string;
  isOnline?: boolean;
  size?: number;
  isCurrentUser?: boolean;
  onClick?: () => void;
  showSticker?: boolean;
  showStageSticker?: boolean;
  showOnlineDot?: boolean;
  className?: string;
}

export const AvatarWithFrame: React.FC<AvatarWithFrameProps> = ({
  student,
  src,
  alt,
  frameId,
  stage,
  equippedBadge,
  isOnline,
  size = 64,
  isCurrentUser = false,
  onClick,
  showSticker = true,
  showStageSticker,
  showOnlineDot = true,
  className = '',
}) => {
  const rawAvatar = src || student?.avatar || '';
  const avatarSrc =
    rawAvatar &&
    rawAvatar !== '/assets/male_programmer_avatar.svg' &&
    rawAvatar.trim() !== ''
      ? rawAvatar
      : DEFAULT_GRAY_AVATAR;

  const resolvedFrameId = frameId ?? student?.equippedFrame;
  const frameObj =
    ORNATE_SHOP_FRAMES.find((f) => f.id === resolvedFrameId) ||
    (resolvedFrameId?.includes('koi') ? ORNATE_SHOP_FRAMES[0] : undefined);

  const online =
    typeof isOnline === 'boolean'
      ? isOnline
      : isStudentCurrentlyOnline(student, isCurrentUser);

  const resolvedStage = stage || student?.stage || 'html';
  const resolvedBadge = equippedBadge ?? student?.equippedBadge;
  const sticker = getStageSticker(resolvedStage, resolvedBadge);
  const displaySticker = showStageSticker !== undefined ? showStageSticker : showSticker;

  const frameScale = Math.round(size * 1.34);
  const dotSize = Math.max(11, Math.round(size * 0.2));
  const displayName = alt || (student ? `${student.name} ${student.surname}` : 'Talaba');

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      title={
        onClick
          ? `${displayName} profilini ko'rish (${online ? 'Online' : 'Offline'})`
          : undefined
      }
    >
      {/* Avatar Base Circle */}
      <div
        style={{
          width: size,
          height: size,
          boxShadow: frameObj ? `0 0 18px ${frameObj.glowColor}` : undefined,
          borderColor: frameObj ? frameObj.ringColor : 'rgba(255,255,255,0.25)',
        }}
        className="rounded-full overflow-hidden border-2 bg-[#1a1829] flex items-center justify-center relative z-10 transition-transform group-hover:scale-105"
      >
        <img
          src={avatarSrc}
          alt={displayName}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = DEFAULT_GRAY_AVATAR;
          }}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Ornate Frame Overlay (Koi Fish Image or Custom SVG Ring) */}
      {frameObj && frameObj.type === 'image' && frameObj.imageUrl && (
        <img
          src={frameObj.imageUrl}
          alt={frameObj.title}
          referrerPolicy="no-referrer"
          style={{
            width: frameScale,
            height: frameScale,
            mixBlendMode: 'screen',
          }}
          className="absolute pointer-events-none z-20 object-contain rounded-full"
        />
      )}

      {frameObj && frameObj.type === 'svg' && (
        <svg
          viewBox="0 0 120 120"
          style={{ width: frameScale, height: frameScale }}
          className="absolute pointer-events-none z-20"
        >
          <defs>
            <linearGradient id={`grad-${frameObj.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={frameObj.ringColor} />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor={frameObj.ringColor} />
            </linearGradient>
          </defs>
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke={`url(#grad-${frameObj.id})`}
            strokeWidth="4"
            strokeDasharray="14 6 4 6"
          />
          <circle
            cx="60"
            cy="60"
            r="53"
            fill="none"
            stroke={frameObj.ringColor}
            strokeWidth="1.5"
            strokeOpacity="0.7"
          />
          <text x="60" y="14" textAnchor="middle" fontSize="14">
            {frameObj.accentEmoji}
          </text>
          <text x="18" y="102" textAnchor="middle" fontSize="12">
            ✨
          </text>
          <text x="102" y="102" textAnchor="middle" fontSize="12">
            ✨
          </text>
        </svg>
      )}

      {/* Top-Right Online (Green) or Offline (Red) Status Indicator */}
      {showOnlineDot && (
        <span
          style={{ width: dotSize, height: dotSize }}
          title={online ? 'Online (Tarmoqda)' : 'Offline (Aloqa uzilgan)'}
          className={`absolute top-0 right-0 z-30 rounded-full border-2 border-[#0e0d1a] ${
            online
              ? 'bg-[#22c55e] shadow-[0_0_8px_#22c55e]'
              : 'bg-[#ef4444] shadow-[0_0_8px_#ef4444]'
          }`}
        />
      )}

      {/* Bottom-Right Stage / Legend Sticker */}
      {displaySticker && (
        <span
          title={sticker.label}
          className={`absolute -bottom-1 -right-1.5 z-30 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border text-[9px] font-black leading-none shadow-md ${sticker.bg} ${sticker.border} ${sticker.text}`}
        >
          <span>{sticker.icon}</span>
          {size >= 46 && <span>{sticker.shortLabel}</span>}
        </span>
      )}
    </div>
  );
};
