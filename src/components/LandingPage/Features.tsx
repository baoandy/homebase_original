import Image from "next/image";
import React from "react";
import { FeatureTextIcon, PrivacyIcon } from "./helper/Icon";
import { cardsData } from "./helper/Helper";
import featureCircle1 from "@/app/assets/Home/img/featureCircle1.png";
import featureCircle2 from "@/app/assets/Home/img/featureCircle2.png";

interface Props {
  children?: React.ReactNode;
}

const Features: React.FC<Props> = ({ children }) => {
  return (
    <section id="features" className="relative max-w-[1920px] w-full mx-auto">
      <div className="max-w-[1140px] w-full mx-auto px-6 xl:px-0 py-[50px] sm:py-[80px] md:py-[100px] lg:py-20">
        <div className="absolute top-[127px] left-0 z-[-1]">
          <Image src={featureCircle1} alt="circle-1" width={209} height={209} />
        </div>
        <div className="absolute bottom-[47px] right-0 z-[-1]">
          <Image src={featureCircle2} alt="circle-2" width={209} height={209} />
        </div>
        <div>
          <h2 className="text-center text-[#000F0B] text-[35px] sm:text-[48px] leading-[40px] sm:leading-[52px] mx-auto w-full font-bold font-instrument capitalize">
            <span>
              The{" "}
              <span className="relative">
                Only Card
                <span className="absolute -left-3">
                  <FeatureTextIcon />
                </span>
              </span>{" "}
              For Your Home <br /> And Your Lifestyle
            </span>{" "}
          </h2>
        </div>
        <div className="max-lg:max-w-[640px] w-full max-lg:mx-auto mt-[52px] lg:flex grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
          {cardsData.map((items, index) => (
            <div
              key={index}
              className="w-[267px] h-[263px] mx-auto lg:mx-0 rounded-[12px] border border-[rgba(0,15,11,0.12)] bg-white hover:shadow-[0px_0px_16px_0px_rgba(0,0,0,0.16)] duration-500 p-6"
            >
              <div>{items.icon}</div>
              <div className="mt-5">
                <p className="text-black text-[20px] leading-7 font-instrument font-semibold">
                  {items.name}
                </p>
              </div>
              <div className="mt-[5px]">
                <p className="text-[#000F0B] font-instrument font-normal text-[16px] leading-6">
                  {items.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
