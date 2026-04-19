"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-100 text-red-600 mb-5">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 mb-3">
          Что-то пошло не так
        </h1>
        <p className="text-slate-600 mb-8">
          Произошла непредвиденная ошибка. Попробуйте обновить страницу.
          Если проблема повторяется — напишите нам.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-2.5 rounded-xl transition"
          >
            Попробовать снова
          </button>
          <a
            href="/"
            className="bg-white hover:bg-slate-50 text-slate-900 font-medium px-6 py-2.5 rounded-xl border border-slate-200 transition"
          >
            На главную
          </a>
        </div>
      </div>
    </div>
  );
}
