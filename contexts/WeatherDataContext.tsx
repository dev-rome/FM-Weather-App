"use client";

import { createContext, useContext, useState, useMemo } from "react";
import type {
  WeatherDataContextType,
  WeatherDataProviderProps,
} from "@/types/weather-context";
import type { WeatherData } from "@/types/weather";
import { useGeolocationState } from "@/hooks/useGeolocationState";

const WeatherDataContext = createContext<WeatherDataContextType | undefined>(
  undefined,
);

export function WeatherDataProvider({ children }: WeatherDataProviderProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isGeolocationReady, setGeolocationReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const geolocation = useGeolocationState();

  const value = useMemo<WeatherDataContextType>(
    () => ({
      weatherData,
      setWeatherData,
      isGeolocationReady,
      setGeolocationReady,
      isSearching,
      setIsSearching,
      error,
      setError,
      geolocationLatitude: geolocation.latitude,
      geolocationLongitude: geolocation.longitude,
      geolocationError: geolocation.error,
      geolocationLoading: geolocation.loading,
      geolocationHasAttempted: geolocation.hasAttempted,
      requestGeolocation: geolocation.requestGeolocation,
    }),
    [
      weatherData,
      isGeolocationReady,
      isSearching,
      error,
      geolocation,
    ],
  );

  return (
    <WeatherDataContext.Provider value={value}>
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
