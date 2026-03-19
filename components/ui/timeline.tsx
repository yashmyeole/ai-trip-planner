"use client";
import { TripDetail } from "@/context/TripDetailContext";
import { Calendar, Users, Wallet } from "lucide-react";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./button";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  tripData,
}: {
  data: TimelineEntry[];
  tripData: TripDetail;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 lg:px-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800 max-w-4xl tracking-tight">
          Your Trip to{" "}
          <span className="text-indigo-600">{tripData?.destination}</span>
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-600 mt-4">
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span>{tripData?.duration}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <Wallet className="w-4 h-4 text-green-600" />
            <span>{tripData?.budget} Budget</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
            <Users className="w-4 h-4 text-blue-500" />
            <span>{tripData?.group_size}</span>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-14 md:gap-8"
          >
            <div className="sticky flex flex-col z-40 items-start top-40 self-start w-32 md:w-48 shrink-0">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-indigo-500 border-2 border-indigo-200 p-2" />
              </div>
              <h3 className="hidden md:block text-lg md:pl-16 font-bold text-slate-400">
                {item.title.split(": ")[0]}
                {item.title.includes(": ") && (
                  <div className="text-sm font-medium text-slate-600 mt-1">
                    {item.title.split(": ")[1]}
                  </div>
                )}
              </h3>
            </div>

            <div className="relative pl-16 pr-4 md:pl-0 w-full max-w-[100%] overflow-hidden">
              <h3 className="md:hidden block text-lg mb-4 text-left font-bold text-slate-600">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
