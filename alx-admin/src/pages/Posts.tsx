import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable, { type Column } from '../components/DataTable'
import Modal from '../components/Modal'
import { IconStar } from '../components/icons'
import { usePosts } from '../hooks/usePosts'
import type { Post } from '../types'
import { cn } from '../utils/cn'

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString()
}

export default function Posts() {
  const { posts, loading, error, remove, toggleFeatured } = usePosts()
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null)

  const columns: Column<Post>[] = useMemo(
    () => [
      {
        header: 'User',
        cell: (p) => (
          <div className="min-w-[180px]">
            <div className="font-bold text-slate-900">{p.user.name}</div>
            <div className="text-xs text-slate-500">
              {p.user.track} • {p.user.email}
            </div>
          </div>
        ),
      },
      {
        header: 'Content',
        cell: (p) => (
          <div className="min-w-[260px] text-slate-700">
            <div className="max-w-[520px] truncate">{p.content}</div>
          </div>
        ),
      },
      {
        header: 'Created',
        cell: (p) => <span className="text-slate-600">{formatDate(p.createdAt)}</span>,
      },
      {
        header: 'Featured',
        cell: (p) => (
          <button
            type="button"
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold transition',
              p.featured
                ? 'border-brand-200 bg-brand-50 text-brand-800'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50',
            )}
            onClick={() => toggleFeatured(p.id)}
            aria-label={p.featured ? 'Unfeature post' : 'Feature post'}
          >
            <span className="h-4 w-4">
              <IconStar />
            </span>
            {p.featured ? 'Featured' : 'Feature'}
          </button>
        ),
      },
      {
        header: 'Actions',
        align: 'right',
        cell: (p) => (
          <div className="flex justify-end">
            <Button variant="danger" size="sm" onClick={() => setDeleteTarget(p)}>
              Delete
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
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Posts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Delete content and toggle posts as featured.
          </p>
        </div>
      </div>

      <Card
        title={loading ? 'Loading posts…' : `Posts (${posts.length})`}
        action={
          error ? (
            <span className="text-xs font-semibold text-red-600">{error}</span>
          ) : (
            <span className="text-xs font-semibold text-slate-500">
              Featured posts are highlighted
            </span>
          )
        }
      >
        <DataTable
          columns={columns}
          rows={posts}
          rowKey={(p) => p.id}
          emptyMessage={loading ? 'Loading…' : 'No posts found.'}
          rowClassName={(p) => (p.featured ? 'bg-brand-50/40' : undefined)}
        />
      </Card>

      <Modal
        open={Boolean(deleteTarget)}
        title="Confirm Delete"
        onClose={() => setDeleteTarget(null)}
        footer={
          deleteTarget ? (
            <>
              <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={async () => {
                  await remove(deleteTarget.id)
                  setDeleteTarget(null)
                }}
              >
                Delete post
              </Button>
            </>
          ) : null
        }
      >
        {deleteTarget ? (
          <div className="space-y-3">
            <div className="text-sm text-slate-700">
              Delete this post by <strong>{deleteTarget.user.name}</strong>?
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {deleteTarget.content}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
