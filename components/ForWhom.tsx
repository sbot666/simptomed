"use client";

import { motion, useReducedMotion } from "framer-motion";

const GROUPS = [
  {
    emoji: "👤",
    title: "Для себя",
    text: "Когда что-то беспокоит, но непонятно — к какому врачу записаться и стоит ли вообще ехать в больницу.",
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Для родителей",
    text: "Быстро оценить — это обычная простуда или повод ехать в стационар. Без паники и без медицинского словаря.",
  },
  {
    emoji: "👵",
    title: "Для близких в возрасте",
    text: "Помочь пожилым родственникам понять, что значит внезапный симптом, и не пропустить опасные признаки.",
  },
  {
    emoji: "🏥",
    title: "Для клиник",
    text: "API-интеграция: первичная сортировка пациентов, разгрузка колл-центра, маршрутизация к нужному специалисту.",
  },
];

export default function ForWhom() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 bg-ink-800 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
            Для кого
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-ink-50 tracking-tight">
            Кому это полезно
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GROUPS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={reduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={reduced ? undefined : { y: -4 }}
              className="bg-ink-850 hover:bg-ink-800 rounded-2xl p-6 border border-ink-700 hover:border-ink-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-4">{g.emoji}</div>
              <h3 className="font-semibold text-ink-50 text-lg mb-2">
                {g.title}
              </h3>
              <p className="text-ink-200 text-sm leading-relaxed">
                {g.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
