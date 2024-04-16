import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const { cardApplicationId, firstName, lastName, phoneNumber, dateOfBirth } =
      await req.json();
    const cardApplication = await prisma.cardApplication.findUnique({
      where: { id: cardApplicationId },
    });
    if (!cardApplication) {
      return NextResponse.json({
        status: 404,
        message: "Card application not found",
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: cardApplication.userId },
    });
    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }
    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
      },
    });
    return NextResponse.json({ status: 200, message: "Success" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
