import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  deleteReportedContent,
  fetchPosts,
  fetchReports,
  fetchUsers,
  ignoreReport,
} from '../services/adminApi'
import type { Post, Report, User } from '../types'

export type ReportRow = Report & {
  targetLabel: string
}

export function useReports() {
  const [reports, setReports] = useState<Report[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [r, u, p] = await Promise.all([fetchReports(), fetchUsers(), fetchPosts()])
      setReports(r)
      setUsers(u)
      setPosts(p)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load reports.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const rows = useMemo(() => {
    const userMap = new Map(users.map((u) => [u.id, u]))
    const postMap = new Map(posts.map((p) => [p.id, p]))
    return reports.map((r) => {
      if (r.targetType === 'user') {
        const u = userMap.get(r.targetId)
        return {
          ...r,
          targetLabel: u ? `${u.name} (${u.email})` : `User ${r.targetId}`,
        }
      }
      const p = postMap.get(r.targetId)
      return {
        ...r,
        targetLabel: p ? `${p.user.name}: ${p.content.slice(0, 42)}…` : `Post ${r.targetId}`,
      }
    })
  }, [reports, users, posts])

  const ignore = useCallback(async (reportId: string) => {
    await ignoreReport(reportId)
    setReports((prev) => prev.filter((r) => r.id !== reportId))
  }, [])

  const deleteContent = useCallback(async (reportId: string) => {
    await deleteReportedContent(reportId)
    setReports((prev) => prev.filter((r) => r.id !== reportId))
  }, [])

  return { reports: rows, loading, error, refresh, ignore, deleteContent }
}
