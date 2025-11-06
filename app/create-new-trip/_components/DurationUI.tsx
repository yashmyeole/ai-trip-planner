import React, { useEffect, useState } from 'react'

type Props = {
  onSelectedDays?: (days: number) => void
  initialDays?: number
  onDone?: (days: number) => void
}

const DurationUI = ({ onSelectedDays, initialDays = 2, onDone }: Props) => {
  const clamp = (n: number) => Math.max(2, Math.min(15, n))
  const [days, setDays] = useState<number>(clamp(initialDays))

  useEffect(() => {
    onSelectedDays?.(days)
  }, [days, onSelectedDays])

  const dec = () => setDays((d) => clamp(d - 1))
  const inc = () => setDays((d) => clamp(d + 1))

  return (
    <div>
      <div className="p-4 rounded-lg mb-4 bg-white shadow-sm border border-transparent hover:border-blue-100 transition">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Trip duration</h3>
            <p className="text-gray-600 text-sm">Choose how many days you want to travel</p>
          </div>
        </div>

  <div className="mt-4 flex items-center justify-between gap-4">
          <button
            aria-label="decrease days"
            onClick={dec}
            disabled={days <= 2}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors ${days <= 2 ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
            −
          </button>

          <div className="flex-1 text-center">
            <div className="inline-flex items-baseline gap-3 bg-linear-to-r from-blue-50 to-white px-6 py-3 rounded-lg shadow-sm">
              <span className="text-4xl font-bold text-slate-900">{days}</span>
              <span className="text-slate-600">days</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Minimum 2 · Maximum 15</p>
          </div>

          <button
            aria-label="increase days"
            onClick={inc}
            disabled={days >= 15}
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-colors ${days >= 15 ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
            +
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => onDone?.(days)}
            className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50 shadow"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default DurationUI