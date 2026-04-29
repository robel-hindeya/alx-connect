import { useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProfile, logout } from '../services/auth'
import Button from './Button'
import Badge from './Badge'
import { IconLogout, IconMenu } from './icons'

function usePageMeta(pathname: string) {
  return useMemo(() => {
    if (pathname === '/' || pathname === '/dashboard') {
      return { title: 'Dashboard', subtitle: 'Overview & quick stats' }
    }
    if (pathname.startsWith('/analytics')) {
      return { title: 'Analytics', subtitle: 'Growth, activity, and usage trends' }
    }
    if (pathname.startsWith('/users')) {
      return { title: 'Users', subtitle: 'Manage user accounts & roles' }
    }
    if (pathname.startsWith('/posts')) {
      return { title: 'Posts', subtitle: 'Moderate content & activity' }
    }
    if (pathname.startsWith('/projects')) {
      return {
        title: 'Projects',
        subtitle: 'Approve/reject collaboration posts and feature projects',
      }
    }
    if (pathname.startsWith('/reports')) {
      return { title: 'Reports', subtitle: 'Handle reported users and posts' }
    }
    if (pathname.startsWith('/jobs')) {
      return { title: 'Job Board', subtitle: 'Add, edit, and manage job listings' }
    }
    return { title: 'ALX Admin', subtitle: 'Admin panel' }
  }, [pathname])
}

export default function Navbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const profile = getProfile()
  const meta = usePageMeta(location.pathname)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="lg:hidden">
            <Button
              aria-label="Open sidebar"
              onClick={onOpenSidebar}
              variant="secondary"
              size="sm"
              leftIcon={<IconMenu />}
            >
              Menu
            </Button>
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold text-slate-900">
              {meta.title}
            </div>
            <div className="truncate text-xs font-medium text-slate-500">
              {meta.subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-softSm sm:flex">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-brand-300 to-brand-700" />
            <div className="leading-tight">
              <div className="text-xs font-extrabold text-slate-900">
                {profile?.name ?? 'Admin'}
              </div>
              <div className="text-[11px] text-slate-500">
                {profile?.email ?? 'admin@alx.com'}
              </div>
            </div>
            {profile?.role ? <Badge role={profile.role} /> : null}
          </div>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={<IconLogout />}
            onClick={() => {
              logout()
              navigate('/login')
            }}
            aria-label="Log out"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
