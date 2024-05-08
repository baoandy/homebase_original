import { prisma } from "@/lib/db/prisma";
// import { addr_type } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import treasuryPrimeApiCall from "@/lib/helper/treasuryPrimeApiCall";
import { env } from "@/lib/env";
import { decrypt } from "@/lib/helper/encrypt";
import getStateAbbreviation from "@/lib/helper/stateMapper";

// this api crteates a person application in treasuryprime, once create we store the application_id in our database
// https://developers.sandbox.treasuryprime.com/docs/person-application#retrieve-a-person-application

// *** [POST] Create a Person Application
export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  try {
    const secretKey = req.headers.get("secretKey");
    if (secretKey !== env.API_SECRET_KEY) {
      return NextResponse.json({ status: 403, message: "Unauthorized" });
    }
    const { user_id, cardApplicationId } = await req.json();
    const cardApplication = await prisma.cardApplication.findUnique({
      where: {
        id: cardApplicationId,
      },
      include: {
        user: true,
        currentAddress: true,
      },
    });
    if (
      !cardApplication ||
      !cardApplication.user ||
      !cardApplication.currentAddress ||
      !cardApplication.ssid ||
      !cardApplication.user.email ||
      !cardApplication.user.first_name ||
      !cardApplication.user.last_name ||
      !cardApplication.user.citizenship ||
      !cardApplication.user.date_of_birth ||
      !cardApplication.user.phone_number ||
      !cardApplication.currentAddressId
    ) {
      return NextResponse.json({
        status: 404,
        message: "Insufficient data to create application",
      });
    }

    if (cardApplication.user.application_id) {
      return NextResponse.json({
        status: 400,
        message: "Application already created for the user",
      });
    }

    const userApplication = {
      email_address: cardApplication.user.email,
      first_name: cardApplication.user.first_name,
      last_name: cardApplication.user.last_name,
      citizenship: cardApplication.user.citizenship,
      date_of_birth: cardApplication.user.date_of_birth,
      phone_number: cardApplication.user.phone_number,
      physical_address: {
        street_line_1: cardApplication.currentAddress.address1,
        street_line_2: cardApplication.currentAddress.address2,
        city: cardApplication.currentAddress.city,
        state: getStateAbbreviation(cardApplication.currentAddress.state),
        country: cardApplication.currentAddress.country,
        postal_code: cardApplication.currentAddress.zipCode,
      },
      tin: decrypt(cardApplication.ssid!),
    };

    const response = await treasuryPrimeApiCall({
      req_type: "POST",
      url: "/apply/person_application",
      body: userApplication,
      userId: user_id,
    });

    const { status, message, data } = await response?.json();
    if (data.error) {
      console.log(data.error);
      return NextResponse.json({
        status: 500,
        message: data.error,
      });
    } else {
      if (data.id) {
        await prisma.user.update({
          where: {
            id: cardApplication.user.id,
          },
          data: {
            application_id: data.id,
          },
        });
        const personApplication = await prisma.personApplication.create({
          data: {
            userId: cardApplication.user.id,
            tp_person_id: data.id,
            cardApplicationId: cardApplicationId,
            first_name: userApplication.first_name,
            last_name: userApplication.last_name,
            email_address: userApplication.email_address,
            citizenship: userApplication.citizenship,
            date_of_birth: userApplication.date_of_birth,
            phone_number: userApplication.phone_number,
            physical_address_id: cardApplication.currentAddressId,
          },
        });
      }
      // if (data.id) {
      //   await prisma.user.update({
      //     where: {
      //       id: user_id,
      //     },
      //     data: {
      //       application_id: data.id,
      //     },
      //   });
      // }
      return NextResponse.json({
        status: 200,
        message: "Person Application created successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}

// *** [GET] List All Person Applications
export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  try {
    const result = await treasuryPrimeApiCall({
      req_type: "GET",
      url: `/apply/person_application`,
    });
    const response = await result?.json();
    const data = response.data;

    console.log(data);

    return NextResponse.json({
      status: 200,
      message: "List of Applications returned successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
