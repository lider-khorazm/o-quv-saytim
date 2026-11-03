import React, { useState } from 'react';
import {
  Crown,
  Users,
  Award,
  CheckCircle2,
  Shield,
  MessageSquare,
  BarChart3,
  Mail,
  Palette,
  Youtube,
  Play,
  ExternalLink,
  Film,
  Maximize2,
  Database,
  Trash2,
  Edit3,
  Plus,
  Download,
  Code,
  Settings,
  Check,
  Copy,
  UserPlus,
  AlertTriangle,
  Sliders,
  FileCheck,
  Search
} from 'lucide-react';
import { Student, Teacher, TestSubmissionResult, ExpelRequest, CourseStage, GeneratedTest } from '../types';
import { OWNER_PROFILE } from '../data/mockData';
import {
  deleteStudent,
  deleteTeacher,
  updateStudent,
  addCustomStudent,
  addXpToStudent,
  clearAllTestSubmissions,
  getFullDatabaseDump,
  createTest,
  getGeneratedTests,
  saveGeneratedTests,
  saveTestSubmissions,
  saveStudents,
  saveTeachers,
  resetEntireCentralDatabase
} from '../services/storage';
import { getActiveBackendName } from '../services/remoteStore';
import { useBackground } from '../context/BackgroundContext';
import { AuroraMascot } from './AuroraMascot';

interface AdminViewProps {
  teachers: Teacher[];
  students: Student[];
  testSubmissions: TestSubmissionResult[];
  expelRequests: ExpelRequest[];
  onAddTeacher: (teacher: Omit<Teacher, 'id' | 'studentIds' | 'rating' | 'activeSince'>) => void;
  onDeleteTeacher: (id: string) => void;
  onApproveUpgrade: (submissionId: string) => void;
  onResolveExpel: (requestId: string, approve: boolean) => void;
  onOpenGroupChat?: (teacherId: string) => void;
  onOpenGroqConfig?: () => void;
  onRefreshData?: () => void;
}

interface CuratedVideo {
  id: string;
  title: string;
  category: string;
  channel: string;
  duration: string;
}

const CURATED_DEV_VIDEOS: CuratedVideo[] = [
  {
    id: 'jfKfPfyJRdk',
    title: 'Lofi Hip Hop Radio — Beats to Relax/Study/Code (Dasturchilar Musiqasi)',
    category: 'Lofi Chill',
    channel: 'Lofi Girl',
    duration: 'Jonli Stream',
  },
  {
    id: '4xDzrJKXOOY',
    title: 'Synthwave Chill Radio — Dasturlash va Diqqatni Jamlash Musiqasi',
    category: 'Synthwave',
    channel: 'Lofi Girl Synthwave',
    duration: 'Jonli Stream',
  },
  {
    id: '5qap5aO4i9A',
    title: "Deep Coding Beats — Dastur Yozish va O'qish Uchun Tinch Musiqa",
    category: 'Coding Beats',
    channel: 'ChilledCow / Study Hub',
    duration: '3:00:00',
  },
  {
    id: 'DWcJFNfaw9c',
    title: 'Peaceful Piano Music — Algoritmlar va Chuqur Diqqat Fon Musiqasi',
    category: 'Piano Focus',
    channel: 'Relaxing Coding Sounds',
    duration: '3:30:00',
  },
  {
    id: 'WPni755-Krg',
    title: 'Cyberpunk Night Coding Music — Tezkor Dasturlash Ritmik Fon',
    category: 'Cyberpunk',
    channel: 'Night Drive Coding',
    duration: '2:15:00',
  },
  {
    id: 'rUxyKA_-grg',
    title: 'Coffee Shop Ambience & Study Music — Qahva va Dasturlash Muhiti',
    category: 'Coffee Ambience',
    channel: 'Lord_dev Relax',
    duration: '2:45:00',
  },
];

const parseYouTubeEmbedUrl = (input: string): string => {
  if (!input) return 'https://www.youtube.com/embed/kUMe1FH4CHE';
  const trimmed = input.trim();

  if (trimmed.includes('youtube.com/embed/')) {
    return trimmed.split('&')[0];
  }

  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  const shortsMatch = trimmed.match(/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }

  if (/^[a-zA-Z0-9_-]{8,15}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}`;
  }

  return trimmed;
};

export const AdminView: React.FC<AdminViewProps> = ({
  teachers,
  students,
  testSubmissions,
  expelRequests,
  onAddTeacher,
  onDeleteTeacher,
  onApproveUpgrade,
  onResolveExpel,
  onOpenGroupChat,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<
    'control_center' | 'database_management' | 'students' | 'teachers' | 'submissions' | 'youtube'
  >('control_center');
  const { setIsBackgroundModalOpen } = useBackground();

  // YouTube player state
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('https://www.youtube.com/embed/kUMe1FH4CHE');
  const [videoInputUrl, setVideoInputUrl] = useState<string>('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>(
    "HTML & CSS To'liq Boshlang'ich Darslik — Web Dasturlash Asoslari"
  );
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  // Database & Modals States
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showRawJsonModal, setShowRawJsonModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [dbStatusAlert, setDbStatusAlert] = useState<string | null>(null);
  const [studentSearch, setStudentSearch] = useState('');

  // Direct Admin Bulk & Test Creation States
  const [bulkXpInput, setBulkXpInput] = useState<number>(100);
  const [bulkCoinsInput, setBulkCoinsInput] = useState<number>(50);
  const [testStudentId, setTestStudentId] = useState<string>(students[0]?.id || '');
  const [testStage, setTestStage] = useState<CourseStage>('html');
  const [testQuestionCount, setTestQuestionCount] = useState<number>(10);
  const [generatedTestsList, setGeneratedTestsList] = useState<GeneratedTest[]>(() => getGeneratedTests());
  const [lastCreatedTest, setLastCreatedTest] = useState<GeneratedTest | null>(null);
  const [copiedTestId, setCopiedTestId] = useState<string | null>(null);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentSurname, setNewStudentSurname] = useState('');
  const [newStudentUsername, setNewStudentUsername] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentAge, setNewStudentAge] = useState(16);
  const [newStudentStage, setNewStudentStage] = useState<CourseStage>('html');
  const [newStudentXp, setNewStudentXp] = useState(0);
  const [newStudentCoins, setNewStudentCoins] = useState(20);

  // New Teacher Form State
  const [tName, setTName] = useState('');
  const [tSurname, setTSurname] = useState('');
  const [tUsername, setTUsername] = useState('');
  const [tPassword, setTPassword] = useState('');
  const [tSpecialty, setTSpecialty] = useState('Frontend Mentor');

  // Admin Action Audit Log (Faqat Adminning o'zi bajargan amallar)
  const [auditLogs, setAuditLogs] = useState<{ id: string; action: string; time: string; admin: string }[]>([
    {
      id: 'log-1',
      action: `Yagona Markaziy Baza (${getActiveBackendName().toUpperCase()}) barcha kompyuterlar uchun ulandi`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      admin: `${OWNER_PROFILE.name} (Admin)`,
    },
  ]);

  const recordAdminAction = (actionText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      { id: `log-${Date.now()}-${Math.random()}`, action: actionText, time, admin: `${OWNER_PROFILE.name} (Admin)` },
      ...prev.slice(0, 14),
    ]);
    setDbStatusAlert(actionText);
  };

  const triggerRefresh = () => {
    setGeneratedTestsList([...getGeneratedTests()]);
    if (onRefreshData) {
      onRefreshData();
    }
  };

  // Bazadan o'quvchini to'liq o'chirish funksiyasi
  const handleRemoveStudent = (student: Student) => {
    deleteStudent(student.id);
    const remainingTests = getGeneratedTests().filter((t) => t.studentId !== student.id);
    saveGeneratedTests(remainingTests);
    const remainingSubs = testSubmissions.filter((sub) => sub.studentId !== student.id);
    saveTestSubmissions(remainingSubs);
    triggerRefresh();
    recordAdminAction(`Talaba "${student.name} ${student.surname}" (@${student.username}) yagona bazadan butunlay o'chirildi!`);
  };

  // Yagona markaziy bazadagi barcha o'quvchi va ustozlarni noldan tozalash (0 qilish)
  const handleClearAllDatabase = async () => {
    saveStudents([]);
    saveTeachers([]);
    saveGeneratedTests([]);
    saveTestSubmissions([]);
    clearAllTestSubmissions();
    await resetEntireCentralDatabase();
    triggerRefresh();
    recordAdminAction("Yagona markaziy baza barcha kompyuterlar uchun to'liq tozalandi (0 qilindi)!");
  };

  // O'quvchi bosqichini darhol o'zgartirish
  const handleChangeStudentStage = (student: Student, newStage: CourseStage) => {
    updateStudent(student.id, { stage: newStage, stageCompletedPendingTest: undefined });
    triggerRefresh();
    recordAdminAction(`${student.name} ${student.surname} bosqichi ${newStage.toUpperCase()} ga o'zgartirildi!`);
  };

  // O'quvchi ustozini darhol o'zgartirish
  const handleChangeStudentTeacher = (student: Student, newTeacherId: string) => {
    updateStudent(student.id, { teacherId: newTeacherId });
    triggerRefresh();
    const foundTeacher = teachers.find((t) => t.id === newTeacherId);
    recordAdminAction(
      `${student.name} ${student.surname} ustoz "${foundTeacher ? `${foundTeacher.name} ${foundTeacher.surname}` : newTeacherId}" guruhiga biriktirildi!`
    );
  };

  // Barcha o'quvchilarga ommaviy XP berish / ayirish
  const handleBulkAddXp = (amount: number) => {
    if (students.length === 0) return;
    students.forEach((s) => {
      addXpToStudent(s.id, amount);
    });
    triggerRefresh();
    recordAdminAction(`Barcha ${students.length} nafar talabaga ${amount >= 0 ? `+${amount}` : amount} XP qo'llandi!`);
  };

  // Barcha o'quvchilarga ommaviy Tanga berish
  const handleBulkAddCoins = (amount: number) => {
    if (students.length === 0) return;
    students.forEach((s) => {
      updateStudent(s.id, { coins: Math.max(0, Number(((s.coins ?? 20) + amount).toFixed(1))) });
    });
    triggerRefresh();
    recordAdminAction(`Barcha ${students.length} nafar talabaga +${amount} 🪙 tanga tarqatildi!`);
  };

  // Admin tomonidan Test ID yaratish
  const handleAdminCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find((s) => s.id === testStudentId) || students[0];
    if (!targetStudent) return;

    const newTest = createTest({
      studentId: targetStudent.id,
      studentName: `${targetStudent.name} ${targetStudent.surname}`,
      stage: testStage,
      teacherId: targetStudent.teacherId || teachers[0]?.id || 't-1',
      questionCount: testQuestionCount,
    });
    setLastCreatedTest(newTest);
    triggerRefresh();
    recordAdminAction(
      `${targetStudent.name} uchun ${testStage.toUpperCase()} bosqichidan yangi Test ID yaratildi: ${newTest.id}`
    );
  };

  // Faol testni o'chirish
  const handleDeleteActiveTest = (testId: string) => {
    const updated = getGeneratedTests().filter((t) => t.id !== testId);
    saveGeneratedTests(updated);
    if (lastCreatedTest?.id === testId) setLastCreatedTest(null);
    triggerRefresh();
    recordAdminAction(`Test ID [${testId}] bazadan o'chirildi.`);
  };

  // Calculated Real-Time Metrics
  const totalXp = students.reduce((acc, s) => acc + (s.xp || 0), 0);
  const totalCoins = students.reduce((acc, s) => acc + (s.coins ?? 20), 0);
  const totalTestsTaken = testSubmissions.length;
  const passedTests = testSubmissions.filter((t) => t.percentage >= 70).length;
  const passRate = totalTestsTaken > 0 ? Math.round((passedTests / totalTestsTaken) * 100) : 100;
  const avgStudentProgress =
    students.length > 0
      ? Math.round(
          students.reduce(
            (sum, s) =>
              sum +
              (s.stage === 'graduated'
                ? 100
                : Math.min(100, Math.round(((s.completedLessons?.length || 0) / 15) * 100))),
            0
          ) / students.length
        )
      : 0;

  const filteredStudents = students.filter((s) => {
    if (!studentSearch.trim()) return true;
    const q = studentSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.surname.toLowerCase().includes(q) ||
      s.username.toLowerCase().includes(q) ||
      (s.email || '').toLowerCase().includes(q) ||
      s.stage.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Super Admin Top Header */}
      <div className="aurora-card p-6 sm:p-8 relative overflow-hidden border-[#ffd23f]/40">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#ff6b86]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#ffd23f]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-tr from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] p-0.5 shadow-xl">
              <div className="w-full h-full rounded-[22px] bg-[#141225] flex items-center justify-center text-[#ffd23f]">
                <Crown className="w-10 h-10" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {OWNER_PROFILE.name} (Admin)
                </h1>
                <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] border border-[#ffd23f]/40">
                  Bosh Boshqaruvchi (Owner)
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-80 mt-1 flex items-center gap-2 flex-wrap">
                <Mail className="w-3.5 h-3.5 text-[#ff6b86]" />
                <span className="font-mono text-[#ff8a3d]">olimjonalimjonov12@gmail.com</span>
                <span>•</span>
                <span>To'g'ridan-to'g'ri Boshqaruv Markazi</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="duo-btn duo-btn-mint px-4 py-2 text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Talaba Qo'shish</span>
            </button>

            <button
              onClick={() => setShowAddTeacherModal(true)}
              className="duo-btn duo-btn-gold px-4 py-2 text-xs"
            >
              <UserPlus className="w-4 h-4" />
              <span>Ustoz Qo'shish</span>
            </button>

            <button
              onClick={handleClearAllDatabase}
              className="duo-btn duo-btn-coral px-4 py-2 text-xs"
              title="Barcha o'quvchi va ustozlarni bazadan o'chirib noldan boshlash"
            >
              <Trash2 className="w-4 h-4" />
              <span>Bazani Tozalash (0 qilish)</span>
            </button>

            <button
              onClick={() => setIsBackgroundModalOpen(true)}
              className="duo-btn duo-btn-surface px-4 py-2 text-xs"
            >
              <Palette className="w-4 h-4 text-[#ff6b86]" />
              <span>Orqa Fon</span>
            </button>

            {onOpenGroupChat && (
              <button onClick={() => onOpenGroupChat('t-1')} className="duo-btn duo-btn-surface px-4 py-2 text-xs">
                <MessageSquare className="w-4 h-4" />
                <span>Guruh Chati</span>
              </button>
            )}
          </div>
        </div>

        {/* Live System Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">Jami Talabalar</span>
            <span className="text-xl font-black font-mono text-[#ff6b86]">{students.length} nafar</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">Jamlangan Umumiy XP</span>
            <span className="text-xl font-black font-mono text-[#ffd23f]">{totalXp.toLocaleString()} XP</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">O'quvchi O'rtacha Foizi</span>
            <span className="text-xl font-black font-mono text-[#3ee6c4]">{avgStudentProgress}%</span>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs opacity-60 block mb-1">Test O'tish Ko'rsatkichi</span>
            <span className="text-xl font-black font-mono text-[#b6f03c]">{passRate}%</span>
          </div>
        </div>
      </div>

      {/* Status Alert Banner */}
      {dbStatusAlert && (
        <div className="aurora-card p-4 bg-[#3ee6c4]/15 border-[#3ee6c4]/40 text-[#3ee6c4] text-xs sm:text-sm font-bold flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{dbStatusAlert}</span>
          </span>
          <button
            onClick={() => setDbStatusAlert(null)}
            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Pending Expel Requests Alert */}
      {expelRequests.filter((r) => r.status === 'pending').length > 0 && (
        <div className="aurora-card p-5 border-[#ff6b86] bg-[#ff6b86]/10 space-y-3">
          <h4 className="text-sm font-black text-[#ff6b86] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Ustozlardan kelgan chetlatish so'rovlari:</span>
          </h4>
          <div className="space-y-2">
            {expelRequests
              .filter((r) => r.status === 'pending')
              .map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-black/30 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="text-xs">
                    <p className="font-bold">
                      Ustoz <span className="text-[#ffd23f]">{req.teacherName}</span> talaba{' '}
                      <span className="text-[#ff6b86]">{req.studentName}</span>ni chetlatishni so'radi
                    </p>
                    <p className="opacity-70 mt-0.5">Sabab: {req.reason}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => {
                        onResolveExpel(req.id, true);
                        const st = students.find((s) => s.id === req.studentId);
                        if (st) {
                          handleRemoveStudent(st);
                        } else {
                          deleteStudent(req.studentId);
                          triggerRefresh();
                        }
                      }}
                      className="duo-btn duo-btn-coral px-3 py-1.5 text-xs"
                    >
                      Bazadan Butunlay O'chirish
                    </button>
                    <button
                      onClick={() => {
                        onResolveExpel(req.id, true);
                        recordAdminAction(`Talaba ${req.studentName} ustoz guruhidan chiqarildi.`);
                      }}
                      className="duo-btn duo-btn-gold px-3 py-1.5 text-xs"
                    >
                      Faqat Guruhdan Chiqarish
                    </button>
                    <button
                      onClick={() => {
                        onResolveExpel(req.id, false);
                        recordAdminAction(`Talaba ${req.studentName} bo'yicha chetlatish so'rovi rad etildi.`);
                      }}
                      className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                    >
                      Rad etish
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Main Grid: Sidebar + Active View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Menu */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="aurora-card p-4 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider opacity-50 px-2 pb-1">
              Admin Boshqaruvi
            </p>
            <button
              onClick={() => setActiveTab('control_center')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'control_center'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>Shaxsiy Boshqaruv Pulti</span>
            </button>

            <button
              onClick={() => setActiveTab('database_management')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'database_management'
                  ? 'bg-gradient-to-r from-[#3ee6c4] to-[#17b897] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Database className="w-4 h-4 shrink-0" />
              <span>Baza & Jadval Boshqaruvi</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff9f1c] text-[#2b1d00] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Talabalar & Foiz Diagrammasi</span>
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-gradient-to-r from-[#b6f03c] to-[#3ee6c4] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>Ustozlar ({teachers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-gradient-to-r from-[#ff8a3d] to-[#ffd23f] text-[#2b1d00] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Test Natijalari ({testSubmissions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('youtube')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'youtube'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff4d6d] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Youtube className="w-4 h-4 shrink-0" />
              <span>YouTube Darsliklar</span>
            </button>
          </div>

          <div className="aurora-card p-5 text-center space-y-2">
            <AuroraMascot mood="excited" size={76} className="mx-auto" />
            <h4 className="text-sm font-black">Admin Boshqaruvi</h4>
            <p className="text-xs opacity-70">
              Barcha vazifalar bevosita Admin tomonidan markaziy bazada bajariladi.
            </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: DIRECT ADMIN CONTROL CENTER (SHAXSIY BOSHQARUV PULTI) */}
          {activeTab === 'control_center' && (
            <div className="space-y-6">
              {/* Row 1: Bulk XP, Bulk Coins & Admin Test Generator */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ommaviy XP va Tanga Boshqaruvi */}
                <div className="aurora-card p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] flex items-center justify-center shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-base">XP va Tangalar Boshqaruvi</h3>
                      <p className="text-xs opacity-70">Barcha talabalarga bir vaqtda XP yoki tanga berish</p>
                    </div>
                  </div>

                  {/* Bulk XP */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Barcha talabalarga XP qo'shish:</span>
                      <span className="font-mono text-[#ffd23f]">Jami: {totalXp} XP</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={bulkXpInput}
                        onChange={(e) => setBulkXpInput(Number(e.target.value))}
                        className="aurora-input py-2 text-xs font-mono w-28"
                      />
                      <button
                        onClick={() => handleBulkAddXp(bulkXpInput)}
                        className="duo-btn duo-btn-gold px-4 py-2 text-xs flex-1"
                      >
                        🏆 Hammaga {bulkXpInput >= 0 ? `+${bulkXpInput}` : bulkXpInput} XP
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleBulkAddXp(50)}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                      >
                        +50 XP
                      </button>
                      <button
                        onClick={() => handleBulkAddXp(100)}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                      >
                        +100 XP
                      </button>
                      <button
                        onClick={() => handleBulkAddXp(250)}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                      >
                        +250 XP
                      </button>
                    </div>
                  </div>

                  {/* Bulk Coins */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Barcha talabalarga Tanga tarqatish:</span>
                      <span className="font-mono text-[#ff8a3d]">Jami: 🪙 {totalCoins.toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={bulkCoinsInput}
                        onChange={(e) => setBulkCoinsInput(Number(e.target.value))}
                        className="aurora-input py-2 text-xs font-mono w-28"
                      />
                      <button
                        onClick={() => handleBulkAddCoins(bulkCoinsInput)}
                        className="duo-btn duo-btn-coral px-4 py-2 text-xs flex-1"
                      >
                        🪙 Hammaga +{bulkCoinsInput} Tanga
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => handleBulkAddCoins(20)}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                      >
                        🪙 +20 Tanga
                      </button>
                      <button
                        onClick={() => handleBulkAddCoins(50)}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                      >
                        🪙 +50 Tanga
                      </button>
                      <button
                        onClick={() => {
                          clearAllTestSubmissions();
                          triggerRefresh();
                          recordAdminAction('Topshirilgan barcha testlar tarixi tozalandi!');
                        }}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs text-[#ff6b86]"
                      >
                        🧹 Test tarixini tozalash
                      </button>
                    </div>
                  </div>
                </div>

                {/* Admin Test ID Generator */}
                <div className="aurora-card p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center shrink-0">
                      <FileCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-base">Test ID Yaratish (Admin Generator)</h3>
                      <p className="text-xs opacity-70">Talabaga bir martalik maxsus test ID berish</p>
                    </div>
                  </div>

                  {students.length === 0 ? (
                    <div className="p-4 rounded-2xl bg-white/5 text-xs opacity-70">
                      Test yaratish uchun avval talaba qo'shing.
                    </div>
                  ) : (
                    <form onSubmit={handleAdminCreateTest} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold mb-1">Talabani tanlang:</label>
                        <select
                          value={testStudentId || students[0]?.id || ''}
                          onChange={(e) => setTestStudentId(e.target.value)}
                          className="aurora-input py-2 text-xs font-bold"
                        >
                          {students.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.name} {s.surname} (@{s.username} — {s.stage.toUpperCase()})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-bold mb-1">Bosqich:</label>
                          <select
                            value={testStage}
                            onChange={(e) => setTestStage(e.target.value as CourseStage)}
                            className="aurora-input py-2 text-xs uppercase font-bold"
                          >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Savollar soni:</label>
                          <select
                            value={testQuestionCount}
                            onChange={(e) => setTestQuestionCount(Number(e.target.value))}
                            className="aurora-input py-2 text-xs font-mono font-bold"
                          >
                            <option value={5}>5 ta savol</option>
                            <option value={10}>10 ta savol</option>
                            <option value={15}>15 ta savol</option>
                            <option value={20}>20 ta savol</option>
                          </select>
                        </div>
                      </div>

                      <button type="submit" className="duo-btn duo-btn-mint w-full py-2.5 text-xs">
                        <Plus className="w-4 h-4" />
                        <span>Bir Martalik Test ID Yaratish</span>
                      </button>
                    </form>
                  )}

                  {lastCreatedTest && (
                    <div className="p-3.5 rounded-2xl bg-[#3ee6c4]/15 border border-[#3ee6c4]/40 flex items-center justify-between gap-2">
                      <div className="text-xs">
                        <span className="opacity-75 block">Yaratilgan Test ID ({lastCreatedTest.studentName}):</span>
                        <span className="font-mono font-black text-sm text-[#3ee6c4]">{lastCreatedTest.id}</span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(lastCreatedTest.id);
                          setCopiedTestId(lastCreatedTest.id);
                          setTimeout(() => setCopiedTestId(null), 2000);
                        }}
                        className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                      >
                        {copiedTestId === lastCreatedTest.id ? (
                          <Check className="w-3.5 h-3.5 text-[#3ee6c4]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedTestId === lastCreatedTest.id ? 'Nusxalandi' : 'Nusxa'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 2: Direct Student Control List (O'quvchilarni Bevosita Boshqarish va O'chirish) */}
              <div className="aurora-card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black flex items-center gap-2">
                      <Users className="w-5 h-5 text-[#ff6b86]" />
                      <span>O'quvchilarni Bevosita Boshqarish ({students.length} nafar)</span>
                    </h3>
                    <p className="text-xs opacity-70">
                      Bosqichni o'zgartirish, ustozga biriktirish, XP/Tanga qo'shish yoki bazadan o'chirish
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-[#3ee6c4]">
                        <Search className="w-3.5 h-3.5" />
                        <span>Qidiruv:</span>
                      </span>
                      <input
                        type="text"
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                        placeholder="Ism yoki loginni kiriting..."
                        className="aurora-input py-2 px-3 text-xs w-44 sm:w-52"
                      />
                    </div>
                    <button
                      onClick={() => setShowAddStudentModal(true)}
                      className="duo-btn duo-btn-mint px-3.5 py-2 text-xs shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi</span>
                    </button>
                  </div>
                </div>

                {filteredStudents.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <AuroraMascot mood="waving" size={80} className="mx-auto" />
                    <p className="text-sm font-bold opacity-75">Talabalar topilmadi</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredStudents.map((s) => (
                      <div
                        key={s.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-[#ff6b86]/40 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={s.avatar}
                            alt={s.name}
                            className="w-11 h-11 rounded-2xl object-cover border border-white/20 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="font-black text-sm">
                                {s.name} {s.surname}
                              </h4>
                              <span className="text-xs font-mono text-[#3ee6c4]">@{s.username}</span>
                              <span className="text-[11px] font-mono text-[#ffd23f] font-black">{s.xp || 0} XP</span>
                              <span className="text-[11px] font-mono text-[#ff8a3d] font-black">
                                🪙 {s.coins ?? 20}
                              </span>
                            </div>
                            <p className="text-[11px] opacity-65 mt-0.5">
                              {s.email || 'email yo\'q'} • {s.age || 16} yosh • Darslar: {s.completedLessons?.length || 0}/15
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Bosqich tanlash */}
                          <select
                            value={s.stage}
                            onChange={(e) => handleChangeStudentStage(s, e.target.value as CourseStage)}
                            className="aurora-input py-1.5 px-2.5 text-xs font-bold uppercase w-auto"
                            title="Bosqichni o'zgartirish"
                          >
                            <option value="html">HTML</option>
                            <option value="css">CSS</option>
                            <option value="javascript">JavaScript</option>
                            <option value="graduated">Bitirgan</option>
                          </select>

                          {/* Ustoz tanlash */}
                          <select
                            value={s.teacherId || ''}
                            onChange={(e) => handleChangeStudentTeacher(s, e.target.value)}
                            className="aurora-input py-1.5 px-2.5 text-xs font-bold w-auto"
                            title="Ustoz guruhini o'zgartirish"
                          >
                            {teachers.map((t) => (
                              <option key={t.id} value={t.id}>
                                Ustoz: {t.name}
                              </option>
                            ))}
                          </select>

                          <button
                            onClick={() => {
                              addXpToStudent(s.id, 100);
                              triggerRefresh();
                              recordAdminAction(`${s.name}ga +100 XP qo'shildi!`);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-[#ffd23f]/15 text-[#ffd23f] text-xs font-bold cursor-pointer hover:bg-[#ffd23f]/25"
                          >
                            +100 XP
                          </button>

                          <button
                            onClick={() => {
                              updateStudent(s.id, { coins: Number(((s.coins ?? 20) + 20).toFixed(1)) });
                              triggerRefresh();
                              recordAdminAction(`${s.name}ga +20 🪙 tanga berildi!`);
                            }}
                            className="px-2.5 py-1.5 rounded-xl bg-[#ff8a3d]/15 text-[#ff8a3d] text-xs font-bold cursor-pointer hover:bg-[#ff8a3d]/25"
                          >
                            🪙 +20
                          </button>

                          <button
                            onClick={() => setEditingStudent(s)}
                            className="px-2.5 py-1.5 rounded-xl bg-[#3ee6c4]/15 text-[#3ee6c4] text-xs font-bold cursor-pointer hover:bg-[#3ee6c4]/25 flex items-center gap-1"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Tahrir</span>
                          </button>

                          <button
                            onClick={() => handleRemoveStudent(s)}
                            className="px-3 py-1.5 rounded-xl bg-[#ff6b86]/20 text-[#ff6b86] hover:bg-[#ff6b86] hover:text-white text-xs font-black cursor-pointer flex items-center gap-1 transition-colors"
                            title="Bazadan butunlay o'chirish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>O'chirish</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Row 3: Admin Action Logs */}
              <div className="aurora-card p-5 space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider opacity-75 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#3ee6c4]" />
                  <span>Admin Amallar Jurnali:</span>
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs gap-2"
                    >
                      <span className="font-bold">{log.action}</span>
                      <span className="text-[11px] opacity-60 font-mono shrink-0">
                        {log.admin} • {log.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATABASE & TABLE MANAGEMENT (NO HEARTS!) */}
          {activeTab === 'database_management' && (
            <div className="space-y-6">
              <div className="aurora-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] border border-[#3ee6c4]/30 flex items-center justify-center shrink-0">
                      <Database className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black">Platforma Ma'lumotlar Bazasi Jonli Boshqaruvi</h3>
                      <p className="text-xs opacity-70">
                        Har bir talabaning XP balli, tangalari, ustozi va bosqichini o'zgartirish yoki bazadan o'chirish
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={() => setShowAddStudentModal(true)}
                      className="duo-btn duo-btn-mint px-4 py-2 text-xs"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Yangi Talaba Qo'shish</span>
                    </button>
                    <button
                      onClick={() => setShowRawJsonModal(true)}
                      className="duo-btn duo-btn-surface px-4 py-2 text-xs"
                    >
                      <Code className="w-4 h-4 text-[#ffd23f]" />
                      <span>Xom JSON Baza</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="aurora-card p-6 space-y-4">
                <h4 className="text-sm font-black flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ff6b86]" />
                  <span>Talabalar Ma'lumotlar Bazasi ({students.length} ta yozuv)</span>
                </h4>

                {students.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <AuroraMascot mood="waving" size={90} className="mx-auto" />
                    <p className="text-sm font-bold opacity-75">Bazada talabalar mavjud emas</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 uppercase font-black border-b border-white/10">
                        <tr>
                          <th className="p-3.5">ID & Ism-Familiya</th>
                          <th className="p-3.5">Login & Email</th>
                          <th className="p-3.5">Bosqich</th>
                          <th className="p-3.5">XP Ball</th>
                          <th className="p-3.5">Tangalar</th>
                          <th className="p-3.5">Darslar</th>
                          <th className="p-3.5 text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {students.map((s) => (
                          <tr key={s.id} className="hover:bg-[#ff6b86]/10 transition-colors">
                            <td className="p-3.5 flex items-center gap-2.5">
                              <img
                                src={s.avatar}
                                alt={s.name}
                                className="w-9 h-9 rounded-2xl object-cover border border-white/20"
                              />
                              <div>
                                <p className="font-extrabold">
                                  {s.name} {s.surname}
                                </p>
                                <span className="text-[10px] opacity-50 font-mono">{s.id}</span>
                              </div>
                            </td>
                            <td className="p-3.5">
                              <p className="font-mono font-bold text-[#3ee6c4]">@{s.username}</p>
                              <p className="text-[11px] opacity-60">
                                {s.email || 'email kiritilmagan'} • {s.age || 16} yosh
                              </p>
                            </td>
                            <td className="p-3.5">
                              <select
                                value={s.stage}
                                onChange={(e) => handleChangeStudentStage(s, e.target.value as CourseStage)}
                                className="aurora-input py-1 px-2 text-xs uppercase font-mono font-bold w-auto"
                              >
                                <option value="html">HTML</option>
                                <option value="css">CSS</option>
                                <option value="javascript">JavaScript</option>
                                <option value="graduated">Bitirgan</option>
                              </select>
                            </td>
                            <td className="p-3.5 font-mono font-black text-[#ffd23f]">{s.xp || 0} XP</td>
                            <td className="p-3.5 font-mono font-black text-[#ff8a3d]">🪙 {s.coins ?? 20}</td>
                            <td className="p-3.5 font-mono">{s.completedLessons?.length || 0} / 15</td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                <button
                                  onClick={() => {
                                    addXpToStudent(s.id, 100);
                                    triggerRefresh();
                                    recordAdminAction(`${s.name}ga +100 XP qo'shildi!`);
                                  }}
                                  className="px-2.5 py-1 rounded-xl bg-[#ffd23f]/15 text-[#ffd23f] text-[11px] font-bold cursor-pointer"
                                >
                                  +100 XP
                                </button>
                                <button
                                  onClick={() => {
                                    updateStudent(s.id, { coins: Number(((s.coins || 0) + 20).toFixed(1)) });
                                    triggerRefresh();
                                    recordAdminAction(`${s.name}ga +20 Tanga berildi!`);
                                  }}
                                  className="px-2.5 py-1 rounded-xl bg-[#ff8a3d]/15 text-[#ff8a3d] text-[11px] font-bold cursor-pointer"
                                >
                                  🪙 +20
                                </button>
                                <button
                                  onClick={() => setEditingStudent(s)}
                                  className="px-2.5 py-1 rounded-xl bg-[#3ee6c4]/15 text-[#3ee6c4] text-[11px] font-bold cursor-pointer flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  Tahrir
                                </button>
                                <button
                                  onClick={() => handleRemoveStudent(s)}
                                  className="px-2.5 py-1 rounded-xl bg-[#ff6b86]/20 text-[#ff6b86] hover:bg-[#ff6b86] hover:text-white text-[11px] font-black cursor-pointer flex items-center gap-1 transition-colors"
                                  title="Bazadan o'chirish"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>O'chirish</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TALABALAR & O'RTACHA FOIZ DIAGRAMMASI */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              {/* Student Average Mastery Diagram */}
              <div className="aurora-card p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-lg font-black flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#3ee6c4]" />
                      <span>O'quvchilarning O'rtacha O'zlashtirish Foizi Diagrammasi</span>
                    </h3>
                    <p className="text-xs opacity-70">
                      Barcha o'quvchilarning darslarni yakunlash ko'rsatkichi (%)
                    </p>
                  </div>
                  <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4] font-mono">
                    Umumiy O'rtacha: {avgStudentProgress}%
                  </span>
                </div>

                {students.length === 0 ? (
                  <div className="text-center py-10 space-y-3">
                    <AuroraMascot mood="thinking" size={84} className="mx-auto" />
                    <p className="text-sm font-bold opacity-70">Diagramma uchun ma'lumot yo'q</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {students.map((s) => {
                      const pct =
                        s.stage === 'graduated'
                          ? 100
                          : Math.min(100, Math.round(((s.completedLessons?.length || 0) / 15) * 100));
                      return (
                        <div key={s.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span>
                              {s.name} {s.surname} ({s.stage.toUpperCase()})
                            </span>
                            <span className="font-mono text-[#ffd23f]">{pct}% ({s.xp} XP)</span>
                          </div>
                          <div className="aurora-progress-track h-3">
                            <div className="aurora-progress-fill" style={{ width: `${Math.max(4, pct)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Clean Students Table without Hearts + Direct Admin Actions */}
              <div className="aurora-card p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-base font-black">Ro'yxatdan O'tgan Talabalar Jadvali ({students.length})</h3>
                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="duo-btn duo-btn-mint px-3.5 py-2 text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Yangi Talaba</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 uppercase font-black border-b border-white/10">
                      <tr>
                        <th className="p-3.5">Talaba</th>
                        <th className="p-3.5">Email & Yoshi</th>
                        <th className="p-3.5">Bosqich</th>
                        <th className="p-3.5">XP</th>
                        <th className="p-3.5">Darslar</th>
                        <th className="p-3.5">Tangalar</th>
                        <th className="p-3.5 text-right">Boshqaruv</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {students.map((s) => (
                        <tr key={s.id} className="hover:bg-[#ff6b86]/10 transition-colors">
                          <td className="p-3.5 flex items-center gap-3">
                            <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-xl object-cover" />
                            <div>
                              <span className="font-extrabold block">
                                {s.name} {s.surname}
                              </span>
                              <span className="text-[10px] font-mono text-[#3ee6c4]">@{s.username}</span>
                            </div>
                          </td>
                          <td className="p-3.5 opacity-80">
                            {s.email} • {s.age || 16} yosh
                          </td>
                          <td className="p-3.5">
                            <select
                              value={s.stage}
                              onChange={(e) => handleChangeStudentStage(s, e.target.value as CourseStage)}
                              className="aurora-input py-1 px-2 text-xs uppercase font-mono font-bold w-auto"
                            >
                              <option value="html">HTML</option>
                              <option value="css">CSS</option>
                              <option value="javascript">JavaScript</option>
                              <option value="graduated">Bitirgan</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-[#ffd23f] font-black font-mono">{s.xp} XP</td>
                          <td className="p-3.5 font-mono">{s.completedLessons.length} / 15</td>
                          <td className="p-3.5 text-[#ff8a3d] font-black font-mono">🪙 {s.coins ?? 20}</td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setEditingStudent(s)}
                                className="px-2.5 py-1 rounded-xl bg-[#3ee6c4]/15 text-[#3ee6c4] text-[11px] font-bold cursor-pointer"
                              >
                                Tahrir
                              </button>
                              <button
                                onClick={() => handleRemoveStudent(s)}
                                className="px-2.5 py-1 rounded-xl bg-[#ff6b86]/20 text-[#ff6b86] hover:bg-[#ff6b86] hover:text-white text-[11px] font-black cursor-pointer flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>O'chirish</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: USTOZLAR BOSHQARUVI */}
          {activeTab === 'teachers' && (
            <div className="aurora-card p-6 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-black">Rasmiy Ustozlar Ro'yxati ({teachers.length})</h3>
                  <p className="text-xs opacity-70">Yangi ustoz qo'shish yoki guruh chatlarini kuzatish</p>
                </div>
                <button
                  onClick={() => setShowAddTeacherModal(true)}
                  className="duo-btn duo-btn-mint px-4 py-2 text-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Yangi Ustoz Qo'shish</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachers.map((t) => {
                  const groupStudents = students.filter((s) => s.teacherId === t.id || t.studentIds?.includes(s.id));
                  return (
                    <div
                      key={t.id}
                      className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between gap-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-2xl object-cover" />
                          <div>
                            <h4 className="font-black text-sm">
                              {t.name} {t.surname}
                            </h4>
                            <p className="text-xs text-[#3ee6c4] font-mono">
                              @{t.username} • {t.specialty}
                            </p>
                            <span className="text-[11px] opacity-60">{groupStudents.length} / 15 talaba</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {onOpenGroupChat && (
                            <button
                              onClick={() => onOpenGroupChat(t.id)}
                              className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                            >
                              Chat
                            </button>
                          )}
                          <button
                            onClick={() => {
                              onDeleteTeacher(t.id);
                              deleteTeacher(t.id);
                              triggerRefresh();
                              recordAdminAction(`Ustoz "${t.name} ${t.surname}" bazadan o'chirildi!`);
                            }}
                            className="duo-btn duo-btn-surface p-2 text-[#ff6b86]"
                            title="O'chirish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {groupStudents.length > 0 && (
                        <div className="pt-3 border-t border-white/10 space-y-1.5">
                          <span className="text-[11px] font-bold opacity-65 block">Guruh talabalari:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {groupStudents.map((st) => (
                              <span
                                key={st.id}
                                className="px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-[11px] font-bold flex items-center gap-1.5"
                              >
                                <span>
                                  {st.name} {st.surname}
                                </span>
                                <button
                                  onClick={() => handleRemoveStudent(st)}
                                  className="text-[#ff6b86] hover:opacity-100 opacity-70 cursor-pointer"
                                  title="Talabani bazadan o'chirish"
                                >
                                  ✕
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: TEST SUBMISSIONS & ACTIVE TESTS */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              {/* Active Generated Tests */}
              <div className="aurora-card p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-base font-black">Faol Test ID lar ({generatedTestsList.length})</h3>
                    <p className="text-xs opacity-70">Hozirda talabalar ishlashi uchun ochiq bo'lgan bir martalik testlar</p>
                  </div>
                </div>

                {generatedTestsList.length === 0 ? (
                  <p className="text-xs opacity-65">Hozircha faol Test ID yo'q.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {generatedTestsList.map((t) => (
                      <div
                        key={t.id}
                        className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                      >
                        <div className="text-xs">
                          <p className="font-mono font-black text-[#3ee6c4] text-sm">{t.id}</p>
                          <p className="opacity-75">
                            {t.studentName} • {t.stage.toUpperCase()} ({t.questionCount} savol)
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(t.id);
                              setCopiedTestId(t.id);
                              setTimeout(() => setCopiedTestId(null), 2000);
                            }}
                            className="duo-btn duo-btn-surface px-2.5 py-1.5 text-xs"
                          >
                            {copiedTestId === t.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            onClick={() => handleDeleteActiveTest(t.id)}
                            className="duo-btn duo-btn-surface p-1.5 text-[#ff6b86]"
                            title="Testni bekor qilish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submitted Test Results */}
              <div className="aurora-card p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-lg font-black">Topshirilgan Testlar Natijalari ({testSubmissions.length})</h3>
                  {testSubmissions.length > 0 && (
                    <button
                      onClick={() => {
                        clearAllTestSubmissions();
                        triggerRefresh();
                        recordAdminAction('Topshirilgan barcha testlar tarixi tozalandi!');
                      }}
                      className="duo-btn duo-btn-surface px-3.5 py-1.5 text-xs text-[#ff6b86]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Tarixni tozalash</span>
                    </button>
                  )}
                </div>

                {testSubmissions.length === 0 ? (
                  <div className="text-center py-12 space-y-3">
                    <AuroraMascot mood="happy" size={88} className="mx-auto" />
                    <p className="text-sm font-bold opacity-70">Hozircha birorta ham rasmiy test topshirilmagan.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testSubmissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-black text-sm">
                            {sub.studentName} — <span className="text-[#3ee6c4] uppercase">{sub.stage}</span>
                          </p>
                          <p className="text-xs opacity-60 font-mono">
                            {sub.submittedAt} • Test ID: {sub.testId}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span
                            className={`aurora-badge font-mono ${
                              sub.percentage >= 70 ? 'bg-[#3ee6c4]/20 text-[#3ee6c4]' : 'bg-[#ff6b86]/20 text-[#ff6b86]'
                            }`}
                          >
                            {sub.percentage}% {sub.percentage >= 70 ? "O'tdi" : 'Yiqildi'}
                          </span>
                          {!sub.adminApprovedStageUpgrade && (
                            <button
                              onClick={() => {
                                onApproveUpgrade(sub.id);
                                recordAdminAction(`${sub.studentName} keyingi bosqichga o'tkazildi!`);
                              }}
                              className="duo-btn duo-btn-mint px-3.5 py-1.5 text-xs"
                            >
                              Keyingi bosqichga o'tkazish
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: YOUTUBE */}
          {activeTab === 'youtube' && (
            <div className="space-y-6">
              <div className="aurora-card p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center">
                      <Youtube className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black">YouTube Video & Darsliklar Markazi</h3>
                      <p className="text-xs opacity-70">Dasturlash darsliklari va fokus musiqalari</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsCinemaMode(!isCinemaMode)}
                      className="duo-btn duo-btn-surface px-3.5 py-2 text-xs"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>{isCinemaMode ? "Oddiy O'lcham" : 'Katta Rejim'}</span>
                    </button>
                    <a
                      href={currentVideoUrl.replace('/embed/', '/watch?v=')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="duo-btn duo-btn-coral px-3.5 py-2 text-xs"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (videoInputUrl.trim()) {
                      const parsed = parseYouTubeEmbedUrl(videoInputUrl);
                      setCurrentVideoUrl(parsed);
                      setCurrentVideoTitle('Yuklangan video: ' + videoInputUrl.trim());
                      setVideoInputUrl('');
                    }
                  }}
                  className="mt-4 flex flex-col sm:flex-row items-center gap-2"
                >
                  <input
                    type="text"
                    value={videoInputUrl}
                    onChange={(e) => setVideoInputUrl(e.target.value)}
                    placeholder="YouTube video linkini yoki ID kiriting..."
                    className="aurora-input flex-1 text-xs sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!videoInputUrl.trim()}
                    className="duo-btn duo-btn-coral px-5 py-3 text-xs sm:text-sm disabled:opacity-40"
                  >
                    <Play className="w-4 h-4" />
                    <span>Videoni Yuklash</span>
                  </button>
                </form>
              </div>

              <div className="aurora-card p-5">
                <div className={`mx-auto ${isCinemaMode ? 'w-full' : 'max-w-4xl'}`}>
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black">
                    <iframe
                      src={currentVideoUrl}
                      title={currentVideoTitle}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-bold flex items-center gap-2">
                      <Film className="w-4 h-4 text-[#ff6b86]" />
                      {currentVideoTitle}
                    </span>
                    <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">Jonli Iframe</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CURATED_DEV_VIDEOS.map((vid) => {
                  const isSelected = currentVideoUrl.includes(vid.id);
                  return (
                    <div key={vid.id} className="aurora-card p-4 flex flex-col justify-between gap-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] mb-2">
                          <span className="aurora-badge bg-[#ff6b86]/15 text-[#ff6b86]">{vid.category}</span>
                          <span className="font-mono opacity-60">{vid.duration}</span>
                        </div>
                        <h5 className="font-black text-xs sm:text-sm line-clamp-2">{vid.title}</h5>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentVideoUrl(`https://www.youtube.com/embed/${vid.id}`);
                          setCurrentVideoTitle(vid.title);
                        }}
                        className={`duo-btn w-full py-2 text-xs ${
                          isSelected ? 'duo-btn-coral' : 'duo-btn-surface'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>{isSelected ? "Ko'rilmoqda" : 'Playerda Ochish'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: YANGI TALABA QO'SHISH */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-black flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#3ee6c4]" />
              <span>Yangi Talabani Bazaga Kiritish</span>
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newStudentName.trim() || !newStudentSurname.trim()) return;
                const created = addCustomStudent({
                  name: newStudentName.trim(),
                  surname: newStudentSurname.trim(),
                  username: newStudentUsername.trim().toLowerCase() || `talaba_${Date.now().toString().slice(-4)}`,
                  email: newStudentEmail.trim() || undefined,
                  age: Number(newStudentAge),
                  stage: newStudentStage,
                  xp: Number(newStudentXp),
                  coins: Number(newStudentCoins),
                });
                triggerRefresh();
                recordAdminAction(`Talaba "${created.name} ${created.surname}" bazaga qo'shildi!`);
                setShowAddStudentModal(false);
                setNewStudentName('');
                setNewStudentSurname('');
                setNewStudentUsername('');
                setNewStudentEmail('');
                setNewStudentXp(0);
                setNewStudentCoins(20);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Ism *</label>
                  <input
                    type="text"
                    required
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Familiya *</label>
                  <input
                    type="text"
                    required
                    value={newStudentSurname}
                    onChange={(e) => setNewStudentSurname(e.target.value)}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Login (Username)</label>
                  <input
                    type="text"
                    value={newStudentUsername}
                    onChange={(e) => setNewStudentUsername(e.target.value)}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Yoshi (13+)</label>
                  <input
                    type="number"
                    min={13}
                    max={99}
                    value={newStudentAge}
                    onChange={(e) => setNewStudentAge(Number(e.target.value))}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Bosqich</label>
                  <select
                    value={newStudentStage}
                    onChange={(e) => setNewStudentStage(e.target.value as CourseStage)}
                    className="aurora-input py-2 text-xs uppercase font-bold"
                  >
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Boshlang'ich XP</label>
                  <input
                    type="number"
                    min={0}
                    value={newStudentXp}
                    onChange={(e) => setNewStudentXp(Number(e.target.value))}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Boshlang'ich Tanga (🪙)</label>
                  <input
                    type="number"
                    min={0}
                    value={newStudentCoins}
                    onChange={(e) => setNewStudentCoins(Number(e.target.value))}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="duo-btn duo-btn-surface flex-1 py-2.5 text-xs"
                >
                  Bekor Qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-mint flex-1 py-2.5 text-xs">
                  Bazaga Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: YANGI USTOZ QO'SHISH */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-black flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#3ee6c4]" />
              <span>Yangi Ustoz Qo'shish</span>
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!tName.trim() || !tSurname.trim() || !tUsername.trim()) return;
                onAddTeacher({
                  name: tName.trim(),
                  surname: tSurname.trim(),
                  username: tUsername.trim(),
                  password: tPassword.trim() || 'ustoz12345',
                  specialty: tSpecialty,
                  experienceYears: 4,
                  phone: '+998 90 123 45 67',
                  email: `${tUsername.trim()}@devmaster.uz`,
                  bio: 'Aurora Sunset rasmiy ustozi',
                  avatar:
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
                });
                recordAdminAction(`Yangi ustoz "${tName.trim()} ${tSurname.trim()}" qo'shildi!`);
                setShowAddTeacherModal(false);
                setTName('');
                setTSurname('');
                setTUsername('');
                setTPassword('');
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Ism"
                  value={tName}
                  onChange={(e) => setTName(e.target.value)}
                  className="aurora-input py-2 text-xs"
                />
                <input
                  type="text"
                  required
                  placeholder="Familiya"
                  value={tSurname}
                  onChange={(e) => setTSurname(e.target.value)}
                  className="aurora-input py-2 text-xs"
                />
              </div>
              <input
                type="text"
                required
                placeholder="Login (username)"
                value={tUsername}
                onChange={(e) => setTUsername(e.target.value)}
                className="aurora-input py-2 text-xs font-mono"
              />
              <input
                type="text"
                placeholder="Parol (kamida 8 belgi)"
                value={tPassword}
                onChange={(e) => setTPassword(e.target.value)}
                className="aurora-input py-2 text-xs font-mono"
              />
              <input
                type="text"
                placeholder="Mutaxassisligi"
                value={tSpecialty}
                onChange={(e) => setTSpecialty(e.target.value)}
                className="aurora-input py-2 text-xs"
              />
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="duo-btn duo-btn-surface flex-1 py-2.5 text-xs"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-mint flex-1 py-2.5 text-xs">
                  Qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: TALABANI TAHRIRLASH */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-md w-full p-6 space-y-4">
            <h3 className="text-base font-black">Talabani Tahrirlash: {editingStudent.name}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateStudent(editingStudent.id, {
                  name: editingStudent.name,
                  surname: editingStudent.surname,
                  username: editingStudent.username,
                  email: editingStudent.email,
                  xp: Number(editingStudent.xp),
                  coins: Number(editingStudent.coins),
                  stage: editingStudent.stage,
                  teacherId: editingStudent.teacherId,
                  age: Number(editingStudent.age),
                });
                triggerRefresh();
                recordAdminAction(`Talaba "${editingStudent.name} ${editingStudent.surname}" ma'lumotlari yangilandi!`);
                setEditingStudent(null);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Ism</label>
                  <input
                    type="text"
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Familiya</label>
                  <input
                    type="text"
                    value={editingStudent.surname}
                    onChange={(e) => setEditingStudent({ ...editingStudent, surname: e.target.value })}
                    className="aurora-input py-2 text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Bosqich</label>
                  <select
                    value={editingStudent.stage}
                    onChange={(e) => setEditingStudent({ ...editingStudent, stage: e.target.value as CourseStage })}
                    className="aurora-input py-2 text-xs uppercase font-bold"
                  >
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                    <option value="graduated">Bitirgan</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold mb-1">Ustoz</label>
                  <select
                    value={editingStudent.teacherId || ''}
                    onChange={(e) => setEditingStudent({ ...editingStudent, teacherId: e.target.value })}
                    className="aurora-input py-2 text-xs font-bold"
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} {t.surname}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold mb-1">XP Ball</label>
                  <input
                    type="number"
                    value={editingStudent.xp || 0}
                    onChange={(e) => setEditingStudent({ ...editingStudent, xp: Number(e.target.value) })}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Tangalar (🪙)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    value={editingStudent.coins ?? 20}
                    onChange={(e) => setEditingStudent({ ...editingStudent, coins: Number(e.target.value) })}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Yoshi</label>
                  <input
                    type="number"
                    min={13}
                    max={99}
                    value={editingStudent.age || 16}
                    onChange={(e) => setEditingStudent({ ...editingStudent, age: Number(e.target.value) })}
                    className="aurora-input py-2 text-xs font-mono"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="duo-btn duo-btn-surface flex-1 py-2.5 text-xs"
                >
                  Bekor Qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-coral flex-1 py-2.5 text-xs">
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RAW JSON */}
      {showRawJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-2xl w-full p-6 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-black">Platforma Ma'lumotlar Bazasi (JSON Dump)</h3>
              <button onClick={() => setShowRawJsonModal(false)} className="duo-btn duo-btn-surface px-3 py-1">
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto bg-black/50 p-4 rounded-2xl border border-white/10 font-mono text-[11px] text-[#3ee6c4]">
              <pre>{JSON.stringify(getFullDatabaseDump(), null, 2)}</pre>
            </div>
            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(getFullDatabaseDump(), null, 2));
                  setDbStatusAlert('JSON buferga nusxalandi!');
                  setShowRawJsonModal(false);
                }}
                className="duo-btn duo-btn-mint px-4 py-2 text-xs"
              >
                <Download className="w-4 h-4" />
                <span>Nusxa Olish</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
