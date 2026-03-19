import React, { createContext } from "react";

export interface TripDetail {
  startDate: string;
  endDate: string;
  budget: number;
  interests: string[];
  constraints?: any;
}

export const TripDetailContext = createContext<{
  tripDetailInfo: TripDetail | null;
  setTripDetailInfo: (trip: TripDetail | null) => void;
} | null>(null);
