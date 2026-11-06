import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Terminal,
  Code2,
  FileCode,
  Sparkles,
  Volume2,
  VolumeX,
  Save,
  CheckCircle2,
  Layers,
  Laptop,
} from 'lucide-react';
import { Student } from '../types';
import { addPortfolioProject } from '../services/storage';
import { CmdBekMascot, CmdBekMood } from './CmdBekMascot';
import { speakUzbekBoyVoice, stopAllBoySpeech } from '../services/ttsService';

interface CodePlaygroundIDEProps {
  student: Student;
  onProjectSaved?: () => void;
}

interface CodeTemplate {
  id: string;
  title: string;
  html: string;
  css: string;
  js: string;
}

const CODE_TEMPLATES: CodeTemplate[] = [
  {
    id: 'tpl-neon-card',
    title: '1. Interaktiv Hisoblagich (HTML+CSS+JS)',
    html: `<div class="karta">
  <h2>⚡ Jonli Kod Muhiti</h2>
  <p>Tugmani bosib ball to'plang:</p>
  <div id="ball" class="raqam">0</div>
  <div class="tugmalar">
    <button id="qoshish">+10 Qo'shish</button>
    <button id="tozalash">Nol qilish</button>
  </div>
</div>`,
    css: `body {
  margin: 0;
  padding: 24px;
  background: #0d0b18;
  color: #f8fafc;
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
}
.karta {
  background: #19162b;
  border: 2px solid #3ee6c4;
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  width: 300px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.45);
}
.raqam {
  font-size: 46px;
  font-weight: 900;
  color: #ffd23f;
  margin: 14px 0;
}
.tugmalar {
  display: flex;
  gap: 10px;
  justify-content: center;
}
button {
  background: #ff6b86;
  color: #0a0912;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: 800;
  cursor: pointer;
}
button:hover {
  background: #3ee6c4;
}`,
    js: `let hisob = 0;
const ballEl = document.getElementById('ball');
const qoshishBtn = document.getElementById('qoshish');
const tozalashBtn = document.getElementById('tozalash');

qoshishBtn.addEventListener('click', () => {
  hisob += 10;
  ballEl.textContent = hisob;
  console.log("Yangi hisob:", hisob);
});

tozalashBtn.addEventListener('click', () => {
  hisob = 0;
  ballEl.textContent = hisob;
  console.log("Hisob nolga tushirildi!");
});`,
  },
  {
    id: 'tpl-todo',
    title: "2. Kunlik Vazifalar Ro'yxati (Todo App)",
    html: `<div class="quti">
  <h3>📝 Vazifalar Ro'yxati</h3>
  <div class="qator">
    <input id="vazifaInput" placeholder="Yangi vazifa yozing..." />
    <button id="qoshBtn">Qo'shish</button>
  </div>
  <ul id="royxat">
    <li>HTML5 va CSS3 darsini yakunlash</li>
  </ul>
</div>`,
    css: `body {
  background: #0f172a;
  color: #fff;
  font-family: sans-serif;
  padding: 20px;
}
.quti {
  max-width: 340px;
  margin: 0 auto;
  background: #1e293b;
  padding: 20px;
  border-radius: 16px;
}
.qator {
  display: flex;
  gap: 8px;
}
input {
  flex: 1;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #38bdf8;
  background: #0f172a;
  color: #fff;
}
button {
  background: #3ee6c4;
  color: #090d16;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
ul {
  margin-top: 14px;
  padding-left: 18px;
}
li {
  margin-bottom: 6px;
  color: #ffd23f;
}`,
    js: `const input = document.getElementById('vazifaInput');
const btn = document.getElementById('qoshBtn');
const royxat = document.getElementById('royxat');

btn.addEventListener('click', () => {
  if (!input.value.trim()) return;
  const li = document.createElement('li');
  li.textContent = input.value;
  royxat.appendChild(li);
  console.log("Vazifa qo'shildi:", input.value);
  input.value = '';
});`,
  },
  {
    id: 'tpl-calc',
    title: '3. Mini Kalkulyator',
    html: `<div class="calc">
  <h3>🧮 Mini Kalkulyator</h3>
  <input id="son1" type="number" value="15" />
  <input id="son2" type="number" value="5" />
  <div class="amal">
    <button onclick="hisobla('+')">+</button>
    <button onclick="hisobla('-')">-</button>
    <button onclick="hisobla('*')">×</button>
    <button onclick="hisobla('/')">÷</button>
  </div>
  <h2 id="natija">Natija: 20</h2>
</div>`,
    css: `body { background: #111827; color: #fff; font-family: sans-serif; text-align: center; padding: 20px; }
.calc { background: #1f2937; padding: 20px; border-radius: 16px; max-width: 280px; margin: auto; border: 2px solid #ffd23f; }
input { width: 90px; padding: 8px; margin: 4px; border-radius: 8px; border: none; text-align: center; font-size: 16px; }
.amal { margin: 12px 0; display: flex; justify-content: center; gap: 8px; }
button { width: 42px; height: 42px; border-radius: 10px; border: none; background: #ff8a3d; color: #000; font-weight: 900; font-size: 18px; cursor: pointer; }`,
    js: `window.hisobla = function(op) {
  const a = Number(document.getElementById('son1').value);
  const b = Number(document.getElementById('son2').value);
  const res = op === '+' ? a + b : op === '-' ? a - b : op === '*' ? a * b : b !== 0 ? (a / b).toFixed(2) : 'Xato';
  document.getElementById('natija').textContent = 'Natija: ' + res;
  console.log(a, op, b, '=', res);
};`,
  },
];

export const CodePlaygroundIDE: React.FC<CodePlaygroundIDEProps> = ({
  student,
  onProjectSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [htmlCode, setHtmlCode] = useState(CODE_TEMPLATES[0].html);
  const [cssCode, setCssCode] = useState(CODE_TEMPLATES[0].css);
  const [jsCode, setJsCode] = useState(CODE_TEMPLATES[0].js);
  const [srcDoc, setSrcDoc] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '🚀 Jonli Kod Yozish Muhiti tayyor! HTML, CSS va JS kodlaringizni yozib "Ishga Tushirish" tugmasini bosing.',
  ]);

  // AI Code Review state
  const [aiReviewText, setAiReviewText] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [aiMood, setAiMood] = useState<CmdBekMood>('coding');

  // Save to Portfolio state
  const [projectTitle, setProjectTitle] = useState('');
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const buildAndRunCode = () => {
    setConsoleLogs(['▶ Kod ishga tushirildi...']);
    const combinedDoc = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>${cssCode}</style>
  </head>
  <body>
    ${htmlCode}
    <script>
      (function() {
        const origLog = console.log;
        const origErr = console.error;
        console.log = function(...args) {
          origLog.apply(console, args);
          window.parent.postMessage({ type: 'IDE_CONSOLE_LOG', payload: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
        };
        console.error = function(...args) {
          origErr.apply(console, args);
          window.parent.postMessage({ type: 'IDE_CONSOLE_ERR', payload: args.map(a => String(a)).join(' ') }, '*');
        };
        window.onerror = function(msg, url, line) {
          window.parent.postMessage({ type: 'IDE_CONSOLE_ERR', payload: 'Xato (qator ' + line + '): ' + msg }, '*');
        };
      })();
      try {
        ${jsCode}
      } catch (e) {
        console.error(e.message || e);
      }
    </script>
  </body>
</html>`;
    setSrcDoc(combinedDoc);
  };

  useEffect(() => {
    buildAndRunCode();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'IDE_CONSOLE_LOG') {
        setConsoleLogs((prev) => [...prev.slice(-18), `✅ ${event.data.payload}`]);
      } else if (event.data?.type === 'IDE_CONSOLE_ERR') {
        setConsoleLogs((prev) => [...prev.slice(-18), `❌ ${event.data.payload}`]);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const speakBoyVoice = async (text: string) => {
    await speakUzbekBoyVoice(text, {
      onStart: () => {
        setAiSpeaking(true);
        setAiMood('speaking');
      },
      onEnd: () => {
        setAiSpeaking(false);
        setAiMood('happy');
      },
    });
  };

  const handleAskAiReview = async () => {
    setAiLoading(true);
    setAiMood('thinking');
    try {
      const prompt = `Men Kod Yozish Muhitida quyidagi loyihani yozdim. Uni tahlil qilib, xatolarini yoki qanday yanada zo'r qilish mumkinligini qisqa tushuntirib ber:\nHTML:\n${htmlCode.slice(
        0,
        350
      )}\nCSS:\n${cssCode.slice(0, 350)}\nJS:\n${jsCode.slice(0, 350)}`;
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          userName: student.name,
        }),
      });
      const data = await res.json();
      const reply = data.reply || 'Kodingiz juda toza va tushunarli yozilgan!';
      setAiReviewText(reply);
      speakBoyVoice(reply);
    } catch {
      setAiReviewText("Kodingiz tekshirildi: HTML teglari, CSS uslublari va JS hodisalari to'g'ri ulangan!");
      setAiMood('happy');
    } finally {
      setAiLoading(false);
    }
  };

  const handleSaveToPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    const title = projectTitle.trim() || `${student.name}ning Interaktiv Loyihasi`;
    addPortfolioProject({
      title,
      description: 'Jonli Kod Yozish Muhitida (IDE) yaratilgan HTML5, CSS3 va JavaScript loyihasi.',
      authorId: student.id,
      authorName: `${student.name} ${student.surname}`,
      authorAvatar: student.avatar,
      category: 'javascript',
      htmlCode,
      cssCode,
      jsCode,
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Live IDE'],
    });
    setProjectTitle('');
    setSavedNotice(`"${title}" loyihangiz Portfolio tuynugiga muvaffaqiyatli qo'shildi!`);
    if (onProjectSaved) onProjectSaved();
    setTimeout(() => setSavedNotice(null), 5000);
  };

  return (
    <div className="aurora-card p-5 sm:p-8 space-y-6">
      {/* Header & Template Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#3ee6c4]/20 text-[#3ee6c4] flex items-center justify-center shrink-0">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold text-[#3ee6c4]">
              ASOSIY · JONLI KOD YOZISH MUHITI (LIVE IDE)
            </span>
            <h2 className="font-display text-2xl font-bold">
              HTML5 · CSS3 · JavaScript Kod Muharriri
            </h2>
            <p className="text-xs opacity-75">
              Kod yozing, real vaqtda natijani va konsolni ko&apos;ring, CMDbek AI bilan tekshiring yoki Portfolioga saqlang
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {CODE_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => {
                setHtmlCode(tpl.html);
                setCssCode(tpl.css);
                setJsCode(tpl.js);
                setTimeout(() => buildAndRunCode(), 50);
              }}
              className="duo-btn duo-btn-surface !py-2 !px-3 text-xs"
            >
              <span>{tpl.title}</span>
            </button>
          ))}
        </div>
      </div>

      {savedNotice && (
        <div className="p-3.5 rounded-2xl bg-[#b6f03c]/20 border border-[#b6f03c]/40 text-[#b6f03c] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Main Split Workspace: Left Code Editor, Right Live Preview + Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Multi-tab Editor */}
        <div className="lg:col-span-6 flex flex-col space-y-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('html')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === 'html'
                    ? 'bg-[#ff8a3d] text-[#0a0912]'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>index.html</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('css')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === 'css'
                    ? 'bg-[#38bdf8] text-[#0a0912]'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>style.css</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('js')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  activeTab === 'js'
                    ? 'bg-[#ffd23f] text-[#0a0912]'
                    : 'opacity-75 hover:opacity-100'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>script.js</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={buildAndRunCode}
                className="duo-btn duo-btn-mint !py-2 !px-4 text-xs flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Ishga Tushirish (Run)</span>
              </button>
              <button
                type="button"
                onClick={handleAskAiReview}
                disabled={aiLoading}
                className="duo-btn duo-btn-coral !py-2 !px-3.5 text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{aiLoading ? 'Tahlil...' : 'CMDbek Tekshirsin'}</span>
              </button>
            </div>
          </div>

          <textarea
            value={activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : jsCode}
            onChange={(e) => {
              if (activeTab === 'html') setHtmlCode(e.target.value);
              else if (activeTab === 'css') setCssCode(e.target.value);
              else setJsCode(e.target.value);
            }}
            spellCheck={false}
            className="w-full h-80 sm:h-96 aurora-input font-mono text-xs sm:text-sm leading-relaxed resize-y bg-[#090812]"
            placeholder="Kodingizni shu yerga yozing..."
          />

          {/* Portfolio Save Bar */}
          <form onSubmit={handleSaveToPortfolio} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="Loyiha nomini yozib Portfolioga saqlang..."
              className="aurora-input flex-1 text-xs py-2.5"
            />
            <button
              type="submit"
              className="duo-btn duo-btn-gold !py-2.5 !px-4 text-xs shrink-0 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Portfolioga Saqlash</span>
            </button>
          </form>
        </div>

        {/* Right: Live Preview + Console */}
        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#3ee6c4]">Jonli Natija Oynasi (Live Preview):</span>
              <span className="font-mono text-[11px] opacity-65">Sandboxed Browser</span>
            </div>
            <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-[#3ee6c4]/35 bg-[#0d0b18]">
              <iframe
                title="Live Code Preview"
                srcDoc={srcDoc}
                sandbox="allow-scripts"
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Console Output */}
          <div className="aurora-surface-2 rounded-2xl p-4 space-y-2 border border-white/10">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-[#ffd23f] flex items-center gap-1.5 font-mono">
                <Terminal className="w-4 h-4" /> JavaScript Konsoli (console.log):
              </span>
              <button
                type="button"
                onClick={() => setConsoleLogs(['Konsol tozalandi.'])}
                className="text-[11px] opacity-70 hover:opacity-100 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Tozalash
              </button>
            </div>
            <div className="h-28 overflow-y-auto font-mono text-xs space-y-1 bg-black/40 p-3 rounded-xl">
              {consoleLogs.map((log, i) => (
                <div key={i} className="leading-relaxed break-words">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CMDbek AI Review Box */}
      {(aiReviewText || aiLoading) && (
        <div className="aurora-surface-2 rounded-3xl p-5 border-2 border-[#3ee6c4]/40 flex flex-col sm:flex-row items-start gap-4">
          <CmdBekMascot mood={aiLoading ? 'thinking' : aiMood} size={68} className="shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold text-[#3ee6c4]">
                CMDbek AI Kod Tahlili (O&apos;g&apos;il bola ovozi):
              </span>
              {aiReviewText && (
                <button
                  type="button"
                  onClick={() => {
                    if (aiSpeaking) {
                      stopAllBoySpeech();
                      setAiSpeaking(false);
                      setAiMood('happy');
                    } else {
                      speakBoyVoice(aiReviewText);
                    }
                  }}
                  className="px-3 py-1 rounded-xl bg-[#3ee6c4]/20 text-[#3ee6c4] text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  {aiSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{aiSpeaking ? "Ovozni to'xtatish" : 'Ovozda eshitish'}</span>
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
              {aiLoading ? "CMDbek kodingizni qatorma-qator o'qib chiqmoqda..." : aiReviewText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
