import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  Sparkles,
  Award,
  Clock,
  AlertCircle,
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
  Palette,
  Coins,
  Trophy,
  Tag,
  Star,
  Crown,
  ShoppingBag,
  ArrowUp,
  ArrowDown,
  Compass,
  Gift,
  HelpCircle,
  Maximize2,
  Minimize2,
  Eye,
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
} from '../services/storage';
import { useBackground } from '../context/BackgroundContext';
import { StudentAiAssistant } from './StudentAiAssistant';
import { LessonQuizModal } from './LessonQuizModal';
import { CertificateModal } from './CertificateModal';
import { ThreeGiftModal } from './ThreeGiftModal';
import { AuroraMascot } from './AuroraMascot';
import { CyberCodeArenaGame } from './CyberCodeArenaGame';
import { HtmlCodeGames } from './HtmlCodeGames';

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
}

interface ShopItem {
  id: string;
  title: string;
  category: 'xp_boost' | 'study_tool' | 'frame' | 'avatar';
  price: number;
  preview: string;
  description: string;
  xpBonus?: number;
  actionType?:
    | 'unlock_1_lesson'
    | 'unlock_3_lessons'
    | 'unlock_5_lessons'
    | 'stage_exam_html'
    | 'stage_exam_css'
    | 'stage_exam_js'
    | 'final_exam_access'
    | 'streak_shield_1'
    | 'streak_shield_7'
    | 'stage_upgrade_boost';
}

const SHOP_ITEMS: ShopItem[] = [
  // ==================== 1. XP VA DARAJA PAKETLARI (10 TA) ====================
  {
    id: 'xp-pack-50',
    title: 'Boshlang‘ich +50 XP Paketi',
    category: 'xp_boost',
    price: 5,
    preview: '⚡',
    description: 'Hisobingizga darhol +50 XP qo‘shadi va darajangizni oshiradi',
    xpBonus: 50,
  },
  {
    id: 'xp-pack-100',
    title: 'Tezkor +100 XP Paketi',
    category: 'xp_boost',
    price: 9,
    preview: '🔥',
    description: 'Bir zumda +100 XP berib, yangi Level sari eltadi',
    xpBonus: 100,
  },
  {
    id: 'xp-pack-150',
    title: 'Kodchi +150 XP Impulsi',
    category: 'xp_boost',
    price: 12,
    preview: '🚀',
    description: 'Haftalik reyting jadvalida yuqoriga ko‘tarilish uchun +150 XP',
    xpBonus: 150,
  },
  {
    id: 'xp-pack-250',
    title: 'Oltin +250 XP Sandig‘i',
    category: 'xp_boost',
    price: 18,
    preview: '🏆',
    description: '2.5 baravar ko‘proq tajriba balli (+250 XP) darhol qo‘shiladi',
    xpBonus: 250,
  },
  {
    id: 'xp-pack-400',
    title: 'Mega +400 XP Kristali',
    category: 'xp_boost',
    price: 25,
    preview: '💎',
    description: '4 ta darajaga teng +400 XP mukofot ballari',
    xpBonus: 400,
  },
  {
    id: 'xp-pack-600',
    title: 'Pro Dasturchi +600 XP Paketi',
    category: 'xp_boost',
    price: 35,
    preview: '🌟',
    description: 'Ligada Top-3 podiumga chiqish uchun +600 XP kuchaytirgich',
    xpBonus: 600,
  },
  {
    id: 'xp-pack-800',
    title: 'Kiber +800 XP Energiya',
    category: 'xp_boost',
    price: 45,
    preview: '🔋',
    description: 'Katta sakrash: hisobingizga +800 XP bir zumda yoziladi',
    xpBonus: 800,
  },
  {
    id: 'xp-pack-1000',
    title: 'Master +1000 XP To‘plami',
    category: 'xp_boost',
    price: 55,
    preview: '👑',
    description: '10 ta yangi Levelga teng +1000 XP super paket',
    xpBonus: 1000,
  },
  {
    id: 'xp-pack-1500',
    title: 'Grandmaster +1500 XP Xazinasi',
    category: 'xp_boost',
    price: 75,
    preview: '🪐',
    description: 'Akademiya yetakchisiga aylanish uchun +1500 XP',
    xpBonus: 1500,
  },
  {
    id: 'xp-pack-2500',
    title: 'Afsonaviy +2500 XP Imperiya Paketi',
    category: 'xp_boost',
    price: 110,
    preview: '🌌',
    description: 'Eng yuqori +2500 XP mukofoti va darhol Level Up!',
    xpBonus: 2500,
  },

  // ==================== 2. SAYTDA ISHLAYDIGAN O'QUV VOSITALARI VA KALITLAR (10 TA) ====================
  {
    id: 'tool-unlock-1-lesson',
    title: '1 ta Keyingi Darsni Ochish Kaliti',
    category: 'study_tool',
    price: 10,
    preview: '🔑',
    description: 'Joriy bosqichdagi navbatdagi 1 ta darsni darhol tugallangan qilib ochib beradi',
    actionType: 'unlock_1_lesson',
  },
  {
    id: 'tool-unlock-3-lessons',
    title: '3 ta Darsni Tezkor Ochish Paketi',
    category: 'study_tool',
    price: 24,
    preview: '🗝️',
    description: 'Yo‘l xaritasidagi navbatdagi 3 ta dars tugunini birdaniga ochadi (+90 XP)',
    actionType: 'unlock_3_lessons',
  },
  {
    id: 'tool-unlock-5-lessons',
    title: '5 ta Darsni Ekspress Ochish Kaliti',
    category: 'study_tool',
    price: 38,
    preview: '🔓',
    description: 'Bosqichni tezroq yakunlash uchun 5 ta darsni darhol ochadi (+150 XP)',
    actionType: 'unlock_5_lessons',
  },
  {
    id: 'tool-exam-html',
    title: 'HTML5 Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 14,
    preview: '📄',
    description: 'HTML bosqichi bo‘yicha shaxsiy Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_html',
  },
  {
    id: 'tool-exam-css',
    title: 'CSS3 Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 16,
    preview: '🎨',
    description: 'CSS3 bosqichi bo‘yicha shaxsiy Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_css',
  },
  {
    id: 'tool-exam-js',
    title: 'JavaScript Bosqich Imtihoni Test ID',
    category: 'study_tool',
    price: 18,
    preview: '⚡',
    description: 'JavaScript bosqichi bo‘yicha maxsus Test ID yaratadi va imtihon oynasini ochadi',
    actionType: 'stage_exam_js',
  },
  {
    id: 'tool-final-exam-pass',
    title: 'Final Diplom Imtihoniga Yo‘llanma',
    category: 'study_tool',
    price: 30,
    preview: '🎓',
    description: 'Rasmiy QR-kodli PDF sertifikat beruvchi Final Imtihon oynasini darhol ochadi',
    actionType: 'final_exam_access',
  },
  {
    id: 'tool-streak-shield-1',
    title: 'Kunlik Streak Himoya Qalqoni (1 kun)',
    category: 'study_tool',
    price: 8,
    preview: '🛡️',
    description: 'Kunlik streak 🔥 uzilib qolishidan 1 kunlik ishonchli himoya va +30 XP',
    actionType: 'streak_shield_1',
  },
  {
    id: 'tool-streak-shield-7',
    title: 'Olmos Streak Qalqoni (7 kunlik)',
    category: 'study_tool',
    price: 22,
    preview: '💠',
    description: 'Hafta davomida streak olovini saqlaydi va +120 XP bonus beradi',
    actionType: 'streak_shield_7',
  },
  {
    id: 'tool-stage-upgrade',
    title: 'Keyingi Bosqichga O‘tish Vaucheri',
    category: 'study_tool',
    price: 65,
    preview: '🚀',
    description: 'Joriy bosqichdan keyingi bosqichga (HTML→CSS→JS) to‘g‘ridan-to‘g‘ri o‘tkazadi',
    actionType: 'stage_upgrade_boost',
  },

  // ==================== 3. PROFIL NEON RAMKALARI (10 TA) ====================
  {
    id: 'frame-aurora-coral',
    title: 'Aurora Marjon Ramkasi',
    category: 'frame',
    price: 10,
    preview: 'ring-4 ring-[#ff6b86] shadow-[0_0_25px_rgba(255,107,134,0.6)]',
    description: 'Quyosh botishi rangidagi yorqin marjon neon ramka',
  },
  {
    id: 'frame-mint-cyber',
    title: 'Yalpiz Kiber Ramka',
    category: 'frame',
    price: 12,
    preview: 'ring-4 ring-[#3ee6c4] shadow-[0_0_25px_rgba(62,230,196,0.6)]',
    description: 'Sof yalpiz va kiber-yashil nurlar bilan bezatilgan ramka',
  },
  {
    id: 'frame-gold-crown',
    title: 'Oltin Toj Ramkasi',
    category: 'frame',
    price: 15,
    preview: 'ring-4 ring-[#ffd23f] shadow-[0_0_25px_rgba(255,210,63,0.6)]',
    description: 'Profilingiz atrofida oltin chempion halqasi porlab turadi',
  },
  {
    id: 'frame-lime-energy',
    title: 'Laym Energiya Ramkasi',
    category: 'frame',
    price: 14,
    preview: 'ring-4 ring-[#b6f03c] shadow-[0_0_25px_rgba(182,240,60,0.65)]',
    description: 'Yuqori faollik va algoritm tezligini bildiruvchi laym ramka',
  },
  {
    id: 'frame-sunset-orange',
    title: 'Olovli Apelsin Ramkasi',
    category: 'frame',
    price: 16,
    preview: 'ring-4 ring-[#ff8a3d] shadow-[0_0_28px_rgba(255,138,61,0.65)]',
    description: 'Streak olovi kabi yonib turuvchi issiq apelsin ramka',
  },
  {
    id: 'frame-crimson-samurai',
    title: 'Samuray Qizil Neon Ramka',
    category: 'frame',
    price: 20,
    preview: 'ring-4 ring-[#ff4d6d] shadow-[0_0_30px_rgba(255,77,109,0.75)]',
    description: 'JavaScript ustalari uchun kuchli qirmizi-qizil qalqon ramka',
  },
  {
    id: 'frame-cyan-diamond',
    title: 'Olmos Kvant Ramkasi',
    category: 'frame',
    price: 24,
    preview: 'ring-4 ring-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.7)]',
    description: 'Muzdek moviy kvant nurlarini taratuvchi kristall ramka',
  },
  {
    id: 'frame-emerald-hacker',
    title: 'Zumrad Matritsa Ramkasi',
    category: 'frame',
    price: 28,
    preview: 'ring-4 ring-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.75)]',
    description: 'Haqiqiy terminal va backend kodchilari uchun zumrad halqa',
  },
  {
    id: 'frame-amber-phoenix',
    title: 'Qaqnus Oltin-Olovi Ramkasi',
    category: 'frame',
    price: 35,
    preview: 'ring-4 ring-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.85)]',
    description: 'Reyting yetakchilari uchun qo‘shaloq oltin-olovli ramka',
  },
  {
    id: 'frame-lord-imperator',
    title: 'Imperator VIP Platinam Ramka',
    category: 'frame',
    price: 50,
    preview: 'ring-4 ring-white shadow-[0_0_40px_rgba(255,210,63,0.9)]',
    description: 'Akademiyaning eng nufuzli yorqin oq-oltin VIP ramkasi',
  },

  // ==================== 4. DASTURCHI UNVONLARI VA NISHONLARI (10 TA) ====================
  {
    id: 'avatar-html-architect',
    title: 'HTML5 Arxitektori Unvoni',
    category: 'avatar',
    price: 10,
    preview: '🧱',
    description: 'Ismingiz yonida "HTML5 Arxitektori 🧱" rasmiy nishoni ko‘rinadi',
  },
  {
    id: 'avatar-css-wizard',
    title: 'CSS3 Dizayn Sehrli Ustasi',
    category: 'avatar',
    price: 12,
    preview: '🎨',
    description: 'Profilingizga "CSS3 Usta Dizayneri 🎨" unvonini qo‘shadi',
  },
  {
    id: 'avatar-js-ninja',
    title: 'JavaScript Ninja Dasturchi',
    category: 'avatar',
    price: 16,
    preview: '🥷',
    description: 'DOM va mantiqiy algoritmlar ustasi uchun maxsus unvon',
  },
  {
    id: 'avatar-astronaut',
    title: 'Kosmik Dasturchi Unvoni',
    category: 'avatar',
    price: 20,
    preview: '🚀',
    description: 'Cheksiz koinot darajasidagi tezkor kodchi nishoni',
  },
  {
    id: 'avatar-samurai',
    title: 'Kiber Samuray Unvoni',
    category: 'avatar',
    price: 25,
    preview: '⚔️',
    description: 'Murakkab testlarni bexato yechuvchi jangchi dasturchi belgisi',
  },
  {
    id: 'avatar-bug-hunter',
    title: 'Xato Ovchisi (Bug Hunter)',
    category: 'avatar',
    price: 18,
    preview: '🐞',
    description: 'Kod ichidagi har qanday xatoni topuvchi sinchkov muhandis unvoni',
  },
  {
    id: 'avatar-algo-master',
    title: 'Algoritm Grossmeysteri',
    category: 'avatar',
    price: 28,
    preview: '♟️',
    description: 'Mantiqiy masalalar va kod o‘yinlari chempioni nishoni',
  },
  {
    id: 'avatar-night-coder',
    title: 'Tungi Kodchi (Dark Coder)',
    category: 'avatar',
    price: 22,
    preview: '🌙',
    description: 'Tungi fokus rejimida tinimsiz o‘rganuvchi dasturchi belgisi',
  },
  {
    id: 'avatar-fullstack-king',
    title: 'Full-Stack Maestro Toji',
    category: 'avatar',
    price: 40,
    preview: '👑',
    description: 'Frontend va Backend bilimlarini egallagan oliy dasturchi unvoni',
  },
  {
    id: 'avatar-devmaster-legend',
    title: 'DevMaster Afsonasi (Legend VIP)',
    category: 'avatar',
    price: 60,
    preview: '💎',
    description: 'Platformadagi eng oliy darajali Olmos Legend unvoni',
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
  onOpen3DGame,
  onOpenGeminiStudio,
}) => {
  // Main gamified section tabs (also controlled by mobile bottom nav)
  const [activeSection, setActiveSection] = useState<'path' | 'league' | 'shop' | 'profile' | 'games'>('path');
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
  const [ranCodeCount, setRanCodeCount] = useState(0);

  // Modals
  const [quizLesson, setQuizLesson] = useState<Lesson | null>(null);
  const [viewingCertificate, setViewingCertificate] = useState<CertificateData | null>(null);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showFloatingAi, setShowFloatingAi] = useState(false);
  const [stageLockAlert, setStageLockAlert] = useState<string | null>(null);

  // Level Up & Achievement Popup Modals
  const [levelUpModal, setLevelUpModal] = useState<{ level: number; xpEarned: number } | null>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<{
    title: string;
    desc: string;
    icon: string;
    unlocked: boolean;
  } | null>(null);

  // Shop Owned / Equipped State (stored in central database on student record)
  const [ownedShopIds, setOwnedShopIds] = useState<string[]>(
    student?.ownedShopIds && student.ownedShopIds.length > 0
      ? student.ownedShopIds
      : ['frame-aurora-coral']
  );
  const [equippedFrame, setEquippedFrame] = useState<string>(
    student?.equippedFrame || 'ring-4 ring-[#ff6b86] shadow-[0_0_25px_rgba(255,107,134,0.5)]'
  );
  const [equippedBadge, setEquippedBadge] = useState<string>(student?.equippedBadge || '🚀');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<
    'all' | 'xp_boost' | 'study_tool' | 'frame' | 'avatar'
  >('all');
  const [shopNotice, setShopNotice] = useState<string | null>(null);

  // Claimed Daily Quests (stored in central database on student record)
  const [claimedQuests, setClaimedQuests] = useState<string[]>(student?.claimedQuests || []);

  useEffect(() => {
    if (student?.ownedShopIds && student.ownedShopIds.length > 0) {
      setOwnedShopIds(student.ownedShopIds);
    }
    if (student?.equippedFrame) {
      setEquippedFrame(student.equippedFrame);
    }
    if (student?.equippedBadge) {
      setEquippedBadge(student.equippedBadge);
    }
    if (student?.claimedQuests) {
      setClaimedQuests(student.claimedQuests);
    }
  }, [student?.id, student?.ownedShopIds, student?.equippedFrame, student?.equippedBadge, student?.claimedQuests]);

  const { setIsBackgroundModalOpen } = useBackground();

  // Listen to mobile bottom navbar tab switches
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (
        detail === 'path' ||
        detail === 'league' ||
        detail === 'shop' ||
        detail === 'profile' ||
        detail === 'games'
      ) {
        setActiveSection(detail);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('aurora-student-tab', handler);
    return () => window.removeEventListener('aurora-student-tab', handler);
  }, []);

  const fallbackStudent: Student = {
    id: 'guest',
    name: 'Mehmon',
    surname: 'Talaba',
    username: 'mehmon_dev',
    avatar: MALE_PROGRAMMER_AVATAR,
    phone: '+998 90 000 00 00',
    email: 'mehmon@devmaster.uz',
    stage: 'html',
    xp: 120,
    rank: 1,
    coins: 20,
    teacherId: 'ai-teacher-temur',
    completedLessons: [],
    lastActive: 'Hozir',
    joinedDate: '2026-10-27',
  };

  const currentStudent = student || fallbackStudent;
  const certificates = getStudentCertificates(currentStudent.id);

  // Gamified calculations from existing student data
  const completedCount = currentStudent.completedLessons?.length || 0;
  const studentStreak = Math.max(1, completedCount + 3);
  const currentLevel = Math.max(1, Math.floor((currentStudent.xp || 0) / 100) + 1);
  const xpInCurrentLevel = (currentStudent.xp || 0) % 100;

  const WEEK_DAYS = [
    { label: 'Du', active: true },
    { label: 'Se', active: true },
    { label: 'Chor', active: true },
    { label: 'Pay', active: completedCount >= 1 },
    { label: 'Ju', active: completedCount >= 2 },
    { label: 'Sha', active: completedCount >= 3 },
    { label: 'Yak', active: completedCount >= 5 },
  ];

  // Daily Quests derived from student activity
  const dailyQuests = [
    {
      id: 'quest-1-lesson',
      title: '1 ta darsni muvaffaqiyatli tugating',
      progress: Math.min(1, completedCount),
      target: 1,
      rewardXp: 30,
      rewardCoins: 5,
    },
    {
      id: 'quest-3-lessons',
      title: '3 ta dars testidan 70%+ ball oling',
      progress: Math.min(3, completedCount),
      target: 3,
      rewardXp: 60,
      rewardCoins: 10,
    },
    {
      id: 'quest-tryit-code',
      title: 'Try-It Studioda kodni ishga tushiring',
      progress: Math.min(1, ranCodeCount + (completedCount > 0 ? 1 : 0)),
      target: 1,
      rewardXp: 25,
      rewardCoins: 4,
    },
  ];

  const handleClaimQuest = (questId: string, rewardXp: number, rewardCoins: number) => {
    if (claimedQuests.includes(questId)) return;
    const nextClaimed = [...claimedQuests, questId];
    setClaimedQuests(nextClaimed);
    if (currentStudent.id && currentStudent.id !== 'guest') {
      updateStudent(currentStudent.id, {
        xp: (currentStudent.xp || 0) + rewardXp,
        coins: Number(((currentStudent.coins ?? 20) + rewardCoins).toFixed(2)),
        claimedQuests: nextClaimed,
      });
    }
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
      });
    } catch {
      // ignore
    }
  };

  // Achievements Wall (Nishonlar devori)
  const has100Percent =
    Object.values(currentStudent.quizScores || {}).some((s) => s === 100) ||
    testSubmissions.some((sub) => sub.studentId === currentStudent.id && sub.percentage === 100);

  const achievements = [
    {
      id: 'ach-first-test',
      title: 'Birinchi Test',
      desc: "Ilk dars yoki sinov testini muvaffaqiyatli topshirdingiz",
      icon: '🎯',
      unlocked: completedCount >= 1 || testSubmissions.length > 0,
    },
    {
      id: 'ach-7-streak',
      title: '7 Kun Streak 🔥',
      desc: 'Ketma-ket 7 kun davomida dars qilib olovni saqladingiz',
      icon: '🔥',
      unlocked: studentStreak >= 7,
    },
    {
      id: 'ach-100-score',
      title: '100% Mukammal Natija',
      desc: "Viktorina yoki imtihonda 100% to'liq natija qayd etdingiz",
      icon: '💎',
      unlocked: has100Percent,
    },
    {
      id: 'ach-10-lessons',
      title: '10 ta Dars Zabti',
      desc: "Yo'l xaritasida kamida 10 ta dars tugunini ochdingiz",
      icon: '🚀',
      unlocked: completedCount >= 10,
    },
    {
      id: 'ach-coin-master',
      title: 'Tanga Kolleksioneri',
      desc: "Hisobingizda 30 va undan ko'p tanga jamg'ardingiz",
      icon: '🪙',
      unlocked: (currentStudent.coins ?? 0) >= 30,
    },
    {
      id: 'ach-certified',
      title: 'Diplomli Dasturchi',
      desc: 'Rasmiy DevMaster QR-kodli sertifikatiga ega bo‘ldingiz',
      icon: '🎓',
      unlocked: certificates.length > 0,
    },
  ];

  // Interests & Leaderboard Data
  const PRESET_INTEREST_OPTIONS = [
    '💻 Frontend (React & TS)',
    '🎨 UI/UX Dizayn & Figma',
    '🤖 AI & Neyrotarmoqlar',
    '🎮 Game Development',
    '🛡️ Kiberxavfsizlik',
    '📱 Mobil Ilovalar',
    '🐍 Python & Data Science',
    '⚡ Backend & Node.js',
    '🎌 Anime & Manga',
    '☕ Qahva & Tungi Kodlash',
  ];

  // Boshlang'ich demo o'quvchilar olib tashlandi — faqat bazadagi haqiqiy o'quvchilar ko'rinadi
  const DEFAULT_TOP_TALENTS: Student[] = [];

  const [studentInterests, setStudentInterests] = useState<string[]>(
    currentStudent.interests && currentStudent.interests.length > 0
      ? currentStudent.interests
      : ['💻 Frontend (React & TS)', '🤖 AI & Neyrotarmoqlar', '☕ Qahva & Tungi Kodlash']
  );
  const [showInterestsModal, setShowInterestsModal] = useState<boolean>(false);
  const [customInterestInput, setCustomInterestInput] = useState<string>('');
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  const [allStudentsList, setAllStudentsList] = useState<Student[]>(() => {
    try {
      return getStudents();
    } catch {
      return [];
    }
  });

  const handleToggleInterest = (tag: string) => {
    setStudentInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 8 ? [...prev, tag] : prev
    );
  };

  const handleAddCustomInterest = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = customInterestInput.trim();
    if (!clean) return;
    if (!studentInterests.includes(clean) && studentInterests.length < 8) {
      setStudentInterests((prev) => [...prev, clean]);
    }
    setCustomInterestInput('');
  };

  const handleSaveInterests = () => {
    if (currentStudent && currentStudent.id) {
      updateStudent(currentStudent.id, { interests: studentInterests });
      setAllStudentsList(getStudents());
    }
    try {
      confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    setShowInterestsModal(false);
  };

  // Sorted full leaderboard for Podium + List
  const sortedLeaderboard: Student[] = (() => {
    const map = new Map<string, Student>();
    DEFAULT_TOP_TALENTS.forEach((t) => map.set(t.id, t));
    allStudentsList.forEach((s) => map.set(s.id, s));

    if (currentStudent && currentStudent.id) {
      const existing = map.get(currentStudent.id) || currentStudent;
      map.set(currentStudent.id, {
        ...existing,
        name: currentStudent.name,
        surname: currentStudent.surname,
        username: currentStudent.username,
        stage: currentStudent.stage,
        xp: currentStudent.xp,
        coins: currentStudent.coins ?? 20,
        interests: studentInterests,
      });
    }

    return Array.from(map.values()).sort((a, b) => (b.xp || 0) - (a.xp || 0));
  })();

  const handleBuyOrEquipShopItem = (item: ShopItem) => {
    const isRepeatable = item.category === 'xp_boost' || item.category === 'study_tool';
    const alreadyOwned = ownedShopIds.includes(item.id);

    if (alreadyOwned && !isRepeatable) {
      if (item.category === 'frame') {
        setEquippedFrame(item.preview);
        if (currentStudent.id && currentStudent.id !== 'guest') {
          updateStudent(currentStudent.id, { equippedFrame: item.preview });
        }
      } else if (item.category === 'avatar') {
        setEquippedBadge(item.preview);
        if (currentStudent.id && currentStudent.id !== 'guest') {
          updateStudent(currentStudent.id, { equippedBadge: item.preview });
        }
      }
      setShopNotice(`"${item.title}" profilingizga taqildi!`);
      setTimeout(() => setShopNotice(null), 2500);
      return;
    }

    const currentCoins = currentStudent.coins ?? 20;
    if (currentCoins < item.price) {
      setShopNotice(
        `Tangalar yetarli emas! "${item.title}" uchun yana ${(item.price - currentCoins).toFixed(1)} 🪙 tanga kerak.`
      );
      setTimeout(() => setShopNotice(null), 3000);
      return;
    }

    const updatedCoins = Number((currentCoins - item.price).toFixed(2));
    let nextXp = currentStudent.xp || 0;
    let nextCompleted = [...(currentStudent.completedLessons || [])];
    let nextStage: CourseStage = currentStudent.stage;
    let customMessage = `Tabriklaymiz! "${item.title}" xarid qilindi!`;

    if (item.xpBonus) {
      nextXp += item.xpBonus;
      customMessage = `🎉 "${item.title}" faollashdi! Hisobingizga +${item.xpBonus} XP qo'shildi!`;
    }

    if (item.actionType === 'unlock_1_lesson' || item.actionType === 'unlock_3_lessons' || item.actionType === 'unlock_5_lessons') {
      const countToUnlock =
        item.actionType === 'unlock_5_lessons' ? 5 : item.actionType === 'unlock_3_lessons' ? 3 : 1;
      const stageLessons = LESSONS.filter((l) => l.stage === currentStudent.stage);
      const uncompleted = stageLessons.filter((l) => !nextCompleted.includes(l.id));
      const unlockedNow = uncompleted.slice(0, countToUnlock);
      unlockedNow.forEach((l) => {
        if (!nextCompleted.includes(l.id)) nextCompleted.push(l.id);
      });
      nextXp += unlockedNow.length * 30;
      customMessage =
        unlockedNow.length > 0
          ? `🔓 ${unlockedNow.length} ta dars ochildi va +${unlockedNow.length * 30} XP berildi!`
          : `Joriy bosqichdagi barcha darslar allaqachon ochilgan! Sizga +50 bonus XP berildi!`;
      if (unlockedNow.length === 0) nextXp += 50;
    } else if (
      item.actionType === 'stage_exam_html' ||
      item.actionType === 'stage_exam_css' ||
      item.actionType === 'stage_exam_js'
    ) {
      const examStage: CourseStage =
        item.actionType === 'stage_exam_html'
          ? 'html'
          : item.actionType === 'stage_exam_css'
          ? 'css'
          : 'javascript';
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
    } else if (item.actionType === 'streak_shield_1') {
      nextXp += 30;
      customMessage = `🛡️ 1 kunlik Streak Himoya Qalqoni yoqildi va +30 XP qo'shildi!`;
    } else if (item.actionType === 'streak_shield_7') {
      nextXp += 120;
      customMessage = `💠 7 kunlik Olmos Streak Qalqoni yoqildi va +120 XP qo'shildi!`;
    } else if (item.actionType === 'stage_upgrade_boost') {
      if (currentStudent.stage === 'html') nextStage = 'css';
      else if (currentStudent.stage === 'css') nextStage = 'javascript';
      else nextStage = 'graduated';
      nextXp += 200;
      customMessage = `🚀 Tabriklaymiz! Siz ${nextStage.toUpperCase()} bosqichiga o'tdingiz va +200 XP oldingiz!`;
    }

    const nextOwned = alreadyOwned ? ownedShopIds : [...ownedShopIds, item.id];
    const nextEquippedFrame = item.category === 'frame' ? item.preview : equippedFrame;
    const nextEquippedBadge = item.category === 'avatar' ? item.preview : equippedBadge;

    if (!alreadyOwned) {
      setOwnedShopIds(nextOwned);
    }
    if (item.category === 'frame') {
      setEquippedFrame(nextEquippedFrame);
    } else if (item.category === 'avatar') {
      setEquippedBadge(nextEquippedBadge);
    }

    if (currentStudent.id && currentStudent.id !== 'guest') {
      updateStudent(currentStudent.id, {
        coins: updatedCoins,
        xp: nextXp,
        completedLessons: nextCompleted,
        stage: nextStage,
        ownedShopIds: nextOwned,
        equippedFrame: nextEquippedFrame,
        equippedBadge: nextEquippedBadge,
      });
      setAllStudentsList(getStudents());
    }

    setShopNotice(customMessage);
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#ffd23f', '#ff6b86', '#3ee6c4'],
      });
    } catch {
      // ignore
    }
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

  // Group lessons by stage for the Duolingo Zig-Zag Path
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

  const handleTriggerFocusModeFromDashboard = () => {
    if (isFocusMode) {
      setIsFocusMode(false);
      return;
    }
    if (!activeLesson) {
      const targetLesson =
        currentStageLessons.find((l) => !currentStudent.completedLessons.includes(l.id)) ||
        currentStageLessons[0] ||
        LESSONS[0];
      if (targetLesson) {
        setActiveLesson(targetLesson);
        setUserCode(targetLesson.starterCode);
        setConsoleOutput([]);
        setLessonMode('textbook');
      }
    }
    setIsFocusMode(true);
  };

  const handleRunCode = () => {
    if (!activeLesson) return;
    setIsCodeRunning(true);
    setConsoleOutput([]);
    setRanCodeCount((c) => c + 1);

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

  return (
    <div className="space-y-8 pb-14 relative">
      {/* Focus Mode Background Dimmer Overlay */}
      {isFocusMode && (
        <div
          onClick={() => setIsFocusMode(false)}
          className="fixed inset-0 z-40 bg-[#05040a]/90 backdrop-blur-lg transition-opacity duration-300"
           aria-hidden="true"
        />
      )}

      {/* 1. TOP GAMIFIED DASHBOARD HEADER & NAVIGATION TABS (NO HEARTS!) */}
      <div
        className={`aurora-card p-5 sm:p-7 transition-all duration-300 ${
          isFocusMode ? 'opacity-15 blur-[2px] pointer-events-none select-none' : ''
        }`}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Student Avatar with Equipped Shop Frame & Level */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-3xl p-1 ${equippedFrame}`}>
              <img
                src="/assets/aistudio/Generated_Image_October_29__2026_-_8_37PM_c011de34.jpg"
                alt={currentStudent.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-2xl object-cover"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912] font-mono text-[10px] font-extrabold shadow">
                LVL {currentLevel}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-display text-xl sm:text-2xl font-bold">
                  {currentStudent.name} {currentStudent.surname}
                </h1>
                <span className="text-xs font-mono text-[#ff8a3d] font-bold">
                  @{currentStudent.username} · { currentStudent.stage.toUpperCase() }
                </span>
              </div>
              <p className="text-xs opacity-75">
                Biriktirilgan murabbiy:{' '}
                <strong className="text-[#3ee6c4]">
                  {teacher ? `${teacher.name} ${teacher.surname}` : 'Ustoz Temur (AI)'}
                </strong>
              </p>

              {/* Level XP Progress Bar */}
              <div className="pt-1 max-w-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#3ee6c4] font-bold">{currentStudent.xp} XP</span>
                  <span className="opacity-70">Keyingi darajagacha: {100 - xpInCurrentLevel} XP</span>
                </div>
                <div className="w-48 sm:w-60 h-2.5 rounded-full aurora-surface-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] transition-all duration-300"
                    style={{ width: `${Math.max(8, xpInCurrentLevel)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Primary Gamified Navigation Tabs + Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <button
              type="button"
              onClick={() => setActiveSection('path')}
              className={`duo-btn text-xs !py-2.5 !px-4 ${
                activeSection === 'path' ? 'duo-btn-coral' : 'duo-btn-surface'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Yo&apos;l Xaritasi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('league')}
              className={`duo-btn text-xs !py-2.5 !px-4 ${
                activeSection === 'league' ? 'duo-btn-gold' : 'duo-btn-surface'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Liga &amp; Podium</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('shop')}
              className={`duo-btn text-xs !py-2.5 !px-4 ${
                activeSection === 'shop' ? 'duo-btn-mint' : 'duo-btn-surface'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Do&apos;kon ({Number(currentStudent.coins ?? 20).toFixed(0)} 🪙)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('profile')}
              className={`duo-btn text-xs !py-2.5 !px-4 ${
                activeSection === 'profile' ? 'duo-btn-lime' : 'duo-btn-surface'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Nishonlar ({achievements.filter((a) => a.unlocked).length}/{achievements.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('games')}
              className={`duo-btn text-xs !py-2.5 !px-4 ${
                activeSection === 'games' ? 'duo-btn-coral' : 'duo-btn-surface'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-[#b6f03c]" />
              <span>O&apos;yinlar &amp; Arena</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCyberArenaGame(true)}
              className="duo-btn duo-btn-mint text-xs !py-2.5 !px-4"
            >
              <Play className="w-4 h-4" />
              <span>Cyber Arena (60fps O&apos;yin)</span>
            </button>

            {onOpenTestIdModal && (
              <button
                type="button"
                onClick={() => onOpenTestIdModal()}
                className="duo-btn duo-btn-surface text-xs !py-2.5 !px-3.5"
              >
                <Target className="w-4 h-4 text-[#ff8a3d]" />
                <span>Test ID</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowGiftModal(true)}
              className="duo-btn duo-btn-surface text-xs !py-2.5 !px-3.5"
            >
              <Gift className="w-4 h-4 text-[#ffd23f]" />
              <span>3D Sovg&apos;a</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerFocusModeFromDashboard}
              title="Diqqat Rejimi — Orqa fonni xiralashtirib, dars matnini katta ekranda o'qish"
              className={`duo-btn text-xs !py-2.5 !px-4 ${
                isFocusMode ? 'duo-btn-mint' : 'duo-btn-surface'
              }`}
            >
              <Eye className="w-4 h-4 text-[#3ee6c4]" />
              <span>Diqqat Rejimi (Focus Mode)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN TWO-COLUMN GAMIFIED WORKSPACE */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all duration-300 ${
          isFocusMode ? 'opacity-15 blur-[2px] pointer-events-none select-none' : ''
        }`}
      >
        {/* LEFT / CENTER COLUMN (8 cols): Active Gamified Section */}
        <div className="lg:col-span-8 space-y-6">
          {/* ==================== SECTION 1: LEARNING PATH (YO'L XARITASI) ==================== */}
          {activeSection === 'path' && (
            <div className="space-y-6">
              {/* Path Toolbar: Track Filter + Search + ZigZag/Grid Switch */}
              <div className="aurora-card p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 p-1 rounded-2xl aurora-surface-2">
                    <button
                      type="button"
                      onClick={() => setPathDisplayMode('zigzag')}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-display font-bold transition-all cursor-pointer ${
                        pathDisplayMode === 'grid'
                          ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912]'
                          : 'opacity-75 hover:opacity-100'
                      }`}
                    >
                      Barcha 250 Dars
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="relative flex-1 min-w-[200px] max-w-xs">
                    <Search className="w-4 h-4 opacity-50 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        if (e.target.value.trim()) setPathDisplayMode('grid');
                      }}
                      placeholder="Mavzuni qidiring..."
                      className="w-full pl-9 pr-3 !min-h-[38px] !py-1.5 aurora-input text-xs"
                    />
                  </div>
                </div>

                {/* Stage filter buttons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
                        {isTrackLocked ? <Lock className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                        <span>{t.name}</span>
                        <span className="font-mono text-[10px] opacity-80">({t.count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Stage Barrier Exam Banner */}
              {canTakeAiStageExam && (
                <div className="aurora-card p-6 border-2 border-[#ffd23f] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#ffd23f]">
                      BOSQICH YAKUNLANDI
                    </span>
                    <h2 className="font-display text-lg sm:text-xl font-bold">
                      {STAGE_NAMES[currentStudent.stage]} barcha darslari tugatildi!
                    </h2>
                    <p className="text-xs opacity-80">
                      Keyingi bosqichga o&apos;tish uchun 1-martalik AI Bosqich Imtihonidan 87%+
                      natija oling.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleStartAiStageExam}
                    className="duo-btn duo-btn-gold text-xs sm:text-sm shrink-0"
                  >
                    <Bot className="w-4 h-4" />
                    <span>Bosqich Imtihonini Boshlash</span>
                  </button>
                </div>
              )}

              {/* MODE A: DUOLINGO ZIG-ZAG LEARNING PATH */}
              {pathDisplayMode === 'zigzag' ? (
                <div className="space-y-10">
                  {zigZagStages.map((stageKey) => {
                    const stageLessons = LESSONS.filter((l) => l.stage === stageKey).slice(0, 12);
                    const unlockedStage = isStageUnlocked(stageKey);
                    const stageTheme = STAGE_COLORS[stageKey] || STAGE_COLORS.html;
                    const completedInStage = stageLessons.filter((l) =>
                      currentStudent.completedLessons.includes(l.id)
                    ).length;

                    // Determine the first uncompleted lesson in an unlocked stage as the pulsing "CURRENT" node
                    const firstUncompletedId = unlockedStage
                      ? stageLessons.find((l) => !currentStudent.completedLessons.includes(l.id))?.id
                      : undefined;

                    return (
                      <div key={stageKey} className="aurora-card p-6 sm:p-8 space-y-8">
                        {/* Large Colored Stage Header Card */}
                        <div
                          className={`rounded-3xl p-5 sm:p-6 bg-gradient-to-r ${stageTheme.gradient} text-[#0a0912] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg`}
                        >
                          <div className="space-y-1">
                            <span className="font-mono text-xs font-extrabold uppercase tracking-wider opacity-80">
                              {unlockedStage ? 'Ochiq Bosqich' : 'Qulflangan Bosqich'} ·{' '}
                              {completedInStage}/{stageLessons.length} tugun
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

                        {/* Zig-Zag Nodes Trail */}
                        <div className="flex flex-col items-center space-y-7 py-4">
                          {stageLessons.map((lesson, idx) => {
                            const isCompleted = currentStudent.completedLessons.includes(lesson.id);
                            const isCurrent = lesson.id === firstUncompletedId;
                            const isLocked = !unlockedStage || (!isCompleted && !isCurrent && idx > 0 && !currentStudent.completedLessons.includes(stageLessons[idx - 1].id));

                            // Zig-zag horizontal offset pattern
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
                                {/* Floating BOSHLASH speech bubble on current node */}
                                {isCurrent && (
                                  <div className="mb-2 px-3.5 py-1 rounded-full bg-[#3ee6c4] text-[#0a0912] font-display text-xs font-extrabold tracking-wide shadow-lg animate-bounce">
                                    BOSHLASH · +{lesson.xpReward || 60} XP
                                  </div>
                                )}

                                {/* Circular 3D Node Button */}
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

                                {/* Node Title Caption */}
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
                                      : `+${lesson.xpReward || 60} XP`}
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
                /* MODE B: ALL 250 LESSONS GRID */
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                +{lesson.xpReward || 60} XP
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

          {/* ==================== SECTION 2: LEAGUE & WEEKLY PODIUM (LIGA / REYTING) ==================== */}
          {activeSection === 'league' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#ffd23f]">
                      OLTIN LIGA · HAFTALIK MUSOBAQA
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
                      Top-3 Haftalik Podium
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowInterestsModal(true)}
                    className="duo-btn duo-btn-surface text-xs"
                  >
                    <Tag className="w-4 h-4 text-[#ff6b86]" />
                    <span>Qiziqishlarimni Sozlash</span>
                  </button>
                </div>

                {/* Top-3 Podium Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
                  {/* 2nd Place */}
                  {sortedLeaderboard[1] && (
                    <div className="aurora-surface-2 rounded-3xl p-5 text-center space-y-3 order-2 md:order-1">
                      <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] font-display font-bold text-xl flex items-center justify-center mx-auto">
                        #2
                      </div>
                      <h3 className="font-display text-base font-bold">
                        {sortedLeaderboard[1].name} {sortedLeaderboard[1].surname}
                      </h3>
                      <p className="text-xs font-mono text-[#3ee6c4]">
                        @{sortedLeaderboard[1].username}
                      </p>
                      <div className="py-2 rounded-2xl aurora-card font-mono text-sm font-bold text-[#ffd23f]">
                        ⚡ {sortedLeaderboard[1].xp} XP
                      </div>
                    </div>
                  )}

                  {/* 1st Place with Golden Crown */}
                  {sortedLeaderboard[0] && (
                    <div className="aurora-card p-6 text-center space-y-3 border-2 border-[#ffd23f] shadow-[0_0_35px_rgba(255,210,63,0.28)] order-1 md:order-2 md:-translate-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] flex items-center justify-center mx-auto shadow-lg">
                        <Crown className="w-8 h-8 fill-current" />
                      </div>
                      <span className="text-[11px] font-mono font-extrabold text-[#ffd23f] block">
                        1-O&apos;RIN · LIGA CHEMPIONI
                      </span>
                      <h3 className="font-display text-lg font-bold">
                        {sortedLeaderboard[0].name} {sortedLeaderboard[0].surname}
                      </h3>
                      <p className="text-xs font-mono text-[#ff8a3d]">
                        @{sortedLeaderboard[0].username}
                      </p>
                      <div className="py-2.5 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] font-mono text-base font-extrabold">
                        ⚡ {sortedLeaderboard[0].xp} XP
                      </div>
                    </div>
                  )}

                  {/* 3rd Place */}
                  {sortedLeaderboard[2] && (
                    <div className="aurora-surface-2 rounded-3xl p-5 text-center space-y-3 order-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#ff8a3d]/20 text-[#ff8a3d] font-display font-bold text-xl flex items-center justify-center mx-auto">
                        #3
                      </div>
                      <h3 className="font-display text-base font-bold">
                        {sortedLeaderboard[2].name} {sortedLeaderboard[2].surname}
                      </h3>
                      <p className="text-xs font-mono text-[#ff8a3d]">
                        @{sortedLeaderboard[2].username}
                      </p>
                      <div className="py-2 rounded-2xl aurora-card font-mono text-sm font-bold text-[#ffd23f]">
                        ⚡ {sortedLeaderboard[2].xp} XP
                      </div>
                    </div>
                  )}
                </div>

                {/* Full Ranked List with Up/Down Arrows & Highlighted Current User */}
                <div className="space-y-2.5 pt-4">
                  {sortedLeaderboard.map((st, idx) => {
                    const isMe =
                      st.id === currentStudent.id || st.username === currentStudent.username;
                    const isRising = idx % 2 === 0;

                    return (
                      <div
                        key={st.id || idx}
                        className={`p-4 rounded-2xl flex items-center justify-between gap-4 transition-all ${
                          isMe
                            ? 'aurora-card border-2 border-[#ff6b86] bg-[#ff6b86]/10'
                            : 'aurora-surface-2'
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <span className="font-mono text-sm font-bold w-7 text-center">
                            #{idx + 1}
                          </span>
                          {isRising ? (
                            <ArrowUp className="w-4 h-4 text-[#b6f03c] shrink-0" />
                          ) : (
                            <ArrowDown className="w-4 h-4 text-[#ff6b86] shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-display font-bold text-sm truncate">
                                {st.name} {st.surname}
                              </span>
                              {isMe && (
                                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full bg-[#ff6b86] text-[#0a0912]">
                                  SIZ
                                </span>
                              )}
                            </div>
                            <span className="text-xs opacity-70 font-mono">
                              @{st.username} · {st.stage.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0 font-mono">
                          <span className="text-sm font-bold text-[#3ee6c4] block tabular-nums">
                            {st.xp || 0} XP
                          </span>
                          <span className="text-[11px] text-[#ffd23f] tabular-nums">
                            {Number(st.coins ?? 20).toFixed(0)} tanga
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== SECTION 3: COIN SHOP (40 TA FOYDALI MAHSULOT) ==================== */}
          {activeSection === 'shop' && (
            <div className="aurora-card p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[#3ee6c4]">
                    AURORA DO&apos;KONI · {SHOP_ITEMS.length} TA MAHSULOT
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
                    Tangalar Do&apos;koni: XP, Dars Kalitlari, Imtihon va Ramkalar
                  </h2>
                  <p className="text-xs opacity-75 mt-1">
                    Faol unvoningiz: <span className="font-bold text-[#ffd23f]">{equippedBadge}</span> · Har bir xarid shu saytdagi o&apos;qishingiz va darajangizga bevosita yordam beradi
                  </p>
                </div>
                <div className="px-4 py-2.5 rounded-2xl aurora-surface-2 flex items-center gap-2 font-mono text-sm font-bold text-[#ffd23f] shrink-0">
                  <Coins className="w-5 h-5" />
                  <span>Balans: {Number(currentStudent.coins ?? 20).toFixed(1)} 🪙</span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {(
                  [
                    { id: 'all', label: `Barchasi (${SHOP_ITEMS.length})` },
                    { id: 'xp_boost', label: '⚡ XP va Daraja Paketlari (10)' },
                    { id: 'study_tool', label: '🔑 Dars & Imtihon Kalitlari (10)' },
                    { id: 'frame', label: '🖼️ Profil Ramkalari (10)' },
                    { id: 'avatar', label: '👑 Dasturchi Unvonlari (10)' },
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
                  const isOwned = ownedShopIds.includes(item.id);
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
                        <div
                          className={`w-14 h-14 rounded-2xl aurora-card flex items-center justify-center text-2xl shrink-0 ${
                            item.category === 'frame' ? item.preview : ''
                          }`}
                        >
                          {item.category === 'frame' ? '🖼️' : item.preview}
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-display text-base font-bold">{item.title}</h3>
                          <p className="text-xs opacity-75 leading-relaxed">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#ff6b86]/15">
                        <span className="font-mono text-xs font-bold text-[#ffd23f]">
                          {!isRepeatable && isOwned ? 'Sotib olingan' : `${item.price} 🪙 tanga`}
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
                            ? `Olish (${item.price} 🪙)`
                            : `Xarid Qilish (${item.price} 🪙)`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ==================== SECTION 4: ACHIEVEMENTS WALL & CERTIFICATES ==================== */}
          {activeSection === 'profile' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-[#b6f03c]">
                    YUTUQLAR DEVORI
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mt-0.5">
                    Nishonlar va Mukofotlar
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((ach) => (
                    <button
                      key={ach.id}
                      type="button"
                      onClick={() => setSelectedAchievement(ach)}
                      className={`p-5 rounded-3xl text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                        ach.unlocked
                          ? 'aurora-card border-2 border-[#ffd23f]'
                          : 'aurora-surface-2 opacity-50 grayscale'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl aurora-surface-2 flex items-center justify-center text-2xl">
                        {ach.icon}
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold">{ach.title}</h3>
                        <p className="text-xs opacity-75 mt-1 leading-relaxed">{ach.desc}</p>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold ${
                          ach.unlocked ? 'text-[#b6f03c]' : 'opacity-60'
                        }`}
                      >
                        {ach.unlocked ? '★ Ochildi!' : 'Qulflangan'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Official Certificates Box */}
              <div className="aurora-card p-6 sm:p-8 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-bold">
                      Rasmiy PDF Sertifikatlar ({certificates.length} ta)
                    </h3>
                    <p className="text-xs opacity-75">
                      Bosqichlarni va Final imtihonini yakunlab QR-kodli sertifikatni yuklab oling
                    </p>
                  </div>
                  {onOpenFinalExamModal && (
                    <button
                      type="button"
                      onClick={onOpenFinalExamModal}
                      className="duo-btn duo-btn-coral text-xs"
                    >
                      <Award className="w-4 h-4" />
                      <span>Final Imtihon (100%)</span>
                    </button>
                  )}
                </div>

                {certificates.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-2">
                    {certificates.map((cert) => (
                      <button
                        key={cert.id}
                        type="button"
                        onClick={() => setViewingCertificate(cert)}
                        className="duo-btn duo-btn-gold text-xs"
                      >
                        <Award className="w-4 h-4" />
                        <span>{cert.title} Sertifikati</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== SECTION 5: INTERACTIVE GAMES & CYBER CODE ARENA ==================== */}
          {activeSection === 'games' && (
            <div className="space-y-6">
              {/* Hero Launch Card for Full-Viewport 60fps Cyber Code Arena */}
              <div className="aurora-card p-6 sm:p-8 border-2 border-[#3ee6c4] relative overflow-hidden space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono font-extrabold text-[#b6f03c] uppercase">
                      YANGI 60FPS ARKADA O&apos;YINI · FULL-SCREEN GAME SHELL
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold">
                      Cyber Code Arena: Syntax Defender
                    </h2>
                    <p className="text-xs sm:text-sm opacity-85 max-w-xl leading-relaxed">
                      Dasturlash xatolarini (<code className="text-[#ff6b86]">NaN</code>,{' '}
                      <code className="text-[#ffd23f]">404</code>,{' '}
                      <code className="text-[#ff8a3d]">LOOP()</code>) yo&apos;q qilib, yerga tushgan{' '}
                      <strong>HTML · CSS · JS</strong> kristallarini tering. Yig&apos;ilgan har bir
                      kristal profilingizga haqiqiy <strong>XP</strong> va <strong>🪙 Tanga</strong> qo&apos;shadi!
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCyberArenaGame(true)}
                    className="duo-btn duo-btn-mint text-sm sm:text-base !py-4 !px-7 shrink-0"
                  >
                    <Gamepad2 className="w-5 h-5" />
                    <span>🚀 O&apos;yinni To&apos;liq Ekranda Boshlash</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="aurora-surface-2 p-3.5 rounded-2xl text-xs font-mono">
                    <span className="opacity-65 block">Boshqaruv</span>
                    <strong className="text-[#ffd23f]">WASD + Space + Shift</strong>
                  </div>
                  <div className="aurora-surface-2 p-3.5 rounded-2xl text-xs font-mono">
                    <span className="opacity-65 block">To&apos;lqinlar</span>
                    <strong className="text-[#3ee6c4]">5 Bosqich + Cheksiz</strong>
                  </div>
                  <div className="aurora-surface-2 p-3.5 rounded-2xl text-xs font-mono">
                    <span className="opacity-65 block">Mukofot</span>
                    <strong className="text-[#b6f03c]">Haqiqiy XP va 🪙 Tanga</strong>
                  </div>
                  <div className="aurora-surface-2 p-3.5 rounded-2xl text-xs font-mono">
                    <span className="opacity-65 block">Rekord Ball</span>
                    <strong className="text-[#ff6b86]">
                      {currentStudent.gameScores?.['Cyber Code Arena'] || 0} ball
                    </strong>
                  </div>
                </div>
              </div>

              {/* Coding Mini-Games Suite */}
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
                    css: currentStudent.stage === 'javascript' || currentStudent.stage === 'graduated',
                    js: currentStudent.stage === 'graduated',
                  },
                }}
                onUpdateAccount={(updatedAcc) => {
                  if (currentStudent.id !== 'guest') {
                    const diff = Math.max(0, (updatedAcc.xp || 0) - (currentStudent.xp || 0));
                    if (diff > 0) {
                      addXpToStudent(currentStudent.id, diff);
                    }
                    const nextCoins = Number(((currentStudent.coins ?? 20) + 2).toFixed(1));
                    updateStudent(currentStudent.id, { coins: nextCoins });
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR COLUMN (4 cols): Daily Streak 🔥, Daily Quests, Mascot & Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. KUNLIK STREAK CARD 🔥 */}
          <div className="aurora-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#ff8a3d]/20 text-[#ff8a3d] flex items-center justify-center">
                  <Flame className="w-7 h-7 fill-[#ff8a3d]" />
                </div>
                <div>
                  <span className="font-display font-mono text-2xl font-bold text-[#ff8a3d] block leading-none">
                    {studentStreak} kunlik streak
                  </span>
                  <span className="text-xs opacity-75">Ketma-ket faol o&apos;quv kunlari</span>
                </div>
              </div>
            </div>

            {/* Weekly Day Circles (Du-Se-Chor-Pay-Ju-Sha-Yak) */}
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

            {/* Streak Reminder Banner */}
            <div className="aurora-surface-2 p-3.5 rounded-2xl text-xs leading-relaxed">
              <strong className="text-[#ffd23f]">Eslatma:</strong> Streak uzilmasligi uchun har
              kuni kamida 1 ta dars yoki viktorina mashqini bajaring!
            </div>
          </div>

          {/* 2. DAILY QUESTS (KUNLIK VAZIFALAR) */}
          <div className="aurora-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold flex items-center gap-2">
                <Target className="w-5 h-5 text-[#3ee6c4]" />
                <span>Kunlik Vazifalar</span>
              </h3>
              <span className="font-mono text-xs text-[#ffd23f]">Har kuni yangilanadi</span>
            </div>

            <div className="space-y-3.5">
              {dailyQuests.map((q) => {
                const pct = Math.min(100, Math.round((q.progress / q.target) * 100));
                const isDone = q.progress >= q.target;
                const isClaimed = claimedQuests.includes(q.id);

                return (
                  <div key={q.id} className="aurora-surface-2 p-4 rounded-2xl space-y-2.5">
                    <div className="flex items-start justify-between gap-2 text-xs">
                      <span className="font-bold">{q.title}</span>
                      <span className="font-mono text-[#ffd23f] shrink-0">
                        +{q.rewardXp} XP · +{q.rewardCoins} 🪙
                      </span>
                    </div>

                    <div className="w-full h-2.5 rounded-full bg-black/25 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="opacity-75">
                        Jarayon: {q.progress} / {q.target}
                      </span>
                      {isDone && !isClaimed && (
                        <button
                          type="button"
                          onClick={() => handleClaimQuest(q.id, q.rewardXp, q.rewardCoins)}
                          className="px-3 py-1 rounded-xl bg-[#b6f03c] text-[#0a0912] font-bold cursor-pointer animate-bounce"
                        >
                          Mukofotni Olish!
                        </button>
                      )}
                      {isClaimed && <span className="text-[#b6f03c] font-bold">✓ Olingan</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. MASCOT ENCOURAGEMENT & QUICK TOOLS */}
          <div className="aurora-card p-6 space-y-4">
            <AuroraMascot
              mood="happy"
              size="md"
              message="Savolingiz bormi? Yordamchi AI tugmasini bosing yoki Guruh Chatida ustoz bilan bog'laning!"
            />

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              {onOpenGroupChat && (
                <button
                  type="button"
                  onClick={() => onOpenGroupChat(teacher?.id || 't-1')}
                  className="duo-btn duo-btn-surface text-xs !py-2.5 !px-3"
                >
                  <MessageSquare className="w-4 h-4 text-[#3ee6c4]" />
                  <span>Guruh Chati</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setIsBackgroundModalOpen(true)}
                className="duo-btn duo-btn-surface text-xs !py-2.5 !px-3"
              >
                <Palette className="w-4 h-4 text-[#ff6b86]" />
                <span>Orqa Fon</span>
              </button>

              <button
                type="button"
                onClick={() => setShowCyberArenaGame(true)}
                className="duo-btn duo-btn-surface text-xs !py-2.5 !px-3"
              >
                <Gamepad2 className="w-4 h-4 text-[#b6f03c]" />
                <span>Cyber O&apos;yin</span>
              </button>

              {onOpenGeminiStudio && (
                <button
                  type="button"
                  onClick={onOpenGeminiStudio}
                  className="duo-btn duo-btn-surface text-xs !py-2.5 !px-3"
                >
                  <Bot className="w-4 h-4 text-[#ffd23f]" />
                  <span>AI Studiya</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
                      {isFocusMode && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#3ee6c4]/20 border border-[#3ee6c4]/50 text-[#3ee6c4] font-mono text-[10px] font-extrabold uppercase shrink-0">
                          Focus Mode Faol
                        </span>
                      )}
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
                  title={
                    isFocusMode
                      ? 'Diqqat rejimidan chiqish'
                      : "Diqqat Rejimi (Focus Mode) — Matnni kengaytirish va chalg'ituvchi elementlarni yashirish"
                  }
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
                      <span>Diqqat Rejimi (Focus Mode)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setQuizLesson(activeLesson)}
                  className="duo-btn duo-btn-coral text-xs !py-2 !px-4 w-full sm:w-auto"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Viktorina (+{activeLesson.xpReward || 60} XP)</span>
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
                <span>W3Schools To&apos;liq Darslik (700+ so&apos;z)</span>
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
                <span>Yordamchi AI</span>
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
                        W3SCHOOLS RASMIY DASTURI (EN + UZ)
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
                      const bodyPart = hasHeading ? paragraph.slice(colonIdx + 1).trim() : paragraph;

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

                  {activeLesson.syntaxBreakdown && activeLesson.syntaxBreakdown.length > 0 && (
                    <div className="aurora-surface-2 p-5 rounded-2xl space-y-3">
                      <h4 className="font-display text-sm font-bold text-[#3ee6c4]">
                        Sintaksis va Kalit Tushunchalar:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeLesson.syntaxBreakdown.map((item, idx) => (
                          <div key={idx} className="aurora-card p-3.5 space-y-1">
                            <span className="text-xs font-mono font-bold text-[#ffd23f] block">
                              {item.term}
                            </span>
                            <p className="text-xs opacity-85">{item.meaning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

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
                        Kamida 70% to&apos;plab +{activeLesson.xpReward || 60} XP va +2.5 tanga
                        yutib oling.
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

      {/* Floating Yordamchi AI Widget */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40">
        {!showFloatingAi ? (
          <button
            type="button"
            onClick={() => setShowFloatingAi(true)}
            className="duo-btn duo-btn-coral text-xs sm:text-sm"
          >
            <Bot className="w-5 h-5" />
            <span>AI Mentor</span>
            <span className="font-mono text-xs">🪙 {Number(currentStudent.coins ?? 20).toFixed(0)}</span>
          </button>
        ) : (
          <div className="w-[340px] sm:w-[410px] h-[510px] aurora-card overflow-hidden shadow-2xl">
            <StudentAiAssistant
              currentLessonTitle={STAGE_NAMES[currentStudent.stage]}
              currentLessonStage={currentStudent.stage}
              student={currentStudent}
              onClose={() => setShowFloatingAi(false)}
              onStartStageExam={(exam) => {
                setShowFloatingAi(false);
                if (onOpenTestIdModal) onOpenTestIdModal(exam.id);
              }}
            />
          </div>
        )}
      </div>

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
                YANGI BOSQICH ZABT ETILDI!
              </span>
              <h2 className="font-display text-3xl font-bold mt-1">
                LEVEL UP! Daraja {levelUpModal.level}
              </h2>
              <p className="text-xs opacity-80 mt-1">
                Siz +{levelUpModal.xpEarned} XP va +2.5 tanga mukofot oldingiz!
              </p>
            </div>
            <button
              type="button"
              onClick={() => setLevelUpModal(null)}
              className="w-full duo-btn duo-btn-gold text-sm"
            >
              <span>Ajoyib, Davom Etish!</span>
            </button>
          </div>
        </div>
      )}

      {/* ACHIEVEMENT POPUP MODAL */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-sm w-full p-7 text-center space-y-4 animate-aurora-pop">
            <div className="w-20 h-20 rounded-3xl aurora-surface-2 flex items-center justify-center text-4xl mx-auto">
              {selectedAchievement.icon}
            </div>
            <h3 className="font-display text-xl font-bold">{selectedAchievement.title}</h3>
            <p className="text-xs opacity-80 leading-relaxed">{selectedAchievement.desc}</p>
            <div className="py-2 rounded-xl aurora-surface-2 font-mono text-xs font-bold text-[#ffd23f]">
              {selectedAchievement.unlocked ? '★ Siz bu nishonni ochgansiz!' : 'Hali qulflangan'}
            </div>
            <button
              type="button"
              onClick={() => setSelectedAchievement(null)}
              className="w-full duo-btn duo-btn-coral text-xs"
            >
              <span>Yopish</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D GIFT MODAL */}
      <ThreeGiftModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        studentName={`${currentStudent.name} ${currentStudent.surname}`}
        studentEmail={currentStudent.email || `${currentStudent.username}@devmaster.uz`}
      />

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

      {/* INTERESTS MODAL */}
      {showInterestsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ff6b86]/20">
              <h3 className="font-display text-lg font-bold">Qiziqishlarimni Sozlash</h3>
              <button
                type="button"
                onClick={() => setShowInterestsModal(false)}
                className="p-1.5 rounded-xl aurora-surface-2 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto p-1">
              {PRESET_INTEREST_OPTIONS.map((opt) => {
                const isSelected = studentInterests.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggleInterest(opt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912]'
                        : 'aurora-surface-2'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleAddCustomInterest} className="flex gap-2">
              <input
                type="text"
                value={customInterestInput}
                onChange={(e) => setCustomInterestInput(e.target.value)}
                placeholder="Yangi qiziqish qo'shish..."
                className="flex-1 aurora-input text-xs"
              />
              <button type="submit" className="duo-btn duo-btn-surface text-xs">
                Qo&apos;shish
              </button>
            </form>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowInterestsModal(false)}
                className="duo-btn duo-btn-surface text-xs"
              >
                Bekor qilish
              </button>
              <button
                type="button"
                onClick={handleSaveInterests}
                className="duo-btn duo-btn-mint text-xs"
              >
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Viewport 60fps Cyber Code Arena Game Shell */}
      {showCyberArenaGame && (
        <CyberCodeArenaGame
          studentName={`${currentStudent.name} ${currentStudent.surname}`}
          onClose={() => setShowCyberArenaGame(false)}
          onAwardRewards={(xpEarned, coinsEarned, score) => {
            if (currentStudent.id !== 'guest') {
              if (xpEarned > 0) {
                addXpToStudent(currentStudent.id, xpEarned);
              }
              const prevBest = currentStudent.gameScores?.['Cyber Code Arena'] || 0;
              const nextCoins = Number(((currentStudent.coins ?? 20) + coinsEarned).toFixed(1));
              updateStudent(currentStudent.id, {
                coins: nextCoins,
                gameScores: {
                  ...(currentStudent.gameScores || {}),
                  'Cyber Code Arena': Math.max(prevBest, score),
                },
              });
            }
            setShopNotice(
              `🏆 Cyber Code Arena yakunlandi! Profilingizga +${xpEarned} XP va +${coinsEarned} 🪙 tanga qo'shildi!`
            );
          }}
        />
      )}
    </div>
  );
};
