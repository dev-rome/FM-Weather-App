import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "@/components/units/types";

export type UnitsContextType = {
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  windSpeedUnit: WindSpeedUnit;
  setWindSpeedUnit: (unit: WindSpeedUnit) => void;
  precipitationUnit: PrecipitationUnit;
  setPrecipitationUnit: (unit: PrecipitationUnit) => void;
};

export type UnitsProviderProps = {
  children: React.ReactNode;
};
