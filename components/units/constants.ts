import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
  UnitOption,
} from "./types";

export const TEMPERATURE_OPTIONS: UnitOption<TemperatureUnit>[] = [
  { value: "celsius", label: "Celsius (°C)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
];

export const WIND_SPEED_OPTIONS: UnitOption<WindSpeedUnit>[] = [
  { value: "kmh", label: "km/h" },
  { value: "mph", label: "mph" },
];

export const PRECIPITATION_OPTIONS: UnitOption<PrecipitationUnit>[] = [
  { value: "mm", label: "Millimeters (mm)" },
  { value: "in", label: "Inches (in)" },
];
