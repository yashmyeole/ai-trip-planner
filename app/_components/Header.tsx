import { Button } from '@/components/ui/button';
import Link from 'next/link';
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
        <Button variant="outline" asChild>
            <Link href="/login" className='text-black'>Get Started</Link>
        </Button>
    </div>
  )
}

export default Header