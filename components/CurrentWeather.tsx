"use client";

import Image from "next/image";
import { useWeatherData } from "@/contexts/WeatherDataContext";
import { useUnits } from "@/contexts/UnitsContext";
import { getWeatherIcon } from "@/lib/weather-icons";
import { formatDate } from "@/lib/date-utils";
import { formatTemperature } from "@/lib/format-utils";

export default function CurrentWeather() {
  const { weatherData } = useWeatherData();
  const { temperatureUnit } = useUnits();

  if (!weatherData) {
    return null;
  }

  const { location, current, daily } = weatherData;

  // Get the weather icon based on the current weather code
  const weatherIcon = getWeatherIcon(current.weatherCode);

  // Use the first date from daily forecast (today in location's timezone)
  const todayDateString = daily.date[0]; // Format: "YYYY-MM-DD"
  const formattedDate = formatDate(todayDateString);

  return (
    <article
      aria-label="Current weather conditions"
      className="relative pb-5 lg:pb-8"
    >
      <picture>
        <source
          srcSet="/images/bg-today-large.svg"
          media="(min-width: 768px)"
        />
        <Image
          src="/images/bg-today-small.svg"
          alt=""
          width={343}
          height={286}
          className="h-auto w-full"
          aria-hidden="true"
          preload={true}
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 flex w-full flex-col items-center justify-center md:flex-row md:justify-between md:px-6">
        <div className="text-center md:text-left">
          <h2 className="text-[1.75rem] font-bold">
            {location.name}, {location.country}
          </h2>
          <time dateTime={todayDateString} className="text-lg font-medium">
            {formattedDate}
          </time>
        </div>
        <div className="flex items-center">
          <Image
            src={weatherIcon.icon}
            alt={weatherIcon.alt}
            width={120}
            height={120}
            className="h-auto w-auto"
            preload={true}
            fetchPriority="high"
          />
          <p
            className="text-8xl font-semibold"
            aria-label={`Temperature ${Math.round(current.temperature)} degrees`}
          >
            {formatTemperature(current.temperature, temperatureUnit)}
          </p>
        </div>
      </div>
    </article>
  );
}
