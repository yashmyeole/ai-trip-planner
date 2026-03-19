import React, { useEffect, useState } from "react";

type Props = {
  onSelectedDays?: (days: number) => void;
  initialDays?: number;
  onDone?: (days: number) => void;
};

const DurationUI = ({ onSelectedDays, initialDays = 2, onDone }: Props) => {
  const clamp = (n: number) => Math.max(2, Math.min(15, n));
  const [days, setDays] = useState<number>(clamp(initialDays));

  useEffect(() => {
    onSelectedDays?.(days);
  }, [days, onSelectedDays]);

  const dec = () => setDays((d) => clamp(d - 1));
  const inc = () => setDays((d) => clamp(d + 1));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 w-full max-w-md">
      <h3 className="text-xl font-bold text-gray-900 mb-1">Trip duration</h3>
      <p className="text-gray-600 text-sm mb-6">
        Choose how many days you want to travel
      </p>

      <div className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-[20px] mb-6">
        <button
          aria-label="decrease days"
          onClick={dec}
          disabled={days <= 2}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl font-medium transition-colors ${days <= 2 ? "opacity-40 cursor-not-allowed text-gray-400" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
        >
          −
        </button>

        <div className="flex-1 text-center">
          <div className="inline-flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-blue-500">
              {days}
            </span>
            <span className="text-gray-500 font-medium">days</span>
          </div>
        </div>

        <button
          aria-label="increase days"
          onClick={inc}
          disabled={days >= 15}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl font-medium transition-colors ${days >= 15 ? "opacity-40 cursor-not-allowed text-gray-400" : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"}`}
        >
          +
        </button>
      </div>

      <p className="text-center text-sm text-gray-500 mb-6">
        Minimum 2 · Maximum 15
      </p>

      <div className="w-full">
        <button
          onClick={() => onDone?.(days)}
          className="w-full py-3 bg-[#8BB9E3] text-white font-semibold rounded-xl hover:bg-blue-400 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default DurationUI;
