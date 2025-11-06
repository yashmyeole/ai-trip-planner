"use client"

import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import React, { useEffect, useState } from 'react'
import { useUserDetail } from '../provider';
import Image from 'next/image';
import TripDetailsModal from './_components/TripDetailsModal';

type Trip = any;

function formatTimestamp(ts?: number) {
    if (!ts) return '';
    try {
        const d = new Date(ts);
        return d.toLocaleDateString();
    } catch {
        return '';
    }
}

function MyTripCard({ trip }: { trip: Trip }) {
    const detail = trip.tripDetail || {};
    const hotels = detail.hotels ?? [];
    const itinerary = detail.itinerary ?? [];

    const cover = hotels[0]?.hotel_image_url || itinerary[0]?.activities?.[0]?.place_image_url || '/file.svg';

        return (
        <div className='bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col'>
            <div className='h-44 w-full bg-gray-100 overflow-hidden'>
                <Image width={10} height={10} src={cover} alt={detail.destination || 'trip cover'} className='w-full h-full object-cover' unoptimized/>
            </div>
            <div className='p-4 flex-1 flex flex-col'>
                <div className='flex items-start justify-between gap-4'>
                    <div>
                        <h3 className='text-lg font-semibold text-slate-900'>{detail.destination || 'Unnamed trip'}</h3>
                        <p className='text-sm text-gray-500'>{detail.duration || ''} • {detail.group_size || ''}</p>
                    </div>
                    <div className='text-right text-sm text-gray-400'>
                        <div>{formatTimestamp(trip._creationTime)}</div>
                    </div>
                </div>

                <div className='mt-3 flex-1'>
                    <p className='text-sm text-gray-600 line-clamp-3'>{detail.origin ? `From: ${detail.origin}` : ''}</p>

                    {hotels.length > 0 && (
                        <div className='mt-3'>
                            <h4 className='text-sm font-medium text-slate-800'>Suggested hotels</h4>
                            <div className='flex gap-2 mt-2 overflow-x-auto'>
                                                {hotels.slice(0,3).map((h: any, i: number) => (
                                                    <div key={i} className='shrink-0 w-28'>
                                        <Image height={10} width={10} src={h.hotel_image_url} alt={h.hotel_name} className='w-28 h-20 object-cover rounded-md' />
                                        <div className='text-xs mt-1 text-gray-700'>{h.hotel_name}</div>
                                        <div className='text-xs text-gray-500'>{h.price_per_night}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* {itinerary.length > 0 && (
                        <div className='mt-4'>
                            <h4 className='text-sm font-medium text-slate-800'>Upcoming — Day {itinerary[0].day}</h4>
                            <div className='mt-2 text-sm text-gray-600'>
                                <div className='font-medium'>{itinerary[0].day_plan}</div>
                                <div className='mt-1'>{itinerary[0].activities?.slice(0,2).map((a:any)=>a.place_name).join(' • ')}</div>
                            </div>
                        </div>
                    )} */}
                </div>

                                <div className='mt-4 flex items-center gap-2'>
                                        <button onClick={() => {
                                            // dispatch a custom event so parent can open modal without changing layout logic here
                                            window.dispatchEvent(new CustomEvent('openTripDetails', { detail: trip }));
                                        }} className='px-3 py-1 bg-sky-500 text-white rounded text-sm hover:bg-sky-600 cursor-pointer'>View details</button>
                    {/* <button className='px-3 py-1 border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50'>Export</button> */}
                    <div className='ml-auto text-xs text-gray-400'>Budget: {detail.budget || '-'}</div>
                </div>
            </div>
        </div>
    );
}

const MyTrips = () => {
    const [myTrips, setMyTrips] = React.useState<Trip[]>([]);
    const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

        const convex = useConvex();
        const {userDetail } = useUserDetail();

        useEffect(() => {
                if(userDetail){
                        GetUserTrip();
                }
        }, [userDetail]);

        useEffect(() => {
            const handler = (e: any) => {
                setSelectedTrip(e.detail);
                setModalOpen(true);
            }
            window.addEventListener('openTripDetails', handler as EventListener);
            return () => window.removeEventListener('openTripDetails', handler as EventListener);
        }, []);

        const GetUserTrip = async () => {
                try {
                        // userDetail may be either an object with _id or the id value itself
                        const uid = (userDetail && (userDetail as any)._id) ? (userDetail as any)._id : userDetail;
                        const trips = await convex.query(api.tripDetails.GetUserTripDetails, {
                                uid
                        });
            
                        setMyTrips(trips || []);
            
                } catch (error) {
                        console.error('Error fetching user trips:', error);
                }
        }
    return (
        <div className='min-h-screen pt-24 px-4 md:px-8 lg:px-16 bg-gray-50'>
                <h1 className='text-3xl font-bold mb-8 text-slate-900'>My Trips</h1>
                {myTrips.length===0 ? (
                        <div className='h-64 flex flex-col justify-center items-center bg-white rounded-lg shadow-sm'>
                                <p className='text-gray-500'>You have no trips yet. Start by creating a new trip!</p>
                        </div>
                ) : (
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {myTrips.map((trip) => (
                                        <MyTripCard key={trip._id || trip.tripId || trip._id} trip={trip} />
                                ))}
                        </div>
                )}
                <TripDetailsModal open={modalOpen} trip={selectedTrip} onClose={() => setModalOpen(false)} />
        </div>
    )
}

export default MyTrips