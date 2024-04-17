import React from "react";

interface itemProps {
  item: any;
}

const TermsAndConditionsList: React.FC<itemProps> = ({ item }) => {
  return (
    <div className="flex flex-col gap-2 sm:gap-[15px]">
      <h1 className="font-nunito text-xl font-bold leading-[130%] text-[#2A2A2C] sm:text-[24px]">
        {item.title}
      </h1>
      {Array.isArray(item.description) ? (
        <ul className="list-disc pl-5">
          {item.description.map((listItem: any, index: any) => (
            <div key={index}>
              <li className="font-nunito text-base font-normal leading-[150%] text-[#000F0B]">
                {listItem.firstlist}
              </li>
              <li
                key={index}
                className="font-nunito text-base font-normal leading-[150%] text-[#000F0B]"
              >
                {listItem.secondlist}
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p className="font-nunito text-sm font-normal leading-[150%] text-[#000F0B] sm:text-base">
          {item.description}
        </p>
      )}
    </div>
  );
};

export default TermsAndConditionsList;
