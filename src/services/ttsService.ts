// Birinchi yaratilgandagi asl ravon ovoz xizmati (Yagona ovoz, uz-UZ, tabiiy ravon o'qish)

let activeAudio: HTMLAudioElement | null = null;
let cachedSingleVoice: SpeechSynthesisVoice | null = null;
let currentUtteranceCancelled = false;

async function getLoadedVoices(): Promise<SpeechSynthesisVoice[]> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const existing = window.speechSynthesis.getVoices();
  if (existing && existing.length > 0) return existing;

  return new Promise((resolve) => {
    let resolved = false;
    const finish = () => {
      if (!resolved) {
        resolved = true;
        resolve(window.speechSynthesis.getVoices() || []);
      }
    };
    window.speechSynthesis.onvoiceschanged = finish;
    setTimeout(finish, 250);
  });
}

// Birinchi yaratilgandagi asl ravon ovozni tanlaydi va butun ilova uchun yagona ovoz sifatida qulflaydi
async function getSingleOriginalVoice(): Promise<SpeechSynthesisVoice | null> {
  if (cachedSingleVoice) return cachedSingleVoice;
  const voices = await getLoadedVoices();
  if (!voices.length) return null;

  const chosen =
    voices.find(
      (v) =>
        v.lang.toLowerCase().includes('uz') &&
        !v.name.toLowerCase().includes('female')
    ) ||
    voices.find((v) => v.lang.toLowerCase().includes('uz')) ||
    voices.find(
      (v) =>
        v.lang.toLowerCase().includes('tr') &&
        !v.name.toLowerCase().includes('female')
    ) ||
    voices.find((v) => v.lang.toLowerCase().includes('tr')) ||
    voices.find(
      (v) =>
        v.lang.toLowerCase().includes('ru') &&
        !v.name.toLowerCase().includes('female')
    ) ||
    voices.find((v) => v.lang.toLowerCase().includes('ru')) ||
    voices[0];

  cachedSingleVoice = chosen || null;
  return cachedSingleVoice;
}

/**
 * Matndan faqat kod bloklari, markdown belgilar va emojilarni tozalaydi
 * (harflarni "iy vay" deb buzib o'qimasligi uchun sun'iy harflab almashtirishlar qilinmaydi).
 */
export function normalizeUzbekForFluentSpeech(rawText: string): string {
  if (!rawText) return '';

  return String(rawText)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[`#*~_>|\\/<>\[\]{}()]/g, ' ')
    .replace(/\bEy!\s*/gi, 'Hoy, ')
    .replace(/\bEy\s+/gi, 'Hoy ')
    .replace(/[^\p{L}\p{N}\s.,!?'"‘’ʻʼ-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 700);
}

export function stopAllBoySpeech(): void {
  currentUtteranceCancelled = true;
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {}
    activeAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

export async function speakUzbekBoyVoice(
  rawText: string,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<void> {
  stopAllBoySpeech();
  currentUtteranceCancelled = false;

  const clean = normalizeUzbekForFluentSpeech(rawText);
  if (!clean) {
    options?.onEnd?.();
    return;
  }

  options?.onStart?.();

  // 1. Server TTS (birinchi yaratilgandagi 'Puck' ovozi)
  try {
    const res = await fetch('/api/ai-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: clean }),
    });
    if (currentUtteranceCancelled) {
      options?.onEnd?.();
      return;
    }
    if (res.ok) {
      const data = await res.json();
      if (data?.audioBase64 && !currentUtteranceCancelled) {
        const audio = new Audio(
          `data:${data.mimeType || 'audio/wav'};base64,${data.audioBase64}`
        );
        activeAudio = audio;
        audio.onended = () => {
          if (activeAudio === audio) activeAudio = null;
          options?.onEnd?.();
        };
        audio.onerror = () => {
          if (activeAudio === audio) activeAudio = null;
          options?.onEnd?.();
        };
        await audio.play();
        return;
      }
    }
  } catch {}

  if (currentUtteranceCancelled) {
    options?.onEnd?.();
    return;
  }

  // 2. Birinchi yaratilgandagi asl ravon Web Speech ovozi (uz-UZ, pitch 0.96, rate 1.03)
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(clean);
      const boyVoice = await getSingleOriginalVoice();
      if (boyVoice) {
        utter.voice = boyVoice;
      }
      utter.lang = 'uz-UZ';
      utter.pitch = 0.96;
      utter.rate = 1.03;

      utter.onend = () => {
        options?.onEnd?.();
      };
      utter.onerror = () => {
        options?.onEnd?.();
      };

      window.speechSynthesis.speak(utter);
      return;
    } catch {}
  }

  options?.onEnd?.();
}
