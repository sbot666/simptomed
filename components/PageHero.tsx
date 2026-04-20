"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
};

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-850 via-brand-50/40 to-ink-800 pt-16 pb-14">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-brand-200/30 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-3xl mx-auto px-6 text-center"
      >
        <span className="text-sm font-medium text-brand-600 uppercase tracking-wider">
          {eyebrow}
        </span>
        <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-ink-50 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-ink-200 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}
