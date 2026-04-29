import { useCallback, useEffect, useState } from 'react'
import { fetchAnalytics } from '../services/adminApi'
import type { Analytics } from '../types'

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAnalytics()
      setAnalytics(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load analytics.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { analytics, loading, error, refresh }
}

