import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  Zap,
  Bug,
  Code2,
  Award,
  Crown,
  Flame,
  Medal,
  Target,
  ChevronRight,
  Star,
  Layers,
  ShieldCheck,
  Lock,
  Download,
  Share2,
  Check,
  Palette,
} from 'lucide-react';
import { StudentAccount } from '../data/learningCurriculum';
import { AuroraMascot } from './AuroraMascot';

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
export type BadgeCategory = 'all' | 'xp' | 'stages' | 'games' | 'mastery';

export interface AchievementBadgeDef {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'xp' | 'stages' | 'games' | 'mastery';
  tier: BadgeTier;
  iconType: 'target' | 'code' | 'flame' | 'bug' | 'palette' | 'zap' | 'layers' | 'award' | 'crown' | 'shield' | 'star' | 'trophy';
  xpBonus: number;
  conditionDescription: string;
  lore: string;
  checkUnlocked: (stats: {
    xp: number;
    gamesCompleted: number;
    completedStages: ('html' | 'css' | 'js')[];
    quizPassed: Record<'html' | 'css' | 'js', boolean>;
    tagStreak: number;
    cardCompleted: boolean;
    rank: number;
  }) => {
    isUnlocked: boolean;
    currentProgress: number;
    targetProgress: number;
    progressPercent: number;
    progressLabel: string;
    remainingLabel?: string;
  };
}

export const TIER_CONFIG: Record<
  BadgeTier,
  {
    nameUz: string;
    emoji: string;
    borderClass: string;
    glowClass: string;
    bgGradient: string;
    badgePill: string;
    iconBg: string;
    textAccent: string;
  }
> = {
  bronze: {
    nameUz: 'Bronza Medali',
    emoji: '🥉',
    borderClass: 'border-[#ff8a3d]/40 hover:border-[#ff8a3d]',
    glowClass: 'shadow-[#ff8a3d]/20',
    bgGradient: 'from-[#ff8a3d]/10 via-[#ff6b86]/5 to-transparent',
    badgePill: 'bg-[#ff8a3d]/20 text-[#ff8a3d] border-[#ff8a3d]/40 font-extrabold',
    iconBg: 'bg-gradient-to-br from-[#ff8a3d] to-[#d96218] text-[#0a0912]',
    textAccent: 'text-[#ff8a3d]',
  },
  silver: {
    nameUz: 'Kumush Medali',
    emoji: '🥈',
    borderClass: 'border-[#3ee6c4]/40 hover:border-[#3ee6c4]',
    glowClass: 'shadow-[#3ee6c4]/20',
    bgGradient: 'from-[#3ee6c4]/10 via-white/5 to-transparent',
    badgePill: 'bg-[#3ee6c4]/20 text-[#3ee6c4] border-[#3ee6c4]/40 font-extrabold',
    iconBg: 'bg-gradient-to-br from-[#3ee6c4] to-[#1aa88b] text-[#0a0912]',
    textAccent: 'text-[#3ee6c4]',
  },
  gold: {
    nameUz: 'Oltin Medali',
    emoji: '🥇',
    borderClass: 'border-[#ffd23f]/60 hover:border-[#ffd23f]',
    glowClass: 'shadow-[#ffd23f]/25 ring-1 ring-[#ffd23f]/30',
    bgGradient: 'from-[#ffd23f]/15 via-[#ff8a3d]/10 to-transparent',
    badgePill: 'bg-[#ffd23f]/20 text-[#ffd23f] border-[#ffd23f]/50 font-black',
    iconBg: 'bg-gradient-to-br from-[#ffd23f] via-[#ff8a3d] to-[#ff6b86] text-[#0a0912] shadow-md',
    textAccent: 'text-[#ffd23f]',
  },
  platinum: {
    nameUz: 'Platina Medali',
    emoji: '💠',
    borderClass: 'border-[#b6f03c]/60 hover:border-[#b6f03c]',
    glowClass: 'shadow-[#b6f03c]/25 ring-1 ring-[#b6f03c]/30',
    bgGradient: 'from-[#b6f03c]/15 via-[#3ee6c4]/10 to-transparent',
    badgePill: 'bg-[#b6f03c]/20 text-[#b6f03c] border-[#b6f03c]/50 font-black',
    iconBg: 'bg-gradient-to-br from-[#b6f03c] via-[#3ee6c4] to-[#1aa88b] text-[#0a0912] shadow-md',
    textAccent: 'text-[#b6f03c]',
  },
  diamond: {
    nameUz: 'Olmos Medali',
    emoji: '💎',
    borderClass: 'border-[#ff6b86]/70 hover:border-[#ff6b86]',
    glowClass: 'shadow-[#ff6b86]/35 ring-2 ring-[#ff6b86]/40',
    bgGradient: 'from-[#ff6b86]/20 via-[#ffd23f]/10 to-[#3ee6c4]/15',
    badgePill: 'bg-[#ff6b86]/25 text-[#ff6b86] border-[#ff6b86]/60 font-black',
    iconBg: 'bg-gradient-to-br from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] text-[#0a0912] shadow-lg animate-pulse',
    textAccent: 'text-[#ff6b86]',
  },
};

export const fireMedalCelebrationConfetti = (tier?: BadgeTier) => {
  try {
    let colors = ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'];
    if (tier === 'diamond') {
      colors = ['#ff6b86', '#3ee6c4', '#ffd23f', '#ffffff', '#b6f03c'];
    } else if (tier === 'platinum') {
      colors = ['#b6f03c', '#3ee6c4', '#ffffff', '#ffd23f'];
    } else if (tier === 'gold') {
      colors = ['#ffd23f', '#ff8a3d', '#ff6b86', '#ffffff'];
    } else if (tier === 'silver') {
      colors = ['#3ee6c4', '#ffffff', '#b6f03c'];
    } else if (tier === 'bronze') {
      colors = ['#ff8a3d', '#ffd23f', '#ff6b86'];
    }

    confetti({
      particleCount: 70,
      angle: 60,
      spread: 75,
      origin: { x: 0.05, y: 0.7 },
      colors,
    });

    confetti({
      particleCount: 70,
      angle: 120,
      spread: 75,
      origin: { x: 0.95, y: 0.7 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 90,
        spread: 110,
        origin: { x: 0.5, y: 0.4 },
        colors,
      });
    }, 220);
  } catch (err) {
    console.error('Confetti animation error:', err);
  }
};

export const ACHIEVEMENT_BADGES: AchievementBadgeDef[] = [
  {
    id: 'badge_first_step',
    title: 'Birinchi Qadam',
    shortTitle: 'Boshlovchi',
    description: "O'yinlar maydonida ilk dasturlash topshirig'ini muvaffaqiyatli topshirish.",
    category: 'games',
    tier: 'bronze',
    iconType: 'target',
    xpBonus: 20,
    conditionDescription: 'Kamida 1 ta bosqichni yechish',
    lore: "Har qanday buyuk dasturchining yo'li bitta muvaffaqiyatli yechilgan koddan boshlanadi.",
    checkUnlocked: (stats) => {
      const cur = Math.min(stats.gamesCompleted, 1);
      return {
        isUnlocked: cur >= 1,
        currentProgress: cur,
        targetProgress: 1,
        progressPercent: Math.round((cur / 1) * 100),
        progressLabel: `${cur} / 1 ta bosqich`,
        remainingLabel: cur >= 1 ? undefined : '1 ta bosqichni yeching',
      };
    },
  },
  {
    id: 'badge_html_explorer',
    title: 'HTML Kashfiyotchisi',
    shortTitle: 'HTML Ustasi',
    description: "HTML o'quv bosqichini yakunlash yoki testidan muvaffaqiyatli o'tish.",
    category: 'stages',
    tier: 'bronze',
    iconType: 'code',
    xpBonus: 40,
    conditionDescription: 'HTML bosqichini yakunlash',
    lore: "Veb olamining eng mustahkam poydevori bo'lmish semantik HTML arxitekturasini o'zlashtirganlik belgisi.",
    checkUnlocked: (stats) => {
      const ok = stats.completedStages.includes('html') || stats.quizPassed.html;
      return {
        isUnlocked: ok,
        currentProgress: ok ? 1 : 0,
        targetProgress: 1,
        progressPercent: ok ? 100 : 0,
        progressLabel: ok ? 'Tugallangan' : 'Boshlanmagan',
        remainingLabel: ok ? undefined : 'HTML darsini yoki testini topshiring',
      };
    },
  },
  {
    id: 'badge_tag_streaker',
    title: 'Teglar Bilimdoni',
    shortTitle: 'Teg Streaker',
    description: "Teg Moslashtiruvchida kamida 3 ta ketma-ket to'g'ri javoblar zanjirini (Streak) to'plash.",
    category: 'games',
    tier: 'silver',
    iconType: 'flame',
    xpBonus: 35,
    conditionDescription: "3 ta ketma-ket to'g'ri teg topish",
    lore: "HTML teglarining vazifasini bir qarashda aniqlash qobiliyati va yuksak e'tibor mukofoti.",
    checkUnlocked: (stats) => {
      const cur = Math.min(stats.tagStreak, 3);
      return {
        isUnlocked: cur >= 3,
        currentProgress: cur,
        targetProgress: 3,
        progressPercent: Math.round((cur / 3) * 100),
        progressLabel: `${cur} / 3 ketma-ket javob`,
        remainingLabel: cur >= 3 ? undefined : `Yana ${3 - cur} ta to'g'ri javob kerak`,
      };
    },
  },
  {
    id: 'badge_bug_hunter',
    title: 'Bug Hunter (Xato Qotili)',
    shortTitle: 'Bug Buster',
    description: 'Dasturdagi sintaktik va semantik xatolarni fosh qilib, kamida 3 ta bosqichni bartaraf etish.',
    category: 'games',
    tier: 'silver',
    iconType: 'bug',
    xpBonus: 45,
    conditionDescription: 'Kamida 3 ta xatolikni bartaraf etish',
    lore: "Koddagi eng yashirin kamchiliklarni o'tkir nigoh bilan fosh etuvchi debug ustasi.",
    checkUnlocked: (stats) => {
      const cur = Math.min(stats.gamesCompleted, 3);
      return {
        isUnlocked: cur >= 3,
        currentProgress: cur,
        targetProgress: 3,
        progressPercent: Math.round((cur / 3) * 100),
        progressLabel: `${cur} / 3 ta xato tuzatildi`,
        remainingLabel: cur >= 3 ? undefined : `Yana ${3 - cur} ta xatoni toping`,
      };
    },
  },
  {
    id: 'badge_css_wizard',
    title: 'CSS & Dizayn Sehrgari',
    shortTitle: 'CSS Wizard',
    description: "CSS o'quv bosqichini tamomlash yoki selektorlar arenasi sinovidan a'lo baho bilan o'tish.",
    category: 'stages',
    tier: 'silver',
    iconType: 'palette',
    xpBonus: 50,
    conditionDescription: 'CSS bosqichini tamomlash',
    lore: "Ranglar, tipografiya va zamonaviy Flexbox/Grid texnologiyalari bilan sahifaga ruh bag'ishlovchi sehrgar.",
    checkUnlocked: (stats) => {
      const ok = stats.completedStages.includes('css') || stats.quizPassed.css;
      return {
        isUnlocked: ok,
        currentProgress: ok ? 1 : 0,
        targetProgress: 1,
        progressPercent: ok ? 100 : 0,
        progressLabel: ok ? 'Tugallangan' : 'Boshlanmagan',
        remainingLabel: ok ? undefined : 'CSS bosqichini yakunlang',
      };
    },
  },
  {
    id: 'badge_xp_500',
    title: '500 XP Chempioni',
    shortTitle: '500 XP',
    description: 'Akademiyada kamida 500 Tajriba Ochkosi (XP) to\'plab, nufuzli reyting sari yo\'l olish.',
    category: 'xp',
    tier: 'gold',
    iconType: 'zap',
    xpBonus: 60,
    conditionDescription: "500 XP to'plash",
    lore: "Mehnatsevarlik va tizimli o'rganish natijasida 500 XP marrasini zabt etgan koder.",
    checkUnlocked: (stats) => {
      const cur = Math.min(stats.xp, 500);
      return {
        isUnlocked: stats.xp >= 500,
        currentProgress: cur,
        targetProgress: 500,
        progressPercent: Math.round((cur / 500) * 100),
        progressLabel: `${cur} / 500 XP`,
        remainingLabel: stats.xp >= 500 ? undefined : `Yana ${500 - stats.xp} XP kerak`,
      };
    },
  },
  {
    id: 'badge_card_architect',
    title: 'Vizual Arxitektor',
    shortTitle: 'Konstruktor',
    description: "Interaktiv kartochka konstruktorida shaxsiy dizayn va tugmalarni to'liq yig'ish.",
    category: 'mastery',
    tier: 'gold',
    iconType: 'layers',
    xpBonus: 65,
    conditionDescription: 'Kartochka konstruktori sinovini bajarish',
    lore: "Oddiy HTML teglari va CSS stillaridan foydalanib go'zal shaxsiy kartochka yarata oluvchi me'mor.",
    checkUnlocked: (stats) => {
      return {
        isUnlocked: stats.cardCompleted,
        currentProgress: stats.cardCompleted ? 1 : 0,
        targetProgress: 1,
        progressPercent: stats.cardCompleted ? 100 : 0,
        progressLabel: stats.cardCompleted ? 'Tayyor' : 'Kutilmoqda',
        remainingLabel: stats.cardCompleted
          ? undefined
          : "Konstruktor o'yinida 'Topshiriqni Yakunlash' tugmasini bosing",
      };
    },
  },
  {
    id: 'badge_js_hacker',
    title: 'JavaScript Hakker',
    shortTitle: 'JS Hakker',
    description: "JavaScript mantiqiy bosqichini tamomlash va interaktiv skriptlar sinovidan o'tish.",
    category: 'stages',
    tier: 'gold',
    iconType: 'code',
    xpBonus: 70,
    conditionDescription: 'JS bosqichini tamomlash',
    lore: 'Veb-sahifani dinamik jonlantiruvchi va murakkab funksiyalarni erkin boshqaruvchi kod ustasi.',
    checkUnlocked: (stats) => {
      const ok = stats.completedStages.includes('js') || stats.quizPassed.js;
      return {
        isUnlocked: ok,
        currentProgress: ok ? 1 : 0,
        targetProgress: 1,
        progressPercent: ok ? 100 : 0,
        progressLabel: ok ? 'Tugallangan' : 'Boshlanmagan',
        remainingLabel: ok ? undefined : 'JavaScript darsini yoki testini topshiring',
      };
    },
  },
  {
    id: 'badge_xp_1000',
    title: '1,000 XP Afsonasi',
    shortTitle: '1,000 XP',
    description: "1,000 Tajriba Ochkosiga yetib, akademiyaning elita o'quvchilari qatoriga qo'shilish.",
    category: 'xp',
    tier: 'platinum',
    iconType: 'award',
    xpBonus: 100,
    conditionDescription: "1,000 XP to'plash",
    lore: "Minglab ochkolarni yig'ib, o'z bilimini o'nlab topshiriqlarda isbotlagan haqiqiy afsona.",
    checkUnlocked: (stats) => {
      const cur = Math.min(stats.xp, 1000);
      return {
        isUnlocked: stats.xp >= 1000,
        currentProgress: cur,
        targetProgress: 1000,
        progressPercent: Math.round((cur / 1000) * 100),
        progressLabel: `${cur} / 1,000 XP`,
        remainingLabel: stats.xp >= 1000 ? undefined : `Yana ${1000 - stats.xp} XP kerak`,
      };
    },
  },
  {
    id: 'badge_podium_master',
    title: 'Peshqadamlar Podiumi',
    shortTitle: 'Top 3 Reyting',
    description: "Umumiy akademiyaning peshqadamlar jadvalida Top 3 o'ringa kirish.",
    category: 'mastery',
    tier: 'platinum',
    iconType: 'crown',
    xpBonus: 120,
    conditionDescription: "Reytingda 1, 2 yoki 3-o'rinni egallash",
    lore: "Akademiya o'quvchilari orasida eng yuqori natijalar ko'rsatib, shohona shohsupaga ko'tarilgan g'olib.",
    checkUnlocked: (stats) => {
      const ok = stats.rank <= 3;
      return {
        isUnlocked: ok,
        currentProgress: ok ? 1 : 0,
        targetProgress: 1,
        progressPercent: ok ? 100 : 0,
        progressLabel: ok ? `#${stats.rank} - o'rinda!` : `Hozir: #${stats.rank} - o'rin`,
        remainingLabel: ok ? undefined : "Reytingda ko'proq XP to'plab Top 3 ga kiring",
      };
    },
  },
  {
    id: 'badge_full_stack_trio',
    title: "To'liq Web Trio",
    shortTitle: 'Trio Master',
    description: "HTML, CSS va JavaScript bo'yicha barcha 3 ta asosiy bosqichni to'liq tugatish.",
    category: 'stages',
    tier: 'diamond',
    iconType: 'shield',
    xpBonus: 150,
    conditionDescription: 'HTML, CSS va JS bosqichlarini yakunlash',
    lore: "Web dasturlashning barcha uch ustunini (tuzilish, uslub va mantiq) to'liq egallagan universal muhandis.",
    checkUnlocked: (stats) => {
      const count = (['html', 'css', 'js'] as const).filter(
        (s) => stats.completedStages.includes(s) || stats.quizPassed[s]
      ).length;
      return {
        isUnlocked: count === 3,
        currentProgress: count,
        targetProgress: 3,
        progressPercent: Math.round((count / 3) * 100),
        progressLabel: `${count} / 3 bosqich topshirildi`,
        remainingLabel: count === 3 ? undefined : `Yana ${3 - count} ta bosqichni tugating`,
      };
    },
  },
  {
    id: 'badge_grandmaster',
    title: 'Grossmeyster Web Arxitektor',
    shortTitle: 'Grossmeyster',
    description: "1,500+ XP to'plash va 5-daraja (Senior Web Arxitektor) oliy maqomiga erishish.",
    category: 'xp',
    tier: 'diamond',
    iconType: 'star',
    xpBonus: 200,
    conditionDescription: "1,500 XP to'plash va 5-darajaga yetish",
    lore: "Akademiyaning eng yuqori cho'qqisi. Bu unvon faqat o'z sohasining haqiqiy me'morlariga beriladi.",
    checkUnlocked: (stats) => {
      const cur = Math.min(stats.xp, 1500);
      return {
        isUnlocked: stats.xp >= 1500,
        currentProgress: cur,
        targetProgress: 1500,
        progressPercent: Math.round((cur / 1500) * 100),
        progressLabel: `${cur} / 1,500 XP`,
        remainingLabel: stats.xp >= 1500 ? undefined : `Yana ${1500 - stats.xp} XP kerak`,
      };
    },
  },
];

interface HtmlCodeGamesProps {
  studentAccount?: StudentAccount | null;
  onUpdateAccount?: (updated: StudentAccount) => void;
  onOpenRegister?: () => void;
}

interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badgeColor: string;
}

const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Boshlovchi Koder', minXp: 0, maxXp: 150, badgeColor: 'bg-[#ff8a3d]/20 text-[#ff8a3d] border-[#ff8a3d]/40' },
  { level: 2, title: 'Izlanuvchi Dasturchi', minXp: 150, maxXp: 400, badgeColor: 'bg-[#3ee6c4]/20 text-[#3ee6c4] border-[#3ee6c4]/40' },
  { level: 3, title: 'CSS & Dizayn Ustasi', minXp: 400, maxXp: 800, badgeColor: 'bg-[#b6f03c]/20 text-[#b6f03c] border-[#b6f03c]/40' },
  { level: 4, title: 'JavaScript Hakker', minXp: 800, maxXp: 1400, badgeColor: 'bg-[#ff6b86]/20 text-[#ff6b86] border-[#ff6b86]/40' },
  { level: 5, title: 'Senior Web Arxitektor', minXp: 1400, maxXp: 99999, badgeColor: 'bg-[#ffd23f]/20 text-[#ffd23f] border-[#ffd23f]/40' },
];

function getLevelInfo(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

interface LeaderboardPlayer {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  xp: number;
  level: number;
  levelTitle: string;
  gamesCompleted: number;
  accuracy: number;
  streak: number;
  isCurrentUser?: boolean;
}

const INITIAL_LEADERBOARD: LeaderboardPlayer[] = [
  {
    id: 'p1',
    name: 'Olimjon Alijonov',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    xp: 1650,
    level: 5,
    levelTitle: 'Senior Web Arxitektor',
    gamesCompleted: 52,
    accuracy: 98,
    streak: 14,
  },
  {
    id: 'p2',
    name: 'Bobur Mirzayev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    xp: 1420,
    level: 5,
    levelTitle: 'Senior Web Arxitektor',
    gamesCompleted: 45,
    accuracy: 96,
    streak: 11,
  },
  {
    id: 'p3',
    name: "Madina Yo'ldosheva",
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    xp: 1240,
    level: 4,
    levelTitle: 'JavaScript Hakker',
    gamesCompleted: 39,
    accuracy: 94,
    streak: 9,
  },
  {
    id: 'p4',
    name: "Umirbek Xo'jayev",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    xp: 1120,
    level: 4,
    levelTitle: 'JavaScript Hakker',
    gamesCompleted: 36,
    accuracy: 92,
    streak: 8,
  },
  {
    id: 'p5',
    name: 'Sardorbek Rahimov',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    xp: 880,
    level: 3,
    levelTitle: 'CSS & Dizayn Ustasi',
    gamesCompleted: 28,
    accuracy: 90,
    streak: 6,
  },
  {
    id: 'p6',
    name: 'Muhriddin Abdullayev',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    xp: 750,
    level: 3,
    levelTitle: 'CSS & Dizayn Ustasi',
    gamesCompleted: 24,
    accuracy: 88,
    streak: 5,
  },
];

interface TagQuestion {
  concept: string;
  correctTag: string;
  options: string[];
  explanation: string;
  level: number;
}

const TAG_QUESTIONS: TagQuestion[] = [
  {
    concept: 'Veb-sahifada eng yuqori darajadagi asosiy sarlavha yaratish',
    correctTag: '<h1>',
    options: ['<p>', '<h1>', '<title>', '<header>'],
    explanation: '<h1> tegi sahifaning eng katta va asosiy sarlavhasini belgilaydi.',
    level: 1,
  },
  {
    concept: "Boshqa sayt yoki sahifaga o'tuvchi faol havola (link) qo'yish",
    correctTag: '<a>',
    options: ['<link>', '<href>', '<a>', '<url>'],
    explanation: '<a> (anchor) tegi href atributi bilan birga havolalarni hosil qiladi.',
    level: 1,
  },
  {
    concept: 'Sahifaga rasm yoki tasvir joylashtirish',
    correctTag: '<img>',
    options: ['<picture>', '<photo>', '<img>', '<src>'],
    explanation: '<img> tegi src atributi orqali rasm faylini ekranga chiqaradi.',
    level: 1,
  },
  {
    concept: "Foydalanuvchi bosishi mumkin bo'lgan interaktiv tugma",
    correctTag: '<button>',
    options: ['<click>', '<btn>', '<press>', '<button>'],
    explanation: '<button> tegi bosiluvchi tugmalarni yaratish uchun standart tegdir.',
    level: 2,
  },
  {
    concept: 'Elementlarni guruhlovchi blok konteyner (quti)',
    correctTag: '<div>',
    options: ['<span>', '<div>', '<box>', '<section>'],
    explanation: '<div> — blok darajasidagi universal konteyner hisoblanadi.',
    level: 2,
  },
  {
    concept: 'Foydalanuvchidan matn kiritish maydonchasi (input field)',
    correctTag: '<input>',
    options: ['<textarea>', '<text>', '<input>', '<enter>'],
    explanation: "<input> maydoni yordamida har xil turdagi ma'lumotlar kiritiladi.",
    level: 2,
  },
  {
    concept: "Asosiy navigatsiya havolalarini o'z ichiga oluvchi semantik teg",
    correctTag: '<nav>',
    options: ['<menu>', '<nav>', '<links>', '<sidebar>'],
    explanation: "<nav> tegi veb-saytning asosiy navigatsiya menyusi uchun mo'ljallangan.",
    level: 3,
  },
  {
    concept: 'Saytning pastki qismi (mualliflik huquqi, aloqa) tegi',
    correctTag: '<footer>',
    options: ['<bottom>', '<end>', '<footer>', '<base>'],
    explanation: '<footer> tegi sahifa yoki bo\'limning quyi qismini ifodalaydi.',
    level: 3,
  },
];

interface BugQuestion {
  code: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  level: number;
}

const BUG_QUESTIONS: BugQuestion[] = [
  {
    code: '<h1>Xush kelibsiz!</h2>',
    question: 'Ushbu HTML kodida qanday xatolik bor?',
    options: [
      'Ochilgan teg <h1>, lekin yopilgan teg </h2>',
      "Matn qo'shtirnoq ichiga olinmagan",
      "Harflar katta-kichikligi noto'g'ri",
      "Hech qanday xato yo'q",
    ],
    correctIndex: 0,
    explanation: "HTML da ochilgan teg bilan yopiluvchi teg bir xil bo'lishi shart: <h1>...</h1>.",
    level: 1,
  },
  {
    code: "<img href='avatar.jpg' alt='Profil rasmi'>",
    question: "Rasm tegida qaysi atribut noto'g'ri ishlatilgan?",
    options: [
      "alt atributi o'rniga text bo'lishi kerak",
      "href o'rniga src atributi ishlatilishi kerak",
      "Rasmlarga qo'shtirnoq qo'yilmaydi",
      'Rasm tegi yopilmagan',
    ],
    correctIndex: 1,
    explanation: "<img> tegida rasm manzili 'src' atributi orqali beriladi, 'href' esa <a> tegiga tegishli.",
    level: 1,
  },
  {
    code: "<a url='https://t.me/jasur'>Telegram</a>",
    question: "Havola yaratishda qaysi atribut noto'g'ri?",
    options: [
      "url emas, href bo'lishi kerak",
      "<a> tegi o'rniga <link> bo'lishi kerak",
      "Telegram so'zi xato",
      'Probel qolib ketgan',
    ],
    correctIndex: 0,
    explanation: "<a> tegi uchun havola manzili 'href' atributi orqali ko'rsatiladi.",
    level: 2,
  },
  {
    code: "<button disabled='no'>Tasdiqlash</button>",
    question: 'Tugmani nofaol holatdan chiqarishda xatolik nima?',
    options: [
      'disabled atributi qiymatsiz (yoki olib tashlanishi) kerak',
      'Tugma matni xato',
      'type atributi majburiy',
      "Qo'shtirnoq ishlatilmasligi kerak",
    ],
    correctIndex: 0,
    explanation:
      'HTML da boolean atributlar (disabled) mavjud bo\'lishi bilan elementni nofaol qiladi. Uni faol qilish uchun atribut o\'chirilishi kerak.',
    level: 2,
  },
  {
    code: '<p class="matn" id="matn" class="asosiy">Salom</p>',
    question: "Tegda qaysi sintaktik xato sodir bo'lgan?",
    options: [
      "Bir elementda ikkita 'class' atributi qaytarilgan",
      'id va class birga ishlatilmaydi',
      "Salom so'zi tegsiz bo'lishi kerak",
      "Qo'shtirnoq noto'g'ri",
    ],
    correctIndex: 0,
    explanation:
      'Bir elementda bitta class atributi ichida probel bilan bir nechta sinf yoziladi: class="matn asosiy".',
    level: 3,
  },
];

interface SelectorQuestion {
  target: string;
  htmlContext: string;
  options: string[];
  correctSelector: string;
  explanation: string;
  level: number;
}

const SELECTOR_QUESTIONS: SelectorQuestion[] = [
  {
    target: "faqat 'btn-primary' sinfiga ega tugmani tanlash",
    htmlContext: "<button class='btn-primary'>Boshlash</button>",
    options: ['.btn-primary', '#btn-primary', 'btn-primary', '*btn-primary'],
    correctSelector: '.btn-primary',
    explanation: "CSS da sinflar (class) oldiga nuqta '.' belgisi qo'yiladi: .btn-primary",
    level: 1,
  },
  {
    target: "yagona 'header' identifikatoriga (ID) ega bo'limni tanlash",
    htmlContext: "<div id='header'>Sayt bosh qismi</div>",
    options: ['#header', '.header', '@header', 'div#id'],
    correctSelector: '#header',
    explanation: "ID identifikatorlari oldiga panjara '#' belgisi qo'yiladi: #header",
    level: 1,
  },
  {
    target: "faqat 'card' ichidagi bevosita 'p' abzaslarini tanlash",
    htmlContext: "<div class='card'><p>Matn</p></div>",
    options: ['.card > p', '.card + p', '.card ~ p', '.card p'],
    correctSelector: '.card > p',
    explanation: "'>' belgisi elementning bevosita birinchi avlod bolalarini (direct child) tanlaydi.",
    level: 2,
  },
  {
    target: 'sichqoncha kursor borganda (hover) holatini tanlash',
    htmlContext: '<button>Meni bosing</button>',
    options: ['button:hover', 'button::hover', 'button.hover', 'button->hover'],
    correctSelector: 'button:hover',
    explanation: ':hover — psevdo-klass bo\'lib, kursor element ustiga kelgandagi holatni boshqaradi.',
    level: 2,
  },
];

export function HtmlCodeGames({
  studentAccount,
  onUpdateAccount,
  onOpenRegister,
}: HtmlCodeGamesProps) {
  const [mainTab, setMainTab] = useState<'games' | 'leaderboard' | 'badges'>('games');
  const [activeGame, setActiveGame] = useState<'tag' | 'bug' | 'selector' | 'builder'>('tag');

  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked' | 'xp' | 'stages' | 'games' | 'mastery'>('all');
  const [selectedBadgeModal, setSelectedBadgeModal] = useState<(AchievementBadgeDef & { status: ReturnType<AchievementBadgeDef['checkUnlocked']> }) | null>(null);
  const [unlockedCelebrationModal, setUnlockedCelebrationModal] = useState<(AchievementBadgeDef & { status: ReturnType<AchievementBadgeDef['checkUnlocked']> }) | null>(null);
  const [badgeToast, setBadgeToast] = useState<string | null>(null);
  const prevUnlockedBadgesRef = useRef<Set<string> | null>(null);

  const [playerXp, setPlayerXp] = useState<number>(() => {
    try {
      const savedXp = localStorage.getItem('tanishuv_games_xp');
      if (savedXp) return parseInt(savedXp, 10);
      if (studentAccount?.xp) return studentAccount.xp;
    } catch {}
    return 120;
  });

  const [gamesCompletedCount, setGamesCompletedCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('tanishuv_games_completed');
      if (saved) return parseInt(saved, 10);
      if (studentAccount?.gamesCompleted) return studentAccount.gamesCompleted;
    } catch {}
    return 5;
  });

  const [xpNotification, setXpNotification] = useState<{ amount: number; message: string } | null>(null);

  const awardXp = (amount: number, reason: string) => {
    setPlayerXp((prev) => {
      const updated = prev + amount;
      try {
        localStorage.setItem('tanishuv_games_xp', updated.toString());
      } catch {}

      if (studentAccount && onUpdateAccount) {
        onUpdateAccount({
          ...studentAccount,
          xp: updated,
          gamesCompleted: (studentAccount.gamesCompleted || 0) + 1,
        });
      }
      return updated;
    });

    setGamesCompletedCount((prev) => {
      const n = prev + 1;
      try {
        localStorage.setItem('tanishuv_games_completed', n.toString());
      } catch {}
      return n;
    });

    setXpNotification({ amount, message: reason });
    setTimeout(() => {
      setXpNotification(null);
    }, 2800);
  };

  const currentLevelInfo = getLevelInfo(playerXp);
  const nextLevel = LEVELS.find((l) => l.level === currentLevelInfo.level + 1);
  const xpInCurrentLevel = playerXp - currentLevelInfo.minXp;
  const xpNeededForNext = nextLevel ? nextLevel.minXp - currentLevelInfo.minXp : 100;
  const progressPercent = nextLevel
    ? Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100))
    : 100;

  const [tagIdx, setTagIdx] = useState(0);
  const [tagScore, setTagScore] = useState(0);
  const [tagStreak, setTagStreak] = useState(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagFeedback, setTagFeedback] = useState<'correct' | 'wrong' | null>(null);

  const [bugIdx, setBugIdx] = useState(0);
  const [bugScore, setBugScore] = useState(0);
  const [selectedBugOpt, setSelectedBugOpt] = useState<number | null>(null);
  const [bugFeedback, setBugFeedback] = useState<'correct' | 'wrong' | null>(null);

  const [selectorIdx, setSelectorIdx] = useState(0);
  const [selectorScore, setSelectorScore] = useState(0);
  const [selectedSelector, setSelectedSelector] = useState<string | null>(null);
  const [selectorFeedback, setSelectorFeedback] = useState<'correct' | 'wrong' | null>(null);

  const [builderTitle, setBuilderTitle] = useState('Salom, Men Dasturchiman!');
  const [builderColor, setBuilderColor] = useState('#ff6b86');
  const [builderBg, setBuilderBg] = useState('#151226');
  const [builderRadius, setBuilderRadius] = useState('16px');
  const [builderHasBtn, setBuilderHasBtn] = useState(true);
  const [cardChallengeCompleted, setCardChallengeCompleted] = useState(false);

  const [leaderboardFilter, setLeaderboardFilter] = useState<'all' | 'weekly'>('all');

  const fullLeaderboard: LeaderboardPlayer[] = React.useMemo(() => {
    const currentPlayerName = studentAccount?.name || 'Siz (Mehmon Koder)';
    const currentPlayerAvatar =
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

    const currentPlayerEntry: LeaderboardPlayer = {
      id: 'current_user',
      name: currentPlayerName,
      email: studentAccount?.email,
      avatar: currentPlayerAvatar,
      xp: playerXp,
      level: currentLevelInfo.level,
      levelTitle: currentLevelInfo.title,
      gamesCompleted: gamesCompletedCount,
      accuracy: 93,
      streak: tagStreak > 0 ? tagStreak : 4,
      isCurrentUser: true,
    };

    const filteredCohort = INITIAL_LEADERBOARD.filter(
      (p) => p.email !== studentAccount?.email && p.name !== studentAccount?.name
    );

    const merged = [...filteredCohort, currentPlayerEntry];
    merged.sort((a, b) => b.xp - a.xp);
    return merged;
  }, [playerXp, currentLevelInfo, gamesCompletedCount, tagStreak, studentAccount]);

  const currentUserRank = fullLeaderboard.findIndex((p) => p.isCurrentUser) + 1;

  const evaluatedBadges = React.useMemo(() => {
    const completedStages =
      studentAccount?.completedStages ||
      (playerXp >= 800 ? ['html', 'css', 'js'] : playerXp >= 400 ? ['html', 'css'] : playerXp >= 150 ? ['html'] : []);
    const quizPassed = studentAccount?.quizPassed || {
      html: completedStages.includes('html') || playerXp >= 150,
      css: completedStages.includes('css') || playerXp >= 400,
      js: completedStages.includes('js') || playerXp >= 800,
    };
    const stats = {
      xp: playerXp,
      gamesCompleted: gamesCompletedCount,
      completedStages,
      quizPassed,
      tagStreak: tagStreak > 0 ? tagStreak : 3,
      cardCompleted: cardChallengeCompleted || playerXp >= 350,
      rank: currentUserRank > 0 ? currentUserRank : 4,
    };

    return ACHIEVEMENT_BADGES.map((badgeDef) => {
      const status = badgeDef.checkUnlocked(stats);
      return {
        ...badgeDef,
        status,
      };
    });
  }, [studentAccount, playerXp, gamesCompletedCount, tagStreak, cardChallengeCompleted, currentUserRank]);

  const unlockedBadgesCount = evaluatedBadges.filter((b) => b.status.isUnlocked).length;
  const totalBadgesCount = evaluatedBadges.length;
  const badgesCompletionPercent = Math.round((unlockedBadgesCount / totalBadgesCount) * 100);
  const totalBonusXpUnlocked = evaluatedBadges
    .filter((b) => b.status.isUnlocked)
    .reduce((sum, b) => sum + b.xpBonus, 0);

  const nextUpcomingBadge = evaluatedBadges.find((b) => !b.status.isUnlocked);

  useEffect(() => {
    const currentlyUnlocked = evaluatedBadges.filter((b) => b.status.isUnlocked);
    const currentUnlockedIds = new Set(currentlyUnlocked.map((b) => b.id));

    if (prevUnlockedBadgesRef.current === null) {
      prevUnlockedBadgesRef.current = currentUnlockedIds;
      return;
    }

    const newlyUnlocked = currentlyUnlocked.filter(
      (b) => !prevUnlockedBadgesRef.current?.has(b.id)
    );

    if (newlyUnlocked.length > 0) {
      const topBadge = newlyUnlocked[0];
      fireMedalCelebrationConfetti(topBadge.tier);
      setBadgeToast(`🎉 TABRIKLAYMIZ! Yangi medal qo'lga kiritildi: "${topBadge.title}" (+${topBadge.xpBonus} XP)!`);
      setUnlockedCelebrationModal(topBadge);

      setTimeout(() => {
        setBadgeToast(null);
      }, 5000);
    }

    prevUnlockedBadgesRef.current = currentUnlockedIds;
  }, [evaluatedBadges]);

  const handleAnswerTag = (tag: string) => {
    if (tagFeedback) return;
    setSelectedTag(tag);
    const currentQ = TAG_QUESTIONS[tagIdx];

    if (tag === currentQ.correctTag) {
      setTagFeedback('correct');
      const earnedXp = 15 + tagStreak * 2;
      setTagScore((s) => s + earnedXp);
      setTagStreak((st) => st + 1);
      awardXp(earnedXp, `Teg to'g'ri topildi: ${tag}`);
    } else {
      setTagFeedback('wrong');
      setTagStreak(0);
    }

    setTimeout(() => {
      setSelectedTag(null);
      setTagFeedback(null);
      setTagIdx((prev) => (prev + 1) % TAG_QUESTIONS.length);
    }, 1600);
  };

  const handleAnswerBug = (optIdx: number) => {
    if (bugFeedback) return;
    setSelectedBugOpt(optIdx);
    const currentQ = BUG_QUESTIONS[bugIdx];

    if (optIdx === currentQ.correctIndex) {
      setBugFeedback('correct');
      const earnedXp = 25;
      setBugScore((s) => s + earnedXp);
      awardXp(earnedXp, 'Xato kod bartaraf etildi (+25 XP)!');
    } else {
      setBugFeedback('wrong');
    }

    setTimeout(() => {
      setSelectedBugOpt(null);
      setBugFeedback(null);
      setBugIdx((prev) => (prev + 1) % BUG_QUESTIONS.length);
    }, 1800);
  };

  const handleAnswerSelector = (sel: string) => {
    if (selectorFeedback) return;
    setSelectedSelector(sel);
    const currentQ = SELECTOR_QUESTIONS[selectorIdx];

    if (sel === currentQ.correctSelector) {
      setSelectorFeedback('correct');
      const earnedXp = 20;
      setSelectorScore((s) => s + earnedXp);
      awardXp(earnedXp, `CSS Selektor to'g'ri tanlandi: ${sel}`);
    } else {
      setSelectorFeedback('wrong');
    }

    setTimeout(() => {
      setSelectedSelector(null);
      setSelectorFeedback(null);
      setSelectorIdx((prev) => (prev + 1) % SELECTOR_QUESTIONS.length);
    }, 1700);
  };

  const handleCompleteCardChallenge = () => {
    if (cardChallengeCompleted) return;
    setCardChallengeCompleted(true);
    awardXp(50, "Shaxsiy kartochka konstruktori yig'ildi (+50 XP)!");
  };

  const currentTagQ = TAG_QUESTIONS[tagIdx];
  const currentBugQ = BUG_QUESTIONS[bugIdx];
  const currentSelectorQ = SELECTOR_QUESTIONS[selectorIdx];

  const generatedCardHtml = `<div style="padding:20px; background:${builderBg}; border-radius:${builderRadius}; border:2px solid ${builderColor}; font-family:sans-serif; color:#ffffff;">
  <h2 style="color:${builderColor}; margin:0 0 8px;">${builderTitle}</h2>
  <p style="font-size:13px; color:#b8b2cc; margin:0 0 14px;">HTML va CSS o'yini orqali yig'ilgan shaxsiy kartochka.</p>
  ${builderHasBtn ? `<button style="background:${builderColor}; color:#0a0912; padding:8px 16px; border:none; border-radius:12px; font-weight:800; cursor:pointer;">Menga yozish</button>` : ''}
</div>`;

  const renderBadgeIcon = (iconType: AchievementBadgeDef['iconType'], className = 'w-6 h-6') => {
    switch (iconType) {
      case 'target':
        return <Target className={className} />;
      case 'code':
        return <Code2 className={className} />;
      case 'flame':
        return <Flame className={className} />;
      case 'bug':
        return <Bug className={className} />;
      case 'palette':
        return <Palette className={className} />;
      case 'zap':
        return <Zap className={`${className} fill-current`} />;
      case 'layers':
        return <Layers className={className} />;
      case 'award':
        return <Award className={className} />;
      case 'crown':
        return <Crown className={className} />;
      case 'shield':
        return <ShieldCheck className={className} />;
      case 'star':
        return <Star className={`${className} fill-current`} />;
      case 'trophy':
      default:
        return <Trophy className={className} />;
    }
  };

  const copyBadgeCelebration = (badge: AchievementBadgeDef) => {
    const text = `🏆 Men DevMaster Academy'da "${badge.title}" (${TIER_CONFIG[badge.tier].emoji} ${TIER_CONFIG[badge.tier].nameUz}) sohibi bo'ldim! Jami XP: ${playerXp}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setBadgeToast(`"${badge.title}" yutuq matni nusxalandi!`);
    setTimeout(() => {
      setBadgeToast(null);
    }, 3000);
  };

  const filteredBadges = evaluatedBadges.filter((b) => {
    if (badgeFilter === 'all') return true;
    if (badgeFilter === 'unlocked') return b.status.isUnlocked;
    if (badgeFilter === 'locked') return !b.status.isUnlocked;
    if (badgeFilter === 'xp') return b.category === 'xp';
    if (badgeFilter === 'stages') return b.category === 'stages';
    if (badgeFilter === 'games') return b.category === 'games' || b.category === 'mastery';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Floating XP Gain Celebration Toast */}
      {xpNotification && (
        <div className="fixed top-20 right-6 z-50 animate-bounce bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] text-[#0a0912] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/30">
          <div className="w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center font-black">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="text-xs font-black tracking-wide uppercase">
              +{xpNotification.amount} XP Tajriba Ochkosi!
            </div>
            <div className="text-[11px] font-bold opacity-90">{xpNotification.message}</div>
          </div>
        </div>
      )}

      {/* Floating Badge Toast */}
      {badgeToast && (
        <div className="fixed top-20 right-6 z-50 animate-bounce bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border-2 border-white/30">
          <div className="w-9 h-9 rounded-xl bg-black/15 flex items-center justify-center font-black">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black tracking-wide uppercase">Yutuq Saqlandi!</div>
            <div className="text-[11px] font-bold">{badgeToast}</div>
          </div>
        </div>
      )}

      {/* Top Banner with XP Status and Level Progression */}
      <div className="relative overflow-hidden aurora-card rounded-[2rem] p-6 sm:p-8 border-2 border-[#ff6b86]/35">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ffd23f]/15 rounded-full text-xs font-black text-[#ffd23f] border border-[#ffd23f]/30">
              <Gamepad2 className="w-4 h-4" />
              <span>Interaktiv Dasturlash O&apos;yinlari &amp; XP Tizimi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--aurora-text)] font-display">
              Kod O&apos;yinlari &amp; Peshqadamlar Arenasi
            </h1>
            <p className="text-[var(--aurora-text-muted)] text-xs sm:text-sm max-w-xl leading-relaxed">
              Har bir yechilgan topshiriq uchun <strong className="text-[#ffd23f]">Tajriba ochkolari (XP)</strong> to&apos;plang,
              darajangizni oshiring va akademiyaning umumiy reytingida chempion bo&apos;ling!
            </p>
          </div>

          {/* Player XP & Level Card */}
          <div className="bg-[var(--aurora-surface-2)] border-2 border-[var(--aurora-border)] p-4 rounded-2xl sm:min-w-[290px] space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#ffd23f] to-[#ff6b86] text-[#0a0912] flex items-center justify-center font-black shadow-md">
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-[var(--aurora-text)] flex items-center gap-1.5">
                    <span>{studentAccount?.name || 'Mehmon Koder'}</span>
                    <span className="text-[10px] bg-[#ffd23f] text-[#0a0912] px-2 py-0.5 rounded-full font-black">
                      Lvl {currentLevelInfo.level}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#3ee6c4] font-bold">
                    {currentLevelInfo.title}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-black text-[#ffd23f] font-mono flex items-center gap-1 justify-end">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{playerXp}</span>
                </div>
                <div className="text-[10px] text-[var(--aurora-text-muted)] font-bold">Jami XP</div>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-[var(--aurora-text-muted)] font-bold">
                <span>Keyingi darajaga:</span>
                <span className="font-mono text-[var(--aurora-text)]">
                  {nextLevel ? `${xpInCurrentLevel} / ${xpNeededForNext} XP (${progressPercent}%)` : 'Maksimal Daraja'}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] h-2.5 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[var(--aurora-border)] text-[11px]">
              <span className="text-[var(--aurora-text-muted)] font-bold flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-[#ffd23f]" />
                <span>O&apos;rningiz:</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#ffd23f] font-mono">#{currentUserRank}</span>
                <button
                  type="button"
                  onClick={() => setMainTab('badges')}
                  className="text-[10px] font-black text-[#3ee6c4] hover:text-white flex items-center gap-1 bg-[#3ee6c4]/15 px-2.5 py-1 rounded-full transition-all border border-[#3ee6c4]/30 cursor-pointer"
                >
                  <Medal className="w-3 h-3" />
                  <span>{unlockedBadgesCount}/{totalBadgesCount} Medallar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="aurora-card rounded-2xl p-3 border border-[var(--aurora-border)] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMainTab('games')}
            className={`duo-btn px-4 py-2.5 text-xs flex items-center gap-2 ${
              mainTab === 'games' ? 'duo-btn-coral' : 'duo-btn-surface'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>O&apos;yinlar Maydoni</span>
          </button>
          <button
            type="button"
            onClick={() => setMainTab('leaderboard')}
            className={`duo-btn px-4 py-2.5 text-xs flex items-center gap-2 ${
              mainTab === 'leaderboard' ? 'duo-btn-gold' : 'duo-btn-surface'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Peshqadamlar Jadvali</span>
          </button>
          <button
            type="button"
            onClick={() => setMainTab('badges')}
            className={`duo-btn px-4 py-2.5 text-xs flex items-center gap-2 ${
              mainTab === 'badges' ? 'duo-btn-mint' : 'duo-btn-surface'
            }`}
          >
            <Medal className="w-4 h-4" />
            <span>Nishonlar ({unlockedBadgesCount}/{totalBadgesCount})</span>
          </button>
        </div>

        {/* Sub Game Mode Selector when on games tab */}
        {mainTab === 'games' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {(
              [
                { id: 'tag', label: 'Teg Moslashtiruvchi (+15 XP)' },
                { id: 'bug', label: 'Xatoni Top (+25 XP)' },
                { id: 'selector', label: 'CSS Selektor (+20 XP)' },
                { id: 'builder', label: 'Konstruktor (+50 XP)' },
              ] as const
            ).map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveGame(g.id)}
                className={`px-3.5 py-2 rounded-xl font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  activeGame === g.id
                    ? 'bg-[#3ee6c4] text-[#0a0912] shadow-md'
                    : 'bg-[var(--aurora-surface-2)] text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)] border border-[var(--aurora-border)]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: GAMES VIEW */}
      {mainTab === 'games' && (
        <div className="space-y-6">
          {/* GAME 1: TAG MATCHER */}
          {activeGame === 'tag' && (
            <div className="aurora-card rounded-[2rem] border-2 border-[var(--aurora-border)] p-6 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--aurora-border)] gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#ff6b86] bg-[#ff6b86]/15 px-3 py-1 rounded-full border border-[#ff6b86]/30">
                      O&apos;yin 1: Teg Moslashtiruvchi
                    </span>
                    <span className="text-xs font-bold text-[var(--aurora-text-muted)]">
                      Bosqich: {currentTagQ.level}-daraja
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[var(--aurora-text)] mt-1.5 font-display">
                    Ta&apos;rifga mos keluvchi to&apos;g&apos;ri HTML tegni toping va +15 XP ishlang!
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 text-xs font-black">
                  <span className="text-[#ffd23f] flex items-center gap-1.5 bg-[#ffd23f]/15 px-3.5 py-2 rounded-xl border border-[#ffd23f]/30 font-mono">
                    <Trophy className="w-4 h-4" />
                    <span>{tagScore} XP</span>
                  </span>
                  <span className="text-[#ff8a3d] flex items-center gap-1.5 bg-[#ff8a3d]/15 px-3.5 py-2 rounded-xl border border-[#ff8a3d]/30 font-mono">
                    <Flame className="w-4 h-4" />
                    <span>{tagStreak} streak</span>
                  </span>
                </div>
              </div>

              <div className="p-6 bg-[var(--aurora-surface-2)] rounded-2xl border-2 border-[var(--aurora-border)] text-center space-y-3">
                <span className="text-xs font-mono font-bold text-[#3ee6c4] uppercase tracking-widest block">
                  Savol {tagIdx + 1} / {TAG_QUESTIONS.length}
                </span>
                <p className="text-base sm:text-xl font-black text-[var(--aurora-text)] max-w-lg mx-auto leading-relaxed font-display">
                  &ldquo;{currentTagQ.concept}&rdquo;
                </p>
                <div className="text-[11px] font-black text-[#b6f03c] bg-[#b6f03c]/15 px-3.5 py-1 rounded-full inline-block border border-[#b6f03c]/30">
                  To&apos;g&apos;ri javob uchun: +15 XP {tagStreak > 0 && `(+${tagStreak * 2} XP bonus)`}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentTagQ.options.map((opt) => {
                  const isChosen = selectedTag === opt;
                  let btnClass = 'duo-btn-surface';

                  if (tagFeedback) {
                    if (opt === currentTagQ.correctTag) {
                      btnClass = 'duo-btn-lime scale-105';
                    } else if (isChosen) {
                      btnClass = 'duo-btn-coral';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleAnswerTag(opt)}
                      disabled={tagFeedback !== null}
                      className={`duo-btn py-4 px-3 text-sm font-mono font-black ${btnClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {tagFeedback && (
                <div
                  className={`p-4 rounded-2xl text-xs flex items-center gap-3 ${
                    tagFeedback === 'correct'
                      ? 'bg-[#b6f03c]/15 border-2 border-[#b6f03c] text-[var(--aurora-text)]'
                      : 'bg-[#ff5263]/15 border-2 border-[#ff5263] text-[var(--aurora-text)] animate-shake'
                  }`}
                >
                  {tagFeedback === 'correct' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#b6f03c] shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#ff5263] shrink-0" />
                  )}
                  <div>
                    <span className="font-black block">
                      {tagFeedback === 'correct' ? "Ajoyib! To'g'ri javob." : "Xato! Qaytadan urinib ko'ring."}
                    </span>
                    <span className="text-[11px] text-[var(--aurora-text-muted)]">{currentTagQ.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* GAME 2: BUG HUNTER */}
          {activeGame === 'bug' && (
            <div className="aurora-card rounded-[2rem] border-2 border-[var(--aurora-border)] p-6 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--aurora-border)] gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#ff8a3d] bg-[#ff8a3d]/15 px-3 py-1 rounded-full border border-[#ff8a3d]/30 flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5" />
                      <span>O&apos;yin 2: Koddagi Xatoni Top (Bug Hunter)</span>
                    </span>
                    <span className="text-xs font-bold text-[var(--aurora-text-muted)]">
                      Bosqich: {currentBugQ.level}-daraja
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[var(--aurora-text)] mt-1.5 font-display">
                    Koddagi xatolikni aniqlang va +25 XP ga ega bo&apos;ling!
                  </h3>
                </div>
                <span className="text-xs font-black text-[#3ee6c4] bg-[#3ee6c4]/15 px-3.5 py-2 rounded-xl border border-[#3ee6c4]/30 font-mono">
                  {bugScore} XP to&apos;plandi
                </span>
              </div>

              <div className="p-5 bg-[#0a0912] text-[#ff6b86] rounded-2xl font-mono text-xs overflow-x-auto border-2 border-white/10">
                <span className="text-[10px] text-white/50 block mb-1 font-sans font-bold">Sintaksis tekshiruvi:</span>
                <code>{currentBugQ.code}</code>
              </div>

              <p className="text-sm font-black text-[var(--aurora-text)]">{currentBugQ.question}</p>

              <div className="space-y-2.5">
                {currentBugQ.options.map((opt, idx) => {
                  const isSelected = selectedBugOpt === idx;
                  let optClass =
                    'bg-[var(--aurora-surface-2)] border-[var(--aurora-border)] hover:border-[#ff6b86] text-[var(--aurora-text)]';

                  if (bugFeedback) {
                    if (idx === currentBugQ.correctIndex) {
                      optClass = 'bg-[#b6f03c]/20 border-[#b6f03c] text-[var(--aurora-text)] font-black';
                    } else if (isSelected) {
                      optClass = 'bg-[#ff5263]/20 border-[#ff5263] text-[#ff5263] line-through';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswerBug(idx)}
                      disabled={bugFeedback !== null}
                      className={`w-full text-left p-4 rounded-2xl border-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${optClass}`}
                    >
                      <span>{opt}</span>
                      {bugFeedback && idx === currentBugQ.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-[#b6f03c] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {bugFeedback && (
                <div className="p-4 bg-[var(--aurora-surface-2)] border border-[var(--aurora-border)] rounded-2xl text-xs text-[var(--aurora-text-muted)]">
                  <strong className="text-[var(--aurora-text)] block mb-0.5">Xato izohi:</strong>
                  {currentBugQ.explanation}
                </div>
              )}
            </div>
          )}

          {/* GAME 3: CSS SELECTOR ARENA */}
          {activeGame === 'selector' && (
            <div className="aurora-card rounded-[2rem] border-2 border-[var(--aurora-border)] p-6 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--aurora-border)] gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#3ee6c4] bg-[#3ee6c4]/15 px-3 py-1 rounded-full border border-[#3ee6c4]/30 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>O&apos;yin 3: CSS Selektorlar Arenasi</span>
                    </span>
                    <span className="text-xs font-bold text-[var(--aurora-text-muted)]">
                      Bosqich: {currentSelectorQ.level}-daraja
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[var(--aurora-text)] mt-1.5 font-display">
                    Ko&apos;rsatilgan maqsadga mos CSS selektorini tanlang (+20 XP)!
                  </h3>
                </div>
                <span className="text-xs font-black text-[#ffd23f] bg-[#ffd23f]/15 px-3.5 py-2 rounded-xl border border-[#ffd23f]/30 font-mono">
                  {selectorScore} XP
                </span>
              </div>

              <div className="p-5 bg-[var(--aurora-surface-2)] rounded-2xl border-2 border-[var(--aurora-border)] space-y-3">
                <div className="text-xs text-[var(--aurora-text-muted)]">
                  Vazifa: <strong className="text-[var(--aurora-text)] text-sm">{currentSelectorQ.target}</strong>
                </div>
                <div className="p-3.5 bg-[#0a0912] text-[#3ee6c4] rounded-xl font-mono text-xs overflow-x-auto border border-white/10">
                  <code>{currentSelectorQ.htmlContext}</code>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentSelectorQ.options.map((sel) => {
                  const isChosen = selectedSelector === sel;
                  let selClass = 'duo-btn-surface';

                  if (selectorFeedback) {
                    if (sel === currentSelectorQ.correctSelector) {
                      selClass = 'duo-btn-lime scale-105';
                    } else if (isChosen) {
                      selClass = 'duo-btn-coral';
                    }
                  }

                  return (
                    <button
                      key={sel}
                      type="button"
                      onClick={() => handleAnswerSelector(sel)}
                      disabled={selectorFeedback !== null}
                      className={`duo-btn py-4 px-3 text-sm font-mono font-black ${selClass}`}
                    >
                      {sel}
                    </button>
                  );
                })}
              </div>

              {selectorFeedback && (
                <div className="p-4 bg-[var(--aurora-surface-2)] border border-[var(--aurora-border)] rounded-2xl text-xs text-[var(--aurora-text-muted)]">
                  <strong className="text-[var(--aurora-text)] block mb-0.5">Selektor qoidasi:</strong>
                  {currentSelectorQ.explanation}
                </div>
              )}
            </div>
          )}

          {/* GAME 4: INTERACTIVE CARD BUILDER */}
          {activeGame === 'builder' && (
            <div className="aurora-card rounded-[2rem] border-2 border-[var(--aurora-border)] p-6 sm:p-7 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--aurora-border)] gap-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-[#ffd23f] flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" />
                    <span>O&apos;yin 4: Interaktiv HTML &amp; CSS Konstruktori</span>
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[var(--aurora-text)] mt-1 font-display">
                    Tugmalarni bosib o&apos;z shaxsiy kartochkangizni yarating va +50 XP ishlang!
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCompleteCardChallenge}
                  disabled={cardChallengeCompleted}
                  className={`duo-btn px-4 py-2.5 text-xs flex items-center gap-2 ${
                    cardChallengeCompleted ? 'duo-btn-lime opacity-80' : 'duo-btn-gold'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>{cardChallengeCompleted ? '✓ 50 XP Qabul Qilindi!' : 'Topshiriqni Yakunlash (+50 XP)'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[var(--aurora-text)] mb-1.5">
                      Sarlavha matni (HTML: &lt;h2&gt;)
                    </label>
                    <input
                      type="text"
                      value={builderTitle}
                      onChange={(e) => setBuilderTitle(e.target.value)}
                      className="aurora-input w-full text-xs px-3.5 py-2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--aurora-text)] mb-1.5">
                      Asosiy rang (CSS: color &amp; background)
                    </label>
                    <div className="flex gap-2.5">
                      {['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setBuilderColor(c)}
                          className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                            builderColor === c ? 'scale-110 border-white shadow-lg' : 'border-transparent'
                          }`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--aurora-text)] mb-1.5">
                      Fon rangi (CSS: background-color)
                    </label>
                    <div className="flex gap-2.5">
                      {['#151226', '#0a0912', '#1d1836', '#2a1829', '#112626'].map((bg) => (
                        <button
                          key={bg}
                          type="button"
                          onClick={() => setBuilderBg(bg)}
                          className={`w-8 h-8 rounded-xl border-2 transition-transform cursor-pointer ${
                            builderBg === bg ? 'scale-110 border-[#ffd23f]' : 'border-white/20'
                          }`}
                          style={{ background: bg }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[var(--aurora-text)] mb-1.5">
                      Burchak yumaloqligi (CSS: border-radius)
                    </label>
                    <div className="flex gap-2 text-xs">
                      {['0px', '8px', '16px', '24px'].map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setBuilderRadius(r)}
                          className={`px-3 py-1.5 rounded-xl border font-mono font-bold cursor-pointer transition-colors ${
                            builderRadius === r
                              ? 'bg-[#ff6b86] text-[#0a0912] border-[#ff6b86]'
                              : 'bg-[var(--aurora-surface-2)] text-[var(--aurora-text)] border-[var(--aurora-border)]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-[var(--aurora-text)] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={builderHasBtn}
                        onChange={(e) => setBuilderHasBtn(e.target.checked)}
                        className="rounded accent-[#ff6b86] w-4 h-4"
                      />
                      <span>Tugma qo&apos;shish (&lt;button&gt;)</span>
                    </label>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-black text-[var(--aurora-text-muted)] uppercase tracking-wider block mb-1.5">
                      Jonli Natija:
                    </span>
                    <div
                      className="p-5 border-2 border-[var(--aurora-border)] rounded-2xl bg-[#0a0912]"
                      dangerouslySetInnerHTML={{ __html: generatedCardHtml }}
                    />
                  </div>

                  <div>
                    <span className="text-[11px] font-black text-[var(--aurora-text-muted)] uppercase tracking-wider block mb-1.5">
                      Avtomatik Hosil Bo&apos;lgan HTML Kod:
                    </span>
                    <pre className="p-4 bg-[#0a0912] text-[#3ee6c4] rounded-2xl text-xs font-mono overflow-x-auto border border-white/10">
                      <code>{generatedCardHtml}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LEADERBOARD VIEW */}
      {mainTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {/* 2nd Place */}
            {fullLeaderboard[1] && (
              <div className="aurora-card rounded-[2rem] p-5 border-2 border-[#3ee6c4]/40 flex flex-col items-center text-center relative order-2 sm:order-1 mt-0 sm:mt-6">
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#3ee6c4] text-[#0a0912] text-xs font-black flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5" />
                  <span>2-O&apos;RIN</span>
                </div>
                <img
                  src={fullLeaderboard[1].avatar}
                  alt={fullLeaderboard[1].name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#3ee6c4] shadow-md mb-2 mt-2"
                />
                <h4 className="text-sm font-black text-[var(--aurora-text)]">{fullLeaderboard[1].name}</h4>
                <span className="text-[11px] text-[var(--aurora-text-muted)]">{fullLeaderboard[1].levelTitle}</span>
                <div className="mt-3 text-lg font-black text-[#3ee6c4] font-mono flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{fullLeaderboard[1].xp} XP</span>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {fullLeaderboard[0] && (
              <div className="aurora-card rounded-[2rem] p-6 border-2 border-[#ffd23f] shadow-[0_16px_45px_rgba(255,210,63,0.2)] flex flex-col items-center text-center relative order-1 sm:order-2">
                <div className="absolute -top-4 px-4 py-1 rounded-full bg-[#ffd23f] text-[#0a0912] text-xs font-black shadow-md flex items-center gap-1.5">
                  <Crown className="w-4 h-4 fill-current" />
                  <span>1-O&apos;RIN · CHEMPION</span>
                </div>
                <div className="relative mb-2 mt-2">
                  <img
                    src={fullLeaderboard[0].avatar}
                    alt={fullLeaderboard[0].name}
                    className="w-20 h-20 rounded-2xl object-cover border-3 border-[#ffd23f] shadow-lg"
                  />
                  <span className="absolute -bottom-2 -right-1 text-2xl">🥇</span>
                </div>
                <h4 className="text-base font-black text-[var(--aurora-text)]">{fullLeaderboard[0].name}</h4>
                <span className="text-xs font-black text-[#ffd23f] bg-[#ffd23f]/15 px-3 py-0.5 rounded-full mt-1">
                  {fullLeaderboard[0].levelTitle}
                </span>
                <div className="mt-3 text-2xl font-black text-[#ffd23f] font-mono flex items-center gap-1.5">
                  <Zap className="w-5 h-5 fill-current" />
                  <span>{fullLeaderboard[0].xp} XP</span>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {fullLeaderboard[2] && (
              <div className="aurora-card rounded-[2rem] p-5 border-2 border-[#ff8a3d]/40 flex flex-col items-center text-center relative order-3 mt-0 sm:mt-8">
                <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#ff8a3d] text-[#0a0912] text-xs font-black flex items-center gap-1">
                  <Medal className="w-3.5 h-3.5" />
                  <span>3-O&apos;RIN</span>
                </div>
                <img
                  src={fullLeaderboard[2].avatar}
                  alt={fullLeaderboard[2].name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-[#ff8a3d] shadow-md mb-2 mt-2"
                />
                <h4 className="text-sm font-black text-[var(--aurora-text)]">{fullLeaderboard[2].name}</h4>
                <span className="text-[11px] text-[var(--aurora-text-muted)]">{fullLeaderboard[2].levelTitle}</span>
                <div className="mt-3 text-lg font-black text-[#ff8a3d] font-mono flex items-center gap-1">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{fullLeaderboard[2].xp} XP</span>
                </div>
              </div>
            )}
          </div>

          {/* Current User Highlight */}
          <div className="aurora-card rounded-2xl p-4 sm:p-5 border-2 border-[#ff6b86]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#ffd23f] text-[#0a0912] font-black font-mono flex items-center justify-center text-sm">
                #{currentUserRank}
              </div>
              <div>
                <div className="text-xs font-black text-[#ffd23f] uppercase tracking-wider">
                  Sizning Joriy Natijangiz
                </div>
                <div className="text-sm sm:text-base font-black text-[var(--aurora-text)] flex items-center gap-2">
                  <span>{studentAccount?.name || 'Mehmon Koder'}</span>
                  <span className="text-xs bg-white/10 px-2.5 py-0.5 rounded-full text-[#3ee6c4] font-bold">
                    Lvl {currentLevelInfo.level} · {currentLevelInfo.title}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center sm:text-right">
                <div className="text-xl font-black text-[#ffd23f] font-mono flex items-center gap-1 justify-center sm:justify-end">
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{playerXp} XP</span>
                </div>
                <div className="text-[11px] text-[var(--aurora-text-muted)] font-bold">
                  {gamesCompletedCount} ta bosqich yechildi
                </div>
              </div>

              {!studentAccount && onOpenRegister && (
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="duo-btn duo-btn-coral px-4 py-2 text-xs whitespace-nowrap"
                >
                  O&apos;rningizni Saqlang
                </button>
              )}
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="aurora-card rounded-[2rem] border border-[var(--aurora-border)] overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-[var(--aurora-border)] flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="text-base font-black text-[var(--aurora-text)] flex items-center gap-2 font-display">
                  <Trophy className="w-4 h-4 text-[#ffd23f]" />
                  <span>Barcha Dasturchilar Reytingi</span>
                </h3>
                <p className="text-xs text-[var(--aurora-text-muted)]">
                  O&apos;yinlar va kod sinovlari orqali to&apos;plangan tajriba ochkolari (XP)
                </p>
              </div>

              <div className="flex items-center gap-1 bg-[var(--aurora-surface-2)] p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setLeaderboardFilter('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    leaderboardFilter === 'all' ? 'bg-[#ff6b86] text-[#0a0912] font-black' : 'text-[var(--aurora-text-muted)]'
                  }`}
                >
                  Barcha vaqt
                </button>
                <button
                  type="button"
                  onClick={() => setLeaderboardFilter('weekly')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    leaderboardFilter === 'weekly' ? 'bg-[#ff6b86] text-[#0a0912] font-black' : 'text-[var(--aurora-text-muted)]'
                  }`}
                >
                  Bu hafta
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[var(--aurora-surface-2)] border-b border-[var(--aurora-border)] text-[var(--aurora-text-muted)] uppercase tracking-wider text-[10px] font-black">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">O&apos;rin</th>
                    <th className="py-3.5 px-4">Dasturchi</th>
                    <th className="py-3.5 px-4">Daraja</th>
                    <th className="py-3.5 px-4 text-center">Bosqichlar</th>
                    <th className="py-3.5 px-4 text-center">Aniqlik</th>
                    <th className="py-3.5 px-4 text-right">Tajriba (XP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--aurora-border)]">
                  {fullLeaderboard.map((player, index) => {
                    const rank = index + 1;
                    const isSelf = player.isCurrentUser;

                    return (
                      <tr
                        key={player.id}
                        className={`transition-colors ${
                          isSelf
                            ? 'bg-[#ff6b86]/15 font-bold text-[var(--aurora-text)]'
                            : 'hover:bg-[#ff6b86]/10 text-[var(--aurora-text)]'
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-black font-mono">
                          {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={player.avatar}
                              alt={player.name}
                              className="w-8 h-8 rounded-full object-cover border border-[var(--aurora-border)]"
                            />
                            <div>
                              <div className="font-black flex items-center gap-1.5">
                                <span>{player.name}</span>
                                {isSelf && (
                                  <span className="text-[9px] bg-[#ff6b86] text-[#0a0912] font-black px-2 py-0.5 rounded-full">
                                    Siz
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-[#ff8a3d] font-bold">
                                {player.streak > 0 && `🔥 ${player.streak} streak`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[var(--aurora-surface-2)] text-[var(--aurora-text)] border border-[var(--aurora-border)]">
                            Lvl {player.level} · {player.levelTitle}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold">{player.gamesCompleted} ta</td>
                        <td className="py-3.5 px-4 text-center font-mono font-black text-[#3ee6c4]">{player.accuracy}%</td>
                        <td className="py-3.5 px-4 text-right font-mono font-black text-[#ffd23f]">
                          ⚡ {player.xp} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BADGES & ACHIEVEMENTS */}
      {mainTab === 'badges' && (
        <div className="space-y-6">
          <div className="aurora-card border-2 border-[#ffd23f]/40 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AuroraMascot mood="excited" size={48} />
              <div>
                <div className="text-xs sm:text-sm font-black text-[var(--aurora-text)] flex items-center gap-2">
                  <span>Nishonlar, Medallar &amp; Bayramona Konfeti</span>
                  <span className="text-[10px] bg-[#b6f03c]/20 text-[#b6f03c] font-black px-2 py-0.5 rounded-full border border-[#b6f03c]/40">
                    Faol
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[var(--aurora-text-muted)] mt-0.5">
                  Har bir nishon va daraja ochilganda ekranda bayramona konfeti portlaydi!
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => fireMedalCelebrationConfetti('gold')}
              className="duo-btn duo-btn-gold px-4 py-2.5 text-xs flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Bayramona Konfeti Otish 🎉</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="aurora-card rounded-2xl p-3 border border-[var(--aurora-border)] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {(
                [
                  { id: 'all', label: `Barchasi (${totalBadgesCount})` },
                  { id: 'unlocked', label: `Ochilgan (${unlockedBadgesCount})` },
                  { id: 'locked', label: `Qulflangan (${totalBadgesCount - unlockedBadgesCount})` },
                  { id: 'xp', label: 'Tajriba XP' },
                  { id: 'stages', label: 'Bosqichlar' },
                  { id: 'games', label: "O'yinlar" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setBadgeFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl font-black transition-all cursor-pointer ${
                    badgeFilter === f.id
                      ? 'bg-[#ff6b86] text-[#0a0912]'
                      : 'bg-[var(--aurora-surface-2)] text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="text-xs font-mono font-black text-[#ffd23f]">
              Bonus XP: +{totalBonusXpUnlocked} XP ({badgesCompletionPercent}%)
            </div>
          </div>

          {/* Badges Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBadges.map((badge) => {
              const tier = TIER_CONFIG[badge.tier];
              const isUnlocked = badge.status.isUnlocked;

              return (
                <div
                  key={badge.id}
                  onClick={() => setSelectedBadgeModal(badge)}
                  className={`group relative aurora-card rounded-[2rem] p-5 transition-all duration-300 cursor-pointer border-2 flex flex-col justify-between ${
                    isUnlocked
                      ? `bg-gradient-to-br ${tier.bgGradient} ${tier.borderClass} hover:-translate-y-1`
                      : 'border-[var(--aurora-border)] opacity-65 grayscale hover:opacity-90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] border ${tier.badgePill}`}>
                      <span>{tier.emoji}</span>
                      <span>{tier.nameUz}</span>
                    </span>

                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#b6f03c]/20 text-[#b6f03c] border border-[#b6f03c]/40">
                        <Check className="w-3 h-3" />
                        <span>Ochiq</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--aurora-text-muted)] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                        <Lock className="w-3 h-3" />
                        <span>Qulflangan</span>
                      </span>
                    )}
                  </div>

                  <div className="my-5 flex flex-col items-center text-center">
                    <div className="relative mb-3.5">
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${
                          isUnlocked
                            ? `${tier.iconBg} ring-4 ring-white/20 shadow-xl`
                            : 'bg-white/10 text-[var(--aurora-text-muted)]'
                        }`}
                      >
                        {isUnlocked ? renderBadgeIcon(badge.iconType, 'w-9 h-9') : <Lock className="w-7 h-7" />}
                      </div>
                    </div>

                    <h3 className="text-base font-black text-[var(--aurora-text)] font-display">{badge.title}</h3>
                    <p className="text-xs text-[var(--aurora-text-muted)] mt-1 line-clamp-2 max-w-xs">
                      {badge.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[var(--aurora-border)]">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="text-[var(--aurora-text-muted)] font-bold">Holat:</span>
                        <span className={`font-black ${isUnlocked ? 'text-[#b6f03c]' : 'text-[var(--aurora-text)]'}`}>
                          {badge.status.progressLabel}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-700 ${
                            isUnlocked
                              ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c]'
                              : 'bg-gradient-to-r from-[#ff6b86] to-[#ffd23f]'
                          }`}
                          style={{ width: `${badge.status.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="inline-flex items-center gap-1 font-mono font-black text-[#ffd23f] bg-[#ffd23f]/15 px-2.5 py-1 rounded-lg border border-[#ffd23f]/30">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>+{badge.xpBonus} XP</span>
                      </span>
                      <span className="text-[11px] font-black text-[#3ee6c4] flex items-center gap-1">
                        <span>Batafsil</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DETAIL MODAL FOR SELECTED BADGE */}
      {selectedBadgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-pop-in">
          <div className="relative aurora-card rounded-[2rem] max-w-lg w-full p-6 sm:p-7 border-2 border-[#ffd23f]/40 space-y-5">
            <button
              type="button"
              onClick={() => setSelectedBadgeModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-[#ff5263]/20 text-[var(--aurora-text)] flex items-center justify-center transition-colors font-black text-sm cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center pt-2">
              <div className="inline-block relative mb-3">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center ring-4 ring-white/20 shadow-2xl mx-auto ${
                    selectedBadgeModal.status.isUnlocked
                      ? TIER_CONFIG[selectedBadgeModal.tier].iconBg
                      : 'bg-white/10 text-[var(--aurora-text-muted)]'
                  }`}
                >
                  {selectedBadgeModal.status.isUnlocked ? (
                    renderBadgeIcon(selectedBadgeModal.iconType, 'w-12 h-12')
                  ) : (
                    <Lock className="w-10 h-10" />
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-black text-[var(--aurora-text)] mt-2 font-display">
                {selectedBadgeModal.title}
              </h2>
              <p className="text-xs text-[var(--aurora-text-muted)] mt-1 italic">
                &ldquo;{selectedBadgeModal.lore}&rdquo;
              </p>
            </div>

            <div className="space-y-2.5 bg-[var(--aurora-surface-2)] rounded-2xl p-4 border border-[var(--aurora-border)] text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--aurora-text-muted)]">Talab qilinadigan shart:</span>
                <span className="font-black text-[var(--aurora-text)]">{selectedBadgeModal.conditionDescription}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--aurora-text-muted)]">Ko&apos;rsatkichingiz:</span>
                <span className="font-black text-[#3ee6c4]">{selectedBadgeModal.status.progressLabel}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {selectedBadgeModal.status.isUnlocked && (
                <>
                  <button
                    type="button"
                    onClick={() => fireMedalCelebrationConfetti(selectedBadgeModal.tier)}
                    className="duo-btn duo-btn-gold flex-1 py-2.5 px-4 text-xs flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Konfeti Otish 🎉</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => copyBadgeCelebration(selectedBadgeModal)}
                    className="duo-btn duo-btn-mint flex-1 py-2.5 px-4 text-xs flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Ulashish</span>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setSelectedBadgeModal(null)}
                className="duo-btn duo-btn-surface py-2.5 px-5 text-xs"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UNLOCKED CELEBRATION MODAL */}
      {unlockedCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-pop-in">
          <div className="relative w-full max-w-md aurora-card border-2 border-[#ffd23f] rounded-[2rem] p-6 sm:p-7 text-center space-y-4">
            <div className="flex justify-center">
              <AuroraMascot mood="excited" size={76} />
            </div>
            <h2 className="text-2xl font-black text-[var(--aurora-text)] font-display">
              {unlockedCelebrationModal.title}
            </h2>
            <p className="text-xs text-[var(--aurora-text-muted)]">{unlockedCelebrationModal.description}</p>
            <div className="text-lg font-mono font-black text-[#ffd23f]">
              +{unlockedCelebrationModal.xpBonus} XP Mukofot!
            </div>
            <button
              type="button"
              onClick={() => setUnlockedCelebrationModal(null)}
              className="duo-btn duo-btn-gold w-full py-3 text-xs"
            >
              Ajoyib, davom etish!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
