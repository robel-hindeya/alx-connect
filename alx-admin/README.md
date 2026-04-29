# ALX Admin

Modern admin dashboard (React + Vite + Tailwind CSS) for managing users, posts, collaboration projects, reports, and a job board for the ALX social network app.

## Features

- Tailwind CSS UI (SaaS-style sidebar + top navbar)
- Pages: Dashboard, Analytics, Users, Posts, Projects, Reports, Job Board, Login
- Advanced user management (profile details, verify skill, ban user)
- Featured controls (feature posts + projects)
- Reports system (delete content / ignore report)
- Job board CRUD (add/edit/delete via modals)
- Protected admin routes + role checks (JWT stored in `localStorage`)
- Axios API layer with demo in-memory fallbacks when API is unavailable

## Getting Started

```bash
cd alx-admin
npm install
npm run dev
```

## Environment

- Optional: set `VITE_API_BASE_URL` to your backend (defaults to `http://localhost:5000/api`).
- Auth endpoint (optional): `POST /auth/admin/login`
- Admin endpoints (optional): `/admin/stats`, `/admin/analytics`, `/admin/users`, `/admin/posts`, `/admin/collaboration-posts`, `/admin/reports`, `/admin/jobs`

## Demo Login

- Works without a backend.
- Use any email containing `admin` (default: `admin@alx.com`).

## Structure

- `src/components/` Sidebar, Navbar, `DataTable`, `Modal`, `StatCard`, etc.
- `src/pages/` Dashboard, Analytics, Users, Posts, Projects, Reports, Jobs, Login
- `src/hooks/` Data hooks for pages
- `src/services/` Axios + admin API wrappers
- `src/data/demoStore.ts` In-memory demo data store
