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
    const cardApplication = await prisma.cardApplication.findUnique({
      where: {
        id: cardApplicationId,
      },
    });
    if (!cardApplication || !cardApplication.currentAddressId) {
      return NextResponse.json({ status: 404, message: "Not Found" });
    }
    const address = await prisma.address.findFirst({
      where: {
        id: cardApplication.currentAddressId,
      },
    });
    if (!address) {
      return NextResponse.json({ status: 404, message: "Not Found" });
    }
    return NextResponse.json({
      status: 200,
      message: "Success",
      address,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
