import ChatInterface from "@/components/ChatInterface";

export const metadata = {
  title: "Чат с ассистентом — Simptomed",
  description:
    "Опишите симптомы и получите структурированный ответ за секунды. Бесплатно и анонимно.",
};

export default function ChatPage() {
  return (
    <section className="flex-1 flex flex-col relative">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-850 to-ink-800 pointer-events-none" aria-hidden />

      <div className="relative flex-1 flex flex-col max-w-3xl w-full mx-auto px-4 py-6 md:py-10">
        <div className="mb-5 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-ink-50 tracking-tight">
            Опишите свои симптомы
          </h1>
          <p className="text-sm md:text-base text-ink-200 mt-1.5 max-w-2xl">
            Чем подробнее описание — тем точнее ответ. Укажите: что беспокоит,
            как давно, где именно, что усиливает или ослабляет.
          </p>
        </div>

        <ChatInterface />

        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-900 leading-relaxed">
          <strong>При угрозе жизни</strong> — не тратьте время на чат. Звоните{" "}
          <a href="tel:103" className="underline font-semibold">103</a> или{" "}
          <a href="tel:112" className="underline font-semibold">112</a>.
        </div>
      </div>
    </section>
  );
}
