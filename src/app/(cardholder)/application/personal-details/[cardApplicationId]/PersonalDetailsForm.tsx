"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
interface PersonalDetailsFormData {
  cardApplicationId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

interface PersonalDetailsFormProps {
  cardApplicationId: string;
  apiSecretKey: string;
}

export default function PersonalDetailsForm({
  cardApplicationId,
  apiSecretKey,
}: PersonalDetailsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setValue } = useForm<PersonalDetailsFormData>({
    defaultValues: {
      cardApplicationId,
    },
  });
  async function onSubmit(formData: PersonalDetailsFormData) {
    setLoading(true);
    const response = await fetch("/api/application/personal-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        secretKey: apiSecretKey,
      },
      body: JSON.stringify(formData),
    });
    const { status, message } = await response.json();
    if (status === 200) {
      router.push(`/application/current-address/${cardApplicationId}`);
    } else {
      alert(message);
    }
    setLoading(false);
  }
  useEffect(() => {
    async function fetchPersonalDetails() {
      const response = await fetch(
        `/api/application/fetch-personal-details/${cardApplicationId}`,
        {
          headers: {
            secretKey: apiSecretKey,
          },
        },
      );
      const { status, user } = await response.json();
      console.log(user);
      if (status === 200) {
        setValue("firstName", user.first_name);
        setValue("lastName", user.last_name);
        setValue("dateOfBirth", user.date_of_birth);
        setValue("phoneNumber", user.phone_number);
      }
    }
    fetchPersonalDetails();
  }, [apiSecretKey, cardApplicationId, setValue]);
  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="text-5xl font-bold capitalize leading-[62.4px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
        <span className="text-slate-600">Account</span> Details
      </h1>
      <p className="my-5 text-base leading-6 text-zinc-800 max-md:max-w-full">
        Tell us a bit about yourself to get started
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: "First name is required",
              pattern: {
                value: /^[A-Z][a-z]{1,}$/,
                message: "Invalid first name",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  {...field}
                  type="text"
                  id="firstName"
                  placeholder="John"
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
            name="lastName"
            control={control}
            rules={{
              required: "Last Name is required",
              pattern: {
                value: /^[A-Z][a-z]+(?:[ '-][A-Z][a-z]+)*$/,
                message: "Invalid last name",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  {...field}
                  type="text"
                  id="lastName"
                  placeholder="Doe"
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
            name="phoneNumber"
            control={control}
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\d{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...field}
                  type="tel"
                  id="phoneNumber"
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:ring-primary"
                  }`}
                  maxLength={10}
                  placeholder="1234567890"
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
            name="dateOfBirth"
            control={control}
            rules={{ required: "Date of Birth is required" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birthday
                </label>
                <input
                  {...field}
                  type="date"
                  id="dateOfBirth"
                  className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-primary sm:text-sm ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary focus:ring-primary"
                  }`}
                  placeholder="YYYY-MM-DD"
                  pattern="\d{4}-\d{2}-\d{2}"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
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
            <div className="text-lg font-medium leading-7 text-black">1/4</div>
            <div className="mt-2.5 flex gap-2 p-1.5">
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

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
