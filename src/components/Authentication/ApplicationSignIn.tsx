"use client";
import { signIn } from "@/auth";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { applicationSignin } from "@/actions/signin";

interface SignInFormData {
  email: string;
}

export function SignIn() {
  const { control, handleSubmit } = useForm<SignInFormData>();
  return (
    <form
      className="rounded-md bg-white p-6 shadow-md"
      //   action={async (formData) => {
      //     "use server";
      //     await signIn("sendgrid", formData, {
      //       redirectTo: "/application",
      //     });
      //   }}
      action={applicationSignin}
    >
      <div className="mb-4 flex justify-center">
        <Mail className="h-6 w-6 text-primary" />
      </div>

      <div className="mb-4 flex justify-center">
        <h1 className="text-xl font-semibold">
          Create Account to Begin Application
        </h1>
      </div>

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <input
              {...field}
              type="email"
              required
              aria-required="true"
              placeholder="Enter your email"
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
      <button
        type="submit"
        className="my-4 w-full rounded-md bg-primary px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
}
