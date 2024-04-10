import {
  CoreLeftTopLine,
  CoreRightTopLine,
  CoreTickIcon,
  YelloCircleIcon,
} from "./helper/Icon";
import Image from "next/image";
import CoreCreditCard from "@/app/assets/Home/img/CoreCreditCard.png";
import CoreYellowCircle from "@/app/assets/Home/img/CoreYellowCircle.png";
import CoreBlueCircle from "@/app/assets/Home/img/CoreBlueCircle.png";

interface Props {
  children?: React.ReactNode;
}

const Core: React.FC<Props> = ({ children }) => {
  return (
    <section
      id="about-us"
      className="core-ctr pt-[24px] max-w-[1920px] w-full mx-auto sm:pt-[34px] lg:pt-[74px] pb-12 bg-white max-xl:px-4 flex justify-center"
    >
      <div className="core flex flex-col items-center justify-center gap-[50px] sm:gap-[74px] w-[1336px] bg-[#F1F1F1] rounded-[32px] py-9">
        {/* core heading */}
        <span className="max-w-[534px] lg:max-w-[634px] w-full text-center text-[#000F0B] font-instrument text-3xl sm:text-4xl lg:text-5xl font-bold leading-[110%] capitalize">
          HomeBase Benefits
        </span>

        {/* core body */}
        <div className="max-w-[310px] min-[576px]:max-w-[488px] sm:max-w-[588px] md:max-w-[688px] lg:max-w-[988px] xl:max-w-[1088px] w-full flex flex-col sm:flex-row items-center justify-center relative text-[#000F0B] font-instrument max-sm:gap-7">
          {/* credit card image */}
          <Image
            className="w-[263px] sm:w-[183px] md:w-[373px] lg:w-[473px] xl:w-[573px] h-[248px] sm:h-[168px] md:h-[358px] lg:h-[458px] xl:h-[558px]"
            width={573}
            height={558}
            src={CoreCreditCard}
            alt="Credit Card"
          />

          {/* Yellow Circle */}
          <div className="absolute max-w-[109px] md:max-w-[409px] w-full max-h-[109px] md:max-h-[409px] h-full object-cover left-[13%] sm:left-[25%] md:left-[1%] lg:left-[7%] xl:left-[8%] top-[25%] sm:top-[30%] md:top-[10%] lg:top-[20%] xl:top-[23%]">
            <Image src={CoreYellowCircle} alt="core yellow circle" />
          </div>

          {/* Blue Circle */}
          <div className="absolute max-w-[109px] md:max-w-[409px] w-full max-h-[109px] md:max-h-[409px] h-full right-[10%] sm:right-[27%] md:right-[0%] lg:right-[4%] top-[7%] md:top-[-17%] lg:top-[-1%] xl:top-[5%]">
            <Image src={CoreBlueCircle} alt="core blue circle" />
          </div>

          {/* list of benefits */}
          <div className="sm:hidden max-w-[310px] w-full grid grid-cols-2 min-[425px]:grid-cols-2 gap-4">
            {/* benefit 1 */}
            <div className="flex items-center justify-start gap-1">
              <CoreTickIcon />
              <span className=" text-sm font-medium leading-[140%]">
                Rewards
              </span>
            </div>

            {/* benefit 2 */}
            <div className="flex items-center justify-start gap-1">
              <CoreTickIcon />
              <span className=" text-sm font-medium leading-[140%]">
                No Interest Charges
              </span>
            </div>

            {/* benefit 3 */}
            <div className="flex items-center justify-start gap-1">
              <CoreTickIcon />
              <span className=" text-sm font-medium leading-[140%]">
                Spend Management
              </span>
            </div>

            {/* benefit 4 */}
            <div className="flex items-center justify-start gap-1">
              <CoreTickIcon />
              <span className=" text-sm font-medium leading-[140%]">
                No Hidden Fees
              </span>
            </div>

            {/* benefit 5 */}
            <div className="flex items-center justify-start gap-1">
              <CoreTickIcon />
              <span className=" text-sm font-medium leading-[140%]">
                Marketplace Offers
              </span>
            </div>

            {/* benefit 6 */}
            <div className="flex items-center justify-start gap-1">
              <CoreTickIcon />
              <span className=" text-sm font-medium leading-[140%]">
                Savings Opportunities
              </span>
            </div>
          </div>

          {/* left top div */}
          <div className="max-sm:hidden absolute z-10 left-[10%] sm:left-[20%] md:left-[10%] xl:left-[-1%] top-0">
            <div className="relative flex flex-col items-start justify-center gap-1 lg:gap-[7px]">
              <CoreTickIcon />
              <span className=" text-xs md:text-base lg:text-xl xl:text-2xl font-medium leading-[140%]">
                Rewards
              </span>
              {/* left top line */}
              <div className="absolute top-[60%] sm:top-[-70%] md:top-[-37%] lg:top-[-7%] xl:top-[21%] left-[25%] md:left-[20%] lg:left-[20%]">
                <CoreLeftTopLine />
              </div>
            </div>
          </div>

          {/* left middle div */}
          <div className="max-sm:hidden absolute z-10 left-[15%] md:left-[10%] xl:left-[-1%] top-[33%] md:top-[30%]">
            <div className="relative flex flex-col items-start justify-center gap-1 lg:gap-[7px]">
              <CoreTickIcon />
              <span className=" text-xs md:text-base lg:text-xl xl:text-2xl font-medium leading-[140%]">
                No Interest Charges
              </span>
              {/* left middle line */}
              <div className=" absolute top-[21%] left-[38%] md:left-[33%] lg:left-[34%]">
                <div className="w-[100px] sm:w-[135px] md:w-[170px] lg:w-[260px] xl:w-[352px] h-[1px] bg-black opacity-[0.2]"></div>
              </div>
            </div>
          </div>

          {/* left bottom div */}
          <div className="max-sm:hidden absolute z-10 left-[20%] md:left-[10%] xl:left-[-1%] bottom-[5%] md:bottom-[27%] xl:bottom-[30%]">
            <div className="relative flex flex-col items-start justify-center gap-1 lg:gap-[7px]">
              <CoreTickIcon />
              <span className=" text-xs md:text-base lg:text-xl xl:text-2xl font-medium leading-[140%]">
                Spend Management
              </span>
              {/* left bottom line */}
              <div className=" absolute top-[21%] xl:top-[21%] left-[32%] md:left-[27%] lg:left-[26%]">
                <div className="w-[57px] sm:w-[85px] lg:w-[143px] xl:w-[253px] h-[1px] bg-black opacity-[0.2]"></div>
              </div>
            </div>
          </div>

          {/* right top div */}
          <div className="max-sm:hidden absolute z-10 left-[74%] sm:left-[70%] md:left-[80%] xl:left-[86%] top-0">
            <div className="relative flex flex-col items-start justify-center gap-1 lg:gap-[7px]">
              {/* right top line */}
              <div className="absolute top-[-20%] md:top-[-3%] lg:top-[10%] xl:top-[21%] right-[105%]">
                <CoreRightTopLine />
              </div>
              <CoreTickIcon />
              <span className=" text-xs md:text-base lg:text-xl xl:text-2xl font-medium leading-[140%]">
                No Hidden Fees
              </span>
            </div>
          </div>

          {/* right middle div */}
          <div className="max-sm:hidden absolute z-10 left-[80%] xl:left-[86%] top-[33%] md:top-[30%]">
            <div className="relative flex flex-col items-start justify-center gap-1 lg:gap-[7px]">
              <CoreTickIcon />
              <span className=" text-xs md:text-base lg:text-xl xl:text-2xl font-medium leading-[140%]">
                Marketplace Offers
              </span>
              {/* right middle line */}
              <div className=" absolute top-[21%] right-[105%] lg:right-[110%]">
                <div className="w-[49px] sm:w-[80px] md:w-[35px] lg:w-[75px] xl:w-[99px] h-[1px] bg-black opacity-[0.2]"></div>
              </div>
            </div>
          </div>

          {/* right bottom div */}
          <div className="max-sm:hidden absolute z-10 left-[73%] md:left-[80%] xl:left-[86%] bottom-[5%] md:bottom-[27%] xl:bottom-[30%]">
            <div className="relative flex flex-col items-start justify-center gap-1 lg:gap-[7px]">
              <CoreTickIcon />
              <span className=" text-xs md:text-base lg:text-xl xl:text-2xl font-medium leading-[140%]">
                Savings Opportunities
              </span>
              {/* right bottom line */}
              <div className=" absolute top-[23%] xl:top-[21%] right-[104%] lg:right-[107%]">
                <div className="w-[80px] sm:w-[102px] lg:w-[147px] xl:w-[175px] h-[1px] bg-black opacity-[0.2]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Core;
