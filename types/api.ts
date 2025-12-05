/**
 * OpenWeatherMap Geocoding API response item
 */
export type OpenWeatherGeocodingItem = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};

/**
 * Open-Meteo API current weather response
 */
export type OpenMeteoCurrentResponse = {
  temperature_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  relative_humidity_2m: number;
  precipitation: number;
  apparent_temperature: number;
};

/**
 * Open-Meteo API hourly response
 */
export type OpenMeteoHourlyResponse = {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
};

/**
 * Open-Meteo API daily response
 */
export type OpenMeteoDailyResponse = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

/**
 * Open-Meteo API full response
 */
export type OpenMeteoResponse = {
  current: OpenMeteoCurrentResponse;
  hourly: OpenMeteoHourlyResponse;
  daily: OpenMeteoDailyResponse;
};
