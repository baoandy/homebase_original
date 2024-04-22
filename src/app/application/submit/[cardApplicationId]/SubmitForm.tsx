"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import barFill from "@/app/assets/Onboarding/barFill.png";
import barNoFill from "@/app/assets/Onboarding/barNoFill.png";

const styles = {
  bar: {
    width: "75px", // Default width for non-mobile devices
    height: "3px",
  },
  barMobile: {
    width: "22px", // Width for mobile devices
    height: "3px",
  },
};

interface SubmitFormData {
  cardApplicationId: string;
  ssId: string;
}

interface SubmitFormProps {
  cardApplicationId: string;
  apiSecretKey: string;
}

export default function MortgageDetailsForm({
  cardApplicationId,
  apiSecretKey,
}: SubmitFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [extraFields, setExtraFields] = useState(false);
  const { control, handleSubmit, setValue, watch } = useForm<SubmitFormData>({
    defaultValues: {
      cardApplicationId,
    },
  });
  const [submittedApplication, setSubmittedApplication] = useState(false);
  async function onSubmit(data: SubmitFormData) {
    setLoading(true);
    const response = await fetch("/api/application/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify(data),
    });
    const { status, message } = await response.json();
    if (status === 200) {
      window.location.reload();
    } else {
      alert(message);
    }
    setLoading(false);
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
        if (!cardApplication.user.first_name) {
          router.push(`/application/personal-details/${cardApplicationId}`);
        } else if (!cardApplication.currentAddressId) {
          router.push(`/application/current-address/${cardApplicationId}`);
        } else if (!cardApplication.employmentStatus) {
          router.push(`/application/employment-status/${cardApplicationId}`);
        }
        if (cardApplication.ssid) {
          setSubmittedApplication(true);
        }
      }
    }
    fetchApplication();
  }, [apiSecretKey, cardApplicationId, setValue, router]);
  return (
    <>
      {submittedApplication && (
        <div className="flex w-full flex-col items-center">
          <h1 className="text-5xl font-bold capitalize leading-[62.4px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
            <span className="text-slate-600">Application</span> Submitted
          </h1>
          <p className="my-5 text-base leading-6 text-zinc-800 max-md:max-w-full">
            Thanks for submitting your application. We will review your
            application and get back to you soon.
          </p>
        </div>
      )}
      {!submittedApplication && (
        <div className="flex w-full flex-col items-center">
          <h1 className="text-5xl font-bold capitalize leading-[62.4px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
            <span className="text-slate-600">Submit</span> Application
          </h1>
          <p className="my-5 text-base leading-6 text-zinc-800 max-md:max-w-full">
            Please enter your Social Security ID to submit your application.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-5">
              <Controller
                name="ssId"
                control={control}
                rules={{
                  required: "Social Security ID is required",
                  pattern: {
                    // This pattern ensures that the input is exactly 9 digits (or 11 with dashes).
                    value:
                      /^(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
                    message: "Invalid Social Security ID",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <label
                      htmlFor="ssId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Social Security ID
                    </label>
                    <input
                      {...field}
                      type="text"
                      id="ssId"
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
                      placeholder="123-45-6789"
                      maxLength={11}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const formattedValue = inputValue
                          .replace(/\D/g, "")
                          .replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
                        field.onChange(formattedValue);
                      }}
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500">
                        {error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="mt-12 flex  w-full flex-col gap-5 max-md:mt-10 max-md:max-w-full max-md:flex-wrap">
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
                <div className="text-lg font-medium leading-7 text-black">
                  4/4
                </div>
                <div className="mt-2.5 flex gap-2 p-1.5">
                  <Image
                    src={barFill}
                    alt="Progress bar"
                    style={
                      window.innerWidth < 640 ? styles.barMobile : styles.bar
                    }
                  />
                  <Image
                    src={barFill}
                    alt="Progress bar"
                    style={
                      window.innerWidth < 640 ? styles.barMobile : styles.bar
                    }
                  />
                  <Image
                    src={barFill}
                    alt="Progress bar"
                    style={
                      window.innerWidth < 640 ? styles.barMobile : styles.bar
                    }
                  />
                  <Image
                    src={barFill}
                    alt="Progress bar"
                    style={
                      window.innerWidth < 640 ? styles.barMobile : styles.bar
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
