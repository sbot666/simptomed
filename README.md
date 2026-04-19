# Simptomed — AI-ассистент для первичной оценки симптомов

[![CI](https://github.com/sbot666/simptomed/actions/workflows/ci.yml/badge.svg)](https://github.com/sbot666/simptomed/actions/workflows/ci.yml)
[![Deployed on Vercel](https://img.shields.io/badge/vercel-live-black?logo=vercel)](https://simptomed.vercel.app)

> **Live demo:** https://simptomed.vercel.app

Медицинский триаж-чат на базе Claude. Пользователь описывает симптомы — ассистент структурированно отвечает: возможные причины, к какому врачу идти, когда вызывать скорую, что можно сделать сейчас. При обнаружении «красных флагов» сразу маршрутизирует в 103 / 112.

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![Claude](https://img.shields.io/badge/Claude-Opus%204.6-8a4fff) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 🧠 Что внутри

### Продукт
- **Медицинский system prompt** с жёсткой структурой ответа (4 блока) и правилами красных флагов
- **Streaming-чат** с посимвольной выдачей ответа
- **Авто-алерт `🚨 СРОЧНО`** с кнопками звонка 103 / 112 при опасных симптомах
- **Автоматическая линкификация телефонов** (8-800-2000-122, 103, 112) → `tel:`
- **Примеры запросов**, история диалога в `localStorage` с TTL 24 ч, кнопки очистить/копировать/остановить

### UI / UX
- **3D-hero** на React Three Fiber: distorting-сфера + вращающиеся кольца + 80 частиц
- **Framer Motion** scroll-reveal анимации по всем секциям
- Адаптивный **Header** со scroll-эффектом, мобильное меню, индикатор активного таба через `layoutId`
- **Tilt-карточки** в `Features`
- `prefers-reduced-motion`, focus-visible, кастомный scrollbar

### Бекенд (`/api/chat`)
- **Streaming** через ReadableStream + прямой `fetch` + кастомный SSE-парсер (толерантен к нестрогим SSE-прокси)
- **In-memory rate limiting** — sliding window, 20 req/min / IP
- Валидация входа: `role ∈ {user,assistant}`, max 20 сообщений, max 8000 символов
- **Prompt caching** (`cache_control: ephemeral`) на system-prompt
- Корректный `AbortController` на стороне клиента для остановки стрима
- Все ошибки с русскими текстами и HTTP-кодами (400 / 429 / 500 / 502)

### Прочее
- **SEO:** robots.ts, sitemap.ts, OG-метаданные, favicon
- **Legal-страницы:** `/privacy`, `/terms`, `/faq`, `/about` + `/not-found`, `/error`, `/loading`
- Production-deploy на Vercel

---

## 📊 Метрики

| Маршрут | First Load JS | Размер |
|---|---|---|
| `/` (landing + 3D) | 147 kB | 10.9 kB page |
| `/chat` | 167 kB | 40.6 kB page |
| `/about`, `/faq`, `/privacy`, `/terms` | 127–134 kB | 0.7–4.2 kB |
| Shared chunks | 87.3 kB | — |

- ✅ `tsc --noEmit` — 0 ошибок
- ✅ `next lint` — 0 warnings
- ✅ `next build` — 14 маршрутов, prerender ok

---

## 🧰 Стек

| Слой | Технология |
|---|---|
| Framework | **Next.js 14.2** (App Router, RSC) |
| Язык | **TypeScript 5.7** (strict) |
| UI | **Tailwind 3.4** + кастомная brand-палитра + кастомные keyframes |
| Анимации | **Framer Motion 11** |
| 3D | **React Three Fiber 8 + drei 9 + three 0.170** |
| LLM | **Claude Opus 4.6** (Anthropic API, streaming) |
| Markdown | **react-markdown 9** с кастомными компонентами |
| Hosting | **Vercel** |

---

## 🚀 Локальный запуск

```bash
git clone https://github.com/YOUR_USERNAME/simptomed.git
cd simptomed
npm install

# настройки окружения
cp .env.example .env.local
# заполните ANTHROPIC_API_KEY в .env.local

npm run dev
# → http://localhost:3000
```

### Переменные окружения

| Имя | Обязательна | По умолчанию | Описание |
|---|---|---|---|
| `ANTHROPIC_API_KEY` | **да** | — | Ключ Anthropic API (или совместимого прокси) |
| `ANTHROPIC_BASE_URL` | нет | `https://api.anthropic.com` | Перекрыть base URL (для прокси) |
| `ANTHROPIC_MODEL` | нет | `claude-opus-4.6` | Модель |

---

## 📁 Структура

```
app/
  api/chat/route.ts       # streaming-бекенд с SSE-парсером + rate limit
  chat/                   # страница чата
  about/  faq/  privacy/  terms/
  sitemap.ts  robots.ts  icon.svg
  layout.tsx  page.tsx  error.tsx  not-found.tsx  loading.tsx

components/
  HeroScene.tsx           # 3D Canvas (R3F)
  Hero.tsx  Features.tsx  HowItWorks.tsx  ForWhom.tsx
  Stats.tsx  FAQ.tsx  FinalCTA.tsx
  Header.tsx  Footer.tsx  Logo.tsx
  ChatInterface.tsx       # streaming-чат на клиенте
  MedicalResponse.tsx     # кастомный Markdown-рендер (красные алерты, tel:)
  TiltCard.tsx  PageHero.tsx

lib/
  system-prompt.ts        # медицинский system prompt
  rate-limit.ts           # sliding-window rate limiter
```

---

## 🔒 Дисклеймер

Simptomed — **не медицинская консультация**. Сервис даёт первичную ориентацию: что может быть, к какому специалисту обратиться, когда нужна скорая помощь. Диагноз и лечение назначает только врач после очного осмотра. Система намеренно **не называет препараты и дозировки**.

При симптомах, требующих неотложной помощи (боль за грудиной, асимметрия лица, внезапная сильная головная боль, потеря сознания), звоните **103** или **112**.

---

## 📜 Лицензия

[MIT](./LICENSE)
