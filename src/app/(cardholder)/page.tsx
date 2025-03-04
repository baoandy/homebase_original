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
import PartnersCarusel from "@/components/LandingPage/PartnersCarusel";
import DisplayWaitListButton from "@/components/LandingPage/waitlist/DisplayWaitListButton";
import JoinWaitlistModal from "@/components/LandingPage/waitlist/JoinWaitListButton/JoinWaitListModal";
import Footer from "@/components/LandingPage/Footer";
import Disclaimer from "@/components/LandingPage/Disclaimer";

export default async function Home() {
  return (
    <main className="flex flex-col items-center bg-white px-4 pb-20">
      {/* <PageSEO title="Home page" /> this doesn't seem to change the title */}
      {/* <Header /> Moved this to Layout */}
      <Hero />
      <Features />
      <Core />
      <Wallet />
      <Clientsay />

      <div className="flex flex-row justify-center">
        <DisplayWaitListButton className="" apiSecretKey={env.API_SECRET_KEY} />
      </div>
      <Faq />
      <Disclaimer />
      <Footer />
    </main>
  );
}
