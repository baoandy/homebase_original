"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";

import { env } from "@/lib/env";
import MortgageForm from "./MortgageAddressForm";

export default async function MortgageAddress({
  params,
}: {
  params: { cardApplicationId: string };
}) {
  const cardApplicationId = params.cardApplicationId;
  const cardApplication = await prisma.cardApplication.findUnique({
    where: { id: cardApplicationId },
    include: {
      currentAddress: true,
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

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-lg font-semibold">
        Is your mortgage for this address?
      </h1>
      <address className="mb-4 not-italic">
        {cardApplication.currentAddress?.address1}{" "}
        {cardApplication.currentAddress?.address2 &&
          `${cardApplication.currentAddress?.address2} `}
        <br />
        {cardApplication.currentAddress?.city},{" "}
        {cardApplication.currentAddress?.state}{" "}
        {cardApplication.currentAddress?.zipCode}
      </address>
      <MortgageForm
        cardApplicationId={cardApplicationId}
        googleApiKey={env.GOOGLE_PLACES_API_KEY}
        apiSecretKey={env.API_SECRET_KEY}
      />
    </div>
  );
}
