"use client";
import { Button } from '@/components/ui/button';
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@clerk/nextjs';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

export const suggestion = [
 

    {

        category: "Paris, France",

        title: "Explore the City of Lights – Eiffel Tower, Louvre & more",

        src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",

      

    },

    {

        category: "New York, USA",

        title: "Experience NYC – Times Square, Central Park, Broadway",

        src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      

    },

    {

        category: "Tokyo, Japan",

        title: "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",

        src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      

    },

    {

        category: "Rome, Italy",

        title: "Walk through History – Colosseum, Vatican, Roman Forum",

        src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      

    },

    {

        category: "Dubai, UAE",

        title: "Luxury and Innovation – Burj Khalifa, Desert Safari",

        src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      

    },

    {

        category: "India",

        title: "Harbour Views – Opera House, Bondi Beach & Wildlife",

        src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      

    },



];


const Hero = () => {

  const {user} = useUser();
  const router = useRouter();

  const onSend = () => {
    if(!user) {
      // open sign in modal
      router.push('/sign-in');
      return;
    }
    router.push('/create-new-trip');
  }
  return (
    <div className='mt-24 flex item-center flex-col gap-8 px-6'>
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
      <div className="w-full">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Popular ideas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestion.map((item) => (
            <div
              key={item.title}
              className="relative grid grid-cols-3 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow bg-white"
            >
              <div className="w-full h-40 bg-gray-100">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-sky-700 bg-sky-100 px-2 py-1 rounded-md">{item.category}</span>
                  <button
                    onClick={() => router.push('/create-new-trip')}
                    className="text-xs text-sky-600 ring-1 ring-sky-100 hover:bg-sky-50 px-3 py-1 rounded-md"
                  >
                    Try
                  </button>
                </div>

                <h4 className="mt-3 text-sm font-semibold text-slate-800">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
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