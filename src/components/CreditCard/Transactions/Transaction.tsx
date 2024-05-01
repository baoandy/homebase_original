"use client";

import { toZonedTime } from "date-fns-tz";

import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import { Minus } from "lucide-react";

interface TransactionProps {
  transaction: {
    transactionType: string;
    date: Date;
    postedDate: Date;
    transaction: string;
    merchant: string;
    merchantCategory: string;
    amount: number;
    balance: number;
  };
}

export default function Transaction({ transaction }: TransactionProps) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const purchaseDate = toZonedTime(transaction.date, timezone);
  const postedDate = toZonedTime(transaction.postedDate, timezone);
  return (
    <tr>
      <td className="hidden py-5 pr-6 sm:table-cell">
        <div className="text-sm leading-6 text-gray-900">{}</div>
        <div className="mt-1 text-xs leading-5 text-gray-500">
          {purchaseDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </td>

      <td className="relative py-5 pr-6">
        <div className="flex gap-x-6">
          <div className="flex-auto">
            <div className="flex items-start gap-x-3">
              <div className="text-sm font-medium leading-6 text-gray-900">
                {transaction.transaction}
              </div>
              {transaction.transactionType === "debit" && (
                <div className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {transaction.transactionType}
                </div>
              )}
              {transaction.transactionType === "credit" && (
                <div className="rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                  {transaction.transactionType}
                </div>
              )}
            </div>
            {transaction.merchant ? (
              <div className="mt-1 text-xs leading-5 text-gray-500">
                {transaction.merchant}
              </div>
            ) : null}
          </div>
        </div>
        <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
      </td>
      <td className="hidden py-5 pr-6 sm:table-cell">
        <div className="text-sm leading-6 text-gray-900">
          {transaction.amount}
        </div>
      </td>

      <td className="relative py-5 pr-6">
        <div className="flex gap-x-6">
          {transaction.date >=
          new Date(new Date().setDate(new Date().getDate() - 3)) ? (
            <Minus className="h-6 w-6 text-gray-400" />
          ) : (
            <p className="text-sm leading-6 text-gray-900">
              {transaction.balance < 0 ? (
                <span className="text-red-500">
                  ${transaction.balance.toFixed(2)}
                </span>
              ) : (
                "$" + transaction.balance.toFixed(2)
              )}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
        <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
      </td>
    </tr>
  );
}
