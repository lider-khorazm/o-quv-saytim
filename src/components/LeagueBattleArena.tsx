import React, { useState, useEffect, useRef } from 'react';
import { Swords, Bot, Users, Timer, Trophy, ShieldAlert, CheckCircle2, XCircle, ArrowLeft, Play } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CourseStage, Student, TestQuestion } from '../types';
import { QUESTION_BANK, LESSONS } from '../data/mockData';
import { recordLeagueBattleResult } from '../services/storage';
import { AvatarWithFrame } from './AvatarWithFrame';

interface LeagueBattleArenaProps {
  student: Student;
  allStudents: Student[];
  onRefreshStudent: () => void;
  onBackToHub?: () => void;
}

function build30StageQuestions(stage: CourseStage): TestQuestion[] {
  const validStage: 'html' | 'css' | 'javascript' =
    stage === 'css' ? 'css' : stage === 'javascript' || stage === 'graduated' ? 'javascript' : 'html';

  const pool: TestQuestion[] = [...(QUESTION_BANK[validStage] || QUESTION_BANK.html)];

  // Add lesson quiz questions from the same stage
  LESSONS.filter((l) => l.stage === validStage).forEach((lesson) => {
    (lesson.quiz || []).forEach((q, idx) => {
      pool.push({
        id: `lquiz-${lesson.id}-${idx}`,
        question: q.question,
        codeSnippet: q.codeSnippet,
        options: q.options,
        correctAnswerIndex: q.correctAnswerIndex,
        explanation: q.explanation,
        points: 1,
      });
    });
  });

  // Ensure exactly 30 questions by cycling/shuffling if pool < 30
  const result: TestQuestion[] = [];
  let round = 1;
  while (result.length < 30 && pool.length > 0) {
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    for (const item of shuffled) {
      if (result.length >= 30) break;
      result.push({
        ...item,
        id: `${item.id}-r${round}-${result.length}`,
        points: 1,
      });
    }
    round++;
  }
  return result;
}

export const LeagueBattleArena: React.FC<LeagueBattleArenaProps> = ({
  student,
  allStudents,
  onRefreshStudent,
  onBackToHub,
}) => {
  const [battleMode, setBattleMode] = useState<'select' | 'pvp' | 'ai'>('select');
  const [opponent, setOpponent] = useState<Student | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [myScore, setMyScore] = useState<number>(0);
  const [oppScore, setOppScore] = useState<number>(0);
  const [roundLocked, setRoundLocked] = useState<boolean>(false);
  const [roundStatus, setRoundStatus] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [battleFinished, setBattleFinished] = useState<boolean>(false);
  const [battleSummary, setBattleSummary] = useState<{
    won: boolean;
    xpDelta: number;
    coinDelta: number;
  } | null>(null);

  const oppTimerRef = useRef<number | null>(null);

  const clearOpponentTimer = () => {
    if (oppTimerRef.current) {
      window.clearTimeout(oppTimerRef.current);
      oppTimerRef.current = null;
    }
  };

  const startBattle = (mode: 'pvp' | 'ai') => {
    clearOpponentTimer();
    const qList = build30StageQuestions(student.stage);
    setQuestions(qList);
    setCurrentIndex(0);
    setTimeLeft(15);
    setMyScore(0);
    setOppScore(0);
    setRoundLocked(false);
    setRoundStatus(null);
    setSelectedOption(null);
    setBattleFinished(false);
    setBattleSummary(null);

    if (mode === 'pvp') {
      const sameStagePeers = allStudents.filter(
        (s) => s.id !== student.id && s.stage === student.stage
      );
      const anyPeers = allStudents.filter((s) => s.id !== student.id);
      const pool = sameStagePeers.length > 0 ? sameStagePeers : anyPeers;
      if (pool.length > 0) {
        const picked = pool[Math.floor(Math.random() * pool.length)];
        setOpponent(picked);
      } else {
        setOpponent({
          id: 'pvp-shadow-peer',
          name: 'Sardor',
          surname: 'Karimov',
          username: `raqib_${student.stage}`,
          avatar: '/assets/aistudio/image_90f513be.png',
          phone: '+998 90 123 45 67',
          email: 'raqib@devmaster.uz',
          stage: student.stage,
          xp: student.xp + 20,
          rank: 1,
          coins: 10,
          teacherId: 't-1',
          completedLessons: [],
          isOnline: true,
          lastActive: 'Hozir',
          joinedDate: '2026',
        });
      }
    } else {
      setOpponent({
        id: 'ai-gladiator-bot',
        name: 'CMDbek AI',
        surname: 'Gladiator',
        username: 'cmdbek_ai_master',
        avatar: '/assets/aistudio/image_90f513be.png',
        phone: 'AI-NEURAL-CORE',
        email: 'ai@devmaster.uz',
        stage: student.stage,
        xp: Math.max(200, student.xp + 50),
        rank: 1,
        coins: 50,
        teacherId: 'ai-teacher-temur',
        completedLessons: [],
        isOnline: true,
        lastActive: 'Hozir',
        joinedDate: '2026',
      });
    }

    setBattleMode(mode);
  };

  const advanceToNextQuestion = (nextMyScore: number, nextOppScore: number) => {
    clearOpponentTimer();
    if (currentIndex + 1 >= questions.length) {
      const won = nextMyScore >= nextOppScore;
      const res = recordLeagueBattleResult({
        studentId: student.id,
        won,
        opponentName: opponent ? `${opponent.name} ${opponent.surname}` : 'Raqib',
        mode: battleMode === 'pvp' ? 'pvp' : 'ai',
        myScore: nextMyScore,
        opponentScore: nextOppScore,
      });
      setBattleFinished(true);
      setBattleSummary({
        won,
        xpDelta: res.xpDelta,
        coinDelta: res.coinDelta,
      });
      onRefreshStudent();
      if (won) {
        try {
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        } catch {}
      }
    } else {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(15);
      setRoundLocked(false);
      setRoundStatus(null);
      setSelectedOption(null);
    }
  };

  // 15-second countdown & simulated opponent speed reaction
  useEffect(() => {
    if (battleMode === 'select' || battleFinished || roundLocked || questions.length === 0) {
      return;
    }

    const countdown = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(countdown);
          setRoundLocked(true);
          const oppGotIt = Math.random() < 0.65;
          const updatedOpp = oppGotIt ? oppScore + 1 : oppScore;
          if (oppGotIt) setOppScore(updatedOpp);
          setRoundStatus(
            oppGotIt
              ? `⏰ 15 soniya tugadi! ${opponent?.name || 'Raqib'} to'g'ri topib +1 ball oldi!`
              : `⏰ 15 soniya tugadi! Hech kim ball olmadi.`
          );
          window.setTimeout(() => advanceToNextQuestion(myScore, updatedOpp), 1400);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(countdown);
  }, [battleMode, battleFinished, roundLocked, currentIndex, questions.length, myScore, oppScore]);

  // Opponent race timer (answers between 6s and 13s; if opponent answers first & correctly, they snatch the point!)
  useEffect(() => {
    if (battleMode === 'select' || battleFinished || roundLocked || questions.length === 0) {
      return;
    }
    clearOpponentTimer();
    const delayMs = Math.floor(6500 + Math.random() * 6500);
    oppTimerRef.current = window.setTimeout(() => {
      if (roundLocked) return;
      const opponentCorrect = Math.random() < 0.68;
      if (opponentCorrect) {
        setRoundLocked(true);
        const updatedOpp = oppScore + 1;
        setOppScore(updatedOpp);
        setRoundStatus(
          `⚡ ${opponent?.name || 'Raqib'} sizdan oldinroq (1-bo'lib) to'g'ri belgiladi va +1 ball oldi!`
        );
        window.setTimeout(() => advanceToNextQuestion(myScore, updatedOpp), 1500);
      }
    }, delayMs);

    return () => clearOpponentTimer();
  }, [battleMode, battleFinished, currentIndex, roundLocked, questions.length]);

  const handleSelectAnswer = (optionIdx: number) => {
    if (roundLocked || battleFinished) return;
    clearOpponentTimer();
    setSelectedOption(optionIdx);
    setRoundLocked(true);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctAnswerIndex;

    if (isCorrect) {
      const updatedMy = myScore + 1;
      setMyScore(updatedMy);
      setRoundStatus(`✅ Siz 1-bo'lib to'g'ri javob berdingiz! +1 ball!`);
      window.setTimeout(() => advanceToNextQuestion(updatedMy, oppScore), 1200);
    } else {
      const oppCounterCorrect = Math.random() < 0.75;
      const updatedOpp = oppCounterCorrect ? oppScore + 1 : oppScore;
      if (oppCounterCorrect) setOppScore(updatedOpp);
      setRoundStatus(
        oppCounterCorrect
          ? `❌ Xato belgiladingiz! ${opponent?.name || 'Raqib'} to'g'ri topib +1 ball oldi.`
          : `❌ Xato javob! Bu savolda hech kimga ball berilmadi.`
      );
      window.setTimeout(() => advanceToNextQuestion(myScore, updatedOpp), 1400);
    }
  };

  if (battleMode === 'select') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2.5">
              <Swords className="w-6 h-6 text-[#ff6b86]" />
              <span>Liga Jang Maydoni ({student.stage.toUpperCase()} Bosqichi)</span>
            </h2>
            <p className="text-xs sm:text-sm opacity-75 mt-1">
              30 ta savol • Har bir savolga 15 soniya • Kim 1-bo&apos;lib to&apos;g&apos;ri belgilasa +1 ball oladi
            </p>
          </div>
          {onBackToHub && (
            <button
              type="button"
              onClick={onBackToHub}
              className="duo-btn duo-btn-surface px-4 py-2 text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Asosiy Bo&apos;limga Qaytish</span>
            </button>
          )}
        </div>

        {/* Rules Summary Banner */}
        <div className="aurora-card p-5 border border-[#ffd23f]/30 bg-[#ffd23f]/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Timer className="w-8 h-8 text-[#ffd23f] shrink-0" />
            <div>
              <div className="font-black text-sm">30 Savol • 15 Soniya</div>
              <div className="opacity-75">Har bir savolga 1 ball (Jami 30 ball)</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#3ee6c4] shrink-0" />
            <div>
              <div className="font-black text-sm text-[#3ee6c4]">G&apos;olib Mukofoti</div>
              <div className="opacity-80 font-mono">+30 XP va +2 🪙 Tanga</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-[#ff6b86] shrink-0" />
            <div>
              <div className="font-black text-sm text-[#ff6b86]">Mag&apos;lub Jarimasi</div>
              <div className="opacity-80 font-mono">-30 XP va -2 🪙 Tanga</div>
            </div>
          </div>
        </div>

        {/* 2 Mode Cards: PvP vs With AI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aurora-card p-6 sm:p-8 flex flex-col justify-between space-y-5 border-2 border-[#ff6b86]/40 hover:border-[#ff6b86] transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black">1. PvP (Teng Bosqichdagi Raqib)</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                Siz bilan bir xil <strong>{student.stage.toUpperCase()}</strong> bosqichida o&apos;qiyotgan talabalar orasidan random raqib topiladi. Kim birinchi bo&apos;lib to&apos;g&apos;ri javobni bossa, o&apos;sha ballni oladi!
              </p>
            </div>
            <button
              type="button"
              onClick={() => startBattle('pvp')}
              className="duo-btn duo-btn-coral w-full py-3.5 text-sm"
            >
              <Play className="w-4 h-4" />
              <span>PvP Jangni Boshlash (30 savol)</span>
            </button>
          </div>

          <div className="aurora-card p-6 sm:p-8 flex flex-col justify-between space-y-5 border-2 border-[#3ee6c4]/40 hover:border-[#3ee6c4] transition-all">
            <div className="space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black">2. With AI (AI Gladiator Bilan)</h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                <strong>{student.stage.toUpperCase()}</strong> bosqichi bo&apos;yicha CMDbek AI Gladiatoriga qarshi 30 ta tezkor savol-javob bellashuvi. 15 soniya ichida AI dan tezroq to&apos;g&apos;ri javob bering!
              </p>
            </div>
            <button
              type="button"
              onClick={() => startBattle('ai')}
              className="duo-btn duo-btn-mint w-full py-3.5 text-sm"
            >
              <Play className="w-4 h-4" />
              <span>With AI Jangni Boshlash (30 savol)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (battleFinished && battleSummary) {
    return (
      <div className="aurora-card p-8 max-w-xl mx-auto text-center space-y-6">
        <div className="text-5xl">{battleSummary.won ? '🏆' : '⚔️'}</div>
        <h2 className="text-2xl font-black">
          {battleSummary.won ? "G'ALABA! Siz Ligada Yutdingiz!" : "MAG'LUBIYAT! Keyingi safar omad!"}
        </h2>
        <div className="flex items-center justify-center gap-8 py-4">
          <div className="flex flex-col items-center gap-2">
            <AvatarWithFrame student={student} size={68} isCurrentUser={true} />
            <span className="text-xs font-bold">{student.name}</span>
            <span className="text-2xl font-black font-mono text-[#3ee6c4]">{myScore} ball</span>
          </div>
          <span className="text-xl font-black opacity-50">VS</span>
          {opponent && (
            <div className="flex flex-col items-center gap-2">
              <AvatarWithFrame student={opponent} size={68} />
              <span className="text-xs font-bold">{opponent.name}</span>
              <span className="text-2xl font-black font-mono text-[#ff6b86]">{oppScore} ball</span>
            </div>
          )}
        </div>

        <div
          className={`p-4 rounded-2xl border font-mono text-sm font-black ${
            battleSummary.won
              ? 'bg-[#3ee6c4]/15 border-[#3ee6c4]/40 text-[#3ee6c4]'
              : 'bg-[#ff6b86]/15 border-[#ff6b86]/40 text-[#ff6b86]'
          }`}
        >
          {battleSummary.won
            ? 'Mukofot: +30 XP va +2 🪙 Coin hisobingizga qoʻshildi!'
            : 'Jarima: -30 XP va -2 🪙 Coin hisobingizdan ayrildi!'}
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setBattleMode('select')}
            className="duo-btn duo-btn-surface px-5 py-3 text-xs"
          >
            Liga Menyusiga Qaytish
          </button>
          <button
            type="button"
            onClick={() => startBattle(battleMode)}
            className="duo-btn duo-btn-coral px-5 py-3 text-xs"
          >
            Qayta Jang Qilish
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      {/* Top Scoreboard Bar */}
      <div className="aurora-card p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AvatarWithFrame student={student} size={48} isCurrentUser={true} />
          <div>
            <div className="text-xs font-bold">{student.name} (Siz)</div>
            <div className="text-lg font-black font-mono text-[#3ee6c4]">{myScore} / 30</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[11px] font-mono uppercase opacity-75">
            Savol {currentIndex + 1} / 30
          </span>
          <div
            className={`mt-1 px-4 py-1.5 rounded-2xl font-mono text-base font-black flex items-center gap-1.5 ${
              timeLeft <= 5
                ? 'bg-[#ef4444]/20 text-[#ef4444] animate-pulse'
                : 'bg-[#ffd23f]/20 text-[#ffd23f]'
            }`}
          >
            <Timer className="w-4 h-4" />
            <span>{timeLeft}s</span>
          </div>
        </div>

        {opponent && (
          <div className="flex items-center gap-3 text-right">
            <div>
              <div className="text-xs font-bold">{opponent.name}</div>
              <div className="text-lg font-black font-mono text-[#ff6b86]">{oppScore} / 30</div>
            </div>
            <AvatarWithFrame student={opponent} size={48} />
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="duo-progress-track">
        <div
          className="duo-progress-fill"
          style={{ width: `${Math.round(((currentIndex + 1) / 30) * 100)}%` }}
        />
      </div>

      {/* Question Card */}
      {currentQ && (
        <div className="aurora-card p-6 space-y-5">
          <div className="flex items-center justify-between text-xs opacity-75 font-mono">
            <span>BOSQICH: {student.stage.toUpperCase()}</span>
            <span>1 TO&apos;G&apos;RI JAVOB = +1 BALL</span>
          </div>

          <h3 className="text-base sm:text-lg font-black leading-snug">{currentQ.question}</h3>

          {currentQ.codeSnippet && (
            <pre className="p-3.5 rounded-2xl bg-[#0a0912] border border-white/10 text-xs font-mono text-[#3ee6c4] overflow-x-auto">
              {currentQ.codeSnippet}
            </pre>
          )}

          <div className="grid grid-cols-1 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswerIndex;
              let btnStyle = 'bg-white/5 border-white/15 hover:border-[#3ee6c4]';
              if (roundLocked) {
                if (isCorrect) {
                  btnStyle = 'bg-[#22c55e]/20 border-[#22c55e] text-[#4ade80]';
                } else if (isSelected) {
                  btnStyle = 'bg-[#ef4444]/20 border-[#ef4444] text-[#f87171]';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={roundLocked}
                  onClick={() => handleSelectAnswer(idx)}
                  className={`p-4 rounded-2xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span>
                    <strong className="font-mono mr-2">{String.fromCharCode(65 + idx)}.</strong>
                    {opt}
                  </span>
                  {roundLocked && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0" />}
                  {roundLocked && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-[#ef4444] shrink-0" />}
                </button>
              );
            })}
          </div>

          {roundStatus && (
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm font-black text-center">
              {roundStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
