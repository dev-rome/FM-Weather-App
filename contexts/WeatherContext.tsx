"use client";

import { createContext, useContext, useState } from "react";
import type { WeatherContextType, WeatherProviderProps } from "@/types/context";
import type { WeatherData } from "@/types/weather";
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "@/components/units/types";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: WeatherProviderProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  // Track if geolocation has finished loading
  const [isGeolocationReady, setGeolocationReady] = useState(false);

  // Track if search is in progress
  const [isSearching, setIsSearching] = useState(false);

  // Track API errors
  const [error, setError] = useState<string | null>(null);

  // Unit preferences
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>("kmh");
  const [precipitationUnit, setPrecipitationUnit] =
    useState<PrecipitationUnit>("mm");

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        isGeolocationReady,
        setGeolocationReady,
        isSearching,
        setIsSearching,
        error,
        setError,
        temperatureUnit,
        setTemperatureUnit,
        windSpeedUnit,
        setWindSpeedUnit,
        precipitationUnit,
        setPrecipitationUnit,
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
