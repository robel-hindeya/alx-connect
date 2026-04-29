import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable, { type Column } from '../components/DataTable'
import Modal from '../components/Modal'
import { useJobs } from '../hooks/useJobs'
import type { Job } from '../types'

type JobDraft = Omit<Job, 'id' | 'createdAt'>

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleDateString()
}

function emptyDraft(): JobDraft {
  return {
    title: '',
    company: '',
    location: '',
    type: 'Internship',
    description: '',
    applyUrl: '',
  }
}

export default function Jobs() {
  const { jobs, loading, error, add, edit, remove } = useJobs()
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<Job | null>(null)
  const [draft, setDraft] = useState<JobDraft>(emptyDraft())
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null)

  const columns: Column<Job>[] = useMemo(
    () => [
      {
        header: 'Title',
        cell: (j) => (
          <div className="min-w-[240px]">
            <div className="font-bold text-slate-900">{j.title}</div>
            <div className="text-xs text-slate-500">{j.company}</div>
          </div>
        ),
      },
      { header: 'Type', cell: (j) => <span className="text-slate-700">{j.type}</span> },
      { header: 'Location', cell: (j) => <span className="text-slate-700">{j.location}</span> },
      { header: 'Posted', cell: (j) => <span className="text-slate-600">{formatDate(j.createdAt)}</span> },
      {
        header: 'Actions',
        align: 'right',
        cell: (j) => (
          <div className="flex justify-end gap-2">
            <Button
              size="sm"
              onClick={() => {
                setEditing(j)
                setDraft({
                  title: j.title,
                  company: j.company,
                  location: j.location,
                  type: j.type,
                  description: j.description,
                  applyUrl: j.applyUrl,
                })
                setEditorOpen(true)
              }}
            >
              Edit
            </Button>
            <Button size="sm" variant="danger" onClick={() => setDeleteTarget(j)}>
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [],
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Job Board</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add, edit, and delete job/internship listings.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEditing(null)
            setDraft(emptyDraft())
            setEditorOpen(true)
          }}
        >
          Add Job
        </Button>
      </div>

      <Card
        title={loading ? 'Loading jobs…' : `Jobs (${jobs.length})`}
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
          rows={jobs}
          rowKey={(j) => j.id}
          emptyMessage={loading ? 'Loading…' : 'No jobs yet.'}
        />
      </Card>

      <Modal
        open={editorOpen}
        title={editing ? 'Edit Job' : 'Add Job'}
        onClose={() => setEditorOpen(false)}
        widthClassName="max-w-2xl"
        footer={
          <>
            <Button variant="ghost" onClick={() => setEditorOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                const payload: JobDraft = {
                  title: draft.title.trim(),
                  company: draft.company.trim(),
                  location: draft.location.trim(),
                  type: draft.type,
                  description: draft.description.trim(),
                  applyUrl: draft.applyUrl.trim(),
                }

                if (!payload.title || !payload.company || !payload.applyUrl) return

                if (editing) await edit(editing.id, payload)
                else await add(payload)

                setEditorOpen(false)
              }}
              disabled={!draft.title.trim() || !draft.company.trim() || !draft.applyUrl.trim()}
            >
              {editing ? 'Save changes' : 'Create job'}
            </Button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-xs font-extrabold text-slate-600">Title</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              value={draft.title}
              onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
              placeholder="Frontend Internship (React)"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold text-slate-600">Company</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              value={draft.company}
              onChange={(e) => setDraft((d) => ({ ...d, company: e.target.value }))}
              placeholder="ALX Connect"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold text-slate-600">Location</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              value={draft.location}
              onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
              placeholder="Remote"
            />
          </div>
          <div>
            <label className="text-xs font-extrabold text-slate-600">Type</label>
            <select
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              value={draft.type}
              onChange={(e) =>
                setDraft((d) => ({ ...d, type: e.target.value as JobDraft['type'] }))
              }
            >
              <option>Internship</option>
              <option>Full-time</option>
              <option>Contract</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-extrabold text-slate-600">Apply URL</label>
            <input
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              value={draft.applyUrl}
              onChange={(e) => setDraft((d) => ({ ...d, applyUrl: e.target.value }))}
              placeholder="https://example.com/apply"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-extrabold text-slate-600">Description</label>
            <textarea
              className="mt-1 min-h-[110px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-500/15"
              value={draft.description}
              onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
              placeholder="Short description of responsibilities and requirements."
            />
          </div>
        </div>
      </Modal>

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
                Delete job
              </Button>
            </>
          ) : null
        }
      >
        {deleteTarget ? (
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              Delete <strong>{deleteTarget.title}</strong> at{' '}
              <strong>{deleteTarget.company}</strong>?
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
              {deleteTarget.description || 'No description.'}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

