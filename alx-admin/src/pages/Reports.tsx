import { useMemo, useState } from 'react'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable, { type Column } from '../components/DataTable'
import Modal from '../components/Modal'
import { useReports, type ReportRow } from '../hooks/useReports'
import { cn } from '../utils/cn'

function formatDate(iso: string) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  return date.toLocaleString()
}

export default function Reports() {
  const { reports, loading, error, ignore, deleteContent } = useReports()
  const [deleteTarget, setDeleteTarget] = useState<ReportRow | null>(null)

  const columns: Column<ReportRow>[] = useMemo(
    () => [
      {
        header: 'Type',
        cell: (r) => (
          <span
            className={cn(
              'inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold',
              r.targetType === 'post'
                ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                : 'border-amber-200 bg-amber-50 text-amber-800',
            )}
          >
            {r.targetType === 'post' ? 'Post' : 'User'}
          </span>
        ),
      },
      {
        header: 'Target',
        cell: (r) => <div className="min-w-[240px] font-semibold text-slate-800">{r.targetLabel}</div>,
      },
      {
        header: 'Reason',
        cell: (r) => <div className="min-w-[220px] text-slate-600">{r.reason}</div>,
      },
      { header: 'Created', cell: (r) => <span className="text-slate-600">{formatDate(r.createdAt)}</span> },
      {
        header: 'Actions',
        align: 'right',
        cell: (r) => (
          <div className="flex justify-end gap-2">
            <Button size="sm" variant="secondary" onClick={() => ignore(r.id)}>
              Ignore
            </Button>
            <Button size="sm" variant="danger" onClick={() => setDeleteTarget(r)}>
              Delete content
            </Button>
          </div>
        ),
      },
    ],
    [ignore],
  )

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review reported posts/users, delete content, or ignore reports.
          </p>
        </div>
      </div>

      <Card
        title={loading ? 'Loading reports…' : `Open Reports (${reports.length})`}
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
          rows={reports}
          rowKey={(r) => r.id}
          emptyMessage={loading ? 'Loading…' : 'No open reports.'}
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
                  await deleteContent(deleteTarget.id)
                  setDeleteTarget(null)
                }}
              >
                Delete & resolve
              </Button>
            </>
          ) : null
        }
      >
        {deleteTarget ? (
          <div className="space-y-3 text-sm text-slate-700">
            <div>
              This will delete the reported{' '}
              <strong>{deleteTarget.targetType === 'post' ? 'post' : 'user'}</strong> and
              resolve the report.
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-xs font-bold text-slate-500">Target</div>
              <div className="mt-1 font-semibold text-slate-800">{deleteTarget.targetLabel}</div>
              <div className="mt-2 text-xs font-bold text-slate-500">Reason</div>
              <div className="mt-1 text-slate-700">{deleteTarget.reason}</div>
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}

