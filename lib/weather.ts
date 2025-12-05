import type {
  WeatherData,
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
} from "@/types/weather";
import type { OpenMeteoResponse } from "@/types/api";
import { getCoordinates } from "./geocoding";
import { buildOpenMeteoUrl } from "./api-urls";

export async function getWeather(
  cityName: string = "London",
): Promise<WeatherData> {
  try {
    const coordinates = await getCoordinates(cityName);
    const url = buildOpenMeteoUrl(coordinates.lat, coordinates.lon);
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch weather data: ${res.status} ${res.statusText}`,
      );
    }

    const data: OpenMeteoResponse = await res.json();

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
      location: coordinates,
      current,
      hourly,
      daily,
    };
  } catch (error) {
    console.error("Weather Data Error:", error);
    throw error;
  }
}
