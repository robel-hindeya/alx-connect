import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Card from '../components/Card'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5 py-10">
      <div className="w-full max-w-lg">
        <Card title="Page not found">
          <div className="text-sm text-slate-600">
            The page you’re looking for doesn’t exist.
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/">
              <Button variant="primary">Go to Dashboard</Button>
            </Link>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

