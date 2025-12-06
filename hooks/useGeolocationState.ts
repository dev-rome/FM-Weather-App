"use client";

import { useState, useCallback } from "react";

// Geolocation configuration constants
const GEOLOCATION_CONFIG = {
  enableHighAccuracy: true,
  timeout: 10000, // 10 seconds
  maximumAge: 300000, // 5 minutes
} as const;

export type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  loading: boolean;
  hasAttempted: boolean;
};

const initialState: GeolocationState = {
  latitude: null,
  longitude: null,
  error: null,
  loading: false,
  hasAttempted: false,
};

export function useGeolocationState() {
  const [state, setState] = useState<GeolocationState>(initialState);

  const requestGeolocation = useCallback(() => {
    setState((prev) => ({ ...prev, hasAttempted: true }));

    // Check if geolocation is supported (client-side only)
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        ...initialState,
        hasAttempted: true,
        error: "Geolocation is not supported by your browser",
      });
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          loading: false,
          hasAttempted: true,
        });
      },
      (error) => {
        setState({
          ...initialState,
          hasAttempted: true,
          error: error.message,
        });
      },
      GEOLOCATION_CONFIG,
    );
  }, []);

  return { ...state, requestGeolocation };
}
