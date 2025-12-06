import type { WeatherData } from "./weather";

export type WeatherContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
};

export type WeatherProviderProps = {
  children: React.ReactNode;
  initialWeatherPromise: Promise<WeatherData>;
};

