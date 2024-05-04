import React from "react";

function PaymentInterface() {
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
              value="1500"
            />
            <span className="text-lg">Current Balance: $1,500.00</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentAmount"
              className="form-radio mr-3 h-5 w-5 text-primary"
              value="1250"
            />
            <span className="text-lg">Statement Balance: $1,250.00</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentAmount"
              className="form-radio mr-3 h-5 w-5 text-primary"
              value="other"
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
          <label className="flex items-center justify-between rounded-lg border p-4">
            <input
              type="radio"
              name="paymentAccount"
              className="form-radio mr-3 h-5 w-5 text-primary"
              value="chase"
            />
            <span className="flex-grow text-lg">
              Chase **** 1234 Exp: 12/25
            </span>
          </label>
          <label className="flex items-center justify-between rounded-lg border p-4">
            <input
              type="radio"
              name="paymentAccount"
              className="form-radio mr-3 h-5 w-5 text-primary"
              value="bankofamerica"
            />
            <span className="flex-grow text-lg">
              Bank of America **** 5678 Exp: 09/23
            </span>
          </label>
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
