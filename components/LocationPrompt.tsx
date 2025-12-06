"use client";

import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useWeatherData } from "@/contexts/WeatherDataContext";

export default function LocationPrompt() {
  const {
    requestGeolocation,
    geolocationLoading,
    geolocationError,
    isGeolocationReady,
    weatherData,
  } = useWeatherData();

  // Don't show if geolocation is already ready or weather data exists
  if (isGeolocationReady || weatherData) {
    return null;
  }

  const handleClick = () => {
    requestGeolocation();
  };

  return (
    <div className="col-span-4 flex min-h-[400px] justify-center md:col-span-8 lg:col-span-12">
      <div className="text-center">
        <p className="mb-4 text-lg">Get weather for your location</p>
        <Button
          onClick={handleClick}
          disabled={geolocationLoading}
          className="bg-blue-500 px-6 py-3 text-base font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          <MapPin size={18} className="mr-2" aria-hidden="true" />
          {geolocationLoading ? "Getting location..." : "Use my location"}
        </Button>
        {geolocationError && (
          <p className="mt-4 text-sm text-red-400">
            {geolocationError.includes("denied") ||
            geolocationError.includes("permission")
              ? "Location permission denied. Please search for a location."
              : geolocationError}
          </p>
        )}
        <p className="mt-4 text-sm text-neutral-300">
          Or search for a location above
        </p>
      </div>
    </div>
  );
}
