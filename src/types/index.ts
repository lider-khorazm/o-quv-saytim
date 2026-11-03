export type CourseStage =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'backend'
  | 'database'
  | 'fullstack'
  | 'graduated';

export type CertificateType = 'frontend' | 'backend' | 'fullstack';

export interface CertificateData {
  id: string; // e.g. "CERT-FE-2026-9821"
  type: CertificateType;
  title: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  scorePercentage: number;
  skills: string[];
  trackName: string;
  serialNumber: string;
}

export interface Student {
  id: string;
  name: string;
  surname: string;
  username: string; // Login
  password?: string; // Parol
  avatar: string;
  phone: string;
  email: string;
  age?: number; // Kamida 13 yosh bo'lishi shart
  stage: CourseStage;
  xp: number;
  rank: number;
  coins: number;
  teacherId: string; // Biriktirilgan ustoz (yoki AI Ustoz Temur)
  completedLessons: string[];
  quizScores?: Record<string, number>; // LessonId -> foiz
  gameScores?: Record<string, number>; // GameId -> ball
  certificates?: CertificateData[];
  ownedShopIds?: string[]; // Markaziy bazada saqlanadigan do'kon xaridlari
  equippedFrame?: string; // Markaziy bazada saqlanadigan profil ramkasi
  equippedBadge?: string; // Markaziy bazada saqlanadigan dasturchi unvoni
  claimedQuests?: string[]; // Bajarilgan kunlik vazifalar
  stageCompletedPendingTest?: CourseStage; // Ustoz test berishi kerak bo'lgan bosqich
  lastActive: string;
  joinedDate: string;
  isGoogleUser?: boolean;
  interests?: string[]; // Qiziqishlar (masalan: Frontend, AI, Game Dev, Anime, Kiberxavfsizlik)
}

export interface Teacher {
  id: string;
  name: string;
  surname: string;
  groupName?: string; // Guruh nomi
  username: string;
  password?: string;
  avatar: string;
  specialty: string;
  experienceYears: number;
  phone: string;
  email: string;
  bio: string;
  studentIds: string[];
  rating: number;
  activeSince: string;
  isAiTeacher?: boolean; // Groq asosidagi avtomatlashgan AI Ustoz
}

export interface AuthUser {
  id: string;
  name: string;
  role: 'owner' | 'teacher' | 'student';
  username: string;
  email?: string;
  avatar?: string;
  isGoogleUser?: boolean;
}

export interface OwnerProfile {
  name: string;
  username: string;
  email: string; // olimjonalimjonov12@gmail.com
  roleTitle: string;
  avatar: string;
  bio: string;
  interests: string[];
  quote: string;
}

export interface TestQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  points: number;
}

export type BackgroundType = 'default' | 'color' | 'gradient' | 'image_upload' | 'image_url';

export interface BackgroundConfig {
  type: BackgroundType;
  value: string;
  overlayOpacity?: number; // 0 to 0.9
  blur?: number;
}

export interface GeneratedTest {
  id: string; // Masalan: TEST-HTML-9821 yoki STAGE-AI-HTML-89241
  studentId: string;
  studentName: string;
  stage: CourseStage;
  targetStage?: CourseStage;
  isOneTimeStageExam?: boolean; // 1-martalik bosqich imtihoni (topshirilgach darhol o'chadi)
  teacherId: string;
  questionCount: number;
  questions: TestQuestion[];
  createdAt: string;
  expiresInMinutes: number;
  status: 'active' | 'completed' | 'expired';
}

export interface TestSubmissionResult {
  id: string;
  testId: string;
  studentId: string;
  studentName: string;
  teacherId: string;
  stage: CourseStage;
  score: number;
  totalQuestions: number;
  percentage: number;
  submittedAt: string;
  answers: {
    questionId: string;
    questionText: string;
    userAnswerIndex: number;
    correctAnswerIndex: number;
    isCorrect: boolean;
  }[];
  adminApprovedStageUpgrade: boolean;
}

export interface ExpelRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  studentId: string;
  studentName: string;
  reason: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

export interface TeacherNotification {
  id: string;
  teacherId: string;
  studentId: string;
  studentName: string;
  stage: CourseStage;
  type: 'needs_test' | 'student_message' | 'test_submitted';
  message: string;
  createdAt: string;
  read: boolean;
}

export interface GroupChatMessage {
  id: string;
  teacherId: string;
  senderId: string;
  senderName: string;
  senderRole: 'teacher' | 'student' | 'admin' | 'system';
  avatar?: string;
  text: string;
  timestamp: string;
  isTestAlert?: boolean;
  testId?: string;
}

export interface LessonSlide {
  id: number;
  badge: string; // Masalan: "1-Slayd: Kirish & Mohiyat"
  title: string;
  subtitle?: string;
  points: string[];
  codeSnippet?: string;
  highlightNote?: string;
}

export interface LessonCommonMistake {
  badCode: string;
  goodCode: string;
  explanation: string;
}

export interface LessonInterviewQuestion {
  question: string;
  answer: string;
}

export interface LessonQuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  stage: CourseStage;
  trackCategory?: string; // masalan: "HTML5 & Semantika", "Backend & Express", "Ma'lumotlar Bazasi (SQL)", "Full-Stack & DevOps"
  title: string;
  duration: string;
  xpReward: number;
  summary: string;
  codeExample: string;
  practiceTask: string;
  starterCode: string;
  solutionKeyword: string;
  w3ReferenceTopic?: string;
  theoryDetails?: string[];
  realWorldExamples?: string[];
  cheatSheetTips?: string[];
  slides?: LessonSlide[];
  deepExplanation?: string[];
  syntaxBreakdown?: { term: string; meaning: string }[];
  commonMistakes?: LessonCommonMistake[];
  interviewQuestions?: LessonInterviewQuestion[];
  quiz?: LessonQuizQuestion[]; // Darsdan so'ng XP olish uchun maxsus test
}

// Groq AI turlari
export interface GroqChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiAdminReport {
  id: string;
  date: string;
  generatedBy: 'Admin Jasur (Xavfsizlik & Monitoring)' | 'Admin Sherzod (Akademik & XP Tahlili)';
  totalActiveStudents: number;
  completedStagesCount: number;
  totalXpAccumulated: number;
  totalTestsTaken: number;
  averagePassRate: number;
  keyInsights: string[];
  actionRecommendations: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  category: 'html-css' | 'javascript' | 'react' | 'fullstack' | 'game' | 'utility';
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  tags: string[];
  likes: number;
  likedBy?: string[];
  views: number;
  createdAt: string;
  githubRepoUrl?: string;
  liveDemoUrl?: string;
}

export type HumorStyle = 'quvnoq' | 'sarkastik' | 'dono_jora' | 'otaku_hype';

export interface AiFriendPersona {
  id: string;
  name: string;
  avatar: string; // Emoji yoki rasm URL
  targetType: 'owner' | 'teacher' | 'student';
  targetId: string; // 'owner' | teacherId | studentId
  targetName: string; // Masalan: "Olimjon Alimjonov (Lord)" yoki "Ustoz Jamshid"
  humorStyle: HumorStyle;
  favoriteAnimes: string[]; // ['Naruto', 'One Piece', 'Jujutsu Kaisen', ...]
  catchphrase: string; // Masalan: "Shinra Tensei!", "Dattebayo!"
  customInstructions?: string;
  isActive: boolean;
  createdAt: string;
}

