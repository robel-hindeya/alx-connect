import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable, { type Column } from '../components/DataTable'
import Modal from '../components/Modal'
import { IconStar } from '../components/icons'
import { useProjects } from '../hooks/useProjects'
import type { CollaborationPost } from '../types'
import { cn } from '../utils/cn'

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString()
}

function StatusBadge({ status }: { status: CollaborationPost['status'] }) {
  const base = 'inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold'
  if (status === 'approved') return <span className={cn(base, 'border-emerald-200 bg-emerald-50 text-emerald-700')}>Approved</span>
  if (status === 'rejected') return <span className={cn(base, 'border-red-200 bg-red-50 text-red-700')}>Rejected</span>
  return <span className={cn(base, 'border-slate-200 bg-slate-50 text-slate-600')}>Pending</span>
}

export default function Projects() {
  const { projects, loading, error, approve, reject, toggleFeatured } = useProjects()
  const [actionTarget, setActionTarget] = useState<{
    post: CollaborationPost
    action: 'approve' | 'reject'
  } | null>(null)

  const columns: Column<CollaborationPost>[] = useMemo(
    () => [
      {
        header: 'Project',
        cell: (p) => (
          <div className="min-w-[240px]">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-bold text-slate-900">{p.title}</div>
              {p.featuredProject ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-brand-200 bg-brand-50 px-2 py-1 text-[11px] font-extrabold text-brand-800">
                  <span className="h-3.5 w-3.5">
                    <IconStar />
                  </span>
                  Featured
                </span>
              ) : null}
            </div>
            <div className="mt-1 max-w-[520px] truncate text-xs text-slate-500">
              {p.description}
            </div>
          </div>
        ),
      },
      {
        header: 'Author',
        cell: (p) => (
          <div className="min-w-[200px]">
            <div className="font-semibold text-slate-800">{p.author.name}</div>
            <div className="text-xs text-slate-500">
              {p.author.track} • {p.author.email}
            </div>
          </div>
        ),
      },
      {
        header: 'Skills',
        cell: (p) => (
          <div className="flex min-w-[220px] flex-wrap gap-2">
            {p.requiredSkills.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-600"
              >
                {s}
              </span>
            ))}
            {p.requiredSkills.length > 3 ? (
              <span className="text-xs font-semibold text-slate-500">
                +{p.requiredSkills.length - 3} more
              </span>
            ) : null}
          </div>
        ),
      },
      { header: 'Status', cell: (p) => <StatusBadge status={p.status} /> },
      {
        header: 'Featured',
        cell: (p) => (
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition',
              p.featuredProject
                ? 'border-brand-200 bg-brand-50 text-brand-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            )}
            onClick={() => toggleFeatured(p.id)}
            aria-label={p.featuredProject ? 'Unfeature project' : 'Feature project'}
          >
            <span className="h-4 w-4">
              <IconStar />
            </span>
            {p.featuredProject ? 'Featured' : 'Feature'}
          </button>
        ),
      },
      {
        header: 'Actions',
        align: 'right',
        cell: (p) => (
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              variant="primary"
              disabled={p.status === 'approved'}
              onClick={() => setActionTarget({ post: p, action: 'approve' })}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="danger"
              disabled={p.status === 'rejected'}
              onClick={() => setActionTarget({ post: p, action: 'reject' })}
            >
              Reject
            </Button>
          </div>
        ),
      },
    ],
    [toggleFeatured],
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Projects</h1>
          <p className="mt-1 text-sm text-slate-500">
            Approve or reject collaboration posts and mark featured projects.
          </p>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          Last updated: {formatDate(new Date().toISOString())}
        </div>
      </div>

      <Card
        title={loading ? 'Loading collaboration posts…' : `Collaboration Posts (${projects.length})`}
        action={
          error ? (
            <span className="text-xs font-semibold text-red-600">{error}</span>
          ) : (
            <span className="text-xs font-semibold text-slate-500">Demo-ready</span>
          )
        }
      >
        <DataTable
          columns={columns}
          rows={projects}
          rowKey={(p) => p.id}
          emptyMessage={loading ? 'Loading…' : 'No collaboration posts found.'}
          rowClassName={(p) => (p.featuredProject ? 'bg-brand-50/40' : undefined)}
        />
      </Card>

      <Modal
        open={Boolean(actionTarget)}
        title={actionTarget?.action === 'approve' ? 'Approve Post' : 'Reject Post'}
        onClose={() => setActionTarget(null)}
        footer={
          actionTarget ? (
            <>
              <Button variant="ghost" onClick={() => setActionTarget(null)}>
                Cancel
              </Button>
              <Button
                variant={actionTarget.action === 'approve' ? 'primary' : 'danger'}
                onClick={async () => {
                  const { post, action } = actionTarget
                  if (action === 'approve') await approve(post.id)
                  else await reject(post.id)
                  setActionTarget(null)
                }}
              >
                {actionTarget.action === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </>
          ) : null
        }
      >
        {actionTarget ? (
          <div className="space-y-3">
            <div className="text-sm text-slate-700">
              {actionTarget.action === 'approve' ? (
                <>
                  Approve <strong>{actionTarget.post.title}</strong>?
                </>
              ) : (
                <>
                  Reject <strong>{actionTarget.post.title}</strong>?
                </>
              )}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {actionTarget.post.description}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

