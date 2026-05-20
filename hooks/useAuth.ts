"use client";

import { useSession }
from "next-auth/react";

export function useAuth() {
  const session =
    useSession();

  return {
    session:
      session.data,

    status:
      session.status,

    isAuthenticated:
      !!session.data,
  };
}