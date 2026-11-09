import React, { useState } from 'react';
import {
  Users,
  Bell,
  Sparkles,
  MessageSquare,
  UserX,
  FileText,
  KeyRound,
  CheckCircle2,
  TrendingUp,
  Eye,
  AlertTriangle,
  Edit3,
  Check,
  X,
  BarChart3
} from 'lucide-react';
import { Teacher, Student, TeacherNotification, TestSubmissionResult, CourseStage } from '../types';
import { updateTeacherGroupName, getStudents, saveStudents } from '../services/storage';
import { AvatarBadge } from './AvatarBadge';
import { AuroraMascot } from './AuroraMascot';

interface TeacherViewProps {
  teacher: Teacher;
  students: Student[];
  notifications: TeacherNotification[];
  testSubmissions: TestSubmissionResult[];
  onOpenCreateTestModal: (student: Student, stage: CourseStage) => void;
  onOpenMessageModal: (student: Student) => void;
  onOpenExpelModal: (student: Student) => void;
  onOpenGroupChat: (teacherId: string) => void;
  onMarkNotificationRead: (id: string) => void;
  onUpdateGroupName?: (teacherId: string, groupName: string) => void;
}

export const TeacherView: React.FC<TeacherViewProps> = ({
  teacher,
  students,
  notifications,
  testSubmissions,
  onOpenCreateTestModal,
  onOpenMessageModal,
  onOpenExpelModal,
  onOpenGroupChat,
  onMarkNotificationRead,
  onUpdateGroupName,
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'analytics' | 'notifications' | 'submissions'>('students');
  const [selectedSubmissionForReview, setSelectedSubmissionForReview] = useState<TestSubmissionResult | null>(null);
  const [isEditingGroupName, setIsEditingGroupName] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState(teacher.groupName || `${teacher.name} Guruhi`);
  const [passwordStatusMsg, setPasswordStatusMsg] = useState<string | null>(null);

  const handleResetStudentPassword = (student: Student) => {
    const newPass = prompt(`${student.name} ${student.surname} uchun yangi parolni kiriting (kamida 6 ta belgi):`);
    if (newPass === null) return;
    if (newPass.trim().length < 6) {
      setPasswordStatusMsg("Xato: Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      setTimeout(() => setPasswordStatusMsg(null), 3000);
      return;
    }
    const allStudents = getStudents();
    const target = allStudents.find((s) => s.id === student.id);
    if (target) {
      target.password = newPass.trim();
      saveStudents(allStudents);
      setPasswordStatusMsg('Parol yangilandi');
      setTimeout(() => setPasswordStatusMsg(null), 3000);
    }
  };

  const handleSaveGroupName = () => {
    if (!groupNameInput.trim()) return;
    const trimmed = groupNameInput.trim();
    updateTeacherGroupName(teacher.id, trimmed);
    if (onUpdateGroupName) {
      onUpdateGroupName(teacher.id, trimmed);
    }
    setIsEditingGroupName(false);
  };

  // Bu ustozga biriktirilgan o'quvchilar
  const myStudents = students.filter((s) => s.teacherId === teacher.id);
  const sortedStudents = [...myStudents].sort((a, b) => b.xp - a.xp);
  const mySubmissions = testSubmissions.filter((sub) => sub.teacherId === teacher.id);
  const unreadNotifs = notifications.filter((n) => !n.read);
  const studentsNeedingTest = myStudents.filter((s) => s.stageCompletedPendingTest);

  const avgGroupMastery =
    myStudents.length > 0
      ? Math.round(
          myStudents.reduce(
            (sum, s) =>
              sum +
              (s.stage === 'graduated'
                ? 100
                : Math.min(100, Math.round(((s.completedLessons?.length || 0) / 15) * 100))),
            0
          ) / myStudents.length
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Teacher Profile Banner */}
      <div className="aurora-card p-6 sm:p-8 relative overflow-hidden border-[#ff6b86]/30">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#ff6b86]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#3ee6c4]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <AvatarBadge
              name={`${teacher.name} ${teacher.surname}`}
              role="teacher"
              size="xl"
              className="w-18 h-18 sm:w-20 sm:h-20 text-xl ring-4 ring-[#ff6b86]/40 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black">
                  {teacher.name} {teacher.surname}
                </h1>
                <span className="aurora-badge bg-[#ff6b86]/20 text-[#ff6b86] border border-[#ff6b86]/40">
                  <Sparkles className="w-3.5 h-3.5" /> Rasmiy Ustoz
                </span>
                <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] border border-[#ffd23f]/40">
                  ⭐️ {teacher.rating} Reyting
                </span>
              </div>
              <p className="text-sm text-[#3ee6c4] font-bold mt-1">{teacher.specialty}</p>
              <p className="text-xs opacity-75 mt-1 max-w-xl">{teacher.bio}</p>
            </div>
          </div>

          {/* Teacher Quick Stats */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl flex-wrap">
            <div className="text-center px-3 border-r border-white/10">
              <span className="text-2xl font-black font-mono text-[#3ee6c4]">{myStudents.length}</span>
              <span className="text-xs opacity-75 font-bold block">/ 15 O'quvchi</span>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <span className="text-2xl font-black font-mono text-[#ffd23f]">{avgGroupMastery}%</span>
              <span className="text-xs opacity-75 font-bold block">O'rtacha Foiz</span>
            </div>
            <div className="text-center px-2">
              <button
                onClick={() => onOpenGroupChat(teacher.id)}
                className="duo-btn duo-btn-mint px-4 py-2.5 text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Guruh Chati</span>
              </button>
            </div>
          </div>
        </div>

        {/* Guruh Nomi Sozlamasi */}
        <div className="mt-5 pt-4 border-t border-white/10 relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center font-black shrink-0 border border-[#3ee6c4]/30">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] opacity-60 uppercase font-extrabold block">
                Guruh Nomi (15 Talaba guruhi):
              </span>
              {isEditingGroupName ? (
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="text"
                    value={groupNameInput}
                    onChange={(e) => setGroupNameInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSaveGroupName();
                      }
                    }}
                    placeholder="Masalan: Aurora Yulduzlari"
                    className="aurora-input py-1.5 px-3 text-xs w-52"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveGroupName}
                    className="duo-btn duo-btn-mint p-2 text-xs"
                    title="Saqlash"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setGroupNameInput(teacher.groupName || `${teacher.name} Guruhi`);
                      setIsEditingGroupName(false);
                    }}
                    className="duo-btn duo-btn-surface p-2 text-xs"
                    title="Bekor qilish"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <span className="text-sm font-black text-[#3ee6c4] flex items-center gap-2">
                  {teacher.groupName || `${teacher.name} Guruhi`}
                </span>
              )}
            </div>
          </div>

          {!isEditingGroupName && (
            <button
              onClick={() => setIsEditingGroupName(true)}
              className="duo-btn duo-btn-surface px-3.5 py-2 text-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#ffd23f]" />
              <span>Guruh nomini o'zgartirish</span>
            </button>
          )}
        </div>
      </div>

      {/* Alert banner if any student completed stage and needs test */}
      {studentsNeedingTest.length > 0 && (
        <div className="aurora-card p-5 border-[#ffd23f]/60 bg-gradient-to-r from-[#ffd23f]/15 via-transparent to-[#ff8a3d]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] flex items-center justify-center shrink-0 border border-[#ffd23f]/40 animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#ffd23f]">
                Diqqat! {studentsNeedingTest.length} nafar o'quvchingiz bosqichni yakunladi va test kutmoqda!
              </h4>
              <p className="text-xs opacity-80">
                Ular uchun darhol Test ID generatsiya qiling va guruh chatida e'lon qiling.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {studentsNeedingTest.map((st) => (
              <button
                key={st.id}
                onClick={() => onOpenCreateTestModal(st, st.stageCompletedPendingTest || st.stage)}
                className="duo-btn duo-btn-gold px-3.5 py-2 text-xs"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>{st.name}ga test berish</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar + Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-3">
          <div className="aurora-card p-4 space-y-2">
            <p className="text-[11px] font-black uppercase tracking-wider opacity-50 px-2 pb-1">
              Ustoz Paneli
            </p>
            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>15 O'quvchi Guruhim</span>
              <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full bg-black/20">
                {myStudents.length}
              </span>
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
              <span>O'rtacha Foiz Diagrammasi</span>
            </button>

            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'notifications'
                  ? 'bg-gradient-to-r from-[#ffd23f] to-[#ff9f1c] text-[#2b1d00] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>Bildirishnomalar</span>
              {unreadNotifs.length > 0 && (
                <span className="ml-auto px-2 py-0.5 rounded-full bg-[#ff6b86] text-white text-[11px] font-black">
                  {unreadNotifs.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('submissions')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                activeTab === 'submissions'
                  ? 'bg-gradient-to-r from-[#b6f03c] to-[#3ee6c4] text-[#052922] shadow-lg'
                  : 'hover:bg-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Test Natijalari</span>
              <span className="ml-auto font-mono text-xs px-2 py-0.5 rounded-full bg-black/20">
                {mySubmissions.length}
              </span>
            </button>
          </div>
        </aside>

        {/* Main Panel */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: 15 O'QUVCHI RO'YXATI */}
          {activeTab === 'students' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <span>Guruh O'quvchilari Ro'yxati</span>
                    <span className="aurora-badge bg-[#ff6b86]/15 text-[#ff6b86] font-mono">
                      {myStudents.length} / 15 nafar
                    </span>
                  </h3>
                  <p className="text-xs opacity-70">
                    O'quvchilar ro'yxatdan o'tganda sizga random tarzda biriktiriladi.
                  </p>
                </div>
                <button
                  onClick={() => onOpenGroupChat(teacher.id)}
                  className="duo-btn duo-btn-surface px-4 py-2 text-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#3ee6c4]" />
                  <span>Guruhga Xabar Yozish</span>
                </button>
              </div>

              {passwordStatusMsg && (
                <div className="p-3 rounded-2xl bg-[#3ee6c4]/15 border border-[#3ee6c4]/40 text-[#3ee6c4] text-xs font-bold">
                  {passwordStatusMsg}
                </div>
              )}

              {myStudents.length === 0 ? (
                <div className="aurora-card p-12 text-center space-y-3">
                  <AuroraMascot mood="waving" size={96} className="mx-auto" />
                  <h4 className="text-base font-black">Hozircha biriktirilgan talabalar yo'q</h4>
                  <p className="text-xs opacity-70 max-w-md mx-auto">
                    Yangi talabalar ro'yxatdan o'tganda tizim ularni random tarzda sizning guruhingizga qo'shadi (maksimal 15 tagacha).
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sortedStudents.map((student, index) => {
                    const needsTest = Boolean(student.stageCompletedPendingTest);
                    const pct =
                      student.stage === 'graduated'
                        ? 100
                        : Math.min(100, Math.round((student.completedLessons.length / 15) * 100));

                    return (
                      <div
                        key={student.id}
                        className={`aurora-card p-5 flex flex-col justify-between transition-all ${
                          needsTest ? 'border-[#ffd23f] ring-2 ring-[#ffd23f]/30' : ''
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <AvatarBadge
                                  name={`${student.name} ${student.surname}`}
                                  role="student"
                                  size="md"
                                  className="w-12 h-12 text-sm ring-2 ring-[#ff6b86]/40"
                                />
                                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#141225] border border-white/20 text-[10px] font-black font-mono text-[#ffd23f] flex items-center justify-center">
                                  #{index + 1}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-sm font-black leading-tight">
                                  {student.name} {student.surname}
                                </h4>
                                <p className="text-[11px] opacity-70 mt-0.5 font-mono">{student.phone}</p>
                                <span className="text-[10px] opacity-55 block">
                                  Faol: {student.lastActive}
                                </span>
                              </div>
                            </div>

                            <span className="aurora-badge bg-[#ff6b86]/15 text-[#ff6b86] border border-[#ff6b86]/30 uppercase font-mono">
                              {student.stage}
                            </span>
                          </div>

                          {/* XP & Progress Info */}
                          <div className="mt-4 grid grid-cols-3 gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 text-center text-xs">
                            <div>
                              <span className="text-[10px] opacity-60 block uppercase font-bold">XP Balli</span>
                              <span className="text-sm font-black font-mono text-[#3ee6c4] flex items-center justify-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5" />
                                {student.xp}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] opacity-60 block uppercase font-bold">Reyting</span>
                              <span className="text-sm font-black font-mono text-[#ffd23f]">
                                #{student.rank}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] opacity-60 block uppercase font-bold">Darslar</span>
                              <span className="text-sm font-black font-mono text-[#ff8a3d]">
                                {student.completedLessons.length} ta
                              </span>
                            </div>
                          </div>

                          {/* O'zlashtirish foizi progress bari */}
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
                              <span className="opacity-70">O'zlashtirish foizi:</span>
                              <span className="text-[#3ee6c4] font-black font-mono">{pct}%</span>
                            </div>
                            <div className="aurora-progress-track h-2.5">
                              <div
                                className="aurora-progress-fill"
                                style={{ width: `${Math.max(4, pct)}%` }}
                              />
                            </div>
                          </div>

                          {/* Status indicator */}
                          <div className="mt-3">
                            {needsTest ? (
                              <div className="px-3 py-2 rounded-xl bg-[#ffd23f]/15 border border-[#ffd23f]/40 text-[#ffd23f] text-xs flex items-center gap-2 font-bold">
                                <AlertTriangle className="w-4 h-4 shrink-0" />
                                <span>
                                  {student.stageCompletedPendingTest?.toUpperCase()} bosqichini tugatdi! Test berish shart!
                                </span>
                              </div>
                            ) : (
                              <div className="px-3 py-2 rounded-xl bg-white/5 text-xs opacity-75 flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#3ee6c4]" />
                                <span>Darslarni o'rganmoqda ({student.stage.toUpperCase()})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <button
                            onClick={() => onOpenCreateTestModal(student, student.stageCompletedPendingTest || student.stage)}
                            className={`duo-btn px-2 py-2 text-xs ${
                              needsTest ? 'duo-btn-gold' : 'duo-btn-coral'
                            }`}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Test berish</span>
                          </button>

                          <button
                            onClick={() => onOpenMessageModal(student)}
                            className="duo-btn duo-btn-surface px-2 py-2 text-xs"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-[#3ee6c4]" />
                            <span>Xabar</span>
                          </button>

                          <button
                            onClick={() => handleResetStudentPassword(student)}
                            className="duo-btn duo-btn-surface px-2 py-2 text-xs text-[#ffd23f]"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            <span>Parolni tiklash</span>
                          </button>

                          <button
                            onClick={() => onOpenExpelModal(student)}
                            className="duo-btn duo-btn-surface px-2 py-2 text-xs text-[#ff6b86]"
                          >
                            <UserX className="w-3.5 h-3.5" />
                            <span>Chetlatish</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: O'RTACHA FOIZ DIAGRAMMASI */}
          {activeTab === 'analytics' && (
            <div className="aurora-card p-6 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-lg font-black flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#3ee6c4]" />
                    <span>Guruh O'quvchilarining O'rtacha Foizi Diagrammasi</span>
                  </h3>
                  <p className="text-xs opacity-70">
                    Har bir o'quvchining darslarni o'zlashtirish ko'rsatkichi (%)
                  </p>
                </div>
                <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4] font-mono">
                  Guruh o'rtachasi: {avgGroupMastery}%
                </span>
              </div>

              {myStudents.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <AuroraMascot mood="thinking" size={84} className="mx-auto" />
                  <p className="text-sm font-bold opacity-70">Guruhda hali o'quvchilar yo'q</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sortedStudents.map((st) => {
                    const pct =
                      st.stage === 'graduated'
                        ? 100
                        : Math.min(100, Math.round((st.completedLessons.length / 15) * 100));
                    return (
                      <div key={st.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span>
                            {st.name} {st.surname} ({st.stage.toUpperCase()})
                          </span>
                          <span className="font-mono text-[#ffd23f]">{pct}% ({st.xp} XP)</span>
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
          )}

          {/* TAB 3: BILDIRISHNOMALAR */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <span>Ustoz Bildirishnomalari va Xabarlari</span>
                  {unreadNotifs.length > 0 && (
                    <span className="aurora-badge bg-[#ff6b86]/20 text-[#ff6b86]">
                      {unreadNotifs.length} ta yangi
                    </span>
                  )}
                </h3>
                <p className="text-xs opacity-70">
                  Talabalar bosqichni tamomlaganda test so'rovlari shu yerda ko'rinadi.
                </p>
              </div>

              {notifications.length === 0 ? (
                <div className="aurora-card p-12 text-center space-y-3">
                  <AuroraMascot mood="happy" size={84} className="mx-auto" />
                  <p className="text-sm font-bold opacity-75">Hozircha hech qanday bildirishnoma yo'q</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => {
                    const targetStudent = students.find((s) => s.id === notif.studentId);
                    return (
                      <div
                        key={notif.id}
                        className={`aurora-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                          !notif.read ? 'border-[#ff6b86]' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-11 h-11 rounded-2xl bg-[#ffd23f]/20 text-[#ffd23f] flex items-center justify-center shrink-0 border border-[#ffd23f]/30">
                            <KeyRound className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] uppercase">
                                {notif.stage} Bosqichi yakunlandi
                              </span>
                              <span className="text-xs opacity-50 font-mono">
                                {new Date(notif.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-sm font-black mt-1">{notif.message}</p>
                            <p className="text-xs opacity-75">
                              Talaba: <span className="text-[#3ee6c4] font-bold">{notif.studentName}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                          {targetStudent && (
                            <>
                              <button
                                onClick={() => {
                                  onMarkNotificationRead(notif.id);
                                  onOpenCreateTestModal(targetStudent, notif.stage);
                                }}
                                className="duo-btn duo-btn-coral px-3.5 py-2 text-xs"
                              >
                                <KeyRound className="w-3.5 h-3.5" />
                                <span>Test berish</span>
                              </button>

                              <button
                                onClick={() => onOpenMessageModal(targetStudent)}
                                className="duo-btn duo-btn-surface px-3 py-2 text-xs"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-[#3ee6c4]" />
                                <span>Xabar</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: TOPSHIRILGAN TESTLAR NATIJASI */}
          {activeTab === 'submissions' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#3ee6c4]" />
                  <span>O'quvchilar Topshirgan Test Natijalari</span>
                </h3>
                <p className="text-xs opacity-70">
                  Test topshirilgach uning bir martalik ID si bazadan o'chiriladi, natijalar esa ko'rib chiqish uchun saqlanadi.
                </p>
              </div>

              {mySubmissions.length === 0 ? (
                <div className="aurora-card p-12 text-center space-y-3">
                  <AuroraMascot mood="thinking" size={88} className="mx-auto" />
                  <p className="text-sm font-bold opacity-75">Hozircha hech kim test topshirmagan</p>
                </div>
              ) : (
                <div className="aurora-card overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 uppercase text-[11px] font-black border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3.5">Talaba</th>
                        <th className="px-4 py-3.5">Test ID & Bosqich</th>
                        <th className="px-4 py-3.5">Natija (Foiz)</th>
                        <th className="px-4 py-3.5">Savollar</th>
                        <th className="px-4 py-3.5">Admin Tasdig'i</th>
                        <th className="px-4 py-3.5">Vaqti</th>
                        <th className="px-4 py-3.5 text-right">Amal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {mySubmissions.map((sub) => {
                        const pass = sub.percentage >= 70;
                        return (
                          <tr key={sub.id} className="hover:bg-[#ff6b86]/10 transition-colors">
                            <td className="px-4 py-3.5 font-extrabold">
                              {sub.studentName}
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="px-2 py-0.5 rounded-lg bg-white/10 font-mono text-[#3ee6c4] border border-white/15">
                                {sub.testId}
                              </span>
                              <span className="ml-2 uppercase text-[10px] opacity-70 font-bold">
                                ({sub.stage})
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`aurora-badge font-mono ${
                                  pass
                                    ? 'bg-[#3ee6c4]/20 text-[#3ee6c4]'
                                    : 'bg-[#ff6b86]/20 text-[#ff6b86]'
                                }`}
                              >
                                {sub.percentage}%
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-mono opacity-80">
                              {sub.answers.filter((a) => a.isCorrect).length} / {sub.totalQuestions} to'g'ri
                            </td>
                            <td className="px-4 py-3.5">
                              {sub.adminApprovedStageUpgrade ? (
                                <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">
                                  <CheckCircle2 className="w-3 h-3" /> Tasdiqlangan
                                </span>
                              ) : (
                                <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f]">
                                  Admin kutilmoqda
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 opacity-60 font-mono">
                              {new Date(sub.submittedAt).toLocaleDateString('uz-UZ')}{' '}
                              {new Date(sub.submittedAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <button
                                onClick={() => setSelectedSubmissionForReview(sub)}
                                className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                              >
                                <Eye className="w-3.5 h-3.5 text-[#3ee6c4]" />
                                <span>Ko'rish</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Savollar va javoblar tahlilini ko'rish */}
      {selectedSubmissionForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="aurora-card max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div>
                <h3 className="text-base font-black flex items-center gap-2">
                  <span>{selectedSubmissionForReview.studentName} — Test Tahlili</span>
                  <span className="aurora-badge bg-[#ff6b86]/20 text-[#ff6b86] font-mono">
                    {selectedSubmissionForReview.testId}
                  </span>
                </h3>
                <p className="text-xs opacity-70 mt-0.5 font-mono">
                  To'plangan natija: {selectedSubmissionForReview.percentage}% ({selectedSubmissionForReview.score} ball)
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmissionForReview(null)}
                className="duo-btn duo-btn-surface w-9 h-9"
              >
                ✕
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {selectedSubmissionForReview.answers.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    ans.isCorrect
                      ? 'bg-[#3ee6c4]/10 border-[#3ee6c4]/40'
                      : 'bg-[#ff6b86]/10 border-[#ff6b86]/40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-extrabold">
                      {idx + 1}-savol: {ans.questionText}
                    </span>
                    <span
                      className={`aurora-badge ${
                        ans.isCorrect ? 'bg-[#3ee6c4]/20 text-[#3ee6c4]' : 'bg-[#ff6b86]/20 text-[#ff6b86]'
                      }`}
                    >
                      {ans.isCorrect ? "To'g'ri" : "Noto'g'ri"}
                    </span>
                  </div>
                  <div className="mt-2 text-xs space-y-1 opacity-80 font-mono">
                    <p>
                      Talaba tanlagan javob: <strong>{ans.userAnswerIndex !== -1 ? ans.userAnswerIndex + 1 : 'Javob berilmagan'}</strong>
                    </p>
                    <p>
                      To'g'ri javob: <strong className="text-[#3ee6c4]">{ans.correctAnswerIndex + 1}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end">
              <button
                onClick={() => setSelectedSubmissionForReview(null)}
                className="duo-btn duo-btn-coral px-5 py-2 text-xs"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
