"use client";

import CurrentWeather from "@/components/CurrentWeather";
import WeatherDetails from "@/components/weather-details/WeatherDetails";
import DailyForecast from "@/components/daily-forecast/DailyForecast";
import HourlyForecast from "@/components/hourly-forecast/HourlyForecast";
import LocationPrompt from "@/components/LocationPrompt";
import { useWeatherData } from "@/contexts/WeatherDataContext";

export default function WeatherContent() {
  const { error, weatherData, isSearching } = useWeatherData();

  // Don't render weather content when there's an error
  if (error) {
    return null;
  }

  // Show location prompt if no weather data and not searching
  if (!weatherData && !isSearching) {
    return <LocationPrompt />;
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
