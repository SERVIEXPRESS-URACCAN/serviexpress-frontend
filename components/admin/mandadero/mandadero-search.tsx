"use client";

import { useSearch } from "@/hooks/useSearch";
type Props = {
  className?: string;
};
export const MandaderoSearch = ({ className }: Props) => {
  const { value, setValue, handleSearch } = useSearch();

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="text"
        placeholder="Buscar mandadero..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 rounded-md border px-3 py-2 text-sm"
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
