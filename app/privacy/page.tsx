import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Политика конфиденциальности — Simptomed",
  description:
    "Как мы обрабатываем данные пользователей Simptomed. Мы не собираем персональные данные и не сохраняем диалоги на сервере.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Политика"
        title="Конфиденциальность"
        subtitle="Коротко: мы не требуем регистрации, не сохраняем диалоги на сервере и не связываем запросы с вашей личностью."
      />

      <article className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-ink-100 leading-relaxed">
        <p className="text-sm text-ink-300">
          Последнее обновление: 19 апреля 2026 г.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            1. Какие данные мы обрабатываем
          </h2>
          <ul className="space-y-2 pl-5 list-disc marker:text-brand-500">
            <li>
              <strong>Содержимое сообщений в чате.</strong> Передаётся нашему
              провайдеру модели (Anthropic) для генерации ответа и не сохраняется
              на серверах Simptomed после завершения сессии.
            </li>
            <li>
              <strong>Технические данные:</strong> IP-адрес, тип устройства,
              браузер — используются только для защиты от злоупотреблений
              (rate limiting) и анонимной агрегированной аналитики.
            </li>
            <li>
              <strong>Локальное хранилище (localStorage) в вашем браузере</strong>
              — для того чтобы диалог не пропал при обновлении страницы. Эти
              данные остаются на вашем устройстве и не передаются нам.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            2. Что мы не делаем
          </h2>
          <ul className="space-y-2 pl-5 list-disc marker:text-brand-500">
            <li>Не собираем имя, email, телефон — регистрация не требуется вовсе.</li>
            <li>Не продаём и не передаём ваши данные третьим лицам для маркетинга.</li>
            <li>Не используем содержимое ваших сообщений для обучения моделей.</li>
            <li>Не применяем cookies для трекинга между сайтами.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            3. Передача данных провайдеру модели
          </h2>
          <p>
            Для генерации ответа мы отправляем содержимое ваших сообщений в
            Anthropic (разработчик Claude). Anthropic не использует пользовательские
            данные для обучения моделей по умолчанию. Подробности — в политике
            конфиденциальности Anthropic.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            4. Срок хранения
          </h2>
          <p>
            История диалога существует только в вашем браузере (localStorage) и
            хранится максимум 24 часа. Вы можете очистить её в любой момент
            кнопкой «Очистить» в интерфейсе чата.
          </p>
          <p className="mt-3">
            Логи запросов к нашему API хранятся не более 30 дней и содержат
            только технические метаданные, без содержимого сообщений.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            5. Ваши права
          </h2>
          <p>
            В соответствии с Федеральным законом № 152-ФЗ «О персональных
            данных» вы имеете право запросить информацию о своих данных, их
            изменение или удаление. Поскольку мы не собираем персональные данные
            и не требуем регистрации, в большинстве случаев удалять нечего.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink-50 mb-3">
            6. Контакты
          </h2>
          <p>
            По всем вопросам:{" "}
            <a
              href="mailto:privacy@simptomed.ru"
              className="text-brand-600 hover:underline"
            >
              privacy@simptomed.ru
            </a>
          </p>
        </section>

        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-5 text-sm text-amber-200">
          ⚠️ Simptomed — информационный сервис, а не медицинская организация.
          Содержимое ответов не является медицинской консультацией и не может
          заменить очный приём у врача.
        </div>
      </article>
    </>
  );
}
