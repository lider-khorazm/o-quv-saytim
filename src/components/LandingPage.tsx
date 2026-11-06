import React, { useState } from 'react';
import {
  Award,
  KeyRound,
  CheckCircle2,
  Code2,
  Play,
  Flame,
  Coffee,
  Terminal,
  Zap,
  LogIn,
  UserPlus,
  Youtube,
  Coins,
  Gamepad2,
  Bot,
  Trophy,
  Lock,
  Star,
  Sparkles,
  Compass,
  Quote,
  Upload,
  Send,
  Bug,
  Lightbulb,
  ArrowLeft,
  Image as ImageIcon,
  Video,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OWNER_PROFILE, INITIAL_TEACHERS } from '../data/mockData';
import { Student, Teacher } from '../types';
import { MALE_PROGRAMMER_AVATAR, addFeedbackReport } from '../services/storage';
import { AuroraMascot } from './AuroraMascot';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onOpenTestIdModal: () => void;
  onOpen3DGame?: () => void;
  onOpenGeminiStudio?: () => void;
  students?: Student[];
  teachers?: Teacher[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenRegister,
  onOpenTestIdModal,
  onOpen3DGame,
  onOpenGeminiStudio,
  students = [],
  teachers = INITIAL_TEACHERS,
}) => {
  const [userCode, setUserCode] = useState('<button class="duo-btn">Salom, Dunyo!</button>');
  const [challengeSolved, setChallengeSolved] = useState(false);
  const [challengeError, setChallengeError] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  // Xatoliklar (Bug) yoki G'oyalarni (Takliflarni) Kiritish Formasi State
  const [fbFirstName, setFbFirstName] = useState('');
  const [fbLastName, setFbLastName] = useState('');
  const [fbContact, setFbContact] = useState('');
  const [fbType, setFbType] = useState<'bug' | 'suggestion'>('bug');
  const [fbMessage, setFbMessage] = useState('');
  const [fbMediaUrl, setFbMediaUrl] = useState<string | undefined>(undefined);
  const [fbMediaType, setFbMediaType] = useState<'image' | 'video' | undefined>(undefined);
  const [fbMediaName, setFbMediaName] = useState<string | undefined>(undefined);
  const [fbSubmittedType, setFbSubmittedType] = useState<'bug' | 'suggestion' | null>(null);
  const [fbError, setFbError] = useState<string | null>(null);

  const handleFeedbackMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFbMediaUrl(reader.result);
        setFbMediaType(isVideo ? 'video' : 'image');
        setFbMediaName(file.name);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fbFirstName.trim() || !fbLastName.trim() || !fbContact.trim() || !fbMessage.trim()) {
      setFbError("Iltimos, ism, familiya, bog'lanish manzili va xabar matnini to'liq kiriting!");
      return;
    }
    setFbError(null);
    addFeedbackReport({
      firstName: fbFirstName,
      lastName: fbLastName,
      contact: fbContact,
      type: fbType,
      message: fbMessage,
      mediaUrl: fbMediaUrl,
      mediaType: fbMediaType,
      mediaName: fbMediaName,
    });
    setFbSubmittedType(fbType);
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.7 },
      });
    } catch {}
  };

  const handleResetFeedbackForm = () => {
    setFbSubmittedType(null);
    setFbFirstName('');
    setFbLastName('');
    setFbContact('');
    setFbMessage('');
    setFbMediaUrl(undefined);
    setFbMediaType(undefined);
    setFbMediaName(undefined);
    setFbError(null);
  };

  const handleTestChallenge = () => {
    if (
      userCode.toLowerCase().includes('<button') &&
      userCode.toLowerCase().includes('</button>')
    ) {
      setChallengeSolved(true);
      setChallengeError(false);
      setChallengeFeedback(
        "Ajoyib! Siz birinchi HTML tugmangizni yaratdingiz va +25 XP mashq mukofotini ochdingiz!"
      );
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.65 },
          colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
        });
      } catch {
        // ignore
      }
    } else {
      setChallengeSolved(false);
      setChallengeError(true);
      setChallengeFeedback("Kodni tekshiring: <button>...</button> tegini to'liq yozing.");
      setTimeout(() => setChallengeError(false), 450);
    }
  };

  const totalStudentsCount = Math.max(students.length, 48);
  const totalLessonsCompleted =
    students.reduce((acc, s) => acc + (s.completedLessons?.length || 0), 0) + 320;

  return (
    <div className="space-y-16 py-4">
      {/* 1. AURORA SUNSET GAMIFIED HERO */}
      <section className="relative overflow-hidden aurora-card p-6 sm:p-12 lg:p-14">
        {/* Moving Aurora Glow Orbs */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff6b86 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #3ee6c4 0%, transparent 70%)' }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Column: Headline + 2 Primary CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#ff8a3d]">
              <Flame className="w-4 h-4 fill-[#ff8a3d]" />
              <span>Har kuni 15 daqiqa o&apos;ynab dasturlashni o&apos;rganing</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#3ee6c4]">HTML · CSS · JavaScript</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] [text-wrap:balance]">
              Dasturlashni{' '}
              <span className="bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] bg-clip-text text-transparent">
                huddi o&apos;yin kabi
              </span>{' '}
              maroqli zabt eting!
            </h1>

            <p className="text-sm sm:text-base opacity-85 leading-relaxed max-w-2xl">
              Zerikarli ma&apos;ruzalarsiz! Zig-zag o&apos;quv xaritasi bo&apos;ylab qadam tashlang,
              kunlik streak olovini yoqing, tangalar to&apos;plang, ustozingiz guruhida bellashing
              va rasmiy PDF sertifikatga ega bo&apos;ling.
            </p>

            {/* Primary 2 Duolingo-style CTAs + Quick Test ID */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenRegister}
                className="duo-btn duo-btn-coral text-sm sm:text-base !px-7 !py-3.5"
              >
                <UserPlus className="w-5 h-5" />
                <span>Bepul Boshlash (+20 Tanga)</span>
              </button>

              <button
                type="button"
                onClick={onOpenLogin}
                className="duo-btn duo-btn-surface text-sm sm:text-base !px-6 !py-3.5"
              >
                <LogIn className="w-5 h-5 text-[#3ee6c4]" />
                <span>Menda Hisob Bor</span>
              </button>

              <button
                type="button"
                onClick={onOpenTestIdModal}
                className="duo-btn duo-btn-gold text-xs sm:text-sm !px-4 !py-3"
              >
                <KeyRound className="w-4 h-4" />
                <span>Test ID Topshirish</span>
              </button>
            </div>

            {/* Extra Feature Launchers */}
            {(onOpen3DGame || onOpenGeminiStudio) && (
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                {onOpen3DGame && (
                  <button
                    type="button"
                    onClick={onOpen3DGame}
                    className="duo-btn duo-btn-surface !py-2 !px-3.5 text-xs"
                  >
                    <Gamepad2 className="w-4 h-4 text-[#b6f03c]" />
                    <span>3D Kod O&apos;yini</span>
                  </button>
                )}
                {onOpenGeminiStudio && (
                  <button
                    type="button"
                    onClick={onOpenGeminiStudio}
                    className="duo-btn duo-btn-surface !py-2 !px-3.5 text-xs"
                  >
                    <Bot className="w-4 h-4 text-[#3ee6c4]" />
                    <span>AI Mentor &amp; Qidiruv</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Hero Column: Mascot & Interactive Learning Path Preview */}
          <div className="lg:col-span-5 flex flex-col items-center space-y-6">
            <AuroraMascot
              mood="excited"
              size="lg"
              message="Salom! Men Kodikman. Bugun 1-darsni boshlab +50 XP va 20 tanga yutib olamizmi?"
            />

            {/* Mini Zig-Zag Path Preview Card */}
            <div className="w-full max-w-sm aurora-surface-2 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-[#ff8a3d] flex items-center gap-1.5">
                  <Compass className="w-4 h-4" /> 1-Bo&apos;lim: HTML Poydevori
                </span>
                <span className="font-mono text-[#ffd23f]">🔥 7 kun streak</span>
              </div>

              <div className="flex flex-col items-center space-y-3 py-2">
                {/* Node 1: Completed (Gold) */}
                <div className="flex items-center gap-3 -translate-x-8">
                  <button
                    type="button"
                    onClick={onOpenRegister}
                    className="w-14 h-14 rounded-full bg-gradient-to-b from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] flex items-center justify-center shadow-[0_5px_0_#c9990e] cursor-pointer"
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                  <div className="text-left">
                    <span className="text-xs font-bold block">1. HTML Tuzilishi</span>
                    <span className="text-[11px] text-[#ffd23f] font-mono">Oltin · +25 XP</span>
                  </div>
                </div>

                {/* Node 2: Current Pulsing with BOSHLASH Bubble */}
                <div className="flex items-center gap-3 translate-x-6">
                  <div className="relative">
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#3ee6c4] text-[#0a0912] font-display text-[10px] font-extrabold tracking-wide shadow animate-bounce whitespace-nowrap">
                      BOSHLASH
                    </span>
                    <button
                      type="button"
                      onClick={onOpenRegister}
                      className="w-16 h-16 rounded-full bg-gradient-to-b from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] flex items-center justify-center shadow-[0_6px_0_#c93b58] ring-4 ring-[#ff6b86]/35 cursor-pointer"
                    >
                      <Play className="w-7 h-7 fill-current ml-0.5" />
                    </button>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block">2. Teglar va Matnlar</span>
                    <span className="text-[11px] text-[#3ee6c4] font-mono">Joriy dars · +30 XP</span>
                  </div>
                </div>

                {/* Node 3: Locked */}
                <div className="flex items-center gap-3 -translate-x-6 opacity-60">
                  <div className="w-13 h-13 rounded-full aurora-surface-2 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold block">3. CSS Flexbox Sirlari</span>
                    <span className="text-[11px] font-mono">Qulflangan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COUNTABLE QUANTITATIVE STATS */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="aurora-card p-6 text-left">
          <span className="font-display font-mono text-3xl sm:text-4xl font-bold text-[#ff6b86] tabular-nums block">
            250+
          </span>
          <span className="text-sm font-bold mt-1 block">Interaktiv Dars va Slaydlar</span>
          <span className="text-xs opacity-70 mt-0.5 block">
            W3Schools asosida 700 so&apos;zlik chuqur konspektlar
          </span>
        </div>

        <div className="aurora-card p-6 text-left">
          <span className="font-display font-mono text-3xl sm:text-4xl font-bold text-[#3ee6c4] tabular-nums block">
            {totalStudentsCount} nafar
          </span>
          <span className="text-sm font-bold mt-1 block">Faol O&apos;quvchilar Ligasi</span>
          <span className="text-xs opacity-70 mt-0.5 block">
            Har bir ustoz guruhida 15 tagacha saralangan talaba
          </span>
        </div>

        <div className="aurora-card p-6 text-left">
          <span className="font-display font-mono text-3xl sm:text-4xl font-bold text-[#ffd23f] tabular-nums block">
            {totalLessonsCompleted}+
          </span>
          <span className="text-sm font-bold mt-1 block">Bajarilgan Amaliy Vazifalar</span>
          <span className="text-xs opacity-70 mt-0.5 block">
            Har bir to&apos;g&apos;ri test uchun XP va tangalar
          </span>
        </div>

        <div className="aurora-card p-6 text-left">
          <span className="font-display font-mono text-3xl sm:text-4xl font-bold text-[#b6f03c] tabular-nums block">
            3 Bosqich
          </span>
          <span className="text-sm font-bold mt-1 block">HTML → CSS → JavaScript</span>
          <span className="text-xs opacity-70 mt-0.5 block">
            Yakunida rasmiy QR-kodli PDF diplom beriladi
          </span>
        </div>
      </section>

      {/* 3. QANDAY ISHLAYDI — 3 QADAM */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-2xl sm:text-4xl font-bold">
            Platforma Qanday Ishlaydi?
          </h2>
          <p className="text-sm opacity-75">
            Atigi 3 ta oddiy qadam orqali noldan haqiqiy veb-dasturchiga aylaning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aurora-card aurora-card-interactive p-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] font-display font-bold text-xl flex items-center justify-center">
              01
            </div>
            <h3 className="font-display text-xl font-bold">
              1. Ro&apos;yxatdan O&apos;ting va Ustoz Oling
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Ism, familiya va loginingizni kiriting. Tizim sizga avtomatik tarzda shaxsiy ustoz
              biriktiradi va hisobingizga boshlang&apos;ich <strong>+20 tanga</strong> sovg&apos;a
              qiladi.
            </p>
          </div>

          <div className="aurora-card aurora-card-interactive p-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] font-display font-bold text-xl flex items-center justify-center">
              02
            </div>
            <h3 className="font-display text-xl font-bold">
              2. Yo&apos;l Xaritasida Dars va Quiz Yeching
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              HTML, CSS va JavaScript tugunlarini bittalab oching. Har bir darsda jonli kod yozing,
              viktorina savollariga javob bering va kunlik streak 🔥 olovini saqlang.
            </p>
          </div>

          <div className="aurora-card aurora-card-interactive p-7 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] font-display font-bold text-xl flex items-center justify-center">
              03
            </div>
            <h3 className="font-display text-xl font-bold">
              3. Ligada Yuting va Sertifikat Oling
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Haftalik top-3 podiumga chiqing, nishonlarni oching, tangalar do&apos;konidan
              ramkalar xarid qiling va 100% natija bilan rasmiy sertifikatni yuklab oling.
            </p>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MINI CODING CHALLENGE */}
      <section
        className={`aurora-card p-6 sm:p-10 transition-transform ${
          challengeError ? 'animate-aurora-shake' : ''
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold">
                  Hoziroq Sinab Ko&apos;ring: Birinchi HTML Tugma
                </h3>
                <p className="text-xs opacity-75">
                  Kodni o&apos;zgartirib ko&apos;ring va &quot;Tekshirish&quot; tugmasini bosing
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-[#ffd23f]">Mukofot: +25 XP</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold block mb-2">HTML Kodingiz:</label>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                className="w-full h-36 aurora-input font-mono text-xs sm:text-sm resize-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-2">Jonli Natija (Preview):</label>
              <div className="w-full h-36 aurora-surface-2 rounded-2xl p-4 flex items-center justify-center">
                <div
                  dangerouslySetInnerHTML={{ __html: userCode }}
                  className="[&>button]:px-5 [&>button]:py-2.5 [&>button]:rounded-2xl [&>button]:font-bold [&>button]:bg-[#ff6b86] [&>button]:text-[#0a0912] [&>button]:shadow-[0_4px_0_#c93b58] [&>button]:cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <button
              type="button"
              onClick={handleTestChallenge}
              className="duo-btn duo-btn-mint text-xs sm:text-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Kodni Tekshirish</span>
            </button>

            {challengeFeedback && (
              <div
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 ${
                  challengeSolved
                    ? 'bg-[#b6f03c]/20 text-[#b6f03c] border border-[#b6f03c]/40'
                    : 'bg-[#ff4d6d]/20 text-[#ff6b86] border border-[#ff4d6d]/40'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{challengeFeedback}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. USTOZLAR KARTALARI (MENTORS) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold">
              Tajribali Ustozlar va AI Murabbiylar
            </h2>
            <p className="text-sm opacity-75">
              Har bir o&apos;quvchi ustoz nazoratida dars topshiradi va individual yordam oladi
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenRegister}
            className="duo-btn duo-btn-surface text-xs self-start sm:self-auto"
          >
            <span>Guruhga Qo&apos;shilish</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teachers.slice(0, 3).map((t) => (
            <div key={t.id} className="aurora-card p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    t.avatar && !t.avatar.includes('unsplash.com')
                      ? t.avatar
                      : MALE_PROGRAMMER_AVATAR
                  }
                  alt={`${t.name} ${t.surname}`}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = MALE_PROGRAMMER_AVATAR;
                  }}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#ff8a3d]"
                />
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {t.name} {t.surname}
                  </h3>
                  <p className="text-xs opacity-75">
                    {t.specialty} · @{t.username}
                  </p>
                </div>
              </div>

              <p className="text-xs opacity-85 leading-relaxed">{t.bio}</p>

              <div className="pt-3 border-t border-[#ff6b86]/15 flex items-center justify-between text-xs font-mono">
                <span className="text-[#ffd23f] font-bold">★ {t.rating} reyting</span>
                <span className="text-[#3ee6c4]">
                  {t.studentIds?.length || 0} / 15 o&apos;quvchi
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. O'QUVCHILAR FIKRLARI (TESTIMONIALS) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            O&apos;quvchilarimiz Natijalari
          </h2>
          <p className="text-sm opacity-75">
            O&apos;yinlashtirilgan tizim orqali dasturlashni o&apos;rgangan yoshlar fikri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aurora-card p-6 space-y-4">
            <Quote className="w-6 h-6 text-[#ff6b86]" />
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              &quot;Avval HTML va CSS ni kitobdan o&apos;qib tushunmasdim. DevMaster-dagi zig-zag
              xarita va 15 savolli testlar tufayli 3 haftada o&apos;z portfolio saytimni
              yaratdim!&quot;
            </p>
            <div className="pt-2 border-t border-[#ff6b86]/15 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold block">Sardor Komilov</span>
                <span className="opacity-70">Toshkent · JavaScript bosqichi</span>
              </div>
              <span className="font-mono font-bold text-[#ffd23f]">🔥 21 kun</span>
            </div>
          </div>

          <div className="aurora-card p-6 space-y-4">
            <Quote className="w-6 h-6 text-[#3ee6c4]" />
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              &quot;Har kuni streak uzilmasligi uchun dars qilaman. Ustoz Temur AI tushunmagan
              kodlarimni bir zumda o&apos;zbek tilida sodda qilib tushuntirib beradi.&quot;
            </p>
            <div className="pt-2 border-t border-[#ff6b86]/15 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold block">Madina Rustamova</span>
                <span className="opacity-70">Samarqand · Oltin Liga #1</span>
              </div>
              <span className="font-mono font-bold text-[#3ee6c4]">⚡ 1,450 XP</span>
            </div>
          </div>

          <div className="aurora-card p-6 space-y-4">
            <Quote className="w-6 h-6 text-[#ffd23f]" />
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              &quot;Testlardan yig&apos;gan tangalarimga do&apos;kondan oltin profil ramkasini oldim
              va yakuniy imtihonni 100% ga topshirib rasmiy PDF sertifikat oldim!&quot;
            </p>
            <div className="pt-2 border-t border-[#ff6b86]/15 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold block">Javohir Rahimov</span>
                <span className="opacity-70">Farg&apos;ona · Bitiruvchi</span>
              </div>
              <span className="font-mono font-bold text-[#b6f03c]">🎓 Sertifikat</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VIDEO QO'LLANMA VA ASOSCHI KARTASI */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 aurora-card p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-[#ff6b86] font-bold text-xs">
              <Youtube className="w-4 h-4" />
              <span>Video Qo&apos;llanma</span>
            </div>
            <span className="text-xs opacity-70 font-mono">HTML · CSS · JS To&apos;liq Kurs</span>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border-2 border-[#ff6b86]/30 bg-black">
            <iframe
              src="https://www.youtube.com/embed/kUMe1FH4CHE?autoplay=0&rel=0"
              title="DevMaster Academy Video Darslik"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>

        <div className="lg:col-span-5 aurora-card p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] text-[#0a0912] flex items-center justify-center font-display text-2xl font-bold shadow-md">
                👑
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">{OWNER_PROFILE.name}</h3>
                <p className="text-xs text-[#ff8a3d] font-bold">{OWNER_PROFILE.roleTitle}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">{OWNER_PROFILE.bio}</p>

            <div className="flex flex-wrap gap-2 pt-1 text-xs opacity-80">
              {OWNER_PROFILE.interests.map((interest, idx) => (
                <span key={idx} className="aurora-surface-2 px-2.5 py-1 rounded-xl">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="aurora-surface-2 p-4 rounded-2xl flex items-start gap-3">
            <Coffee className="w-5 h-5 text-[#ffd23f] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs italic opacity-90">&quot;{OWNER_PROFILE.quote}&quot;</p>
              <span className="text-[11px] opacity-60 block mt-1">— Lord_dev Jamoasi Shiori</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION */}
      <section className="aurora-card p-8 sm:p-12 text-center relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              'linear-gradient(125deg, #ff6b86 0%, #ff8a3d 40%, #3ee6c4 80%, #b6f03c 100%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <h2 className="font-display text-2xl sm:text-4xl font-bold">
            Birinchi Darsingizni Hoziroq Boshlang!
          </h2>
          <p className="text-sm opacity-85">
            Ro&apos;yxatdan o&apos;tish atigi 30 soniya vaqt oladi. +20 tanga bonusni oling va
            yo&apos;l xaritasida 1-tugunni oching!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenRegister}
              className="duo-btn duo-btn-coral text-sm sm:text-base !px-8 !py-3.5"
            >
              <Sparkles className="w-5 h-5" />
              <span>Bepul Ro&apos;yxatdan O&apos;tish</span>
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="duo-btn duo-btn-surface text-sm sm:text-base !px-6 !py-3.5"
            >
              <span>Hisobga Kirish</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. XATOLIKLAR (BUG) YOKI G'OYALARNI (TAKLIFLARNI) KIRITISH BO'LIMI */}
      <section className="aurora-card p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b86]/25 to-[#3ee6c4]/25 text-[#3ee6c4] flex items-center justify-center shrink-0">
              {fbType === 'bug' ? (
                <Bug className="w-6 h-6 text-[#ff6b86]" />
              ) : (
                <Lightbulb className="w-6 h-6 text-[#ffd23f]" />
              )}
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold">
                Xatoliklar yoki G&apos;oyalarni Kiritish
              </h2>
              <p className="text-xs sm:text-sm opacity-75">
                Saytda xatolik (bug) ko&apos;rdingizmi yoki yangi taklifingiz bormi? Rasm/video bilan adminga yuboring!
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-[#3ee6c4]">
            To&apos;g&apos;ridan-to&apos;g&apos;ri Admin &quot;Xabarlar&quot; qutisiga tushadi
          </span>
        </div>

        {fbSubmittedType ? (
          /* YUBORILGANDAN KEYINGI TASDIQ EKRANI (BUG YOKI TAKLIFGA QARAB) */
          <div className="aurora-surface-2 rounded-3xl p-7 sm:p-10 text-center max-w-2xl mx-auto space-y-6 border-2 border-[#3ee6c4]/40">
            <div className="w-16 h-16 rounded-3xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            {fbSubmittedType === 'bug' ? (
              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#ffd23f]">
                  Xatolik (Bug) Haqidagi Xabaringiz Qabul Qilindi!
                </h3>
                <p className="text-sm sm:text-base leading-relaxed opacity-95">
                  Bizni ogohlantirganingiz uchun rahmat! Bu xatoni <strong>1-2 kun ichida</strong> ko&apos;rib chiqib va tuzatishga harakat qilamiz va siz bilan bog&apos;lanishimiz ham mumkin. Shuning uchun Gmail manzillaringizni va telefoningizni tekshirib turishingizni iltimos qilamiz.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#3ee6c4]">
                  Taklifingiz Muvaffaqiyatli Qabul Qilindi!
                </h3>
                <p className="text-sm sm:text-base leading-relaxed opacity-95">
                  Taklifingiz uchun rahmat! Buni biz jamoamiz bilan <strong>3-4 kun ichida</strong> kelishib, sizga anig&apos;ini telefon raqam yoki Gmail orqali xabar beramiz.
                </p>
              </div>
            )}

            <div className="pt-2 flex justify-center">
              <button
                type="button"
                onClick={handleResetFeedbackForm}
                className="duo-btn duo-btn-mint !px-7 !py-3 text-xs sm:text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sahifaga qaytish</span>
              </button>
            </div>
          </div>
        ) : (
          /* 3 TA TEXT INPUT, 1 TA SELECT, RASM/VIDEO YUKLASH, 1 TA TEXTAREA VA 1 TA SUBMIT BUTTON */
          <form onSubmit={handleFeedbackSubmit} className="space-y-5">
            {fbError && (
              <div className="p-3.5 rounded-2xl bg-[#ff4d6d]/20 border border-[#ff4d6d]/40 text-[#ff6b86] text-xs font-bold">
                {fbError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 1-input: Ism */}
              <div>
                <label className="text-xs font-bold block mb-1.5">1. Ismingiz:</label>
                <input
                  type="text"
                  value={fbFirstName}
                  onChange={(e) => setFbFirstName(e.target.value)}
                  placeholder="Ismingizni kiriting..."
                  className="w-full aurora-input text-xs sm:text-sm"
                  required
                />
              </div>

              {/* 2-input: Familiya */}
              <div>
                <label className="text-xs font-bold block mb-1.5">2. Familiyangiz:</label>
                <input
                  type="text"
                  value={fbLastName}
                  onChange={(e) => setFbLastName(e.target.value)}
                  placeholder="Familiyangizni kiriting..."
                  className="w-full aurora-input text-xs sm:text-sm"
                  required
                />
              </div>

              {/* 3-input: Siz bilan bog'lanishimiz uchun tel raqam yoki Gmail manzil */}
              <div>
                <label className="text-xs font-bold block mb-1.5">
                  3. Bog&apos;lanish uchun tel raqam yoki Gmail manzil:
                </label>
                <input
                  type="text"
                  value={fbContact}
                  onChange={(e) => setFbContact(e.target.value)}
                  placeholder="+998 90 123 45 67 yoki misol@gmail.com"
                  className="w-full aurora-input text-xs sm:text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1 ta Select: 2 ta variant (Bug yoki xatolik / Takliflar) */}
              <div>
                <label className="text-xs font-bold block mb-1.5">
                  Murojaat turini tanlang:
                </label>
                <select
                  value={fbType}
                  onChange={(e) => setFbType(e.target.value as 'bug' | 'suggestion')}
                  className="w-full aurora-input text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <option value="bug">🐞 Bug yoki xatolik</option>
                  <option value="suggestion">💡 Takliflar (Yangi g&apos;oya)</option>
                </select>
              </div>

              {/* Rasm yoki Video yuklaydigan joy */}
              <div>
                <label className="text-xs font-bold block mb-1.5">
                  Rasm yoki Video yuklash (ixtiyoriy — xatolik isboti):
                </label>
                <div className="flex items-center gap-3">
                  <label className="duo-btn duo-btn-surface !py-2.5 !px-4 text-xs cursor-pointer flex items-center gap-2 w-full justify-center">
                    <Upload className="w-4 h-4 text-[#3ee6c4]" />
                    <span className="truncate">
                      {fbMediaName ? fbMediaName : 'Rasm yoki Video tanlash...'}
                    </span>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFeedbackMediaUpload}
                      className="hidden"
                    />
                  </label>
                  {fbMediaUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setFbMediaUrl(undefined);
                        setFbMediaType(undefined);
                        setFbMediaName(undefined);
                      }}
                      className="duo-btn duo-btn-coral !p-2.5 text-xs shrink-0"
                      title="Yuklangan faylni o'chirish"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Yuklangan rasm yoki video ko'rinishi */}
            {fbMediaUrl && (
              <div className="aurora-surface-2 p-3.5 rounded-2xl flex items-center gap-4">
                {fbMediaType === 'video' ? (
                  <video
                    src={fbMediaUrl}
                    controls
                    className="w-40 h-24 rounded-xl object-cover bg-black border border-white/15"
                  />
                ) : (
                  <img
                    src={fbMediaUrl}
                    alt="Yuklangan fayl"
                    className="w-32 h-24 rounded-xl object-cover border border-white/15"
                  />
                )}
                <div className="text-xs space-y-1">
                  <span className="font-bold text-[#3ee6c4] flex items-center gap-1.5">
                    {fbMediaType === 'video' ? (
                      <Video className="w-4 h-4" />
                    ) : (
                      <ImageIcon className="w-4 h-4" />
                    )}
                    {fbMediaName || 'Media fayl biriktirildi'}
                  </span>
                  <p className="opacity-70">
                    Ushbu fayl Admin paneldagi &quot;Xabarlar&quot; bo&apos;limiga xabaringiz bilan birga yuboriladi.
                  </p>
                </div>
              </div>
            )}

            {/* 1 ta Textarea */}
            <div>
              <label className="text-xs font-bold block mb-1.5">
                {fbType === 'bug'
                  ? "Xatolik (Bug) haqida batafsil yozing (qaysi sahifada va qanday yuz berdi):"
                  : "Taklifingiz yoki g'oyangizni batafsil yozing:"}
              </label>
              <textarea
                value={fbMessage}
                onChange={(e) => setFbMessage(e.target.value)}
                rows={4}
                placeholder={
                  fbType === 'bug'
                    ? "Masalan: Ro'yxatdan o'tish oynasida tugmani bosganimda..."
                    : "Masalan: Saytga quyidagi yangi imkoniyat qo'shilsa juda zo'r bo'lardi..."
                }
                className="w-full aurora-input text-xs sm:text-sm resize-y"
                required
              />
            </div>

            {/* 1 ta Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="duo-btn duo-btn-coral !px-8 !py-3.5 text-xs sm:text-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Adminga Yuborish (Submit)</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
