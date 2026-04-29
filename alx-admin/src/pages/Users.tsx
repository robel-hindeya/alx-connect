import { useMemo, useState } from 'react'
import Badge from '../components/Badge'
import Button from '../components/Button'
import Card from '../components/Card'
import DataTable, { type Column } from '../components/DataTable'
import Modal from '../components/Modal'
import { IconBan, IconCheck } from '../components/icons'
import { useUsers } from '../hooks/useUsers'
import type { User } from '../types'
import { cn } from '../utils/cn'

function StatusPill({ banned, active }: { banned: boolean; active: boolean }) {
  const label = banned ? 'Banned' : active ? 'Active' : 'Inactive'
  const klass = banned
    ? 'border-red-200 bg-red-50 text-red-700'
    : active
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : 'border-slate-200 bg-slate-50 text-slate-600'
  return (
    <span className={cn('inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold', klass)}>
      {label}
    </span>
  )
}

export default function Users() {
  const { users, loading, error, verifySkill, ban } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [banConfirmOpen, setBanConfirmOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)

  const columns: Column<User>[] = useMemo(
    () => [
      {
        header: 'Name',
        cell: (u) => (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-200 to-brand-700" />
            <div className="min-w-0">
              <div className="truncate font-bold text-slate-900">{u.name}</div>
              <div className="truncate text-xs text-slate-500">{u.track}</div>
            </div>
          </div>
        ),
      },
      { header: 'Email', cell: (u) => <span className="text-slate-600">{u.email}</span> },
      { header: 'Role', cell: (u) => <Badge role={u.role} /> },
      {
        header: 'Skills',
        cell: (u) => (
          <div className="flex flex-wrap gap-2">
            {u.skills.slice(0, 3).map((s) => (
              <span
                key={s.name}
                className={cn(
                  'inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold',
                  s.verified
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600',
                )}
              >
                {s.verified ? <span className="h-3.5 w-3.5"><IconCheck /></span> : null}
                {s.name}
              </span>
            ))}
            {u.skills.length > 3 ? (
              <span className="text-xs font-semibold text-slate-500">
                +{u.skills.length - 3} more
              </span>
            ) : null}
          </div>
        ),
      },
      {
        header: 'Status',
        cell: (u) => <StatusPill banned={u.isBanned} active={u.isActive} />,
      },
      {
        header: 'Actions',
        align: 'right',
        cell: (u) => (
          <div className="flex justify-end">
            <Button size="sm" onClick={() => setSelectedUser(u)}>
              View
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
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Users</h1>
          <p className="mt-1 text-sm text-slate-500">
            View profile details, verify skills, and ban users.
          </p>
        </div>
      </div>

      <Card
        title={loading ? 'Loading users…' : `Users (${users.length})`}
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
          rows={users}
          rowKey={(u) => u.id}
          emptyMessage={loading ? 'Loading…' : 'No users found.'}
        />
      </Card>

      <Modal
        open={Boolean(selectedUser)}
        title="User Profile"
        onClose={() => {
          setSelectedUser(null)
          setBanConfirmOpen(false)
          setVerifyOpen(false)
        }}
        widthClassName="max-w-2xl"
        footer={
          selectedUser ? (
            <>
              <Button variant="ghost" onClick={() => setSelectedUser(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                disabled={
                  selectedUser.isBanned ||
                  selectedUser.skills.every((s) => s.verified)
                }
                onClick={() => setVerifyOpen(true)}
              >
                Verify Skill
              </Button>
              <Button
                variant="danger"
                leftIcon={<IconBan />}
                disabled={selectedUser.isBanned}
                onClick={() => setBanConfirmOpen(true)}
              >
                Ban User
              </Button>
            </>
          ) : null
        }
      >
        {selectedUser ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-200 to-brand-700" />
                <div>
                  <div className="text-lg font-extrabold text-slate-900">
                    {selectedUser.name}
                  </div>
                  <div className="text-sm text-slate-600">{selectedUser.email}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Badge role={selectedUser.role} />
                    <StatusPill banned={selectedUser.isBanned} active={selectedUser.isActive} />
                    <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      Track: {selectedUser.track}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-extrabold text-slate-900">Skills</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedUser.skills.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition',
                      s.verified
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100',
                    )}
                    disabled={selectedUser.isBanned || s.verified}
                    onClick={async () => {
                      const updated = await verifySkill(selectedUser.id, s.name)
                      if (updated) setSelectedUser(updated)
                    }}
                    aria-label={s.verified ? `${s.name} verified` : `Verify ${s.name}`}
                    title={s.verified ? 'Verified' : 'Click to verify skill'}
                  >
                    <span className="h-4 w-4">{s.verified ? <IconCheck /> : <IconCheck />}</span>
                    {s.name}
                    {s.verified ? (
                      <span className="ml-1 text-[10px] font-extrabold uppercase tracking-wider">
                        verified
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Tip: click an unverified skill to verify it, or use “Verify Skill”.
              </div>
            </div>

            <Modal
              open={verifyOpen}
              title="Verify a Skill"
              onClose={() => setVerifyOpen(false)}
              footer={
                <Button variant="ghost" onClick={() => setVerifyOpen(false)}>
                  Done
                </Button>
              }
            >
              <div className="text-sm text-slate-700">
                Select a skill to verify for <strong>{selectedUser.name}</strong>.
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedUser.skills.filter((s) => !s.verified).length === 0 ? (
                  <div className="text-sm text-slate-500">All skills are verified.</div>
                ) : (
                  selectedUser.skills
                    .filter((s) => !s.verified)
                    .map((s) => (
                      <Button
                        key={s.name}
                        size="sm"
                        variant="secondary"
                        leftIcon={<IconCheck />}
                        disabled={selectedUser.isBanned}
                        onClick={async () => {
                          const updated = await verifySkill(selectedUser.id, s.name)
                          if (updated) setSelectedUser(updated)
                        }}
                      >
                        Verify {s.name}
                      </Button>
                    ))
                )}
              </div>
            </Modal>

            <Modal
              open={banConfirmOpen}
              title="Confirm Ban"
              onClose={() => setBanConfirmOpen(false)}
              footer={
                <>
                  <Button variant="ghost" onClick={() => setBanConfirmOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    leftIcon={<IconBan />}
                    onClick={async () => {
                      const updated = await ban(selectedUser.id)
                      if (updated) setSelectedUser(updated)
                      setBanConfirmOpen(false)
                    }}
                  >
                    Ban user
                  </Button>
                </>
              }
            >
              <div className="text-sm text-slate-700">
                This will ban <strong>{selectedUser.name}</strong> and mark them inactive.
              </div>
            </Modal>
          </div>
        ) : null}
      </Modal>
    </div>
  )
}
