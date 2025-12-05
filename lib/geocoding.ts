import type { Coordinates } from "@/types/weather";
import type { OpenWeatherGeocodingItem } from "@/types/api";
import { validateApiKey } from "./api-helpers";

export async function getCoordinates(cityName: string): Promise<Coordinates> {
  try {
    const apiKey = validateApiKey();
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch coordinates: ${res.status} ${res.statusText}`,
      );
    }

    const data: OpenWeatherGeocodingItem[] = await res.json();

    if (!data || data.length === 0) {
      throw new Error(`Location "${cityName}" not found`);
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    console.error("Geocoding Error:", error);
    throw error;
  }
}
