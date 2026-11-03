import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GeneratedTest, TestSubmissionResult } from '../types';
import { getTestById, submitTest } from '../services/storage';
import { CmdBekMascot } from './CmdBekMascot';

interface TestTakingModalProps {
  initialTestId?: string;
  onClose: () => void;
  onTestSubmittedSuccess: () => void;
}

export const TestTakingModal: React.FC<TestTakingModalProps> = ({
  initialTestId = '',
  onClose,
  onTestSubmittedSuccess,
}) => {
  const [testId, setTestId] = useState(initialTestId);
  const [activeTest, setActiveTest] = useState<GeneratedTest | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(1800);
  const [submissionComplete, setSubmissionComplete] = useState<TestSubmissionResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTestId) {
      loadTest(initialTestId);
    }
  }, [initialTestId]);

  useEffect(() => {
    if (!activeTest || submissionComplete) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTest, submissionComplete]);

  const loadTest = (id: string) => {
    setErrorMessage('');
    const found = getTestById(id);
    if (!found) {
      setErrorMessage(
        "Kechirasiz, ushbu Test ID topilmadi yoki u allaqachon topshirilib bazadan o'chirib yuborilgan!"
      );
      setActiveTest(null);
    } else {
      setActiveTest(found);
      setCurrentQuestionIdx(0);
      setSelectedAnswers({});
      setTimeLeft(found.questions.length * 120);
    }
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    if (!activeTest) return;

    setIsSubmitting(true);
    const answersPayload = activeTest.questions.map((q) => ({
      questionId: q.id,
      selectedIndex: selectedAnswers[q.id] !== undefined ? selectedAnswers[q.id] : -1,
    }));

    setTimeout(() => {
      const res = submitTest(activeTest.id, answersPayload);
      setIsSubmitting(false);

      if (res.success && res.result) {
        setSubmissionComplete(res.result);
        onTestSubmittedSuccess();
        try {
          confetti({
            particleCount: 100,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#b6f03c', '#ffd23f'],
          });
        } catch {
          // ignore
        }
      } else {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="aurora-card max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden relative">
        {/* Header */}
        <div className="p-5 border-b border-[#ff6b86]/20 aurora-surface-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff8a3d]/20 text-[#ff8a3d] flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold flex items-center gap-2">
                <span>Maxsus Test ID Sinovi</span>
                {activeTest && (
                  <span className="font-mono text-xs text-[#3ee6c4]">[{activeTest.id}]</span>
                )}
              </h2>
              <p className="text-xs opacity-75">
                Bir martalik ID asosidagi imtihon (topshirilgach avtomatik o&apos;chadi)
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

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!activeTest && !submissionComplete && (
            <div className="max-w-md mx-auto py-6 text-center space-y-5">
              <div className="flex flex-col items-center gap-2">
                <CmdBekMascot
                  mood={errorMessage ? 'oops' : 'hello'}
                  size={84}
                />
                <p className="text-xs opacity-80">
                  Ustozingiz bergan maxsus Test ID kodini kiriting va bilimingizni sinang!
                </p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Masalan: TEST-HTML-7482"
                  value={testId}
                  onChange={(e) => setTestId(e.target.value.toUpperCase())}
                  className="w-full aurora-input text-center text-sm font-mono uppercase tracking-wider font-bold"
                />

                {errorMessage && (
                  <div className="p-3.5 rounded-2xl bg-[#ff4d6d]/20 border border-[#ff4d6d]/40 text-[#ff6b86] text-xs text-left flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => loadTest(testId)}
                  className="w-full duo-btn duo-btn-coral text-sm"
                >
                  <span>Testni Boshlash</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {activeTest && !submissionComplete && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs font-bold text-[#ff8a3d]">
                  Savol {currentQuestionIdx + 1} / {activeTest.questions.length} ·{' '}
                  {activeTest.stage.toUpperCase()}
                </span>
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#ffd23f] px-3 py-1 rounded-xl aurora-surface-2">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3.5 aurora-surface-2 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#3ee6c4] transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIdx + 1) / activeTest.questions.length) * 100}%`,
                  }}
                />
              </div>

              {activeTest.questions[currentQuestionIdx] && (
                <div className="aurora-surface-2 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center gap-3">
                    <CmdBekMascot mood={isSubmitting ? 'thinking' : 'thinking'} size={54} />
                    <h3 className="font-display text-base sm:text-lg font-bold leading-relaxed">
                      {currentQuestionIdx + 1}. {activeTest.questions[currentQuestionIdx].question}
                    </h3>
                  </div>

                  {activeTest.questions[currentQuestionIdx].codeSnippet && (
                    <pre className="aurora-card p-4 rounded-2xl font-mono text-xs text-[#3ee6c4] overflow-x-auto">
                      {activeTest.questions[currentQuestionIdx].codeSnippet}
                    </pre>
                  )}

                  <div className="space-y-2.5 pt-2">
                    {activeTest.questions[currentQuestionIdx].options.map((opt, optIdx) => {
                      const isSelected =
                        selectedAnswers[activeTest.questions[currentQuestionIdx].id] === optIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() =>
                            handleSelectOption(activeTest.questions[currentQuestionIdx].id, optIdx)
                          }
                          className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? 'bg-[#ff6b86]/20 border-2 border-[#ff6b86] -translate-y-0.5 shadow-[0_4px_0_#c93b58]'
                              : 'aurora-card hover:-translate-y-0.5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-xl font-mono font-bold flex items-center justify-center text-xs shrink-0 ${
                                isSelected ? 'bg-[#ff6b86] text-[#0a0912]' : 'aurora-surface-2'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-[#ff6b86] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 gap-3">
                <button
                  type="button"
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                  className="duo-btn duo-btn-surface text-xs disabled:opacity-35"
                >
                  ← Oldingi
                </button>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  {activeTest.questions.map((q, idx) => {
                    const answered = selectedAnswers[q.id] !== undefined;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={`w-8 h-8 rounded-xl font-mono text-xs font-bold cursor-pointer ${
                          currentQuestionIdx === idx
                            ? 'bg-[#ff6b86] text-[#0a0912]'
                            : answered
                            ? 'bg-[#3ee6c4]/25 text-[#3ee6c4]'
                            : 'aurora-surface-2'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {currentQuestionIdx < activeTest.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                    className="duo-btn duo-btn-surface text-xs"
                  >
                    Keyingi →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="duo-btn duo-btn-mint text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Tekshirilmoqda...' : 'Yakunlash'}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {submissionComplete && (
            <div className="py-6 max-w-lg mx-auto text-center space-y-6 animate-aurora-pop">
              <div className="flex justify-center">
                <CmdBekMascot
                  mood={submissionComplete.percentage >= 70 ? 'celebrating' : 'oops'}
                  size={96}
                />
              </div>

              <div>
                <h3 className="font-display text-2xl font-bold">
                  Test Muvaffaqiyatli Topshirildi!
                </h3>
                <p className="text-xs opacity-75 mt-1">
                  Bir martalik <strong>[{submissionComplete.testId}]</strong> kodi bazadan
                  avtomatik o&apos;chirildi.
                </p>
              </div>

              <div className="aurora-surface-2 p-5 rounded-2xl space-y-3 text-left text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-[#ff6b86]/15">
                  <span className="opacity-75">Umumiy Natijangiz:</span>
                  <span className="font-display font-mono text-lg font-bold text-[#3ee6c4]">
                    {submissionComplete.percentage}% ({submissionComplete.score} ball)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-75">To&apos;g&apos;ri javoblar:</span>
                  <span className="font-mono font-bold">
                    {submissionComplete.answers.filter((a) => a.isCorrect).length} /{' '}
                    {submissionComplete.totalQuestions}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full duo-btn duo-btn-coral text-xs sm:text-sm"
              >
                <span>Yopish va Davom Etish</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
