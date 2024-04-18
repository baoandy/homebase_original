import { prisma } from "@/lib/db/prisma";
import treasuryPrimeApiCall from "@/lib/helper/treasuryPrimeApiCall";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

// api returns the account application data from treasuryprime by account_id
// and updates the status in the database if it's different from the current status

export async function GET(
  req: NextApiRequest,
  { params }: { params: { account_id: string } },
) {
  console.log(req.method, req.url);
  try {
    const { account_id } = params;

    const result = await treasuryPrimeApiCall(
      "GET",
      `/apply/account_application/${account_id}`,
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
    
    const account = await prisma.account.findUnique({
        where: { id: account_id },
        select: { status: true }  // Select only the status field
      });
    
      // Check if the current status in the database is different from the new status
      if (account && account.status !== data.status) {
        // Update the status if it's different
        const updatedAccount = await prisma.account.update({
          where: { id: account_id },
          data: { status: data.status },
        });
        console.log('Updated account status:', updatedAccount);
      }


    return NextResponse.json({
      status: 200,
      message: "Account Application was found and returned successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
