"use server";

import { getWeatherByCoordinates } from "@/lib/weather";
import { isApiError } from "@/lib/error-utils";
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
    if (process.env.NODE_ENV === "development") {
      console.error("Geolocation weather error:", error);
    }
    const errorMessage = error instanceof Error
      ? error.message
      : "Failed to fetch weather for your location";
    
    // Check if it's an API/server error
    if (isApiError(errorMessage)) {
      return {
        error: "API error: Unable to connect to weather service. Please try again later.",
      };
    }
    
    return {
      error: errorMessage,
    };
  }
}

