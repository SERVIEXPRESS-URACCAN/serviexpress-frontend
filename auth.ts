import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/login.schema";
import { loginService } from "@/services/auth.service";
import { Role, ROLES } from "@/constants/roles";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
    updateAge: 0, 
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const validatedFields = await LoginSchema.parseAsync(credentials);
          const data = await loginService(validatedFields);

          const hasValidRole = data.user.roles.some(
            (role) => role === ROLES.ADMIN || role === ROLES.OWNER
          );

          if (!hasValidRole) throw new InvalidCredentialsError();

          return {
            id: data.user.id.toString(),
            email: data.user.email,
            roles: data.user.roles,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: data.expires_at * 1000,
          };
        } catch {
          throw new InvalidCredentialsError();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session: sessionData }) {
      if (user) {
        return {
          ...token,
          roles: user.roles,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
        };
      }

      if (trigger === 'update' && sessionData) {
        console.log("JWT UPDATE", sessionData)
        return {
          ...token,
          accessToken: sessionData.accessToken,
          refreshToken: sessionData.refreshToken,
          expiresAt: sessionData.expiresAt,
        };
      }

      return token;
    },

   async session({ session, token }) {
  session.user.roles = token.roles as Role[];
  session.accessToken = token.accessToken as string;
  session.refreshToken = token.refreshToken as string;
  session.expiresAt = token.expiresAt as number;
  session.error = token.error as "RefreshAccessTokenError" | undefined;
  return session;
},
  },
});