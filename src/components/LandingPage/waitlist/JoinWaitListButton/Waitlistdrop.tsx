"use client";
import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
interface Person2 {
  Waitlist: any;
}
interface Person {
  name: string;
}
const Waitlistdrop: React.FC<Person2> = ({ Waitlist }) => {
  const [selected, setSelected] = useState<Person>(Waitlist[0]);

  return (
    <div className="relative mx-auto w-full max-w-[544px] rounded-[6px] border border-[rgba(6,45,52,0.30)] bg-[#F8FFFF] p-4">
      <Listbox value={selected} onChange={setSelected}>
        <div className=" mt-1">
          <Listbox.Button className="relative w-full cursor-default text-left  ">
            <span className="block truncate text-[16px] font-normal text-[#82979B]">
              {selected.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FontAwesomeIcon icon={faChevronDown} />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute left-0 z-10 max-h-60 w-full overflow-auto rounded-md border border-[rgba(6,45,52,0.30);] bg-white text-base shadow-[-4px_8px_22.3px_0px_rgba(69,90,100,0.16)]  ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {Waitlist.map((item: any, index: any) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none border-b border-[rgba(0,0,0,0.10)] py-4 pl-10 pr-4 text-[16px] font-normal text-[rgba(0,0,0,0.50)] ${
                      active
                        ? "bg-[rgba(54,104,113,0.10)]  text-[rgba(0,0,0,0.50)]"
                        : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
export default Waitlistdrop;
