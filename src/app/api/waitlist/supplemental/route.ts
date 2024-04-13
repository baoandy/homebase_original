import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const {
      email,
      monthlyMortgageAmount,
      mortgageOriginator,
      maritalStatus,
      employmentStatus,
      homeType,
    } = await req.json();
    const waitlist = await prisma.waitlist.update({
      where: { email: email },
      data: {
        monthlyMortgageAmount,
        mortgageOriginator,
        maritalStatus,
        employmentStatus,
        homeType,
      },
    });
    // check if response is fine
    if (!waitlist) {
      return NextResponse.json({
        status: 400,
        message: "Error updating waitlist",
      });
    }
    return NextResponse.json({ status: 200, message: "Success" });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
