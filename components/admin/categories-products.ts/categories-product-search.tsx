"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const CategoryProductSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    }, 400);

    return () => clearTimeout(delay);
  }, [value, router, searchParams]);

  return (
    <input
      type="text"
      placeholder="Buscar categoria..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full rounded-md border px-3 py-2"
    />
  );
};
