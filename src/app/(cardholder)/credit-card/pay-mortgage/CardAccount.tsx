"use client";
import { useState } from "react";
import Image from "next/image";
import creditCardImg from "@/app/assets/Home/img/creditCardImg.png";
import { Clipboard, Check } from "lucide-react";

interface CardAccountProps {
  routingNumber: string;
  accountNumber: string;
}

export default function CardAccount({
  routingNumber,
  accountNumber,
}: CardAccountProps) {
  const [copiedRouting, setCopiedRouting] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleAccountToggle = () => {
    setShowAccount(!showAccount);
  };

  const handleCopyRouting = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedRouting(true);
    setTimeout(() => {
      setCopiedRouting(false);
    }, 1000);
  };
  const handleCopyAccount = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedAccount(true);
    setTimeout(() => {
      setCopiedAccount(false);
    }, 1000);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-center">
        <Image src={creditCardImg} alt="Credit Card" width={200} height={200} />
      </div>
      <div className="mb-6">
        <p className="text-gray-600">
          To avoid card transaction fees when using the HomeBase card to pay
          your mortgage online, use the routing and account numbers below.
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Routing Number:</p>
            <p className="font-semibold text-gray-900">
              {true ? routingNumber : `*****${routingNumber.slice(-4)}`}
            </p>
          </div>
          {true && (
            <button
              className="hover:text-primary-dark text-primary focus:outline-none"
              onClick={() => handleCopyRouting(routingNumber)}
            >
              {copiedRouting ? (
                <Check className="h-4 w-4 animate-bounce text-green-500" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Account Number:</p>
            <p className="font-semibold text-gray-900">
              {showAccount ? accountNumber : `*****${accountNumber.slice(-4)}`}
            </p>
          </div>
          {showAccount && (
            <button
              className="hover:text-primary-dark text-primary focus:outline-none"
              onClick={() => handleCopyAccount(accountNumber)}
            >
              {copiedAccount ? (
                <Check className="h-4 w-4 animate-bounce text-green-500" />
              ) : (
                <Clipboard className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
      <button
        className="hover:bg-primary-dark mt-6 w-full rounded-md bg-primary px-4 py-2 text-white focus:outline-none"
        onClick={handleAccountToggle}
      >
        {showAccount ? "Hide" : "Show"} Account Details
      </button>
    </div>
  );
}
