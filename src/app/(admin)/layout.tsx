import type { Metadata } from "next";

import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "HomeBase",
  description: "Credit Card Innovation to PayOff Mortgage Debt",
};

interface Window {
  dataLayer: any[];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) {
    redirect("/signin");
  }
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      AdminUser: true,
    },
  });
  if (!user || !user.AdminUser) {
    redirect("/signin");
  }

  return <>{children}</>;
}
