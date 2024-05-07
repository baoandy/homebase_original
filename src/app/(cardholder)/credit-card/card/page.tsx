// "use server";
"use client";

import TransactionTable from "@/components/CreditCard/Transactions/TransactionTable";
import Link from "next/link";
import creditCardImg from "@/app/assets/Home/img/creditCardImg.png";
import Image from "next/image";
import SpendPie from "./SpendPie";
// import { auth } from "@/auth";
// import { prisma } from "@/lib/db/prisma";
// import { redirect } from "next/navigation";

// import { RentCastPropertyData } from "@prisma/client";
// import RentCastGetProperty from "@/components/PropertyActions/RentCastGetProperty";

// export default async function CreditCardHome() {
//   const session = await auth();
//   let rentCastData: RentCastPropertyData | null = null;
//   if (!session || !session.user || !session.user.email) {
//     redirect("/signin");
//   }
//   console.log("session", session);
//   const cardApplication = await prisma.cardApplication.findFirst({
//     where: {
//       userId: session.user.id,
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   if (!cardApplication || !cardApplication.currentAddressId) {
//   } else {
//     rentCastData = await prisma.rentCastPropertyData.findFirst({
//       where: {
//         addressId: cardApplication?.currentAddressId,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   }

//   return (
//     <div className="flex flex-col items-center bg-white px-4 pb-20">
//       <h1 className="text-3xl font-bold text-center mt-8">
//         Credit Card Home
//       </h1>
//     </div>
//   );
// }

import { Fragment, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
  HomeIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";

const recentActivity = [
  {
    id: 1,
    type: "Mortgage Payment",
    amount: 1000,
    date: "2024-05-01",
  },
  {
    id: 2,
    type: "Card Payment",
    amount: 1500,
    date: "2024-04-15",
  },
  {
    id: 3,
    type: "Mortgage Payment",
    amount: 1000,
    date: "2024-04-01",
  },
  {
    id: 4,
    type: "Card Payment",
    amount: 1450,
    date: "2024-03-12",
  },
  {
    id: 5,
    type: "Mortgage Payment",
    amount: 1000,
    date: "2024-03-01",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const statementDay = 22;
  const transactions = [
    ...Array.from({ length: 104 }, (_, i) => ({
      transactionType: "credit",
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      postedDate: new Date(new Date().setDate(new Date().getDate() - i)),
      transaction: "Transaction Detail",
      merchant: "Merchant",
      merchantCategory: "Merchant Category",
      amount: 100,
      balance: 1000 - i * 100,
    })),
  ];

  return (
    <>
      <main>
        <div className="flex w-full items-center gap-x-6 bg-primary py-4 sm:px-3.5 sm:before:flex-1">
          <div className="absolute left-0 top-0 h-full  animate-pulse bg-white"></div>
          <div className="mx-auto flex w-full items-center justify-center gap-x-4">
            <span className="animate-bounce rounded bg-white px-2 py-0.5 font-bold text-primary">
              Congrats!
            </span>
            <p className="text-sm leading-6 text-white">
              <a href="#">
                <strong className="font-semibold">HomeBase</strong>
                <svg
                  viewBox="0 0 2 2"
                  className="mx-2 inline h-0.5 w-0.5 fill-current"
                  aria-hidden="true"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                You Earned 1,000 Points in April!
              </a>
            </p>
          </div>
          <div className="flex flex-1 justify-end"></div>
        </div>
        <header className="relative isolate pt-16">
          <div
            className="absolute inset-0 -z-10 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute left-16 top-full -mt-16 transform-gpu opacity-50 blur-3xl xl:left-1/2 xl:-ml-80">
              <div
                className="aspect-[1154/678] w-[72.125rem] bg-gradient-to-br from-primary to-green-200"
                style={{
                  clipPath:
                    "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                }}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
          </div>

          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-2xl items-center justify-evenly gap-x-8 lg:mx-0 lg:max-w-none">
              <div className="flex items-center gap-x-6">
                <h1>
                  <div className="flex flex-row gap-4 text-sm leading-6 text-gray-500">
                    <Image src={creditCardImg} alt="Credit Card" height={150} />
                    <div className="flex flex-col">
                      <div className="mt-1 text-base font-semibold leading-6 text-gray-900">
                        HomeBase Mortgage Rewards Card - x4298
                      </div>
                      <p className="text-sm text-gray-700">
                        Statement Closing{" "}
                        <span className="font-bold">05/22</span>
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-500">
                              Available Credit
                            </p>
                            <p className="text-2xl font-bold text-gray-800">
                              $7,275.00
                            </p>
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-gray-500">
                              Credit Limit
                            </p>
                            <p className="text-lg font-medium text-gray-800">
                              $10,000.00
                            </p>
                          </div>
                        </div>
                        <div className="w-full px-4 ">
                          <div className="mb-8">
                            <div className="bg-stroke dark:bg-dark-3 relative h-2.5 w-full rounded-2xl border-2">
                              <div className="absolute left-0 top-0 h-full w-1/4 rounded-2xl bg-primary"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <div className="lg:col-start-3 lg:row-end-1">
              <h2 className="sr-only">Summary</h2>
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Current Balance
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      $725.00
                    </dd>
                  </div>
                </dl>
                <dl className="flex flex-wrap py-2">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Statement Balance{" "}
                    </dt>
                    <span className="text-sm">Period Ended Apr. 22</span>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      $1,500.00
                    </dd>
                  </div>
                  <div className="flex-none self-end px-6 pt-4">
                    <dt className="sr-only">Status</dt>
                    <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                      Paid
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="-mx-4 flex flex-col px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <div className="mb-4 lg:col-start-3">
                <h2 className="mb-4 text-sm font-semibold leading-6 text-gray-900">
                  Spending Summary
                </h2>
                <SpendPie />
              </div>
              <TransactionTable
                transactions={transactions}
                statementDay={statementDay}
                showOnlyRecent={true}
              />
              <Link
                href="/credit-card/transactions"
                className="mt-6 block self-center text-sm font-semibold leading-6 text-primary hover:text-green-900"
              >
                View All Transactions
              </Link>
            </div>

            <div className="lg:col-start-3">
              <h2 className="text-sm font-semibold leading-6 text-gray-900">
                Payment Activity
              </h2>
              <ul role="list" className="mt-6 space-y-6">
                {recentActivity.map((activityItem, activityItemIdx) => (
                  <li key={activityItem.id} className="relative flex gap-x-4">
                    <div
                      className={classNames(
                        activityItemIdx === recentActivity.length - 1
                          ? "h-6"
                          : "-bottom-6",
                        "absolute left-0 top-0 flex w-6 justify-center",
                      )}
                    >
                      <div className="w-px bg-gray-200" />
                    </div>
                    <>
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
                        {activityItem.type === "Mortgage Payment" ? (
                          <HomeIcon
                            className="h-6 w-6 text-primary"
                            aria-hidden="true"
                          />
                        ) : (
                          <CreditCardIcon
                            className="h-6 w-6 text-primary"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {activityItem.type}
                        </span>{" "}
                        {"$" + activityItem.amount.toFixed(2)}
                      </p>
                      <time
                        dateTime={activityItem.date}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {activityItem.date}
                      </time>
                    </>
                  </li>
                ))}
              </ul>
              <Link
                href="/credit-card/transactions"
                className="mt-6 block self-center text-sm font-semibold leading-6 text-primary hover:text-green-900"
              >
                Payment History
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
