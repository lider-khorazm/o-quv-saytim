// Markaziy Ovoz Boshqaruvi: Haqiqiy O'zbek Neyron Ovozlari (uz-UZ-SardorNeural, uz-UZ-MadinaNeural va 30+ Studiya Ovozlar)
import { getShared, setShared, hasShared } from './remoteStore';

export const VOICE = "uz-UZ-SardorNeural";
export const USE_CYRILLIC = true;

const PRONUNCIATION: [RegExp, string][] = [
  [/CMDbek/gi, "Si Em Di bek"],
];

export function cleanForSpeech(rawText: string): string {
  if (!rawText) return '';

  return String(rawText)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[`#*~_>|\\/<>\[\]{}()]/g, ' ')
    .replace(/\bEy!\s*/gi, 'Hoy, ')
    .replace(/\bEy\s+/gi, 'Hoy ')
    .replace(/[^\p{L}\p{N}\s.,!?'"‘’ʻʼ`´-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 580);
}

export function fixUzbekApostrophe(text: string): string {
  return String(text || '').replace(/([oOgG])['‘’`ʼ´ʻ]/g, '$1ʻ');
}

export function toLatinToCyrillic(text: string): string {
  let s = String(text || '')
    .replace(/CMDbek/gi, 'Си Эм Ди бек')
    .replace(/Si Em Di bek/gi, 'Си Эм Ди бек');

  const multiMap: [RegExp, string][] = [
    [/o['‘’ʻʼ`´]/g, 'ў'],
    [/O['‘’ʻʼ`´]/g, 'Ў'],
    [/g['‘’ʻʼ`´]/g, 'ғ'],
    [/G['‘’ʻʼ`´]/g, 'Ғ'],
    [/sh/g, 'ш'],
    [/Sh/g, 'Ш'],
    [/SH/g, 'Ш'],
    [/ch/g, 'ч'],
    [/Ch/g, 'Ч'],
    [/CH/g, 'Ч'],
    [/ng/g, 'нг'],
    [/Ng/g, 'Нг'],
    [/NG/g, 'НГ'],
    [/ts/g, 'ц'],
    [/Ts/g, 'Ц'],
    [/TS/g, 'Ц'],
    [/ya/g, 'я'],
    [/Ya/g, 'Я'],
    [/YA/g, 'Я'],
    [/yu/g, 'ю'],
    [/Yu/g, 'Ю'],
    [/YU/g, 'Ю'],
    [/yo/g, 'ё'],
    [/Yo/g, 'Ё'],
    [/YO/g, 'Ё'],
    [/ye/g, 'е'],
    [/Ye/g, 'Е'],
    [/YE/g, 'Е'],
    [/(^|[^a-zA-Zа-яА-ЯёЁўЎғҒқҚҳҲ])e/g, '$1э'],
    [/(^|[^a-zA-Zа-яА-ЯёЁўЎғҒқҚҳҲ])E/g, '$1Э'],
    [/['‘’ʻʼ`´]/g, 'ъ'],
  ];

  for (const [rgx, rep] of multiMap) {
    s = s.replace(rgx, rep);
  }

  const charMap: Record<string, string> = {
    a: 'а', A: 'А',
    b: 'б', B: 'Б',
    d: 'д', D: 'Д',
    e: 'е', E: 'Е',
    f: 'ф', F: 'Ф',
    g: 'г', G: 'Г',
    h: 'ҳ', H: 'Ҳ',
    i: 'и', I: 'И',
    j: 'ж', J: 'Ж',
    k: 'к', K: 'К',
    l: 'л', L: 'Л',
    m: 'м', M: 'М',
    n: 'н', N: 'Н',
    o: 'о', O: 'О',
    p: 'п', P: 'П',
    q: 'қ', Q: 'Қ',
    r: 'р', R: 'Р',
    s: 'с', S: 'С',
    t: 'т', T: 'Т',
    u: 'у', U: 'У',
    v: 'в', V: 'В',
    x: 'х', X: 'Х',
    y: 'й', Y: 'Й',
    z: 'з', Z: 'З',
  };

  return s
    .split('')
    .map((ch) => charMap[ch] ?? ch)
    .join('');
}

export function forSpeech(text: string): string {
  let result = text;
  for (const [pattern, spoken] of PRONUNCIATION) {
    result = result.replace(pattern, spoken);
  }
  return USE_CYRILLIC ? toLatinToCyrillic(result) : result;
}

export type VoiceCategory = 'uz_tr' | 'ru_cyrl' | 'browser_classic' | 'gemini_special';

export interface CmdBekVoiceConfig {
  id: string;
  shortName: string;
  label: string;
  category?: VoiceCategory;
  gender?: 'male' | 'female' | 'robot';
  voiceURI?: string;
  voiceName?: string;
  voiceKeyword?: string;
  voiceIndex?: number;
  lang: string;
  pitch: number;
  rate: number;
  engine?: 'edge' | 'google' | 'tiktok' | 'gemini' | 'browser';
  edgeVoice?: string;
  edgePitchHz?: string;
  edgeRatePct?: string;
  googleLang?: string;
  tiktokVoice?: string;
  geminiVoiceName?: 'Puck' | 'Fenrir' | 'Charon' | 'Orus' | 'Zephyr' | 'Kore';
  audioPitchRate?: number;
  preservePitchOnAudio?: boolean;
  preferBrowserVoice?: boolean;
  description?: string;
  updatedAt: string;
}

const SHARED_VOICE_KEY = 'devmaster_cmdbek_voice_config_v1';
const LOCAL_VOICE_BACKUP_KEY = 'devmaster_cmdbek_voice_local_v2';

/**
 * HAQIQIY O'ZBEK NEYRON OVOZLARI (Microsoft Azure Neural uz-UZ-SardorNeural & uz-UZ-MadinaNeural)
 * hamda Turkiy, Kirill, Ko'p Tilli (Multilingual) va Maxsus Studiya Ovozlar Katalogi!
 */
export const CMDBEK_VOICE_PRESETS: CmdBekVoiceConfig[] = [
  // ================= 1. HAQIQIY O'ZBEK VA TURKIY NEYRON OVOZLAR (uz-UZ-SardorNeural, uz-UZ-MadinaNeural, az-AZ, tr-TR) =================
  {
    id: 'edge-sardor-uz-standard',
    shortName: 'Sardor Neural (O\'zbek)',
    label: "🇺🇿 Sardor Neural (Haqiqiy O'zbek Yigit / Erkak Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.0,
    rate: 1.04,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+4%',
    geminiVoiceName: 'Puck',
    preferBrowserVoice: false,
    description:
      "Rasmiy Microsoft Azure uz-UZ-SardorNeural — 100% tabiiy, sof o'zbek tilida ravon gapiruvchi o'g'il bola / yigit ovozi!",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-bekzod-uz-boy',
    shortName: 'Bekzod (Yosh O\'g\'il Bola)',
    label: "👦 Bekzod Neural (Quvnoq O'zbek O'g'il Bola Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.15,
    rate: 1.1,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '+20Hz',
    edgeRatePct: '+10%',
    geminiVoiceName: 'Puck',
    preferBrowserVoice: false,
    description:
      "O'zbek tilida jo'shqin va yosh o'smir o'g'il bola tembrida ravon gapiruvchi CMDbek ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-jasurbek-uz-teen',
    shortName: 'Jasurbek (Sho\'x Bolakay)',
    label: "🧑 Jasurbek Neural (Sho'x O'zbek Bolakay Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.25,
    rate: 1.12,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '+32Hz',
    edgeRatePct: '+12%',
    geminiVoiceName: 'Zephyr',
    preferBrowserVoice: false,
    description:
      "Hazilkash do'ppi kiygan yosh bolakay ohangidagi sof o'zbekcha ovoz",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-davron-uz-mentor',
    shortName: 'Davron (Salmoqli Ustoz)',
    label: "🎙️ Davron Neural (Salmoqli O'zbek Ustoz Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 0.86,
    rate: 0.98,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '-18Hz',
    edgeRatePct: '-2%',
    geminiVoiceName: 'Fenrir',
    preferBrowserVoice: false,
    description:
      "Yo'g'onroq, bosiq va ishonchli o'zbek ustoz dasturchi ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-otabek-uz-bass',
    shortName: 'Otabek (Chuqur Bas)',
    label: "🎓 Otabek Neural (Chuqur Bas O'zbek Professor Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 0.76,
    rate: 0.94,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '-30Hz',
    edgeRatePct: '-5%',
    geminiVoiceName: 'Charon',
    preferBrowserVoice: false,
    description:
      "Kino diktorlaridek yo'g'on bas tembrda o'zbekcha dona-dona gapiruvchi ovoz",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-sherzod-uz-fast',
    shortName: 'Sherzod (Tezkor Dasturchi)',
    label: "⚡ Sherzod Neural (Chaqqon O'zbek Dasturchi Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.05,
    rate: 1.2,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '+6Hz',
    edgeRatePct: '+22%',
    geminiVoiceName: 'Zephyr',
    preferBrowserVoice: false,
    description:
      "Kod va tushuntirishlarni o'zbek tilida juda chaqqon va ravon o'quvchi ovoz",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-madina-uz-standard',
    shortName: 'Madina Neural (O\'zbek Qiz)',
    label: "👧 Madina Neural (Haqiqiy O'zbek Qiz Bola / Ayol Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'female',
    lang: 'uz-UZ',
    pitch: 1.0,
    rate: 1.04,
    engine: 'edge',
    edgeVoice: 'uz-UZ-MadinaNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+4%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "Rasmiy Microsoft Azure uz-UZ-MadinaNeural — 100% tabiiy, sof o'zbek tilida ravon gapiruvchi qiz bola / ayol ovozi!",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-sevinch-uz-girl',
    shortName: 'Sevinch (Sho\'x Qizcha)',
    label: "🌸 Sevinch Neural (Quvnoq O'zbek Qizcha Ovozi · Sudralgandagi Ovoz)",
    category: 'uz_tr',
    gender: 'female',
    lang: 'uz-UZ',
    pitch: 1.18,
    rate: 1.1,
    engine: 'edge',
    edgeVoice: 'uz-UZ-MadinaNeural',
    edgePitchHz: '+24Hz',
    edgeRatePct: '+10%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "CMDbekni sudraganda chiqqan sho'x va jarangdor o'zbek qiz bola ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-nigora-uz-teacher',
    shortName: 'Nigora (Muloyim Ustoz)',
    label: "👩 Nigora Neural (Muloyim O'zbek Ayol Ustoz Ovozi · uz-UZ)",
    category: 'uz_tr',
    gender: 'female',
    lang: 'uz-UZ',
    pitch: 0.9,
    rate: 0.98,
    engine: 'edge',
    edgeVoice: 'uz-UZ-MadinaNeural',
    edgePitchHz: '-14Hz',
    edgeRatePct: '+0%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "Darslarni bosiq va tushunarli o'zbek tilida tushuntiruvchi ayol ustoz ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-babek-az',
    shortName: 'Babek Neural (Ozarbayjon)',
    label: "🇦🇿 Babek Neural (Qardosh Ozarbayjon-O'zbek Erkak Ovozi · az-AZ)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'az-AZ',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'az-AZ-BabekNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Orus',
    preferBrowserVoice: false,
    description:
      "O'zbek lotin harflarini qardosh turkiy ohangda o'ta ravon o'quvchi Babek erkak ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-banu-az',
    shortName: 'Banu Neural (Ozarbayjon Qiz)',
    label: "🇦🇿 Banu Neural (Qardosh Ozarbayjon-O'zbek Qiz Ovozi · az-AZ)",
    category: 'uz_tr',
    gender: 'female',
    lang: 'az-AZ',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'az-AZ-BanuNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "Mayin qardosh turkiy ohangdagi Banu qiz bola ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-ahmet-tr',
    shortName: 'Ahmet Neural (Turk)',
    label: "🇹🇷 Ahmet Neural (Turk-O'zbek Erkak Ovozi · tr-TR)",
    category: 'uz_tr',
    gender: 'male',
    lang: 'tr-TR',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'tr-TR-AhmetNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Orus',
    preferBrowserVoice: false,
    description:
      "Rasmiy Microsoft tr-TR-AhmetNeural — turk-o'zbek ohangida ravon gapiruvchi erkak ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-emel-tr',
    shortName: 'Emel Neural (Turk Qiz)',
    label: "🇹🇷 Emel Neural (Turk-O'zbek Qiz Bola Ovozi · tr-TR)",
    category: 'uz_tr',
    gender: 'female',
    lang: 'tr-TR',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'tr-TR-EmelNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "Rasmiy Microsoft tr-TR-EmelNeural — turk-o'zbek ohangida ravon gapiruvchi qiz bola ovozi",
    updatedAt: '2026-11-06',
  },

  // ================= 2. KIRILL / MARKAZIY OSIYO VA RUS NEYRON OVOZLARI (Daulet, Aigul, Dmitry, Svetlana) =================
  {
    id: 'edge-daulet-kk',
    shortName: 'Daulet Neural (Qozoq-Turkiy)',
    label: "🇰🇿 Daulet Neural (Markaziy Osiyo Turkiy Erkak Ovozi · kk-KZ)",
    category: 'ru_cyrl',
    gender: 'male',
    lang: 'kk-KZ',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'kk-KZ-DauletNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Fenrir',
    preferBrowserVoice: false,
    description:
      "O'zbek so'zlarini Kirill-Turkiy ohangda o'quvchi Daulet erkak neyron ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-aigul-kk',
    shortName: 'Aigul Neural (Qozoq Qiz)',
    label: "🇰🇿 Aigul Neural (Markaziy Osiyo Turkiy Qiz Ovozi · kk-KZ)",
    category: 'ru_cyrl',
    gender: 'female',
    lang: 'kk-KZ',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'kk-KZ-AigulNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "O'zbek so'zlarini Kirill-Turkiy ohangda o'quvchi Aigul qiz bola neyron ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-dmitry-ru',
    shortName: 'Dmitry Neural (Rus Erkak)',
    label: "🇷🇺 Dmitry Neural (Kirill-Rus Studiya Erkak Ovozi · ru-RU)",
    category: 'ru_cyrl',
    gender: 'male',
    lang: 'ru-RU',
    pitch: 0.96,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'ru-RU-DmitryNeural',
    edgePitchHz: '-4Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Charon',
    preferBrowserVoice: false,
    description:
      "Rasmiy Microsoft ru-RU-DmitryNeural — o'zbek matnini Kirill harflarida ravon o'quvchi studiya erkak ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-svetlana-ru',
    shortName: 'Svetlana Neural (Rus Qiz)',
    label: "🇷🇺 Svetlana Neural (Kirill-Rus Studiya Ayol Ovozi · ru-RU)",
    category: 'ru_cyrl',
    gender: 'female',
    lang: 'ru-RU',
    pitch: 1.04,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'ru-RU-SvetlanaNeural',
    edgePitchHz: '+4Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "Rasmiy Microsoft ru-RU-SvetlanaNeural — tiniq studiya ayol diktori ovozi",
    updatedAt: '2026-11-06',
  },

  // ================= 3. KO'P TILLI (MULTILINGUAL) VA MICROSOFT KLASSIK OVOZLAR =================
  {
    id: 'edge-andrew-multilingual',
    shortName: 'Andrew Multilingual',
    label: '🌐 Andrew Multilingual Neural (90+ Tilda Gapiruvchi Universal Erkak Ovozi)',
    category: 'browser_classic',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.0,
    rate: 1.04,
    engine: 'edge',
    edgeVoice: 'en-US-AndrewMultilingualNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+4%',
    geminiVoiceName: 'Orus',
    preferBrowserVoice: false,
    description:
      "Microsoft-ning eng yangi 90+ tilda (shu jumladan o'zbekcha va inglizcha kodlarni) tabiiy o'quvchi Andrew Multilingual ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-brian-multilingual',
    shortName: 'Brian Multilingual (Yigit)',
    label: "🌐 Brian Multilingual Neural (Universal O'g'il Bola / Yigit Ovozi)",
    category: 'browser_classic',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.04,
    rate: 1.05,
    engine: 'edge',
    edgeVoice: 'en-US-BrianMultilingualNeural',
    edgePitchHz: '+4Hz',
    edgeRatePct: '+5%',
    geminiVoiceName: 'Puck',
    preferBrowserVoice: false,
    description:
      "Ham o'zbekcha matnni, ham HTML/CSS/JS dasturlash atamalarini sof o'quvchi yosh yigit ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-emma-multilingual',
    shortName: 'Emma Multilingual (Qiz)',
    label: '🌐 Emma Multilingual Neural (Universal Qiz Bola / Ayol Ovozi)',
    category: 'browser_classic',
    gender: 'female',
    lang: 'uz-UZ',
    pitch: 1.04,
    rate: 1.04,
    engine: 'edge',
    edgeVoice: 'en-US-EmmaMultilingualNeural',
    edgePitchHz: '+4Hz',
    edgeRatePct: '+4%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "90+ tilda ravon gapiruvchi Emma Multilingual qiz bola neyron ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'edge-ava-multilingual',
    shortName: 'Ava Multilingual (Ayol)',
    label: '🌐 Ava Multilingual Neural (Universal Ustoz Ayol Ovozi)',
    category: 'browser_classic',
    gender: 'female',
    lang: 'uz-UZ',
    pitch: 1.0,
    rate: 1.02,
    engine: 'edge',
    edgeVoice: 'en-US-AvaMultilingualNeural',
    edgePitchHz: '+0Hz',
    edgeRatePct: '+2%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description:
      "Tiniq studiya sifatidagi ko'p tilli Ava ayol ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'voice-ms-david',
    shortName: 'Microsoft David (Brauzer)',
    label: "💻 Microsoft David (Ilk Versiyadagi Brauzer O'g'il Bola Ovozi)",
    category: 'browser_classic',
    gender: 'male',
    voiceKeyword: 'david',
    voiceIndex: 0,
    lang: 'en-US',
    pitch: 0.96,
    rate: 1.02,
    engine: 'browser',
    edgeVoice: 'en-US-GuyNeural',
    geminiVoiceName: 'Puck',
    preferBrowserVoice: true,
    description:
      "Birinchi yaratilganda brauzer ichidan chiqqan Microsoft David tizim ovozi",
    updatedAt: '2026-11-06',
  },
  {
    id: 'voice-ms-zira',
    shortName: 'Microsoft Zira (Brauzer Qiz)',
    label: '👧 Microsoft Zira (Sudralganda Chiqqan Brauzer Qiz Bola Ovozi)',
    category: 'browser_classic',
    gender: 'female',
    voiceKeyword: 'zira',
    voiceIndex: 1,
    lang: 'en-US',
    pitch: 1.22,
    rate: 1.04,
    engine: 'browser',
    edgeVoice: 'en-US-AnaNeural',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: true,
    description:
      "Avval CMDbek sudralganda brauzerdan chiqqan qiz bola (Microsoft Zira) ovozi",
    updatedAt: '2026-11-06',
  },

  // ================= 4. GEMINI AI VA MAXSUS QAHRAMON OVOZLARI =================
  {
    id: 'voice-gemini-puck',
    shortName: 'Puck (Gemini)',
    label: "✨ Puck (Gemini AI · O'zbek O'g'il Bola Ovozi)",
    category: 'gemini_special',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 1.08,
    rate: 1.06,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '+12Hz',
    edgeRatePct: '+8%',
    geminiVoiceName: 'Puck',
    preferBrowserVoice: false,
    description: "Quvnoq va jonli o'zbekcha Puck profili",
    updatedAt: '2026-11-06',
  },
  {
    id: 'voice-gemini-fenrir',
    shortName: 'Fenrir (Gemini)',
    label: "🐺 Fenrir (Gemini AI · Yo'g'on O'zbek Ustoz Ovozi)",
    category: 'gemini_special',
    gender: 'male',
    lang: 'uz-UZ',
    pitch: 0.82,
    rate: 0.96,
    engine: 'edge',
    edgeVoice: 'uz-UZ-SardorNeural',
    edgePitchHz: '-24Hz',
    edgeRatePct: '-4%',
    geminiVoiceName: 'Fenrir',
    preferBrowserVoice: false,
    description: "Chuqur va salmoqli o'zbekcha Fenrir profili",
    updatedAt: '2026-11-06',
  },
  {
    id: 'voice-gemini-kore',
    shortName: 'Kore (Gemini Qiz)',
    label: "🌸 Kore (Gemini AI · O'zbek Qiz Bola Ovozi)",
    category: 'gemini_special',
    gender: 'female',
    lang: 'uz-UZ',
    pitch: 1.08,
    rate: 1.04,
    engine: 'edge',
    edgeVoice: 'uz-UZ-MadinaNeural',
    edgePitchHz: '+10Hz',
    edgeRatePct: '+5%',
    geminiVoiceName: 'Kore',
    preferBrowserVoice: false,
    description: "Mayin o'zbekcha Kore qiz bola profili",
    updatedAt: '2026-11-06',
  },
  {
    id: 'voice-special-c3po',
    shortName: 'C-3PO Kiber-Droid',
    label: '🤖 C-3PO (Maxsus Kiber-Droid Robot Ovozi)',
    category: 'gemini_special',
    gender: 'robot',
    lang: 'uz-UZ',
    pitch: 1.08,
    rate: 1.04,
    engine: 'tiktok',
    tiktokVoice: 'en_us_c3po',
    geminiVoiceName: 'Orus',
    preferBrowserVoice: false,
    description: "Maxsus kiber-robot tembridagi ovoz",
    updatedAt: '2026-11-06',
  },
  {
    id: 'voice-special-stitch',
    shortName: 'Stitch (Multfilm)',
    label: '🐾 Stitch (Maxsus Multfilm Qahramoni Ovozi)',
    category: 'gemini_special',
    gender: 'robot',
    lang: 'uz-UZ',
    pitch: 1.2,
    rate: 1.05,
    engine: 'tiktok',
    tiktokVoice: 'en_us_stitch',
    geminiVoiceName: 'Puck',
    preferBrowserVoice: false,
    description: "Quvnoq multfilm qahramoni Stitch ovozi",
    updatedAt: '2026-11-06',
  },
];

let activeAudio: HTMLAudioElement | null = null;
let currentSpeechRequestId = 0;
let activeTtsAbortController: AbortController | null = null;

export function getGlobalCmdBekVoiceConfig(): CmdBekVoiceConfig {
  try {
    if (hasShared(SHARED_VOICE_KEY)) {
      const sharedArr = getShared<CmdBekVoiceConfig[]>(SHARED_VOICE_KEY, []);
      if (Array.isArray(sharedArr) && sharedArr.length > 0 && sharedArr[0]?.id) {
        const saved = sharedArr[0];
        const matchedPreset = CMDBEK_VOICE_PRESETS.find((p) => p.id === saved.id);
        if (matchedPreset) {
          return {
            ...matchedPreset,
            ...saved,
            engine: matchedPreset.engine,
            edgeVoice: matchedPreset.edgeVoice,
          };
        }
        // If saved has an explicit edgeVoice or voiceURI, keep it; otherwise upgrade legacy preset to uz-UZ-SardorNeural
        if (saved.edgeVoice || saved.voiceURI || saved.engine === 'tiktok') {
          return saved;
        }
      }
    }
  } catch {}

  try {
    const raw = localStorage.getItem(LOCAL_VOICE_BACKUP_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CmdBekVoiceConfig;
      if (parsed && parsed.id) {
        const matchedPreset = CMDBEK_VOICE_PRESETS.find((p) => p.id === parsed.id);
        if (matchedPreset) {
          return {
            ...matchedPreset,
            ...parsed,
            engine: matchedPreset.engine,
            edgeVoice: matchedPreset.edgeVoice,
          };
        }
        if (parsed.edgeVoice || parsed.voiceURI || parsed.engine === 'tiktok') {
          return parsed;
        }
      }
    }
  } catch {}

  // Default: Real Native Uzbek Male/Boy Neural Voice (uz-UZ-SardorNeural)!
  return CMDBEK_VOICE_PRESETS[0];
}

export function saveGlobalCmdBekVoiceConfig(config: CmdBekVoiceConfig): CmdBekVoiceConfig {
  const normalized: CmdBekVoiceConfig = {
    ...config,
    pitch: Math.max(0.5, Math.min(1.6, Number(config.pitch) || 1.0)),
    rate: Math.max(0.6, Math.min(1.6, Number(config.rate) || 1.04)),
    updatedAt: new Date().toLocaleString(),
  };

  try {
    localStorage.setItem(LOCAL_VOICE_BACKUP_KEY, JSON.stringify(normalized));
  } catch {}

  try {
    setShared(SHARED_VOICE_KEY, [normalized]);
  } catch {}

  return normalized;
}

export async function getAllBrowserSpeechVoices(): Promise<SpeechSynthesisVoice[]> {
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
    setTimeout(finish, 350);
  });
}

async function resolveVoiceForConfig(
  cfg: CmdBekVoiceConfig
): Promise<{ voice: SpeechSynthesisVoice | null; exactMatch: boolean }> {
  const voices = await getAllBrowserSpeechVoices();
  if (!voices.length) return { voice: null, exactMatch: false };

  if (cfg.voiceURI) {
    const exactUri = voices.find((v) => v.voiceURI === cfg.voiceURI);
    if (exactUri) return { voice: exactUri, exactMatch: true };
  }
  if (cfg.voiceName) {
    const exactName = voices.find(
      (v) => v.name.toLowerCase() === cfg.voiceName!.toLowerCase()
    );
    if (exactName) return { voice: exactName, exactMatch: true };
  }
  if (cfg.voiceKeyword) {
    const kw = cfg.voiceKeyword.toLowerCase();
    const byKeyword = voices.find((v) => v.name.toLowerCase().includes(kw));
    if (byKeyword) return { voice: byKeyword, exactMatch: true };
  }
  if (cfg.gender === 'female') {
    const femVoice = voices.find((v) =>
      /female|zira|hazel|susan|linda|irina|svetlana|yelda|emel|madina|google uk english female/i.test(
        v.name
      )
    );
    if (femVoice) return { voice: femVoice, exactMatch: true };
  }
  if (typeof cfg.voiceIndex === 'number' && voices.length > 1) {
    return {
      voice: voices[cfg.voiceIndex % voices.length],
      exactMatch: voices.length > cfg.voiceIndex,
    };
  }
  return { voice: voices[0] || null, exactMatch: false };
}

export function normalizeUzbekForFluentSpeech(rawText: string): string {
  return cleanForSpeech(rawText);
}

export function stopAllBoySpeech(): void {
  currentSpeechRequestId += 1;
  if (activeTtsAbortController) {
    try {
      activeTtsAbortController.abort();
    } catch {}
    activeTtsAbortController = null;
  }
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

export async function previewVoiceConfig(
  sampleText: string,
  cfg: CmdBekVoiceConfig,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<void> {
  stopAllBoySpeech();
  const myRequestId = ++currentSpeechRequestId;

  const clean = forSpeech(fixUzbekApostrophe(cleanForSpeech(sampleText)));
  if (!clean) {
    options?.onEnd?.();
    return;
  }

  options?.onStart?.();

  const isExplicitBrowserVoice = Boolean(cfg.voiceURI);

  if (cfg.preferBrowserVoice || isExplicitBrowserVoice) {
    const resolved = await resolveVoiceForConfig(cfg);
    if (myRequestId !== currentSpeechRequestId) return;
    if (
      resolved.voice &&
      (isExplicitBrowserVoice || resolved.exactMatch) &&
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(clean);
        utter.voice = resolved.voice;
        utter.lang = resolved.voice.lang || cfg.lang || 'en-US';
        utter.pitch = cfg.pitch ?? 1.0;
        utter.rate = cfg.rate ?? 1.02;
        utter.onend = () => {
          if (myRequestId === currentSpeechRequestId) options?.onEnd?.();
        };
        utter.onerror = () => {
          if (myRequestId === currentSpeechRequestId) options?.onEnd?.();
        };
        window.speechSynthesis.speak(utter);
        return;
      } catch {}
    }
  }

  // Convert pitch/rate to Edge SSML prosody
  const computedPitchHz =
    cfg.edgePitchHz ||
    `${Math.round(((cfg.pitch || 1.0) - 1.0) * 80) >= 0 ? '+' : ''}${Math.round(
      ((cfg.pitch || 1.0) - 1.0) * 80
    )}Hz`;
  const computedRatePct =
    cfg.edgeRatePct ||
    `${Math.round(((cfg.rate || 1.04) - 1.0) * 100) >= 0 ? '+' : ''}${Math.round(
      ((cfg.rate || 1.04) - 1.0) * 100
    )}%`;

  const controller = new AbortController();
  activeTtsAbortController = controller;

  try {
    const res = await fetch('/api/ai-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        text: clean,
        engine: cfg.engine || 'edge',
        edgeVoice: cfg.edgeVoice || 'uz-UZ-SardorNeural',
        edgePitchHz: computedPitchHz,
        edgeRatePct: computedRatePct,
        voiceName: cfg.geminiVoiceName || 'Puck',
        tiktokVoice: cfg.tiktokVoice,
        googleLang: cfg.googleLang,
      }),
    });

    if (myRequestId !== currentSpeechRequestId) return;

    if (res.ok) {
      const data = await res.json();
      if (myRequestId !== currentSpeechRequestId) return;

      if (data?.audioBase64) {
        const audio = new Audio(
          `data:${data.mimeType || 'audio/mpeg'};base64,${data.audioBase64}`
        );

        activeAudio = audio;
        audio.onended = () => {
          if (activeAudio === audio) activeAudio = null;
          if (myRequestId === currentSpeechRequestId) options?.onEnd?.();
        };
        audio.onerror = () => {
          if (activeAudio === audio) activeAudio = null;
          if (myRequestId === currentSpeechRequestId) options?.onEnd?.();
        };
        await audio.play();
        return;
      }
    }
  } catch (err: any) {
    if (err?.name === 'AbortError' || myRequestId !== currentSpeechRequestId) {
      return;
    }
    console.warn('Server neural TTS error, falling back to browser speech:', err);
  } finally {
    if (activeTtsAbortController === controller) {
      activeTtsAbortController = null;
    }
  }

  if (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    myRequestId === currentSpeechRequestId
  ) {
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(clean);
      const resolved = await resolveVoiceForConfig(cfg);
      if (myRequestId !== currentSpeechRequestId) return;
      if (resolved.voice) {
        utter.voice = resolved.voice;
      }
      utter.lang = cfg.lang || resolved.voice?.lang || 'uz-UZ';
      utter.pitch = cfg.pitch ?? 1.0;
      utter.rate = cfg.rate ?? 1.03;
      utter.onend = () => {
        if (myRequestId === currentSpeechRequestId) options?.onEnd?.();
      };
      utter.onerror = () => {
        if (myRequestId === currentSpeechRequestId) options?.onEnd?.();
      };
      window.speechSynthesis.speak(utter);
      return;
    } catch {}
  }

  if (myRequestId === currentSpeechRequestId) {
    options?.onEnd?.();
  }
}

export async function speakUzbekBoyVoice(
  rawText: string,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<void> {
  const activeConfig = getGlobalCmdBekVoiceConfig();
  return previewVoiceConfig(rawText, activeConfig, options);
}
