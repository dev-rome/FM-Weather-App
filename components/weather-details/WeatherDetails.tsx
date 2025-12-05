"use client";

import WeatherDetailsItem from "./WeatherDetailsItem";
import { useWeather } from "@/contexts/WeatherContext";
import { formatTemperature, formatWindSpeed } from "@/lib/format-utils";
import type { WeatherMetric } from "@/types/components";

export default function WeatherDetails() {
  const { weatherData } = useWeather();

  if (!weatherData) {
    return null;
  }

  const { current } = weatherData;

  const weatherMetrics: WeatherMetric[] = [
    { label: "Feels Like", value: formatTemperature(current.feelsLike) },
    { label: "Humidity", value: `${current.humidity}%` },
    { label: "Wind", value: formatWindSpeed(current.windSpeed) },
    { label: "Precipitation", value: `${current.precipitation} mm` },
  ];

  return (
    <article aria-label="Weather details" className="pb-8 lg:pb-12">
      <h2 className="sr-only">Current weather details</h2>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {weatherMetrics.map(({ label, value }) => (
          <WeatherDetailsItem key={label} label={label} value={value} />
        ))}
      </div>
    </article>
  );
}
