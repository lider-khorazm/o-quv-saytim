import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Plus,
  Users,
  FolderGit2,
  Award,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { StudentProject, Contributor } from '../data/showcaseData';
import { StudentAccount } from '../data/learningCurriculum';
import { AuroraMascot } from './AuroraMascot';

interface AdminPanelProps {
  projects: StudentProject[];
  onApproveProject: (id: string) => void;
  onRejectProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  onAddProject: (newProject: StudentProject) => void;
  students: StudentAccount[];
  contributors: Contributor[];
  onClose: () => void;
}

export function AdminPanel({
  projects,
  onApproveProject,
  onRejectProject,
  onDeleteProject,
  onAddProject,
  students,
  contributors,
  onClose,
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'moderation' | 'students' | 'contributors'>('moderation');
  const [previewSnippet, setPreviewSnippet] = useState<string | null>(null);

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCategory, setNewCategory] = useState<
    'HTML & CSS' | 'Portfolio Vizitka' | 'Tanishuv Kartasi' | 'Interaktiv JS'
  >('Portfolio Vizitka');
  const [newDesc, setNewDesc] = useState('');
  const [newSnippet, setNewSnippet] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'legend_o1' && password.trim() === 'lord_o1') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg("Login yoki parol noto'g'ri! Qaytadan urinib ko'ring.");
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newStudentName.trim()) return;

    const project: StudentProject = {
      id: 'proj_' + Date.now(),
      studentName: newStudentName.trim(),
      studentEmail: `${newStudentName.toLowerCase().replace(/\s+/g, '')}@student.uz`,
      studentCity: newCity.trim() || 'Toshkent',
      title: newTitle.trim(),
      description: newDesc.trim() || 'Akademiyada yaratilgan portfolio ishi.',
      category: newCategory,
      htmlPreviewSnippet:
        newSnippet.trim() ||
        `<div style="padding:16px; background:#141225; color:#fff; border-radius:16px;"><h3>${newTitle}</h3><p>Muallif: ${newStudentName}</p></div>`,
      status: 'approved',
      submittedAt: 'Bugun',
      likes: 1,
      featured: true,
    };

    onAddProject(project);
    setShowAddModal(false);
    setNewTitle('');
    setNewStudentName('');
    setNewCity('');
    setNewDesc('');
    setNewSnippet('');
  };

  const pendingProjects = projects.filter((p) => p.status === 'pending');
  const approvedProjects = projects.filter((p) => p.status === 'approved');

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <div className="aurora-card max-w-sm w-full p-6 space-y-5">
          <div className="text-center">
            <AuroraMascot mood="happy" size={76} className="mx-auto mb-2" />
            <h3 className="text-lg font-black">Portfolio Admin Paneli</h3>
            <p className="text-xs opacity-70 mt-1">Akademiya ma'muriyati uchun yopiq tizim</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold mb-1">Foydalanuvchi logini</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoComplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Loginni kiriting..."
                  className="aurora-input text-xs pr-9"
                />
                <User className="w-4 h-4 opacity-50 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1">Maxfiy parol</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Parolni kiriting..."
                  className="aurora-input text-xs pr-9"
                />
                <Lock className="w-4 h-4 opacity-50 absolute right-3 top-3" />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-[#ff6b86] bg-[#ff6b86]/15 p-2.5 rounded-xl flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </p>
            )}

            <div className="pt-2 flex items-center gap-2">
              <button type="button" onClick={onClose} className="duo-btn duo-btn-surface flex-1 py-2.5 text-xs">
                Yopish
              </button>
              <button type="submit" className="duo-btn duo-btn-coral flex-1 py-2.5 text-xs">
                Kirish
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="aurora-card max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black">Akademiya Portfolio Boshqaruvi</h3>
                <span className="aurora-badge bg-[#3ee6c4]/20 text-[#3ee6c4]">Bosh administrator</span>
              </div>
              <p className="text-xs opacity-70">O'quvchilar ishlari va moderatsiya</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowAddModal(true)} className="duo-btn duo-btn-coral px-3.5 py-2 text-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>Yangi loyiha joylash</span>
            </button>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="duo-btn duo-btn-surface p-2 text-xs"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="duo-btn duo-btn-surface px-3.5 py-2 text-xs">
              Yopish
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 px-5 bg-white/5 gap-3 py-2.5 text-xs font-extrabold overflow-x-auto">
          <button
            onClick={() => setActiveTab('moderation')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'moderation' ? 'bg-[#ff6b86] text-white' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Loyihalar Moderatsiyasi ({pendingProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'students' ? 'bg-[#3ee6c4] text-[#052922]' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Akademiya O'quvchilari ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contributors')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'contributors' ? 'bg-[#ffd23f] text-[#2b1d00]' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Sayt Yaratuvchilari ({contributors.length})</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'moderation' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#ff6b86] mb-3 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" />
                  Kutilayotgan Portfoliolar ({pendingProjects.length})
                </h4>

                {pendingProjects.length === 0 ? (
                  <p className="text-xs opacity-70 bg-white/5 p-4 rounded-2xl border border-white/10">
                    Hozirda tasdiqlashni kutayotgan yangi ishlar yo'q.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {pendingProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-2xl bg-[#ff6b86]/10 border border-[#ff6b86]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black">{proj.title}</span>
                            <span className="aurora-badge bg-[#ff6b86]/20 text-[#ff6b86]">{proj.category}</span>
                          </div>
                          <p className="text-xs opacity-80">{proj.description}</p>
                          <div className="text-[11px] opacity-65">
                            Muallif: <strong>{proj.studentName}</strong> ({proj.studentCity}) · {proj.submittedAt}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setPreviewSnippet(proj.htmlPreviewSnippet)}
                            className="duo-btn duo-btn-surface px-3 py-1.5 text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Ko'rish</span>
                          </button>
                          <button
                            onClick={() => onApproveProject(proj.id)}
                            className="duo-btn duo-btn-mint px-3 py-1.5 text-xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tasdiqlash</span>
                          </button>
                          <button
                            onClick={() => onRejectProject(proj.id)}
                            className="duo-btn duo-btn-surface p-2 text-[#ff6b86]"
                            title="Rad etish"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-black uppercase tracking-wider opacity-60 mb-3">
                  Tasdiqlangan Portfoliolar ({approvedProjects.length})
                </h4>

                <div className="space-y-2.5">
                  {approvedProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white/5 border border-white/10 p-3.5 rounded-2xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-black mr-2">{proj.title}</span>
                        <span className="opacity-65">
                          by {proj.studentName} ({proj.studentCity})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPreviewSnippet(proj.htmlPreviewSnippet)}
                          className="duo-btn duo-btn-surface px-3 py-1 text-xs"
                        >
                          Kod / Demo
                        </button>
                        <button
                          onClick={() => onDeleteProject(proj.id)}
                          className="text-[#ff6b86] p-1.5"
                          title="O'chirish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {students.map((student, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-sm">{student.name}</span>
                    <span className="aurora-badge bg-[#ffd23f]/20 text-[#ffd23f] uppercase">
                      {student.currentStage} bosqich
                    </span>
                  </div>
                  <p className="opacity-70">{student.email}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contributors' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contributors.map((c) => (
                <div key={c.id} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-center space-y-2">
                  <img
                    src={c.avatarUrl}
                    alt={c.name}
                    className="w-16 h-16 rounded-2xl mx-auto object-cover border-2 border-[#ff6b86]"
                  />
                  <div>
                    <h5 className="font-black text-sm">{c.name}</h5>
                    <p className="text-[11px] text-[#ff6b86] font-bold">{c.role}</p>
                  </div>
                  <p className="text-xs opacity-75 text-left pt-2 border-t border-white/10">{c.contribution}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SNIPPET PREVIEW MODAL */}
      {previewSnippet && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="aurora-card max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-black">Loyiha Interaktiv Ko'rinishi</h4>
              <button onClick={() => setPreviewSnippet(null)} className="duo-btn duo-btn-surface px-3 py-1">
                ✕
              </button>
            </div>
            <div
              className="p-4 border border-white/15 rounded-2xl bg-white/5"
              dangerouslySetInnerHTML={{ __html: previewSnippet }}
            />
            <pre className="p-3 bg-black/60 text-[#3ee6c4] rounded-2xl text-xs font-mono max-h-36 overflow-auto">
              {previewSnippet}
            </pre>
            <button onClick={() => setPreviewSnippet(null)} className="duo-btn duo-btn-coral w-full py-2.5 text-xs">
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* CREATE NEW PROJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
          <div className="aurora-card max-w-md w-full p-6 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-sm font-black">Yangi O'quvchi Portfoliosini Joylash</h4>
              <button onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3 text-xs">
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Loyiha sarlavhasi"
                className="aurora-input py-2 text-xs"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="O'quvchi ismi"
                  className="aurora-input py-2 text-xs"
                />
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Shahar"
                  className="aurora-input py-2 text-xs"
                />
              </div>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="aurora-input py-2 text-xs"
              >
                <option value="Portfolio Vizitka">Portfolio Vizitka</option>
                <option value="Tanishuv Kartasi">Tanishuv Kartasi</option>
                <option value="HTML & CSS">HTML & CSS</option>
                <option value="Interaktiv JS">Interaktiv JS</option>
              </select>
              <textarea
                rows={2}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Tavsif..."
                className="aurora-input py-2 text-xs"
              />
              <textarea
                rows={3}
                value={newSnippet}
                onChange={(e) => setNewSnippet(e.target.value)}
                placeholder="<div>...</div>"
                className="aurora-input py-2 text-xs font-mono"
              />
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="duo-btn duo-btn-surface px-4 py-2 text-xs"
                >
                  Bekor qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-mint px-4 py-2 text-xs">
                  Tasdiqlab joylash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
