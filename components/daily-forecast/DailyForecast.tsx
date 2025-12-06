"use client";

import DailyForecastItem from "./DailyForecastItem";
import { useWeather } from "@/contexts/WeatherContext";
import { getWeatherIcon } from "@/lib/weather-icons";
import { formatDayName } from "@/lib/date-utils";
import { formatTemperature } from "@/lib/format-utils";

export default function DailyForecast() {
  const { weatherData, temperatureUnit } = useWeather();

  if (!weatherData) {
    return null;
  }

  const { daily } = weatherData;

  // Map daily forecast data to component format
  const dailyForecast = daily.date.map((dateString, index) => {
    const weatherIcon = getWeatherIcon(daily.weatherCode[index]);

    return {
      day: formatDayName(dateString),
      icon: weatherIcon.icon,
      iconAlt: weatherIcon.alt,
      highTemp: formatTemperature(
        daily.temperatureMax[index],
        temperatureUnit,
      ),
      lowTemp: formatTemperature(
        daily.temperatureMin[index],
        temperatureUnit,
      ),
    };
  });

  return (
    <article aria-label="Daily forecast">
      <h2 className="mb-5 text-xl font-semibold">Daily forecast</h2>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-7">
        {dailyForecast.map(
          ({ day, icon, iconAlt, highTemp, lowTemp }, index) => (
            <DailyForecastItem
              key={`${day}-${index}`}
              day={day}
              icon={icon}
              iconAlt={iconAlt}
              highTemp={highTemp}
              lowTemp={lowTemp}
            />
          ),
        )}
      </div>
    </article>
  );
}
