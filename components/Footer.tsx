import Link from "next/link";
import Logo from "./Logo";

const NAV_PRODUCT = [
  { href: "/", label: "Главная" },
  { href: "/chat", label: "Чат" },
];

const NAV_INFO = [
  { href: "/about", label: "О сервисе" },
  { href: "/faq", label: "FAQ" },
];

const NAV_LEGAL = [
  { href: "/privacy", label: "Конфиденциальность" },
  { href: "/terms", label: "Условия" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Logo size={32} />
            <span className="font-semibold text-white">Simptomed</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-[13px]">
            Первичная оценка симптомов с ИИ. Не ставим диагнозы —
            помогаем понять, к кому идти и насколько срочно.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-[13px] uppercase tracking-wider">
            Продукт
          </h4>
          <ul className="space-y-2.5">
            {NAV_PRODUCT.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-400 hover:text-white transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-[13px] uppercase tracking-wider">
            Информация
          </h4>
          <ul className="space-y-2.5">
            {NAV_INFO.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-400 hover:text-white transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {NAV_LEGAL.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-slate-400 hover:text-white transition"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4 text-[13px] uppercase tracking-wider">
            Экстренные службы
          </h4>
          <ul className="space-y-2.5 text-slate-400">
            <li>
              Скорая:{" "}
              <a href="tel:103" className="font-semibold text-white hover:underline">
                103
              </a>
              {" / "}
              <a href="tel:112" className="font-semibold text-white hover:underline">
                112
              </a>
            </li>
            <li>
              Телефон доверия:
              <br />
              <a
                href="tel:88002000122"
                className="font-semibold text-white hover:underline"
              >
                8-800-2000-122
              </a>
              <span className="block text-xs text-slate-500 mt-0.5">
                круглосуточно, бесплатно
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Simptomed. Все права защищены.
          </p>
          <p className="text-center sm:text-right">
            ⚠️ Не является медицинской консультацией. Точный диагноз и
            лечение назначает только врач.
          </p>
        </div>
      </div>
    </footer>
  );
}
