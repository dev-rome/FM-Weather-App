"use client";

import { useState } from "react";
import HourlyForecastItem from "./HourlyForecastItem";
import DaySelectorDropdown from "./DaySelectorDropdown";

type HourlyForecastData = {
  time: string;
  icon: string;
  iconAlt: string;
  temperature: string;
};

const hourlyForecast: HourlyForecastData[] = [
  {
    time: "3 PM",
    icon: "/images/icon-overcast.webp",
    iconAlt: "Cloudy",
    temperature: "20°",
  },
  {
    time: "4 PM",
    icon: "/images/icon-partly-cloudy.webp",
    iconAlt: "Partly cloudy",
    temperature: "20°",
  },
  {
    time: "5 PM",
    icon: "/images/icon-sunny.webp",
    iconAlt: "Sunny",
    temperature: "20°",
  },
  {
    time: "6 PM",
    icon: "/images/icon-overcast.webp",
    iconAlt: "Cloudy",
    temperature: "19°",
  },
  {
    time: "7 PM",
    icon: "/images/icon-snow.webp",
    iconAlt: "Snow",
    temperature: "18°",
  },
  {
    time: "8 PM",
    icon: "/images/icon-fog.webp",
    iconAlt: "Fog",
    temperature: "18°",
  },
  {
    time: "9 PM",
    icon: "/images/icon-snow.webp",
    iconAlt: "Snow",
    temperature: "17°",
  },
  {
    time: "10 PM",
    icon: "/images/icon-overcast.webp",
    iconAlt: "Cloudy",
    temperature: "17°",
  },
];

export default function HourlyForecast() {
  const [selectedDay, setSelectedDay] = useState("Tuesday");

  return (
    <article
      aria-label="Hourly forecast"
      className="rounded-[1.25rem] bg-neutral-800 px-4 py-5"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hourly forecast</h2>
        <DaySelectorDropdown
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
        />
      </div>
      <div className="flex flex-col gap-3">
        {hourlyForecast.map(({ time, icon, iconAlt, temperature }) => (
          <HourlyForecastItem
            key={time}
            time={time}
            icon={icon}
            iconAlt={iconAlt}
            temperature={temperature}
          />
        ))}
      </div>
    </article>
  );
}
