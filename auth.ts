import NextAuth
from "next-auth";

import Credentials
from "next-auth/providers/credentials";

import { LoginSchema }
from "@/schemas/login.schema";

import { loginService }
  from "@/services/auth.service";

  import type { Role }
from "@/constants/roles";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,    
    updateAge: 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(
        credentials
      ) {
        try {
          const validatedFields =
            await LoginSchema.parseAsync(
              credentials
            );


          const data =
            await loginService(
              validatedFields
            );


          return {
            id:
              data.user.id.toString(),

            email:
              data.user.email,

            roles:
              data.user.roles,

            accessToken:
              data.access_token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({
      token,
      user,
    }) {
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
});