import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import Sendgrid from "next-auth/providers/sendgrid";
import EmailProvider from "next-auth/providers/email";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png",
    brandColor: "#366871",
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Sendgrid({
      from: "contact@yourhomebase.co",
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {},
});
