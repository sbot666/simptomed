export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-20">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10">
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 animate-ping opacity-40" />
          <span className="absolute inset-1 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500" />
        </div>
        <span className="text-ink-200 text-sm">Загрузка…</span>
      </div>
    </div>
  );
}
