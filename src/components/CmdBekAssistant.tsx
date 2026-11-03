import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Send, X } from 'lucide-react';
import { CmdBekMascot, type CmdBekMood } from './CmdBekMascot';
import { AiMentorModal } from './AiMentorModal';

/** Pastki o'ng burchakdagi suzuvchi CMDbek: bosilsa AI mentor chati ochiladi yoki mikrofon orqali ovozli savol qabul qiladi. */
export function CmdBekAssistant() {
  const [open, setOpen] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [hover, setHover] = useState(false);

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
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

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

  const mood: CmdBekMood = voiceError
    ? 'oops'
    : isListening
    ? 'thinking'
    : transcript
    ? 'celebrating'
    : open
    ? 'happy'
    : hover
    ? 'explaining'
    : bubble
    ? 'hello'
    : 'idle';

  return (
    <>
      <div
        style={{
          position: 'fixed',
          right: 14,
          bottom: 'calc(14px + env(safe-area-inset-bottom, 0px))',
          zIndex: 60,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 10,
        }}
      >
        {/* Live Speech-to-Text Bubble */}
        {(isListening || transcript || voiceError) && !open && (
          <div
            role="status"
            style={{
              marginBottom: 38,
              width: 265,
              padding: '12px 14px',
              borderRadius: '16px 16px 4px 16px',
              background: '#0e0c18',
              border: voiceError ? '1.5px solid #ff6b86' : '1.5px solid #3ee6c4',
              color: '#f8f7ff',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 12,
              boxShadow: '0 14px 34px -10px rgba(0,0,0,.8)',
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

        {/* Default Greeting Bubble */}
        {bubble && !open && !isListening && !transcript && !voiceError && (
          <div
            role="status"
            onClick={() => setOpen(true)}
            style={{
              marginBottom: 46,
              maxWidth: 210,
              padding: '10px 14px',
              borderRadius: '14px 14px 4px 14px',
              background: '#0e0c18',
              border: '1.5px solid #3ee6c4',
              color: '#b6f03c',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700,
              fontSize: 13,
              boxShadow: '0 12px 30px -10px rgba(0,0,0,.7)',
              cursor: 'pointer',
              animation: 'dm-pop .35s both',
            }}
          >
            {'> Nimani tushuntirib beray?_'}
          </div>
        )}

        {/* Floating Controls: Microphone Speech-to-Text Trigger + CMDbek Mascot */}
        <div className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={startOrStopListening}
            aria-label={isListening ? "Ovoz yozishni to'xtatish" : 'Mikrofon orqali savol berish'}
            title={
              isListening
                ? "Ovoz yozishni to'xtatish"
                : 'Mikrofon orqali CMDbekka ovozli savol berish'
            }
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer border-2 ${
              isListening
                ? 'bg-[#ff6b86] border-[#ffd23f] text-white animate-pulse'
                : 'bg-[#0e0c18] border-[#3ee6c4] text-[#3ee6c4] hover:scale-105'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            type="button"
            aria-label="AI ustoz CMDbek bilan suhbat"
            onClick={() => {
              setOpen(true);
              setBubble(false);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              background: 'none',
              border: 0,
              padding: 0,
              minHeight: 0,
              borderRadius: 0,
              boxShadow: 'none',
              cursor: 'pointer',
              width: 'clamp(76px, 20vw, 112px)',
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
