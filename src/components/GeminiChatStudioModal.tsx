import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  X,
  Globe,
  Zap,
  Sparkles,
  Brain,
  ExternalLink,
  Copy,
  Check,
  RotateCcw,
  Search,
} from 'lucide-react';
import { AuroraMascot } from './AuroraMascot';

export type GeminiModelChoice = 'gemini-3.1-flash-lite' | 'gemini-3.8-flash' | 'gemini-4-argon';

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface GeminiTurnMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  model?: string;
  provider?: string;
  time: string;
  sources?: GroundingSource[];
  searchQueries?: string[];
}

interface GeminiChatStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  currentStage?: string;
}

const MODEL_OPTIONS: Array<{
  id: GeminiModelChoice;
  label: string;
  badge: string;
  description: string;
}> = [
  {
    id: 'gemini-3.1-flash-lite',
    label: 'Tezkor (3.1 Flash Lite)',
    badge: 'Fast',
    description: 'Tezkor savol-javob va qisqa sintaksis tekshiruvi uchun',
  },
  {
    id: 'gemini-3.8-flash',
    label: 'Umumiy (3.8 Flash)',
    badge: 'General',
    description: 'Kundalik dasturlash, W3Schools darslari va Google Search uchun',
  },
  {
    id: 'gemini-4-argon',
    label: 'Murakkab (Gemini 4 Argon)',
    badge: 'Complex',
    description: 'Murakkab algoritmlar, Three.js 3D arxitektura va chuqur tahlil uchun',
  },
];

export const GeminiChatStudioModal: React.FC<GeminiChatStudioModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Talaba',
  currentStage = 'Full-Stack',
}) => {
  const [selectedModel, setSelectedModel] = useState<GeminiModelChoice>('gemini-3.8-flash');
  const [useGoogleSearch, setUseGoogleSearch] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<GeminiTurnMessage[]>([
    {
      id: 'welcome-turn',
      role: 'model',
      text:
        `Assalomu alaykum, ${studentName}! Men Kodik — DevMaster Academy'ning Gemini AI Murabbiyiman.\n\n` +
        `• Tezkor javoblar uchun: gemini-3.1-flash-lite\n` +
        `• Umumiy dasturlash va Google Search qidiruvi uchun: gemini-3.8-flash\n` +
        `• Murakkab kod arxitekturasi uchun: gemini-4-argon\n\n` +
        `Google Search tugmasini yoqsangiz, real vaqtdagi W3Schools va MDN ma'lumotlarini manba havolalari bilan topib beraman!`,
      model: 'gemini-3.8-flash',
      provider: 'Kodik Gemini AI Mentor',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [],
    },
  ]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (e?: React.FormEvent, presetPrompt?: string) => {
    if (e) e.preventDefault();
    const promptText = (presetPrompt ?? input).trim();
    if (!promptText || loading) return;

    const userMsg: GeminiTurnMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: promptText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!presetPrompt) setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptText,
          history: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          model: selectedModel,
          useGoogleSearch,
          lessonContext: `Talaba: ${studentName}, Yo'nalish: ${currentStage}`,
        }),
      });

      const data = await response.json();
      const aiMsg: GeminiTurnMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply || "Savolingiz bo'yicha javob tayyorlandi.",
        model: data.model || selectedModel,
        provider: data.provider || `Gemini (${selectedModel})`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: Array.isArray(data.sources) ? data.sources : [],
        searchQueries: Array.isArray(data.searchQueries) ? data.searchQueries : [],
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          text: 'Server bilan aloqada uzilish yuz berdi. Savolingizni qaytadan yuboring.',
          provider: 'Tizim xabari',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `Suhbat tarixi tozalandi. Yangi savolingizni yozing!`,
        model: selectedModel,
        provider: `Gemini (${selectedModel})`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const starterPrompts = [
    {
      text: "W3Schools bo'yicha JavaScript Async/Await va Promise farqini misol bilan tushuntir",
      search: false,
      model: 'gemini-3.8-flash' as GeminiModelChoice,
    },
    {
      text: 'HTML5 semantik teglari va ularning vazifalarini yozib ber',
      search: false,
      model: 'gemini-3.1-flash-lite' as GeminiModelChoice,
    },
    {
      text: 'CSS Grid va Flexbox yordamida zamonaviy kartochkalar qanday yasaladi?',
      search: true,
      model: 'gemini-3.8-flash' as GeminiModelChoice,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl h-[88vh] aurora-card flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-white/10 bg-white/5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AuroraMascot mood={loading ? 'thinking' : 'excited'} size={46} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  Kodik Gemini AI Mentor & Google Search Studio
                </h2>
                <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">
                  {useGoogleSearch ? 'Google Search Faol' : selectedModel}
                </span>
              </div>
              <p className="text-xs opacity-70">
                Ko'p bosqichli suhbat xotirasi · 3 xil Gemini modeli · Real vaqtdagi Google Search
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetChat}
              className="duo-btn duo-btn-surface px-3 py-2 text-xs"
              title="Suhbat tarixini tozalash"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Yangi Suhbat</span>
            </button>
            <button type="button" onClick={onClose} className="duo-btn duo-btn-surface p-2" aria-label="Yopish">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Model Selection & Google Search Grounding Bar */}
        <div className="px-5 py-3 border-b border-white/10 bg-white/5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-black/30 border border-white/10 rounded-2xl overflow-x-auto">
            {MODEL_OPTIONS.map((opt) => {
              const isActive = selectedModel === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedModel(opt.id)}
                  title={opt.description}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {opt.id === 'gemini-3.1-flash-lite' && <Zap className="w-3.5 h-3.5" />}
                  {opt.id === 'gemini-3.8-flash' && <Sparkles className="w-3.5 h-3.5" />}
                  {opt.id === 'gemini-4-argon' && <Brain className="w-3.5 h-3.5" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setUseGoogleSearch((prev) => !prev)}
            className={`duo-btn px-4 py-2 text-xs ${
              useGoogleSearch ? 'duo-btn-mint' : 'duo-btn-surface'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Google Search: {useGoogleSearch ? 'Yoqilgan' : "O'chirilgan"}</span>
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white rounded-br-none shadow-lg'
                    : 'bg-white/8 border border-white/10 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-4 pb-2 mb-2 border-b border-white/10 text-[11px] opacity-80">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black">
                      {m.role === 'user' ? studentName : m.provider || 'Kodik Gemini AI'}
                    </span>
                    <span>·</span>
                    <span className="font-mono">{m.time}</span>
                  </div>

                  {m.role === 'model' && (
                    <button
                      type="button"
                      onClick={() => handleCopy(m.text, m.id)}
                      className="flex items-center gap-1 cursor-pointer hover:text-[#3ee6c4]"
                    >
                      {copiedId === m.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#3ee6c4]" />
                          <span className="text-[#3ee6c4]">Nusxalandi</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Nusxalash</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                <div className="whitespace-pre-wrap">{m.text}</div>

                {m.sources && m.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-[#3ee6c4]">
                      <Search className="w-3.5 h-3.5" />
                      <span>Google Search Manbalari ({m.sources.length} ta):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {m.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-xl bg-black/30 border border-white/10 flex items-center justify-between gap-2 text-xs text-[#3ee6c4]"
                        >
                          <span className="truncate font-bold">{src.title || src.uri}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-[#3ee6c4] bg-[#3ee6c4]/10 border border-[#3ee6c4]/30 px-4 py-3 rounded-2xl w-fit font-bold">
              <AuroraMascot mood="thinking" size={32} />
              <span>Kodik yozayapti…</span>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Starter Prompts */}
        <div className="px-5 py-2.5 bg-white/5 border-t border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="opacity-60 font-black shrink-0">Tez savollar:</span>
          {starterPrompts.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedModel(item.model);
                setUseGoogleSearch(item.search);
                handleSendMessage(undefined, item.text);
              }}
              className="duo-btn duo-btn-surface px-3 py-1.5 text-xs whitespace-nowrap"
            >
              {item.search ? '🌐 ' : ''}
              {item.text}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => handleSendMessage(e)}
          className="p-4 bg-white/5 border-t border-white/10 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Savolingizni yozing..."
            className="aurora-input flex-1 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="duo-btn duo-btn-coral px-5 py-3 text-xs sm:text-sm disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span>Yuborish</span>
          </button>
        </form>
      </div>
    </div>
  );
};
