import { useCallback, useEffect, useState } from 'react'
import {
  approveCollaborationPost,
  fetchCollaborationPosts,
  rejectCollaborationPost,
  toggleFeaturedProject,
} from '../services/adminApi'
import type { CollaborationPost } from '../types'

export function useProjects() {
  const [projects, setProjects] = useState<CollaborationPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchCollaborationPosts()
      setProjects(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load projects.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const approve = useCallback(async (id: string) => {
    const updated = await approveCollaborationPost(id)
    if (!updated) return null
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
    return updated
  }, [])

  const reject = useCallback(async (id: string) => {
    const updated = await rejectCollaborationPost(id)
    if (!updated) return null
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
    return updated
  }, [])

  const toggleFeatured = useCallback(async (id: string) => {
    const updated = await toggleFeaturedProject(id)
    if (!updated) return null
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)))
    return updated
  }, [])

  return { projects, loading, error, refresh, approve, reject, toggleFeatured }
}

