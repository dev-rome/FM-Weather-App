"use client";

import { useState } from "react";
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
  const [temperature, setTemperature] = useState<TemperatureUnit>("celsius");
  const [windSpeed, setWindSpeed] = useState<WindSpeedUnit>("kmh");
  const [precipitation, setPrecipitation] = useState<PrecipitationUnit>("mm");

  const isMetric =
    temperature === "celsius" && windSpeed === "kmh" && precipitation === "mm";

  const switchToImperial = () => {
    setTemperature("fahrenheit");
    setWindSpeed("mph");
    setPrecipitation("in");
  };

  const switchToMetric = () => {
    setTemperature("celsius");
    setWindSpeed("kmh");
    setPrecipitation("mm");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-(--neutral-800) px-3 py-4 text-sm md:text-base"
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
          className="w-full cursor-pointer justify-start text-base font-medium hover:bg-neutral-700"
        >
          {isMetric ? "Switch to Imperial" : "Switch to Metric"}
        </Button>

        <DropdownMenuSeparator className="bg-neutral-600" />

        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
          Temperature
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={temperature}
          onValueChange={(value) => setTemperature(value as TemperatureUnit)}
        >
          {TEMPERATURE_OPTIONS.map(({ value, label }) => (
            <UnitRadioItem
              key={value}
              value={value}
              label={label}
              selectedValue={temperature}
            />
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-neutral-600" />

        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
          Wind Speed
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={windSpeed}
          onValueChange={(value) => setWindSpeed(value as WindSpeedUnit)}
        >
          {WIND_SPEED_OPTIONS.map(({ value, label }) => (
            <UnitRadioItem
              key={value}
              value={value}
              label={label}
              selectedValue={windSpeed}
            />
          ))}
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator className="bg-neutral-600" />

        <DropdownMenuLabel className="px-2 py-1.5 text-sm text-neutral-300">
          Precipitation
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={precipitation}
          onValueChange={(value) =>
            setPrecipitation(value as PrecipitationUnit)
          }
        >
          {PRECIPITATION_OPTIONS.map(({ value, label }) => (
            <UnitRadioItem
              key={value}
              value={value}
              label={label}
              selectedValue={precipitation}
            />
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
