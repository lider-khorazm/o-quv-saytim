import React, { useState } from 'react';
import {
  X,
  Mail,
  ExternalLink,
  Award,
  CheckCircle2,
  Download,
  Copy,
  Check,
  MapPin,
} from 'lucide-react';
import { ProfileData, generateStandaloneHtml } from '../utils/htmlGenerator';

interface LargePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  onOpenWebmail: (emailTo: string) => void;
}

export function LargePortfolioModal({
  isOpen,
  onClose,
  profile,
  onOpenWebmail,
}: LargePortfolioModalProps) {
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'tech' | 'contact'>('about');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const officialEmail = `${profile.id}@akademiya.uz`;
  const standaloneHtml = generateStandaloneHtml(profile);

  const handleDownload = () => {
    const blob = new Blob([standaloneHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(standaloneHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const skillsMap: Record<string, { name: string; level: number; color: string }[]> = {
    umirbek: [
      { name: 'Python & OOP', level: 95, color: 'bg-[#3ee6c4]' },
      { name: 'Django & REST Framework', level: 90, color: 'bg-[#b6f03c]' },
      { name: 'PostgreSQL & DB Architecture', level: 88, color: 'bg-[#ffd23f]' },
      { name: 'HTML5 & CSS3 shablonlar', level: 85, color: 'bg-[#ff8a3d]' },
      { name: 'Git & Linux serverlar', level: 82, color: 'bg-[#ff6b86]' },
    ],
    sardor: [
      { name: 'HTML5 Semantik tuzilma', level: 98, color: 'bg-[#ff6b86]' },
      { name: 'CSS3 & Flexbox / Grid', level: 95, color: 'bg-[#3ee6c4]' },
      { name: 'SCSS / SASS Preprosessorlar', level: 92, color: 'bg-[#ff8a3d]' },
      { name: 'Bootstrap 5 kutubxonasi', level: 94, color: 'bg-[#b6f03c]' },
      { name: 'JavaScript ES6+ & DOM', level: 86, color: 'bg-[#ffd23f]' },
    ],
    muhriddin: [
      { name: 'JavaScript & Mantiqiy algoritmlar', level: 92, color: 'bg-[#ffd23f]' },
      { name: 'UI/UX Dizayn va prototiplash', level: 88, color: 'bg-[#ff6b86]' },
      { name: 'HTML5/CSS3 Responsive dizayn', level: 90, color: 'bg-[#3ee6c4]' },
      { name: 'Mobil ilovalar arxitekturasi', level: 84, color: 'bg-[#ff8a3d]' },
      { name: "Interaktiv kod o'yinlari", level: 95, color: 'bg-[#b6f03c]' },
    ],
    olimjon: [
      { name: "To'liq Full-stack arxitektura", level: 96, color: 'bg-[#ffd23f]' },
      { name: 'Frontend (React & Vite)', level: 94, color: 'bg-[#3ee6c4]' },
      { name: 'Backend (Node.js & Python)', level: 92, color: 'bg-[#ff6b86]' },
      { name: "Metodika va ta'lim dasturi", level: 95, color: 'bg-[#b6f03c]' },
      { name: 'Web xavfsizlik va optimizatsiya', level: 90, color: 'bg-[#ff8a3d]' },
    ],
  };

  const currentSkills = skillsMap[profile.id] || skillsMap.umirbek;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-xl overflow-y-auto animate-pop-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="aurora-card rounded-[2rem] max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-[#ff6b86]/40 overflow-hidden my-auto">
        {/* Banner */}
        <div className="h-40 bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] relative shrink-0">
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              type="button"
              onClick={handleDownload}
              className="duo-btn duo-btn-surface px-3.5 py-2 text-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[#ff6b86]" />
              <span>HTML yuklab olish</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Header Bar */}
        <div className="px-6 sm:px-8 pb-4 border-b border-[var(--aurora-border)] flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 relative z-10">
          <div className="flex items-end gap-4">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-24 h-24 rounded-2xl object-cover border-4 border-[#0a0912] shadow-xl bg-[var(--aurora-surface-2)]"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-[var(--aurora-text)] tracking-tight font-display">
                  {profile.name}
                </h2>
                <span className="text-[11px] font-black text-[#b6f03c] bg-[#b6f03c]/15 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border border-[#b6f03c]/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Tasdiqlangan</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm font-black text-[#ff6b86]">{profile.occupation}</p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--aurora-text-muted)]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profile.city}</span>
                </span>
                <span>·</span>
                <span className="font-mono text-[#3ee6c4] font-bold">{officialEmail}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenWebmail(officialEmail);
              }}
              className="duo-btn duo-btn-mint px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Xat yozish</span>
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="duo-btn duo-btn-surface px-3.5 py-2 text-xs flex items-center gap-1.5"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-[#b6f03c]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Nusxalandi' : 'HTML Kod'}</span>
            </button>
          </div>
        </div>

        {/* Portfolio Tabs */}
        <div className="flex border-b border-[var(--aurora-border)] px-6 sm:px-8 bg-[var(--aurora-surface-2)] gap-6 text-xs font-black overflow-x-auto">
          {(
            [
              { id: 'about', label: "O'zi haqida" },
              { id: 'tech', label: "Texnologiyalar & Ko'nikmalar" },
              { id: 'projects', label: 'VS Code Loyihalari' },
              { id: 'contact', label: 'Aloqa & Pochta' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`py-3 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? 'border-[#ff6b86] text-[#ff6b86]'
                  : 'border-transparent text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {activeTab === 'about' && (
            <div className="space-y-6">
              <p className="text-sm text-[var(--aurora-text)] leading-relaxed bg-[var(--aurora-surface-2)] p-5 rounded-2xl border border-[var(--aurora-border)]">
                {profile.bio}
              </p>
              <div className="p-4 bg-[#ff6b86]/10 border-l-4 border-[#ff6b86] rounded-r-xl text-xs sm:text-sm text-[var(--aurora-text)] italic">
                &ldquo;{profile.quote}&rdquo;
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[var(--aurora-surface-2)] text-[#ffd23f] rounded-xl text-xs font-black border border-[#ffd23f]/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="p-5 bg-[#ffd23f]/10 border border-[#ffd23f]/30 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-[var(--aurora-text)]">Akademiya Mukofoti va Natijasi</h4>
                  <p className="text-xs text-[var(--aurora-text-muted)] mt-0.5">
                    Web Dasturlash Asoslari kursini a&apos;lo baholarga tamomlagan
                  </p>
                </div>
                <Award className="w-8 h-8 text-[#ffd23f]" />
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4">
              {currentSkills.map((s, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-black text-[var(--aurora-text)]">
                    <span>{s.name}</span>
                    <span className="font-mono text-[#ffd23f]">{s.level}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--aurora-border)] overflow-hidden bg-white">
                <iframe
                  title={profile.name}
                  srcDoc={standaloneHtml}
                  className="w-full h-72 border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--aurora-surface-2)] rounded-2xl border border-[var(--aurora-border)] space-y-2">
                <span className="text-[11px] font-black uppercase text-[#3ee6c4]">Rasmiy Akademiya Pochtasi</span>
                <p className="text-sm font-mono font-black text-[var(--aurora-text)]">{officialEmail}</p>
              </div>
              <div className="p-4 bg-[var(--aurora-surface-2)] rounded-2xl border border-[var(--aurora-border)] space-y-2">
                <span className="text-[11px] font-black uppercase text-[#ff6b86]">Ijtimoiy Tarmoqlar</span>
                <div className="space-y-1.5 text-xs">
                  {profile.telegram && (
                    <a
                      href={`https://t.me/${profile.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3ee6c4] hover:underline flex items-center gap-1 font-bold"
                    >
                      <span>Telegram: @{profile.telegram.replace('@', '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
