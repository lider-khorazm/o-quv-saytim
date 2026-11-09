import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  AlertCircle,
  KeyRound,
  User,
  Sparkles,
  Rocket,
  ArrowLeft,
  Wand2,
  Coins,
  GraduationCap,
  Flame,
  Zap,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Teacher, Student } from '../types';
import { registerStudent, getStudents, MALE_PROGRAMMER_AVATAR } from '../services/storage';
import { AuroraMascot } from './AuroraMascot';

interface RegistrationModalProps {
  onClose: () => void;
  onRegistered: (newStudent: Student, assignedTeacher: Teacher | null) => void;
}

export function evaluatePasswordStrength(pwd: string): {
  level: 0 | 1 | 2 | 3;
  statusLabel: string;
  detailText: string;
  barActiveClass: string;
  textColorClass: string;
} {
  if (!pwd) {
    return {
      level: 0,
      statusLabel: 'Parol kiritilmagan',
      detailText: 'Kamida 6 ta belgidan iborat parol yarating',
      barActiveClass: 'bg-white/10',
      textColorClass: 'opacity-65',
    };
  }

  const hasLower = /[a-z]/.test(pwd);
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
  const varietyCount = [hasLower, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

  if (pwd.length < 6 || varietyCount === 1) {
    return {
      level: 1,
      statusLabel: 'Kuchsiz',
      detailText:
        pwd.length < 6
          ? `Kamida 6 ta belgi kiriting (${pwd.length}/6)`
          : 'Harf va raqamlarni aralashtiring',
      barActiveClass: 'bg-[#ff4d6d] shadow-[0_0_10px_rgba(255,77,109,0.75)]',
      textColorClass: 'text-[#ff6b86]',
    };
  }

  if (pwd.length >= 6 && (varietyCount >= 3 || (pwd.length >= 8 && varietyCount >= 2))) {
    return {
      level: 3,
      statusLabel: 'Kuchli',
      detailText: 'Ajoyib! Juda ishonchli va mustahkam parol',
      barActiveClass: 'bg-[#b6f03c] shadow-[0_0_10px_rgba(182,240,60,0.75)]',
      textColorClass: 'text-[#b6f03c]',
    };
  }

  return {
    level: 2,
    statusLabel: "O'rta",
    detailText: "Katta harf yoki maxsus belgi (@, #, !) qo'shsangiz kuchli bo'ladi",
    barActiveClass: 'bg-[#ffd23f] shadow-[0_0_10px_rgba(255,210,63,0.75)]',
    textColorClass: 'text-[#ffd23f]',
  };
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  onClose,
  onRegistered,
}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeError, setShakeError] = useState(false);

  const [registeredData, setRegisteredData] = useState<{
    student: Student;
    teacher: Teacher | null;
  } | null>(null);

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const triggerShake = (msg: string) => {
    setErrorMessage(msg);
    setShakeError(true);
    setTimeout(() => setShakeError(false), 420);
  };

  const handleGenerateUsername = () => {
    const base = (name.trim() || surname.trim() || 'coder')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    const suffix = Math.floor(10 + Math.random() * 89);
    setUsername(`${base || 'coder'}_${suffix}`);
  };

  const strength = evaluatePasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = name.trim();
    const cleanSurname = surname.trim();
    const cleanUsername = username.trim().toLowerCase();

    if (!cleanName || !cleanSurname) {
      triggerShake('Iltimos, ism va familiyangizni kiriting!');
      return;
    }

    const parsedAge = Number(age);
    if (!age.trim() || !Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 99) {
      triggerShake("Yoshingizni to'g'ri kiriting");
      return;
    }

    if (!cleanUsername || cleanUsername.length < 3) {
      triggerShake("Login kamida 3 ta belgidan iborat bo'lishi kerak!");
      return;
    }

    const isUsernameTaken = getStudents().some(
      (s) => s.username.trim().toLowerCase() === cleanUsername
    );
    if (isUsernameTaken) {
      triggerShake('Bu login band, boshqasini tanlang');
      return;
    }

    if (!password || password.length < 6) {
      triggerShake("Parol kamida 6 ta belgidan iborat bo'lishi shart!");
      return;
    }

    if (password !== confirmPassword) {
      triggerShake('Parollar bir xil emas');
      return;
    }

    try {
      const res = registerStudent({
        name: cleanName,
        surname: cleanSurname,
        username: cleanUsername,
        password: password,
        age: parsedAge,
      });

      setRegisteredData(res);

      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      triggerShake(err.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    }
  };

  const handleStartLearning = () => {
    if (registeredData) {
      onRegistered(registeredData.student, registeredData.teacher);
    }
    onClose();
  };

  const teacherAvatarSrc =
    registeredData?.teacher?.avatar && !registeredData.teacher.avatar.includes('unsplash.com')
      ? registeredData.teacher.avatar
      : MALE_PROGRAMMER_AVATAR;

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen overflow-y-auto flex flex-col items-center justify-center p-4 aurora-bg-mesh select-none">
      {/* Top Return Bar */}
      {!registeredData && (
        <div className="relative z-10 w-full max-w-4xl mb-3 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="duo-btn duo-btn-surface !py-2 !px-4 text-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#ff6b86]" />
            <span>Bosh sahifaga qaytish</span>
          </button>
          <span className="font-display text-xs font-bold text-[#ff8a3d]">
            DevMaster · Yangi O&apos;quvchi
          </span>
        </div>
      )}

      <div
        className={`relative z-10 w-full max-w-4xl aurora-card overflow-hidden ${
          shakeError ? 'animate-aurora-shake' : ''
        }`}
      >
        {!registeredData ? (
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Gamified Benefits & Mascot */}
            <div className="hidden lg:flex lg:col-span-5 p-8 aurora-surface-2 flex-col justify-between border-r border-[#ff6b86]/20">
              <div className="space-y-5">
                <AuroraMascot
                  mood="waving"
                  size="lg"
                  message="Safimizga xush kelibsiz! Hoziroq +20 tanga va shaxsiy ustozga ega bo'ling!"
                />

                <div className="space-y-3 pt-2">
                  <h3 className="font-display text-xl font-bold">
                    Nima uchun DevMaster?
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-3 p-2.5 rounded-2xl aurora-card">
                      <Flame className="w-5 h-5 text-[#ff8a3d] shrink-0" />
                      <span>Har kunlik streak 🔥 va kunlik mukofotli vazifalar</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-2xl aurora-card">
                      <Zap className="w-5 h-5 text-[#3ee6c4] shrink-0" />
                      <span>HTML → CSS → JS zig-zag xaritasi va jonli mashqlar</span>
                    </div>
                    <div className="flex items-center gap-3 p-2.5 rounded-2xl aurora-card">
                      <Trophy className="w-5 h-5 text-[#ffd23f] shrink-0" />
                      <span>Random ustoz guruhi va haftalik Top-3 liga podiumi</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] opacity-70 font-mono">
                13+ yoshdagi barcha o&apos;quvchilar uchun bepul
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold">
                    Yangi Profil Yaratish
                  </h2>
                  <p className="text-xs opacity-75">
                    Ma&apos;lumotlarni to&apos;ldiring va o&apos;qishni boshlang
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ffd23f]/20 text-[#ffd23f] font-mono text-xs font-bold">
                  <Coins className="w-3.5 h-3.5" /> +20 Tanga
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-2xl bg-[#ff4d6d]/20 border border-[#ff4d6d]/45 text-[#ff6b86] text-xs font-bold flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold mb-1">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#ff8a3d]" />
                        <span>Ismingizni kiriting</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Sardor"
                      className="w-full aurora-input"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#3ee6c4]" />
                        <span>Familiyangizni kiriting</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      required
                      value={surname}
                      onChange={(e) => setSurname(e.target.value)}
                      placeholder="Komilov"
                      className="w-full aurora-input"
                    />
                  </div>
                </div>

                {/* Age & Username */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold mb-1">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#ffd23f]" />
                        <span>Yosh (13–99)</span>
                      </span>
                    </label>
                    <input
                      type="number"
                      min={13}
                      max={99}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="16"
                      className="w-full aurora-input font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-bold">
                        <span className="inline-flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-[#3ee6c4]" />
                          <span>Loginni kiriting (Username)</span>
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={handleGenerateUsername}
                        className="text-[11px] text-[#3ee6c4] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Avto-tanlash</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="sardor_dev"
                      className="w-full aurora-input font-mono"
                    />
                  </div>
                </div>

                {/* Password + 3-bar strength indicator */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold">
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#ff6b86]" />
                        <span>Parol yaratish (kamida 6 ta belgi)</span>
                      </span>
                    </label>
                    {password.length > 0 && (
                      <span className={`text-[11px] font-bold ${strength.textColorClass}`}>
                        {strength.statusLabel}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kamida 6 ta belgi kiriting"
                      className="w-full pr-11 aurora-input font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 opacity-70 hover:opacity-100 cursor-pointer"
                      aria-label="Parolni ko'rsatish yoki yashirish"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="grid grid-cols-3 gap-2 h-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength.level >= 1 ? strength.barActiveClass : 'bg-white/15'
                        }`}
                      />
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength.level >= 2 ? strength.barActiveClass : 'bg-white/15'
                        }`}
                      />
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          strength.level >= 3 ? strength.barActiveClass : 'bg-white/15'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={strength.textColorClass}>{strength.detailText}</span>
                      <span className="opacity-65 font-mono">{password.length}/6+</span>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block font-bold mb-1">
                    <span className="inline-flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ff8a3d]" />
                      <span>Parolni takrorlang</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Parolni qayta kiriting"
                      className="w-full pr-11 aurora-input font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full duo-btn duo-btn-coral text-sm !py-3.5 mt-1"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Ro&apos;yxatdan O&apos;tish va Boshlash</span>
                </button>
                <p className="text-center text-[11px] opacity-70">
                  Ro&apos;yxatdan o&apos;tib, o&apos;quv qoidalariga rozi bo&apos;lasiz
                </p>
              </form>
            </div>
          </div>
        ) : (
          /* Celebratory Welcome View */
          <div className="p-8 max-w-lg mx-auto space-y-5 text-center animate-aurora-pop">
            <div className="w-16 h-16 rounded-3xl bg-[#b6f03c]/20 border-2 border-[#b6f03c] text-[#b6f03c] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">
                Tabriklaymiz, {registeredData.student.name}!
              </h2>
              <p className="text-xs opacity-80 mt-1">
                Siz DevMaster Academy safiga muvaffaqiyatli qo&apos;shildingiz!
              </p>
            </div>

            <div className="p-4 rounded-2xl aurora-surface-2 text-left space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="opacity-75">Sizning loginingiz:</span>
                <span className="font-mono font-bold text-[#3ee6c4]">
                  @{registeredData.student.username}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="opacity-75">Boshlang&apos;ich bonus:</span>
                <span className="font-bold text-[#ffd23f] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> +20 Tanga
                </span>
              </div>

              <div className="pt-3 border-t border-[#ff6b86]/20 flex items-center gap-3">
                <img
                  src={teacherAvatarSrc}
                  alt={registeredData.teacher ? registeredData.teacher.name : 'Ustoz'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = MALE_PROGRAMMER_AVATAR;
                  }}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#3ee6c4] shrink-0"
                />
                <div>
                  <span className="text-[11px] text-[#ff8a3d] font-bold flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" /> Biriktirilgan Ustoz:
                  </span>
                  <p className="text-sm font-bold mt-0.5">
                    {registeredData.teacher
                      ? `${registeredData.teacher.name} ${registeredData.teacher.surname}`
                      : 'Ustoz Temur (Bosh Dasturchi)'}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleStartLearning}
              className="w-full duo-btn duo-btn-mint text-sm !py-3.5"
            >
              <Rocket className="w-4 h-4" />
              <span>Yo&apos;l Xaritasiga Kirish</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
