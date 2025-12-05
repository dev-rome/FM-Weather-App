"use client";

import HourlyForecastItem from "./HourlyForecastItem";
import DaySelectorDropdown from "./DaySelectorDropdown";
import { useWeather } from "@/contexts/WeatherContext";
import { useHourlyForecast } from "@/hooks/useHourlyForecast";

export default function HourlyForecast() {
  const { weatherData } = useWeather();
  const {
    availableDays,
    currentSelectedDay,
    filteredHourlyData,
    setSelectedDay,
  } = useHourlyForecast(weatherData);

  if (!weatherData) {
    return null;
  }

  return (
    <article
      aria-label="Hourly forecast"
      className="rounded-[1.25rem] bg-neutral-800 px-4 py-5"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hourly forecast</h2>
        <DaySelectorDropdown
          selectedDay={currentSelectedDay}
          onDayChange={setSelectedDay}
          availableDays={availableDays.map((day) => day.dayName)}
        />
      </div>
      <div className="max-h-[645px] overflow-y-auto">
        <div className="flex flex-col gap-3 pr-2">
          {filteredHourlyData.length > 0 ? (
            filteredHourlyData.map(
              ({ time, icon, iconAlt, temperature }, index) => (
                <HourlyForecastItem
                  key={`${time}-${index}`}
                  time={time}
                  icon={icon}
                  iconAlt={iconAlt}
                  temperature={temperature}
                />
              ),
            )
          ) : (
            <p>No hourly forecast available for this day.</p>
          )}
        </div>
      </div>
    </article>
  );
}
