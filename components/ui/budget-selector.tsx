import React from "react";

const budgetOptions = [
  {
    label: "Cheap",
    icon: "🪙",
    color: "bg-orange-100",
    description: "Basic accommodation, local food, public transport.",
  },
  {
    label: "Moderate",
    icon: "💵",
    color: "bg-blue-100",
    description:
      "Comfortable hotels, international food, some paid attractions.",
  },
  {
    label: "Good",
    icon: "💰",
    color: "bg-green-100",
    description: "Nice hotels, good restaurants, guided premium experiences.",
  },
  {
    label: "Luxury",
    icon: "💎",
    color: "bg-purple-100",
    description:
      "Luxury hotels, fine dining, private tours, exclusive experiences.",
  },
];

export const BudgetSelector: React.FC<{
  onSelect: (budget: string) => void;
}> = ({ onSelect }) => (
  <div className="w-full">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {budgetOptions.map((option) => (
        <div
          key={option.label}
          className="border border-gray-100 p-5 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4 bg-white"
          onClick={() => onSelect(option.label)}
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${option.color} text-2xl`}
          >
            {option.icon}
          </div>
          <div className="text-left">
            <h3 className="text-[17px] font-bold text-gray-900">
              {option.label}
            </h3>
            <p className="text-gray-500 text-[14px] leading-snug mt-1">
              {option.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
