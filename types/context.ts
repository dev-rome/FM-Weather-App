import type { WeatherData } from "./weather";

export type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  isGeolocationReady: boolean;
  setGeolocationReady: (ready: boolean) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
};

export type WeatherProviderProps = {
  children: React.ReactNode;
};
