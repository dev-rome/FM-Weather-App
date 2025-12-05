"use server";

import { getCoordinates } from "@/lib/weather";

export type CitySuggestion = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

export async function getCitySuggestions(query: string): Promise<CitySuggestion[]> {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return [];
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query.trim())}&limit=5&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      return [];
    }

    const data = await res.json();

    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      name: item.name,
      country: item.country,
      state: item.state,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error("City suggestions error:", error);
    return [];
  }
}

