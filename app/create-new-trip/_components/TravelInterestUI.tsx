import React, { useMemo, useState } from 'react'

export const DefaultInterests = [
  { id: 1, title: 'Adventure', desc: 'Hiking, trekking, outdoor activities', icon: '🧗', color: 'bg-red-100 text-red-600' },
  { id: 2, title: 'Sightseeing', desc: 'Iconic landmarks and city tours', icon: '🗺️', color: 'bg-blue-100 text-blue-600' },
  { id: 3, title: 'Cultural', desc: 'Museums, history and local traditions', icon: '🏛️', color: 'bg-yellow-100 text-yellow-600' },
  { id: 4, title: 'Food', desc: 'Local cuisine and food tours', icon: '🍜', color: 'bg-green-100 text-green-600' },
  { id: 5, title: 'Nightlife', desc: 'Bars, clubs and evening entertainment', icon: '🌃', color: 'bg-purple-100 text-purple-600' },
  { id: 6, title: 'Relaxation', desc: 'Beaches, spas and chill time', icon: '🏖️', color: 'bg-pink-100 text-pink-600' },
]

type Props = {
  onSelectedOption?: (s: string) => void
}

const TravelInterestUI = ({ onSelectedOption }: Props) => {
  const [query, setQuery] = useState('')
  const [customCounter] = useState(() => 1000)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DefaultInterests
    return DefaultInterests.filter((i) => i.title.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q))
  }, [query])

  const pick = (title: string, desc = '') => {
    onSelectedOption?.(`${title}:${desc}`)
  }

  const confirmCustom = () => {
    const q = query.trim()
    if (!q) return
    pick(q, 'custom')
    setQuery('')
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      confirmCustom()
    }
  }

  return (
    <div>
      <div className="p-4 rounded-lg mb-4 bg-white shadow-sm border border-transparent hover:border-blue-100 transition">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Travel interests</h3>
            <p className="text-gray-600 text-sm">For example: adventure, sightseeing, cultural experiences, food, nightlife, relaxation</p>
          </div>
        </div>

    <div className="mt-4 flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKey}
            placeholder="Search or type an interest"
      className="flex-1 rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200 bg-slate-50"
          />
          <button
            onClick={confirmCustom}
            disabled={!query.trim()}
      className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 disabled:opacity-50"
          >
            Done
          </button>
        </div>

        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((item) => (
              <div key={item.id} className={`border p-4 rounded-lg mb-0 cursor-pointer hover:bg-gray-100 flex items-center gap-4`} onClick={() => pick(item.title, item.desc)}>
                <div className={`p-3 rounded-full ${item.color} text-lg`}>{item.icon}</div>
                <div>
                  <h3 className='text-lg font-semibold'>{item.title}</h3>
                  <p className='text-gray-600 text-sm'>{item.desc}</p>
                </div>
              </div>
            ))}

            {/* show suggestion to add custom if query doesn't exactly match */}
            {query.trim() && !filtered.some(i => i.title.toLowerCase() === query.trim().toLowerCase()) && (
              <div className={`border p-4 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-4`} onClick={() => { pick(query.trim(), 'custom'); setQuery('') }}>
                <div className={`p-3 rounded-full bg-gray-100 text-gray-700 text-lg`}>✳️</div>
                <div>
                  <h3 className='text-lg font-semibold'>Add "{query.trim()}"</h3>
                  <p className='text-gray-600 text-sm'>Custom interest</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TravelInterestUI