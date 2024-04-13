import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const email = params.email;
    const waitlist = await prisma.waitlist.findUnique({
      where: { email: email },
    });
    if (!waitlist) {
      return NextResponse.json({
        status: 404,
        message: "Waitlist record not found",
      });
    }
    const referrals = await prisma.waitlist.findMany({
      where: { referredBy: waitlist.referralCode },
    });
    let points = 0;
    waitlist.referredBy ? (points += 500) : (points += 250);
    if (waitlist.monthlyMortgageAmount) points += 250;
    referrals.length > 1000
      ? (points += 1000 * 500)
      : (points += referrals.length * 500);
    return NextResponse.json({ status: 200, message: "Success", points });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
