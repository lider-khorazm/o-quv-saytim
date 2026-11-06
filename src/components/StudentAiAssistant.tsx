import React, { useState, useRef } from 'react';
import {
  Send,
  AlertCircle,
  X,
  Coins,
  ExternalLink,
  Volume2,
  VolumeX,
  Square,
} from 'lucide-react';
import { askStudentAssistant } from '../services/groqService';
import {
  deductCoinsForAi,
  calculateTokenCost,
  createAiStageExam,
} from '../services/storage';
import { Student, GeneratedTest, CourseStage } from '../types';
import { GeminiModelChoice, GroundingSource } from './GeminiChatStudioModal';
import { CmdBekMascot, CmdBekMood } from './CmdBekMascot';
import { speakUzbekBoyVoice, stopAllBoySpeech } from '../services/ttsService';

interface StudentAiAssistantProps {
  currentLessonTitle: string;
  currentLessonStage: string;
  currentCodeSnippet?: string;
  student?: Student;
  onCoinsUpdated?: () => void;
  onStartStageExam?: (exam: GeneratedTest) => void;
  onClose?: () => void;
}

const NEXT_STAGES: Record<CourseStage, CourseStage> = {
  html: 'css',
  css: 'javascript',
  javascript: 'typescript',
  typescript: 'react',
  react: 'backend',
  backend: 'database',
  database: 'fullstack',
  fullstack: 'graduated',
  graduated: 'graduated',
};

interface AssistantChatMessage {
  role: 'user' | 'assistant';
  text: string;
  time: string;
  provider?: string;
  sources?: GroundingSource[];
  mood?: CmdBekMood;
}

export const StudentAiAssistant: React.FC<StudentAiAssistantProps> = ({
  currentLessonTitle,
  currentLessonStage,
  currentCodeSnippet,
  student,
  onCoinsUpdated,
  onStartStageExam,
  onClose,
}) => {
  const userName = student ? `${student.name} ${student.surname}` : 'Dasturchi';

  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeMood, setActiveMood] = useState<CmdBekMood>('happy');
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [messages, setMessages] = useState<AssistantChatMessage[]>([
    {
      role: 'assistant',
      text: `Salom, ${student?.name || "do'stim"}! Men CMDbek & Google Gemini AI — o'zbek tilida ravon o'g'il bola ovozida gapiruvchi va hazillar qiladigan AI ustozingizman!\n\nHozirgi mavzu: **"${currentLessonTitle}"**.\nXohlagan savolingizni bering yoki hazil so'rang (faqat iqtisodiy va diniy mavzularda gaplashmayman)!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'Google Gemini + CMDbek (Ovozli)',
      mood: 'hello',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [coinError, setCoinError] = useState<string | null>(null);

  const stopSpeaking = () => {
    stopAllBoySpeech();
    setIsSpeaking(false);
  };

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

  // Doim bir xil o'g'il bola ovozi
  const speakReply = async (rawText: string) => {
    await speakUzbekBoyVoice(rawText, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => setIsSpeaking(false),
    });
  };

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const raw = (customText ?? input).trim();
    if (!raw) return;

    if (loading || isSpeaking) {
      handleStopAiResponse();
    }

    const userText = raw;
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const lowerText = userText.toLowerCase();

    const updatedHistory = [...messages, { role: 'user' as const, text: userText, time: userTime }];
    setMessages(updatedHistory);
    if (!customText) setInput('');
    setCoinError(null);

    if (lowerText.includes('ustoz menga test bering') || lowerText.includes('menga test bering')) {
      if (student && onStartStageExam) {
        setLoading(true);
        setTimeout(() => {
          const nextStage = NEXT_STAGES[student.stage] || 'css';
          const newExam = createAiStageExam(student.id, student.name, student.stage, nextStage);
          const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const replyMsg = `Albatta, ${student.name}! Siz hozirda **${student.stage.toUpperCase()}** bosqichidasiz. Siz uchun avtomatik bosqich imtihoni shakllantirildi. Imtihon boshlanmoqda!`;

          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              text: replyMsg,
              time: aiTime,
              provider: 'CMDbek Exam Engine',
              mood: 'celebrating',
            },
          ]);
          setActiveMood('celebrating');
          setLoading(false);
          if (autoSpeak) speakReply(replyMsg);
          onStartStageExam(newExam);
        }, 600);
        return;
      }
    }

    if (student && student.id !== 'guest' && !student.isGhostAdminStudent) {
      const deduction = deductCoinsForAi(student.id, userText);
      if (!deduction.success) {
        setCoinError(deduction.message || 'Tanganingiz yetarli emas!');
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Savol berish uchun tanganingiz yetarli emas (${calculateTokenCost(
              userText
            )} tanga kerak, sizda esa ${student.coins} tanga bor). Dars testlarini yechib yoki Ligada g'alaba qozonib tanga ishlab oling!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            mood: 'oops',
          },
        ]);
        return;
      }
      if (onCoinsUpdated) {
        onCoinsUpdated();
      }
    }

    setLoading(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          message: userText,
          userName,
          model: 'gemini-3.8-flash',
          context: `Dars: ${currentLessonTitle} (${currentLessonStage}). ${
            currentCodeSnippet ? `Kod: ${currentCodeSnippet.slice(0, 400)}` : ''
          }`,
          history: updatedHistory.slice(-14).map((m) => ({
            sender: m.role === 'user' ? 'user' : 'ai',
            text: m.text,
          })),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const replyText = data.reply || 'Javob olindi.';
        const replyMood: CmdBekMood = (data.mood as CmdBekMood) || 'happy';
        setActiveMood(replyMood);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: replyText,
            time: aiTime,
            provider: data.provider || 'Google Gemini + CMDbek',
            sources: Array.isArray(data.sources) ? data.sources : [],
            mood: replyMood,
          },
        ]);
        if (autoSpeak) speakReply(replyText);
      } else {
        throw new Error('Server fallback');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') return;
      try {
        const fallbackRes = await askStudentAssistant({
          currentLessonTitle,
          currentLessonStage,
          userPrompt: userText,
          codeSnippet: currentCodeSnippet,
          chatHistory: updatedHistory,
        });
        const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: fallbackRes.text,
            time: aiTime,
            provider: 'Google Gemini + CMDbek',
          },
        ]);
        if (autoSpeak) speakReply(fallbackRes.text);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: 'Tarmoq xatosi yuz berdi. Savolingizni qaytadan yuboring.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full aurora-card overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-white/10 bg-white/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <CmdBekMascot mood={loading ? 'thinking' : isSpeaking ? 'speaking' : coinError ? 'oops' : activeMood} size={44} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-black text-sm truncate">CMDbek AI Yordamchi</h4>
              {student && (
                <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] font-mono">
                  <Coins className="w-3 h-3" />
                  <span>{Number(student.coins || 0).toFixed(1)}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] opacity-70 truncate">
              Mavzu: <span className="font-bold">{currentLessonTitle}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              if (isSpeaking) stopSpeaking();
              setAutoSpeak((v) => !v);
            }}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer border ${
              autoSpeak
                ? 'bg-[#b6f03c]/20 border-[#b6f03c]/50 text-[#b6f03c]'
                : 'bg-white/5 border-white/10 opacity-70'
            }`}
            title="AI javobini ovoz chiqarib o'qish"
          >
            {autoSpeak ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{autoSpeak ? 'Ovoz ON' : 'Ovoz OFF'}</span>
          </button>
          {onClose && (
            <button onClick={onClose} className="duo-btn duo-btn-surface p-1.5">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {coinError && (
        <div className="px-4 py-2 bg-[#ff6b86]/20 border-b border-[#ff6b86]/40 text-[#ff6b86] text-xs font-bold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{coinError}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 min-h-[240px]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white rounded-br-none shadow-md'
                  : 'bg-white/8 border border-white/10 rounded-bl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{m.text}</div>

              {m.role === 'assistant' && (
                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => (isSpeaking ? stopSpeaking() : speakReply(m.text))}
                    className="px-2.5 py-1 rounded-lg bg-[#3ee6c4]/15 text-[#3ee6c4] hover:bg-[#3ee6c4]/25 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    <span>{isSpeaking ? "To'xtatish" : 'Eshitish'}</span>
                  </button>
                </div>
              )}

              {m.sources && m.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-bold text-[#3ee6c4] block">
                    Google Search Manbalari:
                  </span>
                  {m.sources.map((src, sIdx) => (
                    <a
                      key={sIdx}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl bg-black/30 border border-white/10 text-[11px] text-[#3ee6c4]"
                    >
                      <span className="truncate">{src.title || src.uri}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] opacity-55 mt-1 px-1 font-mono">
              {m.provider ? `${m.provider} · ` : ''}
              {m.time}
            </span>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#3ee6c4] bg-[#3ee6c4]/10 border border-[#3ee6c4]/30 p-3 rounded-2xl w-fit font-bold">
            <CmdBekMascot mood="thinking" size={34} />
            <span>CMDbek o&apos;ylab javob yozayapti…</span>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={(e) => handleSend(e)} className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Savol bering yoki 'Ustoz menga test bering'..."
          className="aurora-input flex-1 text-xs sm:text-sm py-2.5"
        />
        {loading || isSpeaking ? (
          <button
            type="button"
            onClick={handleStopAiResponse}
            className="duo-btn duo-btn-gold px-4 py-2.5 text-xs sm:text-sm font-black flex items-center gap-1.5 cursor-pointer"
          >
            <Square className="w-4 h-4 fill-current" />
            <span>To&apos;xtatish</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="duo-btn duo-btn-coral px-4 py-2.5 text-xs sm:text-sm disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Yuborish</span>
          </button>
        )}
      </form>
    </div>
  );
};
