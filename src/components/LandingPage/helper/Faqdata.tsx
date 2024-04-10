import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "./Icon";

interface Props {
  children?: React.ReactNode;
}

export const Faqdata: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const toggleQuestion = () => {
    setOpen(!open);
  };
  const [open1, setOpen1] = useState(false);
  const toggleQuestion1 = () => {
    setOpen1(!open1);
  };
  const [open2, setOpen2] = useState(false);
  const toggleQuestion2 = () => {
    setOpen2(!open2);
  };
  const [open3, setOpen3] = useState(false);
  const toggleQuestion3 = () => {
    setOpen3(!open3);
  };
  return (
    <div className="w-full flex flex-col gap-4 justify-center">
      <div
        className={`rounded-[6px] p-3 max-w-[782px] w-full mx-auto flex flex-col bg-white ${
          open
            ? "border-0 shadow-[_0px_0px_24px_0px_rgba(0,0,0,0.08)] gap-2"
            : "border-[0.5px] border-[rgba(0,0,0,0.10)]"
        }`}
      >
        <div className="flex gap-3 justify-between items-center">
          <p className="text-black text-[16px] leading-[24px] font-medium font-instrument">
            Maecenas porttitor enim nec velit ultrices?
          </p>
          <button type="submit" onClick={toggleQuestion}>
            {open ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        <div>
          <p className="text-black text-[16px] leading-[24px] font-normal font-instrument opacity-80">
            {open
              ? "Pellentesque iaculis, nisl et consectetur mattis, neque eros finibus elit, quis semper ipsum lorem vel augue. Aliquam erat volutpat. Nunc auctor sem a arcu ultrices molestie. Etiam magna risus, pulvinar ut metus at, consequat aliquet justo. Mauris egestas aliquam ligula ut molestie"
              : ""}
          </p>
        </div>
      </div>
      <div
        className={`rounded-[6px] p-3 max-w-[782px] w-full mx-auto flex flex-col bg-white ${
          open1
            ? "border-0 shadow-[_0px_0px_24px_0px_rgba(0,0,0,0.08)] gap-2"
            : "border-[0.5px] border-[rgba(0,0,0,0.10)]"
        }`}
      >
        <div className="flex gap-3 justify-between items-center">
          <p className="text-black text-[16px] leading-[24px] font-medium font-instrument">
            Maecenas porttitor enim nec velit ultrices?
          </p>
          <button type="submit" onClick={toggleQuestion1}>
            {open1 ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        <div>
          <p className="text-black text-[16px] leading-[24px] font-normal font-instrument opacity-80">
            {open1
              ? "Pellentesque iaculis, nisl et consectetur mattis, neque eros finibus elit, quis semper ipsum lorem vel augue. Aliquam erat volutpat. Nunc auctor sem a arcu ultrices molestie. Etiam magna risus, pulvinar ut metus at, consequat aliquet justo. Mauris egestas aliquam ligula ut molestie"
              : ""}
          </p>
        </div>
      </div>
      <div
        className={`rounded-[6px] p-3 max-w-[782px] w-full mx-auto flex flex-col bg-white ${
          open2
            ? "border-0 shadow-[_0px_0px_24px_0px_rgba(0,0,0,0.08)] gap-2"
            : "border-[0.5px] border-[rgba(0,0,0,0.10)]"
        }`}
      >
        <div className="flex gap-3 justify-between items-center">
          <p className="text-black text-[16px] leading-[24px] font-medium font-instrument">
            Maecenas porttitor enim nec velit ultrices?
          </p>
          <button type="submit" onClick={toggleQuestion2}>
            {open2 ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        <div>
          <p className="text-black text-[16px] leading-[24px] font-normal font-instrument opacity-80">
            {open2
              ? "Pellentesque iaculis, nisl et consectetur mattis, neque eros finibus elit, quis semper ipsum lorem vel augue. Aliquam erat volutpat. Nunc auctor sem a arcu ultrices molestie. Etiam magna risus, pulvinar ut metus at, consequat aliquet justo. Mauris egestas aliquam ligula ut molestie"
              : ""}
          </p>
        </div>
      </div>
      <div
        className={`rounded-[6px] p-3 max-w-[782px] w-full mx-auto flex flex-col bg-white ${
          open3
            ? "border-0 shadow-[_0px_0px_24px_0px_rgba(0,0,0,0.08)] gap-2"
            : "border-[0.5px] border-[rgba(0,0,0,0.10)]"
        }`}
      >
        <div className="flex gap-3 justify-between items-center">
          <p className="text-black text-[16px] leading-[24px] font-medium font-instrument">
            Maecenas porttitor enim nec velit ultrices?
          </p>
          <button type="submit" onClick={toggleQuestion3}>
            {open3 ? <MinusIcon /> : <PlusIcon />}
          </button>
        </div>
        <div>
          <p className="text-black text-[16px] leading-[24px] font-normal font-instrument opacity-80">
            {open3
              ? "Pellentesque iaculis, nisl et consectetur mattis, neque eros finibus elit, quis semper ipsum lorem vel augue. Aliquam erat volutpat. Nunc auctor sem a arcu ultrices molestie. Etiam magna risus, pulvinar ut metus at, consequat aliquet justo. Mauris egestas aliquam ligula ut molestie"
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};
