import React from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  TrendingUp,
  Target,
  Zap,
  ArrowRight,
  Lock,
  Trophy
} from 'lucide-react';
import { Student } from '../types';
import { LESSONS } from '../data/mockData';

interface StudentMasteryProgressProps {
  student: Student;
  onOpenTestIdModal?: () => void;
  onOpenFinalExamModal?: () => void;
  onOpenAchievementsModal?: () => void;
}

export const StudentMasteryProgress: React.FC<StudentMasteryProgressProps> = ({
  student,
  onOpenTestIdModal,
  onOpenFinalExamModal,
  onOpenAchievementsModal,
}) => {
  const htmlLessons = LESSONS.filter((l) => l.stage === 'html');
  const cssLessons = LESSONS.filter((l) => l.stage === 'css');
  const jsLessons = LESSONS.filter((l) => l.stage === 'javascript');

  const totalLessonsCount = LESSONS.length;
  const completedLessonsSet = new Set(student.completedLessons || []);

  const htmlCompletedCount = htmlLessons.filter((l) => completedLessonsSet.has(l.id)).length;
  const cssCompletedCount = cssLessons.filter((l) => completedLessonsSet.has(l.id)).length;
  const jsCompletedCount = jsLessons.filter((l) => completedLessonsSet.has(l.id)).length;
  const totalCompletedCount = completedLessonsSet.size;

  const htmlPercent = Math.min(100, Math.round((htmlCompletedCount / (htmlLessons.length || 1)) * 100));
  const cssPercent = Math.min(100, Math.round((cssCompletedCount / (cssLessons.length || 1)) * 100));
  const jsPercent = Math.min(100, Math.round((jsCompletedCount / (jsLessons.length || 1)) * 100));

  let overallPercent = Math.min(100, Math.round((totalCompletedCount / (totalLessonsCount || 1)) * 100));
  if (student.stage === 'graduated') {
    overallPercent = 100;
  }

  const getMasteryRank = (percent: number) => {
    if (percent >= 100) return { title: 'Diplomli Dasturchi', badge: 'bg-[#3ee6c4]/20 text-[#3ee6c4] border-[#3ee6c4]/30', color: '#3ee6c4' };
    if (percent >= 75) return { title: 'Senior Daraja (JavaScript)', badge: 'bg-[#ffd23f]/20 text-[#ffd23f] border-[#ffd23f]/30', color: '#ffd23f' };
    if (percent >= 45) return { title: 'Middle Daraja (CSS & Dizayn)', badge: 'bg-[#ff6b86]/20 text-[#ff6b86] border-[#ff6b86]/30', color: '#ff6b86' };
    if (percent >= 20) return { title: 'Junior Daraja (HTML Asoslari)', badge: 'bg-[#ff8a3d]/20 text-[#ff8a3d] border-[#ff8a3d]/30', color: '#ff8a3d' };
    return { title: "Boshlang'ich Qadam", badge: 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border-[var(--border-subtle)]', color: '#a59ec4' };
  };

  const masteryRank = getMasteryRank(overallPercent);

  const getNextGoalAdvice = () => {
    if (student.stage === 'graduated') {
      return {
        title: "Tabriklaymiz! Kurs to'liq tamomlandi",
        desc: "Siz butun dasturni 100% o'zlashtirdingiz va bitiruvchi sertifikatiga ega bo'ldingiz!",
        actionText: null,
      };
    }
    if (totalCompletedCount === 0) {
      return {
        title: 'Dastlabki darsni boshlang',
        desc: "1-HTML darsini oching, amaliy topshiriqni bajaring va ilk 100 XP ga ega bo'ling.",
        actionText: "Darslarga o'tish",
      };
    }
    if (htmlCompletedCount < htmlLessons.length) {
      const remaining = htmlLessons.length - htmlCompletedCount;
      return {
        title: `HTML bosqichini yakunlashga ${remaining} ta dars qoldi`,
        desc: 'HTML darslarini yakunlab, ustozingizdan Test ID oling va CSS bosqichini oching.',
        actionText: 'Darsni davom ettirish',
      };
    }
    if (student.stage === 'html' && htmlCompletedCount >= htmlLessons.length) {
      return {
        title: 'HTML darslari tugatildi! Test ID kutilyapti',
        desc: 'Ustozingiz bergan bir martalik Test ID orqali HTML imtihonini topshiring.',
        actionText: 'Test ID kiritish',
      };
    }
    if (cssCompletedCount < cssLessons.length) {
      const remaining = cssLessons.length - cssCompletedCount;
      return {
        title: `CSS bosqichini yakunlashga ${remaining} ta dars qoldi`,
        desc: "Veb sahifalarga zamonaviy dizayn va Flexbox/Grid uslublarini qo'shishni o'rganing.",
        actionText: "CSS darslarini ko'rish",
      };
    }
    if (student.stage === 'css' && cssCompletedCount >= cssLessons.length) {
      return {
        title: 'CSS yakunlandi! Ustozdan Test ID oling',
        desc: "CSS sinov testini muvaffaqiyatli topshiring va JavaScript bosqichiga qadam qo'ying.",
        actionText: 'Test ID kiritish',
      };
    }
    if (jsCompletedCount < jsLessons.length) {
      const remaining = jsLessons.length - jsCompletedCount;
      return {
        title: `JavaScript bosqichini yakunlashga ${remaining} ta dars qoldi`,
        desc: 'Dinamik funksiyalar, DOM manipulyatsiyasi va amaliy topshiriqlarni yakunlang.',
        actionText: 'JS darslarini ochish',
      };
    }
    return {
      title: 'Yakuniy Final Imtihon vaqti keldi!',
      desc: "Barcha darslar tamomlandi. 100% lik Katta Final Imtihonni topshirib bitiruvchi bo'ling.",
      actionText: 'Final Imtihonga kirish',
    };
  };

  const nextGoal = getNextGoalAdvice();

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercent / 100) * circumference;

  return (
    <div className="aurora-card rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-br from-[#ff6b86]/15 via-[#3ee6c4]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)] relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#ff6b86] to-[#ff8a3d] flex items-center justify-center text-white shadow-md">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-display font-black text-[var(--text-primary)] flex items-center gap-2">
              <span>O'zlashtirish Foizi Ko'rsatkichi</span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#3ee6c4]/15 text-[#3ee6c4] border border-[#3ee6c4]/30 uppercase">
                Jonli Statistika
              </span>
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Akademiyadagi barcha 3 ta bosqich (HTML, CSS, JavaScript) darslari va amaliy bilimlar dinamikasi
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {onOpenAchievementsModal && (
            <button
              onClick={onOpenAchievementsModal}
              className="duo-btn duo-btn-gold px-3.5 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Shaxsiy Yutuqlar va Mukofotlar oynasini ochish"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Mukofotlar & Natijalar</span>
            </button>
          )}

          <span className={`px-3 py-1 rounded-full text-xs font-black border ${masteryRank.badge} flex items-center gap-1.5 shadow-sm`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>{masteryRank.title}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-6 items-center relative z-10">
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border-subtle)] shadow-inner">
          <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-[var(--border-subtle)]"
                strokeWidth="9"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="transition-all duration-1000 ease-out"
                stroke="url(#auroraProgressGradient)"
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="auroraProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b86" />
                  <stop offset="50%" stopColor="#ffd23f" />
                  <stop offset="100%" stopColor="#3ee6c4" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-mono font-black text-[var(--text-primary)] tracking-tight flex items-baseline">
                {overallPercent}
                <span className="text-sm font-bold text-[#3ee6c4] ml-0.5">%</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider">
                O'zlashtirish
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-xs font-bold text-[var(--text-primary)]">
              {totalCompletedCount} / {totalLessonsCount} Dars Tamomlangan
            </p>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Qolgan darslar: {Math.max(0, totalLessonsCount - totalCompletedCount)} ta
            </p>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="text-[var(--text-primary)] flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#ff6b86]" />
                <span>Umumiy Kurs Yo'nalishi</span>
              </span>
              <span className="text-[#3ee6c4] font-mono font-black">{overallPercent}% / 100%</span>
            </div>

            <div className="relative w-full h-4 bg-[var(--bg-elevated)] rounded-full border border-[var(--border-subtle)] p-0.5 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ff8a3d] via-[#ff6b86] to-[#3ee6c4] transition-all duration-700 ease-out"
                style={{ width: `${Math.max(4, overallPercent)}%` }}
              />
            </div>

            <div className="grid grid-cols-3 text-[10px] font-bold text-[var(--text-secondary)] mt-1.5 px-1">
              <div className="text-left flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${htmlPercent === 100 ? 'bg-[#3ee6c4]' : 'bg-[#ff8a3d]'}`} />
                <span>HTML (0 - 33%)</span>
              </div>
              <div className="text-center flex items-center justify-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${cssPercent === 100 ? 'bg-[#3ee6c4]' : 'bg-[#ff6b86]'}`} />
                <span>CSS (34 - 66%)</span>
              </div>
              <div className="text-right flex items-center justify-end gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${jsPercent === 100 ? 'bg-[#3ee6c4]' : 'bg-[#ffd23f]'}`} />
                <span>JavaScript (67 - 100%)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[var(--bg-elevated)] p-3.5 rounded-2xl border border-[var(--border-subtle)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff8a3d]" />
                  <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">HTML5</span>
                </div>
                <span className="text-[11px] font-bold font-mono text-[#ff8a3d]">{htmlPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full bg-gradient-to-r from-[#ff8a3d] to-[#ffd23f] rounded-full transition-all duration-500"
                  style={{ width: `${htmlPercent}%` }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-secondary)]">{htmlCompletedCount} / {htmlLessons.length} dars</span>
                {htmlPercent === 100 ? (
                  <span className="text-[#3ee6c4] font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Bitirildi
                  </span>
                ) : (
                  <span className="text-[#ff8a3d] font-bold">Jarayonda</span>
                )}
              </div>
            </div>

            <div className="bg-[var(--bg-elevated)] p-3.5 rounded-2xl border border-[var(--border-subtle)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3ee6c4]" />
                  <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">CSS3</span>
                </div>
                <span className="text-[11px] font-bold font-mono text-[#3ee6c4]">{cssPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] rounded-full transition-all duration-500"
                  style={{ width: `${cssPercent}%` }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-secondary)]">{cssCompletedCount} / {cssLessons.length} dars</span>
                {cssPercent === 100 ? (
                  <span className="text-[#3ee6c4] font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Bitirildi
                  </span>
                ) : student.stage === 'html' ? (
                  <span className="text-[var(--text-muted)] flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" /> Qulflangan
                  </span>
                ) : (
                  <span className="text-[#3ee6c4] font-bold">Jarayonda</span>
                )}
              </div>
            </div>

            <div className="bg-[var(--bg-elevated)] p-3.5 rounded-2xl border border-[var(--border-subtle)] flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffd23f]" />
                  <span className="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">JavaScript</span>
                </div>
                <span className="text-[11px] font-bold font-mono text-[#ffd23f]">{jsPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="h-full bg-gradient-to-r from-[#ffd23f] to-[#ff8a3d] rounded-full transition-all duration-500"
                  style={{ width: `${jsPercent}%` }}
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[10px]">
                <span className="text-[var(--text-secondary)]">{jsCompletedCount} / {jsLessons.length} dars</span>
                {jsPercent === 100 ? (
                  <span className="text-[#3ee6c4] font-bold flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Bitirildi
                  </span>
                ) : student.stage === 'html' || student.stage === 'css' ? (
                  <span className="text-[var(--text-muted)] flex items-center gap-0.5">
                    <Lock className="w-2.5 h-2.5" /> Qulflangan
                  </span>
                ) : (
                  <span className="text-[#ffd23f] font-bold">Jarayonda</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs bg-[var(--bg-elevated)]/60 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6 p-4 sm:p-5 rounded-b-3xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ffd23f]/15 text-[#ffd23f] flex items-center justify-center shrink-0 border border-[#ffd23f]/30">
            <Zap className="w-4 h-4 fill-[#ffd23f]" />
          </div>
          <div>
            <span className="font-bold text-[var(--text-primary)] block">{nextGoal.title}</span>
            <span className="text-[var(--text-secondary)] text-[11px]">{nextGoal.desc}</span>
          </div>
        </div>

        {nextGoal.actionText && (
          <div className="flex items-center gap-2 shrink-0">
            {nextGoal.actionText.includes('Test ID') && onOpenTestIdModal && (
              <button
                onClick={onOpenTestIdModal}
                className="duo-btn duo-btn-coral px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Test ID Kiritish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            {nextGoal.actionText.includes('Final') && onOpenFinalExamModal && (
              <button
                onClick={onOpenFinalExamModal}
                className="duo-btn duo-btn-gold px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Final Imtihonni Boshlash</span>
                <Award className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
