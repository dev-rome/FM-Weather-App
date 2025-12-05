"use client";

import { createContext, useContext, useState } from "react";
import type { WeatherContextType, WeatherProviderProps } from "@/types/context";
import type { WeatherData } from "@/types/weather";

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({
  children,
  initialData,
}: WeatherProviderProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(
    initialData,
  );

  return (
    <WeatherContext.Provider value={{ weatherData, setWeatherData }}>
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
