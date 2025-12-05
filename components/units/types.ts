export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";

export type UnitOption<T> = {
  value: T;
  label: string;
};
