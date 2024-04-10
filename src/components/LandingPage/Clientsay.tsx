"use client";
import React from "react";
import Clientslider from "./Clientslider";
import {
  ChanageTextIcon,
  Clientcircle1Icon,
  Clientcircle2Icon,
} from "./helper/Icon";
import Image from "next/image";

interface Props {
  children?: React.ReactNode;
}
const Clientsay: React.FC<Props> = ({ children }) => {
  return (
    <section
      id="testimonials"
      className="max-w-[1140px] mt-10 sm:mt-[87px] w-full mx-auto px-3 xl:px-0 "
    >
      <h1 className="text-center relative z-50 text-[#000F0B] font-instrument text-[32px] sm:text-[48px] font-bold leading-[52px]">
        What Are Our{" "}
        <span className="relative z-50">
          Customers
          <span className="absolute top-0 hidden sm:block sm:left-[-15px] z-[-2]">
            <ChanageTextIcon />
          </span>
        </span>{" "}
        Saying
      </h1>

      <div className=" relative mx-auto  my-[52px] rounded-[16px]  w-full shadow-[0px_0px_52px_0px_rgba(0,0,0,0.16)] overflow-hidden">
        {/* <div className=' absolute max-sm:hidden'>
          <Clientcircle1Icon />
        </div>
        <div className=' absolute right-0 bottom-0 max-sm:hidden'>
          <Clientcircle2Icon />
        </div> */}
        <Clientslider />
      </div>
    </section>
  );
};

export default Clientsay;
