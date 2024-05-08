import { prisma } from "@/lib/db/prisma";
// import { addr_type } from "@prisma/client"; //
import treasuryPrimeApiCall from "@/lib/helper/treasuryPrimeApiCall";
import { NextRequest, NextResponse } from "next/server";

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
        // address: {
        //   where: { address_type: addr_type.Physical },
        //   select: {
        //     street_line_1: true,
        //     street_line_2: true,
        //     city: true,
        //     state: true,
        //     postal_code: true,
        //     country: true,
        //   },
        // },
      },
    });

    if (!userInfo) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }
    if (!userInfo.account) {
      return NextResponse.json({
        status: 400,
        message: "Account not found",
      });
    }
    if (!userInfo.application_id) {
      return NextResponse.json({
        status: 400,
        message: "Application not found",
      });
    }

    //   body: JSON.stringify({
    //     account_id: PersonInfo.account[0].id,
    //     card_product_id: 'tbd',
    //     person_id: PersonInfo.application_id
    //   }),
    const cardCreateBody = {
      account_id: userInfo.account[0].account_id,
      person_id: userInfo.application_id,
      card_product_id: "TBD",
    };

    const result = await treasuryPrimeApiCall({
      req_type: "POST",
      url: "/card",
      body: cardCreateBody,
      userId: user_id,
    });

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
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  try {
    const result = await treasuryPrimeApiCall({
      req_type: "GET",
      url: `/card`,
    });
    const response = await result?.json();
    const data = response.data;

    console.log(data);

    return NextResponse.json({
      status: 200,
      message: "List of Cards returned successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
