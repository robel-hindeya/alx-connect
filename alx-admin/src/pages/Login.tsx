import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { isAdminAuthenticated, login, logout } from '../services/auth'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const { from, forbidden } = useMemo(() => {
    const state = location.state as { from?: string; forbidden?: boolean } | null
    return { from: state?.from || '/', forbidden: Boolean(state?.forbidden) }
  }, [location.state])

  const [email, setEmail] = useState('admin@alx.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAdminAuthenticated()) navigate(from, { replace: true })
  }, [from, navigate])

  useEffect(() => {
    if (forbidden) {
      logout()
      setError('Admin access only. Please sign in with an admin account.')
    }
  }, [forbidden])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <div className="w-full max-w-md">
        <div className="card p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-300 to-brand-700 shadow-soft" />
            <div>
              <div className="text-lg font-extrabold tracking-tight text-slate-900">
                ALX Admin
              </div>
              <div className="text-sm text-slate-500">
                Sign in to manage users, posts, projects, and reports.
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          <form
            className="mt-5 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError(null)
              setLoading(true)
              try {
                await login(email, password)
                navigate(from, { replace: true })
              } catch (err) {
                const message = err instanceof Error ? err.message : 'Login failed.'
                setError(message)
              } finally {
                setLoading(false)
              }
            }}
          >
            <div>
              <label className="text-xs font-extrabold text-slate-600">Email</label>
              <input
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                placeholder="admin@alx.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="text-xs font-extrabold text-slate-600">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <Button variant="primary" type="submit" disabled={loading} className="w-full">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              <div className="font-extrabold text-slate-700">Demo mode</div>
              <div className="mt-1 leading-relaxed">
                Works without a backend. Use an email containing <code>admin</code> (e.g.{' '}
                <code>admin@alx.com</code>).
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

