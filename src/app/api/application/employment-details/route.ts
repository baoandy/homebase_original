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
      cardApplicationId,
      employmentStatus,
      annualIncome,
      companyName,
      jobTitle,
    } = await req.json();
    const cardApplication = await prisma.cardApplication.findUnique({
      where: {
        id: cardApplicationId,
      },
    });
    if (!cardApplication) {
      return NextResponse.json({ status: 404, message: "Not Found" });
    }
    await prisma.cardApplication.update({
      where: {
        id: cardApplicationId,
      },
      data: {
        employmentStatus,
        annualIncome: Number(annualIncome),
        companyName,
        jobTitle,
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
