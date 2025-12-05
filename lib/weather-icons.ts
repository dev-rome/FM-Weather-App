/**
 * Maps Open-Meteo weather codes (WMO) to icon paths
 * WMO Weather interpretation codes (WW):
 * https://open-meteo.com/en/docs#weathervariables
 */
export function getWeatherIcon(weatherCode: number): {
  icon: string;
  alt: string;
} {
  // Clear sky
  if (weatherCode === 0) {
    return { icon: "/images/icon-sunny.webp", alt: "Sunny" };
  }

  // Mainly clear, partly cloudy, and overcast
  if (weatherCode >= 1 && weatherCode <= 3) {
    if (weatherCode === 1) {
      return { icon: "/images/icon-partly-cloudy.webp", alt: "Mainly clear" };
    }
    if (weatherCode === 2) {
      return { icon: "/images/icon-partly-cloudy.webp", alt: "Partly cloudy" };
    }
    return { icon: "/images/icon-overcast.webp", alt: "Overcast" };
  }

  // Fog and depositing rime fog
  if (weatherCode >= 45 && weatherCode <= 49) {
    return { icon: "/images/icon-fog.webp", alt: "Fog" };
  }

  // Drizzle
  if (weatherCode >= 51 && weatherCode <= 57) {
    return { icon: "/images/icon-drizzle.webp", alt: "Drizzle" };
  }

  // Rain
  if (weatherCode >= 61 && weatherCode <= 67) {
    return { icon: "/images/icon-rain.webp", alt: "Rain" };
  }

  // Snow
  if (weatherCode >= 71 && weatherCode <= 77) {
    return { icon: "/images/icon-snow.webp", alt: "Snow" };
  }

  // Rain showers and snow showers
  if (weatherCode >= 80 && weatherCode <= 86) {
    if (weatherCode >= 80 && weatherCode <= 82) {
      return { icon: "/images/icon-rain.webp", alt: "Rain showers" };
    }
    return { icon: "/images/icon-snow.webp", alt: "Snow showers" };
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return { icon: "/images/icon-storm.webp", alt: "Thunderstorm" };
  }

  // Default to partly cloudy for unknown codes
  return { icon: "/images/icon-partly-cloudy.webp", alt: "Partly cloudy" };
}

