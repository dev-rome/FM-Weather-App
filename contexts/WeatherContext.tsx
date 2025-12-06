"use client";

import { createContext, useContext, useState, use } from "react";
import type { WeatherContextType, WeatherProviderProps } from "@/types/context";
import type { WeatherData } from "@/types/weather";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({
  children,
  initialWeatherPromise,
}: WeatherProviderProps) {
  // Use React's `use` hook to read the promise (handles streaming via Suspense)
  const initialData = use(initialWeatherPromise);

  // useState is needed to allow updates from search/geolocation
  // The `use` hook only reads the promise once - it doesn't provide a way to update
  const [weatherData, setWeatherData] = useState<WeatherData | null>(
    initialData,
  );

  // Track if geolocation has finished loading
  const [isGeolocationReady, setGeolocationReady] = useState(false);

  // Track if search is in progress
  const [isSearching, setIsSearching] = useState(false);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        isGeolocationReady,
        setGeolocationReady,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}
