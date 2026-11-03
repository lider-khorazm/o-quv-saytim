import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { loginWithGoogle } from '../services/storage';
import { AuthUser } from '../types';
import { CloudflareTurnstile } from './CloudflareTurnstile';

interface GoogleAuthDialogProps {
  onClose: () => void;
  onSuccess: (user: AuthUser) => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

export const GoogleAuthDialog: React.FC<GoogleAuthDialogProps> = ({ onClose, onSuccess }) => {
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCloudflareVerified, setIsCloudflareVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    try {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: '829491024562-ai9481j9.apps.googleusercontent.com',
          callback: (response: { credential: string }) => {
            if (!isCloudflareVerified) {
              setErrorMessage('Iltimos, avval pastdagi Cloudflare orqali odam ekanligingizni tasdiqlang!');
              return;
            }
            try {
              const base64Url = response.credential.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(
                atob(base64)
                  .split('')
                  .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                  .join('')
              );
              const data = JSON.parse(jsonPayload);
              handleSelectAccount(data.email, data.name || data.email.split('@')[0]);
            } catch (err) {
              console.error('Google JWT decode error:', err);
            }
          },
        });

        const btnContainer = document.getElementById('g_id_signin_container');
        if (btnContainer) {
          window.google.accounts.id.renderButton(btnContainer, {
            theme: 'outline',
            size: 'large',
            shape: 'pill',
            width: '100%',
            text: 'continue_with',
          });
        }
      }
    } catch (e) {
      console.warn('Google Identity Services init error:', e);
    }
  }, [isCloudflareVerified]);

  const handleSelectAccount = (email: string, name: string) => {
    if (!isCloudflareVerified) {
      setErrorMessage('⚠️ Xavfsizlik: Iltimos, avval Cloudflare Turnstile orqali odam ekanligingizni tasdiqlang!');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      const res = loginWithGoogle(email, name);
      if (res.success && res.user) {
        onSuccess(res.user);
        onClose();
      } else {
        setErrorMessage(res.message);
      }
      setLoading(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;
    handleSelectAccount(customEmail.trim(), customName.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-pop-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md aurora-card rounded-[2rem] shadow-2xl overflow-hidden border-2 border-[#ff6b86]/40">
        <div className="p-6 border-b border-[var(--aurora-border)] flex items-center justify-between bg-[var(--aurora-surface-2)]">
          <div className="flex items-center gap-3">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <div>
              <h3 className="font-black text-sm text-[var(--aurora-text)] font-display">Google orqali kirish</h3>
              <p className="text-[11px] text-[var(--aurora-text-muted)]">DevMaster Academy rasmiy ulanish</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="w-9 h-9 rounded-xl text-[var(--aurora-text-muted)] hover:text-[#ff5263] hover:bg-[#ff5263]/15 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-black text-[var(--aurora-text)] block">
              1-Qadam: Odam ekanligingizni tasdiqlang:
            </span>
            <CloudflareTurnstile
              isVerified={isCloudflareVerified}
              onVerify={(v: boolean) => {
                setIsCloudflareVerified(v);
                setErrorMessage('');
              }}
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-[#ff5263]/15 border border-[#ff5263]/40 text-[#ff5263] text-xs font-bold">
              {errorMessage}
            </div>
          )}

          <div className="pt-2 space-y-2.5">
            <span className="text-[11px] font-black text-[var(--aurora-text)] block">
              2-Qadam: Google hisobini tanlang:
            </span>

            <div id="g_id_signin_container" className="mb-2 flex justify-center" />

            <button
              type="button"
              onClick={() =>
                handleSelectAccount(
                  'olimjonalimjonov12@gmail.com',
                  'Olimjon Alimjonov (Lord)'
                )
              }
              disabled={loading}
              className={`w-full p-3.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                isCloudflareVerified
                  ? 'border-[#ffd23f]/50 bg-[#ffd23f]/10 hover:bg-[#ffd23f]/20 cursor-pointer'
                  : 'border-[var(--aurora-border)] bg-[var(--aurora-surface-2)] opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ffd23f] text-[#0a0912] font-black flex items-center justify-center text-sm">
                  OA
                </div>
                <div>
                  <p className="font-black text-xs text-[var(--aurora-text)] flex items-center gap-1.5">
                    <span>Olimjon Alimjonov</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffd23f] text-[#0a0912] font-black">
                      Owner Admin
                    </span>
                  </p>
                  <p className="text-[11px] text-[var(--aurora-text-muted)]">olimjonalimjonov12@gmail.com</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#ffd23f] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => handleSelectAccount('student.google@gmail.com', 'Azizbek Talaba')}
              disabled={loading}
              className={`w-full p-3.5 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                isCloudflareVerified
                  ? 'border-[#3ee6c4]/40 bg-[#3ee6c4]/10 hover:bg-[#3ee6c4]/20 cursor-pointer'
                  : 'border-[var(--aurora-border)] bg-[var(--aurora-surface-2)] opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3ee6c4] text-[#0a0912] font-black flex items-center justify-center text-sm">
                  AT
                </div>
                <div>
                  <p className="font-black text-xs text-[var(--aurora-text)]">Azizbek Talaba</p>
                  <p className="text-[11px] text-[var(--aurora-text-muted)]">student.google@gmail.com</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#3ee6c4] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="pt-2 border-t border-[var(--aurora-border)]">
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="w-full py-2.5 px-3 rounded-xl border-2 border-dashed border-[var(--aurora-border)] hover:border-[#ff6b86] text-[var(--aurora-text-muted)] hover:text-[#ff6b86] text-xs font-black flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Boshqa Google hisob bilan kirish</span>
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-black text-[var(--aurora-text)] block mb-1">
                    Google Email:
                  </label>
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="ismingiz@gmail.com"
                    className="aurora-input w-full px-3.5 py-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-[var(--aurora-text)] block mb-1">
                    Ism va Familiyangiz:
                  </label>
                  <input
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Masalan: Sardor Komilov"
                    className="aurora-input w-full px-3.5 py-2.5 text-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loading || !isCloudflareVerified}
                    className="duo-btn duo-btn-coral flex-1 py-2.5 px-4 text-xs disabled:opacity-50"
                  >
                    {loading ? 'Kirilmoqda...' : 'Kirish'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(false)}
                    className="duo-btn duo-btn-surface py-2.5 px-3 text-xs"
                  >
                    Bekor qilish
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="p-4 bg-[var(--aurora-surface-2)] border-t border-[var(--aurora-border)] text-[11px] text-[var(--aurora-text-muted)] font-bold flex items-center justify-between">
          <span className="flex items-center gap-1 text-[#3ee6c4]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-bit SSL Shifrlash</span>
          </span>
          <span>Google OAuth 2.0</span>
        </div>
      </div>
    </div>
  );
};
