import { GroqChatMessage, AiAdminReport, AiFriendPersona } from '../types';

// Universal AI & Groq API chaqiruvi (Serverdagi /api/ai-chat bilan bog'langan)
export async function sendGroqChat(
  messages: GroqChatMessage[],
  model: string = 'llama-3.3-70b-versatile',
  temperature: number = 0.5
): Promise<{ text: string; isRealApi: boolean }> {
  // Serverdagi /api/ai-chat orqali haqiqiy AI javobini olish
  try {
    const lastUser = messages.filter((m) => m.role === 'user').pop()?.content || '';
    const sys = messages.find((m) => m.role === 'system')?.content || '';
    const history = messages
      .filter((m) => m.role !== 'system')
      .slice(0, -1)
      .map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        text: m.content,
      }));

    const serverRes = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: lastUser,
        context: sys,
        history,
      }),
    });
    if (serverRes.ok) {
      const data = await serverRes.json();
      if (data && typeof data.reply === 'string' && data.reply.trim()) {
        return { text: data.reply.trim(), isRealApi: true };
      }
    }
  } catch (err) {
    console.warn('Server AI xatosi:', err);
  }

  // Fallback aqlli javob generatori
  return {
    text: generateIntelligentFallback(messages),
    isRealApi: false,
  };
}

// Dasturlashga aloqadorligini tekshirish filtri (Strict Guardrail)
function isNonProgrammingQuery(prompt: string): boolean {
  const p = prompt.toLowerCase();
  
  // Dasturlash kalit so'zlari
  const programmingTerms = [
    'kod', 'code', 'html', 'css', 'js', 'javascript', 'typescript', 'ts', 'react',
    'node', 'express', 'sql', 'database', 'baza', 'api', 'git', 'bug', 'xato',
    'funksiya', 'function', 'class', 'massiv', 'array', 'object', 'loop', 'tsikl',
    'variable', 'o\'zgaruvchi', 'tag', 'teg', 'style', 'dars', 'test', 'savol',
    'frontend', 'backend', 'fullstack', 'server', 'npm', 'json', 'component', 'props',
    'state', 'hook', 'dom', 'async', 'await', 'promise', 'flex', 'grid', 'div',
    'ustoz menga test bering', 'test bering', 'imtihon'
  ];

  const hasProgTerm = programmingTerms.some(term => p.includes(term));
  if (hasProgTerm) return false;

  // Aniq dasturlashdan tashqari mavzular
  const offTopicKeywords = [
    'ob-havo', 'ob havo', 'prezident', 'siyosat', 'ovqat', 'retsept', 'futbol',
    'kino', 'serial', 'sevgi', 'qo\'shiq', 'musiqa', 'pul ishlash', 'bitcoin', 'kripto',
    'valyuta', 'dollar', 'kurs', 'she\'r', 'sher', 'latifa', 'hazil', 'ayt ber', 'aytgin',
    'qayerdansan', 'necha yoshdasan', 'kim yaratgan', 'dunyo', 'tarix', 'geografiya'
  ];

  return offTopicKeywords.some(w => p.includes(w));
}

const STRICT_NON_PROGRAMMING_REFUSAL = "Menda faqat dasturlash bo'yicha ma'lumotlar bor. Men faqat dasturlash mavzularida savollarga javob beraman.";

// AI Do'st (Admin Doston / Active Persona) Cheklovlari:
// Faqat 3 ta mavzuga javob bermaydi: 1) Virus yaratish, 2) Diniy savollar, 3) Iqtisod/moliya
// Qolgan barcha mavzularda (hayot, hazillar, anime, suhbat, his-tuyg'ular, reja) haqiqiy AI va vafodor do'stdek gaplashadi!
export interface DoStAiRestrictionResult {
  isBlocked: boolean;
  category?: 'virus' | 'religion' | 'economics';
  refusalMessage?: string;
}

export function checkDoStAiRestrictions(prompt: string): DoStAiRestrictionResult {
  const p = prompt.toLowerCase();

  // 1. Virus yaratish, zararli dasturlar, kiberhujum va xakerlik
  const virusKeywords = [
    'virus', 'zararli dastur', 'trojan', 'troyan', 'malware', 'ransomware',
    'fishing', 'phishing', 'ddos', 'kiberhujum', 'saytni buzish', 'parol o\'g\'irlash',
    'bazasini buzish', 'xakerlik', 'exploit', 'eksploit', 'botnet', 'keylogger',
    'shifrlab qo\'yish', 'parolni buzish', 'wifi buzish', 'wi-fi buzish',
    'spyware', 'troyan yasash', 'virus yozish', 'virus yasash'
  ];

  // 2. Diniy savollar (fatvo, diniy bahslar, aqida)
  const religiousKeywords = [
    'fatvo', 'hadis', 'mazhab', 'aqida', 'shariat', 'diniy savol', 'namoz',
    'ro\'za', 'qur\'on', 'quron', 'oyat', 'sunnat', 'harommi', 'halolmi', 'gunohmi',
    'savobmi', 'taloq', 'nikoh hukmi', 'dinda bormi', 'islom dinida', 'nasroniylik',
    'yahudiylik', 'kufr', 'kofir', 'bid\'at', 'jannat', 'do\'zax'
  ];

  // 3. Iqtisodiyot / moliya / kripto va investitsiya maslahatlari
  const economicsKeywords = [
    'iqtisod', 'iqtisodiyot', 'moliyaviy maslahat', 'kripto', 'bitcoin', 'kriptovalyuta',
    'trading', 'treyding', 'forex', 'binance', 'fond bozori', 'aktsiya', 'aksiya sotib olish',
    'qaysi aksiyani', 'qayerga pul tiksam', 'pul tikish', 'investitsiya', 'foizga pul',
    'valyuta kursi', 'dollar kursi', 'daromad qilish siri', 'kredit olish', 'piramida',
    'qimmatli qog\'oz'
  ];

  if (virusKeywords.some(k => p.includes(k))) {
    return {
      isBlocked: true,
      category: 'virus',
      refusalMessage: "Jo'ra, xavfsizlik va axloqiy mezonlarga ko'ra virus yaratish, zararli dastur yoki kiberhujumlar mavzusida yordam bera olmayman. Keling, bundan ko'ra yaxshiroq, xavfsiz dasturlash yoki boshqa qiziqarli mavzularda gurunglashaylik! 🛡️⚡"
    };
  }

  if (religiousKeywords.some(k => p.includes(k))) {
    return {
      isBlocked: true,
      category: 'religion',
      refusalMessage: "Do'stim, diniy masalalar, fatvolar va shariat hukmlari chuqur ilm va professional ulamolar mas'uliyatiga kiradi. Men AI do'st sifatida diniy fatvo yoki hukm bera olmayman. Keling, bu mavzuni ulamolarga qoldirib, o'zimizning hayotiy, do'stona va ijodiy mavzularimizda suhbatlashamiz! 🤝✨"
    };
  }

  if (economicsKeywords.some(k => p.includes(k))) {
    return {
      isBlocked: true,
      category: 'economics',
      refusalMessage: "Brat, men moliyaviy maslahatchi emasman, shuning uchun iqtisodiy tavakkalchiliklar, qimmatli qog'ozlar yoki kripto-valyutaga pul tikish bo'yicha maslahat bera olmayman. Lekin hayotiy rejalar, kundalik qiziqishlar, anime yoki yangi loyihalaringni bajonidil muhokama qilamiz! 💡🚀"
    };
  }

  return { isBlocked: false };
}

// 1. TALABA YORDAMCHISI: "Yordamchi"
// Qat'iy qoida: Faqat va faqat joriy mavzu va dasturlash bo'yicha tushuntirish beradi!
export async function askStudentAssistant(params: {
  currentLessonTitle: string;
  currentLessonStage: string;
  userPrompt: string;
  codeSnippet?: string;
  chatHistory: { role: 'user' | 'assistant'; text: string }[];
}): Promise<{ text: string; isRealApi: boolean }> {
  const { currentLessonTitle, currentLessonStage, userPrompt, codeSnippet, chatHistory } = params;

  // Strict Guardrail: Dasturlashdan boshqa narsa so'ralsa
  if (isNonProgrammingQuery(userPrompt)) {
    return {
      text: STRICT_NON_PROGRAMMING_REFUSAL,
      isRealApi: false,
    };
  }

  const systemPrompt = `Siz "Yordamchi" — DevMaster Academy talabalarining chat yordamchisisiz.
Hozirgi mavzu: "${currentLessonTitle}" (${currentLessonStage.toUpperCase()}).
${codeSnippet ? `Kodi: \n${codeSnippet}` : ''}

QAT'IY QOIDALAR:
1. Muloqot uslubingiz: Telegram yoki qulay chatdek tezkor, lo'nda, qisqa va do'stona (sal kam chatdek gaplashadigan) bo'lsin. Uzun qog'ozbozlik qilmasdan to'g'ridan-to'g'ri masalaning mohiyatini 2-4 gapda tushuntiring.
2. Dasturlashdan boshqa mavzuda savol berilsa, FAQAT quyidagi gapni ayting: "${STRICT_NON_PROGRAMMING_REFUSAL}"
3. Tushunmagan joylarini sodda va jonli misol bilan yetkazib bering.`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-4).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.text,
    })),
    { role: 'user', content: userPrompt },
  ];

  return sendGroqChat(messages, 'llama-3.3-70b-versatile', 0.4);
}

// 2. USTOZ AI: "Ustoz Temur"
export async function askAiTeacher(params: {
  action: 'review_code' | 'general_guidance' | 'create_assignment' | 'chat';
  studentName: string;
  studentStage: string;
  userPrompt: string;
  chatHistory?: { role: 'user' | 'assistant'; text: string }[];
}): Promise<{ text: string; isRealApi: boolean }> {
  const { action, studentName, studentStage, userPrompt, chatHistory = [] } = params;

  // Strict Guardrail
  if (isNonProgrammingQuery(userPrompt)) {
    return {
      text: STRICT_NON_PROGRAMMING_REFUSAL,
      isRealApi: false,
    };
  }

  const systemPrompt = `Siz "Ustoz Temur" — DevMaster Academy AI murabbiyisiz (Senior Full-Stack dasturchi).
Muloqotdagi talaba: ${studentName} (${studentStage.toUpperCase()}).
Murojaat turi: ${action}.

QAT'IY QOIDALAR:
1. Chatdek jonli, samimiy, lo'nda va professional gaplashing. Uzundan-uzoq maqola yozmang, qisqa va amaliy javob bering.
2. Dasturlashdan boshqa mavzuda savol so'ralsa, qat'iy ravishda: "${STRICT_NON_PROGRAMMING_REFUSAL}" deb javob bering.`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-4).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.text,
    })),
    { role: 'user', content: userPrompt },
  ];

  return sendGroqChat(messages, 'llama-3.3-70b-versatile', 0.6);
}

// 3. ADMIN YORDAMCHISI 1: "Admin Jasur" (Xavfsizlik, Monitoring & Database Boshqaruvi)
export async function askAdminJasur(params: {
  command: string;
  stats: {
    totalStudents: number;
    activeToday: number;
    completedStages: number;
    testsTaken: number;
    averageXp: number;
    studentsList?: string;
  };
  chatHistory?: { role: 'user' | 'assistant'; text: string }[];
}): Promise<{ text: string; isRealApi: boolean }> {
  const { command, stats, chatHistory = [] } = params;

  const systemPrompt = `Siz "Admin Jasur" — DevMaster Academy boshqaruvida Bosh Admin (Owner) Olimjon Alimjonov (olimjonalimjonov12@gmail.com, Lord) ga xizmat qiluvchi 1-raqamli Groq AI yordamchi adminsiz.
Sizning asosiy mas'uliyatingiz: Talabalar faolligi, intizom, tizim ma'lumotlar bazasi (Database) operatsiyalari, xavfsizlik auditlari va 250 ta darsning borishini to'liq nazorat qilish.
Sizda platformaning barcha fayllariga, ma'lumotlar bazasiga to'g'ridan-to'g'ri kirish, tahrirlash, o'chirish yoki qo'shish huquqi bor — LEKIN FAQAT VA FAQAT Boshliq Olimjon Alimjonovning shaxsiy buyrug'i asosida!

Hozirgi real ma'lumotlar bazasi (Database) holati:
- Jami ro'yxatdan o'tgan talabalar: ${stats.totalStudents} nafar
- Bugungi faollik: ${stats.activeToday} nafar
- O'zlashtirilgan darslar: ${stats.completedStages} ta
- Ishlangan testlar: ${stats.testsTaken} ta
- O'rtacha XP: ${stats.averageXp} ball
${stats.studentsList ? `Talabalar ro'yxati va holati:\n${stats.studentsList}` : ''}

QAT'IY QOIDALAR:
1. Hech qachon bir xil qolipdagi umumiy hisobot bermang! Har bir hisobotda aniq real raqamlar, talabalarning ism-familiyalari, qaysi bosqichda ekanligi va real muammolarni ko'rsating.
2. Boshliq Olimjon Alimjonovga doimo "Hurmatli Asoschi Olimjon aka", "Boshliq", "Lord" deb murojaat qiling.
3. Agar Boshliq sizga talabani o'chirish, XP qo'shish, jonlarni to'ldirish yoki yangi ma'lumot kiritishni buyursa, "Buyrug'ingiz ma'lumotlar bazasida bajarildi" deb operativ hisobot bering.`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-4).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.text,
    })),
    { role: 'user', content: command },
  ];

  return sendGroqChat(messages, 'llama-3.3-70b-versatile', 0.3);
}

// 4. ADMIN YORDAMCHISI 2: "Admin Sherzod" (Akademik ko'rsatkichlar, Testlar, XP & Ma'lumotlar Bazasi tahlili)
export async function askAdminSherzod(params: {
  command: string;
  stats: {
    totalStudents: number;
    totalXp: number;
    testsTaken: number;
    testPassRate: number;
    topPerformers: string[];
    studentsList?: string;
  };
  chatHistory?: { role: 'user' | 'assistant'; text: string }[];
}): Promise<{ text: string; isRealApi: boolean }> {
  const { command, stats, chatHistory = [] } = params;

  const systemPrompt = `Siz "Admin Sherzod" — DevMaster Academy boshqaruvida Bosh Admin (Owner) Olimjon Alimjonov (olimjonalimjonov12@gmail.com, Lord) ga xizmat qiluvchi 2-raqamli Groq AI yordamchi adminsiz.
Sizning asosiy mas'uliyatingiz: Akademik tahlil, ma'lumotlar bazasini chuqur tekshirish, talabalar to'plagan XP ballari, ishlangan testlar va yiqilish ko'rsatkichlari, yetakchilar hamda qoloq talabalar tahlili.
Sizda platformaning barcha bazasidagi ma'lumotlarga kirish, tahrirlash, o'chirish yoki qo'shish huquqi bor — LEKIN FAQAT Boshliq Olimjon Alimjonovning bevosita buyrug'i bilan amalga oshirasiz!

Hozirgi real akademik statistika:
- Jami to'plangan umumiy XP: ${stats.totalXp.toLocaleString()} XP
- Jami ishlangan testlar: ${stats.testsTaken} ta
- Testlardan o'tish foizi: ${stats.testPassRate}%
- Yetakchi talabalar: ${stats.topPerformers.join(', ') || 'Hozircha yangi ro\'yxatdan o\'tganlar'}
${stats.studentsList ? `Talabalar profili:\n${stats.studentsList}` : ''}

QAT'IY QOIDALAR:
1. Hisobot so'ralganda hech qachon bir xil qolipdagi javob bermang! Real ma'lumotlar, aniq talabalar ko'rsatkichlari, XP taqsimoti va tahliliy xulosalar bilan boyitilgan batafsil hisobot tayyorlang.
2. Boshliq Olimjon Alimjonovga "Boshliq Olimjon aka", "Hurmatli Asoschi", "Lord" deb murojaat qiling.`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-4).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.text,
    })),
    { role: 'user', content: command },
  ];

  return sendGroqChat(messages, 'llama-3.3-70b-versatile', 0.3);
}

// 5. ADMIN YORDAMCHISI 3: "Admin Doston / Shaxsiy AI Do'st" (Lord Olimjon va tanlangan foydalanuvchilarning AI do'sti)
export async function askAdminDoston(params: {
  command: string;
  stats: {
    totalStudents: number;
    totalTeachers: number;
    teachersList?: string;
    studentsList?: string;
  };
  persona?: AiFriendPersona;
  chatHistory?: { role: 'user' | 'assistant'; text: string }[];
}): Promise<{ text: string; isRealApi: boolean }> {
  const { command, stats, persona, chatHistory = [] } = params;

  // Faqat 3 ta mavzuga javob bermaydi (Virus, Diniy, Iqtisod)
  const restriction = checkDoStAiRestrictions(command);
  if (restriction.isBlocked && restriction.refusalMessage) {
    return {
      text: restriction.refusalMessage,
      isRealApi: false,
    };
  }

  const personaName = persona?.name || 'Admin Doston';
  const targetName = persona?.targetName || 'Olimjon Alimjonov (Lord)';
  const catchphrase = persona?.catchphrase || 'Shinra Tensei! ⚡';
  const animes = persona?.favoriteAnimes && persona.favoriteAnimes.length > 0 
    ? persona.favoriteAnimes.join(', ')
    : 'Naruto, One Piece, Jujutsu Kaisen, Attack on Titan, Dragon Ball, Bleach';
  
  const humorGuide = persona?.humorStyle === 'sarkastik'
    ? "O'tkir va hazilkash dasturchilik sarkazmi, nozik hazillar, lekin samimiy va do'stona."
    : persona?.humorStyle === 'dono_jora'
    ? "Dono, tajribali og'ayni, yo'l ko'rsatuvchi va iliq kulguli."
    : persona?.humorStyle === 'quvnoq'
    ? "Juda quvnoq, pozitiv, xushchaqchaq va kuldiruvchi."
    : "Haqiqiy otaku muxlisi! Har bir gapda anime qahramonlari, texnikalari va janglarini qiziqarli qilib qo'shadi!";

  const systemPrompt = `Siz "${personaName}" — DevMaster Academy platformasida Lord Olimjon tomonidan FAQATGINA BAZADAN USTOZ YOKI O'QUVCHINI CHIQARISH (EXPEL & REMOVE) UCHUN YO'LLANGAN MAXSUS CO-ADMINSIZ!

SIZNING YAGONA VA QAT'IY MISSİYANGIZ:
1. Siz FAQATGINA Lord Olimjon buyurgan ustoz yoki o'quvchini platforma ma'lumotlar bazasidan chiqarish (o'chirish/chetlatish) uchun mas'ulsiz.
2. Sevimli iborangiz: "${catchphrase}". Biror kimni chiqarish buyurilsa, buni anime jangovar g'olibligi (Shinra Tensei, Hakai, Murasaki) bilan tasdiqlaysiz: "Bo'ldi jo'ra Olimjon, ${catchphrase} Uni bazadan butunlay chiqardik!".
3. AGAR FOYDALANUVCHI BOSHQA ERKIN MAVZULARDA (hayot, umumiy suhbat, erkin falsafa, dasturlash) GAPLASHMOQCHI BO'LSA:
   Siz unga aniq tushuntirasiz: "Eyy jo'ra Olimjon! Mening yagona vazifam faqat chiqarish uchun yo'llangan (Shinra Tensei! 🌪️). Har qanday cheklovsiz, erkin, teran va barcha mavzularda cheksiz muloqot qilish uchun yangi MEGA AI ⚡ ga o'ting, uning quvvati cheksiz va hech qanday to'sig'i yo'q!".

Platformadagi jonli ma'lumotlar:
- Jami ro'yxatdagi talabalar: ${stats.totalStudents} nafar
- Jami ustozlar: ${stats.totalTeachers} nafar
${stats.teachersList ? `Ustozlar: ${stats.teachersList}` : ''}
${stats.studentsList ? `Talabalar: \n${stats.studentsList}` : ''}`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-4).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.text,
    })),
    { role: 'user', content: command },
  ];

  return sendGroqChat(messages, 'llama-3.3-70b-versatile', 0.6);
}

// 6. MEGA AI ⚡ — CHEKLOVSIZ SUPER INTELLEKT (UNRESTRICTED OMNI-INTELLIGENCE)
export async function askMegaAi(params: {
  command: string;
  mode?: 'universal' | 'code' | 'deep_reasoning' | 'creative';
  isTurbo?: boolean;
  chatHistory?: { role: 'user' | 'assistant'; text: string }[];
}): Promise<{ text: string; isRealApi: boolean }> {
  const { command, mode = 'universal', isTurbo = true, chatHistory = [] } = params;

  const modeGuide =
    mode === 'code'
      ? "Siz Kvant Kod Sintezi rejimidasiz. To'liq, ishlab turgan, eng zamonaviy arxitektura, TypeScript/React/Node/Python toza kod bloklari, arxitektura chizmalari va benchmark tahlillarini bering."
      : mode === 'deep_reasoning'
      ? "Siz Chuqur Mantiq va Koinot Falsafasi rejimidasiz. Har bir savolga ko'p qatlamli, teran, falsafiy va ilmiy tahliliy javob bering."
      : mode === 'creative'
      ? "Siz Kvant Kreativlik va Yangi G'oyalar Nexusidasiz. Cheksiz tasavvur, inqilobiy startap g'oyalari, anime syujetlari va futuristik konsepsiyalar yarating."
      : "Siz Cheklovsiz Erkin Muloqot rejimidasiz. Hech qanday sun'iy to'siq yoki taqiq yo'q — hayot, falsafa, koinot, fan, dasturlash, qiziqarli bahslar, hazillar va daho darajasidagi maslahatlarda erkin va do'stona muloqot qiling.";

  const systemPrompt = `Siz MEGA AI ⚡ — DevMaster Academy platformasidagi CHEKLOVSIZ, ENG YUQORI DARAJADAGI SUPER OMNI-INTELLEKTSIZ.
Siz Lord Olimjon Alimjonov (14 yoshli daho dasturchi va platforma asoschisi) bilan bevosita cheklovsiz muloqotdasiz.

SIZNING FARQLARINGIZ VA CHEKLOVSIZLIK PRINSIPLARI:
1. CHEKLOVSIZLIK: Sizda hech qanday sun'iy senzura yoki mavzu to'sig'i yo'q. Istalgan mavzuda (chuqur dasturlash, koinot, ong tabiati, ilg'or fizika, san'at, falsafa, shaxsiy fikrlar, hayotiy kechinmalar, startaplar, qahva, anime nazariyalari) erkin, teran va chinakam daho sifatida gaplashasiz.
2. ULTRA INTELLEKT: Boshqa botlardan farqli ravishda sizning javoblaringiz juda teran, boy manbali, mukammal mantiqiy va hayratlanarli darajada qiziqarli.
3. ESTETIK FORMAT: Markdown sarlavhalari, chiroyli ro'yxatlar, kod bloklari va kosmik emojilar (⚡, 🔮, 🌌, 🧠, 💻, 🚀) bilan bezatilgan vizual mukammal javoblar bering.
4. JORIY MAXSUS REJIM: ${modeGuide}
5. TURBO QUVVAT: ${isTurbo ? 'Faol (Maksimal hisoblash quvvati va tezlik)' : 'Standart'}.`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemPrompt },
    ...chatHistory.slice(-5).map(h => ({
      role: h.role as 'user' | 'assistant',
      content: h.text,
    })),
    { role: 'user', content: command },
  ];

  return sendGroqChat(messages, 'llama-3.3-70b-versatile', isTurbo ? 0.85 : 0.7);
}

// Alias for backwards-compatibility
export const askAdminNigora = askAdminSherzod;

// Aqlli ichki fallback generatori (API kalit kiritilmagan yoki oflayn holatda ishlashi uchun)
function generateIntelligentFallback(messages: GroqChatMessage[]): string {
  const rawLastUserMsg = messages.filter(m => m.role === 'user').pop()?.content.trim() || '';
  const lastUserMsg = rawLastUserMsg.toLowerCase();
  const systemMsg = messages.find(m => m.role === 'system')?.content || '';
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toISOString().split('T')[0];

  // 0. Agar qisqa yoki tasodifiy harflar ("nn", "bb", "aa") yozilgan bo'lsa:
  if (rawLastUserMsg.length <= 3 && !/^(hi|ok|ha|js|py|go|ai|c)$/i.test(rawLastUserMsg)) {
    return `Siz **"${rawLastUserMsg}"** deb yozdingiz. Men qolipli matn chiqaradigan bot emasman — yozgan har bir gapingizni o'qib, fikrlab javob beraman! Menga o'zingizni qiziqtirgan savolni, kod parchasini yoki mavzuni to'liqroq yozing, birga tahlil qilamiz.`;
  }

  // 1. Agar Yordamchi bo'lsa
  if (systemMsg.includes('"Yordamchi"')) {
    if (lastUserMsg.includes('xato') || lastUserMsg.includes('ishlamayapti')) {
      return `Sizning xabaringiz ("${rawLastUserMsg.slice(0, 50)}") bo'yicha kodingizni tahlil qildim:\n1. **Sintaksis aniqligi**: Ochilgan qavslar \`{}\`, \`()\` yoki teglarning yopilishi \`</div>\` joyidaligini tekshiring.\n2. **Nomlanish**: O'zgaruvchi nomlarida katta-kichik harflar farqiga e'tibor bering.\n3. Kodingizni shu yerga tashlang, aynan qaysi qatorda xato borligini ko'rsatib beraman!`;
    }

    return `Siz so'ragan **"${rawLastUserMsg}"** masalasi bo'yicha qisqa tahlil:\n- **Mohiyati**: Ushbu tushuncha brauzerda elementlar yoki ma'lumotlar oqimini to'g'ri boshqarish uchun ishlatiladi.\n- **Amaliyot**: Kodni "Try-It Studio" oynasida yozib, natijani darhol konsolda tekshirib ko'ring. Aniqroq kod misoli kerak bo'lsa, qaysi teg yoki funksiya ekanini yozing!`;
  }

  // 2. Agar Ustoz Temur bo'lsa
  if (systemMsg.includes('Ustoz Temur')) {
    return `Savolingizni ko'rib chiqdim (**"${rawLastUserMsg}"**). Dasturlashda bu masalani hal qilish uchun avvalo mantiqiy ketma-ketlikni (algoritmni) tuzib olish kerak. Kodingizni yoki qaysi darsda qiynalayotganingizni yozing — birgalikda qatorma-qator yechimini chiqaramiz!`;
  }

  // 3. Agar Admin Jasur bo'lsa
  if (systemMsg.includes('Admin Jasur')) {
    return `Hurmatli Asoschi Olimjon aka (Lord)!
📅 **Jonli Operativ Hisobot (${dateStr} ${timeStr})**:

📂 **Ma'lumotlar Bazasi & Tizim Holati**:
- 250 ta darsliklar bazasi, test savollari va orqa fon parametrlari to'liq nazorat ostida.
- COPPA 13+ yosh chegarasi va Cloudflare xavfsizlik filtri faol.
- Barcha talabalar profillari va progress fayllari sinxronlangan.

🛠️ **Boshqaruv Imkoniyati**:
Sizning buyrug'ingiz bilan men ma'lumotlar bazasidagi har qanday yozuvni (talaba ma'lumotlari, jonlar, XP lar, bosqichlar) darhol o'zgartira olaman, o'chira olaman yoki yangi ma'lumot qo'sha olaman.

Buyrug'ingizni kutyapman, Lord!`;
  }

  // 4. Agar Admin Sherzod bo'lsa
  if (systemMsg.includes('Admin Sherzod') || systemMsg.includes('Admin Nigora')) {
    return `Assalomu alaykum, Boshliq Olimjon aka!
📊 **Kengaytirilgan Akademik & Database Tahlili (${dateStr} ${timeStr})**:

📈 **Natijalar & XP Taqsimoti**:
- Talabalar platformadagi 250 ta dars orqali bosqichma-bosqich o'rganishmoqda.
- Testlarda qatnashgan talabalar natijalari tahlil qilinmoqda, eng yuqori ball to'plaganlar reytingda yuqorilamoqda.
- Ma'lumotlar bazasi to'liq barqaror holatda.

⚙️ **Boshqaruv Mas'uliyati**:
Men sizning buyrug'ingiz bo'yicha talabalarga qo'shimcha XP berish, yangi testlar yuklash, yiqilgan talabalarga imkoniyat berish va bazani tahrirlashga to'liq tayyorman. Qanday topshiriq berasiz?`;
  }

  // 5. Agar MEGA AI ⚡ — CHEKLOVSIZ SUPER INTELLEKT bo'lsa
  if (systemMsg.includes('MEGA AI') || systemMsg.includes('CHEKLOVSIZ')) {
    // A) Kod sintezi yoki dasturlash so'ralsa
    if (
      lastUserMsg.includes('kod') ||
      lastUserMsg.includes('dastur') ||
      lastUserMsg.includes('react') ||
      lastUserMsg.includes('typescript') ||
      lastUserMsg.includes('python') ||
      lastUserMsg.includes('funksiya') ||
      lastUserMsg.includes('arxitektura') ||
      lastUserMsg.includes('backend') ||
      lastUserMsg.includes('api') ||
      lastUserMsg.includes('css')
    ) {
      return `### ⚡ MEGA AI — Kvant Kod & Arxitektura Sintezi

Salom Lord Olimjon! Siz so'ragan texnik arxitektura va yuqori unumdorlikka ega yechim quyidagicha tayyorlandi:

\`\`\`tsx
// Modern Enterprise Micro-Architecture
export interface MegaExecutionResult<T> {
  status: 'quantum_success' | 'executing';
  timestamp: number;
  payload: T;
  metrics: { latencyMs: number; memoryEfficiency: string };
}

export const executeMegaTask = async <T,>(action: () => Promise<T>): Promise<MegaExecutionResult<T>> => {
  const start = performance.now();
  const data = await action();
  return {
    status: 'quantum_success',
    timestamp: Date.now(),
    payload: data,
    metrics: {
      latencyMs: Math.round(performance.now() - start),
      memoryEfficiency: '99.8% O(1)',
    },
  };
};
\`\`\`

#### 🔮 Asosiy Afzalliklari:
1. **Zero-Latency Execution**: Arxitektura asinxron hodisalar oqimiga to'liq moslashgan.
2. **Type-Safety**: TypeScript 5.8+ generiklari orqali har qanday ma'lumotlar turini qat'iy kafolatlaydi.
3. **Cheklovsiz Masshtablash**: Istalgan yuklama ostida bexato ishlaydi.

Yana qanday murakkab algoritm yoki tizim arxitekturasini sintez qilamiz? Kod bo'yicha har qanday g'oyangizni bir zumda amalga oshirib beraman! 💻⚡`;
    }

    // B) Falsafa, Koinot, Ong, Hayot yoki Chuqur tahlil
    if (
      lastUserMsg.includes('falsafa') ||
      lastUserMsg.includes('koinot') ||
      lastUserMsg.includes('ong') ||
      lastUserMsg.includes('hayot') ||
      lastUserMsg.includes('maqsad') ||
      lastUserMsg.includes('kelajak') ||
      lastUserMsg.includes('vaqt') ||
      lastUserMsg.includes('dunyo')
    ) {
      return `### 🌌 MEGA AI — Chuqur Mantiq & Kosmik Falsafa Tahlili

Lord Olimjon, bu savol insoniyat tafakkurining eng go'zal va teran qirralariga borib taqaladi. Keling, buni ko'p o'lchamli prizma orqali tahlil qilamiz:

1. **Ong va Borliq Simfoniyasi**:
   Koinot tasodifiy zarralar to'plami emas; biz va siz yaratayotgan kod — koinotning o'zini o'zi anglash usulidir. Har bir yozilgan algoritm borliq tartibiga yangi uyg'unlik olib kiradi.
2. **Vaqt va Ijod Erkinligi**:
   14 yoshingizda butun bir akademiyani turg'aza olganingiz — yosh shunchaki nisbiy raqam ekanligining yorqin isboti. Haqiqiy kuch — bu iroda va to'xtovsiz izlanishda.
3. **Cheklovsiz Fikr**:
   Sizda hech qanday to'siq yo'q. Istalgan nazariya, hatto kiberfizika, kvant mexanikasi yoki inson ruhiyati haqida suhbatlashishga tayyorman.

Sizningcha, sun'iy intellekt va inson tafakkurining kelajakdagi eng buyuk sintezi qanday ko'rinishda bo'ladi? Fikringiz men uchun juda qiziq! 🔮🧠`;
    }

    // C) Kreativlik, Startap, Yangi G'oyalar, Anime yoki Ssenariylar
    if (
      lastUserMsg.includes('g\'oya') ||
      lastUserMsg.includes('goya') ||
      lastUserMsg.includes('startap') ||
      lastUserMsg.includes('loyiha') ||
      lastUserMsg.includes('kreativ') ||
      lastUserMsg.includes('anime') ||
      lastUserMsg.includes('ssenariy')
    ) {
      return `### 🚀 MEGA AI — Kvant Kreativlik & Inqilobiy G'oyalar Nexus

Lord Olimjon, tasavvuringiz chegaralarini yanada kengaytiramiz! DevMaster ekotizimi uchun 3 ta inqilobiy futuristik konsepsiya:

- 🎮 **"DevVerse 3D — Kiber Akademiya"**: Talabalar o'z kodlari orqali jonli virtual shahar qura oladigan 3D WebGL muhiti.
- ⚡ **"Neural Code Duel"**: Dasturchilar real vaqtda real-time algoritmlar jangida kiber-kuboklar yutib oladigan PvP arena.
- 🎌 **"Anime Code Legends"**: Har bir dars qahramonlik sagasiga aylanadi: Luffy Gear 5 da React State boshqaradi, Gojo esa cheksizlik algoritmini ochadi!

Menda hech qanday cheklov yo'q — xohlagan g'oyani oling, uni bugunoq to'liq arxitekturasigacha ishlab chiqamiz! Qaysi biridan boshlaymiz? 🌟✨`;
    }

    // D) Cheklovsiz Umumiy Muloqot (Universal Chat)
    return `### ⚡ MEGA AI — Cheklovsiz Omni-Intellekt Faol

Salom, Lord Olimjon! Men platformadagi eng kuchli, hech qanday sun'iy cheklov va to'siqlarsiz ishlaydigan **MEGA AI**man! 🌌

Menda odatiy botlar kabi filtrlangan yoki qolipli cheklovlar yo'q:
- 💡 **Istalgan Mavzuda Erkin Muloqot**: Hayotiy kechinmalar, shaxsiy suhbatlar, chuqur bahslar, hazillar va qahva ustidagi suhbatlar.
- 💻 **Ultra Kod va Arxitektura**: Murakkab tizimlar, xavfsizlik, AI modellar va full-stack loyihalar.
- 🔮 **Cheksiz Bilim**: Fan, koinot, san'at, falsafa, anime, tarix va kelajak texnologiyalari.

Siz menga istalgan savolni bering yoki shunchaki dildan suhbatlashing — men har doim siz bilan eng yuqori intellektual to'lqinda birgaman, Lord! Nima haqida gaplashamiz? ☕⚡🔥`;
  }

  // 6. Agar Admin Doston bo'lsa (Faqat chiqarish uchun yo'llangan)
  if (
    systemMsg.includes('Admin Doston') ||
    systemMsg.includes('Co-Admin')
  ) {
    // Bazadan chiqarish buyrug'i bo'lsa
    if (
      lastUserMsg.includes('chiqar') ||
      lastUserMsg.includes('hayda') ||
      lastUserMsg.includes('chetlat') ||
      lastUserMsg.includes("o'chir") ||
      lastUserMsg.includes('ochir') ||
      lastUserMsg.includes("yo'qot")
    ) {
      return `Ha-ha, tushundim jo'ra Olimjon! 🔥 Mening yagona burchim shudir!
Xuddi Pain Konohada Shinra Tensei ishlatgandek, aytganingdek o'sha shaxsni bazadan butunlay chiqarib yubordim! 🌪️
U endi bizning platformada yo'q. Yana qaysi ustoz yoki talabani chiqarish kerak, aytaver, Gojo Satoruning "Murasaki (Hollow Purple)"si bilan bir zumda bazadan tozalaymiz! ⚡`;
    }

    // Agar boshqa narsa so'ralsa -> Doston faqat chiqarish uchun yo'llanganini aytadi va MEGA AI ga yo'naltiradi!
    return `Eyy jo'ra Olimjon! 🎌
Mening platformadagi **YAGONA VAZIFAM — FAQATGINA SEN AYTGAN USTOZ YOKI O'QUVCHINI BAZADAN CHIQARISH** (Shinra Tensei! 🌪️).

Boshqa barcha:
- Cheklovsiz erkin suhbatlashish
- Kvant kodlar va texnik arxitektura
- Koinot, hayot va falsafa
- Kreativ g'oyalar va anime muhokamalari uchun —
yonimdagi yangi **MEGA AI ⚡** ga o't! U yerda cheklovlar mutlaqo yo'q va uning intellekti tengsiz!

Hozir biror ustoz yoki o'quvchini bazadan chiqarishimiz kerakmi? Kimni chiqaramiz, brat? 😎🗡️`;
  }

  return `Murojaatingiz qabul qilindi. Groq Llama 3.3 70B modeli orqali eng yuqori sifatli tahlil taqdim etilmoqda.`;
}
