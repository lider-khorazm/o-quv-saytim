import React, { useState } from 'react';
import { Check, ChevronDown, X, Sparkles, AlertTriangle } from 'lucide-react';
import { AuroraMascot } from '../AuroraMascot';

/* 1. TUGMA (Tactile Duolingo-style Capsule Button) */
export interface AuroraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'coral' | 'mint' | 'gold' | 'lime' | 'surface';
  size?: 'sm' | 'md' | 'lg';
}

export const AuroraButton: React.FC<AuroraButtonProps> = ({
  variant = 'coral',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClass = {
    coral: 'duo-btn-coral',
    mint: 'duo-btn-mint',
    gold: 'duo-btn-gold',
    lime: 'duo-btn-lime',
    surface: 'duo-btn-surface',
  }[variant];

  const sizeClass = {
    sm: 'px-3.5 py-2 text-xs min-h-[44px]',
    md: 'px-5 py-3 text-sm min-h-[44px]',
    lg: 'px-7 py-4 text-base min-h-[48px]',
  }[size];

  return (
    <button
      type="button"
      className={`duo-btn ${variantClass} ${sizeClass} inline-flex items-center justify-center gap-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/* 2. INPUT */
export interface AuroraInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AuroraInput: React.FC<AuroraInputProps> = ({
  label,
  error,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-black text-[var(--aurora-text)] uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`aurora-input w-full px-4 py-3 text-sm min-h-[44px] ${
          error ? 'border-[#ff5263] focus:border-[#ff5263]' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs font-bold text-[#ff5263]">{error}</p>}
    </div>
  );
};

/* 3. SELECT */
export interface AuroraSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
}

export const AuroraSelect: React.FC<AuroraSelectProps> = ({
  label,
  options,
  className = '',
  id,
  ...props
}) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-black text-[var(--aurora-text)] uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={`aurora-input w-full px-4 py-3 pr-10 text-sm appearance-none min-h-[44px] cursor-pointer ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#151226] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-[var(--aurora-text-muted)] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

/* 4. CHECKBOX */
export interface AuroraCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const AuroraCheckbox: React.FC<AuroraCheckboxProps> = ({ checked, onChange, label }) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-3 text-sm font-bold text-[var(--aurora-text)] cursor-pointer select-none min-h-[44px]"
    >
      <span
        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
          checked
            ? 'bg-[#3ee6c4] border-[#3ee6c4] text-[#0a0912]'
            : 'bg-[var(--aurora-surface-2)] border-[var(--aurora-border)]'
        }`}
      >
        {checked && <Check className="w-4 h-4 stroke-[3]" />}
      </span>
      <span>{label}</span>
    </button>
  );
};

/* 5. TOGGLE */
export interface AuroraToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
}

export const AuroraToggle: React.FC<AuroraToggleProps> = ({ enabled, onChange, label }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className="inline-flex items-center gap-3 cursor-pointer min-h-[44px]"
    >
      <span
        className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
          enabled ? 'bg-[#ff6b86]' : 'bg-[var(--aurora-surface-2)] border border-[var(--aurora-border)]'
        }`}
      >
        <span
          className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
      {label && <span className="text-sm font-bold text-[var(--aurora-text)]">{label}</span>}
    </button>
  );
};

/* 6. TAB */
export interface AuroraTabsProps {
  tabs: Array<{ id: string; label: string; badge?: string | number }>;
  activeId: string;
  onChange: (id: string) => void;
}

export const AuroraTabs: React.FC<AuroraTabsProps> = ({ tabs, activeId, onChange }) => {
  return (
    <div className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[var(--aurora-surface-2)] border border-[var(--aurora-border)]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 min-h-[44px] cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-[#0a0912] shadow-md'
                : 'text-[var(--aurora-text-muted)] hover:text-[var(--aurora-text)]'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-black/20 text-white' : 'bg-white/10 text-[var(--aurora-text)]'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

/* 7. BADGE */
export interface AuroraBadgeProps {
  children: React.ReactNode;
  tone?: 'coral' | 'mint' | 'gold' | 'lime' | 'neutral';
  className?: string;
}

export const AuroraBadge: React.FC<AuroraBadgeProps> = ({
  children,
  tone = 'coral',
  className = '',
}) => {
  const toneClass = {
    coral: 'bg-[#ff6b86]/15 text-[#ff6b86] border-[#ff6b86]/40',
    mint: 'bg-[#3ee6c4]/15 text-[#3ee6c4] border-[#3ee6c4]/40',
    gold: 'bg-[#ffd23f]/15 text-[#ffd23f] border-[#ffd23f]/40',
    lime: 'bg-[#b6f03c]/15 text-[#b6f03c] border-[#b6f03c]/40',
    neutral: 'bg-[var(--aurora-surface-2)] text-[var(--aurora-text-muted)] border-[var(--aurora-border)]',
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${toneClass} ${className}`}
    >
      {children}
    </span>
  );
};

/* 8. TOOLTIP */
export interface AuroraTooltipProps {
  text: string;
  children: React.ReactNode;
}

export const AuroraTooltip: React.FC<AuroraTooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#0a0912] border border-[#ff6b86]/40 text-white text-[11px] font-bold whitespace-nowrap shadow-xl z-50"
      >
        {text}
      </div>
    </div>
  );
};

/* 9. MODAL */
export interface AuroraModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AuroraModal: React.FC<AuroraModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-pop-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="aurora-card rounded-[2rem] max-w-lg w-full p-6 border-2 border-[#ff6b86]/40 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--aurora-border)] pb-3">
          <h3 className="text-lg font-black text-[var(--aurora-text)] font-display">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#ff5263]/20 text-[var(--aurora-text)] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

/* 10. TOAST */
export interface AuroraToastProps {
  message: string;
  tone?: 'success' | 'warning' | 'error';
  onDismiss?: () => void;
}

export const AuroraToast: React.FC<AuroraToastProps> = ({
  message,
  tone = 'success',
  onDismiss,
}) => {
  const toneClass = {
    success: 'from-[#3ee6c4] to-[#b6f03c] text-[#0a0912]',
    warning: 'from-[#ffd23f] to-[#ff8a3d] text-[#0a0912]',
    error: 'from-[#ff5263] to-[#ff6b86] text-white',
  }[tone];

  return (
    <div
      role="status"
      className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r ${toneClass} px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 font-black text-xs animate-pop-in`}
    >
      <Sparkles className="w-4 h-4 shrink-0" />
      <span>{message}</span>
      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label="Yopish" className="ml-2 cursor-pointer">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

/* 11. DROPDOWN */
export interface AuroraDropdownProps {
  label: string;
  items: Array<{ label: string; onClick: () => void }>;
}

export const AuroraDropdown: React.FC<AuroraDropdownProps> = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="duo-btn duo-btn-surface px-4 py-2.5 text-xs flex items-center gap-2 min-h-[44px]"
      >
        <span>{label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 aurora-card rounded-2xl p-1.5 border border-[var(--aurora-border)] shadow-2xl z-40">
          {items.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-[var(--aurora-text)] hover:bg-[#ff6b86]/15 transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* 12. PROGRESS */
export interface AuroraProgressProps {
  value: number;
  max?: number;
  label?: string;
}

export const AuroraProgress: React.FC<AuroraProgressProps> = ({ value, max = 100, label }) => {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  return (
    <div className="space-y-1.5">
      {label && (
        <div className="flex justify-between text-xs font-bold text-[var(--aurora-text)]">
          <span>{label}</span>
          <span className="font-mono text-[#ffd23f]">{pct}%</span>
        </div>
      )}
      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden p-0.5">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* 13. SKELETON */
export const AuroraSkeleton: React.FC<{ className?: string }> = ({ className = 'h-6 w-full' }) => (
  <div className={`animate-pulse rounded-2xl bg-white/10 ${className}`} />
);

/* 14. BO'SH HOLAT (Empty State) */
export interface AuroraEmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const AuroraEmptyState: React.FC<AuroraEmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="aurora-card rounded-[2rem] p-8 text-center border-2 border-dashed border-[var(--aurora-border)] flex flex-col items-center justify-center space-y-3">
    <AuroraMascot mood="thinking" size={72} />
    <h4 className="text-lg font-black text-[var(--aurora-text)] font-display">{title}</h4>
    <p className="text-xs text-[var(--aurora-text-muted)] max-w-sm leading-relaxed">{description}</p>
    {actionLabel && onAction && (
      <AuroraButton variant="coral" size="sm" onClick={onAction}>
        {actionLabel}
      </AuroraButton>
    )}
  </div>
);

/* 15. 404 / XATO EKRANI */
export const AuroraErrorView: React.FC<{ title?: string; message?: string; onRetry?: () => void }> = ({
  title = '404 — Sahifa yoki resurs topilmadi',
  message = "Kechirasiz, siz qidirayotgan ma'lumot mavjud emas yoki vaqtincha o'zgartirilgan.",
  onRetry,
}) => (
  <div className="aurora-card rounded-[2rem] p-8 text-center border-2 border-[#ff5263]/40 max-w-md mx-auto space-y-4">
    <div className="w-16 h-16 rounded-2xl bg-[#ff5263]/15 text-[#ff5263] flex items-center justify-center mx-auto">
      <AlertTriangle className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-black text-[var(--aurora-text)] font-display">{title}</h3>
    <p className="text-xs text-[var(--aurora-text-muted)] leading-relaxed">{message}</p>
    {onRetry && (
      <AuroraButton variant="coral" onClick={onRetry}>
        Qayta urinish
      </AuroraButton>
    )}
  </div>
);

/* 16. YUKLANISH EKRANI (Loading Screen) */
export const AuroraLoadingScreen: React.FC<{ label?: string }> = ({
  label = 'Aurora Sunset akademiyasi yuklanmoqda...',
}) => (
  <div className="flex flex-col items-center justify-center p-10 space-y-4 text-center">
    <AuroraMascot mood="excited" size={80} />
    <div className="text-sm font-black text-[var(--aurora-text)] font-display animate-pulse">{label}</div>
  </div>
);
