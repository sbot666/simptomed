import PageHero from "@/components/PageHero";
import Link from "next/link";

export const metadata = {
  title: "О сервисе — Simptomed",
  description:
    "Кто мы, зачем сделали Simptomed и почему это — не замена врача, а помощь в навигации.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="О сервисе"
        title={
          <>
            ИИ, который{" "}
            <span className="bg-gradient-to-r from-brand-600 to-cyan-500 bg-clip-text text-transparent">
              не заменяет врача
            </span>
          </>
        }
        subtitle="Мы делаем инструмент, который помогает сориентироваться в симптомах — и ничего больше."
      />

      <article className="max-w-3xl mx-auto px-6 py-14 space-y-10 text-ink-100 leading-relaxed">
        <section>
          <h2 className="text-2xl font-semibold text-ink-50 mb-3">
            Почему это вообще нужно
          </h2>
          <p>
            Большинство людей при первых симптомах лезут в интернет. В лучшем
            случае — на медицинский форум 2012 года, в худшем — к «ясновидящей
            из ВКонтакте». И то, и другое заканчивается тревогой, ошибочными
            выводами и иногда — поздним обращением к врачу.
          </p>
          <p className="mt-3">
            Мы не можем заменить врача и не пытаемся. Но можем помочь с первым
            шагом: понять, насколько всё серьёзно и к какому специалисту идти.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-ink-50 mb-3">
            Как устроен ответ
          </h2>
          <p>
            Каждый ответ Simptomed — это структура из четырёх частей:
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
              <span>
                <strong className="text-ink-50">Возможные причины</strong> — 3–5 состояний от самых распространённых к редким.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
              <span>
                <strong className="text-ink-50">К какому врачу обратиться</strong> — 1–3 специалиста с объяснением.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
              <span>
                <strong className="text-ink-50">Когда нужна срочная помощь</strong> — симптомы, при которых нужна скорая.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
              <span>
                <strong className="text-ink-50">Что можно сделать сейчас</strong> — безопасные действия до визита.
              </span>
            </li>
          </ul>
          <p className="mt-4">
            Если в описании есть красные флаги (боль за грудиной, нарушение
            речи, асимметрия лица и т.п.), ответ начнётся с блока «🚨 СРОЧНО»
            и номеров экстренных служб — 103 и 112.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-ink-50 mb-3">
            Чего Simptomed никогда не сделает
          </h2>
          <ul className="space-y-2">
            <li className="flex gap-3">
              <span className="text-red-400 mt-0.5">✕</span>
              <span>Не поставит диагноз.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400 mt-0.5">✕</span>
              <span>Не назначит препарат и не подскажет дозировку — даже очевидную.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400 mt-0.5">✕</span>
              <span>Не скажет «это точно рак» или «это точно не рак» — только врач после обследования.</span>
            </li>
            <li className="flex gap-3">
              <span className="text-red-400 mt-0.5">✕</span>
              <span>Не заменит очный приём. Если сомневаетесь — идите к врачу.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-ink-50 mb-3">
            На чём всё работает
          </h2>
          <p>
            Simptomed построен на{" "}
            <strong className="text-ink-50">Claude Opus 4.7</strong> — одной
            из самых сильных моделей ИИ на сегодня. Мы используем адаптивное
            мышление: модель сама решает, сколько времени ей нужно подумать над
            конкретным случаем. Простые вопросы обрабатываются мгновенно,
            сложные — глубоко, но без дополнительных запросов к пользователю.
          </p>
          <p className="mt-3">
            Система промпт настроен консервативно и проверяется редактором с
            медицинским опытом на красные флаги, формулировки и дисклеймеры.
          </p>
        </section>

        <div className="bg-gradient-to-br from-brand-50 to-cyan-50 rounded-2xl p-8 border border-brand-200/50 text-center">
          <h3 className="text-xl font-semibold text-ink-50 mb-2">
            Попробуйте сами
          </h3>
          <p className="text-ink-200 mb-5">
            Бесплатно, без регистрации, анонимно.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 bg-ink-950 hover:bg-ink-900 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg"
          >
            Открыть чат
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </article>
    </>
  );
}
