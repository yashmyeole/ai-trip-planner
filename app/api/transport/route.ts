import { NextRequest, NextResponse } from "next/server";

type GeoPoint = {
  lat: number;
  lon: number;
  display_name?: string;
};

const DEFAULT_HEADERS = {
  "User-Agent": "ai-trip-planner/1.0 (travel-planning)",
  Accept: "application/json",
};

function isValidDate(dateStr?: string) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !Number.isNaN(d.getTime());
}

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function addMinutes(base: Date, minutes: number) {
  const next = new Date(base);
  next.setMinutes(next.getMinutes() + minutes);
  return next;
}

function durationLabel(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h <= 0) return `${m} min`;
  return `${h}h ${m}m`;
}

async function geocode(query: string): Promise<GeoPoint | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: DEFAULT_HEADERS, cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const p = data[0];
  return {
    lat: Number(p.lat),
    lon: Number(p.lon),
    display_name: p.display_name,
  };
}

async function drivingRoute(from: GeoPoint, to: GeoPoint) {
  const coordinates = `${from.lon},${from.lat};${to.lon},${to.lat}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=false&alternatives=true`;
  const res = await fetch(url, { headers: DEFAULT_HEADERS, cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  const route = data?.routes?.[0];
  if (!route) return null;

  const durationMinutes = Math.ceil((route.duration ?? 0) / 60);
  const distanceKm = Number(((route.distance ?? 0) / 1000).toFixed(1));
  return {
    durationMinutes,
    distanceKm,
  };
}

function buildLeg(
  from: string,
  to: string,
  recommendedMode: string,
  durationMinutes: number,
  baseLeave: Date,
  note: string,
) {
  const depart = formatClock(baseLeave);
  const arriveAt = addMinutes(baseLeave, durationMinutes);

  return {
    from,
    to,
    recommended_mode: recommendedMode,
    leave_at: depart,
    arrive_at: formatClock(arriveAt),
    estimated_duration: durationLabel(durationMinutes),
    note,
    alternatives: [
      "Airport cab pre-booking",
      "Private intercity coach (AC Volvo/tempo traveler)",
      "Self-drive rental car",
    ],
  };
}

export async function POST(req: NextRequest) {
  try {
    const { origin, destination, startDate } = await req.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { error: "origin and destination are required" },
        { status: 400 },
      );
    }

    const [originGeo, destinationGeo] = await Promise.all([
      geocode(origin),
      geocode(destination),
    ]);

    if (!originGeo || !destinationGeo) {
      return NextResponse.json(
        {
          error: "Unable to geocode origin/destination",
          transport_plan: {
            assumptions: "Falling back to heuristic transport suggestions.",
            luggage_policy:
              "Traveler has 2+ large bags. Avoid crowded local train when a luggage-friendly option exists.",
          },
        },
        { status: 200 },
      );
    }

    const [originAirport, destinationAirport, roadOut, roadBack] =
      await Promise.all([
        geocode(`${origin} airport`),
        geocode(`${destination} airport`),
        drivingRoute(originGeo, destinationGeo),
        drivingRoute(destinationGeo, originGeo),
      ]);

    const tripStart = isValidDate(startDate) ? new Date(startDate) : new Date();
    tripStart.setHours(6, 30, 0, 0);

    const outbound: any[] = [];
    const returning: any[] = [];

    if (originAirport) {
      const toAirport = await drivingRoute(originGeo, originAirport);
      if (toAirport) {
        outbound.push(
          buildLeg(
            origin,
            originAirport.display_name || `${origin} airport`,
            "App cab / private taxi",
            toAirport.durationMinutes,
            tripStart,
            "Recommended for 2+ large bags and door-to-door comfort.",
          ),
        );
      }
    }

    if (roadOut) {
      outbound.push(
        buildLeg(
          origin,
          destination,
          "Intercity AC bus or private cab",
          roadOut.durationMinutes,
          addMinutes(tripStart, 120),
          `Road distance ~${roadOut.distanceKm} km. Prefer luggage-friendly AC options over local trains.`,
        ),
      );
    }

    const returnBase = addMinutes(tripStart, 24 * 60 * 2);
    if (roadBack) {
      returning.push(
        buildLeg(
          destination,
          origin,
          "Intercity AC bus or private cab",
          roadBack.durationMinutes,
          returnBase,
          `Return road distance ~${roadBack.distanceKm} km. Keep buffer for traffic and bag handling.`,
        ),
      );
    }

    if (destinationAirport) {
      const fromAirport = await drivingRoute(
        destinationAirport,
        destinationGeo,
      );
      if (fromAirport) {
        returning.unshift(
          buildLeg(
            destinationAirport.display_name || `${destination} airport`,
            destination,
            "App cab / hotel transfer",
            fromAirport.durationMinutes,
            addMinutes(returnBase, -120),
            "Use airport transfer service for easier baggage movement.",
          ),
        );
      }
    }

    return NextResponse.json({
      transport_plan: {
        assumptions:
          "Generated using free OpenStreetMap APIs (Nominatim + OSRM). Timings are estimates and should be re-checked near travel date.",
        luggage_policy:
          "Traveler has 2+ large bags. Avoid local trains if a practical cab/shuttle/AC bus option is available.",
        outbound,
        return_journey: returning,
        local_city_policy: [
          {
            recommendation:
              "Prefer app cabs, metro with lifts, or prepaid taxi for hotel/airport transfers.",
          },
          {
            recommendation:
              "Start each transfer 30-45 minutes earlier during peak traffic windows.",
          },
        ],
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to build transport plan" },
      { status: 500 },
    );
  }
}
