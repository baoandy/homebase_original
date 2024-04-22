"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";

import { env } from "@/lib/env";
import MortgageDetailsForm from "./MortgageDetailsForm";
import Image from "next/image";
import homeCleaners from "@/app/assets/Onboarding/homeCleaners.png";
import { onboardingRedirect } from "@/lib/helper/onboardingRedirect";

export default async function MortgageDetails({
  params,
}: {
  params: { cardApplicationId: string };
}) {
  const cardApplicationId = params.cardApplicationId;
  const cardApplication = await prisma.cardApplication.findUnique({
    where: { id: cardApplicationId },
    include: {
      currentAddress: true,
      user: true,
    },
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
  // onboardingRedirect(cardApplication);

  return (
    // <div className="mx-auto max-w-md p-4">
    //   <h1 className="mb-4 text-lg font-semibold">Mortgage Details</h1>
    //   <MortgageDetailsForm
    //     cardApplicationId={cardApplicationId}
    //     apiSecretKey={env.API_SECRET_KEY}
    //   />
    // </div>
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
          <section className="mt-24 flex grow flex-col px-5 max-md:mt-10 max-md:max-w-full">
            <MortgageDetailsForm
              cardApplicationId={cardApplicationId}
              apiSecretKey={env.API_SECRET_KEY}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
