import { useEffect, useState } from 'react'
import Card from '../components/Card'
import StatCard from '../components/StatCard'
import { fetchStats } from '../services/adminApi'
import type { Stats } from '../types'

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    collaborationPosts: 0,
    featuredPosts: 0,
    featuredProjects: 0,
  })

  useEffect(() => {
    let cancelled = false
    fetchStats().then((next) => {
      if (!cancelled) setStats(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Quick overview of platform activity and featured content.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard label="Total Users" value={stats.totalUsers} />
        <StatCard label="Active Users" value={stats.activeUsers} />
        <StatCard label="Total Posts" value={stats.totalPosts} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatCard label="Collaboration Posts" value={stats.collaborationPosts} />
        <StatCard label="Featured Posts" value={stats.featuredPosts} />
        <StatCard label="Featured Projects" value={stats.featuredProjects} />
      </div>

      <Card title="Growth (Dummy Chart)">
        <div className="h-56 rounded-2xl border border-dashed border-slate-300 bg-gradient-to-br from-brand-50 via-white to-emerald-50 p-6">
          <div className="text-sm font-bold text-slate-700">
            Dummy growth chart placeholder
          </div>
          <div className="mt-3 h-36 w-full rounded-xl bg-white shadow-softSm" />
          <div className="mt-3 text-xs text-slate-500">
            Use the Analytics page for more details.
          </div>
        </div>
      </Card>
    </div>
  )
}
