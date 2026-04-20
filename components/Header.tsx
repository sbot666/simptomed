"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";

const NAV = [
  { href: "/", label: "Главная" },
  { href: "/chat", label: "Чат" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "О сервисе" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink-800/80 backdrop-blur-xl border-b border-ink-700 shadow-sm"
          : "bg-ink-800/60 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Logo size={32} />
          <span className="font-semibold text-ink-50 tracking-tight">
            Simptomed
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-1.5 rounded-lg transition ${
                  active
                    ? "text-ink-50"
                    : "text-ink-200 hover:text-ink-50 hover:bg-ink-750"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute inset-0 bg-ink-750 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/chat"
            className="hidden sm:inline-flex items-center gap-1.5 bg-ink-950 hover:bg-ink-900 text-white font-medium text-sm px-4 py-2 rounded-lg transition shadow-sm hover:shadow-md"
          >
            Начать
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-lg hover:bg-ink-750 transition"
          >
            <svg className="w-5 h-5 text-ink-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-ink-700 bg-ink-800 shadow-lg"
          >
            <nav className="px-4 py-3 flex flex-col">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2.5 rounded-lg text-sm ${
                      active
                        ? "bg-ink-750 text-ink-50 font-medium"
                        : "text-ink-100 hover:bg-ink-850"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/chat"
                className="mt-2 text-center bg-ink-950 hover:bg-ink-900 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition"
              >
                Начать консультацию
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
