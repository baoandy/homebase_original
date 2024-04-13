"use server";
import Image from "next/image";
import { env } from "@/lib/env";

import Hero from "@/components/LandingPage/Hero";
import Features from "@/components/LandingPage/Features";
import Core from "@/components/LandingPage/Core";
import Faq from "@/components/LandingPage/Faq";
import Wallet from "@/components/LandingPage/Wallet";
import Clientsay from "@/components/LandingPage/Clientsay";
import WaitListButton from "@/components/LandingPage/waitlist/WaitListButton";

export default async function Home() {
  return (
    <>
      {/* <PageSEO title="Home page" /> this doesn't seem to change the title */}
      {/* <Header /> Moved this to Layout */}
      <Hero />
      <Features />
      <Core />
      <Wallet />
      <Clientsay />
      <WaitListButton className="px-7" apiSecretKey={env.API_SECRET_KEY} />
      <Faq />
    </>
  );
}
