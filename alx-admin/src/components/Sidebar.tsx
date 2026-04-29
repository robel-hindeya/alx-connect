import { NavLink } from 'react-router-dom'
import {
  IconBriefcase,
  IconChart,
  IconFlag,
  IconGrid,
  IconHandshake,
  IconPosts,
  IconUsers,
  IconX,
} from './icons'
import Button from './Button'
import { cn } from '../utils/cn'

const navItems = [
  { to: '/', label: 'Dashboard', icon: <IconGrid /> },
  { to: '/analytics', label: 'Analytics', icon: <IconChart /> },
  { to: '/users', label: 'Users', icon: <IconUsers /> },
  { to: '/posts', label: 'Posts', icon: <IconPosts /> },
  { to: '/projects', label: 'Projects', icon: <IconHandshake /> },
  { to: '/reports', label: 'Reports', icon: <IconFlag /> },
  { to: '/jobs', label: 'Job Board', icon: <IconBriefcase /> },
]

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <>
      {open ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-[280px] border-r border-slate-800/40 bg-slate-950 text-slate-200 shadow-soft lg:sticky lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-soft" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold text-white">ALX Admin</div>
              <div className="text-xs text-slate-400">Social network control</div>
            </div>
          </div>
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<IconX />}
              aria-label="Close sidebar"
              onClick={onClose}
              className="text-slate-300 hover:bg-white/10"
            >
              Close
            </Button>
          </div>
        </div>

        <div className="px-4 pb-2 pt-2 text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
          Manage
        </div>

        <nav className="flex flex-col gap-1 px-3" aria-label="Admin navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/10',
                  isActive
                    ? 'bg-brand-500/15 ring-1 ring-inset ring-brand-400/40'
                    : '',
                )
              }
            >
              <span className="h-5 w-5 text-slate-400">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-slate-800/60 px-4 py-4 text-xs text-slate-400">
          <div>
            Tip: set <code className="rounded bg-white/10 px-1">VITE_API_BASE_URL</code>{' '}
            to connect your API.
          </div>
          <div className="mt-2">Demo mode uses in-memory dummy data.</div>
        </div>
      </aside>
    </>
  )
}
