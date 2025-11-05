import { suggestion } from '@/app/_components/Hero'
import React from 'react'

const EmptyBox = ({onSelectOption}:any) => {

  return (
    <div>
        <div className='h-32 flex flex-col justify-center items-center'>
            <p className='text-gray-500'>Start your trip planning by asking a question!</p>
        </div>
        <div className='flex items-center gap-6 justify-center'>
            {suggestion.map((item) => (
                      <div key={item.title} className='flex items-center gap-2 cursor-pointer' onClick={() => onSelectOption(item.title)}>
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                    ))}
        </div>
    </div>
  )
}

export default EmptyBox