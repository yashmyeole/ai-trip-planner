"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PlaceCardItem = ({day}:any) => {

  return (
    <div >
        <p className="mb-4 text-gray-600">Best time to visit: {day.best_time_to_visit_day}</p>
        {day.activities.map((activity:any, idx:any) => (
        <div key={idx} className="mb-6 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center mb-4">
            <div>
                <h3 className="text-xl font-semibold">{activity.place_name}</h3>
                <p className="text-sm text-gray-500">{activity.place_address}</p>
                <p className="text-sm text-yellow-500">Best time to visit: {activity.best_time_to_visit}</p>
            </div>
            </div>
            <p className="text-gray-700 mb-2">{activity.place_details}</p>
            <p className="font-semibold">Ticket Pricing: {activity.ticket_pricing}</p>
            <p className="font-semibold">Travel Time: {activity.time_travel_each_location}</p>
            
            <Link href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.place_name + ', ' + activity.place_address)}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            <Button className='w-full mt-4 bg-gray-300 text-black hover:text-white cursor-pointer'>View on Map </Button>
            </Link>
        </div>
        ))}
    </div>
  )
}

export default PlaceCardItem