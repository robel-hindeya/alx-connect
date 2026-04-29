import { useCallback, useEffect, useState } from 'react'
import { deletePost, fetchPosts, toggleFeaturedPost } from '../services/adminApi'
import type { Post } from '../types'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPosts()
      setPosts(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load posts.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const remove = useCallback(async (postId: string) => {
    await deletePost(postId)
    setPosts((prev) => prev.filter((p) => p.id !== postId))
  }, [])

  const toggleFeatured = useCallback(async (postId: string) => {
    const updated = await toggleFeaturedPost(postId)
    if (!updated) return null
    setPosts((prev) => prev.map((p) => (p.id === postId ? updated : p)))
    return updated
  }, [])

  return { posts, loading, error, refresh, remove, toggleFeatured }
}

