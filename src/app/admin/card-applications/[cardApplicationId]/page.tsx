"use server";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function CardApplicationDetails({
  params,
}: {
  params: { cardApplicationId: string };
}) {
  const cardApplicationId = params.cardApplicationId;
  const cardApplication = await prisma.cardApplication.findUnique({
    where: { id: cardApplicationId },
    include: { user: true, currentAddress: true },
  });

  if (!cardApplication) {
    return <div>Not Found</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Card Application Details</h1>
        <Link
          href="/admin/card-applications"
          className="text-blue-500 hover:underline"
        >
          Back to Applications
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">First Name:</span>
              <span className="ml-2">{cardApplication.user.first_name}</span>
            </div>
            <div>
              <span className="font-semibold">Last Name:</span>
              <span className="ml-2">{cardApplication.user.last_name}</span>
            </div>
            <div className="col-span-2">
              <span className="font-semibold">Email:</span>
              <span className="ml-2">{cardApplication.user.email}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Application Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Status:</span>
              <span className="ml-2">{cardApplication.status}</span>
            </div>
            <div>
              <span className="font-semibold">Created At:</span>
              <span className="ml-2">
                {cardApplication.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {cardApplication.currentAddress && (
          <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Address 1:</span>
                <span className="ml-2">
                  {cardApplication.currentAddress.address1}
                </span>
              </div>
              {cardApplication.currentAddress.address2 && (
                <div>
                  <span className="font-semibold">Address 2:</span>
                  <span className="ml-2">
                    {cardApplication.currentAddress.address2}
                  </span>
                </div>
              )}
              <div>
                <span className="font-semibold">City:</span>
                <span className="ml-2">
                  {cardApplication.currentAddress.city}
                </span>
              </div>
              <div>
                <span className="font-semibold">State:</span>
                <span className="ml-2">
                  {cardApplication.currentAddress.state}
                </span>
              </div>
              <div>
                <span className="font-semibold">State:</span>
                <span className="ml-2">
                  {cardApplication.currentAddress.zipCode}
                </span>
              </div>
            </div>
          </div>
        )}
        {cardApplication.mortgageAmount && (
          <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Mortgage Amount</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Monthly Payment:</span>
                <span className="ml-2">{cardApplication.mortgageAmount}</span>
              </div>
            </div>
          </div>
        )}
        {cardApplication.employmentStatus && (
          <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">Employment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">Employment Status: </span>
                <span className="ml-2">{cardApplication.employmentStatus}</span>
              </div>
              <div>
                <span className="font-semibold">Annual Income: </span>
                <span className="ml-2">{cardApplication.annualIncome}</span>
              </div>
              <div>
                <span className="font-semibold">Job Title: </span>
                <span className="ml-2">{cardApplication.jobTitle}</span>
              </div>
              <div>
                <span className="font-semibold">Company: </span>
                <span className="ml-2">{cardApplication.companyName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
