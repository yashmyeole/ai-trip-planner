"use client";
import React, { use, useState } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { User } from 'lucide-react';
import { UserDetailContext } from '@/context/UserDetailContext';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const [userDetail, setUserDetail] = useState<any>(null);
  const createUser = useMutation(api.user.CreateNewUser);
  const {user} = useUser();

  React.useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    if(user) {
      const userD = await createUser({
        name: user?.fullName || '',
        imageUrl: user?.imageUrl || '',
        email: user?.primaryEmailAddress?.emailAddress || '',
      });
      setUserDetail(userD);
    
    }
  }

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
    <div>
      <Header/>
      {children}
      </div>
      </UserDetailContext.Provider>
  )
}

export default Provider