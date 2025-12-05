import type { CitySuggestion } from "@/types/search";

export function formatCityName(city: CitySuggestion): string {
  return city.state
    ? `${city.name}, ${city.state}, ${city.country}`
    : `${city.name}, ${city.country}`;
}
