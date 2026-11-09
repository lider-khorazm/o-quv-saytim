import React, { useState, useEffect } from 'react';
import {
  LogIn,
  UserPlus,
  KeyRound,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  User,
  Wand2,
  Rocket,
  Coins,
  ArrowLeft,
  Flame,
  Zap,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { loginUser, registerStudent, getStudents } from '../services/storage';
import { AuthUser, Student, Teacher } from '../types';
import { evaluatePasswordStrength } from './RegistrationModal';
import { AuroraMascot } from './AuroraMascot';

interface AuthModalProps {
  initialTab?: 'login' | 'register';
  onClose: () => void;
  onAuthSuccess: (user: AuthUser) => void;
  onStudentRegistered: (student: Student, teacher: Teacher | null) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialTab = 'login',
  onClose,
  onAuthSuccess,
  onStudentRegistered,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeError, setShakeError] = useState(false);

  // Register state
  const [regName, setRegName] = useState('');
  const [regSurname, setRegSurname] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

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

  const regStrength = evaluatePasswordStrength(regPassword);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const res = loginUser(loginUsername, loginPassword);
    if (res.success && res.user) {
      onAuthSuccess(res.user);
      onClose();
    } else {
      triggerShake(res.message);
    }
  };

  const handleGenerateUsername = () => {
    const base = (regName.trim() || regSurname.trim() || 'student')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
    const suffix = Math.floor(10 + Math.random() * 89);
    setRegUsername(`${base || 'coder'}_${suffix}`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanName = regName.trim();
    const cleanSurname = regSurname.trim();
    const cleanUsername = regUsername.trim().toLowerCase();

    if (!cleanName || !cleanSurname) {
      triggerShake('Iltimos, ism va familiyangizni kiriting!');
      return;
    }

    const parsedAge = Number(regAge);
    if (!regAge.trim() || !Number.isInteger(parsedAge) || parsedAge < 1 || parsedAge > 99) {
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

    if (!regPassword || regPassword.length < 6) {
      triggerShake("Parol kamida 6 ta belgidan iborat bo'lishi shart!");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      triggerShake('Parollar bir xil emas');
      return;
    }

    try {
      const res = registerStudent({
        name: cleanName,
        surname: cleanSurname,
        username: cleanUsername,
        password: regPassword,
        age: parsedAge,
      });

      try {
        confetti({
          particleCount: 100,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
        });
      } catch {
        // ignore
      }

      onStudentRegistered(res.student, res.teacher);
      const authStudent: AuthUser = {
        id: res.student.id,
        name: `${res.student.name} ${res.student.surname}`,
        username: res.student.username,
        email: res.student.email,
        role: 'student',
        avatar: res.student.avatar,
      };
      onAuthSuccess(authStudent);
      onClose();
    } catch (err: any) {
      triggerShake(err.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    }
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen overflow-y-auto flex flex-col items-center justify-center p-4 aurora-bg-mesh select-none">
      {/* Top Back Bar */}
      <div className="relative z-10 w-full max-w-4xl mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="duo-btn duo-btn-surface !py-2 !px-4 text-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#ff6b86]" />
          <span>Asosiy sahifaga qaytish</span>
        </button>
        <span className="font-display text-xs font-bold text-[#ff8a3d]">
          DevMaster Academy
        </span>
      </div>

      <div
        className={`relative z-10 w-full max-w-4xl aurora-card overflow-hidden ${
          shakeError ? 'animate-aurora-shake' : ''
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Mascot & Gamified Highlights */}
          <div className="hidden lg:flex lg:col-span-5 p-8 aurora-surface-2 flex-col justify-between border-r border-[#ff6b86]/20">
            <div className="space-y-5">
              <AuroraMascot
                mood={activeTab === 'login' ? 'happy' : 'excited'}
                size="lg"
                message={
                  activeTab === 'login'
                    ? 'Qaytganingizdan xursandman! Kunlik streak uzilmasligi uchun darsni davom ettiramizmi?'
                    : "Yangi sarguzasht! Ro'yxatdan o'ting va +20 tanga bonusni qo'lga kiriting!"
                }
              />

              <div className="space-y-2.5 text-xs pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl aurora-card">
                  <Flame className="w-5 h-5 text-[#ff8a3d] shrink-0" />
                  <div>
                    <span className="font-bold block">Kunlik Streak 🔥</span>
                    <span className="opacity-75">Har kuni dars qilib olovni saqlang</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl aurora-card">
                  <Zap className="w-5 h-5 text-[#3ee6c4] shrink-0" />
                  <div>
                    <span className="font-bold block">XP va Darajalar</span>
                    <span className="opacity-75">Testlarni yechib yangi ligaga chiqing</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl aurora-card">
                  <Trophy className="w-5 h-5 text-[#ffd23f] shrink-0" />
                  <div>
                    <span className="font-bold block">Sertifikat va Do&apos;kon</span>
                    <span className="opacity-75">Tangalarga ramkalar va rasmiy diplom</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-[11px] opacity-70 font-mono">
              O&apos;quvchi · Ustoz · Admin kirish oynasi
            </div>
          </div>

          {/* Right Column: Login / Register Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-5">
            {/* Segmented Tab Switcher */}
            <div className="grid grid-cols-2 p-1.5 rounded-2xl aurora-surface-2 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                }}
                className={`py-2.5 text-xs font-display font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Kirish</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                }}
                className={`py-2.5 text-xs font-display font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912] shadow'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Ro&apos;yxatdan O&apos;tish</span>
              </button>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-[#ff4d6d]/20 border border-[#ff4d6d]/45 text-[#ff6b86] text-xs font-bold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {activeTab === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5 text-[#3ee6c4]" />
                      <span>Loginni kiriting (Username)</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Masalan: sardor_dev"
                    className="w-full aurora-input font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1.5">
                    <span className="inline-flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ff6b86]" />
                      <span>Parolni kiriting</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Parolingizni yozing"
                      className="w-full pr-11 aurora-input font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-3 opacity-70 hover:opacity-100 cursor-pointer"
                      aria-label="Parolni ko'rsatish"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full duo-btn duo-btn-coral text-sm !py-3.5 mt-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Tizimga Kirish</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} noValidate className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between px-1">
                  <span className="opacity-75">Yangi o&apos;quvchi hisobi</span>
                  <span className="inline-flex items-center gap-1 text-[#ffd23f] font-mono font-bold">
                    <Coins className="w-3.5 h-3.5" /> +20 Tanga sovg&apos;a
                  </span>
                </div>

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
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
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
                      value={regSurname}
                      onChange={(e) => setRegSurname(e.target.value)}
                      placeholder="Komilov"
                      className="w-full aurora-input"
                    />
                  </div>
                </div>

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
                      value={regAge}
                      onChange={(e) => setRegAge(e.target.value)}
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
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="sardor_dev"
                      className="w-full aurora-input font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold">
                      <span className="inline-flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-[#ff6b86]" />
                        <span>Parol yaratish (kamida 6 ta belgi)</span>
                      </span>
                    </label>
                    {regPassword.length > 0 && (
                      <span className={`text-[11px] font-bold ${regStrength.textColorClass}`}>
                        {regStrength.statusLabel}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Kamida 6 ta belgi kiriting"
                      className="w-full pr-11 aurora-input font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3.5 top-3 opacity-70 hover:opacity-100 cursor-pointer"
                    >
                      {showRegPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="mt-2 space-y-1">
                    <div className="grid grid-cols-3 gap-2 h-2">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          regStrength.level >= 1 ? regStrength.barActiveClass : 'bg-white/15'
                        }`}
                      />
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          regStrength.level >= 2 ? regStrength.barActiveClass : 'bg-white/15'
                        }`}
                      />
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          regStrength.level >= 3 ? regStrength.barActiveClass : 'bg-white/15'
                        }`}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={regStrength.textColorClass}>{regStrength.detailText}</span>
                      <span className="opacity-65 font-mono">{regPassword.length}/6+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold mb-1">
                    <span className="inline-flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#ff8a3d]" />
                      <span>Parolni takrorlang</span>
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Parolni qayta kiriting"
                      className="w-full pr-11 aurora-input font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full duo-btn duo-btn-mint text-sm !py-3.5"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Ro&apos;yxatdan O&apos;tish va Kirish</span>
                </button>
                <p className="text-center text-[11px] opacity-70">
                  Ro&apos;yxatdan o&apos;tib, o&apos;quv qoidalariga rozi bo&apos;lasiz
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
