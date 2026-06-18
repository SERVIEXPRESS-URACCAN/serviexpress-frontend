import { TableSkeleton } from '@/components/shared/table-skeleton'

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-40 rounded bg-muted animate-pulse" />

          <div className="h-4 w-64 rounded bg-muted animate-pulse" />
        </div>

        <div className="h-10 w-40 rounded bg-muted animate-pulse" />
      </div>
      <TableSkeleton columns={7} rows={5} />
    </div>
  )
}
