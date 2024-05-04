"use server";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import CreatePersonApplication from "./CreatePersonApplication";
import CreateCheckingApplication from "./CreateCheckingAccount";
import ApproveApplication from "./ApproveApplication";
import { env } from "@/lib/env";
import CreateSavingsApplication from "./CreateSavingsAccount";
import RefreshAccountStatus from "./RefreshAccountStatus";
import ActivateUser from "./ActivateUser";
import RentCastGetProperty from "@/components/PropertyActions/RentCastGetProperty";
import { redirect } from "next/navigation";

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

  if (!cardApplication || !cardApplication.currentAddress) {
    return <div>Not Found</div>;
  }
  const checkingAccount = await prisma.accountApplication.findFirst({
    where: {
      userId: cardApplication.userId,
      accountType: "checking",
    },
  });
  const savingsAccount = await prisma.accountApplication.findFirst({
    where: {
      userId: cardApplication.userId,
      accountType: "savings",
    },
  });
  const personApplication = await prisma.personApplication.findFirst({
    where: {
      userId: cardApplication.userId,
    },
  });

  const rentCastData = await prisma.rentCastPropertyData.findFirst({
    where: {
      addressId: cardApplication.currentAddress.id,
    },
  });

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
            <div>
              <RentCastGetProperty
                addressId={cardApplication.currentAddress.id}
                apiSecretKey={env.API_SECRET_KEY}
              />
            </div>
          </div>
        )}
        {rentCastData && (
          <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">RentCast Data</h2>
            <div>
              <span className="font-semibold">Pulled on:</span>
              <span className="ml-2">
                {rentCastData.createdAt.toDateString()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold">RentCast ID:</span>
                <span className="ml-2">{rentCastData.rentCastId}</span>
              </div>
              <div>
                <span className="font-semibold">Formatted Address:</span>
                <span className="ml-2">{rentCastData.formattedAddress}</span>
              </div>
              <div>
                <span className="font-semibold">Property Type:</span>
                <span className="ml-2">{rentCastData.propertyType}</span>
              </div>
              <div>
                <span className="font-semibold">Bedrooms:</span>
                <span className="ml-2">{rentCastData.bedrooms}</span>
                <br />
                <span className="font-semibold">Bathrooms:</span>
                <span className="ml-2">{rentCastData.bathrooms}</span>
              </div>
              <div>
                <span className="font-semibold">Latitude:</span>
                <span className="ml-2">{rentCastData.latitude}</span>
                <br />
                <span className="font-semibold">Longitude:</span>
                <span className="ml-2">{rentCastData.longitude}</span>
              </div>
              <div>
                <span className="font-semibold">County:</span>
                <span className="ml-2">{rentCastData.county}</span>
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

        <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Actions</h2>
          <div className="flex items-center justify-between">
            {cardApplication.status === "SUBMITTED" && (
              <ApproveApplication
                userId={cardApplication.userId}
                cardApplicationId={cardApplication.id}
                apiSecretKey={env.API_SECRET_KEY}
              />
            )}
            {cardApplication.status === "APPROVED" && !personApplication && (
              <CreatePersonApplication
                userId={cardApplication.userId}
                cardApplicationId={cardApplication.id}
                apiSecretKey={env.API_SECRET_KEY}
              />
            )}
            {cardApplication.status === "APPROVED" &&
              personApplication &&
              !checkingAccount && (
                <CreateCheckingApplication
                  userId={cardApplication.userId}
                  cardApplicationId={cardApplication.id}
                  apiSecretKey={env.API_SECRET_KEY}
                />
              )}
            {cardApplication.status === "APPROVED" &&
              personApplication &&
              !savingsAccount && (
                <CreateSavingsApplication
                  userId={cardApplication.userId}
                  cardApplicationId={cardApplication.id}
                  apiSecretKey={env.API_SECRET_KEY}
                />
              )}

            {cardApplication.status === "SUBMITTED" && (
              <button className="btn-danger btn">Reject</button>
            )}
            {cardApplication.status === "APPROVED" &&
              cardApplication.user.userStatus === "Unauthorized" &&
              personApplication &&
              checkingAccount &&
              savingsAccount && (
                <ActivateUser
                  userId={cardApplication.userId}
                  apiSecretKey={env.API_SECRET_KEY}
                />
              )}
          </div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Aplications</h2>
          <div className="flex flex-col items-start justify-between">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Application ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Application Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {}
                {Array.from({
                  length: 10,
                }).map((_, index) => (
                  <tr key={index} className="border-b bg-white">
                    <td className="px-6 py-4">Plumbing</td>
                    <td className="px-6 py-4">
                      28/03/2024 (10:00 AM - 11:30 AM)
                    </td>
                    <td className="px-6 py-4">XYZ Plumbing Services</td>
                    <td className="px-6 py-4">$150</td>
                  </tr>
                ))} */}
                {personApplication && (
                  <tr className="border-b bg-white">
                    <td className="px-6 py-4">
                      {personApplication.tp_person_id}
                    </td>
                    <td className="px-6 py-4">Person</td>
                    <td className="px-6 py-4">
                      {personApplication.created_at.toLocaleDateString()}{" "}
                      {personApplication.created_at.toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                    </td>
                    <td className="px-6 py-4">Submitted</td>
                  </tr>
                )}
                {checkingAccount && (
                  <tr className="border-b bg-white">
                    <td className="px-6 py-4">{checkingAccount.id}</td>
                    <td className="px-6 py-4">Checking</td>
                    <td className="px-6 py-4">
                      {checkingAccount.created_at.toLocaleDateString()}{" "}
                      {checkingAccount.created_at.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">{checkingAccount.status}</td>
                    <td className="px-6 py-4">
                      <RefreshAccountStatus
                        userId={cardApplication.userId}
                        account_id={checkingAccount.id}
                        apiSecretKey={env.API_SECRET_KEY}
                      />
                    </td>
                  </tr>
                )}
                {savingsAccount && (
                  <tr className="border-b bg-white">
                    <td className="px-6 py-4">{savingsAccount.id}</td>
                    <td className="px-6 py-4">Savings</td>
                    <td className="px-6 py-4">
                      {savingsAccount.created_at.toLocaleDateString()}{" "}
                      {savingsAccount.created_at.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-6 py-4">{savingsAccount.status}</td>
                    <td className="px-6 py-4">
                      <RefreshAccountStatus
                        userId={cardApplication.userId}
                        account_id={savingsAccount.id}
                        apiSecretKey={env.API_SECRET_KEY}
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
