import React, { createContext } from "react";

export interface TripDetail {
  startDate?: string;
  endDate?: string;
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  interests?: string[];
  constraints?: any;
  hotels?: any[];
  itinerary?: any[];
  transport_guide?: any;
}

export const TripDetailContext = createContext<{
  tripDetailInfo: TripDetail | null;
  setTripDetailInfo: (trip: TripDetail | null) => void;
} | null>(null);
