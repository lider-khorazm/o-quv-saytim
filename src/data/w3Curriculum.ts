import { Lesson } from '../types';

export const W3_HTML_LESSONS: Lesson[] = [
  {
    "id": "l-html-1",
    "stage": "html",
    "title": "1. HTML Kirish va Hujjat Tuzilishi",
    "duration": "25 daqiqa",
    "xpReward": 100,
    "w3ReferenceTopic": "HTML Introduction & Basic Structure",
    "summary": "HTML (HyperText Markup Language) — butun internet tarmog'ining poydevori hisoblanadi. U dasturlash tili emas, balki gipermatnli belgilash tili bo'lib, veb-brauzerlarga matn, rasm, video va shakllarni qanday tartibda ko'rsatishni buyuradi. Har bir HTML hujjati <!DOCTYPE html> deklaratsiyasi bilan ochilib, HTML5 standartiga muvofiq ishlaydi. Ildiz elementi <html> bo'lib, uning ichida ikkita asosiy qism: metama'lumotlarni saqlovchi <head> va foydalanuvchi ko'radigan butun vizual tarkibni jamlagan <body> joylashadi.",
    "theoryDetails": [
      "<!DOCTYPE html>: Brauzerga ushbu hujjat HTML5 standartida ekanligini bildiradi.",
      "<html>: Butun sahifaning bosh (ildiz) elementi.",
      "<head>: Sahifa sarlavhasi (<title>), metama'lumotlar va CSS uslublarini ulaydi.",
      "<body>: Foydalanuvchi ko'radigan barcha ko'rinuvchi qism: matnlar, rasmlar, formalar."
    ],
    "codeExample": "<!DOCTYPE html>\n<html lang=\"uz\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Mening Birinchi Sahifam</title>\n  </head>\n  <body>\n    <h1>Salom, Dunyo!</h1>\n    <p>Men DevMaster akademiyasida HTML o'rganmoqdaman.</p>\n  </body>\n</html>",
    "practiceTask": "<body> ichiga bitta <h1> va bitta <p> tegini yozing.",
    "starterCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Mening Sahifam</h1>\n    <p>Dasturlash sarguzashti boshlandi!</p>\n  </body>\n</html>",
    "solutionKeyword": "<h1>",
    "realWorldExamples": [
      "// 1. Zamonaviy SPA (Single Page Application) HTML kirish nuqtasi:\n<!DOCTYPE html>\n<html lang=\"uz\" dir=\"ltr\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>DevMaster Portal</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>",
      "// 2. Oddiy veb-sahifa semantik andozasi:\n<!DOCTYPE html>\n<html lang=\"uz\">\n  <body>\n    <header><h1>Akademiya</h1></header>\n    <main><p>Bugungi mavzu: Veb tuzilishi</p></main>\n    <footer><p>&copy; 2026 DevMaster</p></footer>\n  </body>\n</html>"
    ],
    "cheatSheetTips": [
      "<!DOCTYPE html> deklaratsiyasini hech qachon yoddan chiqarmang — busiz brauzer 'quirks mode' (eski rejim) ga o'tib ketadi.",
      "Har doim <html lang='uz'> orqali sahifa tilini ko'rsating, bu Google qidiruv tizimi va brauzer tarjimoni uchun kerak.",
      "HTML dagi izohlar <!-- izoh --> ko'rinishida yoziladi va ekranda mutlaqo ko'rinmaydi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"1. HTML Kirish va Hujjat Tuzilishi\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "1. HTML Kirish va Hujjat Tuzilishi",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "HTML (HyperText Markup Language) — butun internet tarmog'ining poydevori hisoblanadi. U dasturlash tili emas, balki gipermatnli belgilash tili bo'lib, veb-brauzerlarga matn, rasm, video va shakllarni qanday tartibda ko'rsatishni buyuradi. Har bir HTML hujjati <!DOCTYPE html> deklaratsiyasi bilan ochilib, HTML5 standartiga muvofiq ishlaydi. Ildiz elementi <html> bo'lib, uning ichida ikkita asosiy qism: metama'lumotlarni saqlovchi <head> va foydalanuvchi ko'radigan butun vizual tarkibni jamlagan <body> joylashadi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<!DOCTYPE html>: Brauzerga ushbu hujjat HTML5 standartida ekanligini bildiradi.",
          "<html>: Butun sahifaning bosh (ildiz) elementi.",
          "<head>: Sahifa sarlavhasi (<title>), metama'lumotlar va CSS uslublarini ulaydi.",
          "<body>: Foydalanuvchi ko'radigan barcha ko'rinuvchi qism: matnlar, rasmlar, formalar."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<!DOCTYPE html>\n<html lang=\"uz\">\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Mening Birinchi Sahifam</title>\n  </head>\n  <body>\n    <h1>Salom, Dunyo!</h1>\n    <p>Men DevMaster akademiyasida HTML o'rganmoqdaman.</p>\n  </body>\n</html>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// 1. Zamonaviy SPA (Single Page Application) HTML kirish nuqtasi:\n<!DOCTYPE html>\n<html lang=\"uz\" dir=\"ltr\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>DevMaster Portal</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>",
          "// 2. Oddiy veb-sahifa semantik andozasi:\n<!DOCTYPE html>\n<html lang=\"uz\">\n  <body>\n    <header><h1>Akademiya</h1></header>\n    <main><p>Bugungi mavzu: Veb tuzilishi</p></main>\n    <footer><p>&copy; 2026 DevMaster</p></footer>\n  </body>\n</html>"
        ],
        "codeSnippet": "// 1. Zamonaviy SPA (Single Page Application) HTML kirish nuqtasi:\n<!DOCTYPE html>\n<html lang=\"uz\" dir=\"ltr\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>DevMaster Portal</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "<!DOCTYPE html> deklaratsiyasini hech qachon yoddan chiqarmang — busiz brauzer 'quirks mode' (eski rejim) ga o'tib ketadi.",
          "Har doim <html lang='uz'> orqali sahifa tilini ko'rsating, bu Google qidiruv tizimi va brauzer tarjimoni uchun kerak.",
          "HTML dagi izohlar <!-- izoh --> ko'rinishida yoziladi va ekranda mutlaqo ko'rinmaydi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <body> ichiga bitta <h1> va bitta <p> tegini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<h1>\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +100 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<!DOCTYPE html>\n<html>\n  <body>\n    <h1>Mening Sahifam</h1>\n    <p>Dasturlash sarguzashti boshlandi!</p>\n  </body>\n</html>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-2",
    "stage": "html",
    "title": "2. HTML Elementlari va Global Atributlari",
    "duration": "25 daqiqa",
    "xpReward": 110,
    "w3ReferenceTopic": "HTML Elements & Attributes",
    "summary": "HTML elementlari veb-sahifaning har bir g'ishtchasi hisoblanadi. Ular brauzer xotirasida DOM (Document Object Model) daraxtini hosil qiladi. Global atributlar — bu HTML ning istalgan elementida ishlatilishi mumkin bo'lgan universal xususiyatlar to'plamidir (id, class, title, style, hidden, tabindex, contenteditable).",
    "theoryDetails": [
      "id: Sahifada faqat bitta element uchun takrorlanmas noyob identifikator.",
      "class: Bir nechta elementlarni guruhlab uslub berish uchun ishlatiladi.",
      "title: Sichqoncha element ustiga borganda ko'rinuvchi qo'shimcha eslatma (tooltip).",
      "style: Elementga to'g'ridan-to'g'ri inline CSS berish imkonini beradi."
    ],
    "codeExample": "<p id=\"intro-matn\" class=\"diqqat\" title=\"Bu muhim xabar\">\n  Diqqat: Atributlar elementga maxsus xususiyat bag'ishlaydi.\n</p>\n<button class=\"btn\" style=\"color: blue;\">Bosing</button>",
    "practiceTask": "class=\"asosiy-matn\" va title atributiga ega bo'lgan <p> tegi yozing.",
    "starterCode": "<p class=\"asosiy-matn\" title=\"Ma'lumot\">Atributlar bilan ishlash</p>",
    "solutionKeyword": "class=",
    "realWorldExamples": [
      "// Tugmada data-* va aria atributlaridan foydalanish:\n<button id=\"btn-xarid\" class=\"btn btn-primary\" data-product-id=\"9821\" title=\"Xarid qilish\">\n  Sotib Olish (150,000 so'm)\n</button>",
      "// Interfaol tahrirlanuvchi blok:\n<div id=\"bloknot\" contenteditable=\"true\" class=\"note-box\" title=\"Matnni tahrirlang\">\n  Bu yerga qaydlaringizni yozing...\n</div>"
    ],
    "cheatSheetTips": [
      "Bitta sahifada bitta 'id' faqat bir marta ishlatilishi shart, bir xil id ni takrorlash jiddiy xatodir.",
      "Bir nechta sinflarni bo'sh joy (probel) bilan ajrating: class='card card-shadow active'.",
      "Atribut qiymatlarini doimo qo'shtirnoq ichiga oling: class=\"btn\" to'g'ri, class=btn noto'g'ri."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"2. HTML Elementlari va Global Atributlari\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "2. HTML Elementlari va Global Atributlari",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "HTML elementlari veb-sahifaning har bir g'ishtchasi hisoblanadi. Ular brauzer xotirasida DOM (Document Object Model) daraxtini hosil qiladi. Global atributlar — bu HTML ning istalgan elementida ishlatilishi mumkin bo'lgan universal xususiyatlar to'plamidir (id, class, title, style, hidden, tabindex, contenteditable).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "id: Sahifada faqat bitta element uchun takrorlanmas noyob identifikator.",
          "class: Bir nechta elementlarni guruhlab uslub berish uchun ishlatiladi.",
          "title: Sichqoncha element ustiga borganda ko'rinuvchi qo'shimcha eslatma (tooltip).",
          "style: Elementga to'g'ridan-to'g'ri inline CSS berish imkonini beradi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<p id=\"intro-matn\" class=\"diqqat\" title=\"Bu muhim xabar\">\n  Diqqat: Atributlar elementga maxsus xususiyat bag'ishlaydi.\n</p>\n<button class=\"btn\" style=\"color: blue;\">Bosing</button>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Tugmada data-* va aria atributlaridan foydalanish:\n<button id=\"btn-xarid\" class=\"btn btn-primary\" data-product-id=\"9821\" title=\"Xarid qilish\">\n  Sotib Olish (150,000 so'm)\n</button>",
          "// Interfaol tahrirlanuvchi blok:\n<div id=\"bloknot\" contenteditable=\"true\" class=\"note-box\" title=\"Matnni tahrirlang\">\n  Bu yerga qaydlaringizni yozing...\n</div>"
        ],
        "codeSnippet": "// Tugmada data-* va aria atributlaridan foydalanish:\n<button id=\"btn-xarid\" class=\"btn btn-primary\" data-product-id=\"9821\" title=\"Xarid qilish\">\n  Sotib Olish (150,000 so'm)\n</button>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Bitta sahifada bitta 'id' faqat bir marta ishlatilishi shart, bir xil id ni takrorlash jiddiy xatodir.",
          "Bir nechta sinflarni bo'sh joy (probel) bilan ajrating: class='card card-shadow active'.",
          "Atribut qiymatlarini doimo qo'shtirnoq ichiga oling: class=\"btn\" to'g'ri, class=btn noto'g'ri."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: class=\"asosiy-matn\" va title atributiga ega bo'lgan <p> tegi yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"class=\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +110 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<p class=\"asosiy-matn\" title=\"Ma'lumot\">Atributlar bilan ishlash</p>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-3",
    "stage": "html",
    "title": "3. Sarlavhalar (h1-h6) va Paragraflar (<p>, <hr>, <br>)",
    "duration": "20 daqiqa",
    "xpReward": 110,
    "w3ReferenceTopic": "HTML Headings & Paragraphs",
    "summary": "Matnli kontent ierarxiyasi veb-sahifaning o'qilishi va SEO muvaffaqiyati uchun eng muhim omildir. HTML da 1-darajadan 6-darajagacha bo'lgan sarlavhalar mavjud: <h1> eng oliy ahamiyatga ega bo'lib sahifaning asosiy mavzusini bildiradi, <h6> esa eng kichik ost-sarlavhadir. Paragraflar (<p>) matn bloklarini hosil qiladi va brauzer ular oldi va orqasidan avtomatik bo'sh joy (margin) qoldiradi. <br> tegi yangi qatorga tushiradi (line break), <hr> tegi esa tematik bo'limlar orasiga gorizontal chiziq tortadi.",
    "theoryDetails": [
      "<h1>: Sahifada odatda 1 marta ishlatiladigan asosiy sarlavha (SEO uchun eng muhim).",
      "<h2>-<h6>: Bo'lim va kichik sarlavhalar iyerarxiyasini belgilaydi.",
      "<hr>: Mavzular orasiga bo'luvchi vizual chiziq chizadi (bo'sh teg).",
      "<br>: Yangi qatordan boshlash uchun ishlatiladi (yopiluvchi tegi yo'q)."
    ],
    "codeExample": "<h1>Akademiya Yangiliklari</h1>\n<h2>Frontend Kurslari</h2>\n<p>Darslarimiz har hafta muntazam o'tkaziladi.<br>Ustozlar doim yordamga tayyor.</p>\n<hr>\n<h3>Backend Bo'limi</h3>",
    "practiceTask": "<h1>, <h2> va <hr> teglaridan foydalanib bo'lim sarlavhasini yarating.",
    "starterCode": "<h1>Frontend</h1>\n<hr>\n<h2>HTML Asoslari</h2>\n<p>Dars boshlandi</p>",
    "solutionKeyword": "<hr",
    "realWorldExamples": [
      "// Maqola sarlavha ierarxiyasi:\n<article>\n  <h1>React 19 da Yangiliklar</h1>\n  <hr />\n  <h2>1. Server Actions</h2>\n  <p>Server harakatlari formalarni yengillashtiradi.<br>Kod ancha toza bo'ladi.</p>\n</article>",
      "// Tashkilot manzili:\n<address>\n  <strong>DevMaster Bosh Ofisi:</strong><br>\n  Amir Temur shoh ko'chasi, 14-uy<br>\n  Toshkent shahri\n</address>"
    ],
    "cheatSheetTips": [
      "Bitta sahifada faqat bitta <h1> sarlavhasi bo'lishi SEO oltin qoidasidir.",
      "Sarlavhalar darajasini sakrab o'tmang: <h1> dan so'ng darhol <h4> ga o'tmang, tartib bilan <h2> va <h3> qo'llang.",
      "Katta bo'shliqlar uchun ketma-ket <br><br> yozmang; buning o'rniga CSS da margin ishlating."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"3. Sarlavhalar (h1-h6) va Paragraflar (<p>, <hr>, <br>)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "3. Sarlavhalar (h1-h6) va Paragraflar (<p>, <hr>, <br>)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Matnli kontent ierarxiyasi veb-sahifaning o'qilishi va SEO muvaffaqiyati uchun eng muhim omildir. HTML da 1-darajadan 6-darajagacha bo'lgan sarlavhalar mavjud: <h1> eng oliy ahamiyatga ega bo'lib sahifaning asosiy mavzusini bildiradi, <h6> esa eng kichik ost-sarlavhadir. Paragraflar (<p>) matn bloklarini hosil qiladi va brauzer ular oldi va orqasidan avtomatik bo'sh joy (margin) qoldiradi. <br> tegi yangi qatorga tushiradi (line break), <hr> tegi esa tematik bo'limlar orasiga gorizontal chiziq tortadi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<h1>: Sahifada odatda 1 marta ishlatiladigan asosiy sarlavha (SEO uchun eng muhim).",
          "<h2>-<h6>: Bo'lim va kichik sarlavhalar iyerarxiyasini belgilaydi.",
          "<hr>: Mavzular orasiga bo'luvchi vizual chiziq chizadi (bo'sh teg).",
          "<br>: Yangi qatordan boshlash uchun ishlatiladi (yopiluvchi tegi yo'q)."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<h1>Akademiya Yangiliklari</h1>\n<h2>Frontend Kurslari</h2>\n<p>Darslarimiz har hafta muntazam o'tkaziladi.<br>Ustozlar doim yordamga tayyor.</p>\n<hr>\n<h3>Backend Bo'limi</h3>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Maqola sarlavha ierarxiyasi:\n<article>\n  <h1>React 19 da Yangiliklar</h1>\n  <hr />\n  <h2>1. Server Actions</h2>\n  <p>Server harakatlari formalarni yengillashtiradi.<br>Kod ancha toza bo'ladi.</p>\n</article>",
          "// Tashkilot manzili:\n<address>\n  <strong>DevMaster Bosh Ofisi:</strong><br>\n  Amir Temur shoh ko'chasi, 14-uy<br>\n  Toshkent shahri\n</address>"
        ],
        "codeSnippet": "// Maqola sarlavha ierarxiyasi:\n<article>\n  <h1>React 19 da Yangiliklar</h1>\n  <hr />\n  <h2>1. Server Actions</h2>\n  <p>Server harakatlari formalarni yengillashtiradi.<br>Kod ancha toza bo'ladi.</p>\n</article>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Bitta sahifada faqat bitta <h1> sarlavhasi bo'lishi SEO oltin qoidasidir.",
          "Sarlavhalar darajasini sakrab o'tmang: <h1> dan so'ng darhol <h4> ga o'tmang, tartib bilan <h2> va <h3> qo'llang.",
          "Katta bo'shliqlar uchun ketma-ket <br><br> yozmang; buning o'rniga CSS da margin ishlating."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <h1>, <h2> va <hr> teglaridan foydalanib bo'lim sarlavhasini yarating.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<hr\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +110 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<h1>Frontend</h1>\n<hr>\n<h2>HTML Asoslari</h2>\n<p>Dars boshlandi</p>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-4",
    "stage": "html",
    "title": "4. Matn Formatlash (strong, em, mark, sub, sup)",
    "duration": "25 daqiqa",
    "xpReward": 120,
    "w3ReferenceTopic": "HTML Text Formatting",
    "summary": "Matnlarni chiroyli va urg'uli ko'rsatish uchun HTML da maxsus formatlash teglari mavjud: <strong> va <b> (qalin), <em> va <i> (kursiv), <mark> (sariq fon bilan ajratish), <small> (kichik matn), <sub> (pastki indeks) va <sup> (yuqori indeks). Zamonaviy HTML5 da semantik ma'noga ega bo'lgan <strong> va <em> teglari afzal ko'riladi.",
    "theoryDetails": [
      "<strong>: Muhim matnni bildiradi va uni qalin qilib ko'rsatadi.",
      "<em>: Urg'uli matn (kursiv shaklda).",
      "<mark>: Muhim kalit so'zlarni markerlangan holda ajratib ko'rsatadi.",
      "<del> va <ins>: O'chirilgan va yangi qo'shilgan narx yoki matnlar uchun.",
      "Kimyoviy formulalar: H<sub>2</sub>O, Matematik daraja: 5<sup>2</sup> = 25."
    ],
    "codeExample": "<p>Suv formulasi: H<sub>2</sub>O</p>\n<p>Matematik kvadrat: 10<sup>2</sup> = 100</p>\n<p>Eski narx: <del>500,000</del> Yangi: <ins>350,000</ins> so'm</p>\n<p>Bu so'z <mark>muhim</mark> va <strong>qalin</strong> qilingan.</p>",
    "practiceTask": "<sub> va <sup> teglaridan foydalanib formula yoki daraja yozing.",
    "starterCode": "<p>Formula: H<sub>2</sub>O va 2<sup>3</sup> = 8</p>",
    "solutionKeyword": "<sub>",
    "realWorldExamples": [
      "// E-Commerce narx kartasi:\n<div class=\"narx\">\n  <del>500,000 so'm</del>\n  <strong><ins>350,000 so'm</ins></strong>\n  <mark>-30% Chegirma</mark>\n</div>",
      "// Ilmiy formula va kvadrat tenglama:\n<p>Suv: H<sub>2</sub>O | Pifagor: a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></p>"
    ],
    "cheatSheetTips": [
      "Faqat tashqi ko'rinish uchun emas, semantik ahamiyat uchun <strong> va <em> teglardan foydalaning.",
      "Formula va darajalarda <sub> (subscript - pastda) va <sup> (superscript - tepada) teglarini adashtirmang.",
      "Teglar to'g'ri qavatma-qavat yopilishi shart: <strong><em>matn</em></strong>."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"4. Matn Formatlash (strong, em, mark, sub, sup)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "4. Matn Formatlash (strong, em, mark, sub, sup)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Matnlarni chiroyli va urg'uli ko'rsatish uchun HTML da maxsus formatlash teglari mavjud: <strong> va <b> (qalin), <em> va <i> (kursiv), <mark> (sariq fon bilan ajratish), <small> (kichik matn), <sub> (pastki indeks) va <sup> (yuqori indeks). Zamonaviy HTML5 da semantik ma'noga ega bo'lgan <strong> va <em> teglari afzal ko'riladi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<strong>: Muhim matnni bildiradi va uni qalin qilib ko'rsatadi.",
          "<em>: Urg'uli matn (kursiv shaklda).",
          "<mark>: Muhim kalit so'zlarni markerlangan holda ajratib ko'rsatadi.",
          "<del> va <ins>: O'chirilgan va yangi qo'shilgan narx yoki matnlar uchun.",
          "Kimyoviy formulalar: H<sub>2</sub>O, Matematik daraja: 5<sup>2</sup> = 25."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<p>Suv formulasi: H<sub>2</sub>O</p>\n<p>Matematik kvadrat: 10<sup>2</sup> = 100</p>\n<p>Eski narx: <del>500,000</del> Yangi: <ins>350,000</ins> so'm</p>\n<p>Bu so'z <mark>muhim</mark> va <strong>qalin</strong> qilingan.</p>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// E-Commerce narx kartasi:\n<div class=\"narx\">\n  <del>500,000 so'm</del>\n  <strong><ins>350,000 so'm</ins></strong>\n  <mark>-30% Chegirma</mark>\n</div>",
          "// Ilmiy formula va kvadrat tenglama:\n<p>Suv: H<sub>2</sub>O | Pifagor: a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></p>"
        ],
        "codeSnippet": "// E-Commerce narx kartasi:\n<div class=\"narx\">\n  <del>500,000 so'm</del>\n  <strong><ins>350,000 so'm</ins></strong>\n  <mark>-30% Chegirma</mark>\n</div>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Faqat tashqi ko'rinish uchun emas, semantik ahamiyat uchun <strong> va <em> teglardan foydalaning.",
          "Formula va darajalarda <sub> (subscript - pastda) va <sup> (superscript - tepada) teglarini adashtirmang.",
          "Teglar to'g'ri qavatma-qavat yopilishi shart: <strong><em>matn</em></strong>."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <sub> va <sup> teglaridan foydalanib formula yoki daraja yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<sub>\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +120 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<p>Formula: H<sub>2</sub>O va 2<sup>3</sup> = 8</p>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-5",
    "stage": "html",
    "title": "5. Havolalar (<a>, href, target va Bookmarklar)",
    "duration": "30 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "HTML Links & Bookmarks",
    "summary": "Giperhavolalar (Hyperlinks) internetning asosiy qon tomiridir. <a> (anchor) tegi tufayli dunyodagi millionlab veb-sahifalar bir-biriga bog'lanadi. Havola orqali boshqa veb-saytga, joriy saytning boshqa sahifasiga, sahifaning ichki qismiga (anchor link), elektron pochtaga (mailto:), yoki telefon raqamiga (tel:) o'tish mumkin.",
    "theoryDetails": [
      "href: Havola qilinayotgan veb-manzil (URL).",
      "target=\"_blank\": Havolani yangi brauzer yorlig'ida ochish.",
      "href=\"mailto:info@sayt.uz\": Bosilganda avtomatik email dasturini ochadi.",
      "href=\"#bolim\": Sahifadagi id=\"bolim\" ga ega joyga tezda o'tadi."
    ],
    "codeExample": "<!-- Tashqi havola -->\n<a href=\"https://w3schools.com\" target=\"_blank\">W3Schools Sayti</a>\n\n<!-- Email yuborish -->\n<a href=\"mailto:olimjon@devmaster.uz\">Ustozga Xat Yozish</a>\n\n<!-- Sahifa ichidagi havola -->\n<a href=\"#pastki-qism\">Pastga Tushish</a>\n...\n<h2 id=\"pastki-qism\">Pastki Bo'lim</h2>",
    "practiceTask": "target=\"_blank\" bo'lgan <a> havolasini yarating.",
    "starterCode": "<a href=\"https://google.com\" target=\"_blank\">Google qidiruv tizimi</a>",
    "solutionKeyword": "target=\"_blank\"",
    "realWorldExamples": [
      "// Yangi oynada ochiluvchi xavfsiz havola:\n<a href=\"https://w3schools.com\" target=\"_blank\" rel=\"noopener noreferrer\">\n  W3Schools Portaliga O'tish\n</a>",
      "// Telefon va pochta havolalari:\n<p>\n  Aloqa: <a href=\"tel:+998901234567\">+998 90 123-45-67</a>\n  Email: <a href=\"mailto:info@devmaster.uz\">info@devmaster.uz</a>\n</p>"
    ],
    "cheatSheetTips": [
      "target='_blank' berilganda albatta rel='noopener noreferrer' atributini qo'shing — bu xavfsizlik uchun shart.",
      "Havola matnini ma'noli qiling: 'bu yerni bosing' emas, 'HTML bo'yicha to'liq qo'llanma' deb yozing.",
      "Fayllarni yuklatish uchun <a href='kitob.pdf' download> 'download' atributini qo'shishingiz mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"5. Havolalar (<a>, href, target va Bookmarklar)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "5. Havolalar (<a>, href, target va Bookmarklar)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Giperhavolalar (Hyperlinks) internetning asosiy qon tomiridir. <a> (anchor) tegi tufayli dunyodagi millionlab veb-sahifalar bir-biriga bog'lanadi. Havola orqali boshqa veb-saytga, joriy saytning boshqa sahifasiga, sahifaning ichki qismiga (anchor link), elektron pochtaga (mailto:), yoki telefon raqamiga (tel:) o'tish mumkin.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "href: Havola qilinayotgan veb-manzil (URL).",
          "target=\"_blank\": Havolani yangi brauzer yorlig'ida ochish.",
          "href=\"mailto:info@sayt.uz\": Bosilganda avtomatik email dasturini ochadi.",
          "href=\"#bolim\": Sahifadagi id=\"bolim\" ga ega joyga tezda o'tadi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<!-- Tashqi havola -->\n<a href=\"https://w3schools.com\" target=\"_blank\">W3Schools Sayti</a>\n\n<!-- Email yuborish -->\n<a href=\"mailto:olimjon@devmaster.uz\">Ustozga Xat Yozish</a>\n\n<!-- Sahifa ichidagi havola -->\n<a href=\"#pastki-qism\">Pastga Tushish</a>\n...\n<h2 id=\"pastki-qism\">Pastki Bo'lim</h2>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Yangi oynada ochiluvchi xavfsiz havola:\n<a href=\"https://w3schools.com\" target=\"_blank\" rel=\"noopener noreferrer\">\n  W3Schools Portaliga O'tish\n</a>",
          "// Telefon va pochta havolalari:\n<p>\n  Aloqa: <a href=\"tel:+998901234567\">+998 90 123-45-67</a>\n  Email: <a href=\"mailto:info@devmaster.uz\">info@devmaster.uz</a>\n</p>"
        ],
        "codeSnippet": "// Yangi oynada ochiluvchi xavfsiz havola:\n<a href=\"https://w3schools.com\" target=\"_blank\" rel=\"noopener noreferrer\">\n  W3Schools Portaliga O'tish\n</a>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "target='_blank' berilganda albatta rel='noopener noreferrer' atributini qo'shing — bu xavfsizlik uchun shart.",
          "Havola matnini ma'noli qiling: 'bu yerni bosing' emas, 'HTML bo'yicha to'liq qo'llanma' deb yozing.",
          "Fayllarni yuklatish uchun <a href='kitob.pdf' download> 'download' atributini qo'shishingiz mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: target=\"_blank\" bo'lgan <a> havolasini yarating.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"target=\"_blank\"\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<a href=\"https://google.com\" target=\"_blank\">Google qidiruv tizimi</a>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-6",
    "stage": "html",
    "title": "6. Rasmlar (<img>, alt, responsive media)",
    "duration": "25 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "HTML Images & Picture Element",
    "summary": "HTML da rasmlar <img> toq tegi orqali ulanadi. Uning ikkita eng muhim atributi bor: 'src' (rasm manzili) va 'alt' (rasm yuklanmay qolganda chiqadigan tavsif). HTML5 da rasmlarni izoh bilan guruhlash uchun <figure> va <figcaption>, shuningdek turli ekranlar uchun <picture> elementi qo'llaniladi.",
    "theoryDetails": [
      "src: Rasm fayliga olib boruvchi yo'l yoki internet havolasi.",
      "alt: Muqobil matn (SEO va qulaylik uchun majburiy hisoblanadi).",
      "width va height: Rasmning pikseldagi eni va bo'yi.",
      "loading=\"lazy\": Sahifa pastroqqa aylantirilgandagina rasmni yuklab, tezlikni oshiradi."
    ],
    "codeExample": "<img \n  src=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500\" \n  alt=\"Dasturchi noutbuk qarshisida kod yozmoqda\" \n  width=\"400\" \n  loading=\"lazy\"\n/>",
    "practiceTask": "src va alt atributlariga ega <img> tegi yozing.",
    "starterCode": "<img src=\"avatar.jpg\" alt=\"Foydalanuvchi rasmi\" width=\"200\" />",
    "solutionKeyword": "alt=",
    "realWorldExamples": [
      "// Yuklanishi tez va optimallashtirilgan rasm:\n<img src=\"/images/banner.webp\" alt=\"Frontend kursi noutbuk ekrani\" width=\"600\" height=\"350\" loading=\"lazy\" />",
      "// Izohli rasm (figure):\n<figure>\n  <img src=\"/images/chart.png\" alt=\"Yillik o'sish grafigi\" />\n  <figcaption>1-rasm: 2026-yilgi talabalar ko'rsatkichi.</figcaption>\n</figure>"
    ],
    "cheatSheetTips": [
      "alt atributini bo'sh qoldirmang — ekran o'qigichlar va Google SEO uchun bu majburiydir.",
      "Pastdagi barcha rasmlarga loading='lazy' qo'shing — sahifa 2 barobar tezroq ochiladi.",
      "Og'ir PNG o'rniga zamonaviy WebP yoki AVIF formatlarini tanlang."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"6. Rasmlar (<img>, alt, responsive media)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "6. Rasmlar (<img>, alt, responsive media)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "HTML da rasmlar <img> toq tegi orqali ulanadi. Uning ikkita eng muhim atributi bor: 'src' (rasm manzili) va 'alt' (rasm yuklanmay qolganda chiqadigan tavsif). HTML5 da rasmlarni izoh bilan guruhlash uchun <figure> va <figcaption>, shuningdek turli ekranlar uchun <picture> elementi qo'llaniladi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "src: Rasm fayliga olib boruvchi yo'l yoki internet havolasi.",
          "alt: Muqobil matn (SEO va qulaylik uchun majburiy hisoblanadi).",
          "width va height: Rasmning pikseldagi eni va bo'yi.",
          "loading=\"lazy\": Sahifa pastroqqa aylantirilgandagina rasmni yuklab, tezlikni oshiradi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<img \n  src=\"https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500\" \n  alt=\"Dasturchi noutbuk qarshisida kod yozmoqda\" \n  width=\"400\" \n  loading=\"lazy\"\n/>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Yuklanishi tez va optimallashtirilgan rasm:\n<img src=\"/images/banner.webp\" alt=\"Frontend kursi noutbuk ekrani\" width=\"600\" height=\"350\" loading=\"lazy\" />",
          "// Izohli rasm (figure):\n<figure>\n  <img src=\"/images/chart.png\" alt=\"Yillik o'sish grafigi\" />\n  <figcaption>1-rasm: 2026-yilgi talabalar ko'rsatkichi.</figcaption>\n</figure>"
        ],
        "codeSnippet": "// Yuklanishi tez va optimallashtirilgan rasm:\n<img src=\"/images/banner.webp\" alt=\"Frontend kursi noutbuk ekrani\" width=\"600\" height=\"350\" loading=\"lazy\" />",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "alt atributini bo'sh qoldirmang — ekran o'qigichlar va Google SEO uchun bu majburiydir.",
          "Pastdagi barcha rasmlarga loading='lazy' qo'shing — sahifa 2 barobar tezroq ochiladi.",
          "Og'ir PNG o'rniga zamonaviy WebP yoki AVIF formatlarini tanlang."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: src va alt atributlariga ega <img> tegi yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"alt=\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<img src=\"avatar.jpg\" alt=\"Foydalanuvchi rasmi\" width=\"200\" />",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-7",
    "stage": "html",
    "title": "7. Jadvallar (<table>, tr, th, td, colspan, rowspan)",
    "duration": "35 daqiqa",
    "xpReward": 140,
    "w3ReferenceTopic": "HTML Tables & Complex Layouts",
    "summary": "Ma'lumotlarni tartibli va tizimli taqdim etish uchun ro'yxatlar eng qulay vositadir. Sayt menyusi, dars rejasi va ko'nikmalar ro'yxati ro'yxatlar yordamida yoziladi. 3 xil ro'yxat turi mavjud: <ul> (tartibsiz, nuqtali), <ol> (tartiblangan, raqamli) va <dl> (atamalar lug'ati).",
    "theoryDetails": [
      "<thead>, <tbody>, <tfoot>: Jadvalning bosh, asosiy tanasi va yakuniy qismlari.",
      "colspan=\"2\": 2 ta qo'shni ustunni bitta katakchaga aylantiradi.",
      "rowspan=\"2\": 2 ta vertikal qatorni bitta katakchaga birlashtiradi."
    ],
    "codeExample": "<table border=\"1\" style=\"border-collapse: collapse; width: 100%;\">\n  <thead>\n    <tr>\n      <th>O'quvchi</th>\n      <th>Bosqich</th>\n      <th>Ball (XP)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Olimjon</td>\n      <td>JavaScript</td>\n      <td>1,500</td>\n    </tr>\n    <tr>\n      <td colspan=\"2\">Umumiy Guruh O'rtacha Bali</td>\n      <td>1,420</td>\n    </tr>\n  </tbody>\n</table>",
    "practiceTask": "Kamida 2 ta <tr> va <td> lardan iborat jadval tuzing.",
    "starterCode": "<table border=\"1\">\n  <tr><th>Fan</th><th>Baho</th></tr>\n  <tr><td>HTML</td><td>5</td></tr>\n</table>",
    "solutionKeyword": "<table>",
    "realWorldExamples": [
      "// Veb-sayt menyusi asosi:\n<nav>\n  <ul>\n    <li><a href=\"/\">Bosh Sahifa</a></li>\n    <li><a href=\"/kurslar\">Kurslar</a></li>\n    <li><a href=\"/kontakt\">Aloqa</a></li>\n  </ul>\n</nav>",
      "// Qadam-baqadam ko'rsatma:\n<ol type=\"1\">\n  <li>HTML o'rganing</li>\n  <li>CSS bilan bezang</li>\n  <li>JS bilan jonlantiring</li>\n</ol>"
    ],
    "cheatSheetTips": [
      "<ul> va <ol> ning ichida bevosita FAQAT <li> tegi bo'lishi shart.",
      "Navigatsiya menyularini <div> lar bilan emas, <nav><ul><li><a> bilan tuzish eng yaxshi amaliyotdir.",
      "CSS da list-style: none berib nuqtalarni oson olib tashlash mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"7. Jadvallar (<table>, tr, th, td, colspan, rowspan)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "7. Jadvallar (<table>, tr, th, td, colspan, rowspan)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Ma'lumotlarni tartibli va tizimli taqdim etish uchun ro'yxatlar eng qulay vositadir. Sayt menyusi, dars rejasi va ko'nikmalar ro'yxati ro'yxatlar yordamida yoziladi. 3 xil ro'yxat turi mavjud: <ul> (tartibsiz, nuqtali), <ol> (tartiblangan, raqamli) va <dl> (atamalar lug'ati).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<thead>, <tbody>, <tfoot>: Jadvalning bosh, asosiy tanasi va yakuniy qismlari.",
          "colspan=\"2\": 2 ta qo'shni ustunni bitta katakchaga aylantiradi.",
          "rowspan=\"2\": 2 ta vertikal qatorni bitta katakchaga birlashtiradi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<table border=\"1\" style=\"border-collapse: collapse; width: 100%;\">\n  <thead>\n    <tr>\n      <th>O'quvchi</th>\n      <th>Bosqich</th>\n      <th>Ball (XP)</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Olimjon</td>\n      <td>JavaScript</td>\n      <td>1,500</td>\n    </tr>\n    <tr>\n      <td colspan=\"2\">Umumiy Guruh O'rtacha Bali</td>\n      <td>1,420</td>\n    </tr>\n  </tbody>\n</table>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Veb-sayt menyusi asosi:\n<nav>\n  <ul>\n    <li><a href=\"/\">Bosh Sahifa</a></li>\n    <li><a href=\"/kurslar\">Kurslar</a></li>\n    <li><a href=\"/kontakt\">Aloqa</a></li>\n  </ul>\n</nav>",
          "// Qadam-baqadam ko'rsatma:\n<ol type=\"1\">\n  <li>HTML o'rganing</li>\n  <li>CSS bilan bezang</li>\n  <li>JS bilan jonlantiring</li>\n</ol>"
        ],
        "codeSnippet": "// Veb-sayt menyusi asosi:\n<nav>\n  <ul>\n    <li><a href=\"/\">Bosh Sahifa</a></li>\n    <li><a href=\"/kurslar\">Kurslar</a></li>\n    <li><a href=\"/kontakt\">Aloqa</a></li>\n  </ul>\n</nav>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "<ul> va <ol> ning ichida bevosita FAQAT <li> tegi bo'lishi shart.",
          "Navigatsiya menyularini <div> lar bilan emas, <nav><ul><li><a> bilan tuzish eng yaxshi amaliyotdir.",
          "CSS da list-style: none berib nuqtalarni oson olib tashlash mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Kamida 2 ta <tr> va <td> lardan iborat jadval tuzing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<table>\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +140 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<table border=\"1\">\n  <tr><th>Fan</th><th>Baho</th></tr>\n  <tr><td>HTML</td><td>5</td></tr>\n</table>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-8",
    "stage": "html",
    "title": "8. Ro'yxatlar (<ul>, <ol>, <dl>, <dt>, <dd>)",
    "duration": "25 daqiqa",
    "xpReward": 120,
    "w3ReferenceTopic": "HTML Lists (Unordered, Ordered, Description)",
    "summary": "Jadvallar statistik ma'lumotlar, narxlar jadvali va dars jadvallarini kataklar shaklida ko'rsatish uchun mo'ljallangan. <table> konteyner, <tr> qator, <th> sarlavha katagi, <td> esa oddiy ma'lumot katagidir. Kataklarni birlashtirish uchun colspan va rowspan ishlatiladi.",
    "theoryDetails": [
      "<ol type=\"A\">: Harfli (A, B, C) yoki Rim raqamlari (I, II, III) bilan tartiblash.",
      "<ul>: Menyu (navigatsiya panellari) va kartalar ro'yxatini tuzishda eng ko'p ishlatiladi.",
      "Har bir ro'yxat elementi <li> tegi ichiga olinadi."
    ],
    "codeExample": "<!-- Tartibsiz ro'yxat -->\n<ul>\n  <li>HTML Asoslari</li>\n  <li>CSS Stillari</li>\n  <li>JavaScript Jonlantirish</li>\n</ul>\n\n<!-- Atamalar ta'rifi ro'yxati -->\n<dl>\n  <dt>HTML</dt>\n  <dd>Gipermatnli belgilash tili.</dd>\n  <dt>CSS</dt>\n  <dd>Sahifaning dizayni va uslubi.</dd>\n</dl>",
    "practiceTask": "<ul> ichida kamida uchta <li> yozing.",
    "starterCode": "<ul>\n  <li>React</li>\n  <li>TypeScript</li>\n  <li>Node.js</li>\n</ul>",
    "solutionKeyword": "<ul>",
    "realWorldExamples": [
      "// Birlashtirilgan kataklar bilan dars jadvali:\n<table border=\"1\">\n  <thead>\n    <tr><th>Kun</th><th>Fan</th><th>Vaqt</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Juma</td><td colspan=\"2\">Frontend Amaliyot (19:00 - 21:00)</td></tr>\n  </tbody>\n</table>",
      "// Xarid cheki hisoboti:\n<table>\n  <tr><td>Darslik</td><td>120,000</td></tr>\n  <tr><th>Jami:</th><th>120,000 so'm</th></tr>\n</table>"
    ],
    "cheatSheetTips": [
      "Jadvallardan sahifaning umumiy maketini (layout) yasash uchun foydalanmang; jadvallar faqat ma'lumotlar uchun.",
      "Har doim <thead> va <tbody> teglari bilan jadvalni semantik ajrating.",
      "CSS da border-collapse: collapse qo'shilsa qo'shaloq chiziqlar birlashadi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"8. Ro'yxatlar (<ul>, <ol>, <dl>, <dt>, <dd>)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "8. Ro'yxatlar (<ul>, <ol>, <dl>, <dt>, <dd>)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Jadvallar statistik ma'lumotlar, narxlar jadvali va dars jadvallarini kataklar shaklida ko'rsatish uchun mo'ljallangan. <table> konteyner, <tr> qator, <th> sarlavha katagi, <td> esa oddiy ma'lumot katagidir. Kataklarni birlashtirish uchun colspan va rowspan ishlatiladi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<ol type=\"A\">: Harfli (A, B, C) yoki Rim raqamlari (I, II, III) bilan tartiblash.",
          "<ul>: Menyu (navigatsiya panellari) va kartalar ro'yxatini tuzishda eng ko'p ishlatiladi.",
          "Har bir ro'yxat elementi <li> tegi ichiga olinadi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<!-- Tartibsiz ro'yxat -->\n<ul>\n  <li>HTML Asoslari</li>\n  <li>CSS Stillari</li>\n  <li>JavaScript Jonlantirish</li>\n</ul>\n\n<!-- Atamalar ta'rifi ro'yxati -->\n<dl>\n  <dt>HTML</dt>\n  <dd>Gipermatnli belgilash tili.</dd>\n  <dt>CSS</dt>\n  <dd>Sahifaning dizayni va uslubi.</dd>\n</dl>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Birlashtirilgan kataklar bilan dars jadvali:\n<table border=\"1\">\n  <thead>\n    <tr><th>Kun</th><th>Fan</th><th>Vaqt</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Juma</td><td colspan=\"2\">Frontend Amaliyot (19:00 - 21:00)</td></tr>\n  </tbody>\n</table>",
          "// Xarid cheki hisoboti:\n<table>\n  <tr><td>Darslik</td><td>120,000</td></tr>\n  <tr><th>Jami:</th><th>120,000 so'm</th></tr>\n</table>"
        ],
        "codeSnippet": "// Birlashtirilgan kataklar bilan dars jadvali:\n<table border=\"1\">\n  <thead>\n    <tr><th>Kun</th><th>Fan</th><th>Vaqt</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Juma</td><td colspan=\"2\">Frontend Amaliyot (19:00 - 21:00)</td></tr>\n  </tbody>\n</table>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Jadvallardan sahifaning umumiy maketini (layout) yasash uchun foydalanmang; jadvallar faqat ma'lumotlar uchun.",
          "Har doim <thead> va <tbody> teglari bilan jadvalni semantik ajrating.",
          "CSS da border-collapse: collapse qo'shilsa qo'shaloq chiziqlar birlashadi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <ul> ichida kamida uchta <li> yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<ul>\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +120 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<ul>\n  <li>React</li>\n  <li>TypeScript</li>\n  <li>Node.js</li>\n</ul>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-9",
    "stage": "html",
    "title": "9. Blok vs Inline & Semantik Teglar (header, nav, main, footer)",
    "duration": "30 daqiqa",
    "xpReward": 140,
    "w3ReferenceTopic": "HTML Block & Inline, Semantic Elements",
    "summary": "Formalar (Forms) foydalanuvchidan ma'lumot olishning asosiy qurolidir: ro'yxatdan o'tish, qidiruv va fikr-mulohazalar. <form> tegi action va method atributlari bilan ishlaydi. <input> maydonlari matn, email, parol, son va checkbox turlariga ega. <label> esa maydonning rasmiy nomidir.",
    "theoryDetails": [
      "<header>: Sahifaning yuqori shapkasi (logo, qidiruv).",
      "<nav>: Asosiy navigatsiya va havolalar paneli.",
      "<main>: Sahifaning yagona va asosiy mazmuniy kontenti.",
      "<article>: O'z-o'zidan mustaqil yangilik, maqola yoki post.",
      "<footer>: Sahifaning quyi qismi (mualliflik huquqi, kontaktlar)."
    ],
    "codeExample": "<header>\n  <h1>DevMaster Veb Portali</h1>\n  <nav>\n    <a href=\"#bosh\">Bosh Sahifa</a> | <a href=\"#kurslar\">Kurslar</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Dasturchilikni Boshlash</h2>\n    <p>HTML bilan birinchi qadamlar juda oson.</p>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2026 DevMaster. Barcha huquqlar himoyalangan.</p>\n</footer>",
    "practiceTask": "<header>, <main> va <footer> teglaridan foydalanib semantik skelet yarating.",
    "starterCode": "<header><h1>Mening Saytim</h1></header>\n<main><p>Asosiy qism</p></main>\n<footer><p>Aloqa</p></footer>",
    "solutionKeyword": "<main>",
    "realWorldExamples": [
      "// Kirish formasi:\n<form action=\"/login\" method=\"POST\">\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required placeholder=\"user@mail.com\" />\n  <label for=\"parol\">Parol:</label>\n  <input type=\"password\" id=\"parol\" name=\"parol\" required minlength=\"6\" />\n  <button type=\"submit\">Kirish</button>\n</form>",
      "// Qidiruv paneli:\n<form action=\"/qidiruv\" method=\"GET\">\n  <input type=\"search\" name=\"q\" placeholder=\"Darsni qidiring...\" />\n</form>"
    ],
    "cheatSheetTips": [
      "Har doim <label for='id'> va <input id='id'> juftligini bir xil qiling — kursor avtomatik maydonga o'tadi.",
      "Backendga ma'lumot yetib borishi uchun har bir inputda 'name' atributi bo'lishi SHART.",
      "Parollar uchun doimo type='password' ishlating."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"9. Blok vs Inline & Semantik Teglar (header, nav, main, footer)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "9. Blok vs Inline & Semantik Teglar (header, nav, main, footer)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Formalar (Forms) foydalanuvchidan ma'lumot olishning asosiy qurolidir: ro'yxatdan o'tish, qidiruv va fikr-mulohazalar. <form> tegi action va method atributlari bilan ishlaydi. <input> maydonlari matn, email, parol, son va checkbox turlariga ega. <label> esa maydonning rasmiy nomidir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<header>: Sahifaning yuqori shapkasi (logo, qidiruv).",
          "<nav>: Asosiy navigatsiya va havolalar paneli.",
          "<main>: Sahifaning yagona va asosiy mazmuniy kontenti.",
          "<article>: O'z-o'zidan mustaqil yangilik, maqola yoki post.",
          "<footer>: Sahifaning quyi qismi (mualliflik huquqi, kontaktlar)."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<header>\n  <h1>DevMaster Veb Portali</h1>\n  <nav>\n    <a href=\"#bosh\">Bosh Sahifa</a> | <a href=\"#kurslar\">Kurslar</a>\n  </nav>\n</header>\n\n<main>\n  <article>\n    <h2>Dasturchilikni Boshlash</h2>\n    <p>HTML bilan birinchi qadamlar juda oson.</p>\n  </article>\n</main>\n\n<footer>\n  <p>&copy; 2026 DevMaster. Barcha huquqlar himoyalangan.</p>\n</footer>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Kirish formasi:\n<form action=\"/login\" method=\"POST\">\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required placeholder=\"user@mail.com\" />\n  <label for=\"parol\">Parol:</label>\n  <input type=\"password\" id=\"parol\" name=\"parol\" required minlength=\"6\" />\n  <button type=\"submit\">Kirish</button>\n</form>",
          "// Qidiruv paneli:\n<form action=\"/qidiruv\" method=\"GET\">\n  <input type=\"search\" name=\"q\" placeholder=\"Darsni qidiring...\" />\n</form>"
        ],
        "codeSnippet": "// Kirish formasi:\n<form action=\"/login\" method=\"POST\">\n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required placeholder=\"user@mail.com\" />\n  <label for=\"parol\">Parol:</label>\n  <input type=\"password\" id=\"parol\" name=\"parol\" required minlength=\"6\" />\n  <button type=\"submit\">Kirish</button>\n</form>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Har doim <label for='id'> va <input id='id'> juftligini bir xil qiling — kursor avtomatik maydonga o'tadi.",
          "Backendga ma'lumot yetib borishi uchun har bir inputda 'name' atributi bo'lishi SHART.",
          "Parollar uchun doimo type='password' ishlating."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <header>, <main> va <footer> teglaridan foydalanib semantik skelet yarating.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<main>\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +140 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<header><h1>Mening Saytim</h1></header>\n<main><p>Asosiy qism</p></main>\n<footer><p>Aloqa</p></footer>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-10",
    "stage": "html",
    "title": "10. Audio va Video Multimedia Teglari",
    "duration": "25 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "HTML Audio & Video Elements",
    "summary": "Ko'p qatorli matnlar uchun <textarea>, ochiluvchi ro'yxatlar uchun <select> va <option>, avtomatik takliflar uchun <datalist>, hamda maydonlarni ramkaga olib guruhlash uchun <fieldset> va <legend> teglari qo'llaniladi.",
    "theoryDetails": [
      "<video controls width=\"500\">: Videoni o'lchami va boshqaruv paneli bilan chiqaradi.",
      "<source src=\"video.mp4\" type=\"video/mp4\">: Video formatlarini brauzerga taklif qiladi.",
      "autoplay: Sahifa ochilishi bilan videoni avtomatik qo'yish (odatda muted bilan birga ishlaydi).",
      "loop: Trek yoki video tugagach, qayta boshidan takrorlash."
    ],
    "codeExample": "<!-- Video Pleyer -->\n<video controls width=\"480\" poster=\"preview.jpg\">\n  <source src=\"dars.mp4\" type=\"video/mp4\">\n  Sizning brauzeringiz video tegini qo'llab-quvvatlamaydi.\n</video>\n\n<!-- Audio Pleyer -->\n<audio controls>\n  <source src=\"audio.mp3\" type=\"audio/mpeg\">\n</audio>",
    "practiceTask": "controls atributiga ega <video> yoki <audio> tegi yozing.",
    "starterCode": "<video controls width=\"320\">\n  <source src=\"intro.mp4\" type=\"video/mp4\">\n</video>",
    "solutionKeyword": "controls",
    "realWorldExamples": [
      "// Viloyat tanlash:\n<select name=\"viloyat\" required>\n  <option value=\"\">-- Tanlang --</option>\n  <option value=\"toshkent\">Toshkent</option>\n  <option value=\"samarqand\">Samarqand</option>\n</select>",
      "// Datalist bilan taklif:\n<input list=\"kurslar\" name=\"kurs\" placeholder=\"Kursni tanlang...\" />\n<datalist id=\"kurslar\">\n  <option value=\"Frontend\" />\n  <option value=\"Backend\" />\n</datalist>"
    ],
    "cheatSheetTips": [
      "<textarea> da qiymat value atributida emas, <textarea>Matn</textarea> orasiga yoziladi.",
      "<fieldset> va <legend> formani o'qilishi va dizaynini ancha chiroyli qiladi.",
      "<select> ga multiple atributini qo'shsangiz bir nechta tanlov qilish mumkin bo'ladi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"10. Audio va Video Multimedia Teglari\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "10. Audio va Video Multimedia Teglari",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Ko'p qatorli matnlar uchun <textarea>, ochiluvchi ro'yxatlar uchun <select> va <option>, avtomatik takliflar uchun <datalist>, hamda maydonlarni ramkaga olib guruhlash uchun <fieldset> va <legend> teglari qo'llaniladi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<video controls width=\"500\">: Videoni o'lchami va boshqaruv paneli bilan chiqaradi.",
          "<source src=\"video.mp4\" type=\"video/mp4\">: Video formatlarini brauzerga taklif qiladi.",
          "autoplay: Sahifa ochilishi bilan videoni avtomatik qo'yish (odatda muted bilan birga ishlaydi).",
          "loop: Trek yoki video tugagach, qayta boshidan takrorlash."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<!-- Video Pleyer -->\n<video controls width=\"480\" poster=\"preview.jpg\">\n  <source src=\"dars.mp4\" type=\"video/mp4\">\n  Sizning brauzeringiz video tegini qo'llab-quvvatlamaydi.\n</video>\n\n<!-- Audio Pleyer -->\n<audio controls>\n  <source src=\"audio.mp3\" type=\"audio/mpeg\">\n</audio>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Viloyat tanlash:\n<select name=\"viloyat\" required>\n  <option value=\"\">-- Tanlang --</option>\n  <option value=\"toshkent\">Toshkent</option>\n  <option value=\"samarqand\">Samarqand</option>\n</select>",
          "// Datalist bilan taklif:\n<input list=\"kurslar\" name=\"kurs\" placeholder=\"Kursni tanlang...\" />\n<datalist id=\"kurslar\">\n  <option value=\"Frontend\" />\n  <option value=\"Backend\" />\n</datalist>"
        ],
        "codeSnippet": "// Viloyat tanlash:\n<select name=\"viloyat\" required>\n  <option value=\"\">-- Tanlang --</option>\n  <option value=\"toshkent\">Toshkent</option>\n  <option value=\"samarqand\">Samarqand</option>\n</select>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "<textarea> da qiymat value atributida emas, <textarea>Matn</textarea> orasiga yoziladi.",
          "<fieldset> va <legend> formani o'qilishi va dizaynini ancha chiroyli qiladi.",
          "<select> ga multiple atributini qo'shsangiz bir nechta tanlov qilish mumkin bo'ladi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: controls atributiga ega <video> yoki <audio> tegi yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"controls\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<video controls width=\"320\">\n  <source src=\"intro.mp4\" type=\"video/mp4\">\n</video>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-11",
    "stage": "html",
    "title": "11. Formalar (<form>) va Input Turlari",
    "duration": "35 daqiqa",
    "xpReward": 150,
    "w3ReferenceTopic": "HTML Forms & Diverse Input Types",
    "summary": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) saytning har bir bo'lagiga mantiqiy ma'no yuklaydi. Bu qidiruv tizimlari (SEO) va ko'zi ojizlar uchun ekran o'qigichlariga sahifani to'g'ri tushunishga yordam beradi.",
    "theoryDetails": [
      "type=\"text\": Oddiy bir qatorli matn kiritish.",
      "type=\"password\": Yozilgan belgilar yashirin (nuqta) bo'lib ko'rinadi.",
      "type=\"email\": Email formatini (@ belgisini) avtomatik tekshiradi.",
      "type=\"checkbox\": Bir nechta variantni belgilash imkoniyati.",
      "type=\"radio\": Faqat bitta variantni tanlash (bir xil name bilan birlashtiriladi)."
    ],
    "codeExample": "<form action=\"/royxatdan-otish\" method=\"POST\">\n  <label for=\"ism\">Ismingiz:</label>\n  <input type=\"text\" id=\"ism\" name=\"ism\" placeholder=\"Ali Valiyev\" required>\n\n  <label for=\"parol\">Parol:</label>\n  <input type=\"password\" id=\"parol\" name=\"parol\" required>\n\n  <label><input type=\"checkbox\" name=\"shart\"> Qoidalarga roziman</label>\n  <button type=\"submit\">Yuborish</button>\n</form>",
    "practiceTask": "type=\"email\" va type=\"password\" bo'lgan ikkita input yarating.",
    "starterCode": "<form>\n  <input type=\"email\" placeholder=\"Email kiriting\" required>\n  <input type=\"password\" placeholder=\"Parol\" required>\n  <button type=\"submit\">Kirish</button>\n</form>",
    "solutionKeyword": "type=\"email\"",
    "realWorldExamples": [
      "// Semantik blog sahifasi:\n<main>\n  <article>\n    <header><h1>CSS Grid Qoidalari</h1></header>\n    <p>Maqola matni shu yerda...</p>\n    <footer>Muallif: Olimjon</footer>\n  </article>\n</main>",
      "// Mahsulot kartasi:\n<article class=\"card\">\n  <h3>MacBook Pro</h3>\n  <p>Narxi: $1,400</p>\n</article>"
    ],
    "cheatSheetTips": [
      "Hamma narsani <div> qilaverish ('div soup') dan saqlaning, semantik teglarni ishlating.",
      "<main> tegi bitta sahifada faqat bir marta ishlatilishi shart.",
      "<section> ichida har doim sarlavha (<h2>, <h3>) bo'lishi tavsiya etiladi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"11. Formalar (<form>) va Input Turlari\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "11. Formalar (<form>) va Input Turlari",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <aside>, <footer>) saytning har bir bo'lagiga mantiqiy ma'no yuklaydi. Bu qidiruv tizimlari (SEO) va ko'zi ojizlar uchun ekran o'qigichlariga sahifani to'g'ri tushunishga yordam beradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "type=\"text\": Oddiy bir qatorli matn kiritish.",
          "type=\"password\": Yozilgan belgilar yashirin (nuqta) bo'lib ko'rinadi.",
          "type=\"email\": Email formatini (@ belgisini) avtomatik tekshiradi.",
          "type=\"checkbox\": Bir nechta variantni belgilash imkoniyati.",
          "type=\"radio\": Faqat bitta variantni tanlash (bir xil name bilan birlashtiriladi)."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<form action=\"/royxatdan-otish\" method=\"POST\">\n  <label for=\"ism\">Ismingiz:</label>\n  <input type=\"text\" id=\"ism\" name=\"ism\" placeholder=\"Ali Valiyev\" required>\n\n  <label for=\"parol\">Parol:</label>\n  <input type=\"password\" id=\"parol\" name=\"parol\" required>\n\n  <label><input type=\"checkbox\" name=\"shart\"> Qoidalarga roziman</label>\n  <button type=\"submit\">Yuborish</button>\n</form>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Semantik blog sahifasi:\n<main>\n  <article>\n    <header><h1>CSS Grid Qoidalari</h1></header>\n    <p>Maqola matni shu yerda...</p>\n    <footer>Muallif: Olimjon</footer>\n  </article>\n</main>",
          "// Mahsulot kartasi:\n<article class=\"card\">\n  <h3>MacBook Pro</h3>\n  <p>Narxi: $1,400</p>\n</article>"
        ],
        "codeSnippet": "// Semantik blog sahifasi:\n<main>\n  <article>\n    <header><h1>CSS Grid Qoidalari</h1></header>\n    <p>Maqola matni shu yerda...</p>\n    <footer>Muallif: Olimjon</footer>\n  </article>\n</main>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Hamma narsani <div> qilaverish ('div soup') dan saqlaning, semantik teglarni ishlating.",
          "<main> tegi bitta sahifada faqat bir marta ishlatilishi shart.",
          "<section> ichida har doim sarlavha (<h2>, <h3>) bo'lishi tavsiya etiladi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: type=\"email\" va type=\"password\" bo'lgan ikkita input yarating.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"type=\"email\"\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +150 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<form>\n  <input type=\"email\" placeholder=\"Email kiriting\" required>\n  <input type=\"password\" placeholder=\"Parol\" required>\n  <button type=\"submit\">Kirish</button>\n</form>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-12",
    "stage": "html",
    "title": "12. Murakkab Forma Elementlari (textarea, select, datalist)",
    "duration": "30 daqiqa",
    "xpReward": 150,
    "w3ReferenceTopic": "HTML Form Elements (Select, Textarea, Datalist)",
    "summary": "Blokli elementlar (div, p, h1) butun qatorni egallaydi va yangi qatordan tushadi. Satrli (inline) elementlar (span, a, strong) esa matn ichida davom etadi va faqat o'ziga yetarli joyni oladi. <div> asosiy blok konteyneri, <span> esa matn ichidagi so'z bo'lagidir.",
    "theoryDetails": [
      "<textarea rows=\"4\" cols=\"50\">: Katta xabar, sharh va fikrlar yozish maydoni.",
      "<select>: Foydalanuvchiga variantlar tanlovini taqdim etuvchi dropdown ro'yxat.",
      "<datalist>: <input> ga yozayotganda oldindan takliflar ro'yxatini chiqarib beradi.",
      "<fieldset>: Formadagi bog'liq maydonlarni chiroyli hoshiyaga oladi."
    ],
    "codeExample": "<form>\n  <label for=\"viloyat\">Viloyatingizni tanlang:</label>\n  <select id=\"viloyat\" name=\"viloyat\">\n    <option value=\"toshkent\">Toshkent</option>\n    <option value=\"samarqand\">Samarqand</option>\n    <option value=\"xorazm\">Xorazm</option>\n  </select>\n\n  <label for=\"xabar\">Fikringiz:</label>\n  <textarea id=\"xabar\" rows=\"3\" placeholder=\"Fikringizni qoldiring...\"></textarea>\n</form>",
    "practiceTask": "<select> va kamida 2 ta <option> elementi yozing.",
    "starterCode": "<select name=\"til\">\n  <option value=\"uz\">O'zbek</option>\n  <option value=\"en\">Ingliz</option>\n</select>",
    "solutionKeyword": "<select",
    "realWorldExamples": [
      "// Narx yorlig'ida span:\n<div class=\"narx\">\n  <span class=\"valyuta\">$</span>\n  <span class=\"qiymat\">99</span>\n  <span class=\"oy\">/oy</span>\n</div>",
      "// Rangli nishon:\n<span class=\"badge\" style=\"background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px;\">Faol</span>"
    ],
    "cheatSheetTips": [
      "Inline element ichiga hech qachon blokli element (masalan <a> ichiga <div>) qo'ymang.",
      "<span> o'zidan o'zi hech qanday uslubga ega emas, faqat CSS yoki JS bilan ishlaydi.",
      "CSS dagi display: flex orqali blokli elementlarni osongina yonma-yon qilish mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"12. Murakkab Forma Elementlari (textarea, select, datalist)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "12. Murakkab Forma Elementlari (textarea, select, datalist)",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Blokli elementlar (div, p, h1) butun qatorni egallaydi va yangi qatordan tushadi. Satrli (inline) elementlar (span, a, strong) esa matn ichida davom etadi va faqat o'ziga yetarli joyni oladi. <div> asosiy blok konteyneri, <span> esa matn ichidagi so'z bo'lagidir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<textarea rows=\"4\" cols=\"50\">: Katta xabar, sharh va fikrlar yozish maydoni.",
          "<select>: Foydalanuvchiga variantlar tanlovini taqdim etuvchi dropdown ro'yxat.",
          "<datalist>: <input> ga yozayotganda oldindan takliflar ro'yxatini chiqarib beradi.",
          "<fieldset>: Formadagi bog'liq maydonlarni chiroyli hoshiyaga oladi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<form>\n  <label for=\"viloyat\">Viloyatingizni tanlang:</label>\n  <select id=\"viloyat\" name=\"viloyat\">\n    <option value=\"toshkent\">Toshkent</option>\n    <option value=\"samarqand\">Samarqand</option>\n    <option value=\"xorazm\">Xorazm</option>\n  </select>\n\n  <label for=\"xabar\">Fikringiz:</label>\n  <textarea id=\"xabar\" rows=\"3\" placeholder=\"Fikringizni qoldiring...\"></textarea>\n</form>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Narx yorlig'ida span:\n<div class=\"narx\">\n  <span class=\"valyuta\">$</span>\n  <span class=\"qiymat\">99</span>\n  <span class=\"oy\">/oy</span>\n</div>",
          "// Rangli nishon:\n<span class=\"badge\" style=\"background: #dcfce7; color: #166534; padding: 2px 6px; border-radius: 4px;\">Faol</span>"
        ],
        "codeSnippet": "// Narx yorlig'ida span:\n<div class=\"narx\">\n  <span class=\"valyuta\">$</span>\n  <span class=\"qiymat\">99</span>\n  <span class=\"oy\">/oy</span>\n</div>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Inline element ichiga hech qachon blokli element (masalan <a> ichiga <div>) qo'ymang.",
          "<span> o'zidan o'zi hech qanday uslubga ega emas, faqat CSS yoki JS bilan ishlaydi.",
          "CSS dagi display: flex orqali blokli elementlarni osongina yonma-yon qilish mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <select> va kamida 2 ta <option> elementi yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<select\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +150 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<select name=\"til\">\n  <option value=\"uz\">O'zbek</option>\n  <option value=\"en\">Ingliz</option>\n</select>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-13",
    "stage": "html",
    "title": "13. Iframes va Tashqi Manbalar",
    "duration": "25 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "HTML Iframes & Embedded Content",
    "summary": "HTML5 veb-sahifalarga plaginlarsiz audio va video fayllarni ijro etish qobiliyatini berdi. <video> va <audio> teglari 'controls' atributi orqali pleer tugmalarini chiqaradi. <iframe> orqali esa YouTube videolari yoki Google Xaritalarini sahifaga joylash mumkin.",
    "theoryDetails": [
      "src: O'rnatilayotgan tashqi sahifa yoki video URL manzili.",
      "allowfullscreen: Foydalanuvchiga to'liq ekranga yoyish imkonini berish.",
      "loading=\"lazy\": Xarita yoki iframeni sahifa pastiga tushganda kechiktirib yuklash."
    ],
    "codeExample": "<iframe \n  src=\"https://www.google.com/maps/embed?...\" \n  width=\"600\" \n  height=\"300\" \n  style=\"border:0;\" \n  allowfullscreen=\"\" \n  loading=\"lazy\">\n</iframe>",
    "practiceTask": "src va width atributlariga ega <iframe> tegi yozing.",
    "starterCode": "<iframe src=\"https://example.com\" width=\"400\" height=\"250\"></iframe>",
    "solutionKeyword": "<iframe",
    "realWorldExamples": [
      "// Orqa fondagi ovozsiz video:\n<video autoplay loop muted playsinline width=\"100%\">\n  <source src=\"/video/hero.mp4\" type=\"video/mp4\" />\n</video>",
      "// YouTube iframe:\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" allowfullscreen></iframe>"
    ],
    "cheatSheetTips": [
      "Video yoki audio ga 'controls' atributini yozishni unutmang, aks holda pleer ko'rinmaydi.",
      "Avtomatik ijro (autoplay) ishlashi uchun doimo 'muted' (ovozsiz) atributini ham qo'shing.",
      "Iframe larga allowfullscreen va xavfsizlik atributlarini belgilang."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"13. Iframes va Tashqi Manbalar\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "13. Iframes va Tashqi Manbalar",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "HTML5 veb-sahifalarga plaginlarsiz audio va video fayllarni ijro etish qobiliyatini berdi. <video> va <audio> teglari 'controls' atributi orqali pleer tugmalarini chiqaradi. <iframe> orqali esa YouTube videolari yoki Google Xaritalarini sahifaga joylash mumkin.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "src: O'rnatilayotgan tashqi sahifa yoki video URL manzili.",
          "allowfullscreen: Foydalanuvchiga to'liq ekranga yoyish imkonini berish.",
          "loading=\"lazy\": Xarita yoki iframeni sahifa pastiga tushganda kechiktirib yuklash."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<iframe \n  src=\"https://www.google.com/maps/embed?...\" \n  width=\"600\" \n  height=\"300\" \n  style=\"border:0;\" \n  allowfullscreen=\"\" \n  loading=\"lazy\">\n</iframe>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Orqa fondagi ovozsiz video:\n<video autoplay loop muted playsinline width=\"100%\">\n  <source src=\"/video/hero.mp4\" type=\"video/mp4\" />\n</video>",
          "// YouTube iframe:\n<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/dQw4w9WgXcQ\" allowfullscreen></iframe>"
        ],
        "codeSnippet": "// Orqa fondagi ovozsiz video:\n<video autoplay loop muted playsinline width=\"100%\">\n  <source src=\"/video/hero.mp4\" type=\"video/mp4\" />\n</video>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Video yoki audio ga 'controls' atributini yozishni unutmang, aks holda pleer ko'rinmaydi.",
          "Avtomatik ijro (autoplay) ishlashi uchun doimo 'muted' (ovozsiz) atributini ham qo'shing.",
          "Iframe larga allowfullscreen va xavfsizlik atributlarini belgilang."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: src va width atributlariga ega <iframe> tegi yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<iframe\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<iframe src=\"https://example.com\" width=\"400\" height=\"250\"></iframe>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-14",
    "stage": "html",
    "title": "14. HTML5 Grafikasi: SVG va Canvas Asoslari",
    "duration": "30 daqiqa",
    "xpReward": 160,
    "w3ReferenceTopic": "HTML Graphics (SVG & Canvas)",
    "summary": "SVG (Scalable Vector Graphics) — kattalashtirilganda sifati mutlaqo buzilmaydigan matematik vektor grafikasidir. Ikonkalar va logotiplar uchun eng idealdir. <canvas> esa JavaScript orqali piksellar bilan rasm, o'yin va grafikalar chizish uchun mo'ljallangan bo'sh xolstdir.",
    "theoryDetails": [
      "<svg width=\"100\" height=\"100\">: Vektorli shakllar (aylana, to'rtburchak) chizish konteyneri.",
      "<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"cyan\" />: Aylana chizish tegi.",
      "<canvas id=\"myCanvas\">: JavaScript bilan chiziladigan 2D/3D maydon."
    ],
    "codeExample": "<!-- SVG Aylana -->\n<svg width=\"120\" height=\"120\">\n  <circle cx=\"60\" cy=\"60\" r=\"50\" stroke=\"#38bdf8\" stroke-width=\"4\" fill=\"#0f172a\" />\n</svg>\n\n<!-- Canvas maydoni -->\n<canvas id=\"oyunMaydoni\" width=\"300\" height=\"150\" style=\"border:1px solid #334155;\"></canvas>",
    "practiceTask": "<svg> ichida bitta <circle> shakli chizing.",
    "starterCode": "<svg width=\"100\" height=\"100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"teal\" />\n</svg>",
    "solutionKeyword": "<circle",
    "realWorldExamples": [
      "// SVG Qidiruv ikonkasi:\n<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n  <circle cx=\"11\" cy=\"11\" r=\"8\" />\n  <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\" />\n</svg>",
      "// Canvas maydoni:\n<canvas id=\"gameCanvas\" width=\"400\" height=\"300\" style=\"border:1px solid #333;\"></canvas>"
    ],
    "cheatSheetTips": [
      "UI ikonkalar va logotiplar uchun doimo SVG dan foydalaning — Retina ekranlarda tiniq ko'rinadi.",
      "SVG rangini CSS orqali 'fill' va 'stroke' xossalari bilan osongina o'zgartirish mumkin.",
      "Canvas o'lchamini CSS da emas, bevosita HTML width va height atributlarida bering."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"14. HTML5 Grafikasi: SVG va Canvas Asoslari\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "14. HTML5 Grafikasi: SVG va Canvas Asoslari",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "SVG (Scalable Vector Graphics) — kattalashtirilganda sifati mutlaqo buzilmaydigan matematik vektor grafikasidir. Ikonkalar va logotiplar uchun eng idealdir. <canvas> esa JavaScript orqali piksellar bilan rasm, o'yin va grafikalar chizish uchun mo'ljallangan bo'sh xolstdir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<svg width=\"100\" height=\"100\">: Vektorli shakllar (aylana, to'rtburchak) chizish konteyneri.",
          "<circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"cyan\" />: Aylana chizish tegi.",
          "<canvas id=\"myCanvas\">: JavaScript bilan chiziladigan 2D/3D maydon."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<!-- SVG Aylana -->\n<svg width=\"120\" height=\"120\">\n  <circle cx=\"60\" cy=\"60\" r=\"50\" stroke=\"#38bdf8\" stroke-width=\"4\" fill=\"#0f172a\" />\n</svg>\n\n<!-- Canvas maydoni -->\n<canvas id=\"oyunMaydoni\" width=\"300\" height=\"150\" style=\"border:1px solid #334155;\"></canvas>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// SVG Qidiruv ikonkasi:\n<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n  <circle cx=\"11\" cy=\"11\" r=\"8\" />\n  <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\" />\n</svg>",
          "// Canvas maydoni:\n<canvas id=\"gameCanvas\" width=\"400\" height=\"300\" style=\"border:1px solid #333;\"></canvas>"
        ],
        "codeSnippet": "// SVG Qidiruv ikonkasi:\n<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\">\n  <circle cx=\"11\" cy=\"11\" r=\"8\" />\n  <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\" />\n</svg>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "UI ikonkalar va logotiplar uchun doimo SVG dan foydalaning — Retina ekranlarda tiniq ko'rinadi.",
          "SVG rangini CSS orqali 'fill' va 'stroke' xossalari bilan osongina o'zgartirish mumkin.",
          "Canvas o'lchamini CSS da emas, bevosita HTML width va height atributlarida bering."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: <svg> ichida bitta <circle> shakli chizing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"<circle\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +160 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<svg width=\"100\" height=\"100\">\n  <circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"teal\" />\n</svg>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-html-15",
    "stage": "html",
    "title": "15. HTML Head, Meta Teglar, Viewport va SEO",
    "duration": "35 daqiqa",
    "xpReward": 180,
    "w3ReferenceTopic": "HTML Head, Viewport & Search Engine Optimization",
    "summary": "<head> sahifaning ko'rinmas miyasi hisoblanadi. <meta charset='UTF-8'> harflar kodlashini, <meta name='viewport' content='width=device-width, initial-scale=1.0'> esa mobil moslashuvchanlikni ta'minlaydi. Shuningdek <title>, <meta description> va Open Graph kartalari SEO natijalari uchun javobgardir.",
    "theoryDetails": [
      "charset=\"UTF-8\": O'zbek tilidagi barcha o'ziga xos harflar (o', g', sh, ch) to'g'ri ko'rinishi uchun shart.",
      "viewport: Mobil telefonlarda sahifa kichrayib ketmasdan, ekranga moslashib ochilishini ta'minlaydi.",
      "<meta name=\"description\" content=\"...\">: Google qidiruv natijalarida chiqadigan tavsif matni."
    ],
    "codeExample": "<!DOCTYPE html>\n<html lang=\"uz\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"DevMaster Dasturlash Akademiyasi rasmiy ta'lim portali\">\n  <title>DevMaster - Web Dasturlash</title>\n</head>\n<body>\n  <h1>Professional Dasturchi Bo'ling</h1>\n</body>\n</html>",
    "practiceTask": "meta charset va meta viewport teglari bo'lgan <head> yozing.",
    "starterCode": "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Mening Saytim</title>\n</head>",
    "solutionKeyword": "viewport",
    "realWorldExamples": [
      "// Mukammal SEO va OpenGraph head bo'limi:\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>DevMaster Dasturlash Akademiyasi</title>\n  <meta name=\"description\" content=\"Frontend dasturlashni noldan professional darajada o'rganing.\" />\n  <meta property=\"og:title\" content=\"DevMaster Academy\" />\n  <meta property=\"og:image\" content=\"/og-banner.jpg\" />\n</head>",
      "// Favicon ramzi:\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />"
    ],
    "cheatSheetTips": [
      "<meta name='viewport'> bo'lmasa mobil telefonlarda sayt noqulay va kichrayib ko'rinadi.",
      "<title> sarlavhasi 50-60 belgidan oshmasligi eng yaxshi amaliyotdir.",
      "<meta name='description'> matni 150-160 belgi atrofida jozibali yozilishi kerak."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (HTML5 gipermatnli belgilash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"15. HTML Head, Meta Teglar, Viewport va SEO\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "<div class=\"btn\" onclick=\"openModal()\">Bosing</div>",
        "goodCode": "<button type=\"button\" class=\"btn\" onclick=\"openModal()\">Bosing</button>",
        "explanation": "Tugmalar uchun <div> emas, semantik <button> tegidan foydalanish shart. Aks holda klaviatura foydalanuvchilari (Tab va Enter) tugmaga kira olmaydi va screen readerlar buni tugma deb tanimaydi."
      },
      {
        "badCode": "<img src=\"/rasm.jpg\">",
        "goodCode": "<img src=\"/rasm.jpg\" alt=\"DevMaster akademiyasi dars jarayoni\" width=\"600\" height=\"400\" loading=\"lazy\">",
        "explanation": "'alt' atributi tushirib qoldirilsa qidiruv botlari (SEO) va ko'rishida nuqsoni bor insonlar rasm mazmunini bila olmaydi. O'lchamlar berilishi esa CLS (Cumulative Layout Shift) sakrashlarining oldini oladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "Junior/Middle suhbat savoli: Nima uchun HTML5 semantikasi sayt muvaffaqiyati uchun hal qiluvchi hisoblanadi?",
        "answer": "HTML5 semantik teglari (<header>, <nav>, <main>, <article>, <section>, <footer>) birinchidan, Google, Yandex kabi qidiruv tizimlariga sahifadagi eng muhim ma'lumotlarni tezda aniqlashga (SEO optimizatsiyasi) imkon beradi. Ikkinchidan, Accessibility (a11y) talablariga muvofiq, imkoniyati cheklangan shaxslar foydalanadigan Screen Reader dasturlari sahifa bo'ylab qulay sakrab o'qiy oladi. Uchinchidan, jamoada kod o'qilishi va qo'llab-quvvatlanishi (Maintainability) bir necha barobar oshadi."
      },
      {
        "question": "DOCTYPE deklaratsiyasi nima va u yozilmasa brauzerda nima yuz beradi?",
        "answer": "<!DOCTYPE html> — bu brauzerga veb-sahifa zamonaviy HTML5 standartida yozilganligini xabar qiluvchi yo'riqnomadir. Agar u yozilmasa, brauzer 'Quirks Mode' (moslashuv / eski rejim) ga o'tib ketadi va sahifadagi CSS Box Model, shrift o'lchamlari va jadvallar 1990-yillardagi eski qoidalar bo'yicha render qilinib, dizayn jiddiy buziladi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Element",
        "meaning": "Ochilish tegi, kontent va yopilish tegidan iborat to'liq HTML obyekti."
      },
      {
        "term": "Atribut (Attribute)",
        "meaning": "Elementga qo'shimcha vazifa yuklovchi nom='qiymat' shaklidagi xususiyat."
      },
      {
        "term": "Semantika",
        "meaning": "Tegning o'z nomidan qanday vazifa bajarishini bildiruvchi mantiqiy ma'nosi."
      },
      {
        "term": "Self-closing tag",
        "meaning": "Yopiluvchi tegi bo'lmagan toq teglar (masalan <br>, <hr>, <img>, <input>)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "15. HTML Head, Meta Teglar, Viewport va SEO",
        "subtitle": "HTML bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "<head> sahifaning ko'rinmas miyasi hisoblanadi. <meta charset='UTF-8'> harflar kodlashini, <meta name='viewport' content='width=device-width, initial-scale=1.0'> esa mobil moslashuvchanlikni ta'minlaydi. Shuningdek <title>, <meta description> va Open Graph kartalari SEO natijalari uchun javobgardir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "charset=\"UTF-8\": O'zbek tilidagi barcha o'ziga xos harflar (o', g', sh, ch) to'g'ri ko'rinishi uchun shart.",
          "viewport: Mobil telefonlarda sahifa kichrayib ketmasdan, ekranga moslashib ochilishini ta'minlaydi.",
          "<meta name=\"description\" content=\"...\">: Google qidiruv natijalarida chiqadigan tavsif matni."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "<!DOCTYPE html>\n<html lang=\"uz\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <meta name=\"description\" content=\"DevMaster Dasturlash Akademiyasi rasmiy ta'lim portali\">\n  <title>DevMaster - Web Dasturlash</title>\n</head>\n<body>\n  <h1>Professional Dasturchi Bo'ling</h1>\n</body>\n</html>",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Mukammal SEO va OpenGraph head bo'limi:\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>DevMaster Dasturlash Akademiyasi</title>\n  <meta name=\"description\" content=\"Frontend dasturlashni noldan professional darajada o'rganing.\" />\n  <meta property=\"og:title\" content=\"DevMaster Academy\" />\n  <meta property=\"og:image\" content=\"/og-banner.jpg\" />\n</head>",
          "// Favicon ramzi:\n<link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.svg\" />"
        ],
        "codeSnippet": "// Mukammal SEO va OpenGraph head bo'limi:\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>DevMaster Dasturlash Akademiyasi</title>\n  <meta name=\"description\" content=\"Frontend dasturlashni noldan professional darajada o'rganing.\" />\n  <meta property=\"og:title\" content=\"DevMaster Academy\" />\n  <meta property=\"og:image\" content=\"/og-banner.jpg\" />\n</head>",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "<meta name='viewport'> bo'lmasa mobil telefonlarda sayt noqulay va kichrayib ko'rinadi.",
          "<title> sarlavhasi 50-60 belgidan oshmasligi eng yaxshi amaliyotdir.",
          "<meta name='description'> matni 150-160 belgi atrofida jozibali yozilishi kerak."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: meta charset va meta viewport teglari bo'lgan <head> yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"viewport\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +180 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Mening Saytim</title>\n</head>",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  }
];

export const W3_CSS_LESSONS: Lesson[] = [
  {
    "id": "l-css-1",
    "stage": "css",
    "title": "1. CSS Kirish, Sintaksis va Ulanish Usullari",
    "duration": "25 daqiqa",
    "xpReward": 120,
    "w3ReferenceTopic": "CSS Introduction, Syntax & How To Add CSS",
    "summary": "CSS (Cascading Style Sheets) veb-sahifaning tashqi ko'rinishi, ranglari, shriftlari va joylashuvini belgilaydi. CSS qoidasi: selektor { xossa: qiymat; }. Sahifaga 3 xil usulda ulanadi: Tashqi (<link rel='stylesheet'>), Ichki (<style>), va Inline (style='...'). Tashqi fayl eng professional usuldir.",
    "theoryDetails": [
      "External (Tashqi): <link rel=\"stylesheet\" href=\"style.css\"> — eng professional usul.",
      "Internal (Ichki): <head> ichida <style> tegi orqali bitta sahifa uchun yozish.",
      "Inline: To'g'ridan-to'g'ri HTML teg atributi ichida style=\"color: red;\"."
    ],
    "codeExample": "/* CSS Sintaksis qoidasi */\nh1 {\n  color: #38bdf8;\n  font-size: 28px;\n  text-align: center;\n}\n\np {\n  color: #94a3b8;\n  line-height: 1.6;\n}",
    "practiceTask": "h1 tegiga color va font-size xossalarini bering.",
    "starterCode": "h1 {\n  color: #06b6d4;\n  font-size: 24px;\n}",
    "solutionKeyword": "color:",
    "realWorldExamples": [
      "// Tashqi CSS ulash:\n<link rel=\"stylesheet\" href=\"/styles/main.css\" />",
      "// Element uslubi:\nbody {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n  background-color: #f8fafc;\n  color: #0f172a;\n}"
    ],
    "cheatSheetTips": [
      "Har bir qoida oxirida nuqtali vergul (;) qo'yishni unutmang.",
      "Inline CSS dan iloji boricha qoching, alohida .css fayl tuting.",
      "Boshida * { box-sizing: border-box; } yozish eng to'g'ri amaliyotdir."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"1. CSS Kirish, Sintaksis va Ulanish Usullari\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "1. CSS Kirish, Sintaksis va Ulanish Usullari",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "CSS (Cascading Style Sheets) veb-sahifaning tashqi ko'rinishi, ranglari, shriftlari va joylashuvini belgilaydi. CSS qoidasi: selektor { xossa: qiymat; }. Sahifaga 3 xil usulda ulanadi: Tashqi (<link rel='stylesheet'>), Ichki (<style>), va Inline (style='...'). Tashqi fayl eng professional usuldir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "External (Tashqi): <link rel=\"stylesheet\" href=\"style.css\"> — eng professional usul.",
          "Internal (Ichki): <head> ichida <style> tegi orqali bitta sahifa uchun yozish.",
          "Inline: To'g'ridan-to'g'ri HTML teg atributi ichida style=\"color: red;\"."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "/* CSS Sintaksis qoidasi */\nh1 {\n  color: #38bdf8;\n  font-size: 28px;\n  text-align: center;\n}\n\np {\n  color: #94a3b8;\n  line-height: 1.6;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Tashqi CSS ulash:\n<link rel=\"stylesheet\" href=\"/styles/main.css\" />",
          "// Element uslubi:\nbody {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n  background-color: #f8fafc;\n  color: #0f172a;\n}"
        ],
        "codeSnippet": "// Tashqi CSS ulash:\n<link rel=\"stylesheet\" href=\"/styles/main.css\" />",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Har bir qoida oxirida nuqtali vergul (;) qo'yishni unutmang.",
          "Inline CSS dan iloji boricha qoching, alohida .css fayl tuting.",
          "Boshida * { box-sizing: border-box; } yozish eng to'g'ri amaliyotdir."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: h1 tegiga color va font-size xossalarini bering.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"color:\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +120 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "h1 {\n  color: #06b6d4;\n  font-size: 24px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-2",
    "stage": "css",
    "title": "2. CSS Selektorlar (Element, Class, ID, Kombinatorlar)",
    "duration": "30 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "CSS Selectors (Simple, Combinators, Pseudo)",
    "summary": "CSS selektorlari qaysi elementga qanday uslub berishni belgilaydi. Element (p), Class (.karta), ID (#asosiy), Universal (*) va Guruhlangan (h1, h2, h3) selektorlar eng ko'p ishlatiladi.",
    "theoryDetails": [
      ".class: Bir xil sinfga ega barcha elementlarni tanlaydi (nuqta bilan yoziladi).",
      "#id: Faqat bitta noyob elementni tanlaydi (panjara # bilan yoziladi).",
      "div p: div ichida joylashgan barcha <p> larni tanlaydi.",
      "div > p: Faqat div ning bevosita birinchi avlod farzandi bo'lgan <p> larni tanlaydi."
    ],
    "codeExample": "/* Class selektor */\n.card {\n  background-color: #1e293b;\n  border-radius: 12px;\n  padding: 20px;\n}\n\n/* ID selektor */\n#asosiy-tugma {\n  background-color: #6366f1;\n  color: #ffffff;\n}\n\n/* Bir nechta elementlarni guruhlash */\nh1, h2, h3 {\n  font-family: sans-serif;\n}",
    "practiceTask": ".box klassi uchun fon rangi va padding yozing.",
    "starterCode": ".box {\n  background: #0f172a;\n  padding: 16px;\n}",
    "solutionKeyword": ".box",
    "realWorldExamples": [
      "// Sinf bo'yicha tugma:\n.btn-primary {\n  background: #0284c7;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 8px;\n}",
      "// Avlod selektori (descendant):\n.navbar ul li a {\n  text-decoration: none;\n  color: #38bdf8;\n}"
    ],
    "cheatSheetTips": [
      "CSS da ID (#id) lardan ko'ra sinflar (.class) dan foydalanish afzal, chunki sinflarni qayta ishlatish oson.",
      "Bir xil qoidalarni vergul bilan guruhlang: h1, h2, h3 { font-weight: bold; }.",
      "Sinf nomlarini camelCase yoki kebab-case (masalan .menu-item) bilan yozing."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"2. CSS Selektorlar (Element, Class, ID, Kombinatorlar)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "2. CSS Selektorlar (Element, Class, ID, Kombinatorlar)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "CSS selektorlari qaysi elementga qanday uslub berishni belgilaydi. Element (p), Class (.karta), ID (#asosiy), Universal (*) va Guruhlangan (h1, h2, h3) selektorlar eng ko'p ishlatiladi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          ".class: Bir xil sinfga ega barcha elementlarni tanlaydi (nuqta bilan yoziladi).",
          "#id: Faqat bitta noyob elementni tanlaydi (panjara # bilan yoziladi).",
          "div p: div ichida joylashgan barcha <p> larni tanlaydi.",
          "div > p: Faqat div ning bevosita birinchi avlod farzandi bo'lgan <p> larni tanlaydi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "/* Class selektor */\n.card {\n  background-color: #1e293b;\n  border-radius: 12px;\n  padding: 20px;\n}\n\n/* ID selektor */\n#asosiy-tugma {\n  background-color: #6366f1;\n  color: #ffffff;\n}\n\n/* Bir nechta elementlarni guruhlash */\nh1, h2, h3 {\n  font-family: sans-serif;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Sinf bo'yicha tugma:\n.btn-primary {\n  background: #0284c7;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 8px;\n}",
          "// Avlod selektori (descendant):\n.navbar ul li a {\n  text-decoration: none;\n  color: #38bdf8;\n}"
        ],
        "codeSnippet": "// Sinf bo'yicha tugma:\n.btn-primary {\n  background: #0284c7;\n  color: white;\n  padding: 10px 20px;\n  border-radius: 8px;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "CSS da ID (#id) lardan ko'ra sinflar (.class) dan foydalanish afzal, chunki sinflarni qayta ishlatish oson.",
          "Bir xil qoidalarni vergul bilan guruhlang: h1, h2, h3 { font-weight: bold; }.",
          "Sinf nomlarini camelCase yoki kebab-case (masalan .menu-item) bilan yozing."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: .box klassi uchun fon rangi va padding yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \".box\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".box {\n  background: #0f172a;\n  padding: 16px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-3",
    "stage": "css",
    "title": "3. Ranglar, Fonlar va Gradientlar",
    "duration": "30 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "CSS Colors, Backgrounds & Gradients",
    "summary": "Ranglar HEX (#0284c7), RGB/RGBA (rgba(2, 132, 199, 0.8)) va HSL formatlarida beriladi. Orqa fon xossasi bir tekis rang, shaffoflik, tasvirlar (background-image) va gradientlar (linear-gradient) qo'llash imkonini beradi.",
    "theoryDetails": [
      "HEX: 16-lik tizimdagi rang kodi (#ffffff - oq, #000000 - qora).",
      "RGBA: rgba(255, 0, 0, 0.5) — oxirgi 0.5 qiymati shaffoflik darajasini bildiradi.",
      "linear-gradient(to right, #6366f1, #a855f7): Chiroyli silliq rang o'tishi."
    ],
    "codeExample": ".banner {\n  background: linear-gradient(135deg, #1e1b4b, #312e81);\n  color: #ffffff;\n  padding: 40px;\n  border-radius: 16px;\n}\n\n.shaffof-karta {\n  background-color: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(8px);\n}",
    "practiceTask": "linear-gradient yordamida chiroyli fon uslubi yozing.",
    "starterCode": ".hero {\n  background: linear-gradient(to right, #4f46e5, #06b6d4);\n  color: white;\n}",
    "solutionKeyword": "gradient",
    "realWorldExamples": [
      "// Gradientli karta foni:\n.gradient-card {\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  color: #f8fafc;\n  padding: 24px;\n  border-radius: 12px;\n}",
      "// To'liq qoplovchi orqa fon rasmi:\n.hero {\n  background: url('/banner.jpg') center/cover no-repeat;\n  min-height: 400px;\n}"
    ],
    "cheatSheetTips": [
      "Orqa fonga rasm qo'yganda har doim zaxira 'background-color' ham bering.",
      "background: center/cover no-repeat; qisqa yozuvidan foydalaning.",
      "Matn va fon kontrastini doimo tekshiring (oq fonda to'q, to'q fonda oq matn)."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"3. Ranglar, Fonlar va Gradientlar\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "3. Ranglar, Fonlar va Gradientlar",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Ranglar HEX (#0284c7), RGB/RGBA (rgba(2, 132, 199, 0.8)) va HSL formatlarida beriladi. Orqa fon xossasi bir tekis rang, shaffoflik, tasvirlar (background-image) va gradientlar (linear-gradient) qo'llash imkonini beradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "HEX: 16-lik tizimdagi rang kodi (#ffffff - oq, #000000 - qora).",
          "RGBA: rgba(255, 0, 0, 0.5) — oxirgi 0.5 qiymati shaffoflik darajasini bildiradi.",
          "linear-gradient(to right, #6366f1, #a855f7): Chiroyli silliq rang o'tishi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".banner {\n  background: linear-gradient(135deg, #1e1b4b, #312e81);\n  color: #ffffff;\n  padding: 40px;\n  border-radius: 16px;\n}\n\n.shaffof-karta {\n  background-color: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(8px);\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Gradientli karta foni:\n.gradient-card {\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  color: #f8fafc;\n  padding: 24px;\n  border-radius: 12px;\n}",
          "// To'liq qoplovchi orqa fon rasmi:\n.hero {\n  background: url('/banner.jpg') center/cover no-repeat;\n  min-height: 400px;\n}"
        ],
        "codeSnippet": "// Gradientli karta foni:\n.gradient-card {\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  color: #f8fafc;\n  padding: 24px;\n  border-radius: 12px;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Orqa fonga rasm qo'yganda har doim zaxira 'background-color' ham bering.",
          "background: center/cover no-repeat; qisqa yozuvidan foydalaning.",
          "Matn va fon kontrastini doimo tekshiring (oq fonda to'q, to'q fonda oq matn)."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: linear-gradient yordamida chiroyli fon uslubi yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"gradient\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".hero {\n  background: linear-gradient(to right, #4f46e5, #06b6d4);\n  color: white;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-4",
    "stage": "css",
    "title": "4. Chegaralar, Burchaklar va Soyalar (Border, Radius, Box-Shadow)",
    "duration": "30 daqiqa",
    "xpReward": 140,
    "w3ReferenceTopic": "CSS Borders, Rounded Corners & Shadows",
    "summary": "Box Model veb-dizaynning poydevori: har bir element to'rtburchak qutidir. Qatlamlar: Content, Padding (ichki masofa), Border (chegara) va Margin (tashqi masofa). 'box-sizing: border-box' padding va border ni kenglik ichiga singdiradi.",
    "theoryDetails": [
      "border: 2px solid #38bdf8: Qalinligi 2px, to'liq chiziqli va moviy chegara.",
      "border-radius: 16px: Burchaklarni zamonaviy yumaloqlash.",
      "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4): Yumshoq qora soya effekti."
    ],
    "codeExample": ".avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  border: 3px solid #38bdf8;\n}\n\n.zamonaviy-karta {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);\n}",
    "practiceTask": "border-radius va box-shadow xossalarini yozing.",
    "starterCode": ".card {\n  border-radius: 12px;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}",
    "solutionKeyword": "border-radius",
    "realWorldExamples": [
      "// Universal tozalash va quti modeli:\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}",
      "// Markazlashgan konteyner:\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n}"
    ],
    "cheatSheetTips": [
      "Doimo loyihangizning boshida * { box-sizing: border-box; } yozing.",
      "Margin auto gorizontal markazlashtiradi (width bo'lishi shart).",
      "Soat strelkasi qoidasi: padding: 10px 20px 15px 5px; -> Top, Right, Bottom, Left."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"4. Chegaralar, Burchaklar va Soyalar (Border, Radius, Box-Shadow)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "4. Chegaralar, Burchaklar va Soyalar (Border, Radius, Box-Shadow)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Box Model veb-dizaynning poydevori: har bir element to'rtburchak qutidir. Qatlamlar: Content, Padding (ichki masofa), Border (chegara) va Margin (tashqi masofa). 'box-sizing: border-box' padding va border ni kenglik ichiga singdiradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "border: 2px solid #38bdf8: Qalinligi 2px, to'liq chiziqli va moviy chegara.",
          "border-radius: 16px: Burchaklarni zamonaviy yumaloqlash.",
          "box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4): Yumshoq qora soya effekti."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".avatar {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  border: 3px solid #38bdf8;\n}\n\n.zamonaviy-karta {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35);\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Universal tozalash va quti modeli:\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}",
          "// Markazlashgan konteyner:\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n}"
        ],
        "codeSnippet": "// Universal tozalash va quti modeli:\n*, *::before, *::after {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Doimo loyihangizning boshida * { box-sizing: border-box; } yozing.",
          "Margin auto gorizontal markazlashtiradi (width bo'lishi shart).",
          "Soat strelkasi qoidasi: padding: 10px 20px 15px 5px; -> Top, Right, Bottom, Left."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: border-radius va box-shadow xossalarini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"border-radius\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +140 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".card {\n  border-radius: 12px;\n  box-shadow: 0 4px 15px rgba(0,0,0,0.2);\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-5",
    "stage": "css",
    "title": "5. Box Model (Content, Padding, Border, Margin, Box-Sizing)",
    "duration": "35 daqiqa",
    "xpReward": 150,
    "w3ReferenceTopic": "CSS Box Model & Box-Sizing Calculation",
    "summary": "Tipografiya matn o'qilishini qulay qiladi: font-family, font-size (rem/px), font-weight, line-height (qatorlar oralig'i) va letter-spacing. Google Fonts bepul web shriftlarini ulash ham o'rganiladi.",
    "theoryDetails": [
      "padding: Ichki masofa. Element foni padding hududiga ham tarqaladi.",
      "margin: Tashqi masofa. Elementni boshqa qo'shnilaridan surish.",
      "box-sizing: border-box: padding va border elementning width va height ini oshirib yubormasligini ta'minlaydi."
    ],
    "codeExample": "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.karta {\n  width: 300px;\n  padding: 24px;\n  border: 2px solid #4f46e5;\n  margin: 20px auto; /* Markazga tekislash */\n}",
    "practiceTask": "box-sizing: border-box va margin: auto xossalarini kiriting.",
    "starterCode": ".box {\n  box-sizing: border-box;\n  padding: 20px;\n  margin: 10px auto;\n}",
    "solutionKeyword": "box-sizing",
    "realWorldExamples": [
      "// Google Fonts ulash va qo'llash:\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');\nbody {\n  font-family: 'Inter', sans-serif;\n  line-height: 1.6;\n}",
      "// Chiroyli sarlavha:\nh1 {\n  font-size: 2.5rem;\n  letter-spacing: -0.02em;\n  font-weight: 800;\n}"
    ],
    "cheatSheetTips": [
      "Matnlar uchun line-height 1.5 dan 1.6 gacha bo'lishi eng o'qilishi oson standartdir.",
      "Har doim fallback shrift ko'rsating: font-family: 'Inter', sans-serif;.",
      "1rem = 16px (brauzer bazaviy o'lchami)."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"5. Box Model (Content, Padding, Border, Margin, Box-Sizing)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "5. Box Model (Content, Padding, Border, Margin, Box-Sizing)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Tipografiya matn o'qilishini qulay qiladi: font-family, font-size (rem/px), font-weight, line-height (qatorlar oralig'i) va letter-spacing. Google Fonts bepul web shriftlarini ulash ham o'rganiladi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "padding: Ichki masofa. Element foni padding hududiga ham tarqaladi.",
          "margin: Tashqi masofa. Elementni boshqa qo'shnilaridan surish.",
          "box-sizing: border-box: padding va border elementning width va height ini oshirib yubormasligini ta'minlaydi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\n.karta {\n  width: 300px;\n  padding: 24px;\n  border: 2px solid #4f46e5;\n  margin: 20px auto; /* Markazga tekislash */\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Google Fonts ulash va qo'llash:\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');\nbody {\n  font-family: 'Inter', sans-serif;\n  line-height: 1.6;\n}",
          "// Chiroyli sarlavha:\nh1 {\n  font-size: 2.5rem;\n  letter-spacing: -0.02em;\n  font-weight: 800;\n}"
        ],
        "codeSnippet": "// Google Fonts ulash va qo'llash:\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');\nbody {\n  font-family: 'Inter', sans-serif;\n  line-height: 1.6;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Matnlar uchun line-height 1.5 dan 1.6 gacha bo'lishi eng o'qilishi oson standartdir.",
          "Har doim fallback shrift ko'rsating: font-family: 'Inter', sans-serif;.",
          "1rem = 16px (brauzer bazaviy o'lchami)."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: box-sizing: border-box va margin: auto xossalarini kiriting.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"box-sizing\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +150 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".box {\n  box-sizing: border-box;\n  padding: 20px;\n  margin: 10px auto;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-6",
    "stage": "css",
    "title": "6. Matn va Shriftlar (Typography, Fonts, Text-Align)",
    "duration": "30 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "CSS Typography, Fonts & Text Styles",
    "summary": "Display xossasi elementning sahifada joylashishini belgilaydi: block (butun qatorni egallaydi), inline (matn ichida turadi), inline-block (yonma-yon turadi, lekin width/height beriladi) va none (yashiradi).",
    "theoryDetails": [
      "font-family: 'Inter', sans-serif: Standart yoki Google Shriftlarini tanlash.",
      "line-height: 1.6: Qatorlar orasida erkin nafas oluvchi bo'shliq qoldiradi.",
      "letter-spacing: 1px: Harflar orasidagi nafis masofa.",
      "text-transform: uppercase: Barcha harflarni katta qilib yozish."
    ],
    "codeExample": "body {\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  color: #f8fafc;\n}\n\n.maqola-sarlavha {\n  font-size: 32px;\n  font-weight: 800;\n  text-align: center;\n  letter-spacing: -0.5px;\n}\n\n.abzas {\n  line-height: 1.7;\n  text-align: justify;\n}",
    "practiceTask": "font-family va line-height xossalarini yozing.",
    "starterCode": ".text {\n  font-family: sans-serif;\n  line-height: 1.6;\n  font-size: 16px;\n}",
    "solutionKeyword": "font-family",
    "realWorldExamples": [
      "// Havolani to'liq tugmaga aylantirish:\na.btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background: #0284c7;\n  color: white;\n}",
      "// Modal oynani yashirish:\n.modal.hidden {\n  display: none;\n}"
    ],
    "cheatSheetTips": [
      "<a> tegi standartda inline bo'ladi, unga width berish uchun display: inline-block kerak.",
      "display: none elementni butunlay o'chirgandek yashiradi, joyi qolmaydi.",
      "Zamonaviy maketlar uchun display: flex eng qulayi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"6. Matn va Shriftlar (Typography, Fonts, Text-Align)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "6. Matn va Shriftlar (Typography, Fonts, Text-Align)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Display xossasi elementning sahifada joylashishini belgilaydi: block (butun qatorni egallaydi), inline (matn ichida turadi), inline-block (yonma-yon turadi, lekin width/height beriladi) va none (yashiradi).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "font-family: 'Inter', sans-serif: Standart yoki Google Shriftlarini tanlash.",
          "line-height: 1.6: Qatorlar orasida erkin nafas oluvchi bo'shliq qoldiradi.",
          "letter-spacing: 1px: Harflar orasidagi nafis masofa.",
          "text-transform: uppercase: Barcha harflarni katta qilib yozish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "body {\n  font-family: 'Segoe UI', system-ui, sans-serif;\n  color: #f8fafc;\n}\n\n.maqola-sarlavha {\n  font-size: 32px;\n  font-weight: 800;\n  text-align: center;\n  letter-spacing: -0.5px;\n}\n\n.abzas {\n  line-height: 1.7;\n  text-align: justify;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Havolani to'liq tugmaga aylantirish:\na.btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background: #0284c7;\n  color: white;\n}",
          "// Modal oynani yashirish:\n.modal.hidden {\n  display: none;\n}"
        ],
        "codeSnippet": "// Havolani to'liq tugmaga aylantirish:\na.btn {\n  display: inline-block;\n  padding: 10px 20px;\n  background: #0284c7;\n  color: white;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "<a> tegi standartda inline bo'ladi, unga width berish uchun display: inline-block kerak.",
          "display: none elementni butunlay o'chirgandek yashiradi, joyi qolmaydi.",
          "Zamonaviy maketlar uchun display: flex eng qulayi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: font-family va line-height xossalarini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"font-family\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".text {\n  font-family: sans-serif;\n  line-height: 1.6;\n  font-size: 16px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-7",
    "stage": "css",
    "title": "7. CSS O'lcham Birliklari (px, %, em, rem, vw, vh)",
    "duration": "30 daqiqa",
    "xpReward": 140,
    "w3ReferenceTopic": "CSS Units (Absolute vs Relative, rem, vh, vw)",
    "summary": "Position xossasi elementlarni ekranning aniq nuqtasiga joylashtiradi: static (standart), relative (o'z o'rniga nisbatan), absolute (ota relative ga nisbatan), fixed (ekranga qotgan) va sticky (sirg'alib borib yopishadi).",
    "theoryDetails": [
      "px: Qat'iy piksellar. Har doim bir xil qoladi.",
      "rem: Juda moslashuvchan. Foydalanuvchi brauzer shriftini o'zgartirsa, butun sayt mutanosib kattalashadi.",
      "100vh: Butun ekran balandligini to'liq egallash (hero bo'limlar uchun a'lo).",
      "calc(100% - 40px): Matematik formulalar orqali aniq o'lcham chiqarish."
    ],
    "codeExample": ".hero-ekran {\n  width: 100vw;\n  height: 100vh;\n  padding: 2rem;\n}\n\n.sarlavha {\n  font-size: 2.5rem; /* 40px */\n}\n\n.yon-panel {\n  width: calc(100% - 250px);\n}",
    "practiceTask": "rem va vh birliklaridan foydalangan holda uslub bering.",
    "starterCode": ".section {\n  min-height: 80vh;\n  padding: 2rem;\n}",
    "solutionKeyword": "vh",
    "realWorldExamples": [
      "// Karta burchagidagi nishon (badge):\n.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #ef4444;\n}",
      "// Ekranga yopishgan navigatsiya:\n.navbar-sticky {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}"
    ],
    "cheatSheetTips": [
      "Bolaga position: absolute bersangiz, otasiga position: relative berishni unutmang!",
      "z-index faqat position berilgan elementlarda ishlaydi.",
      "sticky ishlashi uchun unga albatta top: 0 ko'rsatilgan bo'lishi kerak."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"7. CSS O'lcham Birliklari (px, %, em, rem, vw, vh)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "7. CSS O'lcham Birliklari (px, %, em, rem, vw, vh)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Position xossasi elementlarni ekranning aniq nuqtasiga joylashtiradi: static (standart), relative (o'z o'rniga nisbatan), absolute (ota relative ga nisbatan), fixed (ekranga qotgan) va sticky (sirg'alib borib yopishadi).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "px: Qat'iy piksellar. Har doim bir xil qoladi.",
          "rem: Juda moslashuvchan. Foydalanuvchi brauzer shriftini o'zgartirsa, butun sayt mutanosib kattalashadi.",
          "100vh: Butun ekran balandligini to'liq egallash (hero bo'limlar uchun a'lo).",
          "calc(100% - 40px): Matematik formulalar orqali aniq o'lcham chiqarish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".hero-ekran {\n  width: 100vw;\n  height: 100vh;\n  padding: 2rem;\n}\n\n.sarlavha {\n  font-size: 2.5rem; /* 40px */\n}\n\n.yon-panel {\n  width: calc(100% - 250px);\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Karta burchagidagi nishon (badge):\n.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #ef4444;\n}",
          "// Ekranga yopishgan navigatsiya:\n.navbar-sticky {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}"
        ],
        "codeSnippet": "// Karta burchagidagi nishon (badge):\n.card {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background: #ef4444;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Bolaga position: absolute bersangiz, otasiga position: relative berishni unutmang!",
          "z-index faqat position berilgan elementlarda ishlaydi.",
          "sticky ishlashi uchun unga albatta top: 0 ko'rsatilgan bo'lishi kerak."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: rem va vh birliklaridan foydalangan holda uslub bering.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"vh\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +140 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".section {\n  min-height: 80vh;\n  padding: 2rem;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-8",
    "stage": "css",
    "title": "8. Ko'rinish Turlari (Display: block, inline, inline-block, none)",
    "duration": "25 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "CSS Display Property & Visibility",
    "summary": "Flexbox (Flexible Box) elementlarni 1D o'qda (qator yoki ustun) tekislash va bo'sh joyni taqsimlashning zamonaviy qurolidir. justify-content (asosiy o'q), align-items (kesuvchi o'q) va gap (oraliq masofa) asosiy xossalaridir.",
    "theoryDetails": [
      "display: none: Elementni yashiradi va uning egallagan joyini ham bo'shatadi.",
      "visibility: hidden: Elementni ko'rinmas qiladi, ammo uning joyi bo'sh qolib saqlanadi.",
      "display: inline-block: Tugmalarni chiroyli yonma-yon joylash uchun juda qulay."
    ],
    "codeExample": ".tugma {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #0ea5e9;\n  text-decoration: none;\n  color: white;\n}\n\n.yashirin {\n  display: none;\n}",
    "practiceTask": "display: inline-block xossasiga ega klass yozing.",
    "starterCode": ".badge {\n  display: inline-block;\n  padding: 4px 8px;\n}",
    "solutionKeyword": "inline-block",
    "realWorldExamples": [
      "// Sayt navbar maketi:\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}",
      "// Ekranning qoq markaziga keltirish:\n.center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}"
    ],
    "cheatSheetTips": [
      "Gorizontal va vertikal markazlashtirish: display: flex; justify-content: center; align-items: center;.",
      "Elementlar oraliq masofasi uchun margin emas, 'gap: 16px' ishlating.",
      "flex-direction: column qilinganda justify-content vertikalga, align-items gorizontalga aylanadi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"8. Ko'rinish Turlari (Display: block, inline, inline-block, none)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "8. Ko'rinish Turlari (Display: block, inline, inline-block, none)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Flexbox (Flexible Box) elementlarni 1D o'qda (qator yoki ustun) tekislash va bo'sh joyni taqsimlashning zamonaviy qurolidir. justify-content (asosiy o'q), align-items (kesuvchi o'q) va gap (oraliq masofa) asosiy xossalaridir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "display: none: Elementni yashiradi va uning egallagan joyini ham bo'shatadi.",
          "visibility: hidden: Elementni ko'rinmas qiladi, ammo uning joyi bo'sh qolib saqlanadi.",
          "display: inline-block: Tugmalarni chiroyli yonma-yon joylash uchun juda qulay."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".tugma {\n  display: inline-block;\n  padding: 10px 20px;\n  background-color: #0ea5e9;\n  text-decoration: none;\n  color: white;\n}\n\n.yashirin {\n  display: none;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Sayt navbar maketi:\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}",
          "// Ekranning qoq markaziga keltirish:\n.center-box {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n}"
        ],
        "codeSnippet": "// Sayt navbar maketi:\n.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Gorizontal va vertikal markazlashtirish: display: flex; justify-content: center; align-items: center;.",
          "Elementlar oraliq masofasi uchun margin emas, 'gap: 16px' ishlating.",
          "flex-direction: column qilinganda justify-content vertikalga, align-items gorizontalga aylanadi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: display: inline-block xossasiga ega klass yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"inline-block\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".badge {\n  display: inline-block;\n  padding: 4px 8px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-9",
    "stage": "css",
    "title": "9. CSS Position (Joylashuv) Tizimi va Z-Index",
    "duration": "40 daqiqa",
    "xpReward": 160,
    "w3ReferenceTopic": "CSS Position (Relative, Absolute, Fixed, Sticky)",
    "summary": "Flex bolalari xossalari: flex-grow (kattalashish koeffitsiyenti), flex-shrink (siqilish koeffitsiyenti), flex-basis (boshlang'ich o'lcham) va order (tartibini surish).",
    "theoryDetails": [
      "relative: O'zi siljimasa ham, ichidagi absolute bola elementlar uchun markaziy nuqta bo'lib xizmat qiladi.",
      "absolute: Ota-onasining chegaralari ichida top, right, bottom, left orqali aniq nuqtaga o'tiradi.",
      "fixed: Skroll qilinganda ham ekranning belgilangan burchagida turadi (masalan, Telegram yordam tugmasi).",
      "z-index: 10: Soni qanchalik katta bo'lsa, element shunchalik yuqori qatlamda turadi."
    ],
    "codeExample": ".ota-karta {\n  position: relative;\n  width: 300px;\n  height: 200px;\n  background-color: #1e293b;\n}\n\n.yangi-badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background-color: #ef4444;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n\n.tepa-navigatsiya {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}",
    "practiceTask": "position: absolute va top/right koordinatalarini yozing.",
    "starterCode": ".badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 10;\n}",
    "solutionKeyword": "position:",
    "realWorldExamples": [
      "// Sidebar va Asosiy kontent maketi:\n.layout { display: flex; }\n.sidebar { flex: 0 0 250px; } /* Qat'iy 250px */\n.content { flex: 1; } /* Butun qolgan joyni egallaydi */",
      "// Qidiruv inputi cho'zilishi:\n.search-input { flex-grow: 1; }\n.search-btn { flex-shrink: 0; }"
    ],
    "cheatSheetTips": [
      "Asosiy kontent qolgan butun joyni egallashi uchun unga 'flex: 1' bering.",
      "Ikonka yoki rasm siqilib qolmasligi uchun unga 'flex-shrink: 0;' bering.",
      "flex: 1 qisqartmasi flex-grow: 1 degani."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"9. CSS Position (Joylashuv) Tizimi va Z-Index\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "9. CSS Position (Joylashuv) Tizimi va Z-Index",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Flex bolalari xossalari: flex-grow (kattalashish koeffitsiyenti), flex-shrink (siqilish koeffitsiyenti), flex-basis (boshlang'ich o'lcham) va order (tartibini surish).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "relative: O'zi siljimasa ham, ichidagi absolute bola elementlar uchun markaziy nuqta bo'lib xizmat qiladi.",
          "absolute: Ota-onasining chegaralari ichida top, right, bottom, left orqali aniq nuqtaga o'tiradi.",
          "fixed: Skroll qilinganda ham ekranning belgilangan burchagida turadi (masalan, Telegram yordam tugmasi).",
          "z-index: 10: Soni qanchalik katta bo'lsa, element shunchalik yuqori qatlamda turadi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".ota-karta {\n  position: relative;\n  width: 300px;\n  height: 200px;\n  background-color: #1e293b;\n}\n\n.yangi-badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  background-color: #ef4444;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n\n.tepa-navigatsiya {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Sidebar va Asosiy kontent maketi:\n.layout { display: flex; }\n.sidebar { flex: 0 0 250px; } /* Qat'iy 250px */\n.content { flex: 1; } /* Butun qolgan joyni egallaydi */",
          "// Qidiruv inputi cho'zilishi:\n.search-input { flex-grow: 1; }\n.search-btn { flex-shrink: 0; }"
        ],
        "codeSnippet": "// Sidebar va Asosiy kontent maketi:\n.layout { display: flex; }\n.sidebar { flex: 0 0 250px; } /* Qat'iy 250px */\n.content { flex: 1; } /* Butun qolgan joyni egallaydi */",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Asosiy kontent qolgan butun joyni egallashi uchun unga 'flex: 1' bering.",
          "Ikonka yoki rasm siqilib qolmasligi uchun unga 'flex-shrink: 0;' bering.",
          "flex: 1 qisqartmasi flex-grow: 1 degani."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: position: absolute va top/right koordinatalarini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"position:\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +160 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 10;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-10",
    "stage": "css",
    "title": "10. Overflow va Chegaradan Toshish",
    "duration": "25 daqiqa",
    "xpReward": 130,
    "w3ReferenceTopic": "CSS Overflow & Text Clipping",
    "summary": "CSS Grid ikki o'lchamli (2D) to'liq maket tizimidir: qator va ustunlarni bir vaqtda boshqaradi. grid-template-columns, repeat(), fr (fractional unit) va gap asosiy xossalardir.",
    "theoryDetails": [
      "overflow: hidden: Kartochka burchaklari yumaloqlanganda rasmlarning chiqib ketishini to'xtatadi.",
      "text-overflow: ellipsis: Uzun matn oxiriga uchta nuqta (...) qo'yadi."
    ],
    "codeExample": ".quti {\n  width: 250px;\n  height: 120px;\n  overflow-y: auto;\n  border: 1px solid #475569;\n}\n\n.bir-qatorli-matn {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
    "practiceTask": "overflow: hidden va text-overflow: ellipsis yozing.",
    "starterCode": ".truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
    "solutionKeyword": "overflow",
    "realWorldExamples": [
      "// 3 ustunli mahsulotlar to'ri:\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}",
      "// Avtomatik moslashuvchan galereya (Media so'rovsiz responsiv):\n.auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"
    ],
    "cheatSheetTips": [
      "repeat(auto-fit, minmax(250px, 1fr)) — eng yaxshi responsiv to'r formulasi.",
      "fr birligi mavjud bo'shliqning ulushidir (1fr 2fr -> 1/3 va 2/3).",
      "gap orqali kataklar orasiga bo'sh joy qo'yiladi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"10. Overflow va Chegaradan Toshish\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "10. Overflow va Chegaradan Toshish",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "CSS Grid ikki o'lchamli (2D) to'liq maket tizimidir: qator va ustunlarni bir vaqtda boshqaradi. grid-template-columns, repeat(), fr (fractional unit) va gap asosiy xossalardir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "overflow: hidden: Kartochka burchaklari yumaloqlanganda rasmlarning chiqib ketishini to'xtatadi.",
          "text-overflow: ellipsis: Uzun matn oxiriga uchta nuqta (...) qo'yadi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".quti {\n  width: 250px;\n  height: 120px;\n  overflow-y: auto;\n  border: 1px solid #475569;\n}\n\n.bir-qatorli-matn {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// 3 ustunli mahsulotlar to'ri:\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}",
          "// Avtomatik moslashuvchan galereya (Media so'rovsiz responsiv):\n.auto-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 16px;\n}"
        ],
        "codeSnippet": "// 3 ustunli mahsulotlar to'ri:\n.products-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "repeat(auto-fit, minmax(250px, 1fr)) — eng yaxshi responsiv to'r formulasi.",
          "fr birligi mavjud bo'shliqning ulushidir (1fr 2fr -> 1/3 va 2/3).",
          "gap orqali kataklar orasiga bo'sh joy qo'yiladi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: overflow: hidden va text-overflow: ellipsis yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"overflow\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +130 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-11",
    "stage": "css",
    "title": "11. Flexbox Asoslari (Konteyner: direction, justify, align, gap)",
    "duration": "40 daqiqa",
    "xpReward": 180,
    "w3ReferenceTopic": "CSS Flexbox Container Properties",
    "summary": "Ilg'or CSS Grid: grid-template-areas orqali butun sahifa xaritasini matnli rasmdek chizish mumkin. grid-column va grid-row kataklarni bir nechta ustun yoki qatorga cho'zish (span) imkonini beradi.",
    "theoryDetails": [
      "justify-content: center | space-between | space-around: Gorizontal tarqatish.",
      "align-items: center: Vertikal markazga tekislash (avval eng qiyin bo'lgan ish endi 1 qatorda).",
      "flex-direction: column: Elementlarni ustun ko'rinishida bir-birining ostiga qo'yish.",
      "gap: 16px: Elementlar orasidagi teng masofa."
    ],
    "codeExample": ".nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background-color: #0f172a;\n}\n\n.markazlashtirish {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n  gap: 12px;\n}",
    "practiceTask": "display: flex, justify-content: space-between va align-items: center yozing.",
    "starterCode": ".row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n}",
    "solutionKeyword": "display: flex",
    "realWorldExamples": [
      "// Sahifa xaritasi:\n.page-grid {\n  display: grid;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.header { grid-area: head; }\n.sidebar { grid-area: side; }\n.main { grid-area: main; }\n.footer { grid-area: foot; }",
      "// Bitta katta karta (span):\n.featured-card {\n  grid-column: span 2;\n  grid-row: span 2;\n}"
    ],
    "cheatSheetTips": [
      "grid-column: 1 / -1; elementni boshidan oxirigacha to'liq kenglikka yoyadi.",
      "grid-template-areas da har bir qatorda ustunlar soni teng bo'lishi shart.",
      "Mobil ekranda barcha zonalarni bitta ustunga aylantirib qo'yish mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"11. Flexbox Asoslari (Konteyner: direction, justify, align, gap)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "11. Flexbox Asoslari (Konteyner: direction, justify, align, gap)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Ilg'or CSS Grid: grid-template-areas orqali butun sahifa xaritasini matnli rasmdek chizish mumkin. grid-column va grid-row kataklarni bir nechta ustun yoki qatorga cho'zish (span) imkonini beradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "justify-content: center | space-between | space-around: Gorizontal tarqatish.",
          "align-items: center: Vertikal markazga tekislash (avval eng qiyin bo'lgan ish endi 1 qatorda).",
          "flex-direction: column: Elementlarni ustun ko'rinishida bir-birining ostiga qo'yish.",
          "gap: 16px: Elementlar orasidagi teng masofa."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".nav-bar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 24px;\n  background-color: #0f172a;\n}\n\n.markazlashtirish {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n  gap: 12px;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Sahifa xaritasi:\n.page-grid {\n  display: grid;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.header { grid-area: head; }\n.sidebar { grid-area: side; }\n.main { grid-area: main; }\n.footer { grid-area: foot; }",
          "// Bitta katta karta (span):\n.featured-card {\n  grid-column: span 2;\n  grid-row: span 2;\n}"
        ],
        "codeSnippet": "// Sahifa xaritasi:\n.page-grid {\n  display: grid;\n  grid-template-areas:\n    \"head head\"\n    \"side main\"\n    \"foot foot\";\n}\n.header { grid-area: head; }\n.sidebar { grid-area: side; }\n.main { grid-area: main; }\n.footer { grid-area: foot; }",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "grid-column: 1 / -1; elementni boshidan oxirigacha to'liq kenglikka yoyadi.",
          "grid-template-areas da har bir qatorda ustunlar soni teng bo'lishi shart.",
          "Mobil ekranda barcha zonalarni bitta ustunga aylantirib qo'yish mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: display: flex, justify-content: space-between va align-items: center yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"display: flex\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +180 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 10px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-12",
    "stage": "css",
    "title": "12. Flexbox Bolalar Xossalari (flex-grow, shrink, basis, order)",
    "duration": "35 daqiqa",
    "xpReward": 170,
    "w3ReferenceTopic": "CSS Flex Items (Grow, Shrink, Basis, Order)",
    "summary": "Psevdo-sinflar elementning holatiga qarab uslub beradi: :hover (sichqoncha borganda), :focus (faollashganda), :active (bosilganda), :nth-child(even/odd) (juft va toq elementlar).",
    "theoryDetails": [
      "flex: 1: Mavjud bo'sh joyni to'liq teng ravishda taqsimlab egallash.",
      "align-self: flex-end: Bitta alohida elementni boshqalardan farqli vertikal pastga tortish.",
      "order: -1: Elementni kodda pastda tursa ham eng birinchi qilib ko'rsatish."
    ],
    "codeExample": ".asosiy-kontent {\n  display: flex;\n}\n\n.sidebar {\n  width: 260px;\n  flex-shrink: 0; /* Kichraymasin */\n}\n\n.asosiy-qism {\n  flex-grow: 1; /* Qolgan barcha bo'sh joyni egallasin */\n}",
    "practiceTask": "flex: 1 xossasini elementga bering.",
    "starterCode": ".main {\n  flex: 1;\n  padding: 20px;\n}",
    "solutionKeyword": "flex:",
    "realWorldExamples": [
      "// Jonli tugma effekti:\n.btn {\n  transition: all 0.2s ease;\n}\n.btn:hover {\n  background: #1d4ed8;\n  transform: translateY(-2px);\n}",
      "// Jadval zebra qatorlari:\ntr:nth-child(even) {\n  background-color: #f8fafc;\n}"
    ],
    "cheatSheetTips": [
      ":focus holatiga doimo aniq ko'rinuvchi hoshiya (ring) bering (klaviatura qulayligi uchun).",
      "Havolalar qoidasi: :link, :visited, :hover, :active tartibida yozilishi shart.",
      ":not(.active) orqali faol bo'lmagan elementlarni tanlash mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"12. Flexbox Bolalar Xossalari (flex-grow, shrink, basis, order)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "12. Flexbox Bolalar Xossalari (flex-grow, shrink, basis, order)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Psevdo-sinflar elementning holatiga qarab uslub beradi: :hover (sichqoncha borganda), :focus (faollashganda), :active (bosilganda), :nth-child(even/odd) (juft va toq elementlar).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "flex: 1: Mavjud bo'sh joyni to'liq teng ravishda taqsimlab egallash.",
          "align-self: flex-end: Bitta alohida elementni boshqalardan farqli vertikal pastga tortish.",
          "order: -1: Elementni kodda pastda tursa ham eng birinchi qilib ko'rsatish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".asosiy-kontent {\n  display: flex;\n}\n\n.sidebar {\n  width: 260px;\n  flex-shrink: 0; /* Kichraymasin */\n}\n\n.asosiy-qism {\n  flex-grow: 1; /* Qolgan barcha bo'sh joyni egallasin */\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Jonli tugma effekti:\n.btn {\n  transition: all 0.2s ease;\n}\n.btn:hover {\n  background: #1d4ed8;\n  transform: translateY(-2px);\n}",
          "// Jadval zebra qatorlari:\ntr:nth-child(even) {\n  background-color: #f8fafc;\n}"
        ],
        "codeSnippet": "// Jonli tugma effekti:\n.btn {\n  transition: all 0.2s ease;\n}\n.btn:hover {\n  background: #1d4ed8;\n  transform: translateY(-2px);\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          ":focus holatiga doimo aniq ko'rinuvchi hoshiya (ring) bering (klaviatura qulayligi uchun).",
          "Havolalar qoidasi: :link, :visited, :hover, :active tartibida yozilishi shart.",
          ":not(.active) orqali faol bo'lmagan elementlarni tanlash mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: flex: 1 xossasini elementga bering.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"flex:\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +170 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".main {\n  flex: 1;\n  padding: 20px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-13",
    "stage": "css",
    "title": "13. CSS Grid Tizimi (Columns, Rows, Gap, Template-Areas)",
    "duration": "45 daqiqa",
    "xpReward": 200,
    "w3ReferenceTopic": "CSS Grid Layout & 2D Architecture",
    "summary": "Psevdo-elementlar (::before, ::after) faqat CSS orqali element oldi yoki orqasiga qo'shimcha bezak, chiziq yoki ikonka qo'shadi. 'content: \"\";' xossasi majburiydir. ::selection esa matn belgilangandagi rangni sozlaydi.",
    "theoryDetails": [
      "display: grid: Grid rejimini yoqish.",
      "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)): Avtomatik moslashuvchan ustunlar.",
      "gap: 20px: Qator va ustunlar orasidagi masofa.",
      "grid-column: span 2: Elementni 2 ta ustun eniga yoyish."
    ],
    "codeExample": ".kartalar-gridi {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n\n.katta-karta {\n  grid-column: span 2;\n}",
    "practiceTask": "display: grid va grid-template-columns yozing.",
    "starterCode": ".gallery {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 15px;\n}",
    "solutionKeyword": "grid-template-columns",
    "realWorldExamples": [
      "// Sarlavha ostidagi dekorativ chiziq:\n.title::after {\n  content: '';\n  display: block;\n  width: 50px;\n  height: 4px;\n  background: #0284c7;\n  margin-top: 8px;\n}",
      "// Matn tanlangandagi maxsus rang:\n::selection {\n  background-color: #38bdf8;\n  color: #0f172a;\n}"
    ],
    "cheatSheetTips": [
      "content: ''; xossasisiz ::before va ::after umuman hosil bo'lmaydi.",
      "::before va ::after standartda inline elementdir (width berish uchun display: block kerak).",
      "Psevdo-elementlar ikkita qo'sh nuqta (::) bilan yoziladi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"13. CSS Grid Tizimi (Columns, Rows, Gap, Template-Areas)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "13. CSS Grid Tizimi (Columns, Rows, Gap, Template-Areas)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Psevdo-elementlar (::before, ::after) faqat CSS orqali element oldi yoki orqasiga qo'shimcha bezak, chiziq yoki ikonka qo'shadi. 'content: \"\";' xossasi majburiydir. ::selection esa matn belgilangandagi rangni sozlaydi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "display: grid: Grid rejimini yoqish.",
          "grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)): Avtomatik moslashuvchan ustunlar.",
          "gap: 20px: Qator va ustunlar orasidagi masofa.",
          "grid-column: span 2: Elementni 2 ta ustun eniga yoyish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".kartalar-gridi {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n}\n\n.katta-karta {\n  grid-column: span 2;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Sarlavha ostidagi dekorativ chiziq:\n.title::after {\n  content: '';\n  display: block;\n  width: 50px;\n  height: 4px;\n  background: #0284c7;\n  margin-top: 8px;\n}",
          "// Matn tanlangandagi maxsus rang:\n::selection {\n  background-color: #38bdf8;\n  color: #0f172a;\n}"
        ],
        "codeSnippet": "// Sarlavha ostidagi dekorativ chiziq:\n.title::after {\n  content: '';\n  display: block;\n  width: 50px;\n  height: 4px;\n  background: #0284c7;\n  margin-top: 8px;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "content: ''; xossasisiz ::before va ::after umuman hosil bo'lmaydi.",
          "::before va ::after standartda inline elementdir (width berish uchun display: block kerak).",
          "Psevdo-elementlar ikkita qo'sh nuqta (::) bilan yoziladi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: display: grid va grid-template-columns yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"grid-template-columns\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +200 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".gallery {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 15px;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-14",
    "stage": "css",
    "title": "14. Responsive Veb Dizayn va Media Queries (@media)",
    "duration": "45 daqiqa",
    "xpReward": 220,
    "w3ReferenceTopic": "Responsive Web Design & Media Queries",
    "summary": "Moslashuvchan Dizayn (RWD) saytni barcha ekranlarda (telefon, planshet, kompyuter) qulay ochilishini ta'minlaydi. @media so'rovlari (masalan @media (max-width: 768px)) ekran eniga qarab uslublarni almashtiradi.",
    "theoryDetails": [
      "Breakpointlar: 640px (mobil), 768px (planshet), 1024px (noutbuk), 1280px (katta monitor).",
      "Mobile-First: Dastlab telefon uchun uslub yozib, keyin kattaroq ekranlar uchun @media qo'shish.",
      "max-width: 100%: Rasmlar ekrandan toshib ketmasligini ta'minlash."
    ],
    "codeExample": ".konteyner {\n  display: flex;\n  flex-direction: row;\n}\n\n/* Mobil ekranlar uchun (768px gacha) */\n@media (max-width: 768px) {\n  .konteyner {\n    flex-direction: column; /* Ustun qilib qo'yish */\n  }\n  \n  .sarlavha {\n    font-size: 20px;\n  }\n}",
    "practiceTask": "@media (max-width: 768px) so'rovini yozing.",
    "starterCode": "@media (max-width: 768px) {\n  .box { width: 100%; }\n}",
    "solutionKeyword": "@media",
    "realWorldExamples": [
      "// Smartfon uchun moslashuv:\n@media (max-width: 768px) {\n  .container { flex-direction: column; }\n  .sidebar { width: 100%; }\n  h1 { font-size: 20px; }\n}",
      "// Moslashuvchan rasm:\nimg {\n  max-width: 100%;\n  height: auto;\n}"
    ],
    "cheatSheetTips": [
      "HTML da <meta name='viewport'> bo'lmasa @media so'rovlari telefonda ishlamaydi.",
      "Elementlarga qat'iy width bermang, max-width va foizlardan foydalaning.",
      "Mobile-First tamoyili: avval mobil uchun yozib, min-width bilan kengaytirish eng yaxshisidir."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"14. Responsive Veb Dizayn va Media Queries (@media)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "14. Responsive Veb Dizayn va Media Queries (@media)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Moslashuvchan Dizayn (RWD) saytni barcha ekranlarda (telefon, planshet, kompyuter) qulay ochilishini ta'minlaydi. @media so'rovlari (masalan @media (max-width: 768px)) ekran eniga qarab uslublarni almashtiradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "Breakpointlar: 640px (mobil), 768px (planshet), 1024px (noutbuk), 1280px (katta monitor).",
          "Mobile-First: Dastlab telefon uchun uslub yozib, keyin kattaroq ekranlar uchun @media qo'shish.",
          "max-width: 100%: Rasmlar ekrandan toshib ketmasligini ta'minlash."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".konteyner {\n  display: flex;\n  flex-direction: row;\n}\n\n/* Mobil ekranlar uchun (768px gacha) */\n@media (max-width: 768px) {\n  .konteyner {\n    flex-direction: column; /* Ustun qilib qo'yish */\n  }\n  \n  .sarlavha {\n    font-size: 20px;\n  }\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Smartfon uchun moslashuv:\n@media (max-width: 768px) {\n  .container { flex-direction: column; }\n  .sidebar { width: 100%; }\n  h1 { font-size: 20px; }\n}",
          "// Moslashuvchan rasm:\nimg {\n  max-width: 100%;\n  height: auto;\n}"
        ],
        "codeSnippet": "// Smartfon uchun moslashuv:\n@media (max-width: 768px) {\n  .container { flex-direction: column; }\n  .sidebar { width: 100%; }\n  h1 { font-size: 20px; }\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "HTML da <meta name='viewport'> bo'lmasa @media so'rovlari telefonda ishlamaydi.",
          "Elementlarga qat'iy width bermang, max-width va foizlardan foydalaning.",
          "Mobile-First tamoyili: avval mobil uchun yozib, min-width bilan kengaytirish eng yaxshisidir."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: @media (max-width: 768px) so'rovini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"@media\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +220 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "@media (max-width: 768px) {\n  .box { width: 100%; }\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-15",
    "stage": "css",
    "title": "15. CSS O'tishlar (Transitions) va Transformatsiyalar",
    "duration": "35 daqiqa",
    "xpReward": 180,
    "w3ReferenceTopic": "CSS Transitions & 2D/3D Transforms",
    "summary": "Silliq o'tishlar (transition) va transformatsiyalar (transform) saytga jon bag'ishlaydi. transition o'zgarishni mayin qiladi, transform esa surish (translate), kattalashtirish (scale) va aylantirish (rotate) imkonini beradi.",
    "theoryDetails": [
      "transition: all 0.3s ease: Har qanday o'zgarish 0.3 soniyada silliq kechadi.",
      "transform: scale(1.05): Sichqoncha borganda biroz kattalashish effekti.",
      "transform: translateY(-5px): Kartaning biroz havoga ko'tarilishi.",
      "transform: rotate(45deg): 45 gradusga burish."
    ],
    "codeExample": ".tugma {\n  background-color: #6366f1;\n  color: white;\n  padding: 12px 24px;\n  border-radius: 8px;\n  transition: transform 0.2s ease, background-color 0.2s ease;\n}\n\n.tugma:hover {\n  background-color: #4f46e5;\n  transform: translateY(-3px) scale(1.02);\n}",
    "practiceTask": "transition va transform: scale xossalarini yozing.",
    "starterCode": ".card:hover {\n  transform: scale(1.05);\n  transition: all 0.3s ease;\n}",
    "solutionKeyword": "transform:",
    "realWorldExamples": [
      "// Ko'tariluvchi karta hover effekti:\n.card {\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}",
      "// Akkordeon strelkasini burish:\n.arrow.open {\n  transform: rotate(180deg);\n}"
    ],
    "cheatSheetTips": [
      "transition qoidasini :hover ichiga emas, elementning asosiy qoidasiga yozing.",
      "Animatsiyalarda top/left o'rniga doimo transform: translate() ishlating — u GPU da silliq ishlaydi.",
      "Faqat kerakli xossalarni ko'rsating: transition: transform 0.2s, background-color 0.2s."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"15. CSS O'tishlar (Transitions) va Transformatsiyalar\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "15. CSS O'tishlar (Transitions) va Transformatsiyalar",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Silliq o'tishlar (transition) va transformatsiyalar (transform) saytga jon bag'ishlaydi. transition o'zgarishni mayin qiladi, transform esa surish (translate), kattalashtirish (scale) va aylantirish (rotate) imkonini beradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "transition: all 0.3s ease: Har qanday o'zgarish 0.3 soniyada silliq kechadi.",
          "transform: scale(1.05): Sichqoncha borganda biroz kattalashish effekti.",
          "transform: translateY(-5px): Kartaning biroz havoga ko'tarilishi.",
          "transform: rotate(45deg): 45 gradusga burish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": ".tugma {\n  background-color: #6366f1;\n  color: white;\n  padding: 12px 24px;\n  border-radius: 8px;\n  transition: transform 0.2s ease, background-color 0.2s ease;\n}\n\n.tugma:hover {\n  background-color: #4f46e5;\n  transform: translateY(-3px) scale(1.02);\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Ko'tariluvchi karta hover effekti:\n.card {\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}",
          "// Akkordeon strelkasini burish:\n.arrow.open {\n  transform: rotate(180deg);\n}"
        ],
        "codeSnippet": "// Ko'tariluvchi karta hover effekti:\n.card {\n  transition: transform 0.25s ease, box-shadow 0.25s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "transition qoidasini :hover ichiga emas, elementning asosiy qoidasiga yozing.",
          "Animatsiyalarda top/left o'rniga doimo transform: translate() ishlating — u GPU da silliq ishlaydi.",
          "Faqat kerakli xossalarni ko'rsating: transition: transform 0.2s, background-color 0.2s."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: transition va transform: scale xossalarini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"transform:\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +180 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": ".card:hover {\n  transform: scale(1.05);\n  transition: all 0.3s ease;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-css-16",
    "stage": "css",
    "title": "16. CSS Animatsiyalar (@keyframes, infinite loops)",
    "duration": "40 daqiqa",
    "xpReward": 210,
    "w3ReferenceTopic": "CSS Animations & @keyframes Rules",
    "summary": "CSS Animatsiyalari @keyframes orqali ssenariy asosida ishlaydi (0% dan 100% gacha). CSS O'zgaruvchilar (:root ichidagi --rang: #...) esa ranglar mavzularini (Qora/Oq rejim) bitta joydan boshqarishga imkon beradi.",
    "theoryDetails": [
      "@keyframes puls: 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; }.",
      "animation-iteration-count: infinite: To'xtovsiz abadiy aylanish.",
      "animation-timing-function: ease-in-out: Boshlanishi va tugashi yumshoq harakat."
    ],
    "codeExample": "@keyframes aylan {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.yuklanmoqda-aylana {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #334155;\n  border-top-color: #38bdf8;\n  border-radius: 50%;\n  animation: aylan 1s linear infinite;\n}",
    "practiceTask": "@keyframes va animation xossasini yozing.",
    "starterCode": "@keyframes yaltiroq {\n  0% { opacity: 0.2; }\n  100% { opacity: 1; }\n}\n.glow {\n  animation: yaltiroq 2s infinite;\n}",
    "solutionKeyword": "@keyframes",
    "realWorldExamples": [
      "// Yuklanish indikatori (Spinner):\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}",
      "// Tungi rejim o'zgaruvchilari:\n:root { --bg: #ffffff; --text: #0f172a; }\nbody.dark { --bg: #0f172a; --text: #ffffff; }"
    ],
    "cheatSheetTips": [
      "Spinner animatsiyalarida har doim 'linear' tezlanish bering — bir maromda aylanadi.",
      "CSS o'zgaruvchilarini var(--o'zgaruvchi_nomi) orqali chaqirasiz.",
      "prefers-reduced-motion orqali animatsiyani o'chirish imkonini bering."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (CSS3 kaskadli uslublar jadvali) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"16. CSS Animatsiyalar (@keyframes, infinite loops)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": ".card:hover {\n  transition: all 0.3s ease;\n  transform: translateY(-5px);\n}",
        "goodCode": ".card {\n  transition: transform 0.3s ease;\n}\n.card:hover {\n  transform: translateY(-5px);\n}",
        "explanation": "'transition' xossasi :hover ichiga emas, elementning asosiy qoidasiga yozilishi kerak. Agar hover ichiga yozilsa, sichqoncha olinganda element mayin qaytmasdan, qo'pol tarzda sakrab joyiga qaytadi."
      },
      {
        "badCode": ".box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "goodCode": "* {\n  box-sizing: border-box;\n}\n.box {\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n}",
        "explanation": "'box-sizing: border-box' bo'lmasa, padding va border element kengligiga qo'shilib ketadi va 300px o'rniga 350px bo'lib maket buziladi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "CSS Specificity (O'ziga xoslik / ustunlik darajasi) qanday hisoblanadi?",
        "answer": "CSS Specificity 4 ta ustunli (0, 0, 0, 0) matematik og'irlik bilan o'lchanadi: 1-ustun: Inline style (1,0,0,0); 2-ustun: ID selektorlar (#id: 0,1,0,0); 3-ustun: Class, psevdo-klass va atributlar (.class, :hover: 0,0,1,0); 4-ustun: Element va psevdo-elementlar (div, ::after: 0,0,0,1). Agar bitta elementga ikki xil qoida to'qnash kelsa, og'irligi kattasi g'olib chiqadi. !important esa barcha hisob-kitoblarni buzib o'tadi, lekin undan foydalanish juda kam hollarda tavsiya etiladi."
      },
      {
        "question": "Flexbox va CSS Grid orasidagi tub fundamental farq nima va qachon qaysi birini tanlash kerak?",
        "answer": "Asosiy farq o'lchamlarda: Flexbox bir o'lchamli (1D - yo qator bo'yicha yoki ustun bo'yicha) maketlar uchun mo'ljallangan va elementlarning ichki kontentiga qarab bo'shliqni taqsimlashda eng zo'ri hisoblanadi (masalan Navbar, tugmalar guruhi, kartochka ichki qismlari). CSS Grid esa ikki o'lchamli (2D - bir vaqtning o'zida ham qatorlarni, ham ustunlarni) to'liq maket tizimidir (masalan umumiy sahifa strukturasi, dashboard panellari, fotogalereyalar)."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "Selektor",
        "meaning": "Uslub qaysi HTML elementiga qo'llanilishini ko'rsatuvchi nishon (.class, #id, tag)."
      },
      {
        "term": "Xossa (Property)",
        "meaning": "O'zgartirilayotgan vizual parametr (masalan color, font-size, display)."
      },
      {
        "term": "Qiymat (Value)",
        "meaning": "Xossaga berilayotgan aniq o'lcham yoki holat (masalan #0284c7, 16px, flex)."
      },
      {
        "term": "Kaskadlik (Cascading)",
        "meaning": "Qoidalarning ierarxiya va ustunlik bo'yicha ketma-ket qo'llanilishi."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "16. CSS Animatsiyalar (@keyframes, infinite loops)",
        "subtitle": "CSS bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "CSS Animatsiyalari @keyframes orqali ssenariy asosida ishlaydi (0% dan 100% gacha). CSS O'zgaruvchilar (:root ichidagi --rang: #...) esa ranglar mavzularini (Qora/Oq rejim) bitta joydan boshqarishga imkon beradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "@keyframes puls: 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; }.",
          "animation-iteration-count: infinite: To'xtovsiz abadiy aylanish.",
          "animation-timing-function: ease-in-out: Boshlanishi va tugashi yumshoq harakat."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "@keyframes aylan {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n.yuklanmoqda-aylana {\n  width: 40px;\n  height: 40px;\n  border: 4px solid #334155;\n  border-top-color: #38bdf8;\n  border-radius: 50%;\n  animation: aylan 1s linear infinite;\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Yuklanish indikatori (Spinner):\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}",
          "// Tungi rejim o'zgaruvchilari:\n:root { --bg: #ffffff; --text: #0f172a; }\nbody.dark { --bg: #0f172a; --text: #ffffff; }"
        ],
        "codeSnippet": "// Yuklanish indikatori (Spinner):\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.spinner {\n  width: 32px;\n  height: 32px;\n  border: 3px solid #e2e8f0;\n  border-top-color: var(--primary);\n  border-radius: 50%;\n  animation: spin 0.8s linear infinite;\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Spinner animatsiyalarida har doim 'linear' tezlanish bering — bir maromda aylanadi.",
          "CSS o'zgaruvchilarini var(--o'zgaruvchi_nomi) orqali chaqirasiz.",
          "prefers-reduced-motion orqali animatsiyani o'chirish imkonini bering."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: @keyframes va animation xossasini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"@keyframes\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +210 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "@keyframes yaltiroq {\n  0% { opacity: 0.2; }\n  100% { opacity: 1; }\n}\n.glow {\n  animation: yaltiroq 2s infinite;\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  }
];

export const W3_JS_LESSONS: Lesson[] = [
  {
    "id": "l-js-1",
    "stage": "javascript",
    "title": "1. JavaScript Kirish, Console va Birinchi Skript",
    "duration": "25 daqiqa",
    "xpReward": 140,
    "w3ReferenceTopic": "JavaScript Introduction & Where To",
    "summary": "JavaScript veb-sahifalarni jonlantiruvchi dasturlash tilidir. U brauzerda ishlaydi, tugmalar bosilishini tinglaydi va sahifani qayta yuklamasdan ekranni yangilaydi. console.log() esa dasturchining asosiy tekshiruv vositasidir.",
    "theoryDetails": [
      "<script>: HTML fayl ichida JS kodini joylashtirish tegi.",
      "console.log('Salom'): Dasturchilar uchun eng asosiy tekshirish vositasi.",
      "alert('Xush kelibsiz'): Ekranga qalqib chiquvchi xabar oynasini ochadi.",
      "Bir qatorli izoh // va ko'p qatorli izoh /* ... */."
    ],
    "codeExample": "// Konsolga ma'lumot chiqarish\nconsole.log(\"DevMaster Akademiyasiga xush kelibsiz!\");\n\n// O'zgaruvchi bilan salomlashish\nlet ism = \"Olimjon\";\nconsole.log(\"Assalomu alaykum, \" + ism);",
    "practiceTask": "console.log() orqali o'z ismingizni chiqaring.",
    "starterCode": "console.log(\"Salom, Dasturchi!\");",
    "solutionKeyword": "console.log",
    "realWorldExamples": [
      "// Konsolga ma'lumot chiqarish:\nconsole.log(\"DevMaster Akademiyasiga xush kelibsiz!\");\nconsole.table([{ ism: 'Jasur', ball: 95 }, { ism: 'Madina', ball: 98 }]);",
      "// Dastur tezligini o'lchash:\nconsole.time('hisoblash');\n// kod...\nconsole.timeEnd('hisoblash');"
    ],
    "cheatSheetTips": [
      "<script> tegini doimo <body> ning oxiriga yoki <head> ichida 'defer' bilan qo'ying.",
      "alert() sahifa ishlashini to'xtatib qo'ygani sababli undan kamroq foydalaning.",
      "F12 tugmasi orqali brauzer konsolini ochiq holda kod yozing."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"1. JavaScript Kirish, Console va Birinchi Skript\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "1. JavaScript Kirish, Console va Birinchi Skript",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "JavaScript veb-sahifalarni jonlantiruvchi dasturlash tilidir. U brauzerda ishlaydi, tugmalar bosilishini tinglaydi va sahifani qayta yuklamasdan ekranni yangilaydi. console.log() esa dasturchining asosiy tekshiruv vositasidir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "<script>: HTML fayl ichida JS kodini joylashtirish tegi.",
          "console.log('Salom'): Dasturchilar uchun eng asosiy tekshirish vositasi.",
          "alert('Xush kelibsiz'): Ekranga qalqib chiquvchi xabar oynasini ochadi.",
          "Bir qatorli izoh // va ko'p qatorli izoh /* ... */."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// Konsolga ma'lumot chiqarish\nconsole.log(\"DevMaster Akademiyasiga xush kelibsiz!\");\n\n// O'zgaruvchi bilan salomlashish\nlet ism = \"Olimjon\";\nconsole.log(\"Assalomu alaykum, \" + ism);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Konsolga ma'lumot chiqarish:\nconsole.log(\"DevMaster Akademiyasiga xush kelibsiz!\");\nconsole.table([{ ism: 'Jasur', ball: 95 }, { ism: 'Madina', ball: 98 }]);",
          "// Dastur tezligini o'lchash:\nconsole.time('hisoblash');\n// kod...\nconsole.timeEnd('hisoblash');"
        ],
        "codeSnippet": "// Konsolga ma'lumot chiqarish:\nconsole.log(\"DevMaster Akademiyasiga xush kelibsiz!\");\nconsole.table([{ ism: 'Jasur', ball: 95 }, { ism: 'Madina', ball: 98 }]);",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "<script> tegini doimo <body> ning oxiriga yoki <head> ichida 'defer' bilan qo'ying.",
          "alert() sahifa ishlashini to'xtatib qo'ygani sababli undan kamroq foydalaning.",
          "F12 tugmasi orqali brauzer konsolini ochiq holda kod yozing."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: console.log() orqali o'z ismingizni chiqaring.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"console.log\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +140 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "console.log(\"Salom, Dasturchi!\");",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-2",
    "stage": "javascript",
    "title": "2. O'zgaruvchilar va Ko'lam (let, const, var, Scope)",
    "duration": "30 daqiqa",
    "xpReward": 160,
    "w3ReferenceTopic": "JavaScript Variables, let, const & Block Scope",
    "summary": "O'zgaruvchilar ma'lumotlarni xotirada saqlash vositasidir. Zamonaviy JS da o'zgarmaslar uchun 'const', o'zgaruvchanlar uchun 'let' ishlatiladi. Eski 'var' blok ko'lamiga ega bo'lmagani uchun ishlatilmaydi.",
    "theoryDetails": [
      "const: Qayta qiymat berib bo'lmaydigan qat'iy o'zgaruvchi (masalan: tug'ilgan yil, API URL).",
      "let: Keyinchalik yangi qiymat yuklash mumkin bo'lgan o'zgaruvchi (masalan: o'yin bali, hisoblagich).",
      "Block Scope: let va const e'lon qilingan jingalak qavslar { } ichidagina yashaydi."
    ],
    "codeExample": "const AKADEMIYA_NOMI = \"DevMaster\";\nlet talabalarSoni = 15;\n\n// Talabalar soni oshdi\ntalabalarSoni = talabalarSoni + 1;\nconsole.log(AKADEMIYA_NOMI + \" jami talabalari: \" + talabalarSoni);",
    "practiceTask": "const va let o'zgaruvchilarini e'lon qiling.",
    "starterCode": "const til = \"JavaScript\";\nlet ball = 100;\nconsole.log(til, ball);",
    "solutionKeyword": "const",
    "realWorldExamples": [
      "// O'zgaruvchilar bilan ishlash:\nconst API_URL = 'https://api.devmaster.uz';\nlet loginUrinishlari = 0;\nloginUrinishlari++;",
      "// Blok ko'lami ({ scope }):\n{\n  let ichki = 'sir';\n  // tashqarida 'ichki' mavjud emas\n}"
    ],
    "cheatSheetTips": [
      "Har doim birinchi bo'lib 'const' ni tanlang! Faqat qiymat o'zgarishi aniq bo'lsagina 'let' ishlating.",
      "Hech qachon 'var' ishlatmang — bu eskirgan xavfli amaliyotdir.",
      "Nomlarni camelCase uslubida yozing: userProfile, totalPrice."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"2. O'zgaruvchilar va Ko'lam (let, const, var, Scope)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "2. O'zgaruvchilar va Ko'lam (let, const, var, Scope)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "O'zgaruvchilar ma'lumotlarni xotirada saqlash vositasidir. Zamonaviy JS da o'zgarmaslar uchun 'const', o'zgaruvchanlar uchun 'let' ishlatiladi. Eski 'var' blok ko'lamiga ega bo'lmagani uchun ishlatilmaydi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "const: Qayta qiymat berib bo'lmaydigan qat'iy o'zgaruvchi (masalan: tug'ilgan yil, API URL).",
          "let: Keyinchalik yangi qiymat yuklash mumkin bo'lgan o'zgaruvchi (masalan: o'yin bali, hisoblagich).",
          "Block Scope: let va const e'lon qilingan jingalak qavslar { } ichidagina yashaydi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const AKADEMIYA_NOMI = \"DevMaster\";\nlet talabalarSoni = 15;\n\n// Talabalar soni oshdi\ntalabalarSoni = talabalarSoni + 1;\nconsole.log(AKADEMIYA_NOMI + \" jami talabalari: \" + talabalarSoni);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// O'zgaruvchilar bilan ishlash:\nconst API_URL = 'https://api.devmaster.uz';\nlet loginUrinishlari = 0;\nloginUrinishlari++;",
          "// Blok ko'lami ({ scope }):\n{\n  let ichki = 'sir';\n  // tashqarida 'ichki' mavjud emas\n}"
        ],
        "codeSnippet": "// O'zgaruvchilar bilan ishlash:\nconst API_URL = 'https://api.devmaster.uz';\nlet loginUrinishlari = 0;\nloginUrinishlari++;",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Har doim birinchi bo'lib 'const' ni tanlang! Faqat qiymat o'zgarishi aniq bo'lsagina 'let' ishlating.",
          "Hech qachon 'var' ishlatmang — bu eskirgan xavfli amaliyotdir.",
          "Nomlarni camelCase uslubida yozing: userProfile, totalPrice."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: const va let o'zgaruvchilarini e'lon qiling.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"const\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +160 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const til = \"JavaScript\";\nlet ball = 100;\nconsole.log(til, ball);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-3",
    "stage": "javascript",
    "title": "3. Ma'lumot Turlari (Data Types) va Typeof Operator",
    "duration": "30 daqiqa",
    "xpReward": 150,
    "w3ReferenceTopic": "JavaScript Data Types & Type Conversion",
    "summary": "Ma'lumot turlari: Primitiv (String, Number, Boolean, Null, Undefined, Symbol) va Murakkab (Obyekt, Massiv). 'typeof' operatori orqali istalgan qiymatning turini bilish mumkin.",
    "theoryDetails": [
      "String: Matn ('Salom', \"Dunyo\", `Salom ${ism}`).",
      "Number: Butun va kasr sonlar (42, 3.14).",
      "Boolean: Faqat ikkita qiymat — true (rost) yoki false (yolg'on).",
      "null: Qiymat qasddan bo'sh qilinganligini bildiradi.",
      "undefined: O'zgaruvchi ochilgan, lekin hali qiymat berilmagan."
    ],
    "codeExample": "let ism = \"Olimjon\";        // String\nlet yosh = 24;              // Number\nlet talabami = true;        // Boolean\nlet diplom = null;          // Null\nlet mashina;                // Undefined\n\nconsole.log(typeof ism);    // \"string\"\nconsole.log(typeof yosh);   // \"number\"",
    "practiceTask": "typeof operatoridan foydalanib o'zgaruvchi turini tekshiring.",
    "starterCode": "let son = 42;\nconsole.log(typeof son);",
    "solutionKeyword": "typeof",
    "realWorldExamples": [
      "// Ma'lumot turlari va tekshirish:\nconst ism = \"Olimjon\"; // string\nconst yosh = 25; // number\nconst faolmi = true; // boolean\nconsole.log(typeof ism, typeof yosh, typeof faolmi);",
      "// Template Literals bilan matn yaratish:\nconsole.log(`Salom, ${ism}! Sizning yoshingiz: ${yosh}`);"
    ],
    "cheatSheetTips": [
      "typeof null 'object' chiqaradi — bu tilning tarixiy kamchiligidir.",
      "undefined — qiymat berilmaganlik; null — dasturchi ataylab qo'ygan bo'shlik.",
      "Matnlarni birlashtirishda eski + o'rniga bektik (`Salom ${ism}`) ishlating."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"3. Ma'lumot Turlari (Data Types) va Typeof Operator\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "3. Ma'lumot Turlari (Data Types) va Typeof Operator",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Ma'lumot turlari: Primitiv (String, Number, Boolean, Null, Undefined, Symbol) va Murakkab (Obyekt, Massiv). 'typeof' operatori orqali istalgan qiymatning turini bilish mumkin.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "String: Matn ('Salom', \"Dunyo\", `Salom ${ism}`).",
          "Number: Butun va kasr sonlar (42, 3.14).",
          "Boolean: Faqat ikkita qiymat — true (rost) yoki false (yolg'on).",
          "null: Qiymat qasddan bo'sh qilinganligini bildiradi.",
          "undefined: O'zgaruvchi ochilgan, lekin hali qiymat berilmagan."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "let ism = \"Olimjon\";        // String\nlet yosh = 24;              // Number\nlet talabami = true;        // Boolean\nlet diplom = null;          // Null\nlet mashina;                // Undefined\n\nconsole.log(typeof ism);    // \"string\"\nconsole.log(typeof yosh);   // \"number\"",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Ma'lumot turlari va tekshirish:\nconst ism = \"Olimjon\"; // string\nconst yosh = 25; // number\nconst faolmi = true; // boolean\nconsole.log(typeof ism, typeof yosh, typeof faolmi);",
          "// Template Literals bilan matn yaratish:\nconsole.log(`Salom, ${ism}! Sizning yoshingiz: ${yosh}`);"
        ],
        "codeSnippet": "// Ma'lumot turlari va tekshirish:\nconst ism = \"Olimjon\"; // string\nconst yosh = 25; // number\nconst faolmi = true; // boolean\nconsole.log(typeof ism, typeof yosh, typeof faolmi);",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "typeof null 'object' chiqaradi — bu tilning tarixiy kamchiligidir.",
          "undefined — qiymat berilmaganlik; null — dasturchi ataylab qo'ygan bo'shlik.",
          "Matnlarni birlashtirishda eski + o'rniga bektik (`Salom ${ism}`) ishlating."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: typeof operatoridan foydalanib o'zgaruvchi turini tekshiring.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"typeof\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +150 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "let son = 42;\nconsole.log(typeof son);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-4",
    "stage": "javascript",
    "title": "4. Arifmetik va Mantiqiy Operatorlar (===, !==, &&, ||, !)",
    "duration": "35 daqiqa",
    "xpReward": 160,
    "w3ReferenceTopic": "JavaScript Operators (Arithmetic, Comparison, Logical)",
    "summary": "Operatorlar arifmetik (+, -, *, /, %), tayinlash (+=), taqqoslash (===, !==) va mantiqiy (&&, ||, !) turlarga bo'linadi. Har doim qat'iy tenglik '===' (uchta tenglik) ishlatilishi shart.",
    "theoryDetails": [
      "=== vs ==: '5' == 5 rost qaytaradi, lekin '5' === 5 yolg'on qaytaradi (turlari har xil). Har doim === ishlating!",
      "&& (AND): faqat barcha shartlar qanoatlansa ishlaydi.",
      "|| (OR): kamida bitta shart to'g'ri bo'lsa ishlaydi."
    ],
    "codeExample": "let ball = 85;\nlet qatnashdi = true;\n\n// A'lochi ekanligini tekshirish\nif (ball >= 80 && qatnashdi) {\n  console.log(\"Tabriklaymiz! Siz imtihondan o'tdingiz 🏆\");\n}\n\nlet yosh = 16;\nlet ruxsat = yosh >= 18 ? \"Kattalar zali\" : \"Bolalar zali\";",
    "practiceTask": "=== va && operatorlaridan foydalanib shart tuzing.",
    "starterCode": "let a = 10;\nlet b = 10;\nconsole.log(a === b && a > 5);",
    "solutionKeyword": "===",
    "realWorldExamples": [
      "// Qat'iy tenglik tekshiruvi:\nconsole.log(5 === 5); // true\nconsole.log('5' === 5); // false (turlari har xil!)",
      "// Mantiqiy huquq tekshirish:\nconst yosh = 20;\nconst passBor = true;\nconst ruxsat = (yosh >= 18) && passBor;"
    ],
    "cheatSheetTips": [
      "Hech qachon '==' ishlatmang, doimo '===' ishlating — turlar chalkashib ketmaydi.",
      "+ belgisi ikkala tomon son bo'lsa qo'shadi, biri matn bo'lsa yopishtiradi ('5' + 5 = '55').",
      "Nullish coalescing (??) null yoki undefined bo'lsagina zaxira qiymatni oladi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"4. Arifmetik va Mantiqiy Operatorlar (===, !==, &&, ||, !)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "4. Arifmetik va Mantiqiy Operatorlar (===, !==, &&, ||, !)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Operatorlar arifmetik (+, -, *, /, %), tayinlash (+=), taqqoslash (===, !==) va mantiqiy (&&, ||, !) turlarga bo'linadi. Har doim qat'iy tenglik '===' (uchta tenglik) ishlatilishi shart.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "=== vs ==: '5' == 5 rost qaytaradi, lekin '5' === 5 yolg'on qaytaradi (turlari har xil). Har doim === ishlating!",
          "&& (AND): faqat barcha shartlar qanoatlansa ishlaydi.",
          "|| (OR): kamida bitta shart to'g'ri bo'lsa ishlaydi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "let ball = 85;\nlet qatnashdi = true;\n\n// A'lochi ekanligini tekshirish\nif (ball >= 80 && qatnashdi) {\n  console.log(\"Tabriklaymiz! Siz imtihondan o'tdingiz 🏆\");\n}\n\nlet yosh = 16;\nlet ruxsat = yosh >= 18 ? \"Kattalar zali\" : \"Bolalar zali\";",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Qat'iy tenglik tekshiruvi:\nconsole.log(5 === 5); // true\nconsole.log('5' === 5); // false (turlari har xil!)",
          "// Mantiqiy huquq tekshirish:\nconst yosh = 20;\nconst passBor = true;\nconst ruxsat = (yosh >= 18) && passBor;"
        ],
        "codeSnippet": "// Qat'iy tenglik tekshiruvi:\nconsole.log(5 === 5); // true\nconsole.log('5' === 5); // false (turlari har xil!)",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Hech qachon '==' ishlatmang, doimo '===' ishlating — turlar chalkashib ketmaydi.",
          "+ belgisi ikkala tomon son bo'lsa qo'shadi, biri matn bo'lsa yopishtiradi ('5' + 5 = '55').",
          "Nullish coalescing (??) null yoki undefined bo'lsagina zaxira qiymatni oladi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: === va && operatorlaridan foydalanib shart tuzing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"===\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +160 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "let a = 10;\nlet b = 10;\nconsole.log(a === b && a > 5);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-5",
    "stage": "javascript",
    "title": "5. Shart Operatorlari (if, else if, else, switch, Ternary)",
    "duration": "35 daqiqa",
    "xpReward": 170,
    "w3ReferenceTopic": "JavaScript Conditions & Switch Statement",
    "summary": "Shart operatorlari (if, else if, else) dastur mantig'ini boshqaradi. Ternar operatori (? :) esa oddiy if/else ni bitta qatorda yozish imkonini beradi. Falsy qiymatlar: 0, '', null, undefined, NaN, false.",
    "theoryDetails": [
      "if: Agar qavs ichidagi shart true bo'lsa blokdagi kod bajariladi.",
      "else if: Birinchi shart bajarilmasa, ikkinchi variantni tekshiradi.",
      "switch(qiymat) case 'A': break: Aniq qiymat mosligini tekshirish."
    ],
    "codeExample": "let baho = 4;\n\nswitch (baho) {\n  case 5:\n    console.log(\"A'lo daraja!\");\n    break;\n  case 4:\n    console.log(\"Yaxshi natija!\");\n    break;\n  default:\n    console.log(\"Ko'proq o'qish kerak.\");\n}\n\n// Qisqa ternary\nlet status = baho >= 4 ? \"Yaxshi\" : \"Qayta topshirish\";",
    "practiceTask": "if-else orqali ballni tekshiruvchi funksional kod yozing.",
    "starterCode": "let ball = 90;\nif (ball >= 80) {\n  console.log(\"Sertifikat tayyor\");\n} else {\n  console.log(\"Yetarli emas\");\n}",
    "solutionKeyword": "if",
    "realWorldExamples": [
      "// Bahoni aniqlash:\nlet ball = 85;\nif (ball >= 90) console.log(\"A'lo\");\nelse if (ball >= 70) console.log(\"Yaxshi\");\nelse console.log(\"Qoniqarsiz\");",
      "// Ternar operatori:\nconst maqom = yosh >= 18 ? \"Katta\" : \"Kichik\";"
    ],
    "cheatSheetTips": [
      "Falsy qiymatlarni eslab qoling: 0, '', null, undefined, NaN, false.",
      "Ternar operatoridan faqat 1 qatorlik qisqa holatlarda foydalaning.",
      "Ichma-ich 3 qavatli if yozishdan saqlaning, funksiyani erta qaytaring (early return)."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"5. Shart Operatorlari (if, else if, else, switch, Ternary)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "5. Shart Operatorlari (if, else if, else, switch, Ternary)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Shart operatorlari (if, else if, else) dastur mantig'ini boshqaradi. Ternar operatori (? :) esa oddiy if/else ni bitta qatorda yozish imkonini beradi. Falsy qiymatlar: 0, '', null, undefined, NaN, false.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "if: Agar qavs ichidagi shart true bo'lsa blokdagi kod bajariladi.",
          "else if: Birinchi shart bajarilmasa, ikkinchi variantni tekshiradi.",
          "switch(qiymat) case 'A': break: Aniq qiymat mosligini tekshirish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "let baho = 4;\n\nswitch (baho) {\n  case 5:\n    console.log(\"A'lo daraja!\");\n    break;\n  case 4:\n    console.log(\"Yaxshi natija!\");\n    break;\n  default:\n    console.log(\"Ko'proq o'qish kerak.\");\n}\n\n// Qisqa ternary\nlet status = baho >= 4 ? \"Yaxshi\" : \"Qayta topshirish\";",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Bahoni aniqlash:\nlet ball = 85;\nif (ball >= 90) console.log(\"A'lo\");\nelse if (ball >= 70) console.log(\"Yaxshi\");\nelse console.log(\"Qoniqarsiz\");",
          "// Ternar operatori:\nconst maqom = yosh >= 18 ? \"Katta\" : \"Kichik\";"
        ],
        "codeSnippet": "// Bahoni aniqlash:\nlet ball = 85;\nif (ball >= 90) console.log(\"A'lo\");\nelse if (ball >= 70) console.log(\"Yaxshi\");\nelse console.log(\"Qoniqarsiz\");",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Falsy qiymatlarni eslab qoling: 0, '', null, undefined, NaN, false.",
          "Ternar operatoridan faqat 1 qatorlik qisqa holatlarda foydalaning.",
          "Ichma-ich 3 qavatli if yozishdan saqlaning, funksiyani erta qaytaring (early return)."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: if-else orqali ballni tekshiruvchi funksional kod yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"if\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +170 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "let ball = 90;\nif (ball >= 80) {\n  console.log(\"Sertifikat tayyor\");\n} else {\n  console.log(\"Yetarli emas\");\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-6",
    "stage": "javascript",
    "title": "6. Sikllar (for, while, do...while, for...of, for...in)",
    "duration": "35 daqiqa",
    "xpReward": 180,
    "w3ReferenceTopic": "JavaScript Loops (For, While, For-Of)",
    "summary": "switch operatori bitta o'zgaruvchini bir nechta variantlar (case) bilan taqqoslaydi. Har bir case oxirida 'break' qo'yilishi shart, 'default' esa zaxira variantidir.",
    "theoryDetails": [
      "for (let i = 0; i < 5; i++): 0 dan 4 gacha aylanadi.",
      "for (const element of massiv): Massiv bilan ishlashda eng qulay va zamonaviy usul.",
      "break: Siklni muddatidan oldin butunlay to'xtatish.",
      "continue: Joriy iteratsiyani o'tkazib yuborib, keyingisiga o'tish."
    ],
    "codeExample": "// for...of sikli\nconst texnologiyalar = [\"HTML\", \"CSS\", \"JavaScript\", \"React\"];\n\nfor (const tex of texnologiyalar) {\n  console.log(\"O'rganilmoqda: \" + tex);\n}\n\n// 1 dan 5 gacha sonlar yig'indisi\nlet yigindi = 0;\nfor (let i = 1; i <= 5; i++) {\n  yigindi += i;\n}\nconsole.log(\"Yig'indi:\", yigindi);",
    "practiceTask": "for siklidan foydalanib 1 dan 3 gacha sonlarni chiqaring.",
    "starterCode": "for (let i = 1; i <= 3; i++) {\n  console.log(\"Qadam: \" + i);\n}",
    "solutionKeyword": "for",
    "realWorldExamples": [
      "// Foydalanuvchi roli bo'yicha yo'naltirish:\nconst rol = 'admin';\nswitch (rol) {\n  case 'admin': console.log(\"Boshqaruv\"); break;\n  case 'teacher': console.log(\"O'qituvchi\"); break;\n  default: console.log(\"O'quvchi\");\n}"
    ],
    "cheatSheetTips": [
      "Har doim 'break' yozing, aks holda keyingi case ham asossiz ishlab ketadi.",
      "switch qat'iy tenglik (===) bilan ishlaydi.",
      "Bir xil amal bajarilsa bir nechta case larni ketma-ket qo'yish mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"6. Sikllar (for, while, do...while, for...of, for...in)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "6. Sikllar (for, while, do...while, for...of, for...in)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "switch operatori bitta o'zgaruvchini bir nechta variantlar (case) bilan taqqoslaydi. Har bir case oxirida 'break' qo'yilishi shart, 'default' esa zaxira variantidir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "for (let i = 0; i < 5; i++): 0 dan 4 gacha aylanadi.",
          "for (const element of massiv): Massiv bilan ishlashda eng qulay va zamonaviy usul.",
          "break: Siklni muddatidan oldin butunlay to'xtatish.",
          "continue: Joriy iteratsiyani o'tkazib yuborib, keyingisiga o'tish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// for...of sikli\nconst texnologiyalar = [\"HTML\", \"CSS\", \"JavaScript\", \"React\"];\n\nfor (const tex of texnologiyalar) {\n  console.log(\"O'rganilmoqda: \" + tex);\n}\n\n// 1 dan 5 gacha sonlar yig'indisi\nlet yigindi = 0;\nfor (let i = 1; i <= 5; i++) {\n  yigindi += i;\n}\nconsole.log(\"Yig'indi:\", yigindi);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Foydalanuvchi roli bo'yicha yo'naltirish:\nconst rol = 'admin';\nswitch (rol) {\n  case 'admin': console.log(\"Boshqaruv\"); break;\n  case 'teacher': console.log(\"O'qituvchi\"); break;\n  default: console.log(\"O'quvchi\");\n}"
        ],
        "codeSnippet": "// Foydalanuvchi roli bo'yicha yo'naltirish:\nconst rol = 'admin';\nswitch (rol) {\n  case 'admin': console.log(\"Boshqaruv\"); break;\n  case 'teacher': console.log(\"O'qituvchi\"); break;\n  default: console.log(\"O'quvchi\");\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Har doim 'break' yozing, aks holda keyingi case ham asossiz ishlab ketadi.",
          "switch qat'iy tenglik (===) bilan ishlaydi.",
          "Bir xil amal bajarilsa bir nechta case larni ketma-ket qo'yish mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: for siklidan foydalanib 1 dan 3 gacha sonlarni chiqaring.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"for\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +180 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "for (let i = 1; i <= 3; i++) {\n  console.log(\"Qadam: \" + i);\n}",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-7",
    "stage": "javascript",
    "title": "7. Funksiyalar va Arrow Functions (ES6)",
    "duration": "40 daqiqa",
    "xpReward": 200,
    "w3ReferenceTopic": "JavaScript Functions & Arrow Function Syntax",
    "summary": "Sikllar (Loops) bir xil amalni takroriy bajaradi. 'for' takrorlanish soni aniq bo'lganda, 'while' shart to'g'ri bo'lganda aylanadi. 'break' to'xtatadi, 'continue' esa keyingi qadamga o'tadi.",
    "theoryDetails": [
      "Parametr: Funksiyaga kiritiladigan o'zgaruvchi qiymat.",
      "return: Funksiya hisoblagan natijani tashqariga chiqarib beradi.",
      "Arrow Function: Qisqa va nafis sintaksis: const kvadrat = x => x * x."
    ],
    "codeExample": "// Standart funksiya\nfunction salomBer(ism = \"O'quvchi\") {\n  return \"Assalomu alaykum, \" + ism + \"!\";\n}\n\n// Arrow function (strelkali)\nconst hisoblaXP = (darslar, bonus) => {\n  return (darslar * 100) + bonus;\n};\n\nconsole.log(salomBer(\"Olimjon\"));\nconsole.log(\"XP:\", hisoblaXP(5, 50));",
    "practiceTask": "Ikkita sonni qo'shuvchi arrow funksiya yozing.",
    "starterCode": "const qoshish = (a, b) => a + b;\nconsole.log(qoshish(10, 20));",
    "solutionKeyword": "=>",
    "realWorldExamples": [
      "// 1 dan 5 gacha sanash:\nfor (let i = 1; i <= 5; i++) {\n  console.log(\"Qadam:\", i);\n}",
      "// Massiv elementlarini qidirish:\nfor (let i = 0; i < ismlar.length; i++) {\n  if (ismlar[i] === 'Madina') { console.log(\"Topildi!\"); break; }\n}"
    ],
    "cheatSheetTips": [
      "Cheksiz sikl (infinite loop) dan ehtiyot bo'ling — hisoblagichni oshirishni unutmang.",
      "Massiv indekslari 0 dan boshlanadi, shuning uchun i < arr.length yoziladi.",
      "continue joriy qadamni tashlab keyingi aylanishga o'tadi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"7. Funksiyalar va Arrow Functions (ES6)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "7. Funksiyalar va Arrow Functions (ES6)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Sikllar (Loops) bir xil amalni takroriy bajaradi. 'for' takrorlanish soni aniq bo'lganda, 'while' shart to'g'ri bo'lganda aylanadi. 'break' to'xtatadi, 'continue' esa keyingi qadamga o'tadi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "Parametr: Funksiyaga kiritiladigan o'zgaruvchi qiymat.",
          "return: Funksiya hisoblagan natijani tashqariga chiqarib beradi.",
          "Arrow Function: Qisqa va nafis sintaksis: const kvadrat = x => x * x."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// Standart funksiya\nfunction salomBer(ism = \"O'quvchi\") {\n  return \"Assalomu alaykum, \" + ism + \"!\";\n}\n\n// Arrow function (strelkali)\nconst hisoblaXP = (darslar, bonus) => {\n  return (darslar * 100) + bonus;\n};\n\nconsole.log(salomBer(\"Olimjon\"));\nconsole.log(\"XP:\", hisoblaXP(5, 50));",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// 1 dan 5 gacha sanash:\nfor (let i = 1; i <= 5; i++) {\n  console.log(\"Qadam:\", i);\n}",
          "// Massiv elementlarini qidirish:\nfor (let i = 0; i < ismlar.length; i++) {\n  if (ismlar[i] === 'Madina') { console.log(\"Topildi!\"); break; }\n}"
        ],
        "codeSnippet": "// 1 dan 5 gacha sanash:\nfor (let i = 1; i <= 5; i++) {\n  console.log(\"Qadam:\", i);\n}",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Cheksiz sikl (infinite loop) dan ehtiyot bo'ling — hisoblagichni oshirishni unutmang.",
          "Massiv indekslari 0 dan boshlanadi, shuning uchun i < arr.length yoziladi.",
          "continue joriy qadamni tashlab keyingi aylanishga o'tadi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Ikkita sonni qo'shuvchi arrow funksiya yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"=>\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +200 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const qoshish = (a, b) => a + b;\nconsole.log(qoshish(10, 20));",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-8",
    "stage": "javascript",
    "title": "8. String (Matn) Metodlari va Template Literals",
    "duration": "35 daqiqa",
    "xpReward": 170,
    "w3ReferenceTopic": "JavaScript String Methods & Template Literals",
    "summary": "Funksiyalar qayta ishlatiladigan kod bloklaridir (DRY tamoyili). Ular parametrlarni qabul qiladi va 'return' orqali natijani qaytaradi. Return dan keyingi kodlar bajarilmaydi.",
    "theoryDetails": [
      "`Salom ${ism}`: Qo'shish operatori (+) o'rniga zamonaviy matn shabloni.",
      "matn.includes('web'): Matn ichida so'z bor-yo'qligini tekshiradi (true/false).",
      "matn.split(','): Vergul bilan ajratilgan matnni massivga aylantiradi."
    ],
    "codeExample": "const kurs = \"   Web Dasturlash Kursi   \";\nconst tozaKurs = kurs.trim().toUpperCase();\nconsole.log(tozaKurs); // \"WEB DASTURLASH KURSI\"\n\nconst foydalanuvchi = \"Ali\";\nconst ball = 95;\nconsole.log(`O'quvchi: ${foydalanuvchi}, To'plagan bali: ${ball}`);",
    "practiceTask": "Template Literals (`${...}`) yordamida matn hosil qiling.",
    "starterCode": "let nom = \"DevMaster\";\nconsole.log(`Bizning akademiya: ${nom}`);",
    "solutionKeyword": "`",
    "realWorldExamples": [
      "// Qo'shuvchi funksiya:\nfunction qoshish(a, b) {\n  return a + b;\n}\nconsole.log(qoshish(20, 30));",
      "// Standart parametrli funksiya:\nfunction salom(ism = \"Mehmon\") {\n  return `Assalomu alaykum, ${ism}`;\n}"
    ],
    "cheatSheetTips": [
      "Funksiyalar faqat bitta vazifani bajarishi kerak (Single Responsibility).",
      "return qo'yishni unutmang, aks holda funksiya 'undefined' qaytaradi.",
      "Funksiya nomlarini fe'l bilan boshlang: calculateSum(), getUser()."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"8. String (Matn) Metodlari va Template Literals\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "8. String (Matn) Metodlari va Template Literals",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Funksiyalar qayta ishlatiladigan kod bloklaridir (DRY tamoyili). Ular parametrlarni qabul qiladi va 'return' orqali natijani qaytaradi. Return dan keyingi kodlar bajarilmaydi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "`Salom ${ism}`: Qo'shish operatori (+) o'rniga zamonaviy matn shabloni.",
          "matn.includes('web'): Matn ichida so'z bor-yo'qligini tekshiradi (true/false).",
          "matn.split(','): Vergul bilan ajratilgan matnni massivga aylantiradi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const kurs = \"   Web Dasturlash Kursi   \";\nconst tozaKurs = kurs.trim().toUpperCase();\nconsole.log(tozaKurs); // \"WEB DASTURLASH KURSI\"\n\nconst foydalanuvchi = \"Ali\";\nconst ball = 95;\nconsole.log(`O'quvchi: ${foydalanuvchi}, To'plagan bali: ${ball}`);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Qo'shuvchi funksiya:\nfunction qoshish(a, b) {\n  return a + b;\n}\nconsole.log(qoshish(20, 30));",
          "// Standart parametrli funksiya:\nfunction salom(ism = \"Mehmon\") {\n  return `Assalomu alaykum, ${ism}`;\n}"
        ],
        "codeSnippet": "// Qo'shuvchi funksiya:\nfunction qoshish(a, b) {\n  return a + b;\n}\nconsole.log(qoshish(20, 30));",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Funksiyalar faqat bitta vazifani bajarishi kerak (Single Responsibility).",
          "return qo'yishni unutmang, aks holda funksiya 'undefined' qaytaradi.",
          "Funksiya nomlarini fe'l bilan boshlang: calculateSum(), getUser()."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Template Literals (`${...}`) yordamida matn hosil qiling.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"`\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +170 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "let nom = \"DevMaster\";\nconsole.log(`Bizning akademiya: ${nom}`);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-9",
    "stage": "javascript",
    "title": "9. Number va Math Obyekti (Tasodifiy Sonlar, Math.random)",
    "duration": "30 daqiqa",
    "xpReward": 160,
    "w3ReferenceTopic": "JavaScript Number Methods & Math Object",
    "summary": "Arrow funksiyalari (=>) zamonaviy va ixcham sintaksis bo'lib, 'function' so'zini qisqartiradi. Bir qatorli ifodalarda 'return' siz natija qaytaradi va o'zining leksik 'this' kontekstiga ega.",
    "theoryDetails": [
      "Math.random(): 0 va 1 oralig'idagi tasodifiy kasr son.",
      "1 dan 10 gacha tasodifiy butun son: Math.floor(Math.random() * 10) + 1.",
      "toFixed(2): 3.14159 ni 3.14 qilib yaxlitlaydi."
    ],
    "codeExample": "// 1 dan 100 gacha tasodifiy son\nconst randomSon = Math.floor(Math.random() * 100) + 1;\nconsole.log(\"Tasodifiy generatsiya:\", randomSon);\n\nconst narx = 129.9876;\nconsole.log(\"Yaxlit narx: $\" + narx.toFixed(2));",
    "practiceTask": "Math.floor va Math.random dan foydalanib kod yozing.",
    "starterCode": "let random = Math.floor(Math.random() * 50) + 1;\nconsole.log(\"Son:\", random);",
    "solutionKeyword": "Math.random",
    "realWorldExamples": [
      "// Bir qatorli arrow funksiya:\nconst kvadrat = x => x * x;\nconsole.log(kvadrat(5)); // 25",
      "// Massiv metodida arrow funksiya:\nconst sonlar = [1, 2, 3];\nconst juftlar = sonlar.map(n => n * 2);"
    ],
    "cheatSheetTips": [
      "Bitta ifoda bo'lsa return va jingalak qavs yozmang: x => x * 2.",
      "Arrow funksiyadan obyekt qaytarish uchun qavsga oling: () => ({ ism: 'Ali' }).",
      "Obyektning to'g'ridan-to'g'ri metodlari uchun arrow funksiya ishlatmang."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"9. Number va Math Obyekti (Tasodifiy Sonlar, Math.random)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "9. Number va Math Obyekti (Tasodifiy Sonlar, Math.random)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Arrow funksiyalari (=>) zamonaviy va ixcham sintaksis bo'lib, 'function' so'zini qisqartiradi. Bir qatorli ifodalarda 'return' siz natija qaytaradi va o'zining leksik 'this' kontekstiga ega.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "Math.random(): 0 va 1 oralig'idagi tasodifiy kasr son.",
          "1 dan 10 gacha tasodifiy butun son: Math.floor(Math.random() * 10) + 1.",
          "toFixed(2): 3.14159 ni 3.14 qilib yaxlitlaydi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// 1 dan 100 gacha tasodifiy son\nconst randomSon = Math.floor(Math.random() * 100) + 1;\nconsole.log(\"Tasodifiy generatsiya:\", randomSon);\n\nconst narx = 129.9876;\nconsole.log(\"Yaxlit narx: $\" + narx.toFixed(2));",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Bir qatorli arrow funksiya:\nconst kvadrat = x => x * x;\nconsole.log(kvadrat(5)); // 25",
          "// Massiv metodida arrow funksiya:\nconst sonlar = [1, 2, 3];\nconst juftlar = sonlar.map(n => n * 2);"
        ],
        "codeSnippet": "// Bir qatorli arrow funksiya:\nconst kvadrat = x => x * x;\nconsole.log(kvadrat(5)); // 25",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Bitta ifoda bo'lsa return va jingalak qavs yozmang: x => x * 2.",
          "Arrow funksiyadan obyekt qaytarish uchun qavsga oling: () => ({ ism: 'Ali' }).",
          "Obyektning to'g'ridan-to'g'ri metodlari uchun arrow funksiya ishlatmang."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Math.floor va Math.random dan foydalanib kod yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"Math.random\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +160 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "let random = Math.floor(Math.random() * 50) + 1;\nconsole.log(\"Son:\", random);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-10",
    "stage": "javascript",
    "title": "10. Massivlar (Arrays) va Asosiy Metodlar (push, pop, splice)",
    "duration": "40 daqiqa",
    "xpReward": 190,
    "w3ReferenceTopic": "JavaScript Array Methods (Push, Pop, Shift, Splice)",
    "summary": "Massivlar (Arrays) tartiblangan ro'yxatlarni saqlaydi (indekslar 0 dan boshlanadi). push (oxiriga qo'shish), pop (oxiridan o'chirish), unshift (boshiga qo'shish) va splice (oradan o'chirish/qo'shish) asosiy metodlaridir.",
    "theoryDetails": [
      "massiv[0]: Massivning eng birinchi elementi.",
      "massiv.length: Massivdagi elementlarning umumiy soni.",
      "massiv.includes('HTML'): Element borligini tekshirish."
    ],
    "codeExample": "const fanlar = [\"HTML\", \"CSS\"];\n\n// Oxiriga qo'shish\nfanlar.push(\"JavaScript\");\nfanlar.push(\"React\");\n\nconsole.log(\"Fanlar ro'yxati:\", fanlar);\nconsole.log(\"Jami fanlar soni:\", fanlar.length);",
    "practiceTask": "Massiv yarating va push() metodi orqali yangi element qo'shing.",
    "starterCode": "let mevalar = [\"Olma\", \"Nok\"];\nmevalar.push(\"Anor\");\nconsole.log(mevalar);",
    "solutionKeyword": "push",
    "realWorldExamples": [
      "// Massiv amallari:\nconst tillar = ['HTML', 'CSS'];\ntillar.push('JavaScript'); // oxiriga qo'shish\nconst oxirgi = tillar.pop(); // oxirgisini olish",
      "// Oradan o'chirish (splice):\ntillar.splice(1, 1); // 1-indeksdagini o'chirish"
    ],
    "cheatSheetTips": [
      "Indekslar doimo 0 dan boshlanadi, oxirgi indeks: arr.length - 1.",
      "Massiv const bilan e'lon qilinsa ham push/pop orqali ichi o'zgaradi.",
      "shift va unshift katta massivlarda push/pop dan ko'ra sekinroq ishlaydi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"10. Massivlar (Arrays) va Asosiy Metodlar (push, pop, splice)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "10. Massivlar (Arrays) va Asosiy Metodlar (push, pop, splice)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Massivlar (Arrays) tartiblangan ro'yxatlarni saqlaydi (indekslar 0 dan boshlanadi). push (oxiriga qo'shish), pop (oxiridan o'chirish), unshift (boshiga qo'shish) va splice (oradan o'chirish/qo'shish) asosiy metodlaridir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "massiv[0]: Massivning eng birinchi elementi.",
          "massiv.length: Massivdagi elementlarning umumiy soni.",
          "massiv.includes('HTML'): Element borligini tekshirish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const fanlar = [\"HTML\", \"CSS\"];\n\n// Oxiriga qo'shish\nfanlar.push(\"JavaScript\");\nfanlar.push(\"React\");\n\nconsole.log(\"Fanlar ro'yxati:\", fanlar);\nconsole.log(\"Jami fanlar soni:\", fanlar.length);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Massiv amallari:\nconst tillar = ['HTML', 'CSS'];\ntillar.push('JavaScript'); // oxiriga qo'shish\nconst oxirgi = tillar.pop(); // oxirgisini olish",
          "// Oradan o'chirish (splice):\ntillar.splice(1, 1); // 1-indeksdagini o'chirish"
        ],
        "codeSnippet": "// Massiv amallari:\nconst tillar = ['HTML', 'CSS'];\ntillar.push('JavaScript'); // oxiriga qo'shish\nconst oxirgi = tillar.pop(); // oxirgisini olish",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Indekslar doimo 0 dan boshlanadi, oxirgi indeks: arr.length - 1.",
          "Massiv const bilan e'lon qilinsa ham push/pop orqali ichi o'zgaradi.",
          "shift va unshift katta massivlarda push/pop dan ko'ra sekinroq ishlaydi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Massiv yarating va push() metodi orqali yangi element qo'shing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"push\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +190 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "let mevalar = [\"Olma\", \"Nok\"];\nmevalar.push(\"Anor\");\nconsole.log(mevalar);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-11",
    "stage": "javascript",
    "title": "11. Murakkab Massiv Metodlari (map, filter, reduce, find)",
    "duration": "45 daqiqa",
    "xpReward": 220,
    "w3ReferenceTopic": "JavaScript Array Iteration (Map, Filter, Reduce)",
    "summary": "Ilg'or massiv metodlari (map, filter, find, reduce) zamonaviy dasturlashning asosidir. map yangi massiv beradi, filter saralaydi, find bittasini topadi, reduce esa butun massivni bitta qiymatga jamlaydi.",
    "theoryDetails": [
      "map: Asl massivni o'zgartirmasdan yangi hosila massiv yaratadi.",
      "filter: Faqat return sharti true bo'lgan elementlarni qoldiradi.",
      "reduce((jami, joriy) => jami + joriy, 0): Masalan savatdagi barcha tovarlar narxini jamlash."
    ],
    "codeExample": "const oquvchilar = [\n  { ism: \"Ali\", ball: 75 },\n  { ism: \"Vali\", ball: 92 },\n  { ism: \"Sami\", ball: 88 }\n];\n\n// Faqat 80 dan yuqori ball to'plagan a'lochilarni filtrlash\nconst alochilar = oquvchilar.filter(o => o.ball >= 80);\nconsole.log(\"A'lochilar:\", alochilar);\n\n// Faqat ismlar ro'yxatini ajratib olish (map)\nconst ismlar = oquvchilar.map(o => o.ism);\nconsole.log(\"Ismlar:\", ismlar);",
    "practiceTask": "filter yoki map metodidan foydalaning.",
    "starterCode": "const sonlar = [1, 2, 3, 4, 5];\nconst juft = sonlar.filter(s => s % 2 === 0);\nconsole.log(juft);",
    "solutionKeyword": "filter",
    "realWorldExamples": [
      "// filter va map zanjiri:\nconst talabalar = [\n  { ism: 'Jasur', ball: 95 },\n  { ism: 'Lobar', ball: 65 }\n];\nconst alochilar = talabalar.filter(t => t.ball >= 90).map(t => t.ism);",
      "// Umumiy savat narxini hisoblash:\nconst narxlar = [10000, 25000, 45000];\nconst jami = narxlar.reduce((sum, n) => sum + n, 0);"
    ],
    "cheatSheetTips": [
      "map va filter asl massivni buzmaydi (immutable), yangi nusxa qaytaradi.",
      "Shunchaki ekranga chiqarish uchun map emas, forEach ishlating.",
      "reduce() ga doimo boshlang'ich qiymat (masalan 0) bering."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"11. Murakkab Massiv Metodlari (map, filter, reduce, find)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "11. Murakkab Massiv Metodlari (map, filter, reduce, find)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Ilg'or massiv metodlari (map, filter, find, reduce) zamonaviy dasturlashning asosidir. map yangi massiv beradi, filter saralaydi, find bittasini topadi, reduce esa butun massivni bitta qiymatga jamlaydi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "map: Asl massivni o'zgartirmasdan yangi hosila massiv yaratadi.",
          "filter: Faqat return sharti true bo'lgan elementlarni qoldiradi.",
          "reduce((jami, joriy) => jami + joriy, 0): Masalan savatdagi barcha tovarlar narxini jamlash."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const oquvchilar = [\n  { ism: \"Ali\", ball: 75 },\n  { ism: \"Vali\", ball: 92 },\n  { ism: \"Sami\", ball: 88 }\n];\n\n// Faqat 80 dan yuqori ball to'plagan a'lochilarni filtrlash\nconst alochilar = oquvchilar.filter(o => o.ball >= 80);\nconsole.log(\"A'lochilar:\", alochilar);\n\n// Faqat ismlar ro'yxatini ajratib olish (map)\nconst ismlar = oquvchilar.map(o => o.ism);\nconsole.log(\"Ismlar:\", ismlar);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// filter va map zanjiri:\nconst talabalar = [\n  { ism: 'Jasur', ball: 95 },\n  { ism: 'Lobar', ball: 65 }\n];\nconst alochilar = talabalar.filter(t => t.ball >= 90).map(t => t.ism);",
          "// Umumiy savat narxini hisoblash:\nconst narxlar = [10000, 25000, 45000];\nconst jami = narxlar.reduce((sum, n) => sum + n, 0);"
        ],
        "codeSnippet": "// filter va map zanjiri:\nconst talabalar = [\n  { ism: 'Jasur', ball: 95 },\n  { ism: 'Lobar', ball: 65 }\n];\nconst alochilar = talabalar.filter(t => t.ball >= 90).map(t => t.ism);",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "map va filter asl massivni buzmaydi (immutable), yangi nusxa qaytaradi.",
          "Shunchaki ekranga chiqarish uchun map emas, forEach ishlating.",
          "reduce() ga doimo boshlang'ich qiymat (masalan 0) bering."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: filter yoki map metodidan foydalaning.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"filter\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +220 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const sonlar = [1, 2, 3, 4, 5];\nconst juft = sonlar.filter(s => s % 2 === 0);\nconsole.log(juft);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-12",
    "stage": "javascript",
    "title": "12. Obyektlar (Objects), Metodlar va \"this\" Kalit So'zi",
    "duration": "40 daqiqa",
    "xpReward": 200,
    "w3ReferenceTopic": "JavaScript Objects, Methods & The \"this\" Keyword",
    "summary": "Obyektlar (Objects) kalit: qiymat juftliklaridan iborat bo'lib, real obyektlarni dasturda ifodalaydi. Destructuring ({ ism, yosh } = user) va Spread ({ ...user }) zamonaviy qulay imkoniyatlardir.",
    "theoryDetails": [
      "Obyekt ochish: const odam = { ism: 'Ali', yosh: 20 };",
      "Qiymat olish: odam.ism yoki odam['ism'].",
      "this: Funksiya ichida obyektning boshqa xossalariga yetib borish vositasi."
    ],
    "codeExample": "const talaba = {\n  ism: \"Olimjon\",\n  familiya: \"Alimjonov\",\n  kurs: \"Frontend\",\n  xp: 1250,\n  toliqIsm() {\n    return this.ism + \" \" + this.familiya;\n  }\n};\n\nconsole.log(talaba.toliqIsm());\nconsole.log(\"Talaba kursi:\", talaba.kurs);",
    "practiceTask": "Kamida 2 ta xossaga ega obyekt yarating va konsolga chiqaring.",
    "starterCode": "const kitob = { nom: \"JS Darslik\", bet: 250 };\nconsole.log(kitob.nom);",
    "solutionKeyword": "{",
    "realWorldExamples": [
      "// Obyekt yaratish va metod:\nconst user = {\n  ism: 'Jasur',\n  ball: 95,\n  getInfo() { return `${this.ism}: ${this.ball} ball`; }\n};\nconst { ism, ball } = user; // Destructuring",
      "// Spread bilan nusxa olish:\nconst yangiUser = { ...user, shahar: 'Toshkent' };"
    ],
    "cheatSheetTips": [
      "Obyektlar havolaviy (reference) turdir, haqiqiy nusxa olish uchun { ...obj } qiling.",
      "Optional Chaining (?.) xatolardan asraydi: user?.manzil?.shahar.",
      "Metodlarda 'this' shu obyektning o'zini bildiradi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"12. Obyektlar (Objects), Metodlar va \"this\" Kalit So'zi\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "12. Obyektlar (Objects), Metodlar va \"this\" Kalit So'zi",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Obyektlar (Objects) kalit: qiymat juftliklaridan iborat bo'lib, real obyektlarni dasturda ifodalaydi. Destructuring ({ ism, yosh } = user) va Spread ({ ...user }) zamonaviy qulay imkoniyatlardir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "Obyekt ochish: const odam = { ism: 'Ali', yosh: 20 };",
          "Qiymat olish: odam.ism yoki odam['ism'].",
          "this: Funksiya ichida obyektning boshqa xossalariga yetib borish vositasi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const talaba = {\n  ism: \"Olimjon\",\n  familiya: \"Alimjonov\",\n  kurs: \"Frontend\",\n  xp: 1250,\n  toliqIsm() {\n    return this.ism + \" \" + this.familiya;\n  }\n};\n\nconsole.log(talaba.toliqIsm());\nconsole.log(\"Talaba kursi:\", talaba.kurs);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Obyekt yaratish va metod:\nconst user = {\n  ism: 'Jasur',\n  ball: 95,\n  getInfo() { return `${this.ism}: ${this.ball} ball`; }\n};\nconst { ism, ball } = user; // Destructuring",
          "// Spread bilan nusxa olish:\nconst yangiUser = { ...user, shahar: 'Toshkent' };"
        ],
        "codeSnippet": "// Obyekt yaratish va metod:\nconst user = {\n  ism: 'Jasur',\n  ball: 95,\n  getInfo() { return `${this.ism}: ${this.ball} ball`; }\n};\nconst { ism, ball } = user; // Destructuring",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Obyektlar havolaviy (reference) turdir, haqiqiy nusxa olish uchun { ...obj } qiling.",
          "Optional Chaining (?.) xatolardan asraydi: user?.manzil?.shahar.",
          "Metodlarda 'this' shu obyektning o'zini bildiradi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Kamida 2 ta xossaga ega obyekt yarating va konsolga chiqaring.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"{\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +200 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const kitob = { nom: \"JS Darslik\", bet: 250 };\nconsole.log(kitob.nom);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-13",
    "stage": "javascript",
    "title": "13. Zamonaviy ES6+: Destructuring, Spread va Rest (...), Nullish (??)",
    "duration": "40 daqiqa",
    "xpReward": 210,
    "w3ReferenceTopic": "JavaScript ES6 Features (Destructuring, Spread, Nullish)",
    "summary": "DOM (Document Object Model) HTML sahifaning obyektlar daraxtidir. document.querySelector() va document.querySelectorAll() CSS selektorlari orqali sahifadagi istalgan elementni topish imkonini beradi.",
    "theoryDetails": [
      "const [birinchi, ikkinchi] = massiv: Massiv destrukturizatsiyasi.",
      "const yangiMassiv = [...eskiMassiv, 99]: Nusxalash va yangi qiymat qo'shish.",
      "const x = qiymat ?? 'Standart': Xavfsiz birlashtirish."
    ],
    "codeExample": "const sozlamalar = { mavzu: \"dark\", til: \"uz\", shrift: 16 };\n// Destructuring\nconst { mavzu, til } = sozlamalar;\nconsole.log(\"Tanlangan til:\", til);\n\n// Spread operatori bilan obyektni kengaytirish\nconst yangilangan = { ...sozlamalar, shrift: 18, ovoz: true };\nconsole.log(yangilangan);",
    "practiceTask": "Destructuring yoki spread (...) operatoridan foydalaning.",
    "starterCode": "const car = { model: \"Tesla\", year: 2024 };\nconst { model } = car;\nconsole.log(model);",
    "solutionKeyword": "...",
    "realWorldExamples": [
      "// Elementlarni topish:\nconst title = document.querySelector('h1');\nconst buttons = document.querySelectorAll('.btn');\nbuttons.forEach(b => console.log(b.textContent));"
    ],
    "cheatSheetTips": [
      "Doimo querySelector va querySelectorAll dan foydalaning.",
      "querySelector topolmasa 'null' qaytaradi, 'if (el)' bilan tekshiring.",
      "querySelectorAll NodeList qaytaradi, unga forEach ishlatish mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"13. Zamonaviy ES6+: Destructuring, Spread va Rest (...), Nullish (??)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "13. Zamonaviy ES6+: Destructuring, Spread va Rest (...), Nullish (??)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "DOM (Document Object Model) HTML sahifaning obyektlar daraxtidir. document.querySelector() va document.querySelectorAll() CSS selektorlari orqali sahifadagi istalgan elementni topish imkonini beradi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "const [birinchi, ikkinchi] = massiv: Massiv destrukturizatsiyasi.",
          "const yangiMassiv = [...eskiMassiv, 99]: Nusxalash va yangi qiymat qo'shish.",
          "const x = qiymat ?? 'Standart': Xavfsiz birlashtirish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const sozlamalar = { mavzu: \"dark\", til: \"uz\", shrift: 16 };\n// Destructuring\nconst { mavzu, til } = sozlamalar;\nconsole.log(\"Tanlangan til:\", til);\n\n// Spread operatori bilan obyektni kengaytirish\nconst yangilangan = { ...sozlamalar, shrift: 18, ovoz: true };\nconsole.log(yangilangan);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Elementlarni topish:\nconst title = document.querySelector('h1');\nconst buttons = document.querySelectorAll('.btn');\nbuttons.forEach(b => console.log(b.textContent));"
        ],
        "codeSnippet": "// Elementlarni topish:\nconst title = document.querySelector('h1');\nconst buttons = document.querySelectorAll('.btn');\nbuttons.forEach(b => console.log(b.textContent));",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Doimo querySelector va querySelectorAll dan foydalaning.",
          "querySelector topolmasa 'null' qaytaradi, 'if (el)' bilan tekshiring.",
          "querySelectorAll NodeList qaytaradi, unga forEach ishlatish mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: Destructuring yoki spread (...) operatoridan foydalaning.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"...\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +210 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const car = { model: \"Tesla\", year: 2024 };\nconst { model } = car;\nconsole.log(model);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-14",
    "stage": "javascript",
    "title": "14. DOM: Elementlarni Qidirish va Tanlash (querySelector)",
    "duration": "35 daqiqa",
    "xpReward": 190,
    "w3ReferenceTopic": "JavaScript HTML DOM Elements & QuerySelector",
    "summary": "DOM elementlarini o'zgartirish: textContent (matnni xavfsiz o'zgartirish), innerHTML (HTML teglari qo'shish), classList.add/remove/toggle (CSS sinflarini boshqarish) va style (to'g'ridan-to'g'ri uslub berish).",
    "theoryDetails": [
      "document.querySelector('#id'): CSS selektorlari kabi istalgan elementni topadi.",
      "document.querySelectorAll('.karta'): Bir xil klassga ega barcha elementlar to'plamini (NodeList) qaytaradi.",
      "Topilgan element o'zgaruvchida saqlanib, keyinchalik o'zgartiriladi."
    ],
    "codeExample": "// ID orqali tanlash\nconst sarlavha = document.querySelector(\"#asosiy-sarlavha\");\n\n// Class orqali barcha kartalarni tanlash\nconst kartalar = document.querySelectorAll(\".karta\");\n\nconsole.log(\"Topilgan kartalar soni:\", kartalar.length);",
    "practiceTask": "document.querySelector yordamida elementni tanlash kodini yozing.",
    "starterCode": "const btn = document.querySelector(\"#myBtn\");\nconsole.log(\"Tugma topildi\");",
    "solutionKeyword": "querySelector",
    "realWorldExamples": [
      "// Matn va sinfni o'zgartirish:\nconst box = document.querySelector('.box');\nbox.textContent = \"Yangilangan xabar!\";\nbox.classList.add('active');\nbox.classList.toggle('dark-mode');"
    ],
    "cheatSheetTips": [
      "Foydalanuvchi kiritgan matnlarga innerHTML ishlatmang (XSS xavfi!), doimo textContent ishlating.",
      "Uslublarni bittalab style.color degandan ko'ra classList.add('sinf') qilish ancha toza.",
      "classList.contains('active') sinf bor-yo'qligini tekshiradi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"14. DOM: Elementlarni Qidirish va Tanlash (querySelector)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "14. DOM: Elementlarni Qidirish va Tanlash (querySelector)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "DOM elementlarini o'zgartirish: textContent (matnni xavfsiz o'zgartirish), innerHTML (HTML teglari qo'shish), classList.add/remove/toggle (CSS sinflarini boshqarish) va style (to'g'ridan-to'g'ri uslub berish).",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "document.querySelector('#id'): CSS selektorlari kabi istalgan elementni topadi.",
          "document.querySelectorAll('.karta'): Bir xil klassga ega barcha elementlar to'plamini (NodeList) qaytaradi.",
          "Topilgan element o'zgaruvchida saqlanib, keyinchalik o'zgartiriladi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// ID orqali tanlash\nconst sarlavha = document.querySelector(\"#asosiy-sarlavha\");\n\n// Class orqali barcha kartalarni tanlash\nconst kartalar = document.querySelectorAll(\".karta\");\n\nconsole.log(\"Topilgan kartalar soni:\", kartalar.length);",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Matn va sinfni o'zgartirish:\nconst box = document.querySelector('.box');\nbox.textContent = \"Yangilangan xabar!\";\nbox.classList.add('active');\nbox.classList.toggle('dark-mode');"
        ],
        "codeSnippet": "// Matn va sinfni o'zgartirish:\nconst box = document.querySelector('.box');\nbox.textContent = \"Yangilangan xabar!\";\nbox.classList.add('active');\nbox.classList.toggle('dark-mode');",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Foydalanuvchi kiritgan matnlarga innerHTML ishlatmang (XSS xavfi!), doimo textContent ishlating.",
          "Uslublarni bittalab style.color degandan ko'ra classList.add('sinf') qilish ancha toza.",
          "classList.contains('active') sinf bor-yo'qligini tekshiradi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: document.querySelector yordamida elementni tanlash kodini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"querySelector\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +190 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const btn = document.querySelector(\"#myBtn\");\nconsole.log(\"Tugma topildi\");",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-15",
    "stage": "javascript",
    "title": "15. DOM: Kontent, Stillar va Klasslarni Boshqarish",
    "duration": "40 daqiqa",
    "xpReward": 210,
    "w3ReferenceTopic": "JavaScript HTML DOM Changing Content & Styles",
    "summary": "Hodisalar (Events) veb-sahifaning foydalanuvchi harakatlariga javob qaytarishidir: click, input, submit, keydown. addEventListener orqali hodisa tinglanadi, e.preventDefault() esa sahifa yangilanishini to'xtatadi.",
    "theoryDetails": [
      "element.textContent = 'Yangi Matn': Matnni almashtiradi.",
      "element.classList.toggle('dark-mode'): Klass bo'lsa o'chiradi, yo'q bo'lsa qo'shadi.",
      "element.setAttribute('disabled', 'true'): Atribut qo'shish."
    ],
    "codeExample": "const sarlavha = document.querySelector(\"#titul\");\nif (sarlavha) {\n  sarlavha.textContent = \"Assalomu alaykum, Talaba!\";\n  sarlavha.style.color = \"#38bdf8\";\n  sarlavha.classList.add(\"faol-sarlavha\");\n}",
    "practiceTask": "classList.toggle yoki textContent bilan ishlash kodini yozing.",
    "starterCode": "const matn = document.querySelector(\"p\");\nif (matn) matn.textContent = \"Yangilandi\";",
    "solutionKeyword": "textContent",
    "realWorldExamples": [
      "// Tugma bosilishini tinglash:\nconst btn = document.querySelector('#myBtn');\nbtn.addEventListener('click', (e) => {\n  console.log('Tugma bosildi!', e.target);\n});",
      "// Formani yangilanmasdan jo'natish:\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  console.log('Forma jo'natildi!');\n});"
    ],
    "cheatSheetTips": [
      "Forma boshqaruvida 'e.preventDefault()' yozishni unutmang.",
      "HTML dagi onclick='...' emas, JS dagi addEventListener dan foydalaning.",
      "e.key orqali qaysi klavish (Enter, Escape) bosilganini bilish mumkin."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"15. DOM: Kontent, Stillar va Klasslarni Boshqarish\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "15. DOM: Kontent, Stillar va Klasslarni Boshqarish",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Hodisalar (Events) veb-sahifaning foydalanuvchi harakatlariga javob qaytarishidir: click, input, submit, keydown. addEventListener orqali hodisa tinglanadi, e.preventDefault() esa sahifa yangilanishini to'xtatadi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "element.textContent = 'Yangi Matn': Matnni almashtiradi.",
          "element.classList.toggle('dark-mode'): Klass bo'lsa o'chiradi, yo'q bo'lsa qo'shadi.",
          "element.setAttribute('disabled', 'true'): Atribut qo'shish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const sarlavha = document.querySelector(\"#titul\");\nif (sarlavha) {\n  sarlavha.textContent = \"Assalomu alaykum, Talaba!\";\n  sarlavha.style.color = \"#38bdf8\";\n  sarlavha.classList.add(\"faol-sarlavha\");\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// Tugma bosilishini tinglash:\nconst btn = document.querySelector('#myBtn');\nbtn.addEventListener('click', (e) => {\n  console.log('Tugma bosildi!', e.target);\n});",
          "// Formani yangilanmasdan jo'natish:\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  console.log('Forma jo'natildi!');\n});"
        ],
        "codeSnippet": "// Tugma bosilishini tinglash:\nconst btn = document.querySelector('#myBtn');\nbtn.addEventListener('click', (e) => {\n  console.log('Tugma bosildi!', e.target);\n});",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "Forma boshqaruvida 'e.preventDefault()' yozishni unutmang.",
          "HTML dagi onclick='...' emas, JS dagi addEventListener dan foydalaning.",
          "e.key orqali qaysi klavish (Enter, Escape) bosilganini bilish mumkin."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: classList.toggle yoki textContent bilan ishlash kodini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"textContent\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +210 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const matn = document.querySelector(\"p\");\nif (matn) matn.textContent = \"Yangilandi\";",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-16",
    "stage": "javascript",
    "title": "16. Hodisalar (Events) va Event Listeners (click, input, submit)",
    "duration": "45 daqiqa",
    "xpReward": 230,
    "w3ReferenceTopic": "JavaScript Events & AddEventListener",
    "summary": "Asinxronlik (Asynchronous) og'ir amallarni (serverdan yuklash, kutish) fonda bajarib, sayt qotib qolishining oldini oladi. setTimeout, setInterval va Promises (.then, .catch) asosiy vositalaridir.",
    "theoryDetails": [
      "addEventListener('click', (e) => {...}): Bosish hodisasi.",
      "e.target: Aynan qaysi element bosilganini aytadi.",
      "e.preventDefault(): Standart brauzer harakatini (masalan forma yangilanishini) bekor qiladi."
    ],
    "codeExample": "const tugma = document.querySelector(\"#yuborishTugmasi\");\nconst natijaMatni = document.querySelector(\"#natija\");\n\nif (tugma) {\n  tugma.addEventListener(\"click\", () => {\n    natijaMatni.textContent = \"Muvaffaqiyatli jo'natildi! 🎉\";\n    tugma.classList.add(\"disabled\");\n  });\n}",
    "practiceTask": "addEventListener('click', ...) tinglovchisini yozing.",
    "starterCode": "const btn = document.querySelector(\"button\");\nbtn.addEventListener(\"click\", () => {\n  console.log(\"Tugma bosildi!\");\n});",
    "solutionKeyword": "addEventListener",
    "realWorldExamples": [
      "// setTimeout bilan kechiktirish:\nsetTimeout(() => {\n  console.log('1 soniyadan so'ng chiqdi');\n}, 1000);",
      "// Promise bilan ishlash:\nconst vada = new Promise((resolve, reject) => {\n  resolve('Tayyor!');\n});\nvada.then(data => console.log(data));"
    ],
    "cheatSheetTips": [
      "JS kutib o'tirmaydi, keyingi qatorga o'tadi — asinxron javobni vaqtida ushlang.",
      "Promislar oxiriga doimo .catch() qo'shing.",
      "setInterval ni to'xtatish uchun clearInterval() ishlating."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"16. Hodisalar (Events) va Event Listeners (click, input, submit)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "16. Hodisalar (Events) va Event Listeners (click, input, submit)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Asinxronlik (Asynchronous) og'ir amallarni (serverdan yuklash, kutish) fonda bajarib, sayt qotib qolishining oldini oladi. setTimeout, setInterval va Promises (.then, .catch) asosiy vositalaridir.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "addEventListener('click', (e) => {...}): Bosish hodisasi.",
          "e.target: Aynan qaysi element bosilganini aytadi.",
          "e.preventDefault(): Standart brauzer harakatini (masalan forma yangilanishini) bekor qiladi."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "const tugma = document.querySelector(\"#yuborishTugmasi\");\nconst natijaMatni = document.querySelector(\"#natija\");\n\nif (tugma) {\n  tugma.addEventListener(\"click\", () => {\n    natijaMatni.textContent = \"Muvaffaqiyatli jo'natildi! 🎉\";\n    tugma.classList.add(\"disabled\");\n  });\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// setTimeout bilan kechiktirish:\nsetTimeout(() => {\n  console.log('1 soniyadan so'ng chiqdi');\n}, 1000);",
          "// Promise bilan ishlash:\nconst vada = new Promise((resolve, reject) => {\n  resolve('Tayyor!');\n});\nvada.then(data => console.log(data));"
        ],
        "codeSnippet": "// setTimeout bilan kechiktirish:\nsetTimeout(() => {\n  console.log('1 soniyadan so'ng chiqdi');\n}, 1000);",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "JS kutib o'tirmaydi, keyingi qatorga o'tadi — asinxron javobni vaqtida ushlang.",
          "Promislar oxiriga doimo .catch() qo'shing.",
          "setInterval ni to'xtatish uchun clearInterval() ishlating."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: addEventListener('click', ...) tinglovchisini yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"addEventListener\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +230 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const btn = document.querySelector(\"button\");\nbtn.addEventListener(\"click\", () => {\n  console.log(\"Tugma bosildi!\");\n});",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-17",
    "stage": "javascript",
    "title": "17. Asinxron Dasturlash: SetTimeout, Promises va Async/Await",
    "duration": "45 daqiqa",
    "xpReward": 250,
    "w3ReferenceTopic": "JavaScript Async, Promises & Async/Await",
    "summary": "async/await (ES2017) asinxron kodni xuddi oddiy sinxron koddek toza va o'qilishi oson qiladi. Funksiya async qilinadi, kutish joyiga await yoziladi. Xatolar esa try...catch orqali ushlanadi.",
    "theoryDetails": [
      "setTimeout(() => {...}, 2000): 2 soniyadan so'ng ishga tushirish.",
      "Promise: Kelajakda bajarilishi yoki xato berishi kutilayotgan harakat.",
      "async/await: Murakkab asinxron kodni xuddi oddiy bir qatorli koddek o'qiluvchan qilish."
    ],
    "codeExample": "// Asinxron ma'lumot olish namunasi\nconst yuklaMalumot = async () => {\n  console.log(\"Yuklanmoqda...\");\n  \n  // 1 soniya kutish simulyatsiyasi\n  await new Promise(resolve => setTimeout(resolve, 1000));\n  \n  console.log(\"Ma'lumotlar muvaffaqiyatli qabul qilindi!\");\n};\n\nyuklaMalumot();",
    "practiceTask": "async va await dan foydalanib asinxron funksiya yozing.",
    "starterCode": "const delay = async () => {\n  console.log(\"Boshlandi\");\n};\ndelay();",
    "solutionKeyword": "async",
    "realWorldExamples": [
      "// async/await va try/catch:\nasync function yukla() {\n  try {\n    console.log('Yuklanmoqda...');\n    const javob = await Promise.resolve('Ma'lumotlar keldi!');\n    console.log(javob);\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}\nyukla();"
    ],
    "cheatSheetTips": [
      "await faqat async funksiya ichida ishlaydi.",
      "Har doim await li kodlarni try...catch blokiga o'rab qo'ying.",
      "Bog'liq bo'lmagan so'rovlarni Promise.all() bilan parallel yuboring."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"17. Asinxron Dasturlash: SetTimeout, Promises va Async/Await\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "17. Asinxron Dasturlash: SetTimeout, Promises va Async/Await",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "async/await (ES2017) asinxron kodni xuddi oddiy sinxron koddek toza va o'qilishi oson qiladi. Funksiya async qilinadi, kutish joyiga await yoziladi. Xatolar esa try...catch orqali ushlanadi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "setTimeout(() => {...}, 2000): 2 soniyadan so'ng ishga tushirish.",
          "Promise: Kelajakda bajarilishi yoki xato berishi kutilayotgan harakat.",
          "async/await: Murakkab asinxron kodni xuddi oddiy bir qatorli koddek o'qiluvchan qilish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// Asinxron ma'lumot olish namunasi\nconst yuklaMalumot = async () => {\n  console.log(\"Yuklanmoqda...\");\n  \n  // 1 soniya kutish simulyatsiyasi\n  await new Promise(resolve => setTimeout(resolve, 1000));\n  \n  console.log(\"Ma'lumotlar muvaffaqiyatli qabul qilindi!\");\n};\n\nyuklaMalumot();",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// async/await va try/catch:\nasync function yukla() {\n  try {\n    console.log('Yuklanmoqda...');\n    const javob = await Promise.resolve('Ma'lumotlar keldi!');\n    console.log(javob);\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}\nyukla();"
        ],
        "codeSnippet": "// async/await va try/catch:\nasync function yukla() {\n  try {\n    console.log('Yuklanmoqda...');\n    const javob = await Promise.resolve('Ma'lumotlar keldi!');\n    console.log(javob);\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}\nyukla();",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "await faqat async funksiya ichida ishlaydi.",
          "Har doim await li kodlarni try...catch blokiga o'rab qo'ying.",
          "Bog'liq bo'lmagan so'rovlarni Promise.all() bilan parallel yuboring."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: async va await dan foydalanib asinxron funksiya yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"async\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +250 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "const delay = async () => {\n  console.log(\"Boshlandi\");\n};\ndelay();",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  },
  {
    "id": "l-js-18",
    "stage": "javascript",
    "title": "18. Fetch API va LocalStorage (Doimiy Brauzer Xotirasi)",
    "duration": "50 daqiqa",
    "xpReward": 280,
    "w3ReferenceTopic": "JavaScript Fetch API & Web Storage (LocalStorage)",
    "summary": "Fetch API serverdan ma'lumot olish (GET) va yuborish (POST) vositasidir. LocalStorage esa brauzerning doimiy xotirasi bo'lib, sahifa yangilanganda ham ma'lumotlar (login, savatcha, sozlamalar) o'chib ketmasligini ta'minlaydi.",
    "theoryDetails": [
      "fetch('https://api...'): Serverga so'rov yuborish.",
      "localStorage.setItem('kalit', 'qiymat'): Xotirada saqlash.",
      "localStorage.getItem('kalit'): Xotiradan o'qib olish.",
      "JSON.stringify() va JSON.parse(): Murakkab obyektlarni matnga va matndan obyektga o'tkazish."
    ],
    "codeExample": "// LocalStorage bilan ishlash\nlocalStorage.setItem(\"foydalanuvchi_tili\", \"uz\");\nconst tanlanganTil = localStorage.getItem(\"foydalanuvchi_tili\");\nconsole.log(\"Saqlangan til:\", tanlanganTil);\n\n// API dan ma'lumot tortish\nasync function kurslarniYukla() {\n  try {\n    const res = await fetch(\"https://api.github.com/users/octocat\");\n    const data = await res.json();\n    console.log(\"Foydalanuvchi:\", data.login);\n  } catch (xatolik) {\n    console.error(\"Xatolik yuz berdi:\", xatolik);\n  }\n}",
    "practiceTask": "localStorage.setItem va localStorage.getItem yozing.",
    "starterCode": "localStorage.setItem(\"user\", \"Olimjon\");\nconst user = localStorage.getItem(\"user\");\nconsole.log(user);",
    "solutionKeyword": "localStorage",
    "realWorldExamples": [
      "// LocalStorage da saqlash va o'qish:\nconst settings = { theme: 'dark', lang: 'uz' };\nlocalStorage.setItem('settings', JSON.stringify(settings));\nconst oqilgan = JSON.parse(localStorage.getItem('settings') || '{}');",
      "// Fetch orqali API dan yuklash:\nasync function getUser() {\n  const res = await fetch('https://api.github.com/users/octocat');\n  const data = await res.json();\n  console.log(data.name);\n}"
    ],
    "cheatSheetTips": [
      "LocalStorage faqat STRING saqlaydi! Obyektlarni JSON.stringify bilan saqlang va JSON.parse bilan o'qing.",
      "fetch() 404 yoki 500 xatolarida reject bo'lmaydi, 'if (!res.ok)' deb tekshiring.",
      "LocalStorage 5-10 MB gacha ma'lumot saqlaydi va kesh tozalanmaguncha turadi."
    ],
    "deepExplanation": [
      "Ushbu mavzu zamonaviy veb-ishlab chiqish ekotizimida (JavaScript dasturlash tili) eng tayanch va hal qiluvchi bo'g'inlardan biri hisoblanadi. Veb-texnologiyalar tarixi 1990-yillardan boshlangan bo'lsa, bugungi kunga kelib har bir veb-sahifa millionlab kod qatorlari va murakkab arxitekturalardan tashkil topmoqda. Ushbu darsda ko'rib chiqilayotgan \"18. Fetch API va LocalStorage (Doimiy Brauzer Xotirasi)\" mavzusi sizga nafaqat sintaksisni yodlash, balki brauzer dvigatellari (Google Chrome ning V8 va Blink, Apple Safari ning WebKit, Mozilla Firefox ning Gecko dvigatellari) orqali kod qanday o'qilishi va interpretatsiya qilinishini anglash imkonini beradi.",
      "Brauzer HTML hujjatni yuklab olgach, dastlab uni belgilar (characters) ketma-ketligidan tokenlarga ajratadi (Tokenization). Tokenlar asosida tugunlar (Nodes) hosil bo'ladi va ushbu tugunlar xotirada shajara ko'rinishidagi Document Object Model (DOM) daraxtini shakllantiradi. Parallel ravishda barcha CSS uslublari o'qilib, CSS Object Model (CSSOM) daraxti barpo etiladi. Ushbu ikkala daraxt birlashib Render Tree (Chizish Daraxti) ni tashkil etadi. Agar siz ushbu darsdagi qoidalarni to'g'ri qo'llamasangiz, brauzer ortiqcha Reflow (qayta hisoblash) va Repaint (qayta bo'yash) jarayonlarini amalga oshirishga majbur bo'ladi, natijada veb-ilovangiz foydalanuvchi qurilmasida sekinlashishi, qotishi yoki batareyani tez tugatishiga sabab bo'ladi.",
      "Amaliy muhandislik amaliyotida har bir element, selektor yoki funksiya bejiz yaratilmagan. Ular ishlab chiqarish (production) muhitida o'zining aniq o'rniga ega. Masalan, xalqaro W3C (World Wide Web Consortium) va WHATWG standartlari veb-resurslarning xavfsizligi, platformalararo moslashuvchanligi (cross-browser compatibility) va barcha foydalanuvchilar uchun ochiqligini (web accessibility - WCAG) ta'minlashni talab qiladi. Darsimiz davomida berilgan namunaviy kodlar aynan ushbu xalqaro standartlar asosida saralangan bo'lib, har bir qatorda yozilgan buyruq zamonaviy Clean Code qoidalariga javob beradi.",
      "Professional dasturchi sifatida siz nafaqat kodni qanday yozishni, balki nima uchun boshqa muqobillaridan ko'ra aynan ushbu yondashuv tanlanganini bilishingiz shart. Masalan, eski yondashuvlardagi xatoliklar — xotira oqishi (memory leaks), global o'zgaruvchilar to'qnashuvi, kaskadlik chalkashliklari va moslashuvchan bo'lmagan qattiq pikselli o'lchamlar — aynan ushbu darsda ko'rsatilgan zamonaviy qoidalar orqali butunlay bartaraf etiladi. O'quv jarayonida berilgan har bir misolni o'z qo'lingiz bilan Try-It Studio muharririda qayta yozib ko'rish va xatoliklar ustida mustaqil ishlash sizning intellektual xotirangizda ushbu bilimlarning mustahkam o'rnashishiga xizmat qiladi.",
      "Xulosa qilib aytganda, ushbu dars materiallarini to'liq o'zlashtirish orqali siz Junior dasturchidan Middle darajasidagi professional muhandislik sari jiddiy qadam tashlaysiz. Har bir nazariy punkt, xatolar tahlili va intervyu savollari sizni ertaga real xalqaro IT kompaniyalaridagi texnik suhbatlarda va yirik jamoaviy loyihalarda yuksak ishonch bilan ishlashingiz uchun tayyorlaydi. Darsni diqqat bilan o'rganing, slaydlar taqdimotini tomosha qiling va berilgan topshiriqni mustaqil bajaring!"
    ],
    "commonMistakes": [
      {
        "badCode": "if (narx == 100) { /* ... */ }",
        "goodCode": "if (narx === 100) { /* ... */ }",
        "explanation": "Yumshoq tenglik (==) tiplarni yashirin o'zgartirib yuboradi (masalan '100' == 100 rost deb hisoblanadi). Doimo qat'iy tenglik (===) ishlatilishi shart."
      },
      {
        "badCode": "async function getData() {\n  const res = await fetch('/api/data');\n  const data = await res.json();\n}",
        "goodCode": "async function getData() {\n  try {\n    const res = await fetch('/api/data');\n    if (!res.ok) throw new Error('Tarmoq xatosi: ' + res.status);\n    return await res.json();\n  } catch (err) {\n    console.error('Xatolik:', err);\n  }\n}",
        "explanation": "fetch() so'rovlari har doim 'try...catch' blokiga o'ralishi va '!res.ok' orqali HTTP 404/500 xatolar tekshirilishi shart, aks holda dastur qulab tushadi."
      }
    ],
    "interviewQuestions": [
      {
        "question": "JavaScript Event Loop (Hodisalar Halqasi) qanday ishlaydi va Microtask vs Macrotask farqi nima?",
        "answer": "JavaScript bir oqimli (single-threaded) bo'lgani uchun barcha sinxron kod Call Stack da bajariladi. Asinxron operatsiyalar esa Web API larga topshiriladi. Promislar (then, catch, async/await) 'Microtask Queue' ga tushadi, setTimeout, setInterval kabi taymerlar esa 'Macrotask Queue' ga tushadi. Event Loop har bir sinxron qadam tugagach, avvalo barcha Microtask larni to'liq tozalaydi, undan so'ng bitta Macrotask ni olib Call Stack ga yuboradi. Shuning uchun Promise doimo setTimeout(..., 0) dan oldin bajariladi."
      },
      {
        "question": "Closures (Yopiq leksik muhit) nima va u amaliyotda qayerda ishlatiladi?",
        "answer": "Closure — bu ichki funksiyaning o'zi yaratilgan tashqi (leksik) muhitdagi o'zgaruvchilarni, hatto tashqi funksiya bajarilib tugaganidan keyin ham eslab qolish va ularga murojaat qila olish qobiliyatidir. Amaliyotda ma'lumotlarni xususiy (private variable) saqlashda, funksiyalarni sozlashda (currying) va React dagi useState hook lari ishlashida closures eng asosiy tamoyil hisoblanadi."
      }
    ],
    "syntaxBreakdown": [
      {
        "term": "O'zgaruvchi (Variable)",
        "meaning": "Xotirada ma'lumot saqlovchi nomlangan quti (const, let)."
      },
      {
        "term": "Funksiya (Function)",
        "meaning": "Qayta ishlatiladigan va 'return' orqali natija qaytaruvchi kod bloki."
      },
      {
        "term": "Hodisa (Event)",
        "meaning": "Foydalanuvchi harakati (click, input, submit) ga brauzerning munosabati."
      },
      {
        "term": "Asinxronlik (Async)",
        "meaning": "Og'ir amallarni sahifani qotirmasdan fonda bajarish tizimi (Promise, await)."
      }
    ],
    "slides": [
      {
        "id": 1,
        "badge": "1-Slayd: Kirish & Dars Maqsadi",
        "title": "18. Fetch API va LocalStorage (Doimiy Brauzer Xotirasi)",
        "subtitle": "JAVASCRIPT bosqichi: W3Schools standarti bo'yicha to'liq o'quv moduli",
        "points": [
          "Fetch API serverdan ma'lumot olish (GET) va yuborish (POST) vositasidir. LocalStorage esa brauzerning doimiy xotirasi bo'lib, sahifa yangilanganda ham ma'lumotlar (login, savatcha, sozlamalar) o'chib ketmasligini ta'minlaydi.",
          "Darsning asosiy maqsadi: Nazariya va amaliyotni birlashtirib, ishlab chiqarishga tayyor bilim olish.",
          "O'rganish rejasi: Konseptsiya tahlili -> Sintaksis qoidalari -> Namunaviy kod -> Real loyiha misollari -> Xatolar tahlili."
        ],
        "highlightNote": "Slaydlarni klaviaturadagi chap (←) va o'ng (→) strelkalari orqali qulay boshqaring."
      },
      {
        "id": 2,
        "badge": "2-Slayd: Chuqur Nazariya & Mexanizmlar",
        "title": "Arxitektura va Brauzer Ichki Mexanizmi",
        "subtitle": "Brauzer ushbu kodni qanday interpretatsiya qiladi va ekranda chizadi?",
        "points": [
          "fetch('https://api...'): Serverga so'rov yuborish.",
          "localStorage.setItem('kalit', 'qiymat'): Xotirada saqlash.",
          "localStorage.getItem('kalit'): Xotiradan o'qib olish.",
          "JSON.stringify() va JSON.parse(): Murakkab obyektlarni matnga va matndan obyektga o'tkazish."
        ],
        "highlightNote": "Professional dasturchi shunchaki kod yozmaydi, kodning kompyuter xotirasidagi harakatini tushunadi."
      },
      {
        "id": 3,
        "badge": "3-Slayd: W3Schools Standart Kod Namunasi",
        "title": "Sintaksis va Namunaviy Kod Tahlili",
        "subtitle": "Amaliy kod blokini tahlil qiling va tuzilishini o'rganing",
        "points": [
          "Quyidagi kod namunasi mavzuning eng toza va xatosiz yozilish shaklidir.",
          "Siz ushbu kodni to'g'ridan-to'g'ri 'Try-It da sinash' tugmasi bilan jonli muharrirga o'tkazishingiz mumkin."
        ],
        "codeSnippet": "// LocalStorage bilan ishlash\nlocalStorage.setItem(\"foydalanuvchi_tili\", \"uz\");\nconst tanlanganTil = localStorage.getItem(\"foydalanuvchi_tili\");\nconsole.log(\"Saqlangan til:\", tanlanganTil);\n\n// API dan ma'lumot tortish\nasync function kurslarniYukla() {\n  try {\n    const res = await fetch(\"https://api.github.com/users/octocat\");\n    const data = await res.json();\n    console.log(\"Foydalanuvchi:\", data.login);\n  } catch (xatolik) {\n    console.error(\"Xatolik yuz berdi:\", xatolik);\n  }\n}",
        "highlightNote": "Nusxa oling yoki 'Try-It da sinash' tugmasini bosib darhol brauzerda natijasini ko'ring."
      },
      {
        "id": 4,
        "badge": "4-Slayd: Real Loyihalardagi Amaliyot",
        "title": "Haqiqiy Ishlab Chiqarish Misollari (Production Code)",
        "subtitle": "Katta dasturlarda ushbu mavzu qanday qo'llaniladi?",
        "points": [
          "// LocalStorage da saqlash va o'qish:\nconst settings = { theme: 'dark', lang: 'uz' };\nlocalStorage.setItem('settings', JSON.stringify(settings));\nconst oqilgan = JSON.parse(localStorage.getItem('settings') || '{}');",
          "// Fetch orqali API dan yuklash:\nasync function getUser() {\n  const res = await fetch('https://api.github.com/users/octocat');\n  const data = await res.json();\n  console.log(data.name);\n}"
        ],
        "codeSnippet": "// LocalStorage da saqlash va o'qish:\nconst settings = { theme: 'dark', lang: 'uz' };\nlocalStorage.setItem('settings', JSON.stringify(settings));\nconst oqilgan = JSON.parse(localStorage.getItem('settings') || '{}');",
        "highlightNote": "Real loyihalarda har doim Clean Code tamoyillariga rioya qiling."
      },
      {
        "id": 5,
        "badge": "5-Slayd: Keng Tarqalgan Xatolar & Pro Maslahatlar",
        "title": "Qo'pol Xatolardan Saqlanish & Dasturchi Eslatmalari",
        "subtitle": "Yangi boshlovchilar yo'l qo'yadigan kamchiliklar va ularning yechimi",
        "points": [
          "LocalStorage faqat STRING saqlaydi! Obyektlarni JSON.stringify bilan saqlang va JSON.parse bilan o'qing.",
          "fetch() 404 yoki 500 xatolarida reject bo'lmaydi, 'if (!res.ok)' deb tekshiring.",
          "LocalStorage 5-10 MB gacha ma'lumot saqlaydi va kesh tozalanmaguncha turadi."
        ],
        "highlightNote": "Tajriba — bu yo'l qo'yilgan xatolardan to'g'ri xulosa chiqara olish demakdir."
      },
      {
        "id": 6,
        "badge": "6-Slayd: Amaliy Topshiriq & Mustaqil Kodlash",
        "title": "Bilimlarni Mustahkamlash & XP Olish",
        "subtitle": "Endi Try-It Studio muharririga o'tib, mustaqil topshiriqni bajaring!",
        "points": [
          "Amaliy topshiriq: localStorage.setItem va localStorage.getItem yozing.",
          "Muvaffaqiyatli topshirish uchun kalit qoida: \"localStorage\" ishtirok etishi shart.",
          "Darsni yakunlaganingizda sizga +280 XP va +20 Coin beriladi!"
        ],
        "codeSnippet": "localStorage.setItem(\"user\", \"Olimjon\");\nconst user = localStorage.getItem(\"user\");\nconsole.log(user);",
        "highlightNote": "Qancha ko'p kod yozsangiz, shuncha tez professional darajaga chiqasiz!"
      }
    ]
  }
];

export const ALL_W3_LESSONS: Lesson[] = [
  ...W3_HTML_LESSONS,
  ...W3_CSS_LESSONS,
  ...W3_JS_LESSONS,
];
