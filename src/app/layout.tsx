import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Header from "@/components/LandingPage/Header";
import NoUserHeader from "@/components/LandingPage/NoUserHeader";
import Footer from "@/components/LandingPage/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import SignOut from "@/actions/signOut";
import Banner from "@/components/LandingPage/Banner";

const inter = Inter({ subsets: ["latin"] });

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
  let loggedInUser = false;
  let firstName = "";
  let lastName = "";
  let email = "";
  const session = await auth();
  if (session && session.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (user) {
      loggedInUser = true;
      firstName = user.first_name ? user.first_name : "";
      lastName = user.last_name ? user.last_name : "";
      email = session.user.email ? session.user.email : "";
    }
  }
  return (
    <html lang="en">
      <body className="flex flex-col items-center bg-white px-4 pb-20">
        <Banner />
        {/* <Header
          loggedInUser={loggedInUser}
          firstName={firstName}
          lastName={lastName}
          signOut={SignOut}
        /> */}
        <NoUserHeader />

        <SessionProvider>{children}</SessionProvider>
      </body>
      <GoogleAnalytics gaId="AW-16530188072" />
    </html>
  );
}
