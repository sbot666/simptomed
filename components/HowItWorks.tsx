"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Опишите симптомы",
    text: "Напишите в чате, что вас беспокоит: что болит, как давно, какие ещё признаки. Чем подробнее — тем точнее ответ.",
  },
  {
    num: "02",
    title: "ИИ анализирует",
    text: "Claude Opus 4.7 с адаптивным мышлением взвешивает варианты, сверяет с красными флагами и формирует структурированный ответ.",
  },
  {
    num: "03",
    title: "Получите ориентир",
    text: "Возможные причины, к какому врачу идти, когда нужна скорая, что можно сделать прямо сейчас. За секунды — и анонимно.",
  },
];

export default function HowItWorks() {
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="py-24 bg-ink-850 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
            Процесс
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-ink-50 tracking-tight">
            Как это работает
          </h2>
          <p className="mt-4 text-ink-200 leading-relaxed">
            Три простых шага от симптома до понятного следующего действия.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          <div
            aria-hidden
            className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={reduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative bg-ink-800 rounded-2xl p-7 border border-ink-700 shadow-sm"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-semibold text-lg mb-5 shadow-lg shadow-brand-500/20">
                {step.num}
              </div>
              <h3 className="font-semibold text-ink-50 text-lg mb-2">
                {step.title}
              </h3>
              <p className="text-ink-200 text-[15px] leading-relaxed">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
