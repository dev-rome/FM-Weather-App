import type { Coordinates } from "@/types/weather";

/**
 * Creates a fallback Coordinates object from lat/lon when geocoding fails
 */
export function createFallbackCoordinates(
  lat: number,
  lon: number,
): Coordinates {
  return {
    lat,
    lon,
    name: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
    country: "",
  };
}

/**
 * Validates that API key exists
 */
export function validateApiKey(): string {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not set in environment variables");
  }
  return apiKey;
}
