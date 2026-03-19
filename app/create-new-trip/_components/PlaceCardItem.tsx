"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const PlaceCardItem = ({ day }: any) => {
  return (
    <div>
      <div className="mb-4 inline-flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg text-indigo-700 font-semibold text-sm">
        🌤️ Best time: {day.best_time_to_visit_day}
      </div>
      <div className="flex flex-col gap-4">
        {day.activities.map((activity: any, idx: any) => (
          <div
            key={idx}
            className="group p-5 bg-white border border-gray-100 hover:border-indigo-100 rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row gap-5 mb-4">
              {/* Placeholder for fetching place photos later if needed */}
              <div className="relative w-full sm:w-28 h-28 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center">
                <span className="text-3xl">📸</span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-[18px] font-bold text-gray-900 leading-tight">
                  {activity.place_name}
                </h3>
                <p className="text-[13px] text-gray-500 mt-1 flex items-center gap-1">
                  📍 {activity.place_address}
                </p>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="bg-yellow-50 text-yellow-700 text-[11px] font-bold px-2 py-1 flex items-center gap-1 rounded-md">
                    🕒 {activity.best_time_to_visit}
                  </span>
                  {activity.leave_at && (
                    <span className="bg-purple-50 text-purple-700 text-[11px] font-bold px-2 py-1 rounded-md">
                      🚶 Leave: {activity.leave_at}
                    </span>
                  )}
                  {activity.arrive_at && (
                    <span className="bg-indigo-50 text-indigo-700 text-[11px] font-bold px-2 py-1 rounded-md">
                      ⏱️ Arrive: {activity.arrive_at}
                    </span>
                  )}
                  {activity.visit_duration && (
                    <span className="bg-pink-50 text-pink-700 text-[11px] font-bold px-2 py-1 rounded-md">
                      🗺️ Visit: {activity.visit_duration}
                    </span>
                  )}
                  <span className="bg-green-50 text-green-700 text-[11px] font-bold px-2 py-1 rounded-md">
                    🎟️ {activity.ticket_pricing}
                  </span>
                  <span className="bg-blue-50 text-blue-700 text-[11px] font-bold px-2 py-1 rounded-md">
                    🚗 {activity.time_travel_each_location}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-[14px] leading-relaxed mb-4">
              {activity.place_details}
            </p>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.place_name + ", " + activity.place_address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-indigo-50 text-indigo-700 hover:bg-[#5271ff] hover:text-white rounded-xl py-5 font-semibold transition-all shadow-sm">
                View on Map
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceCardItem;
