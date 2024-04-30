"use server";
import { SignIn } from "@/components/Authentication/ApplicationSignIn";
import SignOut from "@/components/Authentication/SignOut";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { Sign } from "crypto";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/Authentication/GoogleSignIn";

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
      {!session && (
        <>
          <SignIn />
          <div className="divider text-sm">Or Continue With</div>
          <GoogleSignIn redirectTo="/application" />
        </>
      )}
      {session && <SignOut />}
    </div>
  );
}
