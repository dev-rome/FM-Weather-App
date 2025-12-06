import type { WeatherData } from "./weather";

export type WeatherDataContextType = {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  isGeolocationReady: boolean;
  setGeolocationReady: (ready: boolean) => void;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  // Geolocation state
  geolocationLatitude: number | null;
  geolocationLongitude: number | null;
  geolocationError: string | null;
  geolocationLoading: boolean;
  geolocationHasAttempted: boolean;
  requestGeolocation: () => void;
};

export type WeatherDataProviderProps = {
  children: React.ReactNode;
};
