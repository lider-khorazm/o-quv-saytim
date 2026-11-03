import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { StudentAccount } from '../data/learningCurriculum';

interface StudentRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (account: StudentAccount) => void;
  currentAccount: StudentAccount | null;
}

export function StudentRegistrationModal({
  isOpen,
  onClose,
  onRegister,
  currentAccount,
}: StudentRegistrationModalProps) {
  const [name, setName] = useState(currentAccount?.name || '');
  const [email, setEmail] = useState(currentAccount?.email || '');
  const [goal, setGoal] = useState("HTML dan boshlab to'liq sayt yaratishni o'rganish");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const account: StudentAccount = currentAccount || {
      name: name.trim(),
      email: email.trim() || `${name.trim().toLowerCase().replace(/\s+/g, '')}@student.uz`,
      registeredAt: new Date().toLocaleDateString('uz-UZ'),
      currentStage: 'html',
      completedStages: [],
      quizPassed: {
        html: false,
        css: false,
        js: false,
      },
    };

    if (currentAccount) {
      account.name = name.trim();
      account.email = email.trim();
    }

    onRegister(account);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="aurora-card max-w-md w-full p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#ff6b86]/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold">
                {currentAccount ? "O'quvchi Profilini Yangilash" : "Ta'lim Yo'liga Qo'shilish"}
              </h3>
              <p className="text-xs opacity-75">HTML → CSS → JS yo&apos;l xaritasi</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl aurora-surface-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold mb-1">Ismingiz *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masalan: Olimjon"
              className="w-full aurora-input"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">Email yoki Telegram (ixtiyoriy)</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="olimjon@misol.uz"
              className="w-full aurora-input"
            />
          </div>

          <div>
            <label className="block font-bold mb-1">O&apos;rganish maqsadi</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full aurora-input"
            >
              <option value="HTML dan boshlab to'liq sayt yaratishni o'rganish">
                HTML dan boshlab to&apos;liq sayt yaratishni o&apos;rganish
              </option>
              <option value="Zamonaviy veb-ilovalarni yaratish">
                Zamonaviy veb-ilovalarni yaratish
              </option>
              <option value="W3Schools orqali Frontend dasturchi bo'lish">
                W3Schools orqali Frontend dasturchi bo&apos;lish
              </option>
            </select>
          </div>

          <div className="aurora-surface-2 p-3.5 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#3ee6c4]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Avtomatik ta&apos;lim zanjiri:</span>
            </div>
            <p className="text-[11px] opacity-80 leading-relaxed">
              1. HTML asoslari → 2. CSS dizayni → 3. JavaScript interaktivligi va sertifikat.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="duo-btn duo-btn-surface text-xs !py-2 !px-4"
            >
              Bekor qilish
            </button>
            <button type="submit" className="duo-btn duo-btn-coral text-xs !py-2.5 !px-5">
              <span>{currentAccount ? 'Saqlash' : 'Boshlash'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
