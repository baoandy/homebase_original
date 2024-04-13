"use client";
import React, { useState, Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Waitlist } from "@prisma/client";

import { Dialog, Transition } from "@headlessui/react";

import {
  CheckIcon,
  ClipboardDocumentIcon,
  ClipboardIcon,
} from "@heroicons/react/20/solid";
import { set } from "zod";

interface SupplementalFormData {
  monthlyMortgageAmount: string;
  mortgageOriginator: string;
  maritalStatus: string;
  employmentStatus: string;
  homeType: string;
}

interface SuccessModalProps {
  showSuccess: boolean;
  setShowSuccess: (show: boolean) => void;
  email: string;
  apiSecretKey: string;
  existingUser: boolean;
}
export default function SuccessModal({
  showSuccess,
  setShowSuccess,
  email,
  apiSecretKey,
  existingUser,
}: SuccessModalProps) {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [points, setPoints] = useState(0);
  const [reloadPoints, setReloadPoints] = useState(false);
  const [waitList, setWaitList] = useState<Waitlist | null>(null);
  const [copied, setCopied] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SupplementalFormData>();
  const [error, setError] = useState("");
  async function onSubmit(data: SupplementalFormData) {
    setLoading(true);
    const response = await fetch("/api/waitlist/supplemental", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify({ ...data, email }),
    });
    const result = await response.json();
    if (result.status === 200) {
      setShowForm(false);
      setSubmitted(true);
      setReloadPoints(true);
    } else {
      setError(result.message);
    }
  }
  useEffect(() => {
    async function loadWaitlist() {
      const response = await fetch(
        `/api/waitlist/load-existing-user/${email}`,
        {
          headers: {
            secretKey: apiSecretKey,
          },
        },
      );
      const result = await response.json();
      if (result.status === 200) {
        setWaitList(result.waitlist);
        if (waitList?.monthlyMortgageAmount) {
          setSubmitted(true);
          setShowForm(false);
        }
      }
    }
    loadWaitlist();
  }, [existingUser, email, apiSecretKey, waitList]);
  useEffect(() => {
    async function fetchReferralCode() {
      const response = await fetch(
        `/api/waitlist/fetch-referral-code/${email}`,
        {
          headers: {
            secretKey: apiSecretKey,
          },
        },
      );
      const result = await response.json();
      if (result.status === 200) {
        setReferralCode(result.waitlist.referralCode);
      }
    }
    fetchReferralCode();
  }, [submitted, apiSecretKey, email]);
  useEffect(() => {
    async function loadPoints() {
      const response = await fetch(`/api/waitlist/fetch-points/${email}`, {
        headers: {
          secretKey: apiSecretKey,
        },
      });
      const result = await response.json();
      if (result.status === 200) {
        setPoints(result.points);
        setReloadPoints(false);
      }
    }
    loadPoints();
  }, [submitted, email, apiSecretKey, reloadPoints]);
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://www.yourhomebase.co?ref=${referralCode}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };
  return (
    <Transition.Root show={showSuccess} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setShowSuccess}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 text-left shadow-xl transition-all sm:my-8 sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                    <CheckIcon className="h-8 w-8 text-white" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {submitted
                        ? "Thanks! You're all set."
                        : "Success! You're on the waitlist."}
                    </Dialog.Title>

                    <p className="font-semilight mt-4 text-sm text-gray-600">
                      {`You've earned a total of ${points} points!`}
                    </p>

                    <div className="flex flex-col">
                      <div className=" flex items-center justify-center bg-opacity-50">
                        <div className="mx-4 w-full max-w-lg rounded-lg bg-white p-8 md:mx-0">
                          <div className="text-center">
                            <h2 className="mb-2 text-lg font-semibold">
                              Refer a Friend and Earn Points!
                            </h2>

                            <p className="mb-2 text-sm">
                              If a friend signs up using your referral link, you
                              both earn 500 points!
                            </p>
                            <div className="mb-4 flex items-center">
                              <div className="relative flex-grow">
                                <input
                                  type="text"
                                  readOnly
                                  className="w-full rounded-l-md border border-gray-300 bg-gray-100 py-2 pl-4 pr-10 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  value={`https://www.yourhomebase.co?ref=${referralCode}`}
                                />
                                <button
                                  className={`absolute bottom-0 right-0 top-0 rounded-r-md px-4 text-white transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    copied
                                      ? "bg-green-500 hover:bg-green-600"
                                      : "bg-primary hover:bg-blue-600"
                                  }`}
                                  onClick={handleCopy}
                                >
                                  {copied ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {showForm && (
                        <>
                          <div className="divider "></div>
                          <form
                            className="my-4"
                            onSubmit={handleSubmit(onSubmit)}
                          >
                            <p className="font-semilight mb-4 mt-4 text-sm text-gray-600">
                              Earn an additional 250 points when you complete
                              the form below.
                            </p>
                            <div className="mb-4">
                              <Controller
                                name="homeType"
                                control={control}
                                defaultValue=""
                                rules={{ required: "Home Type is required" }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <select
                                      {...field}
                                      className={`select select-bordered w-full ${
                                        error ? "select-error" : ""
                                      }`}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setError("");
                                      }}
                                    >
                                      <option value="" disabled>
                                        Select Home Type
                                      </option>
                                      <option value="Single Family">
                                        Single Family
                                      </option>
                                      <option value="Condo">Condo</option>
                                      <option value="Townhome">Townhome</option>
                                      <option value="Co-Op">Co-Op</option>
                                      <option value="Manufactured">
                                        Manufactured
                                      </option>
                                      <option value="I don't own a home">
                                        I don't own a home
                                      </option>
                                      <option value="Other">Other</option>
                                    </select>
                                    {error && (
                                      <div className="mt-1 text-sm text-red-500">
                                        {error.message}
                                      </div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                            <div className="mb-4">
                              <Controller
                                name="employmentStatus"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: "Employment Status is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <select
                                      {...field}
                                      className={`select select-bordered w-full ${
                                        error ? "select-error" : ""
                                      }`}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setError("");
                                      }}
                                    >
                                      <option value="" disabled>
                                        Select Employment Status
                                      </option>
                                      <option value="Full Time Employee">
                                        Employed Full Time
                                      </option>
                                      <option value="Part Time Employee">
                                        Employed Part Time
                                      </option>
                                      <option value="Self Employed">
                                        Self Employed
                                      </option>
                                      <option value="Independent Contractor">
                                        Independent Contractor
                                      </option>
                                      <option value="Unemployed">
                                        Unemployed
                                      </option>
                                      <option value="Other">Other</option>
                                    </select>
                                    {error && (
                                      <div className="mt-1 text-sm text-red-500">
                                        {error.message}
                                      </div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                            <div className="mb-4">
                              <Controller
                                name="maritalStatus"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: "Marital Status is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <select
                                      {...field}
                                      className={`select select-bordered w-full ${
                                        error ? "select-error" : ""
                                      }`}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setError("");
                                      }}
                                    >
                                      <option value="" disabled>
                                        Select Marital Status
                                      </option>
                                      <option value="Married">Married</option>
                                      <option value="Common Law Married">
                                        Common Law Married
                                      </option>
                                      <option value="Divorced">Divorced</option>
                                      <option value="Widowed">Widowed</option>
                                      <option value="Not Married">
                                        Not Married
                                      </option>
                                      <option value="Other">Other</option>
                                    </select>
                                    {error && (
                                      <div className="mt-1 text-sm text-red-500">
                                        {error.message}
                                      </div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                            <div className="mb-4">
                              <Controller
                                name="mortgageOriginator"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required: "Mortgage Originator is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <select
                                      {...field}
                                      className={`select select-bordered w-full ${
                                        error ? "select-error" : ""
                                      }`}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setError("");
                                      }}
                                    >
                                      <option value="" disabled>
                                        Select Mortgage Originator
                                      </option>
                                      <option value="Wells Fargo">
                                        Wells Fargo
                                      </option>
                                      <option value="JPMorgan Chase">
                                        JPMorgan Chase
                                      </option>
                                      <option value="Rocket Mortgage">
                                        Rocket Mortgage
                                      </option>
                                      <option value="United Wholesale Mortgage">
                                        United Wholesale Mortgage
                                      </option>
                                      <option value="LoanDepot">
                                        Loan Depot
                                      </option>

                                      <option value="Fairway Independent Mortgage">
                                        Fairway Independent Mortgage
                                      </option>
                                      <option value="Bank of America">
                                        Bank of America
                                      </option>
                                      <option value="U.S. Bank">
                                        U.S. Bank
                                      </option>
                                      <option value="Other">Other</option>
                                      <option value="No Mortgage">
                                        No Mortgage
                                      </option>
                                    </select>
                                    {error && (
                                      <div className="mt-1 text-sm text-red-500">
                                        {error.message}
                                      </div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                            <div className="mb-4">
                              <Controller
                                name="monthlyMortgageAmount"
                                control={control}
                                defaultValue=""
                                rules={{
                                  required:
                                    "Monthly Mortgage Payment is required",
                                }}
                                render={({ field, fieldState: { error } }) => (
                                  <>
                                    <select
                                      {...field}
                                      className={`select select-bordered w-full  ${
                                        error ? "select-error" : ""
                                      }`}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        setError("");
                                      }}
                                    >
                                      <option value="" disabled>
                                        Select Monthly Mortgage Payment
                                      </option>
                                      <option value="$0-$2,000">
                                        $0-$2,000
                                      </option>
                                      <option value="$2,001-$4,000">
                                        $2,001-$4,000
                                      </option>
                                      <option value="$4,001-$6,000">
                                        $4,001-$6,000
                                      </option>
                                      <option value="$6,001+">$6,001+</option>
                                      <option value="No Mortgage">
                                        No Mortgage
                                      </option>
                                    </select>
                                    {error && (
                                      <div className="mt-1 text-sm text-red-500">
                                        {error.message}
                                      </div>
                                    )}
                                  </>
                                )}
                              />
                            </div>
                            <button
                              type="submit"
                              className="btn btn-outline btn-primary inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                              {!loading ? (
                                "Submit"
                              ) : (
                                <span className="loading loading-spinner"></span>
                              )}
                            </button>
                            {error && (
                              <div className="alert alert-error mt-3 flex h-10">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 stroke-current"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span>{error}</span>
                              </div>
                            )}
                            <p className="font-semilight mt-4 text-xs text-gray-600">
                              All awarded points will be redeemable upon
                              successful credit card application and issuance.
                            </p>
                            <a
                              href="/files/HomeBaseWaitlistTermsOfUse.html"
                              target="_blank"
                              className="font-semilight text-xs text-gray-600"
                            >
                              Terms and Conditions
                            </a>
                          </form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
