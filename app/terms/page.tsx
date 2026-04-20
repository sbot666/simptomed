import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Условия использования — Simptomed",
  description:
    "Условия использования сервиса Simptomed. Главное: мы не заменяем врача и не ставим диагнозы.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Условия"
        title="Условия использования"
        subtitle="Главное, что вам нужно знать перед использованием Simptomed."
      />

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-ink-100 leading-relaxed">
        <p className="text-sm text-ink-300">
          Последнее обновление: 19 апреля 2026 г.
        </p>

        <div className="bg-red-950/40 border-l-4 border-red-400 rounded-r-xl p-5">
          <p className="font-semibold text-red-200 mb-2">Важно</p>
          <p className="text-red-200 text-[15px]">
            Simptomed — не медицинская услуга и не заменяет консультацию
            врача. Содержимое ответов носит информационный характер и не
            является медицинской рекомендацией. Точный диагноз и лечение
            назначает только врач после очного осмотра.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            1. Что такое Simptomed
          </h2>
          <p>
            Simptomed — информационный онлайн-сервис, использующий языковую
            модель ИИ для первичной ориентации в симптомах. Сервис
            предоставляется «как есть» и не является медицинской услугой в
            понимании ФЗ-323 «Об основах охраны здоровья граждан».
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            2. Границы ответственности
          </h2>
          <ul className="space-y-2 pl-5 list-disc marker:text-brand-500">
            <li>
              Ответы генерируются ИИ и могут содержать ошибки, неточности или
              упущения. Пользователь принимает решения самостоятельно.
            </li>
            <li>
              Сервис не несёт ответственности за решения, принятые на основе
              его ответов, включая отказ или задержку обращения к врачу.
            </li>
            <li>
              При симптомах, представляющих угрозу жизни, немедленно вызывайте
              скорую помощь (103 или 112), а не консультируйтесь с ИИ.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            3. Разрешённое использование
          </h2>
          <p>Разрешено использовать сервис для:</p>
          <ul className="space-y-2 pl-5 list-disc marker:text-emerald-500 mt-2">
            <li>Понимания возможных причин собственных симптомов.</li>
            <li>Выбора специалиста для записи на приём.</li>
            <li>Оценки необходимости срочной помощи.</li>
            <li>Ознакомления с общей медицинской информацией.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            4. Запрещённое использование
          </h2>
          <ul className="space-y-2 pl-5 list-disc marker:text-red-400">
            <li>Выдавать ответы ИИ за медицинскую консультацию врача.</li>
            <li>Использовать сервис для принятия решений о препаратах или дозировках.</li>
            <li>Автоматизированные массовые запросы (скрейпинг, ddos и т.п.).</li>
            <li>Передавать через сервис персональные данные третьих лиц без их согласия.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            5. Стоимость
          </h2>
          <p>
            Сервис полностью бесплатный. Никаких платных тарифов, подписок или
            скрытых платежей нет. Чтобы защитить сервис от злоупотреблений,
            действует технический rate limit на количество запросов с одного IP.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            6. Изменение условий
          </h2>
          <p>
            Мы можем обновлять эти условия. Существенные изменения будут
            опубликованы на этой странице с обновлением даты «Последнее
            обновление». Продолжая использовать сервис после изменений, вы
            принимаете новые условия.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">7. Контакты</h2>
          <p>
            Вопросы по условиям:{" "}
            <a href="mailto:hello@simptomed.ru" className="text-brand-600 hover:underline">
              hello@simptomed.ru
            </a>
          </p>
        </section>
      </article>
    </>
  );
}
