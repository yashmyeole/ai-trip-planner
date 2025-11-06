"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { Loader, Send } from "lucide-react";
import { i, s } from "motion/react-client";
import React, { use, useEffect, useState } from "react";
import EmptyBox from "./EmptyBox";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUI from "./BudgetUI";
import DurationUI from "./DurationUI";
import TravelInterestUI from "./TravelInterestUI";
import FinalUI from "./FinalUI";
import { on } from "events";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useTripDetail, useUserDetail } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";

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

const Chatbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFinal, setIsFinal] = useState<boolean>(false);
  const [tripDetails, setTripDetails] = useState<TripInfo>();
  const saveTripDetails = useMutation(api.tripDetails.CreateTripDetails);
  const { userDetail, setUserDetail } = useUserDetail();
  const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

  const onSend = async (overrideContent?: string) => {
    // Handle send action. If overrideContent is provided, use it immediately.
    const contentToSend = (
      overrideContent !== undefined ? overrideContent : userInput || ""
    ).trim();
    if (!contentToSend) return;
    !isFinal && setLoading(true);
    // clear input for UI
    setUserInput("");

    const newMsg: Message = { role: "user", content: contentToSend };

    !isFinal && setMessages((prev) => [...prev, newMsg]);

    const result = await axios.post("/api/aimodel", {
      messages: [...messages, newMsg],
      isFinal: isFinal,
    });

    // console.log("TRIP PLAN FINAL:", result?.data);

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

    if (isFinal) {
      setTripDetails(result?.data?.trip_plan);
      setTripDetailInfo(result?.data?.trip_plan);
      const tripId = uuidv4();
      const resultSave = await saveTripDetails({
        tripId: tripId,
        uid: userDetail?._id,
        tripDetail: result?.data?.trip_plan,
      });
    }
    // console.log('AI Response:', result);
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
    if (isFinal && userInput) {
      onSend();
    }
  }, [isFinal == true]);

  return (
    <div className="h-[87vh] flex flex-col border border-gray-300 rounded-lg">
      <section className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && !loading && (
          <div>
            <EmptyBox
              onSelectOption={(v: string) => {
                setUserInput(v);
                onSend();
              }}
            />
          </div>
        )}
        {messages.map((msg: Message, index) =>
          msg.role == "user" ? (
            <div key={index} className="flex justify-end my-4">
              <div className="max-w-lg bg-sky-600 text-white px-4 py-2 rounded-lg shadow">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start my-4" key={index}>
              <div className="max-w-lg bg-white text-slate-900 px-4 py-2 rounded-lg shadow">
                {typeof msg.content === "string"
                  ? msg.content
                  : JSON.stringify(msg.content)}
                {msg.ui && (
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-transparent hover:border-blue-100">
                    {RenderGenerativeUi(msg.ui)}
                  </div>
                )}
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg">
              <Loader className="animate-spin" />
            </div>
          </div>
        )}
      </section>
      <section>
        <div className="flex relative">
          <Textarea
            disabled={loading || isFinal}
            placeholder="Start your trip planning by choosing a suggestion or type your own prompt"
            className="w-full h-28 bg-transparent border border-gray-200 m-4"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <Button
            disabled={loading || isFinal}
            className="absolute right-8 bottom-8"
            size={"icon"}
            onClick={() => onSend()}
          >
            <Send />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Chatbox;
