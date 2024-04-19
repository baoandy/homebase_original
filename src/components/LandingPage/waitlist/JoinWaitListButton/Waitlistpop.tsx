import React from "react";
import Link from "next/link";
import Waitlistdrop from "./Waitlistdrop";
import {
  Waitlist1,
  Waitlist2,
  Waitlist3,
  Waitlist4,
  Waitlist5,
} from "./Dropmaping";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
interface handleModalProps {
  handleModal: any;
  termsConditions: any;
}

const Waitlistpop: React.FC<handleModalProps> = ({
  handleModal,
  termsConditions,
}) => {
  return (
    <>
      <div className="  w-full">
        <div className=" mx-auto flex w-full  flex-col overflow-hidden rounded-2xl bg-white  lg:flex-row lg:rounded-[32px]">
          <div className="mx-auto px-6 pb-[21px]  pt-[50px] lg:w-[60%] ">
            <h1 className="font-nunito mx-auto w-full max-w-[458px] text-center text-xl font-bold leading-[130%] text-black sm:text-[30px]">
              CONGRATS! You're one step closer to rewarding your home!{" "}
            </h1>
            <div className="mt-[51px] h-[1px] w-full bg-[linear-gradient(90deg,rgba(0,0,0,0.00)_2.67%,#000_41.13%,#303030_68.55%,rgba(102,102,102,0.00)_100%)]"></div>
            <p className="font-nunito  mx-auto w-full max-w-[411px] pt-3 text-center text-[12px] font-bold text-[#2A2A2C] sm:text-base ">
              Earn <span className="text-xl sm:text-2xl">500</span> points when
              you provide us with more information about yourself.
            </p>
            <div className="mt-[29px] flex w-full flex-col gap-5">
              {" "}
              <Waitlistdrop Waitlist={Waitlist1} />
              <Waitlistdrop Waitlist={Waitlist2} />
              <Waitlistdrop Waitlist={Waitlist3} />
              <Waitlistdrop Waitlist={Waitlist4} />
              <Waitlistdrop Waitlist={Waitlist5} />
            </div>
            <div className="mx-auto flex flex-col gap-4 sm:gap-[29px]">
              <button
                type="submit"
                onClick={handleModal}
                className="font-nunito mx-auto mt-[37px] w-full max-w-[376px] rounded-lg border-[1px] border-[#366871] bg-[#366871] py-3 text-[14px] font-semibold leading-[150%] text-[#FAFAF9] duration-300 ease-in-out hover:bg-transparent hover:text-[#366871] sm:py-[14px] sm:text-base"
              >
                Submit
              </button>
              <button
                onClick={termsConditions}
                className="font-nunito mx-auto cursor-pointer text-[14px] font-semibold leading-[150%] text-[#2A2A2C] underline sm:text-base"
              >
                Terms and Condition
              </button>
            </div>
          </div>
          <div className="mx-auto bg-[rgba(54,104,113,0.10)] bg-[url('/static/images/bg-model-img.png')] bg-cover  bg-center bg-no-repeat px-2 py-5 max-lg:w-full lg:w-[65%]">
            <div className="mt-[97px] w-full">
              <p className="font-nunito text-center text-xl font-bold leading-[150%] text-[#2A2A2C] sm:text-2xl">
                Refer a Friend and Earn More Points!
              </p>
              <p className="font-nunito text-center text-[12px] font-normal leading-[150%] text-[#2A2A2C] sm:text-[16px]">
                If a friend signs up using your referral link, you both earn
                <span className="text-xl font-bold sm:text-2xl">500 </span>
                points!
              </p>
              <div className="mx-auto mt-[28px] flex h-[48px] w-full max-w-[429px] items-center overflow-hidden rounded-[6px] border  border-[rgba(6,45,52,0.20)]">
                <input
                  type="text"
                  placeholder="{{Referral Link}}"
                  className=" w-full border-none bg-transparent opacity-[0.5] outline-none"
                />
                <button type="submit" className="h-full w-[56px] bg-[#366871]">
                  <FontAwesomeIcon
                    icon={faCopy}
                    className="text-[20px] text-white"
                  />
                </button>
              </div>
              <div className="mx-auto w-fit">
                {/* <img
                  src="/static/images/list-img.png"
                  alt="list-img"
                  className="mt-[79px]"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Waitlistpop;
