"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import CurrentAddressForm from "./CurrentAddressForm";
import Image from "next/image";
import homeCleaners from "@/app/assets/Onboarding/homeCleaners.png";

import { env } from "@/lib/env";

export default async function CurrentAddress({
  params,
}: {
  params: { cardApplicationId: string };
}) {
  const cardApplicationId = params.cardApplicationId;
  const cardApplication = await prisma.cardApplication.findUnique({
    where: { id: cardApplicationId },
  });
  if (!cardApplication) {
    redirect("/application");
  }
  const user = await prisma.user.findUnique({
    where: { id: cardApplication.userId },
  });
  const session = await auth();
  if (!session || !user || session.user?.email !== user.email) {
    redirect("/application");
  }
  return (
    <main className="mt-20 w-full max-w-[1360px] self-center max-md:mt-10 max-md:max-w-full">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex w-[58%] flex-col max-md:ml-0 max-md:w-full">
          <Image
            src={homeCleaners}
            alt="Decorative image"
            className="aspect-square w-full max-md:mt-10 max-md:max-w-full"
          />
        </div>
        <div className="ml-5 flex w-[42%] flex-col max-md:ml-0 max-md:w-full">
          <section className=" flex grow flex-col px-5 max-md:mt-10 max-md:max-w-full">
            <CurrentAddressForm
              cardApplicationId={cardApplicationId}
              apiSecretKey={env.API_SECRET_KEY}
              googleApiKey={env.GOOGLE_PLACES_API_KEY}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
