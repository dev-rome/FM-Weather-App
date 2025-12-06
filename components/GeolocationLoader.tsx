"use client";

import { useEffect, useTransition } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getWeatherByLocation } from "@/app/actions/geolocation";
import { useWeatherData } from "@/contexts/WeatherDataContext";

export default function GeolocationLoader() {
  const { latitude, longitude, error, loading } = useGeolocation();
  const { setWeatherData, setGeolocationReady, setError } = useWeatherData();
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
        setError(null); // Clear any previous errors
      } else if (result.error) {
        setError(result.error);
      }
      // Mark geolocation as ready after update
      setGeolocationReady(true);
    });
  }, [
    latitude,
    longitude,
    error,
    loading,
    setWeatherData,
    setGeolocationReady,
    setError,
  ]);

  return null; // This component doesn't render anything
}
