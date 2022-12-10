import NextAuth, { type NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_ID,
      clientSecret: env.AUTH0_SECRET,
      issuer: env.AUTH0_ISSUER,
      authorization: `${env.AUTH0_ISSUER}/authorize?response_type=code&prompt=login`,
    }),
    // ...add more providers here
  ],
  secret: "Iloveyouaimi",
};

export default NextAuth(authOptions);
