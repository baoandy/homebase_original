import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface PropertyValuePieProps {
  equity: number;
  mortgage: number;
}
const PropertyValuePie = ({ equity, mortgage }: PropertyValuePieProps) => {
  const series = [equity, mortgage];
  const options: ApexOptions = {
    chart: {
      fontFamily: "Inter, sans-serif",
      type: "donut",
      width: 120,
    },
    colors: ["#366871", "#13C296"],
    labels: ["Home Equity", "Mortgage"],
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
            <AnalyticsItem title="Equity" amount={equity} color="#366871" />
            <AnalyticsItem title="Mortgage" amount={mortgage} color="#13C296" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyValuePie;

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
          <span>
            {" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(amount)}
          </span>
        </p>
      </div>
    </div>
  );
};
