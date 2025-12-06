"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { Settings, ChevronDown } from "lucide-react";
import { useWeather } from "@/contexts/WeatherContext";
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "./types";
import {
  TEMPERATURE_OPTIONS,
  WIND_SPEED_OPTIONS,
  PRECIPITATION_OPTIONS,
} from "./constants";
import UnitRadioItem from "./UnitRadioItem";

export default function UnitsDropdownMenu() {
  const {
    temperatureUnit,
    setTemperatureUnit,
    windSpeedUnit,
    setWindSpeedUnit,
    precipitationUnit,
    setPrecipitationUnit,
  } = useWeather();

  const isMetric =
    temperatureUnit === "celsius" &&
    windSpeedUnit === "kmh" &&
    precipitationUnit === "mm";

  const switchToImperial = () => {
    setTemperatureUnit("fahrenheit");
    setWindSpeedUnit("mph");
    setPrecipitationUnit("in");
  };

  const switchToMetric = () => {
    setTemperatureUnit("celsius");
    setWindSpeedUnit("kmh");
    setPrecipitationUnit("mm");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-neutral-800 px-3 py-4 text-sm md:text-base"
          aria-label="Units settings"
        >
          <Settings size={14} aria-hidden="true" />
          Units
          <ChevronDown size={9} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 border-neutral-600 bg-neutral-800"
        align="end"
      >
        <Button
          onClick={isMetric ? switchToImperial : switchToMetric}
          className="w-full cursor-pointer justify-start pl-2 text-base font-medium hover:bg-neutral-700"
        >
          {isMetric ? "Switch to Imperial" : "Switch to Metric"}
        </Button>

        <DropdownMenuSeparator className="bg-neutral-600" />

        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
          Temperature
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={temperatureUnit}
          onValueChange={(value) =>
            setTemperatureUnit(value as TemperatureUnit)
          }
        >
          {TEMPERATURE_OPTIONS.map(({ value, label }) => (
            <UnitRadioItem
              key={value}
              value={value}
              label={label}
              selectedValue={temperatureUnit}
            />
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-neutral-600" />

        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
          Wind Speed
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={windSpeedUnit}
          onValueChange={(value) => setWindSpeedUnit(value as WindSpeedUnit)}
        >
          {WIND_SPEED_OPTIONS.map(({ value, label }) => (
            <UnitRadioItem
              key={value}
              value={value}
              label={label}
              selectedValue={windSpeedUnit}
            />
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-neutral-600" />

        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
          Precipitation
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={precipitationUnit}
          onValueChange={(value) =>
            setPrecipitationUnit(value as PrecipitationUnit)
          }
        >
          {PRECIPITATION_OPTIONS.map(({ value, label }) => (
            <UnitRadioItem
              key={value}
              value={value}
              label={label}
              selectedValue={precipitationUnit}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
