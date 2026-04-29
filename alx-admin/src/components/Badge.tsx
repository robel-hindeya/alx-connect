import type { Role } from '../types'
import { cn } from '../utils/cn'

export default function Badge({ role }: { role: Role }) {
  const roleLabel =
    role === 'admin' ? 'Admin' : role === 'moderator' ? 'Moderator' : 'User'

  const roleClass =
    role === 'admin'
      ? 'border-brand-200 bg-brand-50 text-brand-800'
      : role === 'moderator'
        ? 'border-amber-200 bg-amber-50 text-amber-800'
        : 'border-emerald-200 bg-emerald-50 text-emerald-800'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold',
        roleClass,
      )}
    >
      {roleLabel}
    </span>
  )
}
