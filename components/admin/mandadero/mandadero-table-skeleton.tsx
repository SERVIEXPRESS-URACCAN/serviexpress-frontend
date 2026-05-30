import { Skeleton } from "@/components/ui/skeleton";

export const MandaderoTableSkeleton = () => {
  return (
    <div className="rounded-md border">
      <div className="border-b p-4">
        <div className="grid grid-cols-3 items-center">
          <Skeleton className="h-4 w-10" />

          <Skeleton className="h-4 w-32" />

          <div className="flex justify-end">
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      </div>

      <div className="divide-y">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="grid grid-cols-3 items-center p-4">
            <Skeleton className="h-4 w-8" />

            <Skeleton className="h-4 w-40" />

            <div className="flex justify-end">
              <Skeleton className="size-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
