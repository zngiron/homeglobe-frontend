interface LocationSuggestion {
  placeId: string;
  label: string;
}

export const getLocationSuggestions = async (location: string): Promise<LocationSuggestion[]> => {
  if (location.length < 2) return [];

  try {
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
      }),
    });

    if (!response.ok) {
      console.error('[getLocationSuggestions] Failed to fetch locations');
      return [];
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('[getLocationSuggestions] Error searching locations:', error);
    return [];
  }
};
