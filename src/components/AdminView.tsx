import React, { useState, useEffect } from 'react';
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
  Check,
  Copy,
  UserPlus,
  AlertTriangle,
  Sliders,
  FileCheck,
  Search,
  Bell,
  Wifi,
  WifiOff,
  Flame,
  Swords,
  Sparkles,
  Timer,
  Bug,
  Lightbulb,
  Bot,
  Send,
  Volume2,
  Eye,
  Briefcase,
} from 'lucide-react';
import {
  Student,
  Teacher,
  TestSubmissionResult,
  ExpelRequest,
  CourseStage,
  GeneratedTest,
  FeedbackReport,
  SubAdmin,
  SubAdminDepartment,
  AuthUser,
} from '../types';
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
  resetEntireCentralDatabase,
  sendAdminMessageToStudent,
  recordLeagueBattleResult,
  getFeedbackReports,
  updateFeedbackReport,
  deleteFeedbackReport,
  getSubAdmins,
  addSubAdmin,
  deleteSubAdmin,
  assignSubAdminTask,
  toggleSubAdminTask,
  MALE_PROGRAMMER_AVATAR,
  getLegendAdminStudentProfile,
  saveLegendAdminStudentProfile,
  issueInstantCertificateToStudent,
  broadcastRewardToStudents,
} from '../services/storage';
import { getActiveBackendName } from '../services/remoteStore';
import { useBackground } from '../context/BackgroundContext';
import { AuroraMascot } from './AuroraMascot';
import { AvatarWithFrame, ORNATE_SHOP_FRAMES } from './AvatarWithFrame';
import { StudentPublicProfileModal } from './StudentPublicProfileModal';
import { CmdBekMascot, CmdBekMood } from './CmdBekMascot';
import {
  speakUzbekBoyVoice,
  stopAllBoySpeech,
  CMDBEK_VOICE_PRESETS,
  CmdBekVoiceConfig,
  getGlobalCmdBekVoiceConfig,
  saveGlobalCmdBekVoiceConfig,
  getAllBrowserSpeechVoices,
  previewVoiceConfig,
} from '../services/ttsService';

interface AdminViewProps {
  currentUser?: AuthUser | null;
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
  onEnterAsStudent?: () => void;
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
  currentUser,
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
  onEnterAsStudent,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'control_center'
    | 'feedback_inbox'
    | 'sub_admins'
    | 'cmdbek_ai_lab'
    | 'streak_messenger'
    | 'online_radar'
    | 'economy_boosters'
    | 'pvp_league'
    | 'database_management'
    | 'students'
    | 'teachers'
    | 'submissions'
    | 'youtube'
    | 'legend_podium_config'
    | 'promo_and_awards'
    | 'security_inspector'
    | 'cmdbek_voice_studio'
  >('control_center');
  const { setIsBackgroundModalOpen } = useBackground();

  // CMDbek Global Voice Studio State (Admin listens and picks 1 single voice for everyone)
  const [activeVoiceConfig, setActiveVoiceConfig] = useState<CmdBekVoiceConfig>(() =>
    getGlobalCmdBekVoiceConfig()
  );
  const [browserVoicesList, setBrowserVoicesList] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceSampleText, setVoiceSampleText] = useState<string>(
    "Salom do'stim! Men CMDbek sun'iy intellekt ustozman. Dasturlashni birgalikda o'rganamiz va ajoyib loyihalar yaratamiz!"
  );
  const [customPitch, setCustomPitch] = useState<number>(activeVoiceConfig.pitch || 0.96);
  const [customRate, setCustomRate] = useState<number>(activeVoiceConfig.rate || 1.03);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);
  const [presetCategoryFilter, setPresetCategoryFilter] = useState<
    'all' | 'uz_tr' | 'ru_cyrl' | 'browser_classic' | 'gemini_special'
  >('all');
  const [presetGenderFilter, setPresetGenderFilter] = useState<
    'all' | 'male' | 'female' | 'robot'
  >('all');
  const [voiceLangFilter, setVoiceLangFilter] = useState<'all' | 'uz_tr' | 'ru' | 'en'>('all');

  useEffect(() => {
    let mounted = true;
    const loadVoices = async () => {
      const list = await getAllBrowserSpeechVoices();
      if (mounted) setBrowserVoicesList(list);
    };
    loadVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (mounted) {
          setBrowserVoicesList(window.speechSynthesis.getVoices() || []);
        }
      };
    }
    return () => {
      mounted = false;
    };
  }, []);

  // Legend Podium Profile state (stands above #1 on the Podium)
  const [legendProfile, setLegendProfile] = useState<Student>(() => getLegendAdminStudentProfile());
  const [legendName, setLegendName] = useState(legendProfile.name || 'Jasur');
  const [legendSurname, setLegendSurname] = useState(legendProfile.surname || 'Sultonov (Admin)');
  const [legendUsername, setLegendUsername] = useState(legendProfile.username || 'admin_podium_1');
  const [legendAge, setLegendAge] = useState<number>(legendProfile.age || 21);
  const [legendBio, setLegendBio] = useState(
    legendProfile.bio ||
      "DevMaster Academy Bosh Admini · Podium #1 Chempioni (Cheksiz XP & Tanga)"
  );
  const [legendFrame, setLegendFrame] = useState(
    legendProfile.equippedFrame || 'frame-diamond-prism'
  );
  const [legendBadge, setLegendBadge] = useState(legendProfile.equippedBadge || 'LEGEND 💎');

  // Mass Broadcast & Certificate Issuer state
  const [broadcastXp, setBroadcastXp] = useState<number>(25);
  const [broadcastCoins, setBroadcastCoins] = useState<number>(2);
  const [broadcastTitle, setBroadcastTitle] = useState<string>('🎁 Akademiya Maxsus Sovg‘asi!');
  const [broadcastText, setBroadcastText] = useState<string>(
    "Faol o'qiganingiz uchun Admin tomonidan maxsus XP va Tanga mukofoti taqdim etildi!"
  );
  const [certTargetStudentId, setCertTargetStudentId] = useState<string>(students[0]?.id || 's-1');
  const [certType, setCertType] = useState<'frontend' | 'backend' | 'fullstack'>(
    'fullstack'
  );
  const [securityPassDrafts, setSecurityPassDrafts] = useState<Record<string, string>>({});

  // Feedback Reports (Bug & Suggestion Inbox from Landing Page)
  const [feedbackReports, setFeedbackReports] = useState<FeedbackReport[]>(() =>
    getFeedbackReports()
  );
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  // Deputy / Sub-Admins & Task Delegation State
  const [subAdminsList, setSubAdminsList] = useState<SubAdmin[]>(() => getSubAdmins());
  const [subName, setSubName] = useState('');
  const [subSurname, setSubSurname] = useState('');
  const [subUsername, setSubUsername] = useState('');
  const [subPassword, setSubPassword] = useState('');
  const [subRoleTitle, setSubRoleTitle] = useState("Baza va Xabarlar Bo'yicha O'rinbosar");
  const [subPermissions, setSubPermissions] = useState<SubAdminDepartment[]>([
    'feedback_bugs',
    'database',
  ]);
  const [taskTitleDrafts, setTaskTitleDrafts] = useState<Record<string, string>>({});
  const [taskDeptDrafts, setTaskDeptDrafts] = useState<Record<string, SubAdminDepartment>>({});

  const handleToggleSubAdminDept = (dept: SubAdminDepartment) => {
    setSubPermissions((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleCreateSubAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subName.trim() || !subUsername.trim() || !subPassword.trim()) return;
    addSubAdmin({
      name: subName,
      surname: subSurname,
      username: subUsername,
      password: subPassword,
      roleTitle: subRoleTitle || "O'rinbosar Admin",
      permissions: subPermissions.length > 0 ? subPermissions : ['feedback_bugs'],
    });
    setSubAdminsList(getSubAdmins());
    setSubName('');
    setSubSurname('');
    setSubUsername('');
    setSubPassword('');
    recordAdminAction(`Yangi o'rinbosar admin (${subName}) qo'shildi va ish taqsimlandi!`);
  };

  // Admin Panel Embedded CMDbek Humorous AI State
  const [adminCmdMood, setAdminCmdMood] = useState<CmdBekMood>('cool');
  const [adminCmdInput, setAdminCmdInput] = useState('');
  const [adminCmdLoading, setAdminCmdLoading] = useState(false);
  const [adminCmdMessages, setAdminCmdMessages] = useState<
    { id: string; sender: 'user' | 'cmdbek'; text: string; mood?: CmdBekMood; time: string }[]
  >([
    {
      id: 'cmd-welcome',
      sender: 'cmdbek',
      text: "Salom Bosh Admin! Men CMDbek & Google Gemini AI — haqiqiy hazilkash AI yordamchingiz! Xohlagan savolingizga javob beraman, hazillar qilaman va o'zbek tilida ravon o'g'il bola ovozida gapiraman (faqat iqtisodiy va diniy mavzularda gaplashmayman)!",
      mood: 'cool',
      time: 'Hozir',
    },
  ]);

  const speakBoyVoiceAdmin = async (text: string) => {
    await speakUzbekBoyVoice(text, {
      onStart: () => setAdminCmdMood('speaking'),
      onEnd: () => setAdminCmdMood('happy'),
    });
  };

  const handleSendAdminCmdChat = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const prompt = adminCmdInput.trim();
    if (!prompt || adminCmdLoading) return;
    setAdminCmdInput('');
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const nextMessages = [
      ...adminCmdMessages,
      { id: `u-${Date.now()}`, sender: 'user' as const, text: prompt, time: nowTime },
    ];
    setAdminCmdMessages(nextMessages);
    setAdminCmdLoading(true);
    setAdminCmdMood('thinking');

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          studentName: `${currentUser?.name || OWNER_PROFILE.name} (Admin)`,
          stage: 'fullstack',
          persona: 'cmdbek',
          model: 'gemini-3.8-flash',
          history: nextMessages.slice(-12).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
        }),
      });
      const data = await res.json();
      const reply =
        data?.reply ||
        "Bosh Admin, buyrug'ingizga tayyorman! Baza ham, o'rinbosar adminlar ham soatdek ishlayapti!";
      const detectedMood: CmdBekMood = (data?.mood as CmdBekMood) || 'laughing';
      setAdminCmdMood(detectedMood);
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setAdminCmdMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          sender: 'cmdbek',
          text: reply,
          mood: detectedMood,
          time: replyTime,
        },
      ]);
      speakBoyVoiceAdmin(reply);
    } catch {
      setAdminCmdMood('oops');
    } finally {
      setAdminCmdLoading(false);
    }
  };

  // Admin Streak Warning & Custom Message Sender State
  const [msgTargetStudentId, setMsgTargetStudentId] = useState<string>(students[0]?.id || 'all');
  const [msgTitle, setMsgTitle] = useState<string>('⚠️ Kunlik Streak Ogohlantirishi!');
  const [msgBody, setMsgBody] = useState<string>(
    'Siz bugun 1 kunlik streakni o‘tkazib yubordingiz! Reytingda pastga tushmaslik uchun darhol kamida 1 ta darsni yakunlang.'
  );
  const [msgType, setMsgType] = useState<'streak_warning' | 'admin_notice'>('streak_warning');
  const [inspectingStudent, setInspectingStudent] = useState<Student | null>(null);

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

  // Admin Action Audit Log
  const [auditLogs, setAuditLogs] = useState<{ id: string; action: string; time: string; admin: string }[]>([
    {
      id: 'log-1',
      action: `Yagona Markaziy Baza (${getActiveBackendName().toUpperCase()}) barcha kompyuterlar uchun ulandi`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      admin: `${currentUser?.name || OWNER_PROFILE.name} (${currentUser?.role === 'sub_admin' ? "O'rinbosar" : 'Admin'})`,
    },
  ]);

  const recordAdminAction = (actionText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setAuditLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random()}`,
        action: actionText,
        time,
        admin: `${currentUser?.name || OWNER_PROFILE.name} (${currentUser?.role === 'sub_admin' ? "O'rinbosar" : 'Admin'})`,
      },
      ...prev.slice(0, 14),
    ]);
    setDbStatusAlert(actionText);
  };

  const triggerRefresh = () => {
    setGeneratedTestsList([...getGeneratedTests()]);
    setFeedbackReports([...getFeedbackReports()]);
    setSubAdminsList([...getSubAdmins()]);
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
            {onEnterAsStudent && (
              <button
                onClick={onEnterAsStudent}
                className="duo-btn duo-btn-gold px-4 py-2 text-xs shadow-lg shadow-[#ffd23f]/30"
                title="Podiumda #1 o'rinda cheksiz XP va cheksiz Tanga bilan o'quvchi sifatida kirish (faqat sizning ekraningizda ko'rinadi)"
              >
                <Crown className="w-4 h-4" />
                <span>👑 O&apos;quvchi Sifatida Kirish (Podium #1 · ∞ XP · ∞ 🪙)</span>
              </button>
            )}

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
        {/* Left Sidebar Menu (17-Bo'limli Admin Labirint Boshqaruv Markazi) */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="aurora-card p-4 space-y-1.5">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#ffd23f] px-2 pb-1">
              Admin Labirint Markazi (17 Bo&apos;lim)
            </p>
            <button
              onClick={() => setActiveTab('control_center')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'control_center'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Sliders className="w-4 h-4 shrink-0" />
              <span>1. Shaxsiy Boshqaruv Pulti</span>
            </button>

            <button
              onClick={() => setActiveTab('streak_messenger')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'streak_messenger'
                  ? 'bg-gradient-to-r from-[#ff8a3d] to-[#ffd23f] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Flame className="w-4 h-4 shrink-0" />
              <span>2. Streak &amp; Xabar Yuborish</span>
            </button>

            <button
              onClick={() => setActiveTab('online_radar')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'online_radar'
                  ? 'bg-gradient-to-r from-[#22c55e] to-[#3ee6c4] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Wifi className="w-4 h-4 shrink-0" />
              <span>3. Online / Offline Radar</span>
            </button>

            <button
              onClick={() => setActiveTab('economy_boosters')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'economy_boosters'
                  ? 'bg-gradient-to-r from-[#b6f03c] to-[#3ee6c4] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>4. 100 Do&apos;kon, Potion &amp; Ramka</span>
            </button>

            <button
              onClick={() => setActiveTab('pvp_league')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'pvp_league'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ffd23f] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Swords className="w-4 h-4 shrink-0" />
              <span>5. PvP &amp; AI Liga Nazorati</span>
            </button>

            <button
              onClick={() => setActiveTab('database_management')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'database_management'
                  ? 'bg-gradient-to-r from-[#3ee6c4] to-[#17b897] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Database className="w-4 h-4 shrink-0" />
              <span>6. Baza &amp; Jadval Boshqaruvi</span>
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff9f1c] text-[#2b1d00] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>7. Talabalar Diagrammasi</span>
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-gradient-to-r from-[#b6f03c] to-[#3ee6c4] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>8. Ustozlar ({teachers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-gradient-to-r from-[#ff8a3d] to-[#ffd23f] text-[#2b1d00] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>9. Test Natijalari ({testSubmissions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('youtube')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'youtube'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff4d6d] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Youtube className="w-4 h-4 shrink-0" />
              <span>10. YouTube Darsliklar</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback_inbox')}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'feedback_inbox'
                  ? 'bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Bug className="w-4 h-4 shrink-0" />
                <span>11. Xabarlar (Bug &amp; Takliflar)</span>
              </span>
              {feedbackReports.length > 0 && (
                <span className="px-2 py-0.5 rounded-lg bg-[#ff6b86]/25 text-[#ffd23f] text-[10px] font-black">
                  {feedbackReports.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('sub_admins')}
              className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'sub_admins'
                  ? 'bg-gradient-to-r from-[#3ee6c4] to-[#ffd23f] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>12. O&apos;rinbosar Adminlar</span>
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-white/10 text-[10px] font-black">
                {subAdminsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('cmdbek_ai_lab')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'cmdbek_ai_lab'
                  ? 'bg-gradient-to-r from-[#a855f7] via-[#ff6b86] to-[#ffd23f] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Bot className="w-4 h-4 shrink-0" />
              <span>13. CMDbek Hazilkash AI</span>
            </button>

            <button
              onClick={() => {
                const latest = getLegendAdminStudentProfile();
                setLegendProfile(latest);
                setLegendName(latest.name || 'Jasur');
                setLegendSurname(latest.surname || 'Sultonov (Admin)');
                setLegendUsername(latest.username || 'admin_podium_1');
                setLegendAge(latest.age || 21);
                setLegendBio(latest.bio || '');
                setLegendFrame(latest.equippedFrame || 'frame-diamond-prism');
                setLegendBadge(latest.equippedBadge || 'LEGEND 💎');
                setActiveTab('legend_podium_config');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'legend_podium_config'
                  ? 'bg-gradient-to-r from-[#ffd23f] via-[#3ee6c4] to-[#ff6b86] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Crown className="w-4 h-4 shrink-0" />
              <span>14. 👑 LEGEND Podium Profili</span>
            </button>

            <button
              onClick={() => setActiveTab('promo_and_awards')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'promo_and_awards'
                  ? 'bg-gradient-to-r from-[#b6f03c] to-[#ffd23f] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>15. 🎁 Ommaviy Bonus &amp; Diplom</span>
            </button>

            <button
              onClick={() => setActiveTab('security_inspector')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'security_inspector'
                  ? 'bg-gradient-to-r from-[#3ee6c4] to-[#ff6b86] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Shield className="w-4 h-4 shrink-0" />
              <span>16. 🛡️ Parol &amp; Xavfsizlik</span>
            </button>

            <button
              onClick={() => {
                const cfg = getGlobalCmdBekVoiceConfig();
                setActiveVoiceConfig(cfg);
                setCustomPitch(cfg.pitch || 0.96);
                setCustomRate(cfg.rate || 1.03);
                setActiveTab('cmdbek_voice_studio');
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === 'cmdbek_voice_studio'
                  ? 'bg-gradient-to-r from-[#3ee6c4] via-[#ffd23f] to-[#ff6b86] text-[#0a0912] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100 border border-[#3ee6c4]/35'
              }`}
            >
              <Volume2 className="w-4 h-4 shrink-0" />
              <span>17. 🔊 CMDbek Ovozini Tanlash</span>
            </button>
          </div>

          <div
            onClick={() => setActiveTab('cmdbek_ai_lab')}
            title="CMDbek AI bilan suhbatlashish uchun bosing"
            className="aurora-card p-5 text-center space-y-2 cursor-pointer hover:border-[#3ee6c4] hover:scale-[1.01] transition-all"
          >
            <CmdBekMascot mood={adminCmdMood} size={76} className="mx-auto" />
            <h4 className="text-sm font-black text-[#3ee6c4]">CMDbek AI (Ustiga bosing!)</h4>
            <p className="text-xs opacity-70">
              Bug &amp; Takliflar, O&apos;rinbosar Adminlar, Ish Taqsimoti, Podium #1 Kirish va CMDbek AI to&apos;liq nazoratda.
            </p>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* NEW TAB 11: BUG & SUGGESTION FEEDBACK INBOX (FROM LANDING PAGE) */}
          {activeTab === 'feedback_inbox' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 space-y-5 border-[#ff6b86]/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center">
                      <Bug className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black">
                        Xabarlar: Bosh Sahifadan Kelgan Bug (Xatolik) va Takliflar ({feedbackReports.length})
                      </h3>
                      <p className="text-xs opacity-70">
                        Foydalanuvchilar yuborgan xatoliklar (1-2 kun ichida) va takliflar (3-4 kun ichida) rasm/video fayllari bilan shu yerda saqlanadi
                      </p>
                    </div>
                  </div>
                </div>

                {feedbackReports.length === 0 ? (
                  <div className="p-10 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
                    <Lightbulb className="w-10 h-10 text-[#ffd23f] mx-auto opacity-80" />
                    <p className="text-sm font-black">Hozircha yangi Bug yoki Taklif kelib tushmagan</p>
                    <p className="text-xs opacity-65">
                      Bosh sahifa pastidagi &quot;Xatoliklar yoki G&apos;oyalarni Kiritish&quot; formasi orqali yuborilgan xabarlar shu yerda paydo bo&apos;ladi.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedbackReports.map((rep) => (
                      <div
                        key={rep.id}
                        className={`p-5 rounded-3xl border space-y-4 ${
                          rep.type === 'bug'
                            ? 'bg-[#ff6b86]/10 border-[#ff6b86]/35'
                            : 'bg-[#3ee6c4]/10 border-[#3ee6c4]/35'
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`px-3 py-1 rounded-xl text-[11px] font-black uppercase ${
                                  rep.type === 'bug'
                                    ? 'bg-[#ff6b86] text-white'
                                    : 'bg-[#3ee6c4] text-[#052922]'
                                }`}
                              >
                                {rep.type === 'bug' ? '🐞 Bug / Xatolik (1-2 kun)' : '💡 Taklif / G\'oya (3-4 kun)'}
                              </span>
                              <span className="text-sm font-black">
                                {rep.firstName} {rep.lastName}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-lg bg-black/30 border border-white/10 text-xs font-mono text-[#ffd23f]">
                                📞 / ✉️ {rep.contact}
                              </span>
                              <span className="text-[11px] opacity-60">{rep.createdAt}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-wrap">
                            <select
                              value={rep.status}
                              onChange={(e) => {
                                updateFeedbackReport(rep.id, {
                                  status: e.target.value as 'new' | 'in_progress' | 'resolved',
                                });
                                setFeedbackReports(getFeedbackReports());
                                recordAdminAction(`${rep.firstName} murojaati holati yangilandi.`);
                              }}
                              className="aurora-input !py-1.5 !px-3 !w-auto text-xs font-bold"
                            >
                              <option value="new">🆕 Yangi</option>
                              <option value="in_progress">⏳ Ko&apos;rib chiqilmoqda</option>
                              <option value="resolved">✅ Hal qilindi</option>
                            </select>

                            <select
                              value={rep.assignedAdminId || ''}
                              onChange={(e) => {
                                const foundSa = subAdminsList.find((s) => s.id === e.target.value);
                                updateFeedbackReport(rep.id, {
                                  assignedAdminId: e.target.value || undefined,
                                  assignedAdminName: foundSa ? `${foundSa.name} ${foundSa.surname}` : undefined,
                                });
                                setFeedbackReports(getFeedbackReports());
                                recordAdminAction(`Murojaat o'rinbosar adminga biriktirildi.`);
                              }}
                              className="aurora-input !py-1.5 !px-3 !w-auto text-xs"
                            >
                              <option value="">👤 O&apos;rinbosarga biriktirish...</option>
                              {subAdminsList.map((sa) => (
                                <option key={sa.id} value={sa.id}>
                                  {sa.name} {sa.surname} ({sa.roleTitle})
                                </option>
                              ))}
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                deleteFeedbackReport(rep.id);
                                setFeedbackReports(getFeedbackReports());
                                recordAdminAction(`${rep.firstName} murojaati o'chirildi.`);
                              }}
                              className="p-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 cursor-pointer"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm leading-relaxed bg-black/25 p-4 rounded-2xl border border-white/10">
                          {rep.message}
                        </p>

                        {rep.mediaUrl && (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold opacity-75 block">
                              📎 Biriktirilgan media ({rep.mediaName || rep.mediaType}):
                            </span>
                            {rep.mediaType === 'video' ? (
                              <video
                                src={rep.mediaUrl}
                                controls
                                className="max-h-64 rounded-2xl border border-white/15 bg-black"
                              />
                            ) : (
                              <img
                                src={rep.mediaUrl}
                                alt="Bug media"
                                className="max-h-64 rounded-2xl border border-white/15 object-contain bg-black/40"
                              />
                            )}
                          </div>
                        )}

                        {rep.adminReply && (
                          <div className="p-3.5 rounded-2xl bg-[#ffd23f]/15 border border-[#ffd23f]/40 text-xs">
                            <span className="font-black text-[#ffd23f] block mb-1">
                              Admin / O&apos;rinbosar Javobi:
                            </span>
                            <p>{rep.adminReply}</p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={replyDrafts[rep.id] || ''}
                            onChange={(e) =>
                              setReplyDrafts((prev: Record<string, string>) => ({ ...prev, [rep.id]: e.target.value }))
                            }
                            placeholder={`${rep.firstName} uchun javob yoki izoh yozing (tel/gmail: ${rep.contact})...`}
                            className="aurora-input flex-1 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const replyText = (replyDrafts[rep.id] || '').trim();
                              if (!replyText) return;
                              updateFeedbackReport(rep.id, {
                                adminReply: replyText,
                                status: 'resolved',
                              });
                              setFeedbackReports(getFeedbackReports());
                              setReplyDrafts((prev: Record<string, string>) => ({ ...prev, [rep.id]: '' }));
                              recordAdminAction(
                                `${rep.firstName} (${rep.contact}) murojaatiga javob saqlandi!`
                              );
                            }}
                            className="duo-btn duo-btn-mint px-4 py-2 text-xs shrink-0"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Javobni Saqlash</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NEW TAB 12: SUB-ADMINS (O'RINBOSAR ADMINLAR) & TASK DELEGATION */}
          {activeTab === 'sub_admins' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 space-y-5 border-[#3ee6c4]/40">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">
                      O&apos;rinbosar Adminlar Yaratish va Ish Taqsimoti ({subAdminsList.length})
                    </h3>
                    <p className="text-xs opacity-70">
                      Bosh admin o&apos;ziga yordamchi o&apos;rinbosar adminlar qo&apos;shishi va ularga vazifa taqsimlashi mumkin (masalan: biriga Baza nazorati, boshqasiga Bug &amp; Takliflarga javob berish)
                    </p>
                  </div>
                </div>

                {/* Add Sub-Admin Form */}
                <form
                  onSubmit={handleCreateSubAdmin}
                  className="p-5 rounded-3xl bg-white/5 border border-white/10 space-y-4"
                >
                  <h4 className="text-sm font-black text-[#ffd23f] flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    <span>Yangi O&apos;rinbosar Admin Qo&apos;shish</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={subName}
                      onChange={(e) => setSubName(e.target.value)}
                      placeholder="Ismi (masalan: Sardor)"
                      required
                      className="aurora-input text-xs"
                    />
                    <input
                      type="text"
                      value={subSurname}
                      onChange={(e) => setSubSurname(e.target.value)}
                      placeholder="Familiyasi (masalan: Karimov)"
                      className="aurora-input text-xs"
                    />
                    <input
                      type="text"
                      value={subRoleTitle}
                      onChange={(e) => setSubRoleTitle(e.target.value)}
                      placeholder="Lavozimi (masalan: Bug & Baza O'rinbosari)"
                      className="aurora-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={subUsername}
                      onChange={(e) => setSubUsername(e.target.value)}
                      placeholder="Kirish Login / Username"
                      required
                      className="aurora-input text-xs font-mono"
                    />
                    <input
                      type="text"
                      value={subPassword}
                      onChange={(e) => setSubPassword(e.target.value)}
                      placeholder="Kirish Paroli"
                      required
                      className="aurora-input text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold opacity-80 block mb-2">
                      Biriktiriladigan Bo&apos;limlar (Ish Taqsimoti):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          { id: 'database', label: '🗄️ Baza & Jadval Boshqaruvi' },
                          { id: 'feedback_bugs', label: '🐞 Bug & Takliflarga Javob Berish' },
                          { id: 'economy_shop', label: '🛒 Do\'kon, Potion & Tanga' },
                          { id: 'pvp_league', label: '⚔️ PvP & AI Liga Nazorati' },
                          { id: 'students_teachers', label: '👨‍🏫 Talabalar & Ustozlar' },
                          { id: 'streak_messages', label: '🔥 Streak & Xabarlar' },
                          { id: 'cmdbek_ai', label: '🤖 CMDbek AI Nazorati' },
                        ] as { id: SubAdminDepartment; label: string }[]
                      ).map((dep) => {
                        const active = subPermissions.includes(dep.id);
                        return (
                          <button
                            key={dep.id}
                            type="button"
                            onClick={() => handleToggleSubAdminDept(dep.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                              active
                                ? 'bg-[#3ee6c4]/25 border-[#3ee6c4] text-[#3ee6c4]'
                                : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100'
                            }`}
                          >
                            {active ? '✓ ' : '+ '}
                            {dep.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <button type="submit" className="duo-btn duo-btn-mint px-5 py-2.5 text-xs">
                    <UserPlus className="w-4 h-4" />
                    <span>O&apos;rinbosar Adminni Yaratish va Ish Biriktirish</span>
                  </button>
                </form>

                {/* List of Sub-Admins and Their Assigned Tasks */}
                <div className="space-y-4">
                  {subAdminsList.map((sa) => (
                    <div
                      key={sa.id}
                      className="p-5 rounded-3xl bg-black/25 border border-white/15 space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-black text-white">
                              {sa.name} {sa.surname}
                            </h4>
                            <span className="px-2.5 py-0.5 rounded-lg bg-[#ffd23f]/20 text-[#ffd23f] text-[11px] font-black">
                              {sa.roleTitle}
                            </span>
                          </div>
                          <p className="text-xs opacity-70 font-mono mt-0.5">
                            Login: <strong className="text-[#3ee6c4]">{sa.username}</strong> • Parol:{' '}
                            <strong className="text-[#ff8a3d]">{sa.password}</strong>
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            deleteSubAdmin(sa.id);
                            setSubAdminsList(getSubAdmins());
                            recordAdminAction(`O'rinbosar admin ${sa.name} o'chirildi.`);
                          }}
                          className="duo-btn duo-btn-coral px-3 py-1.5 text-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>O&apos;chirish</span>
                        </button>
                      </div>

                      {/* Assigned Departments */}
                      <div className="flex flex-wrap gap-1.5">
                        {sa.permissions.map((d: SubAdminDepartment) => (
                          <span
                            key={d}
                            className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[11px] font-bold text-[#3ee6c4]"
                          >
                            📌 Bo&apos;lim: {d.toUpperCase()}
                          </span>
                        ))}
                      </div>

                      {/* Tasks List */}
                      <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-wider opacity-75 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5 text-[#ffd23f]" />
                          <span>Biriktirilgan Vazifalar ({sa.assignedTasks.length}):</span>
                        </p>
                        {sa.assignedTasks.map((task) => (
                          <div
                            key={task.id}
                            className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => {
                                  toggleSubAdminTask(sa.id, task.id);
                                  setSubAdminsList(getSubAdmins());
                                }}
                                className="w-4 h-4 accent-[#3ee6c4] cursor-pointer"
                              />
                              <div>
                                <p
                                  className={`font-bold ${
                                    task.completed ? 'line-through opacity-50' : ''
                                  }`}
                                >
                                  {task.title}
                                </p>
                                <span className="text-[10px] opacity-60">
                                  Bo&apos;lim: {task.department} • {task.createdAt}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black ${
                                task.completed
                                  ? 'bg-[#3ee6c4]/20 text-[#3ee6c4]'
                                  : 'bg-[#ffd23f]/20 text-[#ffd23f]'
                              }`}
                            >
                              {task.completed ? 'Bajarildi' : 'Jarayonda'}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Add New Task to This Sub-Admin */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-white/10">
                        <select
                          value={taskDeptDrafts[sa.id] || 'feedback_bugs'}
                          onChange={(e) =>
                            setTaskDeptDrafts((prev: Record<string, SubAdminDepartment>) => ({
                              ...prev,
                              [sa.id]: e.target.value as SubAdminDepartment,
                            }))
                          }
                          className="aurora-input !py-2 !px-3 sm:!w-52 text-xs"
                        >
                          <option value="database">🗄️ Baza Boshqaruvi</option>
                          <option value="feedback_bugs">🐞 Bug &amp; Takliflar</option>
                          <option value="economy_shop">🛒 Do&apos;kon &amp; Tanga</option>
                          <option value="pvp_league">⚔️ PvP Liga</option>
                          <option value="students_teachers">👨‍🏫 Talabalar &amp; Ustozlar</option>
                          <option value="streak_messages">🔥 Streak &amp; Xabarlar</option>
                        </select>
                        <input
                          type="text"
                          value={taskTitleDrafts[sa.id] || ''}
                          onChange={(e) =>
                            setTaskTitleDrafts((prev: Record<string, string>) => ({ ...prev, [sa.id]: e.target.value }))
                          }
                          placeholder={`${sa.name}ga yangi topshiriq yozing (masalan: Buglarga javob yoz va bazani tekshir)...`}
                          className="aurora-input flex-1 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const title = (taskTitleDrafts[sa.id] || '').trim();
                            if (!title) return;
                            const dept = taskDeptDrafts[sa.id] || 'feedback_bugs';
                            assignSubAdminTask(sa.id, title, dept);
                            setSubAdminsList(getSubAdmins());
                            setTaskTitleDrafts((prev: Record<string, string>) => ({ ...prev, [sa.id]: '' }));
                            recordAdminAction(`${sa.name}ga yangi vazifa yuklatildi: "${title}"`);
                          }}
                          className="duo-btn duo-btn-gold px-4 py-2 text-xs shrink-0"
                        >
                          + Vazifa Yuklash
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB 13: CMDBEK HUMOROUS AI LAB IN ADMIN PANEL */}
          {activeTab === 'cmdbek_ai_lab' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 space-y-5 border-[#a855f7]/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <CmdBekMascot mood={adminCmdMood} size={76} />
                    <div>
                      <h3 className="text-lg font-black flex items-center gap-2">
                        <span>CMDbek &amp; Google Gemini — Adminning Hazilkash AI Yordamchisi</span>
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#3ee6c4]/20 text-[#3ee6c4] text-[10px] font-black">
                          Google Gemini + 13 Hissiyot + Hazillar + O&apos;g&apos;il Bola Ovozi
                        </span>
                      </h3>
                      <p className="text-xs opacity-75 mt-1">
                        Xohlagan savolingizga Google Gemini yordamida hazil-mutoyiba bilan javob beradi va ravon o&apos;zbek o&apos;g&apos;il bola ovozida gapiradi (iqtisodiy va diniy mavzulardan tashqari)!
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cmdbek_voice_studio')}
                    className="duo-btn duo-btn-mint text-xs shrink-0 flex items-center gap-2 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 CMDbek Ovozini O&apos;zgartirish</span>
                  </button>
                </div>

                {/* Emotion Preview Switcher (All 13 Sticker Emotions) */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#ffd23f] block">
                    CMDbekning Barcha 13 ta Hissiyot Holatlari (Bosib sinab ko&apos;ring):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(
                      [
                        { id: 'idle', label: '😊 Oddiy' },
                        { id: 'happy', label: '😄 Xursand' },
                        { id: 'hello', label: '👋 Qo\'l ko\'targan' },
                        { id: 'celebrating', label: '🎉 Salyut' },
                        { id: 'angry', label: '😡 Jahli chiqqan' },
                        { id: 'laughing', label: '😂 Qahqaha (Kulgan)' },
                        { id: 'thinking', label: '🤔 O\'ylanayotgan' },
                        { id: 'speaking', label: '🗣️ Gapirayotgan' },
                        { id: 'surprised', label: '😲 Hayron' },
                        { id: 'cool', label: '😎 Krutoy' },
                        { id: 'coding', label: '💻 Kod yozayotgan' },
                        { id: 'sleepy', label: '😴 Uyqusiragan' },
                        { id: 'oops', label: '😅 Oops / Xato' },
                      ] as { id: CmdBekMood; label: string }[]
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setAdminCmdMood(m.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                          adminCmdMood === m.id
                            ? 'bg-gradient-to-r from-[#ff6b86] to-[#ffd23f] text-[#0a0912] border-transparent shadow-md'
                            : 'bg-white/5 border-white/10 opacity-75 hover:opacity-100'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-80 overflow-y-auto p-4 rounded-3xl bg-black/35 border border-white/10 space-y-3">
                  {adminCmdMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white font-bold'
                            : 'bg-white/10 border border-white/15 text-white'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {adminCmdLoading && (
                    <div className="text-xs text-[#ffd23f] font-bold animate-pulse">
                      🤔 CMDbek hazil o&apos;ylab javob tayyorlamoqda...
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <form onSubmit={handleSendAdminCmdChat} className="flex gap-2">
                  <input
                    type="text"
                    value={adminCmdInput}
                    onChange={(e) => setAdminCmdInput(e.target.value)}
                    placeholder="CMDbekdan istalgan narsani so'rang (hazil, sayt holati, talabalar yoki oldingi suhbatingiz)..."
                    className="aurora-input flex-1 text-xs sm:text-sm"
                  />
                  <button
                    type="submit"
                    disabled={adminCmdLoading}
                    className="duo-btn duo-btn-gold px-5 py-2.5 text-xs shrink-0"
                  >
                    <Send className="w-4 h-4" />
                    <span>Yuborish</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* NEW TAB 2: STREAK WARNING & PROFILE INBOX MESSENGER */}
          {activeTab === 'streak_messenger' && (
            <div className="space-y-6">
              <div className="aurora-card p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ff8a3d]/20 text-[#ff8a3d] flex items-center justify-center">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black">
                      Kunlik Streak Ogohlantirishi va Profil Xabarlari Yuborish
                    </h3>
                    <p className="text-xs opacity-70">
                      1 kunlik streak ololmay qolgan o&apos;quvchining Profil sahifasidagi Xabarlar qutisiga ogohlantirish yuborish
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!msgTitle.trim() || !msgBody.trim()) return;
                    if (msgTargetStudentId === 'all') {
                      students.forEach((st) => {
                        sendAdminMessageToStudent({
                          studentId: st.id,
                          title: msgTitle.trim(),
                          text: msgBody.trim(),
                          type: msgType,
                        });
                      });
                      recordAdminAction(
                        `Barcha ${students.length} nafar o'quvchi profiliga "${msgTitle}" xabari yuborildi!`
                      );
                    } else {
                      const target = students.find((s) => s.id === msgTargetStudentId) || students[0];
                      if (target) {
                        sendAdminMessageToStudent({
                          studentId: target.id,
                          title: msgTitle.trim(),
                          text: msgBody.trim(),
                          type: msgType,
                        });
                        recordAdminAction(
                          `${target.name} ${target.surname} profiliga "${msgTitle}" xabari yuborildi!`
                        );
                      }
                    }
                    triggerRefresh();
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Qabul qiluvchi o&apos;quvchi:</label>
                      <select
                        value={msgTargetStudentId}
                        onChange={(e) => setMsgTargetStudentId(e.target.value)}
                        className="aurora-input py-2 text-xs font-bold"
                      >
                        <option value="all">📢 Barcha O&apos;quvchilarga ({students.length} nafar)</option>
                        {students.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} {s.surname} (@{s.username} — Streak: {Math.max(1, (s.completedLessons?.length || 0) + 1)} kun)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold mb-1">Xabar turi:</label>
                      <select
                        value={msgType}
                        onChange={(e) =>
                          setMsgType(e.target.value as 'streak_warning' | 'admin_notice')
                        }
                        className="aurora-input py-2 text-xs font-bold"
                      >
                        <option value="streak_warning">🔥 Kunlik Streak Ogohlantirishi</option>
                        <option value="admin_notice">🔔 Rasmiy Admin Xabari</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Xabar sarlavhasi:</label>
                    <input
                      type="text"
                      value={msgTitle}
                      onChange={(e) => setMsgTitle(e.target.value)}
                      className="aurora-input py-2 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Xabar matni (O&apos;quvchi profilida chiqadi):</label>
                    <textarea
                      rows={3}
                      value={msgBody}
                      onChange={(e) => setMsgBody(e.target.value)}
                      className="aurora-input py-2 text-xs"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMsgType('streak_warning');
                        setMsgTitle('🔥 1 Kunlik Streak Uzilish Xavfi!');
                        setMsgBody(
                          'Diqqat! Siz bugun 1 kunlik streakni ololmay qoldingiz. Darhol O‘quv sahifasiga kirib kamida 1 ta darsni yakunlang!'
                        );
                      }}
                      className="duo-btn duo-btn-surface text-xs !py-2 !px-3"
                    >
                      Shablon 1: Streak uzildi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMsgType('admin_notice');
                        setMsgTitle('🏆 Liga PvP Bellashuviga Taklif!');
                        setMsgBody(
                          'Asosiy -> Liga bo‘limida 30 savollik PvP bellashuvda qatnashib +30 XP va +2 Tanga yutib oling!'
                        );
                      }}
                      className="duo-btn duo-btn-surface text-xs !py-2 !px-3"
                    >
                      Shablon 2: PvP Liga chorlovi
                    </button>
                  </div>

                  <button type="submit" className="duo-btn duo-btn-coral w-full py-3 text-xs sm:text-sm">
                    <Bell className="w-4 h-4" />
                    <span>O&apos;quvchi Profiliga Xabarni Yuborish</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* NEW TAB 3: ONLINE / OFFLINE RADAR & PUBLIC PROFILE INSPECTOR */}
          {activeTab === 'online_radar' && (
            <div className="aurora-card p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-[#22c55e]" />
                    <span>Online / Offline Tarmoq Radari va Profil Inspektor</span>
                  </h3>
                  <p className="text-xs opacity-70">
                    O&apos;quvchining rasmiga bossangiz, uning Telegram uslubidagi profili ochiladi. Holatni Online (yashil) yoki Offline (qizil) qilish mumkin.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((st) => {
                  const isOn = st.isOnline !== false;
                  return (
                    <div
                      key={st.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => setInspectingStudent(st)}
                      >
                        <AvatarWithFrame
                          src={st.avatar || MALE_PROGRAMMER_AVATAR}
                          alt={st.name}
                          size={54}
                          frameId={st.equippedFrame}
                          stage={st.stage}
                          equippedBadge={st.equippedBadge}
                          isOnline={isOn}
                          onClick={() => setInspectingStudent(st)}
                        />
                        <div>
                          <h4 className="font-bold text-sm hover:text-[#3ee6c4] transition-colors">
                            {st.name} {st.surname}
                          </h4>
                          <p className="text-xs font-mono opacity-75">@{st.username}</p>
                          <span
                            className={`text-[11px] font-mono font-bold ${
                              isOn ? 'text-[#22c55e]' : 'text-[#ef4444]'
                            }`}
                          >
                            ● {isOn ? 'Online (Tarmoqda)' : 'Offline (Uzilgan)'}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            updateStudent(st.id, { isOnline: !isOn });
                            triggerRefresh();
                            recordAdminAction(
                              `${st.name} holati ${!isOn ? 'ONLINE (Yashil)' : 'OFFLINE (Qizil)'} qilindi.`
                            );
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer flex items-center gap-1.5 ${
                            isOn
                              ? 'bg-[#ef4444]/20 text-[#ef4444]'
                              : 'bg-[#22c55e]/20 text-[#22c55e]'
                          }`}
                        >
                          {isOn ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                          <span>{isOn ? 'Offline qilish' : 'Online qilish'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setInspectingStudent(st)}
                          className="px-3 py-1.5 rounded-xl bg-white/10 text-xs font-bold cursor-pointer"
                        >
                          Profilini ko&apos;rish
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* NEW TAB 4: 1.5x XP POTION, 1-MIN BOOST & ORNATE FRAMES / STICKERS CONTROLLER */}
          {activeTab === 'economy_boosters' && (
            <div className="aurora-card p-6 space-y-5">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#ffd23f]" />
                  <span>1.5x XP Potion, 1-Min XP Boost, Koi Ramka va Stiker Boshqaruvi</span>
                </h3>
                <p className="text-xs opacity-70">
                  Talabalarga Koi Baliq kosmik ramkasi, LEGEND stikeri, 1.5x XP Potion yoki 1-daqiqalik (+2 XP/sek) Boost berish
                </p>
              </div>

              <div className="space-y-3">
                {students.map((st) => (
                  <div
                    key={st.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <AvatarWithFrame
                        src={st.avatar || MALE_PROGRAMMER_AVATAR}
                        alt={st.name}
                        size={52}
                        frameId={st.equippedFrame}
                        stage={st.stage}
                        equippedBadge={st.equippedBadge}
                        isOnline={st.isOnline !== false}
                        onClick={() => setInspectingStudent(st)}
                      />
                      <div>
                        <h4 className="font-bold text-sm">
                          {st.name} {st.surname}{' '}
                          <span className="text-xs font-mono text-[#3ee6c4]">@{st.username}</span>
                        </h4>
                        <p className="text-[11px] font-mono opacity-75">
                          Potion: {st.xpPotionActive ? '🧪 1.5x FAOL' : "Yo'q"} · Ramka:{' '}
                          {st.equippedFrame || 'standart'} · Stiker: {st.equippedBadge || st.stage.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateStudent(st.id, { xpPotionActive: !st.xpPotionActive });
                          triggerRefresh();
                          recordAdminAction(
                            `${st.name} uchun 1.5x XP Potion ${!st.xpPotionActive ? 'yoqildi' : "o'chirildi"}!`
                          );
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#b6f03c]/20 text-[#b6f03c] text-xs font-bold cursor-pointer"
                      >
                        🧪 {st.xpPotionActive ? 'Potion O‘chirish' : '1.5x Potion Yoqish'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          updateStudent(st.id, { xpBoostUntil: Date.now() + 60 * 1000 });
                          triggerRefresh();
                          recordAdminAction(`${st.name}ga 1-Min XP Boost (+2 XP/sek) berildi!`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#3ee6c4]/20 text-[#3ee6c4] text-xs font-bold cursor-pointer flex items-center gap-1"
                      >
                        <Timer className="w-3.5 h-3.5" />
                        <span>1-Min Boost (+2 XP/s)</span>
                      </button>

                      <select
                        value={st.equippedFrame || 'frame-aurora-coral'}
                        onChange={(e) => {
                          updateStudent(st.id, { equippedFrame: e.target.value });
                          triggerRefresh();
                          recordAdminAction(`${st.name} ramkasi "${e.target.value}" ga o'zgartirildi!`);
                        }}
                        className="aurora-input py-1.5 px-2.5 text-xs font-bold w-auto"
                      >
                        {ORNATE_SHOP_FRAMES.map((fr) => (
                          <option key={fr.id} value={fr.id}>
                            Ramka: {fr.title}
                          </option>
                        ))}
                      </select>

                      <select
                        value={st.equippedBadge || 'HTML POYDEVOR'}
                        onChange={(e) => {
                          updateStudent(st.id, { equippedBadge: e.target.value });
                          triggerRefresh();
                          recordAdminAction(`${st.name} burchak stikeri "${e.target.value}" qilindi!`);
                        }}
                        className="aurora-input py-1.5 px-2.5 text-xs font-bold w-auto"
                      >
                        <option value="HTML POYDEVOR">Stiker: HTML</option>
                        <option value="CSS DIZAYN">Stiker: CSS</option>
                        <option value="JS NINJA">Stiker: JS</option>
                        <option value="LEGEND 💎">Stiker: LEGEND 💎</option>
                        <option value="PRO KING 👑">Stiker: PRO 👑</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NEW TAB 5: PVP & AI LEAGUE MONITOR */}
          {activeTab === 'pvp_league' && (
            <div className="aurora-card p-6 space-y-5">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <Swords className="w-5 h-5 text-[#ff6b86]" />
                  <span>Liga (PvP &amp; With AI — 30 Savol) Natijalari va Boshqaruvi</span>
                </h3>
                <p className="text-xs opacity-70">
                  G&apos;alaba qozonganga +30 XP / +2 Coin, mag&apos;lub bo&apos;lganga -30 XP / -2 Coin qo&apos;llash
                </p>
              </div>

              <div className="space-y-3">
                {students.map((st) => (
                  <div
                    key={st.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <h4 className="font-bold text-sm">
                        {st.name} {st.surname} (@{st.username} · {st.stage.toUpperCase()})
                      </h4>
                      <p className="text-xs font-mono opacity-75">
                        G&apos;alabalar: <strong className="text-[#3ee6c4]">{st.pvpWins || 0}</strong> ·
                        Mag&apos;lubiyatlar: <strong className="text-[#ff6b86]">{st.pvpLosses || 0}</strong> ·
                        Balans: {st.xp} XP / {Number(st.coins ?? 0).toFixed(1)} 🪙
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          recordLeagueBattleResult({
                            studentId: st.id,
                            won: true,
                            opponentName: 'Admin Qarori',
                            mode: 'pvp',
                            myScore: 30,
                            opponentScore: 0,
                          });
                          triggerRefresh();
                          recordAdminAction(`${st.name}ga PvP G'alaba (+30 XP, +2 Coin) yozildi!`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#3ee6c4]/20 text-[#3ee6c4] text-xs font-bold cursor-pointer"
                      >
                        🏆 +30 XP / +2 🪙 (G&apos;alaba)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          recordLeagueBattleResult({
                            studentId: st.id,
                            won: false,
                            opponentName: 'Admin Qarori',
                            mode: 'pvp',
                            myScore: 0,
                            opponentScore: 30,
                          });
                          triggerRefresh();
                          recordAdminAction(`${st.name}ga PvP Mag'lubiyat (-30 XP, -2 Coin) yozildi!`);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#ff6b86]/20 text-[#ff6b86] text-xs font-bold cursor-pointer"
                      >
                        ⚔️ -30 XP / -2 🪙 (Mag&apos;lubiyat)
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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

          {/* TAB 14: 👑 LEGEND PODIUM PROFILE CUSTOMIZER */}
          {activeTab === 'legend_podium_config' && (
            <div className="aurora-card p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-[#3ee6c4] uppercase">
                    BO&apos;LIM 14 · PODIUM CHO&apos;QQISI BOSHQARUVI
                  </span>
                  <h3 className="text-xl font-black flex items-center gap-2 mt-0.5">
                    <Crown className="w-6 h-6 text-[#ffd23f]" />
                    <span>👑 LEGEND Podium Profili (1-O&apos;rindan Ham Tepada)</span>
                  </h3>
                  <p className="text-xs opacity-75 mt-1">
                    Dashboarddagi Podiumning eng cho&apos;qqisida (1-o&apos;rindan ham yuqorida) turuvchi va hech kim o&apos;ta olmaydigan Admin O&apos;quvchi profilini sozlang.
                  </p>
                </div>

                {onEnterAsStudent && (
                  <button
                    type="button"
                    onClick={onEnterAsStudent}
                    className="duo-btn duo-btn-gold text-xs shrink-0"
                  >
                    <Crown className="w-4 h-4" />
                    <span>Hoziroq Shu Profilda Kirish</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Live Podium Card Preview */}
                <div className="lg:col-span-5 rounded-3xl p-6 text-center space-y-3 border-2 border-[#3ee6c4] bg-gradient-to-b from-[#3ee6c4]/15 via-[#181529] to-[#ffd23f]/15 shadow-[0_0_35px_rgba(62,230,196,0.25)] flex flex-col items-center">
                  <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-[#ffd23f] to-[#3ee6c4] text-[#0a0912] font-mono text-[10px] font-black">
                    👑 LEGEND · HECH KIM O&apos;TA OLMAYDI
                  </span>
                  <AvatarWithFrame
                    src={legendProfile.avatar || MALE_PROGRAMMER_AVATAR}
                    alt={legendName}
                    size={92}
                    frameId={legendFrame}
                    stage="fullstack"
                    equippedBadge={legendBadge}
                    isOnline={true}
                  />
                  <div>
                    <h4 className="font-display text-lg font-black text-white">
                      {legendName} {legendSurname}
                    </h4>
                    <p className="text-xs font-mono text-[#3ee6c4]">@{legendUsername}</p>
                    <p className="text-[11px] opacity-80 mt-1">{legendBio}</p>
                  </div>
                  <div className="w-full py-2 px-3 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] font-mono text-xs font-black">
                    ⚡ ∞ XP · 🪙 ∞ TANGA
                  </div>
                </div>

                {/* Form to customize the Legend Profile */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const updated = saveLegendAdminStudentProfile({
                      name: legendName.trim() || 'Jasur',
                      surname: legendSurname.trim() || 'Sultonov (Admin)',
                      username: legendUsername.trim().toLowerCase() || 'admin_podium_1',
                      age: Number(legendAge) || 21,
                      bio: legendBio.trim(),
                      equippedFrame: legendFrame,
                      equippedBadge: legendBadge,
                    });
                    setLegendProfile(updated);
                    triggerRefresh();
                    recordAdminAction(
                      `👑 LEGEND Podium profili ("${updated.name} ${updated.surname}") yangilandi!`
                    );
                  }}
                  className="lg:col-span-7 space-y-3.5 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Legend Ismi</label>
                      <input
                        type="text"
                        required
                        value={legendName}
                        onChange={(e) => setLegendName(e.target.value)}
                        className="aurora-input py-2 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Legend Familiyasi</label>
                      <input
                        type="text"
                        required
                        value={legendSurname}
                        onChange={(e) => setLegendSurname(e.target.value)}
                        className="aurora-input py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Username (@login)</label>
                      <input
                        type="text"
                        required
                        value={legendUsername}
                        onChange={(e) => setLegendUsername(e.target.value)}
                        className="aurora-input py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Yoshi</label>
                      <input
                        type="number"
                        min={7}
                        max={99}
                        value={legendAge}
                        onChange={(e) => setLegendAge(Number(e.target.value))}
                        className="aurora-input py-2 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Legend Bio (Podium ostida chiqadi)</label>
                    <input
                      type="text"
                      value={legendBio}
                      onChange={(e) => setLegendBio(e.target.value)}
                      className="aurora-input py-2 text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Maxsus Ramka</label>
                      <select
                        value={legendFrame}
                        onChange={(e) => setLegendFrame(e.target.value)}
                        className="aurora-input py-2 text-xs font-bold"
                      >
                        {ORNATE_SHOP_FRAMES.map((fr) => (
                          <option key={fr.id} value={fr.id}>
                            {fr.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Maxsus Stiker</label>
                      <select
                        value={legendBadge}
                        onChange={(e) => setLegendBadge(e.target.value)}
                        className="aurora-input py-2 text-xs font-bold"
                      >
                        <option value="LEGEND 💎">LEGEND 💎</option>
                        <option value="PRO KING 👑">PRO KING 👑</option>
                        <option value="FULLSTACK 🚀">FULLSTACK 🚀</option>
                        <option value="AI MASTER 🤖">AI MASTER 🤖</option>
                        <option value="CYBER BOSS ⚡">CYBER BOSS ⚡</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="duo-btn duo-btn-mint w-full py-2.5 text-xs">
                    <Check className="w-4 h-4" />
                    <span>👑 LEGEND Podium Profilini Saqlash</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 15: 🎁 OMMAVIY BONUS, BROADCAST E'LON VA TEZKOR SERTIFIKAT BERISH */}
          {activeTab === 'promo_and_awards' && (
            <div className="space-y-6">
              {/* 1. Mass XP & Coin Airdrop + Broadcast Message */}
              <div className="aurora-card p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-[#ffd23f] uppercase">
                    BO&apos;LIM 15A · OMMAVIY MUKOFOT VA E&apos;LON
                  </span>
                  <h3 className="text-lg font-black flex items-center gap-2 mt-0.5">
                    <Sparkles className="w-5 h-5 text-[#ffd23f]" />
                    <span>Barcha O&apos;quvchilarga Bir Vaqtda XP, Tanga va Xabar Yuborish</span>
                  </h3>
                  <p className="text-xs opacity-75">
                    Bir tugma bilan barcha {students.length} nafar talabaga mukofot va bildirishnoma yuboring.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const count = broadcastRewardToStudents({
                      targetStage: 'all',
                      xpBonus: Number(broadcastXp) || 0,
                      coinBonus: Number(broadcastCoins) || 0,
                      enablePotion: false,
                      messageTitle: broadcastTitle.trim() || '🎁 Admin Mukofoti',
                      messageText: broadcastText.trim(),
                    });
                    triggerRefresh();
                    recordAdminAction(
                      `🎁 Barcha ${count} nafar o'quvchiga +${broadcastXp} XP va +${broadcastCoins} tanga tarqatildi!`
                    );
                  }}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold mb-1">Qo&apos;shiladigan XP (+)</label>
                      <input
                        type="number"
                        min={0}
                        max={5000}
                        value={broadcastXp}
                        onChange={(e) => setBroadcastXp(Number(e.target.value))}
                        className="aurora-input py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Qo&apos;shiladigan Tanga (🪙 +)</label>
                      <input
                        type="number"
                        min={0}
                        step="0.5"
                        max={500}
                        value={broadcastCoins}
                        onChange={(e) => setBroadcastCoins(Number(e.target.value))}
                        className="aurora-input py-2 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold mb-1">Xabar Sarlavhasi</label>
                      <input
                        type="text"
                        value={broadcastTitle}
                        onChange={(e) => setBroadcastTitle(e.target.value)}
                        className="aurora-input py-2 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Xabar Matni (Har bir o&apos;quvchi profiliga tushadi)</label>
                    <input
                      type="text"
                      value={broadcastText}
                      onChange={(e) => setBroadcastText(e.target.value)}
                      className="aurora-input py-2 text-xs"
                    />
                  </div>

                  <button type="submit" className="duo-btn duo-btn-gold w-full py-2.5 text-xs">
                    <Send className="w-4 h-4" />
                    <span>
                      Barcha {students.length} Nafar Talabaga +{broadcastXp} XP va +{broadcastCoins} 🪙 Yuborish
                    </span>
                  </button>
                </form>
              </div>

              {/* 2. Instant Official Certificate Issuer */}
              <div className="aurora-card p-6 space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-extrabold text-[#3ee6c4] uppercase">
                    BO&apos;LIM 15B · RASMIY DIPLOM VA SERTIFIKAT GENERATORI
                  </span>
                  <h3 className="text-lg font-black flex items-center gap-2 mt-0.5">
                    <Award className="w-5 h-5 text-[#3ee6c4]" />
                    <span>Talabaga Rasmiy QR-Kodli Sertifikat Taqdim Etish</span>
                  </h3>
                  <p className="text-xs opacity-75">
                    Tanlangan talabaga imtihonsiz to&apos;g&apos;ridan-to&apos;g&apos;ri rasmiy PDF sertifikat va bildirishnoma yuboring.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end text-xs">
                  <div>
                    <label className="block font-bold mb-1">Talabani Tanlang</label>
                    <select
                      value={certTargetStudentId}
                      onChange={(e) => setCertTargetStudentId(e.target.value)}
                      className="aurora-input py-2 text-xs font-bold"
                    >
                      {students.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} {st.surname} (@{st.username})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold mb-1">Sertifikat Yo&apos;nalishi</label>
                    <select
                      value={certType}
                      onChange={(e) =>
                        setCertType(
                          e.target.value as 'frontend' | 'backend' | 'fullstack'
                        )
                      }
                      className="aurora-input py-2 text-xs font-bold uppercase"
                    >
                      <option value="frontend">Frontend Master Sertifikati</option>
                      <option value="backend">Backend &amp; SQL Architect Sertifikati</option>
                      <option value="fullstack">Full-Stack Faxriy Diplom</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const st = students.find((s) => s.id === certTargetStudentId) || students[0];
                      if (!st) return;
                      const cert = issueInstantCertificateToStudent(st.id, certType);
                      triggerRefresh();
                      if (cert) {
                        recordAdminAction(
                          `🎓 ${st.name} ${st.surname}ga "${cert.title}" (${cert.id}) sertifikati berildi!`
                        );
                      }
                    }}
                    className="duo-btn duo-btn-mint py-2.5 text-xs"
                  >
                    <Award className="w-4 h-4" />
                    <span>Sertifikatni Rasmiylashtirish</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 16: 🛡️ PAROL, LOGIN VA XAVFSIZLIK NAZORATI */}
          {activeTab === 'security_inspector' && (
            <div className="aurora-card p-6 space-y-5">
              <div>
                <span className="text-[11px] font-mono font-extrabold text-[#ff6b86] uppercase">
                  BO&apos;LIM 16 · XAVFSIZLIK VA PAROLLAR NAZORATI
                </span>
                <h3 className="text-lg font-black flex items-center gap-2 mt-0.5">
                  <Shield className="w-5 h-5 text-[#ff6b86]" />
                  <span>Talabalar Login, Parol va Bosqichlarini Tezkor Boshqarish</span>
                </h3>
                <p className="text-xs opacity-75">
                  Parolini unutgan o&apos;quvchilarning login/parollarini ko&apos;rish, yangi parol o&apos;rnatish yoki bosqichini bir klikda ko&apos;tarish.
                </p>
              </div>

              <div className="space-y-3">
                {students.map((st) => (
                  <div
                    key={st.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">
                          {st.name} {st.surname}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-[#3ee6c4]/20 text-[#3ee6c4] font-mono font-bold">
                          Login: @{st.username}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-[#ffd23f]/20 text-[#ffd23f] font-mono font-bold">
                          Joriy Parol: {st.password || 'student123'}
                        </span>
                      </div>
                      <p className="opacity-70 font-mono text-[11px]">
                        Email: {st.email || 'kiritilmagan'} · Tel: {st.phone || 'kiritilmagan'} · Bosqich: {st.stage.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        placeholder="Yangi parol yozing..."
                        value={securityPassDrafts[st.id] || ''}
                        onChange={(e) =>
                          setSecurityPassDrafts((prev) => ({
                            ...prev,
                            [st.id]: e.target.value,
                          }))
                        }
                        className="aurora-input py-1.5 px-3 text-xs font-mono w-40"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const nextPass = (securityPassDrafts[st.id] || '').trim() || '123456';
                          updateStudent(st.id, { password: nextPass });
                          setSecurityPassDrafts((prev) => ({ ...prev, [st.id]: '' }));
                          triggerRefresh();
                          recordAdminAction(
                            `🔐 ${st.name} (@${st.username}) paroli "${nextPass}" ga yangilandi!`
                          );
                        }}
                        className="duo-btn duo-btn-mint py-1.5 px-3 text-xs"
                      >
                        Parolni Yangilash
                      </button>

                      <select
                        value={st.stage}
                        onChange={(e) => {
                          const nextStage = e.target.value as CourseStage;
                          updateStudent(st.id, { stage: nextStage });
                          triggerRefresh();
                          recordAdminAction(
                            `🚀 ${st.name} bosqichi ${nextStage.toUpperCase()} ga o'zgartirildi!`
                          );
                        }}
                        className="aurora-input py-1.5 px-2.5 text-xs font-bold uppercase w-auto"
                      >
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="typescript">TypeScript</option>
                        <option value="react">React</option>
                        <option value="backend">Backend</option>
                        <option value="database">SQL</option>
                        <option value="fullstack">Fullstack</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 17: 🔊 CMDBEK OVOZINI TANLASH VA BARCHA UCHUN YAGONA OVOZ QILISH STUDIYASI */}
          {activeTab === 'cmdbek_voice_studio' && (
            <div className="space-y-6">
              {/* Top Active Global Voice Card */}
              <div className="aurora-card p-6 space-y-5 border-2 border-[#3ee6c4]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <CmdBekMascot
                      mood={previewingVoiceId ? 'speaking' : 'happy'}
                      size={74}
                    />
                    <div>
                      <span className="text-[11px] font-mono font-extrabold text-[#3ee6c4] uppercase">
                        BO&apos;LIM 17 · YAGONA PLATFORM OVOZI STUDIYASI
                      </span>
                      <h3 className="text-xl font-black flex items-center gap-2 mt-0.5">
                        <Volume2 className="w-6 h-6 text-[#ffd23f]" />
                        <span>🔊 CMDbek Ovozini Eshitib Tanlash (Hamma Uchun Yagona Ovoz)</span>
                      </h3>
                      <p className="text-xs opacity-75 mt-1">
                        Quyidagi ovozlardan xohlaganingizni eshitib ko&apos;ring va ma&apos;qul bo&apos;lganini tanlang — tanlangan ovoz barcha o&apos;quvchilar va ustozlar uchun yagona o&apos;zgarmas ovozga aylanadi!
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 flex-wrap">
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewingVoiceId('current-active');
                        const previewCfg: CmdBekVoiceConfig = {
                          ...activeVoiceConfig,
                          pitch: customPitch,
                          rate: customRate,
                          edgePitchHz:
                            customPitch !== activeVoiceConfig.pitch
                              ? undefined
                              : activeVoiceConfig.edgePitchHz,
                          edgeRatePct:
                            customRate !== activeVoiceConfig.rate
                              ? undefined
                              : activeVoiceConfig.edgeRatePct,
                        };
                        previewVoiceConfig(voiceSampleText, previewCfg, {
                          onStart: () => setPreviewingVoiceId('current-active'),
                          onEnd: () => setPreviewingVoiceId(null),
                        });
                      }}
                      className="duo-btn duo-btn-mint text-xs cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Joriy Ovozni Eshitish</span>
                    </button>

                    {(customPitch !== activeVoiceConfig.pitch ||
                      customRate !== activeVoiceConfig.rate) && (
                      <button
                        type="button"
                        onClick={() => {
                          const updatedCfg: CmdBekVoiceConfig = {
                            ...activeVoiceConfig,
                            pitch: customPitch,
                            rate: customRate,
                            edgePitchHz: `${
                              Math.round((customPitch - 1.0) * 80) >= 0 ? '+' : ''
                            }${Math.round((customPitch - 1.0) * 80)}Hz`,
                            edgeRatePct: `${
                              Math.round((customRate - 1.0) * 100) >= 0 ? '+' : ''
                            }${Math.round((customRate - 1.0) * 100)}%`,
                          };
                          const saved = saveGlobalCmdBekVoiceConfig(updatedCfg);
                          setActiveVoiceConfig(saved);
                          recordAdminAction(
                            `🔊 "${saved.shortName || saved.label}" ovoz tembri (${customPitch}) va tezligi (${customRate}x) saqlandi!`
                          );
                        }}
                        className="duo-btn duo-btn-gold text-xs cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Tembr va Tezlikni Saqlash</span>
                      </button>
                    )}

                    {previewingVoiceId && (
                      <button
                        type="button"
                        onClick={() => {
                          stopAllBoySpeech();
                          setPreviewingVoiceId(null);
                        }}
                        className="duo-btn duo-btn-coral text-xs cursor-pointer"
                      >
                        <span>⏹️ Ovozni To&apos;xtatish</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Current Active Global Voice Summary Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#3ee6c4]/15 via-[#181529] to-[#ffd23f]/15 border border-[#3ee6c4]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-extrabold text-[#ffd23f] uppercase block">
                      🌐 HOZIRDA BARCHA FOYDALANUVCHILAR UCHUN O&apos;RNATILGAN YAGONA OVOZ:
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <strong className="text-sm sm:text-base font-black text-white">
                        {activeVoiceConfig.label}
                      </strong>
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#3ee6c4] text-[#0a0912] font-mono text-xs font-black">
                        Til: {activeVoiceConfig.lang}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-white/10 font-mono text-xs font-bold">
                        Tembr (Pitch): {activeVoiceConfig.pitch} · Tezlik (Rate): {activeVoiceConfig.rate}x
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono opacity-75">
                    Yangilangan: {activeVoiceConfig.updatedAt}
                  </span>
                </div>

                {/* Test Sentence & Pitch / Rate Fine-Tuning Controls */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 border-t border-white/10">
                  <div className="lg:col-span-6 space-y-1.5">
                    <label className="text-xs font-bold block text-[#ffd23f]">
                      📝 Ovozlarni tekshirib eshitish uchun sinov jumlasi:
                    </label>
                    <input
                      type="text"
                      value={voiceSampleText}
                      onChange={(e) => setVoiceSampleText(e.target.value)}
                      placeholder="Sinab eshitish uchun xohlagan matningizni yozing..."
                      className="aurora-input py-2.5 text-xs"
                    />
                  </div>

                  <div className="lg:col-span-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Ovoz Tembri (Pitch):</span>
                      <span className="font-mono text-[#3ee6c4]">{customPitch.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min={0.55}
                      max={1.45}
                      step={0.02}
                      value={customPitch}
                      onChange={(e) => setCustomPitch(Number(e.target.value))}
                      className="w-full accent-[#3ee6c4] cursor-pointer"
                    />
                    <span className="text-[10px] opacity-65 block">
                      0.75 = Yo&apos;g&apos;onroq erkak · 0.96 = Tabiiy · 1.15 = Ingichkaroq
                    </span>
                  </div>

                  <div className="lg:col-span-3 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Gapirish Tezligi (Rate):</span>
                      <span className="font-mono text-[#ffd23f]">{customRate.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min={0.75}
                      max={1.4}
                      step={0.02}
                      value={customRate}
                      onChange={(e) => setCustomRate(Number(e.target.value))}
                      className="w-full accent-[#ffd23f] cursor-pointer"
                    />
                    <span className="text-[10px] opacity-65 block">
                      0.90x = Bosiq · 1.03x = Ravon standart · 1.20x = Tezkor
                    </span>
                  </div>
                </div>
              </div>

              {/* 1. All Named Multi-Voice Profiles (32 Distinct Voices with their Original Names) */}
              <div className="aurora-card p-6 space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono font-extrabold text-[#ffd23f] uppercase">
                      1-QISM · AVVALGI BARCHA KO&apos;P OVOZLI NOMLI OVOZLAR TO&apos;PLAMI ({CMDBEK_VOICE_PRESETS.length} TA HAR XIL OVOZ)
                    </span>
                    <h4 className="text-base sm:text-lg font-black mt-0.5">
                      Barcha Avvalgi Ovozlar (Nomi va O&apos;z Tembri Bilan) — Eshitib Ko&apos;ring va Yagona Ovoz Tanlang
                    </h4>
                    <p className="text-xs opacity-75 mt-0.5">
                      Har bir ovoz (Sardor, Madina, Davron, Nigora, Bekzod, Sevinch, Ahmet, Emel, Dmitry, Irina, Microsoft David, Microsoft Zira, Puck, Fenrir, Kore va boshqalar) o&apos;zining haqiqiy alohida ovozida gapiradi!
                    </p>
                  </div>

                  {/* Gender Filter Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(
                      [
                        { id: 'all', label: `Barchasi (${CMDBEK_VOICE_PRESETS.length})` },
                        {
                          id: 'male',
                          label: `👦 O'g'il Bola / Erkak (${
                            CMDBEK_VOICE_PRESETS.filter((p) => p.gender === 'male').length
                          })`,
                        },
                        {
                          id: 'female',
                          label: `👧 Qiz Bola / Ayol (${
                            CMDBEK_VOICE_PRESETS.filter((p) => p.gender === 'female').length
                          })`,
                        },
                        {
                          id: 'robot',
                          label: `🤖 Maxsus / Robot (${
                            CMDBEK_VOICE_PRESETS.filter((p) => p.gender === 'robot').length
                          })`,
                        },
                      ] as const
                    ).map((gf) => (
                      <button
                        key={gf.id}
                        type="button"
                        onClick={() => setPresetGenderFilter(gf.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                          presetGenderFilter === gf.id
                            ? 'bg-[#ffd23f] text-[#0a0912]'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {gf.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-2 flex-wrap border-b border-white/10 pb-3">
                  {(
                    [
                      { id: 'all', label: '🌐 Barcha Bo\'limlar (32 ta ovoz)' },
                      {
                        id: 'uz_tr',
                        label: "🇺🇿🇹🇷 O'zbek va Turkiy (Sardor, Madina, Davron, Nigora, Bekzod, Sevinch, Ahmet, Emel...)",
                      },
                      {
                        id: 'ru_cyrl',
                        label: "🇷🇺 Kirill / Rus-O'zbek (Dmitry, Pavel, Maxim, Irina, Svetlana)",
                      },
                      {
                        id: 'browser_classic',
                        label: '💻 Microsoft & Klassik (David, Zira, Mark, Daniel, Arthur, Oliver, Ruby)',
                      },
                      {
                        id: 'gemini_special',
                        label: '🤖 Gemini AI & Qahramonlar (Puck, Fenrir, Charon, Orus, Zephyr, Kore, Rocket, Stitch, C-3PO)',
                      },
                    ] as const
                  ).map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPresetCategoryFilter(cat.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                        presetCategoryFilter === cat.id
                          ? 'bg-[#3ee6c4] text-[#0a0912] shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-white/85'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {CMDBEK_VOICE_PRESETS.filter((preset) => {
                    if (presetCategoryFilter !== 'all' && preset.category !== presetCategoryFilter) {
                      return false;
                    }
                    if (presetGenderFilter !== 'all' && preset.gender !== presetGenderFilter) {
                      return false;
                    }
                    return true;
                  }).map((preset) => {
                    const isSelected =
                      activeVoiceConfig.id === preset.id ||
                      activeVoiceConfig.label === preset.label;
                    const isPreviewing = previewingVoiceId === preset.id;

                    return (
                      <div
                        key={preset.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                          isSelected
                            ? 'border-2 border-[#3ee6c4] bg-[#3ee6c4]/15 shadow-[0_0_25px_rgba(62,230,196,0.2)]'
                            : 'bg-white/5 border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-lg bg-[#ffd23f] text-[#0a0912] font-mono text-xs font-black">
                                {preset.shortName}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg font-mono text-[10px] font-bold ${
                                  preset.gender === 'female'
                                    ? 'bg-[#ff6b86]/25 text-[#ff6b86]'
                                    : preset.gender === 'robot'
                                      ? 'bg-purple-500/25 text-purple-300'
                                      : 'bg-[#3ee6c4]/20 text-[#3ee6c4]'
                                }`}
                              >
                                {preset.gender === 'female'
                                  ? '👧 Qiz bola / Ayol'
                                  : preset.gender === 'robot'
                                    ? '🤖 Maxsus / Robot'
                                    : "👦 O'g'il bola / Erkak"}
                              </span>
                            </div>

                            {isSelected && (
                              <span className="px-2.5 py-0.5 rounded-full bg-[#3ee6c4] text-[#0a0912] font-mono text-[10px] font-black shrink-0">
                                ✓ HOZIRGI YAGONA OVOZ
                              </span>
                            )}
                          </div>

                          <div className="font-bold text-xs sm:text-sm text-white">
                            {preset.label}
                          </div>

                          {preset.description && (
                            <p className="text-[11px] opacity-80 leading-relaxed">
                              {preset.description}
                            </p>
                          )}

                          <p className="text-[10px] font-mono opacity-65">
                            Til: {preset.lang} · Pitch: {preset.edgePitchHz || preset.pitch} · Tezlik:{' '}
                            {preset.edgeRatePct || `${preset.rate}x`} · Dvigatel:{' '}
                            {preset.engine === 'edge'
                              ? `Microsoft Azure Neural (${preset.edgeVoice})`
                              : preset.engine === 'google'
                                ? `Google Neural (${preset.googleLang})`
                                : preset.engine === 'tiktok'
                                  ? `Neural Studio (${preset.tiktokVoice})`
                                  : preset.engine === 'gemini'
                                    ? `Gemini (${preset.geminiVoiceName})`
                                    : `Brauzer (${preset.voiceKeyword || preset.shortName})`}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (isPreviewing) {
                                stopAllBoySpeech();
                                setPreviewingVoiceId(null);
                                return;
                              }
                              setPreviewingVoiceId(preset.id);
                              previewVoiceConfig(voiceSampleText, preset, {
                                onStart: () => setPreviewingVoiceId(preset.id),
                                onEnd: () => setPreviewingVoiceId(null),
                              });
                            }}
                            className="duo-btn duo-btn-surface flex-1 py-2 text-xs cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5 text-[#3ee6c4]" />
                            <span>
                              {isPreviewing
                                ? "⏹️ To'xtatish"
                                : `🔊 "${preset.shortName}"ni eshitish`}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              const saved = saveGlobalCmdBekVoiceConfig(preset);
                              setActiveVoiceConfig(saved);
                              setCustomPitch(saved.pitch);
                              setCustomRate(saved.rate);
                              recordAdminAction(
                                `🔊 CMDbek yagona ovozi barcha uchun "${saved.shortName} — ${saved.label}" ga o'zgartirildi!`
                              );
                            }}
                            className={`duo-btn flex-1 py-2 text-xs cursor-pointer ${
                              isSelected ? 'duo-btn-mint' : 'duo-btn-gold'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>{isSelected ? "✓ O'rnatilgan" : 'Hamma Uchun Tanlash'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. All Installed Browser / System Voices */}
              <div className="aurora-card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono font-extrabold text-[#3ee6c4] uppercase">
                      2-QISM · TIZIM VA BRAUZERDAGI BARCHA OVOZLAR ({browserVoicesList.length} TA TOPILDI)
                    </span>
                    <h4 className="text-base sm:text-lg font-black mt-0.5">
                      Xohlagan Ovozni Eshitib Ko&apos;rib, Yagona Ovoz Sifatida Tanlang
                    </h4>
                    <p className="text-xs opacity-75">
                      Tepadagi Tembr ({customPitch.toFixed(2)}) va Tezlik ({customRate.toFixed(2)}x) bilan istalgan ovozni eshitib ko&apos;ring va bir klikda barcha uchun saqlang.
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(
                      [
                        { id: 'all', label: `Barchasi (${browserVoicesList.length})` },
                        { id: 'uz_tr', label: "O'zbek / Turk" },
                        { id: 'ru', label: 'Rus' },
                        { id: 'en', label: 'Ingliz' },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setVoiceLangFilter(f.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
                          voiceLangFilter === f.id
                            ? 'bg-[#3ee6c4] text-[#0a0912]'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {browserVoicesList.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-white/5 text-center space-y-2 text-xs opacity-80">
                    <p>Brauzer ovozlar ro&apos;yxati yuklanmoqda yoki tizim ovozlari topilmadi.</p>
                    <button
                      type="button"
                      onClick={async () => {
                        const list = await getAllBrowserSpeechVoices();
                        setBrowserVoicesList(list);
                      }}
                      className="duo-btn duo-btn-mint py-2 px-4 text-xs mx-auto"
                    >
                      Ovozlarni Qayta Yuklash
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
                    {browserVoicesList
                      .filter((v) => {
                        const l = v.lang.toLowerCase();
                        if (voiceLangFilter === 'uz_tr') return l.includes('uz') || l.includes('tr');
                        if (voiceLangFilter === 'ru') return l.includes('ru');
                        if (voiceLangFilter === 'en') return l.includes('en');
                        return true;
                      })
                      .map((v, idx) => {
                        const voiceKey = `${v.voiceURI}-${idx}`;
                        const isCurrent =
                          activeVoiceConfig.voiceURI === v.voiceURI ||
                          activeVoiceConfig.voiceName === v.name;
                        const isPlayingThis = previewingVoiceId === voiceKey;

                        const candidateConfig: CmdBekVoiceConfig = {
                          id: `browser-voice-${idx}`,
                          shortName: v.name,
                          label: `${v.name} (${v.lang})`,
                          voiceURI: v.voiceURI,
                          voiceName: v.name,
                          lang: v.lang || 'uz-UZ',
                          pitch: customPitch,
                          rate: customRate,
                          engine: 'browser',
                          geminiVoiceName: 'Puck',
                          preferBrowserVoice: true,
                          updatedAt: new Date().toLocaleString(),
                        };

                        return (
                          <div
                            key={voiceKey}
                            className={`p-3.5 rounded-2xl border flex flex-col justify-between gap-3 transition-all ${
                              isCurrent
                                ? 'border-2 border-[#ffd23f] bg-[#ffd23f]/15'
                                : 'bg-white/5 border-white/10 hover:border-white/25'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h5 className="font-bold text-xs sm:text-sm truncate text-white">
                                  {v.name}
                                </h5>
                                <span className="text-[11px] font-mono text-[#3ee6c4] block">
                                  Til: {v.lang} · Pitch: {customPitch.toFixed(2)} · Tezlik: {customRate.toFixed(2)}x
                                </span>
                              </div>
                              {isCurrent && (
                                <span className="px-2 py-0.5 rounded-full bg-[#ffd23f] text-[#0a0912] font-mono text-[10px] font-black shrink-0">
                                  ✓ TANLANGAN
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (isPlayingThis) {
                                    stopAllBoySpeech();
                                    setPreviewingVoiceId(null);
                                    return;
                                  }
                                  setPreviewingVoiceId(voiceKey);
                                  previewVoiceConfig(voiceSampleText, candidateConfig, {
                                    onStart: () => setPreviewingVoiceId(voiceKey),
                                    onEnd: () => setPreviewingVoiceId(null),
                                  });
                                }}
                                className="duo-btn duo-btn-surface flex-1 py-2 text-xs cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5 text-[#3ee6c4]" />
                                <span>{isPlayingThis ? "⏹️ To'xtatish" : "🔊 Eshitib ko'rish"}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  const saved = saveGlobalCmdBekVoiceConfig(candidateConfig);
                                  setActiveVoiceConfig(saved);
                                  recordAdminAction(
                                    `🔊 CMDbek yagona ovozi barcha uchun "${v.name} (${v.lang})" ga o'rnatildi!`
                                  );
                                }}
                                className={`duo-btn flex-1 py-2 text-xs cursor-pointer ${
                                  isCurrent ? 'duo-btn-gold' : 'duo-btn-mint'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{isCurrent ? "O'rnatilgan" : 'Shu Ovozni Tanlash'}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
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

      {/* TELEGRAM-STYLE STUDENT PUBLIC PROFILE MODAL */}
      <StudentPublicProfileModal
        student={inspectingStudent}
        onClose={() => setInspectingStudent(null)}
        onOpenGroupChat={() => {
          setInspectingStudent(null);
          if (onOpenGroupChat) onOpenGroupChat('t-1');
        }}
      />
    </div>
  );
};
