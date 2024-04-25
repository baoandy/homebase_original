"use client";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

export default function Banner() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       setIsBannerVisible(false);
  //     }, 10000); // Hide the banner after 10 seconds

  //     return () => clearTimeout(timer);
  //   }, []);

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className="relative flex w-screen items-center gap-x-6 bg-primary px-6 py-4 sm:px-3.5 sm:before:flex-1">
      <div className="absolute left-0 top-0 h-full w-1.5 animate-pulse bg-white"></div>
      <div className="flex items-center gap-x-4">
        <span className="animate-bounce rounded bg-white px-2 py-0.5 font-bold text-primary">
          New
        </span>
        <p className="text-sm leading-6 text-white">
          <a href="#">
            <strong className="font-semibold">HomeBase</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Earn Points When You Join the Waitlist Today 🚀
          </a>
        </p>
      </div>
      <div className="flex flex-1 justify-end">
        {/* <button
          type="button"
          className="rounded-md bg-white p-1 text-primary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setIsBannerVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        </button> */}
      </div>
    </div>
  );
}
