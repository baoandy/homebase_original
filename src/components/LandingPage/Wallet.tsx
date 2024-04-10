"use client";
import Image from "next/image";
import React from "react";

import dashboardCardImg from "@/app/assets/Home/img/dashboardCardImg.png";
import dashboardCardImg2 from "@/app/assets/Home/img/dashboardCardImg2.png";

import creditCardImg from "@/app/assets/Home/img/creditCardImg.png";
import mobileCardImg from "@/app/assets/Home/img/mobileCardImg.png";

interface Props {
  children?: React.ReactNode;
}
const Wallet: React.FC<Props> = ({ children }) => {
  return (
    <>
      <section
        id="product"
        className=" max-w-[1920px] w-full mx-auto sm:bg-walletbgimg bg-no-repeat bg-cover"
      >
        <div className="w-full mx-auto px-3 xl:px-0 flex flex-col justify-center items-center gap-[90px]">
          <div className="md:px-[80px] px-9 flex flex-col-reverse  items-center  lg:flex-row gap-[40px]">
            <Image
              src={mobileCardImg}
              alt="mobile image"
              // width={461}
              // height={455}
            />
            <div className="lg:mt-[70px] max-w-[627px] w-full ">
              <p className="font-instrument font-bold text-[28px] sm:text-[48px] text-black leading-[32px] sm:leading-[52px] capitalize ">
                Go from Paying, <br className="block sm:hidden" /> To Earning
              </p>
              <p className="text-[16px] font-instrument font-normal pt-[16px] text-black leading-[24px] opacity-[0.8]">
                Imagine turning your mortgage, your largest monthly expense,
                into a source of rewards. No longer just a drain on your
                finances, it transform into an investment that pays you back. By
                joining our community, you can transform the way you view home
                ownership, unlocking a world where your financial decisions
                improves your home and living situation. Start today and
                discover the potential of your home!
                <br />
                <br />
                <br />
                Step into a world where transactions are seamless, free from
                additional fees, and where every expenditure for your home
                brings its own rewards. With our innovative platform, investing
                in your lifestyle becomes more than just paying for a place to
                live; it becomes a pathway to a secured future for you and your
                family.
              </p>
            </div>
          </div>
          <div className="p-10 flex flex-col items-center sm:gap-[55px] lg:flex-row justify-center max-w-[1336px] bg-[#F1F1F1] rounded-[32px] gap-9">
            <div className="max-w-[558px] w-full">
              <p className=" font-instrument font-bold text-[28px] sm:text-[48px] text-black leading-[32px] sm:leading-[52px] capitalize">
                Manage your Expenses, Easily.
              </p>
              <p className="text-[16px] font-instrument font-normal mt-[16px] text-black leading-[24px] opacity-[0.8]">
                Our intuitive spend management system and HomeBase dashboard
                empower you to make informed financial decisions, providing a
                clear view of your financial well-being.
                <br />
                <br />
                We take a proactive approach to managing your home maintenance
                and financial health, offering tailored suggestions to maximize
                savings{" "}
              </p>
            </div>
            <div>
              <Image
                className=" shadow-xl"
                src={dashboardCardImg2}
                alt="dashboard image"
                width={632}
                height={419}
              />
              <div className="w-[65%] ml-[12%] mt-[-25%]">
                <Image
                  className="shadow-xl"
                  src={creditCardImg}
                  alt="card image"
                  width={415}
                  height={0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wallet;
