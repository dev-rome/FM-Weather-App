import type { Coordinates } from "@/types/weather";
import type { OpenWeatherGeocodingItem } from "@/types/api";
import { validateApiKey, createFallbackCoordinates } from "./api-helpers";

/**
 * Reverse geocoding: Get city name from coordinates
 */
export async function getCityFromCoordinates(
  lat: number,
  lon: number,
): Promise<Coordinates> {
  try {
    const apiKey = validateApiKey();
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location: ${res.status} ${res.statusText}`,
      );
    }

    const data: OpenWeatherGeocodingItem[] = await res.json();

    if (!data || data.length === 0) {
      return createFallbackCoordinates(lat, lon);
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    return createFallbackCoordinates(lat, lon);
  }
}
