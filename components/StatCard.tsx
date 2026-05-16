interface StatCardProps {
  label: string
  value: React.ReactNode
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
  <div
    className="
      relative
      overflow-hidden
      rounded-2xl
      p-6
      backdrop-blur
      transition

      bg-white dark:bg-zinc-900/70
      border border-slate-300 dark:border-zinc-800
      hover:border-slate-400 dark:hover:border-zinc-600
    "
  >
    <p className="text-xs uppercase tracking-wide mb-2 text-black dark:text-zinc-500">
      {label}
    </p>

    <div className="text-2xl font-semibold text-black dark:text-white">
      {value}
    </div>

    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-zinc-800 opacity-10 dark:opacity-20 pointer-events-none" />
  </div>
)
}


