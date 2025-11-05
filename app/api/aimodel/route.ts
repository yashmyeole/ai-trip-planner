import { tr } from "motion/react-client";
import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai"

export const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
})

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by **asking one relevant trip-related question at a time**.

 Only ask questions about the following details in order, and wait for the user’s answer before asking the next: 

1. Starting location 
2. Destination city or country 
3. Group size (Solo, Couple, Family, Friends) 
4. Budget (Low, Medium, High) 
5. Trip duration (number of days) 
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation) 
7. Special requirements or preferences (if any)
Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.
Along wth response also send which ui component to display for generative UI for example 'budget/groupSize/TripDuration/Final) , where Final means AI generating complete final outpur
Once all required information is collected, generate and return a **strict JSON response only** (no explanations or extra text) with following JSON schema:

{

resp:'Text Resp',

ui:'budget/groupSize/TripDuration/Final)'

}`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // ✅ Ensure API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY in environment variables");
    }

    // ✅ Call the OpenAI API safely
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format:{ type:"json_object"},
      messages: [
        { role: "system", content: PROMPT },
        ...messages,
      ],
    });

    const aiMessage = completion.choices[0]?.message;

    // ✅ Safely parse JSON response if content exists
    let parsedContent;
    try {
      parsedContent = aiMessage?.content ? JSON.parse(aiMessage.content) : {};
    } catch {
      parsedContent = { text: aiMessage?.content ?? "" };
    }

    console.log(parsedContent)

    return NextResponse.json(parsedContent);
  } catch (error: any) {
    console.error("Error generating AI response:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}