"use server";

import { getWeatherByCoordinates } from "@/lib/weather";
import type { WeatherData } from "@/types/weather";

export async function getWeatherByLocation(
  latitude: number,
  longitude: number,
): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      return { error: "Invalid coordinates" };
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return { error: "Coordinates out of valid range" };
    }

    const weatherData = await getWeatherByCoordinates(latitude, longitude);
    return { data: weatherData };
  } catch (error) {
    console.error("Geolocation weather error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch weather for your location",
    };
  }
}

