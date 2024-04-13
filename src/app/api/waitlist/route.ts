import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/db/prisma";
import sgMail from "@sendgrid/mail";
import { env } from "@/lib/env";
import { generateReferralCode } from "@/lib/helper/utilFunctions";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Check if the request is authorized\
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    // Parse the request body
    const { firstName, lastName, email, phoneNumber, zipCode, referredByCode } =
      await req.json();
    // Check if the user is already on the waitlist
    const existingRecord = await prisma.waitlist.findUnique({
      where: { email: email },
    });
    if (existingRecord) {
      return NextResponse.json({ status: 100, message: "Already on waitlist" });
    }
    // Generate a unique referral code
    let referralCode: string = "";
    while (true) {
      referralCode = generateReferralCode();
      const existingReferralCode = await prisma.waitlist.findUnique({
        where: { referralCode: referralCode },
      });
      if (!existingReferralCode) {
        break;
      }
    }
    const isValidReferralCode = await prisma.waitlist.findUnique({
      where: { referralCode: referredByCode },
    });

    // Create a new waitlist record
    const response = await prisma.waitlist.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        zipCode: zipCode,
        referredBy: isValidReferralCode ? referredByCode : null,
        referralCode: referralCode,
      },
    });
    // Send email to user
    const msg = {
      to: email,
      from: "contact@yourhomebase.co",
      templateId: "d-730ec1466c9b4a298ecf5cf401ba3728",
      dynamicTemplateData: {
        referralCode: referralCode,
        firstName: firstName,
      },
    };
    await sgMail.send(msg);
    // Send email to inform referrer
    if (isValidReferralCode) {
      const referrer = await prisma.waitlist.findUnique({
        where: { referralCode: referredByCode },
      });
      const totalReferrals = await prisma.waitlist.findMany({
        where: { referredBy: referredByCode },
      });
      let points = 0;
      isValidReferralCode.referredBy ? (points += 500) : (points += 250);
      if (isValidReferralCode.monthlyMortgageAmount) points += 250;
      totalReferrals.length > 1000
        ? (points += 1000 * 500)
        : (points += totalReferrals.length * 500);
      const msg = {
        to: isValidReferralCode.email,
        from: "contact@yourhomebase.co",
        templateId: "d-609d6138b26941b9a888282a596ffff3",
        dynamicTemplateData: {
          firstName: isValidReferralCode.firstName,
          pointsTotal: points,
        },
      };
      await sgMail.send(msg);
    }
    return NextResponse.json({ status: 200, message: "Success", referralCode });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
