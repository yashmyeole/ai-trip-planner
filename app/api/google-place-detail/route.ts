// app/api/google-place-detail/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic'; // avoid caching when testing

type Body = { placeName?: string; placeId?: string };

export async function POST(req: Request) {
  try {
    const { placeName, placeId }: Body = await req.json().catch(() => ({} as Body));

    if (!placeName && !placeId) {
      return NextResponse.json(
        { error: 'placeName or placeId is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      // This is a VERY common cause of 502s
      return NextResponse.json(
        { error: 'Missing GOOGLE_PLACES_API_KEY env var' },
        { status: 500 }
      );
    }

    // If only a name is provided, resolve to a place ID via Text Search
    let id = placeId;
    if (!id) {
      const searchResp = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'places.id',
        },
        body: JSON.stringify({ textQuery: placeName }),
        cache: 'no-store',
      });

      const searchJson = await searchResp.json().catch(() => ({}));
      if (!searchResp.ok) {
        return NextResponse.json(
          { error: 'Upstream text search failed', upstream: searchJson },
          { status: searchResp.status }
        );
      }

      id = searchJson?.places?.[0]?.id;
      if (!id) {
        return NextResponse.json(
          { error: `No place found for "${placeName}"` },
          { status: 404 }
        );
      }
    }

    // Fetch details
    const detailsResp = await fetch(`https://places.googleapis.com/v1/places/${id}`, {
      method: 'GET',
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          [
            'id',
            'displayName',
            'location',      
            'photos'
          ].join(','),
      },
      cache: 'no-store',
    });
    

    const detailsJson = await detailsResp.json().catch(() => ({}));

    // Extract a single photo URL if available. The Places API can return different
    // shapes for photo metadata; try common fields and fall back to null.
    const returnedId = detailsJson?.id ?? id;
    let photoUrl: string | null = null;
    const firstPhoto = detailsJson?.photos && detailsJson.photos.length > 0 ? detailsJson.photos[0] : null;
    if (firstPhoto) {
      // common locations for a usable URI
      photoUrl = firstPhoto.photoUri ?? firstPhoto.photo_url ?? firstPhoto?.authorAttributions?.[0]?.photoUri ?? null;
    }

    // Return minimal object (id + one photo URL) for the client card to render
    const minimal = { id: returnedId, photoUrl };
    return NextResponse.json(minimal, { status: detailsResp.status });
  } catch (err: any) {
    // Make sure crashes don't become 502s
    console.error('google-place-detail error', err);
    return NextResponse.json(
      { error: 'Internal error', details: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}
