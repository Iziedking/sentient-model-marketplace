
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
  secret: process.env.NEXTAUTH_SECRET,

 
  callbacks: {
    async session({ session, token }) {
     
      if (token?.sub && session.user) {
        const u = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { creditsCents: true, name: true, image: true },
        });
        (session as any).creditsCents = u?.creditsCents ?? 0;
        session.user.name = u?.name ?? session.user.name;
        session.user.image = u?.image ?? session.user.image;
      }
      return session;
    },
  
    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
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
