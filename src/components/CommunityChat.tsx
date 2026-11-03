import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  Users
} from 'lucide-react';
import { StudentAccount } from '../data/learningCurriculum';

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: 'admin' | 'student' | 'member';
  senderEmail: string;
  text: string;
  timestamp: string;
  avatarUrl?: string;
}

const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    senderName: 'Olimjon',
    senderRole: 'admin',
    senderEmail: 'legend_o1@akademiya.uz',
    text: "Assalomu alaykum bo'lajak dasturchilar! Hamjamiyat chatimizga xush kelibsiz. VS Code da yaratgan HTML portfoliolaringizni bemalol yuborishingiz mumkin!",
    timestamp: 'Bugun, 09:30',
  },
  {
    id: 'msg_2',
    senderName: 'Umirbek',
    senderRole: 'student',
    senderEmail: 'umirbek@akademiya.uz',
    text: 'Assalomu alaykum ustoz! Men HTML va CSS bosqichlarini tugatib, shaxsiy portfolio sahifamni yasadim.',
    timestamp: 'Bugun, 10:15',
  },
  {
    id: 'msg_3',
    senderName: 'Sardor',
    senderRole: 'student',
    senderEmail: 'sardor@akademiya.uz',
    text: "Zo'r Umirbek! Men esa Flexbox va Grid yordamida moslashuvchan kartochka dizaynini qildim.",
    timestamp: 'Bugun, 11:02',
  },
];

interface CommunityChatProps {
  currentStudent: StudentAccount | null;
  isAdmin: boolean;
}

export function CommunityChat({ currentStudent, isAdmin }: CommunityChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('tanishuv_community_chat');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CHAT_MESSAGES;
  });

  const [inputText, setInputText] = useState('');
  const [authorName, setAuthorName] = useState(
    isAdmin ? 'Olimjon (Admin)' : currentStudent?.name || 'Talaba'
  );

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const role: 'admin' | 'student' | 'member' = isAdmin ? 'admin' : 'student';
    const email = isAdmin
      ? 'legend_o1@akademiya.uz'
      : currentStudent?.email || `${authorName.toLowerCase().replace(/\s+/g, '')}@akademiya.uz`;

    const newMsg: ChatMessage = {
      id: 'chat_' + Date.now(),
      senderName: authorName.trim(),
      senderRole: role,
      senderEmail: email,
      text: inputText.trim(),
      timestamp: 'Hozirgina',
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    try {
      localStorage.setItem('tanishuv_community_chat', JSON.stringify(updated));
    } catch {}
    setInputText('');
  };

  return (
    <div className="aurora-card overflow-hidden flex flex-col h-[75vh]">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#ff6b86] to-[#ffd23f] text-white flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black">Akademiya & Hamjamiyat Chati</h3>
              <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">Jonli Muloqot</span>
            </div>
            <p className="text-xs opacity-70">
              Barcha o'quvchilar, ustozlar va admin uchun umumiy ochiq muhokama maydoni
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs opacity-75 font-mono">
          <Users className="w-4 h-4 text-[#3ee6c4]" />
          <span className="font-bold">{messages.length} ta xabar</span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m) => {
          const isMsgAdmin = m.senderRole === 'admin';
          return (
            <div key={m.id} className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shrink-0 ${
                  isMsgAdmin
                    ? 'bg-gradient-to-br from-[#ffd23f] to-[#ff8a3d] text-[#2b1d00]'
                    : 'bg-[#ff6b86]/20 text-[#ff6b86] border border-[#ff6b86]/30'
                }`}
              >
                {m.senderName.charAt(0)}
              </div>

              <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black">{m.senderName}</span>
                    {isMsgAdmin ? (
                      <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f]">
                        <ShieldCheck className="w-3 h-3" />
                        Admin @legend_o1
                      </span>
                    ) : (
                      <span className="text-[10px] opacity-60 font-mono">{m.senderEmail}</span>
                    )}
                  </div>
                  <span className="text-[10px] opacity-50 font-mono">{m.timestamp}</span>
                </div>

                <p className="text-xs sm:text-sm opacity-90 leading-relaxed">{m.text}</p>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Ismingiz..."
            className="aurora-input w-32 sm:w-40 text-xs py-2.5"
          />
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Xabaringizni yozing..."
            className="aurora-input flex-1 text-xs py-2.5"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="duo-btn duo-btn-coral px-4 py-2.5 text-xs disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Yuborish</span>
          </button>
        </form>
      </div>
    </div>
  );
}
