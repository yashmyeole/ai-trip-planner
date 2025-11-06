import React from 'react'

export const SelectTravelesList = [

    {

        id: 1,

        title: 'Just Me',

        desc: 'A sole traveles in exploration',

        icon: '✈️',

        people: '1'

    },

    {

        id: 2,

        title: 'A Couple',

        desc: 'Two traveles in tandem',

        icon: '🥂',

        people: '2 People'

    },

    {

        id: 3,

        title: 'Family',

        desc: 'A group of fun loving adv',

        icon: '🏡',

        people: '3 to 5 People'

    },

    {

        id: 4,

        title: 'Friends',

        desc: 'A bunch of thrill-seekes',

        icon: '⛵',

        people: '5 to 10 People'

    },

]


const GroupSizeUi = ({onSelectedOption}:any) => {
    return (
        <div className='grid grid-cols-2 gap-4 items-start'>
                {SelectTravelesList.map((item) => (
                        <div key={item.id} onClick={()=> onSelectedOption(item.title+":"+item.people)} className='cursor-pointer p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white border hover:border-blue-100 flex flex-col'>
                                <div className='text-2xl mb-2'>{item.icon}</div>
                                <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
                                <p className='text-slate-600 text-sm mt-1'>{item.desc} - <span className='font-medium text-blue-600'>{item.people}</span></p>
                        </div>
                ))}
        </div>
    )
}

export default GroupSizeUi