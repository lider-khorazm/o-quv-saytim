import React from 'react';
import { User, ShieldAlert, GraduationCap, Crown } from 'lucide-react';

interface AvatarBadgeProps {
  name: string;
  role?: 'owner' | 'teacher' | 'student' | 'admin' | 'system';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarBadge: React.FC<AvatarBadgeProps> = ({
  name,
  role = 'student',
  size = 'md',
  className = '',
}) => {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : (name.slice(0, 2) || 'U').toUpperCase();

  const sizeClasses = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-14 h-14 text-sm font-black',
    xl: 'w-24 h-24 sm:w-28 sm:h-28 text-2xl font-black',
  };

  const roleGradients = {
    owner: 'from-[#ffd23f] via-[#ff8a3d] to-[#ff6b86] text-[#0a0912] ring-[#ffd23f]/50 shadow-[#ffd23f]/25',
    admin: 'from-[#ff6b86] via-[#ff5263] to-[#ff8a3d] text-white ring-[#ff6b86]/40 shadow-[#ff6b86]/25',
    teacher: 'from-[#3ee6c4] via-[#1aa88b] to-[#b6f03c] text-[#0a0912] ring-[#3ee6c4]/40 shadow-[#3ee6c4]/25',
    student: 'from-[#ff8a3d] via-[#ff6b86] to-[#ffd23f] text-[#0a0912] ring-[#ff8a3d]/40 shadow-[#ff8a3d]/25',
    system: 'from-[#151226] via-[#1f1a38] to-[#0a0912] text-[#3ee6c4] ring-[#3ee6c4]/40 shadow-black/50',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center font-black rounded-2xl bg-gradient-to-tr ring-2 shadow-lg select-none shrink-0 font-display ${
        sizeClasses[size]
      } ${roleGradients[role]} ${className}`}
      title={name}
    >
      <span>{initials}</span>

      {(size === 'lg' || size === 'xl') && (
        <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#0a0912] border border-white/20 shadow flex items-center justify-center">
          {role === 'owner' ? (
            <Crown className="w-3.5 h-3.5 text-[#ffd23f]" />
          ) : role === 'admin' ? (
            <ShieldAlert className="w-3.5 h-3.5 text-[#ff6b86]" />
          ) : role === 'teacher' ? (
            <GraduationCap className="w-3.5 h-3.5 text-[#3ee6c4]" />
          ) : (
            <User className="w-3.5 h-3.5 text-[#ff8a3d]" />
          )}
        </span>
      )}
    </div>
  );
};
