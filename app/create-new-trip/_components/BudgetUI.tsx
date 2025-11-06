import React from 'react'

export const SelectBudgetOptions = [

    {

        id: 1,

        title: 'Cheap',

        desc: 'Stay conscious of costs',

        icon: '💵',

        color: 'bg-green-100 text-green-600'

    },

    {

        id: 2,

        title: 'Moderate',

        desc: 'Keep cost on the average side',

        icon: '💰',

        color: 'bg-yellow-100 text-yellow-600'

    },

    {

        id: 3,

        title: 'Luxury',

        desc: 'Don’t worry about cost',

        icon: '💸',

        color: 'bg-purple-100 text-purple-600'

    },

]



const BudgetUI = ({onSelectedOption}:any) => {
    return (
        <div className="grid grid-cols-1 gap-3">
                {SelectBudgetOptions.map((item) => (
                        <div key={item.id} onClick={()=> onSelectedOption(item.title+":"+item.desc)} className="cursor-pointer p-4 rounded-lg shadow-sm hover:shadow-md transition bg-white border border-transparent hover:border-blue-100 flex items-center gap-4">
                                <div className={`p-3 rounded-full ${item.color} text-lg`}>{item.icon}</div>
                                <div>
                                        <h3 className='text-lg font-semibold text-slate-900'>{item.title}</h3>
                                        <p className='text-slate-600'>{item.desc}</p>
                                </div>
                                <div className="ml-auto">
                                    <span className="text-sm text-blue-600">Select</span>
                                </div>
                        </div>
                ))}
        </div>
    )
}

export default BudgetUI