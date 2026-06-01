"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (value === currentSearch) return;

      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };
  return { value, setValue, handleSearch };
};
