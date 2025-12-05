export type Coordinates = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};

export type CurrentWeather = {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  feelsLike: number;
};

export type HourlyForecast = {
  time: string[];
  temperature: number[];
  weatherCode: number[];
};

export type DailyForecast = {
  date: string[];
  weatherCode: number[];
  temperatureMax: number[];
  temperatureMin: number[];
};

export type WeatherData = {
  location: Coordinates;
  current: CurrentWeather;
  hourly: HourlyForecast;
  daily: DailyForecast;
};
