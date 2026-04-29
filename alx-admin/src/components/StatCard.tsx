import Card from './Card'

export default function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: number | string
  hint?: string
}) {
  return (
    <Card>
      <div className="flex flex-col gap-2">
        <div className="text-xs font-bold text-slate-500">{label}</div>
        <div className="text-3xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        {hint ? <div className="text-xs text-slate-500">{hint}</div> : null}
      </div>
    </Card>
  )
}
