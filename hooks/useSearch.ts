"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") || "");

  const handleSearch = () => {
    if (!value.trim() && !searchParams.get("search")) return;

    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    router.replace(`?${params.toString()}`);
  };
  useEffect(() => {
    if (value === "" && searchParams.get("search")) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("search");
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }
  }, [value, searchParams, router]);
  return {
    value,
    setValue,
    handleSearch,
  };
};
