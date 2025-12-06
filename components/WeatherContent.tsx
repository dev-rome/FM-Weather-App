"use client";

import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/weather-details/WeatherDetails";
import DailyForecast from "@/components/daily-forecast/DailyForecast";
import HourlyForecast from "@/components/hourly-forecast/HourlyForecast";
import { useWeatherData } from "@/contexts/WeatherDataContext";

export default function WeatherContent() {
  const { error, weatherData, isGeolocationReady, isSearching } =
    useWeatherData();

  // Don't render weather content when there's an error
  if (error) {
    return null;
  }

  // Show message when geolocation failed and no weather data is available
  if (isGeolocationReady && !weatherData && !isSearching) {
    return (
      <div className="col-span-4 flex min-h-[400px] items-center justify-center md:col-span-8 lg:col-span-12">
        <p className="text-center text-lg">Please search for a location</p>
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
