import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const { cardApplicationId, address, unit, city, state, zipCode } =
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
    const mortgageAddress = await prisma.address.create({
      data: {
        userId: cardApplication.userId,
        address1: address,
        address2: unit,
        city,
        state,
        zipCode,
        country: "US",
      },
    });
    await prisma.cardApplication.update({
      where: { id: cardApplicationId },
      data: {
        mortgageAddressId: mortgageAddress.id,
      },
    });
    return NextResponse.json({ status: 200, message: "Success" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
