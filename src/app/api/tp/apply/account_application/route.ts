import { prisma } from "@/lib/db/prisma";
import { NextResponse, NextRequest } from "next/server";
import treasuryPrimeApiCall from "@/lib/helper/treasuryPrimeApiCall";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  // basically creates an account application in treasuryprime
  // and adds account to our database
  try {
    //   need to get product id from our database or TP and pass it here
    const account_product = await prisma.accountProduct.findFirst({});

    const body = await req.json();
    const { user_id } = body;

    const userInfo = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!userInfo) {
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });
    }

    const primary_person_application_id = userInfo.application_id;

    if (!primary_person_application_id) {
      return NextResponse.json({
        status: 404,
        message: "User do not have application_id.",
      });
    }
    // we might want to limit the number of account applications per user to just one!
    // if so need to  check if Account application exists for the user, alos create @unique constraint in account model
    const accountApplication = {
      account_product_id: account_product?.id,
      primary_person_application_id,
    };

    const result = await treasuryPrimeApiCall({
      req_type: "POST",
      url: "/apply/account_application",
      body: accountApplication,
      userId: user_id,
    });

    const response = await result?.json();
    let data = response.data;

    if (data.error) {
      console.log(data.error);
      return NextResponse.json({
        status: 500,
        message: data.error,
      });
    }

    data.userId = user_id;
    console.log(data);

    await prisma.account.create({
      data: data,
    });

    return NextResponse.json({
      status: 200,
      message: "Account Application created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  console.log(req.method, req.url);
  // GET method returns all account applications
  // we might want to use it to update all account statuses with this endpoint
  try {
    const result = await treasuryPrimeApiCall({
      req_type: "GET",
      url: `/apply/account_application`,
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
