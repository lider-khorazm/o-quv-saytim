import React, { useState } from 'react';
import { Key, Sparkles, CheckCircle2, ShieldAlert, Cpu, ExternalLink, X } from 'lucide-react';
import { getGroqApiKey, setGroqApiKey, clearGroqApiKey, hasGroqApiKey } from '../services/groqService';

interface GroqConfigModalProps {
  onClose: () => void;
  onSaved?: () => void;
}

export const GroqConfigModal: React.FC<GroqConfigModalProps> = ({ onClose, onSaved }) => {
  const [apiKey, setApiKey] = useState(getGroqApiKey());
  const [isSaved, setIsSaved] = useState(false);
  const isConnected = hasGroqApiKey();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setGroqApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      if (onSaved) onSaved();
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    clearGroqApiKey();
    setApiKey('');
    if (onSaved) onSaved();
  };

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
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              isConnected
                ? 'bg-[#3ee6c4]/15 border-[#3ee6c4]/40 text-[#3ee6c4]'
                : 'bg-[#ffd23f]/15 border-[#ffd23f]/40 text-[#ffd23f]'
            }`}
          >
            {isConnected ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
            )}
            <div className="text-xs leading-relaxed">
              <p className="font-black text-sm mb-0.5">
                {isConnected ? 'Groq Llama 3.3 70B Faol Holatda' : 'Smart AI Engine Rejimi'}
              </p>
              <p className="opacity-85">
                {isConnected
                  ? "Siz kiritgan Groq API kaliti faol. Barcha AI agentlari to'g'ridan-to'g'ri Llama 3.3 70B orqali javob bermoqda."
                  : "Kalit kiritilmagan taqdirda ham serverdagi GROQ_API_KEY yoki aqlli bilimlar bazasi orqali ishlaydi."}
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#ffd23f]" />
                  Groq API Kaliti (gsk_...)
                </span>
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#ff8a3d] hover:underline flex items-center gap-1 text-[11px]"
                >
                  Bepul kalit olish (console.groq.com)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="gsk_..."
                className="aurora-input font-mono text-sm"
              />
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

            <div className="flex items-center justify-between pt-2">
              {apiKey ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="duo-btn duo-btn-surface px-3 py-2 text-xs text-[#ff6b86]"
                >
                  Kalitni o'chirish
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                <button type="button" onClick={onClose} className="duo-btn duo-btn-surface px-4 py-2 text-xs">
                  Bekor qilish
                </button>
                <button type="submit" className="duo-btn duo-btn-coral px-5 py-2 text-xs">
                  {isSaved ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Saqlandi!</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Kalitni Saqlash</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
