"use client";

import { useEffect, useTransition } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getWeatherByLocation } from "@/app/actions/geolocation";
import { useWeather } from "@/contexts/WeatherContext";

export default function GeolocationLoader() {
  const { latitude, longitude, error, loading } = useGeolocation();
  const { setWeatherData } = useWeather();
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (loading || error || !latitude || !longitude) {
      return;
    }

    startTransition(async () => {
      const result = await getWeatherByLocation(latitude, longitude);
      if (result.data) {
        setWeatherData(result.data);
      }
    });
  }, [latitude, longitude, error, loading, setWeatherData]);

  return null; // This component doesn't render anything
}
