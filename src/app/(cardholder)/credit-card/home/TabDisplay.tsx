"use client";
import React, { useState } from "react";
import PaymentHistory from "./PaymentHistory";
import PropertyValuePie from "./PropertyValuePie";
import Chart from "./HomePriceChart";

interface TabDisplayProps {
  equity: number;
  mortgage: number;
}

const TabDisplay = ({ equity, mortgage }: TabDisplayProps) => {
  const [open, setOpen] = useState("property-value");

  const handleTabOpen = (tabCategory: string) => {
    setOpen(tabCategory);
  };

  return (
    <section className="dark:bg-dark">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full border-l-4 px-4">
            <div className="shadow-1 dark:bg-dark-2  dark:shadow-card rounded-[10px] bg-white p-6">
              <div className="-mx-[6px] flex flex-col border-b sm:flex-row">
                <div className="px-[6px]">
                  <button
                    onClick={() => handleTabOpen("property-value")}
                    className={`-mb-[1px] w-full border-b-2 px-5 py-2 text-base font-medium ${
                      open === "property-value"
                        ? "bg-gray border-primary text-primary dark:bg-primary/10"
                        : "dark:text-dark-6 border-transparent text-black hover:border-primary hover:text-primary"
                    }`}
                  >
                    Property Value
                  </button>
                </div>
                <div className="px-[6px]">
                  <button
                    onClick={() => handleTabOpen("payment-history")}
                    className={`-mb-[1px] w-full border-b-2 px-5 py-2 text-base font-medium ${
                      open === "payment-history"
                        ? "bg-gray border-primary text-primary dark:bg-primary/10"
                        : "dark:text-dark-6 border-transparent text-black hover:border-primary hover:text-primary"
                    }`}
                  >
                    Payment History
                  </button>
                </div>

                <div className="px-[6px]">
                  <button
                    onClick={() => handleTabOpen("compare-homes")}
                    className={`-mb-[1px] w-full border-b-2 px-5 py-2 text-base font-medium ${
                      open === "compare-homes"
                        ? "bg-gray border-primary text-primary dark:bg-primary/10"
                        : "dark:text-dark-6 border-transparent text-black hover:border-primary hover:text-primary"
                    }`}
                  >
                    Compare Homes
                  </button>
                </div>
                <div className="px-[6px]">
                  <button
                    onClick={() => handleTabOpen("save")}
                    className={`-mb-[1px] w-full border-b-2 px-5 py-2 text-base font-medium ${
                      open === "save"
                        ? "bg-gray border-primary text-primary dark:bg-primary/10"
                        : "dark:text-dark-6 border-transparent text-black hover:border-primary hover:text-primary"
                    }`}
                  >
                    Save
                  </button>
                </div>
              </div>
              {open === "property-value" && (
                <div className="">
                  <PropertyValuePie equity={equity} mortgage={mortgage} />
                  <Chart />
                </div>
              )}
              {open === "payment-history" && <PaymentHistory />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TabDisplay;
