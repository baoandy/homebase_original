"use server";
import { SignIn } from "@/components/Authentication/SignIn";
import SignOut from "@/components/Authentication/SignOut";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { Sign } from "crypto";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";
import { GoogleSignIn } from "@/components/Authentication/GoogleSignIn";

export default async function Application() {
  const session = await auth();

  const email = session?.user?.email;
  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) {
      const cardApplication = await prisma.cardApplication.findFirst({
        where: { userId: user.id },
      });
      if (cardApplication?.status === "CREATED") {
        redirect(`/application/${cardApplication.id}`);
      } else {
        redirect("/dashboard");
      }
    } else {
      await signOut({
        redirectTo: "/login",
      });
    }
  }
  let cardApplicationId = "";

  return (
    <div className="">
      {!session && (
        <>
          <SignIn />
          <div className="divider text-sm">Or Continue With</div>
          <GoogleSignIn redirectTo="/credit-card/home" />
        </>
      )}
    </div>
  );
}
