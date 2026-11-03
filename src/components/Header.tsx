import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  MessageSquare,
  LogIn,
  LogOut,
  Sparkles,
  Download,
  Home,
  LayoutDashboard,
  Sun,
  Moon,
  Palette,
  Code2,
  Gamepad2,
  Bot,
  Flame,
  Coins,
  Zap,
  Compass,
  Trophy,
  ShoppingBag,
  User,
} from 'lucide-react';
import { Student, Teacher, AuthUser } from '../types';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  currentUser: AuthUser | null;
  selectedStudent: Student | null;
  selectedTeacher: Teacher | null;
  teachers: Teacher[];
  students: Student[];
  onOpenLoginModal: () => void;
  onOpenRegisterModal: () => void;
  onOpenTestIdModal?: () => void;
  onOpenGroupChatModal: () => void;
  onOpenFinalExamModal: () => void;
  onLogout: () => void;
  unreadNotesCount: number;
  showLandingPage?: boolean;
  onToggleLandingPage?: (show: boolean) => void;
  onOpenGroqConfig?: () => void;
  onOpenBackgroundModal?: () => void;
  activeView?: 'main' | 'portfolio' | 'game3d';
  onSelectView?: (view: 'main' | 'portfolio' | 'game3d') => void;
  onOpenGeminiStudio?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  selectedStudent,
  selectedTeacher,
  onOpenLoginModal,
  onOpenRegisterModal,
  onOpenGroupChatModal,
  onLogout,
  unreadNotesCount,
  showLandingPage = false,
  onToggleLandingPage,
  onOpenGroqConfig,
  onOpenBackgroundModal,
  activeView = 'main',
  onSelectView,
  onOpenGeminiStudio,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Calculate gamified streak & level from existing student data
  const studentStreak = selectedStudent
    ? Math.max(1, (selectedStudent.completedLessons?.length || 0) + 3)
    : 3;
  const studentLevel = selectedStudent
    ? Math.max(1, Math.floor((selectedStudent.xp || 0) / 100) + 1)
    : 1;

  const dispatchMobileTab = (tab: string) => {
    if (onToggleLandingPage) onToggleLandingPage(false);
    window.dispatchEvent(new CustomEvent('aurora-student-tab', { detail: tab }));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 aurora-glass transition-all duration-200 ${
          isScrolled ? 'py-1.5 shadow-2xl' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => onToggleLandingPage && onToggleLandingPage(true)}
              className="flex items-center gap-3 cursor-pointer group text-left shrink-0"
            >
              <div
                className={`rounded-2xl overflow-hidden border-2 border-[#ff6b86]/60 shadow-lg transition-all flex items-center justify-center shrink-0 ${
                  isScrolled ? 'h-10 w-16' : 'h-12 w-20'
                }`}
              >
                <img
                  src="/assets/aistudio/Generated_Image_October_29__2026_-_8_27PM_cf87025a.jpg"
                  alt="DevMaster Academy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] bg-clip-text text-transparent block leading-none">
                  DevMaster
                </span>
                <span className="text-[11px] opacity-75 font-medium block mt-1">
                  O&apos;yinlashtirilgan Dasturlash Akademiyasi
                </span>
              </div>
            </button>

            {/* Gamified XP / Streak / Coins HUD (Always visible when student is logged in - NO HEARTS!) */}
            {currentUser?.role === 'student' && selectedStudent && (
              <div className="flex items-center gap-2 sm:gap-3 px-3 py-1.5 rounded-2xl aurora-surface-2">
                {/* Daily Streak */}
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#ff8a3d]/15 text-[#ff8a3d] font-mono text-xs sm:text-sm font-bold tabular-nums"
                  title="Kunlik uzluksiz faollik (Streak)"
                >
                  <Flame className="w-4 h-4 fill-[#ff8a3d] text-[#ff8a3d]" />
                  <span>{studentStreak}</span>
                </div>

                {/* XP & Level */}
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#3ee6c4]/15 text-[#3ee6c4] font-mono text-xs sm:text-sm font-bold tabular-nums"
                  title={`Daraja ${studentLevel} • Jami tajriba ballari`}
                >
                  <Zap className="w-4 h-4 fill-[#3ee6c4] text-[#3ee6c4]" />
                  <span>{selectedStudent.xp} XP</span>
                  <span className="hidden md:inline text-[11px] px-1.5 py-0.5 rounded-md bg-[#3ee6c4]/20">
                    LVL {studentLevel}
                  </span>
                </div>

                {/* Coins */}
                <div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#ffd23f]/15 text-[#ffd23f] font-mono text-xs sm:text-sm font-bold tabular-nums"
                  title="Tangalar hisobi"
                >
                  <Coins className="w-4 h-4 text-[#ffd23f]" />
                  <span>{Number(selectedStudent.coins || 0).toFixed(0)}</span>
                </div>
              </div>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Feature Shortcuts */}
              <div className="hidden lg:flex items-center gap-2">
                {onSelectView && (
                  <button
                    type="button"
                    onClick={() => onSelectView(activeView === 'game3d' ? 'main' : 'game3d')}
                    className="duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
                  >
                    <Gamepad2 className="w-4 h-4 text-[#b6f03c]" />
                    <span>3D Arena</span>
                  </button>
                )}

                {onOpenGeminiStudio && (
                  <button
                    type="button"
                    onClick={onOpenGeminiStudio}
                    className="duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
                  >
                    <Bot className="w-4 h-4 text-[#3ee6c4]" />
                    <span>AI Ustoz</span>
                  </button>
                )}

                {onSelectView && (
                  <button
                    type="button"
                    onClick={() => onSelectView(activeView === 'portfolio' ? 'main' : 'portfolio')}
                    className={`duo-btn !py-1.5 !px-3 text-xs ${
                      activeView === 'portfolio' ? 'duo-btn-mint' : 'duo-btn-surface'
                    }`}
                  >
                    <Code2 className="w-4 h-4 text-[#ff8a3d]" />
                    <span>Loyihalar</span>
                  </button>
                )}

                {currentUser && (
                  <button
                    type="button"
                    onClick={onOpenGroupChatModal}
                    className="duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
                  >
                    <MessageSquare className="w-4 h-4 text-[#3ee6c4]" />
                    <span>Guruh Chati</span>
                  </button>
                )}

                {onOpenBackgroundModal && (
                  <button
                    type="button"
                    onClick={onOpenBackgroundModal}
                    className="duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
                  >
                    <Palette className="w-4 h-4 text-[#ff6b86]" />
                    <span>Mavzu</span>
                  </button>
                )}

                {currentUser?.role === 'owner' && onOpenGroqConfig && (
                  <button
                    type="button"
                    onClick={onOpenGroqConfig}
                    className="duo-btn duo-btn-gold !py-1.5 !px-3 text-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Groq AI</span>
                  </button>
                )}

                {currentUser?.role === 'owner' && (
                  <a
                    href="/devmaster-project.zip"
                    download="devmaster-project.zip"
                    className="duo-btn duo-btn-mint !py-1.5 !px-3 text-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>ZIP</span>
                  </a>
                )}
              </div>

              {/* Dashboard / Landing Switch */}
              {currentUser && onToggleLandingPage && (
                <div className="hidden sm:flex items-center p-1 rounded-2xl aurora-surface-2 gap-1">
                  <button
                    type="button"
                    onClick={() => onToggleLandingPage(false)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      !showLandingPage
                        ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Kabinet</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleLandingPage(true)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                      showLandingPage
                        ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912] shadow'
                        : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Home className="w-3.5 h-3.5" />
                    <span>Bosh Sahifa</span>
                  </button>
                </div>
              )}

              {/* Light / Dark Mode Switch */}
              <button
                type="button"
                onClick={toggleTheme}
                className="duo-btn duo-btn-surface !px-3 !py-2 text-xs"
                title={theme === 'dark' ? "Yorug' rejim" : "To'q rejim"}
                aria-label="Mavzu rejimini almashtirish"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-[#ffd23f]" />
                    <span className="hidden md:inline">Yorug&apos;</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#ff6b86]" />
                    <span className="hidden md:inline">To&apos;q</span>
                  </>
                )}
              </button>

              {/* Auth Controls */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="hidden xl:flex flex-col text-right pr-1">
                    <span className="text-xs font-bold truncate max-w-[130px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#3ee6c4]">
                      @{currentUser.username} ·{' '}
                      {currentUser.role === 'owner'
                        ? 'Admin'
                        : currentUser.role === 'teacher'
                        ? 'Ustoz'
                        : selectedTeacher
                        ? `Ustoz: ${selectedTeacher.name}`
                        : "O'quvchi"}
                    </span>
                  </div>

                  {unreadNotesCount > 0 && currentUser.role === 'teacher' && (
                    <span
                      className="px-2 py-0.5 rounded-full bg-[#ff6b86] text-[#0a0912] font-mono text-xs font-extrabold"
                      title="O'qilmagan bildirishnomalar"
                    >
                      {unreadNotesCount}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={onLogout}
                    className="duo-btn duo-btn-surface !px-3 !py-2 text-xs hover:border-[#ff4d6d]"
                    title="Hisobdan chiqish"
                  >
                    <LogOut className="w-4 h-4 text-[#ff6b86]" />
                    <span className="hidden sm:inline">Chiqish</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onOpenLoginModal}
                    className="duo-btn duo-btn-surface !px-3.5 !py-2 text-xs"
                  >
                    <LogIn className="w-4 h-4 text-[#3ee6c4]" />
                    <span>Kirish</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenRegisterModal}
                    className="duo-btn duo-btn-coral !px-4 !py-2 text-xs"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Boshlash</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Gamified Navigation Bar (Yo'l, Reyting, Do'kon, Profil) */}
      {currentUser && !showLandingPage && (
        <nav
          aria-label="Mobil navigatsiya"
          className="sm:hidden fixed bottom-0 inset-x-0 z-40 aurora-glass border-t-2 border-[#ff6b86]/25 px-3 py-1.5 flex items-center justify-around"
        >
          <button
            type="button"
            onClick={() => dispatchMobileTab('path')}
            className="flex flex-col items-center justify-center min-h-[44px] px-3 py-1 rounded-xl text-xs font-bold text-[#ff6b86] active:scale-95 transition-transform"
          >
            <Compass className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Yo&apos;l</span>
          </button>
          <button
            type="button"
            onClick={() => dispatchMobileTab('league')}
            className="flex flex-col items-center justify-center min-h-[44px] px-3 py-1 rounded-xl text-xs font-bold text-[#ffd23f] active:scale-95 transition-transform"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Reyting</span>
          </button>
          <button
            type="button"
            onClick={() => dispatchMobileTab('shop')}
            className="flex flex-col items-center justify-center min-h-[44px] px-3 py-1 rounded-xl text-xs font-bold text-[#3ee6c4] active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Do&apos;kon</span>
          </button>
          <button
            type="button"
            onClick={() => dispatchMobileTab('profile')}
            className="flex flex-col items-center justify-center min-h-[44px] px-3 py-1 rounded-xl text-xs font-bold text-[#b6f03c] active:scale-95 transition-transform"
          >
            <User className="w-5 h-5" />
            <span className="text-[11px] mt-0.5">Profil</span>
          </button>
        </nav>
      )}
    </>
  );
};
