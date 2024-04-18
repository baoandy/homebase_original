"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";

import { env } from "@/lib/env";
import MortgageDetailsForm from "./MortgageDetailsForm";

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
      <h1 className="mb-4 text-lg font-semibold">Mortgage Details</h1>
      <MortgageDetailsForm
        cardApplicationId={cardApplicationId}
        apiSecretKey={env.API_SECRET_KEY}
      />
    </div>
  );
}
