"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { env } from "@/lib/env";

export default async function PersonalDetails({
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
    <div>
      <h1 className="my-4 text-3xl font-semibold">About You</h1>
      <PersonalDetailsForm
        cardApplicationId={cardApplicationId}
        apiSecretKey={env.API_SECRET_KEY}
      />
    </div>
  );
}
