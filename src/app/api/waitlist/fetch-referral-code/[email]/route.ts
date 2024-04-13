import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } },
  res: NextResponse,
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
    return NextResponse.json({ status: 200, message: "Success", waitlist });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
