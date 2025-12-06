"use client";

import { useWeather } from "@/contexts/WeatherContext";

export default function WeatherBlurOverlay() {
  const { isGeolocationReady, isSearching } = useWeather();

  // Show overlay if geolocation is not ready OR if searching
  if (isGeolocationReady && !isSearching) {
    return null;
  }

  const message = isSearching
    ? "Loading weather data..."
    : "Loading your location...";

  return (
    <div className="pointer-events-none absolute inset-0 z-10 rounded-lg bg-neutral-900/80 backdrop-blur-sm">
      <div className="sticky top-4 flex justify-center pt-8">
        <div className="text-center">
          <p className="text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
}
