"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import Link from "next/link";

export default async function ApplicationRedirectPage({
  params,
}: {
  params: { cardApplicationId: string };
}) {
  const cardApplicationId = params.cardApplicationId;
  const cardApplication = await prisma.cardApplication.findUnique({
    where: { id: cardApplicationId },
    include: {
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

  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-semibold">
          Welcome to Your Credit Journey
        </h1>
        <p className="mt-4 text-lg">
          Start your application for a new Credit Card with ease.
        </p>
      </header>
      <div className="flex flex-col items-center">
        <Link
          className="focus:shadow-outline rounded-lg bg-blue-600 px-12 py-3 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none"
          href={`/application/personal-details/${cardApplicationId}`}
        >
          Go to Application
        </Link>
      </div>
      <footer className="absolute bottom-4 w-full text-center text-sm">
        <p>Powered by Your Trusted Bank</p>
      </footer>
    </div>
  );
}
