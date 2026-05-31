import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  columns: number
  rows?: number
}

export const TableSkeleton = ({ columns, rows = 5 }: Props) => {
  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>
      </div>

      <div className="divide-y">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 p-4"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                className={
                  colIndex === columns - 1
                    ? 'h-8 w-8 rounded-md justify-self-end'
                    : 'h-4 w-full'
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
