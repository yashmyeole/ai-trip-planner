"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect } from "react";

const HotelCardItem = ({ hotel }: any) => {
  const [placeDetails, setPlaceDetails] = React.useState<any>(null);

  useEffect(() => {
    hotel && GetGooglePlaceDetails();
  }, [hotel]);
  const GetGooglePlaceDetails = async () => {
    try {
      const response = await axios.post("/api/google-place-detail", {
        placeName: hotel.hotel_name,
        placeAddress: hotel.hotel_address,
      });

      // console.log(response.data);
      setPlaceDetails(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Google Place details:", error);
      return null;
    }
  };
  return (
    <div className="group mb-5 p-5 bg-white border border-gray-100 hover:border-blue-100 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-5 mb-4">
        {/* Image Thumbnail */}
        <div className="relative w-full sm:w-32 h-32 shrink-0 rounded-[16px] overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center">
          {placeDetails?.photoUrl ? (
            <img
              src={placeDetails.photoUrl}
              alt={hotel.hotel_name}
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
            />
          ) : (
            <span className="text-4xl">🏨</span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-[19px] font-bold text-gray-900 leading-tight">
            {hotel.hotel_name}
          </h3>
          <p className="text-[13px] text-gray-500 mt-1 flex items-center gap-1">
            📍 {hotel.hotel_address}
          </p>
          <div className="flex items-center gap-3 mt-3">
            <span className="bg-yellow-50 text-yellow-700 text-xs font-bold px-2 py-1 flex items-center gap-1 rounded-md">
              ⭐ {hotel.rating}
            </span>
            <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
              {hotel.price_per_night} / night
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-[14px] leading-relaxed mb-4">
        {hotel.description}
      </p>
      <Link
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotel_name + " " + hotel.hotel_address)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-xl py-5 font-semibold transition-all group-hover:bg-[#5271ff] shadow-sm">
          View Hotel on Maps
        </Button>
      </Link>
    </div>
  );
};

export default HotelCardItem;
