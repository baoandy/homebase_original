"use client";
import React, { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import { ModalCloseIcon } from "../helper/Icon";

import { useForm, Controller } from "react-hook-form";
import { Waitlist } from "@prisma/client";

import { Dialog, Transition, Listbox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faCheck,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import listImg from "@/app/assets/JoinWaitListModal/listImg.png";
import TermsAndConditions from "@/components/LandingPage/waitlist/JoinWaitListButton/TermsAndConditions";

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
  const [showTerms, setShowTerms] = useState(false);
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
        setReferralCode(result.waitlist.referralCode);
        setPoints(result.points);
        setReloadPoints(false);
        if (waitList?.monthlyMortgageAmount) {
          setSubmitted(true);
          setShowForm(false);
        }
      }
    }
    loadWaitlist();
  }, [existingUser, email, apiSecretKey, waitList, reloadPoints, submitted]);

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
                <div className="  flex w-full ">
                  <div className=" mx-auto flex w-full  flex-col overflow-hidden rounded-2xl bg-white lg:flex-row lg:gap-4 lg:rounded-[32px]">
                    {showForm && (
                      <div>
                        <h1 className="font-nunito mx-auto w-full max-w-[458px] text-center text-xl font-bold leading-[130%] text-black sm:text-[30px]">
                          CONGRATS! You're one step closer to earning rewards on
                          your home!{" "}
                        </h1>
                        <div className="mt-[51px] h-[1px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.00)_2.67%,#000_41.13%,#303030_68.55%,rgba(102,102,102,0.00)_100%)]"></div>
                        <p className="font-nunito  mx-auto w-full max-w-[411px] pt-3 text-center text-[12px] font-bold text-[#2A2A2C] sm:text-base ">
                          Earn <span className="text-xl sm:text-2xl">250</span>{" "}
                          points when you provide us with more information about
                          yourself.
                        </p>
                        <form
                          className="mt-2 flex flex-col gap-4"
                          onSubmit={handleSubmit(onSubmit)}
                        >
                          <div className="relative mx-auto w-full max-w-[544px] rounded-[6px] border border-[rgba(6,45,52,0.30)] bg-[#F8FFFF] p-4">
                            <Controller
                              name="homeType"
                              control={control}
                              defaultValue=""
                              rules={{ required: "Home Type is required" }}
                              render={({ field, fieldState: { error } }) => (
                                <Listbox
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <div className="mt-1">
                                    <Listbox.Button className="relative w-full cursor-default text-left">
                                      <span className="block truncate text-[16px] font-normal text-[#82979B]">
                                        {field.value || "Select Home Type"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute left-0 z-10 max-h-60 w-full overflow-auto rounded-md border border-[rgba(6,45,52,0.30);] bg-white text-base shadow-[-4px_8px_22.3px_0px_rgba(69,90,100,0.16)] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                          key="Single Family"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Single Family"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Single Family
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Condo"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Condo"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Condo
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Townhome"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Townhome"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Townhome
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Co-Op"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Co-Op"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Co-Op
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Manufactured"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Manufactured"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Manufactured
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="I don't own a home"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="I don't own a home"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                I don't own a home
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Other"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Other"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Other
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                  {error && (
                                    <div className="mt-1 text-sm text-red-500">
                                      {error.message}
                                    </div>
                                  )}
                                </Listbox>
                              )}
                            />
                          </div>
                          <div className="relative mx-auto w-full max-w-[544px] rounded-[6px] border border-[rgba(6,45,52,0.30)] bg-[#F8FFFF] p-4">
                            <Controller
                              name="employmentStatus"
                              control={control}
                              defaultValue=""
                              rules={{
                                required: "Employment Status is required",
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <Listbox
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <div className="mt-1">
                                    <Listbox.Button className="relative w-full cursor-default text-left">
                                      <span className="block truncate text-[16px] font-normal text-[#82979B]">
                                        {field.value ||
                                          "Select Employment Status"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute left-0 z-10 max-h-60 w-full overflow-auto rounded-md border border-[rgba(6,45,52,0.30);] bg-white text-base shadow-[-4px_8px_22.3px_0px_rgba(69,90,100,0.16)] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                          key="Full Time Employee"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Full Time Employee"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Employed Full Time
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Part Time Employee"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Part Time Employee"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Employed Part Time
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Self Employed"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Self Employed"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Self Employed
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Independent Contractor"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Independent Contractor"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Independent Contractor
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Unemployed"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Unemployed"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Unemployed
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Other"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Other"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Other
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                  {error && (
                                    <div className="mt-1 text-sm text-red-500">
                                      {error.message}
                                    </div>
                                  )}
                                </Listbox>
                              )}
                            />
                          </div>
                          <div className="relative mx-auto w-full max-w-[544px] rounded-[6px] border border-[rgba(6,45,52,0.30)] bg-[#F8FFFF] p-4">
                            <Controller
                              name="maritalStatus"
                              control={control}
                              defaultValue=""
                              rules={{
                                required: "Marital Status is required",
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <Listbox
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <div className="mt-1">
                                    <Listbox.Button className="relative w-full cursor-default text-left">
                                      <span className="block truncate text-[16px] font-normal text-[#82979B]">
                                        {field.value || "Select Marital Status"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute left-0 z-10 max-h-60 w-full overflow-auto rounded-md border border-[rgba(6,45,52,0.30);] bg-white text-base shadow-[-4px_8px_22.3px_0px_rgba(69,90,100,0.16)] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                          key="Married"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Married"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Married
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Common Law Married"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Common Law Married"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Common Law Married
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Divorced"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Divorced"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Divorced
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Widowed"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Widowed"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Widowed
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Not Married"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Not Married"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Not Married
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Other"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Other"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Other
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                  {error && (
                                    <div className="mt-1 text-sm text-red-500">
                                      {error.message}
                                    </div>
                                  )}
                                </Listbox>
                              )}
                            />
                          </div>
                          <div className="relative mx-auto w-full max-w-[544px] rounded-[6px] border border-[rgba(6,45,52,0.30)] bg-[#F8FFFF] p-4">
                            <Controller
                              name="mortgageOriginator"
                              control={control}
                              defaultValue=""
                              rules={{
                                required: "Mortgage Originator is required",
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <Listbox
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <div className="mt-1">
                                    <Listbox.Button className="relative w-full cursor-default text-left">
                                      <span className="block truncate text-[16px] font-normal text-[#82979B]">
                                        {field.value ||
                                          "Select Mortgage Originator"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute left-0 z-10 max-h-60 w-full overflow-auto rounded-md border border-[rgba(6,45,52,0.30);] bg-white text-base shadow-[-4px_8px_22.3px_0px_rgba(69,90,100,0.16)] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                          key="Wells Fargo"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Wells Fargo"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Wells Fargo
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="JPMorgan Chase"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="JPMorgan Chase"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                JPMorgan Chase
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Rocket Mortgage"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Rocket Mortgage"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Rocket Mortgage
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="United Wholesale Mortgage"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="United Wholesale Mortgage"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                United Wholesale Mortgage
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="LoanDepot"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="LoanDepot"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Loan Depot
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Fairway Independent Mortgage"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Fairway Independent Mortgage"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Fairway Independent Mortgage
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Bank of America"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Bank of America"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Bank of America
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="U.S. Bank"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="U.S. Bank"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                U.S. Bank
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="Other"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="Other"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                Other
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="No Mortgage"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="No Mortgage"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                No Mortgage
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                  {error && (
                                    <div className="mt-1 text-sm text-red-500">
                                      {error.message}
                                    </div>
                                  )}
                                </Listbox>
                              )}
                            />
                          </div>
                          <div className="relative mx-auto w-full max-w-[544px] rounded-[6px] border border-[rgba(6,45,52,0.30)] bg-[#F8FFFF] p-4">
                            <Controller
                              name="monthlyMortgageAmount"
                              control={control}
                              defaultValue=""
                              rules={{
                                required:
                                  "Monthly Mortgage Payment is required",
                              }}
                              render={({ field, fieldState: { error } }) => (
                                <Listbox
                                  value={field.value}
                                  onChange={field.onChange}
                                >
                                  <div className="mt-1">
                                    <Listbox.Button className="relative w-full cursor-default text-left">
                                      <span className="block truncate text-[16px] font-normal text-[#82979B]">
                                        {field.value ||
                                          "Select Monthly Mortgage Payment"}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                      </span>
                                    </Listbox.Button>
                                    <Transition
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0"
                                    >
                                      <Listbox.Options className="absolute left-0 z-10 max-h-60 w-full overflow-auto rounded-md border border-[rgba(6,45,52,0.30);] bg-white text-base shadow-[-4px_8px_22.3px_0px_rgba(69,90,100,0.16)] ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <Listbox.Option
                                          key="$0-$2,000"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="$0-$2,000"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                $0-$2,000
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="$2,001-$4,000"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="$2,001-$4,000"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                $2,001-$4,000
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="$4,001-$6,000"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="$4,001-$6,000"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                $4,001-$6,000
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="$6,001+"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="$6,001+"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                $6,001+
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                        <Listbox.Option
                                          key="No Mortgage"
                                          className={({ active }) =>
                                            `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                                              active
                                                ? "bg-[rgba(54,104,113,0.10)] text-[rgba(0,0,0,0.50)]"
                                                : "text-gray-900"
                                            }`
                                          }
                                          value="No Mortgage"
                                        >
                                          {({ selected }) => (
                                            <>
                                              <span
                                                className={`block truncate ${
                                                  selected
                                                    ? "font-medium"
                                                    : "font-normal"
                                                }`}
                                              >
                                                No Mortgage
                                              </span>
                                              {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                                              ) : null}
                                            </>
                                          )}
                                        </Listbox.Option>
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                  {error && (
                                    <div className="mt-1 text-sm text-red-500">
                                      {error.message}
                                    </div>
                                  )}
                                </Listbox>
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
                        </form>
                        <div className="flex flex-col align-middle">
                          <button
                            type="submit"
                            onClick={() => setShowTerms(true)}
                            className="font-nunito mt-3 self-center text-center text-base font-semibold text-[#2A2A2C] underline transition duration-300 ease-in-out hover:text-[#366871]"
                          >
                            Terms and Condition
                          </button>
                          <TermsAndConditions
                            showTerms={showTerms}
                            setShowTerms={setShowTerms}
                          />
                        </div>
                      </div>
                    )}
                    {!showForm && (
                      <div>
                        <h1 className="font-nunito mx-auto w-full max-w-[458px] text-center text-xl font-bold leading-[130%] text-black sm:text-[30px]">
                          CONGRATS! You're one step closer to earning rewards on
                          your home!{" "}
                        </h1>
                        <div className="mt-[51px] h-[1px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.00)_2.67%,#000_41.13%,#303030_68.55%,rgba(102,102,102,0.00)_100%)]"></div>
                        <p className="font-nunito  mx-auto w-full max-w-[411px] pt-3 text-center text-[12px] font-bold text-[#2A2A2C] sm:text-base ">
                          You've earned{" "}
                          <span className="text-xl sm:text-2xl">{points}</span>{" "}
                          points for joining the waitlist!
                        </p>
                      </div>
                    )}
                    <div className="mx-auto bg-[rgba(54,104,113,0.10)] bg-[url('/static/images/bg-model-img.png')] bg-cover  bg-center bg-no-repeat px-2 py-5 max-lg:w-full lg:w-[65%]">
                      <span className="z-50 flex items-start justify-end bg-transparent">
                        <button
                          type="button"
                          className="z-20ease-in-out bg-transparent transition duration-300 hover:rotate-180"
                          onClick={() => setShowSuccess(false)}
                        >
                          <ModalCloseIcon />
                        </button>
                      </span>
                      <div className="mt-[97px] w-full">
                        <p className="font-nunito text-center text-xl font-bold leading-[150%] text-[#2A2A2C] sm:text-2xl">
                          Refer a Friend and Earn More Points!
                        </p>
                        <p className="font-nunito text-center text-[12px] font-normal leading-[150%] text-[#2A2A2C] sm:text-[16px]">
                          If a friend signs up using your referral link, you
                          both earn
                          <span className="text-xl font-bold sm:text-2xl">
                            500{" "}
                          </span>
                          points!
                        </p>
                        <div className="mx-auto mt-[28px] flex h-[48px] w-full max-w-[429px] items-center overflow-hidden rounded-[6px] border  border-[rgba(6,45,52,0.20)]">
                          <input
                            type="text"
                            value={`https://www.yourhomebase.co?ref=${referralCode}`}
                            disabled
                            className=" w-full border-none bg-transparent opacity-[0.5] outline-none"
                          />
                          <button
                            onClick={handleCopy}
                            className="h-full w-[56px] bg-[#366871]"
                          >
                            {copied ? (
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="text-[20px] text-white"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faCopy}
                                className="text-[20px] text-white"
                              />
                            )}
                          </button>
                        </div>
                        <div className="mx-auto w-fit">
                          <Image
                            src={listImg}
                            alt="list-img"
                            className="mt-[79px]"
                          />
                        </div>
                      </div>
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
