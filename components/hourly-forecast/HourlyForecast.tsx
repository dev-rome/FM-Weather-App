"use client";

import { useState, useMemo } from "react";
import HourlyForecastItem from "./HourlyForecastItem";
import DaySelectorDropdown from "./DaySelectorDropdown";
import { useWeather } from "@/contexts/WeatherContext";
import { getWeatherIcon } from "@/lib/weather-icons";

export default function HourlyForecast() {
  const { weatherData } = useWeather();

  // Get available days from daily forecast (today + next 6 days)
  const availableDays = useMemo(() => {
    if (!weatherData) return [];
    return weatherData.daily.date.map((dateString) => {
      const date = new Date(dateString);
      return {
        date: dateString,
        dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
        shortDayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      };
    });
  }, [weatherData]);

  // Set selected day state - user can change it via dropdown
  const [selectedDay, setSelectedDay] = useState("");

  // Derive the current selected day - use selectedDay if valid, otherwise use first available day
  const currentSelectedDay = useMemo(() => {
    if (availableDays.length === 0) return "";
    if (selectedDay) {
      const dayExists = availableDays.find((day) => day.dayName === selectedDay);
      if (dayExists) return selectedDay;
    }
    return availableDays[0].dayName;
  }, [availableDays, selectedDay]);

  // Filter hourly data for the selected day
  const filteredHourlyData = useMemo(() => {
    if (!weatherData || !currentSelectedDay) return [];

    const selectedDayData = availableDays.find(
      (day) => day.dayName === currentSelectedDay,
    );
    if (!selectedDayData) return [];

    const selectedDate = selectedDayData.date.split("T")[0]; // Get YYYY-MM-DD format

    // Filter hourly data for the selected day
    const dayHourlyData = weatherData.hourly.time
      .map((timeString, index) => {
        const time = new Date(timeString);
        const timeDate = time.toISOString().split("T")[0];

        // Only include hours for the selected day
        if (timeDate === selectedDate) {
          return {
            time: timeString,
            temperature: weatherData.hourly.temperature[index],
            weatherCode: weatherData.hourly.weatherCode[index],
          };
        }
        return null;
      })
      .filter((item) => item !== null) as Array<{
      time: string;
      temperature: number;
      weatherCode: number;
    }>;

    // Format the data for display
    return dayHourlyData.map((item) => {
      const time = new Date(item.time);
      const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
      });

      const weatherIcon = getWeatherIcon(item.weatherCode);

      return {
        time: formattedTime,
        icon: weatherIcon.icon,
        iconAlt: weatherIcon.alt,
        temperature: `${Math.round(item.temperature)}°`,
      };
    });
  }, [currentSelectedDay, weatherData, availableDays]);

  if (!weatherData) {
    return null;
  }

  return (
    <article
      aria-label="Hourly forecast"
      className="rounded-[1.25rem] bg-neutral-800 px-4 py-5"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Hourly forecast
        </h2>
        <DaySelectorDropdown
          selectedDay={currentSelectedDay}
          onDayChange={setSelectedDay}
          availableDays={availableDays.map((day) => day.dayName)}
        />
      </div>
      <div className="max-h-[645px] overflow-y-auto">
        <div className="flex flex-col gap-3 pr-2">
          {filteredHourlyData.length > 0 ? (
            filteredHourlyData.map(({ time, icon, iconAlt, temperature }, index) => (
              <HourlyForecastItem
                key={`${time}-${index}`}
                time={time}
                icon={icon}
                iconAlt={iconAlt}
                temperature={temperature}
              />
            ))
          ) : (
            <p>No hourly forecast available for this day.</p>
          )}
        </div>
      </div>
    </article>
  );
}
