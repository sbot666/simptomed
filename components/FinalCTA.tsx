"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export default function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-700 to-ink-950" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-brand-400/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 30 }}
        whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-5 leading-tight">
          Готовы описать свои симптомы?
        </h2>
        <p className="text-lg text-ink-100/90 mb-9 max-w-2xl mx-auto">
          Получите структурированный ответ за секунды. Бесплатно, анонимно и
          без регистрации.
        </p>
        <div className="flex justify-center">
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 bg-ink-800 hover:bg-ink-750 text-ink-50 font-semibold px-8 py-3.5 rounded-xl transition shadow-2xl shadow-black/20 hover:-translate-y-0.5 duration-200"
          >
            Начать бесплатно
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        <p className="mt-7 text-sm text-ink-200/80">
          ⚠️ Simptomed — это не медицинская консультация. Точный диагноз назначает только врач.
        </p>
      </motion.div>
    </section>
  );
}
