"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import WaitListModalFirst from "./WaitListModalFirst";
import TermsAndConditions from "./TermsAndConditions";
import Welldone from "./Welldone";
import {
  GreenColorModalCloseIcon,
  ModalCloseIcon,
} from "@/components/LandingPage/helper/Icon";
import Waitlistpop from "./Waitlistpop";

export default function JoinWaitlistModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [hideModal, setHideModal] = useState(false);
  const [modalSwiper, setModalSwiper] = useState(false);
  const [terms, setTerms] = useState(false);
  const [swiper, setSwiper] = useState(false);

  function handleModal() {
    setHideModal(true);
    setModalSwiper(false);
    setTerms(false);
    setSwiper(true);
  }
  function handleSwiper() {
    setModalSwiper(true);
    setHideModal(true);
    setTerms(false);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
    setHideModal(false);
    setTerms(false);
    setSwiper(false);
    setModalSwiper(false);
  }

  function termsConditions() {
    setTerms(true);
    setHideModal(true);
    setSwiper(false);
    setModalSwiper(false);
  }

  return (
    <>
      <>
        <button
          type="button"
          onClick={openModal}
          className="font-instrument h-[59px] w-full max-w-[328px] rounded-md border-2 border-transparent bg-primary text-[18px] font-semibold leading-[150%] text-white transition duration-300 ease-in-out hover:border-primary hover:bg-white hover:text-primary max-sm:px-4  sm:w-[196px] sm:max-w-full"
        >
          Join the Waitlist!
        </button>
      </>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 h-screen bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0">
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
                  <div className="scroll_bar_model max-h-full w-full transform overflow-auto rounded-2xl text-left  align-middle shadow-xl transition-all lg:max-w-[1140px] lg:rounded-[32px]">
                    {terms ? (
                      <></>
                    ) : (
                      <span className=" fixed right-3 top-6 z-50 flex items-start justify-end bg-transparent">
                        <button
                          type="button"
                          className="z-20ease-in-out bg-transparent transition duration-300 hover:rotate-180"
                          onClick={closeModal}
                        >
                          <ModalCloseIcon />
                        </button>
                      </span>
                    )}
                    <div
                      className={`${
                        hideModal ? "hidden" : "block"
                      } flex h-full w-full items-start bg-[#ebf0f1]`}
                    >
                      <WaitListModalFirst
                        handleModal={handleModal}
                        handleSwiper={handleSwiper}
                        termsConditions={termsConditions}
                      />
                    </div>
                    <div className={`${terms ? "block" : "hidden"} h-full`}>
                      <TermsAndConditions
                        showTerms={terms}
                        setShowTerms={setTerms}
                      />
                    </div>
                    <div className={`${modalSwiper ? "block" : "hidden"}`}>
                      <Waitlistpop
                        handleModal={handleModal}
                        termsConditions={termsConditions}
                      />
                    </div>
                    <div className={`${swiper ? "block" : "hidden"}`}>
                      <Welldone
                        handleModal={handleModal}
                        termsConditions={termsConditions}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
