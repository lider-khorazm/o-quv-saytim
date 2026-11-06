import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  MessageSquare,
  LogIn,
  LogOut,
  Sparkles,
  Download,
  Sun,
  Moon,
  Palette,
  Flame,
  Coins,
  Zap,
  User,
  LayoutGrid,
  Layers,
} from 'lucide-react';
import { Student, Teacher, AuthUser } from '../types';
import { useTheme } from '../context/ThemeContext';

export type TopMenuTab = 'profil' | 'asosiy' | 'sahifalar';

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
  activeTopTab?: TopMenuTab;
  onSelectTopTab?: (tab: TopMenuTab) => void;
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
  activeTopTab = 'asosiy',
  onSelectTopTab,
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

  const studentStreak = selectedStudent
    ? Math.max(1, (selectedStudent.completedLessons?.length || 0) + 3)
    : 3;
  const studentLevel = selectedStudent
    ? Math.max(1, Math.floor((selectedStudent.xp || 0) / 100) + 1)
    : 1;

  const handleTopNavClick = (tab: TopMenuTab) => {
    if (onToggleLandingPage) onToggleLandingPage(false);
    if (onSelectTopTab) onSelectTopTab(tab);
    window.dispatchEvent(new CustomEvent('aurora-top-nav', { detail: tab }));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 aurora-glass transition-all duration-200 ${
          isScrolled ? 'py-1.5 shadow-2xl' : 'py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => {
                if (currentUser?.role === 'student') {
                  handleTopNavClick('asosiy');
                } else if (onToggleLandingPage) {
                  onToggleLandingPage(true);
                }
              }}
              className="flex items-center gap-3 cursor-pointer group text-left shrink-0"
            >
              <div
                className={`rounded-2xl overflow-hidden border-2 border-[#ff6b86]/60 shadow-lg transition-all flex items-center justify-center shrink-0 ${
                  isScrolled ? 'h-9 w-14' : 'h-11 w-18'
                }`}
              >
                <img
                  src="/assets/aistudio/Generated_Image_October_29__2026_-_8_27PM_cf87025a.jpg"
                  alt="DevMaster Academy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden md:block">
                <span className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] bg-clip-text text-transparent block leading-none">
                  DevMaster
                </span>
                <span className="text-[10px] opacity-75 font-medium block mt-1">
                  O&apos;yinlashtirilgan Akademiya
                </span>
              </div>
            </button>

            {/* 3 MAIN TOP MENU BUTTONS: PROFIL | ASOSIY | SAHIFALAR (Windows 10 Settings Style Launcher) */}
            {currentUser && (currentUser.role === 'student' || selectedStudent?.isGhostAdminStudent) && (
              <nav
                aria-label="Asosiy Menyu"
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl aurora-surface-2 border border-white/10 shadow-inner"
              >
                <button
                  type="button"
                  onClick={() => handleTopNavClick('profil')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    !showLandingPage && activeTopTab === 'profil'
                      ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow-lg scale-[1.02]'
                      : 'opacity-80 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <User className="w-4 h-4 shrink-0" />
                  <span>Profil</span>
                  {selectedStudent?.adminMessages?.some((m) => !m.read) && (
                    <span className="w-2 h-2 rounded-full bg-[#ffd23f] animate-ping" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleTopNavClick('asosiy')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    !showLandingPage && activeTopTab === 'asosiy'
                      ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912] shadow-lg scale-[1.02]'
                      : 'opacity-80 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4 shrink-0" />
                  <span>Asosiy</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleTopNavClick('sahifalar')}
                  className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-display font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    showLandingPage || activeTopTab === 'sahifalar'
                      ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] shadow-lg scale-[1.02]'
                      : 'opacity-80 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4 shrink-0" />
                  <span>Sahifalar</span>
                </button>
              </nav>
            )}

            {/* Gamified XP / Streak / Coins HUD (when student or ghost admin student is active) */}
            {(currentUser?.role === 'student' || selectedStudent?.isGhostAdminStudent) && selectedStudent && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl aurora-surface-2">
                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#ff8a3d]/15 text-[#ff8a3d] font-mono text-xs font-bold tabular-nums"
                  title="Kunlik uzluksiz faollik (Streak)"
                >
                  <Flame className="w-3.5 h-3.5 fill-[#ff8a3d] text-[#ff8a3d]" />
                  <span>{selectedStudent.isGhostAdminStudent ? '∞' : studentStreak}</span>
                </div>

                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#3ee6c4]/15 text-[#3ee6c4] font-mono text-xs font-bold tabular-nums"
                  title={`Daraja ${studentLevel} • Jami tajriba ballari`}
                >
                  <Zap className="w-3.5 h-3.5 fill-[#3ee6c4] text-[#3ee6c4]" />
                  <span>{selectedStudent.isGhostAdminStudent ? '∞ XP' : `${selectedStudent.xp} XP`}</span>
                </div>

                <div
                  className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#ffd23f]/15 text-[#ffd23f] font-mono text-xs font-bold tabular-nums"
                  title="Tangalar hisobi"
                >
                  <Coins className="w-3.5 h-3.5 text-[#ffd23f]" />
                  <span>
                    {selectedStudent.isGhostAdminStudent
                      ? '∞ 🪙'
                      : Number(selectedStudent.coins || 0).toFixed(1)}
                  </span>
                </div>
              </div>
            )}

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {currentUser && currentUser.role !== 'student' && (
                <button
                  type="button"
                  onClick={onOpenGroupChatModal}
                  className="hidden sm:flex duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#3ee6c4]" />
                  <span>Guruh Chati</span>
                </button>
              )}

              {onOpenBackgroundModal && (
                <button
                  type="button"
                  onClick={onOpenBackgroundModal}
                  className="hidden md:flex duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
                >
                  <Palette className="w-4 h-4 text-[#ff6b86]" />
                  <span>Mavzu</span>
                </button>
              )}

              {currentUser?.role === 'owner' && onOpenGroqConfig && (
                <button
                  type="button"
                  onClick={onOpenGroqConfig}
                  className="hidden lg:flex duo-btn duo-btn-gold !py-1.5 !px-3 text-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Groq AI</span>
                </button>
              )}

              {currentUser?.role === 'owner' && (
                <a
                  href="/devmaster-project.zip"
                  download="devmaster-project.zip"
                  className="hidden lg:flex duo-btn duo-btn-mint !py-1.5 !px-3 text-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>ZIP</span>
                </a>
              )}

              {/* Light / Dark Mode Switch */}
              <button
                type="button"
                onClick={toggleTheme}
                className="duo-btn duo-btn-surface !px-2.5 !py-2 text-xs"
                title={theme === 'dark' ? "Yorug' rejim" : "To'q rejim"}
                aria-label="Mavzu rejimini almashtirish"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-[#ffd23f]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#ff6b86]" />
                )}
              </button>

              {/* Auth Controls */}
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <div className="hidden xl:flex flex-col text-right pr-1">
                    <span className="text-xs font-bold truncate max-w-[120px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#3ee6c4]">
                      @{currentUser.username} ·{' '}
                      {currentUser.role === 'owner'
                        ? 'Bosh Admin'
                        : currentUser.role === 'sub_admin'
                        ? currentUser.subAdminRoleTitle || "O'rinbosar Admin"
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
    </>
  );
};
