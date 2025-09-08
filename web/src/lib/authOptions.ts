import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const WELCOME_CREDITS_CENTS = 2500;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { prompt: "select_account" } },
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER!,
      from: process.env.EMAIL_FROM!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    verifyRequest: "/auth/signin?check=1",
  },
  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
   
      if (user) {
        token.sub = user.id ?? token.sub;
        token.name = user.name ?? token.name;
        token.email = user.email ?? token.email;
        token.picture = user.image ?? token.picture;
      }

      
      /* if (token.sub) {
        try {
          const u = await prisma.user.findUnique({
            where: { id: token.sub },
            select: { creditsCents: true, name: true, image: true },
          });
          if (u) {
            (token as any).creditsCents = u.creditsCents;
            token.name = u.name ?? token.name;
            token.picture = u.image ?? token.picture;
          }
        } catch (err) {
        
          console.error("JWT callback prisma error", err);
        }
      } */
      return token;
    },

    async session({ session, token }) {
   
      if (session.user && token) {
        (session as any).creditsCents = (token as any).creditsCents ?? 0;
        session.user.name = token.name ?? session.user.name;
        session.user.image = (token as any).picture ?? session.user.image;
       
        (session.user as any).id = token.sub;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {

      if (url.startsWith("/")) return `${baseUrl}${url}`;
      try {
        if (new URL(url).origin === baseUrl) return url;
      } catch {
     
      }
      return baseUrl;
    },
  },

  events: {
    async createUser({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { creditsCents: { increment: WELCOME_CREDITS_CENTS } },
      });
    },
  },
};
