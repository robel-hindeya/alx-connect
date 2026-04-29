import type {
  Analytics,
  CollaborationPost,
  Job,
  Post,
  Report,
  Skill,
  Stats,
  User,
} from '../types'

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`
}

function nowIso() {
  return new Date().toISOString()
}

function skill(name: string, verified = false): Skill {
  return { name, verified }
}

let users: User[] = [
  {
    id: 'u_1',
    name: 'Amina Tesfaye',
    email: 'amina@alx.com',
    role: 'user',
    track: 'Frontend',
    skills: [skill('React', true), skill('TypeScript'), skill('UI/UX')],
    isActive: true,
    isBanned: false,
  },
  {
    id: 'u_2',
    name: 'Daniel Okello',
    email: 'daniel@alx.com',
    role: 'moderator',
    track: 'Backend',
    skills: [skill('Node.js', true), skill('Express', true), skill('PostgreSQL')],
    isActive: true,
    isBanned: false,
  },
  {
    id: 'u_3',
    name: 'Admin ALX',
    email: 'admin@alx.com',
    role: 'admin',
    track: 'Platform',
    skills: [skill('Leadership', true), skill('Security'), skill('Operations', true)],
    isActive: true,
    isBanned: false,
  },
  {
    id: 'u_4',
    name: 'Fatima Ali',
    email: 'fatima@alx.com',
    role: 'user',
    track: 'Product',
    skills: [skill('Product Design'), skill('Research'), skill('Communication', true)],
    isActive: false,
    isBanned: false,
  },
  {
    id: 'u_5',
    name: 'Samuel Mensah',
    email: 'samuel@alx.com',
    role: 'user',
    track: 'Data',
    skills: [skill('Python', true), skill('Analytics'), skill('SQL')],
    isActive: true,
    isBanned: false,
  },
]

let posts: Post[] = [
  {
    id: 'p_1',
    content:
      'Building the collaboration feature this week—looking for feedback on approval states and moderation tools.',
    user: { id: 'u_2', name: 'Daniel Okello', email: 'daniel@alx.com', track: 'Backend' },
    createdAt: '2026-04-20T09:15:00Z',
    featured: false,
  },
  {
    id: 'p_2',
    content:
      'Shipped profile improvements: better accessibility, faster load times, and cleaner layouts across pages.',
    user: { id: 'u_1', name: 'Amina Tesfaye', email: 'amina@alx.com', track: 'Frontend' },
    createdAt: '2026-04-21T14:40:00Z',
    featured: true,
  },
  {
    id: 'p_3',
    content:
      'Seeking a UI designer to polish the admin dashboard—soft shadows, rounded cards, and a clean SaaS feel.',
    user: { id: 'u_4', name: 'Fatima Ali', email: 'fatima@alx.com', track: 'Product' },
    createdAt: '2026-04-23T08:05:00Z',
    featured: false,
  },
]

let collaborationPosts: CollaborationPost[] = [
  {
    id: 'c_1',
    title: 'Backend API Integration',
    description:
      'Help wire admin endpoints for users/posts and standardize error handling across the service layer.',
    requiredSkills: ['Node.js', 'Express', 'REST'],
    author: { id: 'u_2', name: 'Daniel Okello', email: 'daniel@alx.com', track: 'Backend' },
    status: 'pending',
    featuredProject: false,
    createdAt: '2026-04-22T10:00:00Z',
  },
  {
    id: 'c_2',
    title: 'Dashboard UI Polish',
    description:
      'Improve spacing, typography, and consistency for a modern SaaS dashboard look and feel.',
    requiredSkills: ['React', 'Tailwind', 'UX'],
    author: { id: 'u_1', name: 'Amina Tesfaye', email: 'amina@alx.com', track: 'Frontend' },
    status: 'approved',
    featuredProject: true,
    createdAt: '2026-04-19T16:30:00Z',
  },
]

let reports: Report[] = [
  {
    id: 'r_1',
    targetType: 'post',
    targetId: 'p_1',
    reason: 'Spam / low-quality content',
    status: 'open',
    createdAt: '2026-04-24T12:10:00Z',
  },
  {
    id: 'r_2',
    targetType: 'user',
    targetId: 'u_5',
    reason: 'Harassment',
    status: 'open',
    createdAt: '2026-04-24T15:05:00Z',
  },
]

let jobs: Job[] = [
  {
    id: 'j_1',
    title: 'Frontend Internship (React)',
    company: 'ALX Connect',
    location: 'Remote',
    type: 'Internship',
    description: 'Build UI components, fix bugs, and collaborate with product & design.',
    applyUrl: 'https://example.com/apply/frontend-intern',
    createdAt: '2026-04-18T10:00:00Z',
  },
  {
    id: 'j_2',
    title: 'Backend Engineer (Node.js)',
    company: 'ALX Connect',
    location: 'Hybrid',
    type: 'Full-time',
    description: 'Design APIs, optimize queries, and scale services for social features.',
    applyUrl: 'https://example.com/apply/backend',
    createdAt: '2026-04-10T09:00:00Z',
  },
]

export const demoStore = {
  // Users
  getUsers: () => [...users],
  getUser: (id: string) => users.find((u) => u.id === id) ?? null,
  verifySkill: (userId: string, skillName: string) => {
    users = users.map((u) =>
      u.id !== userId
        ? u
        : {
            ...u,
            skills: u.skills.map((s) =>
              s.name === skillName ? { ...s, verified: true } : s,
            ),
          },
    )
    return demoStore.getUser(userId)
  },
  banUser: (userId: string) => {
    users = users.map((u) =>
      u.id !== userId ? u : { ...u, isBanned: true, isActive: false },
    )
    return demoStore.getUser(userId)
  },

  // Posts
  getPosts: () => [...posts],
  deletePost: (postId: string) => {
    posts = posts.filter((p) => p.id !== postId)
    reports = reports.map((r) =>
      r.targetType === 'post' && r.targetId === postId
        ? { ...r, status: 'resolved' }
        : r,
    )
  },
  toggleFeaturedPost: (postId: string) => {
    posts = posts.map((p) => (p.id === postId ? { ...p, featured: !p.featured } : p))
    return posts.find((p) => p.id === postId) ?? null
  },

  // Collaboration posts
  getCollaborationPosts: () => [...collaborationPosts],
  setCollaborationStatus: (id: string, status: CollaborationPost['status']) => {
    collaborationPosts = collaborationPosts.map((p) =>
      p.id === id ? { ...p, status } : p,
    )
    return collaborationPosts.find((p) => p.id === id) ?? null
  },
  toggleFeaturedProject: (id: string) => {
    collaborationPosts = collaborationPosts.map((p) =>
      p.id === id ? { ...p, featuredProject: !p.featuredProject } : p,
    )
    return collaborationPosts.find((p) => p.id === id) ?? null
  },

  // Reports
  getReports: () => [...reports].filter((r) => r.status === 'open'),
  ignoreReport: (reportId: string) => {
    reports = reports.map((r) => (r.id === reportId ? { ...r, status: 'ignored' } : r))
    return reports.find((r) => r.id === reportId) ?? null
  },
  resolveReport: (reportId: string) => {
    reports = reports.map((r) =>
      r.id === reportId ? { ...r, status: 'resolved' } : r,
    )
    return reports.find((r) => r.id === reportId) ?? null
  },
  deleteReportedContent: (reportId: string) => {
    const report = reports.find((r) => r.id === reportId) ?? null
    if (!report) return null
    if (report.targetType === 'post') {
      demoStore.deletePost(report.targetId)
    } else {
      demoStore.banUser(report.targetId)
    }
    demoStore.resolveReport(reportId)
    return report
  },

  // Jobs
  getJobs: () => [...jobs],
  createJob: (input: Omit<Job, 'id' | 'createdAt'>) => {
    const job: Job = { ...input, id: uid('j'), createdAt: nowIso() }
    jobs = [job, ...jobs]
    return job
  },
  updateJob: (jobId: string, input: Omit<Job, 'id' | 'createdAt'>) => {
    jobs = jobs.map((j) => (j.id === jobId ? { ...j, ...input } : j))
    return jobs.find((j) => j.id === jobId) ?? null
  },
  deleteJob: (jobId: string) => {
    jobs = jobs.filter((j) => j.id !== jobId)
  },

  // Stats / Analytics
  getStats: (): Stats => {
    const totalUsers = users.length
    const activeUsers = users.filter((u) => u.isActive && !u.isBanned).length
    const totalPosts = posts.length
    const collaborationCount = collaborationPosts.length
    const featuredPosts = posts.filter((p) => p.featured).length
    const featuredProjects = collaborationPosts.filter((p) => p.featuredProject).length
    return {
      totalUsers,
      activeUsers,
      totalPosts,
      collaborationPosts: collaborationCount,
      featuredPosts,
      featuredProjects,
    }
  },
  getAnalytics: (): Analytics => {
    const base = 120
    const growth = [
      { label: 'Jan', value: base + 8 },
      { label: 'Feb', value: base + 18 },
      { label: 'Mar', value: base + 24 },
      { label: 'Apr', value: base + 36 },
      { label: 'May', value: base + 44 },
      { label: 'Jun', value: base + 52 },
    ]
    return { stats: demoStore.getStats(), growth }
  },
}

