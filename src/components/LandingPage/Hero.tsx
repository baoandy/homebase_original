"use server";
import React from "react";
import {
  ChanageTextIcon,
  ChangeCardTextIcon,
  HeroShadowIcon,
  HeroShadowIcon2,
  HeroShadowIcon3,
} from "./helper/Icon";
import Image from "next/image";
import heroCards from "@/app/assets/Home/img/heroCards.gif";
import handImg from "@/app/assets/Home/img/handImg.png";
import handMobileImg from "@/app/assets/Home/img/handMobileImg.png";
import homeBaseCardImg from "@/app/assets/Home/img/homeBaseCardImg.png";
import userImg1 from "@/app/assets/Home/img/userImg1.png";
import userImg2 from "@/app/assets/Home/img/userImg2.png";
import userImg3 from "@/app/assets/Home/img/userImg3.png";
import WaitListButton from "../LandingPage/waitlist/WaitListButton";
import Link from "next/link";
import { env } from "@/lib/env";

export default async function Hero() {
  return (
    <div className="relative flex min-h-[524px] w-[1336px] max-w-full flex-row items-start self-center overflow-hidden rounded-[32px] bg-gradient-to-r from-primary-rgba-20 via-white to-white px-16 pb-14 text-white shadow-md max-md:px-5">
      {/* left side */}
      <div className="flex w-[100%] flex-col justify-between gap-6 md:w-[50%]">
        <div className="">
          <h1 className="font-instrument hidden max-w-[632px] text-[36px] font-bold  leading-[120%] text-[#000F0B] sm:block sm:text-[50px] md:text-6xl   ">
            <br />
            Make Your <span className="relative z-20  ">Mortgage</span>{" "}
            <span className="relative z-20  ">
              Rewarding <ChangeCardTextIcon />
            </span>
          </h1>
          <h1 className="font-instrument max-w-[632px] text-[30px] font-bold  leading-[130%] text-[#000F0B] sm:hidden sm:text-[50px] md:text-6xl   ">
            <br />
            Make Your <span className="relative z-20  ">Mortgage</span>{" "}
            <span className="relative flex items-center gap-2">
              Rewarding{" "}
              <span className="absolute -left-3 -top-5">
                <ChanageTextIcon />
              </span>
            </span>
          </h1>
        </div>
        <div className="font-instrument mt-10 text-[16px] font-normal leading-[155%] text-[#2A2A2C] sm:text-[16px] ">
          <p>
            Unlock rewards while paying your mortgage hassle-free every month.{" "}
            <strong>NO</strong> hidden fees or service charges.{" "}
          </p>
          Compatible with <strong>99%</strong> of mortgage servicers nationwide.
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <WaitListButton apiSecretKey={env.API_SECRET_KEY} />
          <div className="right-0 flex h-[64px] w-[160px] items-center  justify-center overflow-hidden rounded-full bg-cover bg-center shadow-md max-md:h-[48px] max-md:w-[120px] max-sm:h-[40px] max-sm:w-[100px]">
            <Image
              src={heroCards}
              alt=""
              className="mx-9 scale-[2] drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)]"
              width={400}
            />
          </div>
        </div>
        {/* user count */}
        <div className="flex items-center gap-3 rounded-xl  bg-white p-4 sm:gap-4">
          <div className="flex items-center">
            <Image
              className="w-[36px] sm:w-[48px] "
              src={userImg1}
              alt="user-img-1"
            />
            <Image
              className="-ml-[9px] w-[36px] sm:-ml-4 sm:w-[48px]"
              src={userImg2}
              alt="user-img-2"
            />
            <Image
              className="-ml-[9px] w-[36px] sm:-ml-4 sm:w-[48px] "
              src={userImg3}
              alt="user-img-3"
            />
          </div>
          <div>
            <h5 className="font-instrument text-[13px]  font-medium leading-[145%] text-black sm:text-[18px]">
              2k+
            </h5>
            <p className="font-instrument text-[10px] font-normal leading-[155%] text-[#757575] sm:text-[14px]    ">
              Don’t Hesitate. Join Other Wait list Users Today!
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div>
        <div className=" absolute bottom-0 z-10 hidden flex-col items-center gap-6 md:flex">
          <Image
            className="z-10 mb-[-98px] ml-[-43px] w-[208px] md:mb-[-184px] md:ml-[-34px]  md:w-[300px] lg:mb-[-217px] lg:w-[377px]"
            src={homeBaseCardImg}
            alt="cards img "
          />
          <Image
            className="hidden w-[700px] md:block lg:w-[819px]"
            src={handImg}
            alt="hand img "
          />
        </div>
        <svg
          className="absolute bottom-0 right-0 hidden sm:block"
          // width="624"
          height="100%"
          viewBox="0 0 624 670"
          fill="none"
        >
          <path
            d="M130.516 271.763C-72.922 127.741 5.72208 5.79081 72.22 -66.4929H640V737.493H188.405C342.736 622.93 227.147 335.342 130.516 271.763Z"
            fill="#366871"
            fillOpacity="0.32"
          />
        </svg>
      </div>
    </div>
  );
}
