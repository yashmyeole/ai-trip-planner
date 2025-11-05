"use client";
import { Button } from '@/components/ui/button';
import { SignInButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import path from 'path';
import React from 'react'

const Header = () => {
    const menuOptions = [{
        name: 'Home',
        path: '/'
    }, {
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact',
        path: '/contact'
    }
    ];

    const {user} = useUser();
    const router = useRouter();
  return (
    <div className='flex w-full justify-between items-center py-4 px-8 bg-gray-800 text-white'>
        <h1>AI Trip Planner</h1>
        <div className='flex gap-6'>
            {menuOptions.map((option) => (
                <Link key={option.name} href={option.path} className='hover:underline'>
                    {option.name}
                </Link>
            ))}
        </div>
        
        {!user ? <SignInButton mode="modal">
            <div className='border border-white px-4 py-2 rounded hover:bg-white hover:text-black cursor-pointer'>
                Get Started
            </div>
        </SignInButton> : <Link href="/create-new-trip"><div className="text-white" >Create New Trip</div></Link>}
    </div>
  )
}

export default Header