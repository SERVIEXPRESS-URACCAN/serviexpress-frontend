"use client";

import { useSearch } from "@/hooks/useSearch";

type Props = {
  className?: string;
};
export const CategoryProductSearch = ({ className }: Props) => {
  const { value, setValue, handleSearch } = useSearch();

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="text"
        placeholder="Buscar categoría..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="w-full rounded-md border px-3 py-2"
      />

      <button
        onClick={handleSearch}
        className="shrink-0 rounded-md bg-black px-4 text-sm text-white cursor-pointer"
      >
        Buscar
      </button>
    </div>
  );
};
