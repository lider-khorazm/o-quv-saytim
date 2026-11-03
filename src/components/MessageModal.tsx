import React, { useState } from 'react';
import { MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Student, Teacher } from '../types';
import { sendGroupMessage } from '../services/storage';
import { AvatarBadge } from './AvatarBadge';

interface MessageModalProps {
  teacher: Teacher;
  student: Student;
  onClose: () => void;
  onSent: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  teacher,
  student,
  onClose,
  onSent,
}) => {
  const [message, setMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    sendGroupMessage({
      teacherId: teacher.id,
      senderId: teacher.id,
      senderName: `${teacher.name} ${teacher.surname} (Ustoz)`,
      senderRole: 'teacher',
      avatar: teacher.avatar,
      text: `@${student.name} ${student.surname}: ${message.trim()}`,
    });

    setSentSuccess(true);
    onSent();
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="aurora-card max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="duo-btn duo-btn-surface absolute top-4 right-4 w-8 h-8"
        >
          ✕
        </button>

        {!sentSuccess ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center border border-[#3ee6c4]/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black">O'quvchiga Xabar Yo'llash</h3>
                <p className="text-xs opacity-70">
                  {student.name} {student.surname} uchun guruh chatida ko'rinuvchi murojaat
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3">
                <AvatarBadge
                  name={`${student.name} ${student.surname}`}
                  role="student"
                  size="md"
                  className="w-10 h-10"
                />
                <div>
                  <span className="font-black block">
                    {student.name} {student.surname}
                  </span>
                  <span className="text-[11px] text-[#3ee6c4] font-mono">
                    Bosqich: {student.stage.toUpperCase()} | {student.xp} XP
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1.5">Xabar matni:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Salom, dars topshiriqlarini juda yaxshi bajarmoqdasiz!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="aurora-input text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="duo-btn duo-btn-surface px-4 py-2 text-xs"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-mint px-5 py-2 text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>Xabarni Yuborish</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#3ee6c4] mx-auto" />
            <h4 className="text-base font-black">Xabar Guruhga Yuborildi!</h4>
            <p className="text-xs opacity-70">
              O'quvchi guruh chatida xabaringizni ko'radi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
