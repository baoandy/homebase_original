import { prisma } from "@/lib/db/prisma";
import { addr_type } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import treasuryPrimeApiCall from "@/lib/helper/treasuryPrimeApiCall";

// this api crteates a person application in treasuryprime, once create we store the application_id in our database
// https://developers.sandbox.treasuryprime.com/docs/person-application#retrieve-a-person-application

// *** [POST] Create a Person Application
export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  try {
    const body = await req.json();
    const { user_id } = body;

    const userInfo = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      include: {
        account: true,
        address: {
          where: { address_type: addr_type.Physical },
          select: {
            street_line_1: true,
            street_line_2: true,
            city: true,
            state: true,
            postal_code: true,
            country: true,
          },
        },
      },
    });

    if (!userInfo) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    if (userInfo.application_id) {
      return NextResponse.json({
        status: 400,
        message: "Application already created for the user",
      });
    }

    const userApplication = {
      email_address: userInfo.email,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      citizenship: userInfo.citizenship,
      date_of_birth: userInfo.date_of_birth,
      phone_number: userInfo.phone_number,
      physical_address: userInfo.address[0],
      tin: userInfo.tin,
    };

    const result = await treasuryPrimeApiCall(
      "POST",
      "/apply/person_application",
      userApplication,
    );
    
    const response = await result?.json();
    const data = response.data;
    
    console.log(data);

    if (data.error) {
      console.log(data.error);
      return NextResponse.json({
        status: 500,
        message: data.error,
      });
    }

    if (data.id) {
      await prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          application_id: data.id,
        },
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Person Application created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}

// *** [GET] List All Person Applications
export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  try {
    
    const result = await treasuryPrimeApiCall(
      "GET",
      `/apply/person_application`,
    );
    const response = await result?.json();
    const data = response.data;

    console.log(data);

    return NextResponse.json({
      status: 200,
      message: "List of Applications returned successfully",
      data: data
    })

  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }

}