import React from 'react';
import { Award, CheckCircle2, Printer, X, Sparkles } from 'lucide-react';
import { CertificateData } from '../types';
import { AuroraMascot } from './AuroraMascot';

interface CertificateModalProps {
  certificate: CertificateData;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-pop-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-modal-title"
    >
      <div className="relative w-full max-w-3xl aurora-card rounded-[2rem] border-2 border-[#ffd23f]/40 shadow-[0_24px_80px_rgba(255,210,63,0.2)] overflow-hidden flex flex-col">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 bg-[#0a0912]/90">
          <div className="flex items-center gap-2.5 text-xs font-extrabold text-[var(--aurora-text)]">
            <div className="w-8 h-8 rounded-xl bg-[#ffd23f]/20 border border-[#ffd23f]/40 flex items-center justify-center text-[#ffd23f]">
              <Award className="w-4 h-4" />
            </div>
            <span>DevMaster Academy Rasmiy Sertifikati</span>
            <span className="text-[var(--aurora-text-muted)]">•</span>
            <span className="font-mono text-[#3ee6c4] font-black">{certificate.serialNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="duo-btn duo-btn-gold px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Chop Etish / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Sertifikat oynasini yopish"
              className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#ff5263]/20 text-[var(--aurora-text-muted)] hover:text-[#ff5263] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Printable Design) */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#0a0912] via-[#151226] to-[#231934] text-center relative overflow-hidden print:p-0 print:bg-white print:text-black">
          {/* Decorative Corner Borders */}
          <div className="absolute top-4 left-4 w-14 h-14 border-t-4 border-l-4 border-[#ffd23f]/70 rounded-tl-2xl pointer-events-none" />
          <div className="absolute top-4 right-4 w-14 h-14 border-t-4 border-r-4 border-[#ffd23f]/70 rounded-tr-2xl pointer-events-none" />
          <div className="absolute bottom-4 left-4 w-14 h-14 border-b-4 border-l-4 border-[#ffd23f]/70 rounded-bl-2xl pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-14 h-14 border-b-4 border-r-4 border-[#ffd23f]/70 rounded-br-2xl pointer-events-none" />

          {/* Ambient Glows */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#ffd23f]/15 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 right-10 w-72 h-48 bg-[#ff6b86]/15 blur-3xl rounded-full pointer-events-none" />

          {/* Certificate Badge & Academy Header */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#ffd23f] via-[#ff8a3d] to-[#ff6b86] p-1 shadow-2xl shadow-[#ffd23f]/25">
                <div className="w-full h-full rounded-[20px] bg-[#0a0912] flex items-center justify-center text-[#ffd23f]">
                  <Award className="w-10 h-10" />
                </div>
              </div>
              <AuroraMascot mood="proud" size={64} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffd23f]/15 border border-[#ffd23f]/30 text-[11px] font-black uppercase tracking-[0.2em] text-[#ffd23f]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DevMaster Academy • Xalqaro Dasturlash Maktabi</span>
            </div>

            <h1
              id="certificate-modal-title"
              className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display"
            >
              SERTIFIKAT
            </h1>
            <p className="text-xs text-[#ffd23f]/90 font-bold uppercase tracking-widest">
              Muvaffaqiyatli Bitirganlik To&apos;g&apos;risida
            </p>
          </div>

          {/* Recipient */}
          <div className="relative z-10 my-8 space-y-2">
            <p className="text-xs sm:text-sm text-white/75 italic">Ushbu rasmiy hujjat tasdiqlaydiki,</p>
            <h2 className="text-2xl sm:text-4xl font-black text-[#ffd23f] tracking-wide font-display drop-shadow-[0_4px_20px_rgba(255,210,63,0.35)]">
              {certificate.studentName}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 max-w-xl mx-auto leading-relaxed pt-2">
              DevMaster Academy platformasida{' '}
              <span className="font-black text-white">&ldquo;{certificate.title}&rdquo;</span> o&apos;quv dasturi
              talablarini muvaffaqiyatli tamomladi hamda amaliy test va vazifalarni{' '}
              <span className="text-[#3ee6c4] font-black font-mono">{certificate.scorePercentage}%</span> natija bilan
              yakunladi.
            </p>
          </div>

          {/* Skills Badges */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 my-6 max-w-lg mx-auto">
            {certificate.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-white/10 text-white border border-[#ff6b86]/40 shadow-sm"
              >
                ✦ {skill}
              </span>
            ))}
          </div>

          {/* Signatures & Serial */}
          <div className="relative z-10 grid grid-cols-3 gap-4 pt-8 border-t border-white/15 text-xs mt-6 items-end">
            <div className="text-left space-y-1">
              <p className="font-black text-white">Olimjon Alimjonov (Lord)</p>
              <p className="text-[11px] text-white/70">Platforma Asoschisi & Bosh Arxitektor</p>
              <div className="w-28 h-1 rounded-full bg-gradient-to-r from-[#ffd23f] to-[#ff6b86] mt-1.5" />
            </div>

            {/* QR Code representation */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white p-1.5 rounded-2xl shadow-lg flex items-center justify-center border-2 border-[#ffd23f]">
                <div className="w-full h-full border border-[#0a0912] rounded-lg flex flex-col items-center justify-center text-[8px] font-mono text-[#0a0912] font-black">
                  <span>QR TASDIQ</span>
                  <span className="text-[7px] text-[#ff6b86]">{certificate.serialNumber.slice(-6)}</span>
                </div>
              </div>
              <span className="text-[10px] text-[#ffd23f] mt-1.5 font-mono font-bold">
                {certificate.serialNumber}
              </span>
            </div>

            <div className="text-right space-y-1">
              <p className="font-black text-white">Berilgan sana: {certificate.issueDate}</p>
              <p className="text-[11px] text-[#3ee6c4] font-extrabold flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Rasmiy Tasdiqlangan</span>
              </p>
              <div className="w-28 h-1 rounded-full bg-gradient-to-r from-[#3ee6c4] to-[#b6f03c] ml-auto mt-1.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
