"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { use, useEffect } from 'react'

const HotelCardItem = ({ hotel}:any) => {

    const [placeDetails, setPlaceDetails] = React.useState<any>(null);

    useEffect(() => {
        hotel && GetGooglePlaceDetails();
    }, [hotel]);
    const GetGooglePlaceDetails = async () => {
        try {
            const response = await axios.post('/api/google-place-detail',{
                placeName: hotel.hotel_name,
                placeAddress: hotel.hotel_address
            });
            
            // console.log(response.data);
            setPlaceDetails(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching Google Place details:', error);
            return null;
        }}
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg">
        <div className="flex items-center mb-4">
            {/* {placeDetails?.photoUrl ? (
                <img src={placeDetails.photoUrl} alt={hotel.hotel_name} className="w-20 h-20 object-cover rounded-lg mr-4" />
            ) : (
                <Image width={12} height={12} src={hotel?.hotel_image_url} alt={hotel.hotel_name} className="w-20 h-20 object-cover rounded-lg mr-4"/>
            )} */}
            <div>
                <h3 className="text-xl font-semibold">{hotel.hotel_name}</h3>
                <p className="text-sm text-gray-500">{hotel.hotel_address}</p>
                <p className="text-sm text-yellow-500">Rating: {hotel.rating} ⭐</p>
            </div>
        </div>
        <p className="text-gray-700 mb-2">{hotel.description}</p>
        <p className="font-semibold">Price per night: {hotel.price_per_night}</p>
        <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
        <Button className='w-full mt-4 bg-gray-300 text-black hover:text-white cursor-pointer'>View Hotel</Button>
        </Link>
    </div>
  )
}

export default HotelCardItem