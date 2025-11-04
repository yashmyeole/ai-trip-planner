"use client";
import { Button } from '@/components/ui/button';
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const suggestion = [
  {
    title: "Trip to Paris",
    icon : "🌍"
  },
  {
    title: "Beach Vacation",
    icon : "🏖️"
  },
  {
    title: "Mountain Hiking",
    icon : "⛰️"
  },
]


const Hero = () => {

  const {user} = useUser();
  const router = useRouter();

  const onSend = () => {
    if(!user) {
      // open sign in modal
      router.push('/sign-in');
      return;
    }
  }
  return (
    <div className='mt-24 flex item-center flex-col gap-8'>
      {/* Content */}
      {/* Input box */}
      <div>
        <div>
          <Textarea className='w-full h-28 bg-transparent border-none' placeholder='Create a trip'/> 
          <Button size={'icon'} onClick={() =>onSend()}>
            <Send />
          </Button>
        </div>
      </div>
      {/* suggestion list */}
      <div className='flex items-center gap-6'>
        {suggestion.map((item) => (
          <div key={item.title} className='flex items-center gap-2'>
            <span>{item.icon}</span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
      {/* video section */}
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.example.com/dummy-video"
        thumbnailSrc="https://www.example.com/dummy-thumbnail.png"
        thumbnailAlt="Dummy Video Thumbnail"
      />
      
    </div>
  )
}

export default Hero;