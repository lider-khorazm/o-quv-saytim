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
          {/* Base inner ring */}
          <circle
            cx="60"
            cy="60"
            r="44"
            fill="none"
            stroke={frameObj.ringColor}
            strokeWidth="2.5"
          />

          {/* 1. Golden Laurel & Gold Crown */}
          {(frameObj.id === 'frame-golden-laurel' || frameObj.id === 'frame-gold-crown') && (
            <g>
              {[-65, -48, -31, -14, 3, 20, 37, 54, 71].map((ang, i) => (
                <React.Fragment key={i}>
                  <g transform={`rotate(${ang} 60 60)`}>
                    <path
                      d="M 13 60 Q 6 52 12 45 Q 18 52 13 60 Z"
                      fill={frameObj.ringColor}
                      opacity="0.9"
                    />
                  </g>
                  <g transform={`scale(-1, 1) translate(-120, 0) rotate(${ang} 60 60)`}>
                    <path
                      d="M 13 60 Q 6 52 12 45 Q 18 52 13 60 Z"
                      fill={frameObj.ringColor}
                      opacity="0.9"
                    />
                  </g>
                </React.Fragment>
              ))}
              {frameObj.id === 'frame-golden-laurel' ? (
                <polygon
                  points="60,4 65,9 60,14 55,9"
                  fill={frameObj.ringColor}
                  stroke="#ffffff"
                  strokeWidth="1.2"
                />
              ) : (
                <polygon
                  points="52,14 50,5 56,9 60,3 64,9 70,5 68,14"
                  fill={frameObj.ringColor}
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              )}
            </g>
          )}

          {/* 2. Aurora Coral, Neon Lotus, Sakura Wind (12 petals + 12 dots) */}
          {(frameObj.id === 'frame-aurora-coral' ||
            frameObj.id === 'frame-neon-lotus' ||
            frameObj.id === 'frame-sakura-wind') && (
            <g>
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 60 60)`}>
                  <path
                    d="M 60 15 C 56 8, 56 4, 60 2 C 64 4, 64 8, 60 15 Z"
                    fill={frameObj.ringColor}
                    stroke="#ffffff"
                    strokeWidth="0.6"
                  />
                  <circle
                    cx="60"
                    cy="7"
                    r="1.3"
                    fill="#ffffff"
                    transform="rotate(15 60 60)"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 3. Sunset Orange, Phoenix Rebirth, Magma Titan (12 flame petals) */}
          {(frameObj.id === 'frame-sunset-orange' ||
            frameObj.id === 'frame-phoenix-rebirth' ||
            frameObj.id === 'frame-magma-titan') && (
            <g>
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 60 60)`}>
                  <path
                    d="M 55 16 Q 58 5 60 1 Q 66 8 65 16 Z"
                    fill={frameObj.ringColor}
                  />
                  <path
                    d="M 58 15 Q 60 7 60 4 Q 63 9 62 15 Z"
                    fill="#fde047"
                    opacity="0.65"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 4. Cyan Diamond, Crystal Palace, Arctic Wolf, Quantum Prism (16 crystal spikes) */}
          {(frameObj.id === 'frame-cyan-diamond' ||
            frameObj.id === 'frame-crystal-palace' ||
            frameObj.id === 'frame-arctic-wolf' ||
            frameObj.id === 'frame-quantum-prism') && (
            <g>
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 22.5} 60 60)`}>
                  <polygon
                    points="56,16 60,2 64,16"
                    fill={frameObj.ringColor}
                    fillOpacity="0.85"
                    stroke="#ffffff"
                    strokeWidth="0.6"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 5. Mint Cyber, Cyber Glitch, Binary Matrix, Emerald Hacker (Tech HUD ring) */}
          {(frameObj.id === 'frame-mint-cyber' ||
            frameObj.id === 'frame-cyber-glitch' ||
            frameObj.id === 'frame-binary-matrix' ||
            frameObj.id === 'frame-emerald-hacker') && (
            <g>
              <circle
                cx="60"
                cy="60"
                r="49"
                fill="none"
                stroke={frameObj.ringColor}
                strokeWidth="2.5"
                strokeDasharray="1.5 6"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={frameObj.ringColor}
                strokeWidth="2"
                strokeDasharray="2 5"
                opacity="0.85"
              />
              {[0, 90, 180, 270].map((ang) => (
                <g key={ang} transform={`rotate(${ang} 60 60)`}>
                  <line
                    x1="60"
                    y1="16"
                    x2="60"
                    y2="4"
                    stroke={frameObj.ringColor}
                    strokeWidth="2"
                  />
                  <circle
                    cx="60"
                    cy="4"
                    r="2.5"
                    fill="#ffffff"
                    stroke={frameObj.ringColor}
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 6. Lime Energy & Thunder Thor (8 lightning bolts) */}
          {(frameObj.id === 'frame-lime-energy' || frameObj.id === 'frame-thunder-thor') && (
            <g>
              <circle
                cx="60"
                cy="60"
                r="47"
                fill="none"
                stroke={frameObj.ringColor}
                strokeWidth="1.5"
                strokeDasharray="5 4"
              />
              {Array.from({ length: 8 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 45 + 15} 60 60)`}>
                  <polyline
                    points="58,14 63,8 57,7 62,1"
                    fill="none"
                    stroke={frameObj.ringColor}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="58,14 63,8 57,7 62,1"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 7. Celestial Wings */}
          {frameObj.id === 'frame-celestial-wings' && (
            <g>
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke={frameObj.ringColor}
                strokeWidth="1.4"
              />
              {[-36, -18, 0, 18, 36].map((ang, i) => (
                <React.Fragment key={i}>
                  <g transform={`rotate(${ang} 60 60)`}>
                    <path
                      d="M 12 60 C 2 56, 2 64, 12 60 Z"
                      fill={frameObj.ringColor}
                      stroke="#ffffff"
                      strokeWidth="0.8"
                    />
                  </g>
                  <g transform={`rotate(${ang + 180} 60 60)`}>
                    <path
                      d="M 12 60 C 2 56, 2 64, 12 60 Z"
                      fill={frameObj.ringColor}
                      stroke="#ffffff"
                      strokeWidth="0.8"
                    />
                  </g>
                </React.Fragment>
              ))}
              <circle cx="60" cy="5" r="2.2" fill={frameObj.ringColor} />
              <circle cx="60" cy="115" r="2.2" fill={frameObj.ringColor} />
            </g>
          )}

          {/* 8. Ruby Royale, Crimson Samurai, Obsidian Stealth (Royal Gem Ring) */}
          {(frameObj.id === 'frame-ruby-royale' ||
            frameObj.id === 'frame-crimson-samurai' ||
            frameObj.id === 'frame-obsidian-stealth') && (
            <g>
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke={frameObj.ringColor}
                strokeWidth="1.2"
                opacity="0.8"
              />
              {[0, 90, 180, 270].map((ang) => (
                <g key={ang} transform={`rotate(${ang} 60 60)`}>
                  <polygon
                    points="60,4 64,10 60,16 56,10"
                    fill={frameObj.ringColor}
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                </g>
              ))}
              {[45, 135, 225, 315].map((ang) => (
                <g key={ang} transform={`rotate(${ang} 60 60)`}>
                  <polygon
                    points="60,8 62.5,11 60,14 57.5,11"
                    fill={frameObj.ringColor}
                    stroke="#ffffff"
                    strokeWidth="0.9"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 9. Sapphire Ocean & Jade Dragon (Scalloped Waves / Scales) */}
          {(frameObj.id === 'frame-sapphire-ocean' || frameObj.id === 'frame-jade-dragon') && (
            <g>
              {Array.from({ length: 16 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 22.5} 60 60)`}>
                  <path
                    d="M 52 15 Q 60 6 68 15"
                    fill="none"
                    stroke={frameObj.ringColor}
                    strokeWidth="2"
                  />
                  <path
                    d="M 54 11 Q 60 2 66 11"
                    fill="none"
                    stroke={i % 2 === 0 ? '#ffffff' : frameObj.ringColor}
                    strokeWidth="1.4"
                    opacity="0.85"
                  />
                  {frameObj.id === 'frame-jade-dragon' && (
                    <circle cx="60" cy="9" r="1.4" fill={frameObj.ringColor} />
                  )}
                </g>
              ))}
            </g>
          )}

          {/* 10. Solar Eclipse, Starlight Nova, Infinity Omega (Sunburst Rays) */}
          {(frameObj.id === 'frame-solar-eclipse' ||
            frameObj.id === 'frame-starlight-nova' ||
            frameObj.id === 'frame-infinity-omega') && (
            <g>
              {Array.from({ length: 24 }).map((_, i) => {
                const isLong = i % 2 === 0;
                const isCardinal = i % 6 === 0;
                return (
                  <g key={i} transform={`rotate(${i * 15} 60 60)`}>
                    <line
                      x1="60"
                      y1="15"
                      x2="60"
                      y2={isLong ? '2' : '8'}
                      stroke={isCardinal && !isLong ? '#ffffff' : frameObj.ringColor}
                      strokeWidth={isLong ? '2.2' : '1.6'}
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
              {[0, 90, 180, 270].map((ang) => (
                <g key={ang} transform={`rotate(${ang} 60 60)`}>
                  <line
                    x1="60"
                    y1="5"
                    x2="60"
                    y2="1"
                    stroke="#ffffff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </g>
              ))}
            </g>
          )}
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
