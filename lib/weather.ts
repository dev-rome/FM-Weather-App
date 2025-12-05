// Types
type Coordinates = {
  lat: number;
  lon: number;
  name: string;
  country: string;
};

type CurrentWeather = {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  feelsLike: number;
};

type HourlyForecast = {
  time: string[];
  temperature: number[];
  weatherCode: number[];
};

type DailyForecast = {
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

export async function getCoordinates(cityName: string): Promise<Coordinates> {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      throw new Error(
        "OPENWEATHER_API_KEY is not set in environment variables",
      );
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch coordinates: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      throw new Error(`Location "${cityName}" not found`);
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  } catch (error) {
    console.error("Geocoding Error:", error);
    throw error;
  }
}

export async function getWeather(
  cityName: string = "London",
): Promise<WeatherData> {
  try {
    const coordinates = await getCoordinates(cityName);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation,apparent_temperature&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch weather data: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();

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
