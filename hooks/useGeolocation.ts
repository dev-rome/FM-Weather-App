import { useState, useEffect } from "react";
import type { GeolocationState } from "@/types/hooks";

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(() => {
    // Initialize state - check if geolocation is supported
    const isSupported =
      typeof navigator !== "undefined" && "geolocation" in navigator;
    return {
      latitude: null,
      longitude: null,
      error: isSupported
        ? null
        : "Geolocation is not supported by your browser",
      loading: isSupported,
    };
  });

  useEffect(() => {
    // Skip if geolocation is not supported (already set in initial state)
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
        });
      },
      (error) => {
        setState({
          latitude: null,
          longitude: null,
          error: error.message,
          loading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  return state;
}
