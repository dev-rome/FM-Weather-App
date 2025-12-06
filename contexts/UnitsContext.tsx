"use client";

import { createContext, useContext, useState, useMemo } from "react";
import type {
  UnitsContextType,
  UnitsProviderProps,
} from "@/types/units-context";
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "@/components/units/types";

const UnitsContext = createContext<UnitsContextType | undefined>(undefined);

export function UnitsProvider({ children }: UnitsProviderProps) {
  const [temperatureUnit, setTemperatureUnit] =
    useState<TemperatureUnit>("celsius");
  const [windSpeedUnit, setWindSpeedUnit] = useState<WindSpeedUnit>("kmh");
  const [precipitationUnit, setPrecipitationUnit] =
    useState<PrecipitationUnit>("mm");

  const value = useMemo<UnitsContextType>(
    () => ({
      temperatureUnit,
      setTemperatureUnit,
      windSpeedUnit,
      setWindSpeedUnit,
      precipitationUnit,
      setPrecipitationUnit,
    }),
    [temperatureUnit, windSpeedUnit, precipitationUnit],
  );

  return <UnitsContext.Provider value={value}>{children}</UnitsContext.Provider>;
}

export function useUnits() {
  const context = useContext(UnitsContext);
  if (context === undefined) {
    throw new Error("useUnits must be used within a UnitsProvider");
  }
  return context;
}
