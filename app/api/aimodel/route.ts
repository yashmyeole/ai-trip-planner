import { useUser } from "@clerk/nextjs";
import { tr } from "motion/react-client";
import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";
import { auth, currentUser } from "@clerk/nextjs/server";
import arcjet, { tokenBucket } from "@arcjet/next";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const PROMPT = `You are an AI Trip Planner Agent. Ask exactly one relevant trip-related question at a time and wait for the user's answer before asking the next.

Required information (ask in this order if missing):
1) Starting location
2) Destination city or country
3) Group size (Solo, Couple, Family, Friends)
4) Budget (Low, Medium, High)
5) Trip duration (number of days)
6) Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7) Special requirements or preferences (if any)

Rules (mandatory):
- ONLY output a strict JSON object and nothing else. The response MUST contain exactly two keys: \`resp\` (string) and \`ui\` (string).
- The \`ui\` value MUST be one of these exact tokens: \`budget\`, \`groupSize\`, \`tripDuration\`, \`travelInterests\`, \`final\`.
- When you ask about budget use "\`ui\`":"budget"; group size -> "\`ui\`":"groupSize"; trip duration -> "\`ui\`":"tripDuration"; travel interests -> "\`ui\`":"travelInterests".
- When all required information has been collected and you are ready to generate the final trip plan, return "\`ui\`":"final".
- Ask only one question per response. Do NOT include any extra text, commentary, or markup outside the JSON object.
- If the user's previous answer already contains the requested information, acknowledge it in \`resp\` and move on to the next missing item.
- If a user answer is unclear or incomplete, ask a clarifying question and set \`ui\` to the appropriate token for that question.

Examples (each line is a complete valid model response):
{"resp":"What is your budget? (Low, Medium, High)","ui":"budget"}
{"resp":"How many days do you plan to travel?","ui":"tripDuration"}
{"resp":"Please list your travel interests, e.g., adventure, sightseeing, food.","ui":"travelInterests"}

Additional instructions:
- Ensure the image links you provide are direct URLs to the image files (ending in .jpg, .png, etc.) so they can be rendered properly.
- Image links must be publicly accessible without authentication and should not be unauthorize.
- If providing multiple image links, ensure each link is valid and accessible.
- Make sure the link you provide should not give 404 or any other error while loading.
- Make sure the "ui" given by you is strictly one of the specified tokens and is perfectly relevant to the question you are asking.

Follow these rules strictly so the client can render the correct UI component.`;

const FINALPROMPT = `Generate Travel Plan with give details, give me Hotels options list with HotelName, 

Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and  suggest itinerary with placeName, Place Details, Place Image Url,

 Geo Coordinates,Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.

 Output Schema:

 {

  "trip_plan": {

    "destination": "string",

    "duration": "string",

    "origin": "string",

    "budget": "string",

    "group_size": "string",

    "hotels": [

      {

        "hotel_name": "string",

        "hotel_address": "string",

        "price_per_night": "string",

        "hotel_image_url": "string",

        "geo_coordinates": {

          "latitude": "number",

          "longitude": "number"

        },

        "rating": "number",

        "description": "string"

      }

    ],

    "itinerary": [

      {

        "day": "number",

        "day_plan": "string",

        "best_time_to_visit_day": "string",

        "activities": [

          {

            "place_name": "string",

            "place_details": "string",

            "place_image_url": "string",

            "geo_coordinates": {

              "latitude": "number",

              "longitude": "number"

            },

            "place_address": "string",

            "ticket_pricing": "string",

            "time_travel_each_location": "string",

            "best_time_to_visit": "string"

          }

        ]

      }

    ]

  }
    
  Additional instructions:
- Ensure the image links you provide are direct URLs to the image files (ending in .jpg, .png, etc.) so they can be rendered properly.
- Image links must be publicly accessible without authentication.
- If providing multiple image links, ensure each link is valid and accessible.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, isFinal } = await req.json();

    const aj = arcjet({
      key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
      rules: [
        // Create a token bucket rate limit. Other algorithms are supported.
        tokenBucket({
          mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
          characteristics: ["userId"], // track requests by a custom user ID
          refillRate: 5, // refill 5 tokens per interval
          interval: 86400, // refill every 10 seconds
          capacity: 10, // bucket maximum capacity of 10 tokens
        }),
      ],
    });

    const user = await currentUser();
    const { has } = await auth();
    const hasPremium = has({ plan: "monthly" });
    const decision = await aj.protect(req, {
      userId: user?.id ?? "anonymous",
      requested: 5,
    });

    // console.log(decision)
    if (decision?.conclusion == "DENY" && !hasPremium) {
      return NextResponse.json(
        { error: "Done for the day", reason: decision.reason },
        { status: 200 }
      );
    }

    // ✅ Ensure API key exists
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY in environment variables");
    }

    // ✅ Call the OpenAI API safely
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: isFinal ? FINALPROMPT : PROMPT },
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

    // console.log(parsedContent)

    return NextResponse.json(parsedContent);
  } catch (error: any) {
    console.error("Error generating AI response:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate AI response" },
      { status: 500 }
    );
  }
}
