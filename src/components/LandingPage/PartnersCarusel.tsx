import Image from "next/image";
import React from "react";

// Import images from your assets path
import Accor from "@/app/assets/Home/img/partners/Accor.png";
import AeroMexico from "@/app/assets/Home/img/partners/AeroMexico.png";
import AirFrance from "@/app/assets/Home/img/partners/AirFrance.png";
import Amazon from "@/app/assets/Home/img/partners/Amazon.png";
import Avianca from "@/app/assets/Home/img/partners/Avianca.png";
import BestBuy from "@/app/assets/Home/img/partners/BestBuy.png";
import BritishAirways from "@/app/assets/Home/img/partners/BritishAirways.png";
import Etihad from "@/app/assets/Home/img/partners/Etihad.png";
import IHG from "@/app/assets/Home/img/partners/IHG.png";
import JetBlue from "@/app/assets/Home/img/partners/JetBlue.png";
import Marriott from "@/app/assets/Home/img/partners/Marriott.png";
import QatarAirways from "@/app/assets/Home/img/partners/QatarAirways.png";
import Starbucks from "@/app/assets/Home/img/partners/Starbucks.png";
import Target from "@/app/assets/Home/img/partners/Target.png";
import TurkishAirlines from "@/app/assets/Home/img/partners/TurkishAirlines.png";
import Walmart from "@/app/assets/Home/img/partners/Walmart.png";

const partnerImgs = [
  Accor,
  AeroMexico,
  AirFrance,
  Amazon,
  Avianca,
  BestBuy,
  BritishAirways,
  Etihad,
  IHG,
  JetBlue,
  Marriott,
  QatarAirways,
  Starbucks,
  Target,
  TurkishAirlines,
  Walmart,
  Accor,
  AeroMexico,
  AirFrance,
  Amazon,
  Avianca,
  BestBuy,
  BritishAirways,
  Etihad,
  IHG,
  JetBlue,
  Marriott,
  QatarAirways,
  Starbucks,
  Target,
  TurkishAirlines,
  Walmart,
  Accor,
  AeroMexico,
  AirFrance,
  Amazon,
  Avianca,
  BestBuy,
  BritishAirways,
  Etihad,
  IHG,
  JetBlue,
  Marriott,
  QatarAirways,
  Starbucks,
  Target,
  TurkishAirlines,
  Walmart,
  Accor,
  AeroMexico,
  AirFrance,
  Amazon,
  Avianca,
  BestBuy,
  BritishAirways,
  Etihad,
  IHG,
  JetBlue,
  Marriott,
  QatarAirways,
  Starbucks,
  Target,
  TurkishAirlines,
  Walmart,
  Accor,
  AeroMexico,
  AirFrance,
  Amazon,
  Avianca,
  BestBuy,
  BritishAirways,
  Etihad,
  IHG,
  JetBlue,
  Marriott,
  QatarAirways,
  Starbucks,
  Target,
  TurkishAirlines,
  Walmart,
];

const PartnersCarousel: React.FC = () => {
  return (
    // 
    <div className="max-w-[1325px] flex flex-col items-center justify-center gap-16 overflow-hidden">
      <div className="flex flex-col text-center">
        <p className="font-instrument text-[28px] font-bold capitalize leading-[32px] text-black sm:text-[48px] sm:leading-[52px] ">
          HomeBase Reward Partners
        </p>
        <p className="text-[16px] font-instrument font-normal pt-[16px] text-black leading-[24px] opacity-[0.8]">
          HomeBase points can be transferred to reward points with our partner
          programs, or redeemed for gift cards from our merchant partners.
        </p>
      </div>
      <div className="animate-slide hover:pause flex gap-16 whitespace-nowrap">
        {partnerImgs.concat(partnerImgs).map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Partner ${index + 1}`}
            height={60}
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersCarousel;
