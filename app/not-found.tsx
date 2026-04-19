import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <div className="text-[140px] font-bold leading-none bg-gradient-to-r from-brand-500 to-cyan-500 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 mt-4 mb-3">
          Страница не найдена
        </h1>
        <p className="text-slate-600 mb-8">
          Кажется, такой страницы нет. Возможно, ссылка устарела или вы
          ошиблись в адресе.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-xl transition"
          >
            На главную
          </Link>
          <Link
            href="/chat"
            className="bg-white hover:bg-slate-50 text-slate-900 font-medium px-6 py-2.5 rounded-xl border border-slate-200 transition"
          >
            Открыть чат
          </Link>
        </div>
      </div>
    </div>
  );
}
