import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Move, Send, X } from 'lucide-react';
import { CmdBekMascot, type CmdBekMood } from './CmdBekMascot';
import { AiMentorModal } from './AiMentorModal';
import { speakUzbekBoyVoice, stopAllBoySpeech } from '../services/ttsService';

const ANGRY_DRAG_LINES = [
  "Voy bo', meni ko'tarib yuravermang, ichimdagi kodlarim to'kiladi!",
  "Hoy! Nega meni ko'tarib boshqa joyga uloqtirdingiz?! Do'ppim tushib ketay dediyu!",
  "Voy-bo'! Men Windows papkasi emasman-ku, buncha sudraysiz?! Boshim aylanib ketdi!",
  "Hoy! Sekinroq qo'ying, ichimdagi kodlarim to'kilib ketadi hozir!",
  "Meni u yoqdan bu yoqqa sudraguncha bitta savol bersangiz bo'lmaydimi?!",
];

/**
 * Ekranda Windows ilovalaridek istalgan joyga ko'tarib olib yuriladigan (Draggable) CMDbek AI.
 * Koordinata nuqtasi faqat AI maskotning o'zi (xabar pufakchasi absolute joylashgan, shuning uchun xabar chiqib-yo'qolganda AI o'rni siljimaydi).
 */
export function CmdBekAssistant() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [hover, setHover] = useState(false);

  // Draggable position of the AI mascot box itself (x, y from top-left; null = default bottom-right)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [angryMessage, setAngryMessage] = useState<string | null>(null);
  const mascotBoxRef = useRef<HTMLDivElement | null>(null);

  const dragStartRef = useRef<{
    clientX: number;
    clientY: number;
    origX: number;
    origY: number;
    moved: boolean;
    captured: boolean;
  } | null>(null);
  const angryTimerRef = useRef<any>(null);

  // Speech-to-Text (ovoz orqali savol berish) holatlari
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceLang, setVoiceLang] = useState<'uz-UZ' | 'ru-RU' | 'en-US'>('uz-UZ');
  const [pendingVoicePrompt, setPendingVoicePrompt] = useState<string>('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const show = setTimeout(() => setBubble(true), 2500);
    const hide = setTimeout(() => setBubble(false), 10000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => {
      stopAllBoySpeech();
      setOpen(true);
      setBubble(false);
      setAngryMessage(null);
    };
    const handleResize = () => {
      setPos((prev) => {
        if (!prev) return null;
        return {
          x: Math.max(10, Math.min(window.innerWidth - 114, prev.x)),
          y: Math.max(10, Math.min(window.innerHeight - 145, prev.y)),
        };
      });
    };
    window.addEventListener('open-cmdbek-ai', handleOpenEvent);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('open-cmdbek-ai', handleOpenEvent);
      window.removeEventListener('resize', handleResize);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
      if (angryTimerRef.current) {
        clearTimeout(angryTimerRef.current);
      }
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Agar ichki tugma bosilgan bo'lsa (mikrofon, AI chat, ovoz oynasi) drag qilmasin
    if ((e.target as HTMLElement).closest('[data-no-drag="true"]')) return;

    // AIning haqiqiy ekrandagi koordinatasini olamiz (xabar pufakchasiga bog'liq bo'lmagan holda!)
    const rect = mascotBoxRef.current?.getBoundingClientRect();
    const currentX = pos ? pos.x : rect ? rect.left : window.innerWidth - 124;
    const currentY = pos ? pos.y : rect ? rect.top : window.innerHeight - 160;

    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      origX: currentX,
      origY: currentY,
      moved: false,
      captured: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.clientX;
    const dy = e.clientY - dragStartRef.current.clientY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      dragStartRef.current.moved = true;
      if (!dragStartRef.current.captured) {
        dragStartRef.current.captured = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
      }
    }
    if (dragStartRef.current.moved) {
      const nextX = Math.max(
        10,
        Math.min(window.innerWidth - 114, dragStartRef.current.origX + dx)
      );
      const nextY = Math.max(
        10,
        Math.min(window.innerHeight - 145, dragStartRef.current.origY + dy)
      );
      setPos({ x: nextX, y: nextY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragStartRef.current?.captured) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }

    const wasMoved = dragStartRef.current?.moved;
    dragStartRef.current = null;

    if (wasMoved) {
      // Boshqa joyga ko'tarib qo'yilganda CMDbekning jahli chiqadi va O'G'IL BOLA OVOZIDA gapiradi!
      const randomLine = ANGRY_DRAG_LINES[Math.floor(Math.random() * ANGRY_DRAG_LINES.length)];
      setAngryMessage(randomLine);
      setBubble(false);

      // AI chat ichiga ham ushbu jahl xabarini yuboramiz
      window.dispatchEvent(
        new CustomEvent('cmdbek-dragged-angry', { detail: { text: randomLine } })
      );

      // Haqiqiy o'g'il bola ovozida o'qish (hech qachon qiz bola ovozi chiqmaydi)
      speakUzbekBoyVoice(randomLine);

      if (angryTimerRef.current) clearTimeout(angryTimerRef.current);
      angryTimerRef.current = setTimeout(() => {
        setAngryMessage(null);
      }, 5000);
    } else if (!(e.target as HTMLElement).closest('[data-no-drag="true"]')) {
      // Sudralmasdan ustiga bosilganda darhol AI oynasini ochadi
      stopAllBoySpeech();
      setOpen(true);
      setBubble(false);
      setAngryMessage(null);
    }
  };

  const startOrStopListening = () => {
    setVoiceError(null);
    setBubble(false);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError("Brauzerda Speech-to-Text qo'llab-quvvatlanmaydi.");
      return;
    }

    if (isListening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
      return;
    }

    try {
      stopAllBoySpeech();
      const recognition = new SpeechRecognition();
      recognition.lang = voiceLang;
      recognition.interimResults = true;
      recognition.continuous = false;

      recognition.onstart = () => {
        setTranscript('');
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setVoiceError('Mikrofonga ruxsat berilmadi.');
        } else {
          setVoiceError("Ovoz aniqlanmadi. Qayta urinib ko'ring.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
      setVoiceError("Mikrofonni yoqib bo'lmadi.");
    }
  };

  const handleSendVoiceTranscript = (customText?: string) => {
    const textToSend = (customText ?? transcript).trim();
    if (!textToSend) return;
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }
    setPendingVoicePrompt(textToSend);
    setTranscript('');
    setOpen(true);
  };

  const mood: CmdBekMood =
    isDragging || angryMessage
      ? 'angry'
      : voiceError
      ? 'oops'
      : isListening
      ? 'thinking'
      : transcript
      ? 'celebrating'
      : open
      ? 'happy'
      : hover
      ? 'speaking'
      : bubble
      ? 'hello'
      : 'idle';

  // Agar AI ekranning chap tomoniga sudralgan bo'lsa, xabar pufakchasi o'ng tomonda chiqadi, aks holda chap tomonda
  const showBubbleOnRight = pos !== null && pos.x < 280;

  const bubblePositionStyle: React.CSSProperties = showBubbleOnRight
    ? {
        position: 'absolute',
        left: 'calc(100% + 10px)',
        bottom: 18,
      }
    : {
        position: 'absolute',
        right: 'calc(100% + 10px)',
        bottom: 18,
      };

  // Asosiy tayanch nuqtasi — FAQAT AI maskotning o'zi! Xabar chiqsa ham, yo'qolsa ham AI joyidan qimirlamaydi.
  const containerStyle: React.CSSProperties = pos
    ? {
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: 108,
        zIndex: 60,
        display: open ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        touchAction: 'none',
        userSelect: 'none',
      }
    : {
        position: 'fixed',
        right: 16,
        bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
        width: 108,
        zIndex: 60,
        display: open ? 'none' : 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        touchAction: 'none',
        userSelect: 'none',
      };

  return (
    <>
      <div
        ref={mascotBoxRef}
        style={containerStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Angry Drag & Drop Bubble — Absolute positioned so it NEVER shifts CMDbek's position */}
        {angryMessage && !open && (
          <div
            data-no-drag="true"
            role="status"
            onClick={() => {
              setAngryMessage(null);
              setOpen(true);
            }}
            style={{
              ...bubblePositionStyle,
              width: 240,
              padding: '11px 14px',
              borderRadius: showBubbleOnRight ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
              background: '#240b15',
              border: '2px solid #ff4d6d',
              color: '#ffd23f',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: 12,
              boxShadow: '0 14px 34px -8px rgba(255,77,109,.65)',
              cursor: 'pointer',
              zIndex: 65,
            }}
          >
            {angryMessage}
          </div>
        )}

        {/* Live Speech-to-Text Bubble — Absolute positioned */}
        {(isListening || transcript || voiceError) && !open && !angryMessage && (
          <div
            data-no-drag="true"
            role="status"
            style={{
              ...bubblePositionStyle,
              width: 265,
              padding: '12px 14px',
              borderRadius: showBubbleOnRight ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
              background: '#0e0c18',
              border: voiceError ? '1.5px solid #ff6b86' : '1.5px solid #3ee6c4',
              color: '#f8f7ff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              boxShadow: '0 14px 34px -10px rgba(0,0,0,.8)',
              zIndex: 65,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3ee6c4] flex items-center gap-1.5">
                {isListening && (
                  <span className="w-2 h-2 rounded-full bg-[#ff6b86] animate-ping inline-block" />
                )}
                {voiceError
                  ? 'Xatolik'
                  : isListening
                  ? 'CMDbek eshitayapti...'
                  : 'Ovozli savol tayyor'}
              </span>

              <div className="flex items-center gap-1">
                {(['uz-UZ', 'ru-RU', 'en-US'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setVoiceLang(l)}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold cursor-pointer ${
                      voiceLang === l
                        ? 'bg-[#3ee6c4] text-[#0a0912]'
                        : 'bg-white/10 text-white/70'
                    }`}
                  >
                    {l.split('-')[0].toUpperCase()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    if (recognitionRef.current && isListening) {
                      try {
                        recognitionRef.current.stop();
                      } catch {}
                    }
                    setIsListening(false);
                    setTranscript('');
                    setVoiceError(null);
                  }}
                  className="text-white/60 hover:text-white p-0.5 cursor-pointer"
                  title="Yopish"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {voiceError ? (
              <p className="text-[#ff6b86] text-xs font-semibold">{voiceError}</p>
            ) : (
              <p className="text-[#b6f03c] text-xs font-bold leading-relaxed min-h-[28px] break-words">
                {transcript || '> Savolingizni yoki kod muammosini gapiring..._'}
              </p>
            )}

            {transcript && (
              <div className="mt-2.5 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleSendVoiceTranscript()}
                  className="duo-btn duo-btn-mint !py-1.5 !px-3 text-[11px] flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>CMDbekdan so&apos;rash</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Default Greeting Bubble — Absolute positioned */}
        {bubble && !open && !isListening && !transcript && !voiceError && !angryMessage && (
          <div
            data-no-drag="true"
            role="status"
            onClick={() => {
              setOpen(true);
              setBubble(false);
            }}
            style={{
              ...bubblePositionStyle,
              width: 225,
              padding: '10px 14px',
              borderRadius: showBubbleOnRight ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
              background: '#0e0c18',
              border: '1.5px solid #3ee6c4',
              color: '#b6f03c',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: 12,
              boxShadow: '0 12px 30px -10px rgba(0,0,0,.7)',
              cursor: 'pointer',
              animation: 'dm-pop .35s both',
              zIndex: 65,
            }}
          >
            {'> Salom! Ustimga bosing — suhbatlashamiz! Sudrasangiz jahlim chiqadi 😄_'}
          </div>
        )}

        {/* Floating Controls + Mascot (Fixed-width 108px anchor) */}
        <div className="flex flex-col items-center gap-1.5 w-full">
          <div className="flex items-center justify-center gap-1">
            <button
              data-no-drag="true"
              type="button"
              onClick={() => {
                stopAllBoySpeech();
                setOpen(true);
                setBubble(false);
                setAngryMessage(null);
              }}
              title="CMDbek AI oynasini ochish"
              className="px-2 py-1 rounded-full bg-gradient-to-r from-[#ff6b86] to-[#ff8a3d] text-white text-[10px] font-black shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-transform whitespace-nowrap"
            >
              AI Chat
            </button>

            <button
              data-no-drag="true"
              type="button"
              onClick={startOrStopListening}
              aria-label={isListening ? "Ovoz yozishni to'xtatish" : 'Mikrofon orqali savol berish'}
              title={
                isListening
                  ? "Ovoz yozishni to'xtatish"
                  : 'Mikrofon orqali CMDbekka ovozli savol berish'
              }
              className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border-2 shrink-0 ${
                isListening
                  ? 'bg-[#ff6b86] border-[#ffd23f] text-white animate-pulse'
                  : 'bg-[#0e0c18] border-[#3ee6c4] text-[#3ee6c4] hover:scale-105'
              }`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            </button>

            <span
              title="Ushlab istalgan joyga sudrang (Windows uslubida)"
              className="w-6 h-6 rounded-full bg-[#0e0c18]/90 border border-white/20 text-white/70 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0"
            >
              <Move className="w-3 h-3" />
            </span>
          </div>

          <button
            type="button"
            aria-label="AI ustoz CMDbek bilan suhbat"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              background: 'none',
              border: 0,
              padding: 0,
              minHeight: 0,
              borderRadius: 0,
              boxShadow: 'none',
              cursor: isDragging ? 'grabbing' : 'pointer',
              width: 96,
            }}
          >
            <CmdBekMascot mood={mood} size="100%" />
          </button>
        </div>
      </div>

      <AiMentorModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialVoicePrompt={pendingVoicePrompt}
        onVoicePromptConsumed={() => setPendingVoicePrompt('')}
      />
    </>
  );
}
