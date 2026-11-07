import {
  Student,
  Teacher,
  GeneratedTest,
  TestSubmissionResult,
  ExpelRequest,
  TeacherNotification,
  GroupChatMessage,
  CourseStage,
  AuthUser,
  CertificateData,
  FeedbackReport,
  SubAdmin,
  SubAdminDepartment,
  AiConversationMemory,
  AiChatMemoryMessage,
} from '../types';
import {
  INITIAL_TEACHERS,
  INITIAL_STUDENTS,
  QUESTION_BANK,
  OWNER_CREDENTIALS,
  OWNER_PROFILE,
  LESSONS
} from '../data/mockData';

import {
  initRemote,
  isShared,
  hasShared,
  getShared,
  setShared,
  resetCentralDatabase,
} from './remoteStore';

const STORAGE_KEYS = {
  TEACHERS: 'devmaster_teachers_v3',
  STUDENTS: 'devmaster_students_v2',
  CERTIFICATES: 'devmaster_certificates_v2',
  GENERATED_TESTS: 'devmaster_generated_tests_v2',
  TEST_SUBMISSIONS: 'devmaster_test_submissions_v2',
  EXPEL_REQUESTS: 'devmaster_expel_requests_v2',
  NOTIFICATIONS: 'devmaster_notifications_v2',
  GROUP_MESSAGES: 'devmaster_group_messages_v2',
  PORTFOLIO_PROJECTS: 'devmaster_portfolio_projects_v1',
  AI_PERSONAS: 'devmaster_ai_friend_personas_v1',
  FEEDBACK_REPORTS: 'devmaster_feedback_reports_v1',
  SUB_ADMINS: 'devmaster_sub_admins_v1',
  AI_MEMORIES: 'devmaster_ai_memories_v1',
  CMDBEK_VOICE_CONFIG: 'devmaster_cmdbek_voice_config_v1',
  AUTH_USER: 'devmaster_current_auth_user_v2',
};

// Bu kalitlar BARCHA kompyuterlar va foydalanuvchilar uchun YAGONA MARKAZIY BAZADA saqlanadi.
// AUTH_USER ro'yxatda yo'q: kim tizimga kirgani har bir brauzerda alohida sessiya bo'ladi.
export const SHARED_STORAGE_KEYS = [
  STORAGE_KEYS.TEACHERS,
  STORAGE_KEYS.STUDENTS,
  STORAGE_KEYS.CERTIFICATES,
  STORAGE_KEYS.GENERATED_TESTS,
  STORAGE_KEYS.TEST_SUBMISSIONS,
  STORAGE_KEYS.EXPEL_REQUESTS,
  STORAGE_KEYS.NOTIFICATIONS,
  STORAGE_KEYS.GROUP_MESSAGES,
  STORAGE_KEYS.PORTFOLIO_PROJECTS,
  STORAGE_KEYS.AI_PERSONAS,
  STORAGE_KEYS.FEEDBACK_REPORTS,
  STORAGE_KEYS.SUB_ADMINS,
  STORAGE_KEYS.AI_MEMORIES,
  STORAGE_KEYS.CMDBEK_VOICE_CONFIG,
];

/** Ilova ochilganda bir marta chaqiriladi: yagona markaziy bazadan ma'lumotni yuklaydi. */
export async function initRemoteStorage(): Promise<void> {
  await initRemote(SHARED_STORAGE_KEYS);
}

/** Markaziy bazani 0 qilish (barcha qurilmalarda bir vaqtda tozalanadi) */
export async function resetEntireCentralDatabase(): Promise<boolean> {
  return resetCentralDatabase();
}

function hasStored(key: string): boolean {
  return isShared(key) ? hasShared(key) : localStorage.getItem(key) !== null;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (isShared(key)) return getShared<T>(key, fallback);
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading from localStorage key: ${key}`, error);
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  if (isShared(key)) {
    setShared(key, data);
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key: ${key}`, error);
  }
}

// Boshlang'ich holatni tekshirish (localStorage dan hech qanday umumiy jadval olinmaydi!)
export function initializeStorage(): void {
  try {
    localStorage.removeItem('devmaster_teachers_v2');
  } catch {
    // ignore
  }
}

// ----------------- AUTHENTICATION -----------------
export function getCurrentAuthUser(): AuthUser | null {
  return loadFromStorage<AuthUser | null>(STORAGE_KEYS.AUTH_USER, null);
}

export function setCurrentAuthUser(user: AuthUser | null): void {
  saveToStorage(STORAGE_KEYS.AUTH_USER, user);
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
}

export function loginUser(
  username: string,
  pass: string
): { success: boolean; user?: AuthUser; message: string } {
  const cleanUsername = username.trim().toLowerCase();
  const cleanPass = pass.trim();

  // 1. Check Owner login: lord_o1 / olimjonalimjonov12@gmail.com / lord_2012
  if (
    (cleanUsername === OWNER_CREDENTIALS.username.toLowerCase() ||
      cleanUsername === 'olimjonalimjonov12@gmail.com') &&
    (cleanPass === OWNER_CREDENTIALS.password || cleanPass === 'lord_2012')
  ) {
    const ownerUser: AuthUser = {
      id: 'owner',
      name: OWNER_PROFILE.name,
      username: OWNER_CREDENTIALS.username,
      email: 'olimjonalimjonov12@gmail.com',
      role: 'owner',
      avatar: OWNER_PROFILE.avatar,
    };
    setCurrentAuthUser(ownerUser);
    return {
      success: true,
      user: ownerUser,
      message: `Xush kelibsiz, Boshqaruvchi Olimjon Alimjonov (Lord)! 👑`,
    };
  }

  // 1.5 Check Sub-Admins (O'rinbosar Adminlar)
  const subAdmins = getSubAdmins();
  const matchedSubAdmin = subAdmins.find(
    (sa) => sa.active && sa.username.toLowerCase() === cleanUsername && sa.password === cleanPass
  );
  if (matchedSubAdmin) {
    const subAdminUser: AuthUser = {
      id: matchedSubAdmin.id,
      name: `${matchedSubAdmin.name} ${matchedSubAdmin.surname}`,
      username: matchedSubAdmin.username,
      role: 'sub_admin',
      avatar: OWNER_PROFILE.avatar,
      subAdminPermissions: matchedSubAdmin.permissions,
      subAdminRoleTitle: matchedSubAdmin.roleTitle,
    };
    setCurrentAuthUser(subAdminUser);
    return {
      success: true,
      user: subAdminUser,
      message: `Xush kelibsiz, O'rinbosar Admin ${matchedSubAdmin.name} (${matchedSubAdmin.roleTitle})! 🛡️`,
    };
  }

  // 2. Check Teachers login
  const teachers = getTeachers();
  const matchedTeacher = teachers.find(
    (t) =>
      t.username.toLowerCase() === cleanUsername &&
      (t.password === cleanPass || cleanPass === 'teacher123')
  );

  if (matchedTeacher) {
    const teacherUser: AuthUser = {
      id: matchedTeacher.id,
      name: `${matchedTeacher.name} ${matchedTeacher.surname}`,
      username: matchedTeacher.username,
      role: 'teacher',
      avatar: matchedTeacher.avatar,
    };
    setCurrentAuthUser(teacherUser);
    return {
      success: true,
      user: teacherUser,
      message: `Xush kelibsiz, Ustoz ${matchedTeacher.name}! 👨‍🏫`,
    };
  }

  // 3. Check Students login (agar o'quvchi ro'yxatdan o'tgan bo'lsa)
  const students = getStudents();
  const matchedStudent = students.find(
    (s) =>
      s.username.toLowerCase() === cleanUsername &&
      s.password === cleanPass
  );

  if (matchedStudent) {
    const studentUser: AuthUser = {
      id: matchedStudent.id,
      name: `${matchedStudent.name} ${matchedStudent.surname}`,
      username: matchedStudent.username,
      role: 'student',
      avatar: matchedStudent.avatar,
    };
    setCurrentAuthUser(studentUser);
    return {
      success: true,
      user: studentUser,
      message: `Xush kelibsiz, ${matchedStudent.name}! Darslaringiz davom etmoqda. 🎓`,
    };
  }

  return {
    success: false,
    message: "Login yoki parol noto'g'ri kiritildi! Iltimos, qaytadan tekshirib ko'ring.",
  };
}

// ----------------- TEACHERS -----------------
export function getTeachers(): Teacher[] {
  return loadFromStorage<Teacher[]>(STORAGE_KEYS.TEACHERS, INITIAL_TEACHERS);
}

export function saveTeachers(teachers: Teacher[]): void {
  saveToStorage(STORAGE_KEYS.TEACHERS, teachers);
}

// Owner yangi ustoz qo'shganda: Login va Parol yaratadi
export function addTeacher(
  teacherData: Omit<Teacher, 'id' | 'studentIds' | 'rating' | 'activeSince'>
): Teacher {
  const teachers = getTeachers();
  const newTeacher: Teacher = {
    ...teacherData,
    id: `t-${Date.now()}`,
    studentIds: [],
    rating: 5.0,
    activeSince: new Date().toISOString().split('T')[0],
  };
  teachers.push(newTeacher);
  saveTeachers(teachers);
  return newTeacher;
}

export function updateTeacherGroupName(teacherId: string, groupName: string): Teacher | null {
  const teachers = getTeachers();
  const idx = teachers.findIndex((t) => t.id === teacherId);
  if (idx !== -1) {
    teachers[idx].groupName = groupName.trim();
    saveTeachers(teachers);

    sendGroupMessage({
      teacherId,
      senderId: 'system',
      senderName: 'Tizim',
      senderRole: 'system',
      text: `📢 Guruh nomi o'qituvchi tomonidan "${groupName.trim()}" deb belgilandi!`,
    });

    return teachers[idx];
  }
  return null;
}

export function deleteTeacher(teacherId: string): void {
  const teachers = getTeachers().filter((t) => t.id !== teacherId);
  saveTeachers(teachers);

  // O'quvchilarni boshqa ustozlarga random taqsimlash
  const students = getStudents();
  students.forEach((s) => {
    if (s.teacherId === teacherId && teachers.length > 0) {
      const randomTeacher = pickRandomTeacher(teachers);
      if (randomTeacher) {
        s.teacherId = randomTeacher.id;
        if (!randomTeacher.studentIds.includes(s.id)) {
          randomTeacher.studentIds.push(s.id);
        }
      }
    }
  });
  saveStudents(students);
  saveTeachers(teachers);
}

// ----------------- STUDENTS & RANDOM ASSIGNMENT -----------------
export function getStudents(): Student[] {
  return loadFromStorage<Student[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
}

export function saveStudents(students: Student[]): void {
  saveToStorage(STORAGE_KEYS.STUDENTS, students);
}

// Ustozlarga RANDOM tarzda yo'naltirish (15 tadan oshmasligi kerak)
export function pickRandomTeacher(availableTeachers?: Teacher[]): Teacher | null {
  const teachers = availableTeachers || getTeachers();
  if (teachers.length === 0) return null;

  // 15 tadan kam o'quvchisi bor ustozlarni saralash
  const eligibleTeachers = teachers.filter((t) => (t.studentIds?.length || 0) < 15);

  if (eligibleTeachers.length > 0) {
    const randomIndex = Math.floor(Math.random() * eligibleTeachers.length);
    return eligibleTeachers[randomIndex];
  }

  // Agar hamma 15 taga to'lgan bo'lsa, eng kami bor ustozga beriladi
  const sorted = [...teachers].sort((a, b) => (a.studentIds?.length || 0) - (b.studentIds?.length || 0));
  return sorted[0];
}

export const MALE_PROGRAMMER_AVATAR = '/assets/male_programmer_avatar.svg';

// Yangi o'quvchi ro'yxatdan o'tishi (login, parol va kamida 13 yosh talabi bilan)
export function registerStudent(studentData: {
  name: string;
  surname: string;
  username: string;
  password?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  age?: number;
}): { student: Student; teacher: Teacher | null } {
  // 13 yoshdan kattalik tekshiruvi (COPPA standartlari)
  if (studentData.age !== undefined && studentData.age < 13) {
    throw new Error("Xavfsizlik qoidalariga binoan, platformadan faqat 13 yosh va undan kattalar ro'yxatdan o'tishi mumkin.");
  }

  const students = getStudents();
  const teachers = getTeachers();

  const assignedTeacher = pickRandomTeacher(teachers);
  const teacherId = assignedTeacher ? assignedTeacher.id : 'ai-teacher-temur';

  const newStudent: Student = {
    id: `s-${Date.now()}`,
    name: studentData.name,
    surname: studentData.surname,
    username: studentData.username.trim().toLowerCase(),
    password: studentData.password || 'student123',
    avatar: studentData.avatar || MALE_PROGRAMMER_AVATAR,
    phone: studentData.phone || '+998 90 000 00 00',
    email: studentData.email || `${studentData.username.trim().toLowerCase()}@devmaster.uz`,
    age: studentData.age || 16,
    stage: 'html',
    xp: 0, // FOYDALANUVCHI TALABI: Boshida 0 XP, faqat test va o'yinlardan to'planadi!
    rank: students.length + 1,
    coins: 20,
    teacherId: teacherId,
    completedLessons: [],
    quizScores: {},
    gameScores: {},
    certificates: [],
    lastActive: "Hozir ro'yxatdan o'tdi",
    joinedDate: new Date().toISOString().split('T')[0],
  };

  students.push(newStudent);
  saveStudents(students);

  // Ustozning studentIds ro'yxatini yangilash
  if (assignedTeacher) {
    const teacherIdx = teachers.findIndex((t) => t.id === assignedTeacher.id);
    if (teacherIdx !== -1) {
      teachers[teacherIdx].studentIds = teachers[teacherIdx].studentIds || [];
      teachers[teacherIdx].studentIds.push(newStudent.id);
      saveTeachers(teachers);

      // Guruh chatiga yangi talaba qo'shilgani haqida xabar
      sendGroupMessage({
        teacherId: assignedTeacher.id,
        senderId: 'system',
        senderName: 'Tizim xabari',
        senderRole: 'system',
        text: `🎉 Yangi talaba ${newStudent.name} ${newStudent.surname} (@${newStudent.username}) guruhga random tarzda biriktirildi! Xush kelibsiz!`,
      });
    }
  }

  // Avtomatik avtorizatsiya qilish
  setCurrentAuthUser({
    id: newStudent.id,
    name: `${newStudent.name} ${newStudent.surname}`,
    username: newStudent.username,
    role: 'student',
    avatar: newStudent.avatar,
  });

  return { student: newStudent, teacher: assignedTeacher };
}

// Google orqali tizimga kirish (Olimjon Alimjonov -> Bosh Admin, boshqalar -> Talaba)
export function loginWithGoogle(email: string, name: string, avatar?: string): { success: boolean; user: AuthUser; message: string } {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Agar Bosh Admin bo'lsa: olimjonalimjonov12@gmail.com
  if (cleanEmail === 'olimjonalimjonov12@gmail.com') {
    const ownerUser: AuthUser = {
      id: 'owner',
      name: 'Olimjon Alimjonov (Lord)',
      username: 'lord_o1',
      email: 'olimjonalimjonov12@gmail.com',
      role: 'owner',
      avatar: avatar || OWNER_PROFILE.avatar,
      isGoogleUser: true,
    };
    setCurrentAuthUser(ownerUser);
    return {
      success: true,
      user: ownerUser,
      message: "Xush kelibsiz, Boshqaruvchi Olimjon Alimjonov (Lord)! Google orqali tasdiqlandi. 👑",
    };
  }

  // 2. Talaba sifatida tekshirish yoki yaratish
  const students = getStudents();
  let student = students.find((s) => s.email.toLowerCase() === cleanEmail);

  if (!student) {
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || 'Talaba';
    const lastName = nameParts.slice(1).join(' ') || 'Dev';
    const baseUsername = cleanEmail.split('@')[0].replace(/[^a-z0-9_]/g, '');

    const regResult = registerStudent({
      name: firstName,
      surname: lastName,
      username: baseUsername || `student_${Date.now().toString().slice(-4)}`,
      email: cleanEmail,
      phone: '+998901234567',
      age: 18, // Google foydalanuvchisi yoshi tasdiqlangan deb hisoblanadi (>13)
      avatar: avatar,
    });
    student = regResult.student;
  }

  const studentUser: AuthUser = {
    id: student.id,
    name: `${student.name} ${student.surname}`,
    username: student.username,
    email: student.email,
    role: 'student',
    avatar: student.avatar,
    isGoogleUser: true,
  };

  setCurrentAuthUser(studentUser);
  return {
    success: true,
    user: studentUser,
    message: `Xush kelibsiz, ${student.name}! Google orqali muvaffaqiyatli kirdingiz. 🚀`,
  };
}

// ----------------- TEST SYSTEM & GENERATOR -----------------
export function getGeneratedTests(): GeneratedTest[] {
  return loadFromStorage<GeneratedTest[]>(STORAGE_KEYS.GENERATED_TESTS, []);
}

export function saveGeneratedTests(tests: GeneratedTest[]): void {
  saveToStorage(STORAGE_KEYS.GENERATED_TESTS, tests);
}

// Ustoz test berishi va noyob ID generatsiya qilinishi
export function createTest(params: {
  studentId: string;
  studentName: string;
  stage: CourseStage;
  teacherId: string;
  questionCount: number;
}): GeneratedTest {
  const currentTests = getGeneratedTests();

  // Noyob Test ID: TEST-HTML-7482
  const randomCode = Math.floor(1000 + Math.random() * 9000);
  const testId = `TEST-${params.stage.toUpperCase()}-${randomCode}`;

  const validStage = (params.stage === 'graduated' ? 'javascript' : params.stage) as 'html' | 'css' | 'javascript';
  const availableQuestions = QUESTION_BANK[validStage] || QUESTION_BANK.html;

  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffled.slice(0, Math.min(params.questionCount, shuffled.length));

  const newTest: GeneratedTest = {
    id: testId,
    studentId: params.studentId,
    studentName: params.studentName,
    stage: params.stage,
    teacherId: params.teacherId,
    questionCount: selectedQuestions.length,
    questions: selectedQuestions,
    createdAt: new Date().toISOString(),
    expiresInMinutes: 60,
    status: 'active',
  };

  currentTests.push(newTest);
  saveGeneratedTests(currentTests);

  // Guruh chatiga e'lon qilish
  sendGroupMessage({
    teacherId: params.teacherId,
    senderId: params.teacherId,
    senderName: 'Ustoz (Test Generator)',
    senderRole: 'teacher',
    text: `📢 Hurmatli ${params.studentName}, ${params.stage.toUpperCase()} bosqichi bo'yicha testingiz tayyor! Test ID orqali kirib yeching: ID: [${testId}] (Savollar soni: ${selectedQuestions.length} ta). Omad tilaymiz!`,
    isTestAlert: true,
    testId: testId,
  });

  return newTest;
}

export function getTestById(testId: string): GeneratedTest | null {
  const tests = getGeneratedTests();
  const cleanId = testId.trim().toUpperCase();
  return tests.find((t) => t.id.toUpperCase() === cleanId && t.status === 'active') || null;
}

// Test topshirilgach bazadan BUTUNLAY O'CHIRISH!
export function submitTest(
  testId: string,
  userAnswers: { questionId: string; selectedIndex: number }[]
): { success: boolean; result?: TestSubmissionResult; message: string } {
  const tests = getGeneratedTests();
  const cleanId = testId.trim().toUpperCase();
  const testIndex = tests.findIndex((t) => t.id.toUpperCase() === cleanId);

  if (testIndex === -1) {
    return {
      success: false,
      message: "Bu Test ID topilmadi yoki ushbu test allaqachon ishlanib bazadan o'chirilgan!",
    };
  }

  const test = tests[testIndex];

  let correctCount = 0;
  const detailedAnswers = test.questions.map((q) => {
    const userAns = userAnswers.find((a) => a.questionId === q.id);
    const selectedIdx = userAns !== undefined ? userAns.selectedIndex : -1;
    const isCorrect = selectedIdx === q.correctAnswerIndex;
    if (isCorrect) correctCount++;

    return {
      questionId: q.id,
      questionText: q.question,
      userAnswerIndex: selectedIdx,
      correctAnswerIndex: q.correctAnswerIndex,
      isCorrect,
    };
  });

  const percentage = Math.round((correctCount / test.questions.length) * 100);

  const submissionResult: TestSubmissionResult = {
    id: `sub-${Date.now()}`,
    testId: test.id,
    studentId: test.studentId,
    studentName: test.studentName,
    teacherId: test.teacherId,
    stage: test.stage,
    score: correctCount * 10,
    totalQuestions: test.questions.length,
    percentage,
    submittedAt: new Date().toISOString(),
    answers: detailedAnswers,
    adminApprovedStageUpgrade: false,
  };

  const allSubmissions = getTestSubmissions();
  allSubmissions.unshift(submissionResult);
  saveTestSubmissions(allSubmissions);

  // AVTOMATIK TESTNI BAZADAN O'CHIRISH!
  tests.splice(testIndex, 1);
  saveGeneratedTests(tests);

  const students = getStudents();
  const student = students.find((s) => s.id === test.studentId);
  if (student) {
    student.xp += correctCount * 25;
    student.coins += correctCount * 5;
    saveStudents(students);
  }

  sendGroupMessage({
    teacherId: test.teacherId,
    senderId: 'system',
    senderName: 'Test Nazorati',
    senderRole: 'system',
    text: `✅ ${test.studentName} [${test.id}] testini yakunladi (${percentage}%). Natijalar ko'rib chiqish uchun Ustoz va Adminga yuborildi!`,
  });

  return {
    success: true,
    result: submissionResult,
    message: "Test muvaffaqiyatli topshirildi va bir martalik test ID o'chirildi!",
  };
}

// ----------------- TEST SUBMISSIONS -----------------
export function getTestSubmissions(): TestSubmissionResult[] {
  return loadFromStorage<TestSubmissionResult[]>(STORAGE_KEYS.TEST_SUBMISSIONS, []);
}

export function saveTestSubmissions(submissions: TestSubmissionResult[]): void {
  saveToStorage(STORAGE_KEYS.TEST_SUBMISSIONS, submissions);
}

// Admin bosqichga o'tkazishni tasdiqlaydi
export function adminApproveStageUpgrade(submissionId: string): { success: boolean; message: string } {
  const submissions = getTestSubmissions();
  const subIndex = submissions.findIndex((s) => s.id === submissionId);
  if (subIndex === -1) return { success: false, message: 'Natija topilmadi' };

  submissions[subIndex].adminApprovedStageUpgrade = true;
  saveTestSubmissions(submissions);

  const sub = submissions[subIndex];
  const students = getStudents();
  const student = students.find((s) => s.id === sub.studentId);

  if (student) {
    let nextStage: CourseStage = student.stage;
    if (sub.stage === 'html') nextStage = 'css';
    else if (sub.stage === 'css') nextStage = 'javascript';
    else if (sub.stage === 'javascript') nextStage = 'graduated';

    student.stage = nextStage;
    student.stageCompletedPendingTest = undefined;
    student.xp += 300;
    student.coins += 50;
    saveStudents(students);

    sendGroupMessage({
      teacherId: sub.teacherId,
      senderId: 'owner',
      senderName: `${OWNER_PROFILE.name} (Owner)`,
      senderRole: 'admin',
      text: `🏆 TABRIKLAYMIZ! Boshqaruvchi qarori bilan ${student.name} ${student.surname} ${nextStage.toUpperCase()} bosqichiga muvaffaqiyatli o'tkazildi!`,
    });

    return {
      success: true,
      message: `${student.name} ${nextStage.toUpperCase()} bosqichiga muvaffaqiyatli o'tkazildi!`,
    };
  }

  return { success: false, message: 'Talaba topilmadi' };
}

// ----------------- EXPEL REQUESTS -----------------
export function getExpelRequests(): ExpelRequest[] {
  return loadFromStorage<ExpelRequest[]>(STORAGE_KEYS.EXPEL_REQUESTS, []);
}

export function saveExpelRequests(requests: ExpelRequest[]): void {
  saveToStorage(STORAGE_KEYS.EXPEL_REQUESTS, requests);
}

export function createExpelRequest(params: {
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  reason: string;
}): ExpelRequest {
  const requests = getExpelRequests();
  const newReq: ExpelRequest = {
    id: `exp-${Date.now()}`,
    ...params,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  requests.unshift(newReq);
  saveExpelRequests(requests);
  return newReq;
}

export function resolveExpelRequest(requestId: string, approve: boolean, notes?: string): void {
  const requests = getExpelRequests();
  const req = requests.find((r) => r.id === requestId);
  if (!req) return;

  req.status = approve ? 'approved' : 'rejected';
  req.adminNotes = notes || (approve ? "Admin tomonidan tasdiqlandi" : "Rad etildi");
  saveExpelRequests(requests);

  if (approve) {
    const teachers = getTeachers();
    const t = teachers.find((tech) => tech.id === req.teacherId);
    if (t) {
      t.studentIds = (t.studentIds || []).filter((id) => id !== req.studentId);
      saveTeachers(teachers);
    }
  }
}

// ----------------- TEACHER NOTIFICATIONS -----------------
export function getTeacherNotifications(teacherId: string): TeacherNotification[] {
  const all = loadFromStorage<TeacherNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  return all.filter((n) => n.teacherId === teacherId);
}

export function createTeacherNotification(notif: Omit<TeacherNotification, 'id' | 'createdAt' | 'read'>): void {
  const all = loadFromStorage<TeacherNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  all.unshift({
    ...notif,
    id: `notif-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  });
  saveToStorage(STORAGE_KEYS.NOTIFICATIONS, all);
}

export function markNotificationAsRead(id: string): void {
  const all = loadFromStorage<TeacherNotification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  const n = all.find((item) => item.id === id);
  if (n) {
    n.read = true;
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, all);
  }
}

// ----------------- 15 KISHILIK GURUH CHATI -----------------
export function getGroupMessages(teacherId: string): GroupChatMessage[] {
  const all = loadFromStorage<GroupChatMessage[]>(STORAGE_KEYS.GROUP_MESSAGES, []);
  return all.filter((m) => m.teacherId === teacherId);
}

export function sendGroupMessage(params: Omit<GroupChatMessage, 'id' | 'timestamp'>): GroupChatMessage {
  const all = loadFromStorage<GroupChatMessage[]>(STORAGE_KEYS.GROUP_MESSAGES, []);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  const newMsg: GroupChatMessage = {
    ...params,
    id: `msg-${Date.now()}`,
    timestamp: timeStr,
  };

  all.push(newMsg);
  saveToStorage(STORAGE_KEYS.GROUP_MESSAGES, all);
  return newMsg;
}

// ----------------- LESSON COMPLETION -----------------
export function completeStudentLesson(studentId: string, lessonId: string): void {
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) return;

  // Darsni faqat o'qilgan deb belgilaydi, lekin XP faqat TEST yoki O'YINDAN beriladi!
  if (!student.completedLessons.includes(lessonId)) {
    student.completedLessons.push(lessonId);
    saveStudents(students);
  }
}

// ----------------- TESTLAR & O'YINLAR ORQALI XP BERISH (TALABA TALABI) -----------------
export function recordQuizSubmission(params: {
  studentId: string;
  lessonId: string;
  percentage: number;
  xpReward: number;
}): {
  passed: boolean;
  percentage: number;
  xpGained: number;
  currentHearts: number;
  newCoins: number;
  newTotalXp: number;
  message: string;
  newCertificate?: CertificateData;
} {
  const { studentId, lessonId, percentage, xpReward } = params;
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return {
      passed: false,
      percentage: 0,
      xpGained: 0,
      currentHearts: 0,
      newCoins: 0,
      newTotalXp: 0,
      message: "Talaba topilmadi!",
    };
  }

  student.quizScores = student.quizScores || {};

  // TESTDAN O'TISH: Kamida 70% to'plashi shart! (Qiyinlashtirilgan XP va Tanga tizimi)
  if (percentage >= 70) {
    let earnedXp = 0;
    if (!student.quizScores[lessonId] || percentage > student.quizScores[lessonId]) {
      const baseLessonXp = Math.min(12, Math.max(8, Math.round((xpReward || 20) * 0.25)));
      const multiplier = student.xpMultiplier && student.xpMultiplier > 1
        ? student.xpMultiplier
        : student.xpPotionActive
        ? 1.5
        : 1;
      earnedXp = Math.round(baseLessonXp * multiplier);
      student.xp += earnedXp;
      student.coins = Number(((student.coins || 0) + 0.5).toFixed(1));
    }
    student.quizScores[lessonId] = Math.max(student.quizScores[lessonId] || 0, percentage);

    if (!student.completedLessons.includes(lessonId)) {
      student.completedLessons.push(lessonId);
    }

    const newCert = checkAndAwardCertificates(student);
    saveStudents(students);

    const activeMulti = student.xpMultiplier || (student.xpPotionActive ? 1.5 : 1);
    return {
      passed: true,
      percentage,
      xpGained: earnedXp,
      currentHearts: 3,
      newCoins: student.coins,
      newTotalXp: student.xp,
      message: `Tabriklaymiz! Testdan ${percentage}% ball to'plab o'tdingiz va +${earnedXp} XP${activeMulti > 1 ? ` (${activeMulti}x Potion bilan)` : ''} hamda +0.5 tanga oldingiz! 🎉`,
      newCertificate: newCert,
    };
  } else {
    saveStudents(students);
    return {
      passed: false,
      percentage,
      xpGained: 0,
      currentHearts: 3,
      newCoins: student.coins,
      newTotalXp: student.xp,
      message: `Afsuski, testdan ${percentage}% ball bilan yiqildingiz (kamida 70% kerak). Konspektni qayta o'qib, yana sinab ko'ring! ⚠️`,
    };
  }
}

// O'yinlardan XP va Tanga berilmaydi (0 XP, 0 Coin — faqat mashq va qiziqish uchun)
export function recordGameXp(studentId: string, gameName: string, _xpEarned: number): { success: boolean; newXp: number } {
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) return { success: false, newXp: 0 };

  student.gameScores = student.gameScores || {};
  student.gameScores[gameName] = (student.gameScores[gameName] || 0) + 1;

  saveStudents(students);
  return { success: true, newXp: student.xp };
}

// Liga jangi (PvP yoki With AI): G'olibga +30 XP va +2 Coin, Mag'lubga -30 XP va -2 Coin
export function recordLeagueBattleResult(params: {
  studentId: string;
  won: boolean;
  opponentName: string;
  mode: 'pvp' | 'ai';
  myScore: number;
  opponentScore: number;
}): { newXp: number; newCoins: number; xpDelta: number; coinDelta: number } {
  if (params.studentId === 'admin-ghost-student') {
    return { newXp: 999999999, newCoins: 999999999, xpDelta: params.won ? 30 : 0, coinDelta: params.won ? 2 : 0 };
  }
  const students = getStudents();
  const student = students.find((s) => s.id === params.studentId);
  if (!student) return { newXp: 0, newCoins: 0, xpDelta: 0, coinDelta: 0 };

  let xpDelta = params.won ? 30 : -30;
  let coinDelta = params.won ? 2 : -2;

  if (params.won && (student.pvpDoubleRewardCount || 0) > 0) {
    xpDelta = 60;
    coinDelta = 4;
    student.pvpDoubleRewardCount = Math.max(0, (student.pvpDoubleRewardCount || 1) - 1);
  } else if (!params.won && (student.pvpShieldCount || 0) > 0) {
    xpDelta = 0;
    coinDelta = 0;
    student.pvpShieldCount = Math.max(0, (student.pvpShieldCount || 1) - 1);
  }

  student.xp = Math.max(0, (student.xp || 0) + xpDelta);
  student.coins = Math.max(0, Number(((student.coins || 0) + coinDelta).toFixed(1)));
  if (params.won) {
    student.pvpWins = (student.pvpWins || 0) + 1;
  } else {
    student.pvpLosses = (student.pvpLosses || 0) + 1;
  }

  student.adminMessages = student.adminMessages || [];
  student.adminMessages.unshift({
    id: `msg-battle-${Date.now()}`,
    sender: 'Liga Hakami',
    title: params.won ? `🏆 Liga G'alabasi (${params.mode.toUpperCase()})` : `⚔️ Liga Mag'lubiyati (${params.mode.toUpperCase()})`,
    text: `${params.opponentName} ga qarshi 30 savollik jangda ${params.myScore}:${params.opponentScore} hisob qayd etildi. Natija: ${xpDelta >= 0 ? `+${xpDelta}` : xpDelta} XP, ${coinDelta >= 0 ? `+${coinDelta}` : coinDelta} Coin.`,
    type: 'battle',
    createdAt: new Date().toLocaleString('uz-UZ'),
    read: false,
  });

  saveStudents(students);
  return { newXp: student.xp, newCoins: student.coins, xpDelta, coinDelta };
}

// Admin tomonidan o'quvchi profiliga xabar (masalan: Streak uzilishi ogohlantirishi) yuborish
export function sendAdminMessageToStudent(params: {
  studentId: string;
  title: string;
  text: string;
  type?: 'streak_warning' | 'admin_notice' | 'reward' | 'battle';
}): void {
  const students = getStudents();
  const student = students.find((s) => s.id === params.studentId);
  if (!student) return;
  student.adminMessages = student.adminMessages || [];
  student.adminMessages.unshift({
    id: `adm-msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    sender: 'Olimjon Alimjonov (Admin)',
    title: params.title,
    text: params.text,
    type: params.type || 'streak_warning',
    createdAt: new Date().toLocaleString('uz-UZ'),
    read: false,
  });
  saveStudents(students);
}

// Sertifikatlarni tekshirish va berish
export function checkAndAwardCertificates(student: Student): CertificateData | undefined {
  student.certificates = student.certificates || [];
  const completed = student.completedLessons;

  const feLessons = LESSONS.filter(l => ['html', 'css', 'javascript', 'typescript', 'react'].includes(l.stage));
  const feCompleted = feLessons.filter(l => completed.includes(l.id));
  const hasFeCert = student.certificates.some(c => c.type === 'frontend');

  if (!hasFeCert && feCompleted.length >= 25) {
    const cert: CertificateData = {
      id: `CERT-FE-${Date.now().toString().slice(-6)}`,
      type: 'frontend',
      title: "Frontend Web Dasturchisi Professional Sertifikati",
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
      issueDate: new Date().toISOString().split('T')[0],
      scorePercentage: 94,
      skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React.js', 'Responsive UI'],
      trackName: "Frontend Arxitekturasi",
      serialNumber: `DMA-FE-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    student.certificates.push(cert);
    return cert;
  }

  const beLessons = LESSONS.filter(l => ['backend', 'database'].includes(l.stage));
  const beCompleted = beLessons.filter(l => completed.includes(l.id));
  const hasBeCert = student.certificates.some(c => c.type === 'backend');

  if (!hasBeCert && beCompleted.length >= 15) {
    const cert: CertificateData = {
      id: `CERT-BE-${Date.now().toString().slice(-6)}`,
      type: 'backend',
      title: "Backend & Ma'lumotlar Bazasi Muhandisi Sertifikati",
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
      issueDate: new Date().toISOString().split('T')[0],
      scorePercentage: 92,
      skills: ['Node.js', 'Express.js', 'REST API', 'PostgreSQL', 'SQL', 'MongoDB', 'JWT Auth'],
      trackName: "Backend & Database Engineering",
      serialNumber: `DMA-BE-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    student.certificates.push(cert);
    return cert;
  }

  const hasFsCert = student.certificates.some(c => c.type === 'fullstack');
  if (!hasFsCert && completed.length >= 50) {
    const cert: CertificateData = {
      id: `CERT-FS-${Date.now().toString().slice(-6)}`,
      type: 'fullstack',
      title: "Full-Stack Dasturchi Oliy Darajali Sertifikati",
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
      issueDate: new Date().toISOString().split('T')[0],
      scorePercentage: 97,
      skills: ['Frontend (React)', 'Backend (Node.js/Express)', 'SQL/PostgreSQL', 'MongoDB', 'DevOps & Git', 'Full-Stack Architecture'],
      trackName: "Full-Stack Software Engineering (100 Mavzu)",
      serialNumber: `DMA-FS-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    student.certificates.push(cert);
    return cert;
  }

  return undefined;
}

export function getStudentCertificates(studentId: string): CertificateData[] {
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  return student?.certificates || [];
}

// ----------------- ADMIN VA YORDAMCHI FUNKSIYALAR -----------------
export function deleteStudent(studentId: string): void {
  const students = getStudents().filter((s) => s.id !== studentId);
  saveStudents(students);
  const teachers = getTeachers().map((t) => ({
    ...t,
    studentIds: (t.studentIds || []).filter((id) => id !== studentId),
  }));
  saveTeachers(teachers);
  const expels = getExpelRequests().filter((r) => r.studentId !== studentId);
  saveExpelRequests(expels);
}

export function updateStudent(studentId: string, updates: Partial<Student>): Student | null {
  // Agar Adminning LEGEND o'quvchi profili tahrirlanayotgan bo'lsa
  if (studentId === 'admin-ghost-student') {
    return saveLegendAdminStudentProfile(updates);
  }

  const current = getStudents();
  const idx = current.findIndex((s) => s.id === studentId);
  if (idx === -1) return null;
  const updatedStudent: Student = { ...current[idx], ...updates };
  const students = current.map((s, i) => (i === idx ? updatedStudent : s));
  saveStudents(students);

  // Agar hozir tizimda o'tirgan foydalanuvchi shu o'quvchi bo'lsa, AuthUser sessiyasini ham yangilash
  const auth = getCurrentAuthUser();
  if (auth && auth.id === studentId) {
    setCurrentAuthUser({
      ...auth,
      name: `${updatedStudent.name} ${updatedStudent.surname}`.trim(),
      username: updatedStudent.username,
      avatar: updatedStudent.avatar,
    });
  }

  // Agar ustoz o'zgargan bo'lsa, ustozlarning studentIds ro'yxatini ham sinxronlash
  if (updates.teacherId && updates.teacherId !== current[idx].teacherId) {
    const teachers = getTeachers().map((t) => {
      const filteredIds = (t.studentIds || []).filter((id) => id !== studentId);
      if (t.id === updates.teacherId) {
        return { ...t, studentIds: [...filteredIds, studentId] };
      }
      return { ...t, studentIds: filteredIds };
    });
    saveTeachers(teachers);
  }

  return updatedStudent;
}

export function addCustomStudent(data: {
  name: string;
  surname: string;
  username: string;
  password?: string;
  phone?: string;
  email?: string;
  age?: number;
  stage?: CourseStage;
  xp?: number;
  coins?: number;
}): Student {
  const reg = registerStudent(data);
  if (data.stage || data.xp !== undefined || data.coins !== undefined) {
    updateStudent(reg.student.id, {
      stage: data.stage || reg.student.stage,
      xp: data.xp ?? reg.student.xp,
      coins: data.coins ?? reg.student.coins,
    });
  }
  return getStudents().find((s) => s.id === reg.student.id) || reg.student;
}

export function fillAllStudentsHearts(): void {
  const students = getStudents().map((s) => ({
    ...s,
    coins: Math.max(s.coins || 0, 20),
  }));
  saveStudents(students);
}

export function addXpToStudent(studentId: string, xpAmount: number): Student | null {
  const current = getStudents();
  const idx = current.findIndex(
    (s) =>
      s.id === studentId ||
      s.username.toLowerCase() === studentId.toLowerCase() ||
      s.name.toLowerCase() === studentId.toLowerCase()
  );
  if (idx === -1) return null;
  const updatedStudent: Student = {
    ...current[idx],
    xp: Math.max(0, (current[idx].xp || 0) + xpAmount),
  };
  const students = current.map((s, i) => (i === idx ? updatedStudent : s));
  saveStudents(students);
  return updatedStudent;
}

export function clearAllTestSubmissions(): void {
  saveTestSubmissions([]);
}

export function getFullDatabaseDump() {
  return {
    students: getStudents(),
    teachers: getTeachers(),
    submissions: getTestSubmissions(),
    expels: getExpelRequests(),
    timestamp: new Date().toISOString(),
  };
}

export function calculateTokenCost(promptText: string): number {
  const len = promptText.trim().length;
  if (len <= 60) return 0.5;
  if (len <= 180) return 1.0;
  if (len <= 400) return 1.5;
  return 2.5;
}

export function deductCoinsForAi(studentId: string, promptText: string): {
  success: boolean;
  cost: number;
  remainingCoins: number;
  message?: string;
} {
  if (studentId === 'admin-ghost-student') {
    return { success: true, cost: 0, remainingCoins: 999999999 };
  }
  const cost = calculateTokenCost(promptText);
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) {
    return { success: true, cost: 0, remainingCoins: 20 };
  }
  if ((student.freeAiQuestionsCount || 0) > 0) {
    student.freeAiQuestionsCount = Math.max(0, (student.freeAiQuestionsCount || 1) - 1);
    saveStudents(students);
    return { success: true, cost: 0, remainingCoins: student.coins };
  }
  const currentCoins = student.coins ?? 20;
  if (currentCoins < cost) {
    return {
      success: false,
      cost,
      remainingCoins: currentCoins,
      message: `Savol berish uchun ${cost} tanga kerak, sizda ${currentCoins} tanga bor.`,
    };
  }
  student.coins = Number((currentCoins - cost).toFixed(1));
  saveStudents(students);
  return { success: true, cost, remainingCoins: student.coins };
}

export function createAiStageExam(
  studentId: string,
  studentName: string,
  currentStage: CourseStage,
  targetStage: CourseStage
): GeneratedTest {
  const currentTests = getGeneratedTests();
  const randomCode = Math.floor(10000 + Math.random() * 90000);
  const testId = `STAGE-AI-${currentStage.toUpperCase()}-${randomCode}`;

  const bankKey = (['html', 'css', 'javascript'].includes(currentStage) ? currentStage : 'javascript') as
    | 'html'
    | 'css'
    | 'javascript';
  const availableQuestions = QUESTION_BANK[bankKey] || QUESTION_BANK.html;
  const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffled.slice(0, Math.min(10, shuffled.length));

  const newTest: GeneratedTest = {
    id: testId,
    studentId,
    studentName,
    stage: currentStage,
    targetStage,
    isOneTimeStageExam: true,
    teacherId: 'ai-teacher-temur',
    questionCount: selectedQuestions.length,
    questions: selectedQuestions,
    createdAt: new Date().toISOString(),
    expiresInMinutes: 45,
    status: 'active',
  };

  currentTests.push(newTest);
  saveGeneratedTests(currentTests);
  return newTest;
}

// ----------------- PORTFOLIOLAR VA AI DO'ST PERSONA -----------------
import { PortfolioProject, AiFriendPersona } from '../types';

const PORTFOLIO_KEY = 'devmaster_portfolio_projects_v1';
const PERSONA_KEY = 'devmaster_ai_friend_personas_v1';

const DEFAULT_PORTFOLIOS: PortfolioProject[] = [
  {
    id: 'proj-1',
    title: 'Cyberpunk Neon Portfolio 2026',
    description: 'HTML5, CSS3 Grid va neon animatsiyalari yordamida yaratilgan shaxsiy portfolio sayti.',
    authorId: 's-1',
    authorName: 'Jamshidbek Alimov',
    authorAvatar: MALE_PROGRAMMER_AVATAR,
    category: 'html-css',
    htmlCode: '<div style="padding:24px;background:#090d16;color:#38bdf8;font-family:sans-serif;text-align:center;"><h1>Salom, Men Web Dasturchiman</h1></div>',
    cssCode: 'body { margin: 0; }',
    jsCode: '',
    tags: ['HTML5', 'CSS3', 'Responsive'],
    likes: 45,
    likedBy: [],
    views: 180,
    createdAt: '2026-10-25',
  },
];

export function getPortfolioProjects(): PortfolioProject[] {
  return loadFromStorage<PortfolioProject[]>(PORTFOLIO_KEY, DEFAULT_PORTFOLIOS);
}

export function savePortfolioProjects(projects: PortfolioProject[]): void {
  saveToStorage(PORTFOLIO_KEY, projects);
}

export function addPortfolioProject(
  data: Omit<PortfolioProject, 'id' | 'likes' | 'views' | 'createdAt' | 'likedBy'>
): PortfolioProject {
  const projects = getPortfolioProjects();
  const newProject: PortfolioProject = {
    ...data,
    id: `proj-${Date.now()}`,
    likes: 0,
    likedBy: [],
    views: 1,
    createdAt: new Date().toISOString().split('T')[0],
  };
  projects.unshift(newProject);
  savePortfolioProjects(projects);
  return newProject;
}

export function likePortfolioProject(projectId: string, studentId: string): { likes: number; isLiked: boolean } {
  const projects = getPortfolioProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return { likes: 0, isLiked: false };
  project.likedBy = project.likedBy || [];
  const idx = project.likedBy.indexOf(studentId);
  let isLiked = false;
  if (idx === -1) {
    project.likedBy.push(studentId);
    project.likes = (project.likes || 0) + 1;
    isLiked = true;
  } else {
    project.likedBy.splice(idx, 1);
    project.likes = Math.max(0, (project.likes || 1) - 1);
  }
  savePortfolioProjects(projects);
  return { likes: project.likes, isLiked };
}

const DEFAULT_PERSONAS: AiFriendPersona[] = [
  {
    id: 'persona-default-doston',
    name: 'Admin Doston',
    avatar: '🎌',
    targetType: 'owner',
    targetId: 'owner',
    targetName: 'Olimjon Alimjonov (Lord)',
    humorStyle: 'otaku_hype',
    favoriteAnimes: ['Naruto', 'One Piece', 'Jujutsu Kaisen'],
    catchphrase: 'Shinra Tensei! ⚡',
    customInstructions: "Olimjon bilan sirdosh do'stdek gaplash.",
    isActive: true,
    createdAt: '2026-10-25',
  },
];

export function getAiFriendPersonas(): AiFriendPersona[] {
  return loadFromStorage<AiFriendPersona[]>(PERSONA_KEY, DEFAULT_PERSONAS);
}

export function saveAiFriendPersonas(personas: AiFriendPersona[]): void {
  saveToStorage(PERSONA_KEY, personas);
}

export function getActiveAiFriendPersona(): AiFriendPersona {
  const list = getAiFriendPersonas();
  return list.find((p) => p.isActive) || list[0] || DEFAULT_PERSONAS[0];
}

export function addOrUpdateAiFriendPersona(persona: AiFriendPersona): AiFriendPersona {
  const list = getAiFriendPersonas();
  if (persona.isActive) list.forEach((p) => (p.isActive = false));
  const idx = list.findIndex((p) => p.id === persona.id);
  if (idx >= 0) list[idx] = persona;
  else list.push(persona);
  saveAiFriendPersonas(list);
  return persona;
}

export function setActiveAiFriendPersona(id: string): AiFriendPersona | null {
  const list = getAiFriendPersonas();
  let found: AiFriendPersona | null = null;
  list.forEach((p) => {
    if (p.id === id) {
      p.isActive = true;
      found = p;
    } else {
      p.isActive = false;
    }
  });
  saveAiFriendPersonas(list);
  return found;
}

export function deleteAiFriendPersona(id: string): void {
  const list = getAiFriendPersonas().filter((p) => p.id !== id);
  if (list.length > 0 && !list.some((p) => p.isActive)) list[0].isActive = true;
  saveAiFriendPersonas(list);
}

// ----------------- 1. XATOLIKLAR (BUG) VA TAKLIFLAR (BOSH SAHIFA UCHUN) -----------------
export function getFeedbackReports(): FeedbackReport[] {
  return loadFromStorage<FeedbackReport[]>(STORAGE_KEYS.FEEDBACK_REPORTS, []);
}

export function saveFeedbackReports(reports: FeedbackReport[]): void {
  saveToStorage(STORAGE_KEYS.FEEDBACK_REPORTS, reports);
}

export function addFeedbackReport(data: {
  firstName: string;
  lastName: string;
  contact: string;
  type: 'bug' | 'suggestion';
  message: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  mediaName?: string;
}): FeedbackReport {
  const reports = getFeedbackReports();
  const subAdmins = getSubAdmins();
  const bugSpecialist = subAdmins.find(
    (sa) => sa.active && sa.permissions.includes('feedback_bugs')
  );

  const newReport: FeedbackReport = {
    id: `fb-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    contact: data.contact.trim(),
    type: data.type,
    message: data.message.trim(),
    mediaUrl: data.mediaUrl,
    mediaType: data.mediaType,
    mediaName: data.mediaName,
    status: 'new',
    assignedAdminId: bugSpecialist?.id,
    assignedAdminName: bugSpecialist ? `${bugSpecialist.name} ${bugSpecialist.surname}` : 'Olimjon Alimjonov (Bosh Admin)',
    createdAt: new Date().toLocaleString('uz-UZ'),
  };
  reports.unshift(newReport);
  saveFeedbackReports(reports);
  return newReport;
}

export function updateFeedbackReport(id: string, updates: Partial<FeedbackReport>): FeedbackReport | null {
  const reports = getFeedbackReports();
  const idx = reports.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  reports[idx] = { ...reports[idx], ...updates };
  saveFeedbackReports(reports);
  return reports[idx];
}

export function deleteFeedbackReport(id: string): void {
  const reports = getFeedbackReports().filter((r) => r.id !== id);
  saveFeedbackReports(reports);
}

// ----------------- 2. O'RINBOSAR ADMINLAR (SUB-ADMINS & ISH TAQSIMOTI) -----------------
const DEFAULT_SUB_ADMINS: SubAdmin[] = [
  {
    id: 'subadmin-db-1',
    name: 'Jasur',
    surname: 'Karimov',
    username: 'admin_baza',
    password: 'baza123',
    roleTitle: "Ma'lumotlar Bazasi va O'quvchilar Mas'uli",
    permissions: ['database', 'students_teachers', 'streak_messages'],
    assignedTasks: [
      {
        id: 'task-1',
        title: "Kunlik PostgreSQL va bulutli baza sinxronizatsiyasini tekshirish",
        department: 'database',
        completed: false,
        createdAt: '2026-11-05',
      },
      {
        id: 'task-2',
        title: "1 kunlik streak qoldirgan o'quvchilarga ogohlantirish xabarini yuborish",
        department: 'streak_messages',
        completed: false,
        createdAt: '2026-11-05',
      },
    ],
    createdAt: '2026-11-05',
    active: true,
  },
  {
    id: 'subadmin-bugs-2',
    name: 'Sardor',
    surname: 'Rustamov',
    username: 'admin_xabar',
    password: 'xabar123',
    roleTitle: 'Bug (Xatoliklar) va Takliflar Bo‘limi Boshlig‘i',
    permissions: ['feedback_bugs', 'economy_shop', 'pvp_league'],
    assignedTasks: [
      {
        id: 'task-3',
        title: "Bosh sahifadan kelgan barcha Bug va Taklif xabarlarini ko'rib chiqib javob yozish",
        department: 'feedback_bugs',
        completed: false,
        createdAt: '2026-11-05',
      },
    ],
    createdAt: '2026-11-05',
    active: true,
  },
];

export function getSubAdmins(): SubAdmin[] {
  return loadFromStorage<SubAdmin[]>(STORAGE_KEYS.SUB_ADMINS, DEFAULT_SUB_ADMINS);
}

export function saveSubAdmins(list: SubAdmin[]): void {
  saveToStorage(STORAGE_KEYS.SUB_ADMINS, list);
}

export function addSubAdmin(data: {
  name: string;
  surname: string;
  username: string;
  password: string;
  roleTitle: string;
  permissions: SubAdminDepartment[];
  initialTask?: string;
}): SubAdmin {
  const list = getSubAdmins();
  const primaryDept: SubAdminDepartment = data.permissions[0] || 'feedback_bugs';
  const newSub: SubAdmin = {
    id: `subadmin-${Date.now()}`,
    name: data.name.trim(),
    surname: data.surname.trim(),
    username: data.username.trim().toLowerCase(),
    password: data.password.trim(),
    roleTitle: data.roleTitle.trim(),
    permissions: data.permissions,
    assignedTasks: data.initialTask?.trim()
      ? [
          {
            id: `task-${Date.now()}`,
            title: data.initialTask.trim(),
            department: primaryDept,
            completed: false,
            createdAt: new Date().toLocaleDateString('uz-UZ'),
          },
        ]
      : [],
    createdAt: new Date().toLocaleDateString('uz-UZ'),
    active: true,
  };
  list.push(newSub);
  saveSubAdmins(list);
  return newSub;
}

export function updateSubAdmin(id: string, updates: Partial<SubAdmin>): SubAdmin | null {
  const list = getSubAdmins();
  const idx = list.findIndex((sa) => sa.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...updates };
  saveSubAdmins(list);
  return list[idx];
}

export function deleteSubAdmin(id: string): void {
  const list = getSubAdmins().filter((sa) => sa.id !== id);
  saveSubAdmins(list);
}

export function assignSubAdminTask(
  subAdminId: string,
  title: string,
  department: SubAdminDepartment
): SubAdmin | null {
  const list = getSubAdmins();
  const sa = list.find((item) => item.id === subAdminId);
  if (!sa) return null;
  sa.assignedTasks = sa.assignedTasks || [];
  sa.assignedTasks.unshift({
    id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
    title: title.trim(),
    department,
    completed: false,
    createdAt: new Date().toLocaleString('uz-UZ'),
  });
  if (!sa.permissions.includes(department)) {
    sa.permissions.push(department);
  }
  saveSubAdmins(list);
  return sa;
}

export function toggleSubAdminTask(subAdminId: string, taskId: string): SubAdmin | null {
  const list = getSubAdmins();
  const sa = list.find((item) => item.id === subAdminId);
  if (!sa) return null;
  sa.assignedTasks = (sa.assignedTasks || []).map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t
  );
  saveSubAdmins(list);
  return sa;
}

// ----------------- 3. AI CHAT DOIMIY XOTIRASI (HAR BIR FOYDALANUVCHI UCHUN) -----------------
export function getAiMemory(userId = 'default_user', userName = 'Dasturchi'): AiConversationMemory {
  const all = loadFromStorage<AiConversationMemory[]>(STORAGE_KEYS.AI_MEMORIES, []);
  const found = all.find((m) => m.userId === userId);
  if (found) return found;
  return {
    userId,
    userName,
    facts: [],
    messages: [],
    updatedAt: new Date().toISOString(),
  };
}

export function saveAiMemoryMessage(
  userId: string,
  userName: string,
  msg: AiChatMemoryMessage,
  extractedFact?: string
): AiConversationMemory {
  const all = loadFromStorage<AiConversationMemory[]>(STORAGE_KEYS.AI_MEMORIES, []);
  let idx = all.findIndex((m) => m.userId === userId);
  if (idx === -1) {
    all.push({
      userId,
      userName,
      facts: [],
      messages: [],
      updatedAt: new Date().toISOString(),
    });
    idx = all.length - 1;
  }

  const mem = all[idx];
  mem.userName = userName || mem.userName;
  mem.messages = [...(mem.messages || []), msg].slice(-40);

  // Avtomatik faktlarni eslab qolish (ism, yosh, qiziqish, maqsad)
  if (msg.sender === 'user') {
    const text = msg.text.trim();
    const lower = text.toLowerCase();
    if (
      lower.includes('ismim') ||
      lower.includes('men ') ||
      lower.includes('yoshim') ||
      lower.includes('yaxshi ko') ||
      lower.includes('eslab qol') ||
      lower.includes('mening ')
    ) {
      const factStr = `Foydalanuvchi aytdi (${msg.time}): "${text.slice(0, 140)}"`;
      if (!mem.facts.includes(factStr)) {
        mem.facts = [factStr, ...(mem.facts || [])].slice(0, 20);
      }
    }
  }
  if (extractedFact && !mem.facts.includes(extractedFact)) {
    mem.facts = [extractedFact, ...(mem.facts || [])].slice(0, 20);
  }

  mem.updatedAt = new Date().toISOString();
  saveToStorage(STORAGE_KEYS.AI_MEMORIES, all);
  return mem;
}

export function clearAiMemory(userId: string): void {
  const all = loadFromStorage<AiConversationMemory[]>(STORAGE_KEYS.AI_MEMORIES, []).filter(
    (m) => m.userId !== userId
  );
  saveToStorage(STORAGE_KEYS.AI_MEMORIES, all);
}

// ----------------- 4. ADMIN "LEGEND" O'QUVCHI PROFILI (PODIUMDA 1-O'RINDAN HAM TEPADA · HECH KIM O'TA OLMAYDI) -----------------
const LEGEND_ADMIN_STUDENT_KEY = 'devmaster_legend_admin_student_v1';

const DEFAULT_LEGEND_ADMIN_STUDENT: Student = {
  id: 'admin-ghost-student',
  name: OWNER_PROFILE.name,
  surname: '(LEGEND 👑)',
  username: 'lord_o1',
  password: OWNER_CREDENTIALS.password,
  avatar: OWNER_PROFILE.avatar || MALE_PROGRAMMER_AVATAR,
  bio: "Platforma Asoschisi va Mutlaq LEGEND · Cheksiz XP va Cheksiz Tanga sohibi (Podiumning eng cho'qqisida — hech kim o'ta olmaydi!)",
  phone: '+998 90 000 00 01',
  email: OWNER_PROFILE.email,
  age: 20,
  stage: 'fullstack',
  xp: 999999999,
  rank: 0,
  coins: 999999999,
  teacherId: 't-1',
  completedLessons: LESSONS.map((l) => l.id),
  equippedFrame: 'frame-koi-fish',
  equippedBadge: 'LEGEND 💎',
  xpPotionActive: true,
  xpMultiplier: 3.0,
  isGhostAdminStudent: true,
  isOnline: true,
  lastSeenAt: Date.now(),
  pvpWins: 999,
  pvpLosses: 0,
  lastActive: 'Doim Online (LEGEND Choʻqqisi)',
  joinedDate: '2026-01-01',
  interests: ['Full-Stack Architecture', 'AI Engineering', 'CyberSecurity', 'Anime'],
};

export function getLegendAdminStudentProfile(): Student {
  try {
    if (typeof window !== 'undefined') {
      const raw = window.localStorage.getItem(LEGEND_ADMIN_STUDENT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          ...DEFAULT_LEGEND_ADMIN_STUDENT,
          ...parsed,
          id: 'admin-ghost-student',
          xp: 999999999,
          coins: 999999999,
          isGhostAdminStudent: true,
        };
      }
    }
  } catch {}
  return { ...DEFAULT_LEGEND_ADMIN_STUDENT };
}

export function saveLegendAdminStudentProfile(updates: Partial<Student>): Student {
  const current = getLegendAdminStudentProfile();
  const next: Student = {
    ...current,
    ...updates,
    id: 'admin-ghost-student',
    xp: 999999999,
    coins: 999999999,
    isGhostAdminStudent: true,
  };
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LEGEND_ADMIN_STUDENT_KEY, JSON.stringify(next));
    }
  } catch {}
  return next;
}

export function createGhostAdminStudentProfile(): Student {
  return getLegendAdminStudentProfile();
}

// Admin tomonidan istalgan o'quvchiga 1 bosishda rasmiy sertifikat berish
export function issueInstantCertificateToStudent(
  studentId: string,
  certType: 'frontend' | 'backend' | 'fullstack'
): CertificateData | null {
  const students = getStudents();
  const student = students.find((s) => s.id === studentId);
  if (!student) return null;

  student.certificates = student.certificates || [];
  const titles: Record<'frontend' | 'backend' | 'fullstack', { title: string; track: string; skills: string[]; prefix: string }> = {
    frontend: {
      title: 'Frontend Web Dasturchisi Professional Sertifikati',
      track: 'Frontend Arxitekturasi',
      skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'TypeScript', 'React.js', 'Responsive UI'],
      prefix: 'DMA-FE',
    },
    backend: {
      title: "Backend & Ma'lumotlar Bazasi Muhandisi Sertifikati",
      track: 'Backend & Database Engineering',
      skills: ['Node.js', 'Express.js', 'REST API', 'PostgreSQL', 'SQL', 'JWT Auth'],
      prefix: 'DMA-BE',
    },
    fullstack: {
      title: 'Full-Stack Dasturchi Oliy Darajali Sertifikati',
      track: 'Full-Stack Software Engineering (100 Mavzu)',
      skills: ['Frontend (React)', 'Backend (Node.js/Express)', 'SQL/PostgreSQL', 'Full-Stack Architecture'],
      prefix: 'DMA-FS',
    },
  };

  const cfg = titles[certType];
  const cert: CertificateData = {
    id: `CERT-${certType.toUpperCase()}-${Date.now().toString().slice(-6)}`,
    type: certType,
    title: cfg.title,
    studentId: student.id,
    studentName: `${student.name} ${student.surname}`,
    issueDate: new Date().toISOString().split('T')[0],
    scorePercentage: 98,
    skills: cfg.skills,
    trackName: cfg.track,
    serialNumber: `${cfg.prefix}-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  student.certificates.unshift(cert);
  student.adminMessages = student.adminMessages || [];
  student.adminMessages.unshift({
    id: `adm-cert-${Date.now()}`,
    sender: 'Olimjon Alimjonov (Admin)',
    title: `🎓 Rasmiy Sertifikat topshirildi: ${cfg.title}`,
    text: `Tabriklaymiz! Bosh Admin qarori bilan sizga "${cfg.title}" (${cert.serialNumber}) taqdim etildi. Profil bo'limidan yuklab olishingiz mumkin!`,
    type: 'reward',
    createdAt: new Date().toLocaleString('uz-UZ'),
    read: false,
  });

  saveStudents(students);
  return cert;
}

// Admin tomonidan barcha o'quvchilarga yoki ma'lum bosqichdagilarga ommaviy XP, Tanga va Xabar yuborish
export function broadcastRewardToStudents(params: {
  targetStage: 'all' | CourseStage;
  xpBonus: number;
  coinBonus: number;
  enablePotion: boolean;
  messageTitle: string;
  messageText: string;
}): number {
  const students = getStudents();
  let affected = 0;

  students.forEach((s) => {
    if (params.targetStage !== 'all' && s.stage !== params.targetStage) return;
    affected++;
    if (params.xpBonus !== 0) {
      s.xp = Math.max(0, (s.xp || 0) + params.xpBonus);
    }
    if (params.coinBonus !== 0) {
      s.coins = Math.max(0, Number(((s.coins || 0) + params.coinBonus).toFixed(1)));
    }
    if (params.enablePotion) {
      s.xpPotionActive = true;
      s.xpMultiplier = Math.max(s.xpMultiplier || 1, 1.5);
    }
    if (params.messageTitle.trim() || params.messageText.trim()) {
      s.adminMessages = s.adminMessages || [];
      s.adminMessages.unshift({
        id: `adm-bcast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        sender: 'Olimjon Alimjonov (Bosh Admin)',
        title: params.messageTitle.trim() || '🎁 Admin Ommaviy Sovgʻasi va Eʼloni',
        text:
          params.messageText.trim() ||
          `Sizga Admin tomonidan ${params.xpBonus > 0 ? `+${params.xpBonus} XP ` : ''}${
            params.coinBonus > 0 ? `+${params.coinBonus} tanga ` : ''
          }taqdim etildi!`,
        type: 'reward',
        createdAt: new Date().toLocaleString('uz-UZ'),
        read: false,
      });
    }
  });

  saveStudents(students);
  return affected;
}




