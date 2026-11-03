import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Trophy,
  Target,
  Zap,
  BookOpen,
  Star,
  Flame,
  Share2,
  X,
  Code2,
  Medal,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student, TestSubmissionResult } from '../types';
import { LESSONS } from '../data/mockData';
import { AvatarBadge } from './AvatarBadge';

interface StudentAchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  testSubmissions?: TestSubmissionResult[];
}

export const StudentAchievementsModal: React.FC<StudentAchievementsModalProps> = ({
  isOpen,
  onClose,
  student,
  testSubmissions = [],
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [copiedShare, setCopiedShare] = useState(false);

  if (!isOpen) return null;

  const htmlLessons = LESSONS.filter((l) => l.stage === 'html');
  const cssLessons = LESSONS.filter((l) => l.stage === 'css');
  const jsLessons = LESSONS.filter((l) => l.stage === 'javascript');

  const completedSet = new Set(student.completedLessons || []);
  const htmlCompletedCount = htmlLessons.filter((l) => completedSet.has(l.id)).length;
  const cssCompletedCount = cssLessons.filter((l) => completedSet.has(l.id)).length;
  const jsCompletedCount = jsLessons.filter((l) => completedSet.has(l.id)).length;
  const totalCompleted = completedSet.size;

  const studentSubmissions = testSubmissions.filter((sub) => sub.studentId === student.id);
  const bestTestScore =
    studentSubmissions.length > 0
      ? Math.max(...studentSubmissions.map((s) => s.percentage))
      : totalCompleted > 0
      ? 100
      : 0;

  const badges = [
    {
      id: 'badge-first-step',
      title: 'Birinchi Test',
      description: "Dastlabki darsni muvaffaqiyatli o'rganib amaliy kod yozish",
      icon: Zap,
      isUnlocked: totalCompleted >= 1,
      progressText: totalCompleted >= 1 ? 'Bajarildi (1/1)' : `${totalCompleted}/1 dars`,
      unlockedReward: '+50 XP mukofot',
    },
    {
      id: 'badge-7-streak',
      title: '7 Kun Streak 🔥',
      description: 'Ketma-ket 7 kun davomida dars qilib olovni saqlash',
      icon: Flame,
      isUnlocked: totalCompleted + 3 >= 7,
      progressText: `${Math.min(7, totalCompleted + 3)}/7 kun`,
      unlockedReward: 'Olovli Streak Nishoni',
    },
    {
      id: 'badge-100-score',
      title: '100% Natija',
      description: 'Sinov testida 100% natijaga erishish',
      icon: Target,
      isUnlocked: bestTestScore >= 100,
      progressText: `Rekord: ${bestTestScore}%`,
      unlockedReward: 'Snayper Medali',
    },
    {
      id: 'badge-10-lessons',
      title: '10 ta Dars',
      description: "Yo'l xaritasida 10 ta dars tugunini ochish",
      icon: Code2,
      isUnlocked: totalCompleted >= 10,
      progressText: `${totalCompleted}/10 dars`,
      unlockedReward: '+100 XP bonus',
    },
    {
      id: 'badge-top-rank',
      title: 'Liga Podiumi (Top 3)',
      description: 'Haftalik reytingda yetakchi Top 3 talaba safiga kirish',
      icon: Trophy,
      isUnlocked: student.rank <= 3,
      progressText: `O'rningiz: #${student.rank}`,
      unlockedReward: 'Oltin Toj Nishoni',
    },
    {
      id: 'badge-graduated-master',
      title: 'Diplomli Dasturchi',
      description: 'Barcha bosqichlarni tugatib rasmiy sertifikat olish',
      icon: Award,
      isUnlocked: student.stage === 'graduated',
      progressText: student.stage === 'graduated' ? 'Diplom olindi' : 'Jarayonda',
      unlockedReward: 'Rasmiy Diplom',
    },
  ];

  const unlockedCount = badges.filter((b) => b.isUnlocked).length;
  const lockedCount = badges.length - unlockedCount;

  const filteredBadges = badges.filter((b) => {
    if (activeFilter === 'unlocked') return b.isUnlocked;
    if (activeFilter === 'locked') return !b.isUnlocked;
    return true;
  });

  const handleTriggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
      });
    } catch {
      // ignore
    }

    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Men DevMaster Akademiyasida ${unlockedCount} ta nishonga erishdim! Bajarilgan darslar: ${totalCompleted}, Eng yaxshi natijam: ${bestTestScore}%!`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="aurora-card max-w-4xl w-full my-auto overflow-hidden flex flex-col max-h-[92vh]">
        <div className="p-5 sm:p-6 border-b border-[#ff6b86]/20 aurora-surface-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <AvatarBadge name={`${student.name} ${student.surname}`} role="student" size="lg" />
            <div>
              <h2 className="font-display text-lg sm:text-xl font-bold">
                {student.name} {student.surname} · Nishonlar Devori
              </h2>
              <p className="text-xs opacity-75">
                HTML: {htmlCompletedCount} · CSS: {cssCompletedCount} · JS: {jsCompletedCount}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl aurora-card cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="aurora-surface-2 p-4 rounded-2xl">
              <span className="text-xs opacity-75 block">Eng Yaxshi Natija</span>
              <span className="font-display font-mono text-2xl font-bold text-[#3ee6c4]">
                {bestTestScore > 0 ? `${bestTestScore}%` : '100%'}
              </span>
            </div>
            <div className="aurora-surface-2 p-4 rounded-2xl">
              <span className="text-xs opacity-75 block">Tugatilgan Darslar</span>
              <span className="font-display font-mono text-2xl font-bold text-[#ff8a3d]">
                {totalCompleted} ta
              </span>
            </div>
            <div className="aurora-surface-2 p-4 rounded-2xl">
              <span className="text-xs opacity-75 block">Ochilgan Nishonlar</span>
              <span className="font-display font-mono text-2xl font-bold text-[#ffd23f]">
                {unlockedCount} / {badges.length}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-base font-bold flex items-center gap-2">
              <Medal className="w-5 h-5 text-[#ffd23f]" />
              <span>Barcha Nishonlar</span>
            </h3>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl aurora-surface-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912]'
                    : 'opacity-75'
                }`}
              >
                Barchasi ({badges.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('unlocked')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  activeFilter === 'unlocked'
                    ? 'bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] text-[#0a0912]'
                    : 'opacity-75'
                }`}
              >
                Ochilgan ({unlockedCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('locked')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  activeFilter === 'locked'
                    ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff8a3d] text-[#0a0912]'
                    : 'opacity-75'
                }`}
              >
                Qulflangan ({lockedCount})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-3xl flex flex-col justify-between gap-3 ${
                    badge.isUnlocked
                      ? 'aurora-card border-2 border-[#ffd23f]'
                      : 'aurora-surface-2 opacity-50 grayscale'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] flex items-center justify-center">
                        {badge.isUnlocked ? <Icon className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                      </div>
                      <span className="font-mono text-[11px] font-bold text-[#3ee6c4]">
                        {badge.isUnlocked ? '★ Ochildi' : 'Qulflangan'}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-bold">{badge.title}</h4>
                    <p className="text-xs opacity-75 mt-1">{badge.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#ff6b86]/15 flex items-center justify-between text-[11px] font-mono">
                    <span className="opacity-75">{badge.progressText}</span>
                    <span className="text-[#ffd23f] font-bold">{badge.unlockedReward}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 sm:p-5 border-t border-[#ff6b86]/20 aurora-surface-2 flex items-center justify-between gap-3">
          <span className="text-xs opacity-75">
            Har bir yangi dars va test nishonlarni ochadi!
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTriggerCelebration}
              className="duo-btn duo-btn-mint text-xs"
            >
              {copiedShare ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Nusxalandi!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Ulashish</span>
                </>
              )}
            </button>
            <button type="button" onClick={onClose} className="duo-btn duo-btn-surface text-xs">
              <span>Yopish</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
