import { suggestion } from '@/app/_components/Hero'
import React from 'react'

const EmptyBox = ({onSelectOption}:any) => {

  return (
    <div>
      <div className='h-32 flex flex-col justify-center items-center'>
        <p className='text-gray-500'>Start your trip planning by choosing a suggestion or type your own prompt.</p>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestion.map((item) => (
          <button
            key={item.title}
            onClick={() => onSelectOption(item.category+" - "+item.title)}
            className="group flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white text-left"
          >
            <div className="w-full h-36 bg-gray-100 overflow-hidden">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>

            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-1 rounded-md">{item.category}</span>
                <span className="text-xs text-slate-400">Try</span>
              </div>

              <h4 className="mt-2 text-sm font-semibold text-slate-800 truncate">{item.title}</h4>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmptyBox