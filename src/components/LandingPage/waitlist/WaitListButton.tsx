"use client";

import React, { useState, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { prisma } from "@/lib/db/prisma";
import { Dialog, Transition } from "@headlessui/react";
import { set } from "zod";
import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/20/solid";

interface WaitListButtonProps {
  className?: string;
  apiSecretKey: string;
}

interface WaitListFormData {
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
}

export default function WaitListButton({
  className,
  apiSecretKey,
}: WaitListButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
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
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setShowModal(false);
      setShowSuccess(true);
    } else if (res.status === 400) {
      const message = await res.text();
      setError(message);
    } else {
      setError("An error occurred. Please try again later.");
    }
    setLoading(false);
  }
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
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
                      </Dialog.Title>
                      <form onSubmit={handleSubmit(onSubmit)} className="my-4">
                        <div className="mb-5">
                          <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "First Name is Required",
                              pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: "Invalid Format",
                              },
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="input input-bordered text-gray-900"
                                placeholder="First Name"
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setError("");
                                }}
                              />
                            )}
                          />
                          {errors.firstName && (
                            <div className="mt-2 text-red-500">
                              {errors.firstName.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-5">
                          <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Last Name is Required",
                              pattern: {
                                value: /^[a-zA-Z\s.-]+$/,

                                message: "Invalid Format",
                              },
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="input input-bordered  text-gray-900"
                                placeholder="Last Name"
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setError("");
                                }}
                              />
                            )}
                          />
                          {errors.lastName && (
                            <div className="mt-2 text-red-500">
                              {errors.lastName.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-5">
                          <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Email is Required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid Format",
                              },
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="input input-bordered  text-gray-900"
                                placeholder="Email"
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setError("");
                                }}
                              />
                            )}
                          />
                          {errors.email && (
                            <div className="mt-2 text-red-500">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                        <div className="mb-5">
                          <Controller
                            name="zipCode"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: "Zip Code is Required",
                              pattern: {
                                value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                                message: "Invalid Format",
                              },
                            }}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="text"
                                className="input input-bordered  text-gray-900"
                                placeholder="Zip Code"
                                value={field.value}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setError("");
                                }}
                              />
                            )}
                          />
                          {errors.zipCode && (
                            <div className="mt-2 text-red-500">
                              {errors.zipCode.message}
                            </div>
                          )}
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
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative z-50 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                      <CheckIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Success!
                      </Dialog.Title>
                      <p>You're on the list</p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
