import React, { useState } from 'react';
import {
  Award,
  Users,
  Eye,
  Star,
  Send,
  PlusCircle,
  Code2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { Contributor, StudentProject } from '../data/showcaseData';

interface ShowcaseGalleryProps {
  contributors: Contributor[];
  projects: StudentProject[];
  onSubmitProject: (project: StudentProject) => void;
  onLikeProject: (id: string) => void;
}

export function ShowcaseGallery({
  contributors,
  projects,
  onSubmitProject,
  onLikeProject,
}: ShowcaseGalleryProps) {
  const [selectedPreview, setSelectedPreview] = useState<StudentProject | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentCity, setStudentCity] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'HTML & CSS' | 'Portfolio Vizitka' | 'Tanishuv Kartasi' | 'Interaktiv JS'>('Portfolio Vizitka');
  const [snippet, setSnippet] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const approvedProjects = projects.filter((p) => p.status === 'approved');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setSnippet(content);
        const titleMatch = content.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1] && !title.trim()) {
          setTitle(titleMatch[1].trim());
        }
      }
    };
    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !title.trim()) return;

    const newProject: StudentProject = {
      id: 'sub_' + Date.now(),
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim() || `${studentName.toLowerCase().replace(/\s+/g, '')}@student.uz`,
      studentCity: studentCity.trim() || 'Toshkent',
      title: title.trim(),
      description: description.trim() || 'VS Code da yaratilgan birinchi HTML portfolio ishi.',
      category: category,
      htmlPreviewSnippet:
        snippet.trim() ||
        `<div style="padding:16px; background:#151226; color:#fff; border:2px solid #ff6b86; border-radius:16px; font-family:sans-serif;"><h3>${title}</h3><p>Muallif: ${studentName}</p></div>`,
      status: 'pending',
      submittedAt: 'Bugun',
      likes: 0,
      featured: false,
    };

    onSubmitProject(newProject);
    setSubmittedFeedback(true);
    setTimeout(() => {
      setSubmittedFeedback(false);
      setShowSubmitModal(false);
      setStudentName('');
      setTitle('');
      setDescription('');
      setSnippet('');
      setUploadedFileName(null);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="aurora-card rounded-[2rem] border-2 border-[#ffd23f]/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-black text-[#ffd23f] bg-[#ffd23f]/15 px-3 py-1 rounded-full inline-flex items-center gap-1.5 border border-[#ffd23f]/30">
              <Award className="w-3.5 h-3.5" />
              <span>Loyiha Ishtirokchilari &amp; Eng Yaxshi Ishlar</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--aurora-text)] tracking-tight font-display">
            Akademiya Portfoliolar Galereyasi
          </h2>
          <p className="text-xs sm:text-sm text-[var(--aurora-text-muted)] mt-1">
            Saytni yaratishda qatnashgan mutaxassislar va o&apos;quvchilarning tasdiqlangan eng yaxshi loyihalari
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSubmitModal(true)}
          className="duo-btn duo-btn-coral px-4 py-2.5 text-xs flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>1-ishingizni (portfolio) topshiring</span>
        </button>
      </div>

      {/* SECTION 1: PLATFORM CONTRIBUTORS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-[var(--aurora-text)] flex items-center gap-2 font-display">
            <Users className="w-4 h-4 text-[#ff6b86]" />
            <span>Saytni Yasashda Qatnashganlar</span>
          </h3>
          <span className="text-xs text-[var(--aurora-text-muted)] font-bold">3 nafar asosiy muallif</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contributors.map((c) => (
            <div
              key={c.id}
              className="aurora-card rounded-2xl border border-[var(--aurora-border)] p-5 space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={c.avatarUrl}
                  alt={c.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#ff6b86]/40"
                />
                <div>
                  <h4 className="font-black text-[var(--aurora-text)] text-sm font-display">{c.name}</h4>
                  <p className="text-xs font-bold text-[#ff6b86]">{c.role}</p>
                  <p className="text-[11px] text-[var(--aurora-text-muted)]">{c.city}</p>
                </div>
              </div>

              <p className="text-xs text-[var(--aurora-text-muted)] leading-relaxed">{c.contribution}</p>

              <div className="pt-2 border-t border-[var(--aurora-border)] flex flex-wrap gap-1.5">
                {c.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-[var(--aurora-surface-2)] text-[#3ee6c4] border border-[#3ee6c4]/30 px-2 py-0.5 rounded-lg font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: APPROVED BEST STUDENT PORTFOLIOS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[var(--aurora-text)] flex items-center gap-2 font-display">
              <Award className="w-4 h-4 text-[#ffd23f]" />
              <span>Eng Yaxshi O&apos;quvchilar Loyihalari</span>
            </h3>
            <p className="text-xs text-[var(--aurora-text-muted)]">
              Admin tomonidan tasdiqlangan 1-portfolio ishlari
            </p>
          </div>
          <span className="text-xs font-black text-[#b6f03c] bg-[#b6f03c]/15 border border-[#b6f03c]/30 px-3 py-1 rounded-full">
            {approvedProjects.length} ta tasdiqlangan ish
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {approvedProjects.map((project) => (
            <div
              key={project.id}
              className="aurora-card rounded-2xl border border-[var(--aurora-border)] overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#3ee6c4] bg-[#3ee6c4]/15 px-2.5 py-0.5 rounded-full">
                      {project.category}
                    </span>
                    <h4 className="font-black text-[var(--aurora-text)] text-base mt-1.5 font-display">
                      {project.title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => onLikeProject(project.id)}
                    className="inline-flex items-center gap-1 text-xs text-[#ffd23f] bg-[#ffd23f]/15 hover:bg-[#ffd23f]/25 px-3 py-1.5 rounded-xl font-black font-mono transition-colors cursor-pointer"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="tabular-nums">{project.likes}</span>
                  </button>
                </div>

                <p className="text-xs text-[var(--aurora-text-muted)] leading-relaxed">{project.description}</p>

                <div className="rounded-xl border border-[var(--aurora-border)] overflow-hidden bg-[var(--aurora-surface-2)] p-3 max-h-32 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: project.htmlPreviewSnippet }} />
                </div>
              </div>

              <div className="px-5 py-3 bg-[var(--aurora-surface-2)] border-t border-[var(--aurora-border)] flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-[var(--aurora-text)]">{project.studentName}</span>
                  <span className="text-[var(--aurora-text-muted)]"> · {project.studentCity}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPreview(project)}
                  className="inline-flex items-center gap-1 text-xs font-black text-[#ff6b86] hover:underline cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Katta ko&apos;rish</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SUBMIT MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-pop-in">
          <div className="aurora-card rounded-[2rem] max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 border-2 border-[#ff6b86]/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--aurora-border)]">
              <div>
                <h3 className="text-base font-black text-[var(--aurora-text)] font-display">
                  O&apos;z 1-Ishingizni (Portfolio) Topshirish
                </h3>
                <p className="text-xs text-[var(--aurora-text-muted)]">
                  Loyiha admin tomonidan ko&apos;rib chiqiladi va galereyaga joylanadi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="p-1.5 text-[var(--aurora-text-muted)] hover:text-[#ff5263] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedFeedback ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-[#b6f03c] mx-auto" />
                <h4 className="text-sm font-black text-[var(--aurora-text)]">
                  Rahmat! Ishingiz muvaffaqiyatli topshirildi.
                </h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-black text-[var(--aurora-text)] mb-1">
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Sardorbek"
                      className="aurora-input w-full px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-black text-[var(--aurora-text)] mb-1">
                      Shahringiz
                    </label>
                    <input
                      type="text"
                      value={studentCity}
                      onChange={(e) => setStudentCity(e.target.value)}
                      placeholder="Toshkent"
                      className="aurora-input w-full px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-black text-[var(--aurora-text)] mb-1">
                    Loyiha sarlavhasi *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Shaxsiy Vizitka"
                    className="aurora-input w-full px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block font-black text-[var(--aurora-text)] mb-1">
                    Kategoriya
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="aurora-input w-full px-3 py-2"
                  >
                    <option value="Portfolio Vizitka">Portfolio Vizitka</option>
                    <option value="Tanishuv Kartasi">Tanishuv Kartasi</option>
                    <option value="HTML & CSS">HTML &amp; CSS</option>
                    <option value="Interaktiv JS">Interaktiv JS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-[var(--aurora-text)] mb-1">
                    Tavsif
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="aurora-input w-full px-3 py-2"
                  />
                </div>

                <div className="p-3 bg-[#ffd23f]/10 border border-[#ffd23f]/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#ffd23f] flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" />
                      <span>.html faylni yuklash:</span>
                    </span>
                    {uploadedFileName && (
                      <span className="text-[11px] font-mono font-black text-[#b6f03c]">
                        ✓ {uploadedFileName}
                      </span>
                    )}
                  </div>
                  <label className="duo-btn duo-btn-surface px-3 py-1.5 text-xs inline-flex items-center gap-2 cursor-pointer">
                    <span>📁 .html fayl tanlash</span>
                    <input
                      type="file"
                      accept=".html,.htm"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block font-black text-[var(--aurora-text)] mb-1">
                    HTML kodingiz *
                  </label>
                  <textarea
                    rows={4}
                    value={snippet}
                    onChange={(e) => setSnippet(e.target.value)}
                    className="aurora-input w-full px-3 py-2 font-mono text-xs"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(false)}
                    className="duo-btn duo-btn-surface px-4 py-2 text-xs"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="duo-btn duo-btn-coral px-5 py-2 text-xs flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Adminga topshirish</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* FULL PREVIEW MODAL */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-pop-in">
          <div className="aurora-card rounded-[2rem] max-w-2xl w-full p-6 border-2 border-[#3ee6c4]/40 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--aurora-border)]">
              <div>
                <span className="text-[10px] font-black text-[#3ee6c4] uppercase bg-[#3ee6c4]/15 px-2.5 py-0.5 rounded-full">
                  {selectedPreview.category}
                </span>
                <h3 className="text-base font-black text-[var(--aurora-text)] mt-1 font-display">
                  {selectedPreview.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="text-[var(--aurora-text-muted)] hover:text-[#ff5263] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl border border-[var(--aurora-border)] bg-white overflow-hidden">
              <iframe
                title={selectedPreview.title}
                srcDoc={selectedPreview.htmlPreviewSnippet}
                className="w-full h-56 border-0 bg-white"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>

            <pre className="p-3 bg-[#0a0912] text-[#3ee6c4] rounded-xl text-xs font-mono max-h-36 overflow-y-auto border border-white/10">
              <code>{selectedPreview.htmlPreviewSnippet}</code>
            </pre>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedPreview(null)}
                className="duo-btn duo-btn-surface w-full py-2.5 text-xs"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
