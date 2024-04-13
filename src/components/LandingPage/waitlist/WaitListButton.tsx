"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { prisma } from "@/lib/db/prisma";
import { Dialog, Transition } from "@headlessui/react";
import { set } from "zod";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import SuccessModal from "./SuccessModal";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";

interface WaitListButtonProps {
  className?: string;
  apiSecretKey: string;
}

interface WaitListFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  zipCode: string;
}

export default function WaitListButton({
  className,
  apiSecretKey,
}: WaitListButtonProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("ref");
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hadReferral, setHadReferral] = useState(false);
  const [referredByCode, setReferredByCode] = useState(search ? search : "");
  const [existingUser, setExistingUser] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<WaitListFormData>();
  const [error, setError] = useState("");
  async function onSubmit(data: WaitListFormData) {
    setLoading(true);
    setError("");

    const res = await fetch("/api/waitlist", {
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      method: "POST",
      body: JSON.stringify({
        ...data,
        referredByCode,
      }),
    });
    const responseData = await res.json();
    if (responseData.status === 200) {
      setShowModal(false);
      setShowSuccess(true);
      setValue("firstName", "");
      setValue("lastName", "");
      setEmail(data.email);
      setValue("email", "");
      setValue("phoneNumber", "");
      setValue("zipCode", "");
      deleteCookie("referredByCode");
    } else if (responseData.message === "Already on waitlist") {
      setShowModal(false);
      setShowSuccess(true);
      setValue("firstName", "");
      setValue("lastName", "");
      setEmail(data.email);
      setValue("email", "");
      setValue("phoneNumber", "");
      setValue("zipCode", "");
      deleteCookie("referredByCode");
      setExistingUser(true);
    } else if (res.status === 400) {
      const message = await res.text();
      setError(message);
    } else {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  }
  useEffect(() => {
    function refCode() {
      const cookie = getCookie("referredByCode");
      if (cookie) {
        setReferredByCode(cookie);
        setHadReferral(true);
      } else {
        if (search) {
          setCookie("referredByCode", search, {
            expires: new Date(Date.now() + 86400000),
            path: "/",
          });
          setReferredByCode(search);
          setHadReferral(true);
        }
      }
    }
    refCode();
  }, [search, setValue]);
  return (
    <div className="">
      <button
        onClick={() => setShowModal(true)}
        className={`font-instrument h-[59px] w-full max-w-[328px] rounded-md border-2 border-transparent bg-primary text-[18px] font-semibold leading-[150%] text-white transition duration-300 ease-in-out hover:border-primary hover:bg-white hover:text-primary  sm:w-[196px] sm:max-w-full ${className}`}
      >
        Join the Waitlist
      </button>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setShowModal}>
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
                <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6 md:max-w-md lg:max-w-lg">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <ClipboardDocumentIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Join the Waitlist!
                        <p className="font-semilight text-xs text-gray-600">
                          Get 250 points for signing up to the waitlist today.
                        </p>
                      </Dialog.Title>
                      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
                        <div className="mb-5">
                          <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "First Name is required",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message:
                                  "Please enter a valid first name (only letters allowed)",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className={`input input-bordered text-gray-900 ${
                                    error ? "input-error" : ""
                                  }`}
                                  placeholder="First Name"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setError("");
                                  }}
                                />
                                {error && (
                                  <div className="mt-1 text-sm text-red-500">
                                    {error.message}
                                  </div>
                                )}
                              </>
                            )}
                          />
                        </div>

                        <div className="mb-5">
                          <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Last Name is required",
                              pattern: {
                                value: /^[a-zA-Z\s.-]+$/,
                                message:
                                  "Please enter a valid last name (only letters, spaces, hyphens, and periods allowed)",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className={`input input-bordered text-gray-900 ${
                                    error ? "input-error" : ""
                                  }`}
                                  placeholder="Last Name"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setError("");
                                  }}
                                />
                                {error && (
                                  <div className="mt-1 text-sm text-red-500">
                                    {error.message}
                                  </div>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mb-5">
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="email"
                                  className={`input input-bordered text-gray-900 ${
                                    error ? "input-error" : ""
                                  }`}
                                  placeholder="Email"
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setError("");
                                  }}
                                />
                                {error && (
                                  <div className="mt-1 text-sm text-red-500">
                                    {error.message}
                                  </div>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mb-5">
                          <Controller
                            name="phoneNumber"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Phone Number is required",
                              pattern: {
                                value: /^\d{10}$/,
                                message:
                                  "Please enter a valid 10-digit phone number",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="tel"
                                  className={`input input-bordered text-gray-900 ${
                                    error ? "input-error" : ""
                                  }`}
                                  placeholder="Phone Number"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const formattedValue = inputValue
                                      .replace(/\D/g, "")
                                      .slice(0, 10);
                                    field.onChange(formattedValue);
                                    setError("");
                                  }}
                                  maxLength={10}
                                />
                                {error && (
                                  <div className="mt-1 text-sm text-red-500">
                                    {error.message}
                                  </div>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mb-5">
                          <Controller
                            name="zipCode"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Zip Code is required",
                              pattern: {
                                value: /^[0-9]{5}$/,
                                message:
                                  "Please enter a valid 5-digit zip code",
                              },
                            }}
                            render={({ field, fieldState: { error } }) => (
                              <>
                                <input
                                  {...field}
                                  type="text"
                                  className={`input input-bordered text-gray-900 ${
                                    error ? "input-error" : ""
                                  }`}
                                  placeholder="Zip Code"
                                  onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const formattedValue = inputValue
                                      .replace(/\D/g, "")
                                      .slice(0, 5); // Remove non-digit characters and limit to 5 digits
                                    field.onChange(formattedValue);
                                    setError("");
                                  }}
                                  maxLength={5}
                                />
                                {error && (
                                  <div className="mt-1 text-sm text-red-500">
                                    {error.message}
                                  </div>
                                )}
                              </>
                            )}
                          />
                        </div>
                        <div className="mb-5">
                          <input
                            value={referredByCode}
                            disabled={hadReferral}
                            type="text"
                            className="input input-bordered text-gray-900"
                            placeholder="Referred By Code"
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              const formattedValue = inputValue
                                .replace(/\W/g, "")
                                .slice(0, 6); // Remove non-alphanumeric characters and limit to 6 characters
                              setReferredByCode(formattedValue);
                              setError("");
                            }}
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
                      </form>
                      <p className="font-semilight text-xs text-gray-600">
                        All awarded points will be redeemable upon successful
                        credit card application and issuance.
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <SuccessModal
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
        email={email}
        apiSecretKey={apiSecretKey}
        existingUser={existingUser}
      />
    </div>
  );
}
