import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function GET(
  req: NextRequest,
  { params }: { params: { cardApplicationId: string } },
) {
  try {
    const secretKey = req.headers.get("secretKey");

    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const cardApplicationId = params.cardApplicationId;

    const personalDetails = await prisma.cardApplication.findUnique({
      where: {
        id: cardApplicationId,
      },
    });
    if (!personalDetails) {
      return NextResponse.json({ status: 404, message: "Not Found" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: personalDetails.userId,
      },
    });
    if (!user) {
      return NextResponse.json({ status: 404, message: "Not Found" });
    }
    return NextResponse.json({
      status: 200,
      message: "Success",
      user,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
