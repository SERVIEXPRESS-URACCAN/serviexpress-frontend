"use client";

import { useSearch } from "@/hooks/useSearch";
type Props = {
  placeholder?: string;
  className?: string;
};
export const SearchInput = ({ className, placeholder }: Props) => {
  const { value, setValue, handleSearch } = useSearch();

  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="flex-1 rounded-md border px-3 py-2 text-sm "
      />
    </div>
  );
};
