"use client";
import { Disclosure, Transition } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "./Icon";
import { queData } from "./Helper";

interface Props {
  children?: React.ReactNode;
}
const Faqquestion: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      {queData.map((items, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <div
              className={`mx-auto w-full max-w-[786px] rounded-2xl bg-white   ] ${
                open
                  ? "shadow-[0px_0px_24px_0px_rgba(0,0,0,0.08)]"
                  : "border-[0.5px] border-[rgba(0,0,0,0.10)]"
              }`}
            >
              <div className="flex flex-col gap-2">
                <Disclosure.Button className="flex w-full justify-between p-3 text-[#111] font-instrument text-[16px] leading-6 font-medium text-left gap-3">
                  <span>{items.que}</span>
                  <div
                    className={` transition-all duration-300 ease-in-out ${
                      open ? "rotate-180 transform" : ""
                    }`}
                  >
                    {open ? <MinusIcon /> : <PlusIcon />}
                  </div>
                </Disclosure.Button>

                <Disclosure.Panel className="text-[#111] pt-0 p-3 font-instrument text-[16px] leading-6 font-normal opacity-80">
                  {items.ans.map((item, index) => {
                    return (
                      <p key={index} className="mb-2">
                        {item}
                      </p>
                    );
                  })}
                </Disclosure.Panel>
              </div>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Faqquestion;
