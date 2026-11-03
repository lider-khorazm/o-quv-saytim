import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Send,
  Download,
  Flame,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINAL_BOSS_QUESTIONS } from '../data/mockData';
import { Student } from '../types';
import { CmdBekMascot } from './CmdBekMascot';

interface FinalExamModalProps {
  student: Student;
  onClose: () => void;
  onPassed100Percent: () => void;
}

export const FinalExamModal: React.FC<FinalExamModalProps> = ({
  student,
  onClose,
  onPassed100Percent,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [examResult, setExamResult] = useState<{
    score: number;
    total: number;
    percentage: number;
    passed: boolean;
  } | null>(null);

  const questions = FINAL_BOSS_QUESTIONS;

  const handleSelect = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const handleFinish = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage === 100;

    setExamResult({
      score: correctCount,
      total: questions.length,
      percentage,
      passed,
    });

    if (passed) {
      try {
        confetti({
          particleCount: 150,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
        });
      } catch {
        // ignore
      }
      onPassed100Percent();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIdx(0);
    setExamResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="aurora-card border-2 border-[#ffd23f]/60 max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-[#ff6b86]/20 aurora-surface-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] flex items-center justify-center shadow">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold">
                Katta Final Imtihon · 100% Talab Etiladi
              </h2>
              <p className="text-xs opacity-75">
                HTML + CSS + JavaScript bo&apos;yicha yakuniy diplom sinovi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl aurora-card cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!examResult ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span>
                  Savol {currentIdx + 1} / {questions.length}
                </span>
                <span className="text-[#ffd23f]">
                  Belgilangan: {Object.keys(answers).length} / {questions.length}
                </span>
              </div>

              <div className="w-full h-3.5 rounded-full aurora-surface-2 overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ffd23f] via-[#ff8a3d] to-[#ff6b86] transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {questions[currentIdx] && (
                <div className="aurora-surface-2 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <CmdBekMascot mood="thinking" size={54} />
                    <h3 className="font-display text-base sm:text-lg font-bold whitespace-pre-wrap leading-relaxed">
                      {currentIdx + 1}. {questions[currentIdx].question}
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {questions[currentIdx].options.map((opt, oIdx) => {
                      const isSelected = answers[questions[currentIdx].id] === oIdx;

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelect(questions[currentIdx].id, oIdx)}
                          className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-[#ffd23f]/20 border-2 border-[#ffd23f] -translate-y-0.5 shadow-[0_4px_0_#c9990e]'
                              : 'aurora-card hover:-translate-y-0.5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-xl font-mono font-bold flex items-center justify-center text-xs shrink-0 ${
                                isSelected ? 'bg-[#ffd23f] text-[#0a0912]' : 'aurora-surface-2'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#ffd23f] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 gap-3">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  className="duo-btn duo-btn-surface text-xs disabled:opacity-35"
                >
                  ← Oldingi
                </button>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIdx(idx)}
                      className={`w-8 h-8 rounded-xl font-mono text-xs font-bold cursor-pointer ${
                        currentIdx === idx
                          ? 'bg-[#ffd23f] text-[#0a0912]'
                          : answers[q.id] !== undefined
                          ? 'bg-[#3ee6c4]/25 text-[#3ee6c4]'
                          : 'aurora-surface-2'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>

                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((p) => p + 1)}
                    className="duo-btn duo-btn-surface text-xs"
                  >
                    Keyingi →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="duo-btn duo-btn-gold text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Natijani Tekshirish</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-6 max-w-lg mx-auto text-center space-y-6 animate-aurora-pop">
              {examResult.passed ? (
                <div className="space-y-5">
                  <div className="flex justify-center">
                    <CmdBekMascot mood="celebrating" size={100} />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold">
                      Muborak Bo&apos;lsin! 100% Natija!
                    </h3>
                    <p className="text-xs opacity-80 mt-1">
                      Siz barcha 10 ta savolga 100% to&apos;g&apos;ri javob berdingiz va DevMaster
                      diplomiga sazovor bo&apos;ldingiz!
                    </p>
                  </div>

                  <div className="p-6 aurora-surface-2 border-2 border-[#ffd23f] rounded-3xl text-left space-y-3">
                    <div className="flex justify-between items-center border-b border-[#ffd23f]/30 pb-3">
                      <div>
                        <span className="text-[10px] text-[#ffd23f] font-mono font-bold uppercase block">
                          Rasmiy Sertifikat
                        </span>
                        <h4 className="font-display text-base font-bold">
                          DevMaster Academy Diplom
                        </h4>
                      </div>
                      <Award className="w-8 h-8 text-[#ffd23f]" />
                    </div>
                    <p className="text-xs opacity-85">
                      Ushbu sertifikat{' '}
                      <strong>
                        {student.name} {student.surname}
                      </strong>
                      ga HTML, CSS va JavaScript bo&apos;yicha 100% lik natijasi uchun taqdim
                      etiladi.
                    </p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="duo-btn duo-btn-gold text-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Chop Etish / PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="duo-btn duo-btn-surface text-xs"
                    >
                      <span>Yopish</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex justify-center">
                    <CmdBekMascot mood="oops" size={100} />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold">
                      Natija: {examResult.percentage}% ({examResult.score}/{examResult.total})
                    </h3>
                    <p className="text-xs opacity-75 mt-1">
                      Diplom olish uchun 100% natija talab qilinadi. Xohlagancha qayta urinib
                      ko&apos;rishingiz mumkin!
                    </p>
                  </div>

                  <div className="p-4 aurora-surface-2 rounded-2xl text-xs text-left space-y-1">
                    <span className="font-bold text-[#ff8a3d] flex items-center gap-1.5">
                      <Flame className="w-4 h-4" /> Taslim bo&apos;lmang!
                    </span>
                    <p className="opacity-80">
                      Xatolarni tahlil qilib, hoziroq qayta urinib ko&apos;ring.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleRetry}
                      className="flex-1 duo-btn duo-btn-coral text-xs"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Qayta Topshirish</span>
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="duo-btn duo-btn-surface text-xs"
                    >
                      <span>Chiqish</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
