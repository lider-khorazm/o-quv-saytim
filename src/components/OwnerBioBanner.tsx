import React from 'react';
import {
  Coffee,
  Code2,
  Tv,
  Sparkles,
  ShieldCheck,
  Terminal,
  LogIn,
  UserPlus,
  Download,
  Mail,
  Send,
} from 'lucide-react';
import { OWNER_PROFILE } from '../data/mockData';
import { AuthUser } from '../types';
import { AvatarBadge } from './AvatarBadge';

interface OwnerBioBannerProps {
  currentUser: AuthUser | null;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onDownloadZip?: () => void;
}

export const OwnerBioBanner: React.FC<OwnerBioBannerProps> = ({
  currentUser,
  onOpenLogin,
  onOpenRegister,
}) => {
  return (
    <div className="relative overflow-hidden aurora-card p-6 sm:p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative shrink-0">
            <AvatarBadge
              name={OWNER_PROFILE.name}
              role="owner"
              size="xl"
              className="ring-4 ring-[#ffd23f]/50 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#ffd23f] to-[#ff8a3d] text-[#0a0912] font-display font-bold text-[10px] shadow">
              OWNER
            </span>
          </div>

          <div className="space-y-2.5 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
                {OWNER_PROFILE.name}
              </h2>
              <span className="text-xs font-mono font-bold text-[#3ee6c4]">
                @{OWNER_PROFILE.username} · Boshqaruvchi &amp; Asoschi
              </span>
            </div>

            <p className="text-xs sm:text-sm opacity-85 leading-relaxed">{OWNER_PROFILE.bio}</p>

            <div className="flex items-center gap-2.5 pt-1 flex-wrap">
              <a
                href="https://t.me/lordo1"
                target="_blank"
                rel="noopener noreferrer"
                className="duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
              >
                <Send className="w-3.5 h-3.5 text-[#3ee6c4]" />
                <span>Telegram: @lordo1</span>
              </a>

              <a
                href="mailto:olimjonalimjonov12@gmail.com"
                className="duo-btn duo-btn-surface !py-1.5 !px-3 text-xs"
              >
                <Mail className="w-3.5 h-3.5 text-[#ff6b86]" />
                <span>olimjonalimjonov12@gmail.com</span>
              </a>
            </div>

            <div className="flex items-center gap-3 flex-wrap pt-1 text-xs opacity-80">
              <span className="inline-flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-[#ffd23f]" /> Qahva ishqibozi
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-[#3ee6c4]" /> Frontend (React, TS, CSS)
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-[#b6f03c]" /> Python
              </span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <Tv className="w-3.5 h-3.5 text-[#ff6b86]" /> Anime &amp; Manga
              </span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-auto shrink-0 aurora-surface-2 p-5 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] opacity-65 font-bold block">Faol Tizim Holati</span>
            {currentUser ? (
              <span className="text-sm font-bold flex items-center gap-1.5 mt-1">
                <ShieldCheck className="w-4 h-4 text-[#3ee6c4]" />
                {currentUser.name} ({currentUser.role.toUpperCase()})
              </span>
            ) : (
              <span className="text-xs opacity-80 block mt-1">
                Platformaga kiring yoki yangi o&apos;quvchi sifatida qo&apos;shiling.
              </span>
            )}
          </div>

          {!currentUser && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenLogin}
                className="duo-btn duo-btn-surface text-xs !py-2 !px-4"
              >
                <LogIn className="w-4 h-4 text-[#3ee6c4]" />
                <span>Kirish</span>
              </button>
              <button
                type="button"
                onClick={onOpenRegister}
                className="duo-btn duo-btn-coral text-xs !py-2 !px-4"
              >
                <UserPlus className="w-4 h-4" />
                <span>Boshlash</span>
              </button>
            </div>
          )}

          <a
            href="/devmaster-project.zip"
            download="devmaster-project.zip"
            className="duo-btn duo-btn-mint text-xs !py-2 !px-4"
          >
            <Download className="w-4 h-4" />
            <span>Loyihani Yuklab Olish (ZIP)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
