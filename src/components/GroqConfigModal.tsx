import React from 'react';
import { Sparkles, CheckCircle2, Cpu, X } from 'lucide-react';

interface GroqConfigModalProps {
  onClose: () => void;
  onSaved?: () => void;
}

export const GroqConfigModal: React.FC<GroqConfigModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="aurora-card w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#ff8a3d]/20 text-[#ff8a3d] flex items-center justify-center border border-[#ff8a3d]/40">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black flex items-center gap-2">
                <span>Groq AI Ekotizimi Sozlamalari</span>
                <span className="aurora-badge bg-[#ff8a3d]/20 text-[#ff8a3d] font-mono">
                  Llama 3.3 70B
                </span>
              </h3>
              <p className="text-xs opacity-70">
                Yuqori tezlikdagi AI murabbiylar kaliti
              </p>
            </div>
          </div>
          <button onClick={onClose} className="duo-btn duo-btn-surface p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="p-4 rounded-2xl border flex items-center gap-3 bg-[#3ee6c4]/15 border-[#3ee6c4]/40 text-[#3ee6c4]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <p className="font-black text-sm">AI kaliti serverda saqlanadi</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
            <p className="text-xs font-black flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd23f]" />
              <span>Ushbu kalit orqali ishlovchi 4 ta AI agenti:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <span className="font-black text-[#3ee6c4]">1. Kodik Yordamchi</span>: O'quvchi dars repetitori.
              </div>
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <span className="font-black text-[#b6f03c]">2. Ustoz Temur</span>: Bosh AI Murabbiy.
              </div>
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <span className="font-black text-[#ffd23f]">3. Admin Jasur</span>: Monitoring Co-Admin.
              </div>
              <div className="p-2.5 rounded-xl bg-black/20 border border-white/10">
                <span className="font-black text-[#ff6b86]">4. Admin Sherzod</span>: XP tahlili Co-Admini.
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="button" onClick={onClose} className="duo-btn duo-btn-surface px-4 py-2 text-xs">
              Yopish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
