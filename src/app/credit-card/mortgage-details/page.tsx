"use server";

import { ChevronRight } from "lucide-react";
import React from "react";

export default async function MortgageDetails() {
  return (
    <div className="flex justify-center bg-gray-100 p-10">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Your Home Section */}
        <div className="p-8">
          <h1 className="mb-4 text-3xl font-bold">Your Home</h1>
          <p className="mb-6 text-lg text-gray-700">
            View your payment history and track your outstanding balance. Check
            your interest rate and plan for the next payment.
          </p>
          <div className="rounded-lg bg-gray-100 p-6">
            <div className="flex items-center">
              <img
                src="house.jpg"
                alt="House"
                className="mr-6 h-32 w-32 rounded-lg"
              />
              <div>
                <h2 className="mb-2 text-xl font-semibold">
                  Mortgage Overview
                </h2>
                <p className="mb-1 text-lg text-gray-900">
                  Mortgage Balance: $750,000.00
                </p>
                <p className="mb-1 text-lg text-gray-900">
                  Monthly Payment: $3,000.00
                </p>
                <p className="text-gray-600">30 Year Fixed Rate, 5.6%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="border-t p-8">
          <h1 className="mb-6 text-3xl font-bold">Payment History</h1>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Date</th>
                <th className="py-3">Payment</th>
                <th className="py-3">Balance</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }, (_, index) => (
                <tr key={index} className="border-b">
                  <td className="py-4">May {index + 1}, 2024</td>
                  <td className="py-4">$3,000.00</td>
                  <td className="py-4">$750,000.00</td>
                  <td className="py-4">
                    <button className="text-primary hover:underline focus:outline-none">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <a
              href="#"
              className="inline-flex items-center text-primary hover:underline focus:outline-none"
            >
              View More <ChevronRight className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
