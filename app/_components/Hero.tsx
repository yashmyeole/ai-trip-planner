"use client";
import { Button } from "@/components/ui/button";
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

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

type HeroProps = {
  centerHeight?: string | number;
};

const Hero = ({ centerHeight = "560px" }: HeroProps) => {
  const router = useRouter();

  const heightValue =
    typeof centerHeight === "number" ? `${centerHeight}px` : centerHeight;

  return (
    <section
      className="w-full flex justify-center px-6 relative h-full"
      style={{ marginTop: 64 }}
    >
      {/* Background gradient + decorative blobs */}
      <div className="absolute inset-0 -z-20 h-full overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-sky-50 via-white to-indigo-50 opacity-100" />
        <div className="absolute -left-24 -top-24 w-72 h-72 rounded-full bg-linear-to-r from-sky-300 to-indigo-300 opacity-30 blur-3xl transform rotate-12" />
        <div className="absolute -right-28 -bottom-24 w-96 h-96 rounded-full bg-linear-to-r from-rose-200 to-pink-300 opacity-20 blur-3xl transform rotate-45" />
        <div className="absolute inset-0 bg-linear-to-t from-transparent to-white/30 mix-blend-soft-light pointer-events-none" />
      </div>

      <div
        className="w-full max-w-7xl relative z-10"
        style={{ minHeight: heightValue }}
      >
        <div className="h-full flex flex-col lg:flex-row items-center gap-10">
          {/* LEFT: Headline & CTA */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-4">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-sky-700 bg-sky-100 px-2 py-1 rounded">
                AI Travel
              </span>
              <span className="text-xs text-gray-400">
                Personalized · Fast · Thoughtful
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
              Plan extraordinary trips in minutes.
            </h1>

            <p className="text-lg text-gray-600 mb-6 max-w-xl">
              Tell us where you want to go and we’ll design a tailored itinerary
              with top hotels, local experiences and a day-by-day plan — all
              powered by AI.
            </p>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => router.push("/create-new-trip")}
                className="bg-linear-to-r from-sky-500 to-indigo-500 text-white hover:opacity-95"
              >
                Create my next trip
              </Button>
              <button
                onClick={() => router.push("/pricing")}
                className="text-sm text-gray-600 hover:underline"
              >
                See pricing
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-500">
              <span className="font-medium">
                Trusted by travelers worldwide.
              </span>{" "}
              Curated suggestions, flexible bookings and local tips included.
            </div>
          </div>

          {/* RIGHT: Visual suggestion grid */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="grid grid-cols-2 gap-4">
              {suggestion.slice(0, 4).map((item, idx) => (
                <div
                  key={item.title}
                  className={`rounded-2xl overflow-hidden shadow-md bg-white flex ${idx === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
                >
                  <div className="w-full h-40 bg-gray-100">
                    <Image
                      width={100}
                      height={100}
                      src={item.src}
                      alt={item.title}
                      className="w-full h-40 object-fit"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/file.svg";
                      }}
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-sky-700 bg-sky-100 px-2 py-1 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-slate-800">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hidden video dialog kept for later use */}
        <HeroVideoDialog
          className="hidden"
          animationStyle="from-center"
          videoSrc="/"
          thumbnailSrc="/"
          thumbnailAlt=""
        />
      </div>
    </section>
  );
};

export default Hero;
