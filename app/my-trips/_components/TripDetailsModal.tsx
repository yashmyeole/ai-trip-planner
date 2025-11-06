"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Timeline } from "@/components/ui/timeline";
import HotelCardItem from "@/app/create-new-trip/_components/HotelCardItem";
import PlaceCardItem from "@/app/create-new-trip/_components/PlaceCardItem";
import Image from "next/image";

type Props = {
  open: boolean;
  trip: any | null;
  onClose: () => void;
};

export default function TripDetailsModal({ open, trip, onClose }: Props) {
  if (!open || !trip) return null;

  const detail = trip.tripDetail || {};
  const hotels = detail.hotels ?? [];
  const itinerary = detail.itinerary ?? [];

  const data: any[] = [
    {
      title: "Recommended Hotels",
      content: (
        <div>
          {hotels.map((hotel: any, i: number) => (
            <div key={i} className="mb-3">
              <HotelCardItem hotel={hotel} />
            </div>
          ))}
        </div>
      ),
    },
    ...itinerary.map((day: any) => ({
      title: `Day ${day.day}: ${day.day_plan}`,
      content: <PlaceCardItem day={day} key={day.day} />,
    })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[95%] md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl border p-6 z-10">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {detail.destination || "Trip details"}
            </h3>
            <p className="text-sm text-gray-500">
              {detail.duration || ""} • {detail.group_size || ""}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant={"ghost"} onClick={onClose}>
              Close
            </Button>
          </div>
        </div>

        {hotels.length === 0 && itinerary.length === 0 && (
          <div className="flex flex-col items-center justify-center h-60">
            <Image src="/file.svg" alt="no data" width={120} height={120} />
            <p className="text-sm text-gray-500 mt-4">No itinerary available</p>
          </div>
        )}

        {(hotels.length > 0 || itinerary.length > 0) && (
          <Timeline data={data} tripData={detail} />
        )}
      </div>
    </div>
  );
}
