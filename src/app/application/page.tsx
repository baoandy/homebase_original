"use server";
import { SignIn } from "@/components/Authentication/SignIn";
import SignOut from "@/components/Authentication/SignOut";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { Sign } from "crypto";
import { redirect } from "next/navigation";

export default async function Application() {
  const session = await auth();

  const email = session?.user?.email;
  let cardApplicationId = "";
  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const cardApplication = await prisma.cardApplication.findFirst({
        where: { userId: user.id },
      });
      if (cardApplication) {
        cardApplicationId = cardApplication.id;
      } else {
        const newCardApplication = await prisma.cardApplication.create({
          data: {
            userId: user.id,
            status: "CREATED",
          },
        });
        cardApplicationId = newCardApplication.id;
      }
    }
  }
  if (cardApplicationId) {
    redirect(`/application/${cardApplicationId}`);
  }
  return (
    <div>
      <h1>Application Page</h1>
      {!session && <SignIn />}
      {session && <SignOut />}
    </div>
  );
}
