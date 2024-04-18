import treasuryPrimeApiCall from "@/lib/helper/treasuryPrimeApiCall";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// this api returns the person application data from treasuryprime by application_id
// *** Retrieve a Person Application
// https://developers.sandbox.treasuryprime.com/docs/person-application#retrieve-a-person-application

export async function GET(
  req: NextApiRequest,
  { params }: { params: { application_id: string } },
) {
  console.log(req.method, req.url);

  try {
    const { application_id } = params;

    const result = await treasuryPrimeApiCall(
      "GET",
      `/apply/person_application/${application_id}`,
    );
    const response = await result?.json();
    const data = response.data;

    if (data.error) {
      console.log(data.error);
      return NextResponse.json({
        status: 500,
        message: data.error,
      });
    }

    console.log(data);

    return NextResponse.json({
      status: 200,
      message: "Person Application was found and returned successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
