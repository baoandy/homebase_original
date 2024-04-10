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
    <div className="shadow-md bg-gradient-to-r from-primary-rgba-20 via-white to-white flex overflow-hidden relative flex-row items-start self-center px-16 pb-14 max-w-full text-white min-h-[524px] rounded-[32px] w-[1336px] max-md:px-5">
      {/* left side */}
      <div className="flex flex-col justify-between gap-6 md:w-[50%] w-[100%]">
        <div className="">
          <h1 className="text-[36px] sm:text-[50px] sm:block hidden md:text-6xl  font-instrument font-bold leading-[120%] text-[#000F0B] max-w-[632px]   ">
            <br />
            Make Your <span className="relative z-20  ">Mortgage</span>{" "}
            <span className="relative z-20  ">
              Rewarding <ChangeCardTextIcon />
            </span>
          </h1>
          <h1 className="text-[30px] sm:hidden sm:text-[50px] md:text-6xl  font-instrument font-bold leading-[130%] text-[#000F0B] max-w-[632px]   ">
            <br />
            Make Your <span className="relative z-20  ">Mortgage</span>{" "}
            <span className="flex items-center gap-2 relative">
              Rewarding{" "}
              <span className="absolute -left-3 -top-5">
                <ChanageTextIcon />
              </span>
            </span>
          </h1>
        </div>
        <div className="mt-10 text-[16px] sm:text-[16px] font-instrument font-normal leading-[155%] text-[#2A2A2C] ">
          <p>
            Unlock rewards while paying your mortgage hassle-free every month.{" "}
            <strong>NO</strong> hidden fees or service charges.{" "}
          </p>
          Compatible with <strong>99%</strong> of mortgage servicers nationwide.
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <WaitListButton apiSecretKey={env.API_SECRET_KEY} />
          <div className="max-sm:w-[100px] max-sm:h-[40px] max-md:w-[120px] max-md:h-[48px] shadow-md  right-0 flex justify-center items-center overflow-hidden w-[160px] h-[64px] rounded-full bg-cover bg-center">
            <Image
              src={heroCards}
              alt=""
              className="mx-9 drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)] scale-[2]"
              width={400}
            />
          </div>
        </div>
        {/* user count */}
        <div className="bg-white p-4 rounded-xl flex  items-center gap-3 sm:gap-4">
          <div className="flex items-center">
            <Image
              className="w-[36px] sm:w-[48px] "
              src={userImg1}
              alt="user-img-1"
            />
            <Image
              className="-ml-[9px] sm:-ml-4 w-[36px] sm:w-[48px]"
              src={userImg2}
              alt="user-img-2"
            />
            <Image
              className="-ml-[9px] sm:-ml-4 w-[36px] sm:w-[48px] "
              src={userImg3}
              alt="user-img-3"
            />
          </div>
          <div>
            <h5 className="text-[13px] sm:text-[18px]  font-instrument font-medium leading-[145%] text-black">
              2k+
            </h5>
            <p className="text-[10px] sm:text-[14px] font-instrument font-normal leading-[155%] text-[#757575]    ">
              Don’t Hesitate. Join Other Wait list Users Today!
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div>
        <div className=" hidden absolute bottom-0 md:flex flex-col items-center z-20 gap-6">
          <Image
            className="w-[208px] md:w-[300px] lg:w-[377px] mb-[-98px] md:mb-[-184px] lg:mb-[-217px]  ml-[-43px] md:ml-[-34px] z-10"
            src={homeBaseCardImg}
            alt="cards img "
          />
          <Image
            className="w-[700px] md:block hidden lg:w-[819px]"
            src={handImg}
            alt="hand img "
          />
        </div>
        <svg
          className="absolute right-0 bottom-0 hidden sm:block"
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
