This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Multi-Agent System Overview

This project is a showcase of advanced AI agent development, suitable for big tech AI Engineer and Agent Developer roles. It implements a multi-agent system for travel planning with the following features:

### Agent Roles

- **ItineraryAgent**: Plans daily activities, routes, and timing.
- **BudgetAgent**: Monitors and optimizes spending, negotiates with other agents.
- **HotelAgent**: Finds and books accommodations.
- **InterestAgent**: Suggests activities based on user interests.
- **DocumentAgent**: Handles travel documents, visas, reminders.
- **WeatherAgent**: Checks weather and suggests adjustments.
- **FlightAgent**: Fetches real-time flight prices and options.
- **ChatAgent**: Handles user queries and coordinates with other agents.

### Architecture

- **AgentOrchestrator**: Routes tasks, aggregates results, and resolves agent conflicts using event-driven communication.
- **Context Propagation**: User and trip context are shared across agents for personalized planning.
- **Explainability**: Agent decisions and reasoning are logged and visualized in the UI.

### Trip Creation Flow

- Users must input trip start and end dates.
- Agents collaborate to plan itinerary, optimize budget, find hotels and flights, suggest activities, and handle documents.

### UI Enhancements

- Date pickers for start/end dates.
- Trip plan display includes flights, hotels, activities, and budget breakdown.
- Agent logs and decisions are shown for transparency.

### Reasoning

- Agents use rule-based, ML, or LLM-based logic for autonomous decision-making and negotiation.

---

For more details, see the agents/ directory and context/ files.

## Transport API Integration (Free)

This app now uses free transport/geospatial APIs to improve itinerary transport suggestions:

- Nominatim (OpenStreetMap) for geocoding origin/destination and nearby airports.
- OSRM public API for road travel duration and distance estimates.

Endpoint added:

- `POST /api/transport`

Input:

```json
{
  "origin": "Kalyan, India",
  "destination": "Mahabaleshwar, India",
  "startDate": "2026-03-20"
}
```

Output includes:

- Outbound journey legs with leave time, arrival time, and duration.
- Return journey legs with timings.
- Luggage policy guidance (2+ large bags).

### Luggage-Aware Rule

The itinerary generator is explicitly instructed to avoid recommending crowded local trains for travelers carrying 2+ large bags when practical alternatives (cab, shuttle, AC intercity bus, private transfer) exist.

### Environment Variables

Copy `.env.example` to `.env.local` and set:

- `OPENROUTER_API_KEY`
- `ARCJET_KEY`
- Existing app keys: `NEXT_PUBLIC_CONVEX_URL`, `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
