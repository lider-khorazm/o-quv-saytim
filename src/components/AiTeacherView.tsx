import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Sparkles,
  Send,
  Users,
  Award,
  Search,
  MessageSquare,
  FileCode,
  RefreshCw,
  Palette,
  BarChart3,
  Coins,
  Zap,
  Bot,
  Bell,
  UserX,
  Mail,
  Edit3,
  Check,
  X,
  CheckCircle2,
  ShieldCheck,
  Play
} from 'lucide-react';
import { Student, Teacher, CourseStage, TeacherNotification, TestSubmissionResult } from '../types';
import { askAiTeacher } from '../services/groqService';
import {
  createTest,
  sendGroupMessage,
  updateTeacherGroupName
} from '../services/storage';
import { useBackground } from '../context/BackgroundContext';
import { AuroraMascot } from './AuroraMascot';

interface AiTeacherViewProps {
  teacher?: Teacher | null;
  students: Student[];
  notifications?: TeacherNotification[];
  testSubmissions?: TestSubmissionResult[];
  onOpenCreateTestModal?: (student: Student, stage: CourseStage) => void;
  onOpenMessageModal?: (student: Student) => void;
  onOpenExpelModal?: (student: Student) => void;
  onMarkNotificationRead?: (id: string) => void;
  onOpenGroupChat?: (teacherId: string) => void;
  onOpenGroqConfig?: () => void;
  onRefreshData?: () => void;
}

export const AiTeacherView: React.FC<AiTeacherViewProps> = ({
  teacher,
  students,
  notifications = [],
  testSubmissions = [],
  onOpenCreateTestModal,
  onOpenMessageModal,
  onOpenExpelModal,
  onMarkNotificationRead,
  onOpenGroupChat,
  onRefreshData,
}) => {
  const { setIsBackgroundModalOpen } = useBackground();

  // Filter students belonging to this teacher (or all if no specific teacher is selected)
  const myStudents = teacher
    ? students.filter((s) => s.teacherId === teacher.id)
    : students;

  const [selectedStudentId, setSelectedStudentId] = useState<string>(myStudents[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'monitoring' | 'ai_deputy' | 'analytics' | 'chat'>('monitoring');
  const [searchQuery, setSearchQuery] = useState('');

  // Teacher AI Deputy (Ustoz band bo'lganda AI yordamchi rejimi)
  const deputyStorageKey = `devmaster_teacher_ai_deputy_${teacher?.id || 'default'}`;
  const [aiDeputyEnabled, setAiDeputyEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(deputyStorageKey);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [deputyStatusMsg, setDeputyStatusMsg] = useState<string | null>(null);
  const [deputyBusy, setDeputyBusy] = useState(false);

  // Group name edit state
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState(
    teacher?.groupName || (teacher ? `${teacher.name} Guruhi` : 'Frontend Guruhi')
  );

  useEffect(() => {
    setGroupNameInput(teacher?.groupName || (teacher ? `${teacher.name} Guruhi` : 'Frontend Guruhi'));
  }, [teacher?.id, teacher?.groupName]);

  const toggleAiDeputy = () => {
    const next = !aiDeputyEnabled;
    setAiDeputyEnabled(next);
    try {
      localStorage.setItem(deputyStorageKey, JSON.stringify(next));
    } catch {
      // ignore
    }
    setDeputyStatusMsg(
      next
        ? "🤖 Ustozning AI O'rinbosar Yordamchisi yoqildi! Ustoz band bo'lganda AI guruhda o'quvchilarga javob beradi va testlar bilan yordamlashadi."
        : "⏸️ AI O'rinbosar Yordamchisi vaqtincha o'chirildi."
    );
    setTimeout(() => setDeputyStatusMsg(null), 4000);
  };

  // AI Chat with Ustoz AI Yordamchisi
  const teacherFullName = teacher ? `${teacher.name} ${teacher.surname}` : 'Ustoz Temur';
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string; time: string }[]>([
    {
      role: 'assistant',
      text: `Assalomu alaykum, ${teacherFullName}! Men sizning shaxsiy AI Yordamchingizman (Ustoz AI O'rinbosari). Siz ishlaringiz bilan band bo'lib saytga kira olmagan paytingizda guruhdagi o'quvchilaringizga darslarni tushuntiraman, savollariga javob beraman va bosqich testlarini yaratib beraman!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredStudents = myStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedStudent = myStudents.find((s) => s.id === selectedStudentId) || myStudents[0];

  const avgProgress =
    myStudents.length > 0
      ? Math.round(
          myStudents.reduce(
            (sum, s) => sum + Math.min(100, Math.round(((s.completedLessons?.length || 0) / 15) * 100)),
            0
          ) / myStudents.length
        )
      : 0;

  const handleSaveGroupName = () => {
    if (!teacher || !groupNameInput.trim()) return;
    updateTeacherGroupName(teacher.id, groupNameInput.trim());
    setIsEditingGroupName(false);
    if (onRefreshData) onRefreshData();
  };

  // AI Deputy Action 1: Send AI Daily Lesson & Advice to Group Chat
  const handleSendAiDailyAdviceToGroup = async () => {
    const targetTeacherId = teacher?.id || 't-1';
    setDeputyBusy(true);
    try {
      const res = await askAiTeacher({
        action: 'chat',
        studentName: 'Guruh talabalari',
        studentStage: 'html',
        userPrompt:
          "Guruhdagi o'quvchilarga bugungi HTML, CSS va JavaScript darslarini o'zlashtirish uchun qisqa, ruhlantiruvchi 3 bandlik amaliy vazifa va maslahat yozib ber.",
      });

      sendGroupMessage({
        teacherId: targetTeacherId,
        senderId: targetTeacherId,
        senderName: `🤖 Ustoz AI (${teacher?.name || 'Ustoz'} yordamchisi)`,
        senderRole: 'teacher',
        avatar: teacher?.avatar || '🤖',
        text: `📢 [USTOZNING AI YORDAMCHISI XABARI]\nUstoz hozir ish bilan band bo'lgani sababli sizlarga kunlik vazifa va maslahatni yuboryapman:\n\n${res.text}`,
      });

      if (onRefreshData) onRefreshData();
      setDeputyStatusMsg("✅ Guruh chatiga Ustoz AI Yordamchisi nomidan kunlik vazifa va maslahat yuborildi!");
      setTimeout(() => setDeputyStatusMsg(null), 4000);
    } finally {
      setDeputyBusy(false);
    }
  };

  // AI Deputy Action 2: Auto-create Stage Test IDs for students in the group
  const handleAiAutoCreateTestsForGroup = () => {
    if (myStudents.length === 0) {
      setDeputyStatusMsg("⚠️ Hozircha guruhingizda o'quvchilar yo'q.");
      setTimeout(() => setDeputyStatusMsg(null), 3500);
      return;
    }

    const targetTeacherId = teacher?.id || 't-1';
    let createdCount = 0;

    myStudents.forEach((st) => {
      const stageKey: CourseStage =
        st.stage === 'css' ? 'css' : st.stage === 'javascript' || st.stage === 'graduated' ? 'javascript' : 'html';
      createTest({
        teacherId: targetTeacherId,
        studentId: st.id,
        studentName: `${st.name} ${st.surname}`,
        stage: stageKey,
        questionCount: 8,
      });
      createdCount++;
    });

    if (onRefreshData) onRefreshData();
    setDeputyStatusMsg(
      `✅ ${createdCount} nafar o'quvchiga Ustoz AI Yordamchisi tomonidan yangi Test ID yaratildi va guruh chatiga yuborildi!`
    );
    setTimeout(() => setDeputyStatusMsg(null), 4500);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { role: 'user', text: userText, time }]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await askAiTeacher({
        action: 'chat',
        studentName: selectedStudent ? `${selectedStudent.name} ${selectedStudent.surname}` : 'Barcha talabalar',
        studentStage: selectedStudent ? selectedStudent.stage : 'fullstack',
        userPrompt: userText,
        chatHistory: messages,
      });

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: res.text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "Tarmoq xatosi. Iltimos qaytadan urinib ko'ring.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const mySubmissions = testSubmissions.filter((sub) =>
    myStudents.some((st) => st.id === sub.studentId)
  );

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="aurora-card p-6 sm:p-8 relative overflow-hidden border-[#3ee6c4]/30">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#3ee6c4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#ff6b86]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#3ee6c4] to-[#b6f03c] p-0.5 shadow-xl">
                <div className="w-full h-full rounded-[22px] bg-[#141225] flex items-center justify-center text-[#3ee6c4]">
                  <GraduationCap className="w-10 h-10" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#3ee6c4] rounded-full border-2 border-[#141225] flex items-center justify-center text-xs text-[#08241d] font-black">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {teacher ? `Ustoz ${teacher.name} ${teacher.surname}` : 'Ustoz Kabineti & AI Yordamchi'}
                </h1>
                <span className="aurora-badge bg-[#3ee6c4]/15 text-[#3ee6c4] border border-[#3ee6c4]/30">
                  <Bot className="w-3.5 h-3.5" />
                  {aiDeputyEnabled ? "AI O'rinbosar: Yoqilgan (24/7)" : "AI O'rinbosar: O'chiq"}
                </span>
              </div>

              {/* Group Name Editor */}
              {teacher && (
                <div className="flex items-center gap-2 mt-1.5">
                  {isEditingGroupName ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={groupNameInput}
                        onChange={(e) => setGroupNameInput(e.target.value)}
                        className="aurora-input py-1 px-2.5 text-xs w-48"
                        autoFocus
                      />
                      <button onClick={handleSaveGroupName} className="duo-btn duo-btn-mint p-1.5 text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setIsEditingGroupName(false)}
                        className="duo-btn duo-btn-surface p-1.5 text-xs"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-[#ffd23f] font-extrabold">
                      <span>Guruh: {teacher.groupName || `${teacher.name} Guruhi`}</span>
                      <button
                        onClick={() => setIsEditingGroupName(true)}
                        className="p-1 opacity-75 hover:opacity-100"
                        title="Guruh nomini o'zgartirish"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs sm:text-sm opacity-75 mt-1 max-w-2xl leading-relaxed">
                Ustoz ishlari bilan band bo'lib kira olmagan vaqtda <strong>Ustozning AI Yordamchisi</strong> guruh chatida o'quvchilarga javob beradi, mavzularni tushuntiradi va Test ID yaratib beradi.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={toggleAiDeputy}
              className={`duo-btn px-4 py-2.5 text-xs ${
                aiDeputyEnabled ? 'duo-btn-gold' : 'duo-btn-surface'
              }`}
              title="Ustoz kirmagan paytda AI yordam berishi"
            >
              <Bot className="w-4 h-4" />
              <span>{aiDeputyEnabled ? "AI Yordamchi: FAOL" : "AI Yordamchini Yoqish"}</span>
            </button>
            <button
              onClick={() => setIsBackgroundModalOpen(true)}
              className="duo-btn duo-btn-surface px-4 py-2.5 text-xs"
              title="Orqa fonni sozlash"
            >
              <Palette className="w-4 h-4 text-[#ff6b86]" />
              <span>Orqa Fon</span>
            </button>
            {onOpenGroupChat && (
              <button
                onClick={() => onOpenGroupChat(teacher?.id || 't-1')}
                className="duo-btn duo-btn-mint px-4 py-2.5 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Guruh Chatiga Kirish</span>
              </button>
            )}
          </div>
        </div>

        {deputyStatusMsg && (
          <div className="mt-4 p-3.5 rounded-2xl bg-[#3ee6c4]/15 border border-[#3ee6c4]/40 text-xs font-extrabold text-[#3ee6c4] flex items-center justify-between gap-2">
            <span>{deputyStatusMsg}</span>
            <button onClick={() => setDeputyStatusMsg(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">Guruhdagi Talabalar</span>
            <span className="text-xl font-black font-mono text-[#ff6b86]">{myStudents.length} / 15 nafar</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">O'rtacha O'zlashtirish</span>
            <span className="text-xl font-black font-mono text-[#3ee6c4]">{avgProgress}%</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">Yechilgan Imtihonlar</span>
            <span className="text-xl font-black font-mono text-[#ffd23f]">{mySubmissions.length} ta</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">Ustoz AI Yordamchisi</span>
            <span className="text-xl font-black font-mono text-[#b6f03c]">
              {aiDeputyEnabled ? '24/7 Tayyor' : "O'chiq"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Layout with Sidebar Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="aurora-card p-4 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider opacity-50 px-2 pb-1">
              Ustoz & AI Menyusi
            </p>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'monitoring'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Guruh Talabalari</span>
              <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full bg-black/20">
                {myStudents.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('ai_deputy')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'ai_deputy'
                  ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff8a3d] text-[#2b1d00] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>AI O'rinbosar (Avto-Yordam)</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-[#3ee6c4] to-[#17b897] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>O'zlashtirish & Natijalar</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-gradient-to-r from-[#b6f03c] to-[#3ee6c4] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Ustoz AI Maslahatchisi</span>
            </button>
          </div>

          {/* Notifications Card */}
          {notifications.length > 0 && (
            <div className="aurora-card p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#ffd23f] flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5" /> Bildirishnomalar
                </span>
                <span className="text-[10px] font-mono opacity-60">
                  {notifications.filter((n) => !n.read).length} yangi
                </span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onMarkNotificationRead && onMarkNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border text-[11px] cursor-pointer transition-all ${
                      n.read
                        ? 'bg-white/5 border-white/5 opacity-60'
                        : 'bg-[#ffd23f]/10 border-[#ffd23f]/30 font-bold'
                    }`}
                  >
                    <p>{n.message}</p>
                    <span className="text-[9px] opacity-50 font-mono block mt-1">{n.createdAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mascot helper card */}
          <div className="aurora-card p-5 text-center space-y-2 border-[#3ee6c4]/30">
            <AuroraMascot mood="happy" size={76} className="mx-auto" />
            <h4 className="text-sm font-extrabold">Ustozning AI Yordamchisi</h4>
            <p className="text-xs opacity-70 leading-relaxed">
              Ustoz ish bilan band bo'lib kira olmagan kunlari AI Yordamchi o'quvchilarni yolg'iz qoldirmaydi!
            </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: MONITORING */}
          {activeTab === 'monitoring' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Student Directory */}
              <div className="md:col-span-5 aurora-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider opacity-70">
                    Talabalar Ro'yxati
                  </h3>
                  <span className="aurora-badge bg-[#3ee6c4]/15 text-[#3ee6c4]">
                    {filteredStudents.length} ta
                  </span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold opacity-75 mb-1 flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded bg-[#3ee6c4]/15 text-[#3ee6c4]">
                      <Search className="w-3 h-3" />
                    </span>
                    <span>Talabani qidirish (ism yoki login)</span>
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ism yoki login yozing..."
                    className="aurora-input py-2 text-xs"
                  />
                </div>

                <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                  {filteredStudents.length === 0 ? (
                    <div className="text-center py-8 space-y-2">
                      <AuroraMascot mood="thinking" size={64} className="mx-auto" />
                      <p className="text-xs opacity-60 font-bold">
                        Hozircha guruhda o'quvchilar yo'q.
                      </p>
                    </div>
                  ) : (
                    filteredStudents.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStudentId(st.id)}
                        className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                          selectedStudent?.id === st.id
                            ? 'bg-[#ff6b86]/15 border-[#ff6b86] shadow-md'
                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <img
                          src={st.avatar || 'https://images.unsplash.com/photo-1535713875002?w=100'}
                          alt={st.name}
                          className="w-10 h-10 rounded-2xl object-cover border border-white/20 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-extrabold text-xs truncate">
                            {st.name} {st.surname}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] opacity-75 mt-0.5 font-mono">
                            <span className="uppercase text-[#3ee6c4] font-bold">{st.stage}</span>
                            <span>•</span>
                            <span className="text-[#ffd23f]">{st.xp} XP</span>
                            <span>•</span>
                            <span>{st.completedLessons.length} dars</span>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Selected Student Details */}
              <div className="md:col-span-7">
                {selectedStudent ? (
                  <div className="aurora-card p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedStudent.avatar}
                          alt={selectedStudent.name}
                          className="w-16 h-16 rounded-3xl object-cover border-2 border-[#ff6b86]"
                        />
                        <div>
                          <h2 className="text-lg font-black">
                            {selectedStudent.name} {selectedStudent.surname}
                          </h2>
                          <p className="text-xs opacity-70 font-mono">
                            @{selectedStudent.username} • Yoshi: {selectedStudent.age || 16}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {onOpenCreateTestModal && (
                          <button
                            onClick={() => onOpenCreateTestModal(selectedStudent, selectedStudent.stage)}
                            className="duo-btn duo-btn-coral px-3.5 py-2 text-xs"
                          >
                            <FileCode className="w-4 h-4" />
                            <span>Test ID Yaratish</span>
                          </button>
                        )}
                        {onOpenMessageModal && (
                          <button
                            onClick={() => onOpenMessageModal(selectedStudent)}
                            className="duo-btn duo-btn-mint px-3 py-2 text-xs"
                            title="Shaxsiy xabar yuborish"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Xabar</span>
                          </button>
                        )}
                        {onOpenExpelModal && (
                          <button
                            onClick={() => onOpenExpelModal(selectedStudent)}
                            className="duo-btn duo-btn-surface px-3 py-2 text-xs text-[#ff5263]"
                            title="Guruhdan chetlatish so'rovi"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="text-[11px] opacity-60 block mb-1">To'plangan XP</span>
                        <span className="text-base font-black font-mono text-[#ffd23f] flex items-center justify-center gap-1">
                          <Zap className="w-4 h-4" /> {selectedStudent.xp}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="text-[11px] opacity-60 block mb-1">Darslar</span>
                        <span className="text-base font-black font-mono text-[#3ee6c4]">
                          {selectedStudent.completedLessons.length} / 15
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="text-[11px] opacity-60 block mb-1">Tangalar</span>
                        <span className="text-base font-black font-mono text-[#ff8a3d] flex items-center justify-center gap-1">
                          <Coins className="w-4 h-4" /> {selectedStudent.coins ?? 20}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                        <span className="text-[11px] opacity-60 block mb-1">Sertifikatlar</span>
                        <span className="text-base font-black font-mono text-[#b6f03c] flex items-center justify-center gap-1">
                          <Award className="w-4 h-4" /> {selectedStudent.certificates?.length || 0} ta
                        </span>
                      </div>
                    </div>

                    {/* AI Pedagogical Assessment */}
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-[#3ee6c4]/15 via-transparent to-[#ff6b86]/15 border border-[#3ee6c4]/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-black text-[#3ee6c4]">
                        <Bot className="w-4 h-4" />
                        <span>Ustoz AI Yordamchisining Tahlili:</span>
                      </div>
                      <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                        {selectedStudent.completedLessons.length >= 10
                          ? `Talaba ${selectedStudent.name} juda faol va ${selectedStudent.completedLessons.length} ta mavzuni muvaffaqiyatli tugatgan. Ustoz kirmagan paytda ham AI Yordamchi unga bosqich imtihonini topshirishda ko'maklashishga tayyor!`
                          : `Talaba ${selectedStudent.name} hozirda ${selectedStudent.stage.toUpperCase()} bosqichida (${selectedStudent.completedLessons.length}/15 dars). Guruh chatida savol bersa, Ustozning AI Yordamchisi darhol misollar bilan tushuntirib beradi.`}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aurora-card p-12 text-center space-y-3">
                    <AuroraMascot mood="waving" size={90} className="mx-auto" />
                    <p className="text-sm font-bold opacity-75">
                      Hozircha o'quvchi tanlanmagan yoki guruh bo'sh.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: USTOZNING AI O'RINBOSAR YORDAMCHISI (When Teacher is busy/offline) */}
          {activeTab === 'ai_deputy' && (
            <div className="aurora-card p-6 sm:p-8 space-y-6 border-[#ffd23f]/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ffd23f] to-[#ff8a3d] text-[#2b1d00] flex items-center justify-center shadow-lg">
                    <Bot className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black">
                      🤖 Ustozning AI O'rinbosar Yordamchisi
                    </h3>
                    <p className="text-xs opacity-75 mt-0.5">
                      Ustoz o'z ishlari bilan band bo'lib saytga kira olmagan kunlari o'quvchilarga avtomatik yordam berish tizimi
                    </p>
                  </div>
                </div>

                <button
                  onClick={toggleAiDeputy}
                  className={`duo-btn px-5 py-3 text-xs ${
                    aiDeputyEnabled ? 'duo-btn-mint' : 'duo-btn-coral'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{aiDeputyEnabled ? 'Avto-Yordamchi: YOQILGAN' : 'Avto-Yordamchini YOQISH'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="aurora-badge bg-[#3ee6c4]/15 text-[#3ee6c4]">
                      1-Vazifa • Guruh Chati Yordami
                    </span>
                    <h4 className="text-base font-black">
                      Guruhga Kunlik Dars Vazifasi va Maslahat Yuborish
                    </h4>
                    <p className="text-xs opacity-75 leading-relaxed">
                      Ustoz band bo'lganda AI Yordamchi guruh chatiga kirib barcha o'quvchilarga bugungi HTML/CSS/JS mashqlarini va kod maslahatlarini yozib qoldiradi.
                    </p>
                  </div>
                  <button
                    onClick={handleSendAiDailyAdviceToGroup}
                    disabled={deputyBusy}
                    className="duo-btn duo-btn-mint w-full py-3 text-xs justify-center"
                  >
                    <Send className="w-4 h-4" />
                    <span>{deputyBusy ? 'AI Yozmoqda...' : 'Guruh Chatiga AI Vazifa Yuborish'}</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="aurora-badge bg-[#ffd23f]/15 text-[#ffd23f]">
                      2-Vazifa • Avto-Imtihon (Test ID)
                    </span>
                    <h4 className="text-base font-black">
                      Barcha Talabalarga Avto-Test ID Yaratib Yuborish
                    </h4>
                    <p className="text-xs opacity-75 leading-relaxed">
                      O'quvchilar keyingi bosqichga o'tish uchun ustozni kutib qolmasligi uchun AI Yordamchi har bir talabaning bosqichiga mos Test ID yaratib, guruh chatiga joylaydi.
                    </p>
                  </div>
                  <button
                    onClick={handleAiAutoCreateTestsForGroup}
                    className="duo-btn duo-btn-gold w-full py-3 text-xs justify-center"
                  >
                    <Play className="w-4 h-4" />
                    <span>Guruh Talabalariga Avto-Test Yuborish ({myStudents.length} ta)</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#3ee6c4]/10 border border-[#3ee6c4]/30 flex items-center gap-3 text-xs">
                <CheckCircle2 className="w-5 h-5 text-[#3ee6c4] shrink-0" />
                <p className="leading-relaxed">
                  <strong>Eslatma:</strong> O'quvchilar <strong>Guruh Chati</strong>ga kirganda ham tepada <em>"🤖 Ustoz AI Yordamchisidan so'rash"</em> tugmasi chiqib turadi. Ustoz tarmoqda bo'lmasa, o'quvchi shu tugmani bosib savoliga darhol javob oladi!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: O'rtacha Foiz Diagrammasi & Yechilgan Testlar */}
          {activeTab === 'analytics' && (
            <div className="aurora-card p-6 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#3ee6c4]" />
                    <span>O'quvchilarning O'rtacha O'zlashtirish Foizi Diagrammasi</span>
                  </h3>
                  <p className="text-xs opacity-70">
                    Har bir talabaning tugatgan darslari va to'plagan XP ko'rsatkichi asosida jonli diagramma
                  </p>
                </div>
                <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] font-mono">
                  O'rtacha: {avgProgress}%
                </span>
              </div>

              {myStudents.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <AuroraMascot mood="thinking" size={90} className="mx-auto" />
                  <p className="text-sm font-bold opacity-70">Hozircha diagramma uchun talabalar yo'q</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myStudents.map((st) => {
                    const pct =
                      st.stage === 'graduated'
                        ? 100
                        : Math.min(100, Math.round(((st.completedLessons?.length || 0) / 15) * 100));
                    return (
                      <div key={st.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <div className="flex items-center gap-2.5">
                            <img src={st.avatar} alt={st.name} className="w-7 h-7 rounded-xl object-cover" />
                            <span>
                              {st.name} {st.surname}
                            </span>
                            <span className="uppercase text-[10px] px-2 py-0.5 rounded-full bg-[#ff6b86]/15 text-[#ff6b86] font-mono">
                              {st.stage}
                            </span>
                          </div>
                          <span className="font-mono text-[#3ee6c4] font-black">{pct}%</span>
                        </div>
                        <div className="aurora-progress-track h-3">
                          <div
                            className="aurora-progress-fill"
                            style={{ width: `${Math.max(4, pct)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: AI Teacher Chat */}
          {activeTab === 'chat' && (
            <div className="aurora-card overflow-hidden">
              <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AuroraMascot mood="happy" size={44} />
                  <div>
                    <h4 className="text-sm font-black">Ustoz AI Yordamchisi bilan Muloqot</h4>
                    <p className="text-xs opacity-70">
                      Dars rejasi, talaba xatolari yoki pedagogik maslahatlar haqida so'rang
                    </p>
                  </div>
                </div>
                <span className="aurora-badge bg-[#3ee6c4]/15 text-[#3ee6c4] font-mono">
                  Llama 3.3 70B
                </span>
              </div>

              <div className="p-5 space-y-4 max-h-[450px] overflow-y-auto">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white rounded-br-none shadow-lg'
                          : 'bg-white/8 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{m.text}</div>
                    </div>
                    <span className="text-[10px] opacity-50 mt-1 px-1 font-mono">{m.time}</span>
                  </div>
                ))}

                {loading && (
                  <div className="flex items-center gap-2 text-xs text-[#3ee6c4] bg-[#3ee6c4]/10 border border-[#3ee6c4]/30 p-3 rounded-2xl w-fit">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span className="font-bold">Ustoz AI yozayapti…</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5 flex items-center gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ustoz AI yordamchisiga savol yoki buyruq yozing..."
                  className="aurora-input flex-1 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || loading}
                  className="duo-btn duo-btn-mint px-5 py-3 text-xs sm:text-sm disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                  <span>Yuborish</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
