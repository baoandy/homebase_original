"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { prisma } from "@/lib/db/prisma";
import { Dialog, Transition } from "@headlessui/react";
import { set } from "zod";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid";
import SuccessModal from "./SuccessModal";
import { ModalLogoIcon } from "@/components/LandingPage/helper/Icon";
import modalmainImage from "@/app/assets/JoinWaitListModal/modal-main-image.png";
import Image from "next/image";
import TermsAndConditions from "@/components/LandingPage/waitlist/JoinWaitListButton/TermsAndConditions";
import { ModalCloseIcon } from "@/components/LandingPage/helper/Icon";
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
  const [showTerms, setShowTerms] = useState(false);

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
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`font-instrument h-[59px] w-full max-w-[328px] rounded-md border-2 border-transparent bg-primary text-[18px] font-semibold leading-[150%] text-white transition duration-300 ease-in-out hover:border-primary hover:bg-white hover:text-primary max-sm:px-4  sm:w-[196px] sm:max-w-full`}
      >
        Join the Waitlist
      </button>
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setShowModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 h-screen bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center px-4 py-1 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex h-[calc(100vh-55px)]  w-full items-center md:max-w-[1140px] ">
                  <div className="scroll_bar_model max-h-full w-full transform overflow-auto rounded-2xl text-left  align-middle shadow-xl transition-all lg:max-w-[1140px] lg:rounded-[32px]">
                    {!showTerms && (
                      <span className=" fixed right-3 top-6 z-50 flex items-start justify-end bg-transparent">
                        <button
                          type="button"
                          className="z-20ease-in-out bg-transparent transition duration-300 hover:rotate-180"
                          onClick={() => setShowModal(false)}
                        >
                          <ModalCloseIcon />
                        </button>
                      </span>
                    )}

                    <div
                      className={`${
                        showModal ? "block" : "hidden"
                      } flex h-full w-full items-start bg-[#ebf0f1]`}
                    >
                      <div className="flex h-full w-full flex-col items-center justify-end gap-[30px] bg-white pb-[15px] pt-10 max-lg:p-4 md:max-w-[50%] md:pt-20 lg:pt-[152px]">
                        <ModalLogoIcon />
                        <div className="flex w-full flex-col gap-7">
                          <div className="flex w-full flex-col gap-6">
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              className="mb-0 mt-4"
                            >
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
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="text"
                                        className={`font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px] ${
                                          error ? "input-error" : ""
                                        }`}
                                        placeholder="First Name"
                                        onChange={(e) => {
                                          field.onChange(e);
                                          setError("");
                                        }}
                                      />
                                      {error && (
                                        <div className="font-nunito placeholder:font-nunito mx-auto mt-1 flex w-full items-center text-sm text-red-500  md:w-[300px] lg:w-[376px]">
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
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="text"
                                        className={`font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px] ${
                                          error ? "input-error" : ""
                                        }`}
                                        placeholder="Last Name"
                                        onChange={(e) => {
                                          field.onChange(e);
                                          setError("");
                                        }}
                                      />
                                      {error && (
                                        <div className="font-nunito placeholder:font-nunito mx-auto mt-1 flex w-full items-center text-sm text-red-500  md:w-[300px] lg:w-[376px]">
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
                                      message:
                                        "Please enter a valid email address",
                                    },
                                  }}
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="email"
                                        className={`font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px] ${
                                          error ? "input-error" : ""
                                        }`}
                                        placeholder="Email"
                                        onChange={(e) => {
                                          field.onChange(e);
                                          setError("");
                                        }}
                                      />
                                      {error && (
                                        <div className="font-nunito placeholder:font-nunito mx-auto mt-1 flex w-full items-center text-sm text-red-500  md:w-[300px] lg:w-[376px]">
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
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="tel"
                                        className={`font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px] ${
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
                                        <div className="font-nunito placeholder:font-nunito mx-auto mt-1 flex w-full items-center text-sm text-red-500  md:w-[300px] lg:w-[376px]">
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
                                  render={({
                                    field,
                                    fieldState: { error },
                                  }) => (
                                    <>
                                      <input
                                        {...field}
                                        type="text"
                                        className={`font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px] ${
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
                                        <div className="font-nunito placeholder:font-nunito mx-auto mt-1 flex w-full items-center text-sm text-red-500  md:w-[300px] lg:w-[376px]">
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
                                  className="font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px]"
                                  placeholder="Referral Code"
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
                              <div className="mb-5 flex self-center">
                                <button
                                  type="submit"
                                  className="font-nunito mx-auto h-[52px] w-full rounded-lg border border-[#366871] bg-[#366871] px-8 py-3.5 text-center text-base font-semibold text-white outline-none transition duration-300 ease-in-out hover:bg-white hover:text-[#366871] md:max-w-[300px] lg:max-w-[376px]"
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
                              </div>
                            </form>

                            <button
                              type="submit"
                              onClick={() => setShowTerms(true)}
                              className="font-nunito mt-10 text-center text-base font-semibold text-[#2A2A2C] underline transition duration-300 ease-in-out hover:text-[#366871] md:mt-20 lg:mt-[152px]"
                            >
                              Terms and Condition
                            </button>
                            <TermsAndConditions
                              showTerms={showTerms}
                              setShowTerms={setShowTerms}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="hidden w-full max-w-[50%] flex-col items-end justify-start bg-[#ebf0f1] pb-16 pr-6 pt-[100px] md:flex lg:pb-[110px] lg:pt-[174px]">
                        <Image
                          src={modalmainImage}
                          width={573}
                          height={545}
                          alt="main-image"
                        />
                      </div>
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
    </>
  );
}
