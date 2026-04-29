import api from './api.js'
import type { AdminProfile } from '../types'

const TOKEN_KEY = 'alx_admin_token'
const PROFILE_KEY = 'alx_admin_profile'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function getProfile(): AdminProfile | null {
  const raw = localStorage.getItem(PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AdminProfile
  } catch {
    return null
  }
}

export function isAdminAuthenticated(): boolean {
  const token = getToken()
  const profile = getProfile()
  return Boolean(token && profile?.role === 'admin')
}

export function isAuthenticated(): boolean {
  return Boolean(getToken() && getProfile())
}

export function persistAuth(token: string, profile: AdminProfile) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(PROFILE_KEY)
}

function buildDemoProfile(email: string): AdminProfile {
  const nameFromEmail = email.split('@')[0]?.replace(/[._-]+/g, ' ') || 'Admin'
  const name = nameFromEmail
    .split(' ')
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(' ')
  const lower = email.toLowerCase()
  const role = lower.includes('admin')
    ? 'admin'
    : lower.includes('mod')
      ? 'moderator'
      : 'user'
  return { name, email, role }
}

export async function login(email: string, password: string) {
  const trimmedEmail = email.trim().toLowerCase()
  const trimmedPassword = password.trim()

  if (!trimmedEmail || !trimmedPassword) {
    throw new Error('Email and password are required.')
  }

  try {
    const res = await api.post('/auth/admin/login', {
      email: trimmedEmail,
      password: trimmedPassword,
    })

    const token = res.data?.token
    const rawProfile = res.data?.profile
    if (!token || !rawProfile) throw new Error('Invalid login response.')

    const role = String(rawProfile?.role ?? '').toLowerCase()
    if (role !== 'admin') {
      throw new Error('This account is not an admin.')
    }

    const profile: AdminProfile = {
      name: String(rawProfile?.name ?? 'Admin'),
      email: String(rawProfile?.email ?? trimmedEmail),
      role: 'admin',
    }

    persistAuth(token, profile)
    return { token, profile }
  } catch {
    if (!trimmedEmail.includes('admin') && !trimmedEmail.includes('mod')) {
      throw new Error(
        'Demo mode: use an admin email (e.g. admin@alx.com). Moderators can sign in but are restricted.',
      )
    }

    const token = `demo_${Date.now()}`
    const profile = buildDemoProfile(trimmedEmail)
    persistAuth(token, profile)
    return { token, profile }
  }
}
