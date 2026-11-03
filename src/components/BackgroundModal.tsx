import React, { useState } from 'react';
import {
  Palette,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Sliders,
  Check,
  X,
  Sparkles,
} from 'lucide-react';
import { useBackground } from '../context/BackgroundContext';

interface BackgroundModalProps {
  onClose: () => void;
}

const COLOR_PRESETS = [
  { name: 'Aurora Tungi (Default)', hex: '#0a0912' },
  { name: 'Chuqur Kosmos', hex: '#151226' },
  { name: 'Marjon Kecha', hex: '#28111c' },
  { name: 'Yalpiz Kecha', hex: '#092222' },
  { name: 'Quyosh Shafaqi', hex: '#26150d' },
  { name: 'Oltin Tun', hex: '#241e0c' },
  { name: 'Yorqin Kunduz (Light)', hex: '#fff9f5' },
  { name: 'Yumshoq Shaftoli', hex: '#fff0e6' },
];

const GRADIENT_PRESETS = [
  {
    name: 'Aurora Sunset (Asosiy)',
    gradient: 'linear-gradient(135deg, #0a0912 0%, #1d142b 50%, #2a1524 100%)',
  },
  {
    name: 'Marjon va Oltin',
    gradient: 'linear-gradient(135deg, #2d1222 0%, #3d1d1c 50%, #151226 100%)',
  },
  {
    name: 'Yalpiz Yog\'dusi',
    gradient: 'linear-gradient(135deg, #092222 0%, #123536 50%, #0a0912 100%)',
  },
  {
    name: 'Tropik Quyosh',
    gradient: 'linear-gradient(135deg, #2b1321 0%, #3a1f16 50%, #1f2b14 100%)',
  },
];

const SAMPLE_WALLPAPERS = [
  {
    name: 'Kiber Dasturchi',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
  },
  {
    name: 'Kosmik Yulduzlar',
    url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80',
  },
  {
    name: 'Zamonaviy Kod UI',
    url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80',
  },
  {
    name: 'Abstrakt Neon',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
  },
];

export const BackgroundModal: React.FC<BackgroundModalProps> = ({ onClose }) => {
  const { background, updateBackground, resetBackground } = useBackground();
  const [activeTab, setActiveTab] = useState<'color' | 'gradient' | 'upload' | 'url'>('color');
  const [uploadError, setUploadError] = useState('');

  const [customColor, setCustomColor] = useState(
    background.type === 'color' ? background.value : '#0a0912'
  );
  const [imageUrlInput, setImageUrlInput] = useState(
    background.type === 'image_url' ? background.value : ''
  );
  const [opacity, setOpacity] = useState(background.overlayOpacity ?? 0.35);

  const handleApplyColor = (color: string) => {
    updateBackground({
      type: 'color',
      value: color,
      overlayOpacity: opacity,
    });
  };

  const handleApplyGradient = (grad: string) => {
    updateBackground({
      type: 'gradient',
      value: grad,
      overlayOpacity: opacity,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Iltimos, faqat rasm faylini yuklang (PNG, JPG, WEBP).');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateBackground({
          type: 'image_upload',
          value: reader.result,
          overlayOpacity: Math.max(opacity, 0.4),
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (url: string) => {
    if (!url.trim()) return;
    updateBackground({
      type: 'image_url',
      value: url.trim(),
      overlayOpacity: Math.max(opacity, 0.4),
    });
  };

  const handleOpacityChange = (val: number) => {
    setOpacity(val);
    updateBackground({
      ...background,
      overlayOpacity: val,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-pop-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl aurora-card border-2 border-[#ff6b86]/40 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[var(--aurora-border)] flex items-center justify-between bg-[var(--aurora-surface-2)]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ff6b86] via-[#ff8a3d] to-[#ffd23f] text-[#0a0912] flex items-center justify-center shadow-lg">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[var(--aurora-text)] flex items-center gap-2 font-display">
                <span>Aurora Fon Sozlamalari</span>
                <Sparkles className="w-4 h-4 text-[#ffd23f]" />
              </h2>
              <p className="text-xs text-[var(--aurora-text-muted)]">
                Rang, gradient yoki shaxsiy fon rasmini o&apos;rnating
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Yopish"
            className="w-10 h-10 rounded-xl text-[var(--aurora-text-muted)] hover:text-[#ff5263] hover:bg-[#ff5263]/15 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[var(--aurora-border)] bg-[var(--aurora-surface-2)] p-2.5 gap-2 overflow-x-auto text-xs font-black">
          {(
            [
              { id: 'color', label: 'Bir Rang', icon: Palette },
              { id: 'gradient', label: 'Aurora Gradientlar', icon: Sparkles },
              { id: 'upload', label: 'Yuklash', icon: Upload },
              { id: 'url', label: 'Rasm Havolasi', icon: LinkIcon },
            ] as const
          ).map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`duo-btn px-4 py-2 text-xs flex items-center gap-2 whitespace-nowrap ${
                  activeTab === t.id ? 'duo-btn-coral' : 'duo-btn-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-[var(--aurora-text)]">
          {activeTab === 'color' && (
            <div className="space-y-4">
              <label className="text-xs font-black text-[var(--aurora-text)] uppercase tracking-wider block">
                Tayyor Fon Ranglari:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {COLOR_PRESETS.map((p) => {
                  const isSelected = background.type === 'color' && background.value === p.hex;
                  return (
                    <button
                      key={p.hex}
                      type="button"
                      onClick={() => handleApplyColor(p.hex)}
                      className="p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                      style={{
                        backgroundColor: p.hex,
                        borderColor: isSelected ? '#ffd23f' : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                        {isSelected && <Check className="w-4 h-4 text-[#ffd23f] font-black" />}
                      </div>
                      <span className="text-[11px] font-black text-white text-center drop-shadow-md">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[var(--aurora-border)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-[var(--aurora-text)] block">Maxsus rang tanlash:</span>
                  <span className="text-[11px] text-[var(--aurora-text-muted)]">HEX kodini tanlang</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      handleApplyColor(e.target.value);
                    }}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono font-black text-[#ffd23f] uppercase">
                    {customColor}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gradient' && (
            <div className="space-y-4">
              <label className="text-xs font-black text-[var(--aurora-text)] uppercase tracking-wider block">
                Aurora Gradient Fonlar:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GRADIENT_PRESETS.map((g) => {
                  const isSelected = background.type === 'gradient' && background.value === g.gradient;
                  return (
                    <button
                      key={g.name}
                      type="button"
                      onClick={() => handleApplyGradient(g.gradient)}
                      className="h-20 rounded-2xl border-2 p-4 flex items-center justify-between transition-all hover:scale-[1.02] text-left shadow-lg cursor-pointer"
                      style={{
                        background: g.gradient,
                        borderColor: isSelected ? '#ffd23f' : 'rgba(255,255,255,0.15)',
                      }}
                    >
                      <span className="text-sm font-black text-white drop-shadow-md">{g.name}</span>
                      {isSelected && (
                        <div className="w-7 h-7 rounded-full bg-[#ffd23f] text-[#0a0912] flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div className="p-8 border-2 border-dashed border-[#ff6b86]/40 hover:border-[#ff6b86] rounded-3xl text-center bg-[var(--aurora-surface-2)] transition-colors">
                <Upload className="w-12 h-12 text-[#ff6b86] mx-auto mb-3" />
                <h4 className="text-sm font-black text-[var(--aurora-text)] mb-1">
                  Qurilmangizdan rasm yuklang
                </h4>
                <p className="text-xs text-[var(--aurora-text-muted)] mb-4 max-w-sm mx-auto">
                  Kompyuteringiz yoki telefoningizdan fon rasmini tanlang (PNG, JPG, WEBP).
                </p>
                <label className="duo-btn duo-btn-coral px-5 py-2.5 text-xs inline-flex items-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>Faylni Tanlash</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-[#ff5263]/15 border border-[#ff5263]/40 text-xs font-bold text-[#ff5263]">
                  {uploadError}
                </div>
              )}

              {background.type === 'image_upload' && (
                <div className="p-3 bg-[#3ee6c4]/15 border border-[#3ee6c4]/40 rounded-2xl flex items-center justify-between">
                  <span className="text-xs text-[#3ee6c4] font-black flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Shaxsiy rasm o&apos;rnatildi!</span>
                  </span>
                  <button
                    type="button"
                    onClick={resetBackground}
                    className="text-xs text-[#ff5263] hover:underline font-black cursor-pointer"
                  >
                    Olib tashlash
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black text-[var(--aurora-text)] block mb-1.5">
                  Rasm Havolasi (URL):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="aurora-input flex-1 px-4 py-2.5 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyUrl(imageUrlInput)}
                    className="duo-btn duo-btn-mint px-5 py-2.5 text-xs"
                  >
                    Qo&apos;llash
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {SAMPLE_WALLPAPERS.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => {
                      setImageUrlInput(s.url);
                      handleApplyUrl(s.url);
                    }}
                    className="p-2.5 rounded-xl border border-[var(--aurora-border)] bg-[var(--aurora-surface-2)] hover:border-[#ff6b86] flex items-center gap-2.5 text-left transition-all cursor-pointer"
                  >
                    <img src={s.url} alt={s.name} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="text-xs font-black text-[var(--aurora-text)] truncate">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 rounded-2xl bg-[var(--aurora-surface-2)] border border-[var(--aurora-border)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-[var(--aurora-text)] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#3ee6c4]" />
                <span>Matn O&apos;qilishi Uchun Qoraytirish:</span>
              </span>
              <span className="font-mono font-black text-[#ffd23f]">{Math.round(opacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.85"
              step="0.05"
              value={opacity}
              onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
              className="w-full accent-[#ff6b86] cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--aurora-border)] bg-[var(--aurora-surface-2)] flex items-center justify-between">
          <button
            type="button"
            onClick={resetBackground}
            className="duo-btn duo-btn-surface px-4 py-2 text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Birlamchi Fon</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="duo-btn duo-btn-gold px-6 py-2 text-xs"
          >
            Tayyor (Yopish)
          </button>
        </div>
      </div>
    </div>
  );
};
