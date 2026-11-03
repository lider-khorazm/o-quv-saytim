import React, { useState } from 'react';
import {
  Mail,
  Inbox,
  Send,
  X,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import { StudentAccount } from '../data/learningCurriculum';

interface EmailMessage {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  isOfficial?: boolean;
}

interface StudentWebmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentAccount: StudentAccount | null;
  onOpenRegister: () => void;
}

export function StudentWebmailModal({
  isOpen,
  onClose,
  studentAccount,
}: StudentWebmailModalProps) {
  const studentEmail = studentAccount?.email || 'talaba@akademiya.uz';
  const studentName = studentAccount?.name || "Hurmatli O'quvchi";

  const [emails] = useState<EmailMessage[]>([
    {
      id: 'em_1',
      from: 'Bosh Admin (legend_o1@akademiya.uz)',
      subject: 'Rasmiy Akademiya elektron pochta manzilingiz faollashtirildi! 🎓',
      preview: 'Hurmatli talaba! Sizga rasmiy @akademiya.uz domeni ostida yangi shaxsiy pochta berildi...',
      body: `Assalomu alaykum, ${studentName}!\n\nSizni DevMaster & Aurora Sunset Web Dasturlash Akademiyasida qutlaymiz!\nSiz uchun rasmiy ${studentEmail} pochta manzili muvaffaqiyatli ochildi.\n\nUshbu pochta orqali siz:\n1. Topshirgan portfolio ishlaringizning admin tomonidan tasdiqlanish xabarlarini olasiz.\n2. HTML, CSS va JavaScript darslari bo'yicha yangilanishlardan xabardor bo'lasiz.\n3. Kursni bitirganingizda PDF sertifikatingiz nusxasi shu manzilga yo'llanadi.\n\nMuvaffaqiyatlar tilaymiz!\nAdmin @legend_o1`,
      date: 'Bugun, 09:00',
      isOfficial: true,
    },
    {
      id: 'em_2',
      from: "Akademiya Ta'lim Bo'limi (courses@akademiya.uz)",
      subject: "Yangi darsliklar: HTML, CSS va JavaScript amaliy mashqlari",
      preview: "Saytda Duolingo uslubidagi yangi o'quv yo'l xaritasi ochildi...",
      body: `Salom, ${studentName}!\n\nKursingiz dasturiga yangi interaktiv yo'l xaritasi, kunlik vazifalar va XP ligasi qo'shildi. Darslarni topshirib, o'z bilimingizni mustahkamlashingiz mumkin!`,
      date: 'Kecha, 18:30',
      isOfficial: true,
    },
  ]);

  const [selectedEmail, setSelectedEmail] = useState<EmailMessage | null>(emails[0]);
  const [isComposing, setIsComposing] = useState(false);
  const [recipient, setRecipient] = useState('legend_o1@akademiya.uz');
  const [subject, setSubject] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !bodyText.trim()) return;

    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setIsComposing(false);
      setSubject('');
      setBodyText('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="aurora-card max-w-3xl w-full h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#3ee6c4] to-[#b6f03c] text-[#052922] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black">Talaba Pochta Qutisi</h3>
                <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4] font-mono">
                  {studentEmail}
                </span>
              </div>
              <p className="text-xs opacity-70">
                O'quvchi va Admin o'rtasidagi rasmiy xabarlar almashinuvi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setIsComposing(true)} className="duo-btn duo-btn-coral px-3.5 py-2 text-xs">
              <Send className="w-3.5 h-3.5" />
              <span>Xat yozish</span>
            </button>
            <button onClick={onClose} className="duo-btn duo-btn-surface p-2">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content split */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Inbox list */}
          <div className="md:col-span-5 border-r border-white/10 overflow-y-auto bg-white/3">
            <div className="p-3 border-b border-white/10 text-xs font-black opacity-75 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Inbox className="w-3.5 h-3.5 text-[#3ee6c4]" />
                Kiruvchi xatlar ({emails.length})
              </span>
            </div>

            <div className="divide-y divide-white/10">
              {emails.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedEmail(m);
                    setIsComposing(false);
                  }}
                  className={`w-full text-left p-4 transition-colors block cursor-pointer ${
                    selectedEmail?.id === m.id && !isComposing
                      ? 'bg-[#ff6b86]/15 border-l-4 border-[#ff6b86]'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-black truncate max-w-[170px]">{m.from.split('(')[0]}</span>
                    <span className="opacity-50 font-mono text-[10px]">{m.date}</span>
                  </div>
                  <h5 className="text-xs font-bold truncate mb-1 text-[#ffd23f]">{m.subject}</h5>
                  <p className="text-[11px] opacity-65 line-clamp-1">{m.preview}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Email View or Compose */}
          <div className="md:col-span-7 flex flex-col overflow-y-auto p-5">
            {isComposing ? (
              <form onSubmit={handleSendEmail} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h4 className="text-xs font-black uppercase tracking-wider">Yangi xat jo'natish</h4>
                  <button
                    type="button"
                    onClick={() => setIsComposing(false)}
                    className="text-xs opacity-60 hover:opacity-100"
                  >
                    Bekor qilish
                  </button>
                </div>

                {sentSuccess ? (
                  <div className="p-8 text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-[#3ee6c4] mx-auto" />
                    <h5 className="text-sm font-black">Xat muvaffaqiyatli adminga yuborildi!</h5>
                    <p className="text-xs opacity-70">
                      Tez orada javob xatini pochtangizda qabul qilasiz.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold mb-1">Kimga (Admin pochta):</label>
                      <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="aurora-input text-xs py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold mb-1">Mavzu:</label>
                      <input
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Masalan: Portfolio ishim haqida savol"
                        className="aurora-input text-xs py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold mb-1">Xabar matni:</label>
                      <textarea
                        rows={6}
                        required
                        value={bodyText}
                        onChange={(e) => setBodyText(e.target.value)}
                        placeholder="Hurmatli admin..."
                        className="aurora-input text-xs"
                      />
                    </div>

                    <button type="submit" className="duo-btn duo-btn-coral px-5 py-2.5 text-xs">
                      <Send className="w-3.5 h-3.5" />
                      <span>Xatni yuborish</span>
                    </button>
                  </>
                )}
              </form>
            ) : selectedEmail ? (
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 mb-1.5">
                    {selectedEmail.isOfficial && (
                      <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f]">
                        <ShieldCheck className="w-3 h-3" />
                        Rasmiy Xabarnoma
                      </span>
                    )}
                    <span className="text-[10px] opacity-55 font-mono">{selectedEmail.date}</span>
                  </div>
                  <h4 className="text-base font-black">{selectedEmail.subject}</h4>
                  <p className="text-xs opacity-70 mt-1">
                    Kimdan: <strong className="text-[#3ee6c4]">{selectedEmail.from}</strong>
                  </p>
                </div>

                <div className="text-xs sm:text-sm opacity-90 leading-relaxed whitespace-pre-wrap">
                  {selectedEmail.body}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
