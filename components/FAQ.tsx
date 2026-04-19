"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const FAQS = [
  {
    q: "Это заменяет визит к врачу?",
    a: "Нет. Simptomed — не замена врача. Мы даём первичную ориентацию: что может быть, к какому специалисту идти, когда нужна скорая. Диагноз и лечение назначает только врач после очного осмотра.",
  },
  {
    q: "Насколько безопасно доверять ИИ с медициной?",
    a: "Мы используем Claude Opus 4.7 — одну из сильнейших моделей на сегодня, с адаптивным мышлением. Система намеренно настроена консервативно: не ставит диагнозы, не рекомендует препараты, а опасные симптомы (красные флаги) сразу маршрутизирует в скорую.",
  },
  {
    q: "Что с моими данными? Кто их видит?",
    a: "Мы не требуем регистрации, не собираем персональные данные и не связываем запросы с личностью. Диалоги не сохраняются на сервере. Подробности — в политике конфиденциальности.",
  },
  {
    q: "Что такое «красные флаги»?",
    a: "Это симптомы, при которых нельзя ждать: боль за грудиной с одышкой, асимметрия лица, внезапная сильная головная боль, потеря сознания и другие. Если они есть в описании — ИИ в первую очередь порекомендует вызвать скорую (103 / 112).",
  },
  {
    q: "Почему нет названий лекарств в ответах?",
    a: "Назначение препаратов — это медицинское решение, которое должен принимать врач после осмотра. Ошибка здесь опасна. Поэтому система намеренно не пишет ни названий, ни дозировок — даже очевидных.",
  },
  {
    q: "Сколько это стоит?",
    a: "Ничего. Сервис полностью бесплатный — без регистрации, без ограничений, без платных тарифов. Единственное ограничение — rate limit, чтобы защитить сервис от массовых запросов.",
  },
  {
    q: "А если я напишу что-то слишком общее?",
    a: "Ассистент задаст уточняющие вопросы: как давно, где именно, что усиливает или ослабляет, какие ещё симптомы. Это единственный способ дать осмысленный ответ.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
            Вопросы
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Часто задаваемые вопросы
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.q}
                initial={reduced ? undefined : { opacity: 0, y: 12 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
                >
                  <span className="font-medium text-slate-900 pr-4">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
