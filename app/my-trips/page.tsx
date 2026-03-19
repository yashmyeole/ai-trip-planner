"use client";

import { api } from "@/convex/_generated/api";
import { useConvex, useMutation } from "convex/react";
import React, { useEffect, useState } from "react";
import { useUserDetail } from "../provider";
import Image from "next/image";
import TripDetailsModal from "./_components/TripDetailsModal";
import { Map, MapPin } from "lucide-react";

type Trip = any;

function formatTimestamp(ts?: number) {
  if (!ts) return "";
  try {
    const d = new Date(ts);
    return d.toLocaleDateString();
  } catch {
    return "";
  }
}

// A safe image component that falls back to a neat placeholder when hallucinated/broken AI urls fail
const SafeImage = ({ src, alt, className, type = "hotel" }: any) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    if (type === "cover") {
      return (
        <div
          className={`${className} bg-linear-to-br from-[#8BB9E3] to-[#5271ff] flex flex-col items-center justify-center text-white p-4`}
        >
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-2 shadow-lg ring-1 ring-white/30">
            <span className="text-4xl block">✈️</span>
          </div>
        </div>
      );
    }
    return (
      <div
        className={`${className} bg-slate-100 flex items-center justify-center border border-slate-200/60`}
      >
        <span className="text-2xl drop-shadow-sm">🏨</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

function MyTripCard({
  trip,
  onDelete,
  deleting,
}: {
  trip: Trip;
  onDelete: (trip: Trip) => void;
  deleting: boolean;
}) {
  const detail = trip.tripDetail || {};
  const hotels = detail.hotels ?? [];
  const itinerary = detail.itinerary ?? [];

  const cover =
    hotels[0]?.hotel_image_url ||
    itinerary[0]?.activities?.[0]?.place_image_url ||
    "";

  return (
    <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 group">
      <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
        <SafeImage
          src={cover}
          alt={detail.destination || "trip cover"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          type="cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
            {detail.destination || "Unnamed trip"}
          </h3>
          <p className="text-sm text-white/90 font-medium flex items-center gap-1.5 mt-1 drop-shadow-md">
            <MapPin className="w-3.5 h-3.5" />
            {detail.origin ? `From ${detail.origin}` : "Location Set"}
          </p>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-gray-50">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">
              {detail.duration || "Flexible duration"}
            </span>
            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">
              {detail.group_size || "Group details"}
            </span>
          </div>
          <div className="text-right text-[12px] font-medium text-gray-400">
            <div>{formatTimestamp(trip._creationTime)}</div>
          </div>
        </div>

        <div className="flex-1">
          {hotels.length > 0 && (
            <div className="mb-2">
              <h4 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-3">
                Suggested stays
              </h4>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {hotels.slice(0, 3).map((h: any, i: number) => (
                  <div key={i} className="shrink-0 w-[105px]">
                    <SafeImage
                      src={h.hotel_image_url}
                      alt={h.hotel_name}
                      className="w-full h-20 object-cover rounded-[14px] shadow-sm mb-2"
                      type="hotel"
                    />
                    <div className="text-[12px] font-semibold text-gray-800 leading-tight line-clamp-2">
                      {h.hotel_name}
                    </div>
                    <div className="text-[11px] font-medium text-gray-500 mt-0.5">
                      {h.price_per_night}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
          <div className="text-xs font-bold px-3 py-1.5 bg-green-50 text-green-700 rounded-lg">
            {detail.budget || "-"} Budget
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("openTripDetails", { detail: trip }),
                );
              }}
              className="px-5 py-2 bg-[#5271ff] text-white font-bold rounded-xl text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-sm"
            >
              View Details
            </button>
            <button
              onClick={() => onDelete(trip)}
              disabled={deleting}
              className="px-4 py-2 bg-rose-50 text-rose-700 font-bold rounded-xl text-sm hover:bg-rose-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const MyTrips = () => {
  const [myTrips, setMyTrips] = React.useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);

  const convex = useConvex();
  const deleteUserTrip = useMutation(api.tripDetails.DeleteUserTrip);
  const { userDetail } = useUserDetail();

  useEffect(() => {
    if (userDetail) {
      GetUserTrip();
    }
  }, [userDetail]);

  useEffect(() => {
    const handler = (e: any) => {
      setSelectedTrip(e.detail);
      setModalOpen(true);
    };
    window.addEventListener("openTripDetails", handler as EventListener);
    return () =>
      window.removeEventListener("openTripDetails", handler as EventListener);
  }, []);

  const GetUserTrip = async () => {
    try {
      // userDetail may be either an object with _id or the id value itself
      const uid =
        userDetail && (userDetail as any)._id
          ? (userDetail as any)._id
          : userDetail;
      const trips = await convex.query(api.tripDetails.GetUserTripDetails, {
        uid,
      });

      setMyTrips(trips || []);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  const handleDeleteTrip = async (trip: Trip) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip? This action cannot be undone.",
    );
    if (!confirmed) return;

    const uid =
      userDetail && (userDetail as any)._id
        ? (userDetail as any)._id
        : userDetail;

    if (!uid || !trip?._id) return;

    try {
      setDeletingTripId(String(trip._id));
      await deleteUserTrip({ tripDocId: trip._id, uid });
      setMyTrips((prev) => prev.filter((t) => t._id !== trip._id));

      if (selectedTrip?._id === trip._id) {
        setModalOpen(false);
        setSelectedTrip(null);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setDeletingTripId(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">My Trips</h1>
      {myTrips.length === 0 ? (
        <div className="h-64 flex flex-col justify-center items-center bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">
            You have no trips yet. Start by creating a new trip!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTrips.map((trip) => (
            <MyTripCard
              key={trip._id || trip.tripId || trip._id}
              trip={trip}
              onDelete={handleDeleteTrip}
              deleting={deletingTripId === String(trip._id)}
            />
          ))}
        </div>
      )}
      <TripDetailsModal
        open={modalOpen}
        trip={selectedTrip}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default MyTrips;
