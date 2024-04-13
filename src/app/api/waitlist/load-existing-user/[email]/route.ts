import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } },
) {
  try {
    const { email } = params;
    const waitlist = await prisma.waitlist.findUnique({
      where: { email: email },
    });
    if (!waitlist) {
      return NextResponse.json({
        status: 404,
        message: "Waitlist record not found",
      });
    }
    return NextResponse.json({ status: 200, message: "Success", waitlist });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
