"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/db/prisma";

export async function applicationSignin(formData: FormData) {
  await signIn("sendgrid", formData, {
    redirectTo: "/application",
  });
}

export async function SignIn(formData: FormData) {
  await signIn("sendgrid", formData, {
    redirectTo: "/dashboard",
  });
}
