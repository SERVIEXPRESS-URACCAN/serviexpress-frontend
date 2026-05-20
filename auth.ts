import NextAuth
from "next-auth";

import Credentials
from "next-auth/providers/credentials";

import { LoginSchema }
from "@/schemas/login.schema";

import { loginService }
from "@/services/auth.service";

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
});