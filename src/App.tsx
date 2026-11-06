import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { STORE_EVENT } from './services/remoteStore';
import { Header, TopMenuTab } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { PortfolioShowcase } from './components/PortfolioShowcase';
import { StudentView } from './components/StudentView';
import { AiTeacherView } from './components/AiTeacherView';
import { AdminView } from './components/AdminView';
import { AuthModal } from './components/AuthModal';
import { RegistrationModal } from './components/RegistrationModal';
import { GroqConfigModal } from './components/GroqConfigModal';
import { CreateTestModal } from './components/CreateTestModal';
import { TestTakingModal } from './components/TestTakingModal';
import { FinalExamModal } from './components/FinalExamModal';
import { GroupChatModal } from './components/GroupChatModal';
import { MessageModal } from './components/MessageModal';
import { ExpelModal } from './components/ExpelModal';
import { CmdBekAssistant } from './components/CmdBekAssistant';
import {
  Student,
  Teacher,
  TeacherNotification,
  TestSubmissionResult,
  ExpelRequest,
  CourseStage,
  GeneratedTest,
  AuthUser,
} from './types';
import {
  initializeStorage,
  getTeachers,
  getStudents,
  getTeacherNotifications,
  getTestSubmissions,
  getExpelRequests,
  getCurrentAuthUser,
  logoutUser,
  addTeacher,
  deleteTeacher,
  adminApproveStageUpgrade,
  resolveExpelRequest,
  markNotificationAsRead,
  completeStudentLesson,
  updateStudent,
  createGhostAdminStudentProfile,
} from './services/storage';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { isTransitioning } = useTheme();
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentRole, setCurrentRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [showPortfolioPage, setShowPortfolioPage] = useState<boolean>(false);
  const [activeTopTab, setActiveTopTab] = useState<TopMenuTab>('asosiy');
  const [ghostAdminStudentMode, setGhostAdminStudentMode] = useState<boolean>(false);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('');
  const [notifications, setNotifications] = useState<TeacherNotification[]>([]);
  const [testSubmissions, setTestSubmissions] = useState<TestSubmissionResult[]>([]);
  const [expelRequests, setExpelRequests] = useState<ExpelRequest[]>([]);

  // Auth & General Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [showDirectRegisterModal, setShowDirectRegisterModal] = useState(false);
  const [showTestIdModal, setShowTestIdModal] = useState(false);
  const [initialTestIdForModal, setInitialTestIdForModal] = useState('');
  const [showFinalExamModal, setShowFinalExamModal] = useState(false);
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [activeGroupChatTeacherId, setActiveGroupChatTeacherId] = useState<string>('t-1');
  const [showGroqConfigModal, setShowGroqConfigModal] = useState(false);

  // Teacher action modals
  const [testCreationTarget, setTestCreationTarget] = useState<{
    student: Student;
    stage: CourseStage;
  } | null>(null);

  const [messageTargetStudent, setMessageTargetStudent] = useState<Student | null>(null);
  const [expelTargetStudent, setExpelTargetStudent] = useState<Student | null>(null);

  // Initialize and load all data
  const refreshAllData = () => {
    initializeStorage();
    const loadedTeachers = getTeachers().map((t) => ({
      ...t,
      studentIds: [...(t.studentIds || [])],
    }));
    const loadedStudents = getStudents().map((s) => ({
      ...s,
      completedLessons: [...(s.completedLessons || [])],
    }));
    const loadedSubmissions = [...getTestSubmissions()];
    const loadedExpels = [...getExpelRequests()];
    const auth = getCurrentAuthUser();

    setTeachers(loadedTeachers);
    setStudents(loadedStudents);
    setTestSubmissions(loadedSubmissions);
    setExpelRequests(loadedExpels);
    setCurrentUser(auth);

    if (auth) {
      setShowLandingPage(false);
      if (auth.role === 'owner' || auth.role === 'sub_admin') {
        if (!ghostAdminStudentMode) {
          setCurrentRole('admin');
        }
      } else if (auth.role === 'teacher') {
        setCurrentRole('teacher');
        setSelectedTeacherId(auth.id);
      } else if (auth.role === 'student') {
        setCurrentRole('student');
        setSelectedStudentId(auth.id);
      }
    } else {
      setShowLandingPage(true);
    }

    if (loadedTeachers.length > 0) {
      if (!selectedTeacherId || !loadedTeachers.some((t) => t.id === selectedTeacherId)) {
        setSelectedTeacherId(loadedTeachers[0].id);
      }
    } else {
      setSelectedTeacherId('');
    }

    if (loadedStudents.length > 0) {
      if (!selectedStudentId || !loadedStudents.some((s) => s.id === selectedStudentId)) {
        setSelectedStudentId(loadedStudents[0].id);
      }
    } else {
      setSelectedStudentId('');
    }
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  // Track student Online / Offline status in real time
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') return;
    const studentId = currentUser.id;

    const setStatus = (online: boolean) => {
      updateStudent(studentId, {
        isOnline: online,
        lastActive: online ? 'Hozir online' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        lastSeenAt: Date.now(),
      });
    };

    setStatus(navigator.onLine !== false);

    const onOnline = () => setStatus(true);
    const onOffline = () => setStatus(false);
    const onBeforeUnload = () => setStatus(false);

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [currentUser?.id, currentUser?.role]);

  // Boshqa kompyuterlarda o'zgargan ma'lumotlarni (serverdan) yengil yangilash
  const reloadSharedRef = useRef<() => void>(() => {});
  reloadSharedRef.current = () => {
    setTeachers(
      getTeachers().map((t) => ({
        ...t,
        studentIds: [...(t.studentIds || [])],
      }))
    );
    setStudents(
      getStudents().map((s) => ({
        ...s,
        completedLessons: [...(s.completedLessons || [])],
      }))
    );
    setTestSubmissions([...getTestSubmissions()]);
    setExpelRequests([...getExpelRequests()]);
  };
  useEffect(() => {
    const handler = () => reloadSharedRef.current();
    window.addEventListener(STORE_EVENT, handler);
    return () => window.removeEventListener(STORE_EVENT, handler);
  }, []);

  // Update notifications when teacher changes
  useEffect(() => {
    if (selectedTeacherId) {
      const notifs = getTeacherNotifications(selectedTeacherId);
      setNotifications(notifs);
    }
  }, [selectedTeacherId, teachers, students]);

  const ghostAdminStudent = ghostAdminStudentMode ? createGhostAdminStudentProfile() : null;

  const selectedStudent = ghostAdminStudent
    ? ghostAdminStudent
    : students.find((s) => s.id === (currentUser?.role === 'student' ? currentUser.id : selectedStudentId)) ||
      (students.length > 0 ? students[0] : null);

  const selectedTeacher =
    teachers.find((t) => t.id === (currentUser?.role === 'teacher' ? currentUser.id : selectedTeacherId)) ||
    (teachers.length > 0 ? teachers[0] : null);

  const studentTeacher = selectedStudent
    ? teachers.find((t) => t.id === selectedStudent.teacherId) || null
    : null;

  // Handlers
  const handleOpenLogin = () => {
    setAuthModalTab('login');
    setShowAuthModal(true);
  };

  const handleOpenRegister = () => {
    setShowDirectRegisterModal(true);
  };

  const handleLogout = () => {
    if (currentUser?.role === 'student') {
      updateStudent(currentUser.id, { isOnline: false, lastActive: 'Yaqinda' });
    }
    logoutUser();
    setCurrentUser(null);
    setCurrentRole('student');
    setGhostAdminStudentMode(false);
    setShowLandingPage(true);
    setShowPortfolioPage(false);
  };

  const handleAuthSuccess = (user: AuthUser) => {
    setCurrentUser(user);
    setGhostAdminStudentMode(false);
    setShowLandingPage(false);
    setShowPortfolioPage(false);
    setActiveTopTab('asosiy');

    if (user.role === 'owner' || user.role === 'sub_admin') {
      setCurrentRole('admin');
    } else if (user.role === 'teacher') {
      setCurrentRole('teacher');
      setSelectedTeacherId(user.id);
    } else if (user.role === 'student') {
      setCurrentRole('student');
      setSelectedStudentId(user.id);
      updateStudent(user.id, { isOnline: true, lastActive: 'Hozir online' });
    }
    refreshAllData();
  };

  const handleOpenTestIdModal = (initialId?: string) => {
    setInitialTestIdForModal(initialId || '');
    setShowTestIdModal(true);
  };

  const handleOpenGroupChat = (teacherId: string) => {
    setActiveGroupChatTeacherId(teacherId);
    setShowGroupChatModal(true);
  };

  const handleOpenCreateTestModal = (student: Student, stage: CourseStage) => {
    setTestCreationTarget({ student, stage });
  };

  const handleCompleteLesson = (lessonId: string) => {
    if (selectedStudent && !selectedStudent.isGhostAdminStudent) {
      completeStudentLesson(selectedStudent.id, lessonId);
      refreshAllData();
    }
  };

  const handleMarkNotificationRead = (id: string) => {
    markNotificationAsRead(id);
    if (selectedTeacher) {
      setNotifications(getTeacherNotifications(selectedTeacher.id));
    }
  };

  const handleAddTeacher = (teacherData: Omit<Teacher, 'id' | 'studentIds' | 'rating' | 'activeSince'>) => {
    addTeacher(teacherData);
    refreshAllData();
  };

  const handleDeleteTeacher = (teacherId: string) => {
    deleteTeacher(teacherId);
    refreshAllData();
  };

  const handleApproveUpgrade = (submissionId: string) => {
    const res = adminApproveStageUpgrade(submissionId);
    if (res.success) {
      refreshAllData();
    }
  };

  const handleResolveExpel = (requestId: string, approve: boolean) => {
    resolveExpelRequest(requestId, approve);
    refreshAllData();
  };

  return (
    <div className="min-h-screen flex flex-col antialiased transition-colors duration-200 relative aurora-bg-mesh pb-16 sm:pb-0">
      {isTransitioning && (
        <div className="fixed inset-0 pointer-events-none z-[9999] theme-fade-overlay bg-[#ff6b86]/10 backdrop-blur-[0.5px]" />
      )}

      {/* Global Header with 3 Main Buttons: Profil | Asosiy | Sahifalar */}
      <Header
        currentUser={currentUser}
        selectedStudent={selectedStudent}
        selectedTeacher={selectedTeacher}
        teachers={teachers}
        students={students}
        onOpenLoginModal={handleOpenLogin}
        onOpenRegisterModal={handleOpenRegister}
        onOpenTestIdModal={() => handleOpenTestIdModal()}
        onOpenGroupChatModal={() => handleOpenGroupChat(selectedTeacher?.id || 't-1')}
        onOpenFinalExamModal={() => setShowFinalExamModal(true)}
        onLogout={handleLogout}
        unreadNotesCount={notifications.filter((n) => !n.read).length}
        showLandingPage={showLandingPage}
        onToggleLandingPage={(show) => {
          setShowLandingPage(show);
          if (!show) setShowPortfolioPage(false);
        }}
        onOpenGroqConfig={() => setShowGroqConfigModal(true)}
        activeTopTab={activeTopTab}
        onSelectTopTab={(tab) => {
          setShowLandingPage(false);
          setShowPortfolioPage(false);
          setActiveTopTab(tab);
        }}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!currentUser || showLandingPage ? (
          <div className="space-y-4">
            {currentUser && showLandingPage && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setShowLandingPage(false);
                    setActiveTopTab('sahifalar');
                  }}
                  className="duo-btn duo-btn-surface !py-2 !px-4 text-xs flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sahifalar Menyusiga Qaytish</span>
                </button>
              </div>
            )}
            <LandingPage
              onOpenLogin={handleOpenLogin}
              onOpenRegister={handleOpenRegister}
              onOpenTestIdModal={() => handleOpenTestIdModal()}
              students={students}
              teachers={teachers}
            />
          </div>
        ) : showPortfolioPage ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setShowPortfolioPage(false);
                  setActiveTopTab('sahifalar');
                }}
                className="duo-btn duo-btn-surface !py-2 !px-4 text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sahifalar Menyusiga Qaytish</span>
              </button>
            </div>
            <PortfolioShowcase
              currentUser={currentUser}
              student={selectedStudent}
              onOpenLogin={handleOpenLogin}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {(currentUser.role === 'student' ||
              ((currentUser.role === 'owner' || currentUser.role === 'sub_admin') && ghostAdminStudentMode)) && (
              <StudentView
                student={selectedStudent}
                teacher={studentTeacher}
                testSubmissions={testSubmissions}
                onOpenTestIdModal={handleOpenTestIdModal}
                onOpenFinalExamModal={() => setShowFinalExamModal(true)}
                onOpenGroupChat={handleOpenGroupChat}
                onCompleteLesson={handleCompleteLesson}
                onOpenRegisterModal={handleOpenRegister}
                onOpenGroqConfig={() => setShowGroqConfigModal(true)}
                topTab={activeTopTab}
                onSelectTopTab={(tab) => setActiveTopTab(tab)}
                onOpenLandingPage={() => setShowLandingPage(true)}
                onOpenPortfolioPage={() => setShowPortfolioPage(true)}
                onRefreshData={refreshAllData}
                onExitGhostStudentMode={
                  ghostAdminStudentMode ? () => setGhostAdminStudentMode(false) : undefined
                }
              />
            )}

            {currentUser.role === 'teacher' && (
              <AiTeacherView
                teacher={selectedTeacher}
                students={students}
                notifications={notifications}
                testSubmissions={testSubmissions}
                onOpenCreateTestModal={handleOpenCreateTestModal}
                onOpenMessageModal={(st) => setMessageTargetStudent(st)}
                onOpenExpelModal={(st) => setExpelTargetStudent(st)}
                onMarkNotificationRead={handleMarkNotificationRead}
                onOpenGroupChat={handleOpenGroupChat}
                onOpenGroqConfig={() => setShowGroqConfigModal(true)}
                onRefreshData={refreshAllData}
              />
            )}

            {(currentUser.role === 'owner' || currentUser.role === 'sub_admin') && !ghostAdminStudentMode && (
              <AdminView
                teachers={teachers}
                students={students}
                testSubmissions={testSubmissions}
                expelRequests={expelRequests}
                currentUser={currentUser}
                onAddTeacher={handleAddTeacher}
                onDeleteTeacher={handleDeleteTeacher}
                onApproveUpgrade={handleApproveUpgrade}
                onResolveExpel={handleResolveExpel}
                onOpenGroupChat={handleOpenGroupChat}
                onOpenGroqConfig={() => setShowGroqConfigModal(true)}
                onRefreshData={refreshAllData}
                onEnterAsStudent={() => {
                  setGhostAdminStudentMode(true);
                  setActiveTopTab('asosiy');
                }}
              />
            )}
          </div>
        )}
      </main>

      {/* Aurora Sunset Footer */}
      <footer className="aurora-glass border-t border-[#ff6b86]/20 py-8 text-xs mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-sm bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] bg-clip-text text-transparent">
              DevMaster Academy
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="opacity-75">
              © {new Date().getFullYear()} Asoschi: Olimjon Alimjonov (Lord)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 opacity-80">
            <span>HTML · CSS · JavaScript</span>
            <span aria-hidden="true">·</span>
            <span>Kunlik Streak &amp; PvP Liga</span>
            <span aria-hidden="true">·</span>
            <span>Test ID &amp; PDF Sertifikat</span>
          </div>
        </div>
      </footer>

      {/* ===================== MODALS ===================== */}

      {showDirectRegisterModal && (
        <RegistrationModal
          onClose={() => setShowDirectRegisterModal(false)}
          onRegistered={(newStudent, assignedTeacher) => {
            refreshAllData();
            if (newStudent) {
              setSelectedStudentId(newStudent.id);
            }
            if (assignedTeacher) {
              setSelectedTeacherId(assignedTeacher.id);
            }
          }}
        />
      )}

      {showAuthModal && (
        <AuthModal
          initialTab={authModalTab}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
          onStudentRegistered={(newStudent, assignedTeacher) => {
            refreshAllData();
            setSelectedStudentId(newStudent.id);
            if (assignedTeacher) {
              setSelectedTeacherId(assignedTeacher.id);
            }
          }}
        />
      )}

      {testCreationTarget && selectedTeacher && (
        <CreateTestModal
          teacher={selectedTeacher}
          student={testCreationTarget.student}
          initialStage={testCreationTarget.stage}
          studentsList={students.filter((s) => s.teacherId === selectedTeacher.id)}
          onClose={() => setTestCreationTarget(null)}
          onTestCreated={(_newTest: GeneratedTest) => {
            refreshAllData();
          }}
        />
      )}

      {showTestIdModal && (
        <TestTakingModal
          initialTestId={initialTestIdForModal}
          onClose={() => {
            setShowTestIdModal(false);
            setInitialTestIdForModal('');
          }}
          onTestSubmittedSuccess={() => {
            refreshAllData();
          }}
        />
      )}

      {showFinalExamModal && (
        <FinalExamModal
          student={
            selectedStudent || {
              id: 'guest',
              name: 'Mehmon',
              surname: 'Talaba',
              username: 'guest',
              avatar: '',
              phone: '',
              email: '',
              stage: 'javascript',
              xp: 1000,
              rank: 1,
              coins: 100,
              teacherId: 't-1',
              completedLessons: [],
              lastActive: 'Hozir',
              joinedDate: '',
            }
          }
          onClose={() => setShowFinalExamModal(false)}
          onPassed100Percent={() => {
            refreshAllData();
          }}
        />
      )}

      {showGroupChatModal && (
        <GroupChatModal
          teacher={
            teachers.find((t) => t.id === activeGroupChatTeacherId) ||
            selectedTeacher ||
            teachers[0]
          }
          allTeachers={teachers}
          students={students}
          currentRole={currentRole}
          currentStudent={selectedStudent}
          onClose={() => setShowGroupChatModal(false)}
          onStartTestWithId={(testId) => {
            setShowGroupChatModal(false);
            handleOpenTestIdModal(testId);
          }}
          onUpdateGroupName={() => refreshAllData()}
        />
      )}

      {messageTargetStudent && selectedTeacher && (
        <MessageModal
          teacher={selectedTeacher}
          student={messageTargetStudent}
          onClose={() => setMessageTargetStudent(null)}
          onSent={() => {
            refreshAllData();
          }}
        />
      )}

      {expelTargetStudent && selectedTeacher && (
        <ExpelModal
          teacher={selectedTeacher}
          student={expelTargetStudent}
          onClose={() => setExpelTargetStudent(null)}
          onSubmitted={() => {
            refreshAllData();
          }}
        />
      )}

      {showGroqConfigModal && (
        <GroqConfigModal
          onClose={() => setShowGroqConfigModal(false)}
        />
      )}

      <CmdBekAssistant />
    </div>
  );
}
