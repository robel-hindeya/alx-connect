import { useCallback, useEffect, useState } from 'react'
import { banUser, fetchUsers, verifyUserSkill } from '../services/adminApi'
import type { User } from '../types'

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load users.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const verifySkill = useCallback(async (userId: string, skillName: string) => {
    const updated = await verifyUserSkill(userId, skillName)
    setUsers((prev) => prev.map((u) => (u.id === userId && updated ? updated : u)))
    return updated
  }, [])

  const ban = useCallback(async (userId: string) => {
    const updated = await banUser(userId)
    setUsers((prev) => prev.map((u) => (u.id === userId && updated ? updated : u)))
    return updated
  }, [])

  return { users, loading, error, refresh, verifySkill, ban }
}

