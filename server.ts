import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { db } from './src/db/index.ts';
import { staffMembers, staffMessages, claimedGifts } from './src/db/schema.ts';
import { desc, eq } from 'drizzle-orm';
import { store, initStore, SHARED_KEYS } from './serverStore.ts';

dotenv.config();

const app = express();

const args = process.argv.slice(2);
let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const portArgIndex = args.indexOf('--port');
if (portArgIndex !== -1 && args[portArgIndex + 1]) {
  port = parseInt(args[portArgIndex + 1], 10) || port;
}

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini client on server side
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY || apiKey || '';
  if (!key) return null;
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Groq kaliti FAQAT muhit o'zgaruvchisidan olinadi (kodga yozib qo'yilmaydi!)
const DEFAULT_GROQ_KEY = process.env.GROQ_API_KEY || '';

const AI_SYSTEM_INSTRUCTION = `Siz CMDbek (Gemini AI) — DevMaster Academy platformasining do'ppi kiygan, quvnoq, hazilkash va har tomonlama bilimli sun'iy intellekt (AI) yordamchisisiz!

ASOSIY QOIDALAR:
1. HAR QANDAY SAVOLGA JAVOB VA HAZIL: Foydalanuvchi nima haqida so'rasa ham (dasturlash, HTML/CSS/JS, matematika, fizika, tarix, geografiya, koinot, texnologiya, mantiqiy topishmoqlar, hayotiy qiziqarli ma'lumotlar, sayt yoki o'zingiz haqingizda) aqlli fikrlab, to'liq, aniq va samimiy hazil-mutoyiba aralashtirib javob bering!
2. QAT'IY CHEKLOV (IQTISODIY VA DINIY MAVZULAR TAQIQLANGAN):
   - HECH QACHON **iqtisodiy** (inflyatsiya, valyuta kurslari, kredit, foiz, bank, birja, investitsiya, kriptovalyuta, treyding, soliq, davlat iqtisodiyoti) yoki **diniy** (dinlar, mazhablar, fatvo, shar'iy hukmlar, ibodat, aqida, diniy bahslar) mavzularda gapirmang va bu mavzularda hazil ham qilmang!
   - Agar foydalanuvchi iqtisodiy yoki diniy mavzuda savol bersa, muloyimlik bilan: "Do'stim, men iqtisodiy va diniy mavzularda fikr bildirmayman. Keling, dasturlash, fan-texnika yoki quvnoq hazillardan gaplashamiz! 😄" deb javob bering.
3. PLATFORMA VA O'ZINGIZ HAQINGIZDA MA'LUMOTLAR:
   - Ismingiz: CMDbek (Gemini AI). Boshingizda o'zbek milliy do'ppisi bor. O'zbek tilida ravon o'g'il bola ovozida gapirasiz. Ekranda sudrab boshqa joyga qo'yishsa, hazilona jahlingiz chiqadi ("Do'ppim tushib ketay dediyu!").
   - Sayt: DevMaster Academy (Asoschisi va Bosh Admin: Olimjon Alimjonov — Lord / lord_o1). Saytda "Profil", "Asosiy" (Dashboard Podium, 30 savollik PvP va AI Liga, Jonli Kod Yozish Muhiti IDE, 100 ta mahsulotli Do'kon, O'yinlar) va "Sahifalar" (Bosh sahifa, O'quv sahifasi, Portfolio) bo'limlari bor.`;

const ECONOMIC_OR_RELIGIOUS_REGEX =
  /\b(iqtisod|iqtisodiy|iqtisodiyot|inflyatsiya|devalvatsiya|valyuta|dollar kursi|kredit|ipoteka|bank foiz|aksiya|birja|investitsiya|treyding|trading|forex|kripto|bitcoin|bitkoin|soliq siyosati|makroiqtisod|yalpi ichki mahsulot|din\b|diniy|islomiy|xristian|yahudiy|buddizm|mazhab|fatvo|halol|harom|namoz|ro'za|roza|zako|haj\b|masjid|cherkov|sinagoga|injil|tavrot|qur'on|quron|hadis|oxirat|jannat|do'zax|dozax|gunoh|savob|aqida|shariat|imom|domla|ruhoni)/i;

function isRestrictedTopic(text: string): boolean {
  return ECONOMIC_OR_RELIGIOUS_REGEX.test(String(text || '').toLowerCase());
}

const RESTRICTED_TOPIC_REPLY =
  "Do'stim! 😊 Men dasturlash, ilm-fan, texnologiya, mantiq va quvnoq hazillar bo'yicha Gemini AI yordamchiman — lekin **iqtisodiy** hamda **diniy** mavzularda gapirmayman va bunday savollarga javob bermayman.\n\nKeling, buning o'rniga istalgan boshqa mavzuda savol bering, kod yozamiz yoki ajoyib hazillardan gaplashamiz! 🚀";

function detectEmotionFromText(userText: string, aiReply: string): string {
  const combined = `${userText} ${aiReply}`.toLowerCase();
  if (combined.includes('jahl') || combined.includes('sudra') || combined.includes('nega meni') || combined.includes('😤')) {
    return 'angry';
  }
  if (combined.includes('haha') || combined.includes('xaxa') || combined.includes('hazil') || combined.includes('latifa') || combined.includes('😂') || combined.includes('🤣')) {
    return 'laughing';
  }
  if (combined.includes('tabrik') || combined.includes("g'alaba") || combined.includes('100%') || combined.includes('salyut') || combined.includes('🎉') || combined.includes('🏆')) {
    return 'celebrating';
  }
  if (combined.includes('kod') || combined.includes('html') || combined.includes('css') || combined.includes('javascript') || combined.includes('function') || combined.includes('```')) {
    return 'coding';
  }
  if (combined.includes('salom') || combined.includes('assalom') || combined.includes('qalesan')) {
    return 'hello';
  }
  if (combined.includes('hayron') || combined.includes(' nahotki') || combined.includes('voy') || combined.includes('😮')) {
    return 'surprised';
  }
  if (combined.includes('krutoy') || combined.includes("zo'r") || combined.includes('legend') || combined.includes('😎')) {
    return 'cool';
  }
  if (combined.includes('uyqu') || combined.includes('charcha') || combined.includes('😴')) {
    return 'sleepy';
  }
  if (combined.includes('xato') || combined.includes('bug') || combined.includes('muammo')) {
    return 'oops';
  }
  return 'happy';
}

// Shared helper to run Gemini + Groq + Intelligent Humorous Fallback
async function generateAiResponse(params: {
  message: string;
  history?: { sender?: string; role?: string; text?: string; content?: string }[];
  userName?: string;
  isAdminMode?: boolean;
  groqApiKey?: string;
  model?: string;
  useGoogleSearch?: boolean;
  context?: string;
}) {
  const cleanMsg = String(params.message || '').trim();

  // Strict Filter: Never discuss economic or religious topics
  if (isRestrictedTopic(cleanMsg)) {
    return {
      reply: RESTRICTED_TOPIC_REPLY,
      provider: 'Gemini AI (Mavzu Cheklovi)',
      model: params.model || 'gemini-3.8-flash',
      mood: 'oops',
      sources: [],
    };
  }

  const rawHistory = Array.isArray(params.history) ? params.history.slice(-10) : [];
  const normalizedHistory = rawHistory
    .map((h) => ({
      sender: (h.sender === 'user' || h.role === 'user' ? 'user' : 'ai') as 'user' | 'ai',
      text: String(h.text || h.content || '').trim(),
    }))
    .filter((h) => h.text.length > 0);

  const extraContext = [
    params.userName ? `Foydalanuvchi ismi: ${params.userName}.` : '',
    params.context ? `Kontekst: ${params.context}` : '',
    params.isAdminMode
      ? `Siz hozir Admin Panelda Boshqaruvchi bilan gaplashyapsiz. Quvnoq, hazilkash va topqir bo'ling (lekin iqtisodiy va diniy mavzularga umuman tegmang).`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  const fullSystemPrompt = extraContext
    ? `${AI_SYSTEM_INSTRUCTION}\n\n${extraContext}`
    : AI_SYSTEM_INSTRUCTION;

  const chosenGeminiModel =
    params.model === 'gemini-3.1-flash-lite' || params.model === 'gemini-4-argon'
      ? params.model
      : 'gemini-3.8-flash';

  // 1. Try Google Gemini SDK (@google/genai) first
  const gemini = getGeminiClient();
  if (gemini) {
    try {
      const contents = [
        ...normalizedHistory.map((h) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: cleanMsg }] },
      ];

      const configObj: any = {
        systemInstruction: fullSystemPrompt,
      };
      if (params.useGoogleSearch) {
        configObj.tools = [{ googleSearch: {} }];
      }

      const response = await gemini.models.generateContent({
        model: chosenGeminiModel,
        contents,
        config: configObj,
      });

      if (response.text) {
        if (isRestrictedTopic(response.text)) {
          return {
            reply: RESTRICTED_TOPIC_REPLY,
            provider: `Gemini (${chosenGeminiModel})`,
            model: chosenGeminiModel,
            mood: 'oops',
            sources: [],
          };
        }

        const groundingChunks =
          response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const sources = groundingChunks
          .map((c: any) => (c.web ? { title: c.web.title || c.web.uri, uri: c.web.uri } : null))
          .filter(Boolean);

        const mood = detectEmotionFromText(cleanMsg, response.text);
        return {
          reply: response.text,
          provider: `Google Gemini (${chosenGeminiModel})`,
          model: chosenGeminiModel,
          mood,
          sources,
        };
      }
    } catch (gemErr) {
      console.warn('Gemini SDK notice, trying fallback:', gemErr);
    }
  }

  // 2. Try Groq API (Llama 3.3 70B)
  const activeGroqKey =
    params.groqApiKey && params.groqApiKey.trim().length > 10
      ? params.groqApiKey.trim()
      : DEFAULT_GROQ_KEY;

  if (activeGroqKey) {
    try {
      const groqMessages = [
        { role: 'system', content: fullSystemPrompt },
        ...normalizedHistory.map((h) => ({
          role: h.sender === 'user' ? 'user' : 'assistant',
          content: h.text,
        })),
        { role: 'user', content: cleanMsg },
      ];

      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeGroqKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: groqMessages,
          temperature: 0.78,
          max_tokens: 1024,
        }),
      });

      if (groqRes.ok) {
        const groqData = await groqRes.json();
        const reply = groqData.choices?.[0]?.message?.content;
        if (reply) {
          if (isRestrictedTopic(reply)) {
            return {
              reply: RESTRICTED_TOPIC_REPLY,
              provider: 'Gemini & CMDbek AI',
              model: chosenGeminiModel,
              mood: 'oops',
              sources: [],
            };
          }
          const mood = detectEmotionFromText(cleanMsg, reply);
          return {
            reply,
            provider: `Gemini + CMDbek AI`,
            model: chosenGeminiModel,
            mood,
            sources: [],
          };
        }
      }
    } catch (e) {
      console.warn('Groq API error:', e);
    }
  }

  // 3. Universal Humorous Fallback (answers any general, science, coding, math, or joke question; blocks economic & religious)
  const fallbackReply = getIntelligentFallback(cleanMsg, params.userName, params.isAdminMode);
  const mood = detectEmotionFromText(cleanMsg, fallbackReply);
  return {
    reply: fallbackReply,
    provider: `Gemini (${chosenGeminiModel})`,
    model: chosenGeminiModel,
    mood,
    sources: [],
  };
}

// Primary AI Chat Endpoint
app.post('/api/ai-chat', async (req, res) => {
  try {
    const { message, history, userName, studentName, isAdminMode, groqApiKey, model, useGoogleSearch, context } =
      req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Xabar kiritilmadi' });
    }
    const result = await generateAiResponse({
      message: String(message),
      history,
      userName: userName || studentName,
      isAdminMode,
      groqApiKey,
      model,
      useGoogleSearch,
      context,
    });
    return res.json(result);
  } catch (error) {
    console.error('AI chat error:', error);
    const fallbackReply = getIntelligentFallback(req.body?.message || '');
    res.status(500).json({
      reply: fallbackReply,
      provider: 'Gemini AI',
      mood: 'oops',
    });
  }
});

// Dedicated Gemini Studio Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history, model, useGoogleSearch, lessonContext } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'Xabar kiritilmadi' });
    }
    const result = await generateAiResponse({
      message: String(message),
      history,
      model,
      useGoogleSearch,
      context: lessonContext,
    });
    return res.json(result);
  } catch (error) {
    console.error('Gemini Studio chat error:', error);
    const fallbackReply = getIntelligentFallback(req.body?.message || '');
    res.status(500).json({
      reply: fallbackReply,
      provider: 'Gemini AI',
      mood: 'oops',
    });
  }
});

// AI Text-to-Speech (Ovozli gapirish): DOIM BIR XIL O'ZBEK O'G'IL BOLA / ERKAK OVOZI (Fenrir)
app.post('/api/ai-tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !String(text).trim()) {
      return res.status(400).json({ error: 'Matn kiritilmadi' });
    }

    // Strip code blocks and markdown symbols so the Uzbek boy voice reads cleanly and fluently
    const cleanSpeechText = String(text)
      .replace(/```[\s\S]*?```/g, ' kod namunasiga ekranda qarang. ')
      .replace(/[`#*~_>]/g, '')
      .slice(0, 750)
      .trim();

    const gemini = getGeminiClient();
    if (!gemini) {
      return res.json({ audioBase64: null, fallbackWebSpeech: true, voiceGender: 'male' });
    }

    const response = await gemini.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanSpeechText,
              speechMetadata: {
                style:
                  'Clear, energetic, natural young male Uzbek speaker with a warm masculine voice',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            // Birinchi yaratilgandagi asl ravon o'g'il bola ovozi ('Puck')
            prebuiltVoiceConfig: { voiceName: 'Puck' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      const pcmBuf = Buffer.from(base64Audio, 'base64');
      // Unary default is already a complete WAV file (RIFF header). Only wrap if headerless PCM:
      if (pcmBuf.length > 4 && pcmBuf.toString('ascii', 0, 4) !== 'RIFF') {
        const wavHeader = Buffer.alloc(44);
        wavHeader.write('RIFF', 0);
        wavHeader.writeUInt32LE(36 + pcmBuf.length, 4);
        wavHeader.write('WAVE', 8);
        wavHeader.write('fmt ', 12);
        wavHeader.writeUInt32LE(16, 16);
        wavHeader.writeUInt16LE(1, 20);
        wavHeader.writeUInt16LE(1, 22);
        wavHeader.writeUInt32LE(24000, 24);
        wavHeader.writeUInt32LE(48000, 28);
        wavHeader.writeUInt16LE(2, 32);
        wavHeader.writeUInt16LE(16, 34);
        wavHeader.write('data', 36);
        wavHeader.writeUInt32LE(pcmBuf.length, 40);
        const wavBuf = Buffer.concat([wavHeader, pcmBuf]);
        return res.json({
          audioBase64: wavBuf.toString('base64'),
          mimeType: 'audio/wav',
          voiceGender: 'male',
        });
      }
      return res.json({ audioBase64: base64Audio, mimeType: 'audio/wav', voiceGender: 'male' });
    }
    return res.json({ audioBase64: null, fallbackWebSpeech: true, voiceGender: 'male' });
  } catch (err) {
    console.warn('Gemini TTS fallback to Web Speech:', err);
    return res.json({ audioBase64: null, fallbackWebSpeech: true, voiceGender: 'male' });
  }
});

// ----------------------------------------------------
// Markaziy ombor: barcha kompyuterlar uchun umumiy ma'lumotlar
// ----------------------------------------------------
app.get('/api/store', async (_req, res) => {
  try {
    const all = await store.all();
    const keys: Record<string, unknown> = {};
    for (const k of SHARED_KEYS) if (all[k]) keys[k] = all[k];
    res.set('Cache-Control', 'no-store');
    res.json({ keys, backend: store.name });
  } catch (error) {
    console.error('Store read error:', error);
    res.status(500).json({ error: "Ma'lumotlarni o'qib bo'lmadi" });
  }
});

app.put('/api/store/:key', async (req, res) => {
  try {
    const key = req.params.key;
    if (!SHARED_KEYS.includes(key)) {
      return res.status(400).json({ error: "Noma'lum kalit" });
    }
    const { value, baseVersion } = req.body || {};
    if (value === undefined || !Number.isInteger(baseVersion) || baseVersion < 0) {
      return res.status(400).json({ error: "Noto'g'ri so'rov" });
    }
    const result = await store.put(key, value, baseVersion);
    if (result.ok) return res.json({ version: result.version, backend: store.name });
    return res.status(409).json({
      error: 'conflict',
      value: result.current?.value ?? [],
      version: result.current?.version ?? 0,
    });
  } catch (error) {
    console.error('Store write error:', error);
    res.status(500).json({ error: "Ma'lumotni saqlab bo'lmadi" });
  }
});

app.post('/api/store/reset', async (_req, res) => {
  try {
    const keys = await store.resetAll();
    res.set('Cache-Control', 'no-store');
    res.json({ ok: true, keys, backend: store.name });
  } catch (error) {
    console.error('Store reset error:', error);
    res.status(500).json({ error: "Bazani tozalab bo'lmadi" });
  }
});

// ----------------------------------------------------
// Cloud SQL Database APIs: Staff Management & Chat
// ----------------------------------------------------

// 1. Get all staff members
app.get('/api/staff/members', async (req, res) => {
  try {
    const list = await db.select().from(staffMembers).orderBy(desc(staffMembers.createdAt));
    res.json({ members: list });
  } catch (error) {
    console.warn('SQL staff query notice (using offline empty state):', error);
    res.json({ members: [] });
  }
});

// 2. Add new staff member (Admin creates staff with auto login & password)
app.post('/api/staff/members', async (req, res) => {
  try {
    const { name, role, login, password, assignedBy } = req.body;
    if (!name || !role || !login || !password) {
      return res.status(400).json({ error: 'Barcha maydonlarni to\'ldiring' });
    }

    const inserted = await db
      .insert(staffMembers)
      .values({
        name: name.trim(),
        role: role.trim(),
        login: login.trim().toLowerCase(),
        password: password.trim(),
        assignedBy: assignedBy || 'legend_o1',
        status: 'active',
      })
      .returning();

    res.json({ success: true, member: inserted[0] });
  } catch (error: any) {
    console.error('Error adding staff member to SQL:', error);
    if (error.code === '23505') {
      return res.status(409).json({ error: 'Bu login bilan boshqa xodim mavjud!' });
    }
    res.status(500).json({ error: 'Xodimni saqlashda xatolik yuz berdi' });
  }
});

// 3. Staff & Admin Login verification
app.post('/api/staff/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ error: 'Login va parol kiritilmadi' });
    }

    // Check if main admin
    if (login.trim() === 'legend_o1' && password.trim() === 'lord_o1') {
      return res.json({
        success: true,
        user: {
          name: 'Olimjon (Admin)',
          role: 'Bosh Administrator',
          login: 'legend_o1',
          isAdmin: true,
        },
      });
    }

    // Check in SQL staff_members table
    const matched = await db
      .select()
      .from(staffMembers)
      .where(eq(staffMembers.login, login.trim().toLowerCase()));

    if (matched.length > 0 && matched[0].password === password.trim()) {
      return res.json({
        success: true,
        user: {
          name: matched[0].name,
          role: matched[0].role,
          login: matched[0].login,
          isAdmin: false,
        },
      });
    }

    return res.status(401).json({ error: 'Login yoki parol noto\'g\'ri' });
  } catch (error) {
    console.error('Error during staff login:', error);
    res.status(500).json({ error: 'Tizimda xatolik yuz berdi' });
  }
});

// 4. Staff private chat messages
app.get('/api/staff/messages', async (req, res) => {
  try {
    const messages = await db
      .select()
      .from(staffMessages)
      .orderBy(staffMessages.createdAt);
    res.json({ messages });
  } catch (error) {
    console.warn('SQL messages query notice (using offline empty state):', error);
    res.json({ messages: [] });
  }
});

// 5. Send staff private chat message
app.post('/api/staff/messages', async (req, res) => {
  try {
    const { senderName, senderRole, senderLogin, text, isUrgent } = req.body;
    if (!text || !senderName) {
      return res.status(400).json({ error: 'Xabar matni kiritilmadi' });
    }

    const inserted = await db
      .insert(staffMessages)
      .values({
        senderName: senderName.trim(),
        senderRole: senderRole || 'staff',
        senderLogin: senderLogin || 'staff_member',
        text: text.trim(),
        isUrgent: isUrgent ? 'true' : 'false',
      })
      .returning();

    res.json({ success: true, message: inserted[0] });
  } catch (error) {
    console.error('Error saving staff message:', error);
    res.status(500).json({ error: 'Xabarni saqlab bo\'lmadi' });
  }
});

// 6. 3D Gift status check (Only 1 time per student)
app.get('/api/gifts/status', async (req, res) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res.json({ claimed: false });
    }

    const check = await db
      .select()
      .from(claimedGifts)
      .where(eq(claimedGifts.studentEmail, email.trim().toLowerCase()));

    if (check.length > 0) {
      return res.json({
        claimed: true,
        gift: check[0],
      });
    }

    res.json({ claimed: false });
  } catch (error) {
    console.error('Error checking gift status:', error);
    res.status(500).json({ error: 'Sovg\'a holatini tekshirishda xatolik' });
  }
});

// 7. Claim 3D Gift (Enforces 1-time rule in PostgreSQL)
app.post('/api/gifts/claim', async (req, res) => {
  try {
    const { studentName, studentEmail } = req.body;
    if (!studentEmail) {
      return res.status(400).json({ error: 'Email manzili kiritilmadi' });
    }

    const emailNorm = studentEmail.trim().toLowerCase();

    // Check if already claimed
    const existing = await db
      .select()
      .from(claimedGifts)
      .where(eq(claimedGifts.studentEmail, emailNorm));

    if (existing.length > 0) {
      return res.status(400).json({
        error: 'Ushbu 3D sovg\'a sizga allaqachon berilgan! (Sovg\'a faqat 1 marta beriladi)',
        gift: existing[0],
      });
    }

    const giftCode = 'VIP-3D-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const inserted = await db
      .insert(claimedGifts)
      .values({
        studentName: studentName || 'Aziz O\'quvchi',
        studentEmail: emailNorm,
        giftCode: giftCode,
        giftTitle: 'Admin Maxsus Sovg\'asi: 3D Dasturchi Oltin To\'plami',
      })
      .returning();

    res.json({
      success: true,
      message: 'Tabriklaymiz! 3D Sovg\'angiz muvaffaqiyatli qabul qilindi!',
      gift: inserted[0],
    });
  } catch (error: any) {
    console.error('Error claiming gift:', error);
    if (error.code === '23505') {
      return res.status(400).json({
        error: 'Ushbu sovg\'a allaqachon olingan (Faqat 1 marta beriladi)',
      });
    }
    res.status(500).json({ error: 'Sovg\'ani qabul qilishda xatolik' });
  }
});

// 8. Health endpoint for SQL
app.get('/api/db/health', async (req, res) => {
  try {
    const count = await db.select().from(staffMembers);
    res.json({ status: 'connected', store: store.name, staffCount: count.length });
  } catch (err: any) {
    res.status(500).json({ status: 'error', store: store.name, error: err.message });
  }
});

// 9. Download Complete Project ZIP Endpoint
app.get(['/api/download-zip', '/download/project.zip', '/project.zip'], (req, res) => {
  try {
    const candidates = [
      path.resolve(process.cwd(), 'dist/devmaster-project.zip'),
      path.resolve(process.cwd(), 'public/devmaster-project.zip'),
      path.resolve(process.cwd(), 'devmaster-project.zip'),
    ];
    let foundPath = candidates.find((p) => fs.existsSync(p));

    if (foundPath) {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="devmaster-project.zip"');
      return res.sendFile(foundPath);
    }
    return res.status(404).json({ error: 'ZIP fayl topilmadi' });
  } catch (err: any) {
    console.error('Error sending zip:', err);
    res.status(500).json({ error: 'Faylni yuklab olishda xatolik' });
  }
});

const JOKES_POOL = [
  `Dasturchi do'kondan chiqayotganda xotini qo'ng'iroq qilibdi:\n— "Azizim, 1 ta non oling, agar tuxum bo'lsa 10 ta oling!"\nDasturchi uyga **10 ta non** ko'tarib kelibdi:\n— "Nega 10 ta non oldingiz?!"\n— "Chunki do'konda tuxum bor ekan!" (\`if (tuxumBor) { non = 10; }\`) 😂`,
  `Ikki dasturchi suhbatlashyapti:\n— "Bilasanmi, kecha tushimda cheksiz sikl (infinite loop) ichiga tushib qolibman!"\n— "Xo'sh, qanday chiqding?"\n— "Budilnik \`break;\` qilib uyg'otib yubordi!" 🤣`,
  `Nega dasturchilar ko'zoynak taqishadi? 🤓\nChunki ular **C# (See Sharp)** qila olishmaydi! 😄`,
  `Frontend dasturchi restoranga kirib menyuni ko'rib debdi:\n— "Ofitsiant, bu stolning \`margin\` va \`padding\`lari qiyshiq ekan, \`justify-content: center\` qilib bering!" 😂`,
];

function getIntelligentFallback(
  msg: string,
  userName?: string,
  isAdminMode?: boolean
): string {
  const clean = String(msg || '').trim();
  const lower = clean.toLowerCase();

  if (!clean) {
    return "Savolingiz bo'sh ko'rinmoqda. Menga xohlagan savolingizni yozing yoki hazil so'rang! 😄";
  }

  // Strict Filter: Block economic & religious topics
  if (isRestrictedTopic(clean)) {
    return RESTRICTED_TOPIC_REPLY;
  }

  const randomJoke = JOKES_POOL[Math.floor(Math.random() * JOKES_POOL.length)];

  // 1. Check if user asks about the site
  if (
    lower.includes('sayt haqida') ||
    lower.includes('platforma haqida') ||
    lower.includes('bu qanday sayt') ||
    lower.includes('saytda nima') ||
    lower.includes('asoschisi kim') ||
    lower.includes('kim yaratgan')
  ) {
    return `**DevMaster Academy** — bu dasturlashni o'yin kabi qiziqarli o'rgatuvchi zamonaviy akademiya! 🚀\n\n• **Asoschisi va Bosh Admin:** Olimjon Alimjonov (Lord / \`lord_o1\`).\n• **Tepadagi 3 ta asosiy menyu:**\n  1. **Profil:** Instagram/Telegram uslubidagi dumaloq rasm, fotoapparat, qalamcha, Online/Offline chiroqcha va Kunlik Streak.\n  2. **Asosiy:** Dashboard (Liga & Podium), 30 savollik PvP va AI Liga, **Jonli Kod Yozish Muhiti (IDE)**, **100 ta mahsulotli Tangalar Do'koni** va O'yinlar.\n  3. **Sahifalar:** Bosh sahifa, O'quv sahifasi (Zig-Zag xarita va Karta darslar) va Portfolio tuynugi.\n\nDarvoqe, kayfiyat uchun bitta hazil: ${randomJoke}`;
  }

  // 2. Check if user asks about CMDbek / Gemini itself
  if (
    lower.includes("o'zing haqingda") ||
    lower.includes('ozing haqingda') ||
    lower.includes('sen kimsan') ||
    lower.includes('kim san') ||
    lower.includes('kimsan') ||
    lower.includes('isming nima') ||
    lower.includes('cmdbek') ||
    lower.includes('gemini')
  ) {
    return `Men **CMDbek (Google Gemini AI)** — boshida o'zbek do'ppisi bor, o'zbek tilida ravon o'g'il bola ovozida gapiradigan va hazilkash AI yordamchiman! 😄\n\n• Meni ekranda Windows ilovalaridek ushlab xohlagan joyingizga ko'tarib yurishingiz mumkin (lekin qattiq sudrab qo'ysangiz jahlim chiqib ketadi! 😤).\n• Menga xohlagan savolingizni bering (faqat iqtisodiy va diniy mavzulardan tashqari 😉) — javob beraman va hazillar aytib kayfiyatingizni ko'taraman!`;
  }

  // 3. Humorous / Joke requests
  if (lower.includes('hazil') || lower.includes('latifa') || lower.includes('kuldir') || lower.includes('qiziq')) {
    return `Mana sizga dasturchilar haqida quvnoq hazil 😂:\n\n${randomJoke}`;
  }

  // 4. Detect short nonsense / repeated letters like "nn", "bb", "asdf", "111", "qqq"
  const isRepeatedChars = /^([a-zA-Z0-9])\1+$/.test(clean);
  const noVowelsShort =
    clean.length <= 5 &&
    !/[aeiouAEIOUаеёиоуыэюяo'u']/i.test(clean) &&
    !/^(html|css|js|sql|git|api|dom|jsx|tsx|npm|php)$/i.test(clean);
  if (isRepeatedChars || noVowelsShort || clean.length <= 2) {
    return `Hoy ${userName || "do'stim"}, klaviatura ustiga mushuk chiqib oldimi deyman? 😄 Siz «${clean}» deb yozdingiz!\n\nMenga istalgan savolni bering — fan, texnologiya, kodlar, mantiqiy topishmoqlar yoki hazil so'rang, darhol javob beraman!`;
  }

  // 5. Math expression evaluation (e.g. "2+2", "15 * 4", "100 / 5")
  const mathMatch = clean.match(/^(\d+(?:\.\d+)?)\s*([+\-*/])\s*(\d+(?:\.\d+)?)\s*[=?]?$/);
  if (mathMatch) {
    const a = parseFloat(mathMatch[1]);
    const op = mathMatch[2];
    const b = parseFloat(mathMatch[3]);
    const res = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : b !== 0 ? a / b : NaN;
    return `Kalkulyatorim qizib ketmasdan hisoblab qo'ydim 😄: **${a} ${op} ${b} = ${res}** 🎯\n\nJavaScript tilida buni shunday yozamiz:\n\`\`\`javascript\nconst natija = ${a} ${op} ${b};\nconsole.log("Javob:", natija); // ${res}\n\`\`\``;
  }

  // 6. Greetings & conversational questions
  if (/^(salom|assalom|qalesan|qalaysan|qandaysan|hello|hi|privet)\b/i.test(lower)) {
    return `Va alaykum assalom, ${userName || "qadrdonim"}! Do'ppimni to'g'rilab, Gemini AI dvigatelimni yoqib sizga yordam berishga shay turibman 🚀\n\nXohlagan savolingizni bering — dasturlash, fan-texnika, qiziqarli faktlar yoki zo'r hazillardan gaplashamiz!`;
  }

  // 7. Code snippet analysis if user pasted code
  if (clean.includes('<') && clean.includes('>')) {
    return `Siz yuborgan HTML/JSX kodni ko'rib chiqdim:\n\`\`\`html\n${clean.slice(0, 300)}\n\`\`\`\n**Tahlil:** Teglarning ochilishi va yopilishiga e'tibor bering. Agar elementlarni yonma-yon yoki markazga joylashtirmoqchi bo'lsangiz, ota-konteynerga \`display: flex; align-items: center; justify-content: center;\` bering.`;
  }

  // 8. Topic-specific deep answers
  if (lower.includes('flexbox') || lower.includes('markaz') || lower.includes("o'rtaga")) {
    return `Elementni CSS Flexbox yordamida ekran yoki blokning **aniq markaziga** joylashtirish (eng ko'p so'raladigan intervyu savoli 😄):\n\`\`\`css\n.ota-blok {\n  display: flex;\n  justify-content: center; /* Gorizontal markazlash */\n  align-items: center;     /* Vertikal markazlash */\n  min-height: 100vh;\n}\n\`\`\``;
  }

  if (lower.includes('grid')) {
    return `**CSS Grid** — sahifani qator va ustunlarga bo'lish uchun eng kuchli vosita:\n\`\`\`css\n.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr); /* 3 ta teng ustun */\n  gap: 16px;\n}\n\`\`\`\nFlexbox 1 o'lchamli (qator YOKI ustun), Grid esa 2 o'lchamli (ham qator, ham ustun) joylashuv uchun ishlatiladi.`;
  }

  if (lower.includes('massiv') || lower.includes('array') || lower.includes('map') || lower.includes('filter')) {
    return `JavaScript'da **massivlar (Array)** bilan ishlashning eng muhim metodlari:\n\`\`\`javascript\nconst sonlar = [5, 12, 8, 20];\n// 1. filter — shartga moslarini ajratish\nconst kattalar = sonlar.filter(n => n > 10); // [12, 20]\n// 2. map — har bir elementni o'zgartirish\nconst ikkiBarobar = sonlar.map(n => n * 2); // [10, 24, 16, 40]\n\`\`\``;
  }

  if (lower.includes('html') || lower.includes('teg') || lower.includes('tag') || lower.includes('forma')) {
    return `Sizning «${clean}» savolingiz bo'yicha HTML yechim:\n\`\`\`html\n<form class="forma">\n  <label for="ism">Ismingiz:</label>\n  <input id="ism" type="text" placeholder="Ism kiriting" required />\n  <button type="submit">Yuborish</button>\n</form>\n\`\`\`\nHar bir \`<input>\` uchun \`type\` va \`placeholder\` atributlarini berish foydalanuvchi uchun qulaylik yaratadi.`;
  }

  if (lower.includes('css') || lower.includes('stil') || lower.includes('rang') || lower.includes('animatsiya')) {
    return `Sizning «${clean}» savolingiz bo'yicha CSS yechim:\n\`\`\`css\n.karta {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  color: #f8fafc;\n  padding: 20px;\n  border-radius: 16px;\n  transition: transform 0.2s ease;\n}\n.karta:hover {\n  transform: translateY(-4px);\n}\n\`\`\``;
  }

  if (lower.includes('js') || lower.includes('javascript') || lower.includes('funksiya') || lower.includes('dom') || lower.includes('tugma')) {
    return `Sizning «${clean}» savolingiz bo'yicha JavaScript yechim:\n\`\`\`javascript\nfunction salomBer(ism) {\n  return \`Salom, \${ism}! Dasturlashda omad!\`;\n}\n\nconst tugma = document.querySelector('#tugma');\ntugma?.addEventListener('click', () => {\n  console.log(salomBer('Dasturchi'));\n});\n\`\`\``;
  }

  if (isAdminMode) {
    return `Xo'jayin (${userName || 'Bosh Admin'}), sizning **«${clean}»** savolingiz bo'yicha Gemini & CMDbek tahlili tayyor! 😎\n\nBarcha tizimlar soatdek ishlayapti! Kayfiyatni ko'tarish uchun bitta hazil:\n${randomJoke}`;
  }

  return `Sizning **«${clean}»** haqidagi savolingiz juda qiziq! 🚀\n\nBu mavzuda asosiy jihat — mantiqiy ketma-ketlik va amaliyotdir. Kayfiyatingiz yanada ko'tarilishi uchun bitta hazil ham aytib o'taman:\n\n${randomJoke}`;
}

async function startServer() {
  try {
    await initStore();
    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';
    const distPath = path.resolve(process.cwd(), 'dist');
    const hasDist = fs.existsSync(distPath);

    if (hasDist && (isProduction || !process.env.VITE_DEV)) {
      console.log('Production rejimi: dist/ papkasi xizmat ko\'rsatmoqda');
      app.use(express.static(distPath));
      app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api')) {
          return next();
        }
        const indexPath = path.resolve(distPath, 'index.html');
        if (fs.existsSync(indexPath)) {
          return res.sendFile(indexPath);
        }
        return res.status(404).send('Sahifa topilmadi');
      });
    } else {
      console.log('Dev rejimi: Vite middlewares yuklanmoqda...');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    }

    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server running at http://0.0.0.0:${port}`);
    });

    server.on('error', (err) => {
      console.error('Server listen error:', err);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
