"use client";
import React from "react";
import Slider from "react-slick";
import Client11 from "@/app/assets/Home/img/Client11.png";
import Client12 from "@/app/assets/Home/img/Client12.png";
import Client14 from "@/app/assets/Home/img/Client14.png";
import Client15 from "@/app/assets/Home/img/Client15.png";
import Client16 from "@/app/assets/Home/img/Client16.png";
import Dmitry from "@/app/assets/Home/img/Dmitry.png";
import Ian from "@/app/assets/Home/img/Ian.png";
import star from "@/app/assets/Home/img/oneStar.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Image from "next/image";
const Clientslider = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,

    // autoplay: true,
    // autoplaySpeed: 5000,
    // pauseOnHover: true,

    cssEase: "linear",
  };
  return (
    <section className="client_say">
      {" "}
      <div className="px-3 sm:px-0">
        <div className="max-w-[1140px] w-full mx-auto relative pt-[50px] pb-11">
          <Slider {...settings}>
            <div className="text-center flex flex-col  items-center gap-4 max-w-full mx-auto w-full object-cover justify-center pb-[100px]">
              <div className="flex flex-col items-center justify-center w-[60%] mx-auto gap-3">
                <Image
                  className=""
                  src={Ian}
                  height={102}
                  width={102}
                  alt="top middle person"
                />
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="text-[#163930] text-[24px] font-semibold leading-[33px] font-Raleway">
                    Ian Tan
                  </h2>
                  <p className="text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]">
                    Homeowner (4 years)
                  </p>
                  <div className="flex flex-row justify-center gap-1">
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                  </div>
                </div>
                <div className="flex flex-row">
                  <svg
                    className="w-[150px] sm:w-[136px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="36"
                    viewBox="0 0 40 36"
                    fill="none"
                  >
                    <path
                      opacity="0.24"
                      d="M36.25 18H30V12.8571C30 10.0205 32.2422 7.71429 35 7.71429H35.625C36.6641 7.71429 37.5 6.85446 37.5 5.78571V1.92857C37.5 0.859821 36.6641 0 35.625 0H35C28.0938 0 22.5 5.75357 22.5 12.8571V32.1429C22.5 34.2723 24.1797 36 26.25 36H36.25C38.3203 36 40 34.2723 40 32.1429V21.8571C40 19.7277 38.3203 18 36.25 18ZM13.75 18H7.5V12.8571C7.5 10.0205 9.74219 7.71429 12.5 7.71429H13.125C14.1641 7.71429 15 6.85446 15 5.78571V1.92857C15 0.859821 14.1641 0 13.125 0H12.5C5.59375 0 0 5.75357 0 12.8571V32.1429C0 34.2723 1.67969 36 3.75 36H13.75C15.8203 36 17.5 34.2723 17.5 32.1429V21.8571C17.5 19.7277 15.8203 18 13.75 18Z"
                      fill="#163930"
                    />
                  </svg>
                  <p className="text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]">
                    <br /> I’ve always agonized over how I can save more money
                    on my mortgage payments each month. With the new card, I’m
                    able to build my nest egg while just paying my mortgage each
                    month. This is a game changer for me!
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-col  items-center gap-4 max-w-full mx-auto w-full object-cover justify-center pb-[100px]">
              <div className="flex flex-col items-center justify-center w-[60%]  mx-auto gap-3">
                <Image
                  className=""
                  src={Dmitry}
                  height={102}
                  width={102}
                  alt="top middle person"
                />
                <div className="flex flex-col gap-2 items-center">
                  <h2 className="text-[#163930] text-[24px] font-semibold leading-[33px] font-Raleway">
                    Dmitry Denisov
                  </h2>
                  <p className="text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]">
                    Homeowner (7 years)
                  </p>
                  <div className="flex flex-row justify-center gap-1">
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                    <Image src={star} alt="star" />
                  </div>
                </div>
                <div className="flex flex-row">
                  <svg
                    className="w-[150px] sm:w-[136px]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="200"
                    height="36"
                    viewBox="0 0 40 36"
                    fill="none"
                  >
                    <path
                      opacity="0.24"
                      d="M36.25 18H30V12.8571C30 10.0205 32.2422 7.71429 35 7.71429H35.625C36.6641 7.71429 37.5 6.85446 37.5 5.78571V1.92857C37.5 0.859821 36.6641 0 35.625 0H35C28.0938 0 22.5 5.75357 22.5 12.8571V32.1429C22.5 34.2723 24.1797 36 26.25 36H36.25C38.3203 36 40 34.2723 40 32.1429V21.8571C40 19.7277 38.3203 18 36.25 18ZM13.75 18H7.5V12.8571C7.5 10.0205 9.74219 7.71429 12.5 7.71429H13.125C14.1641 7.71429 15 6.85446 15 5.78571V1.92857C15 0.859821 14.1641 0 13.125 0H12.5C5.59375 0 0 5.75357 0 12.8571V32.1429C0 34.2723 1.67969 36 3.75 36H13.75C15.8203 36 17.5 34.2723 17.5 32.1429V21.8571C17.5 19.7277 15.8203 18 13.75 18Z"
                      fill="#163930"
                    />
                  </svg>
                  <p className="text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]">
                    <br />{" "}
                    {`Saving on home expenses means more unforgettable
                    adventures with my family. I'm all about prioritizing
                    quality time and financial security for me and my family`}
                  </p>
                </div>
              </div>
            </div>
          </Slider>
          <style jsx>{`
            :global(.slick-dots li.slick-active button:before) {
              color: #366871 !important; /* Black color for the active dot */
              opacity: 1 !important;
            }
          `}</style>
          {/* <div className='px-3 sm:px-0'>
          <div className='max-w-[1140px] w-full mx-auto relative px-3 sm:px-[55px] pt-[55px] pb-[50px] sm:pb-[100px]'>
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute left-3 md:left-[77px] bottom-2 md:bottom-[55px] '
              src={Client11}
              height={80}
              width={80}
              alt='bottom left person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute left-10 md:left-[227px] top-[97px]  '
              src={Client12}
              height={55}
              width={55}
              alt='top left person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-1 sm:right-10 md:right-[215px] top-[192px]  '
              src={Client14}
              height={48}
              width={48}
              alt='right middle person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-7 md:right-[74px] top-[97px]  '
              src={Client15}
              height={60}
              width={60}
              alt='right top person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-[65px] bottom-[30px]  '
              src={Client16}
              height={69}
              width={69}
              alt='bottom right person'
            />
            <div className='text-center flex flex-col  items-center gap-4 max-w-[671px] mx-auto w-full'>
              <Image
                className='w-[70px] sm:w-fit'
                src={Ralphimg}
                height={102}
                width={102}
                alt='top middle person'
              />
              <div className='flex flex-col gap-1 items-center'>
                <h2 className='text-[#163930] text-[24px] font-semibold leading-[33px] font-Raleway'>
                  Ralph Edwards
                </h2>
                <p className='text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]'>
                  Senior SEO Executive
                </p>
                <Image src={star} height={102} width={102} alt='stars' />
              </div>
              <p className='text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]'>
                I am absolutely delighted to share my positive experience as a
                client. From the moment I engaged with the company, I was met
                with exceptional professionalism and dedication to ensuring my
                satisfaction. The level of service provided was truly
                outstanding, and every interaction I had with the team was
                characterized by their unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        <div className='px-3 sm:px-0'>
          <div className='max-w-[1140px] w-full mx-auto relative px-3 sm:px-[55px] pt-[55px] pb-[50px] sm:pb-[100px]'>
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute left-3 md:left-[77px] bottom-2 md:bottom-[55px] '
              src={Client11}
              height={80}
              width={80}
              alt='bottom left person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute left-10 md:left-[227px] top-[97px]  '
              src={Client12}
              height={55}
              width={55}
              alt='top left person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-1 sm:right-10 md:right-[215px] top-[192px]  '
              src={Client14}
              height={48}
              width={48}
              alt='right middle person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-7 md:right-[74px] top-[97px]  '
              src={Client15}
              height={60}
              width={60}
              alt='right top person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-[65px] bottom-[30px]  '
              src={Client16}
              height={69}
              width={69}
              alt='bottom right person'
            />
            <div className='text-center flex flex-col  items-center gap-4 max-w-[671px] mx-auto w-full'>
              <Image
                className='w-[70px] sm:w-fit'
                src={Ralphimg}
                height={102}
                width={102}
                alt='top middle person'
              />
              <div className='flex flex-col gap-1 items-center'>
                <h2 className='text-[#163930] text-[24px] font-semibold leading-[33px] font-Raleway'>
                  Ralph Edwards
                </h2>
                <p className='text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]'>
                  Senior SEO Executive
                </p>
                <Image src={star} height={102} width={102} alt='stars' />
              </div>
              <p className='text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]'>
                I am absolutely delighted to share my positive experience as a
                client. From the moment I engaged with the company, I was met
                with exceptional professionalism and dedication to ensuring my
                satisfaction. The level of service provided was truly
                outstanding, and every interaction I had with the team was
                characterized by their unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        <div className='px-3 sm:px-0'>
          <div className='max-w-[1140px] w-full mx-auto relative px-3 sm:px-[55px] pt-[55px] pb-[50px] sm:pb-[100px]'>
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute left-3 md:left-[77px] bottom-2 md:bottom-[55px] '
              src={Client11}
              height={80}
              width={80}
              alt='bottom left person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute left-10 md:left-[227px] top-[97px]  '
              src={Client12}
              height={55}
              width={55}
              alt='top left person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-1 sm:right-10 md:right-[215px] top-[192px]  '
              src={Client14}
              height={48}
              width={48}
              alt='right middle person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-7 md:right-[74px] top-[97px]  '
              src={Client15}
              height={60}
              width={60}
              alt='right top person'
            />
            <Image
              className='max-sm:w-0 max-sm:h-0 absolute right-[65px] bottom-[30px]  '
              src={Client16}
              height={69}
              width={69}
              alt='bottom right person'
            />
            <div className='text-center flex flex-col  items-center gap-4 max-w-[671px] mx-auto w-full'>
              <Image
                className='w-[70px] sm:w-fit'
                src={Ralphimg}
                height={102}
                width={102}
                alt='top middle person'
              />
              <div className='flex flex-col gap-1 items-center'>
                <h2 className='text-[#163930] text-[24px] font-semibold leading-[33px] font-Raleway'>
                  Ralph Edwards
                </h2>
                <p className='text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]'>
                  Senior SEO Executive
                </p>
                <Image src={star} height={102} width={102} alt='stars' />
              </div>
              <p className='text-black opacity-[0.8] font-Raleway text-[16px] font-normal leading-[24px]'>
                I am absolutely delighted to share my positive experience as a
                client. From the moment I engaged with the company, I was met
                with exceptional professionalism and dedication to ensuring my
                satisfaction. The level of service provided was truly
                outstanding, and every interaction I had with the team was
                characterized by their unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </div> */}
          <div className="px-3 sm:px-0 max-sm:hidden block">
            <Image
              className="max-sm:w-0 max-sm:h-0 absolute left-3 md:left-[77px] bottom-2 md:bottom-[55px] "
              src={Client11}
              height={80}
              width={80}
              alt="bottom left person"
            />
            <Image
              className="max-sm:w-0 max-sm:h-0 absolute left-10 md:left-[227px] top-[97px]  "
              src={Client12}
              height={55}
              width={55}
              alt="top left person"
            />
            <Image
              className="max-sm:w-0 max-sm:h-0 absolute right-1 sm:right-10 md:right-[215px] top-[192px]  "
              src={Client14}
              height={48}
              width={48}
              alt="right middle person"
            />
            <Image
              className="max-sm:w-0 max-sm:h-0 absolute right-7 md:right-[74px] top-[97px]  "
              src={Client15}
              height={60}
              width={60}
              alt="right top person"
            />
            <Image
              className="max-sm:w-0 max-sm:h-0 absolute right-[65px] bottom-[30px]  "
              src={Client16}
              height={69}
              width={69}
              alt="bottom right person"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clientslider;
