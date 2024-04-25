import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { env } from "@/lib/env";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const { userId } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    if (user.userStatus === "Authorized") {
      return NextResponse.json({
        status: 400,
        message: "User already authorized",
      });
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userStatus: "Authorized",
      },
    });
    return NextResponse.json({
      status: 200,
      message: "User authorized",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
