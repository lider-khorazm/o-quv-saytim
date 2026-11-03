import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Users,
  Send,
  KeyRound,
  Edit3,
  Check,
  X,
  ArrowLeft,
  Bot,
  RefreshCw
} from 'lucide-react';
import { Teacher, Student, GroupChatMessage, CourseStage } from '../types';
import { getGroupMessages, sendGroupMessage, updateTeacherGroupName, createTest } from '../services/storage';
import { askAiTeacher } from '../services/groqService';
import { AvatarBadge } from './AvatarBadge';
import { AuroraMascot } from './AuroraMascot';

interface GroupChatModalProps {
  teacher: Teacher;
  allTeachers?: Teacher[];
  students: Student[];
  currentRole: 'student' | 'teacher' | 'admin';
  currentStudent: Student | null;
  onClose: () => void;
  onStartTestWithId: (testId: string) => void;
  onUpdateGroupName?: (teacherId: string, newName: string) => void;
}

export const GroupChatModal: React.FC<GroupChatModalProps> = ({
  teacher,
  allTeachers,
  students,
  currentRole,
  currentStudent,
  onClose,
  onStartTestWithId,
  onUpdateGroupName,
}) => {
  const [activeTeacherId, setActiveTeacherId] = useState<string>(teacher?.id || 't-1');
  const [messages, setMessages] = useState<GroupChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [showMembers, setShowMembers] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [aiReplying, setAiReplying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (teacher?.id) {
      setActiveTeacherId(teacher.id);
    }
  }, [teacher?.id]);

  const fallbackTeacher: Teacher = {
    id: 't-1',
    name: "O'qituvchi",
    surname: 'Ustoz',
    username: 'teacher1',
    avatar: '👨‍🏫',
    specialty: 'Web Dasturlash',
    bio: '',
    experienceYears: 3,
    phone: '+998901234567',
    email: 'teacher@devmaster.uz',
    studentIds: [],
    rating: 5,
    activeSince: '2024',
    groupName: 'Frontend Guruh',
  };

  const activeTeacher =
    allTeachers?.find((t) => t.id === activeTeacherId) || teacher || fallbackTeacher;

  const [nameInput, setNameInput] = useState(
    activeTeacher?.groupName || `${activeTeacher?.name || 'Guruh'} Guruhi`
  );

  useEffect(() => {
    setNameInput(activeTeacher.groupName || `${activeTeacher.name} Guruhi`);
    setIsEditingName(false);
  }, [activeTeacher.id, activeTeacher.groupName]);

  const groupStudents = students.filter((s) => s.teacherId === activeTeacher.id);

  const loadMessages = () => {
    const list = getGroupMessages(activeTeacher.id);
    setMessages(list);
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [activeTeacher.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSaveGroupName = () => {
    if (!nameInput.trim()) return;
    const trimmed = nameInput.trim();
    updateTeacherGroupName(activeTeacher.id, trimmed);
    if (onUpdateGroupName) {
      onUpdateGroupName(activeTeacher.id, trimmed);
    }
    setIsEditingName(false);
    loadMessages();
  };

  // Ustoz ish bilan band bo'lganda Ustozning AI Yordamchisi guruhda javob beradi
  const handleAskTeacherAiHelper = async (customPrompt?: string) => {
    if (aiReplying) return;
    const questionText = (customPrompt ?? inputText).trim();

    let senderId = 'anonymous';
    let senderName = 'Talaba';
    const senderRole: 'student' | 'teacher' | 'admin' = currentRole;
    let avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';

    if (currentRole === 'teacher') {
      senderId = activeTeacher.id;
      senderName = `${activeTeacher.name} ${activeTeacher.surname} (Ustoz)`;
      avatar = activeTeacher.avatar;
    } else if (currentRole === 'admin') {
      senderId = 'admin';
      senderName = 'Bosh Administrator';
    } else if (currentStudent) {
      senderId = currentStudent.id;
      senderName = `${currentStudent.name} ${currentStudent.surname}`;
      avatar = currentStudent.avatar;
    }

    if (questionText) {
      sendGroupMessage({
        teacherId: activeTeacher.id,
        senderId,
        senderName,
        senderRole,
        avatar,
        text: questionText,
      });
      if (!customPrompt) setInputText('');
      loadMessages();
    }

    setAiReplying(true);
    try {
      const lower = questionText.toLowerCase();
      // If student asks for a test / imtihon when teacher is away, AI assistant creates a Test ID right away!
      if (
        currentStudent &&
        (lower.includes('test') || lower.includes('imtihon') || lower.includes('id ber'))
      ) {
        const stageKey: CourseStage =
          currentStudent.stage === 'css'
            ? 'css'
            : currentStudent.stage === 'javascript' || currentStudent.stage === 'graduated'
            ? 'javascript'
            : 'html';
        createTest({
          teacherId: activeTeacher.id,
          studentId: currentStudent.id,
          studentName: `${currentStudent.name} ${currentStudent.surname}`,
          stage: stageKey,
          questionCount: 8,
        });
        loadMessages();
        setAiReplying(false);
        return;
      }

      const res = await askAiTeacher({
        action: 'chat',
        studentName: currentStudent ? `${currentStudent.name} ${currentStudent.surname}` : senderName,
        studentStage: currentStudent ? currentStudent.stage : 'html',
        userPrompt:
          questionText ||
          "Ustoz hozir ish bilan band ekan, menga hozirgi bosqichim bo'yicha qisqa dars maslahati va vazifa ber!",
      });

      sendGroupMessage({
        teacherId: activeTeacher.id,
        senderId: activeTeacher.id,
        senderName: `🤖 Ustoz AI (${activeTeacher.name} yordamchisi)`,
        senderRole: 'teacher',
        avatar: activeTeacher.avatar,
        text: `👨‍🏫 [Ustozning AI Yordamchisi]:\n${res.text}`,
      });
      loadMessages();
    } finally {
      setAiReplying(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const trimmed = inputText.trim();
    let senderId = 'anonymous';
    let senderName = 'Mehmon';
    const senderRole: 'student' | 'teacher' | 'admin' = currentRole;
    let avatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';

    if (currentRole === 'teacher') {
      senderId = activeTeacher.id;
      senderName = `${activeTeacher.name} ${activeTeacher.surname} (Ustoz)`;
      avatar = activeTeacher.avatar;
    } else if (currentRole === 'admin') {
      senderId = 'admin';
      senderName = 'Bosh Administrator';
      avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200';
    } else if (currentStudent) {
      senderId = currentStudent.id;
      senderName = `${currentStudent.name} ${currentStudent.surname}`;
      avatar = currentStudent.avatar;
    }

    sendGroupMessage({
      teacherId: activeTeacher.id,
      senderId,
      senderName,
      senderRole,
      avatar,
      text: trimmed,
    });

    setInputText('');
    loadMessages();
  };

  const currentGroupName = activeTeacher.groupName || `${activeTeacher.name} Guruhi`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="aurora-card max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden relative">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onClose}
              className="duo-btn duo-btn-surface px-3 py-2 text-xs shrink-0"
              title="Panelga qaytish"
            >
              <ArrowLeft className="w-4 h-4 text-[#3ee6c4]" />
              <span>Orqaga</span>
            </button>

            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3ee6c4] to-[#b6f03c] text-[#052922] flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                {isEditingName ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSaveGroupName();
                        }
                      }}
                      className="aurora-input py-1 px-2.5 text-xs w-44"
                      autoFocus
                    />
                    <button onClick={handleSaveGroupName} className="duo-btn duo-btn-mint p-1.5 text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setNameInput(currentGroupName);
                        setIsEditingName(false);
                      }}
                      className="duo-btn duo-btn-surface p-1.5 text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-base font-black flex items-center gap-1.5">
                      <span>{currentGroupName}</span>
                      {currentRole === 'teacher' && activeTeacher.id === teacher.id && (
                        <button
                          onClick={() => setIsEditingName(true)}
                          className="p-1 opacity-70 hover:opacity-100 text-[#ffd23f]"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </h3>
                    <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">
                      {groupStudents.length} / 15 Talaba + Ustoz
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs opacity-70 mt-0.5">
                Ustoz: <strong className="text-[#ffd23f]">{activeTeacher.name} {activeTeacher.surname}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowMembers(!showMembers)}
              className="duo-btn duo-btn-surface px-3 py-2 text-xs"
            >
              <Users className="w-3.5 h-3.5 text-[#3ee6c4]" />
              <span className="hidden sm:inline">A'zolar</span> ({groupStudents.length + 2})
            </button>

            <button onClick={onClose} className="duo-btn duo-btn-surface w-9 h-9">
              ✕
            </button>
          </div>
        </div>

        {/* Admin Multi-Group Switcher */}
        {currentRole === 'admin' && allTeachers && allTeachers.length > 0 && (
          <div className="bg-white/5 border-b border-white/10 px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-black uppercase tracking-wider opacity-60 shrink-0">
              Guruhni tanlang:
            </span>
            <div className="flex items-center gap-1.5">
              {allTeachers.map((t) => {
                const isSelected = t.id === activeTeacherId;
                const count = students.filter((s) => s.teacherId === t.id).length;
                const gName = t.groupName || `${t.name} Guruhi`;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTeacherId(t.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow'
                        : 'bg-white/5 opacity-75 hover:opacity-100 border border-white/10'
                    }`}
                  >
                    <span>{gName}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-black/20">
                      {count}/15
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Chat Body */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto space-y-4">
            <div className="space-y-3.5">
              {messages.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <AuroraMascot mood="waving" size={76} className="mx-auto" />
                  <p className="text-xs opacity-70 font-bold">
                    Bu guruhda hali xabarlar yo'q. Birinchi bo'lib xabar qoldiring!
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  if (msg.senderRole === 'system') {
                    return (
                      <div key={msg.id} className="flex justify-center my-2">
                        <div className="bg-white/10 border border-white/15 rounded-full px-4 py-1 text-[11px] font-bold flex items-center gap-2">
                          <span>{msg.text}</span>
                          <span className="text-[9px] opacity-60 font-mono">{msg.timestamp}</span>
                        </div>
                      </div>
                    );
                  }

                  const isMe =
                    (currentRole === 'teacher' && msg.senderRole === 'teacher') ||
                    (currentRole === 'admin' && msg.senderRole === 'admin') ||
                    (currentStudent && msg.senderId === currentStudent.id);

                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                    >
                      <AvatarBadge
                        name={msg.senderName}
                        role={msg.senderRole}
                        size="sm"
                        className="w-8 h-8 mt-1 text-[11px]"
                      />

                      <div
                        className={`max-w-md rounded-2xl p-3.5 text-xs shadow-md ${
                          msg.isTestAlert
                            ? 'bg-gradient-to-r from-[#ff6b86]/25 to-[#ffd23f]/25 border-2 border-[#ffd23f] w-full'
                            : isMe
                            ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white'
                            : 'bg-white/8 border border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <span className="font-black flex items-center gap-1.5">
                            {msg.senderRole === 'admin' && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#ffd23f] text-[#2b1d00] font-black">
                                ADMIN
                              </span>
                            )}
                            {msg.senderRole === 'teacher' && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#3ee6c4] text-[#052922] font-black">
                                USTOZ
                              </span>
                            )}
                            {msg.senderName}
                          </span>
                          <span className="text-[10px] opacity-65 font-mono">{msg.timestamp}</span>
                        </div>

                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                        {msg.isTestAlert && msg.testId && (
                          <div className="mt-3 pt-2.5 border-t border-white/15 flex items-center justify-between">
                            <span className="text-[11px] font-mono text-[#ffd23f] font-black bg-black/30 px-2.5 py-1 rounded-xl border border-[#ffd23f]/40">
                              {msg.testId}
                            </span>
                            <button
                              onClick={() => {
                                onClose();
                                onStartTestWithId(msg.testId || '');
                              }}
                              className="duo-btn duo-btn-gold px-3.5 py-1.5 text-xs"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                              <span>Testga Kirish</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
              {aiReplying && (
                <div className="flex items-center gap-2 text-xs text-[#3ee6c4] bg-[#3ee6c4]/10 border border-[#3ee6c4]/30 px-3.5 py-2.5 rounded-2xl w-fit">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="font-bold">🤖 Ustoz AI yordamchisi javob yozmoqda...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Ustoz band bo'lganda AI Yordamchi tezkor tugmalari */}
            <div className="mt-2 pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[11px] font-bold text-[#ffd23f] flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#3ee6c4]" />
                  <span>Ustoz bandmi? Ustozning AI Yordamchisidan so'rang:</span>
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    disabled={aiReplying}
                    onClick={() =>
                      handleAskTeacherAiHelper(
                        "Ustoz AI, menga hozirgi bosqichimdagi darsimni sodda misol bilan tushuntirib bering!"
                      )
                    }
                    className="px-2.5 py-1 rounded-xl bg-[#3ee6c4]/15 hover:bg-[#3ee6c4]/25 border border-[#3ee6c4]/30 text-[#3ee6c4] text-[11px] font-extrabold transition-all cursor-pointer disabled:opacity-50"
                  >
                    🤖 Darsni tushuntir
                  </button>
                  {currentRole === 'student' && currentStudent && (
                    <button
                      type="button"
                      disabled={aiReplying}
                      onClick={() =>
                        handleAskTeacherAiHelper(
                          "Ustoz AI, ustoz hozir band ekan, menga bosqich imtihoni uchun Test ID yaratib bering!"
                        )
                      }
                      className="px-2.5 py-1 rounded-xl bg-[#ffd23f]/15 hover:bg-[#ffd23f]/25 border border-[#ffd23f]/30 text-[#ffd23f] text-[11px] font-extrabold transition-all cursor-pointer disabled:opacity-50"
                    >
                      🔑 AI dan Test ID olish
                    </button>
                  )}
                </div>
              </div>

              {/* Input form */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Xabar yozing (yoki savol yozib '🤖 Ustoz AI' tugmasini bosing)..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="aurora-input flex-1 text-xs py-3"
                />
                <button
                  type="button"
                  disabled={aiReplying}
                  onClick={() => handleAskTeacherAiHelper()}
                  className="duo-btn duo-btn-gold px-3.5 py-3 text-xs shrink-0"
                  title="Ustoz ish bilan band bo'lsa, Ustozning AI Yordamchisidan javob olish"
                >
                  <Bot className="w-4 h-4" />
                  <span className="hidden sm:inline">Ustoz AI</span>
                </button>
                <button type="submit" className="duo-btn duo-btn-mint px-5 py-3 text-xs shrink-0">
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline">Yuborish</span>
                </button>
              </form>
            </div>
          </div>

          {/* Members Sidebar */}
          {showMembers && (
            <div className="w-64 bg-black/30 border-l border-white/10 p-4 flex flex-col justify-between overflow-y-auto text-xs">
              <div>
                <h4 className="font-black mb-3 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#3ee6c4]" />
                  <span>Guruh A'zolari</span>
                </h4>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-7 h-7 rounded-xl bg-[#ffd23f]/20 text-[#ffd23f] flex items-center justify-center font-black">
                      A
                    </div>
                    <div>
                      <span className="font-black block">Bosh Admin</span>
                      <span className="text-[10px] text-[#ffd23f] font-bold">Moderator</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-[#3ee6c4]/10 border border-[#3ee6c4]/30">
                    <AvatarBadge
                      name={`${activeTeacher.name} ${activeTeacher.surname}`}
                      role="teacher"
                      size="sm"
                      className="w-7 h-7 text-[10px]"
                    />
                    <div>
                      <span className="font-black block">
                        {activeTeacher.name} {activeTeacher.surname}
                      </span>
                      <span className="text-[10px] text-[#3ee6c4] font-bold">Ustoz / Mentor</span>
                    </div>
                  </div>

                  <span className="text-[10px] opacity-60 font-bold block pt-2">
                    Guruh Talabalari ({groupStudents.length} / 15)
                  </span>

                  <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                    {groupStudents.map((st) => (
                      <div
                        key={st.id}
                        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <AvatarBadge
                          name={`${st.name} ${st.surname}`}
                          role="student"
                          size="sm"
                          className="w-6 h-6 text-[9px] rounded-lg"
                        />
                        <div className="truncate flex-1">
                          <span className="font-bold block truncate">
                            {st.name} {st.surname}
                          </span>
                          <span className="text-[9px] text-[#ffd23f] uppercase font-mono">
                            {st.stage} • {st.xp} XP
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 text-[10px] opacity-50 text-center">
                Maksimal 15 talaba + 1 Ustoz + Admin
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
