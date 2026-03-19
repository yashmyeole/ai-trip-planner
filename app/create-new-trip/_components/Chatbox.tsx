"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import GroupSizeUi from "./GroupSizeUi";
import DurationUI from "./DurationUI";
import TravelInterestUI from "./TravelInterestUI";
import FinalUI from "./FinalUI";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import BudgetUI from "./BudgetUI";
import { CitySelector } from "@/components/ui/city-selector";
import { BudgetSelector } from "@/components/ui/budget-selector";
import StartDatePicker from "./StartDatePicker";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

export type TripInfo = {
  budget: string;
  destination: string;
  duration: string;
  group_size: string;
  origin: string;
  hotels: any;
  itinerary: any;
};

interface ChatboxProps {
  onModify?: () => void;
  onGenerated?: () => void;
  showMinimal?: boolean;
}

const Chatbox = ({
  onModify,
  onGenerated,
  showMinimal = false,
}: ChatboxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetails, setTripDetails] = useState<TripInfo>();
  const [duration, setDuration] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [groupSize, setGroupSize] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [step, setStep] = useState<
    | "askDuration"
    | "askStartDate"
    | "askOrigin"
    | "askDestination"
    | "askGroupSize"
    | "askBudget"
    | "askPreferences"
    | "mainChat"
  >("askDuration");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [preferences, setPreferences] = useState<string>("");
  const saveTripDetails = useMutation(api.tripDetails.CreateTripDetails);
  const userCtx = useUserDetail();
  const tripCtx = useTripDetail();
  const userDetail = userCtx?.userDetail;
  const setTripDetailInfo = tripCtx?.setTripDetailInfo;

  // Handle date selection as conversational UI
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "How many days do you want to travel for?",
        },
      ]);
    }
  }, []);

  const onSend = async (overrideContent?: string) => {
    const contentToSend = (
      overrideContent !== undefined ? overrideContent : userInput || ""
    ).trim();
    if (!contentToSend) return;
    !isFinal && setLoading(true);
    setUserInput("");

    // Conversational flow
    if (step === "askDuration") {
      setDuration(contentToSend);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend },
        { role: "assistant", content: "What is your trip start date?" },
      ]);
      setStep("askStartDate");
      setLoading(false);
      return;
    }
    // ...existing code...
    if (step === "askStartDate") {
      setStartDate(contentToSend);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend },
        { role: "assistant", content: "What is your origin location?" },
      ]);
      setStep("askOrigin");
      setLoading(false);
      return;
    }

    if (step === "askOrigin") {
      setCurrentCity(contentToSend);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend },
        { role: "assistant", content: "What is your destination location?" },
      ]);
      setStep("askDestination");
      setLoading(false);
      return;
    }
    if (step === "askDestination") {
      setDestination(contentToSend);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend },
        { role: "assistant", content: "How many people are traveling?" },
      ]);
      setStep("askGroupSize");
      setLoading(false);
      return;
    }
    if (step === "askGroupSize") {
      setGroupSize(contentToSend);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend },
        { role: "assistant", content: "What is your budget for the trip?" },
      ]);
      setStep("askBudget");
      setLoading(false);
      return;
    }
    if (step === "askBudget") {
      setBudget(contentToSend);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend },
        {
          role: "assistant",
          content:
            "Any additional preferences or things to consider? (Optional)",
        },
      ]);
      setStep("askPreferences");
      setLoading(false);
      return;
    }

    if (step === "askPreferences") {
      setPreferences(contentToSend);

      setMessages((prev) => [
        ...prev,
        { role: "user", content: contentToSend || "No specific preferences." },
        {
          role: "assistant",
          content: "Great! I'm creating your itinerary now...",
          ui: "final",
        },
      ]);
      setStep("mainChat");
      setLoading(false);
      return;
    }

    if (step === "mainChat" && isFinal) {
      // Allow modifying the trip
      onModify?.();
      setIsFinal(false); // Reset final state so they can chat again to modify
    }

    const newMsg: Message = { role: "user", content: contentToSend };
    !isFinal && setMessages((prev) => [...prev, newMsg]);

    let transportContext: any = null;
    if (isFinal) {
      try {
        const transportResult = await axios.post("/api/transport", {
          origin: currentCity,
          destination,
          startDate,
        });
        transportContext = transportResult?.data?.transport_plan || null;
      } catch {
        transportContext = null;
      }
    }

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
      startDate,
      transportContext,
    });

    if (result?.data?.reason?.type == "RATE_LIMIT") {
      setLoading(false);
      return setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `You have reached the limit for today. Please try again tomorrow.`,
        },
      ]);
    }

    !isFinal &&
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.data.resp, ui: result?.data?.ui },
      ]);

    if (isFinal || result?.data?.ui === "final") {
      setTripDetails(result?.data?.trip_plan);
      setTripDetailInfo?.(result?.data?.trip_plan);
      onGenerated?.();
      const tripId = uuidv4();
      const resultSave = await saveTripDetails({
        tripId: tripId,
        uid: (userDetail as any)?._id,
        tripDetail: result?.data?.trip_plan,
      });
    }
    setLoading(false);
  };

  const RenderGenerativeUi = (ui: string) => {
    // Render different UI components based on AI response
    if (ui === "budget") {
      return (
        <div>
          <BudgetUI
            onSelectedOption={(v: string) => {
              // send immediately with selected value
              onSend(v.trim());
            }}
          />
        </div>
      );
    } else if (ui === "groupSize") {
      return (
        <GroupSizeUi
          onSelectedOption={(v: string) => {
            onSend(v.trim());
          }}
        />
      );
    } else if (ui === "tripDuration") {
      return (
        <div>
          <DurationUI
            initialDays={4}
            onDone={(d) => {
              onSend(`${d} Days`);
            }} // fired when Done clicked
          />
        </div>
      );
    } else if (ui === "travelInterests") {
      return (
        <div>
          <TravelInterestUI
            onSelectedOption={(s) => {
              onSend("My interest(s): " + s);
            }}
          />
        </div>
      );
    } else if (ui === "final") {
      return (
        <div>
          <FinalUI viewTrip={tripDetails} disable={!tripDetails} />
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      // Only send when user presses Enter (without Shift). Leave Shift+Enter for newline.
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    window.addEventListener("keydown", handleEnter);
    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, [onSend]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];

    if (lastMsg?.ui === "final") {
      setIsFinal(true);
      setUserInput("Ok, generate the final trip plan");
    }
  }, [messages]);

  useEffect(() => {
    if (isFinal && userInput === "Ok, generate the final trip plan") {
      onSend();
    }
  }, [isFinal]);

  return (
    <div
      className={`h-full flex flex-col ${showMinimal ? "bg-transparent" : "bg-[#FAFAFB] rounded-2xl shadow-sm"}`}
    >
      <section
        className="flex-1 overflow-y-auto p-4 md:p-6"
        id="chat-container"
      >
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div key={index} className="flex justify-end my-4">
              <div className="max-w-lg bg-linear-to-r from-blue-500 to-indigo-500 text-white px-5 py-3 rounded-[20px] rounded-tr-sm shadow-sm font-medium">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start my-4" key={index}>
              <div className="max-w-lg bg-white text-slate-800 px-5 py-4 rounded-[20px] rounded-tl-sm shadow-sm border border-gray-100">
                {typeof msg.content === "string"
                  ? msg.content
                  : JSON.stringify(msg.content)}
                {msg.ui && (
                  <div className="mt-4">{RenderGenerativeUi(msg.ui)}</div>
                )}
              </div>
            </div>
          ),
        )}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-white text-slate-800 px-5 py-4 rounded-[20px] rounded-tl-sm shadow-sm border border-gray-100">
              <Loader className="animate-spin text-indigo-500" />
            </div>
          </div>
        )}
        {/* Conversational input UI for each step */}
        {step === "askDuration" && (
          <div className="flex justify-start my-4">
            <div className="flex items-center gap-3 bg-white p-2 rounded-[20px] shadow-sm border border-gray-100 mt-2">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center text-xl">
                ⏳
              </div>
              <input
                type="number"
                min={1}
                value={userInput || duration}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="0"
                className="w-16 outline-none bg-transparent text-gray-800 font-bold text-xl px-2 text-center placeholder-gray-300"
              />
              <span className="text-gray-400 font-medium pr-4">Days</span>
              <button
                className="px-6 py-3 bg-[#5271ff] text-white font-bold rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-transform active:scale-95"
                onClick={() => onSend()}
                disabled={!userInput}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {step === "askStartDate" && (
          <div className="flex justify-start my-4">
            <div className="flex items-center gap-3 bg-white p-2 rounded-[20px] shadow-sm border border-gray-100 mt-2">
              <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center text-xl">
                📅
              </div>
              <StartDatePicker
                value={userInput || startDate}
                onChange={(nextDate) => setUserInput(nextDate)}
              />
              <button
                className="ml-2 px-6 py-3 bg-[#5271ff] text-white font-bold rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-transform active:scale-95 shrink-0"
                onClick={() => onSend()}
                disabled={!userInput}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {step === "askDestination" && (
          <div className="flex justify-start my-4 w-full max-w-lg">
            <CitySelector
              onSelect={(city) => {
                setUserInput(city);
                onSend(city);
              }}
              onCustom={(city) => {
                setUserInput(city);
                onSend(city);
              }}
            />
          </div>
        )}
        {step === "askGroupSize" && (
          <div className="flex justify-start my-4 w-full max-w-lg">
            <GroupSizeUi
              onSelectedOption={(v: string) => {
                setUserInput(v);
                onSend(v);
              }}
            />
          </div>
        )}
        {step === "askBudget" && (
          <div className="flex justify-start my-4 w-full max-w-lg">
            <BudgetSelector
              onSelect={(option) => {
                setUserInput(option);
                onSend(option);
              }}
            />
          </div>
        )}
        {step === "askOrigin" && (
          <div className="flex justify-start my-4">
            <div className="flex items-center gap-3 bg-white p-2 rounded-[20px] shadow-sm border border-gray-100 mt-2">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center text-xl">
                📍
              </div>
              <input
                type="text"
                value={userInput || currentCity}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g. New York"
                className="w-40 outline-none bg-transparent text-gray-800 font-bold px-2 placeholder-gray-300"
              />
              <button
                className="px-6 py-3 bg-[#5271ff] text-white font-bold rounded-xl disabled:opacity-50 hover:bg-blue-600 transition-transform active:scale-95"
                onClick={() => onSend()}
                disabled={!userInput}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {step === "askPreferences" && (
          <div className="flex justify-start my-4 w-full max-w-xl">
            <div className="w-full bg-white p-2 rounded-[20px] shadow-sm border border-gray-100 flex flex-col gap-2 mt-2">
              <Textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="e.g. Needs vegan food, wheelchair accessible, focus on museums... (Optional)"
                className="w-full border-none shadow-none focus-visible:ring-0 px-4 py-3 outline-none resize-none min-h-[100px] text-gray-800 bg-transparent"
              />
              <div className="flex justify-end p-2 pb-1">
                <button
                  className="px-6 py-3 bg-[#5271ff] text-white font-bold rounded-xl hover:bg-blue-600 transition-transform active:scale-95"
                  onClick={() => onSend(userInput)}
                >
                  Start generating itinerary ✨
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      {step === "mainChat" && (
        <section>
          <div className="flex relative bg-white border-t border-gray-100 p-4">
            <Textarea
              disabled={loading}
              placeholder={
                isFinal
                  ? "Type here to modify your itinerary..."
                  : "Start your trip planning by choosing a suggestion or type your own prompt"
              }
              className="w-full h-20 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pr-14 outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-300 resize-none"
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
            />
            <Button
              disabled={loading || (!userInput.trim() && !isFinal)}
              className="absolute right-6 bottom-6 bg-[#5271ff] hover:bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center p-0"
              onClick={() => onSend()}
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Chatbox;
