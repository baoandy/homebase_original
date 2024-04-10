"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { prisma } from "@/lib/db/prisma";
import { Dialog, Transition } from "@headlessui/react";
import { set } from "zod";

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
        className={`font-semibold leading-[150%] text-[18px] w-full max-w-[328px] sm:max-w-full sm:w-[196px] h-[59px] rounded-md border-2 border-transparent transition duration-300 ease-in-out bg-[#163930] text-white hover:text-[#163930] font-instrument  hover:bg-white hover:border-[#163930] ${className}`}
      >
        Join the Waitlist
      </button>
      <dialog open={showModal} className="modal">
        <div className="modal-box w-2/3 shadow-2xl flex flex-col items-center py-12">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-black"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg pt-4 text-start text-black">
            Join the Waitlist!
          </h3>
          <div className="divider"></div>
          <form onSubmit={handleSubmit(onSubmit)} className="">
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
                <div className="text-red-500 mt-2">
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
                <div className="text-red-500 mt-2">
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                <div className="text-red-500 mt-2">{errors.email.message}</div>
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
                <div className="text-red-500 mt-2">
                  {errors.zipCode.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-outline btn-primary hover:text-white"
            >
              {!loading ? (
                "Submit"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
            {error && (
              <div className="alert alert-error h-10 flex mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current h-6 w-6"
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
      </dialog>
      <dialog open={showSuccess} className="modal">
        <div className="modal-box shadow-2xl">
          <h3 className="font-bold text-lg text-center py-4">Success!</h3>
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{`You're on the List!`}</span>
          </div>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => setShowSuccess(false)}
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}
