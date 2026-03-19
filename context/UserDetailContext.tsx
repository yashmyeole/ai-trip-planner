import React, { createContext } from "react";

export interface UserDetail {
  userId: string;
  preferences: string[];
  pastTrips?: any[];
  constraints?: any;
}

export const UserDetailContext = createContext<{
  userDetail: UserDetail | null;
  setUserDetail: (user: UserDetail | null) => void;
} | null>(null);
