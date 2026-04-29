import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils/cn'

export default function Modal({
  open,
  title,
  children,
  footer,
  onClose,
  widthClassName = 'max-w-lg',
}: {
  open: boolean
  title: string
  children: ReactNode
  footer?: ReactNode
  onClose: () => void
  widthClassName?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <section
          className={cn(
            'w-full rounded-2xl border border-slate-200 bg-white shadow-soft',
            widthClassName,
          )}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <header className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
            <div className="text-sm font-extrabold text-slate-900">{title}</div>
            <button
              type="button"
              className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-100"
              onClick={onClose}
            >
              Close
            </button>
          </header>
          <div className="px-5 py-4">{children}</div>
          {footer ? (
            <footer className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4">
              {footer}
            </footer>
          ) : null}
        </section>
      </div>
    </div>,
    document.body,
  )
}

