import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { useAnalytics } from '../hooks/useAnalytics'

export default function Analytics() {
  const { analytics, loading, error } = useAnalytics()

  const stats = analytics?.stats
  const growth = analytics?.growth ?? []
  const max = Math.max(1, ...growth.map((g) => g.value))

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Total users, active users, total posts, and growth (dummy chart).
          </p>
        </div>
        {error ? <div className="text-sm font-semibold text-red-600">{error}</div> : null}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard label="Total Users" value={stats?.totalUsers ?? (loading ? '—' : 0)} />
        <StatCard label="Active Users" value={stats?.activeUsers ?? (loading ? '—' : 0)} />
        <StatCard label="Total Posts" value={stats?.totalPosts ?? (loading ? '—' : 0)} />
      </div>

      <Card title="Growth (Dummy)">
        <div className="space-y-4">
          <div className="text-sm text-slate-600">
            A simple dummy growth chart (no chart library).
          </div>

          <div className="grid grid-cols-6 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            {growth.map((p) => (
              <div key={p.label} className="flex flex-col items-center gap-2">
                <div className="relative h-28 w-full overflow-hidden rounded-xl bg-white shadow-softSm">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-xl bg-gradient-to-t from-brand-700 to-brand-400"
                    style={{ height: `${Math.round((p.value / max) * 100)}%` }}
                    aria-label={`${p.label}: ${p.value}`}
                  />
                </div>
                <div className="text-xs font-bold text-slate-600">{p.label}</div>
              </div>
            ))}
          </div>

          <div className="text-xs text-slate-500">
            Replace this with real analytics once the API is ready.
          </div>
        </div>
      </Card>
    </div>
  )
}

