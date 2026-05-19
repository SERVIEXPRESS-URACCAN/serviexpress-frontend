import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { ZodError } from "zod";

import { LoginSchema }
from "@/schemas/login.schema";

import type { LoginResponse }
from "@/types/auth.types";
import { Role } from "@/constants/roles";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          const {
            email,
            password,
          } =
            await LoginSchema.parseAsync(
              credentials
            );

          const response =
            await fetch(
              `${process.env.API_URL}/auth/login`,
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  email,
                  password,
                }),
              }
            );

          if (!response.ok) {
            return null;
          }

          const user:
            LoginResponse =
              await response.json();

          return {
            id: user.id.toString(),

            email: user.email,

            roles: user.roles,

            accessToken:
              user.access_token,
          };
        } catch (error) {
          if (
            error instanceof ZodError
          ) {
            return null;
          }

          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.roles =
        user.roles;

      token.accessToken =
        user.accessToken;
    }

    return token;
  },

  async session({
    session,
    token,
  }) {
    session.user.roles =
      token.roles as Role[];

    session.accessToken =
      token.accessToken as string;

    return session;
  },
},
  pages: {
    signIn: "/login",
  },
});