import React from "react";
import WelldoneSwiper from "./WelldoneSwiper";

interface handleModalProps {
  handleModal: any;
  termsConditions: any;
}

const Welldone: React.FC<handleModalProps> = ({
  handleModal,
  termsConditions,
}) => {
  return (
    <>
      <div className=" w-full bg-white px-5 pb-8 pt-8 md:pb-[46px] md:pt-[55px] lg:px-[52px]">
        <h2 className=" font-nunito text-center text-[36px] font-bold capitalize leading-[110%] text-[#366871] md:text-[48px]">
          WELL DONE!
        </h2>
        <p className=" font-nunito mt-1 text-center text-[16px] font-medium leading-[140%] text-[#2A2A2C] md:mt-3 md:text-[20px]">
          Learn where you can use your HomeBase rewards with our partners today
        </p>
        <div className="md :mt-[34px] mx-auto  mt-6 w-full lg:max-w-[1040px]">
          {/* <WelldoneSwiper /> */}
        </div>
        <div className="mt-[92px] flex justify-center">
          <button
            type="submit"
            onClick={termsConditions}
            className=" font-nunito text-[16px] font-semibold leading-[150%] text-[#2A2A2C] underline  "
          >
            Terms and Condition
          </button>
        </div>
      </div>
    </>
  );
};

export default Welldone;
