import React from 'react';
import { X, MessageCircle, Award, Zap, Coins, Calendar, Swords, Share2 } from 'lucide-react';
import { Student } from '../types';
import { AvatarWithFrame, getStageSticker, isStudentCurrentlyOnline } from './AvatarWithFrame';

interface StudentPublicProfileModalProps {
  student: Student | null;
  isCurrentUser?: boolean;
  onClose: () => void;
  onOpenGroupChat?: () => void;
}

export const StudentPublicProfileModal: React.FC<StudentPublicProfileModalProps> = ({
  student,
  isCurrentUser = false,
  onClose,
  onOpenGroupChat,
}) => {
  if (!student) return null;

  const online = isStudentCurrentlyOnline(student, isCurrentUser);
  const sticker = getStageSticker(student.stage, student.equippedBadge);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-3xl bg-[#1c242f] border border-white/15 shadow-2xl overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Top Section (Telegram Info Card Style matching user's screenshot) */}
        <div className="relative pt-7 pb-5 px-6 flex flex-col items-center text-center bg-[#17212b]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 cursor-pointer"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          <AvatarWithFrame
            student={student}
            size={96}
            isCurrentUser={isCurrentUser}
            showSticker={true}
            showOnlineDot={true}
          />

          <h3 className="mt-4 text-lg font-extrabold tracking-tight text-white">
            {student.name} {student.surname}
          </h3>

          <span
            className={`text-xs font-semibold mt-0.5 ${
              online ? 'text-[#38bdf8]' : 'text-[#ef4444]'
            }`}
          >
            {online ? 'online' : 'offline'}
          </span>

          {/* Action Buttons Row (Message | Stage Badge) */}
          <div className="grid grid-cols-2 gap-3 w-full mt-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenGroupChat) onOpenGroupChat();
              }}
              className="py-2.5 px-4 rounded-xl bg-[#232e3c] hover:bg-[#2b394a] transition-colors flex flex-col items-center justify-center gap-1 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#38bdf8]" />
              <span className="text-xs font-semibold text-white/90">Xabar yozish</span>
            </button>

            <div className="py-2.5 px-4 rounded-xl bg-[#232e3c] flex flex-col items-center justify-center gap-1">
              <span className="text-sm">{sticker.icon}</span>
              <span className="text-xs font-semibold text-white/90">{sticker.label}</span>
            </div>
          </div>
        </div>

        {/* Info Rows (Mobile, Bio, Username, Age/Joined) */}
        <div className="p-5 space-y-4 bg-[#17212b] mt-2">
          <div>
            <div className="text-sm font-medium text-white">
              {student.phone || '+998 90 000 00 00'}
            </div>
            <div className="text-xs text-white/45">Telefon raqami (Mobile)</div>
          </div>

          <div>
            <div className="text-sm font-medium text-white">
              {student.bio || `${student.stage.toUpperCase()} bosqichi dasturchisi • DevMaster Academy`}
            </div>
            <div className="text-xs text-white/45">Ma&apos;lumot (Bio)</div>
          </div>

          <div>
            <div className="text-sm font-mono font-semibold text-[#38bdf8]">
              @{student.username}
            </div>
            <div className="text-xs text-white/45">Username</div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div>
              <div className="text-sm font-medium text-white">
                {student.age ? `${student.age} yosh` : '16 yosh'} • {student.joinedDate || '2026'}
              </div>
              <div className="text-xs text-white/45">Yosh va Qo&apos;shilgan sana</div>
            </div>
            <Calendar className="w-4 h-4 text-white/40" />
          </div>
        </div>

        {/* Academic & League Stats Section */}
        <div className="p-5 bg-[#17212b] mt-2 space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2.5 text-white/80">
              <Zap className="w-4 h-4 text-[#3ee6c4]" />
              <span>Tajriba ballari (XP)</span>
            </span>
            <span className="font-mono font-bold text-[#3ee6c4]">{student.xp} XP</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2.5 text-white/80">
              <Coins className="w-4 h-4 text-[#ffd23f]" />
              <span>Tangalar hisobi</span>
            </span>
            <span className="font-mono font-bold text-[#ffd23f]">
              {Number(student.coins || 0).toFixed(1)} 🪙
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2.5 text-white/80">
              <Award className="w-4 h-4 text-[#ff6b86]" />
              <span>Tugatilgan darslar</span>
            </span>
            <span className="font-mono font-bold text-white">
              {student.completedLessons?.length || 0} ta dars
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-2.5 text-white/80">
              <Swords className="w-4 h-4 text-[#b6f03c]" />
              <span>Liga janglari (G&apos;alaba / Mag&apos;lubiyat)</span>
            </span>
            <span className="font-mono font-bold text-[#b6f03c]">
              {student.pvpWins || 0}W / {student.pvpLosses || 0}L
            </span>
          </div>

          {student.interests && student.interests.length > 0 && (
            <div className="pt-2 border-t border-white/10 text-[11px] text-white/70 flex items-center gap-1.5 flex-wrap">
              <Share2 className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
              <span>{student.interests.join(' · ')}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
