import { DefaultSession }
from "next-auth";

import type { Role }
from "@/constants/roles";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    expiresAt: number;

    user: {
      roles: Role[];
    } & DefaultSession["user"];
  }

  interface User {
    roles: Role[];
    accessToken: string;
    expiresAt: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    roles: Role[];
    accessToken: string;
    expiresAt: number;
  }
}