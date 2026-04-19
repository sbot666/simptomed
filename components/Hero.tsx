"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-400/30 to-brand-600/30 blur-3xl animate-pulse" />
    </div>
  ),
});

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-brand-50/40 to-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] bg-brand-300/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={reduced ? undefined : container}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "show"}
          className="text-center lg:text-left"
        >
          <motion.span
            variants={reduced ? undefined : fadeUp}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
            </span>
            На базе Claude Opus 4.7
          </motion.span>

          <motion.h1
            variants={reduced ? undefined : fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 leading-[1.05] tracking-tight mb-6"
          >
            Опишите симптомы —{" "}
            <span className="bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500 bg-clip-text text-transparent">
              получите ясный ответ
            </span>
          </motion.h1>

          <motion.p
            variants={reduced ? undefined : fadeUp}
            className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Simptomed помогает понять, что могут означать ваши симптомы, к
            какому врачу идти и когда нужна срочная помощь. Без диагнозов
            и назначений.
          </motion.p>

          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <Link
              href="/chat"
              className="group relative overflow-hidden bg-slate-900 hover:bg-slate-800 text-white font-medium px-7 py-3.5 rounded-xl transition shadow-lg shadow-slate-900/10 hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 duration-200"
            >
              <span className="relative z-10 flex items-center gap-2">
                Открыть чат
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-brand-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="#how-it-works"
              className="bg-white hover:bg-slate-50 text-slate-900 font-medium px-7 py-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition shadow-sm hover:shadow"
            >
              Как это работает
            </Link>
          </motion.div>

          <motion.div
            variants={reduced ? undefined : fadeUp}
            className="mt-8 flex items-center gap-6 text-sm text-slate-500 justify-center lg:justify-start"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Бесплатно
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Анонимно
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Без регистрации
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.85 }}
          animate={reduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative h-[380px] md:h-[460px] lg:h-[520px] w-full"
        >
          <HeroScene />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
