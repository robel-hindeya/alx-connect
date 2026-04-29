import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../utils/cn'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  leftIcon?: ReactNode
}

export default function Button({
  variant = 'secondary',
  size = 'md',
  leftIcon,
  className,
  children,
  disabled,
  ...rest
}: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition ' +
    'focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20 disabled:opacity-60 disabled:cursor-not-allowed'

  const sizes =
    size === 'sm' ? 'px-3 py-2 text-sm' : 'px-3.5 py-2.5 text-sm'

  const variants: Record<Variant, string> = {
    primary:
      'bg-brand-600 text-white shadow-soft hover:bg-brand-700 border border-transparent',
    secondary:
      'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-softSm',
    danger:
      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 shadow-softSm',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent',
  }

  return (
    <button
      className={cn(base, sizes, variants[variant], className)}
      disabled={disabled}
      {...rest}
    >
      {leftIcon ? <span className="h-4 w-4">{leftIcon}</span> : null}
      {children}
    </button>
  )
}
