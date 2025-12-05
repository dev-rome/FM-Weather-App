"use server";

import { getWeather } from "@/lib/weather";
import type { WeatherData } from "@/lib/weather";

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
    console.error("Weather search error:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to fetch weather data",
    };
  }
}

