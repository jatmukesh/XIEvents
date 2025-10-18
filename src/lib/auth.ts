import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // Fetch user from Prisma (include password explicitly)
        const user = (await prisma.user.findUnique({
          where: { email: credentials.email },
        })) as unknown as {
          id: number;
          name: string | null;
          role: string;
          email: string | null;
          password?: string | null;
        };

        // Verify password
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        // Return user without password (NextAuth User shape)
        const { password, ...safeUser } = user;
        return safeUser as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // Include id in the session object
    async session({ session, user }) {
      if (session.user) {
        session.user.id = Number(user.id); // number
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
