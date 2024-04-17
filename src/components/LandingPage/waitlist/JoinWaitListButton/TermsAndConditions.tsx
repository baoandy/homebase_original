import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TermsConditionmap } from "./TermsConditionMap";
import TermsAndConditionsList from "./TermsAndConditionsList";
import { ModalCloseIcon } from "@/components/LandingPage/helper/Icon";
interface closeModalProps {
  showTerms: boolean;
  setShowTerms: React.Dispatch<React.SetStateAction<boolean>>;
}
const Condition: React.FC<closeModalProps> = ({ showTerms, setShowTerms }) => {
  return (
    <Transition.Root show={showTerms} as={Fragment}>
      <div className="fixed inset-0 z-50 overflow-scroll">
        <div className="flex min-h-full items-center justify-center px-4 py-1 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="  flex h-[calc(100vh-55px)]  w-full items-center md:max-w-[1140px] ">
              <div className="mx-auto w-full rounded-2xl bg-white pb-2  lg:rounded-[32px] lg:pb-6">
                <div className="!sticky top-0 flex flex-row rounded-t-2xl bg-[#366871] py-4 lg:rounded-t-[32px]">
                  <h1 className="font-nunito mx-auto w-full max-w-[980px] px-2 text-[22px] font-bold leading-[130%] text-white sm:text-4xl md:text-5xl xl:px-0">
                    Terms and Conditions
                  </h1>
                  <span className="z-50 flex items-start justify-end bg-transparent">
                    <button
                      type="button"
                      className="z-20ease-in-out bg-transparent transition duration-300 hover:rotate-180"
                      onClick={() => setShowTerms(false)}
                    >
                      <ModalCloseIcon />
                    </button>
                  </span>
                </div>
                <div className="mx-auto mt-8 w-full max-w-[1045px] px-2 md:mt-[63px] xl:px-0">
                  <div className="terms-and-conditions-scrollbar flex h-[calc(100vh-310px)] flex-col gap-6 overflow-auto pr-2 sm:gap-[34px] sm:pr-[35px]">
                    {TermsConditionmap.map((item, index) => (
                      <TermsAndConditionsList key={index} item={item} />
                    ))}
                  </div>
                  <div className="mt-[27px] flex justify-end gap-6">
                    <button
                      type="submit"
                      onClick={() => setShowTerms(false)}
                      className="font-nunito w-full max-w-[154px] rounded-lg border-[1px] border-[#366871] bg-[#366871] py-2 text-base font-semibold leading-[150%] text-[#FAFAF9] duration-300 ease-in-out hover:bg-transparent hover:text-[#366871] sm:py-[14px]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Transition.Root>
  );
};

export default Condition;
