import { Skeleton } from '@/components/ui/skeleton'

export const ClientesTableSkeleton = () => {
  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        <div className="grid grid-cols-7 items-center gap-4">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
          <div className="flex justify-end">
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>
      <div className="divide-y">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid grid-cols-7 items-center gap-4 p-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-5 w-16 rounded-full" />
            <div className="flex justify-end">
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}