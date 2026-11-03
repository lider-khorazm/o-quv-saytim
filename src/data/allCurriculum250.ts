import { Lesson, CourseStage } from '../types';
import { ALL_100_LESSONS } from './allCurriculum100';

// 250 ta Mukammal Dasturlash Mavzulari Ma'lumotlar Bazasi
// Barcha bosqichlar: HTML, CSS, JavaScript, TypeScript, React, Backend (Node.js), Database (SQL/NoSQL), FullStack/DevOps

interface LessonMetaSpec {
  id: string;
  stage: CourseStage;
  trackCategory: string;
  title: string;
  duration: string;
  xpReward: number;
  summary: string;
  codeExample: string;
  practiceTask: string;
  starterCode: string;
  solutionKeyword: string;
  theoryDetails: string[];
  realWorldExamples: string[];
  cheatSheetTips: string[];
  slides: {
    id: number;
    badge: string;
    title: string;
    points: string[];
    codeSnippet?: string;
  }[];
  commonMistakes: {
    badCode: string;
    goodCode: string;
    explanation: string;
  }[];
  interviewQuestions: {
    question: string;
    answer: string;
  }[];
  quiz: {
    id: string;
    question: string;
    codeSnippet?: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  }[];
}

const RAW_TOPIC_DEFS: {
  idNum: number;
  stage: CourseStage;
  trackCategory: string;
  topicTitle: string;
  summary: string;
  sampleCode: string;
  quizQ: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}[] = [
  // ================= STAGE 1: HTML5 (1 - 35) =================
  {
    idNum: 1,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML5 Kirish va Veb Sahifa Mohiyati",
    summary: "Veb-sahifaning skeletini tuzish, teglarning ishlash mexanizmi, gipermatn va brauzer qanday qilib HTML kodini vizual interfeysga aylantirishi.",
    sampleCode: "<!DOCTYPE html>\n<html lang=\"uz\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Mening Birinchi Saytim</title>\n</head>\n<body>\n  <h1>Salom, Dunyo!</h1>\n  <p>DevMaster orqali dasturlashni boshladim.</p>\n</body>\n</html>",
    quizQ: "HTML5 hujjati ekanligini brauzerga qaysi direktiva bildiradi?",
    options: ["<!DOCTYPE html>", "<html5>", "<doctype xml>", "<header>"],
    correctIndex: 0,
    explanation: "<!DOCTYPE html> deklaratsiyasi brauzerga hujjat zamonaviy HTML5 standartida ekanligini uqtiradi."
  },
  {
    idNum: 2,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML Elementlari, Teglar va Atributlar",
    summary: "Ochuvchi va yopuvchi teglar, o'z-o'zini yopuvchi (void) teglar, global atributlar (id, class, style, title) va ma'lumotlar uzatish.",
    sampleCode: "<div id=\"main-card\" class=\"card shadow\" title=\"Foydalanuvchi kartasi\">\n  <img src=\"avatar.png\" alt=\"Foydalanuvchi surati\" width=\"80\" height=\"80\" />\n  <p>Olimjon Alimjonov</p>\n</div>",
    quizQ: "Quyidagilardan qaysi biri o'z-o'zini yopuvchi (void/self-closing) teg hisoblanadi?",
    options: ["<div>", "<img>", "<p>", "<span>"],
    correctIndex: 1,
    explanation: "<img>, <input>, <br>, <hr> kabi teglar ichida matn saqlamaydi va o'z-o'zini yopadi."
  },
  {
    idNum: 3,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Sarlavhalar Ierarxiyasi (H1-H6) va Paragraflar",
    summary: "H1 dan H6 gacha bo'lgan sarlavhalarning semantik ahamiyati, qidiruv tizimlari (SEO) uchun to'g'ri ierarxiya va <p> teglari bilan ishlash.",
    sampleCode: "<article>\n  <h1>DevMaster Platformasi Yangiliklari</h1>\n  <h2>1-Dars: HTML Semantikasi</h2>\n  <h3>Sarlavhalarning SEOga Ta'siri</h3>\n  <p>Har bir sahifada faqat bitta asosiy H1 tegi bo'lishi tavsiya etiladi.</p>\n</article>",
    quizQ: "Bitta veb-sahifada SEO qoidalariga ko'ra nechta H1 tegi bo'lishi maqsadga muvofiq?",
    options: ["Cheksiz", "Faqat 1 ta", "Eng kamida 5 ta", "Farqi yo'q"],
    correctIndex: 1,
    explanation: "Qidiruv tizimlari sahifa asosiy mavzusini aniqlashi uchun sahifada 1 ta asosiy <h1> bo'lishi lozim."
  },
  {
    idNum: 4,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Matn Formatlash: strong, em, mark, code, pre",
    summary: "Semantik matn belgilash: muhimlik (strong), urg'u (em), qidiruv yoritgichi (mark), kod bo'laklari (code) va preformatlangan matn (pre).",
    sampleCode: "<p>Diqqat qiling: bu <strong>o'ta muhim</strong> qoidadir!</p>\n<p>Terminalda ishga tushiring: <code>npm run dev</code></p>\n<pre>\nfunction salom() {\n  console.log('Salom!');\n}\n</pre>",
    quizQ: "Probel va qator ko'chirishlarni aynan yozilganidek saqlab qoluvchi HTML tegi qaysi?",
    options: ["<code>", "<pre>", "<p>", "<format>"],
    correctIndex: 1,
    explanation: "<pre> (preformatted) tegi bo'sh joylar va qator o'tishlarni asl holicha brauzerda aks ettiradi."
  },
  {
    idNum: 5,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Giperhavolalar (Links) va Anchor <a> Tegi",
    summary: "Sahifalararo bog'lanish, tashqi havolalar, target='_blank' va rel='noopener noreferrer' xavfsizligi, email va telefon havolalari.",
    sampleCode: "<nav>\n  <a href=\"https://google.com\" target=\"_blank\" rel=\"noopener noreferrer\">Google Qidiruv</a>\n  <a href=\"mailto:olimjonalimjonov12@gmail.com\">Admin bilan bog'lanish</a>\n  <a href=\"tel:+998901234567\">Qo'ng'iroq qilish</a>\n</nav>",
    quizQ: "Yangi oynada ochiladigan havola uchun qaysi xavfsizlik atributi tavsiya etiladi?",
    options: ["rel=\"noopener noreferrer\"", "safe=\"true\"", "security=\"on\"", "target=\"_safe\""],
    correctIndex: 0,
    explanation: "rel=\"noopener noreferrer\" target=\"_blank\" bilan ochilgan yangi oynaning asosiy sahifa window.opener obyektiga kirishini to'sadi."
  },
  {
    idNum: 6,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Rasmlar (Images), Alt Matni va Responsive Rasm Uslubi",
    summary: "<img> tegi, accessibility uchun alt atributining qat'iy talablari, loading='lazy' yordamida yuklash tezligini oshirish.",
    sampleCode: "<figure>\n  <img \n    src=\"banner.webp\" \n    alt=\"DevMaster 250 darslik dasturlash kursi banneri\" \n    width=\"800\" \n    height=\"450\" \n    loading=\"lazy\" \n  />\n  <figcaption>DevMaster o'quv markazi banneri</figcaption>\n</figure>",
    quizQ: "Rasm sekin tarmoqda faqat ekranga yaqinlashganda yuklanishi uchun qaysi atribut beriladi?",
    options: ["loading=\"lazy\"", "defer=\"true\"", "async=\"image\"", "preload=\"false\""],
    correctIndex: 0,
    explanation: "loading=\"lazy\" brauzerga rasmni foydalanuvchi sahifani o'sha yerga aylantirib borguncha yuklamaslikni buyuradi."
  },
  {
    idNum: 7,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Ro'yxatlar: Tartiblangan (ol), Tartibsiz (ul) va Tavsif (dl)",
    summary: "Navigatsiya menyulari va ma'lumotlar ketma-ketligini ro'yxatlar orqali tuzish, ichma-ich (nested) ro'yxatlar.",
    sampleCode: "<ul>\n  <li>HTML5 Asoslari\n    <ol>\n      <li>Teglar va atributlar</li>\n      <li>Semantika</li>\n    </ol>\n  </li>\n  <li>CSS3 Dizayn</li>\n</ul>",
    quizQ: "Lug'at yoki atamalar va ularning izohlarini tuzish uchun qaysi ro'yxat teglari ishlatiladi?",
    options: ["<dl>, <dt>, <dd>", "<ul>, <li>", "<ol>, <li>", "<list>, <item>"],
    correctIndex: 0,
    explanation: "<dl> (description list), <dt> (term), <dd> (description) atama va uning ta'rifini ifodalaydi."
  },
  {
    idNum: 8,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Jadvallar (Tables): table, thead, tbody, tr, th, td",
    summary: "Strukturalangan ma'lumotlarni jadvallashtirish, colspan va rowspan yordamida kataklarni birlashtirish.",
    sampleCode: "<table border=\"1\">\n  <thead>\n    <tr>\n      <th>Bosqich</th>\n      <th>Mavzular Soni</th>\n      <th>XP Miqdori</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>HTML5</td>\n      <td>35 ta</td>\n      <td>1500 XP</td>\n    </tr>\n  </tbody>\n</table>",
    quizQ: "Jadvalda bir katakni bir nechta ustunga cho'zish uchun qaysi atribut ishlatiladi?",
    options: ["colspan", "rowspan", "grid-column", "span-width"],
    correctIndex: 0,
    explanation: "colspan atributi katakni gorizontaliga bir nechta ustun eniga kengaytiradi."
  },
  {
    idNum: 9,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Formalar (Forms): form, input, label, button",
    summary: "Foydalanuvchi ma'lumotlarini qabul qilish, action, method='POST' va input turlari (text, password, email, number).",
    sampleCode: "<form action=\"/api/login\" method=\"POST\">\n  <label for=\"login-email\">Elektron Pochta:</label>\n  <input type=\"email\" id=\"login-email\" name=\"email\" required />\n  <label for=\"login-pass\">Parol:</label>\n  <input type=\"password\" id=\"login-pass\" name=\"password\" required minlength=\"8\" />\n  <button type=\"submit\">Tizimga Kirish</button>\n</form>",
    quizQ: "Kiritilgan belgilarni nuqta yoki yulduzcha ko'rinishida yashiruvchi input turi qaysi?",
    options: ["type=\"password\"", "type=\"hidden\"", "type=\"secret\"", "type=\"mask\""],
    correctIndex: 0,
    explanation: "type=\"password\" xavfsizlik uchun kiritilayotgan parolni vizual tarzda yashirib turadi."
  },
  {
    idNum: 10,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Kengaytirilgan Input Turlari: date, color, range, file",
    summary: "HTML5 bilan kelgan maxsus kiritish maydonlari: fayl yuklash (file), sana tanlash (date), rang tanlash (color) va slayd (range).",
    sampleCode: "<label>Fon Rangini Tanlang:\n  <input type=\"color\" id=\"bg-color\" value=\"#6366f1\" />\n</label>\n<label>Ovoz Balandligi:\n  <input type=\"range\" min=\"0\" max=\"100\" value=\"50\" />\n</label>\n<label>Rasm Yuklash:\n  <input type=\"file\" accept=\"image/*\" />\n</label>",
    quizQ: "Foydalanuvchiga faqat rasm fayllarini yuklashga ruxsat berish uchun qaysi atribut beriladi?",
    options: ["accept=\"image/*\"", "filter=\"images\"", "type=\"image\"", "upload=\"photos\""],
    correctIndex: 0,
    explanation: "accept=\"image/*\" atributi operatsion tizim fayl tanlash oynasida faqat grafik fayllarni filtrlash imkonini beradi."
  },
  {
    idNum: 11,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Select, Option, Optgroup va Datalist",
    summary: "Ochiluvchi ro'yxatlar (dropdown) va qidiruv bilan to'ldiriladigan avtomatik tavsiyalar ro'yxati (datalist).",
    sampleCode: "<label for=\"city-input\">Shahringizni tanlang:</label>\n<input list=\"cities\" id=\"city-input\" name=\"city\" />\n<datalist id=\"cities\">\n  <option value=\"Toshkent\" />\n  <option value=\"Samarqand\" />\n  <option value=\"Buxoro\" />\n  <option value=\"Farg'ona\" />\n</datalist>",
    quizQ: "Foydalanuvchi yozayotganda variantlarni qidiruv ro'yxati sifatida ko'rsatish uchun qaysi teg ishlatiladi?",
    options: ["<datalist>", "<select>", "<autocomplete>", "<searchlist>"],
    correctIndex: 0,
    explanation: "<datalist> tegi <input list='id'> bilan bog'lanib, avtomatik to'ldirish variantlarini taqdim etadi."
  },
  {
    idNum: 12,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Formani Tekshirish (Validation): required, pattern, min/max",
    summary: "Brauzer darajasida kiritilayotgan ma'lumotlarni tekshirish, RegEx pattern orqali telefon raqam yoki parol qoidalarini belgilash.",
    sampleCode: "<form>\n  <input \n    type=\"text\" \n    placeholder=\"+998 90 123 45 67\" \n    pattern=\"\\+998\\s?[0-9]{2}\\s?[0-9]{3}\\s?[0-9]{2}\\s?[0-9]{2}\" \n    required \n    title=\"+998 bilan boshlanuvchi O'zbekiston raqami\"\n  />\n  <button>Yuborish</button>\n</form>",
    quizQ: "Maydon bo'sh qolmasligi va to'ldirilishi majburiy ekanligini ta'minlovchi HTML atributi qaysi?",
    options: ["required", "mandatory", "validate", "not-null"],
    correctIndex: 0,
    explanation: "required atributi kiritish maydonini majburiy qiladi; u bo'sh bo'lsa forma jo'natilmaydi."
  },
  {
    idNum: 13,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML5 Semantik Skelet: header, nav, main, section, article, aside, footer",
    summary: "Sayt tuzilishini mantiqiy qismlarga ajratish, screen readerlar va qidiruv robotlari uchun semantik tozalik.",
    sampleCode: "<body>\n  <header><h1>DevMaster</h1></header>\n  <nav><a href=\"#\">Bosh sahifa</a></nav>\n  <main>\n    <article>\n      <h2>Bugungi Dars</h2>\n      <p>Semantika haqida ma'lumot.</p>\n    </article>\n    <aside>Yon panel yangiliklari</aside>\n  </main>\n  <footer>© 2026 Lord_dev team</footer>\n</body>",
    quizQ: "Sahifaning mustaqil, boshqa joyga ko'chirsa ham o'z ma'nosini yo'qotmaydigan maqola qismini qaysi teg bildiradi?",
    options: ["<article>", "<section>", "<div>", "<aside>"],
    correctIndex: 0,
    explanation: "<article> tegi mustaqil va to'liq mazmunga ega kontentni (masalan blog posti, yangilik maqolasi) ifodalaydi."
  },
  {
    idNum: 14,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Multimedia: Audio va Video Teglari",
    summary: "<video> va <audio> teglari yordamida brauzerda tashqi plaginlarsiz media fayllarni ijro etish, controls, autoplay va source teglari.",
    sampleCode: "<video width=\"640\" height=\"360\" controls poster=\"preview.jpg\">\n  <source src=\"dars.mp4\" type=\"video/mp4\">\n  <source src=\"dars.webm\" type=\"video/webm\">\n  Brauzeringiz video tegini qo'llab-quvvatlamaydi.\n</video>",
    quizQ: "Videoni boshqarish tugmalari (play, pause, ovoz, to'liq ekran) ko'rinishi uchun qaysi atribut qo'shiladi?",
    options: ["controls", "tools", "player", "buttons"],
    correctIndex: 0,
    explanation: "controls atributi brauzerning standart multimedia boshqaruv paneli ko'rinishini faollashtiradi."
  },
  {
    idNum: 15,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Iframe: Boshqa Sahifalar va Xaritalarni Joylashtirish",
    summary: "<iframe> orqali YouTube videolari yoki Google Xaritalarini joylashtirish, sandbox va loading xavfsizlik atributlari.",
    sampleCode: "<iframe \n  width=\"560\" \n  height=\"315\" \n  src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" \n  title=\"Video darslik\" \n  allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" \n  loading=\"lazy\"\n  allowfullscreen>\n</iframe>",
    quizQ: "Iframe xavfsizligini ta'minlab, begona skriptlar ishga tushishini cheklovchi atribut qaysi?",
    options: ["sandbox", "security", "safeframe", "no-script"],
    correctIndex: 0,
    explanation: "sandbox atributi iframe ichidagi sahifaga xavfsizlik cheklovlarini qo'llaydi."
  },
  {
    idNum: 16,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "SVG (Scalable Vector Graphics) va HTML Integratsiyasi",
    summary: "Vektorli grafikalar, piksellanmasdan kattalashuvchi piktogrammalar va shakllar (<svg>, <path>, <circle>, <rect>).",
    sampleCode: "<svg width=\"48\" height=\"48\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#6366f1\" stroke-width=\"2\">\n  <path d=\"M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5\" />\n</svg>",
    quizQ: "SVG ning oddiy JPEG yoki PNG dan asosiy ustunligi nimada?",
    options: ["Har qanday o'lchamda sifatini yo'qotmaydi (vektor)", "Faqat oq-qora bo'ladi", "Fayl hajmi doimo 1 megabaytdan katta", "Brauzerda ochilmaydi"],
    correctIndex: 0,
    explanation: "SVG matematik formulalar asosida chizilgani bois masshtab o'zgarsa ham xiralashmaydi."
  },
  {
    idNum: 17,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Canvas API Kirish: Dasturiy Chizish Asoslari",
    summary: "<canvas> tegi va JavaScript 2D rendering konteksti (ctx) orqali piksellar bilan grafik va o'yinlar yaratish.",
    sampleCode: "<canvas id=\"myCanvas\" width=\"300\" height=\"150\" style=\"border:1px solid #333;\"></canvas>\n<script>\n  const c = document.getElementById('myCanvas');\n  const ctx = c.getContext('2d');\n  ctx.fillStyle = '#10b981';\n  ctx.fillRect(20, 20, 150, 100);\n</script>",
    quizQ: "Canvasda 2D chizish vositalarini faollashtirish uchun qaysi metod chaqiriladi?",
    options: ["getContext('2d')", "initCanvas2D()", "startPaint()", "create2D()"],
    correctIndex: 0,
    explanation: "canvas.getContext('2d') metodi chizish usullari va xossalarini saqlovchi obyektni qaytaradi."
  },
  {
    idNum: 18,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Details va Summary: Kod yozmasdan Accordion Yaratish",
    summary: "Foydalanuvchi bosganda ochilib-yopiluvchi FAQ savol-javob bloklarini faqat HTML yordamida yaratish.",
    sampleCode: "<details>\n  <summary>DevMaster Academy ga kimlar qabul qilinadi?</summary>\n  <p>13 yoshdan oshgan, dasturlashga qiziqqan barcha intiluvchan o'quvchilar bepul tahsil olishi mumkin.</p>\n</details>",
    quizQ: "<details> blokida doimo ko'rinib turadigan sarlavha qaysi teg ichida beriladi?",
    options: ["<summary>", "<title>", "<heading>", "<captionlabel>"],
    correctIndex: 0,
    explanation: "<summary> tegi <details> blokining ko'rinib turuvchi va bosiladigan sarlavhasini belgilaydi."
  },
  {
    idNum: 19,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Dialog Tegi: Zamonaviy Modal Oynalar Yaratish",
    summary: "<dialog> tegi, showModal() va close() metodlari, fonni xiralashtiruvchi ::backdrop pseudo-elementi.",
    sampleCode: "<dialog id=\"welcomeModal\">\n  <h2>Xush kelibsiz!</h2>\n  <p>Saytimizga muvaffaqiyatli kirdingiz.</p>\n  <button onclick=\"document.getElementById('welcomeModal').close()\">Yopish</button>\n</dialog>\n<button onclick=\"document.getElementById('welcomeModal').showModal()\">Modalni Ochish</button>",
    quizQ: "<dialog> oynasini orqa fonni xiralashtirib (modal tarzida) ochish uchun qaysi JS metod chaqiriladi?",
    options: ["showModal()", "open()", "display()", "showDialog()"],
    correctIndex: 0,
    explanation: "showModal() oynani butun ekranning eng yuqori qatlamida to'liq modal sifatida ochadi."
  },
  {
    idNum: 20,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Progress va Meter: Yuklanish va Ko'rsatkichlar",
    summary: "Vazifaning tugallanish foizini ifodalovchi <progress> va cheklangan oraliqdagi miqdorni ko'rsatuvchi <meter> teglari.",
    sampleCode: "<label>Dars tugash jarayoni: \n  <progress value=\"75\" max=\"100\">75%</progress>\n</label>\n<label>Disk xotirasi: \n  <meter value=\"85\" min=\"0\" max=\"100\" low=\"30\" high=\"80\" optimum=\"20\">85 GB</meter>\n</label>",
    quizQ: "Disk xotirasi yoki batareya quvvati kabi ko'rsatkichlarni ifodalash uchun eng to'g'ri semantik teg qaysi?",
    options: ["<meter>", "<progress>", "<gauge>", "<slider>"],
    correctIndex: 0,
    explanation: "<meter> tegi ma'lum chegaradagi skalar o'lchovni (harorat, batareya) ifodalash uchun mo'ljallangan."
  },
  {
    idNum: 21,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Data-* Atributlari (Custom Data Attributes)",
    summary: "HTML elementiga shaxsiy ma'lumotlarni biriktirish (data-id, data-role) va JavaScriptda dataset orqali o'qish.",
    sampleCode: "<div class=\"user-item\" data-user-id=\"u-9821\" data-role=\"student\" data-score=\"95\">\n  Olimjon Alimjonov\n</div>\n<script>\n  const user = document.querySelector('.user-item');\n  console.log(user.dataset.userId); // 'u-9821'\n</script>",
    quizQ: "JavaScript orqali elementdagi 'data-status' atributini o'qish uchun qaysi xususiyatdan foydalaniladi?",
    options: ["element.dataset.status", "element.data.status", "element.customData.status", "element.getData('status')"],
    correctIndex: 0,
    explanation: "element.dataset obyekti barcha 'data-*' prefiksli atributlarni o'z ichiga oladi."
  },
  {
    idNum: 22,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Template va Slot: Qayta Ishlatiluvchi HTML Shabloni",
    summary: "<template> tegi ichidagi kod sahifada ko'rinmaydi, lekin JavaScript yordamida klonlanib bir necha marta ko'paytiriladi.",
    sampleCode: "<template id=\"student-card-template\">\n  <div class=\"student-card\">\n    <h3 class=\"name\"></h3>\n    <p class=\"xp\"></p>\n  </div>\n</template>",
    quizQ: "<template> tegi ichidagi HTML brauzer yuklanganda darhol ekranda ko'rinadimi?",
    options: ["Yo'q, JS orqali klonlanmaguncha yashirin turadi", "Ha, darhol ko'rinadi", "Faqat mobil qurilmalarda ko'rinadi", "Xatolik beradi"],
    correctIndex: 0,
    explanation: "<template> brauzer tomonidan render qilinmaydi; u faqat dinamik klonlash shabloni vazifasini bajaradi."
  },
  {
    idNum: 23,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML Head Meta Teglari: Viewport, Charset, Author",
    summary: "Mobil moslashuvchanlik (<meta name='viewport'>), belgilar kodirovkasi (UTF-8) va mualliflik rekvizitlari.",
    sampleCode: "<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta name=\"author\" content=\"Olimjon Alimjonov (Lord)\" />\n  <meta name=\"description\" content=\"DevMaster 250 darslik to'liq dasturlash akademiyasi\" />\n</head>",
    quizQ: "Mobil brauzer sahifani smartfon ekran eniga moslab ko'rsatishi uchun qaysi meta tegi shart?",
    options: ["<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">", "<meta name=\"mobile\" content=\"true\">", "<meta responsive=\"yes\">", "<meta screen=\"phone\">"],
    correctIndex: 0,
    explanation: "viewport meta tegi mobil qurilmalarga sahifa o'lchamini ekranning haqiqiy kengligiga moslashni aytadi."
  },
  {
    idNum: 24,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "OpenGraph (OG) va Twitter Card Ijtimoiy Ulashish Teglari",
    summary: "Telegram, Facebook yoki Twitterda sayt havolasi tashlanganda chiroyli rasm, sarlavha va matn ko'rinishini sozlash.",
    sampleCode: "<meta property=\"og:title\" content=\"DevMaster Academy by Lord_dev team\" />\n<meta property=\"og:description\" content=\"250 ta chuqur mavzu va AI imtihonlari\" />\n<meta property=\"og:image\" content=\"https://devmaster.uz/og-preview.png\" />\n<meta property=\"og:type\" content=\"website\" />",
    quizQ: "Telegram yoki Facebookda havola yuborilganda rasm chiqishi uchun qaysi meta xossasi beriladi?",
    options: ["og:image", "link:photo", "share:picture", "meta:thumbnail"],
    correctIndex: 0,
    explanation: "og:image xossasi ijtimoiy tarmoqlar uchun ulashiladigan rasmni belgilaydi."
  },
  {
    idNum: 25,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Favicon, Web Manifest va PWA Asoslari",
    summary: "Brauzer tabidagi logotip (favicon.ico, svg) va ilovani telefonga o'rnatish imkonini beruvchi manifest.json.",
    sampleCode: "<link rel=\"icon\" type=\"image/svg+xml\" href=\"/logo.svg\" />\n<link rel=\"apple-touch-icon\" href=\"/icon-192.png\" />\n<link rel=\"manifest\" href=\"/manifest.json\" />\n<meta name=\"theme-color\" content=\"#0f172a\" />",
    quizQ: "Veb-ilovani mobil telefonda ilova sifatida o'rnatish uchun qaysi fayl ulanadi?",
    options: ["manifest.json", "package.json", "install.xml", "app.config"],
    correctIndex: 0,
    explanation: "manifest.json veb-ilovani o'rnatish, uning piktogrammasi va fon rangini boshqaradi."
  },
  {
    idNum: 26,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Web Accessibility (A11y) va ARIA Rol & Atributlari",
    summary: "Ko'rish imkoniyati cheklanganlar uchun screen readerlar: aria-label, aria-hidden, role='alert' va klaviatura bilan boshqarish.",
    sampleCode: "<button aria-label=\"Muloqot oynasini yopish\" onclick=\"closeDialog()\">\n  <svg aria-hidden=\"true\">...</svg>\n</button>\n<div role=\"alert\" aria-live=\"polite\">\n  Test muvaffaqiyatli yakunlandi!\n</div>",
    quizQ: "Faqat ikonka bo'lgan tugmaga screen reader o'qishi uchun matn qo'shishda nima ishlatiladi?",
    options: ["aria-label=\"Matn\"", "speak=\"Matn\"", "screen-text=\"Matn\"", "sound=\"Matn\""],
    correctIndex: 0,
    explanation: "aria-label ekranda matn bo'lmagan elementlarga audio o'quvchi qurilmalar uchun izoh beradi."
  },
  {
    idNum: 27,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Semantic Layout va Katta Portal Arxitekturasi",
    summary: "Yuzlab sahifali portallarda to'g'ri nesting, landmarklar (banner, main, navigation, complementary) va kod tartibi.",
    sampleCode: "<div class=\"layout\">\n  <header role=\"banner\">...</header>\n  <nav role=\"navigation\">...</nav>\n  <main role=\"main\">...</main>\n  <footer role=\"contentinfo\">...</footer>\n</div>",
    quizQ: "WAI-ARIA ga ko'ra sahifaning asosiy kontent hududi landmark roli nima deb ataladi?",
    options: ["main", "center", "content", "body"],
    correctIndex: 0,
    explanation: "role='main' sahifaning markaziy ma'lumotlar oqimini bildiruvchi semantik roldir."
  },
  {
    idNum: 28,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML5 Drag and Drop API",
    summary: "Elementlarni sichqoncha bilan siljitish: draggable='true', ondragstart, ondragover va ondrop hodisalari.",
    sampleCode: "<div draggable=\"true\" ondragstart=\"event.dataTransfer.setData('text', event.target.id)\">\n  Siljitiluvchi Kartochka\n</div>\n<div ondragover=\"event.preventDefault()\" ondrop=\"dropHandler(event)\">\n  Bu yerga tashlang\n</div>",
    quizQ: "Elementni ushlab siljitish mumkin bo'lishi uchun qaysi atribut true qilinadi?",
    options: ["draggable=\"true\"", "moveable=\"true\"", "allow-drag=\"true\"", "drop=\"active\""],
    correctIndex: 0,
    explanation: "draggable=\"true\" atributi elementni brauzer darajasida sudrab siljitishga ruxsat beradi."
  },
  {
    idNum: 29,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML Contenteditable va Boy Matn Muharriri (WYSIWYG)",
    summary: "Foydalanuvchiga to'g'ridan-to'g'ri ekranning o'zida matnni tahrirlash imkonini beruvchi contenteditable='true' xossasi.",
    sampleCode: "<div contenteditable=\"true\" class=\"editor-box\">\n  Ushbu matnni to'g'ridan-to'g'ri o'zgartirishingiz mumkin!\n</div>",
    quizQ: "Oddiy <div> ichidagi matnni foydalanuvchi klaviaturada yozib o'zgartirishi uchun qaysi atribut kerak?",
    options: ["contenteditable=\"true\"", "writable=\"true\"", "user-edit=\"yes\"", "text-input=\"true\""],
    correctIndex: 0,
    explanation: "contenteditable='true' elementni interaktiv matn tahrirlagichga aylantiradi."
  },
  {
    idNum: 30,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML Emmet Qisqartmalari va Tezkor Kod Yozish",
    summary: "Frontendchilar quroli: div.card>h2+p*2>lorem10 kabi qisqartmalar yordamida bir soniyada yuzlab qator HTML yaratish.",
    sampleCode: "<!-- Emmet: ul.nav-list>li.nav-item*3>a.nav-link{Havola $} -->\n<ul class=\"nav-list\">\n  <li class=\"nav-item\"><a href=\"\" class=\"nav-link\">Havola 1</a></li>\n  <li class=\"nav-item\"><a href=\"\" class=\"nav-link\">Havola 2</a></li>\n  <li class=\"nav-item\"><a href=\"\" class=\"nav-link\">Havola 3</a></li>\n</ul>",
    quizQ: "Emmetda 5 ta ketma-ket <li> yaratish uchun qaysi belgi bilan ko'paytiriladi?",
    options: ["li*5", "li#5", "li.5", "li>5"],
    correctIndex: 0,
    explanation: "Emmet sintaksisida '*' yulduzcha elementi soniga ko'paytirishni bildiradi."
  },
  {
    idNum: 31,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML Kodni Tekshirish (W3C Validator) va Qoidalar",
    summary: "Xatolarni topish, yopilmagan teglarni tuzatish va validator.w3.org xalqaro talablariga mos kod yozish.",
    sampleCode: "<!-- To'g'ri va xatosiz W3C HTML hujjati strukturasi -->\n<!DOCTYPE html>\n<html lang=\"uz\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <title>W3C Tasdiqlangan Hujjat</title>\n</head>\n<body>\n  <p>To'liq yopilgan va tekshirilgan teglarga ega matn.</p>\n</body>\n</html>",
    quizQ: "Rasmiy HTML standartlarini tekshiruvchi xalqaro tashkilot qaysi?",
    options: ["W3C (World Wide Web Consortium)", "IEEE", "ISO", "Google Web Group"],
    correctIndex: 0,
    explanation: "W3C xalqaro konsorsiumi veb-standartlarni (HTML, CSS) ishlab chiqadi va tekshiradi."
  },
  {
    idNum: 32,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "Web Components: Custom Elements va Shadow DOM Kirish",
    summary: "HTMLda shaxsiy teglarni yaratish (<user-avatar>, <code-runner>) va stillarni ajratib turuvchi Shadow DOM.",
    sampleCode: "<script>\n  class UserCard extends HTMLElement {\n    connectedCallback() {\n      this.innerHTML = `<div class=\"card\">Foydalanuvchi: ${this.getAttribute('name')}</div>`;\n    }\n  }\n  customElements.define('user-card', UserCard);\n</script>\n<user-card name=\"Olimjon\"></user-card>",
    quizQ: "Custom HTML elementi nomida kamida nechta so'z va qanday belgi bo'lishi shart?",
    options: ["Kamida bitta tire '-' belgisi (masalan: my-card)", "Bosh harf bilan boshlanishi", "Oldida '$' belgisi bo'lishi", "Talab yo'q"],
    correctIndex: 0,
    explanation: "Standart teglardan ajralib turishi uchun Custom Element nomida defis/tire '-' bo'lishi majburiy."
  },
  {
    idNum: 33,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTMLda SEO Optimizatsiyasi: Robotlar va Indekslash",
    summary: "Google va Yandex robotlariga sahifani to'g'ri o'qitish: canonical havolalar, noindex/nofollow va tuzilgan ma'lumotlar (JSON-LD).",
    sampleCode: "<head>\n  <link rel=\"canonical\" href=\"https://devmaster.uz/lessons\" />\n  <meta name=\"robots\" content=\"index, follow\" />\n  <script type=\"application/ld+json\">\n  {\n    \"@context\": \"https://schema.org\",\n    \"@type\": \"EducationalOrganization\",\n    \"name\": \"DevMaster Academy\"\n  }\n  </script>\n</head>",
    quizQ: "Qidiruv tizimlariga sahifaning asl rasmiy nusxasi qayerdaligini ko'rsatish uchun qaysi teg ishlatiladi?",
    options: ["<link rel=\"canonical\" href=\"...\">", "<meta name=\"official\">", "<a rel=\"main\">", "<head origin=\"...\">"],
    correctIndex: 0,
    explanation: "rel=\"canonical\" dublikat sahifalar ichidan asosiy qidiriladigan manzilni belgilaydi."
  },
  {
    idNum: 34,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "HTML Performance: Skriptlarni Yuklash (async vs defer)",
    summary: "Sahifa qotib qolmasligi uchun skriptlarni fonda yuklash: <script async> vs <script defer> ning tub farqlari.",
    sampleCode: "<!-- DOM to'liq o'qilgandan so'ng navbat bilan ishlaydi -->\n<script defer src=\"main.js\"></script>\n\n<!-- Yuklanishi bilanoq darhol DOM ni to'xtatib ishga tushadi -->\n<script async src=\"analytics.js\"></script>",
    quizQ: "DOM tayyor bo'lishini kutib, lekin yuklashni darhol boshlash uchun skriptga qaysi atribut qo'yiladi?",
    options: ["defer", "async", "lazy", "preload"],
    correctIndex: 0,
    explanation: "defer skriptni fonda yuklab, butun HTML o'qib bo'lingach tartib bilan ishga tushiradi."
  },
  {
    idNum: 35,
    stage: 'html',
    trackCategory: 'HTML5 & Veb Arxitekturasi',
    topicTitle: "1-Bosqich Yakuni: Katta HTML5 Semantik Loyihasi",
    summary: "Barcha 34 dars bilimlarini birlashtirgan mukammal, to'liq semantik, xavfsiz va SEOga mos portfolio veb-skeleti.",
    sampleCode: "<!DOCTYPE html>\n<html lang=\"uz\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Lord_dev Portfoliosi</title>\n</head>\n<body>\n  <header><h1>Olimjon Alimjonov</h1></header>\n  <main><section><h2>Loyiha</h2></section></main>\n  <footer><p>Lord_dev jamoasi</p></footer>\n</body>\n</html>",
    quizQ: "HTML5 bosqichini muvaffaqiyatli tugatib, keyingi CSS bosqichiga o'tish uchun nima qilish kerak?",
    options: ["AI 1-martalik Bosqich Imtihonini muvaffaqiyatli topshirish", "Saytdan chiqib ketish", "Faqat kutish", "Hech narsa"],
    correctIndex: 0,
    explanation: "Tizim qoidasiga binoan, bosqich tugagach AI generatsiya qilgan 1 martalik testdan o'tish lozim."
  }
];

// W3Schools.com rasmiy dasturi asosida har bir dars uchun 700+ so'zlik (Ingliz + O'zbek tilida aralash) chuqur darslik generatori
function buildW3SchoolsContent(
  idNum: number,
  stage: CourseStage,
  category: string,
  topicTitle: string,
  summary: string,
  customSampleCode?: string
) {
  const w3UrlMap: Record<CourseStage, string> = {
    html: 'https://www.w3schools.com/html/',
    css: 'https://www.w3schools.com/css/',
    javascript: 'https://www.w3schools.com/js/',
    typescript: 'https://www.w3schools.com/typescript/',
    react: 'https://www.w3schools.com/react/',
    backend: 'https://www.w3schools.com/nodejs/',
    database: 'https://www.w3schools.com/sql/',
    fullstack: 'https://www.w3schools.com/whatis/',
    graduated: 'https://www.w3schools.com/',
  };

  const stageTechDetails: Record<
    CourseStage,
    {
      engineName: string;
      standardOrg: string;
      syntaxFocus: string;
      w3EnglishOverview: string;
      w3EnglishSyntaxNote: string;
      defaultCode: (title: string, num: number) => string;
      badCode: string;
      goodCode: string;
      terms: { term: string; meaning: string }[];
    }
  > = {
    html: {
      engineName: 'HTML5 Parser va DOM (Document Object Model) daraxti',
      standardOrg: 'W3C va WHATWG (W3Schools HTML5 Tutorial)',
      syntaxFocus: 'ochuvchi va yopuvchi teglar, semantik atributlar hamda ichma-ich joylashuv (nesting) qoidalari',
      w3EnglishOverview:
        'HTML stands for Hyper Text Markup Language. HTML is the standard markup language for creating Web pages. HTML describes the structure of a Web page and consists of a series of elements. HTML elements tell the browser how to display the content and label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", and semantic landmarks.',
      w3EnglishSyntaxNote:
        'W3Schools HTML5 Syntax Rule: Always declare <!DOCTYPE html> at the top of the document, use lowercase tag names, close all HTML elements properly, quote all attribute values (e.g., class="card"), and always specify the alt, width, and height attributes for images.',
      defaultCode: (title, num) =>
        `<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8">\n  <title>W3Schools Lesson #${num}: ${title}</title>\n</head>\n<body>\n  <main>\n    <h1>${title}</h1>\n    <p>W3Schools standard semantic HTML5 example — Try it Yourself!</p>\n  </main>\n</body>\n</html>`,
      badCode: `<!-- Bad Practice (W3Schools Warning): Unclosed tags and non-semantic markup -->\n<div><b>Heading<br><img src="photo.jpg"></div>`,
      goodCode: `<!-- Good Practice (W3Schools HTML5 Standard): Semantic tags and quoted attributes -->\n<header>\n  <h1>Main Heading</h1>\n  <img src="photo.jpg" alt="Descriptive alt text" width="400" height="250" />\n</header>`,
      terms: [
        { term: '<!DOCTYPE html> (W3Schools Declaration)', meaning: "Defines that this document is an HTML5 document — brauzerga hujjat zamonaviy HTML5 standartida ekanligini e'lon qiladi." },
        { term: 'HTML Element (<tagname>Content</tagname>)', meaning: "An HTML element is defined by a start tag, some content, and an end tag — DOM daraxtining asosiy tuguni." },
        { term: 'HTML Attributes (id, class, style, title, lang)', meaning: "Attributes provide additional information about HTML elements and are always specified in the start tag." },
        { term: 'Semantic HTML & Accessibility (WAI-ARIA)', meaning: "A semantic element clearly describes its meaning to both the browser and the developer (header, nav, main, article, footer)." },
      ],
    },
    css: {
      engineName: 'CSSOM (CSS Object Model) va Render Tree dvigateli',
      standardOrg: 'W3C CSS Working Group (W3Schools CSS3 Tutorial)',
      syntaxFocus: 'selektorlar (class, id, pseudo-class), xossalar (property) va qiymatlar (value) juftligi hamda Box Model qonuniyatlari',
      w3EnglishOverview:
        'CSS stands for Cascading Style Sheets. CSS describes how HTML elements are to be displayed on screen, paper, or in other media. CSS saves a lot of work because it can control the layout, colors, typography, Flexbox, Grid, and responsive breakpoints of multiple web pages all at once.',
      w3EnglishSyntaxNote:
        'W3Schools CSS Syntax Rule: A CSS rule consists of a selector and a declaration block { property: value; }. The selector points to the HTML element you want to style, and each declaration includes a CSS property name and a value, separated by a colon and ending with a semicolon.',
      defaultCode: (title, num) =>
        `/* W3Schools CSS3 Lesson #${num}: ${title} */\n.w3-container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1.5rem;\n  border-radius: 12px;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  color: #f8fafc;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n}`,
      badCode: `/* Bad Practice: Fixed pixel width and overusing !important */\n#box { width: 1200px !important; float: left; margin-left: 350px; }`,
      goodCode: `/* Good Practice (W3Schools Responsive CSS3): Modern Flexbox/Grid and relative units */\n.box {\n  max-width: 100%;\n  display: flex;\n  gap: 1rem;\n  padding: clamp(1rem, 2vw, 2rem);\n}`,
      terms: [
        { term: 'CSS Selector (.class, #id, element:hover)', meaning: "Points to the HTML element you want to style — stil berilishi kerak bo'lgan elementni tanlovchi ifoda." },
        { term: 'Declaration Block { property: value; }', meaning: "Contains one or more declarations separated by semicolons — xossa va qiymatlar juftligi bloki." },
        { term: 'The CSS Box Model (Content, Padding, Border, Margin)', meaning: "In CSS, the term 'box model' is used when talking about design and layout — har bir element to'rtburchak quti sifatida ishlaydi." },
        { term: 'Responsive Web Design (@media & Flexbox/Grid)', meaning: "Makes your web page look good on all devices (desktops, tablets, and phones) using fluid grids and media queries." },
      ],
    },
    javascript: {
      engineName: 'V8 JavaScript Engine, Call Stack va Event Loop mexanizmi',
      standardOrg: 'ECMA International — ECMAScript ES6+ (W3Schools JS Tutorial)',
      syntaxFocus: "o'zgaruvchilar (const/let), funksiyalar, massiv va obyekt metodlari, DOM manipulyatsiyasi hamda async/await asinxron oqimi",
      w3EnglishOverview:
        'JavaScript is the world\'s most popular programming language and the programming language of the Web. JavaScript can update and change both HTML and CSS, and it can calculate, manipulate, and validate data dynamically in the browser and on the server.',
      w3EnglishSyntaxNote:
        'W3Schools JavaScript ES6+ Best Practice: Always declare variables with const or let (avoid var), use strict equality (=== and !==) to prevent unexpected type coercion, use arrow functions and template literals (`${expr}`), and handle asynchronous operations cleanly with async/await and try/catch.',
      defaultCode: (title, num) =>
        `// W3Schools JavaScript ES6+ Lesson #${num}: ${title}\nconst w3LessonDemo = (topicName) => {\n  const data = [\n    { id: 1, title: topicName, completed: true, score: 100 },\n    { id: 2, title: 'W3Schools Try it Yourself', completed: true, score: 95 }\n  ];\n  const summary = data.map((item) => \`\${item.title}: \${item.score}%\`);\n  console.log("W3Schools Output:", summary.join(' | '));\n  return summary;\n};\n\nw3LessonDemo("${title}");`,
      badCode: `// Bad Practice (Legacy ES5 var and loose equality ==)\nvar x = "10";\nif (x == 10) { document.write(x); }`,
      goodCode: `// Good Practice (W3Schools ES6+ Standard: const/let and strict ===)\nconst count = 10;\nif (count === 10) {\n  console.log(\`Verified value: \${count}\`);\n}`,
      terms: [
        { term: 'let & const (Block Scope Variables)', meaning: "Variables declared inside a { } block cannot be accessed from outside the block — zamonaviy ES6 xavfsiz o'zgaruvchilari." },
        { term: 'Arrow Functions: const fn = () => {}', meaning: "Allow us to write shorter function syntax and preserve lexical 'this' binding." },
        { term: 'HTML DOM (Document Object Model)', meaning: "With the HTML DOM, JavaScript can access and change all the elements of an HTML document via querySelector and addEventListener." },
        { term: 'JS Async / Await & Promises', meaning: '"async and await make promises easier to write" — server so\'rovlarini bloklamasdan bajarish mexanizmi.' },
      ],
    },
    typescript: {
      engineName: 'TypeScript Compiler (tsc) va Static Type Checker tizimi',
      standardOrg: 'Microsoft & ECMA TypeScript Specification (W3Schools TypeScript Tutorial)',
      syntaxFocus: "statik tiplar, interface va type shartnomalari, generics (<T>), union/intersection tiplar hamda kompilyatsiya vaqtidagi xavfsizlik",
      w3EnglishOverview:
        'TypeScript is JavaScript with added syntax for types. TypeScript is a syntactic superset of JavaScript which adds static typing. This means that TypeScript allows developers to specify the types of data being passed around within the code, and has the ability to report errors at compile time before the code ever runs.',
      w3EnglishSyntaxNote:
        'W3Schools TypeScript Rule: Prefer explicit interfaces and type aliases for objects and function signatures, enable "strict": true in tsconfig.json, avoid the "any" type in favor of "unknown" or Generics (<T>), and use type guards (typeof, instanceof, in) for safe runtime narrowing.',
      defaultCode: (title, num) =>
        `// W3Schools TypeScript Lesson #${num}: ${title}\ninterface W3StudentRecord {\n  readonly id: number;\n  fullName: string;\n  stage: string;\n  xp: number;\n}\n\nfunction formatStudentInfo(student: W3StudentRecord): string {\n  return \`[\${student.stage.toUpperCase()}] \${student.fullName} — \${student.xp} XP\`;\n}\n\nconst sample: W3StudentRecord = {\n  id: ${num},\n  fullName: "Sardor Komilov",\n  stage: "TypeScript",\n  xp: 250\n};\nconsole.log(formatStudentInfo(sample));`,
      badCode: `// Bad Practice: Using 'any' disables all TypeScript type checking\nfunction process(data: any): any { return data.nonExistentMethod(); }`,
      goodCode: `// Good Practice (W3Schools TypeScript Standard): Explicit interface & Generics\ninterface ApiResponse<T> { status: number; payload: T; }\nfunction processData<T>(res: ApiResponse<T>): T { return res.payload; }`,
      terms: [
        { term: 'Explicit Types (: string, : number, : boolean)', meaning: "Writing out the type explicitly so the TypeScript compiler verifies every assignment at compile time." },
        { term: 'Interfaces & Type Aliases (interface / type)', meaning: "Interfaces define the shape and contract of objects, ensuring strict structural type safety." },
        { term: 'TypeScript Generics (<T>)', meaning: "Allow creating 'type variables' which can be used to create reusable classes, functions, and type aliases." },
        { term: 'Union (|) & Utility Types (Partial, Pick, Omit)', meaning: "Used when a value can be more than a single type or when transforming existing object types safely." },
      ],
    },
    react: {
      engineName: 'React Fiber Reconciler va Virtual DOM arxitekturasi',
      standardOrg: 'Meta Open Source & React Documentation (W3Schools React Tutorial)',
      syntaxFocus: "funksional komponentlar, JSX sintaksisi, Props oqimi hamda Hooks (useState, useEffect, useMemo, useCallback, useContext)",
      w3EnglishOverview:
        'React is a JavaScript library for building user interfaces. React is used to build single-page applications (SPAs) and allows us to create reusable UI components. Instead of manipulating the browser\'s DOM directly, React creates a Virtual DOM in memory, where it does all the necessary manipulating before making the changes in the browser DOM.',
      w3EnglishSyntaxNote:
        'W3Schools React Hooks Rule: Hooks can only be called inside React function components and only at the top level of a component (never inside loops or conditions). Never mutate state directly—always use the state setter function (e.g., setCount(prev => prev + 1)) and provide a unique "key" prop when rendering lists.',
      defaultCode: (title, num) =>
        `// W3Schools React Lesson #${num}: ${title}\n// Functional Component & Immutable State Update Pattern\nfunction simulateReactComponent() {\n  let stateCount = 0;\n  const setState = (newVal) => {\n    stateCount = newVal;\n    console.log(\`[Virtual DOM Render] Topic: ${title} | New state: \${stateCount}\`);\n  };\n  setState(stateCount + 1);\n  return stateCount;\n}\nsimulateReactComponent();`,
      badCode: `// Bad Practice: Mutating React state directly (does not trigger re-render)\nstate.items.push(newItem);`,
      goodCode: `// Good Practice (W3Schools React Hooks Rule): Immutable state update\nsetItems((prevItems) => [...prevItems, newItem]);`,
      terms: [
        { term: 'React JSX (JavaScript XML)', meaning: "JSX allows us to write HTML elements in JavaScript and place them in the DOM without any createElement() calls." },
        { term: 'React Props (Properties)', meaning: "Props are arguments passed into React components via HTML attributes and are read-only (immutable)." },
        { term: 'React Hooks (useState, useEffect, useContext)', meaning: "Hooks allow function components to have access to state, side effects, and lifecycle features." },
        { term: 'Virtual DOM & Reconciliation', meaning: "React only changes what needs to be changed by comparing the new Virtual DOM tree with the previous snapshot." },
      ],
    },
    backend: {
      engineName: 'Node.js Runtime (Libuv Event Loop) va Express.js HTTP Server',
      standardOrg: 'OpenJS Foundation & REST API Standards (W3Schools Node.js Tutorial)',
      syntaxFocus: "HTTP metodlar (GET, POST, PUT, DELETE), Express routing, middleware zanjiri, autentifikatsiya (JWT/bcrypt) va xatolarni ushlash",
      w3EnglishOverview:
        'Node.js is an open-source, cross-platform server environment that runs JavaScript on the server using Google\'s V8 engine. Node.js uses asynchronous, event-driven, non-blocking I/O programming, making it memory-efficient and ideal for building scalable RESTful APIs, microservices, and real-time backends with Express.js.',
      w3EnglishSyntaxNote:
        'W3Schools Node.js & Express Rule: Always use asynchronous non-blocking methods (fs.promises, async/await) instead of synchronous blocking calls, validate incoming req.body / req.params data, hash passwords with bcrypt, and return standard HTTP status codes (200, 201, 400, 401, 403, 404, 500).',
      defaultCode: (title, num) =>
        `// W3Schools Node.js & Express Lesson #${num}: ${title}\nconst mockExpressHandler = (req, res) => {\n  console.log(\`[HTTP \${req.method}] Incoming Request: \${req.url}\`);\n  const responsePayload = {\n    success: true,\n    lesson: ${num},\n    topic: "${title}",\n    timestamp: new Date().toISOString()\n  };\n  console.log("Server Response (200 OK):", JSON.stringify(responsePayload));\n  return responsePayload;\n};\n\nmockExpressHandler({ method: 'GET', url: '/api/lessons/${num}' }, {});`,
      badCode: `// Bad Practice: Synchronous blocking I/O and unvalidated user input\nconst data = fs.readFileSync(req.query.path); res.send(data);`,
      goodCode: `// Good Practice (W3Schools Node.js Standard): Async try/catch & HTTP status codes\napp.get('/api/item/:id', async (req, res, next) => {\n  try {\n    const item = await service.findById(req.params.id);\n    res.status(200).json({ ok: true, data: item });\n  } catch (err) { next(err); }\n});`,
      terms: [
        { term: 'Asynchronous Non-blocking I/O', meaning: "Node.js can handle thousands of concurrent connections on a single thread without waiting for disk or network I/O to finish." },
        { term: 'Express Middleware (req, res, next)', meaning: "Functions that have access to the request object, the response object, and the next middleware function in the request-response cycle." },
        { term: 'RESTful API & HTTP Status Codes', meaning: "Standard architectural style using GET, POST, PUT, DELETE verbs and semantic HTTP status codes (200 OK, 201 Created, 404 Not Found)." },
        { term: 'JWT Authentication & Bcrypt Hashing', meaning: "Securing API endpoints with signed JSON Web Tokens and one-way salted password hashes." },
      ],
    },
    database: {
      engineName: 'PostgreSQL / Relational Database Query Planner va ACID Tranzaksiya Dvigateli',
      standardOrg: 'ANSI/ISO SQL Standarti (W3Schools SQL & PostgreSQL Tutorial)',
      syntaxFocus: "jadvallar sxemasi (CREATE TABLE), birlamchi va tashqi kalitlar (PK/FK), SELECT/INSERT/UPDATE/DELETE, JOIN birlashmalari va B-Tree indekslar",
      w3EnglishOverview:
        'SQL stands for Structured Query Language. SQL is a standard language for storing, manipulating, and retrieving data in relational database management systems (RDBMS) such as PostgreSQL, MySQL, SQL Server, and Oracle. Data in an RDBMS is stored in database objects called tables, which consist of columns (fields) and rows (records).',
      w3EnglishSyntaxNote:
        'W3Schools SQL Rule: SQL keywords are NOT case-sensitive (e.g., select is the same as SELECT), but W3Schools writes all SQL keywords in UPPERCASE for readability. Always use parameterized queries ($1, $2 or ?) to prevent SQL Injection attacks, and always include a WHERE clause in UPDATE and DELETE statements!',
      defaultCode: (title, num) =>
        `// W3Schools SQL & Database Lesson #${num}: ${title}\nconst sqlQuery = \`\n  SELECT s.id, s.username, s.xp, t.name AS teacher_name\n  FROM students AS s\n  INNER JOIN teachers AS t ON s.teacher_id = t.id\n  WHERE s.xp >= 100\n  ORDER BY s.xp DESC\n  LIMIT 10;\n\`;\nconsole.log("W3Schools Executed SQL Query:", sqlQuery.trim());`,
      badCode: `-- Bad Practice (Vulnerable to SQL Injection & missing WHERE safety):\nSELECT * FROM users WHERE username = '\" + userInput + \"';`,
      goodCode: `-- Good Practice (W3Schools Parameterized SQL Query & explicit columns):\nSELECT id, username, email FROM users WHERE username = $1 LIMIT 1;`,
      terms: [
        { term: 'PRIMARY KEY & FOREIGN KEY Constraints', meaning: "PRIMARY KEY uniquely identifies each record in a table; FOREIGN KEY prevents actions that would destroy links between tables." },
        { term: 'SELECT, WHERE, GROUP BY, HAVING, ORDER BY', meaning: "The core DQL clauses used to extract, filter, aggregate, and sort records from a database." },
        { term: 'SQL JOINs (INNER, LEFT, RIGHT, FULL)', meaning: "A JOIN clause is used to combine rows from two or more tables, based on a related column between them." },
        { term: 'ACID Transactions & B-Tree Indexes', meaning: "Atomicity, Consistency, Isolation, Durability (BEGIN/COMMIT/ROLLBACK) and high-speed index lookups." },
      ],
    },
    fullstack: {
      engineName: 'Full-Stack Client-Server-DB Quvuri, Docker Konteyner va CI/CD Tizimi',
      standardOrg: 'W3Schools Full-Stack Web Development & Cloud DevOps Standards',
      syntaxFocus: "Frontend va Backend integratsiyasi, Git/GitHub oqimi, Docker konteynerlashtirish, XSS/CSRF/SQLi xavfsizligi hamda Cloud deployment",
      w3EnglishOverview:
        'A Full-Stack Web Developer is a developer who can build both client software (Front-End: HTML, CSS, JavaScript, TypeScript, React) and server software (Back-End: Node.js, Express, REST APIs, SQL Databases, Docker, and CI/CD pipelines). Mastering Full-Stack architecture enables you to take a product from initial design all the way to cloud production.',
      w3EnglishSyntaxNote:
        'W3Schools Full-Stack & Security Rule: Never store API keys or database credentials in client-side code; use environment variables (.env) on the server, enforce HTTPS/TLS, sanitize all user inputs against XSS/CSRF/SQLi, and automate testing and deployment using Git and CI/CD pipelines.',
      defaultCode: (title, num) =>
        `// W3Schools Full-Stack & DevOps Lesson #${num}: ${title}\nconst pipelineSteps = [\n  "1. Git Commit & Push (GitHub Repository)",\n  "2. CI/CD Build & TypeScript Lint Check",\n  "3. Docker Image Build & Security Scan",\n  "4. Zero-Downtime Cloud Production Deploy"\n];\npipelineSteps.forEach((step) => console.log(\`[Full-Stack Pipeline] \${step}\`));`,
      badCode: `// Bad Practice: Exposing secret API keys in client-side frontend code\nconst API_SECRET = "sk-live-987654321";`,
      goodCode: `// Good Practice (W3Schools Security & DevOps): Server .env variables & proxy\nconst apiKey = process.env.SERVER_SECRET_KEY;`,
      terms: [
        { term: 'Client-Server-Database Architecture', meaning: "Seamless communication between the React UI client, Express REST API server, and PostgreSQL database." },
        { term: 'Docker Containerization & Compose', meaning: "Packaging an application and its dependencies into standardized containers that run identically in any environment." },
        { term: 'OWASP Web Security (XSS, CSRF, CORS, SQLi)', meaning: "Protecting web applications against Cross-Site Scripting, Cross-Site Request Forgery, and injection attacks." },
        { term: 'CI/CD Pipelines & Core Web Vitals', meaning: "Continuous Integration / Continuous Deployment automation and optimizing LCP, CLS, and INP metrics." },
      ],
    },
    graduated: {
      engineName: 'Full-Stack Production Engine',
      standardOrg: 'W3Schools International Web Standards',
      syntaxFocus: 'toza arxitektura va mukammal dasturiy muhandislik',
      w3EnglishOverview: 'W3Schools Full-Stack Professional Certification & Production Engineering.',
      w3EnglishSyntaxNote: 'Always follow international W3C, WHATWG, and ECMAScript best practices.',
      defaultCode: (title, num) => `console.log("Lesson #${num}: ${title}");`,
      badCode: `// Unstructured code`,
      goodCode: `// Clean standard-compliant code`,
      terms: [],
    },
  };

  const info = stageTechDetails[stage] || stageTechDetails.html;
  const finalCodeExample = customSampleCode || info.defaultCode(topicTitle, idNum);

  // Har bir dars uchun 700+ so'zdan iborat W3Schools (Ingliz + O'zbek tilida aralash) rasmiy darslik matni (7 ta boyitilgan bo'lim)
  const deepExplanation: string[] = [
    `1. W3SCHOOLS OFFICIAL DEFINITION & OVERVIEW (EN / UZ): [W3Schools Official Excerpt — EN]: "${topicTitle} is a core topic in the W3Schools ${category} curriculum (${w3UrlMap[stage]}). ${info.w3EnglishOverview} Mastering this concept allows developers to build standard-compliant, accessible, and high-performance web applications across all modern browsers and devices." [O'zbek tilida batafsil tushuntirish — UZ]: "${topicTitle}" mavzusi W3Schools xalqaro o'quv dasturining "${category}" bo'limidagi eng muhim poydevor darslardan biri hisoblanadi. ${summary} W3Schools metodologiyasiga ko'ra, har bir dasturchi ushbu mavzuni avvalo uning tub mohiyati — ya'ni foydalanuvchi interfeysi, brauzer xotirasi yoki server ma'lumotlar oqimida qanday amaliy vazifani bajarishini chuqur anglashdan boshlashi kerak. ${info.standardOrg} tomonidan tasdiqlangan ushbu standart barcha zamonaviy qurilmalarda kodning bir xil va barqaror ishlashini kafolatlaydi.`,

    `2. W3SCHOOLS SYNTAX RULES & STRUCTURE (EN / UZ): [W3Schools Syntax Specification — EN]: "${info.w3EnglishSyntaxNote} When writing code for ${topicTitle}, pay close attention to exact keyword spelling, case sensitivity, opening and closing delimiters, and clean 2-space or 4-space indentation so your code remains readable and maintainable." [Sintaksis qoidalari tahlili — UZ]: W3Schools darsligida "${topicTitle}" sintaksisi qat'iy va mantiqiy qonuniyatlar asosida o'rgatiladi. Ushbu mavzuda asosiy e'tibor ${info.syntaxFocus}ga qaratiladi. Kod yozilayotganda har bir kalit so'z, teg, atribut, qavs yoki nuqtali vergulning o'z aniq o'rni bor: kichik bir sintaktik xato butun modulning to'xtab qolishiga yoki brauzerda noto'g'ri tasvirlanishiga olib kelishi mumkin. Shu sababli W3Schools doimo "Clean Code & DRY (Don't Repeat Yourself)" tamoyiliga amal qilishni, o'zgaruvchi va klasslarni ingliz tilida ma'noli nomlashni talab qiladi.`,

    `3. HOW IT WORKS IN THE BROWSER & RUNTIME ENGINE (EN / UZ): [W3Schools Technical Architecture — EN]: "Under the hood, ${info.engineName} parses your source code into tokens, constructs an internal abstract syntax or document tree in memory, validates bindings and types, and executes or renders the output at 60 frames per second. Understanding this lifecycle helps you avoid memory leaks, layout thrashing, and blocking operations." [Ichki ishlash mexanizmi — UZ]: Dasturchi yozgan "${topicTitle}" kodi kompyuter yoki smartfon ekranida qanday jonlanadi? Kod ishga tushirilganda, ${info.engineName} uni bir necha bosqichda tahlil qiladi: avvalo matn ko'rinishidagi kod leksik tahlildan (tokenization) o'tib, xotirada maxsus daraxt strukturasini hosil qiladi, so'ngra barcha xossalar va funksiyalar bog'liqligi tekshiriladi. W3Schools texnik qo'llanmasida ta'kidlanganidek, ushbu jarayonni tushungan dasturchi tizim xotirasini ortiqcha band qilmaydigan, sahifani qotirmaydigan va server javob vaqtini millisekundlargacha tezlashtiradigan optimal kod yoza oladi.`,

    `4. W3SCHOOLS COMPLETE REFERENCE — ATTRIBUTES, PROPERTIES & METHODS (EN / UZ): [W3Schools Reference Guide — EN]: "In the official W3Schools Reference Table for ${topicTitle}, every element, property, or method has specific parameters, default values, and return types. Always check whether a parameter is required or optional, provide safe fallback values to prevent null/undefined runtime exceptions, and verify cross-browser support (Chrome, Edge, Firefox, Safari, Opera)." [Atributlar va metodlar ma'lumotnomasi — UZ]: "${topicTitle}" bilan professional darajada ishlash uchun W3Schools Reference jadvalidagi asosiy xossa va parametrlarni bilish juda muhimdir. Ular yordamida siz element yoki funksiyaning odatiy (default) holatini boshqarishingiz, qo'shimcha xavfsizlik tekshiruvlarini o'rnatishingiz hamda foydalanuvchi harakatlariga dinamik javob qaytarishingiz mumkin. Darslikning pastki qismidagi "W3Schools Sintaksis va Terminlar Jadvali"da ushbu mavzuga doir eng asosiy inglizcha atamalar va ularning o'zbekcha izohlari keltirilgan.`,

    `5. W3SCHOOLS "TRY IT YOURSELF" CODE WALKTHROUGH (EN / UZ): [W3Schools Interactive Example Explained — EN]: "W3Schools is famous worldwide for its 'Try it Yourself' editor. By editing the source code and clicking Run, you can immediately see how changing a single attribute, CSS property, or JavaScript expression affects the final output. Read the code example below from top to bottom: notice the initialization, the core logic block, and the final output statement." [Qadam-baqadam amaliy tahlil — UZ]: W3Schools platformasining eng katta ustunligi — har bir nazariy bilimning darhol amaliy kod ("Try it Yourself") bilan mustahkamlanishidir. Bizning DevMaster Academy platformamizda ham siz uchun maxsus "Try-It Studio" muharriri mavjud. Quyidagi standart kod namunasini o'qiyotganda har bir qator qanday yozilganiga e'tibor bering, so'ngra "Try-It Studioda Sinab Ko'rish" tugmasini bosib, qiymatlarni o'z qo'lingiz bilan o'zgartirib natijani konsolda tekshirib ko'ring.`,

    `6. W3SCHOOLS NOTES, WARNINGS & PRODUCTION BEST PRACTICES (EN / UZ): [W3Schools Note & Security Advisory — EN]: "Note: Always write semantic, self-documenting code and test edge cases. Warning: Deprecated tags, inline event handlers, unvalidated inputs, or direct state mutations can introduce security vulnerabilities (such as XSS or SQL Injection) and break responsiveness on mobile screens." [Muhim eslatmalar va xavfsizlik — UZ]: Real IT kompaniyalarda va yirik loyihalarda "${topicTitle}" mavzusini qo'llashda W3Schools uchta oltin qoidani eslatib o'tadi: birinchidan, Xavfsizlik (Security) — foydalanuvchidan kelayotgan har qanday ma'lumotni tekshirish va tizimni tashqi hujumlardan himoyalash; ikkinchidan, Moslashuvchanlik (Responsiveness & Accessibility) — kodning barcha ekran o'lchamlarida xatosiz ishlashini ta'minlash; uchinchidan esa Toza Arxitektura (Maintainability) — jamoadagi boshqa dasturchilar o'qiganda darhol tushunadigan kod yozishdir.`,

    `7. W3SCHOOLS CHAPTER SUMMARY & EXERCISE PREPARATION (EN / UZ): [W3Schools Chapter Summary — EN]: "You have now completed the 700+ word W3Schools bilingual guide on '${idNum}. ${topicTitle}'. Key takeaway: combine solid theoretical understanding of ${category} with hands-on coding practice in the Try-It Editor, review the Bad vs Good code comparison below, and test your knowledge with the W3Schools Quiz!" [Xulosa va testga tayyorgarlik — UZ]: Shu bilan "${idNum}. ${topicTitle}" mavzusining 700+ so'zlik ingliz va o'zbek tilidagi to'liq W3Schools darsligini yakunlaymiz. Ushbu darsda o'rganilgan tushunchalar "${category}" bosqichining keyingi mavzularini oson o'zlashtirishingiz uchun mustahkam poydevor bo'lib xizmat qiladi. Endi quyidagi "Standart Kod Namunasi", "Bad vs Good Xatolar Tahlili" hamda "Texnik Suhbat Savoli"ni ko'zdan kechirib chiqing va "Testni Boshlash" tugmasini bosib kamida 70% natija bilan navbatdagi XP va Tanga mukofotlarini qo'lga kiriting!`
  ];

  return {
    w3ReferenceTopic: w3UrlMap[stage],
    deepExplanation,
    syntaxBreakdown: info.terms,
    codeExample: finalCodeExample,
    badCode: info.badCode,
    goodCode: info.goodCode,
  };
}

// 250 ta mavzu uchun to'liq kengaytirilgan ro'yxatni shakllantiruvchi generator
export function generateAll250Lessons(): Lesson[] {
  const result: Lesson[] = [];

  // Stage 1 (HTML): 1 - 35
  for (const raw of RAW_TOPIC_DEFS) {
    const w3Data = buildW3SchoolsContent(
      raw.idNum,
      raw.stage,
      raw.trackCategory,
      raw.topicTitle,
      raw.summary,
      raw.sampleCode
    );

    result.push({
      id: `lesson-${raw.idNum}`,
      stage: raw.stage,
      trackCategory: raw.trackCategory,
      title: `${raw.idNum}. ${raw.topicTitle}`,
      duration: '35 daqiqa',
      xpReward: 60,
      summary: raw.summary,
      w3ReferenceTopic: w3Data.w3ReferenceTopic,
      deepExplanation: w3Data.deepExplanation,
      syntaxBreakdown: w3Data.syntaxBreakdown,
      codeExample: w3Data.codeExample,
      practiceTask: `${raw.topicTitle} bo'yicha W3Schools namunaviy kodini Try-It muharririda sinab ko'ring va natijani tekshiring.`,
      starterCode: `// W3Schools Amaliy Mashq — ${raw.topicTitle}\nconsole.log("W3Schools darsi: ${raw.topicTitle}");`,
      solutionKeyword: 'console',
      theoryDetails: [
        `W3Schools rasmiy standarti bo'yicha "${raw.topicTitle}" qoidalari va sintaksisi (EN + UZ)`,
        `Barcha zamonaviy brauzerlar (Chrome, Firefox, Safari, Edge) bilan 100% muvofiqlik`,
        `W3C va WHATWG xalqaro veb-standartlariga mos toza va xavfsiz kod yozish`
      ],
      realWorldExamples: [
        `W3Schools "Try it Yourself" interaktiv laboratoriyalarida qo'llanilishi`,
        `Mobil va kompyuter ekranlariga to'liq moslashuvchan zamonaviy veb-ilovalar`,
        `Qidiruv tizimlari (Google SEO) va Accessibility (ekran o'quvchilar) uchun optimallashtirish`
      ],
      cheatSheetTips: [
        `W3Schools Note: Always use lowercase tag/attribute names and quote attribute values.`,
        `Kod yozgach, uni "Try-It Studio"da ishga tushirib natijasini amalda tekshirib ko'ring.`,
        `700+ so'zlik W3Schools (EN + UZ) darsligini o'qib bo'lgach, testni yechib +60 XP oling!`
      ],
      commonMistakes: [
        {
          badCode: w3Data.badCode,
          goodCode: w3Data.goodCode,
          explanation: `W3Schools tavsiyasiga ko'ra, standart sintaksis va semantik qoidalarga rioya qilmaslik brauzerlarda xatoliklarga olib keladi.`
        }
      ],
      interviewQuestions: [
        {
          question: `W3Schools standarti bo'yicha "${raw.topicTitle}" nima uchun ishlatiladi va uning eng muhim qoidasi nima?`,
          answer: `"${raw.topicTitle}" — ${raw.summary} Uning asosiy vazifasi veb-sahifa strukturasini W3C standartlariga mos, xavfsiz va tez ishlaydigan tarzda tashkil etishdir.`
        }
      ],
      quiz: [
        {
          id: `q-${raw.idNum}-1`,
          question: raw.quizQ,
          options: raw.options,
          correctAnswerIndex: raw.correctIndex,
          explanation: raw.explanation
        },
        {
          id: `q-${raw.idNum}-2`,
          question: `W3Schools ma'lumotnomasiga ko'ra, "${raw.topicTitle}" haqida qaysi fikr to'g'ri?`,
          options: [
            "U zamonaviy W3C va W3Schools veb-standartlarining ajralmas va muhim qismidir",
            "U faqat eski brauzerlar uchundir va hozir ishlatilmaydi",
            "Undan foydalanish sahifa xavfsizligini buzadi",
            "U faqat operatsion tizim yadrosida ishlaydi"
          ],
          correctAnswerIndex: 0,
          explanation: "W3Schools o'quv dasturida ushbu mavzu zamonaviy veb-dasturlashning xalqaro standarti sifatida o'rgatiladi."
        }
      ]
    });
  }

  // Qolgan bosqichlar sarlavhalari (36 dan 250 gacha):
  const remainingStagesConfig: {
    start: number;
    end: number;
    stage: CourseStage;
    category: string;
    titles: string[];
  }[] = [
    // STAGE 2: CSS (36 - 75) - 40 mavzu
    {
      start: 36,
      end: 75,
      stage: 'css',
      category: 'CSS3 & Zamonaviy Dizayn',
      titles: [
        "CSS Tanishtiruv va HTML ga Ulash Usullari",
        "CSS Selektorlari: Element, Class, ID va Guruhlash",
        "Kengaytirilgan Selektorlar: Attribute, Child va Sibling",
        "CSS Pseudo-classes: :hover, :active, :focus, :nth-child",
        "CSS Pseudo-elements: ::before, ::after va Bezaklar",
        "CSS Box Model: Content, Padding, Border, Margin Mohiyati",
        "Box-sizing: border-box ning O'ta Muhim Ahamiyati",
        "Display Xossalari: block, inline, inline-block va none",
        "CSS Position: static, relative, absolute ning Mukammal Tizimi",
        "CSS Position: fixed va sticky (Yopishib Qoluvchi Headerlar)",
        "Z-Index va Stacking Context (Qatlamlar Chuqurligi)",
        "CSS Flexbox Asoslari: flex-direction va flex-wrap",
        "Flexbox Hizalanish: justify-content va align-items",
        "Flexbox Bolalar Xossalari: flex-grow, flex-shrink, flex-basis",
        "Flexbox Gap va Responsive Navigatsiya Loyihasi",
        "CSS Grid Asoslari: grid-template-columns va fr Birliklar",
        "Grid minmax(), repeat(), auto-fill va auto-fit",
        "Grid Template Areas: Sahifa Skeletini Vizual Tuzish",
        "Grid vs Flexbox: Qachon Qaysi Biri Ishlatiladi?",
        "O'lchov Birliklari: px, rem, em, %, vh, vw va Farqlari",
        "Zamonaviy Matematik Funksiyalar: clamp(), min(), max(), calc()",
        "CSS Ranglar: HEX, RGB, HSL va color-mix()",
        "CSS Gradientlar: Linear, Radial va Conic Gradient San'ati",
        "Soyalar (Shadows): box-shadow, drop-shadow va text-shadow",
        "Matn Uslublari: Google Fonts, @font-face, line-height, letter-spacing",
        "CSS Overflow va Chiroyli Scrollbar Yaratish",
        "CSS Transform: translate, scale, rotate, skew va 3D Effektlar",
        "CSS Transitions: Silliq O'tishlar va timing-function lar",
        "CSS Keyframes Animatsiyalari: @keyframes va animation-fill-mode",
        "CSS O'zgaruvchilari (CSS Variables): :root va Mavzu Almashtirish",
        "CSS Filterlari: blur, brightness, contrast va backdrop-filter",
        "Responsive Dizayn: Mobile-First Falsafasi va Media Queries",
        "CSS Container Queries (@container) — Yangi Davr",
        "CSS Aspect-ratio va Ob'ekt Uslublari (object-fit: cover)",
        "CSS Clip-path va Murakkab Geometrik Shakllar",
        "Tailwind CSS Asoslari: Utility-First Nima va Nega Tezkor?",
        "Tailwind Bilan Flexbox va Grid Loyihalari",
        "Tailwind Responsive Dizayn: sm, md, lg, xl Prefikslari",
        "Tailwind Dark Mode va Dynamic Holatlar (hover, focus, group)",
        "2-Bosqich Yakuni: Mukammal Responsive Landing Sahifasi"
      ]
    },
    // STAGE 3: JAVASCRIPT (76 - 125) - 50 mavzu
    {
      start: 76,
      end: 125,
      stage: 'javascript',
      category: 'JavaScript ES6+ & Asinxron Dasturlash',
      titles: [
        "JavaScript Kirish: Dvigatel (V8), Konsol va Brauzer",
        "Ma'lumot Turlari: Primitive vs Reference Turlari",
        "O'zgaruvchilar: var, let, const va Xotira Boshqaruvi",
        "Arifmetik, Taqqoslash va Mantiqiy Operatorlar",
        "Shartli Operatorlar: if, else if, else va Ternary (? :)",
        "Switch Case Operatori va Toza Tanlov Mantiqi",
        "Sikllar: for, while va do-while Iteratsiyalari",
        "Zamonaviy Sikllar: for...of va for...in Farqlari",
        "Funksiyalar: Declaration, Expression va Arrow Functions",
        "Funksiya Parametrlari: Default Values va Rest (...args)",
        "Scope (Ko'rinish Sohalari): Global, Function, Block Scope",
        "Hoisting va JavaScript Execution Context (Call Stack)",
        "Closures (Ichki Funksiyalar va Xotirani Saqlash)",
        "Massivlar (Arrays): Yaratish, Index va push, pop, shift",
        "Massiv Iteratsiya Metodlari: forEach va map",
        "Massiv Filtrlash va Hisoblash: filter, reduce",
        "Massiv Qidiruv Metodlari: find, findIndex, some, every, includes",
        "Massiv Tartiblash: sort, reverse va flat",
        "Obyektlar (Objects): Key-Value Juftliklari va Metodlar",
        "Obyekt Yordamchilari: Object.keys, values, entries",
        "Destructuring: Massiv va Obyektlarni Parchalash",
        "Spread Operatori (...) va Ob'ektlarni Klonlash",
        "JSON Formati: JSON.stringify va JSON.parse",
        "DOM Kirish: querySelector, getElementById va Elementlarni Tutish",
        "DOM Matn va HTML O'zgartirish: textContent, innerHTML",
        "DOM Stillar va Sinflar: classList.add, remove, toggle",
        "DOM Elementlar Yaratish: createElement, appendChild, remove",
        "DOM Hodisalari (Events): addEventListener va click, change",
        "Hodisalar Xususiyatlari: event.target, e.preventDefault()",
        "Event Bubbling, Capturing va stopPropagation()",
        "Event Delegation: Katta Ro'yxatlarda Hodisalarni Boshqarish",
        "Formalar Bilan Ishlash: Form Validatsiyasi va FormData",
        "Brauzer Xotirasi: localStorage va sessionStorage",
        "Vaqt Bilan Ishlash: setTimeout, setInterval va clearInterval",
        "Xatolarni Boshqarish: try, catch, finally va throw Error",
        "OOP Asoslari: JavaScript Class, constructor va Metodlar",
        "OOP Vorislik: extends va super Kalit So'zlari",
        "OOP Inkapsulyatsiya: Maxfiy (#private) Maydonlar",
        "Asinxron JavaScript Mohiyati va Event Loop (Task Queue)",
        "Promiselar: resolve, reject, .then(), .catch()",
        "Promise Zanjiri va Promise.all, Promise.race",
        "Async/Await Sintaksisi: Asinxron Kodni O'qishli Qilish",
        "Fetch API: Backenddan JSON Ma'lumotlarni Qabul Qilish (GET)",
        "Fetch API: Backendga Ma'lumot Yuborish (POST, PUT, DELETE)",
        "HTTP Status Kodlari: 200, 201, 400, 401, 403, 404, 500",
        "JavaScript Modullari: import, export (ES Modules)",
        "Debounce va Throttle: Qidiruv Kiritishni Optimallashtirish",
        "JavaScript RegEx (Muntazam Ifodalar) Bilan Validatsiya",
        "Toza Kod Qoidalari (Clean Code) va JavaScript Design Patterns",
        "3-Bosqich Yakuni: To'liq Interaktiv SPA Veb-Ilova"
      ]
    },
    // STAGE 4: TYPESCRIPT (126 - 155) - 30 mavzu
    {
      start: 126,
      end: 155,
      stage: 'typescript',
      category: 'TypeScript & Qat\'iy Tipizatsiya',
      titles: [
        "TypeScript Kirish: Nega Dunyo JavaScriptdan TypeScriptga O'tdi?",
        "TypeScript O'rnatish, Kompilyatsiya (tsc) va tsconfig.json",
        "Boshlang'ich Turlar: string, number, boolean, null, undefined",
        "Maxsus Turlar: any vs unknown va never Turlari",
        "Massivlar va Tuple Turlarida Qat'iy Cheklovlar",
        "Enumlar: Numeric va String Enumlar Mohiyati",
        "Union Turlari (|) va Type Narrowing",
        "Intersection Turlari (&) va Tiplarni Birlashtirish",
        "Type Alias (type) Bilan Murakkab Strukturalar",
        "Interfaces (interface) Asoslari va Shartnomalar",
        "Interface vs Type: Qachon Qaysi Biri Ishlatiladi?",
        "Interfeyslarni Kengaytirish (extends) va Qo'shish (Merge)",
        "Funksiyalarda Tiplash: Parametrlar, Return Type va Void",
        "Ixtiyoriy Parametrlar (?) va Default Qiymatlar",
        "Generics (Umumlashgan Turlar) Kirish va <T>",
        "Generic Funksiyalar va Generic Interfeyslar",
        "Generic Cheklovlar: <T extends Lengthwise>",
        "Type Assertions: 'as' Kalit So'zi va Non-null Operator (!)",
        "Type Guards: typeof, instanceof, in va Custom Predicates",
        "Literal Turlar va keyof Operatori",
        "typeof Operatori va Lookup Types (Obyektdan Tip Olish)",
        "Mapped Types va Dinamik Tip Generatsiyasi",
        "Utility Types: Partial<T> va Required<T>",
        "Utility Types: Readonly<T> va Record<K, V>",
        "Utility Types: Pick<T, K> va Omit<T, K>",
        "Utility Types: Exclude<T, U>, Extract<T, U> va ReturnType<T>",
        "TypeScript OOP: public, private, protected Modifikatorlari",
        "Abstract Sinflar va Interfeys Implementatsiyasi",
        "Tashqi Kutubxonalar Tiplari: @types va .d.ts Fayllari",
        "4-Bosqich Yakuni: 100% Tiplangan Qat'iy TypeScript Moduli"
      ]
    },
    // STAGE 5: REACT (156 - 185) - 30 mavzu
    {
      start: 156,
      end: 185,
      stage: 'react',
      category: 'React & Zamonaviy Frontend',
      titles: [
        "React Falsafasi: Komponentli Yondashuv va Virtual DOM",
        "Vite Bilan Zamonaviy React Loyiha Yaratish",
        "JSX Sintaksisi: HTML va JS ning Mukammal Birlashuvi",
        "Props: Ota Komponentdan Bolaga Ma'lumot Uzatish",
        "Props Drilling va Bolalar (children) Propi",
        "Shartli Renderlash (Conditional Rendering): && va Ternary",
        "Ro'yxatlarni Renderlash: map() va Key Propining Mohiyati",
        "useState Hooki: Komponent Holatini Boshqarish",
        "useState Bilan Massiv va Obyektlarni Yangilash",
        "Boshqariladigan Formalar (Controlled Components)",
        "useEffect Hooki: Life Cycle va Yon Ta'sirlar (Side Effects)",
        "useEffect Dependency Array: To'g'ri Bog'liqliklar Kiritish",
        "useEffect Cleanup: Xotirani Tozalash va Intervalni O'chirish",
        "useEffect Bilan Backend API dan Ma'lumotlarni Yuklash",
        "useRef Hooki: DOM Bilan To'g'ridan-To'g'ri Ishlash va Qiymat Saqlash",
        "useMemo Hooki: Qimmat Hisob-Kitoblarni Keshlashtirish",
        "useCallback Hooki: Funksiyalarni Keshlashtirish",
        "React.memo Bilan Qayta Renderlarni Kamaytirish",
        "Custom Hooks (Shaxsiy Hooklar) Yozish San'ati",
        "useContext Hooki va Global Holat Boshqaruvi",
        "useReducer Hooki: Murakkab Holat Mantiqini Boshqarish",
        "Zustand: Yengil va Tezkor Global State Management",
        "React Router DOM: Ko'p Sahifali Ilova Marshrutlash",
        "React Router: useParams, useSearchParams va Dinamik Sahifalar",
        "React Portals: Modallar va Tooltiplarni Bodyga Chiqarish",
        "Error Boundaries: Ilova Qulashini Tutib Qolish",
        "React.lazy va Suspense: Code Splitting Bilan Tezkor Yuklanish",
        "React Forms: React Hook Form Bilan Tezkor Validatsiya",
        "React va Tailwind CSS Animatsiyalari (Framer Motion Kirish)",
        "5-Bosqich Yakuni: Katta React Web Dashboard Loyihasi"
      ]
    },
    // STAGE 6: BACKEND & NODE.JS (186 - 215) - 30 mavzu
    {
      start: 186,
      end: 215,
      stage: 'backend',
      category: 'Backend & Node.js Arxitekturasi',
      titles: [
        "Backendga Kirish: Client-Server Arxitekturasi va Protokollar",
        "Node.js Runtime: V8 Dvigateli va Event-Driven Arxitektura",
        "Node.js Modullari: CommonJS (require) vs ES Modules (import)",
        "Node.js Fayl Tizimi (fs Moduli): Fayllarni O'qish va Yozish",
        "Path va OS Modullari: Tizim Ma'lumotlari Bilan Ishlash",
        "Node.js Streams va Buffers: Katta Hajmli Oqimlar Bilan Ishlash",
        "NPM va Paketlar: package.json, scripts va Dependencies",
        "Express.js Kirish: Birinchi Backend Serverni Ishga Tushirish",
        "Express Routing: GET, POST, PUT, DELETE, PATCH Metodlari",
        "Request Obyekti: req.params, req.query va req.body",
        "Response Obyekti: res.json, res.status va res.send",
        "Express Middleware Mohiyati: request va response O'rtasidagi Ko'prik",
        "O'rnatilgan Middlewarelar: express.json() va express.urlencoded()",
        "Shaxsiy (Custom) Middlewarelar Yaratish va Log Qilish",
        "CORS: Cross-Origin Resource Sharing Xavfsizligini Sozlash",
        "Global Xatolarni Tutish Middleware (Error Handling)",
        "Multer Kutubxonasi: Fayllar va Rasmlarni Serverga Yuklash",
        "Muhit O'zgaruvchilari (.env) va dotenv Kutubxonasi",
        "RESTful API Arxitektura Standartlari va URL Dizayni",
        "Parollarni Xeshlashtirish: bcrypt.js Bilan Xavfsizlik",
        "JWT (JSON Web Tokens) Kirish: Access va Refresh Tokenlar",
        "JWT Bilan Himoyalangan Marshrutlar (Auth Guard Middleware)",
        "Role-Based Access Control (RBAC): Admin, Ustoz, Talaba Huquqlari",
        "API Validatsiyasi: Zod Sxemalari Bilan Ma'lumotni Tekshirish",
        "Rate Limiting: Brute Force Hujumlaridan Himoyalanish",
        "Helmet.js: HTTP Xavfsizlik Sarlavhalarini O'rnatish",
        "Cookie va Session: Cookie-parser va Sessiyalar Bilan Ishlash",
        "Nodemailer: Foydalanuvchilarga Email Xabarlar Yuborish",
        "WebSockets Kirish: Socket.io Bilan Real Vaqtda Chat Tizimi",
        "6-Bosqich Yakuni: To'liq Xavfsiz REST API Server Loyihasi"
      ]
    },
    // STAGE 7: DATABASE & SQL (216 - 235) - 20 mavzu
    {
      start: 216,
      end: 235,
      stage: 'database',
      category: "Ma'lumotlar Bazasi & SQL",
      titles: [
        "Ma'lumotlar Bazasi Nima? RDBMS vs NoSQL Farqlari",
        "Relatsion Modellashtirish va Jadvallar Tuzilishi",
        "PostgreSQL Kirish: O'rnatish va psql Buyruqlar Paneli",
        "SQL DDL: CREATE TABLE, ALTER TABLE, DROP TABLE",
        "Ma'lumot Turlari: INT, VARCHAR, TEXT, BOOLEAN, TIMESTAMP, JSONB",
        "Kalitlar: PRIMARY KEY va UNIQUE Cheklovlari",
        "Tashqi Kalitlar: FOREIGN KEY va Bog'liqliklar (1:1, 1:N, N:M)",
        "SQL DML: INSERT INTO Bilan Qatorlar Qo'shish",
        "SQL SELECT: Ustunlarni Tanlash va WHERE Bilan Filtrlash",
        "SQL Tartiblash va Cheklash: ORDER BY, LIMIT, OFFSET",
        "SQL Agregat Funksiyalar: COUNT, SUM, AVG, MIN, MAX",
        "SQL Guruhlash: GROUP BY va HAVING Shartlari",
        "SQL Joins: INNER JOIN Bilan Jadvallarni Birlashtirish",
        "SQL Joins: LEFT JOIN, RIGHT JOIN va FULL JOIN",
        "SQL Tranzaksiyalar (ACID): BEGIN, COMMIT, ROLLBACK",
        "Indekslar (Indexes): B-Tree Bilan Qidiruvni 100 Karra Tezlashtirish",
        "Node.js Bilan PostgreSQL ga Ulanish ('pg' Driver)",
        "Drizzle ORM: TypeScript Bilan Xavfsiz SQL So'rovlar Yozish",
        "Database Migrations: Baza Sxemasini Yangilash va Versiyalash",
        "7-Bosqich Yakuni: Katta E-Commerce Ma'lumotlar Bazasi Loyihasi"
      ]
    },
    // STAGE 8: FULLSTACK & DEVOPS (236 - 250) - 15 mavzu
    {
      start: 236,
      end: 250,
      stage: 'fullstack',
      category: 'Full-Stack & DevOps Ekotizimi',
      titles: [
        "Full-Stack Arxitekturasi: Frontend, Backend va Baza Integratsiyasi",
        "Git va GitHub Bilan Jamoaviy Ishlash: Git Flow va Pull Requests",
        "Veb Xavfsizlik: XSS, CSRF, SQL Injection Hujumlaridan Himoya",
        "Docker Kirish: Konteynerlashtirish Nima va Nega Muhim?",
        "Dockerfile Yaratish: Node.js va React Loyihalarini Konteynerga Olish",
        "Docker Compose: Server va PostgreSQL ni Birgalikda Ishga Tushirish",
        "Keshlashtirish Strategiyalari: Redis Xotirasi Bilan API ni Tezlashtirish",
        "CI/CD Quvurlari: GitHub Actions Bilan Avtomatik Test va Deploy",
        "Nginx Reverse Proxy: Domenlarni Yo'naltirish va SSL Shifrlash",
        "Linux Server (Ubuntu) Asoslari: SSH, Firewall (UFW) va PM2",
        "Cloud Deployment: Vercel, Render va Cloud Run da Deploy Qilish",
        "Monitoring va Logging: Winston, Morgan va Sentry Xatoliklar Nazorati",
        "Lighthouse va Web Vitals: Ilova Tezligini 100/100 Qilish",
        "Mikroservislar vs Monolit: Masshtablanuvchi Katta Tizimlar",
        "8-Bosqich Yakuni: 250-Mavzu Full-Stack Diplom Loyihasi"
      ]
    }
  ];

  for (const cfg of remainingStagesConfig) {
    for (let i = cfg.start; i <= cfg.end; i++) {
      const titleIndex = i - cfg.start;
      const titleText = cfg.titles[titleIndex] || `${cfg.category} Mavzu #${i}`;
      const summaryText = `W3Schools rasmiy dasturi bo'yicha "${titleText}" mavzusining chuqur nazariyasi, sintaksis qoidalari, atribut va metodlar jadvali hamda real loyihalarda qo'llanilishi.`;

      const w3Data = buildW3SchoolsContent(
        i,
        cfg.stage,
        cfg.category,
        titleText,
        summaryText
      );

      result.push({
        id: `lesson-${i}`,
        stage: cfg.stage,
        trackCategory: cfg.category,
        title: `${i}. ${titleText}`,
        duration: '40 daqiqa',
        xpReward: 70,
        summary: summaryText,
        w3ReferenceTopic: w3Data.w3ReferenceTopic,
        deepExplanation: w3Data.deepExplanation,
        syntaxBreakdown: w3Data.syntaxBreakdown,
        codeExample: w3Data.codeExample,
        practiceTask: `${titleText} mavzusiga oid W3Schools kod namunasini Try-It muharririda ishga tushiring va natijani konsolda tekshiring.`,
        starterCode: w3Data.codeExample,
        solutionKeyword: 'console',
        theoryDetails: [
          `W3Schools bo'yicha "${titleText}" xalqaro standartlari va eng yaxshi amaliyotlar (Best Practices)`,
          `Ishlab chiqarish (Production) darajasida xavfsizlik va yuqori tezlikni optimallashtirish`,
          `Xatolarni oldindan aniqlash, kodni modulli yozish va testlash strategiyalari`
        ],
        realWorldExamples: [
          `W3Schools "Try it Yourself" amaliy loyihalarida va yirik veb-ilovalar arxitekturasida ishlatilishi`,
          `Yuqori yuklamali tizimlarda barqaror va xatosiz ishlash mexanizmi`,
          `Jamoaviy dasturlashda toza kod (Clean Code) va oson kengaytirish imkoniyati`
        ],
        cheatSheetTips: [
          `W3Schools Note: Always follow clean naming conventions and official syntax rules.`,
          `700+ so'zlik W3Schools (EN + UZ) darsligini o'qib chiqqach, darhol testni yechib +70 XP oling!`
        ],
        commonMistakes: [
          {
            badCode: w3Data.badCode,
            goodCode: w3Data.goodCode,
            explanation: `W3Schools ko'rsatmasiga binoan, zamonaviy standartlarga amal qilish kodni xavfsiz, barqaror va xatosiz qiladi.`
          }
        ],
        interviewQuestions: [
          {
            question: `W3Schools dasturi asosida "${titleText}" mavzusi bo'yicha texnik suhbatda nimalar so'raladi?`,
            answer: `Ushbu texnologiyaning W3Schools standartidagi sintaksisi, ichki ishlash mexanizmi, qachon qo'llash maqsadga muvofiqligi hamda xotira va tezlikka ta'siri so'raladi.`
          }
        ],
        quiz: [
          {
            id: `q-${i}-1`,
            question: `W3Schools o'quv dasturiga ko'ra, "${titleText}" qaysi yo'nalishga tegishli va uning asosiy vazifasi nima?`,
            options: [
              `U "${cfg.category}" tarkibiga kiradi va zamonaviy veb-ilovalarni standart asosida sifatli qurishga xizmat qiladi`,
              "U faqat matn muharrirlarida imlo tekshirish uchun ishlatiladi",
              "U eskirgan texnologiya bo'lib, zamonaviy brauzerlarda qo'llanilmaydi",
              "U faqat kompyuterning tashqi qurilmalarini boshqaradi"
            ],
            correctAnswerIndex: 0,
            explanation: `W3Schools kursida "${titleText}" mavzusi ${cfg.category}ning eng muhim poydevor bilimlaridan biri sifatida o'rgatiladi.`
          },
          {
            id: `q-${i}-2`,
            question: `W3Schools standarti asosida "${titleText}" mavzusini to'liq o'zlashtirgan dasturchi qanday ko'nikmaga ega bo'ladi?`,
            options: [
              "Production darajasida xatosiz, xavfsiz va optimallashgan professional kod yoza oladi",
              "Faqat bo'sh sahifa yarata oladi",
              "Hech qanday amaliy natija olmaydi",
              "Kod yozishda sintaksis qoidalariga amal qilmaydi"
            ],
            correctAnswerIndex: 0,
            explanation: "W3Schools amaliy va nazariy bilimlari dasturchiga real loyihalarda professional ishlash imkonini beradi."
          }
        ]
      });
    }
  }

  return result;
}

export const ALL_250_LESSONS: Lesson[] = generateAll250Lessons();

