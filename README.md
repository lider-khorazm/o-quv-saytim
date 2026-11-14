# DevMaster Academy

> **Til / Language / Язык:** [O‘zbekcha](#o‘zbekcha) · [English](#english) · [Русский](#русский)

## O‘zbekcha

### Loyiha haqida

**DevMaster Academy** — veb-dasturlashni bosqichma-bosqich, amaliy mashqlar va o‘yinlashtirilgan ta’lim orqali o‘rgatishga mo‘ljallangan o‘quv platformasi. O‘quvchilar darslarni o‘rganadi, kod yozib sinaydi, bilimini testlar bilan tekshiradi va o‘z rivojlanishini kuzatadi. Ustozlar va administratorlar uchun o‘quv jarayonini boshqarish vositalari ham mavjud.

Ushbu repozitoriyda alohida ommaviy sayt manzili ko‘rsatilmagan. Quyidagi tavsif repozitoriydagi ilova va konfiguratsiya fayllariga asoslangan.

### Imkoniyatlar

- **Bosqichli o‘quv dasturi:** HTML, CSS, JavaScript, TypeScript, React, Backend, ma’lumotlar bazasi va Full-Stack mavzulari. Darslar yo‘l xaritasi yoki kartalar ko‘rinishida ko‘riladi; qidiruv va bosqich filtrlari mavjud.
- **Dars va amaliyot:** tushuntirishlar, kod namunalari, brauzer ichidagi sinov muhiti, viktorinalar va dars bajarilishini belgilash.
- **Imtihonlar va sertifikatlar:** bosqich imtihonlari, Test ID orqali test topshirish va yakuniy imtihon. Muvaffaqiyatli natijalarda PDF sertifikatlar taqdim etilishi mumkin.
- **O‘quvchi profili va rivojlanish:** profil sozlamalari, avatar, bosqich, XP, tangalar, dars natijalari va yutuqlar.
- **O‘yinlashtirish:** reyting va podium, o‘quvchilar yoki AI bilan PvP bellashuvlari, streak, mukofotlar, do‘kon hamda kod yozishga oid mini-o‘yinlar.
- **Muloqot va yordam:** guruh chati, bildirishnomalar, ustoz bilan aloqa, CMDbek AI yordamchisi va matnni ovozga aylantirish imkoniyatlari.
- **Portfolio va fikr-mulohaza:** o‘quvchi loyihalarini ko‘rsatish hamda xato yoki taklif yuborish bo‘limlari.
- **Rollar:** o‘quvchi, ustoz va administrator interfeyslari; ustozlar o‘quvchilarni kuzatishi, test tuzishi va xabar yuborishi mumkin.

### Texnologiyalar

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS.
- **Backend:** Node.js, Express, TypeScript.
- **Ma’lumotlar:** PostgreSQL (Drizzle ORM) va ilova sozlamasiga qarab markaziy server ombori; Firestore integratsiyasi ham mavjud.
- **AI va audio:** server orqali sozlanadigan Gemini/Groq xizmatlari va matndan nutq yaratish imkoniyatlari.
- **Boshqa:** Firebase, Recharts, Three.js va jsPDF.

### Ishga tushirish

Talablar: Node.js va npm. Repozitoriy ildizida bog‘liqliklarni o‘rnating va ishlab chiqish serverini ishga tushiring:

```bash
npm install
npm run dev
```

Ishlab chiqarish buildini yaratish uchun:

```bash
npm run build
```

Serverni ishga tushirish va kerakli sozlamalar uchun `.env.example` faylini ko‘rib chiqing. Maxfiy qiymatlarni faqat server muhitidagi environment variable’lar orqali kiriting; `.env` faylini yoki maxfiy qiymatlarni GitHub’ga yubormang. PostgreSQL ulanishi berilmasa, ilova muqobil server omboridan foydalanishi mumkin. AI funksiyalari tegishli server sozlamalarisiz ishlamasligi mumkin.

### Maxfiylik va xavfsizlik

- README, kod, commit, issue yoki skrinshotlarda **o‘quvchilarning shaxsiy ma’lumotlari, parollar, tokenlar, API kalitlari yoki boshqa kirish ma’lumotlarini** e’lon qilmang.
- Haqiqiy o‘quvchi ma’lumotlarini faqat zarur bo‘lganda kiriting va ularga kirishni cheklang. Ommaviy demo uchun uydirma ma’lumotlardan foydalaning.
- AI chatga yuborilgan matn sozlangan tashqi AI xizmatiga uzatilishi mumkin. Chatga parol, aloqa ma’lumoti yoki boshqa maxfiy ma’lumotlarni kiritmang.
- Ma’lumotlar bazasi va fayl omboridagi ma’lumotlar hosting va server sozlamalariga bog‘liq. Zaxira nusxalari, kirish nazorati va ma’lumotlarni saqlash muddatini alohida boshqaring.
- **Maxfiylikni mutlaq yoki kafolatlangan deb bo‘lmaydi.** Haqiqiy foydalanuvchilar bilan ishlab chiqarishga chiqarishdan oldin autentifikatsiya, ruxsatlar, ma’lumotlarni saqlash va API’larni xavfsizlik bo‘yicha tekshirtiring. Ushbu README xavfsizlik sertifikati yoki kafolati hisoblanmaydi.

### Litsenziya

Repozitoriyda litsenziya fayli ko‘rsatilmagan. Foydalanish yoki tarqatishdan oldin loyiha egasi bilan litsenziya shartlarini aniqlashtiring.

---

## English

### About

**DevMaster Academy** is a learning platform for studying web development step by step through practical exercises and gamified learning. Learners can follow lessons, experiment with code, take quizzes, and track their progress. The application also includes tools for teachers and administrators to manage the learning process.

No public deployment URL is specified in this repository. This description is based on the application source and configuration files in the repository.

### Features

- **Structured curriculum:** HTML, CSS, JavaScript, TypeScript, React, Backend, databases, and Full-Stack topics. Browse lessons as a learning path or cards, with search and stage filters.
- **Lessons and practice:** explanations, code examples, an in-browser practice area, quizzes, and lesson completion tracking.
- **Exams and certificates:** stage exams, Test ID-based assessments, and a final exam. PDF certificates may be available for qualifying results.
- **Learner profiles and progress:** profile settings, avatars, stages, XP, coins, lesson results, and achievements.
- **Gamification:** rankings and podiums, PvP challenges against learners or AI, streaks, rewards, a shop, and coding mini-games.
- **Communication and assistance:** group chat, notifications, teacher communication, the CMDbek AI assistant, and text-to-speech features.
- **Portfolio and feedback:** showcase learner projects and submit bug reports or suggestions.
- **Roles:** learner, teacher, and administrator interfaces. Teachers can monitor learners, create tests, and send messages.

### Technology

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS.
- **Backend:** Node.js, Express, TypeScript.
- **Data:** PostgreSQL (Drizzle ORM) and a central server-side store depending on application configuration; Firestore integration is also present.
- **AI and audio:** server-configured Gemini/Groq services and text-to-speech capabilities.
- **Other:** Firebase, Recharts, Three.js, and jsPDF.

### Run locally

Requirements: Node.js and npm. From the repository root, install dependencies and start the development server:

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

See `.env.example` for server configuration. Provide sensitive values only through server-side environment variables; never commit `.env` files or secrets to GitHub. If no PostgreSQL connection is configured, the application may use its alternative server-side store. AI features may require their corresponding server-side configuration.

### Privacy and security

- Do **not** publish learners’ personal information, passwords, tokens, API keys, or other access credentials in the README, source code, commits, issues, or screenshots.
- Collect real learner data only when necessary and restrict access to it. Use fictional data in public demos.
- Text submitted to AI chat may be sent to the configured external AI provider. Do not enter passwords, contact details, or other sensitive information into chat.
- Data in the database and file store depends on hosting and server configuration. Manage backups, access controls, and retention separately.
- **Privacy cannot be described as absolute or guaranteed.** Before using this application with real users in production, have authentication, authorization, data storage, and API access reviewed for security. This README is not a security certification or guarantee.

### License

No license file is specified in the repository. Confirm licensing terms with the project owner before using or distributing the project.

---

## Русский

### О проекте

**DevMaster Academy** — учебная платформа для последовательного изучения веб-разработки с практическими заданиями и игровыми элементами. Учащиеся проходят уроки, пробуют писать код, выполняют тесты и отслеживают свой прогресс. В приложении также есть инструменты для преподавателей и администраторов.

В репозитории не указан общедоступный адрес развёрнутого сайта. Это описание составлено на основе исходного кода приложения и файлов конфигурации.

### Возможности

- **Структурированная программа:** HTML, CSS, JavaScript, TypeScript, React, Backend, базы данных и Full-Stack. Уроки можно просматривать в виде учебного маршрута или карточек; доступны поиск и фильтрация по этапам.
- **Уроки и практика:** объяснения, примеры кода, встроенная среда для практики, викторины и учёт завершённых уроков.
- **Экзамены и сертификаты:** экзамены по этапам, тестирование по Test ID и итоговый экзамен. При выполнении условий могут быть доступны PDF-сертификаты.
- **Профили и прогресс учащихся:** настройки профиля, аватары, этапы обучения, XP, монеты, результаты уроков и достижения.
- **Игровые механики:** рейтинги и пьедестал, PvP-соревнования с учащимися или ИИ, серии занятий, награды, магазин и мини-игры по программированию.
- **Общение и помощь:** групповой чат, уведомления, связь с преподавателем, AI-помощник CMDbek и функции преобразования текста в речь.
- **Портфолио и обратная связь:** витрина проектов учащихся, отправка сообщений об ошибках и предложений.
- **Роли:** интерфейсы учащегося, преподавателя и администратора. Преподаватели могут следить за прогрессом, создавать тесты и отправлять сообщения.

### Технологии

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS.
- **Backend:** Node.js, Express, TypeScript.
- **Данные:** PostgreSQL (Drizzle ORM) и центральное серверное хранилище в зависимости от конфигурации приложения; также присутствует интеграция с Firestore.
- **ИИ и аудио:** настраиваемые на сервере сервисы Gemini/Groq и функции синтеза речи.
- **Прочее:** Firebase, Recharts, Three.js и jsPDF.

### Локальный запуск

Требования: Node.js и npm. В корне репозитория установите зависимости и запустите сервер разработки:

```bash
npm install
npm run dev
```

Для создания production-сборки выполните:

```bash
npm run build
```

Настройки сервера описаны в `.env.example`. Передавайте секретные значения только через переменные окружения сервера; не добавляйте файлы `.env` и секреты в GitHub. Если подключение к PostgreSQL не настроено, приложение может использовать альтернативное серверное хранилище. Для работы функций ИИ могут потребоваться соответствующие серверные настройки.

### Конфиденциальность и безопасность

- Не публикуйте персональные данные учащихся, пароли, токены, API-ключи и другие учётные данные в README, исходном коде, коммитах, задачах или снимках экрана.
- Собирайте реальные данные учащихся только при необходимости и ограничивайте доступ к ним. Для публичной демонстрации используйте вымышленные данные.
- Текст, отправленный в чат с ИИ, может передаваться настроенному внешнему AI-провайдеру. Не вводите в чат пароли, контактные данные и другую конфиденциальную информацию.
- Хранение данных в базе и файловом хранилище зависит от настроек сервера и хостинга. Отдельно настройте резервное копирование, контроль доступа и сроки хранения.
- **Абсолютную или гарантированную конфиденциальность обещать нельзя.** Перед использованием приложения в production с реальными пользователями проверьте безопасность аутентификации, разграничения прав, хранения данных и доступа к API. Этот README не является сертификатом или гарантией безопасности.

### Лицензия

В репозитории не указана лицензия. Перед использованием или распространением проекта уточните условия у владельца проекта.
