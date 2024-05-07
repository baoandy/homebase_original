import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const SpendPie = () => {
  const series = [1500, 550, 250, 95, 225];
  const options: ApexOptions = {
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "donut",
      width: 120,
    },
    colors: ["#366871", "#13C296", "#F2C94C", "#F2994A", "#B3B3B3"],
    labels: ["Mortgage", "Groceries", "Restaurants", "Transport", "Other"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
  };

  return (
    <section className="bg-gray-2 dark:bg-dark">
      <div className="mx-auto px-4 md:container">
        <div className="border-stroke dark:border-dark-3 dark:bg-dark-2 mx-auto w-full max-w-[540px] rounded-lg border bg-white px-5 pb-5 pt-[30px] sm:px-[30px]">
          <div className="mb-2">
            <div id="chartOne" className="chart-10 mx-auto flex justify-center">
              <ReactApexChart
                options={options}
                series={series}
                type="donut"
                width={380}
              />
            </div>
          </div>

          <div className="-mx-8 flex flex-wrap items-center justify-center">
            <AnalyticsItem title="Mortgage" amount={1500} color="#366871" />
            <AnalyticsItem title="Groceries" amount={550} color="#13C296" />
            <AnalyticsItem title="Restaurants" amount={250} color="#F2C94C" />
            <AnalyticsItem title="Transport" amount={95} color="#F2994A" />
            <AnalyticsItem title="Other" amount={225} color="#B3B3B3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpendPie;

const AnalyticsItem = ({
  title,
  amount,
  color,
}: {
  title: string;
  amount: number;
  color: string;
}) => {
  return (
    <div className="mb-3 w-full px-8 sm:w-1/2">
      <div className="flex w-full items-center">
        <span
          className={`mr-2 block h-3 w-full max-w-[12px] rounded-full`}
          style={{ backgroundColor: color }}
        ></span>
        <p className="text-dark flex w-full justify-between text-sm ">
          <span> {title} </span>
          <span> ${amount.toFixed(2)} </span>
        </p>
      </div>
    </div>
  );
};
