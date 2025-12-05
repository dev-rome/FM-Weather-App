/**
 * API URL builders
 */

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export function buildOpenMeteoUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      "temperature_2m",
      "weather_code",
      "wind_speed_10m",
      "relative_humidity_2m",
      "precipitation",
      "apparent_temperature",
    ].join(","),
    hourly: ["temperature_2m", "weather_code"].join(","),
    daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"].join(
      ",",
    ),
    forecast_days: "7",
    timezone: "auto",
  });

  return `${OPEN_METEO_BASE_URL}?${params.toString()}`;
}
