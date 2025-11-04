"use client";
import React from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

const Provider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const createUser = useMutation(api.user.CreateNewUser);
  const {user} = useUser();

  React.useEffect(() => {
    user && createNewUser();
  }, [user]);

  const createNewUser = async () => {
    if(user) {
      const userId = await createUser({
      name: user?.fullName || '',
      imageUrl: user?.imageUrl || '',
      email: user?.primaryEmailAddress?.emailAddress || '',
    });
    console.log('Created user with ID:', userId);
    }
  }

  return (
    <div>
      <Header/>
      {children}
      </div>
  )
}

export default Provider