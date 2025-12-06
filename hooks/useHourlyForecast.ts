import { useState, useMemo } from "react";
import { getWeatherIcon } from "@/lib/weather-icons";
import {
  formatFullDayName,
  formatDayName,
  formatTime,
  extractDate,
} from "@/lib/date-utils";
import { formatTemperature } from "@/lib/format-utils";
import type { WeatherData } from "@/types/weather";
import type { DayInfo, FormattedHourlyData } from "@/types/hooks";
import type { TemperatureUnit } from "@/components/units/types";

export function useHourlyForecast(
  weatherData: WeatherData | null,
  temperatureUnit: TemperatureUnit = "celsius",
) {
  // Get available days from daily forecast
  const availableDays = useMemo<DayInfo[]>(() => {
    if (!weatherData) return [];
    return weatherData.daily.date.map((dateString) => ({
      date: dateString,
      dayName: formatFullDayName(dateString),
      shortDayName: formatDayName(dateString),
    }));
  }, [weatherData]);

  const [selectedDay, setSelectedDay] = useState("");

  // Derive the current selected day
  const currentSelectedDay = useMemo(() => {
    if (availableDays.length === 0) return "";
    if (selectedDay) {
      const dayExists = availableDays.find(
        (day) => day.dayName === selectedDay,
      );
      if (dayExists) return selectedDay;
    }
    return availableDays[0].dayName;
  }, [availableDays, selectedDay]);

  // Filter and format hourly data for the selected day
  const filteredHourlyData = useMemo<FormattedHourlyData[]>(() => {
    if (!weatherData || !currentSelectedDay) return [];

    const selectedDayData = availableDays.find(
      (day) => day.dayName === currentSelectedDay,
    );
    if (!selectedDayData) return [];

    const selectedDate = extractDate(selectedDayData.date);

    // Filter hourly data for the selected day
    const dayHourlyData = weatherData.hourly.time
      .map((timeString, index) => {
        if (extractDate(timeString) === selectedDate) {
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
      const weatherIcon = getWeatherIcon(item.weatherCode);

      return {
        time: formatTime(item.time),
        icon: weatherIcon.icon,
        iconAlt: weatherIcon.alt,
        temperature: formatTemperature(item.temperature, temperatureUnit),
      };
    });
  }, [currentSelectedDay, weatherData, availableDays, temperatureUnit]);

  return {
    availableDays,
    currentSelectedDay,
    filteredHourlyData,
    setSelectedDay,
  };
}
