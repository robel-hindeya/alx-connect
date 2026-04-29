import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { getProfile, isAuthenticated } from '../services/auth'

export default function RequireAdmin() {
  const location = useLocation()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  const profile = getProfile()
  if (profile?.role !== 'admin') {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, forbidden: true }}
      />
    )
  }

  return <Outlet />
}
