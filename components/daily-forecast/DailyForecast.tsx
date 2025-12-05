"use client";

import DailyForecastItem from "./DailyForecastItem";
import { useWeather } from "@/contexts/WeatherContext";
import { getWeatherIcon } from "@/lib/weather-icons";

export default function DailyForecast() {
  const { weatherData } = useWeather();

  if (!weatherData) {
    return null;
  }

  const { daily } = weatherData;

  // Map daily forecast data to component format
  const dailyForecast = daily.date.map((dateString, index) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const weatherIcon = getWeatherIcon(daily.weatherCode[index]);

    return {
      day: dayName,
      icon: weatherIcon.icon,
      iconAlt: weatherIcon.alt,
      highTemp: `${Math.round(daily.temperatureMax[index])}°`,
      lowTemp: `${Math.round(daily.temperatureMin[index])}°`,
    };
  });

  return (
    <article aria-label="Daily forecast">
      <h2 className="mb-5 text-xl font-semibold text-neutral-0">
        Daily forecast
      </h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-7">
        {dailyForecast.map(({ day, icon, iconAlt, highTemp, lowTemp }, index) => (
          <DailyForecastItem
            key={`${day}-${index}`}
            day={day}
            icon={icon}
            iconAlt={iconAlt}
            highTemp={highTemp}
            lowTemp={lowTemp}
          />
        ))}
      </div>
    </article>
  );
}
