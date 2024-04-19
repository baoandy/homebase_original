"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

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
        <h1 className="mb-4 text-lg font-semibold">
          Application Submitted Successfully!
        </h1>
      )}
      {!submittedApplication && (
        <>
          <h1 className="mb-4 text-lg font-semibold">One More Step!</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
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

            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </>
      )}
    </>
  );
}
