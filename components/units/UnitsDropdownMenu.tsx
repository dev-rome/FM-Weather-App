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
import { useUnits } from "@/contexts/UnitsContext";
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
import UnitSection from "./UnitSection";

export default function UnitsDropdownMenu() {
  const {
    temperatureUnit,
    setTemperatureUnit,
    windSpeedUnit,
    setWindSpeedUnit,
    precipitationUnit,
    setPrecipitationUnit,
  } = useUnits();

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

        <UnitSection
          label="Temperature"
          options={TEMPERATURE_OPTIONS}
          value={temperatureUnit}
          onValueChange={setTemperatureUnit}
        />
        <UnitSection
          label="Wind Speed"
          options={WIND_SPEED_OPTIONS}
          value={windSpeedUnit}
          onValueChange={setWindSpeedUnit}
        />
        <UnitSection
          label="Precipitation"
          options={PRECIPITATION_OPTIONS}
          value={precipitationUnit}
          onValueChange={setPrecipitationUnit}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
