"use server";

import React from "react";
import HomeImg from "./HomeImg";
import PaymentHistory from "./PaymentHistory";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import TabDisplay from "./TabDisplay";
import HomeStat from "./HomeStats";
import Home from "../../page";

export default async function MortgageDetails() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const user = session.user;
  if (!user) {
    redirect("/login");
  }
  const cardApplication = await prisma.cardApplication.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!cardApplication || !cardApplication.currentAddressId) {
    redirect("/credit-card/apply");
  }
  const addressId = cardApplication.currentAddressId;
  const property = await prisma.rentCastPropertyData.findFirst({
    where: {
      addressId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const propVal = await prisma.rentCastPropertyValue.findFirst({
    where: {
      addressId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="flex justify-center bg-gray-100">
      <div className="flex w-full flex-col justify-between gap-8 overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Your Home Section */}
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="flex w-full max-w-lg flex-col">
            <h1 className="mb-4 text-3xl font-bold">Your Home</h1>
            <div className="rounded-lg bg-gray-100 p-6">
              <div className="flex flex-row items-center gap-4">
                <HomeImg />
                <div className="flex flex-col">
                  <h2 className="mb-2 text-xl font-semibold">Home Overview</h2>
                  <p className="mb-1 text-lg text-gray-900">
                    Mortgage Balance: $150,000.00
                  </p>
                  <p className="mb-1 text-lg text-gray-900">
                    Monthly Payment: $3,000.00
                  </p>
                  <p className="text-gray-600">30 Year Fixed Rate, 5.6%</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-lg ">
            <div className="grid grid-cols-2 gap-4 p-12">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Est. Value
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  <span className="text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(propVal?.price!)}
                  </span>
                </dd>
              </div>
              <div className=" rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Capital Gain
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  <span className="text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(propVal?.price! - property?.lastSalePrice!)}
                  </span>
                </dd>
              </div>
              <div className=" overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                  Equity
                </dt>
                <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  <span className="text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(propVal?.price! - 150000)}
                  </span>
                </dd>
              </div>
            </div>
          </div>
        </div>

        <TabDisplay equity={propVal?.price! - 150000} mortgage={150000} />
      </div>
    </div>
  );
}
