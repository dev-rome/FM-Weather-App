"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { WeatherData } from "@/lib/weather";

type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

type WeatherProviderProps = {
  children: ReactNode;
  initialData: WeatherData;
};

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
