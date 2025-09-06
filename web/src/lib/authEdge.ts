import type { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authEdgeOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: "select_account" } }
    }),
  ],
  pages: { signIn: "/auth/signin" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user, account, profile }) {
  
      if (user) {
 
        token.id = user.id ?? account?.providerAccountId ?? (profile?.sub as string) ?? "";
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Extend the default user with custom fields; allow nulls to match types
        session.user.id = token.id as string;
        session.user.name = token.name as string | null;
        session.user.email = token.email as string | null;
        session.user.image = token.image as string | null;
      }
      return session;
    },
    async redirect({ baseUrl }) {

      return baseUrl;
    },
  },
};