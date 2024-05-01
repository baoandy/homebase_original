import React from "react";

function PaymentInterface() {
  const days = [
    { date: "2021-12-27" },
    { date: "2021-12-28" },
    { date: "2021-12-29" },
    { date: "2021-12-30" },
    { date: "2021-12-31" },
    { date: "2022-01-01", isCurrentMonth: true },
    { date: "2022-01-02", isCurrentMonth: true },
    { date: "2022-01-03", isCurrentMonth: true },
    { date: "2022-01-04", isCurrentMonth: true },
    { date: "2022-01-05", isCurrentMonth: true },
    { date: "2022-01-06", isCurrentMonth: true },
    { date: "2022-01-07", isCurrentMonth: true },
    { date: "2022-01-08", isCurrentMonth: true },
    { date: "2022-01-09", isCurrentMonth: true },
    { date: "2022-01-10", isCurrentMonth: true },
    { date: "2022-01-11", isCurrentMonth: true },
    { date: "2022-01-12", isCurrentMonth: true, isToday: true },
    { date: "2022-01-13", isCurrentMonth: true },
    { date: "2022-01-14", isCurrentMonth: true },
    { date: "2022-01-15", isCurrentMonth: true },
    { date: "2022-01-16", isCurrentMonth: true },
    { date: "2022-01-17", isCurrentMonth: true },
    { date: "2022-01-18", isCurrentMonth: true },
    { date: "2022-01-19", isCurrentMonth: true },
    { date: "2022-01-20", isCurrentMonth: true },
    { date: "2022-01-21", isCurrentMonth: true },
    { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
    { date: "2022-01-23", isCurrentMonth: true },
    { date: "2022-01-24", isCurrentMonth: true },
    { date: "2022-01-25", isCurrentMonth: true },
    { date: "2022-01-26", isCurrentMonth: true },
    { date: "2022-01-27", isCurrentMonth: true },
    { date: "2022-01-28", isCurrentMonth: true },
    { date: "2022-01-29", isCurrentMonth: true },
    { date: "2022-01-30", isCurrentMonth: true },
    { date: "2022-01-31", isCurrentMonth: true },
    { date: "2022-02-01" },
    { date: "2022-02-02" },
    { date: "2022-02-03" },
    { date: "2022-02-04" },
    { date: "2022-02-05" },
    { date: "2022-02-06" },
  ];
  return (
    <div className="bg-white p-8">
      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold">Payment Details</h2>
        <div className="space-y-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentAmount"
              className="form-radio mr-3 h-5 w-5 text-primary"
            />
            <span className="text-lg">Current Balance: $1,500.00</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentAmount"
              className="form-radio mr-3 h-5 w-5 text-primary"
            />
            <span className="text-lg">Statement Balance: $1,250.00</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentAmount"
              className="form-radio mr-3 h-5 w-5 text-primary"
            />
            <span className="text-lg">Other Amount:</span>
            <input
              type="text"
              className="ml-3 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter amount"
            />
          </label>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-semibold">Account</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="text-lg">Chase **** 1234 Exp: 12/25</span>
            <button className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary">
              Select
            </button>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <span className="text-lg">
              Bank of America **** 5678 Exp: 09/23
            </span>
            <button className="hover:bg-primary-dark rounded-lg bg-primary px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary">
              Select
            </button>
          </div>
          <button className="flex h-16 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-400 text-3xl text-gray-400 hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">
            +
          </button>
        </div>
      </div>

      <div className="border-t bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-lg font-semibold">$1,250.00</p>
          </div>
          <button className="hover:bg-primary-dark rounded-lg bg-primary px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary">
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentInterface;
