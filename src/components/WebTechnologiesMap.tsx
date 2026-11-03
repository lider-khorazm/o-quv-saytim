import React, { useState } from 'react';
import {
  Layers,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { WEB_TECHNOLOGIES } from '../data/webTechnologies';

export function WebTechnologiesMap() {
  const [selectedTechId, setSelectedTechId] = useState<string>('python');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Frontend' | 'CSS Freymvork / Preprotsessor' | 'Backend Server'>('All');

  const selectedTech = WEB_TECHNOLOGIES.find((t) => t.id === selectedTechId) || WEB_TECHNOLOGIES[0];

  const filteredList = WEB_TECHNOLOGIES.filter((t) => {
    if (filterCategory === 'All') return true;
    return t.category === filterCategory;
  });

  const handleCopy = (snippet: string, id: string) => {
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="aurora-card rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-[#3ee6c4] bg-[#3ee6c4]/15 border border-[#3ee6c4]/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Sayt Yaratish Tillari & Freymvorklari
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-[var(--text-primary)] tracking-tight">
            Veb-Sayt Qaysi Tillarda Yasaladi?
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">
            HTML, CSS, SCSS, Bootstrap, JavaScript, Python (Django/Flask), PHP va Node.js haqida to'liq tushuncha
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[var(--bg-elevated)] p-1.5 rounded-2xl border border-[var(--border-subtle)] self-start sm:self-auto text-xs font-bold">
          {(['All', 'Frontend', 'CSS Freymvork / Preprotsessor', 'Backend Server'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat === 'All' ? 'Barcha Tillari' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Special Highlights: Python Web & Bootstrap/SCSS Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Python Card */}
        <div className="p-5 aurora-card rounded-3xl border border-[#3ee6c4]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#3ee6c4] bg-[#3ee6c4]/15 px-2.5 py-0.5 rounded-full">
              Backend Server
            </span>
            <span className="text-xs font-mono text-[#3ee6c4] font-bold">Python (Flask / Django)</span>
          </div>
          <h3 className="text-base font-display font-black text-[var(--text-primary)]">
            Pythonda Sayt Yasash Qanday Bo'ladi?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Python orqali saytning <strong>orqa tomoni (Backend)</strong> yaratiladi. Foydalanuvchi ma'lumotlarini bazada saqlash, xavfsiz autentifikatsiya, to'lovlar va sun'iy intellekt integratsiyasi aynan Python orqali juda oson amalga oshiriladi.
          </p>
          <div className="flex gap-2 pt-1">
            <a
              href="https://translate.google.com/translate?sl=en&tl=uz&u=https://www.w3schools.com/python/"
              target="_blank"
              rel="noreferrer"
              className="duo-btn duo-btn-mint inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs"
            >
              <span>W3Schools Python Darsi (O'zbekcha)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* SCSS & Bootstrap Card */}
        <div className="p-5 aurora-card rounded-3xl border border-[#ff6b86]/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ff6b86] bg-[#ff6b86]/15 px-2.5 py-0.5 rounded-full">
              Dizayn Freymvorklari
            </span>
            <span className="text-xs font-mono text-[#ff6b86] font-bold">SCSS & Bootstrap 5</span>
          </div>
          <h3 className="text-base font-display font-black text-[var(--text-primary)]">
            SCSS va Bootstrap Nega Kerak?
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            <strong>Bootstrap</strong> — tayyor responsive grid va tugmalar, modallar beradi. <strong>SCSS</strong> esa CSS ga o'zgaruvchilar, nesting va funksiyalar qo'shib, sayt dizaynini professional va ixcham boshqarish imkoniyatini taqdim etadi.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href="https://translate.google.com/translate?sl=en&tl=uz&u=https://www.w3schools.com/bootstrap5/"
              target="_blank"
              rel="noreferrer"
              className="duo-btn duo-btn-coral inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs"
            >
              <span>W3Schools Bootstrap 5</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://translate.google.com/translate?sl=en&tl=uz&u=https://www.w3schools.com/sass/"
              target="_blank"
              rel="noreferrer"
              className="duo-btn duo-btn-gold inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs"
            >
              <span>W3Schools SCSS / Sass</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Interactive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Languages List */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] block mb-1">
            Veb Tillari & Texnologiyalari:
          </span>

          <div className="space-y-2">
            {filteredList.map((t) => {
              const isSelected = selectedTechId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTechId(t.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--bg-elevated)] border-[#ff6b86] shadow-md ring-1 ring-[#ff6b86]'
                      : 'aurora-card hover:border-[#ff6b86]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ background: t.color }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">{t.name}</h4>
                      <p className="text-[11px] text-[var(--text-secondary)]">{t.badge}</p>
                    </div>
                  </div>

                  <span className="text-[10px] bg-[var(--bg-primary)] text-[var(--text-secondary)] px-2 py-0.5 rounded-lg font-mono border border-[var(--border-subtle)]">
                    {t.category.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Language Deep-Dive */}
        <div className="lg:col-span-7 aurora-card rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-display font-black text-[var(--text-primary)]">{selectedTech.name}</h3>
                <span
                  className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full"
                  style={{ background: selectedTech.color }}
                >
                  {selectedTech.badge}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">{selectedTech.category}</p>
            </div>

            <a
              href={selectedTech.w3schoolsUzbekUrl}
              target="_blank"
              rel="noreferrer"
              className="duo-btn duo-btn-coral inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs"
            >
              <span>W3Schools da o'rganish</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Saytdagi O'rni va Vazifasi:
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-semibold">
              {selectedTech.roleInWebsite}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Qisqacha Ta'rif:
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {selectedTech.summary}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Asosiy Afzalliklari:
            </h4>
            <div className="space-y-1.5">
              {selectedTech.advantages.map((adv, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[var(--text-primary)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#3ee6c4] shrink-0" />
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                Namunaviy Kod ({selectedTech.name}):
              </span>
              <button
                onClick={() => handleCopy(selectedTech.codeSnippet, selectedTech.id)}
                className="text-[11px] font-bold text-[#ff6b86] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                {copiedId === selectedTech.id ? (
                  <>
                    <Check className="w-3 h-3 text-[#3ee6c4]" />
                    <span className="text-[#3ee6c4]">Nusxalandi</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Nusxalash</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 bg-[#0a0912] text-[#f8f7ff] rounded-2xl text-xs font-mono overflow-x-auto border border-[var(--border-subtle)]">
              <code>{selectedTech.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
