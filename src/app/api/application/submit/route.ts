import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";
import { encrypt, decrypt } from "@/lib/helper/encrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const { cardApplicationId, ssId } = await req.json();
    const cardApplication = await prisma.cardApplication.findUnique({
      where: { id: cardApplicationId },
    });
    if (!cardApplication || !ssId) {
      return NextResponse.json({ status: 404, message: "Not Found" });
    }
    const SSID = ssId.split("-").join("");
    const encryptedSsId = encrypt(SSID);

    await prisma.cardApplication.update({
      where: { id: cardApplicationId },
      data: { ssid: encryptedSsId, status: "SUBMITTED" },
    });
    return NextResponse.json({ status: 200, message: "Success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
