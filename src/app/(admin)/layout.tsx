import type { Metadata } from "next";
import "@/app/globals.css";

import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import SessionProvider from "@/app/SessionProvider";
import SignOut from "@/actions/signOut";

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
      account: true,
    },
  });
  if (!user || !user.AdminUser) {
    redirect("/signin");
  }
  const firstName = user.first_name ? user.first_name : "";
  const lastName = user.last_name ? user.last_name : "";
  const name =
    user.account && user.name ? user.name : `${firstName} ${lastName}`;
  return (
    <html lang="en">
      {/* <body className="flex flex-col items-center bg-white px-4 pb-20"> */}
      <body>
        <Header loggedInUser={true} name={name} signOut={SignOut} />
        {/* Switch between header for deployment */}
        {/* <NoUserHeader /> */}

        <SessionProvider>{children}</SessionProvider>
      </body>
      <GoogleAnalytics gaId="AW-16530188072" />
    </html>
  );
}
