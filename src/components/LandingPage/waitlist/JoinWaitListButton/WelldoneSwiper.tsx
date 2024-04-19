import React, { useState } from "react";
import Slider from "react-slick";
import Image, { StaticImageData } from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import amazon from "@/app/assets/JoinWailtListModal/amazone-img (1).png";
import airline from "@/app/assets/JoinWailtListModal/american-airline-img.png";
import delta from "@/app/assets/JoinWailtListModal/delta-img.png";
import hilton from "@/app/assets/JoinWailtListModal/hilton-img.png";
import marriot from "@/app/assets/JoinWailtListModal/marriot-img.png";
import republic from "@/app/assets/JoinWailtListModal/republic-img.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
interface ServiceImage {
  img: StaticImageData;
  img2: StaticImageData;
}
interface Arrow {
  props: any;
  onClick: any;
}
const PrevArrow: React.FC<Arrow> = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-[35%] top-[115%] z-10 h-8 w-8 rounded-full border border-[#366871] bg-white pr-[2px] text-[#366871] hover:bg-[#366871] hover:text-white sm:left-[40%] md:left-[44%] lg:left-[46%]"
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};
const NextArrow: React.FC<Arrow> = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-[35%] top-[115%] z-10 h-8 w-8 rounded-full border  border-[#366871] bg-white pl-[2px] text-[#366871] hover:bg-[#366871] hover:text-white sm:right-[40%] md:right-[43%] lg:right-[46%]"
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  );
};
function WelldoneSwiper() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    prevArrow: <PrevArrow props="props" onClick="onClick" />,
    nextArrow: <NextArrow props="props" onClick="onClick" />,
    slidesToScroll: 1,
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.7,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2.3,
          infinite: true,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1.5,
          infinite: false,
        },
      },
    ],
  };
  const services: ServiceImage[] = [
    {
      img: airline,
      img2: hilton,
    },
    {
      img: delta,
      img2: marriot,
    },
    {
      img: amazon,
      img2: republic,
    },
  ];
  return (
    <Slider {...settings}>
      {services.map((item, index) => (
        <div key={index} className="flex flex-col pl-3 ">
          <div className="flex h-[100px] w-full items-center  justify-center rounded-[16px] border border-[rgba(6,45,52,0.56);] transition duration-300 ease-in-out hover:shadow-[0px_7px_20.5px_0px_rgba(54,104,113,0.23);] sm:p-4 md:h-[157px] xl:max-w-[326px]">
            <Image src={item.img} alt="hello" className="max-md:w-fit" />
          </div>
          <div className="mt-[30px] flex h-[100px] w-full items-center justify-center rounded-[16px] border border-[rgba(6,45,52,0.56);] transition duration-300 ease-in-out hover:shadow-[0px_7px_20.5px_0px_rgba(54,104,113,0.23);] sm:p-4 md:h-[157px] xl:max-w-[326px]">
            <Image src={item.img2} alt="hello2" className="max-md:w-fit" />
          </div>
        </div>
      ))}
    </Slider>
  );
}
export default WelldoneSwiper;
