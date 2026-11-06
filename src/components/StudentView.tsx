import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Code2,
  Play,
  Sparkles,
  Award,
  Clock,
  ExternalLink,
  Laptop,
  Zap,
  Target,
  Flame,
  FileCode,
  ShieldCheck,
  MessageSquare,
  Search,
  Bot,
  Gamepad2,
  Terminal,
  Database,
  Server,
  Layers,
  X,
  Lock,
  Coins,
  Trophy,
  Star,
  Crown,
  ShoppingBag,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  Maximize2,
  Minimize2,
  Pencil,
  Camera,
  Swords,
  Home,
  Briefcase,
  ArrowLeft,
  Bell,
  CheckCircle2,
  Wifi,
  WifiOff,
  FlaskConical,
  Timer,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Student,
  Teacher,
  TestSubmissionResult,
  CourseStage,
  Lesson,
  CertificateData,
} from '../types';
import { LESSONS } from '../data/mockData';
import {
  getStudentCertificates,
  createAiStageExam,
  getStudents,
  updateStudent,
  addXpToStudent,
  MALE_PROGRAMMER_AVATAR,
  getLegendAdminStudentProfile,
  saveLegendAdminStudentProfile,
} from '../services/storage';
import { StudentAiAssistant } from './StudentAiAssistant';
import { LessonQuizModal } from './LessonQuizModal';
import { CertificateModal } from './CertificateModal';
import { CyberCodeArenaGame } from './CyberCodeArenaGame';
import { HtmlCodeGames } from './HtmlCodeGames';
import { AvatarWithFrame } from './AvatarWithFrame';
import { CircularPhotoCropperModal } from './CircularPhotoCropperModal';
import { StudentPublicProfileModal } from './StudentPublicProfileModal';
import { LeagueBattleArena } from './LeagueBattleArena';
import { CodePlaygroundIDE } from './CodePlaygroundIDE';
import { TopMenuTab } from './Header';

interface StudentViewProps {
  student: Student | null;
  teacher: Teacher | null;
  testSubmissions: TestSubmissionResult[];
  onOpenTestIdModal?: (initialId?: string) => void;
  onOpenFinalExamModal?: () => void;
  onOpenGroupChat?: (teacherId: string) => void;
  onCompleteLesson: (lessonId: string) => void;
  onOpenRegisterModal?: () => void;
  onOpenGroqConfig?: () => void;
  onOpen3DGame?: () => void;
  onOpenGeminiStudio?: () => void;
  topTab?: TopMenuTab;
  onSelectTopTab?: (tab: TopMenuTab) => void;
  onOpenLandingPage?: () => void;
  onOpenPortfolioPage?: () => void;
  onRefreshData?: () => void;
  onExitGhostStudentMode?: () => void;
}

interface ShopItem {
  id: string;
  title: string;
  category: 'xp_boost' | 'study_tool' | 'frame' | 'avatar';
  price: number;
  preview: string;
  description: string;
  actionType?:
    | 'xp_potion_1_25x'
    | 'xp_potion_1_5x'
    | 'xp_potion_1_75x'
    | 'xp_potion_2_0x'
    | 'xp_potion_2_5x'
    | 'xp_potion_3_0x'
    | 'xp_boost_30s_1xp'
    | 'xp_boost_1_min_2xp'
    | 'xp_boost_90s_3xp'
    | 'xp_boost_2_min_4xp'
    | 'xp_boost_3_min_5xp'
    | 'pvp_shield_1'
    | 'pvp_double_win_1'
    | 'ai_free_pass_5'
    | 'xp_potion_double_charge'
    | 'unlock_1_lesson'
    | 'unlock_2_lessons'
    | 'unlock_3_lessons'
    | 'unlock_5_lessons'
    | 'unlock_7_lessons'
    | 'unlock_10_lessons'
    | 'stage_exam_html'
    | 'stage_exam_css'
    | 'stage_exam_js'
    | 'stage_exam_ts'
    | 'stage_exam_react'
    | 'stage_exam_backend'
    | 'stage_exam_sql'
    | 'stage_exam_fullstack'
    | 'final_exam_access'
    | 'streak_shield_1'
    | 'streak_shield_3'
    | 'streak_shield_7'
    | 'streak_shield_14'
    | 'stage_upgrade_boost';
}

// ============================================================================
// 100 TA NOYOB DO'KON MAHSULOTI (Takroriy 1-min XP boostlar olib tashlandi —
// har bir booster o'ziga xos multiplikator, tezlik, vaqt yoki PvP vazifasiga ega!)
// ============================================================================
const SHOP_ITEMS: ShopItem[] = [
  // ==================== 1. TURFA XIL XP MULTIPLIKATOR VA BOOSTERLAR (15 TA — HAR BIRI BOSHQACHA ISHLAYDI!) ====================
  {
    id: 'boost-xp-potion-1-25x',
    title: '1.25x Boshlang‘ich XP Damlamasi',
    category: 'xp_boost',
    price: 22,
    preview: '🧫',
    description: 'Dars viktorinalaridan beriladigan XP ballarini 1.25 baravarga ko‘paytiradi',
    actionType: 'xp_potion_1_25x',
  },
  {
    id: 'boost-xp-potion-1-5x',
    title: '1.5x Klassik XP Damlamasi (Potion)',
    category: 'xp_boost',
    price: 35,
    preview: '🧪',
    description: 'Dars va viktorinalardan beriladigan XP ballarini 1.5 baravarga ko‘paytiradi!',
    actionType: 'xp_potion_1_5x',
  },
  {
    id: 'boost-xp-potion-1-75x',
    title: '1.75x Kumush Alximik Eliksiri',
    category: 'xp_boost',
    price: 48,
    preview: '⚗️',
    description: 'Har bir yakunlangan dars testidan 1.75 baravar ko‘p XP olish imkonini beradi',
    actionType: 'xp_potion_1_75x',
  },
  {
    id: 'boost-xp-potion-2-0x',
    title: '2.0x Oltin Ikki Baravar XP Potion',
    category: 'xp_boost',
    price: 65,
    preview: '🍯',
    description: 'Barcha dars viktorinalarida XP mukofotini to‘liq 2.0 baravarga oshiradi!',
    actionType: 'xp_potion_2_0x',
  },
  {
    id: 'boost-xp-potion-2-5x',
    title: '2.5x Zumrad Kristal XP Eliksiri',
    category: 'xp_boost',
    price: 85,
    preview: '❇️',
    description: 'Yuqori bosqich dasturchilari uchun dars XP mukofotini 2.5x ga ko‘taradi',
    actionType: 'xp_potion_2_5x',
  },
  {
    id: 'boost-xp-potion-3-0x',
    title: '3.0x Qirollik Imperator XP Damlamasi',
    category: 'xp_boost',
    price: 115,
    preview: '👑',
    description: 'Eng kuchli damlama: har bir dars testidan 3 baravar (3.0x) XP beradi!',
    actionType: 'xp_potion_3_0x',
  },
  {
    id: 'boost-30s-1xp-sec',
    title: '30-Soniyalik Mikro Impuls (+1 XP/sek)',
    category: 'xp_boost',
    price: 18,
    preview: '🔋',
    description: '30 soniya davomida har sekundda +1 XP (jami +30 XP) tezkor quvvat beradi',
    actionType: 'xp_boost_30s_1xp',
  },
  {
    id: 'boost-1-min-2xp-sec',
    title: '1-Min Standart XP Boost (+2 XP/sek)',
    category: 'xp_boost',
    price: 45,
    preview: '⚡',
    description: '60 soniya davomida har sekundda +2 XP (jami +120 XP) jonli ravishda qo‘shadi!',
    actionType: 'xp_boost_1_min_2xp',
  },
  {
    id: 'boost-90s-3xp-sec',
    title: '90-Soniyalik Plazma Generator (+3 XP/sek)',
    category: 'xp_boost',
    price: 78,
    preview: '🌩️',
    description: '90 soniya davomida har sekundda +3 XP (jami +270 XP) uzluksiz ishlab chiqaradi',
    actionType: 'xp_boost_90s_3xp',
  },
  {
    id: 'boost-2-min-4xp-sec',
    title: '2-Min Kvant Reaktor (+4 XP/sek)',
    category: 'xp_boost',
    price: 120,
    preview: '⚛️',
    description: '120 soniya davomida har sekundda +4 XP (jami +480 XP) quvvat beruvchi reaktor',
    actionType: 'xp_boost_2_min_4xp',
  },
  {
    id: 'boost-3-min-5xp-sec',
    title: '3-Min Supernova Yadro (+5 XP/sek)',
    category: 'xp_boost',
    price: 175,
    preview: '🌌',
    description: '180 soniya davomida sekundiga +5 XP (jami +900 XP) beruvchi eng kuchli generator!',
    actionType: 'xp_boost_3_min_5xp',
  },
  {
    id: 'boost-pvp-shield-1',
    title: 'PvP Liga Himoya Qalqoni (1 jang)',
    category: 'xp_boost',
    price: 32,
    preview: '🛡️',
    description: 'Ligada yutqazib qo‘ysangiz, -30 XP va -2 Tanga jarimasidan 1 marta to‘liq saqlaydi!',
    actionType: 'pvp_shield_1',
  },
  {
    id: 'boost-pvp-double-win-1',
    title: 'PvP 2x G‘alaba Tumori (+60 XP / +4 Coin)',
    category: 'xp_boost',
    price: 42,
    preview: '⚔️',
    description: 'Navbatdagi Liga g‘alabangiz uchun +30 XP o‘rniga +60 XP va +4 Tanga beradi!',
    actionType: 'pvp_double_win_1',
  },
  {
    id: 'boost-ai-free-pass-5',
    title: '5 ta Bepul AI Ustoz Savol Kvota Kartasi',
    category: 'xp_boost',
    price: 25,
    preview: '🤖',
    description: 'AI Ustozga tanga sarflamasdan 5 marta bepul savol berish kvotasini qo‘shadi',
    actionType: 'ai_free_pass_5',
  },
  {
    id: 'boost-combo-potion-timer',
    title: 'Ultra Kombo: 2.0x Potion + PvP Qalqon + 1-Min Boost',
    category: 'xp_boost',
    price: 95,
    preview: '💎',
    description: '2.0x XP Damlamasi, 1 ta PvP Qalqon va 60s (+2 XP/sek) Boostni birdaniga yoqadi!',
    actionType: 'xp_potion_double_charge',
  },

  // ==================== 2. SAYTDA ISHLAYDIGAN O'QUV VOSITALARI VA KALITLAR (20 TA) ====================
  {
    id: 'tool-unlock-1-lesson',
    title: '1 ta Keyingi Darsni Ochish Kaliti',
    category: 'study_tool',
    price: 25,
    preview: '🔑',
    description: 'Joriy bosqichdagi navbatdagi 1 ta darsni darhol tugallangan qilib ochib beradi',
    actionType: 'unlock_1_lesson',
  },
  {
    id: 'tool-unlock-2-lessons',
    title: '2 ta Darsni Juftlik Ochish Kaliti',
    category: 'study_tool',
    price: 44,
    preview: '🗝️',
    description: 'Yo‘l xaritasidagi navbatdagi 2 ta dars tugunini darhol ochib beradi',
    actionType: 'unlock_2_lessons',
  },
  {
    id: 'tool-unlock-3-lessons',
    title: '3 ta Darsni Tezkor Ochish Paketi',
    category: 'study_tool',
    price: 60,
    preview: '🔓',
    description: 'Yo‘l xaritasidagi navbatdagi 3 ta dars tugunini birdaniga ochadi',
    actionType: 'unlock_3_lessons',
  },
  {
    id: 'tool-unlock-5-lessons',
    title: '5 ta Darsni Ekspress Ochish Kaliti',
    category: 'study_tool',
    price: 95,
    preview: '⚡',
    description: 'Bosqichni tezroq yakunlash uchun 5 ta darsni darhol ochadi',
    actionType: 'unlock_5_lessons',
  },
  {
    id: 'tool-unlock-7-lessons',
    title: '7 ta Darsni Haftalik Ochish Sandig‘i',
    category: 'study_tool',
    price: 125,
    preview: '🧰',
    description: 'Joriy bosqichdagi 7 ta darsni ketma-ket tugallangan qilib ochadi',
    actionType: 'unlock_7_lessons',
  },
  {
    id: 'tool-unlock-10-lessons',
    title: '10 ta Darsni Master Ochish Arxivi',
    category: 'study_tool',
    price: 165,
    preview: '🏛️',
    description: 'Butun bosqich darslarini deyarli to‘liq ochib beruvchi 10 ta dars kaliti',
    actionType: 'unlock_10_lessons',
  },
  {
    id: 'tool-exam-html',
    title: 'HTML5 Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 30,
    preview: '📄',
    description: 'HTML bosqichi bo‘yicha shaxsiy Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_html',
  },
  {
    id: 'tool-exam-css',
    title: 'CSS3 Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 35,
    preview: '🎨',
    description: 'CSS3 bosqichi bo‘yicha shaxsiy Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_css',
  },
  {
    id: 'tool-exam-js',
    title: 'JavaScript Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 40,
    preview: '⚡',
    description: 'JavaScript bosqichi bo‘yicha maxsus Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_js',
  },
  {
    id: 'tool-exam-ts',
    title: 'TypeScript Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 45,
    preview: '📘',
    description: 'TypeScript bosqichi bo‘yicha maxsus Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_ts',
  },
  {
    id: 'tool-exam-react',
    title: 'React Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 50,
    preview: '⚛️',
    description: 'React komponentlar bosqichi bo‘yicha Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_react',
  },
  {
    id: 'tool-exam-backend',
    title: 'Node.js Backend Imtihoni Test ID',
    category: 'study_tool',
    price: 55,
    preview: '🖥️',
    description: 'Node.js va Express Backend bosqichi bo‘yicha shaxsiy Test ID yaratadi',
    actionType: 'stage_exam_backend',
  },
  {
    id: 'tool-exam-sql',
    title: 'SQL va Ma’lumotlar Bazasi Test ID',
    category: 'study_tool',
    price: 58,
    preview: '🗄️',
    description: 'SQL va PostgreSQL bosqichi bo‘yicha shaxsiy Test ID yaratadi',
    actionType: 'stage_exam_sql',
  },
  {
    id: 'tool-exam-fullstack',
    title: 'Full-Stack Arxitektor Imtihoni Test ID',
    category: 'study_tool',
    price: 62,
    preview: '🌐',
    description: 'Full-Stack bosqichi bo‘yicha yakuniy Test ID yaratadi',
    actionType: 'stage_exam_fullstack',
  },
  {
    id: 'tool-final-exam-pass',
    title: 'Final Diplom Imtihoniga Yo‘llanma',
    category: 'study_tool',
    price: 65,
    preview: '🎓',
    description: 'Rasmiy QR-kodli PDF sertifikat beruvchi Final Imtihon oynasini darhol ochadi',
    actionType: 'final_exam_access',
  },
  {
    id: 'tool-streak-shield-1',
    title: 'Kunlik Streak Himoya Qalqoni (1 kun)',
    category: 'study_tool',
    price: 20,
    preview: '🛡️',
    description: 'Kunlik streak uzilib qolishidan 1 kunlik ishonchli himoya',
    actionType: 'streak_shield_1',
  },
  {
    id: 'tool-streak-shield-3',
    title: 'Kumush Streak Qalqoni (3 kunlik)',
    category: 'study_tool',
    price: 32,
    preview: '🔰',
    description: '3 kun davomida kunlik faollik olovini o‘chishdan himoya qiladi',
    actionType: 'streak_shield_3',
  },
  {
    id: 'tool-streak-shield-7',
    title: 'Olmos Streak Qalqoni (7 kunlik)',
    category: 'study_tool',
    price: 45,
    preview: '💠',
    description: 'Hafta davomida streak olovini saqlaydi',
    actionType: 'streak_shield_7',
  },
  {
    id: 'tool-streak-shield-14',
    title: 'Imperator Streak Qalqoni (14 kunlik)',
    category: 'study_tool',
    price: 75,
    preview: '🏰',
    description: '2 hafta davomida kunlik streak uzilmasligini kafolatlaydi',
    actionType: 'streak_shield_14',
  },
  {
    id: 'tool-stage-upgrade',
    title: 'Keyingi Bosqichga O‘tish Vaucheri',
    category: 'study_tool',
    price: 140,
    preview: '🚀',
    description: 'Joriy bosqichdan keyingi bosqichga (HTML→CSS→JS) to‘g‘ridan-to‘g‘ri o‘tkazadi',
    actionType: 'stage_upgrade_boost',
  },

  // ==================== 3. BEZAKLI AYLANA PROFIL RAMKALARI (30 TA — RASMDAGIDEK KOI BALIQ VA KOSMIK) ====================
  {
    id: 'frame-koi-fish',
    title: 'Koi Baliq Kosmik Ramkasi (VIP)',
    category: 'frame',
    price: 35,
    preview: 'frame-koi-fish',
    description: 'Rasmda ko‘rsatilgan moviy-binafsha ikki Koi balig‘i va yulduz turkumi ramkasi!',
  },
  {
    id: 'frame-aurora-coral',
    title: 'Aurora Marjon Bezakli Ramka',
    category: 'frame',
    price: 20,
    preview: 'frame-aurora-coral',
    description: 'Quyosh botishi rangidagi ikki qavatli naqshinkor marjon ramka',
  },
  {
    id: 'frame-mint-cyber',
    title: 'Yalpiz Kiber Kristall Ramka',
    category: 'frame',
    price: 22,
    preview: 'frame-mint-cyber',
    description: 'Sof yalpiz va zumrad kristallar bilan bezatilgan ramka',
  },
  {
    id: 'frame-gold-crown',
    title: 'Qirollik Oltin Toj Ramkasi',
    category: 'frame',
    price: 40,
    preview: 'frame-gold-crown',
    description: 'Tepa qismida oltin toj va zumrad toshlar o‘rnatilgan chempion ramkasi',
  },
  {
    id: 'frame-lime-energy',
    title: 'Laym Kvant Energiya Ramkasi',
    category: 'frame',
    price: 25,
    preview: 'frame-lime-energy',
    description: 'Algoritm tezligini bildiruvchi nefrit-laym aylana ramka',
  },
  {
    id: 'frame-sunset-orange',
    title: 'Olovli Qaqnus Ramkasi',
    category: 'frame',
    price: 28,
    preview: 'frame-sunset-orange',
    description: 'Atrofida olov yaproqlari aylanuvchi issiq apelsin ramka',
  },
  {
    id: 'frame-crimson-samurai',
    title: 'Samuray Qirmizi Qalqon Ramka',
    category: 'frame',
    price: 36,
    preview: 'frame-crimson-samurai',
    description: 'JavaScript ustalari uchun qirmizi-qizil jangovar ramka',
  },
  {
    id: 'frame-cyan-diamond',
    title: 'Muzlik Olmos Kvant Ramkasi',
    category: 'frame',
    price: 42,
    preview: 'frame-cyan-diamond',
    description: 'Muzdek moviy kvant nurlarini taratuvchi olmos ramka',
  },
  {
    id: 'frame-emerald-hacker',
    title: 'Zumrad Matritsa Terminal Ramkasi',
    category: 'frame',
    price: 45,
    preview: 'frame-emerald-hacker',
    description: 'Haqiqiy terminal va backend kodchilari uchun zumrad halqa',
  },
  {
    id: 'frame-lord-imperator',
    title: 'Imperator Platinam Yulduz Ramka',
    category: 'frame',
    price: 90,
    preview: 'frame-lord-imperator',
    description: 'Akademiyaning eng nufuzli Koi va kosmik yulduzli Imperator ramkasi',
  },
  {
    id: 'frame-neon-lotus',
    title: 'Neon Nilufar (Lotus) Ramkasi',
    category: 'frame',
    price: 27,
    preview: 'frame-neon-lotus',
    description: 'Pushti-moviy nilufar barglari bilan bezatilgan nafis ramka',
  },
  {
    id: 'frame-solar-eclipse',
    title: 'Quyosh Tutilishi (Solar Eclipse) Ramkasi',
    category: 'frame',
    price: 48,
    preview: 'frame-solar-eclipse',
    description: 'Oltin va olovli quyosh toji nurlarini taratuvchi ramka',
  },
  {
    id: 'frame-arctic-wolf',
    title: 'Arktika Bo‘risi Muz Ramkasi',
    category: 'frame',
    price: 34,
    preview: 'frame-arctic-wolf',
    description: 'Shimoliy yog‘du va muz kristallari bilan qoplangan ramka',
  },
  {
    id: 'frame-magma-titan',
    title: 'Magma Titan Vulkan Ramkasi',
    category: 'frame',
    price: 50,
    preview: 'frame-magma-titan',
    description: 'Qaynoq lava va vulqon uchqunlaridan iborat kuchli ramka',
  },
  {
    id: 'frame-starlight-nova',
    title: 'Yulduzli Supernova Ramkasi',
    category: 'frame',
    price: 52,
    preview: 'frame-starlight-nova',
    description: 'Koinot yulduzlari va kometa izlari aylanuvchi ramka',
  },
  {
    id: 'frame-sakura-wind',
    title: 'Sakura Bahor Shamoli Ramkasi',
    category: 'frame',
    price: 30,
    preview: 'frame-sakura-wind',
    description: 'Yapon sakurasi gullari bilan bezatilgan romantik ramka',
  },
  {
    id: 'frame-thunder-thor',
    title: 'Chaqmoq va Momaqaldiroq Ramkasi',
    category: 'frame',
    price: 44,
    preview: 'frame-thunder-thor',
    description: 'Yuqori kuchlanishli elektr razryadlari aylanuvchi ramka',
  },
  {
    id: 'frame-jade-dragon',
    title: 'Nefrit Ajdarho Imperiya Ramkasi',
    category: 'frame',
    price: 58,
    preview: 'frame-jade-dragon',
    description: 'Sharqona yashil nefrit toshi va ajdarho timsolli ramka',
  },
  {
    id: 'frame-ruby-royale',
    title: 'Yoqut Qirollik (Ruby Royale) Ramkasi',
    category: 'frame',
    price: 54,
    preview: 'frame-ruby-royale',
    description: 'Qimmatbaho qizil yoqut toshlari terilgan elit ramka',
  },
  {
    id: 'frame-sapphire-ocean',
    title: 'Sapfir Okean To‘lqini Ramkasi',
    category: 'frame',
    price: 46,
    preview: 'frame-sapphire-ocean',
    description: 'Chuqur okean marvaridlari va moviy sapfir halqasi',
  },
  {
    id: 'frame-obsidian-stealth',
    title: 'Obsidian Tungi Soyalar Ramkasi',
    category: 'frame',
    price: 40,
    preview: 'frame-obsidian-stealth',
    description: 'Tungi rejimda kod yozuvchi ninjalar uchun kumush-qora ramka',
  },
  {
    id: 'frame-golden-laurel',
    title: 'Sezar Oltin Dafna Gulchambari',
    category: 'frame',
    price: 62,
    preview: 'frame-golden-laurel',
    description: 'G‘oliblar uchun toza oltin dafna yaproqli chempion ramkasi',
  },
  {
    id: 'frame-quantum-prism',
    title: 'Kvant Prizma Spektr Ramkasi',
    category: 'frame',
    price: 65,
    preview: 'frame-quantum-prism',
    description: 'Yorug‘lik spektrini sinishi kabi tovlanuvchi prizma ramka',
  },
  {
    id: 'frame-cyber-glitch',
    title: 'Cyber Glitch 2077 Ramkasi',
    category: 'frame',
    price: 49,
    preview: 'frame-cyber-glitch',
    description: 'Kiberpank neon chiziqlar va raqamli impuls ramkasi',
  },
  {
    id: 'frame-celestial-wings',
    title: 'Samoviy Qanotlar (Celestial) Ramkasi',
    category: 'frame',
    price: 70,
    preview: 'frame-celestial-wings',
    description: 'Ikki yonida nurli qanotlar bilan bezatilgan samoviy ramka',
  },
  {
    id: 'frame-binary-matrix',
    title: '0101 Binar Kod Halqasi',
    category: 'frame',
    price: 38,
    preview: 'frame-binary-matrix',
    description: 'Atrofida 0 va 1 raqamlari aylanuvchi algoritmik ramka',
  },
  {
    id: 'frame-phoenix-rebirth',
    title: 'Abadiy Qaqnus Qanoti Ramkasi',
    category: 'frame',
    price: 68,
    preview: 'frame-phoenix-rebirth',
    description: 'Oltin-qirmizi qaqnus patlari bilan bezatilgan afsonaviy ramka',
  },
  {
    id: 'frame-crystal-palace',
    title: 'Billur Saroy Qirol Ramkasi',
    category: 'frame',
    price: 72,
    preview: 'frame-crystal-palace',
    description: 'Toza billur va olmos qirralari porlab turuvchi ramka',
  },
  {
    id: 'frame-infinity-omega',
    title: 'Cheksizlik (Infinity Omega) Ramkasi',
    category: 'frame',
    price: 85,
    preview: 'frame-infinity-omega',
    description: 'Cheksiz bilim va yuqori daraja ramzi bo‘lgan Omega halqasi',
  },
  {
    id: 'frame-devmaster-supreme',
    title: 'DevMaster Supreme Grandmaster Ramkasi',
    category: 'frame',
    price: 120,
    preview: 'frame-devmaster-supreme',
    description: 'Akademiyaning eng qimmat va eng yorqin Koi + Oltin Toj kombinatsiyasi',
  },

  // ==================== 4. PROFIL O'NG PASTKI BURCHAK STIKER-NISHONLARI (35 TA) ====================
  {
    id: 'avatar-html-architect',
    title: 'HTML5 Poydevor Stikeri',
    category: 'avatar',
    price: 18,
    preview: 'HTML POYDEVOR',
    description: 'Profil rasmingiz o‘ng pastki burchagiga "HTML" poydevor stikerini yopishtiradi',
  },
  {
    id: 'avatar-css-wizard',
    title: 'CSS3 Dizayn Stikeri',
    category: 'avatar',
    price: 22,
    preview: 'CSS DIZAYN',
    description: 'Profil rasmingiz o‘ng pastki burchagiga "CSS" dizayn stikerini qo‘yadi',
  },
  {
    id: 'avatar-js-ninja',
    title: 'JavaScript Ninja Stikeri',
    category: 'avatar',
    price: 28,
    preview: 'JS NINJA',
    description: 'Profil rasmingiz o‘ng pastki burchagiga "JS" algoritm stikerini qo‘yadi',
  },
  {
    id: 'avatar-devmaster-legend',
    title: 'LEGEND Olmos Stikeri (VIP)',
    category: 'avatar',
    price: 75,
    preview: 'LEGEND 💎',
    description: 'Profil rasmingiz o‘ng pastki burchagiga oltin "LEGEND" stikerini o‘rnatadi!',
  },
  {
    id: 'avatar-astronaut',
    title: 'KOSMIK Dasturchi Stikeri',
    category: 'avatar',
    price: 30,
    preview: 'COSMO 🚀',
    description: 'Profil rasmingiz burchagida "COSMO" kosmik stiker porlab turadi',
  },
  {
    id: 'avatar-samurai',
    title: 'SAMURAY Kodchi Stikeri',
    category: 'avatar',
    price: 35,
    preview: 'SAMURAI ⚔️',
    description: 'Profil rasmingiz burchagiga "SAMURAI" jangovar stikerini qo‘shadi',
  },
  {
    id: 'avatar-bug-hunter',
    title: 'BUG HUNTER Stikeri',
    category: 'avatar',
    price: 25,
    preview: 'DEBUG 🐞',
    description: 'Xato ovchisi "DEBUG" rasmiy burchak stikeri',
  },
  {
    id: 'avatar-algo-master',
    title: 'ALGO Grossmeyster Stikeri',
    category: 'avatar',
    price: 38,
    preview: 'ALGO ♟️',
    description: 'Mantiq va algoritm chempioni burchak stikeri',
  },
  {
    id: 'avatar-night-coder',
    title: 'TUNGI Kodchi Stikeri',
    category: 'avatar',
    price: 32,
    preview: 'NIGHT 🌙',
    description: 'Tungi fokus rejimida o‘rganuvchi dasturchi stikeri',
  },
  {
    id: 'avatar-fullstack-king',
    title: 'PRO Full-Stack Toj Stikeri',
    category: 'avatar',
    price: 55,
    preview: 'PRO KING 👑',
    description: 'Frontend va Backend ustasi "PRO" oltin burchak stikeri',
  },
  {
    id: 'avatar-ts-pro',
    title: 'TypeScript Strict Stikeri',
    category: 'avatar',
    price: 33,
    preview: 'TS PRO 📘',
    description: 'TypeScript va tiplar ustasi burchak nishoni',
  },
  {
    id: 'avatar-react-atom',
    title: 'React Atom Master Stikeri',
    category: 'avatar',
    price: 36,
    preview: 'REACT ⚛️',
    description: 'Zamonaviy React komponentlar ustasi stikeri',
  },
  {
    id: 'avatar-node-engine',
    title: 'Node.js Backend Dvigatel Stikeri',
    category: 'avatar',
    price: 39,
    preview: 'NODE 🟢',
    description: 'Server va API me’mori burchak stikeri',
  },
  {
    id: 'avatar-sql-architect',
    title: 'SQL Baza Arxitektori Stikeri',
    category: 'avatar',
    price: 41,
    preview: 'SQL 🗄️',
    description: 'Ma’lumotlar bazasi va Postgres ustasi stikeri',
  },
  {
    id: 'avatar-pvp-gladiator',
    title: 'PvP Arena Gladiatori Stikeri',
    category: 'avatar',
    price: 45,
    preview: 'GLAD 🛡️',
    description: '30 savollik PvP Liga janglarida g‘olib chiqqanlar nishoni',
  },
  {
    id: 'avatar-ai-whisperer',
    title: 'AI Neyron Arxitektor Stikeri',
    category: 'avatar',
    price: 48,
    preview: 'AI PRO 🧠',
    description: 'Sun’iy intellekt va prompt injiniring ustasi stikeri',
  },
  {
    id: 'avatar-speed-coder',
    title: 'Chaqmoq Tezkor Kodchi Stikeri',
    category: 'avatar',
    price: 29,
    preview: 'FLASH ⚡',
    description: '15 soniyada savollarga javob beruvchi tezkor talaba nishoni',
  },
  {
    id: 'avatar-clean-code',
    title: 'Toza Kod (Clean Code) Stikeri',
    category: 'avatar',
    price: 31,
    preview: 'CLEAN ✨',
    description: 'Tartibli va xatosiz kod yozuvchi dasturchi stikeri',
  },
  {
    id: 'avatar-git-wizard',
    title: 'Git & GitHub Ustasi Stikeri',
    category: 'avatar',
    price: 27,
    preview: 'GIT 🌿',
    description: 'Versiyalar nazorati va open-source ustasi nishoni',
  },
  {
    id: 'avatar-linux-root',
    title: 'Linux Terminal Sudo Stikeri',
    category: 'avatar',
    price: 44,
    preview: 'SUDO 🐧',
    description: 'Terminal va buyruqlar satri ustasi nishoni',
  },
  {
    id: 'avatar-cyber-shield',
    title: 'Kiber Xavfsizlik Qalqoni Stikeri',
    category: 'avatar',
    price: 46,
    preview: 'SEC 🔒',
    description: 'Xavfsiz veb-ilovalar yaratuvchi mutaxassis stikeri',
  },
  {
    id: 'avatar-pixel-artist',
    title: 'UI/UX Piksel San’atkori Stikeri',
    category: 'avatar',
    price: 26,
    preview: 'UI UX 🎨',
    description: 'Nafis interfeys va animatsiyalar dizayneri stikeri',
  },
  {
    id: 'avatar-cloud-captain',
    title: 'Cloud & Render Deploy Kapitani',
    category: 'avatar',
    price: 43,
    preview: 'CLOUD ☁️',
    description: 'Bulutli serverlar va Render platformasi ustasi stikeri',
  },
  {
    id: 'avatar-api-ninja',
    title: 'REST API & JSON Ustasi Stikeri',
    category: 'avatar',
    price: 34,
    preview: 'API 🔗',
    description: 'Server va frontendni bog‘lovchi API ustasi nishoni',
  },
  {
    id: 'avatar-streak-lord',
    title: '365 Kunlik Olovli Streak Stikeri',
    category: 'avatar',
    price: 52,
    preview: 'FIRE 🔥',
    description: 'Biror kun ham dars qoldirmaydigan intizomli talaba stikeri',
  },
  {
    id: 'avatar-golden-star',
    title: 'Akademiya Oltin Yulduzi Stikeri',
    category: 'avatar',
    price: 50,
    preview: 'STAR 🌟',
    description: 'Reyting peshqadamlari uchun yorqin oltin yulduz nishoni',
  },
  {
    id: 'avatar-quantum-dev',
    title: 'Kvant Hisoblash Dasturchisi Stikeri',
    category: 'avatar',
    price: 60,
    preview: 'QUANT 🔮',
    description: 'Kelajak texnologiyalari va murakkab tizimlar ustasi',
  },
  {
    id: 'avatar-dragon-born',
    title: 'Sharq Ajdarhosi (Dragon) Stikeri',
    category: 'avatar',
    price: 58,
    preview: 'DRAGON 🐉',
    description: 'Kuchli iroda va yuqori XP sohiblari uchun ajdarho stikeri',
  },
  {
    id: 'avatar-phoenix-wing',
    title: 'Qaqnus Parvozi Stikeri',
    category: 'avatar',
    price: 54,
    preview: 'PHOENIX 🦅',
    description: 'Har qanday xatoni yengib o‘tuvchi qaqnus nishoni',
  },
  {
    id: 'avatar-koi-guardian',
    title: 'Koi Baliq Okean Qo‘riqchisi Stikeri',
    category: 'avatar',
    price: 47,
    preview: 'KOI 🐟',
    description: 'Koi Baliq kosmik ramkasiga mos tushuvchi burchak stikeri',
  },
  {
    id: 'avatar-emerald-vip',
    title: 'Zumrad VIP Klub Stikeri',
    category: 'avatar',
    price: 64,
    preview: 'VIP 💚',
    description: 'Akademiya faxriy a’zolari uchun zumrad VIP burchak nishoni',
  },
  {
    id: 'avatar-ruby-champion',
    title: 'Yoqut Chempion Kubogi Stikeri',
    category: 'avatar',
    price: 68,
    preview: 'CHAMP 🏆',
    description: 'Haftalik Podium 1-o‘rin g‘oliblari uchun maxsus nishon',
  },
  {
    id: 'avatar-infinity-coder',
    title: 'Infinity Cheksiz Kodchi Stikeri',
    category: 'avatar',
    price: 72,
    preview: 'INF ♾️',
    description: 'Cheksiz o‘rganish va mukammallik ramzi',
  },
  {
    id: 'avatar-cmdbek-friend',
    title: 'CMDbekning Eng Yaqin Do‘sti Stikeri',
    category: 'avatar',
    price: 40,
    preview: 'CMDBEK 🤖',
    description: 'CMDbek AI yordamchisi bilan faol ishlovchi talaba nishoni',
  },
  {
    id: 'avatar-lord-imperator',
    title: 'IMPERATOR Oliy Akademiya Stikeri',
    category: 'avatar',
    price: 110,
    preview: 'IMPERATOR 👑',
    description: 'DevMaster Academy eng oliy darajadagi Imperator unvoni stikeri!',
  },
];

export const StudentView: React.FC<StudentViewProps> = ({
  student,
  teacher,
  testSubmissions,
  onOpenTestIdModal,
  onOpenFinalExamModal,
  onOpenGroupChat,
  onCompleteLesson,
  topTab = 'asosiy',
  onSelectTopTab,
  onOpenLandingPage,
  onOpenPortfolioPage,
  onRefreshData,
  onExitGhostStudentMode,
}) => {
  // Windows 10 Settings sub-navigation inside "Asosiy"
  const [asosiySubView, setAsosiySubView] = useState<
    'hub' | 'dashboard' | 'liga_battle' | 'code_ide' | 'games' | 'shop'
  >('hub');

  // Windows 10 Settings sub-navigation inside "Sahifalar"
  const [sahifalarSubView, setSahifalarSubView] = useState<'hub' | 'oquv_sahifasi'>('hub');

  const [showCyberArenaGame, setShowCyberArenaGame] = useState<boolean>(false);
  const [pathDisplayMode, setPathDisplayMode] = useState<'zigzag' | 'grid'>('zigzag');
  const [selectedTrack, setSelectedTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Lesson Modal
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonMode, setLessonMode] = useState<'textbook' | 'tryit' | 'assistant'>('textbook');

  // Try-It Studio State
  const [userCode, setUserCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isCodeRunning, setIsCodeRunning] = useState(false);

  // Modals
  const [quizLesson, setQuizLesson] = useState<Lesson | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<CertificateData | null>(null);
  const [showFloatingAi, setShowFloatingAi] = useState(false);
  const [stageLockAlert, setStageLockAlert] = useState<string | null>(null);
  const [levelUpModal, setLevelUpModal] = useState<{ level: number; xpEarned: number } | null>(null);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  // Profile Edit & Circular Photo Cropper Modals
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPhotoCropperModal, setShowPhotoCropperModal] = useState(false);
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

  // Edit Profile Form fields
  const [editName, setEditName] = useState(student?.name || '');
  const [editSurname, setEditSurname] = useState(student?.surname || '');
  const [editUsername, setEditUsername] = useState(student?.username || '');
  const [editAge, setEditAge] = useState<number>(student?.age || 16);
  const [editBio, setEditBio] = useState(student?.bio || '');
  const [editPhone, setEditPhone] = useState(student?.phone || '');
  const [editPassword, setEditPassword] = useState(student?.password || '');
  const [profileSaveMsg, setProfileSaveMsg] = useState<string | null>(null);

  // Timed XP Boost live countdown state
  const [boostRemainingSec, setBoostRemainingSec] = useState<number>(0);

  // Shop Owned / Equipped State
  const [ownedShopIds, setOwnedShopIds] = useState<string[]>(
    student?.ownedShopIds && student.ownedShopIds.length > 0
      ? student.ownedShopIds
      : ['frame-aurora-coral']
  );
  const [equippedFrame, setEquippedFrame] = useState<string>(
    student?.equippedFrame || 'frame-aurora-coral'
  );
  const [equippedBadge, setEquippedBadge] = useState<string>(
    student?.equippedBadge || 'HTML POYDEVOR'
  );
  const [shopCategoryFilter, setShopCategoryFilter] = useState<
    'all' | 'xp_boost' | 'study_tool' | 'frame' | 'avatar'
  >('all');
  const [shopNotice, setShopNotice] = useState<string | null>(null);

  const [allStudentsList, setAllStudentsList] = useState<Student[]>(() => {
    try {
      return getStudents();
    } catch {
      return [];
    }
  });

  const fallbackStudent: Student = {
    id: 'guest',
    name: 'Mehmon',
    surname: 'Talaba',
    username: 'mehmon_dev',
    avatar: MALE_PROGRAMMER_AVATAR,
    phone: '+998 90 000 00 00',
    email: 'mehmon@devmaster.uz',
    stage: 'html',
    xp: 0,
    rank: 1,
    coins: 5,
    teacherId: 'ai-teacher-temur',
    completedLessons: [],
    lastActive: 'Hozir',
    joinedDate: '2026-10-27',
    isOnline: true,
  };

  const [localProfileOverrides, setLocalProfileOverrides] = useState<Partial<Student>>({});
  const [legendProfileState, setLegendProfileState] = useState<Student>(() =>
    getLegendAdminStudentProfile()
  );

  // Reset local overrides when switching to a different student account
  useEffect(() => {
    setLocalProfileOverrides({});
    setLegendProfileState(getLegendAdminStudentProfile());
  }, [student?.id]);

  const baseStudent = student?.isGhostAdminStudent
    ? { ...legendProfileState, ...student, ...legendProfileState }
    : student || fallbackStudent;
  const currentStudent: Student = { ...baseStudent, ...localProfileOverrides };
  const isGhostAdmin = Boolean(currentStudent.isGhostAdminStudent);
  const certificates = getStudentCertificates(currentStudent.id);

  // Sync local form state when student changes
  useEffect(() => {
    setEditName(currentStudent.name || '');
    setEditSurname(currentStudent.surname || '');
    setEditUsername(currentStudent.username || '');
    setEditAge(currentStudent.age || 16);
    setEditBio(currentStudent.bio || '');
    setEditPhone(currentStudent.phone || '');
    setEditPassword(currentStudent.password || '');
    if (currentStudent.ownedShopIds?.length) setOwnedShopIds(currentStudent.ownedShopIds);
    if (currentStudent.equippedFrame) setEquippedFrame(currentStudent.equippedFrame);
    if (currentStudent.equippedBadge) setEquippedBadge(currentStudent.equippedBadge);
    setAllStudentsList(getStudents());
    setLegendProfileState(getLegendAdminStudentProfile());
  }, [
    student?.id,
    student?.name,
    student?.surname,
    student?.username,
    student?.xp,
    student?.coins,
    student?.equippedFrame,
    student?.equippedBadge,
  ]);

  // Listen to top menu navigation events so clicking Asosiy or Sahifalar resets to the Windows 10 hub
  useEffect(() => {
    const onTopNav = (e: Event) => {
      const tab = (e as CustomEvent<TopMenuTab>).detail;
      if (tab === 'asosiy') {
        setAsosiySubView('hub');
      } else if (tab === 'sahifalar') {
        setSahifalarSubView('hub');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('aurora-top-nav', onTopNav);
    return () => window.removeEventListener('aurora-top-nav', onTopNav);
  }, []);

  // Timed XP Boost Live Timer: Every 1 second while xpBoostUntil > Date.now(), add xpBoostRatePerSec XP!
  useEffect(() => {
    if (!currentStudent || currentStudent.id === 'guest' || isGhostAdmin) return;
    const checkBoost = () => {
      const until = currentStudent.xpBoostUntil || 0;
      const now = Date.now();
      if (until > now) {
        const secLeft = Math.ceil((until - now) / 1000);
        const rate = currentStudent.xpBoostRatePerSec || 2;
        setBoostRemainingSec(secLeft);
        addXpToStudent(currentStudent.id, rate);
        setAllStudentsList(getStudents());
        if (onRefreshData) onRefreshData();
      } else {
        setBoostRemainingSec(0);
      }
    };

    const interval = setInterval(checkBoost, 1000);
    return () => clearInterval(interval);
  }, [currentStudent.id, currentStudent.xpBoostUntil, currentStudent.xpBoostRatePerSec, isGhostAdmin]);

  // Gamified calculations
  const completedCount = currentStudent.completedLessons?.length || 0;
  const studentStreak = isGhostAdmin ? 999 : Math.max(1, completedCount + 1);

  const WEEK_DAYS = [
    { label: 'Du', active: true },
    { label: 'Se', active: isGhostAdmin || completedCount >= 1 },
    { label: 'Chor', active: isGhostAdmin || completedCount >= 2 },
    { label: 'Pay', active: isGhostAdmin || completedCount >= 3 },
    { label: 'Ju', active: isGhostAdmin || completedCount >= 4 },
    { label: 'Sha', active: isGhostAdmin || completedCount >= 5 },
    { label: 'Yak', active: isGhostAdmin || completedCount >= 6 },
  ];

  // The LEGEND Admin Student profile that always stands ABOVE 1st place on the Podium & Leaderboard
  const legendPodiumStudent: Student = isGhostAdmin
    ? {
        ...legendProfileState,
        ...currentStudent,
        equippedFrame: equippedFrame || currentStudent.equippedFrame || 'frame-diamond-prism',
        equippedBadge: equippedBadge || currentStudent.equippedBadge || 'LEGEND 💎',
        xp: 999999999,
        coins: 999999999,
        rank: 0,
        isGhostAdminStudent: true,
        isOnline: true,
      }
    : {
        ...legendProfileState,
        xp: 999999999,
        coins: 999999999,
        rank: 0,
        isGhostAdminStudent: true,
        isOnline: true,
      };

  // Sorted regular student leaderboard (#1, #2, #3, ...)
  const sortedLeaderboard: Student[] = (() => {
    const map = new Map<string, Student>();
    allStudentsList
      .filter((s) => !s.isGhostAdminStudent && s.id !== 'admin-ghost-student')
      .forEach((s) => map.set(s.id, s));
    if (
      currentStudent &&
      currentStudent.id &&
      currentStudent.id !== 'guest' &&
      !isGhostAdmin
    ) {
      map.set(currentStudent.id, currentStudent);
    }
    return Array.from(map.values()).sort((a, b) => (b.xp || 0) - (a.xp || 0));
  })();

  const handleSaveProfileChanges = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;
    const cleanName = editName.trim() || currentStudent.name;
    const cleanSurname = editSurname.trim() || currentStudent.surname;
    const cleanUsername = editUsername.trim().toLowerCase() || currentStudent.username;

    const updates: Partial<Student> = {
      name: cleanName,
      surname: cleanSurname,
      username: cleanUsername,
      age: Math.max(7, Math.min(99, Number(editAge) || 16)),
      bio: editBio.trim(),
      phone: editPhone.trim(),
      ...(editPassword.trim() ? { password: editPassword.trim() } : {}),
    };

    // Optimistically update local state immediately so UI reflects changes in 0ms
    setLocalProfileOverrides((prev) => ({ ...prev, ...updates }));

    if (isGhostAdmin) {
      const updatedLegend = saveLegendAdminStudentProfile(updates);
      setLegendProfileState(updatedLegend);
    } else if (currentStudent.id && currentStudent.id !== 'guest') {
      updateStudent(currentStudent.id, updates);
    }

    setAllStudentsList(getStudents());
    if (onRefreshData) onRefreshData();
    setProfileSaveMsg("Profil ma'lumotlari muvaffaqiyatli saqlandi!");
    try {
      confetti({ particleCount: 45, spread: 55, origin: { y: 0.6 } });
    } catch {}
    setTimeout(() => {
      setProfileSaveMsg(null);
      setShowEditProfileModal(false);
    }, 900);
  };

  const handleSaveCroppedAvatar = (dataUrl: string) => {
    if (!currentStudent) return;
    setLocalProfileOverrides((prev) => ({ ...prev, avatar: dataUrl }));

    if (isGhostAdmin) {
      const updatedLegend = saveLegendAdminStudentProfile({ avatar: dataUrl });
      setLegendProfileState(updatedLegend);
    } else if (currentStudent.id && currentStudent.id !== 'guest') {
      updateStudent(currentStudent.id, { avatar: dataUrl });
    }

    setAllStudentsList(getStudents());
    if (onRefreshData) onRefreshData();
    setShowPhotoCropperModal(false);
    try {
      confetti({ particleCount: 55, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const handleMarkAdminMessageRead = (msgId: string) => {
    if (!currentStudent) return;
    const updated = (currentStudent.adminMessages || []).map((m) =>
      m.id === msgId ? { ...m, read: true } : m
    );
    setLocalProfileOverrides((prev) => ({ ...prev, adminMessages: updated }));
    if (isGhostAdmin) {
      const updatedLegend = saveLegendAdminStudentProfile({ adminMessages: updated });
      setLegendProfileState(updatedLegend);
    } else if (currentStudent.id && currentStudent.id !== 'guest') {
      updateStudent(currentStudent.id, { adminMessages: updated });
    }
    if (onRefreshData) onRefreshData();
  };

  const handleBuyOrEquipShopItem = (item: ShopItem) => {
    const isRepeatable = item.category === 'xp_boost' || item.category === 'study_tool';
    const alreadyOwned = isGhostAdmin || ownedShopIds.includes(item.id);

    if (alreadyOwned && !isRepeatable) {
      if (item.category === 'frame') {
        setEquippedFrame(item.preview);
        setLocalProfileOverrides((prev) => ({ ...prev, equippedFrame: item.preview }));
        if (isGhostAdmin) {
          setLegendProfileState(saveLegendAdminStudentProfile({ equippedFrame: item.preview }));
        } else if (currentStudent.id && currentStudent.id !== 'guest') {
          updateStudent(currentStudent.id, { equippedFrame: item.preview });
        }
      } else if (item.category === 'avatar') {
        setEquippedBadge(item.preview);
        setLocalProfileOverrides((prev) => ({ ...prev, equippedBadge: item.preview }));
        if (isGhostAdmin) {
          setLegendProfileState(saveLegendAdminStudentProfile({ equippedBadge: item.preview }));
        } else if (currentStudent.id && currentStudent.id !== 'guest') {
          updateStudent(currentStudent.id, { equippedBadge: item.preview });
        }
      }
      if (onRefreshData) onRefreshData();
      setShopNotice(`"${item.title}" profilingizga taqildi!`);
      setTimeout(() => setShopNotice(null), 2500);
      return;
    }

    const currentCoins = isGhostAdmin ? 999999999 : currentStudent.coins ?? 0;
    if (!isGhostAdmin && currentCoins < item.price) {
      setShopNotice(
        `Tangalar yetarli emas! "${item.title}" uchun yana ${(item.price - currentCoins).toFixed(1)} 🪙 tanga kerak. Dars testlari yoki Ligada g'alaba qozonib tanga yig'ing!`
      );
      setTimeout(() => setShopNotice(null), 3500);
      return;
    }

    const updatedCoins = isGhostAdmin
      ? 999999999
      : Number((currentCoins - item.price).toFixed(2));
    let nextXp = currentStudent.xp || 0;
    let nextCompleted = [...(currentStudent.completedLessons || [])];
    let nextStage: CourseStage = currentStudent.stage;
    let nextPotionActive = Boolean(currentStudent.xpPotionActive);
    let nextMultiplier = currentStudent.xpMultiplier || (nextPotionActive ? 1.5 : 1);
    let nextBoostUntil = currentStudent.xpBoostUntil || 0;
    let nextBoostRate = currentStudent.xpBoostRatePerSec || 2;
    let nextPvpShield = currentStudent.pvpShieldCount || 0;
    let nextPvpDouble = currentStudent.pvpDoubleRewardCount || 0;
    let nextFreeAi = currentStudent.freeAiQuestionsCount || 0;
    let customMessage = `Tabriklaymiz! "${item.title}" xarid qilindi!`;

    const potionMap: Record<string, number> = {
      xp_potion_1_25x: 1.25,
      xp_potion_1_5x: 1.5,
      xp_potion_1_75x: 1.75,
      xp_potion_2_0x: 2.0,
      xp_potion_2_5x: 2.5,
      xp_potion_3_0x: 3.0,
    };

    const timedBoostMap: Record<string, { sec: number; rate: number }> = {
      xp_boost_30s_1xp: { sec: 30, rate: 1 },
      xp_boost_1_min_2xp: { sec: 60, rate: 2 },
      xp_boost_90s_3xp: { sec: 90, rate: 3 },
      xp_boost_2_min_4xp: { sec: 120, rate: 4 },
      xp_boost_3_min_5xp: { sec: 180, rate: 5 },
    };

    if (item.actionType && potionMap[item.actionType]) {
      const mult = potionMap[item.actionType];
      nextPotionActive = true;
      nextMultiplier = Math.max(nextMultiplier, mult);
      customMessage = `🧪 ${mult}x XP Damlamasi faollashdi! Endi har bir darsdan ${mult} baravar ko'p XP olasiz!`;
    } else if (item.actionType && timedBoostMap[item.actionType]) {
      const cfg = timedBoostMap[item.actionType];
      const baseTime = Math.max(Date.now(), nextBoostUntil);
      nextBoostUntil = baseTime + cfg.sec * 1000;
      nextBoostRate = cfg.rate;
      setBoostRemainingSec(Math.ceil((nextBoostUntil - Date.now()) / 1000));
      customMessage = `⚡ ${item.title} yoqildi! ${cfg.sec} soniya davomida har sekundda +${cfg.rate} XP qo'shilmoqda!`;
    } else if (item.actionType === 'pvp_shield_1') {
      nextPvpShield += 1;
      customMessage = `🛡️ PvP Liga Himoya Qalqoni (+1) qo'shildi! Jami qalqonlar: ${nextPvpShield} ta.`;
    } else if (item.actionType === 'pvp_double_win_1') {
      nextPvpDouble += 1;
      customMessage = `⚔️ PvP 2x G'alaba Tumori (+1) qo'shildi! Keyingi g'alabangiz +60 XP va +4 Tanga beradi!`;
    } else if (item.actionType === 'ai_free_pass_5') {
      nextFreeAi += 5;
      customMessage = `🤖 AI Ustoz uchun +5 ta bepul savol kvotasi qo'shildi! Jami bepul savollar: ${nextFreeAi} ta.`;
    } else if (item.actionType === 'xp_potion_double_charge') {
      nextPotionActive = true;
      nextMultiplier = Math.max(nextMultiplier, 2.0);
      nextPvpShield += 1;
      const baseTime = Math.max(Date.now(), nextBoostUntil);
      nextBoostUntil = baseTime + 60 * 1000;
      nextBoostRate = 2;
      setBoostRemainingSec(Math.ceil((nextBoostUntil - Date.now()) / 1000));
      customMessage = `💎 Ultra Kombo: 2.0x XP Potion + PvP Qalqon + 1-Min Boost (+2 XP/sek) bir vaqtda yoqildi!`;
    } else if (
      item.actionType === 'unlock_1_lesson' ||
      item.actionType === 'unlock_2_lessons' ||
      item.actionType === 'unlock_3_lessons' ||
      item.actionType === 'unlock_5_lessons' ||
      item.actionType === 'unlock_7_lessons' ||
      item.actionType === 'unlock_10_lessons'
    ) {
      const countMap: Record<string, number> = {
        unlock_1_lesson: 1,
        unlock_2_lessons: 2,
        unlock_3_lessons: 3,
        unlock_5_lessons: 5,
        unlock_7_lessons: 7,
        unlock_10_lessons: 10,
      };
      const countToUnlock = countMap[item.actionType] || 1;
      const stageLessons = LESSONS.filter((l) => l.stage === currentStudent.stage);
      const uncompleted = stageLessons.filter((l) => !nextCompleted.includes(l.id));
      const unlockedNow = uncompleted.slice(0, countToUnlock);
      unlockedNow.forEach((l) => {
        if (!nextCompleted.includes(l.id)) nextCompleted.push(l.id);
      });
      nextXp += unlockedNow.length * 10;
      customMessage =
        unlockedNow.length > 0
          ? `🔓 ${unlockedNow.length} ta dars darhol ochildi!`
          : `Joriy bosqichdagi barcha darslar allaqachon ochilgan!`;
    } else if (item.actionType && item.actionType.startsWith('stage_exam_')) {
      const stageMap: Record<string, CourseStage> = {
        stage_exam_html: 'html',
        stage_exam_css: 'css',
        stage_exam_js: 'javascript',
        stage_exam_ts: 'typescript',
        stage_exam_react: 'react',
        stage_exam_backend: 'backend',
        stage_exam_sql: 'database',
        stage_exam_fullstack: 'fullstack',
      };
      const examStage: CourseStage = stageMap[item.actionType] || 'html';
      const targetStage: CourseStage =
        examStage === 'html' ? 'css' : examStage === 'css' ? 'javascript' : 'graduated';
      const exam = createAiStageExam(
        currentStudent.id,
        `${currentStudent.name} ${currentStudent.surname}`,
        examStage,
        targetStage
      );
      customMessage = `🎯 ${examStage.toUpperCase()} imtihon ID yaratildi: ${exam.id}`;
      if (onOpenTestIdModal) {
        setTimeout(() => onOpenTestIdModal(exam.id), 400);
      }
    } else if (item.actionType === 'final_exam_access') {
      customMessage = `🎓 Final Diplom Imtihoni oynasi ochildi!`;
      if (onOpenFinalExamModal) {
        setTimeout(() => onOpenFinalExamModal(), 300);
      }
    } else if (item.actionType && item.actionType.startsWith('streak_shield_')) {
      customMessage = `🛡️ ${item.title} faollashtirildi!`;
    } else if (item.actionType === 'stage_upgrade_boost') {
      if (currentStudent.stage === 'html') nextStage = 'css';
      else if (currentStudent.stage === 'css') nextStage = 'javascript';
      else nextStage = 'graduated';
      customMessage = `🚀 Tabriklaymiz! Siz ${nextStage.toUpperCase()} bosqichiga o'tdingiz!`;
    }

    const nextOwned = alreadyOwned ? ownedShopIds : [...ownedShopIds, item.id];
    const nextEquippedFrame = item.category === 'frame' ? item.preview : equippedFrame;
    const nextEquippedBadge = item.category === 'avatar' ? item.preview : equippedBadge;

    if (!alreadyOwned) setOwnedShopIds(nextOwned);
    if (item.category === 'frame') setEquippedFrame(nextEquippedFrame);
    if (item.category === 'avatar') setEquippedBadge(nextEquippedBadge);

    const shopUpdates: Partial<Student> = {
      coins: updatedCoins,
      xp: nextXp,
      completedLessons: nextCompleted,
      stage: nextStage,
      xpPotionActive: nextPotionActive,
      xpMultiplier: nextMultiplier,
      xpBoostUntil: nextBoostUntil,
      xpBoostRatePerSec: nextBoostRate,
      pvpShieldCount: nextPvpShield,
      pvpDoubleRewardCount: nextPvpDouble,
      freeAiQuestionsCount: nextFreeAi,
      ownedShopIds: nextOwned,
      equippedFrame: nextEquippedFrame,
      equippedBadge: nextEquippedBadge,
    };

    setLocalProfileOverrides((prev) => ({ ...prev, ...shopUpdates }));

    if (isGhostAdmin) {
      setLegendProfileState(
        saveLegendAdminStudentProfile({
          equippedFrame: nextEquippedFrame,
          equippedBadge: nextEquippedBadge,
          ownedShopIds: nextOwned,
        })
      );
      if (onRefreshData) onRefreshData();
    } else if (currentStudent.id && currentStudent.id !== 'guest') {
      updateStudent(currentStudent.id, shopUpdates);
      setAllStudentsList(getStudents());
      if (onRefreshData) onRefreshData();
    }

    setShopNotice(customMessage);
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffd23f', '#ff6b86', '#3ee6c4'],
      });
    } catch {}
    setTimeout(() => setShopNotice(null), 3500);
  };

  const STAGE_ORDER: CourseStage[] = [
    'html',
    'css',
    'javascript',
    'typescript',
    'react',
    'backend',
    'database',
    'fullstack',
    'graduated',
  ];

  const STAGE_NAMES: Record<CourseStage, string> = {
    html: '1-Bosqich: HTML5 va Veb Poydevori',
    css: '2-Bosqich: CSS3 va Zamonaviy Uslublar',
    javascript: '3-Bosqich: JavaScript ES6+ va DOM',
    typescript: '4-Bosqich: TypeScript va Tipizatsiya',
    react: '5-Bosqich: React va Komponentlar',
    backend: '6-Bosqich: Node.js va Backend Server',
    database: "7-Bosqich: Ma'lumotlar Bazasi va SQL",
    fullstack: '8-Bosqich: Full-Stack va DevOps',
    graduated: 'Akademiya Bitiruvchisi',
  };

  const STAGE_COLORS: Record<string, { gradient: string; accent: string }> = {
    html: { gradient: 'from-[#ff6b86] to-[#ff8a3d]', accent: '#ff6b86' },
    css: { gradient: 'from-[#3ee6c4] to-[#b6f03c]', accent: '#3ee6c4' },
    javascript: { gradient: 'from-[#ffd23f] to-[#ff8a3d]', accent: '#ffd23f' },
    typescript: { gradient: 'from-[#ff8a3d] to-[#ff6b86]', accent: '#ff8a3d' },
    react: { gradient: 'from-[#3ee6c4] to-[#ffd23f]', accent: '#3ee6c4' },
    backend: { gradient: 'from-[#b6f03c] to-[#3ee6c4]', accent: '#b6f03c' },
    database: { gradient: 'from-[#ff6b86] to-[#ffd23f]', accent: '#ff6b86' },
    fullstack: { gradient: 'from-[#ffd23f] to-[#b6f03c]', accent: '#ffd23f' },
  };

  const NEXT_STAGE_MAP: Record<CourseStage, CourseStage> = {
    html: 'css',
    css: 'javascript',
    javascript: 'typescript',
    typescript: 'react',
    react: 'backend',
    backend: 'database',
    database: 'fullstack',
    fullstack: 'graduated',
    graduated: 'graduated',
  };

  const isStageUnlocked = (stage: CourseStage) => {
    const studentStageIdx = STAGE_ORDER.indexOf(currentStudent.stage);
    const targetStageIdx = STAGE_ORDER.indexOf(stage);
    return targetStageIdx <= studentStageIdx;
  };

  const currentStageLessons = LESSONS.filter((l) => l.stage === currentStudent.stage);
  const completedStageLessons = currentStageLessons.filter((l) =>
    currentStudent.completedLessons.includes(l.id)
  );
  const isStageFullyCompleted =
    currentStageLessons.length > 0 &&
    completedStageLessons.length === currentStageLessons.length;
  const nextStage = NEXT_STAGE_MAP[currentStudent.stage];
  const canTakeAiStageExam = isStageFullyCompleted && nextStage !== currentStudent.stage;

  const handleStartAiStageExam = () => {
    if (!canTakeAiStageExam) return;
    const exam = createAiStageExam(
      currentStudent.id,
      currentStudent.name,
      currentStudent.stage,
      nextStage
    );
    if (onOpenTestIdModal) {
      onOpenTestIdModal(exam.id);
    }
  };

  const tracks = [
    { id: 'all', name: 'Barcha Bosqichlar', count: 250, icon: Layers },
    { id: 'html', name: 'HTML5', count: 35, icon: FileCode },
    { id: 'css', name: 'CSS3', count: 40, icon: Laptop },
    { id: 'javascript', name: 'JavaScript', count: 50, icon: Zap },
    { id: 'typescript', name: 'TypeScript', count: 30, icon: Code2 },
    { id: 'react', name: 'React', count: 30, icon: Sparkles },
    { id: 'backend', name: 'Backend', count: 30, icon: Server },
    { id: 'database', name: 'SQL & DB', count: 20, icon: Database },
    { id: 'fullstack', name: 'Full-Stack', count: 15, icon: ShieldCheck },
  ];

  const filteredLessons = LESSONS.filter((l) => {
    const matchTrack = selectedTrack === 'all' || l.stage === selectedTrack;
    const matchSearch =
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTrack && matchSearch;
  });

  const zigZagStages: CourseStage[] =
    selectedTrack === 'all'
      ? ['html', 'css', 'javascript', 'typescript', 'react', 'backend', 'database', 'fullstack']
      : [selectedTrack as CourseStage];

  const handleOpenLesson = (lesson: Lesson) => {
    if (!isStageUnlocked(lesson.stage)) {
      setStageLockAlert(
        `"${STAGE_NAMES[lesson.stage]}" bosqichi hozircha qulflangan!\n\n` +
          `Siz hozirda "${STAGE_NAMES[currentStudent.stage]}" bosqichidasiz. Avval joriy bosqich darslarini tugatib, Bosqich Imtihonidan o'ting.`
      );
      return;
    }
    setActiveLesson(lesson);
    setUserCode(lesson.starterCode);
    setConsoleOutput([]);
    setLessonMode('textbook');
  };

  const handleRunCode = () => {
    if (!activeLesson) return;
    setIsCodeRunning(true);
    setConsoleOutput([]);

    setTimeout(() => {
      try {
        const logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            logs.push(
              args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ')
            );
          },
          error: (...args: any[]) => {
            logs.push('Xatolik: ' + args.join(' '));
          },
        };

        const fn = new Function('console', userCode);
        fn(customConsole);

        if (logs.length === 0) {
          logs.push('Kod muvaffaqiyatli bajarildi.');
        }
        setConsoleOutput(logs);
      } catch (err: any) {
        setConsoleOutput([`Kod bajarilishida xatolik: ${err.message}`]);
      } finally {
        setIsCodeRunning(false);
      }
    }, 180);
  };

  // Reward preview per lesson (8-12 XP reduced economy, multiplied if potion is active)
  const getLessonXpDisplay = () =>
    Math.round(10 * (currentStudent.xpMultiplier || (currentStudent.xpPotionActive ? 1.5 : 1)));

  return (
    <div className="space-y-6 pb-14 relative">
      {/* Focus Mode Background Dimmer Overlay */}
      {isFocusMode && (
        <div
          onClick={() => setIsFocusMode(false)}
          className="fixed inset-0 z-40 bg-[#05040a]/90 backdrop-blur-lg transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* ADMIN "O'QUVCHI SIFATIDA KIRISH" GHOST #1 BANNER (Only visible on Admin's screen!) */}
      {isGhostAdmin && (
        <div className="aurora-card p-4 border-2 border-[#ffd23f] bg-gradient-to-r from-[#ffd23f]/15 via-[#ff6b86]/15 to-[#3ee6c4]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_0_30px_rgba(255,210,63,0.22)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ffd23f] text-[#0a0912] flex items-center justify-center shrink-0 shadow">
              <Crown className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-sm font-black text-[#ffd23f]">
                  👑 Admin &quot;O&apos;quvchi Sifatida Kirish&quot; Rejimi Faol
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#3ee6c4]/20 text-[#3ee6c4] font-mono text-[10px] font-extrabold">
                  Podium #1 · ∞ XP · ∞ Tanga
                </span>
              </div>
              <p className="text-xs opacity-80">
                Siz doim Podiumda 1-o&apos;rinda turasiz va cheksiz XP/Tangaga egasiz. Bu profil faqat sizning ekraningizda ko&apos;rinadi, boshqa o&apos;quvchilarga ko&apos;rinmaydi!
              </p>
            </div>
          </div>

          {onExitGhostStudentMode && (
            <button
              type="button"
              onClick={onExitGhostStudentMode}
              className="duo-btn duo-btn-gold !py-2.5 !px-5 text-xs shrink-0 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Admin Panelga Qaytish</span>
            </button>
          )}
        </div>
      )}

      {/* Active Timed XP Boost Live Banner */}
      {boostRemainingSec > 0 && (
        <div className="aurora-card p-3.5 border-2 border-[#b6f03c] bg-[#b6f03c]/15 flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#b6f03c]">
            <Timer className="w-5 h-5 shrink-0" />
            <span>
              ⚡ Vaqtli XP Boost Faol: Har sekundda{' '}
              <strong>+{currentStudent.xpBoostRatePerSec || 2} XP</strong> qo&apos;shilmoqda!
            </span>
          </div>
          <span className="px-3 py-1 rounded-xl bg-[#0a0912] text-[#ffd23f] font-mono text-xs font-extrabold">
            {boostRemainingSec} soniya qoldi
          </span>
        </div>
      )}

      {/* =====================================================================
          TOP MENU 1: PROFIL (Instagram/Telegram dumaloq rasm, qalamcha, fotoapparat,
          kunlik streak va admin xabarlari)
         ===================================================================== */}
      {topTab === 'profil' && (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Instagram / Telegram Style Circular Profile Header Card */}
          <div className="aurora-card p-6 sm:p-9 relative overflow-hidden">
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Circular Avatar with Ornate Frame, Online/Offline Dot & Stage/Legend Sticker */}
              <div className="relative">
                <AvatarWithFrame
                  src={currentStudent.avatar || MALE_PROGRAMMER_AVATAR}
                  alt={currentStudent.name}
                  size={128}
                  frameId={equippedFrame}
                  stage={currentStudent.stage}
                  equippedBadge={equippedBadge}
                  isOnline={currentStudent.isOnline !== false}
                  showOnlineDot={true}
                  showStageSticker={true}
                />
              </div>

              {/* Name, Username, Online Status & Action Buttons (Qalamcha + Fotoapparat) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
                    {currentStudent.name} {currentStudent.surname}
                  </h1>
                  {(currentStudent.xpPotionActive || (currentStudent.xpMultiplier && currentStudent.xpMultiplier > 1)) && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#b6f03c]/20 border border-[#b6f03c]/50 text-[#b6f03c] font-mono text-[11px] font-bold">
                      🧪 {currentStudent.xpMultiplier || 1.5}x XP Potion Faol
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-center gap-3 text-xs font-mono">
                  <span className="text-[#3ee6c4] font-bold">@{currentStudent.username}</span>
                  <span>·</span>
                  <span
                    className={`flex items-center gap-1 font-bold ${
                      currentStudent.isOnline !== false ? 'text-[#22c55e]' : 'text-[#ef4444]'
                    }`}
                  >
                    {currentStudent.isOnline !== false ? (
                      <>
                        <Wifi className="w-3.5 h-3.5" />
                        <span>online</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="w-3.5 h-3.5" />
                        <span>offline</span>
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/75 max-w-md mx-auto pt-1">
                  {currentStudent.bio ||
                    `DevMaster Academy ${currentStudent.stage.toUpperCase()} bosqichi dasturchisi.`}
                </p>
              </div>

              {/* Qalamcha (Edit Info) va Fotoapparat (Camera/Upload Circular Crop) Buttons */}
              <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setEditName(currentStudent.name || '');
                    setEditSurname(currentStudent.surname || '');
                    setEditUsername(currentStudent.username || '');
                    setEditAge(currentStudent.age || 16);
                    setEditBio(currentStudent.bio || '');
                    setEditPhone(currentStudent.phone || '');
                    setEditPassword(currentStudent.password || '');
                    setProfileSaveMsg(null);
                    setShowEditProfileModal(true);
                  }}
                  className="duo-btn duo-btn-mint !py-2.5 !px-5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Pencil className="w-4 h-4" />
                  <span>Ma&apos;lumotlarni Tahrirlash</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPhotoCropperModal(true)}
                  className="duo-btn duo-btn-coral !py-2.5 !px-5 text-xs sm:text-sm flex items-center gap-2"
                  title="Kamera yoki fayl orqali dumaloq rasm o'rnatish"
                >
                  <Camera className="w-4 h-4" />
                  <span>Rasmni O&apos;zgartirish</span>
                </button>
              </div>

              {/* Profile Details Summary Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-4 border-t border-white/10 text-left">
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[11px] opacity-65 block">Yoshi</span>
                  <strong className="font-mono text-sm sm:text-base text-white">
                    {currentStudent.age || 16} yosh
                  </strong>
                </div>
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[11px] opacity-65 block">Joriy Bosqich</span>
                  <strong className="font-mono text-sm sm:text-base text-[#ff8a3d] uppercase">
                    {currentStudent.stage}
                  </strong>
                </div>
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[11px] opacity-65 block">Tajriba Balli</span>
                  <strong className="font-mono text-sm sm:text-base text-[#3ee6c4]">
                    ⚡ {isGhostAdmin ? '∞ XP' : `${currentStudent.xp || 0} XP`}
                  </strong>
                </div>
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[11px] opacity-65 block">Tangalar Hisobi</span>
                  <strong className="font-mono text-sm sm:text-base text-[#ffd23f]">
                    🪙 {isGhostAdmin ? '∞ Cheksiz' : Number(currentStudent.coins || 0).toFixed(1)}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Below Profile: Kunlik Streak (Kunlik Staxlar) & Admin Xabarlari */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Kunlik Streak Card */}
            <div className="aurora-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff8a3d]/20 text-[#ff8a3d] flex items-center justify-center">
                    <Flame className="w-7 h-7 fill-[#ff8a3d]" />
                  </div>
                  <div>
                    <span className="font-display font-mono text-2xl font-bold text-[#ff8a3d] block leading-none">
                      {isGhostAdmin ? '∞' : studentStreak} kunlik streak
                    </span>
                    <span className="text-xs opacity-75">Ketma-ket faol o&apos;quv kunlari</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 pt-1 text-center">
                {WEEK_DAYS.map((d) => (
                  <div key={d.label} className="space-y-1">
                    <span className="text-[10px] font-bold opacity-70 block">{d.label}</span>
                    <div
                      className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                        d.active
                          ? 'bg-gradient-to-b from-[#ff8a3d] to-[#ff6b86] text-[#0a0912] shadow'
                          : 'aurora-surface-2 opacity-50'
                      }`}
                    >
                      {d.active ? '🔥' : '·'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="aurora-surface-2 p-3.5 rounded-2xl text-xs leading-relaxed">
                <strong className="text-[#ffd23f]">Diqqat:</strong> Agar 1 kunlik streakni o&apos;tkazib
                yuborsangiz, Admin sizga ogohlantirish xabarini yuboradi va u o&apos;ng tarafdagi
                xabarlar qutisida ko&apos;rinadi!
              </div>
            </div>

            {/* 2. Admin Xabarlari va Streak Ogohlantirishlari */}
            <div className="aurora-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold">
                      Admin Xabarlari va Streak Ogohlantirishlari
                    </h3>
                    <p className="text-[11px] opacity-70">
                      Admindan kelgan eslatma va bildirishnomalar
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/10 font-mono text-xs font-bold">
                  {(currentStudent.adminMessages || []).length} ta
                </span>
              </div>

              {!currentStudent.adminMessages || currentStudent.adminMessages.length === 0 ? (
                <div className="aurora-surface-2 rounded-2xl p-5 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#3ee6c4] mx-auto opacity-80" />
                  <p className="text-xs font-bold">Hozircha ogohlantirish xabarlari yo&apos;q!</p>
                  <p className="text-[11px] opacity-65">
                    Kunlik streakni uzmasdan darslarni davom ettiring.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                  {currentStudent.adminMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        msg.type === 'streak_warning'
                          ? 'bg-[#ff6b86]/15 border-[#ff6b86]/40'
                          : 'aurora-surface-2 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-extrabold text-[#ffd23f]">
                          {msg.title}
                        </span>
                        <span className="text-[10px] font-mono opacity-65">{msg.createdAt}</span>
                      </div>
                      <p className="text-xs opacity-90 leading-relaxed">{msg.text}</p>
                      {!msg.read && (
                        <div className="mt-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => handleMarkAdminMessageRead(msg.id)}
                            className="px-2.5 py-1 rounded-lg bg-[#3ee6c4]/20 text-[#3ee6c4] text-[10px] font-bold cursor-pointer"
                          >
                            O&apos;qildi deb belgilash
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Certificates Box inside Profile */}
          <div className="aurora-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-lg font-bold">
                Rasmiy PDF Sertifikatlar ({certificates.length} ta)
              </h3>
              <p className="text-xs opacity-75">
                Bosqichlarni va Final imtihonini yakunlab QR-kodli sertifikatni yuklab oling
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {certificates.map((cert) => (
                <button
                  key={cert.id}
                  type="button"
                  onClick={() => setViewingCertificate(cert)}
                  className="duo-btn duo-btn-gold text-xs"
                >
                  <Award className="w-4 h-4" />
                  <span>{cert.title}</span>
                </button>
              ))}
              {onOpenFinalExamModal && (
                <button
                  type="button"
                  onClick={onOpenFinalExamModal}
                  className="duo-btn duo-btn-coral text-xs"
                >
                  <Award className="w-4 h-4" />
                  <span>Final Imtihon</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TOP MENU 2: ASOSIY (Windows 10 Settings uslubidagi toza bo'limlar markazi)
         ===================================================================== */}
      {topTab === 'asosiy' && (
        <div className="space-y-6">
          {/* WINDOWS 10 SETTINGS HUB GRID */}
          {asosiySubView === 'hub' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="text-center sm:text-left space-y-1 px-1">
                <span className="text-xs font-mono font-bold text-[#3ee6c4] uppercase tracking-wider">
                  ASOSIY BO&apos;LIMLAR MARKAZI
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-black">
                  Kerakli bo&apos;limni tanlang
                </h1>
                <p className="text-xs sm:text-sm opacity-75">
                  Windows 10 sozlamalari kabi tartibli va sodda boshqaruv oynasi
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Dashboard (Liga & Podium) */}
                <button
                  type="button"
                  onClick={() => setAsosiySubView('dashboard')}
                  className="aurora-card p-6 text-left flex items-start gap-4 hover:border-[#ffd23f] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ffd23f]/15 text-[#ffd23f] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#ffd23f] transition-colors">
                      Dashboard (Liga &amp; Podium)
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Top-3 Podium, umumiy reyting, online/offline holat va o&apos;quvchilar profilini ko&apos;rish
                    </p>
                  </div>
                </button>

                {/* 2. Liga (PvP & With AI — 30 savol, 15s) */}
                <button
                  type="button"
                  onClick={() => setAsosiySubView('liga_battle')}
                  className="aurora-card p-6 text-left flex items-start gap-4 hover:border-[#ff6b86] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b86]/15 text-[#ff6b86] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Swords className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#ff6b86] transition-colors">
                      Liga (PvP &amp; With AI)
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Bosqichdosh raqib yoki AI bilan 30 ta savol bellashuvi (15s vaqt, +30 XP / +2 Coin)
                    </p>
                  </div>
                </button>

                {/* 3. Kod Yozish Muhiti (Live HTML/CSS/JS IDE) */}
                <button
                  type="button"
                  onClick={() => setAsosiySubView('code_ide')}
                  className="aurora-card p-6 text-left flex items-start gap-4 border-2 border-[#3ee6c4]/50 hover:border-[#3ee6c4] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#3ee6c4] transition-colors">
                      Kod Yozish Muhiti (Live IDE)
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      HTML5, CSS3 va JavaScript kodlarini jonli brauzer oynasida yozish va CMDbek AI bilan tekshirish
                    </p>
                  </div>
                </button>

                {/* 4. Tangalar Do'koni (100 ta mahsulot) */}
                <button
                  type="button"
                  onClick={() => setAsosiySubView('shop')}
                  className="aurora-card p-6 text-left flex items-start gap-4 hover:border-[#3ee6c4] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/15 text-[#3ee6c4] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#3ee6c4] transition-colors">
                      Tangalar Do&apos;koni (100 ta)
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      100 ta noyob mahsulot: 1.25x–3.0x XP Damlamalar, Vaqtli Reaktorlar, 30 Ramka va 35 Stiker
                    </p>
                  </div>
                </button>

                {/* 5. O'yinlar (0 XP, 0 Coin) */}
                <button
                  type="button"
                  onClick={() => setAsosiySubView('games')}
                  className="aurora-card p-6 text-left flex items-start gap-4 hover:border-[#b6f03c] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#b6f03c]/15 text-[#b6f03c] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#b6f03c] transition-colors">
                      O&apos;yinlar &amp; Mashq Arenasi
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Dam olish va kod mashqi uchun o&apos;yinlar (Reyting buzilmasligi uchun 0 XP va 0 Tanga)
                    </p>
                  </div>
                </button>

                {/* 6. Test ID Imtihon */}
                <button
                  type="button"
                  onClick={() => onOpenTestIdModal && onOpenTestIdModal()}
                  className="aurora-card p-6 text-left flex items-start gap-4 hover:border-[#ff8a3d] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ff8a3d]/15 text-[#ff8a3d] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#ff8a3d] transition-colors">
                      Test ID Imtihon
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Ustoz yoki AI bergan maxsus bir martalik Test ID orqali bosqich imtihoni topshirish
                    </p>
                  </div>
                </button>

                {/* 7. Guruh Chati */}
                <button
                  type="button"
                  onClick={() => onOpenGroupChat && onOpenGroupChat(teacher?.id || 't-1')}
                  className="aurora-card p-6 text-left flex items-start gap-4 hover:border-[#3ee6c4] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/15 text-[#3ee6c4] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#3ee6c4] transition-colors">
                      Guruh Chati
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Ustoz va guruhdagi tengdoshlar bilan jonli muloqot va savol-javob
                    </p>
                  </div>
                </button>

                {/* 8. CMDbek & Gemini AI Ustoz & Ovozli Suhbat */}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event('open-cmdbek-ai'))}
                  className="aurora-card p-6 text-left flex items-start gap-4 border-2 border-[#ffd23f]/50 hover:border-[#ffd23f] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display text-base font-bold group-hover:text-[#ffd23f] transition-colors">
                      CMDbek &amp; Gemini AI Ustoz (Ovozli &amp; Hazilkash)
                    </h3>
                    <p className="text-xs opacity-70 leading-relaxed">
                      Google Gemini asosida xohlagan savolga javob beruvchi, hazil qiluvchi va o&apos;g&apos;il bola ovozida gapiruvchi AI ustoz
                    </p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Back Button when inside an Asosiy sub-view */}
          {asosiySubView !== 'hub' && (
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setAsosiySubView('hub')}
                className="duo-btn duo-btn-surface !py-2 !px-4 text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Asosiy Bo&apos;limlarga Qaytish</span>
              </button>
            </div>
          )}

          {/* SUB-VIEW 1: DASHBOARD (LIGA & PODIUM WITH CLICKABLE AVATARS & ONLINE DOT) */}
          {asosiySubView === 'dashboard' && (
            <div className="aurora-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-[#ffd23f]">
                    DASHBOARD · LIGA VA PODIUM
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
                    Top-3 Haftalik Podium va Reyting
                  </h2>
                  <p className="text-xs opacity-75 mt-1">
                    Istalgan o&apos;quvchining profil rasmiga bossangiz, uning to&apos;liq profili ochiladi!
                  </p>
                </div>
              </div>

              {/* 👑 LEGEND · MUTLAQ CHO'QQI (1-O'RINDAN HAM TEPADA — HECH KIM O'TA OLMAYDI) */}
              <div className="pt-2">
                <div className="max-w-xl mx-auto relative rounded-3xl p-6 text-center space-y-3 border-2 border-[#3ee6c4] bg-gradient-to-b from-[#3ee6c4]/15 via-[#181529] to-[#ffd23f]/15 shadow-[0_0_45px_rgba(62,230,196,0.3)] flex flex-col items-center">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#ffd23f] via-[#3ee6c4] to-[#ff6b86] text-[#0a0912] font-mono text-xs font-black tracking-wider shadow-lg">
                    <Crown className="w-4 h-4 fill-current" />
                    <span>👑 LEGEND · 1-O&apos;RINDAN HAM TEPADA (HECH KIM O&apos;TA OLMAYDI)</span>
                  </div>

                  <AvatarWithFrame
                    src={legendPodiumStudent.avatar || MALE_PROGRAMMER_AVATAR}
                    alt={legendPodiumStudent.name}
                    size={96}
                    frameId={legendPodiumStudent.equippedFrame || 'frame-diamond-prism'}
                    stage={legendPodiumStudent.stage}
                    equippedBadge={legendPodiumStudent.equippedBadge || 'LEGEND 💎'}
                    isOnline={true}
                    onClick={() => setInspectingStudent(legendPodiumStudent)}
                  />

                  <div>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <h3
                        onClick={() => setInspectingStudent(legendPodiumStudent)}
                        className="font-display text-xl font-black text-white hover:text-[#3ee6c4] transition-colors cursor-pointer"
                      >
                        {legendPodiumStudent.name} {legendPodiumStudent.surname}
                      </h3>
                      <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#3ee6c4] text-[#0a0912]">
                        MUTLAQ LEGEND 💎
                      </span>
                      {isGhostAdmin && (
                        <span className="text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full bg-[#ff6b86] text-[#0a0912]">
                          SIZ (ADMIN O&apos;QUVCHI)
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-[#3ee6c4] mt-0.5">
                      @{legendPodiumStudent.username} · {legendPodiumStudent.stage.toUpperCase()}
                    </p>
                    <p className="text-[11px] opacity-80 max-w-md mx-auto mt-1">
                      {legendPodiumStudent.bio ||
                        "DevMaster Academy Mutlaq Legend O'quvchisi — Podium cho'qqisida (Hech kim o'ta olmaydi)"}
                    </p>
                  </div>

                  <div className="w-full max-w-md py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#ffd23f]/25 via-[#3ee6c4]/25 to-[#ff6b86]/25 border border-[#ffd23f]/50 text-[#ffd23f] font-mono text-sm sm:text-base font-black flex items-center justify-center gap-4">
                    <span>⚡ ∞ CHEKSIZ XP</span>
                    <span>·</span>
                    <span className="text-[#3ee6c4]">🪙 ∞ CHEKSIZ TANGA</span>
                  </div>
                </div>
              </div>

              {/* Top-3 Podium Cards (#2, #1, #3 below LEGEND) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
                {/* 2nd Place */}
                {sortedLeaderboard[1] && (
                  <div className="aurora-surface-2 rounded-3xl p-5 text-center space-y-3 order-2 md:order-1 flex flex-col items-center">
                    <span className="px-3 py-0.5 rounded-full bg-[#3ee6c4]/20 text-[#3ee6c4] font-mono text-xs font-black">
                      #2 O&apos;RIN
                    </span>
                    <AvatarWithFrame
                      src={sortedLeaderboard[1].avatar || MALE_PROGRAMMER_AVATAR}
                      alt={sortedLeaderboard[1].name}
                      size={74}
                      frameId={sortedLeaderboard[1].equippedFrame}
                      stage={sortedLeaderboard[1].stage}
                      equippedBadge={sortedLeaderboard[1].equippedBadge}
                      isOnline={sortedLeaderboard[1].isOnline !== false}
                      onClick={() => setInspectingStudent(sortedLeaderboard[1])}
                    />
                    <div>
                      <h3 className="font-display text-base font-bold">
                        {sortedLeaderboard[1].name} {sortedLeaderboard[1].surname}
                      </h3>
                      <p className="text-xs font-mono text-[#3ee6c4]">
                        @{sortedLeaderboard[1].username}
                      </p>
                    </div>
                    <div className="w-full py-2 rounded-2xl aurora-card font-mono text-sm font-bold text-[#ffd23f]">
                      ⚡ {sortedLeaderboard[1].xp} XP
                    </div>
                  </div>
                )}

                {/* 1st Place with Golden Crown */}
                {sortedLeaderboard[0] && (
                  <div className="aurora-card p-6 text-center space-y-3 border-2 border-[#ffd23f] shadow-[0_0_35px_rgba(255,210,63,0.28)] order-1 md:order-2 md:-translate-y-3 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] flex items-center justify-center mx-auto shadow-lg">
                      <Crown className="w-6 h-6 fill-current" />
                    </div>
                    <AvatarWithFrame
                      src={sortedLeaderboard[0].avatar || MALE_PROGRAMMER_AVATAR}
                      alt={sortedLeaderboard[0].name}
                      size={88}
                      frameId={sortedLeaderboard[0].equippedFrame || 'frame-gold-crown'}
                      stage={sortedLeaderboard[0].stage}
                      equippedBadge={sortedLeaderboard[0].equippedBadge}
                      isOnline={sortedLeaderboard[0].isOnline !== false}
                      onClick={() => setInspectingStudent(sortedLeaderboard[0])}
                    />
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-[#ffd23f] block">
                        1-O&apos;RIN · LIGA CHEMPIONI
                      </span>
                      <h3 className="font-display text-lg font-bold">
                        {sortedLeaderboard[0].name} {sortedLeaderboard[0].surname}
                      </h3>
                      <p className="text-xs font-mono text-[#ff8a3d]">
                        @{sortedLeaderboard[0].username}
                      </p>
                    </div>
                    <div className="w-full py-2.5 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] font-mono text-base font-extrabold">
                      ⚡ {sortedLeaderboard[0].xp} XP
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {sortedLeaderboard[2] && (
                  <div className="aurora-surface-2 rounded-3xl p-5 text-center space-y-3 order-3 flex flex-col items-center">
                    <span className="px-3 py-0.5 rounded-full bg-[#ff8a3d]/20 text-[#ff8a3d] font-mono text-xs font-black">
                      #3 O&apos;RIN
                    </span>
                    <AvatarWithFrame
                      src={sortedLeaderboard[2].avatar || MALE_PROGRAMMER_AVATAR}
                      alt={sortedLeaderboard[2].name}
                      size={74}
                      frameId={sortedLeaderboard[2].equippedFrame}
                      stage={sortedLeaderboard[2].stage}
                      equippedBadge={sortedLeaderboard[2].equippedBadge}
                      isOnline={sortedLeaderboard[2].isOnline !== false}
                      onClick={() => setInspectingStudent(sortedLeaderboard[2])}
                    />
                    <div>
                      <h3 className="font-display text-base font-bold">
                        {sortedLeaderboard[2].name} {sortedLeaderboard[2].surname}
                      </h3>
                      <p className="text-xs font-mono text-[#ff8a3d]">
                        @{sortedLeaderboard[2].username}
                      </p>
                    </div>
                    <div className="w-full py-2 rounded-2xl aurora-card font-mono text-sm font-bold text-[#ffd23f]">
                      ⚡ {sortedLeaderboard[2].xp} XP
                    </div>
                  </div>
                )}
              </div>

              {/* Full Ranked List with LEGEND at the very top above #1 */}
              <div className="space-y-2.5 pt-4">
                {/* 👑 LEGEND ROW (Above #1 — Nobody can pass) */}
                <div className="p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-4 border-2 border-[#3ee6c4] bg-gradient-to-r from-[#3ee6c4]/15 via-[#181529] to-[#ffd23f]/15 shadow-[0_0_25px_rgba(62,230,196,0.2)]">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-[#ffd23f] to-[#3ee6c4] text-[#0a0912] font-mono text-[10px] font-black shrink-0">
                      👑 LEGEND
                    </span>

                    <AvatarWithFrame
                      src={legendPodiumStudent.avatar || MALE_PROGRAMMER_AVATAR}
                      alt={legendPodiumStudent.name}
                      size={48}
                      frameId={legendPodiumStudent.equippedFrame || 'frame-diamond-prism'}
                      stage={legendPodiumStudent.stage}
                      equippedBadge={legendPodiumStudent.equippedBadge || 'LEGEND 💎'}
                      isOnline={true}
                      showOnlineDot={true}
                      showStageSticker={true}
                      onClick={() => setInspectingStudent(legendPodiumStudent)}
                    />

                    <div
                      className="min-w-0 cursor-pointer"
                      onClick={() => setInspectingStudent(legendPodiumStudent)}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-sm truncate text-[#ffd23f] hover:text-[#3ee6c4] transition-colors">
                          {legendPodiumStudent.name} {legendPodiumStudent.surname}
                        </span>
                        <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#3ee6c4] text-[#0a0912]">
                          1-O&apos;RINDAN HAM TEPADA · HECH KIM O&apos;TA OLMAYDI
                        </span>
                        {isGhostAdmin && (
                          <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#ff6b86] text-[#0a0912]">
                            SIZ
                          </span>
                        )}
                      </div>
                      <span className="text-xs opacity-75 font-mono block">
                        @{legendPodiumStudent.username} · {legendPodiumStudent.stage.toUpperCase()} ·{' '}
                        <span className="text-[#22c55e]">online</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 font-mono">
                    <span className="text-sm font-black text-[#3ee6c4] block tabular-nums">
                      ∞ XP
                    </span>
                    <span className="text-[11px] text-[#ffd23f] font-bold tabular-nums">
                      ∞ tanga
                    </span>
                  </div>
                </div>

                {sortedLeaderboard.map((st, idx) => {
                  const isMe =
                    !isGhostAdmin &&
                    (st.id === currentStudent.id || st.username === currentStudent.username);
                  const isRising = idx % 2 === 0;

                  return (
                    <div
                      key={st.id || idx}
                      className={`p-3.5 sm:p-4 rounded-2xl flex items-center justify-between gap-4 transition-all ${
                        isMe
                          ? 'aurora-card border-2 border-[#ff6b86] bg-[#ff6b86]/10'
                          : 'aurora-surface-2 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <span className="font-mono text-sm font-bold w-6 text-center shrink-0">
                          #{idx + 1}
                        </span>
                        {isRising ? (
                          <ArrowUp className="w-4 h-4 text-[#b6f03c] shrink-0 hidden sm:block" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-[#ff6b86] shrink-0 hidden sm:block" />
                        )}

                        {/* Clickable Avatar opening StudentPublicProfileModal */}
                        <AvatarWithFrame
                          src={st.avatar || MALE_PROGRAMMER_AVATAR}
                          alt={st.name}
                          size={48}
                          frameId={st.equippedFrame}
                          stage={st.stage}
                          equippedBadge={st.equippedBadge}
                          isOnline={st.isOnline !== false}
                          showOnlineDot={true}
                          showStageSticker={true}
                          onClick={() => setInspectingStudent(st)}
                        />

                        <div
                          className="min-w-0 cursor-pointer"
                          onClick={() => setInspectingStudent(st)}
                        >
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-display font-bold text-sm truncate hover:text-[#3ee6c4] transition-colors">
                              {st.name} {st.surname}
                            </span>
                            {isMe && (
                              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#ff6b86] text-[#0a0912]">
                                SIZ
                              </span>
                            )}
                          </div>
                          <span className="text-xs opacity-70 font-mono block">
                            @{st.username} · {st.stage.toUpperCase()} ·{' '}
                            <span
                              className={
                                st.isOnline !== false ? 'text-[#22c55e]' : 'text-[#ef4444]'
                              }
                            >
                              {st.isOnline !== false ? 'online' : 'offline'}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0 font-mono">
                        <span className="text-sm font-bold text-[#3ee6c4] block tabular-nums">
                          {st.xp || 0} XP
                        </span>
                        <span className="text-[11px] text-[#ffd23f] tabular-nums">
                          {Number(st.coins ?? 0).toFixed(1)} tanga
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: LIGA BATTLE (PvP & With AI — 30 SAVOL, 15 SONIYA) */}
          {asosiySubView === 'liga_battle' && (
            <LeagueBattleArena
              student={currentStudent}
              allStudents={allStudentsList}
              onRefreshStudent={() => {
                setAllStudentsList(getStudents());
                if (onRefreshData) onRefreshData();
              }}
            />
          )}

          {/* SUB-VIEW 3: KOD YOZISH MUHITI (LIVE HTML/CSS/JS IDE) */}
          {asosiySubView === 'code_ide' && (
            <CodePlaygroundIDE student={currentStudent} />
          )}

          {/* SUB-VIEW 4: TANGALAR DO'KONI (100 TA MAHSULOT) */}
          {asosiySubView === 'shop' && (
            <div className="aurora-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#3ee6c4]">
                    AURORA DO&apos;KONI · {SHOP_ITEMS.length} TA NOYOB MAHSULOT
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
                    100 ta Mahsulot: Turfa XP Damlamalar, Generatorlar, 30 Ramka va 35 Stiker
                  </h2>
                  <p className="text-xs opacity-75 mt-1">
                    Takroriy bir xil boosterlar yo&apos;q — har bir damlama (1.25x dan 3.0x gacha) va generator (+1 dan +5 XP/sek gacha) o&apos;ziga xos kuchga ega!
                  </p>
                </div>
                <div className="px-4 py-2.5 rounded-2xl aurora-surface-2 flex items-center gap-2 font-mono text-sm font-bold text-[#ffd23f] shrink-0">
                  <Coins className="w-5 h-5" />
                  <span>
                    Balans: {isGhostAdmin ? '∞ Cheksiz 🪙' : `${Number(currentStudent.coins ?? 0).toFixed(1)} 🪙`}
                  </span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {(
                  [
                    { id: 'all', label: `Barchasi (${SHOP_ITEMS.length})` },
                    { id: 'xp_boost', label: '🧪 Turfa XP Potion & Generatorlar (15)' },
                    { id: 'frame', label: '🖼️ Bezakli Aylana Ramkalar (30)' },
                    { id: 'avatar', label: '🏷️ Burchak Stikerlari (35)' },
                    { id: 'study_tool', label: '🔑 Dars & Imtihon Kalitlari (20)' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setShopCategoryFilter(cat.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                      shopCategoryFilter === cat.id
                        ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow'
                        : 'aurora-surface-2 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {shopNotice && (
                <div className="p-3.5 rounded-2xl bg-[#3ee6c4]/20 border border-[#3ee6c4] text-[#3ee6c4] text-xs font-bold">
                  {shopNotice}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SHOP_ITEMS.filter((item) =>
                  shopCategoryFilter === 'all' ? true : item.category === shopCategoryFilter
                ).map((item) => {
                  const isOwned = isGhostAdmin || ownedShopIds.includes(item.id);
                  const isRepeatable = item.category === 'xp_boost' || item.category === 'study_tool';
                  const isEquipped =
                    (item.category === 'frame' && equippedFrame === item.preview) ||
                    (item.category === 'avatar' && equippedBadge === item.preview);

                  return (
                    <div
                      key={item.id}
                      className="aurora-surface-2 rounded-3xl p-5 flex flex-col justify-between gap-4 hover:border-[#ff6b86]/45 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {item.category === 'frame' ? (
                          <div className="shrink-0">
                            <AvatarWithFrame
                              src={currentStudent.avatar || MALE_PROGRAMMER_AVATAR}
                              alt={item.title}
                              size={58}
                              frameId={item.preview}
                              showOnlineDot={false}
                              showStageSticker={false}
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-2xl aurora-card flex items-center justify-center text-2xl shrink-0">
                            {item.category === 'avatar' ? '🏷️' : item.preview}
                          </div>
                        )}
                        <div className="space-y-1">
                          <h3 className="font-display text-base font-bold">{item.title}</h3>
                          <p className="text-xs opacity-75 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#ff6b86]/15">
                        <span className="font-mono text-xs font-bold text-[#ffd23f]">
                          {isGhostAdmin
                            ? '∞ Bepul (Admin)'
                            : !isRepeatable && isOwned
                            ? 'Sotib olingan'
                            : `${item.price} 🪙 tanga`}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleBuyOrEquipShopItem(item)}
                          className={`duo-btn text-xs !py-2 !px-4 ${
                            isEquipped
                              ? 'duo-btn-mint'
                              : !isRepeatable && isOwned
                              ? 'duo-btn-surface'
                              : 'duo-btn-gold'
                          }`}
                        >
                          {isEquipped
                            ? 'Faol'
                            : !isRepeatable && isOwned
                            ? 'Taqish'
                            : isRepeatable
                            ? `Faollashtirish (${isGhostAdmin ? '0' : item.price} 🪙)`
                            : `Xarid Qilish (${item.price} 🪙)`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SUB-VIEW 4: O'YINLAR (0 XP VA 0 COIN BERADIGAN MASHQ ARENASI) */}
          {asosiySubView === 'games' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 sm:p-8 border-2 border-[#3ee6c4] relative overflow-hidden space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-extrabold text-[#b6f03c] uppercase">
                      60FPS ARKADA O&apos;YINI · 0 XP / 0 TANGA (SOF MASHQ REJIMI)
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">
                      Cyber Code Arena: Syntax Defender
                    </h2>
                    <p className="text-xs sm:text-sm opacity-85 max-w-xl leading-relaxed">
                      Dasturlash xatolarini (<code className="text-[#ff6b86]">NaN</code>,{' '}
                      <code className="text-[#ffd23f]">404</code>) yo&apos;q qilib mashq qiling.{' '}
                      <strong className="text-[#ffd23f]">
                        Eslatma: O&apos;yinlar reyting muvozanatini saqlash uchun XP va Tanga bermaydi (0 XP / 0 Coin).
                      </strong>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCyberArenaGame(true)}
                    className="duo-btn duo-btn-mint text-sm !py-4 !px-7 shrink-0"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span>O&apos;yinni Boshlash (0 XP)</span>
                  </button>
                </div>
              </div>

              <HtmlCodeGames
                studentAccount={{
                  name: `${currentStudent.name} ${currentStudent.surname}`,
                  email: currentStudent.email || `${currentStudent.username}@devmaster.uz`,
                  registeredAt: currentStudent.joinedDate || '2026',
                  currentStage:
                    currentStudent.stage === 'css'
                      ? 'css'
                      : currentStudent.stage === 'javascript' || currentStudent.stage === 'graduated'
                      ? 'js'
                      : 'html',
                  completedStages:
                    currentStudent.stage === 'graduated'
                      ? ['html', 'css', 'js']
                      : currentStudent.stage === 'javascript'
                      ? ['html', 'css']
                      : currentStudent.stage === 'css'
                      ? ['html']
                      : [],
                  xp: currentStudent.xp || 0,
                  quizPassed: {
                    html: currentStudent.stage !== 'html',
                    css:
                      currentStudent.stage === 'javascript' || currentStudent.stage === 'graduated',
                    js: currentStudent.stage === 'graduated',
                  },
                }}
                onUpdateAccount={() => {
                  // O'yinlardan 0 XP va 0 Coin beriladi (foydalanuvchi talabi bo'yicha)
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TOP MENU 3: SAHIFALAR (Windows 10 Settings uslubida 3 ta sahifa:
          1. Bosh sahifa, 2. O'quv sahifasi [faqat Zig-Zag va Card darslar], 3. Portfolio tuynugi)
         ===================================================================== */}
      {topTab === 'sahifalar' && (
        <div className="space-y-6">
          {sahifalarSubView === 'hub' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center sm:text-left space-y-1 px-1">
                <span className="text-xs font-mono font-bold text-[#ffd23f] uppercase tracking-wider">
                  SAHIFALAR BO&apos;LIMI (3 TA SAHIFA)
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-black">
                  Sahifani tanlang
                </h1>
                <p className="text-xs sm:text-sm opacity-75">
                  Bosh sahifa, soddalashtirilgan O&apos;quv sahifasi va Portfolio tuynugi
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Bosh sahifa */}
                <button
                  type="button"
                  onClick={() => onOpenLandingPage && onOpenLandingPage()}
                  className="aurora-card p-6 text-left flex flex-col justify-between gap-4 hover:border-[#3ee6c4] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/15 text-[#3ee6c4] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold group-hover:text-[#3ee6c4]">
                      1. Bosh sahifa
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      DevMaster Academy asosiy kirish va taqdimot sahifasi
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#3ee6c4]">Ochish →</span>
                </button>

                {/* 2. O'quv sahifasi (Faqat Zig-Zag xarita va oddiy Card darslar) */}
                <button
                  type="button"
                  onClick={() => setSahifalarSubView('oquv_sahifasi')}
                  className="aurora-card p-6 text-left flex flex-col justify-between gap-4 border-2 border-[#ff6b86]/60 hover:border-[#ff6b86] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ff6b86]/15 text-[#ff6b86] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold group-hover:text-[#ff6b86]">
                      2. O&apos;quv sahifasi
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      Ortiqcha narsalarsiz faqat Zig-Zag xarita va oddiy Card usulidagi 250 ta darslar
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#ff6b86]">
                    Darslarni O&apos;qish →
                  </span>
                </button>

                {/* 3. Portfolio tuynugi */}
                <button
                  type="button"
                  onClick={() => onOpenPortfolioPage && onOpenPortfolioPage()}
                  className="aurora-card p-6 text-left flex flex-col justify-between gap-4 hover:border-[#ffd23f] hover:scale-[1.01] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#ffd23f]/15 text-[#ffd23f] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold group-hover:text-[#ffd23f]">
                      3. Portfolio tuynugi
                    </h3>
                    <p className="text-xs opacity-75 leading-relaxed">
                      Talabalar yaratgan jonli veb-loyihalar va kod namunalari vitrinasi
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#ffd23f]">Ko&apos;rish →</span>
                </button>
              </div>
            </div>
          )}

          {/* O'QUV SAHIFASI: ONLY ZIG-ZAG MAP & CARD LESSONS (NO TOP PROFILE CLUTTER, NO STREAK SIDEBAR) */}
          {sahifalarSubView === 'oquv_sahifasi' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSahifalarSubView('hub')}
                  className="duo-btn duo-btn-surface !py-2 !px-4 text-xs flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sahifalar Menyusiga Qaytish</span>
                </button>

                <div className="flex items-center gap-1.5 p-1 rounded-2xl aurora-surface-2">
                  <button
                    type="button"
                    onClick={() => setPathDisplayMode('zigzag')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                      pathDisplayMode === 'zigzag'
                        ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912]'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    Zig-Zag Xarita
                  </button>
                  <button
                    type="button"
                    onClick={() => setPathDisplayMode('grid')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                      pathDisplayMode === 'grid'
                        ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912]'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    Oddiy Card Darslar
                  </button>
                </div>
              </div>

              {/* Clean Stage Filter & Search */}
              <div className="aurora-card p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-1">
                    {tracks.map((t) => {
                      const Icon = t.icon;
                      const isActive = selectedTrack === t.id;
                      const isTrackLocked = t.id !== 'all' && !isStageUnlocked(t.id as CourseStage);

                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            if (isTrackLocked) {
                              setStageLockAlert(
                                `"${STAGE_NAMES[t.id as CourseStage]}" bosqichi qulflangan! Avval "${
                                  STAGE_NAMES[currentStudent.stage]
                                }" bosqichini yakunlang.`
                              );
                              return;
                            }
                            setSelectedTrack(t.id);
                          }}
                          className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer transition-all ${
                            isTrackLocked
                              ? 'aurora-surface-2 opacity-45 cursor-not-allowed'
                              : isActive
                              ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow'
                              : 'aurora-surface-2 hover:border-[#ff8a3d]'
                          }`}
                        >
                          {isTrackLocked ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <Icon className="w-3.5 h-3.5" />
                          )}
                          <span>{t.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim()) setPathDisplayMode('grid');
                      }}
                      placeholder="Dars mavzusini qidiring..."
                      className="w-full pl-9 pr-3 !min-h-[38px] !py-1.5 aurora-input text-xs"
                    />
                  </div>
                </div>
              </div>

              {canTakeAiStageExam && (
                <div className="aurora-card p-5 border-2 border-[#ffd23f] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#ffd23f]">
                      BOSQICH YAKUNLANDI
                    </span>
                    <h2 className="font-display text-lg font-bold">
                      {STAGE_NAMES[currentStudent.stage]} barcha darslari tugatildi!
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartAiStageExam}
                    className="duo-btn duo-btn-gold text-xs shrink-0"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Bosqich Imtihonini Boshlash</span>
                  </button>
                </div>
              )}

              {/* MODE A: ZIG-ZAG XARITA */}
              {pathDisplayMode === 'zigzag' ? (
                <div className="space-y-10">
                  {zigZagStages.map((stageKey) => {
                    const stageLessons = LESSONS.filter((l) => l.stage === stageKey).slice(0, 12);
                    const unlockedStage = isStageUnlocked(stageKey);
                    const stageTheme = STAGE_COLORS[stageKey] || STAGE_COLORS.html;
                    const completedInStage = stageLessons.filter((l) =>
                      currentStudent.completedLessons.includes(l.id)
                    ).length;

                    const firstUncompletedId = unlockedStage
                      ? stageLessons.find((l) => !currentStudent.completedLessons.includes(l.id))
                          ?.id
                      : undefined;

                    return (
                      <div key={stageKey} className="aurora-card p-6 sm:p-8 space-y-8">
                        <div
                          className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-r ${stageTheme.gradient} text-[#0a0912] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg`}
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-extrabold uppercase tracking-wider opacity-80">
                              {unlockedStage ? 'Ochiq Bosqich' : 'Qulflangan Bosqich'} ·{' '}
                              {completedInStage}/{stageLessons.length} dars
                            </span>
                            <h2 className="font-display text-xl sm:text-2xl font-bold">
                              {STAGE_NAMES[stageKey]}
                            </h2>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (stageLessons[0]) handleOpenLesson(stageLessons[0]);
                            }}
                            className="px-4 py-2.5 rounded-2xl bg-[#0a0912] text-[#fdfcff] font-display text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
                          >
                            <BookOpen className="w-4 h-4 text-[#ffd23f]" />
                            <span>Qo&apos;llanma</span>
                          </button>
                        </div>

                        <div className="flex flex-col items-center space-y-7 py-4">
                          {stageLessons.map((lesson, idx) => {
                            const isCompleted = currentStudent.completedLessons.includes(lesson.id);
                            const isCurrent = lesson.id === firstUncompletedId;
                            const isLocked =
                              !unlockedStage ||
                              (!isCompleted &&
                                !isCurrent &&
                                idx > 0 &&
                                !currentStudent.completedLessons.includes(stageLessons[idx - 1].id));

                            const offsets = [
                              'translate-x-0',
                              '-translate-x-10 sm:-translate-x-16',
                              '-translate-x-16 sm:-translate-x-24',
                              '-translate-x-10 sm:-translate-x-16',
                              'translate-x-0',
                              'translate-x-10 sm:translate-x-16',
                              'translate-x-16 sm:translate-x-24',
                              'translate-x-10 sm:translate-x-16',
                            ];
                            const offsetClass = offsets[idx % offsets.length];

                            return (
                              <div
                                key={lesson.id}
                                className={`flex flex-col items-center relative transition-transform ${offsetClass}`}
                              >
                                {isCurrent && (
                                  <div className="mb-2 px-3.5 py-1 rounded-full bg-[#3ee6c4] text-[#0a0912] font-display text-xs font-extrabold tracking-wide shadow-lg animate-bounce">
                                    BOSHLASH · +{getLessonXpDisplay()} XP
                                  </div>
                                )}

                                <button
                                  type="button"
                                  onClick={() => handleOpenLesson(lesson)}
                                  className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer active:translate-y-1 ${
                                    isCompleted
                                      ? 'bg-gradient-to-b from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] shadow-[0_7px_0_#c9990e,0_0_25px_rgba(255,210,63,0.45)]'
                                      : isCurrent
                                      ? 'bg-gradient-to-b from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow-[0_7px_0_#c93b58,0_0_30px_rgba(255,107,134,0.65)] ring-8 ring-[#ff6b86]/25'
                                      : isLocked
                                      ? 'aurora-surface-2 opacity-50 shadow-[0_6px_0_rgba(255,255,255,0.08)]'
                                      : 'bg-gradient-to-b from-[#3ee6c4] to-[#b6f03c] text-[#0a0912] shadow-[0_7px_0_#1ba88b]'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <Star className="w-8 h-8 fill-current" />
                                  ) : isCurrent ? (
                                    <Play className="w-8 h-8 fill-current ml-1" />
                                  ) : isLocked ? (
                                    <Lock className="w-7 h-7 opacity-70" />
                                  ) : (
                                    <Code2 className="w-7 h-7" />
                                  )}
                                </button>

                                <div className="mt-2.5 text-center max-w-[200px]">
                                  <span className="text-xs font-bold block leading-tight">
                                    {lesson.title}
                                  </span>
                                  <span className="text-[11px] font-mono opacity-70">
                                    {isCompleted
                                      ? `Oltin · ${currentStudent.quizScores?.[lesson.id] || 100}%`
                                      : isCurrent
                                      ? 'Joriy Dars'
                                      : isLocked
                                      ? 'Qulflangan'
                                      : `+${getLessonXpDisplay()} XP`}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* MODE B: ODDIY CARD USULIDAGI DARSLAR */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredLessons.map((lesson) => {
                    const isCompleted = currentStudent.completedLessons.includes(lesson.id);
                    const isLessonLocked = !isStageUnlocked(lesson.stage);
                    const score = currentStudent.quizScores?.[lesson.id];

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => handleOpenLesson(lesson)}
                        className={`aurora-card p-5 cursor-pointer flex flex-col justify-between gap-3 ${
                          isLessonLocked
                            ? 'opacity-50 cursor-not-allowed'
                            : 'aurora-card-interactive'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="text-[#ff8a3d] font-bold uppercase">
                              {lesson.stage}
                            </span>
                            {isLessonLocked ? (
                              <span className="text-[#ff6b86] flex items-center gap-1">
                                <Lock className="w-3.5 h-3.5" /> Qulflangan
                              </span>
                            ) : isCompleted ? (
                              <span className="text-[#ffd23f] font-bold flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-current" />{' '}
                                {score ? `${score}%` : "O'tildi"}
                              </span>
                            ) : (
                              <span className="text-[#3ee6c4] font-bold">
                                +{getLessonXpDisplay()} XP
                              </span>
                            )}
                          </div>
                          <h3 className="font-display text-sm sm:text-base font-bold">
                            {lesson.title}
                          </h3>
                          <p className="text-xs opacity-75 line-clamp-2">{lesson.summary}</p>
                        </div>

                        <div className="pt-3 border-t border-[#ff6b86]/15 flex items-center justify-between text-xs">
                          <span className="opacity-70 flex items-center gap-1 font-mono">
                            <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                          </span>
                          <span className="font-display font-bold text-[#ff6b86]">
                            Boshlash →
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================= LESSON VIEWER MODAL ======================= */}
      {activeLesson && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isFocusMode
              ? 'p-0 sm:p-2 bg-[#040308]/95 backdrop-blur-2xl'
              : 'p-2 sm:p-4 bg-black/80 backdrop-blur-md'
          }`}
        >
          <div
            className={`relative w-full aurora-card flex flex-col overflow-hidden transition-all duration-300 ${
              isFocusMode
                ? 'max-w-[98vw] h-[98vh] border-2 border-[#3ee6c4]/60 shadow-[0_0_90px_rgba(62,230,196,0.22)]'
                : 'max-w-5xl h-[94vh]'
            }`}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#ff6b86]/20 aurora-surface-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center justify-between gap-3 min-w-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-base sm:text-lg font-bold truncate">
                        {activeLesson.title}
                      </h2>
                    </div>
                    <p className="text-xs opacity-75 truncate">{activeLesson.summary}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLesson(null);
                    setIsFocusMode(false);
                  }}
                  className="p-2 rounded-xl aurora-card sm:hidden shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsFocusMode((prev) => !prev)}
                  className={`duo-btn text-xs !py-2 !px-3.5 ${
                    isFocusMode ? 'duo-btn-mint' : 'duo-btn-surface'
                  }`}
                >
                  {isFocusMode ? (
                    <>
                      <Minimize2 className="w-4 h-4" />
                      <span>Oddiy Ko&apos;rinish</span>
                    </>
                  ) : (
                    <>
                      <Maximize2 className="w-4 h-4 text-[#3ee6c4]" />
                      <span>Focus Mode</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setQuizLesson(activeLesson)}
                  className="duo-btn duo-btn-coral text-xs !py-2 !px-4 w-full sm:w-auto"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Viktorina (+{getLessonXpDisplay()} XP)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveLesson(null);
                    setIsFocusMode(false);
                  }}
                  className="p-2.5 rounded-xl aurora-card hidden sm:flex cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mode Tabs */}
            <div className="px-4 sm:px-6 py-2.5 border-b border-[#ff6b86]/15 flex items-center gap-2 overflow-x-auto shrink-0">
              <button
                type="button"
                onClick={() => setLessonMode('textbook')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  lessonMode === 'textbook'
                    ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912]'
                    : 'aurora-surface-2'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>W3Schools To&apos;liq Darslik</span>
              </button>
              <button
                type="button"
                onClick={() => setLessonMode('tryit')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  lessonMode === 'tryit'
                    ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912]'
                    : 'aurora-surface-2'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Try-It Studio (Kod Yozish)</span>
              </button>
              <button
                type="button"
                onClick={() => setLessonMode('assistant')}
                className={`px-4 py-2 rounded-xl text-xs font-display font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  lessonMode === 'assistant'
                    ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff8a3d] text-[#0a0912]'
                    : 'aurora-surface-2'
                }`}
              >
                <Bot className="w-4 h-4" />
                <span>Ovozli AI Ustoz</span>
              </button>
            </div>

            {/* Body */}
            <div
              className={`flex-1 overflow-y-auto space-y-6 transition-all duration-300 ${
                isFocusMode ? 'p-6 sm:p-10' : 'p-4 sm:p-6'
              }`}
            >
              {lessonMode === 'textbook' && (
                <div
                  className={`mx-auto space-y-6 transition-all duration-300 ${
                    isFocusMode ? 'max-w-6xl' : 'max-w-4xl'
                  }`}
                >
                  <div className="aurora-surface-2 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#3ee6c4]">
                        W3SCHOOLS RASMIY DASTURI
                      </span>
                      <p className="text-xs opacity-85 mt-1">
                        Nazariya, sintaksis qoidalari va interaktiv kod namunalari.
                      </p>
                    </div>
                    {activeLesson.w3ReferenceTopic && (
                      <a
                        href={
                          activeLesson.w3ReferenceTopic.startsWith('http')
                            ? activeLesson.w3ReferenceTopic
                            : 'https://www.w3schools.com/'
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="duo-btn duo-btn-surface text-xs !py-2 !px-3.5 shrink-0"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#3ee6c4]" />
                        <span>W3Schools</span>
                      </a>
                    )}
                  </div>

                  <div className="space-y-4">
                    {activeLesson.deepExplanation?.map((paragraph, idx) => {
                      const colonIdx = paragraph.indexOf(':');
                      const hasHeading = colonIdx > 0 && colonIdx < 95;
                      const headingPart = hasHeading ? paragraph.slice(0, colonIdx) : null;
                      const bodyPart = hasHeading
                        ? paragraph.slice(colonIdx + 1).trim()
                        : paragraph;

                      return (
                        <div
                          key={idx}
                          className={`aurora-surface-2 rounded-2xl transition-all duration-300 ${
                            isFocusMode
                              ? 'p-6 sm:p-8 space-y-2.5 border border-[#3ee6c4]/25'
                              : 'p-5 space-y-1.5'
                          }`}
                        >
                          {headingPart && (
                            <h4
                              className={`font-display font-bold text-[#ff8a3d] ${
                                isFocusMode ? 'text-base sm:text-lg' : 'text-sm'
                              }`}
                            >
                              {headingPart}
                            </h4>
                          )}
                          <p
                            className={`opacity-95 ${
                              isFocusMode
                                ? 'text-sm sm:text-base lg:text-lg leading-loose'
                                : 'text-xs sm:text-sm leading-relaxed'
                            }`}
                          >
                            {bodyPart}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="aurora-surface-2 p-5 rounded-2xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-[#b6f03c]">
                        Standart Kod Namunasi:
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setUserCode(activeLesson.codeExample);
                          setLessonMode('tryit');
                        }}
                        className="duo-btn duo-btn-mint text-xs !py-1.5 !px-3.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Try-It Studioda Sinash</span>
                      </button>
                    </div>
                    <pre className="p-4 rounded-2xl aurora-card text-xs font-mono text-[#3ee6c4] overflow-x-auto">
                      {activeLesson.codeExample}
                    </pre>
                  </div>

                  <div className="aurora-card p-6 border-2 border-[#ffd23f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-display text-base font-bold">
                        Darsni o&apos;zlashtirdingizmi? Viktorinani boshlang!
                      </h4>
                      <p className="text-xs opacity-80">
                        Kamida 70% to&apos;plab +{getLessonXpDisplay()} XP va +0.5 tanga yutib
                        oling.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuizLesson(activeLesson)}
                      className="duo-btn duo-btn-gold text-xs sm:text-sm shrink-0"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Testni Boshlash</span>
                    </button>
                  </div>
                </div>
              )}

              {lessonMode === 'tryit' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col h-[460px] aurora-surface-2 rounded-2xl overflow-hidden">
                    <div className="p-3 border-b border-[#ff6b86]/20 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold">Kod Muharriri</span>
                      <button
                        type="button"
                        onClick={handleRunCode}
                        disabled={isCodeRunning}
                        className="duo-btn duo-btn-mint text-xs !py-1.5 !px-3.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Ishga Tushirish</span>
                      </button>
                    </div>
                    <textarea
                      value={userCode}
                      onChange={(e) => setUserCode(e.target.value)}
                      className="flex-1 p-4 bg-transparent font-mono text-xs resize-none focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col h-[460px] aurora-surface-2 rounded-2xl overflow-hidden">
                    <div className="p-3 border-b border-[#ff6b86]/20 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#3ee6c4]">
                        Konsol Natijasi
                      </span>
                      <button
                        type="button"
                        onClick={() => setConsoleOutput([])}
                        className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
                      >
                        Tozalash
                      </button>
                    </div>
                    <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1">
                      {consoleOutput.length === 0 ? (
                        <p className="opacity-60 italic">
                          Natijani ko&apos;rish uchun &quot;Ishga Tushirish&quot; tugmasini bosing.
                        </p>
                      ) : (
                        consoleOutput.map((log, i) => <div key={i}>{log}</div>)
                      )}
                    </div>
                  </div>
                </div>
              )}

              {lessonMode === 'assistant' && (
                <div className="max-w-2xl mx-auto h-[500px]">
                  <StudentAiAssistant
                    currentLessonTitle={activeLesson.title}
                    currentLessonStage={activeLesson.stage}
                    currentCodeSnippet={userCode}
                    student={currentStudent}
                    onStartStageExam={(exam) => {
                      setActiveLesson(null);
                      if (onOpenTestIdModal) onOpenTestIdModal(exam.id);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================= PROFILE EDIT MODAL (QALAMCHA) ======================= */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Pencil className="w-4 h-4 text-[#3ee6c4]" />
                <span>Profil Ma&apos;lumotlarini O&apos;zgartirish</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="p-1.5 rounded-xl aurora-surface-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {profileSaveMsg && (
              <div className="p-3 rounded-xl bg-[#3ee6c4]/20 border border-[#3ee6c4] text-[#3ee6c4] text-xs font-bold">
                {profileSaveMsg}
              </div>
            )}

            <form onSubmit={handleSaveProfileChanges} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold mb-1">Ism</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Familiya</label>
                  <input
                    type="text"
                    required
                    value={editSurname}
                    onChange={(e) => setEditSurname(e.target.value)}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold mb-1">Username (Login)</label>
                  <input
                    type="text"
                    required
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Yoshi</label>
                  <input
                    type="number"
                    min={7}
                    max={99}
                    required
                    value={editAge}
                    onChange={(e) => setEditAge(Number(e.target.value))}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Telefon raqam</label>
                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="aurora-input py-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">O&apos;zingiz haqingizda (Bio)</label>
                <input
                  type="text"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Masalan: Frontend dasturchi va anime muxlisi..."
                  className="aurora-input py-2 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Yangi Parol</label>
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="Yangi parol kiriting..."
                  className="aurora-input py-2 text-xs font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditProfileModal(false)}
                  className="duo-btn duo-btn-surface flex-1 py-2.5 text-xs"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-mint flex-1 py-2.5 text-xs">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= CIRCULAR PHOTO CROPPER MODAL (FOTOAPPARAT) ======================= */}
      <CircularPhotoCropperModal
        isOpen={showPhotoCropperModal}
        onClose={() => setShowPhotoCropperModal(false)}
        onSavePhoto={handleSaveCroppedAvatar}
      />

      {/* ======================= PUBLIC STUDENT PROFILE MODAL (TELEGRAM USLUBIDA) ======================= */}
      <StudentPublicProfileModal
        student={inspectingStudent}
        onClose={() => setInspectingStudent(null)}
        onOpenGroupChat={() => {
          setInspectingStudent(null);
          if (onOpenGroupChat) onOpenGroupChat(teacher?.id || 't-1');
        }}
      />

      {/* LESSON QUIZ MODAL */}
      {quizLesson && (
        <LessonQuizModal
          lesson={quizLesson}
          studentId={currentStudent.id}
          onClose={() => setQuizLesson(null)}
          onQuizSuccess={(earnedXp, newCert) => {
            const prevLevel = Math.floor((currentStudent.xp || 0) / 100) + 1;
            const nextLevel = Math.floor(((currentStudent.xp || 0) + earnedXp) / 100) + 1;
            onCompleteLesson(quizLesson.id);
            if (newCert) {
              setViewingCertificate(newCert);
            }
            if (nextLevel > prevLevel || earnedXp > 0) {
              setLevelUpModal({ level: Math.max(nextLevel, prevLevel), xpEarned: earnedXp });
            }
          }}
        />
      )}

      {/* FULL-SCREEN CELEBRATORY LEVEL UP MODAL */}
      {levelUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="aurora-card max-w-md w-full p-8 text-center space-y-5 border-2 border-[#ffd23f] animate-aurora-pop">
            <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] flex items-center justify-center mx-auto shadow-[0_8px_0_#c9990e]">
              <Crown className="w-12 h-12 fill-current" />
            </div>
            <div>
              <span className="font-mono text-xs font-extrabold text-[#ffd23f] tracking-widest uppercase">
                DARSLIK MUVAFFAQIYATLI YAKUNLANDI!
              </span>
              <h2 className="font-display text-3xl font-bold mt-1">
                Daraja {levelUpModal.level}
              </h2>
              <p className="text-xs opacity-80 mt-1">
                Siz +{levelUpModal.xpEarned} XP va +0.5 tanga mukofot oldingiz!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLevelUpModal(null)}
              className="w-full duo-btn duo-btn-gold text-sm"
            >
              <span>Davom Etish</span>
            </button>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {viewingCertificate && (
        <CertificateModal
          certificate={viewingCertificate}
          onClose={() => setViewingCertificate(null)}
        />
      )}

      {/* STAGE LOCK ALERT MODAL */}
      {stageLockAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="aurora-card max-w-md w-full p-6 text-center space-y-4 animate-aurora-pop">
            <div className="w-16 h-16 rounded-2xl bg-[#ff4d6d]/20 text-[#ff6b86] flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="font-display text-lg font-bold">Bosqich Qulflangan</h3>
            <p className="text-xs opacity-85 whitespace-pre-line leading-relaxed">
              {stageLockAlert}
            </p>
            <button
              type="button"
              onClick={() => setStageLockAlert(null)}
              className="w-full duo-btn duo-btn-coral text-xs"
            >
              <span>Tushunarli</span>
            </button>
          </div>
        </div>
      )}

      {/* Full-Viewport 60fps Cyber Code Arena Game Shell (0 XP & 0 Coins) */}
      {showCyberArenaGame && (
        <CyberCodeArenaGame
          studentName={`${currentStudent.name} ${currentStudent.surname}`}
          onClose={() => setShowCyberArenaGame(false)}
          onAwardRewards={(_xpEarned, _coinsEarned, score) => {
            if (currentStudent.id !== 'guest') {
              const prevBest = currentStudent.gameScores?.['Cyber Code Arena'] || 0;
              updateStudent(currentStudent.id, {
                gameScores: {
                  ...(currentStudent.gameScores || {}),
                  'Cyber Code Arena': Math.max(prevBest, score),
                },
              });
            }
            setShopNotice(
              `🎮 Cyber Code Arena yakunlandi! Rekord ball saqlandi (${score} ball). O'yinlar XP va Tanga bermaydi.`
            );
          }}
        />
      )}
    </div>
  );
};
