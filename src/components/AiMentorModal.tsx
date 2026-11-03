import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Key,
  X,
  Copy,
  Check,
  User,
  Sparkles,
  Mic,
  MicOff
} from 'lucide-react';
import { CmdBekMascot } from './CmdBekMascot';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  provider?: string;
  time: string;
}

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVoicePrompt?: string;
  onVoicePromptConsumed?: () => void;
}

const SHARED_GROQ_KEY = '';

export function AiMentorModal({
  isOpen,
  onClose,
  initialVoicePrompt,
  onVoicePromptConsumed,
}: AiMentorModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: "Assalomu alaykum! Men CMDbek — sizning Web Dasturlash (HTML, CSS, JavaScript va Python) bo'yicha tezkor AI murabbiyingizman. Tushunmagan kodingiz, HTML teglari yoki CSS xatolari bo'lsa yozib yoki mikrofon orqali ovozda so'rang!",
      time: 'Hozirgina',
      provider: 'CMDbek AI (Groq Llama 3.3 70B)',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [groqKey, setGroqKey] = useState<string>(() => {
    try {
      return localStorage.getItem('tanishuv_groq_api_key') || SHARED_GROQ_KEY;
    } catch {
      return SHARED_GROQ_KEY;
    }
  });
  const [showKeyConfig, setShowKeyConfig] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Speech-to-text state inside modal
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechLang, setSpeechLang] = useState<'uz-UZ' | 'ru-RU' | 'en-US'>('uz-UZ');
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Stop speech recognition if modal closes
  useEffect(() => {
    if (!isOpen && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || inputVal;
    if (!promptToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: promptToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputVal('');
    setLoading(true);
    setSpeechError(null);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptToSend.trim(),
          groqApiKey: groqKey.trim(),
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || "Savolingiz bo'yicha javob tayyorlandi.";

      setMessages((prev) => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: aiReply,
          provider: data.provider || 'CMDbek AI Murabbiy',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: "HTML va CSS bo'yicha tushuntirish:\nHTML — sahifaning suyagi (teglar), CSS — tashqi ko'rinishi (ranglar, o'lchamlar), JavaScript — esa saytga jon bag'ishlovchi miyadir. Savolingizni qaytadan yozib ko'ring!",
          provider: 'CMDbek Mahalliy Murabbiy',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Automatically process voice prompt passed from CmdBekAssistant
  useEffect(() => {
    if (isOpen && initialVoicePrompt && initialVoicePrompt.trim()) {
      const promptText = initialVoicePrompt.trim();
      if (onVoicePromptConsumed) {
        onVoicePromptConsumed();
      }
      handleSend(undefined, promptText);
    }
  }, [isOpen, initialVoicePrompt]);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('tanishuv_groq_api_key', groqKey.trim());
    } catch {}
    setShowKeyConfig(false);
  };

  const toggleVoiceInput = () => {
    setSpeechError(null);
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError("Brauzeringiz ovozli kiritishni (Speech-to-Text) qo'llab-quvvatlamaydi.");
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = speechLang;
      recognition.interimResults = true;
      recognition.continuous = false;

      const baseInput = inputVal ? inputVal.trim() + ' ' : '';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputVal(baseInput + transcript);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError("Mikrofonga ruxsat berilmadi. Brauzer sozlamalaridan mikrofonni yoqing.");
        } else {
          setSpeechError("Ovozni aniqlashda xatolik yuz berdi. Qaytadan urinib ko'ring.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setSpeechError("Mikrofonni ishga tushirib bo'lmadi.");
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="aurora-card max-w-2xl w-full h-[85vh] flex flex-col overflow-hidden">
        {/* Header with Mascot */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CmdBekMascot
              mood={loading || isListening ? 'thinking' : speechError ? 'oops' : 'happy'}
              size={52}
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black">
                  CMDbek AI Dasturlash Murabbiyi
                </h3>
                <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">
                  <Sparkles className="w-3 h-3" />
                  {groqKey ? 'Groq AI Faol' : "AI O'qituvchi"}
                </span>
              </div>
              <p className="text-xs opacity-70">
                Matn yoki mikrofon orqali savol bering — CMDbek kodni tushuntirib beradi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
              title="Groq API Kalitini sozlash"
            >
              <Key className="w-3.5 h-3.5 text-[#ffd23f]" />
              <span className="hidden sm:inline">API Key</span>
            </button>
            <button onClick={onClose} className="duo-btn duo-btn-surface p-2">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* API Key Drawer */}
        {showKeyConfig && (
          <div className="p-4 bg-[#ffd23f]/10 border-b border-[#ffd23f]/30">
            <form onSubmit={handleSaveKey} className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-[#ffd23f] flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  Groq API Key (ixtiyoriy — shaxsiy kalit):
                </label>
                {groqKey && (
                  <button
                    type="button"
                    onClick={() => {
                      setGroqKey('');
                      localStorage.removeItem('tanishuv_groq_api_key');
                    }}
                    className="text-[11px] text-[#ff6b86] hover:underline font-bold"
                  >
                    Kalitni o'chirish
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={groqKey}
                  onChange={(e) => setGroqKey(e.target.value)}
                  placeholder="gsk_..."
                  className="aurora-input flex-1 text-xs py-2 font-mono"
                />
                <button type="submit" className="duo-btn duo-btn-gold px-4 py-2 text-xs">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="shrink-0">
                  <CmdBekMascot mood="explaining" size={40} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white rounded-br-none shadow-lg'
                    : 'bg-white/8 border border-white/10 rounded-bl-none'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-white/10">
                  <span className="font-extrabold text-[11px] opacity-85">
                    {m.sender === 'user' ? 'Siz' : m.provider || 'CMDbek AI Murabbiy'}
                  </span>
                  <div className="flex items-center gap-1.5 text-[10px] opacity-65 font-mono">
                    <span>{m.time}</span>
                    {m.sender === 'ai' && (
                      <button
                        onClick={() => handleCopy(m.text, m.id)}
                        className="hover:opacity-100 p-0.5"
                        title="Nusxalash"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-[#3ee6c4]" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div className="whitespace-pre-wrap">{m.text}</div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center shrink-0 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing animation: "yozayapti…" */}
          {loading && (
            <div className="flex items-center gap-3">
              <CmdBekMascot mood="thinking" size={44} />
              <div className="px-4 py-3 rounded-2xl bg-white/8 border border-[#3ee6c4]/40 text-xs font-extrabold text-[#3ee6c4] flex items-center gap-2">
                <span>CMDbek yozayapti…</span>
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ee6c4] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd23f] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b86] animate-bounce" />
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Speech Error or Active Listening Banner */}
        {(isListening || speechError) && (
          <div
            className={`px-4 py-2 text-xs font-bold flex items-center justify-between gap-2 border-t ${
              speechError
                ? 'bg-[#ff4d6d]/20 border-[#ff4d6d]/40 text-[#ff6b86]'
                : 'bg-[#3ee6c4]/15 border-[#3ee6c4]/40 text-[#3ee6c4]'
            }`}
          >
            <div className="flex items-center gap-2">
              {isListening && (
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff6b86] animate-ping" />
              )}
              <span>
                {speechError
                  ? speechError
                  : `Mikrofon faol (${speechLang}) — savolingizni yoki kod muammosini gapiring...`}
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px]">
              {(['uz-UZ', 'ru-RU', 'en-US'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSpeechLang(lang)}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    speechLang === lang
                      ? 'bg-[#3ee6c4] text-[#0a0912] font-extrabold'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {lang.split('-')[0].toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Question Buttons */}
        <div className="px-4 py-2.5 bg-white/5 border-t border-white/10 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="opacity-60 font-black uppercase shrink-0 text-[10px]">Tez savollar:</span>
          <button
            onClick={() => handleSend(undefined, "HTML da rasm va havola (link) qo'yish qanday yoziladi?")}
            className="duo-btn duo-btn-surface px-3 py-1.5 text-xs whitespace-nowrap"
          >
            HTML teglari
          </button>
          <button
            onClick={() => handleSend(undefined, "CSS Flexbox bilan elementni qanday o'rtaga qo'yaman?")}
            className="duo-btn duo-btn-surface px-3 py-1.5 text-xs whitespace-nowrap"
          >
            Flexbox markazlash
          </button>
          <button
            onClick={() => handleSend(undefined, 'JavaScriptda tugma bosilishini qanday yozaman?')}
            className="duo-btn duo-btn-surface px-3 py-1.5 text-xs whitespace-nowrap"
          >
            JS Hodisalar
          </button>
          <button
            onClick={() => handleSend(undefined, 'CSS Grid va Flexbox farqini sodda tushuntir')}
            className="duo-btn duo-btn-surface px-3 py-1.5 text-xs whitespace-nowrap"
          >
            Grid vs Flexbox
          </button>
        </div>

        {/* Input Bar with Speech-to-Text Microphone Button */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <form onSubmit={(e) => handleSend(e)} className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVoiceInput}
              title={isListening ? "Ovoz yozishni to'xtatish" : 'Ovoz bilan savol berish (Speech-to-Text)'}
              className={`duo-btn px-3.5 py-3 text-xs shrink-0 ${
                isListening ? 'duo-btn-coral animate-pulse' : 'duo-btn-surface'
              }`}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-[#3ee6c4]" />
              )}
              <span className="hidden sm:inline">{isListening ? 'Tinglanmoqda...' : 'Ovoz'}</span>
            </button>

            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                isListening
                  ? 'Gapiring, nutqingiz matnga aylanmoqda...'
                  : "HTML, CSS yoki JS bo'yicha savolingizni yozing yoki mikrofonni bosing..."
              }
              className="aurora-input flex-1 text-xs sm:text-sm"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="duo-btn duo-btn-coral px-5 py-3 text-xs sm:text-sm disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              <span>Yuborish</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
