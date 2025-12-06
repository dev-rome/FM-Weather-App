"use client";

import { useGeolocationWeather } from "@/hooks/useGeolocationWeather";

/**
 * Component that loads weather data when geolocation is successful
 * This component doesn't render anything - it only handles side effects
 */
export default function GeolocationLoader() {
  useGeolocationWeather();
  return null;
}
