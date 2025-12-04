"use client";

import { useState } from "react";
import HourlyForecastItem from "./HourlyForecastItem";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

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

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-neutral-600 text-base"
              aria-label="Select day"
            >
              {selectedDay}
              <ChevronDown size={12} aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-neutral-600 bg-neutral-800">
            <DropdownMenuRadioGroup
              value={selectedDay}
              onValueChange={setSelectedDay}
            >
              {days.map((day) => (
                <DropdownMenuRadioItem
                  key={day}
                  value={day}
                  className="pl-2 data-[state=checked]:bg-neutral-700 [&>span]:hidden"
                >
                  {day}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
