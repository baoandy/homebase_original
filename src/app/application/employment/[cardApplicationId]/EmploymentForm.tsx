"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { set } from "date-fns";
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

interface EmploymentFormData {
  cardApplicationId: string;
  employmentStatus: string;
  annualIncome: number;
  companyName: string | number | readonly string[] | undefined;
  jobTitle: string | number | readonly string[] | undefined;
}

interface EmploymentDetailsFormProps {
  cardApplicationId: string;
  apiSecretKey: string;
}

export default function EmploymentDetailsForm({
  cardApplicationId,
  apiSecretKey,
}: EmploymentDetailsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [extraFields, setExtraFields] = useState(false);
  const { control, handleSubmit, setValue, watch } =
    useForm<EmploymentFormData>({
      defaultValues: {
        cardApplicationId,
        employmentStatus: "",
        companyName: "",
        jobTitle: "",
      },
    });
  async function onSubmit(data: EmploymentFormData) {
    setLoading(true);
    const response = await fetch("/api/application/employment-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify(data),
    });
    const { status, message } = await response.json();
    if (status === 200) {
      router.push(`/application/mortgage-details/${cardApplicationId}`);
    } else {
      alert(message);
    }
    setLoading(false);
  }
  const shouldShowExtraFields = [
    "Full Time Employee",
    "Part Time Employee",
    "Self Employed",
    "Independent Contractor",
  ];
  const hideExtraFields = ["Retired", "Unemployed", "Other"];
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
        setValue("annualIncome", cardApplication.annualIncome);
        setValue("employmentStatus", cardApplication.employmentStatus);
        if (
          [
            "Full Time Employee",
            "Part Time Employee",
            "Self Employed",
            "Independent Contractor",
          ].includes(cardApplication.employmentStatus)
        ) {
          setValue("companyName", cardApplication.companyName);
          setValue("jobTitle", cardApplication.jobTitle);
          setExtraFields(true);
        }
      }
    }
    fetchApplication();
  }, [apiSecretKey, cardApplicationId, setValue]);
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-5xl font-bold capitalize leading-[62.4px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
        <span className="text-slate-600">Employment</span> Details
      </h1>
      <p className="my-5 text-base leading-6 text-zinc-800 max-md:max-w-full">
        Please provide your employment details below.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                    if (shouldShowExtraFields.includes(e.target.value)) {
                      setExtraFields(true);
                    } else if (hideExtraFields.includes(e.target.value)) {
                      setExtraFields(false);
                      setValue("companyName", "");
                      setValue("jobTitle", "");
                    }
                  }}
                >
                  <option value="" disabled>
                    Select Employment Status
                  </option>
                  <option value="Full Time Employee">Employed Full Time</option>
                  <option value="Part Time Employee">Employed Part Time</option>
                  <option value="Self Employed">Self Employed</option>
                  <option value="Independent Contractor">
                    Independent Contractor
                  </option>
                  <option value="Retired">Retired</option>
                  <option value="Unemployed">Unemployed</option>
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
        <div className="mb-5">
          <Controller
            name="annualIncome"
            control={control}
            rules={{
              required: "Annual Income is required",
              pattern: {
                value: /^(?!0\d)\d*$/, // regex ensures no leading zeros and only digits
                message:
                  "Invalid annual income - please enter a positive number without leading zeros.",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="annualIncome"
                  className="block text-sm font-medium text-gray-700"
                >
                  Annual Income
                </label>
                <input
                  {...field}
                  type="number"
                  id="annualIncome"
                  placeholder="Annual Income"
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
        {extraFields && (
          <>
            <div className="mb-5">
              <Controller
                name="companyName"
                control={control}
                rules={{
                  required: "Company Name is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <label
                      htmlFor="companyName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company Name
                    </label>
                    <input
                      {...field}
                      type="text"
                      id="companyName"
                      placeholder="Company Name"
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
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
            <div className="mb-5">
              <Controller
                name="jobTitle"
                control={control}
                rules={{
                  required: "Job Title is required",
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Job Title
                    </label>
                    <input
                      {...field}
                      type="text"
                      id="jobTitle"
                      placeholder="Job Title"
                      className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                        error
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-primary focus:ring-primary"
                      }`}
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
          </>
        )}

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
            <div className="text-lg font-medium leading-7 text-black">4/6</div>
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
                src={barNoFill}
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
