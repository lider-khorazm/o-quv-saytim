import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCw, ZoomIn, Check, X, RefreshCw } from 'lucide-react';

interface CircularPhotoCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePhoto: (croppedDataUrl: string) => void;
}

export const CircularPhotoCropperModal: React.FC<CircularPhotoCropperModalProps> = ({
  isOpen,
  onClose,
  onSavePhoto,
}) => {
  const [mode, setMode] = useState<'upload' | 'camera'>('upload');
  const [sourceImageUrl, setSourceImageUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1.15);
  const [rotation, setRotation] = useState<number>(0);
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [cameraError, setCameraError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setSourceImageUrl(null);
      setZoom(1.15);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
      setCameraError(null);
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    setCameraError(null);
    setMode('camera');
    setSourceImageUrl(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      setCameraError("Kameraga ulanib bo'lmadi. Ruxsat berilganini tekshiring yoki rasm yuklang.");
    }
  };

  const captureFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      stopCamera();
      setSourceImageUrl(dataUrl);
      setMode('upload');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSourceImageUrl(reader.result);
        setZoom(1.15);
        setRotation(0);
        setOffset({ x: 0, y: 0 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCircularCrop = () => {
    if (!sourceImageUrl || !imageElementRef.current) return;
    const img = imageElementRef.current;
    const size = 320;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Circular mask
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.fillStyle = '#141225';
    ctx.fillRect(0, 0, size, size);

    ctx.translate(size / 2 + offset.x, size / 2 + offset.y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    const ratio = Math.max(size / (img.naturalWidth || size), size / (img.naturalHeight || size));
    const drawW = (img.naturalWidth || size) * ratio;
    const drawH = (img.naturalHeight || size) * ratio;

    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    onSavePhoto(croppedDataUrl);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md rounded-3xl bg-[#171923] border border-white/15 shadow-2xl overflow-hidden text-white">
        {/* Top Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#38bdf8]" />
            <span>Profil Rasmini O&apos;rnatish</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switch: Upload vs Camera */}
        <div className="p-4 border-b border-white/10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              setMode('upload');
              fileInputRef.current?.click();
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              mode === 'upload'
                ? 'bg-[#38bdf8] text-[#0a0912]'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Rasm Yuklash</span>
          </button>

          <button
            type="button"
            onClick={startCamera}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
              mode === 'camera'
                ? 'bg-[#3ee6c4] text-[#0a0912]'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Kamera Orqali</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Main Viewport: Camera or Telegram-style Circular Cropper */}
        <div className="p-6 flex flex-col items-center justify-center">
          {mode === 'camera' && !sourceImageUrl ? (
            <div className="w-full flex flex-col items-center space-y-4">
              {cameraError ? (
                <div className="p-4 rounded-2xl bg-[#ef4444]/20 border border-[#ef4444]/40 text-xs text-center text-[#fca5a5]">
                  {cameraError}
                </div>
              ) : (
                <div className="relative w-72 h-72 rounded-2xl overflow-hidden bg-black border border-white/20 flex items-center justify-center">
                  <video
                    ref={videoRef}
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  {/* Circular guide overlay */}
                  <div className="absolute inset-0 pointer-events-none border-[36px] border-black/55 rounded-2xl" />
                  <div className="w-56 h-56 rounded-full border-2 border-white/80 pointer-events-none absolute" />
                </div>
              )}

              {!cameraError && (
                <button
                  type="button"
                  onClick={captureFromCamera}
                  className="duo-btn duo-btn-mint px-6 py-2.5 text-xs"
                >
                  <Camera className="w-4 h-4" />
                  <span>Suratga Olish</span>
                </button>
              )}
            </div>
          ) : sourceImageUrl ? (
            <div className="w-full flex flex-col items-center space-y-4">
              {/* Telegram-style Square Frame with Circular Bright Cutout & 3x3 Rule-of-Thirds Grid */}
              <div
                onMouseDown={(e) => {
                  setDragging(true);
                  setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
                }}
                onMouseMove={(e) => {
                  if (!dragging) return;
                  setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                }}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
                className="relative w-72 h-72 rounded-xl overflow-hidden bg-[#0b0d14] cursor-move select-none flex items-center justify-center border border-white/20"
              >
                <img
                  ref={imageElementRef}
                  src={sourceImageUrl}
                  alt="Crop preview"
                  draggable={false}
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
                  }}
                  className="max-w-none w-72 h-72 object-cover pointer-events-none"
                />

                {/* Darkened Outside Circle Mask + 3x3 Grid (Telegram Desktop style) */}
                <svg
                  viewBox="0 0 288 288"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                >
                  <defs>
                    <mask id="telegram-circle-mask">
                      <rect width="288" height="288" fill="white" />
                      <circle cx="144" cy="144" r="126" fill="black" />
                    </mask>
                  </defs>
                  <rect
                    width="288"
                    height="288"
                    fill="rgba(0,0,0,0.58)"
                    mask="url(#telegram-circle-mask)"
                  />
                  {/* Circle border */}
                  <circle
                    cx="144"
                    cy="144"
                    r="126"
                    fill="none"
                    stroke="rgba(255,255,255,0.85)"
                    strokeWidth="2"
                  />
                  {/* 3x3 Grid lines */}
                  <line x1="96" y1="18" x2="96" y2="270" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                  <line x1="192" y1="18" x2="192" y2="270" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                  <line x1="18" y1="96" x2="270" y2="96" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                  <line x1="18" y1="192" x2="270" y2="192" stroke="rgba(255,255,255,0.28)" strokeWidth="1" />
                </svg>
              </div>

              {/* Zoom & Rotate Controls */}
              <div className="w-full flex items-center gap-3 px-2">
                <ZoomIn className="w-4 h-4 text-[#38bdf8] shrink-0" />
                <input
                  type="range"
                  min="0.8"
                  max="2.5"
                  step="0.05"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 accent-[#38bdf8] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                  title="90° aylantirish"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1.15);
                    setRotation(0);
                    setOffset({ x: 0, y: 0 });
                  }}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer"
                  title="Tiklash"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-64 h-64 rounded-full border-2 border-dashed border-white/25 hover:border-[#38bdf8] bg-white/5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all p-6 text-center"
            >
              <Upload className="w-10 h-10 text-[#38bdf8]" />
              <p className="text-xs font-bold">
                Kompyuterdan rasm tanlash uchun bosing yoki yuqoridan Kamerani yoqing
              </p>
              <span className="text-[11px] opacity-60">
                To&apos;rtburchak rasm ham avtomatik dumaloq shaklga keltiriladi
              </span>
            </div>
          )}
        </div>

        {/* Bottom Telegram-style Action Bar: Cancel | Set Photo */}
        <div className="px-5 py-3.5 bg-[#11131c] border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white/80 hover:bg-white/10 cursor-pointer"
          >
            Bekor qilish (Cancel)
          </button>

          <button
            type="button"
            disabled={!sourceImageUrl}
            onClick={handleApplyCircularCrop}
            className="px-5 py-2 rounded-xl text-xs font-black bg-[#38bdf8] text-[#0a0912] hover:bg-[#7dd3fc] disabled:opacity-40 cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Rasmni O&apos;rnatish (Set Photo)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
