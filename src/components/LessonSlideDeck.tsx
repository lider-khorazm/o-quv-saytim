import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Play,
  Copy,
  Check,
  Lightbulb,
  Code2,
  Keyboard,
} from 'lucide-react';
import { LessonSlide, CourseStage } from '../types';

interface LessonSlideDeckProps {
  slides?: LessonSlide[];
  lessonTitle: string;
  stage: CourseStage;
  fallbackSummary: string;
  fallbackCode: string;
  fallbackPoints?: string[];
  onOpenTryIt?: (codeSnippet?: string) => void;
}

export const LessonSlideDeck: React.FC<LessonSlideDeckProps> = ({
  slides: inputSlides,
  lessonTitle,
  stage,
  fallbackSummary,
  fallbackCode,
  fallbackPoints = [],
  onOpenTryIt,
}) => {
  const defaultDeck: LessonSlide[] = [
    {
      id: 1,
      badge: '1-Slayd: Mavzu Kirishi & Maqsad',
      title: lessonTitle,
      subtitle: `${stage.toUpperCase()} bosqichining asosiy poydevor mavzusi`,
      points: [
        fallbackSummary,
        "Ushbu dars yakunida mavzuning sintaksisi, amaliy qo'llanilishi va ishlab chiqarishdagi standartlarini to'liq o'zlashtirasiz.",
        "Dars davomida namunaviy kodlar bilan tanishib, ularni Try-It studiyasida mustaqil sinab ko'rishingiz mumkin.",
      ],
      highlightNote:
        "Eslatma: Slaydlarni klaviaturadagi chap (←) va o'ng (→) ko'rsatkichlari bilan ham boshqarishingiz mumkin.",
    },
    {
      id: 2,
      badge: '2-Slayd: Asosiy Nazariya & Qoidalar',
      title: 'Nazariy Asoslar va Brauzer Mexanizmi',
      subtitle: "Brauzer ushbu kodni qanday o'qiydi va qayta ishlaydi?",
      points:
        fallbackPoints.length > 0
          ? fallbackPoints
          : [
              'Mavzuning brauzer tomonidan qanday parse qilinishini bilish toza kod yozish garovidir.',
              "Semantik qoidalarga qat'iy rioya qilish SEO va foydalanish qulayligini (Accessibility) oshiradi.",
              "Har bir parametr va atributning o'ziga xos vazifasi va cheklovlari mavjud.",
            ],
      highlightNote:
        "Professional dasturchilar shunchaki kod yozmaydi, uning ichki ishlash mexanizmini to'liq tushunadi.",
    },
    {
      id: 3,
      badge: '3-Slayd: Namunaviy Kod Tahlili',
      title: 'W3Schools Standart Kod Namunasi',
      subtitle: 'Amaliy sintaksis va tuzilish bilan tanishing',
      points: [
        'Namunaviy kodni diqqat bilan tahlil qiling.',
        "Ochilish va yopilish teglari, o'zgaruvchilar va xossalar tartibiga e'tibor bering.",
      ],
      codeSnippet: fallbackCode,
      highlightNote:
        "Ushbu kodni 'Try-It da sinash' tugmasi orqali to'g'ridan-to'g'ri tahrirlab natijasini ko'rishingiz mumkin.",
    },
    {
      id: 4,
      badge: '4-Slayd: Ishlab Chiqarishdagi Amaliyot',
      title: 'Real Loyihalardagi Standartlar',
      subtitle: 'Katta dasturlarda qanday qo\'llaniladi?',
      points: [
        "Kodni modullarga bo'lib toza saqlash (Clean Code).",
        'Brauzerlararo moslik (Cross-Browser Compatibility) va xatoliklarni oldini olish.',
        'Unumdorlik (Performance) talablariga rioya qilish.',
      ],
      highlightNote: 'Doimo W3C va ECMAScript zamonaviy standartlariga muvofiq kod yozing.',
    },
    {
      id: 5,
      badge: '5-Slayd: Xulosa & Amaliy Topshiriq',
      title: 'Bilimlarni Mustahkamlash & Sinov',
      subtitle: "Endi o'zingiz mustaqil kod yozib ko'ring!",
      points: [
        'Barcha slaydlardagi bilimlarni amalda mustahkamlash vaqti keldi.',
        "Try-It Studio yorlig'iga o'ting va berilgan topshiriqni bajaring.",
        "Kodingiz to'g'ri ishlagach, darsni yakunlang va XP mukofotingizni oling!",
      ],
      highlightNote:
        "Kod yozish — eng yaxshi o'rganish usulidir. Qancha ko'p yozsangiz, shuncha tez o'sasiz!",
    },
  ];

  const slides = inputSlides && inputSlides.length > 0 ? inputSlides : defaultDeck;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeSlide = slides[currentIdx] || slides[0];

  const handleNext = () => {
    if (currentIdx < slides.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, slides.length]);

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && containerRef.current) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const progressPercent = ((currentIdx + 1) / slides.length) * 100;

  return (
    <div
      ref={containerRef}
      className={`flex flex-col justify-between aurora-card border-2 border-[#ff6b86]/35 rounded-[2rem] overflow-hidden shadow-2xl transition-all ${
        isFullscreen ? 'p-6 sm:p-10 fixed inset-0 z-50 rounded-none bg-[#0a0912]' : 'p-4 sm:p-6 min-h-[520px]'
      }`}
    >
      {/* Slide Deck Top Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[var(--aurora-border)] gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3ee6c4] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#3ee6c4] font-black">
              {activeSlide.badge}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[var(--aurora-text-muted)] bg-[var(--aurora-surface-2)] px-3 py-1 rounded-xl border border-[var(--aurora-border)]">
              <strong className="text-[#ffd23f]">{currentIdx + 1}</strong> / {slides.length}
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[var(--aurora-text-muted)] font-mono">
              <Keyboard className="w-3.5 h-3.5" />
              <span>← / →</span>
            </span>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-[var(--aurora-surface-2)] hover:bg-[#ff6b86]/20 text-[var(--aurora-text)] transition-colors cursor-pointer border border-[var(--aurora-border)]"
              title={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekran rejimiga o'tish"}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/10 mt-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Slide Card Body */}
      <div className="my-6 space-y-4">
        <div>
          <h3 className="text-lg sm:text-2xl font-black text-[var(--aurora-text)] leading-tight tracking-tight font-display">
            {activeSlide.title}
          </h3>
          {activeSlide.subtitle && (
            <p className="text-xs sm:text-sm text-[#ff8a3d] font-bold mt-1">{activeSlide.subtitle}</p>
          )}
        </div>

        {activeSlide.points && activeSlide.points.length > 0 && (
          <div className="space-y-2.5 pt-1">
            {activeSlide.points.map((point, pIdx) => (
              <div
                key={pIdx}
                className="flex items-start gap-3 bg-[var(--aurora-surface-2)] p-3.5 rounded-2xl border border-[var(--aurora-border)] text-xs sm:text-sm text-[var(--aurora-text)] leading-relaxed hover:border-[#ff6b86]/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center shrink-0 mt-0.5 border border-[#ff6b86]/30 font-black font-mono text-xs">
                  {pIdx + 1}
                </div>
                <div className="flex-1">
                  <span>{point}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSlide.codeSnippet && (
          <div className="mt-4 rounded-2xl bg-[#0a0912] border-2 border-white/10 overflow-hidden">
            <div className="p-2.5 px-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-[#3ee6c4] font-black flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" />
                <span>Namunaviy Kod Parchasi</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyCode(activeSlide.codeSnippet || '')}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-[#b6f03c]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Nusxalandi!' : 'Nusxa'}</span>
                </button>
                {onOpenTryIt && (
                  <button
                    type="button"
                    onClick={() => onOpenTryIt(activeSlide.codeSnippet)}
                    className="duo-btn duo-btn-mint px-3 py-1 text-[11px] flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Try-It da Sinash ▶</span>
                  </button>
                )}
              </div>
            </div>
            <pre className="p-4 text-xs font-mono text-[#b6f03c] overflow-x-auto leading-relaxed">
              {activeSlide.codeSnippet}
            </pre>
          </div>
        )}

        {activeSlide.highlightNote && (
          <div className="p-3.5 rounded-2xl bg-[#ffd23f]/15 border border-[#ffd23f]/40 flex items-start gap-2.5 text-xs text-[var(--aurora-text)]">
            <Lightbulb className="w-4 h-4 text-[#ffd23f] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-[#ffd23f]">Ustoz maslahati:</strong> {activeSlide.highlightNote}
            </p>
          </div>
        )}
      </div>

      {/* Slide Navigation Bottom Controls */}
      <div className="pt-3 border-t border-[var(--aurora-border)] flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIdx === 0}
          className="duo-btn duo-btn-surface px-4 py-2.5 text-xs flex items-center gap-1.5 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Oldingi Slayd</span>
        </button>

        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {slides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setCurrentIdx(dotIdx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                dotIdx === currentIdx
                  ? 'w-8 bg-[#ff6b86]'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
              title={`${dotIdx + 1}-slaydga o'tish`}
            />
          ))}
        </div>

        {currentIdx < slides.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="duo-btn duo-btn-coral px-5 py-2.5 text-xs flex items-center gap-1.5"
          >
            <span>Keyingi Slayd</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (onOpenTryIt) {
                onOpenTryIt();
              }
            }}
            className="duo-btn duo-btn-lime px-5 py-2.5 text-xs flex items-center gap-1.5"
          >
            <Play className="w-4 h-4" />
            <span>Try-It Studiyasiga O&apos;tish ▶</span>
          </button>
        )}
      </div>
    </div>
  );
};
