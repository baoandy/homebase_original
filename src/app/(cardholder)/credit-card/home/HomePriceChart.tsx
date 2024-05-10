"use client";
import { torrancePrices } from "./TorrancePrices";
import { ApexOptions } from "apexcharts";

import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = () => {
  const series = [
    {
      name: "Home Values",
      data: torrancePrices.map((price) => price.price),
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#3758F9", "#13C296"],
    chart: {
      fontFamily: "Inter, sans-serif",
      height: 450,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [4, 4],
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      type: "datetime",
      categories: torrancePrices.map((price) => price.date),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        formatter: function (value: string) {
          return new Date(value).toLocaleString("default", {
            month: "short",
            year: "numeric",
          });
        },
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      labels: {
        style: {
          colors: ["#333"],
        },
        formatter: function (value: number) {
          return (
            "$" +
            value.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })
          );
        },
      },
    },
  };

  return (
    <section className="bg-gray-2 dark:bg-dark py-20 lg:py-[120px]">
      <div className="mx-auto px-4 md:container">
        <div className="border-stroke dark:border-dark-3 dark:bg-dark-2 mx-auto w-full max-w-[760px] rounded-lg border bg-white px-5 pb-5 pt-[30px] sm:px-[30px]">
          <div className="flex justify-between">
            <div>
              <p className="text-body-color dark:text-dark-6 text-sm sm:text-base">
                Median Home Values in Your Area
              </p>
            </div>
          </div>
          <div id="chartOne" className="-mx-5">
            <ReactApexChart options={options} series={series} type="line" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chart;
