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
  MicOff,
  Volume2,
  VolumeX,
  Square,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { CmdBekMascot, CmdBekMood } from './CmdBekMascot';
import { getCurrentAuthUser } from '../services/storage';
import { speakUzbekBoyVoice, stopAllBoySpeech } from '../services/ttsService';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  provider?: string;
  time: string;
  mood?: CmdBekMood;
  sources?: { title: string; uri: string }[];
}

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVoicePrompt?: string;
  onVoicePromptConsumed?: () => void;
  isAdminMode?: boolean;
}

const SHARED_GROQ_KEY = '';

export function AiMentorModal({
  isOpen,
  onClose,
  initialVoicePrompt,
  onVoicePromptConsumed,
  isAdminMode = false,
}: AiMentorModalProps) {
  const authUser = getCurrentAuthUser();
  const userName = authUser?.name || 'Dasturchi';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: `Salom, ${userName}! Men CMDbek & Google Gemini AI — hazilkash va o'zbek tilida ravon o'g'il bola ovozida gapiruvchi universal AI ustozingizman! 🤖🔊\n\nMendan xohlagan mavzuda savol so'rashingiz, kod yozdirishingiz yoki zo'r hazillar so'rashingiz mumkin (faqat iqtisodiy va diniy mavzularda gaplashmayman)!`,
      time: 'Hozirgina',
      provider: 'Google Gemini + CMDbek (Oʻgʻil bola ovozi)',
      mood: 'hello',
    },
  ]);

  const [activeMood, setActiveMood] = useState<CmdBekMood>('happy');
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
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Voice Output (Text-to-Speech: Doim bir xil o'zbek o'g'il bola ovozi)
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  // Speech-to-text state inside modal
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speechLang, setSpeechLang] = useState<'uz-UZ' | 'ru-RU' | 'en-US'>('uz-UZ');
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Ekranda CMDbek sudralganda uning jahl xabari AI chat ichiga ham tushadi
  useEffect(() => {
    const handleDraggedAngry = (ev: Event) => {
      const customEv = ev as CustomEvent<{ text?: string }>;
      const angryText = customEv.detail?.text;
      if (!angryText) return;
      setActiveMood('angry');
      setMessages((prev) => [
        ...prev,
        {
          id: 'drag_angry_' + Date.now(),
          sender: 'ai',
          text: angryText,
          provider: 'CMDbek (Sudralganda jahli chiqdi 😤)',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          mood: 'angry',
        },
      ]);
    };
    window.addEventListener('cmdbek-dragged-angry', handleDraggedAngry);
    return () => window.removeEventListener('cmdbek-dragged-angry', handleDraggedAngry);
  }, []);

  const stopSpeaking = () => {
    stopAllBoySpeech();
    setSpeakingMsgId(null);
  };

  // Har doim FAQAT BITTA bir xil o'g'il bola ovozida ravon gapiradi
  const speakText = async (text: string, msgId: string) => {
    if (speakingMsgId === msgId) {
      stopSpeaking();
      return;
    }
    stopSpeaking();
    await speakUzbekBoyVoice(text, {
      onStart: () => setSpeakingMsgId(msgId),
      onEnd: () => setSpeakingMsgId(null),
    });
  };

  useEffect(() => {
    if (!isOpen) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
        setIsListening(false);
      }
      stopSpeaking();
    }
  }, [isOpen]);

  // Savol javobni yoki ovozni darhol to'xtatib, yangi savol berishga tayyorlash
  const handleStopAiResponse = () => {
    if (abortControllerRef.current) {
      try {
        abortControllerRef.current.abort();
      } catch {}
      abortControllerRef.current = null;
    }
    stopSpeaking();
    setLoading(false);
    setActiveMood('idle');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleSend = async (
    e?: React.FormEvent,
    customPrompt?: string,
    forcedMood?: CmdBekMood
  ) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || inputVal;
    if (!promptToSend.trim()) return;

    // Agar oldingi javob yoki ovoz ketayotgan bo'lsa, uni avtomatik to'xtatib yangisini yuboradi
    if (loading || speakingMsgId) {
      handleStopAiResponse();
    }

    const userMsg: ChatMessage = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: promptToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const historyPayload = [...messages, userMsg].slice(-14).map((m) => ({
      sender: m.sender,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInputVal('');
    setLoading(true);
    setSpeechError(null);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: promptToSend.trim(),
          history: historyPayload,
          model: 'gemini-3.8-flash',
          userName,
          isAdminMode: isAdminMode || authUser?.role === 'owner' || authUser?.role === 'sub_admin',
          groqApiKey: groqKey.trim(),
        }),
      });

      const data = await res.json();
      const aiReply = data.reply || "Savolingiz bo'yicha tahlil tayyor.";
      const replyMood: CmdBekMood = forcedMood || (data.mood as CmdBekMood) || 'happy';
      const newMsgId = 'ai_' + Date.now();

      const aiMsgObj: ChatMessage = {
        id: newMsgId,
        sender: 'ai',
        text: aiReply,
        provider: data.provider || 'Google Gemini + CMDbek',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: replyMood,
        sources: Array.isArray(data.sources) ? data.sources : [],
      };

      setActiveMood(replyMood);
      setMessages((prev) => [...prev, aiMsgObj]);

      if (autoSpeak) {
        speakText(aiReply, newMsgId);
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        // Foydalanuvchi "To'xtatish" tugmasini bosdi — xato xabari chiqarmasdan to'xtatamiz
        return;
      }
      const fallbackId = 'ai_' + Date.now();
      const fallbackText = `Savolingiz («${promptToSend.trim()}») bo'yicha javob tayyorlanmoqda. Yana bir bor yuborib ko'ring!`;
      const fallbackMsg: ChatMessage = {
        id: fallbackId,
        sender: 'ai',
        text: fallbackText,
        provider: 'Google Gemini + CMDbek',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: 'oops',
      };
      setActiveMood('oops');
      setMessages((prev) => [...prev, fallbackMsg]);
      if (autoSpeak) {
        speakText(fallbackText, fallbackId);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setLoading(false);
    }
  };

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

  const handleResetChat = () => {
    handleStopAiResponse();
    const freshMsg: ChatMessage = {
      id: 'init_' + Date.now(),
      sender: 'ai',
      text: "Yangi suhbat ochildi! Xohlagan savolingizni bering yoki hazil so'rang (iqtisodiy va diniy mavzulardan tashqari)!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'Google Gemini + CMDbek',
      mood: 'hello',
    };
    setMessages([freshMsg]);
    setActiveMood('hello');
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
      stopSpeaking();
      const recognition = new SpeechRecognition();
      recognition.lang = speechLang;
      recognition.interimResults = true;
      recognition.continuous = false;

      let latestTranscript = '';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        latestTranscript = transcript;
        setInputVal(transcript);
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
        if (latestTranscript.trim().length > 1) {
          handleSend(undefined, latestTranscript.trim());
          setInputVal('');
        }
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

  const headerMascotMood: CmdBekMood =
    loading || isListening
      ? 'thinking'
      : speakingMsgId
      ? 'speaking'
      : speechError
      ? 'oops'
      : activeMood;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="aurora-card max-w-2xl w-full h-[88vh] flex flex-col overflow-hidden">
        {/* Header with Mascot, Gemini Model Indicator & Voice Toggle */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <CmdBekMascot mood={headerMascotMood} size={56} />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-black">
                  CMDbek &amp; Google Gemini AI (Hazilkash &amp; O&apos;g&apos;il Bola Ovozli)
                </h3>
                <span className="text-[11px] font-mono text-[#3ee6c4]">
                  {speakingMsgId
                    ? "🔊 O'g'il bola ovozida gapirmoqda..."
                    : loading
                    ? '🧠 Gemini javob tayyorlayapti...'
                    : '● Faol: Google Gemini AI'}
                </span>
              </div>
              <p className="text-xs opacity-70">
                Xohlagan savolga javob beradi va hazillar qiladi (iqtisodiy va diniy mavzulardan tashqari)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (autoSpeak) stopSpeaking();
                setAutoSpeak(!autoSpeak);
              }}
              className={`duo-btn px-3 py-1.5 text-xs ${
                autoSpeak ? 'duo-btn-mint' : 'duo-btn-surface'
              }`}
              title={autoSpeak ? "AI ovozi yoqilgan (O'chirish uchun bosing)" : 'AI ovozini yoqish'}
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{autoSpeak ? 'Ovoz: Yoqiq' : "Ovoz: O'chiq"}</span>
            </button>

            <button
              type="button"
              onClick={handleResetChat}
              className="duo-btn duo-btn-surface px-2.5 py-1.5 text-xs"
              title="Yangi suhbat boshlash"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#ff6b86]" />
            </button>

            <button
              type="button"
              onClick={() => setShowKeyConfig(!showKeyConfig)}
              className="duo-btn duo-btn-surface px-2.5 py-1.5 text-xs"
              title="Groq API Kalitini sozlash"
            >
              <Key className="w-3.5 h-3.5 text-[#ffd23f]" />
            </button>
            <button type="button" onClick={onClose} className="duo-btn duo-btn-surface p-2">
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
                    Kalitni o&apos;chirish
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
          {messages.map((m) => {
            const isThisSpeaking = speakingMsgId === m.id;
            const msgMood: CmdBekMood = isThisSpeaking ? 'speaking' : m.mood || 'explaining';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="shrink-0">
                    <CmdBekMascot mood={msgMood} size={42} />
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
                    <span className="font-extrabold text-[11px] opacity-85 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-[#3ee6c4]" />
                      {m.sender === 'user' ? userName : m.provider || 'CMDbek AI Murabbiy'}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] opacity-80 font-mono">
                      {m.sender === 'ai' && (
                        <button
                          type="button"
                          onClick={() => speakText(m.text, m.id)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg font-bold transition-colors cursor-pointer ${
                            isThisSpeaking
                              ? 'bg-[#ff6b86] text-white animate-pulse'
                              : 'bg-[#3ee6c4]/20 text-[#3ee6c4] hover:bg-[#3ee6c4]/30'
                          }`}
                          title={isThisSpeaking ? "Ovozni to'xtatish" : "O'g'il bola ovozida eshitish"}
                        >
                          {isThisSpeaking ? (
                            <>
                              <Square className="w-2.5 h-2.5 fill-current" />
                              <span>To&apos;xtatish</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>Eshitish</span>
                            </>
                          )}
                        </button>
                      )}
                      <span>{m.time}</span>
                      {m.sender === 'ai' && (
                        <button
                          type="button"
                          onClick={() => handleCopy(m.text, m.id)}
                          className="hover:opacity-100 p-0.5 cursor-pointer"
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

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1">
                      <span className="text-[10px] font-bold text-[#3ee6c4] block">
                        Google Search Manbalari:
                      </span>
                      {m.sources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 text-[11px] text-[#3ee6c4]"
                        >
                          <span className="truncate">{src.title || src.uri}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-9 h-9 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking animation */}
          {loading && (
            <div className="flex items-center gap-3">
              <CmdBekMascot mood="thinking" size={48} />
              <div className="px-4 py-3 rounded-2xl bg-white/8 border border-[#3ee6c4]/40 text-xs font-extrabold text-[#3ee6c4] flex items-center gap-2">
                <span>Gemini &amp; CMDbek o&apos;ylanmoqda…</span>
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
                  : `Mikrofon faol (${speechLang}) — gapirib bo'lishingiz bilan CMDbek javob beradi...`}
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

        {/* Input Bar with Speech-to-Text Microphone Button and Dynamic Yuborish / To'xtatish Button */}
        <div className="p-4 bg-white/5 border-t border-white/10">
          <form onSubmit={(e) => handleSend(e)} className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleVoiceInput}
              title={
                isListening
                  ? "Ovoz yozishni to'xtatish"
                  : 'Ovoz bilan savol berish (Speech-to-Text)'
              }
              className={`duo-btn px-3.5 py-3 text-xs shrink-0 ${
                isListening ? 'duo-btn-coral animate-pulse' : 'duo-btn-surface'
              }`}
            >
              {isListening ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-[#3ee6c4]" />
              )}
              <span className="hidden sm:inline">{isListening ? 'Tinglanmoqda...' : 'Gapirish'}</span>
            </button>

            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                isListening
                  ? 'Gapiring, nutqingiz matnga aylanmoqda...'
                  : 'Xohlagan savolingizni yozing yoki hazil soʻrang...'
              }
              className="aurora-input flex-1 text-xs sm:text-sm"
            />

            {loading || speakingMsgId ? (
              <button
                type="button"
                onClick={handleStopAiResponse}
                className="duo-btn duo-btn-gold px-5 py-3 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
                title="Javobni yoki ovozni to'xtatib, yangi savol berish"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>To&apos;xtatish</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className="duo-btn duo-btn-coral px-5 py-3 text-xs sm:text-sm disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
                <span>Yuborish</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
