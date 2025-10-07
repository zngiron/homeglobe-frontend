import { NextResponse } from 'next/server';

import { PlacesClient } from '@googlemaps/places';

const client = new PlacesClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { location } = body;

  const [response] = await client.autocompletePlaces({
    input: location,
    includedPrimaryTypes: [
      '(cities)',
    ],
  });

  const suggestions = (response.suggestions ?? [])
    .filter((item) => item.placePrediction)
    .map((item) => {
      const p = item.placePrediction;
      if (!p) return null;

      const city = p.structuredFormat?.mainText?.text ?? p.text?.text ?? '';
      const country = p.structuredFormat?.secondaryText?.text ?? '';
      const label = country ? `${city}, ${country}` : city;

      return {
        placeId: p.placeId,
        label,
      };
    })
    .filter((suggestion) => suggestion !== null);

  return NextResponse.json(suggestions);
}
