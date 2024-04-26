import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import Sendgrid from "next-auth/providers/sendgrid";
import EmailProvider from "next-auth/providers/email";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Sendgrid({
      from: "contact@yourhomebase.co",
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {},
});
