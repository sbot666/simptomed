"use client";

import { motion, useReducedMotion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: "< 3", suffix: "сек", label: "среднее время ответа" },
  { value: "24", suffix: "/7", label: "доступность" },
  { value: "0", suffix: "₽", label: "всегда бесплатно" },
  { value: "100", suffix: "%", label: "анонимно" },
];

function Counter({ target, suffix }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numeric = parseFloat(target.replace(/[^\d.]/g, ""));
  const isNumeric = !isNaN(numeric) && target === String(numeric);
  const [display, setDisplay] = useState(isNumeric ? "0" : target);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !isNumeric || reduced) {
      if (inView) setDisplay(target);
      return;
    }
    const controls = animate(0, numeric, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, numeric, isNumeric, reduced, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      <span className="text-brand-500">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const reduced = useReducedMotion();

  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? undefined : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
