# DevMaster Academy — Yagona Markaziy Ma'lumotlar Bazasi (Render PostgreSQL + Bulutli Zaxira) Rejasi

Barcha kompyuterlar, telefonlar va foydalanuvchi hisoblari uchun alohida brauzer xotirasi (`localStorage`) o'rniga **bitta yagona markaziy ma'lumotlar bazasini** (Render PostgreSQL asosiy + Bulutli Firestore/Server zaxira) joriy etish hamda barcha ma'lumotlarni (o'quvchilar, ustozlar, testlar, chatlar, sertifikatlar va do'kon xaridlarini) yagona bazada birlashtirish.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Tasdiqlangan Qarorlar (1-bosqich savol-javoblari asosida):**
> - **Asosiy va Zaxira Ma'lumotlar Bazasi**: Render platformasi uchun `DATABASE_URL` orqali ulanadigan **PostgreSQL** asosiy baza sifatida ishlaydi hamda `DATABASE_URL` ulanmagan yoki uzilgan holatlarda avtomatik ravishda **Bulutli Firestore / Server markaziy ombori** zaxira sifatida barcha kompyuterlarni bitta bazaga ulaydi.
> - **Brauzer `localStorage` cheklovi**: Umumiy ma'lumotlar (`o'quvchilar`, `ustozlar`, `testlar`, `natijalar`, `sertifikatlar`, `do'kon xaridlari`, `guruh chatlari`) endi hech qachon har bir kompyuterning o'z `localStorage` xotirasida alohida saqlanmaydi va eski brauzer keshidan serverga ko'chirilmaydi — hamma qurilmalar faqat yagona server bazasidan o'qiydi va yozadi.
> - **To'liq Yagona Baza Qamrovi**: O'quvchilar va ustozlardan tashqari, rasmiy sertifikatlar, do'kondan sotib olingan mahsulotlar/unvonlar hamda barcha jadvallar bitta markaziy bazada saqlanadi.

---

## 1. Overview & Core Concept

- **Nima qiladi**: Sayt qaysi kompyuter yoki telefondan ochilishidan qat'i nazar, barcha foydalanuvchilar (Admin, Ustozlar va O'quvchilar) aynan bitta markaziy bazadagi ma'lumotlarni ko'radi. Bir kompyuterda ro'yxatdan o'tgan o'quvchi yoki yaratilgan ustoz shu zahoti boshqa barcha kompyuterlarda ham ko'rinadi.
- **Kimlar uchun**: Platforma egasi (Admin), ustozlar va barcha o'quvchilar — Render.com hamda bulutli muhitda real vaqtda ishlash uchun.
- **Asosiy qiymat**: Har bir qurilmada alohida baza bo'lib qolish muammosini butunlay bartaraf etadi va Render.com ga joylanganda avtomatik ravishda PostgreSQL bazasini yaratib ulaydi.

---

## 2. User Experience & Visual Design

- **Foydalanuvchi Oqimi (UX Flow)**:
  1. **Ilova yuklanishi**: Sayt ochilganda brauzer hech qanday eski `localStorage` ma'lumotini o'qimaydi; bevosita `/api/store` orqali yagona markaziy bazadan joriy holatni tortib oladi.
  2. **Sinxronlash indikatori (`SyncBanner`)**: Ekran yuqorisida yagona bazaga ulanganlik holati (`Postgres` yoki `Bulutli Markaziy Baza`) ko'rsatiladi; xatolik bo'lsa bir tugma bilan qayta sinxronlash imkoniyati beriladi.
  3. **Admin Baza Diagnostikasi**: Admin panelidagi *"Baza & Jadval Boshqaruvi"* bo'limida joriy faol baza turi (`PostgreSQL` / `Cloud Firestore`), ulangan jadvallar soni va Render uchun tayyor ulanish holati jonli ko'rsatiladi.
- **Vizual Uslub ("Aurora Sunset" Gamified Design)**:
  - *Ranglar*: Chuqur tungi binafsha fon (`#0a0912`), marjon (`#ff6b86`), apelsin (`#ff8a3d`), yalpiz (`#3ee6c4`), laym (`#b6f03c`) va oltin (`#ffd23f`).
  - *Tipografiya*: Sarlavhalar uchun `Fredoka`, asosiy matn uchun `Plus Jakarta Sans`, baza holati va ID ko'rsatkichlari uchun `JetBrains Mono` (`tabular-nums`).
  - *Interaktiv Qayta Aloqa*: Har bir amal (talaba qo'shish, o'chirish, do'kondan xarid qilish, test topshirish) darhol markaziy bazaga yoziladi va barcha ochiq qurilmalarda avtomatik yangilanadi.

---

## 3. Key Product Decisions & Trade-Offs

- **1-Qaror: Render PostgreSQL + Bulutli Firestore Gibrid Markaziy Ombori**
  - *Tanlangan yechim*: Serverda birinchi navbatda `DATABASE_URL` orqali **PostgreSQL** (`kv_store` va relyatsion jadvallar) ishlatiladi. Agar `DATABASE_URL` hali ulanmagan bo'lsa, server avtomatik ravishda bulutli Firestore bazasiga (yoki server diskiga) ulanadi. Render Blueprint konfiguratsiyasida esa bepul PostgreSQL bazasi avtomatik yaratiladigan qilib belgilanadi.
  - *Sabab*: Render bepul tarifida server qayta ishga tushganda lokal fayllar o'chib ketadi. PostgreSQL va bulutli baza esa hech qachon o'chmaydi va barcha qurilmalar uchun yagona manba bo'lib xizmat qiladi.
- **2-Qaror: Brauzer `localStorage` dan ma'lumot ko'chirishni butunlay o'chirish**
  - *Tanlangan yechim*: Mijoz (brauzer) tomonidagi sinxronlash modulidan eski `localStorage` ma'lumotlarini o'qish va serverga yuborish mantiqi olib tashlanadi. Faqatgina joriy kirgan foydalanuvchi sessiyasi (`AUTH_USER`) brauzerda qoladi, qolgan barcha jadvallar 100% server xotirasi orqali boshqariladi.
  - *Sabab*: Oldin bitta kompyuterning `localStorage` xotirasida qolib ketgan eski o'quvchi yoki ustozlar yangi bazani qayta ifloslantirar yoki har bir kompyuterda har xil ro'yxat ko'rsatar edi.
- **3-Qaror: Sertifikatlar va Do'kon xaridlarini ham yagona bazaga o'tkazish**
  - *Tanlangan yechim*: O'quvchining olgan sertifikatlari, tangaga sotib olgan buyumlari, taqib olgan ramkasi va unvoni bevosita markaziy bazadagi umumiy kalitlar va o'quvchi profili ichida saqlanadi.
  - *Sabab*: O'quvchi maktab kompyuteridan yoki uyidagi telefondan kirganda ham uning sertifikatlari va sotib olgan narsalari yo'qolmasdan bir xil turadi.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Tizim Arxitekturasi va Ma'lumotlar Oqimi

```
┌─────────────────────────────────────────────────────────────────────────┐
│                BARCHA KOMPYUTERLAR VA TELEFONLAR (SPA)                  │
│  ┌───────────────┐   ┌────────────────────┐   ┌──────────────────────┐  │
│  │  Admin Panel  │   │ Ustoz & AI Kabinet │   │ O'quvchi & Do'kon    │  │
│  └───────┬───────┘   └─────────┬──────────┘   └──────────┬───────────┘  │
│          └─────────────────────┼─────────────────────────┘              │
│                                ▼                                        │
│         ┌─────────────────────────────────────────────────────┐         │
│         │  Yagona Sinxronlash Qatlami (Faqat Server Kesh,     │         │
│         │  localStorage umumiy ma'lumotlar uchun O'CHIRILGAN) │         │
│         └──────────────────────┬──────────────────────────────┘         │
└────────────────────────────────┼────────────────────────────────────────┘
                                 │  HTTPS REST (/api/store, /api/db/health)
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      EXPRESS BACKEND SERVER                             │
│         ┌─────────────────────────────────────────────────────┐         │
│         │           Markaziy Ombor Dvigateli                  │         │
│         │  1. Asosiy: Render PostgreSQL (DATABASE_URL)        │         │
│         │  2. Bulutli Zaxira: Cloud Firestore REST/SDK        │         │
│         │  3. Mahalliy Zaxira: Server JSON fayli              │         │
│         └───────────┬─────────────────────────────┬───────────┘         │
└─────────────────────┼─────────────────────────────┼─────────────────────┘
                      ▼                             ▼
        ┌───────────────────────────┐ ┌───────────────────────────┐
        │   PostgreSQL (Render DB)  │ │  Cloud Firestore Bazasi   │
        │  - kv_store (JSONB + ver) │ │  (Avtomatik bulut zaxira) │
        │  - users, staff, projects │ │  - shared_kv kolleksiyasi │
        └───────────────────────────┘ └───────────────────────────┘
```

### Yagona Bazada Saqlanadigan Umumiy Ma'lumotlar (`SHARED_KEYS`)

1. `devmaster_teachers_v3` — Barcha ustozlar, guruh nomlari va biriktirilgan talabalar ID ro'yxati.
2. `devmaster_students_v2` — Barcha o'quvchilar, XP, tangalar, dars progressi, o'yin rekordlari, do'kondan olingan buyumlar (`ownedShopIds`, `equippedFrame`, `equippedBadge`) va sertifikatlar.
3. `devmaster_certificates_v2` — Barcha rasmiy berilgan PDF sertifikatlar reestri.
4. `devmaster_generated_tests_v2` — Ustoz, Admin yoki AI Yordamchi yaratgan bir martalik Test ID imtihonlari.
5. `devmaster_test_submissions_v2` — Topshirilgan test natijalari va o'tish foizlari.
6. `devmaster_expel_requests_v2` — Ustozlardan kelgan chetlatish so'rovlari.
7. `devmaster_notifications_v2` — Ustoz va tizim bildirishnomalari.
8. `devmaster_group_messages_v2` — Guruh chatidagi barcha xabarlar va AI Yordamchi javoblari.

### Komponentlar va Holat Boshqaruvi

- **Render Blueprint Avtomatlashtirish**: Render platformasiga joylanganda `devmaster-db` nomli PostgreSQL bazasi avtomatik ochiladi va uning `connectionString` manzili veb-serverga `DATABASE_URL` sifatida avtomatik ulanadi.
- **Markaziy Sinxronlash (`initRemote` / `pull` / `setShared`)**:
  - Ilova ishga tushganda umumiy kalitlar bo'yicha `localStorage` ichidagi eski yozuvlar tozalanadi (`localStorage.removeItem`).
  - Har bir o'zgarish optimistik versiyalash (`version`) va 3-tomonlama birlashtirish (`merge`) orqali yagona bazaga yoziladi, har 4 soniyada barcha ochiq kompyuterlar yangilanishlarni tortib oladi.
  - Admin panelidan *"Bazani Tozalash (0 qilish)"* bosilganda `/api/store/reset` endpointi orqali markaziy bazadagi barcha yozuvlar 0 qilinadi va barcha qurilmalarda bir vaqtda tozalanadi.
