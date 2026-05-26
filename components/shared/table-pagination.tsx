"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number;
  lastPage: number;
};

export const TablePaginationInput = ({ currentPage, lastPage }: Props) => {
  const router = useRouter();

  const goToPage = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      router.push(`?page=${page}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Anterior
      </Button>

      <Input
        type="number"
        min={1}
        max={lastPage}
        defaultValue={currentPage}
        key={currentPage}
        className="w-20"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = parseInt(e.currentTarget.value, 10);

            if (value >= 1 && value <= lastPage) {
              goToPage(value);
            }
          }
        }}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= lastPage}
      >
        Siguiente
      </Button>
    </div>
  );
};
