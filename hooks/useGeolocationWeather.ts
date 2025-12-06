"use client";

import { useEffect, useTransition } from "react";
import { getWeatherByLocation } from "@/app/actions/geolocation";
import { useWeatherData } from "@/contexts/WeatherDataContext";

/**
 * Custom hook to handle fetching weather data when geolocation is successful
 */
export function useGeolocationWeather() {
  const {
    geolocationLatitude,
    geolocationLongitude,
    geolocationError,
    geolocationLoading,
    geolocationHasAttempted,
    setWeatherData,
    setGeolocationReady,
    setError,
  } = useWeatherData();
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Only process if user has attempted geolocation
    if (!geolocationHasAttempted) {
      return;
    }

    // Wait for loading to complete
    if (geolocationLoading) {
      return;
    }

    // If geolocation failed or not available, mark as ready
    if (geolocationError || !geolocationLatitude || !geolocationLongitude) {
      setGeolocationReady(true);
      return;
    }

    // We have valid coordinates, fetch weather data
    let cancelled = false;

    startTransition(async () => {
      const result = await getWeatherByLocation(
        geolocationLatitude,
        geolocationLongitude,
      );

      // Check if component was unmounted
      if (cancelled) {
        return;
      }

      if (result.data) {
        setWeatherData(result.data);
        setError(null);
      } else if (result.error) {
        setError(result.error);
      }
      setGeolocationReady(true);
    });

    // Cleanup function to prevent memory leaks
    return () => {
      cancelled = true;
    };
  }, [
    geolocationLatitude,
    geolocationLongitude,
    geolocationError,
    geolocationLoading,
    geolocationHasAttempted,
    setWeatherData,
    setGeolocationReady,
    setError,
  ]);
}

