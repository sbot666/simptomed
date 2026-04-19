"use client";

import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "./TiltCard";

const FEATURES = [
  {
    gradient: "from-blue-500 to-cyan-500",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Структурированный ответ",
    text: "Возможные причины, к какому врачу идти, когда нужна скорая, что сделать сейчас — в едином формате, за секунды.",
  },
  {
    gradient: "from-red-500 to-orange-500",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    title: "Находит красные флаги",
    text: "Если симптомы указывают на инфаркт, инсульт, внутреннее кровотечение — сразу предупредит и даст номера экстренных служб.",
  },
  {
    gradient: "from-emerald-500 to-teal-500",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Полностью анонимно",
    text: "Не требуем регистрации и не связываем запросы с личностью. Описания симптомов — чувствительная информация, и мы это уважаем.",
  },
  {
    gradient: "from-violet-500 to-purple-500",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Простой язык",
    text: "Никаких «гастралгий» и «цефалгий». Пишем так, чтобы было понятно без медицинского образования.",
  },
  {
    gradient: "from-amber-500 to-orange-500",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Адаптивное мышление",
    text: "ИИ тратит больше времени на сложные случаи и меньше — на простые. Это даёт точнее и быстрее, чем классические чат-боты.",
  },
  {
    gradient: "from-slate-600 to-slate-800",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: "Без диагнозов",
    text: "Мы не ставим диагноз и не назначаем лечение. Это может только врач после очного осмотра.",
  },
];

export default function Features() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
            Возможности
          </span>
          <h2 className="mt-2 text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
            Что даёт Simptomed
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Не замена врача, а помощь в навигации: куда идти, насколько
            срочно, что делать в ожидании приёма.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduced ? undefined : { opacity: 0, y: 30 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <TiltCard className="h-full">
                <div className="group h-full bg-white rounded-2xl p-7 border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity`} />
                  <div
                    className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.gradient} text-white mb-5 shadow-lg`}
                    style={{ transform: "translateZ(30px)" }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="relative font-semibold text-slate-900 mb-2 text-lg" style={{ transform: "translateZ(20px)" }}>
                    {f.title}
                  </h3>
                  <p className="relative text-slate-600 leading-relaxed text-[15px]">
                    {f.text}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
