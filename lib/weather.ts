import type {
  WeatherData,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
} from "@/types/weather";
import type { OpenMeteoResponse } from "@/types/api";
import { getCoordinates } from "./geocoding";
import { getCityFromCoordinates } from "./reverse-geocoding";
import { buildOpenMeteoUrl } from "./api-urls";

/**
 * Get weather data by city name
 */
export async function getWeather(
  cityName: string | null,
): Promise<WeatherData> {
  if (cityName == null) {
    throw new Error("City name must be provided");
  }
  try {
    const coordinates = await getCoordinates(cityName);
    return await getWeatherByCoordinates(coordinates.lat, coordinates.lon);
  } catch (error) {
    console.error("Weather Data Error:", error);
    throw error;
  }
}

/**
 * Get weather data by coordinates (latitude and longitude)
 */
export async function getWeatherByCoordinates(
  lat: number,
  lon: number,
): Promise<WeatherData> {
  try {
    const url = buildOpenMeteoUrl(lat, lon);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch weather data: ${res.status} ${res.statusText}`,
      );
    }

    const data: OpenMeteoResponse = await res.json();

    // Get city name from coordinates using reverse geocoding
    const location = await getCityFromCoordinates(lat, lon);

    const current: CurrentWeather = {
      temperature: data.current.temperature_2m,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      feelsLike: data.current.apparent_temperature,
    };

    const hourly: HourlyForecast = {
      time: data.hourly.time,
      temperature: data.hourly.temperature_2m,
      weatherCode: data.hourly.weather_code,
    };

    const daily: DailyForecast = {
      date: data.daily.time,
      weatherCode: data.daily.weather_code,
      temperatureMax: data.daily.temperature_2m_max,
      temperatureMin: data.daily.temperature_2m_min,
    };

    return {
      location,
      current,
      hourly,
      daily,
    };
  } catch (error) {
    console.error("Weather Data Error:", error);
    throw error;
  }
}
