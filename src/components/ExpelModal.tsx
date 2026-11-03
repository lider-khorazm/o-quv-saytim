import React, { useState } from 'react';
import { UserX, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { Student, Teacher } from '../types';
import { createExpelRequest } from '../services/storage';
import { AvatarBadge } from './AvatarBadge';

interface ExpelModalProps {
  teacher: Teacher;
  student: Student;
  onClose: () => void;
  onSubmitted: () => void;
}

export const ExpelModal: React.FC<ExpelModalProps> = ({
  teacher,
  student,
  onClose,
  onSubmitted,
}) => {
  const [reason, setReason] = useState('Darslarga doimiy qatnashmaslik va topshiriqlarni bajarmaslik');
  const [customNotes, setCustomNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullReason = customNotes ? `${reason} — ${customNotes}` : reason;

    createExpelRequest({
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
      reason: fullReason,
    });

    setIsSubmitting(false);
    setDone(true);
    onSubmitted();
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="aurora-card max-w-md w-full p-6 relative border-[#ff6b86]/40">
        <button
          onClick={onClose}
          className="duo-btn duo-btn-surface absolute top-4 right-4 w-8 h-8"
        >
          ✕
        </button>

        {done ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#3ee6c4] mx-auto" />
            <h4 className="text-base font-black">So'rov Bosh Adminga Yuborildi!</h4>
            <p className="text-xs opacity-75">
              Admin tez orada {student.name} {student.surname} bo'yicha so'rovingizni ko'rib chiqadi.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center border border-[#ff6b86]/30">
                <UserX className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black">O'quvchini Chetlatish So'rovi</h3>
                <p className="text-xs opacity-70">
                  Talabani guruhdan chetlatish bo'yicha adminga rasmiy ariza
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
                  <span className="font-black block text-sm">
                    {student.name} {student.surname}
                  </span>
                  <span className="text-[11px] opacity-70 font-mono">
                    Bosqich: {student.stage.toUpperCase()} | XP: {student.xp}
                  </span>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1.5">Chetlatish sababini tanlang:</label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="aurora-input text-xs"
                >
                  <option value="Darslarga doimiy qatnashmaslik va topshiriqlarni bajarmaslik">
                    Darslarga doimiy qatnashmaslik va topshiriqlarni bajarmaslik
                  </option>
                  <option value="Berilgan Test ID larni o'z vaqtida topshirmaslik">
                    Berilgan Test ID larni o'z vaqtida topshirmaslik
                  </option>
                  <option value="Guruh chatida nojo'ya xatti-harakatlar yoki spam">
                    Guruh chatida nojo'ya xatti-harakatlar yoki spam
                  </option>
                  <option value="Boshqa jiddiy sabab">Boshqa jiddiy sabab</option>
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1.5">Qo'shimcha izoh:</label>
                <textarea
                  rows={3}
                  placeholder="Admin uchun qo'shimcha tafsilotlar..."
                  value={customNotes}
                  onChange={(e) => setCustomNotes(e.target.value)}
                  className="aurora-input text-xs"
                />
              </div>

              <div className="p-3 bg-[#ff6b86]/15 border border-[#ff6b86]/30 rounded-2xl text-[#ff6b86] text-[11px] flex items-start gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Ushbu so'rov darhol Bosh Admin panelida ko'rinadi va tasdiqlangach talaba guruhingizdan chiqariladi.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="duo-btn duo-btn-surface px-4 py-2 text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="duo-btn duo-btn-coral px-5 py-2 text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Adminga So'rov Yuborish</span>
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
