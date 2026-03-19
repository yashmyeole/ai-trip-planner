import React from "react";

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "🪙",
    color: "bg-orange-100",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💵",
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Don’t worry about cost",
    icon: "💎",
    color: "bg-purple-100",
  },
];

const BudgetUI = ({ onSelectedOption }: any) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4">
        {SelectBudgetOptions.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectedOption(item.title + ":" + item.desc)}
            className="border border-gray-100 p-5 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow flex items-center gap-4 bg-white"
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.color} text-2xl`}
            >
              {item.icon}
            </div>
            <div className="text-left flex-1">
              <h3 className="text-[17px] font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-snug mt-1">
                {item.desc}
              </p>
            </div>
            <div className="ml-auto flex shrink-0">
              <span className="text-sm font-semibold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                Select
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetUI;
