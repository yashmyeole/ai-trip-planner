import React from "react";

interface CityOption {
  name: string;
  icon: string;
  color: string;
  highlight: string;
}

const cities: CityOption[] = [
  {
    name: "Paris",
    icon: "🗼",
    color: "bg-pink-100",
    highlight: "Eiffel Tower",
  },
  {
    name: "New York",
    icon: "🗽",
    color: "bg-blue-100",
    highlight: "Statue of Liberty",
  },
  {
    name: "Tokyo",
    icon: "🗾",
    color: "bg-red-100",
    highlight: "Shibuya Crossing",
  },
  { name: "London", icon: "🎡", color: "bg-indigo-100", highlight: "Big Ben" },
];

export const CitySelector: React.FC<{
  onSelect: (city: string) => void;
  onCustom: (city: string) => void;
}> = ({ onSelect, onCustom }) => {
  const [customCity, setCustomCity] = React.useState("");
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cities.map((city) => (
          <div
            key={city.name}
            className="border border-gray-100 p-5 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4 bg-white"
            onClick={() => onSelect(city.name)}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${city.color} text-2xl`}
            >
              {city.icon}
            </div>
            <div className="text-left">
              <span className="block text-[17px] font-bold text-gray-900">
                {city.name}
              </span>
              <span className="block text-gray-500 text-[14px] leading-snug mt-1">
                {city.highlight}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-100 pt-5">
        <label className="block mb-3 font-semibold text-gray-800">
          Or enter your own city:
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={customCity}
            placeholder="e.g. Rome"
            onChange={(e) => setCustomCity(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
          />
          <button
            className="px-6 py-3 bg-[#8BB9E3] text-white font-semibold rounded-xl hover:bg-blue-400 disabled:opacity-50 transition-colors"
            onClick={() => customCity && onCustom(customCity)}
            disabled={!customCity.trim()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
