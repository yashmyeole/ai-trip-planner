import React from 'react'

type Props = {
  viewTrip?: any
  disable?: boolean
  onDownload?: () => void
  onRegenerate?: () => void
}

const FinalUI = ({ viewTrip, disable = true, onDownload, onRegenerate }: Props) => {
  const days = viewTrip?.duration ?? '4 days'
  const budget = viewTrip?.budget ?? viewTrip?.budget ?? 'Moderate'
  const from = viewTrip?.origin ?? 'Chicago'
  const to = viewTrip?.destination ?? 'Mumbai'
  const travellers = viewTrip?.group_size ?? 'couple'
  const interest = viewTrip?.focus ?? viewTrip?.interest ?? 'local cuisine and food tours'
  const planText = viewTrip?.summary ?? `Thanks for all the details! Here's a plan for your ${days} ${budget}-budget trip to ${to} from ${from} as a ${travellers}, focusing on ${interest}. I'll prepare suggestions that include popular food spots and cultural dining experiences.`

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-transparent hover:border-blue-100 transition">
        <div className="flex items-start gap-4">
          <div className="flex-none">
            <div className="w-14 h-14 rounded-xl bg-sky-500 flex items-center justify-center text-white text-2xl shadow-md">✈️</div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-slate-900">{disable ? 'Generating your trip…' : 'Your trip plan is ready'}</h2>
            <p className="mt-1 text-sm text-slate-500">A curated day-by-day plan and recommendations tailored to your preferences.</p>
          </div>

          <div className="flex-none text-right">
            <div className="text-xs text-slate-500">Status</div>
            <div className="mt-2">
              {disable ? (
                <div className="inline-flex items-center gap-2 text-blue-600">
                  <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4"></circle>
                    <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
                  </svg>
                  <span>Generating…</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 text-green-600"><span className="w-2 h-2 rounded-full bg-green-500 block" /> Ready</div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-lg bg-slate-50 p-5">
            <p className="text-slate-700">{planText}</p>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white border border-transparent rounded-lg shadow-sm">
              <div className="text-xs text-slate-500">Duration</div>
              <div className="mt-1 font-semibold">{days}</div>
            </div>
            <div className="p-3 bg-white border border-transparent rounded-lg shadow-sm">
              <div className="text-xs text-slate-500">Budget</div>
              <div className="mt-1 font-semibold">{budget}</div>
            </div>
            <div className="p-3 bg-white border border-transparent rounded-lg shadow-sm">
              <div className="text-xs text-slate-500">Focus</div>
              <div className="mt-1 font-semibold truncate">{interest}</div>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onDownload} className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700" disabled={disable}>Download Plan</button>
              <button onClick={onRegenerate} className="px-4 py-2 rounded-lg border border-transparent bg-white hover:border-blue-100" disabled={disable}>Regenerate</button>
            </div>

            <div className="text-sm text-slate-500">From {from} → {to} · {travellers}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalUI