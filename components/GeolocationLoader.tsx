"use client";

import { useEffect, useTransition } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getWeatherByLocation } from "@/app/actions/geolocation";
import { useWeather } from "@/contexts/WeatherContext";

export default function GeolocationLoader() {
  const { latitude, longitude, error, loading } = useGeolocation();
  const { setWeatherData, setGeolocationReady } = useWeather();
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (loading) {
      return;
    }

    // If geolocation failed or not available, mark as ready (no geolocation update)
    if (error || !latitude || !longitude) {
      setGeolocationReady(true);
      return;
    }

    startTransition(async () => {
      const result = await getWeatherByLocation(latitude, longitude);
      if (result.data) {
        setWeatherData(result.data);
      }
      // Mark geolocation as ready after update
      setGeolocationReady(true);
    });
  }, [latitude, longitude, error, loading, setWeatherData, setGeolocationReady]);

  return null; // This component doesn't render anything
}
