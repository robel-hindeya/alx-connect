import api from './api.js'
import { demoStore } from '../data/demoStore'
import type {
  Analytics,
  CollaborationPost,
  Job,
  Post,
  Report,
  Stats,
  User,
} from '../types'

function unwrapList<T>(data: unknown): T[] | null {
  if (!data) return null
  if (Array.isArray(data)) return data as T[]
  if (typeof data === 'object') {
    const maybe = data as Record<string, unknown>
    const firstArray = Object.values(maybe).find((v) => Array.isArray(v))
    if (Array.isArray(firstArray)) return firstArray as T[]
  }
  return null
}

// Stats / Analytics
export async function fetchStats(): Promise<Stats> {
  try {
    const res = await api.get('/admin/stats')
    const stats = (res.data?.stats ?? res.data) as Partial<Stats>
    if (
      stats?.totalUsers != null &&
      stats?.activeUsers != null &&
      stats?.totalPosts != null
    ) {
      return stats as Stats
    }
    return demoStore.getStats()
  } catch {
    return demoStore.getStats()
  }
}

export async function fetchAnalytics(): Promise<Analytics> {
  try {
    const res = await api.get('/admin/analytics')
    const analytics = (res.data?.analytics ?? res.data) as Analytics | undefined
    if (analytics?.stats) return analytics
    return demoStore.getAnalytics()
  } catch {
    return demoStore.getAnalytics()
  }
}

// Users
export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await api.get('/admin/users')
    return unwrapList<User>(res.data) ?? demoStore.getUsers()
  } catch {
    return demoStore.getUsers()
  }
}

export async function verifyUserSkill(userId: string, skillName: string) {
  try {
    const res = await api.post(`/admin/users/${userId}/verify-skill`, {
      skill: skillName,
    })
    return (res.data?.user ?? res.data ?? null) as User | null
  } catch {
    return demoStore.verifySkill(userId, skillName)
  }
}

export async function banUser(userId: string) {
  try {
    const res = await api.post(`/admin/users/${userId}/ban`)
    return (res.data?.user ?? res.data ?? null) as User | null
  } catch {
    return demoStore.banUser(userId)
  }
}

// Posts
export async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await api.get('/admin/posts')
    return unwrapList<Post>(res.data) ?? demoStore.getPosts()
  } catch {
    return demoStore.getPosts()
  }
}

export async function deletePost(postId: string) {
  try {
    await api.delete(`/admin/posts/${postId}`)
  } catch {
    demoStore.deletePost(postId)
  }
}

export async function toggleFeaturedPost(postId: string) {
  try {
    const res = await api.post(`/admin/posts/${postId}/toggle-featured`)
    return (res.data?.post ?? res.data ?? null) as Post | null
  } catch {
    return demoStore.toggleFeaturedPost(postId)
  }
}

// Collaboration posts (projects)
export async function fetchCollaborationPosts(): Promise<CollaborationPost[]> {
  try {
    const res = await api.get('/admin/collaboration-posts')
    return unwrapList<CollaborationPost>(res.data) ?? demoStore.getCollaborationPosts()
  } catch {
    return demoStore.getCollaborationPosts()
  }
}

export async function approveCollaborationPost(postId: string) {
  try {
    const res = await api.post(`/admin/collaboration-posts/${postId}/approve`)
    return (res.data?.post ?? res.data ?? null) as CollaborationPost | null
  } catch {
    return demoStore.setCollaborationStatus(postId, 'approved')
  }
}

export async function rejectCollaborationPost(postId: string) {
  try {
    const res = await api.post(`/admin/collaboration-posts/${postId}/reject`)
    return (res.data?.post ?? res.data ?? null) as CollaborationPost | null
  } catch {
    return demoStore.setCollaborationStatus(postId, 'rejected')
  }
}

export async function toggleFeaturedProject(postId: string) {
  try {
    const res = await api.post(
      `/admin/collaboration-posts/${postId}/toggle-featured`,
    )
    return (res.data?.post ?? res.data ?? null) as CollaborationPost | null
  } catch {
    return demoStore.toggleFeaturedProject(postId)
  }
}

// Reports
export async function fetchReports(): Promise<Report[]> {
  try {
    const res = await api.get('/admin/reports')
    return unwrapList<Report>(res.data) ?? demoStore.getReports()
  } catch {
    return demoStore.getReports()
  }
}

export async function ignoreReport(reportId: string) {
  try {
    await api.post(`/admin/reports/${reportId}/ignore`)
  } catch {
    demoStore.ignoreReport(reportId)
  }
}

export async function deleteReportedContent(reportId: string) {
  try {
    await api.post(`/admin/reports/${reportId}/delete-content`)
  } catch {
    demoStore.deleteReportedContent(reportId)
  }
}

// Jobs
export async function fetchJobs(): Promise<Job[]> {
  try {
    const res = await api.get('/admin/jobs')
    return unwrapList<Job>(res.data) ?? demoStore.getJobs()
  } catch {
    return demoStore.getJobs()
  }
}

export async function createJob(input: Omit<Job, 'id' | 'createdAt'>) {
  try {
    const res = await api.post('/admin/jobs', input)
    return (res.data?.job ?? res.data) as Job
  } catch {
    return demoStore.createJob(input)
  }
}

export async function updateJob(jobId: string, input: Omit<Job, 'id' | 'createdAt'>) {
  try {
    const res = await api.put(`/admin/jobs/${jobId}`, input)
    return (res.data?.job ?? res.data) as Job
  } catch {
    return demoStore.updateJob(jobId, input)
  }
}

export async function deleteJob(jobId: string) {
  try {
    await api.delete(`/admin/jobs/${jobId}`)
  } catch {
    demoStore.deleteJob(jobId)
  }
}

