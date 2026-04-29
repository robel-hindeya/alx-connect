import type { ReactNode } from 'react'

export default function Card({
  title,
  action,
  children,
}: {
  title?: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="card">
      {title || action ? (
        <header className="flex items-center justify-between gap-4 px-5 pt-5">
          <div className="text-sm font-bold text-slate-900">{title}</div>
          {action}
        </header>
      ) : null}
      <div className={title || action ? 'px-5 pb-5 pt-4' : 'p-5'}>{children}</div>
    </section>
  )
}
