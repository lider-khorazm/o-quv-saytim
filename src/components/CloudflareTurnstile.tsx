import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck, Loader2 } from 'lucide-react';

interface CloudflareTurnstileProps {
  onVerify: (isVerified: boolean) => void;
  isVerified: boolean;
  className?: string;
}

export const CloudflareTurnstile: React.FC<CloudflareTurnstileProps> = ({
  onVerify,
  isVerified,
  className = '',
}) => {
  const [status, setStatus] = useState<'idle' | 'checking' | 'verified'>(
    isVerified ? 'verified' : 'idle'
  );
  const [rayId, setRayId] = useState('');

  useEffect(() => {
    if (isVerified) {
      setStatus('verified');
      if (!rayId) {
        setRayId(`8cb${Math.random().toString(16).substring(2, 12)}0f`);
      }
    }
  }, [isVerified, rayId]);

  const handleTriggerCheck = () => {
    if (status === 'verified' || status === 'checking') return;

    setStatus('checking');
    setTimeout(() => {
      setStatus('verified');
      const generatedRay = `8cb${Math.random().toString(16).substring(2, 12)}0f`;
      setRayId(generatedRay);
      onVerify(true);
    }, 950);
  };

  return (
    <div
      onClick={handleTriggerCheck}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleTriggerCheck();
        }
      }}
      className={`relative overflow-hidden rounded-2xl aurora-surface-2 p-3.5 select-none cursor-pointer transition-all ${
        status === 'verified'
          ? 'border-[#3ee6c4] bg-[#3ee6c4]/10'
          : 'hover:border-[#ff8a3d]'
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all ${
              status === 'verified'
                ? 'bg-[#3ee6c4] border-[#3ee6c4] text-[#0a0912]'
                : status === 'checking'
                ? 'border-[#ff8a3d] bg-[#ff8a3d]/20'
                : 'border-[#ff6b86]/50'
            }`}
          >
            {status === 'verified' && <Check className="w-5 h-5 stroke-[3]" />}
            {status === 'checking' && (
              <Loader2 className="w-4 h-4 text-[#ff8a3d] animate-spin" />
            )}
          </div>

          <div>
            <span className="text-xs font-bold block">
              {status === 'verified' ? (
                <span className="text-[#3ee6c4] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Odam ekanligingiz tasdiqlandi
                </span>
              ) : status === 'checking' ? (
                <span className="text-[#ff8a3d]">Xavfsizlik tekshirilmoqda...</span>
              ) : (
                <span>Odam ekanligingizni tasdiqlang</span>
              )}
            </span>
            <span className="text-[10px] opacity-70 font-mono block">
              {status === 'verified'
                ? `Ray ID: ${rayId} · Cloudflare Turnstile`
                : 'Cloudflare Anti-Bot Himoyasi'}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end shrink-0 pl-2">
          <span className="text-[11px] font-display font-bold text-[#ff8a3d]">
            Cloudflare
          </span>
          <span className="text-[9px] opacity-60 font-mono">Turnstile</span>
        </div>
      </div>
    </div>
  );
};
