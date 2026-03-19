import React, { useMemo, useState } from "react";

export const DefaultInterests = [
  {
    id: 1,
    title: "Adventure",
    desc: "Hiking, trekking, outdoor activities",
    icon: "🧗",
    color: "bg-pink-100",
  },
  {
    id: 2,
    title: "Sightseeing",
    desc: "Iconic landmarks and city tours",
    icon: "🗺️",
    color: "bg-blue-100",
  },
  {
    id: 3,
    title: "Cultural",
    desc: "Museums, history and local traditions",
    icon: "🏛️",
    color: "bg-yellow-100",
  },
  {
    id: 4,
    title: "Food",
    desc: "Local cuisine and food tours",
    icon: "🍜",
    color: "bg-green-100",
  },
  {
    id: 5,
    title: "Nightlife",
    desc: "Bars, clubs and evening entertainment",
    icon: "🌃",
    color: "bg-purple-100",
  },
  {
    id: 6,
    title: "Relaxation",
    desc: "Beaches, spas and chill time",
    icon: "🏖️",
    color: "bg-pink-100",
  },
];

type Props = {
  onSelectedOption?: (s: string) => void;
};

const TravelInterestUI = ({ onSelectedOption }: Props) => {
  const [query, setQuery] = useState("");
  const [customCounter] = useState(() => 1000);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return DefaultInterests;
    return DefaultInterests.filter(
      (i) =>
        i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q),
    );
  }, [query]);

  const pick = (title: string, desc = "") => {
    onSelectedOption?.(`${title}:${desc}`);
  };

  const confirmCustom = () => {
    const q = query.trim();
    if (!q) return;
    pick(q, "custom");
    setQuery("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      confirmCustom();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full max-w-2xl">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Travel interests</h3>
      <p className="text-gray-600 text-sm mb-5">
        For example: adventure, sightseeing, cultural experiences, food,
        nightlife, relaxation
      </p>

      <div className="flex gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKey}
          placeholder="Search or type an interest"
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-gray-800 focus:outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300"
        />
        <button
          onClick={confirmCustom}
          disabled={!query.trim()}
          className="px-6 py-3 bg-[#8BB9E3] text-white font-semibold rounded-xl hover:bg-blue-400 disabled:opacity-50 transition-colors"
        >
          Done
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 p-5 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4"
            onClick={() => pick(item.title, item.desc)}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${item.color} text-2xl`}
            >
              {item.icon}
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-gray-900">
                {item.title}
              </h3>
              <p className="text-gray-500 text-[14px] leading-snug mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

        {/* show suggestion to add custom if query doesn't exactly match */}
        {query.trim() &&
          !filtered.some(
            (i) => i.title.toLowerCase() === query.trim().toLowerCase(),
          ) && (
            <div
              className="border border-gray-100 p-5 rounded-[20px] cursor-pointer hover:shadow-md transition-shadow flex items-start gap-4"
              onClick={() => {
                pick(query.trim(), "custom");
                setQuery("");
              }}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-gray-100 text-gray-700 text-2xl">
                ✳️
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-gray-900">
                  Add "{query.trim()}"
                </h3>
                <p className="text-gray-500 text-[14px] leading-snug mt-1">
                  Custom interest
                </p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default TravelInterestUI;
