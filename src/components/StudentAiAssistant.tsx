import React, { useState } from 'react';
import {
  Send,
  AlertCircle,
  X,
  ShieldAlert,
  Coins,
  GraduationCap,
  Globe,
  ExternalLink,
  Zap,
  Sparkles,
  Brain,
} from 'lucide-react';
import { askStudentAssistant } from '../services/groqService';
import { deductCoinsForAi, calculateTokenCost, createAiStageExam } from '../services/storage';
import { Student, GeneratedTest, CourseStage } from '../types';
import { GeminiModelChoice, GroundingSource } from './GeminiChatStudioModal';
import { CmdBekMascot } from './CmdBekMascot';

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
  const [selectedModel, setSelectedModel] = useState<GeminiModelChoice>('gemini-3.8-flash');
  const [useGoogleSearch, setUseGoogleSearch] = useState<boolean>(false);
  const [messages, setMessages] = useState<AssistantChatMessage[]>([
    {
      role: 'assistant',
      text: `Salom! Men Kodik — sizning **"Yordamchi"** AI repetitoringizman.\n\nHozirgi mavzu: **"${currentLessonTitle}"**.\nTezkor savol bering yoki bosqich imtihoni uchun **"Ustoz menga test bering"** deb yozing!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      provider: 'Kodik AI (Gemini 3.8 Flash)',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [coinError, setCoinError] = useState<string | null>(null);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const raw = (customText ?? input).trim();
    if (!raw || loading) return;

    const userText = raw;
    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const lowerText = userText.toLowerCase();

    setMessages((prev) => [...prev, { role: 'user', text: userText, time: userTime }]);
    if (!customText) setInput('');
    setCoinError(null);

    if (lowerText.includes('ustoz menga test bering') || lowerText.includes('menga test bering')) {
      if (student && onStartStageExam) {
        setLoading(true);
        setTimeout(() => {
          const nextStage = NEXT_STAGES[student.stage] || 'css';
          const newExam = createAiStageExam(student.id, student.name, student.stage, nextStage);
          const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              text: `Albatta, ${student.name}! Siz hozirda **${student.stage.toUpperCase()}** bosqichidasiz. Siz uchun avtomatik bosqich imtihoni shakllantirildi. Imtihon boshlanmoqda!`,
              time: aiTime,
              provider: 'Kodik Exam Engine',
            },
          ]);
          setLoading(false);
          onStartStageExam(newExam);
        }, 600);
        return;
      }
    }

    if (student) {
      const deduction = deductCoinsForAi(student.id, userText);
      if (!deduction.success) {
        setCoinError(deduction.message || 'Tanganingiz yetarli emas!');
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `Savol berish uchun tanganingiz yetarli emas (${calculateTokenCost(
              userText
            )} tanga kerak, sizda esa ${student.coins} tanga bor). Dars quizlarini yechib tanga ishlab oling!`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        return;
      }
      if (onCoinsUpdated) {
        onCoinsUpdated();
      }
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history: messages.map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            text: m.text,
          })),
          model: selectedModel,
          useGoogleSearch,
          lessonContext: `Dars: ${currentLessonTitle} (${currentLessonStage}). ${
            currentCodeSnippet ? `Kod: ${currentCodeSnippet.slice(0, 400)}` : ''
          }`,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: data.reply || 'Javob olindi.',
            time: aiTime,
            provider: data.provider || selectedModel,
            sources: Array.isArray(data.sources) ? data.sources : [],
          },
        ]);
      } else {
        throw new Error('Server fallback');
      }
    } catch {
      try {
        const fallbackRes = await askStudentAssistant({
          currentLessonTitle,
          currentLessonStage,
          userPrompt: userText,
          codeSnippet: currentCodeSnippet,
          chatHistory: messages,
        });
        const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: fallbackRes.text,
            time: aiTime,
            provider: selectedModel,
          },
        ]);
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
      setLoading(false);
    }
  };

  const quickPrompts = [
    'Ustoz menga test bering',
    'Ushbu kod nima ish bajaradi?',
    'W3Schools misolida tushuntir',
    "Sintaksisni sodda misolda ko'rsat",
  ];

  return (
    <div className="flex flex-col h-full aurora-card overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-white/10 bg-white/5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <CmdBekMascot mood={loading ? 'thinking' : coinError ? 'oops' : 'happy'} size={44} />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-black text-sm truncate">CMDbek AI Yordamchi</h4>
              {student && (
                <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] font-mono">
                  <Coins className="w-3 h-3" />
                  <span>{student.coins}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] opacity-70 truncate">
              Mavzu: <span className="font-bold">{currentLessonTitle}</span>
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="duo-btn duo-btn-surface p-1.5">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Model & Search Selector Bar */}
      <div className="px-3 py-2 bg-white/5 border-b border-white/10 flex items-center justify-between gap-1.5 overflow-x-auto">
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
              selectedModel === 'gemini-3.1-flash-lite'
                ? 'bg-[#3ee6c4] text-[#052922]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Zap className="w-3 h-3" />
            <span>3.1 Lite</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-3.8-flash')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
              selectedModel === 'gemini-3.8-flash'
                ? 'bg-[#ff6b86] text-white'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>3.8 Flash</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedModel('gemini-4-argon')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
              selectedModel === 'gemini-4-argon'
                ? 'bg-[#ffd23f] text-[#2b1d00]'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Brain className="w-3 h-3" />
            <span>4 Argon</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setUseGoogleSearch((prev) => !prev)}
          className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 cursor-pointer shrink-0 ${
            useGoogleSearch
              ? 'bg-[#3ee6c4]/20 border-[#3ee6c4] text-[#3ee6c4]'
              : 'bg-white/5 border-white/10 opacity-70'
          }`}
        >
          <Globe className="w-3 h-3" />
          <span>Search {useGoogleSearch ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Guardrail notice */}
      <div className="px-3.5 py-1.5 bg-black/20 border-b border-white/10 flex items-center justify-between gap-2 text-[11px] opacity-75">
        <div className="flex items-center gap-1.5 truncate">
          <ShieldAlert className="w-3.5 h-3.5 text-[#3ee6c4] shrink-0" />
          <span className="truncate">
            {useGoogleSearch ? 'Google Search manbalari bilan' : `Faol model: ${selectedModel}`}
          </span>
        </div>
        <span className="text-[10px] font-mono shrink-0 text-[#ffd23f]">0.5 - 2.5 tanga</span>
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
            <span>CMDbek yozayapti…</span>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="px-3 py-2 bg-white/5 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(undefined, qp)}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all flex items-center gap-1 cursor-pointer font-bold ${
              qp.includes('test bering')
                ? 'bg-[#ffd23f]/20 text-[#ffd23f] border-[#ffd23f]/50'
                : 'bg-white/5 hover:bg-white/10 border-white/10'
            }`}
          >
            {qp.includes('test bering') && <GraduationCap className="w-3.5 h-3.5" />}
            {qp}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={(e) => handleSend(e)} className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Savol bering yoki 'Ustoz menga test bering'..."
          className="aurora-input flex-1 text-xs sm:text-sm py-2.5"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="duo-btn duo-btn-coral px-4 py-2.5 text-xs sm:text-sm disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Yuborish</span>
        </button>
      </form>
    </div>
  );
};
