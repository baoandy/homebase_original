import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeBase",
  description: "Credit Card Innovation to PayOff Mortgage Debt",
};

interface Window {
  dataLayer: any[];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center bg-white px-4 pb-20">
        <Header
        // loggedInUser={loggedInUser}
        />
        <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
      <GoogleAnalytics gaId="AW-16530188072" />
    </html>
  );
}
