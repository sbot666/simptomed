import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <div className="text-[140px] font-bold leading-none bg-gradient-to-r from-brand-500 to-cyan-500 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-2xl font-semibold text-ink-50 mt-4 mb-3">
          Страница не найдена
        </h1>
        <p className="text-ink-200 mb-8">
          Кажется, такой страницы нет. Возможно, ссылка устарела или вы
          ошиблись в адресе.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-ink-950 hover:bg-ink-900 text-white font-medium px-6 py-2.5 rounded-xl transition"
          >
            На главную
          </Link>
          <Link
            href="/chat"
            className="bg-ink-800 hover:bg-ink-850 text-ink-50 font-medium px-6 py-2.5 rounded-xl border border-ink-700 transition"
          >
            Открыть чат
          </Link>
        </div>
      </div>
    </div>
  );
}
