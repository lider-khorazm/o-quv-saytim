import React, { useState } from 'react';
import {
  KeyRound,
  Sparkles,
  CheckCircle2,
  Copy,
  MessageSquare,
  Bot
} from 'lucide-react';
import { Student, Teacher, CourseStage, GeneratedTest } from '../types';
import { createTest } from '../services/storage';

interface CreateTestModalProps {
  teacher: Teacher;
  student: Student;
  initialStage: CourseStage;
  studentsList: Student[];
  onClose: () => void;
  onTestCreated: (test: GeneratedTest) => void;
}

export const CreateTestModal: React.FC<CreateTestModalProps> = ({
  teacher,
  student,
  initialStage,
  studentsList,
  onClose,
  onTestCreated,
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState(student.id);
  const [stage, setStage] = useState<CourseStage>(initialStage);
  const [questionCount, setQuestionCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<GeneratedTest | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedStudent =
    studentsList.find((s) => s.id === selectedStudentId) || student;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const newTest = createTest({
        studentId: selectedStudent.id,
        studentName: `${selectedStudent.name} ${selectedStudent.surname}`,
        stage: stage,
        teacherId: teacher.id,
        questionCount: questionCount,
      });

      setIsGenerating(false);
      setGeneratedTest(newTest);
      onTestCreated(newTest);
    }, 900);
  };

  const handleCopyId = () => {
    if (generatedTest) {
      navigator.clipboard.writeText(generatedTest.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="aurora-card max-w-lg w-full p-6 relative overflow-hidden">
        <button
          onClick={onClose}
          className="duo-btn duo-btn-surface absolute top-4 right-4 w-8 h-8"
        >
          ✕
        </button>

        {!generatedTest ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff6b86] to-[#ff8a3d] text-white flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span>AI Test Generatori</span>
                  <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] uppercase">
                    Ustoz Paneli
                  </span>
                </h3>
                <p className="text-xs opacity-70">
                  O'quvchiga individual Test ID yaratish va guruh chatiga yuborish
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1.5">1. O'quvchi (Ism-Familiyasi) *</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="aurora-input text-xs font-bold"
                >
                  {studentsList.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} {st.surname} (Bosqich: {st.stage.toUpperCase()} | {st.xp} XP)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold block mb-1.5">2. Kelgan Bosqichi *</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['html', 'css', 'javascript'] as CourseStage[]).map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => setStage(stg)}
                      className={`duo-btn py-2.5 px-3 text-xs uppercase ${
                        stage === stg ? 'duo-btn-coral' : 'duo-btn-surface'
                      }`}
                    >
                      {stg}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1.5">
                  3. Savollar Soni: <span className="text-[#3ee6c4] font-mono text-sm">{questionCount} ta savol</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 8, 10, 15].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setQuestionCount(count)}
                      className={`duo-btn py-2 text-xs ${
                        questionCount === count ? 'duo-btn-mint' : 'duo-btn-surface'
                      }`}
                    >
                      {count} ta
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] space-y-1">
                <p className="font-black text-[#3ee6c4] flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Avtomatik Guruh E'loni:
                </p>
                <p className="opacity-80">
                  Test yaratilgach, guruh chatida avtomatik:
                  <em className="text-[#ffd23f] block mt-0.5 font-mono">
                    "Hurmatli {selectedStudent.name}, test ID bilan testga kiring: ID: [TEST-ID]"
                  </em>
                  deb e'lon qilinadi.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="duo-btn duo-btn-surface px-4 py-2.5 text-xs"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="duo-btn duo-btn-coral px-5 py-2.5 text-xs"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Generatsiya qilinmoqda...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>Testni Yaratish va ID Berish</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center mx-auto border border-[#3ee6c4]/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black">Test ID Muvaffaqiyatli Yaratildi!</h3>
              <p className="text-xs opacity-70 mt-1">
                Guruh chatiga xabar yuborildi va talabaga ID taqdim etildi.
              </p>
            </div>

            <div className="p-4 bg-black/30 border-2 border-[#ffd23f] rounded-2xl flex items-center justify-between gap-3">
              <div className="text-left">
                <span className="text-[10px] opacity-60 uppercase font-bold block">
                  Bir martalik Test ID
                </span>
                <span className="text-xl font-black font-mono text-[#ffd23f] tracking-wider">
                  {generatedTest.id}
                </span>
              </div>
              <button onClick={handleCopyId} className="duo-btn duo-btn-gold px-4 py-2 text-xs">
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Nusxalandi!' : 'Nusxalash'}</span>
              </button>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="opacity-60">Talaba:</span>
                <span className="font-black">{generatedTest.studentName}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Bosqich:</span>
                <span className="font-black text-[#3ee6c4] uppercase">{generatedTest.stage}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-60">Savollar soni:</span>
                <span className="font-black text-[#ffd23f]">{generatedTest.questionCount} ta savol</span>
              </div>
            </div>

            <button onClick={onClose} className="duo-btn duo-btn-surface w-full py-2.5 text-xs">
              Yopish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
