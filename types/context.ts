import type { WeatherData } from "./weather";
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "@/components/units/types";

export type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  isGeolocationReady: boolean;
  setGeolocationReady: (ready: boolean) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  temperatureUnit: TemperatureUnit;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  windSpeedUnit: WindSpeedUnit;
  setWindSpeedUnit: (unit: WindSpeedUnit) => void;
  precipitationUnit: PrecipitationUnit;
  setPrecipitationUnit: (unit: PrecipitationUnit) => void;
};

export type WeatherProviderProps = {
  children: React.ReactNode;
};
