import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import RequireAdmin from './routes/RequireAdmin'
import Analytics from './pages/Analytics'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Posts from './pages/Posts'
import Projects from './pages/Projects'
import Reports from './pages/Reports'
import Users from './pages/Users'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RequireAdmin />}>
          <Route element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/users" element={<Users />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/jobs" element={<Jobs />} />
          </Route>
        </Route>

        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
