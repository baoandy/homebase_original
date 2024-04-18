"use server";

import BookTransferBnt from "./BookTransferBnt";
import GetAccINfo from "./GetAccInfo";
import GetAccBalance from "./GetAccBalance";
import { prisma } from "@/lib/db/prisma";
import { addr_type } from "@prisma/client";
import PersonData from "./PersonData";

export default async function TpPage() {
  const user = await prisma.user.findUnique({
    where: {
      id: "32d6f02b-7c71-4361-bbf1-4a45b4a0e92b",
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

  // console.log(user);

  return (
    <div className="flex  flex-col items-center gap-4">
      <h1>TP Page</h1>
      <div className="flex gap-4">
        <BookTransferBnt buttonText="Transfer $99.00 [POST]" />
        <GetAccINfo buttonText="Get Account Info [GET]" />
        <GetAccBalance buttonText="Get Account Balance [GET]" />
      </div>
      <div className="flex w-full gap-4">
        <PersonData PersonInfo={user} />
      </div>
    </div>
  );
}
