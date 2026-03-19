import React from "react";

type Props = {
  viewTrip?: any;
  disable?: boolean;
  onDownload?: () => void;
  onRegenerate?: () => void;
};

const FinalUI = ({
  viewTrip,
  disable = true,
  onDownload,
  onRegenerate,
}: Props) => {
  const days = viewTrip?.duration ?? "";
  const budget = viewTrip?.budget ?? viewTrip?.budget ?? "";
  const from = viewTrip?.origin ?? "";
  const to = viewTrip?.destination ?? "";
  const travellers = viewTrip?.group_size ?? "";
  const interest = viewTrip?.focus ?? viewTrip?.interest ?? "";
  const planText =
    viewTrip?.summary ??
    `Thanks for all the details! Here's a plan for your ${days} ${budget}-budget trip to ${to} from ${from} as a ${travellers}, focusing on ${interest}. I'll prepare suggestions that include popular food spots and cultural dining experiences.`;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all">
        <div className="flex items-start gap-4">
          <div className="flex-none">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl shadow-sm">
              ✈️
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">
              {disable ? "Generating your trip…" : "Your trip plan is ready"}
            </h2>
            <p className="mt-1 text-[14px] text-gray-500 leading-snug">
              A curated day-by-day plan and recommendations tailored to your
              preferences.
            </p>
          </div>

          <div className="flex-none text-right">
            <div className="text-[13px] font-medium text-gray-400 uppercase tracking-wider">
              Status
            </div>
            <div className="mt-2 text-sm font-semibold">
              {disable ? (
                <div className="inline-flex items-center gap-2 text-blue-500">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeOpacity="0.25"
                      strokeWidth="4"
                    ></circle>
                    <path
                      d="M22 12a10 10 0 00-10-10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                  <span>Generating…</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-green-500 bg-green-50 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500 block" />{" "}
                  Ready
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-[20px] bg-gray-50 p-5 border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-sm">{planText}</p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-gray-100 rounded-[20px] shadow-sm flex flex-col items-center justify-center">
              <div className="text-[13px] font-medium text-gray-500 mb-1">
                Duration
              </div>
              <div className="font-bold text-gray-900">{days}</div>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-[20px] shadow-sm flex flex-col items-center justify-center">
              <div className="text-[13px] font-medium text-gray-500 mb-1">
                Budget
              </div>
              <div className="font-bold text-gray-900">{budget}</div>
            </div>
            <div className="p-4 bg-white border border-gray-100 rounded-[20px] shadow-sm flex flex-col items-center justify-center">
              <div className="text-[13px] font-medium text-gray-500 mb-1">
                Focus
              </div>
              <div className="font-bold text-gray-900 text-center w-full truncate">
                {interest}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            {/* <div className="flex items-center gap-3">
              <button onClick={onDownload} className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700" disabled={disable}>Download Plan</button>
              <button onClick={onRegenerate} className="px-4 py-2 rounded-lg border border-transparent bg-white hover:border-blue-100" disabled={disable}>Regenerate</button>
            </div> */}

            <div className="text-sm text-slate-500">
              From {from} → {to} · {travellers}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalUI;
