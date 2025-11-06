"use client";
import React, { use, useState } from "react";
import Header from "./_components/Header";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { TripDetailContext } from "@/context/TripDetailContext";

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [userDetail, setUserDetail] = useState<any>(null);
  const [tripDetailInfo, setTripDetailInfo] = useState<any>(null);
  const createUser = useMutation(api.user.CreateNewUser);
  const { user } = useUser();

  React.useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    if (user) {
      const userD = await createUser({
        name: user?.fullName || "",
        imageUrl: user?.imageUrl || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
      });
      setUserDetail(userD);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          <div className="max-h-[92vh] h-[92vh]">{children}</div>
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;

export const useUserDetail = () => React.useContext(UserDetailContext);
export const useTripDetail = () => React.useContext(TripDetailContext);
