import React, { useState, useMemo, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  ArrowRight,
  X,
  AlertTriangle,
  Coins,
  Clock,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, LessonQuizQuestion, CertificateData } from '../types';
import { recordQuizSubmission } from '../services/storage';
import { CmdBekMascot } from './CmdBekMascot';

interface LessonQuizModalProps {
  lesson: Lesson;
  studentId: string;
  onClose: () => void;
  onQuizSuccess: (earnedXp: number, newCert?: CertificateData) => void;
}

function generate15LessonQuestions(lesson: Lesson): LessonQuizQuestion[] {
  const result: LessonQuizQuestion[] = [];
  const seenTexts = new Set<string>();

  const addQ = (q: LessonQuizQuestion) => {
    const key = q.question.trim().toLowerCase();
    if (!seenTexts.has(key)) {
      seenTexts.add(key);
      result.push(q);
    }
  };

  if (lesson.quiz && lesson.quiz.length > 0) {
    lesson.quiz.forEach((q) => addQ(q));
  }

  if (lesson.interviewQuestions && lesson.interviewQuestions.length > 0) {
    lesson.interviewQuestions.forEach((item, idx) => {
      addQ({
        id: `q-interview-${lesson.id}-${idx}`,
        question: `[Texnik Intervyu] ${item.question}`,
        options: [
          item.answer.length > 90 ? item.answer.slice(0, 85) + '...' : item.answer,
          "Brauzer va server bilan hech qanday aloqasi yo'q, shunchaki ixtiyoriy matn",
          "Faqat CSS faylini formatlash va ranglarni o'zgartirish uchun kerak",
          'Eski brauzerlarda dastur xatolarini yashirish uchun ishlatiladi',
        ],
        correctAnswerIndex: 0,
        explanation: item.answer,
      });
    });
  }

  if (lesson.commonMistakes && lesson.commonMistakes.length > 0) {
    lesson.commonMistakes.forEach((mistake, idx) => {
      addQ({
        id: `q-mistake-${lesson.id}-${idx}`,
        question: `"${lesson.title}" darsida quyidagi kodda qanday xatolik mavjud?`,
        codeSnippet: mistake.badCode,
        options: [
          mistake.explanation.length > 90
            ? mistake.explanation.slice(0, 85) + '...'
            : mistake.explanation,
          "Hech qanday xatolik yo'q, kod to'liq to'g'ri",
          "Faqat o'zgaruvchi nomi inglizcha emas",
          "Kodni o'chirib qayta yozish talab etiladi",
        ],
        correctAnswerIndex: 0,
        explanation: `To'g'ri yozilishi:\n${mistake.goodCode}\nIzoh: ${mistake.explanation}`,
      });
    });
  }

  if (lesson.syntaxBreakdown && lesson.syntaxBreakdown.length > 0) {
    lesson.syntaxBreakdown.forEach((item, idx) => {
      addQ({
        id: `q-syntax-${lesson.id}-${idx}`,
        question: `"${lesson.title}" darsidagi "${item.term}" terminining ma'nosi va vazifasi nima?`,
        options: [
          item.meaning,
          'Faqat veb-sahifadagi matn rangini qizil qilish',
          'Foydalanuvchi kompyuterini bloklash',
          'Brauzer xotirasini butunlay tozalash',
        ],
        correctAnswerIndex: 0,
        explanation: `"${item.term}" - ${item.meaning}`,
      });
    });
  }

  if (lesson.theoryDetails && lesson.theoryDetails.length > 0) {
    lesson.theoryDetails.forEach((detail, idx) => {
      addQ({
        id: `q-theory-${lesson.id}-${idx}`,
        question: `"${lesson.title}" bo'yicha qaysi qoida to'g'ri bayon etilgan?`,
        options: [
          detail.length > 90 ? detail.slice(0, 85) + '...' : detail,
          'Dasturlashda xavfsizlik va standartlar muhim emas',
          'Barcha kodlarni bitta qatorga yozish tavsiya qilinadi',
          'Ushbu texnologiya zamonaviy tizimlarda butunlay taqiqlangan',
        ],
        correctAnswerIndex: 0,
        explanation: detail,
      });
    });
  }

  if (lesson.practiceTask) {
    addQ({
      id: `q-task-${lesson.id}`,
      question: `"${lesson.title}" mavzusidagi amaliy laboratoriya topshirig'i maqsadi nima?`,
      options: [
        lesson.practiceTask.length > 90
          ? lesson.practiceTask.slice(0, 85) + '...'
          : lesson.practiceTask,
        'Shunchaki matnni nusxalab konsolga yopishtirish',
        'Brauzerni yopib tizimdan chiqish',
        'Kompyuter xotirasini tekshirish',
      ],
      correctAnswerIndex: 0,
      explanation: `Amaliy vazifa: ${lesson.practiceTask}`,
    });
  }

  if (lesson.solutionKeyword) {
    addQ({
      id: `q-kw-${lesson.id}`,
      question: `"${lesson.title}" darsida kodni muvaffaqiyatli ishga tushirish uchun qaysi kalit sintaksis ishlatiladi?`,
      options: [
        `Kodda "${lesson.solutionKeyword}" tushunchasi qo'llanilishi kerak`,
        `Faqat "console.clear()" buyrug'i kifoya`,
        `Hech qanday kalit so'z talab qilinmaydi`,
        `Faqat matnli izoh qoldirish kerak`,
      ],
      correctAnswerIndex: 0,
      explanation: `Ushbu darsning mohiyati "${lesson.solutionKeyword}" orqali ishlaydi.`,
    });
  }

  const topicFallbacks = [
    {
      q: `"${lesson.title}" texnologiyasi real veb-ilovalarda qanday afzallik beradi?`,
      a: 'Tizim barqarorligi, tezkor yuklanish va qulay foydalanuvchi tajribasini (UX) oshiradi',
      e: 'Standartlarga mos kod foydalanuvchi tajribasini oshiradi va texnik qarzni kamaytiradi.',
    },
    {
      q: `"${lesson.title}" darsidagi kodni optimallashtirishda eng yaxshi amaliyot (Best Practice) nima?`,
      a: 'Ortiqcha takrorlanishdan (DRY) qochish va toza, tushunarli modulli arxitektura yozish',
      e: 'Toza va tushunarli kod jamoaviy ishlashda unumdorlikni bir necha barobar oshiradi.',
    },
    {
      q: `"${lesson.title}" da yozilgan kod xatolik berganida eng birinchi qilinadigan qadam qaysi?`,
      a: "Brauzer konsoli yoki server loglaridagi xato satri va xabarini diqqat bilan o'qish",
      e: "Debugging birinchi navbatda xato xabarini to'g'ri o'qish va tahlil qilishdan boshlanadi.",
    },
    {
      q: `"${lesson.title}" ning xavfsizlik (Security) jihatidan eng muhim tamoyili nima?`,
      a: "Foydalanuvchi kiritgan ma'lumotlarni tekshirish (validatsiya) va ruxsatsiz kirishlardan himoyalash",
      e: "Har qanday kiritilgan ma'lumot tekshirilishi va xavfsiz qayta ishlanishi shart.",
    },
    {
      q: `"${lesson.title}" bo'yicha yaratilgan modulni boshqa dasturchilar tushunishi uchun nima qilinadi?`,
      a: "To'g'ri nomlash konvensiyasi (naming conventions) va lo'nda dokumentatsiya yuritiladi",
      e: "O'zgaruvchi va funksiyalarni aniq ma'noli nomlash kod o'qilishini yengillashtiradi.",
    },
    {
      q: `"${lesson.title}" darsining asosiy xulosasi nimadan iborat?`,
      a: lesson.summary.length > 90 ? lesson.summary.slice(0, 85) + '...' : lesson.summary,
      e: lesson.summary,
    },
  ];

  let fallbackIdx = 0;
  while (result.length < 15 && fallbackIdx < topicFallbacks.length) {
    const item = topicFallbacks[fallbackIdx];
    addQ({
      id: `q-fallback-${lesson.id}-${fallbackIdx}`,
      question: item.q,
      options: [
        item.a,
        "Faqat ekranni qoraytirib animatsiya ko'rsatish",
        "Server bazasidagi ma'lumotlarni tasodifiy o'chirish",
        "Kodni brauzerga yuklamasdan o'tkazib yuborish",
      ],
      correctAnswerIndex: 0,
      explanation: item.e,
    });
    fallbackIdx++;
  }

  while (result.length < 15) {
    const n = result.length + 1;
    addQ({
      id: `q-deep-${lesson.id}-${n}`,
      question: `"${lesson.title}" mavzusining ${n}-darajali muhim texnik talabi nima?`,
      options: [
        `Mavzuning standartlariga qat'iy amal qilish va toza sintaksis (${lesson.stage.toUpperCase()})`,
        'Faqat izohsiz uzun matn yozish',
        'Barcha xatoliklarni konsolda yashirish',
        "Loyihani testdan o'tkazmasdan tarqatish",
      ],
      correctAnswerIndex: 0,
      explanation:
        'Dasturlashda standartlarga va toza sintaksisga rioya qilish asosiy qoidadir.',
    });
  }

  return result.slice(0, 15).map((q, qIndex) => {
    const origCorrect = q.options[q.correctAnswerIndex];
    const shuffledOptions = [...q.options].sort(() => ((qIndex * 17 + 3) % 7) - 3.5);
    const newCorrectIdx = shuffledOptions.indexOf(origCorrect);
    return {
      ...q,
      options: shuffledOptions,
      correctAnswerIndex: newCorrectIdx >= 0 ? newCorrectIdx : 0,
    };
  });
}

export const LessonQuizModal: React.FC<LessonQuizModalProps> = ({
  lesson,
  studentId,
  onClose,
  onQuizSuccess,
}) => {
  const questions: LessonQuizQuestion[] = useMemo(() => {
    return generate15LessonQuestions(lesson);
  }, [lesson]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [checkedStatus, setCheckedStatus] = useState<'none' | 'correct' | 'wrong'>('none');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [result, setResult] = useState<{
    passed: boolean;
    percentage: number;
    xpGained: number;
    newCoins: number;
    message: string;
    newCertificate?: CertificateData;
  } | null>(null);

  useEffect(() => {
    if (isSubmitted) return;
    const t = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isSubmitted]);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLast = currentIndex === totalQuestions - 1;
  const selectedOpt = selectedAnswers[currentIndex];

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted || checkedStatus !== 'none') return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIndex }));
  };

  // Duolingo Check Answer Step
  const handleCheckAnswer = () => {
    if (selectedOpt === undefined) return;
    const isCorrect = selectedOpt === currentQ.correctAnswerIndex;
    setCheckedStatus(isCorrect ? 'correct' : 'wrong');
  };

  const handleContinue = () => {
    setCheckedStatus('none');
    if (isLast) {
      handleSubmit();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const subResult = recordQuizSubmission({
      studentId,
      lessonId: lesson.id,
      percentage,
      xpReward: lesson.xpReward || 60,
    });

    setResult(subResult);
    setIsSubmitted(true);

    if (subResult.passed) {
      try {
        confetti({
          particleCount: 110,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
        });
      } catch {
        // ignore
      }
      onQuizSuccess(subResult.xpGained, subResult.newCertificate);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setCheckedStatus('none');
    setIsSubmitted(false);
    setElapsedSeconds(0);
    setResult(null);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div
        className={`relative w-full max-w-2xl aurora-card overflow-hidden flex flex-col max-h-[94vh] ${
          checkedStatus === 'wrong' ? 'animate-aurora-shake' : ''
        }`}
      >
        {/* Top Progress Bar Header */}
        <div className="p-4 sm:p-5 border-b border-[#ff6b86]/20 flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl aurora-surface-2 cursor-pointer shrink-0"
            title="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Chunky Duolingo Progress Bar */}
          <div className="flex-1 h-4 rounded-full aurora-surface-2 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#b6f03c] transition-all duration-300"
              style={{
                width: `${((currentIndex + (isSubmitted ? 1 : 0)) / totalQuestions) * 100}%`,
              }}
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold shrink-0">
            <span className="text-[#ffd23f] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {formatTime(elapsedSeconds)}
            </span>
            <span className="text-[#3ee6c4]">
              {currentIndex + 1}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {!isSubmitted ? (
            <>
              {/* Mascot & Question Prompt */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CmdBekMascot
                    mood={
                      checkedStatus === 'correct'
                        ? 'celebrating'
                        : checkedStatus === 'wrong'
                        ? 'oops'
                        : 'thinking'
                    }
                    size={62}
                  />
                  <div className="space-y-1">
                    <span className="font-mono text-xs font-bold text-[#ff8a3d] uppercase block">
                      Savol {currentIndex + 1} · +{lesson.xpReward || 60} XP · +2.5 Tanga
                    </span>
                    <h3 className="font-display text-lg sm:text-xl font-bold leading-snug">
                      {currentQ.question}
                    </h3>
                  </div>
                </div>

                {currentQ.codeSnippet && (
                  <pre className="p-4 rounded-2xl aurora-surface-2 text-xs font-mono text-[#3ee6c4] overflow-x-auto">
                    {currentQ.codeSnippet}
                  </pre>
                )}
              </div>

              {/* Large Duolingo Answer Cards (lift on hover/click) */}
              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  const isCorrectOpt = optIdx === currentQ.correctAnswerIndex;

                  let cardStyle = 'aurora-surface-2 hover:-translate-y-0.5';
                  if (checkedStatus !== 'none') {
                    if (isCorrectOpt) {
                      cardStyle =
                        'bg-[#b6f03c]/20 border-2 border-[#b6f03c] text-[#b6f03c] shadow-[0_4px_0_#7db512]';
                    } else if (isSelected && checkedStatus === 'wrong') {
                      cardStyle =
                        'bg-[#ff4d6d]/20 border-2 border-[#ff4d6d] text-[#ff6b86] shadow-[0_4px_0_#b81d3a]';
                    }
                  } else if (isSelected) {
                    cardStyle =
                      'bg-[#ff8a3d]/20 border-2 border-[#ff8a3d] shadow-[0_4px_0_#c85c17] -translate-y-0.5';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 rounded-xl font-mono font-bold flex items-center justify-center text-xs shrink-0 ${
                            isSelected
                              ? 'bg-[#ff8a3d] text-[#0a0912]'
                              : 'aurora-card'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            /* Final Result Screen with XP, Accuracy %, Time, and Confetti */
            <div className="text-center space-y-6 py-4 animate-aurora-pop">
              <div className="flex justify-center">
                <CmdBekMascot
                  mood={result?.passed ? 'celebrating' : 'oops'}
                  size={105}
                />
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  {result?.passed ? 'Mashq Yakunlandi!' : "Qayta Urinib Ko'ring"}
                </h3>
                <p className="text-xs opacity-80 max-w-md mx-auto">{result?.message}</p>
              </div>

              {/* 3 Gamified Stat Boxes: Accuracy %, XP, Time */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase opacity-70 block">
                    Aniqlik
                  </span>
                  <span className="font-display font-mono text-xl font-bold text-[#b6f03c]">
                    {result?.percentage}%
                  </span>
                </div>
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase opacity-70 block">
                    Tajriba
                  </span>
                  <span className="font-display font-mono text-xl font-bold text-[#ffd23f]">
                    +{result?.xpGained || 0} XP
                  </span>
                </div>
                <div className="aurora-surface-2 p-3.5 rounded-2xl">
                  <span className="text-[10px] font-mono uppercase opacity-70 block">
                    Vaqt
                  </span>
                  <span className="font-display font-mono text-xl font-bold text-[#3ee6c4]">
                    {formatTime(elapsedSeconds)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl aurora-surface-2 inline-flex items-center gap-2 text-xs font-bold text-[#ffd23f]">
                <Coins className="w-4 h-4" />
                <span>+2.5 Tanga hisobingizga qo&apos;shildi!</span>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                {!result?.passed && (
                  <button
                    type="button"
                    onClick={handleRetry}
                    className="duo-btn duo-btn-surface text-xs sm:text-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Qaytadan Sinash</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="duo-btn duo-btn-mint text-xs sm:text-sm !px-7"
                >
                  <span>Davom Etish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Duolingo Bottom Feedback Panel (Green "Ajoyib!" or Red "To'g'ri javob: …") */}
        {!isSubmitted && (
          <div
            className={`p-4 sm:p-5 border-t transition-colors ${
              checkedStatus === 'correct'
                ? 'bg-[#b6f03c]/20 border-[#b6f03c]'
                : checkedStatus === 'wrong'
                ? 'bg-[#ff4d6d]/20 border-[#ff4d6d]'
                : 'aurora-surface-2 border-[#ff6b86]/20'
            }`}
          >
            {checkedStatus === 'none' ? (
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs opacity-75 font-mono">
                  Javobni tanlang va tekshiring
                </span>
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={selectedOpt === undefined}
                  className="duo-btn duo-btn-coral text-xs sm:text-sm disabled:opacity-40"
                >
                  <span>Tekshirish</span>
                </button>
              </div>
            ) : checkedStatus === 'correct' ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-aurora-pop">
                <div className="flex items-center gap-3">
                  <CmdBekMascot mood="celebrating" size={50} />
                  <div>
                    <h4 className="font-display text-base font-bold text-[#b6f03c]">
                      Ajoyib! To&apos;g&apos;ri javob!
                    </h4>
                    <p className="text-xs opacity-85">{currentQ.explanation}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="duo-btn duo-btn-lime text-xs sm:text-sm shrink-0"
                >
                  <span>{isLast ? 'Natijani Ko‘rish' : 'Davom etish'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-aurora-pop">
                <div className="flex items-start gap-3">
                  <CmdBekMascot mood="oops" size={50} />
                  <div>
                    <h4 className="font-display text-sm sm:text-base font-bold text-[#ff6b86]">
                      To&apos;g&apos;ri javob: {currentQ.options[currentQ.correctAnswerIndex]}
                    </h4>
                    <p className="text-xs opacity-85 mt-0.5">{currentQ.explanation}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="duo-btn duo-btn-coral text-xs sm:text-sm shrink-0"
                >
                  <span>{isLast ? 'Natijani Ko‘rish' : 'Davom etish'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
