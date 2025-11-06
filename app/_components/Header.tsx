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
        <div className='flex w-full justify-between items-center py-4 px-8 bg-linear-to-r from-sky-400 to-indigo-400 text-slate-900'>
                <div className='flex items-center gap-4'>
                    <div className='w-10 h-10 rounded-lg bg-white/30 flex items-center justify-center text-white font-bold'>
                        AT
                    </div>
                    <h1 className='text-lg font-semibold text-white'>AI Trip Planner</h1>
                </div>

                <div className='flex gap-6'>
                        {menuOptions.map((option) => (
                                <Link key={option.name} href={option.path} className='text-white/90 hover:underline'>
                                        {option.name}
                                </Link>
                        ))}
                </div>
        
                {!user ? <SignInButton mode="modal">
                        <div className='bg-white text-sky-600 px-4 py-2 rounded shadow cursor-pointer hover:opacity-90'>
                                Get Started
                        </div>
                </SignInButton> : <Link href="/create-new-trip"><div className="bg-white text-sky-600 px-4 py-2 rounded shadow">Create New Trip</div></Link>}
        </div>
    )
}

export default Header