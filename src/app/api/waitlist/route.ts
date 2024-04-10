import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/db/prisma";
import sgMail from "@sendgrid/mail";
import { env } from "@/lib/env";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("POST /api/waitlist");
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const { firstName, lastName, email, zipCode } = await req.json();
    const existingRecord = await prisma.waitlist.findUnique({
      where: { email: email },
    });
    if (existingRecord) {
      return NextResponse.json({ status: 400, message: "Already on waitlist" });
    }
    const response = await prisma.waitlist.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        zipCode: zipCode,
      },
    });
    const msg = {
      to: email,
      from: "contact@yourhomebase.co",
      templateId: "d-730ec1466c9b4a298ecf5cf401ba3728",
    };
    await sgMail.send(msg);
    return NextResponse.json({ status: 200, message: "Success" });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
