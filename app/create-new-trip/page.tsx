
import React from 'react'
import Chatbox from './_components/Chatbox'
import Itinenary from './_components/Itinenary'

const CreateNewTrip = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10'>
        <div className='col-span-1'><Chatbox/></div>
        <div className='col-span-2'><Itinenary/></div>
    </div>
  )
}

export default CreateNewTrip