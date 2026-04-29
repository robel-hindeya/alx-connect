import { useCallback, useEffect, useState } from 'react'
import { createJob, deleteJob, fetchJobs, updateJob } from '../services/adminApi'
import type { Job } from '../types'

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchJobs()
      setJobs(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load jobs.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const add = useCallback(async (input: Omit<Job, 'id' | 'createdAt'>) => {
    const created = await createJob(input)
    setJobs((prev) => [created, ...prev])
    return created
  }, [])

  const edit = useCallback(async (jobId: string, input: Omit<Job, 'id' | 'createdAt'>) => {
    const updated = await updateJob(jobId, input)
    if (!updated) return null
    setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)))
    return updated
  }, [])

  const remove = useCallback(async (jobId: string) => {
    await deleteJob(jobId)
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
  }, [])

  return { jobs, loading, error, refresh, add, edit, remove }
}

