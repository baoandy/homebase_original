"use server";
import { SignIn } from "@/components/Authentication/ApplicationSignIn";
import SignOut from "@/components/Authentication/SignOut";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/Authentication/GoogleSignIn";

export default async function Business() {
  const session = await auth();
  const email = session?.user?.email;
  return (
    <div>
      {!session && (
        <>
          <SignIn />
          <div className="divider text-sm">Or Continue With</div>
          <GoogleSignIn redirectTo="/business" />
        </>
      )}
      {session && <SignOut />}
    </div>
  );
}
