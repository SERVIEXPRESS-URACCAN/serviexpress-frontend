"use client";

import { useSearch } from "@/hooks/useSearch";

export const CategoryBusinessSearch = () => {
  const { value, setValue, handleSearch } = useSearch();

  return (
    <div className="flex gap-2">
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
        className="rounded-md bg-black px-4 py-2 text-white cursor-pointer"
      >
        Buscar
      </button>
    </div>
  );
};
