import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  Users,
} from 'lucide-react';
import { CourseStage, Teacher } from '../types';

interface ScheduleItem {
  id: string;
  day: string;
  dayShort: string;
  time: string;
  stage: CourseStage;
  topic: string;
  type: 'live' | 'practice' | 'review' | 'exam';
  teacherName?: string;
  isToday?: boolean;
  status: 'upcoming' | 'live_soon' | 'completed';
}

interface WeeklyScheduleProps {
  currentStage: CourseStage;
  teacher?: Teacher | null;
  onSelectLessonTopic?: (topic: string) => void;
}

export const WeeklySchedule: React.FC<WeeklyScheduleProps> = ({
  currentStage,
  teacher,
}) => {
  const scheduleData: ScheduleItem[] = [
    {
      id: 'sch-1',
      day: 'Dushanba',
      dayShort: 'Dush',
      time: '19:00 - 20:30',
      stage: 'html',
      topic: 'HTML Semantikasi, audio/video teglar va amaliy forma yaratish',
      type: 'live',
      teacherName: teacher ? `${teacher.name} ${teacher.surname}` : 'Guruh ustozi',
      isToday: new Date().getDay() === 1,
      status: 'upcoming',
    },
    {
      id: 'sch-2',
      day: 'Seshanba',
      dayShort: 'Sesh',
      time: '18:30 - 20:00',
      stage: 'html',
      topic: 'Mustaqil amaliyot & Kod tahlili: Semantik veb sahifa skeleti',
      type: 'practice',
      teacherName: 'Mentor yordamchisi',
      isToday: new Date().getDay() === 2,
      status: 'upcoming',
    },
    {
      id: 'sch-3',
      day: 'Chorshanba',
      dayShort: 'Chor',
      time: '19:00 - 20:30',
      stage: 'css',
      topic: 'CSS Flexbox va Grid: Zamonaviy moslashuvchan (Responsive) kartalar',
      type: 'live',
      teacherName: teacher ? `${teacher.name} ${teacher.surname}` : 'Guruh ustozi',
      isToday: new Date().getDay() === 3,
      status: 'upcoming',
    },
    {
      id: 'sch-4',
      day: 'Payshanba',
      dayShort: 'Pay',
      time: '19:00 - 20:15',
      stage: 'css',
      topic: "CSS Animatsiyalar & Tailwind asoslari bo'yicha jonli vorkshop",
      type: 'practice',
      teacherName: 'Front-End Mentor',
      isToday: new Date().getDay() === 4,
      status: 'upcoming',
    },
    {
      id: 'sch-5',
      day: 'Juma',
      dayShort: 'Jum',
      time: '19:30 - 21:00',
      stage: 'javascript',
      topic: 'Juma Katta Jonli Zoom Darsi: W3Schools Amaliyot, Jonli Kodlash & Savol-Javob',
      type: 'live',
      teacherName: teacher ? `${teacher.name} ${teacher.surname}` : 'Guruh ustozi',
      isToday: new Date().getDay() === 5,
      status: 'upcoming',
    },
    {
      id: 'sch-6',
      day: 'Shanba',
      dayShort: 'Shan',
      time: '17:00 - 18:30',
      stage: 'javascript',
      topic: 'Haftalik Test & 15 talaba bilan savol-javob, kod reviziyasi',
      type: 'review',
      teacherName: teacher ? `${teacher.name} ${teacher.surname}` : 'Guruh ustozi',
      isToday: new Date().getDay() === 6,
      status: 'upcoming',
    },
  ];

  const [filterType, setFilterType] = useState<'all' | 'stage' | 'live'>('all');

  const filteredSchedule = scheduleData.filter((item) => {
    if (filterType === 'stage') {
      if (currentStage === 'graduated') return true;
      return item.stage === currentStage;
    }
    if (filterType === 'live') {
      return item.type === 'live';
    }
    return true;
  });

  const getTypeBadge = (type: ScheduleItem['type']) => {
    switch (type) {
      case 'live':
        return {
          label: 'Jonli Dars',
          className: 'bg-[#b6f03c]/15 text-[#b6f03c] border-[#b6f03c]/30',
          dotColor: 'bg-[#b6f03c]',
        };
      case 'practice':
        return {
          label: 'Amaliyot',
          className: 'bg-[#3ee6c4]/15 text-[#3ee6c4] border-[#3ee6c4]/30',
          dotColor: 'bg-[#3ee6c4]',
        };
      case 'review':
        return {
          label: 'Test & Tahlil',
          className: 'bg-[#ffd23f]/15 text-[#ffd23f] border-[#ffd23f]/30',
          dotColor: 'bg-[#ffd23f]',
        };
      case 'exam':
      default:
        return {
          label: 'Imtihon',
          className: 'bg-[#ff6b86]/15 text-[#ff6b86] border-[#ff6b86]/30',
          dotColor: 'bg-[#ff6b86]',
        };
    }
  };

  return (
    <div className="aurora-card border-2 border-[var(--aurora-border)] rounded-[2rem] p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[var(--aurora-border)] relative z-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ff6b86]/15 text-[#ff6b86] flex items-center justify-center border border-[#ff6b86]/30">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-[var(--aurora-text)] flex items-center gap-2 font-display">
              <span>Haftalik Dars Jadvali</span>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#ffd23f]/15 text-[#ffd23f] border border-[#ffd23f]/30 uppercase">
                Guruh Rejasi
              </span>
            </h3>
          </div>
          <p className="text-xs text-[var(--aurora-text-muted)] mt-1">
            15 kishilik guruh uchun belgilangan dars kunlari, vaqti va mavzular rejasi
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 bg-[var(--aurora-surface-2)] p-1 rounded-xl border border-[var(--aurora-border)] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#ff6b86] text-[#0a0912]'
                : 'text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
            }`}
          >
            Barchasi (6 kun)
          </button>
          <button
            type="button"
            onClick={() => setFilterType('stage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer uppercase ${
              filterType === 'stage'
                ? 'bg-[#3ee6c4] text-[#0a0912]'
                : 'text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
            }`}
          >
            {currentStage === 'graduated' ? 'Barcha bosqichlar' : `${currentStage} darslari`}
          </button>
          <button
            type="button"
            onClick={() => setFilterType('live')}
            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
              filterType === 'live'
                ? 'bg-[#b6f03c] text-[#0a0912]'
                : 'text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
            }`}
          >
            Jonli efirlar
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="mt-4 overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[var(--aurora-border)] text-[var(--aurora-text-muted)] uppercase text-[10px] font-black tracking-wider">
              <th className="py-2.5 px-3">Kun</th>
              <th className="py-2.5 px-3">Vaqt</th>
              <th className="py-2.5 px-3">Dars Mavzusi</th>
              <th className="py-2.5 px-3">Format</th>
              <th className="py-2.5 px-3 hidden sm:table-cell">Mas&apos;ul</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--aurora-border)] text-[var(--aurora-text)]">
            {filteredSchedule.map((item) => {
              const badge = getTypeBadge(item.type);

              return (
                <tr
                  key={item.id}
                  className={`transition-colors hover:bg-[#ff6b86]/10 ${
                    item.isToday ? 'bg-[#ff6b86]/15 border-l-2 border-[#ff6b86]' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-black whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <span>{item.day}</span>
                      {item.isToday && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-[#ff6b86] text-[#0a0912] uppercase tracking-wider">
                          Bugun
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-mono font-bold text-[#3ee6c4] text-[11px]">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.time}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold leading-snug">{item.topic}</span>
                      <span className="px-2 py-0.5 rounded-lg text-[9px] font-mono font-black uppercase bg-[var(--aurora-surface-2)] text-[#ffd23f] border border-[var(--aurora-border)] shrink-0">
                        {item.stage}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border inline-flex items-center gap-1.5 ${badge.className}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dotColor}`} />
                      <span>{badge.label}</span>
                    </span>
                  </td>

                  <td className="py-3 px-3 whitespace-nowrap hidden sm:table-cell text-[var(--aurora-text-muted)] text-[11px]">
                    <div className="flex items-center gap-1 font-bold">
                      <Users className="w-3 h-3" />
                      <span>{item.teacherName}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-4 pt-3 border-t border-[var(--aurora-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-[var(--aurora-text-muted)]">
        <div className="flex items-center gap-1.5 font-bold">
          <Sparkles className="w-3.5 h-3.5 text-[#ffd23f] shrink-0" />
          <span>Dars boshlanishidan 10 daqiqa oldin guruh chatiga kirish havolasi yuboriladi.</span>
        </div>
        <div className="font-bold text-[#3ee6c4]">
          Haftada 3 ta jonli dars + 3 ta amaliy mashg&apos;ulot
        </div>
      </div>
    </div>
  );
};
