import NextAuth, { DefaultSession } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { User, DefaultUser } from "next-auth/core/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    role?: string | null;
  }
}

declare module "next-auth/core/types" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface User extends DefaultUser {
    role?: string | null;
  }
}
