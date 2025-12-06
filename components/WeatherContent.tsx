"use client";

import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/weather-details/WeatherDetails";
import DailyForecast from "@/components/daily-forecast/DailyForecast";
import HourlyForecast from "@/components/hourly-forecast/HourlyForecast";
import { useWeather } from "@/contexts/WeatherContext";

export default function WeatherContent() {
  const { error, weatherData, isGeolocationReady, isSearching } = useWeather();

  // Don't render weather content when there's an error
  if (error) {
    return null;
  }

  // Show message when geolocation failed and no weather data is available
  if (isGeolocationReady && !weatherData && !isSearching) {
    return (
      <div className="col-span-4 md:col-span-8 lg:col-span-12 flex items-center justify-center min-h-[400px]">
        <p className="text-center text-lg">
          Please search for a location
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="lg:col-span-8">
        <CurrentWeather />
        <WeatherDetails />
        <DailyForecast />
      </div>
      <div className="lg:col-span-4">
        <HourlyForecast />
      </div>
    </>
  );
}

