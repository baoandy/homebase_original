"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import barFill from "@/app/assets/Onboarding/barFill.png";
import barNoFill from "@/app/assets/Onboarding/barNoFill.png";

const styles = {
  bar: {
    width: "50px", // Default width for non-mobile devices
    height: "3px",
  },
  barMobile: {
    width: "15px", // Width for mobile devices
    height: "3px",
  },
};

interface MortgageDetailsFormData {
  cardApplicationId: string;
  monthlyMortgagePayment: number;
  yearMortgageOriginated: number;
}

interface MortgageDetailsFormProps {
  cardApplicationId: string;
  apiSecretKey: string;
}

export default function MortgageDetailsForm({
  cardApplicationId,
  apiSecretKey,
}: MortgageDetailsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [extraFields, setExtraFields] = useState(false);
  const { control, handleSubmit, setValue, watch } =
    useForm<MortgageDetailsFormData>({
      defaultValues: {
        cardApplicationId,
      },
    });
  async function onSubmit(data: MortgageDetailsFormData) {
    setLoading(true);
    const response = await fetch("/api/application/mortgage-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify(data),
    });
    const { status, message } = await response.json();
    if (status === 200) {
      router.push(`/application/submit/${cardApplicationId}`);
    } else {
      alert(message);
    }
  }
  useEffect(() => {
    async function fetchApplication() {
      const response = await fetch(
        `/api/application/fetch-application/${cardApplicationId}`,
        {
          headers: {
            secretKey: apiSecretKey,
          },
        },
      );
      const resData = await response.json();
      if (resData.status === 200) {
        const { cardApplication } = resData;
        setValue("monthlyMortgagePayment", cardApplication.mortgageAmount);
        setValue(
          "yearMortgageOriginated",
          cardApplication.yearMortgageOriginated,
        );
      }
    }
    fetchApplication();
  }, [apiSecretKey, cardApplicationId, setValue]);
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-5xl font-bold capitalize leading-[62.4px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
        <span className="text-slate-600">Mortgage</span> Details
      </h1>
      <p className="my-5 text-base leading-6 text-zinc-800 max-md:max-w-full">
        Please provide the following details about your mortgage.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Controller
            name="monthlyMortgagePayment"
            control={control}
            rules={{
              required: "Monthly Mortgage Payment is required",
              pattern: {
                value: /^(?!0\d)\d*$/, // regex ensures no leading zeros and only digits
                message:
                  "Invalid monthly mortgage amount - please enter a positive number without leading zeros.",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="monthlyMortgagePayment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Monthly Mortgage Payment
                </label>
                <input
                  {...field}
                  type="number"
                  id="monthlyMortgagePayment"
                  placeholder="3000"
                  min="1"
                  step="1"
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:ring-primary"
                  }`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="mb-5">
          <Controller
            name="yearMortgageOriginated"
            control={control}
            rules={{
              required: "The year you got your mortgage is required",
              pattern: {
                value: /^(?!0\d)\d*$/, // regex ensures no leading zeros and only digits
                message:
                  "Invalid year - please enter a positive number without leading zeros.",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="yearMortgageOriginated"
                  className="block text-sm font-medium text-gray-700"
                >
                  Year Mortgage Originated
                </label>
                <input
                  {...field}
                  type="number"
                  id="yearMortgageOriginated"
                  placeholder="2020"
                  min="1"
                  step="1"
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:ring-primary"
                  }`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error.message}</p>
                )}
              </>
            )}
          />
        </div>
        <div className="mt-32 flex  w-full flex-col gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
          <div className="flex justify-between gap-5 whitespace-nowrap text-base font-semibold leading-6">
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
          <div className="mt-2 flex w-fit shrink-0 grow basis-0 flex-col self-start">
            <div className="text-lg font-medium leading-7 text-black">5/6</div>
            <div className="mt-2.5 flex gap-2 p-1.5">
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
              <Image
                src={barNoFill}
                alt="Progress bar"
                style={window.innerWidth < 640 ? styles.barMobile : styles.bar}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
