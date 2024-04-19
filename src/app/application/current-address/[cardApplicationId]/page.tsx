"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import CurrentAddressForm from "./CurrentAddressForm";

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
    <div className="w-full">
      <h1 className="my-4 text-center text-3xl font-semibold">
        Current Address
      </h1>
      <CurrentAddressForm
        googleApiKey={env.GOOGLE_PLACES_API_KEY}
        cardApplicationId={cardApplicationId}
        apiSecretKey={env.API_SECRET_KEY}
      />
    </div>
  );
}
