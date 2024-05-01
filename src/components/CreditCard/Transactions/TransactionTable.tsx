"use client";
import React, { useState, Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Transaction from "@/components/CreditCard/Transactions/Transaction";

interface TransactionType {
  transactionType: string;
  date: Date;
  postedDate: Date;
  transaction: string;
  merchant: string;
  merchantCategory: string;
  amount: number;
  balance: number;
}

interface TransactionTableProps {
  transactions: TransactionType[];
  statementDay: number;
}

export default function TransactionTable({
  transactions,

  statementDay,
}: TransactionTableProps) {
  const [filter, setFilter] = useState("Recent Activity");
  const [displayTransactions, setDisplayTransactions] =
    useState<TransactionType[]>();
  const today = new Date();
  let maxStatementDate: Date;
  if (today.getDate() > statementDay) {
    maxStatementDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      statementDay,
    );
  } else {
    maxStatementDate = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      statementDay,
    );
  }
  const minDate = transactions
    .map((transaction) => transaction.date)
    .sort((a, b) => (b.getTime() - a.getTime() ? -1 : 1))[0];

  let minStatementDate: Date;
  if (minDate.getDate() <= statementDay) {
    minStatementDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth(),
      statementDay,
    );
  } else {
    minStatementDate = new Date(
      minDate.getFullYear(),
      minDate.getMonth() - 1,
      statementDay,
    );
  }
  const statementDates = [];
  let currentDate = new Date(minStatementDate);
  while (currentDate <= maxStatementDate) {
    statementDates.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  useEffect(() => {
    function updateDisplayTransactions() {
      if (filter === "Recent Activity") {
        setDisplayTransactions(
          transactions
            .filter(
              (transaction) =>
                transaction.date.getTime() >= maxStatementDate.getTime(),
            )
            .sort((a, b) => b.date.getTime() - a.date.getTime()),
        );
      } else {
        setDisplayTransactions(
          transactions
            .filter(
              (transaction) =>
                transaction.date.getTime() <= new Date(filter).getTime() &&
                transaction.date.getTime() >
                  new Date(
                    new Date(filter).setMonth(new Date(filter).getMonth() - 1),
                  ).getTime(),
            )
            .sort((a, b) => b.date.getTime() - a.date.getTime()),
        );
      }
    }
    updateDisplayTransactions();
  }, [transactions, maxStatementDate, filter]);

  return (
    <div>
      <div className="relative -ml-px block">
        <select
          className="rounded-r-md bg-white px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          aria-label="Select statement date"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Recent Activity">Recent Activity</option>
          {statementDates
            .sort((a, b) => b.getTime() - a.getTime())
            .map((statement) => (
              <option
                key={statement.toISOString()}
                value={statement.toISOString()}
              >
                Statement Ended {statement.toLocaleDateString()}
              </option>
            ))}
        </select>
      </div>
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
          {filter === "Recent Activity"
            ? "Recent Activity"
            : `Statement Ended ${new Date(filter).toLocaleDateString()}`}
        </h2>
      </div> */}
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead
                className="
                border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500
              "
              >
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>
                  <th>Amount</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {displayTransactions &&
                  displayTransactions.map((transaction) => (
                    <Fragment key={transaction.date.toString()}>
                      <Transaction transaction={transaction} />
                    </Fragment>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
