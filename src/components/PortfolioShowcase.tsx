import React, { useState } from 'react';
import {
  Code2,
  Plus,
  Star,
  Play,
  Sparkles,
  Maximize2,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PortfolioProject, AuthUser, Student } from '../types';
import { getPortfolioProjects, addPortfolioProject, likePortfolioProject } from '../services/storage';
import { AuroraMascot } from './AuroraMascot';

interface PortfolioShowcaseProps {
  currentUser: AuthUser | null;
  student: Student | null;
  onOpenLogin?: () => void;
}

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  currentUser,
  student,
  onOpenLogin,
}) => {
  const [projects, setProjects] = useState<PortfolioProject[]>(() => getPortfolioProjects());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Codespace Sandbox Modal
  const [activeCodespaceProject, setActiveCodespaceProject] = useState<PortfolioProject | null>(null);
  const [activeEditorTab, setActiveEditorTab] = useState<'html' | 'css' | 'js'>('html');
  const [editedHtml, setEditedHtml] = useState('');
  const [editedCss, setEditedCss] = useState('');
  const [editedJs, setEditedJs] = useState('');

  // Add Project Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<'html-css' | 'javascript' | 'react' | 'fullstack' | 'game' | 'utility'>('javascript');
  const [newHtml, setNewHtml] = useState(`<div style="padding: 30px; text-align: center; color: #fff; background: #0a0912; min-height: 100vh; font-family: sans-serif;">
  <h1 style="color: #ff6b86; font-size: 26px;">Mening Yangi Loyiham 🚀</h1>
  <p style="color: #b8b2cc;">DevMaster Portfoliolar Tuynigida chop etilgan loyiha</p>
  <button onclick="bosildi()" style="padding: 10px 20px; background: #ffd23f; color: #0a0912; border: none; border-radius: 12px; font-weight: bold; cursor: pointer;">
    Meni Bosing
  </button>
  <div id="natija" style="margin-top: 20px; font-size: 16px; color: #3ee6c4;"></div>
</div>`);
  const [newCss, setNewCss] = useState('body { margin: 0; }');
  const [newJs, setNewJs] = useState(`function bosildi() {
  document.getElementById('natija').textContent = "Zo'r! Kod muvaffaqiyatli ishladi! ✨";
}`);
  const [newTags, setNewTags] = useState('Frontend, JavaScript, HTML5');

  const categories = [
    { id: 'all', name: 'Barcha Loyihalar' },
    { id: 'html-css', name: 'HTML & CSS' },
    { id: 'javascript', name: 'JavaScript ES6+' },
    { id: 'game', name: "O'yinlar (Game Dev)" },
    { id: 'react', name: 'React & Ilovalar' },
    { id: 'fullstack', name: 'Full-Stack' },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLike = (projectId: string) => {
    const studentId = student?.id || currentUser?.id || 'guest-user';
    const { likes } = likePortfolioProject(projectId, studentId);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, likes } : p))
    );
  };

  const handleOpenCodespace = (project: PortfolioProject) => {
    setActiveCodespaceProject(project);
    setEditedHtml(project.htmlCode);
    setEditedCss(project.cssCode);
    setEditedJs(project.jsCode);
    setActiveEditorTab('html');
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;

    const authorName = currentUser?.name || student?.name || 'Talaba Dasturchi';
    const authorId = currentUser?.id || student?.id || 'talaba';

    const tagsArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addPortfolioProject({
      title: newTitle.trim(),
      description: newDescription.trim(),
      authorId,
      authorName,
      category: newCategory,
      htmlCode: newHtml,
      cssCode: newCss,
      jsCode: newJs,
      tags: tagsArray.length > 0 ? tagsArray : ['Web Dev', 'Portfolio'],
    });

    setProjects(getPortfolioProjects());
    setShowAddModal(false);
    setNewTitle('');
    setNewDescription('');

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b86', '#ff8a3d', '#3ee6c4', '#ffd23f'],
      });
    } catch {}
  };

  const getPreviewDoc = (html: string, css: string, js: string) => {
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>
    try {
      ${js}
    } catch (e) {
      console.error(e);
    }
  </script>
</body>
</html>`;
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-[2rem] aurora-card border-2 border-[#ff6b86]/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3ee6c4]/15 border border-[#3ee6c4]/30 text-[#3ee6c4] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DevMaster Codespaces &amp; Portfolio Hub</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--aurora-text)] tracking-tight font-display">
              Portfoliolar Tuynigi 🌐
            </h1>
            <p className="text-sm text-[var(--aurora-text-muted)] leading-relaxed">
              O&apos;quvchilar va dasturchilar tomonidan yaratilgan barcha mustaqil veb-saytlar, interaktiv o&apos;yinlar va mini ilovalar markazi. Har qanday loyiha kodini jonli ochib ko&apos;ring va o&apos;z loyihangizni joylashtiring!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <AuroraMascot mood="happy" size={56} className="hidden sm:block" />
            <button
              type="button"
              onClick={() => {
                if (!currentUser && onOpenLogin) {
                  onOpenLogin();
                } else {
                  setShowAddModal(true);
                }
              }}
              className="duo-btn duo-btn-coral px-5 py-3 text-xs sm:text-sm flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Loyiha Joylashtirish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all whitespace-nowrap border cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-[#ff6b86] border-[#ff6b86] text-[#0a0912] shadow-md'
                  : 'bg-[var(--aurora-surface-2)] border-[var(--aurora-border)] text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Loyiha yoki dasturchi qidiruv..."
            className="aurora-input w-full px-4 py-2.5 text-xs"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="aurora-card rounded-[2rem] border-2 border-[var(--aurora-border)] hover:border-[#ff6b86]/60 overflow-hidden flex flex-col justify-between group transition-all hover:-translate-y-1"
          >
            {/* Live Mini Preview Iframe */}
            <div className="relative h-44 bg-[#0a0912] border-b border-[var(--aurora-border)] overflow-hidden">
              <iframe
                title={project.title}
                srcDoc={getPreviewDoc(project.htmlCode, project.cssCode, project.jsCode)}
                className="w-full h-full pointer-events-none select-none transform scale-90 origin-top-left"
                sandbox="allow-scripts"
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => handleOpenCodespace(project)}
                  className="duo-btn duo-btn-mint px-4 py-2 text-xs flex items-center gap-1.5"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Codespace&apos;da Ochish</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#3ee6c4] bg-[#3ee6c4]/15 px-2.5 py-0.5 rounded-full border border-[#3ee6c4]/30">
                    {project.category}
                  </span>
                  <span className="text-[11px] text-[var(--aurora-text-muted)] font-mono">{project.createdAt}</span>
                </div>

                <h3 className="font-black text-base text-[var(--aurora-text)] group-hover:text-[#ff6b86] transition-colors line-clamp-1 font-display">
                  {project.title}
                </h3>
                <p className="text-xs text-[var(--aurora-text-muted)] line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-[var(--aurora-surface-2)] text-[var(--aurora-text-muted)] border border-[var(--aurora-border)] font-mono font-bold"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--aurora-border)] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center font-black text-xs border border-[#ff6b86]/30">
                    👨‍💻
                  </div>
                  <span className="font-bold text-[var(--aurora-text)] truncate max-w-[130px]">
                    {project.authorName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleLike(project.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#ffd23f]/15 hover:bg-[#ffd23f]/25 text-[#ffd23f] border border-[#ffd23f]/30 text-xs font-black transition-all active:scale-95 cursor-pointer font-mono"
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{project.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenCodespace(project)}
                    className="duo-btn duo-btn-surface px-3 py-1.5 text-xs flex items-center gap-1"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Kod</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CODESPACE RUNNER MODAL */}
      {activeCodespaceProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-xl animate-pop-in">
          <div className="relative w-full max-w-6xl h-[94vh] aurora-card border-2 border-[#3ee6c4]/40 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[var(--aurora-border)] bg-[var(--aurora-surface-2)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center border border-[#3ee6c4]/40 font-mono font-black">
                  &lt;/&gt;
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-[var(--aurora-text)] font-display">
                    {activeCodespaceProject.title} — Codespace IDE
                  </h3>
                  <p className="text-xs text-[var(--aurora-text-muted)]">
                    Muallif: <strong className="text-[#ffd23f]">{activeCodespaceProject.authorName}</strong> • Jonli Sandbox
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveCodespaceProject(null)}
                className="w-10 h-10 rounded-xl text-[var(--aurora-text-muted)] hover:text-[#ff5263] hover:bg-[#ff5263]/15 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              <div className="w-full lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r border-[var(--aurora-border)]">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0912] border-b border-white/10 text-xs">
                  {(
                    [
                      { id: 'html', label: 'index.html', activeClass: 'bg-[#ff8a3d]/20 text-[#ff8a3d] border-[#ff8a3d]/40' },
                      { id: 'css', label: 'styles.css', activeClass: 'bg-[#3ee6c4]/20 text-[#3ee6c4] border-[#3ee6c4]/40' },
                      { id: 'js', label: 'main.js', activeClass: 'bg-[#ffd23f]/20 text-[#ffd23f] border-[#ffd23f]/40' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveEditorTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg font-mono font-black border transition-all cursor-pointer ${
                        activeEditorTab === tab.id ? tab.activeClass : 'border-transparent text-white/60 hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-4 bg-[#0a0912] font-mono text-xs">
                  {activeEditorTab === 'html' && (
                    <textarea
                      value={editedHtml}
                      onChange={(e) => setEditedHtml(e.target.value)}
                      className="w-full h-full bg-transparent text-[#b6f03c] resize-none focus:outline-none leading-relaxed"
                      spellCheck={false}
                    />
                  )}
                  {activeEditorTab === 'css' && (
                    <textarea
                      value={editedCss}
                      onChange={(e) => setEditedCss(e.target.value)}
                      className="w-full h-full bg-transparent text-[#3ee6c4] resize-none focus:outline-none leading-relaxed"
                      spellCheck={false}
                    />
                  )}
                  {activeEditorTab === 'js' && (
                    <textarea
                      value={editedJs}
                      onChange={(e) => setEditedJs(e.target.value)}
                      className="w-full h-full bg-transparent text-[#ffd23f] resize-none focus:outline-none leading-relaxed"
                      spellCheck={false}
                    />
                  )}
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col bg-[#0a0912]">
                <div className="px-4 py-2 bg-[var(--aurora-surface-2)] border-b border-[var(--aurora-border)] flex items-center justify-between text-xs">
                  <span className="font-black flex items-center gap-1.5 text-[var(--aurora-text)]">
                    <Play className="w-3.5 h-3.5 text-[#b6f03c]" />
                    <span>Jonli Veb-Natija (Live Output)</span>
                  </span>
                  <span className="text-[10px] text-[var(--aurora-text-muted)]">Avtomatik yangilanadi</span>
                </div>
                <div className="flex-1 p-2 bg-white">
                  <iframe
                    title="Live Preview"
                    srcDoc={getPreviewDoc(editedHtml, editedCss, editedJs)}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-modals"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD PROJECT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-pop-in">
          <div className="relative w-full max-w-2xl aurora-card border-2 border-[#ff6b86]/40 rounded-[2rem] p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--aurora-border)]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#ff6b86]/20 text-[#ff6b86] flex items-center justify-center border border-[#ff6b86]/40">
                  <Plus className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-[var(--aurora-text)] font-display">Yangi Loyiha Joylashtirish</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[var(--aurora-text-muted)] hover:text-[#ff5263] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--aurora-text)] font-black mb-1">Loyiha Nomi *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Masalan: Mini Kalkulyator"
                    className="aurora-input w-full px-3.5 py-2.5"
                  />
                </div>

                <div>
                  <label className="block text-[var(--aurora-text)] font-black mb-1">Kategoriya *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="aurora-input w-full px-3.5 py-2.5"
                  >
                    <option value="html-css">HTML &amp; CSS</option>
                    <option value="javascript">JavaScript ES6+</option>
                    <option value="game">O&apos;yinlar (Game Dev)</option>
                    <option value="react">React</option>
                    <option value="fullstack">Full-Stack</option>
                    <option value="utility">Foydali Vidjet</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--aurora-text)] font-black mb-1">Tavsif *</label>
                <textarea
                  rows={2}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Loyiha qanday vazifani bajaradi..."
                  className="aurora-input w-full px-3.5 py-2.5"
                />
              </div>

              <div>
                <label className="block text-[var(--aurora-text)] font-black mb-1">HTML Kodi</label>
                <textarea
                  rows={4}
                  value={newHtml}
                  onChange={(e) => setNewHtml(e.target.value)}
                  className="aurora-input w-full p-3 font-mono text-xs text-[#b6f03c]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--aurora-text)] font-black mb-1">CSS Kodi</label>
                  <textarea
                    rows={3}
                    value={newCss}
                    onChange={(e) => setNewCss(e.target.value)}
                    className="aurora-input w-full p-3 font-mono text-xs text-[#3ee6c4]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--aurora-text)] font-black mb-1">JavaScript Kodi</label>
                  <textarea
                    rows={3}
                    value={newJs}
                    onChange={(e) => setNewJs(e.target.value)}
                    className="aurora-input w-full p-3 font-mono text-xs text-[#ffd23f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[var(--aurora-text)] font-black mb-1">Teglar (vergul bilan)</label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="aurora-input w-full px-3.5 py-2.5"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="duo-btn duo-btn-surface px-4 py-2.5 text-xs"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="duo-btn duo-btn-coral px-6 py-2.5 text-xs"
                >
                  Loyihani Joylashtirish ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
