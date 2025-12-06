"use client";

import { createContext, useContext, useState } from "react";
import type {
  WeatherDataContextType,
  WeatherDataProviderProps,
} from "@/types/weather-context";
import type { WeatherData } from "@/types/weather";

const WeatherDataContext = createContext<WeatherDataContextType | undefined>(
  undefined,
);

export function WeatherDataProvider({ children }: WeatherDataProviderProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Track if geolocation has finished loading
  const [isGeolocationReady, setGeolocationReady] = useState(false);

  // Track if search is in progress
  const [isSearching, setIsSearching] = useState(false);

  // Track API errors
  const [error, setError] = useState<string | null>(null);

  return (
    <WeatherDataContext.Provider
      value={{
        weatherData,
        setWeatherData,
        isGeolocationReady,
        setGeolocationReady,
        isSearching,
        setIsSearching,
        error,
        setError,
      }}
    >
      {children}
    </WeatherDataContext.Provider>
  );
}

export function useWeatherData() {
  const context = useContext(WeatherDataContext);
  if (context === undefined) {
    throw new Error("useWeatherData must be used within a WeatherDataProvider");
  }
  return context;
}
