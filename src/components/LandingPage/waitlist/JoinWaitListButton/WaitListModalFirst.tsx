import Image from "next/image";
// import modalmainImage from "@/app/assets/JoinWailtListModal/modal-main-image.png";
import modalmainImage from "@/app/assets/JoinWaitListModal/modal-main-image.png";
import { ModalLogoIcon } from "@/components/LandingPage/helper/Icon";

const modalInputMappingData = [
  {
    type: "text",
    placeholder: "First Name",
    id: "fname",
  },
  {
    type: "text",
    placeholder: "Last Name",
    id: "lname",
  },
  {
    type: "email",
    placeholder: "Email Address",
    id: "mail",
  },
  {
    type: "number",
    placeholder: "Phone No.",
    id: "phone",
  },
  {
    type: "number",
    placeholder: "Zip Code",
    id: "pincode",
  },
];

interface Props {
  handleModal: any;
  handleSwiper: any;
  termsConditions: any;
}

const WaitListModalFirst: React.FC<Props> = ({
  handleModal,
  handleSwiper,
  termsConditions,
}) => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-end gap-[30px] bg-white pb-[15px] pt-10 max-lg:p-4 md:max-w-[50%] md:pt-20 lg:pt-[152px]">
        <ModalLogoIcon />
        <div className="flex w-full flex-col gap-7">
          <div className="flex w-full flex-col gap-6">
            {modalInputMappingData.map((item, index) => (
              <input
                key={index}
                type={item.type}
                placeholder={item.placeholder}
                className="font-nunito placeholder:font-nunito mx-auto flex w-full items-center rounded-md border-[1.5px] !border-[rgba(6,45,52,0.30)] bg-gray-100 text-[16px] font-normal  leading-normal text-[#82979B] !shadow-none !outline-none !ring !ring-transparent !ring-offset-0 placeholder:text-base placeholder:text-[#82979B] focus:bg-[#F8FFFF] focus:!shadow-none focus:outline-none md:w-[300px] lg:w-[376px]"
              />
            ))}
          </div>
          <button
            type="submit"
            onClick={handleSwiper}
            className="font-nunito mx-auto h-[52px] w-full rounded-lg border border-[#366871] bg-[#366871] px-8 py-3.5 text-center text-base font-semibold text-white outline-none transition duration-300 ease-in-out hover:bg-white hover:text-[#366871] md:max-w-[300px] lg:max-w-[376px]"
          >
            Submit
          </button>
        </div>
        <div>
          <button
            type="submit"
            onClick={termsConditions}
            className="font-nunito mt-10 text-center text-base font-semibold text-[#2A2A2C] underline transition duration-300 ease-in-out hover:text-[#366871] md:mt-20 lg:mt-[152px]"
          >
            Terms and Condition
          </button>
        </div>
      </div>
      <div className="hidden w-full max-w-[50%] flex-col items-end justify-start bg-[#ebf0f1] pb-16 pr-6 pt-[100px] md:flex lg:pb-[110px] lg:pt-[174px]">
        <Image src={modalmainImage} width={573} height={545} alt="main-image" />
      </div>
    </>
  );
};
export default WaitListModalFirst;
