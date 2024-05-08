"use client";
import { ChevronRight } from "lucide-react";

export default function PaymentHistory() {
  return (
    <div className="w-full flex-grow  p-8">
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
  );
}
