import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

export type Column<T> = {
  header: string
  width?: number | string
  align?: 'left' | 'right' | 'center'
  cell: (row: T) => ReactNode
}

export default function DataTable<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = 'No data available.',
  rowClassName,
  onRowClick,
}: {
  columns: Column<T>[]
  rows: T[]
  rowKey: (row: T) => string
  emptyMessage?: string
  rowClassName?: (row: T) => string | undefined
  onRowClick?: (row: T) => void
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                style={{ width: col.width, textAlign: col.align ?? 'left' }}
                className="sticky top-0 z-[1] border-b border-slate-200 bg-slate-50/70 px-3 py-3 text-left text-xs font-bold text-slate-500 backdrop-blur"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-3 py-10 text-center text-sm text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={rowKey(row)}
                className={cn(
                  'group bg-white',
                  onRowClick ? 'cursor-pointer hover:bg-slate-50' : '',
                  rowClassName?.(row),
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.header}
                    className="px-3 py-3 text-sm text-slate-700"
                    style={{ textAlign: col.align ?? 'left' }}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

