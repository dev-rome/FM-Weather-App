import { cache } from "react";
import { getWeather } from "./weather";
import type { WeatherData } from "@/types/weather";

/**
 * Cached weather data fetching function
 * Uses React's cache to deduplicate requests
 */
export const getInitialWeather = cache(
  async (): Promise<WeatherData> => {
    return await getWeather("London");
  },
);

