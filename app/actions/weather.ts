"use server";

import { getWeather } from "@/lib/weather";
import { isApiError } from "@/lib/error-utils";
import type { WeatherData } from "@/types/weather";

export async function searchWeather(cityName: string): Promise<{
  data?: WeatherData;
  error?: string;
}> {
  try {
    if (!cityName || !cityName.trim()) {
      return { error: "City name is required" };
    }

    const weatherData = await getWeather(cityName.trim());
    return { data: weatherData };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Weather search error:", error);
    }
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data";
    
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
