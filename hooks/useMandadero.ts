"use client";

import { MandaderoResponse } from "@/types/mandadero.type";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { getMandaderos } from "@/services/mandadero.service";

export const useMandaderos = () => {
  const { session } = useAuth();

  const [mandaderos, setMandaderos] = useState<MandaderoResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchMandaderos = async () => {
      try {
        setLoading(true);
        const response = await getMandaderos(session.accessToken);
        setMandaderos(response);
      } finally {
        setLoading(false);
      }
    };
    fetchMandaderos();
  }, [session]);
  return {
    mandaderos,
    loading,
  };
};
