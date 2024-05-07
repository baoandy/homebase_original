"use client";
import React, { useState, Fragment, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
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
  showOnlyRecent: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function TransactionTable({
  transactions,
  statementDay,
  showOnlyRecent,
}: TransactionTableProps) {
  const [filter, setFilter] = useState("Recent Activity");
  const [displayTransactions, setDisplayTransactions] = useState<
    TransactionType[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      let filteredTransactions: TransactionType[];
      if (filter === "Recent Activity") {
        filteredTransactions = transactions
          .filter(
            (transaction) =>
              transaction.date.getTime() >= maxStatementDate.getTime(),
          )
          .sort((a, b) => b.date.getTime() - a.date.getTime());
      } else {
        filteredTransactions = transactions
          .filter(
            (transaction) =>
              transaction.date.getTime() <= new Date(filter).getTime() &&
              transaction.date.getTime() >
                new Date(
                  new Date(filter).setMonth(new Date(filter).getMonth() - 1),
                ).getTime(),
          )
          .sort((a, b) => b.date.getTime() - a.date.getTime());
      }

      setDisplayTransactions(filteredTransactions);
      setCurrentPage(1);
    }

    updateDisplayTransactions();
  }, [filter]);

  const totalPages = Math.ceil(displayTransactions.length / ITEMS_PER_PAGE);

  const indexOfLastTransaction = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstTransaction = indexOfLastTransaction - ITEMS_PER_PAGE;
  const currentTransactions = displayTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction,
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div className="relative -ml-px block">
        {!showOnlyRecent && (
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
        )}
        {showOnlyRecent && (
          <div className="rounded-r-md bg-white px-2 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
            Recent Activity
          </div>
        )}
      </div>
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
                {currentTransactions.map((transaction) => (
                  <Fragment key={transaction.date.toString()}>
                    <Transaction transaction={transaction} />
                  </Fragment>
                ))}
              </tbody>
            </table>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
}

function Pagination({
  totalPages,
  currentPage,
  goToNextPage,
  goToPreviousPage,
}: PaginationProps) {
  return (
    <nav className="mt-4 flex items-center justify-center">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={goToPreviousPage}
            className={`border px-3 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-gray-300 bg-white"
            }`}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </li>
        <li>
          <span className="border border-gray-300 bg-white px-4 py-2">
            {currentPage} / {totalPages}
          </span>
        </li>
        <li>
          <button
            onClick={goToNextPage}
            className={`border px-3 py-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed border-gray-200 bg-gray-100"
                : "border-gray-300 bg-white"
            }`}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
