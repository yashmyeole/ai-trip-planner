"use client";

import React, { useState } from "react";
import Chatbox from "./_components/Chatbox";
import Itinenary from "./_components/Itinenary";
import { useTripDetail } from "@/app/provider";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Edit3 } from "lucide-react";

const CreateNewTrip = () => {
  const tripCtx = useTripDetail();
  const tripDetailInfo = tripCtx?.tripDetailInfo;
  const [isModifying, setIsModifying] = useState(false);

  return (
    <div className="h-full flex justify-center bg-[#F8FAFC] p-4 md:p-6 overflow-hidden font-sans">
      <div
        className={`flex w-full ${
          tripDetailInfo && !isModifying ? "max-w-[1400px]" : "max-w-xl"
        } h-full gap-6 transition-all duration-700 ease-in-out`}
      >
        {/* Chat / Setup Side */}
        <motion.div
          layout
          className={`flex flex-col flex-1 rounded-3xl shadow-sm bg-white border border-gray-100 h-full min-h-0 ${
            tripDetailInfo && !isModifying ? "max-w-sm" : "w-full"
          }`}
        >
          <div className="p-5 border-b border-gray-50 flex items-center justify-between pb-4">
            <h1 className="text-[19px] font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              {tripDetailInfo && !isModifying
                ? "Trip Assistant"
                : "Plan Your Trip"}
            </h1>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbox
              onModify={() => setIsModifying(true)}
              onGenerated={() => setIsModifying(false)}
              showMinimal={!!(tripDetailInfo && !isModifying)}
            />
          </div>
        </motion.div>

        {/* Itinerary Side (Slides in) */}
        <AnimatePresence>
          {tripDetailInfo && !isModifying && (
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="flex-1 rounded-3xl shadow-sm bg-white border border-gray-100 flex flex-col h-full min-h-0 overflow-hidden relative"
            >
              {/* Header for Itinerary */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-gray-50 bg-white/80 backdrop-blur z-10">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                  Your Curated Itinerary
                </h2>
                <button
                  onClick={() => setIsModifying(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-indigo-600 transition-colors text-sm font-semibold"
                >
                  <Edit3 className="w-4 h-4" />
                  Modify Plan
                </button>
              </div>

              {/* Scrollable Itinerary Content */}
              <div className="flex-1 overflow-y-auto bg-[#FAFAFB]">
                <Itinenary />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CreateNewTrip;
