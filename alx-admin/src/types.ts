export type Role = 'admin' | 'moderator' | 'user'

export type Skill = {
  name: string
  verified: boolean
}

export type User = {
  id: string
  name: string
  email: string
  role: Role
  track: string
  skills: Skill[]
  isActive: boolean
  isBanned: boolean
}

export type Post = {
  id: string
  content: string
  user: Pick<User, 'id' | 'name' | 'email' | 'track'>
  createdAt: string
  featured: boolean
}

export type CollaborationPost = {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  author: Pick<User, 'id' | 'name' | 'email' | 'track'>
  status: 'pending' | 'approved' | 'rejected'
  featuredProject: boolean
  createdAt: string
}

export type Report = {
  id: string
  targetType: 'post' | 'user'
  targetId: string
  reason: string
  status: 'open' | 'ignored' | 'resolved'
  createdAt: string
}

export type Job = {
  id: string
  title: string
  company: string
  location: string
  type: 'Internship' | 'Full-time' | 'Contract'
  description: string
  applyUrl: string
  createdAt: string
}

export type Stats = {
  totalUsers: number
  activeUsers: number
  totalPosts: number
  collaborationPosts: number
  featuredPosts: number
  featuredProjects: number
}

export type GrowthPoint = { label: string; value: number }

export type Analytics = {
  stats: Stats
  growth: GrowthPoint[]
}

export type AdminProfile = {
  name: string
  email: string
  role: Role
}
